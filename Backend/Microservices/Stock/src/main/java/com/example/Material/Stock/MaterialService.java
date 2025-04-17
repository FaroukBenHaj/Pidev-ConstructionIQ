package com.example.Material.Stock;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MaterialService {
    @Autowired
    private StockRepository stockRepository  ;
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

    @Transactional
    public void deleteMaterial(Long materialId) {
        Optional<Material> materialOpt = materialRepository.findById(materialId);

        if (materialOpt.isPresent()) {
            Material material = materialOpt.get();

            // Supprimer le lien entre le matériel et les stocks
            for (Stock stock : material.getStocks()) {
                stock.getMaterials().remove(material);

                if (stock.getMaterials().isEmpty()) {
                    // Supprimer le stock si aucun matériel ne reste
                    stockRepository.delete(stock);
                } else {
                    // Sinon, juste mettre à jour le stock
                    stockRepository.save(stock);
                }
            }

            // Supprimer le matériel
            materialRepository.delete(material);
        }
    }

    public Material updateMaterial(Long materialID, Material updatedMaterial) {
        Optional<Material> existingMaterial = materialRepository.findById(materialID);
        if (existingMaterial.isPresent()) {
            Material material = existingMaterial.get();
            material.setMaterialName(updatedMaterial.getMaterialName());
            material.setCost(updatedMaterial.getCost());
            material.setMaterialUnit(updatedMaterial.getMaterialUnit());
            material.setSelectedQuantity(updatedMaterial.getSelectedQuantity());
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
