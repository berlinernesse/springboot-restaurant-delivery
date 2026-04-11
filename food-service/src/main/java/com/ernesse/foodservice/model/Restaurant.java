package com.ernesse.foodservice.model;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

// Name: Ernesse Marie Berlin
// Student Number: 301248412
// Assignment: Food Delivery Microservices System

@Document(collection = "restaurants")
public class Restaurant {

    @Id
    private String id;

    @NotBlank(message = "Restaurant name is required")
    private String name;

    @NotBlank(message = "City is required")
    private String city;

    @NotBlank(message = "Cuisine type is required")
    private String cuisineType;

    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating must be at most 5")
    private double rating;

    public Restaurant() {
    }

    public Restaurant(String id, String name, String city, String cuisineType, double rating) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.cuisineType = cuisineType;
        this.rating = rating;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCuisineType() {
        return cuisineType;
    }

    public void setCuisineType(String cuisineType) {
        this.cuisineType = cuisineType;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }
}