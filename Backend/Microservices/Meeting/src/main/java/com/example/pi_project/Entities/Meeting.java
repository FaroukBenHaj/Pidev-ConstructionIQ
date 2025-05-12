package com.example.pi_project.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;




import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Meeting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le titre ne peut pas être vide")
    @Size(max = 35, message = "Le titre ne peut pas dépasser 100 caractères")
    @Column(unique = true)
    private String title;

    @NotNull(message = "La date ne peut pas être nulle")
    @FutureOrPresent(message = "La date doit être aujourd'hui ou dans le futur")
    private LocalDateTime date;

    @NotNull(message = "La durée ne peut pas être nulle")
    @Min(value = 15, message = "La durée minimale est de 15 minutes")
    @Max(value = 480, message = "La durée maximale est de 8 heures (480 minutes)")
    private Integer duration; // Duration in minutes
    // General location (meeting room, site name, etc.)
    @NotBlank(message = "L'emplacement ne peut pas être vide")
    @Size(max = 35, message = "L'emplacement ne peut pas dépasser 100 caractères")
    private String location;

    @Embedded
    private Address address;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "La fréquence ne peut pas être nulle")
    private Frequency frequency;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Le type de réunion ne peut pas être nul")
    private MeetingType type;

    @Size(max = 65, message = "La description ne peut pas dépasser 500 caractères")
    private String description;

    @OneToMany(mappedBy = "meeting", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Attendee> attendees;

    @OneToMany(mappedBy = "meeting", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Report> reports;

    @OneToMany(mappedBy = "meeting", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Agenda> agendas;

    // Enums
    public enum Frequency {
        ONE_TIME("Unique"),
        WEEKLY("Hebdomadaire"),
        BIWEEKLY("Bimensuel"),
        MONTHLY("Mensuel"),
        QUARTERLY("Trimestriel"),
        ANNUAL("Annuel"),
        AD_HOC("Au besoin");

        private final String displayName;

        Frequency(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }

    public enum MeetingType {
        REVIEW("Revue"),
        PROGRESS_UPDATE("Mise à jour de progrès"),
        DEMO("Démonstration"),
        SAFETY("Réunion de sécurité"),
        PLANNING("Planification"),
        COORDINATION("Coordination"),
        CLIENT("Réunion client"),
        EMERGENCY("Urgence"),
        TRAINING("Formation");

        private final String displayName;

        MeetingType(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }
    // Helper method to calculate end time
    public LocalDateTime getEndTime() {
        return this.date.plusMinutes(this.duration);
    }

    // Embedded address class
    @Embeddable
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Address {
        @NotBlank(message = "La rue ne peut pas être vide")
        @Size(max = 50, message = "La rue ne peut pas dépasser 50 caractères")
        private String street;

        @NotBlank(message = "La ville ne peut pas être vide")
        @Size(max = 30, message = "La ville ne peut pas dépasser 30 caractères")
        private String city;

        @NotBlank(message = "Le pays ne peut pas être vide")
        @Size(max = 30, message = "Le pays ne peut pas dépasser 30 caractères")
        private String country;

        @Size(max = 20, message = "Le code postal ne peut pas dépasser 20 caractères")
        private String postalCode;

        @Override
        public String toString() {
            return String.format("%s, %s, %s", street, city, country);
        }

    }
}

