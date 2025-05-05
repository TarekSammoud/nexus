# Use an official lightweight Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy requirements and app
COPY requirements.txt ./
COPY flask_exporter.py ./

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose the port
EXPOSE 8000

# Run the Flask app
CMD ["python", "flask_exporter.py"]
