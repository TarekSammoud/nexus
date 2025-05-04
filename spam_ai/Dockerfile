# Use a lightweight Python base image
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Copy dependency file first (for better Docker cache)
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application files, including the model
COPY . .

# Expose the port the Flask app runs on
EXPOSE 5001

# Set environment variable to allow Flask to run properly
ENV PYTHONUNBUFFERED=1

# Command to run the app
CMD ["python", "spam_api.py"]
