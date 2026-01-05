E-Commerce Activity Tracker & Monitoring System

A full-stack Event-Driven Microservices application that tracks user activities (clicks, views, purchases) in real-time. It uses Kafka for high-throughput event streaming and visualizes data using Prometheus & Grafana.

 Architecture

The system follows a decoupled producer-consumer architecture:

1.  Frontend (React + Vite): An e-commerce interface where users interact with products.
2.  Producer Service (Spring Boot): Receives REST API calls from the frontend and publishes events to Kafka.
3.  Apache Kafka (KRaft Mode): Acts as the central event bus, handling high-volume data streams without Zookeeper.
4.  Consumer Service (Spring Boot): Listens to Kafka topics, processes events, and records metrics using **Micrometer**.
5.  Monitoring Stack:
     Prometheus: Scrapes metrics from the Consumer Service every 5 seconds.
     Grafana: Visualizes sales, traffic, and user behavior in real-time dashboards.



Technologies Used

Backend: Java 21, Spring Boot 3, Spring Kafka
Frontend: React.js, Vite, Axios
Messaging: Apache Kafka (Confluent Image)
Monitoring: Prometheus, Grafana, Micrometer Tracing
Infrastructure: Docker, Docker Compose


Prerequisites

Docker Desktop (must be running)
Java JDK 21+
Node.js (optional, for local frontend dev)



Quick Start

1. Build the Services
This is a multi-module project, build the JAR files for both microservices :

```bash
# Build Producer Service
./gradlew.bat clean :producer-service:app:build -x test

# Build Consumer Service
./gradlew.bat clean :consumer-service:app:build -x test

# Start the entire infrastructure (Kafka, Apps, Database, Monitoring) with one command
docker-compose up --build


Service,URL,Credentials
Frontend Store: http://localhost:5173
Grafana Dashboards: http://localhost:3000,User: admin / Pass: admin
Prometheus Targets: http://localhost:9090
Producer Health: http://localhost:8080/actuator/health
Consumer Metrics: http://localhost:8081/actuator/prometheus


Kafka Topic: The system uses the topic user-activities.

Data Persistence: Docker volumes are configured to persist Grafana dashboards and Kafka data. To reset everything, run docker-compose down -v.
