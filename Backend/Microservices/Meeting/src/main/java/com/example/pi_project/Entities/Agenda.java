package com.example.pi_project.Entities;

import jakarta.persistence.Entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Agenda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "L'élément ne peut pas être vide")
    @Size(max = 50, message = "L'élément ne peut pas dépasser 100 caractères")
    private String item;
    @Size(max = 120, message = "La description ne peut pas dépasser 500 caractères")
    private String description;
    @NotNull(message = "L'heure planifiée ne peut pas être nulle")
    @FutureOrPresent(message = "L'heure planifiée doit être aujourd'hui ou dans le futur")
    private LocalDateTime scheduledTime;

    @ManyToOne
    @JoinColumn(name = "meeting_id")
    private Meeting meeting;

    // getters and setters
}
