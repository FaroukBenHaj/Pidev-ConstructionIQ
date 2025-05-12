package com.example.pi_project.Entities;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private LocalDateTime creationDate;

    @ManyToOne
    @JoinColumn(name = "meeting_id")
    private Meeting meeting;


}
