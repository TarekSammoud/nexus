# Use a lightweight Python base image
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Copy dependency file first (for better Docker cache)
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application files, including the model
COPY main.py .
COPY toxic_filter_model.pkl .

# Expose the port the FastAPI app runs on
EXPOSE 5004

# Set environment variable for unbuffered Python output
ENV PYTHONUNBUFFERED=1

# Command to run the FastAPI app with Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "5004"]
