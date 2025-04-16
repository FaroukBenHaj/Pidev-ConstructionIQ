package com.example.Material.Stock;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/stocks")
public class StockController {

    @Autowired
    private StockService stockService;

    @Autowired
    private MaterialService materialService;  // Utilisation de MaterialService pour récupérer les matériaux

    @GetMapping
    public List<Stock> getAllStocks() {
        return stockService.getAllStocks();
    }

    @GetMapping("/{id}")
    public Stock getStockById(@PathVariable Long id) {
        return stockService.getStockById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Stock not found"));
    }

    @PostMapping("/post")
    public Stock createStock(@RequestBody StockDTO stockDTO) {
        if (stockDTO == null || stockDTO.getMaterialIDs() == null || stockDTO.getMaterialIDs().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Stock or Material IDs are invalid");
        }

        try {
            // 1. Récupérer les matériaux à partir des materialIDs dans le DTO
            List<Material> materials = materialService.getMaterialsByIds(stockDTO.getMaterialIDs());
            if (materials.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Materials not found for the provided IDs");
            }

            // 2. Créer le stock avec les matériaux associés
            Stock stock = new Stock();
            stock.setAvailableQuantity(stockDTO.getAvailableQuantity());
            stock.setDateReceived(stockDTO.getDateReceived());
            stock.setProjetID(stockDTO.getProjetID());
            stock.setMaterials(materials);  // Associer les matériaux au stock

            // 3. Enregistrer le stock avec les matériaux associés
            return stockService.saveStock(stock);
        } catch (Exception e) {
            System.err.println("Exception occurred while saving stock: " + e.getMessage());
            e.printStackTrace();
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error while adding stock", e);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteStock(@PathVariable Long id) {
        stockService.deleteStock(id);
    }

    @GetMapping("/{id}/cost")
    public ResponseEntity<Float> getStockTotalCost(@PathVariable Long id) {
        Optional<Stock> stockOpt = stockService.getStockById(id);

        if (stockOpt.isPresent()) {
            float totalCost = stockOpt.get().getTotalCost();
            return ResponseEntity.ok(totalCost);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}

