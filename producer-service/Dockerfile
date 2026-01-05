# 1. Use a lightweight Java image
FROM eclipse-temurin:21-jdk-alpine

# 2. Work inside the /app folder
WORKDIR /app

# 3. Copy the compiled JAR file (You must run ./gradlew build first!)
COPY app/build/libs/*.jar app.jar

# 4. Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]

