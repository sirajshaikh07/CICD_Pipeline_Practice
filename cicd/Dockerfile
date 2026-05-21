# ============================================================================
# DOCKERFILE — Multi-stage build for Spring Boot backend
# ============================================================================
# This Dockerfile uses a multi-stage build for a small, secure image:
#   Stage 1 (builder) : Uses Maven to build the JAR
#   Stage 2 (runtime) : Uses a slim JRE to run the JAR
#
# BUILD:
#   docker build -t cicd-backend:latest .
#
# RUN:
#   docker run -d -p 8080:8080 \
#     -e SPRING_PROFILES_ACTIVE=test \
#     -e SPRING_DATASOURCE_URL=jdbc:postgresql://host:5432/mydb \
#     -e SPRING_DATASOURCE_USERNAME=user \
#     -e SPRING_DATASOURCE_PASSWORD=pass \
#     cicd-backend:latest
# ============================================================================

# ── Stage 1: Build ──────────────────────────────────────────────────────────
FROM eclipse-temurin:21-jdk-alpine AS builder

WORKDIR /app

# Copy Maven wrapper and POM first (for layer caching)
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# Download dependencies (cached layer if pom.xml unchanged)
RUN chmod +x mvnw && \
    ./mvnw dependency:go-offline --no-transfer-progress -B

# Copy source code
COPY src/ src/

# Build the JAR (skip tests — they ran in CI already)
RUN ./mvnw package -DskipTests --no-transfer-progress -B && \
    # Rename to a predictable filename
    cp target/*.jar target/app.jar

# ── Stage 2: Runtime ────────────────────────────────────────────────────────
FROM eclipse-temurin:21-jre-alpine AS runtime

# Security: run as non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy the built JAR from builder stage
COPY --from=builder /app/target/app.jar app.jar

# Set ownership
RUN chown -R appuser:appgroup /app

USER appuser

# Expose the application port
EXPOSE 8080

# Health check using Spring Boot Actuator
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# JVM tuning for containers
ENV JAVA_OPTS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -XX:+UseG1GC"

# Run the application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
