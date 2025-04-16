package com.example.Material.Stock;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stockID;
    private Long projetID;
    private int availableQuantity;

    // Vérifie que la date est dans le passé
    private LocalDate dateReceived;

    // Liste des matériaux associés
    @ManyToMany
    @JoinTable(
            name = "stock_material",
            joinColumns = @JoinColumn(name = "stockID"),
            inverseJoinColumns = @JoinColumn(name = "materialID")
    )
    private List<Material> materials;// Liste des matériaux associés à ce stock

    // Méthode pour obtenir les IDs des matériaux associés
    public List<Long> getMaterialIDs() {
        return materials.stream()
                .map(Material::getMaterialID)
                .toList(); // Récupère les IDs des matériaux
    }

    // Getters et setters
    public Long getStockID() {
        return stockID;
    }

    public void setStockID(Long stockID) {
        this.stockID = stockID;
    }

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

    public List<Material> getMaterials() {
        if (materials == null) {
            materials = new ArrayList<>();
        }
        return materials;
    }


    public void setMaterials(List<Material> materials) {
        this.materials = materials;
    }
    // ...



    // ✅ Méthode pour calculer le coût total du stock
    public float getTotalCost() {
        if (materials == null || materials.isEmpty()) {
            return 0;
        }

        float total = 0;
        for (Material material : materials) {
            total += material.getCost() * material.getSelectedQuantity();
        }

        return total;
    }

}


