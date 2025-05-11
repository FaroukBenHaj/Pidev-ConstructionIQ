package com.example.Material.Stock;

import lombok.Data;

@Data
public class MaterialReportDto {
    private String materialName;
    private float quantity;
    private float cost;
    private float weeklyConsumption = 0; // Valeur par défaut
    private float threshold; // Seuil d'alerte
    private String unit; // Unité de mesure

    // Constructeur pratique
    public MaterialReportDto(Material material, float selectedQuantity) {
        this.materialName = material.getMaterialName();
        this.quantity = selectedQuantity;
        this.cost = material.getCost();
        this.unit = material.getMaterialUnit() != null ?
                material.getMaterialUnit().name() : "UNIT";
        this.threshold = calculateThreshold(material);
    }

    private float calculateThreshold(Material material) {
        // Logique améliorée pour déterminer le seuil
        return Math.max(material.getCost() * 5, 10); // Exemple: seuil minimum de 10 ou 5x le coût
    }
}