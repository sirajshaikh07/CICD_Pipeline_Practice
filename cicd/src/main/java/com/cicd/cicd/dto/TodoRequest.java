package com.cicd.cicd.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoRequest {

    private String title;
    private String description;
    private boolean completed;
}
