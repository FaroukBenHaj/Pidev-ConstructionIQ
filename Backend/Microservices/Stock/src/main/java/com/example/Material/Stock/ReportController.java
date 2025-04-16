package com.example.Material.Stock;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final StockService stockService;
    private final ObjectMapper objectMapper;

    public ReportController(StockService stockService, ObjectMapper objectMapper) {
        this.stockService = stockService;
        this.objectMapper = objectMapper;
    }

    @GetMapping("/generate/{stockId}")
    public ResponseEntity<byte[]> generateStockReport(@PathVariable Long stockId) {
        try {
            Stock stock = stockService.getStockById(stockId)
                    .orElseThrow(() -> new RuntimeException("Stock not found"));

            if (stock.getMaterials() == null || stock.getMaterials().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body("No materials in this stock".getBytes());
            }

            List<MaterialReportDto> reportData = stock.getMaterials().stream()
                    .filter(Objects::nonNull)
                    .map(m -> new MaterialReportDto(m, m.getSelectedQuantity()))
                    .collect(Collectors.toList());

            byte[] pdfBytes = generatePythonReport(reportData);

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.CONTENT_DISPOSITION,
                            "attachment; filename=stock_report_" + stockId + ".pdf")
                    .body(pdfBytes);

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(("Error generating report: " + e.getMessage()).getBytes());
        }
    }

    private byte[] generatePythonReport(List<MaterialReportDto> materials) throws IOException, InterruptedException {
        // 1. Préparation des données
        Map<String, Object> data = new HashMap<>();
        data.put("materials", materials);
        String jsonData = objectMapper.writeValueAsString(data);

        // 2. Configuration du processus
        String pythonScriptPath = new String();
        ProcessBuilder pb = new ProcessBuilder("python3", pythonScriptPath);
        pb.redirectErrorStream(true); // Fusionne stdout et stderr

        // 3. Démarrage du processus
        Process process = pb.start();

        // 4. Écriture des données (avec flush explicite)
        try (BufferedWriter writer = new BufferedWriter(
                new OutputStreamWriter(process.getOutputStream()))) {
            writer.write(jsonData);
            writer.newLine(); // Important pour terminer le flux
            writer.flush();
        }

        // 5. Lecture du résultat
        try (InputStream in = process.getInputStream();
             ByteArrayOutputStream buffer = new ByteArrayOutputStream()) {
            byte[] dataBuffer = new byte[1024];
            int bytesRead;
            while ((bytesRead = in.read(dataBuffer)) != -1) {
                buffer.write(dataBuffer, 0, bytesRead);
            }

            // 6. Attente de la fin du processus
            int exitCode = process.waitFor();
            if (exitCode != 0) {
                throw new IOException(
                        "Python script failed with exit code: " + exitCode +
                                "\nOutput: " + buffer.toString());
            }

            return buffer.toByteArray();
        }
    }
    }