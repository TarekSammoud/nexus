import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import SVC
import joblib

# 1. Lire le dataset
df = pd.read_csv("toxic_dataset.csv")

# 2. Séparer les colonnes
X = df["text"]
y = df["label"]

# 3. Diviser en données d'entraînement/test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 4. Pipeline : TF-IDF + SVM
model = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('svm', SVC(probability=True))
])

# 5. Entraîner
model.fit(X_train, y_train)

# 6. Sauvegarder le modèle
joblib.dump(model, "toxic_filter_model.pkl")

print("✅ Modèle entraîné et sauvegardé sous 'toxic_filter_model.pkl'")
