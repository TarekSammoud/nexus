import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
import joblib
import re

# Load dataset
df = pd.read_csv("reviews_dataset.csv")  # CSV should have: category,rating,label,text_

# Map label: 'OR' -> 0 (original), 'CG' -> 1 (spam)
df["label"] = df["label"].map({"OR": 0, "CG": 1})

# Drop rows with unmapped labels (if any)
df = df.dropna(subset=["label"])

# Clean text function
def clean_text(text):
    text = str(text)
    text = re.sub(r"http\S+", "", text)  # remove URLs
    text = re.sub(r"[^A-Za-z0-9\s]", "", text)  # remove special characters
    text = text.lower().strip()
    return text

# Clean the review text
df["text_"] = df["text_"].apply(clean_text)

# Features and labels
X = df["text_"]
y = df["label"]

# Vectorize text
vectorizer = TfidfVectorizer(stop_words='english')
X_vectorized = vectorizer.fit_transform(X)

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X_vectorized, y, test_size=0.2, random_state=42
)

# Train model
model = LogisticRegression()
model.fit(X_train, y_train)

# Evaluation
y_pred = model.predict(X_test)
print(classification_report(y_test, y_pred))

# Save model and vectorizer
joblib.dump((vectorizer, model), "spam_model.pkl")
print("✅ Model trained and saved as spam_model.pkl")
