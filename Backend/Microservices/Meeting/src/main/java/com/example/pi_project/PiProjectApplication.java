package com.example.pi_project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {"com.example.pi_project", "com.example.pi_project.Services"}) // Add the Services package
public class PiProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(PiProjectApplication.class, args);
    }

}
