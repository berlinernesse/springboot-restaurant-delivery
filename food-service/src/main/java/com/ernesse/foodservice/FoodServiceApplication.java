package com.ernesse.foodservice;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FoodServiceApplication {

	@Value("${spring.data.mongodb.uri}")
	private String mongoUri;

	@Value("${spring.profiles.active:default}")
	private String activeProfile;

	public static void main(String[] args) {
		SpringApplication.run(FoodServiceApplication.class, args);
	}

	@PostConstruct
	public void printConfigInfo() {
		System.out.println("=== CONFIG DEBUG ===");
		System.out.println("Mongo URI being used: " + mongoUri);
		System.out.println("Active profile: " + activeProfile);
		System.out.println("====================");
	}
}