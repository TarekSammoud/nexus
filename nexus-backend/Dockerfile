# Use the official OpenJDK base image for building the app
FROM openjdk:17-jdk-slim as build

# Set the working directory inside the container
WORKDIR /app 

# Install Maven
RUN apt-get update && apt-get install -y maven

# Copy the pom.xml and download dependencies (to leverage Docker caching)
COPY pom.xml ./

# Download the dependencies
RUN mvn dependency:go-offline

# Copy the entire project source
COPY src /app/src

# Build the application
RUN mvn clean package -DskipTests

# Use OpenJDK to run the Spring Boot application
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Set environment variables (these should be passed by Kubernetes or Docker Compose)
# In your Kubernetes deployment, the environment variables should be passed in the deployment spec, not in the Dockerfile
ENV DB_URL=${DB_URL}
ENV DB_USERNAME=${DB_USERNAME}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_NAME=${DB_NAME}

# Copy the built JAR from the previous build stage
COPY --from=build /app/target/*.jar /app/nexus-backend.jar

# Expose the application port
EXPOSE 9000

# Command to run the Spring Boot application  
CMD ["java", "-jar", "/app/nexus-backend.jar"]
