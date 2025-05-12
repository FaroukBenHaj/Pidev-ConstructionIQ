package com.example.pi_project.Entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
public class Attendee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom ne peut pas être vide")
    @Size(max = 25, message = "Le nom ne peut pas dépasser 50 caractères")
    private String name;

    @NotNull(message = "Le titre ne peut pas être vide")
    @Enumerated(EnumType.STRING)
    private Title title;

    @NotBlank(message = "L'email ne peut pas être vide")
    @Email(message = "L'email doit être valide")
    @Size(max = 40, message = "L'email ne peut pas dépasser 35 caractères")
    private String email;

    @NotNull(message = "Le type de participation ne peut pas être vide")
    @Enumerated(EnumType.STRING)
    private AttendanceType attendanceType;

    @NotNull(message = "Le statut de participation ne peut pas être vide")
    @Enumerated(EnumType.STRING)
    private AttendanceStatus attendanceStatus;

    private boolean safetyBriefingCompleted;  // Important for construction sites

    @ManyToOne
    @JoinColumn(name = "meeting_id")
    private Meeting meeting;

    // Titles enum (construction project roles)
    public enum Title {
        PROJECT_MANAGER("Chef de projet"),
        SITE_MANAGER("Chef de chantier"),
        ARCHITECT("Architecte"),
        CIVIL_ENGINEER("Ingénieur civil"),
        ELECTRICAL_ENGINEER("Ingénieur électricien"),
        MECHANICAL_ENGINEER("Ingénieur mécanicien"),
        SAFETY_OFFICER("Responsable sécurité"),
        QUANTITY_SURVEYOR("Métreur"),
        CONTRACTOR("Entrepreneur"),
        SUBCONTRACTOR("Sous-traitant"),
        CLIENT_REPRESENTATIVE("Représentant du client"),
        SUPPLIER("Fournisseur"),
        TECHNICIAN("Technicien"),
        LABORER("Ouvrier"),
        OTHER("Autre");

        private final String displayName;

        Title(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }

    // Attendance type enum
    public enum AttendanceType {
        IN_PERSON("En personne"),
        REMOTE("À distance"),
        HYBRID("Hybride");

        private final String displayName;

        AttendanceType(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }

    // Attendance status enum
    public enum AttendanceStatus {
        REGISTERED("Inscrit"),
        CONFIRMED("Confirmé"),
        CANCELLED("Annulé"),
        ATTENDED("A participé"),
        NO_SHOW("Absent");

        private final String displayName;

        AttendanceStatus(String displayName) {
            this.displayName = displayName;
        }

        public String getDisplayName() {
            return displayName;
        }
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Title getTitle() {
        return title;
    }

    public void setTitle(Title title) {
        this.title = title;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public AttendanceType getAttendanceType() {
        return attendanceType;
    }

    public void setAttendanceType(AttendanceType attendanceType) {
        this.attendanceType = attendanceType;
    }

    public AttendanceStatus getAttendanceStatus() {
        return attendanceStatus;
    }

    public void setAttendanceStatus(AttendanceStatus attendanceStatus) {
        this.attendanceStatus = attendanceStatus;
    }

    public boolean isSafetyBriefingCompleted() {
        return safetyBriefingCompleted;
    }

    public void setSafetyBriefingCompleted(boolean safetyBriefingCompleted) {
        this.safetyBriefingCompleted = safetyBriefingCompleted;
    }

    public Meeting getMeeting() {
        return meeting;
    }

    public void setMeeting(Meeting meeting) {
        this.meeting = meeting;
    }
}