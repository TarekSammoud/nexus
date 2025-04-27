from fastapi import FastAPI
from diffusers import StableDiffusionPipeline
import torch
from io import BytesIO
from PIL import Image
import base64
import shutil
import os

app = FastAPI()

# Load Stable Diffusion Model (CPU Mode)
model_id = "stabilityai/stable-diffusion-2-1"
pipe = StableDiffusionPipeline.from_pretrained(model_id)
pipe.to("cpu")  # Running on CPU

@app.post("/generate/")
async def generate(prompt: str):
    image = pipe(prompt).images[0]

    # Nom de fichier
    local_filename = "output1.png"
    frontend_path = "../nexus-frontend/src/assets/avatar-generated.png"

    # Sauvegarde locale de l'image
    image.save(local_filename)

    # Copie vers le frontend (Angular assets)
    try:
        shutil.copy(local_filename, frontend_path)
        print(f"Image copiée avec succès dans : {frontend_path}")
    except Exception as e:
        print(f"Erreur lors de la copie de l'image vers le frontend : {e}")

    # Convertir l'image en base64 pour la réponse API
    buffered = BytesIO()
    image.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode()

    return {"image": img_str}



# Run with: uvicorn test:app --host 0.0.0.0 --port 8000 --reload