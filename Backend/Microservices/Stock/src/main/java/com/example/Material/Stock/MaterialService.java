package com.example.Material.Stock;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaterialService {
    @Autowired
    private MaterialRepository materialRepository;
    public Optional<Material> findByMaterialName( String materialName ) {
        return materialRepository.findByMaterialName( materialName );
    }
    public List<Material> getAllMaterials() {
        return materialRepository.findAll();
    }

    public Optional<Material> getMaterialById(Long id) {
        return materialRepository.findById(id);
    }

    public Material saveMaterial(Material material) {
        return materialRepository.save(material);
    }

    public void deleteMaterial(Long materialID) {
        materialRepository.deleteById(materialID);
    }

    public Material updateMaterial(Long materialID, Material updatedMaterial) {
        Optional<Material> existingMaterial = materialRepository.findById(materialID);
        if (existingMaterial.isPresent()) {
            Material material = existingMaterial.get();
            material.setMaterialName(updatedMaterial.getMaterialName());
            material.setCost(updatedMaterial.getCost());
            material.setMaterialUnit(updatedMaterial.getMaterialUnit());
            return materialRepository.save(material);
        }
        return null; // Ou vous pouvez lancer une exception si l'objet n'existe pas
    }

    public Optional<Material> getMaterialByName(String materialName) {
        return materialRepository.findByMaterialName(materialName);
    }
    public List<Material> getMaterialsByIds(List<Long> materialIDs) {
        return materialRepository.findAllById(materialIDs);  // Utilisation de la méthode `findAllById` du repository
    }


}
