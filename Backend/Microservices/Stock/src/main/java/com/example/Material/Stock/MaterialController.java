package com.example.Material.Stock;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/materials")
public class MaterialController {
    @Autowired
    private MaterialService materialService;

    @GetMapping("/get")
    public List<Material> getAllMaterials() {
        return materialService.getAllMaterials();
    }
    @GetMapping("/getbyname")
    public Optional<Material> findByMaterialName(@RequestParam String materialName) {
        return materialService.findByMaterialName(materialName);
    }
    @GetMapping("/{id}")
    public Optional<Material> getMaterialById(@PathVariable Long id) {
        return materialService.getMaterialById(id);
    }

    @PostMapping("/post")
    public Material createMaterial(@RequestBody Material material) {
        return materialService.saveMaterial(material);
    }


    @GetMapping("/name/{materialName}")
    public Optional<Material> getMaterialByName(@PathVariable String materialName) {
        return materialService.getMaterialByName(materialName);
    }

    // Suppression d'un matériau
    @DeleteMapping("/delete/{materialID}")
    public void deleteMaterial(@PathVariable Long materialID) {
        materialService.deleteMaterial(materialID);
    }

    // Mise à jour d'un matériau
    @PutMapping("/update/{materialID}")
    public Material updateMaterial(@PathVariable Long materialID, @RequestBody Material material) {
        return materialService.updateMaterial(materialID, material);
    }

}
