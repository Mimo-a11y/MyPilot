
# ==========================================
# Stage 1: Build the Spring Boot application
# ==========================================

FROM maven:3.9.9-eclipse-temurin-21 AS build

WORKDIR /app

# Copy Maven wrapper and project configuration
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# Download dependencies
RUN chmod +x mvnw && ./mvnw -B dependency:go-offline

# Copy application source code
COPY src ./src

# Build executable JAR
RUN ./mvnw -B clean package -DskipTests


# ==========================================
# Stage 2: Run the Spring Boot application
# ==========================================

FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy the packaged JAR from the build stage
COPY --from=build /app/target/backend-0.0.1-SNAPSHOT.jar app.jar

# Document the application port
EXPOSE 8080

# Start Spring Boot
ENTRYPOINT ["java", "-jar", "app.jar"]
