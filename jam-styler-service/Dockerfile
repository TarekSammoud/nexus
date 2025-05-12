# Use a lightweight Python base image
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Copy dependency file first (for better Docker cache)
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application file
COPY app.py .

# Expose the port the Flask app runs on
EXPOSE 5005

# Set environment variable for unbuffered Python output
ENV PYTHONUNBUFFERED=1

# Command to run the Flask app with Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:5005", "app:app"]
