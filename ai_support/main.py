import os
import time
import requests
import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

# Récupération correcte du token via son nom de variable d'environnement
API_URL = "https://api-inference.huggingface.co/models/databricks/dolly-v2-3b"
HEADERS = {"Authorization": f"Bearer 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"}

class AnalyzeRequest(BaseModel):
    text: str

@app.post("/analyze")
async def analyze(req: AnalyzeRequest):
    payload = {
        "inputs": req.text,
        "options": {"wait_for_model": True},
        "parameters": {"max_new_tokens": 50}
    }

    # Session avec stratégie de retry pour gérer 503/504
    session = requests.Session()
    from requests.adapters import HTTPAdapter
    from urllib3.util.retry import Retry
    retry_strategy = Retry(
        status_forcelist=[429, 500, 502, 503, 504],
        backoff_factor=2,
        total=5
    )
    adapter = HTTPAdapter(max_retries=retry_strategy)
    session.mount("https://", adapter)

    try:
        resp = session.post(API_URL, headers=HEADERS, json=payload, timeout=60)
    except requests.RequestException as e:
        raise HTTPException(502, f"Erreur réseau lors de l'appel HF : {e}")

    if resp.status_code == 200:
        try:
            data = resp.json()
        except ValueError:
            raise HTTPException(502, "Réponse non-JSON de HF API")
        return {"generated_text": data}
    else:
        # Renvoie l’erreur brute de HF pour diagnostic
        raise HTTPException(resp.status_code, resp.text)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5002)
