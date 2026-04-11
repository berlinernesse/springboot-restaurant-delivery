package com.ernesse.gatewayservice.model;

public class FoodItem {
    private String id;
    private String name;
    private String category;
    private Double price;
    private String availabilityStatus;
    private String restaurantId;

    public FoodItem() {
    }

    public FoodItem(String id, String name, String category, Double price, String availabilityStatus, String restaurantId) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.availabilityStatus = availabilityStatus;
        this.restaurantId = restaurantId;
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getAvailabilityStatus() {
        return availabilityStatus;
    }

    public void setAvailabilityStatus(String availabilityStatus) {
        this.availabilityStatus = availabilityStatus;
    }

    public String getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(String restaurantId) {
        this.restaurantId = restaurantId;
    }
}