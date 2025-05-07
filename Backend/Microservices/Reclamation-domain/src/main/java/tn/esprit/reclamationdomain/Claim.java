package tn.esprit.reclamationdomain;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "claims")
public class Claim {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sender;
    private String receiver;
    private int numberOfCharacters;
    private boolean containsUrgent;
    private boolean containsImportant;
    private String urgencyClassification;

    @Temporal(TemporalType.DATE)
    private Date sendDate;

    @Temporal(TemporalType.TIMESTAMP)
    private Date sendTime;

    private String claimType;
    private String initialPriority;
    private int numberOfAttachments;
    private String messageLanguage;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public int getNumberOfCharacters() {
        return numberOfCharacters;
    }

    public void setNumberOfCharacters(int numberOfCharacters) {
        this.numberOfCharacters = numberOfCharacters;
    }

    public boolean isContainsUrgent() {
        return containsUrgent;
    }

    public void setContainsUrgent(boolean containsUrgent) {
        this.containsUrgent = containsUrgent;
    }

    public boolean isContainsImportant() {
        return containsImportant;
    }

    public void setContainsImportant(boolean containsImportant) {
        this.containsImportant = containsImportant;
    }

    public String getUrgencyClassification() {
        return urgencyClassification;
    }

    public void setUrgencyClassification(String urgencyClassification) {
        this.urgencyClassification = urgencyClassification;
    }

    public Date getSendDate() {
        return sendDate;
    }

    public void setSendDate(Date sendDate) {
        this.sendDate = sendDate;
    }

    public Date getSendTime() {
        return sendTime;
    }

    public void setSendTime(Date sendTime) {
        this.sendTime = sendTime;
    }

    public String getClaimType() {
        return claimType;
    }

    public void setClaimType(String claimType) {
        this.claimType = claimType;
    }

    public String getInitialPriority() {
        return initialPriority;
    }

    public void setInitialPriority(String initialPriority) {
        this.initialPriority = initialPriority;
    }

    public int getNumberOfAttachments() {
        return numberOfAttachments;
    }

    public void setNumberOfAttachments(int numberOfAttachments) {
        this.numberOfAttachments = numberOfAttachments;
    }

    public String getMessageLanguage() {
        return messageLanguage;
    }

    public void setMessageLanguage(String messageLanguage) {
        this.messageLanguage = messageLanguage;
    }
}
