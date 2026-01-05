package org.example.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Tag;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ConsumerService {

    private final MeterRegistry meterRegistry;
    private final ObjectMapper objectMapper;


    public ConsumerService(MeterRegistry meterRegistry, ObjectMapper objectMapper) {
        this.meterRegistry = meterRegistry;
        this.objectMapper = objectMapper;
    }

    @KafkaListener(topics = "user-activities", groupId = "ecommerce-group")
    public void listen(String message) {
        try {

            JsonNode json = objectMapper.readTree(message);


            String eventType = json.has("eventType") ? json.get("eventType").asText() : "unknown";


            String productId = "GENERAL-TRAFFIC"; // Default value
            if (json.has("metadata") && json.get("metadata").has("productId")) {
                productId = json.get("metadata").get("productId").asText();
            }


            System.out.println("Consumer received the event "+eventType+" with product ID "+productId);

            meterRegistry.counter("ecommerce_events_total",
                    "type", eventType,
                    "product_id", productId
            ).increment();


            System.out.println("Recorded Metric: [" + eventType + "] for Product ID: " + productId);

        } catch (Exception e) {
            System.err.println("Error processing Kafka message: " + message);
            e.printStackTrace();
        }
    }
}

