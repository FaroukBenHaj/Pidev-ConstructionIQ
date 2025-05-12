package com.example.pi_project.Services;

import jakarta.annotation.PostConstruct;
import org.json.JSONObject;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.vosk.Model;
import org.vosk.Recognizer;

import javax.sound.sampled.*;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.UnsupportedAudioFileException;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;

@Service
public class VoskTranscriptionService {
    private Model model;

    @PostConstruct
    public void init() throws IOException {
        // Use ClassPathResource for portable path handling
        Resource resource = new ClassPathResource("models/vosk-model-en-us-0.22-lgraph");
        File modelDir = resource.getFile();

        // Verify critical files exist (adjust for lgraph)
        if (!modelDir.exists() || !new File(modelDir, "graph/phones.txt").exists()) {
            throw new IOException("Invalid lgraph model structure in: " + modelDir.getAbsolutePath());
        }

        this.model = new Model(modelDir.getAbsolutePath());
    }
    public String transcribe(MultipartFile audioFile) throws IOException, UnsupportedAudioFileException {
        // Convert audio to 16kHz mono WAV (required by Vosk)
        File tempFile = File.createTempFile("audio", ".wav");
        convertToWav(audioFile.getInputStream(), tempFile);

        try (Recognizer recognizer = new Recognizer(model, 16000)) {
            InputStream ais = AudioSystem.getAudioInputStream(tempFile);
            byte[] buffer = new byte[4096];
            int bytesRead;

            while ((bytesRead = ais.read(buffer)) != -1) {
                recognizer.acceptWaveForm(buffer, bytesRead);
            }

            return new JSONObject(recognizer.getFinalResult()).getString("text");
        } finally {
            tempFile.delete();
        }
    }

    private void convertToWav(InputStream input, File output) throws IOException, UnsupportedAudioFileException {
        // Use FFmpeg or Java Sound API (simplified example)
        AudioInputStream source = AudioSystem.getAudioInputStream(input);
        AudioFormat format = new AudioFormat(16000, 16, 1, true, false);
        AudioInputStream converted = AudioSystem.getAudioInputStream(format, source);
        AudioSystem.write(converted, AudioFileFormat.Type.WAVE, output);
    }
}