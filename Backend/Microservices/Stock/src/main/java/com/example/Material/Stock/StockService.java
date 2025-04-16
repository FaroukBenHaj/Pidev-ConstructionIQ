package com.example.Material.Stock;

import com.example.Material.feign.StockInterface;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.util.List;
import java.util.Optional;

@Service
public class StockService {
    @Autowired
    private StockRepository stockRepository;
    @Autowired
    private MaterialRepository materialRepository;
//    @Autowired
//    StockInterface stockInterface;
//
//    private String materialName;
//    Optional<Material> materials = stockInterface.findByMaterialName(materialName);

//    @Autowired
//    private RestTemplate restTemplate;  // Client HTTP pour appeler l'API Material
//
//    private static final String MATERIAL_SERVICE_URL = "http://material-service-url/materials/";  // URL de l'API Material
//
//    public boolean assignMaterialToStock(Long stockId, Long materialId, int quantity) {
//        // 1. Vérifier si le stock existe
//        Optional<Stock> stockOpt = stockRepository.findById(stockId);
//        if (stockOpt.isEmpty()) {
//            return false; // Stock non trouvé
//        }
//
//        // 2. Récupérer les informations sur le matériel depuis le projet Material via son API
//        String materialUrl = MATERIAL_SERVICE_URL + materialId;
//        Material material = restTemplate.getForObject(materialUrl, Material.class);
//
//        if (material == null) {
//            return false; // Matériel non trouvé
//        }
//
//        // 3. Affecter le matériel au stock
//        Stock stock = stockOpt.get();
//        stock.setMaterialID(materialId);  // Associer le matériel au stock
//        stock.setAvailableQuantity(quantity);  // Mettre à jour la quantité disponible
//        stockRepository.save(stock);  // Sauvegarder l'affectation dans la base
//
//        return true; // L'affectation a réussi
//    }

    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    public Optional<Stock> getStockById(Long id) {
        return stockRepository.findById(id);
    }

    @Transactional
    public Stock saveStock(Stock stock) {
        return stockRepository.save(stock);
    }


    public void deleteStock(Long id) {
        stockRepository.deleteById(id);
    }


    // Récupérer une liste de matériaux à partir de leurs IDs

    // Récupérer une liste de matériaux à partir de leurs IDs





}
