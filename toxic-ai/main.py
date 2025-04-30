from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()

# Charger le modèle
model = joblib.load("toxic_filter_model.pkl")

# Schéma de requête
class InputText(BaseModel):
    text: str

# Route de prédiction
@app.post("/predict")
def predict(input: InputText):
    prediction = model.predict([input.text])[0]
    return {"acceptable": bool(prediction)}

