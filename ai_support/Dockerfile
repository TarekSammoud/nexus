# Étape 1 : Image de base
FROM python:3.11-slim

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier les fichiers requis
COPY main.py .
COPY requirements.txt .

# Étape 4 : Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# Étape 5 : Exposer le port de l'application
EXPOSE 5002

# Étape 6 : Lancer l'application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5002"]

