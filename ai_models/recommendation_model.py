from flask import Flask, request, jsonify
import json
import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.neighbors import NearestNeighbors
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from flask_cors import CORS  # <-- Import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})  # Adjust the origin to match your frontend

# Load dataset
with open("market_data_large.json", "r") as f:
    data = json.load(f)

users = pd.DataFrame(data["users"])
listings = pd.DataFrame(data["market_listings"])
bids = pd.DataFrame(data["bids"])

# Preprocess listings
def preprocess_listings(df):
    df = df.copy()
    df["tags"] = df["tags"].apply(lambda x: ' '.join(x))
    return df[["listing_id", "game", "genre", "item_type", "rarity", "tags"]]

listing_features = preprocess_listings(listings)

# Feature encoding
encoder = OneHotEncoder(handle_unknown='ignore')  # ✅ handles new input gracefully
encoded_cats = encoder.fit_transform(listing_features[["game", "genre", "item_type", "rarity"]]).toarray()

vectorizer = TfidfVectorizer()
tags_matrix = vectorizer.fit_transform(listing_features["tags"])

listing_vectors = np.hstack((encoded_cats, tags_matrix.toarray()))
listing_id_to_index = {lid: idx for idx, lid in enumerate(listing_features["listing_id"])}

# Encode a single input item using the same encoders
def encode_input_item(item):
    df = pd.DataFrame([{
        "game": item["game"],
        "genre": item["genre"],
        "item_type": item["item_type"],
        "rarity": item["rarity"]
    }])
    encoded_cat = encoder.transform(df).toarray()
    tags_str = ' '.join(item["tags"])
    tags_vect = vectorizer.transform([tags_str]).toarray()
    return np.hstack((encoded_cat, tags_vect)).flatten()

# Get user profile vector
def get_user_profile_vector(user_id):
    user_bid_ids = bids[bids["user_id"] == user_id]["listing_id"]
    vectors = [listing_vectors[listing_id_to_index[lid]] for lid in user_bid_ids if lid in listing_id_to_index]
    return np.mean(vectors, axis=0) if vectors else np.zeros(listing_vectors.shape[1])

# KNN recommendation
def recommend_knn_for_input(input_item, top_n=5):
    input_vector = encode_input_item(input_item).reshape(1, -1)
    knn = NearestNeighbors(n_neighbors=top_n, metric="cosine")
    knn.fit(listing_vectors)
    distances, indices = knn.kneighbors(input_vector)
    return [int(listing_features.iloc[i]["listing_id"]) for i in indices.flatten()]

# SVM model training
def train_svm_for_user(user_id):
    user_bids = set(bids[bids["user_id"] == user_id]["listing_id"])
    y = np.array([1 if lid in user_bids else 0 for lid in listing_features["listing_id"]])
    if len(set(y)) < 2:
        return None
    X_train, _, y_train, _ = train_test_split(listing_vectors, y, test_size=0.3)
    clf = SVC(probability=True)
    clf.fit(X_train, y_train)
    return clf

# Predict SVM
def svm_predict_input(user_id, input_item):
    clf = train_svm_for_user(user_id)
    if clf is None:
        return None
    input_vector = encode_input_item(input_item).reshape(1, -1)
    proba = clf.predict_proba(input_vector)[0][1]
    pred = clf.predict(input_vector)[0]
    return {"would_bid": bool(pred), "probability": float(proba)}

@app.route('/recommend', methods=['POST'])
def recommend():
    input_item = request.json
    user_id = input_item.get("user_id", 1)  # Default to user_id 1 if not provided
    try:
        similar_ids = recommend_knn_for_input(input_item, top_n=5)
        result = svm_predict_input(user_id, input_item)
        return jsonify({
            "recommendations": similar_ids,
            "svm_prediction": result
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)
