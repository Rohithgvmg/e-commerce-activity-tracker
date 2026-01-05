package org.example.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.example.DTO.UserEvent;
import org.springframework.web.bind.annotation.*;

import java.util.Properties;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final String TOPIC_NAME = "user-activities";
    private final String BOOTSTRAP_SERVERS = System.getenv("BOOTSTRAP_SERVERS") != null
            ? System.getenv("BOOTSTRAP_SERVERS")
            : "localhost:9092";
    // getenv fetches from the docker compose file

    private final Producer<String, String> kafkaProducer;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public EventController() {
        Properties props = new Properties();
        props.put("bootstrap.servers", BOOTSTRAP_SERVERS);
        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

        this.kafkaProducer = new KafkaProducer<>(props);
   //this.kafkaProducer = null;

    }

    @PostMapping
    public void receiveEvent(@RequestBody UserEvent event) {

        try{
            String kafkaKey="GENERAL-TRAFFIC";
            String eventType= event.getEventType();
            String productId=null;
            String kafkaMessage=objectMapper.writeValueAsString(event);
            if(event.getMetadata().containsKey("productId")){
                productId=event.getMetadata().get("productId");
                kafkaKey=productId;
            }

            System.out.println("Event type received is "+eventType);
            System.out.println("Product ID is "+productId);
            sendEventToKafka(kafkaKey,kafkaMessage);
           System.out.println("kafka event sent with key as "+kafkaKey);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }


    private void sendEventToKafka(String key, String message) {

        if (this.kafkaProducer == null) {
            System.out.println("Skipping Kafka send (Producer is null)");
            return;
        }


        ProducerRecord<String, String> record = new ProducerRecord<>("user-activities", key, message);

        kafkaProducer.send(record, (metadata, exception) -> {
            if (exception != null) {
                System.err.println("KAFKA ERROR: " + exception.getMessage());
            }else{
                System.out.println("Sent to Topic: " + metadata.topic() + " | Offset: " + metadata.offset());
            }

        });
    }
}

