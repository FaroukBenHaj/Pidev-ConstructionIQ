package com.example.Material.Stock;

import java.time.LocalDate;
import java.util.List;

public class StockDTO {

    private Long projetID;
    private int availableQuantity;
    private LocalDate dateReceived;
    private List<Long> materialIDs;

    // Getters and Setters
    public Long getProjetID() {
        return projetID;
    }

    public void setProjetID(Long projetID) {
        this.projetID = projetID;
    }

    public int getAvailableQuantity() {
        return availableQuantity;
    }

    public void setAvailableQuantity(int availableQuantity) {
        this.availableQuantity = availableQuantity;
    }

    public LocalDate getDateReceived() {
        return dateReceived;
    }

    public void setDateReceived(LocalDate dateReceived) {
        this.dateReceived = dateReceived;
    }

    public List<Long> getMaterialIDs() {
        return materialIDs;
    }

    public void setMaterialIDs(List<Long> materialIDs) {
        this.materialIDs = materialIDs;
    }
}
