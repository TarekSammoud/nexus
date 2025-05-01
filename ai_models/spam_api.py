from flask import Flask, request, jsonify
from joblib import load

# Load trained model
vectorizer, model = load("spam_model.pkl")

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data.get("text", "")

    if not text:
        return jsonify({"error": "No review text provided"}), 400

    # Transform the input text using the vectorizer
    X = vectorizer.transform([text])

    # Get the predicted probabilities
    prediction_probs = model.predict_proba(X)[0]  # [0] to get the first (and only) element

    # Probability for CG (spam)
    cg_prob = prediction_probs[1]  # probability of CG being 1 (fake review)
    or_prob = prediction_probs[0]  # probability of OR being 0 (original review)

    # Return the label and the probabilities
    label = "CG" if cg_prob > or_prob else "OR"

    return jsonify({
        "label": label,
        "fakeness_percentage": round(cg_prob * 100, 2),  # Percentage of fakeness
        "original_percentage": round(or_prob * 100, 2)   # Percentage of being original
    })

if __name__ == "__main__":
    app.run(port=5001)
