package com.example.Material.Stock;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long materialID;

    private String materialName;

    public Long getMaterialID() {
        return materialID;
    }

    public void setMaterialID(Long materialID) {
        this.materialID = materialID;
    }

    public String getMaterialName() {
        return materialName;
    }

    public void setMaterialName(String materialName) {
        this.materialName = materialName;
    }

    public float getCost() {
        return cost;
    }

    public void setCost(float cost) {
        this.cost = cost;
    }

    public UnitOfMeasure getMaterialUnit() {
        return materialUnit;
    }

    public void setMaterialUnit(UnitOfMeasure materialUnit) {
        this.materialUnit = materialUnit;
    }

    public List<Stock> getStocks() {
        return stocks;
    }

    public void setStocks(List<Stock> stocks) {
        this.stocks = stocks;
    }

    private float cost;
    private float selectedQuantity = 0;

    public float getSelectedQuantity() {
        return selectedQuantity;
    }

    public void setSelectedQuantity(float selectedQuantity) {
        this.selectedQuantity = selectedQuantity;
    }

    @Enumerated(EnumType.STRING)
    private UnitOfMeasure materialUnit;

    // Liste des stocks associés à ce matériau (relation Many-to-Many)
    @ManyToMany(mappedBy = "materials")
    @JsonIgnore
    private List<Stock> stocks;

    // Getters et setters pour les autres propriétés
}
