package com.ernesse.gatewayservice.model;

public class Restaurant {
    private String id;
    private String name;
    private String city;
    private String cuisineType;
    private Double rating;

    public Restaurant() {
    }

    public Restaurant(String id, String name, String city, String cuisineType, Double rating) {
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

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }
}