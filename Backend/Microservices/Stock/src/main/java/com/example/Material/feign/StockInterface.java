package com.example.Material.feign;

import com.example.Material.Stock.Material;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;
@FeignClient("MATERIAL")
public interface StockInterface {
    @Bean
    @GetMapping
    public Optional<Material> findByMaterialName(@RequestParam String materialName);
}
