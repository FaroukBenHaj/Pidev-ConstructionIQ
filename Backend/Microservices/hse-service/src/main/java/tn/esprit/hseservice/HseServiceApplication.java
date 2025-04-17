package tn.esprit.hseservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class HseServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(HseServiceApplication.class, args);
    }

}
