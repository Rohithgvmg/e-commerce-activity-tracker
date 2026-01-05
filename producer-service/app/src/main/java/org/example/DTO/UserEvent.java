package org.example.DTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class UserEvent{

    String eventType;
    Map<String,String> metadata;
    // may contain productId if not page_view
}



