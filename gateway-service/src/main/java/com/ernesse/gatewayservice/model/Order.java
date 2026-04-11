package com.ernesse.gatewayservice.model;

import java.util.List;

public class Order {
    private String id;
    private String customerId;
    private String restaurantId;
    private List<String> foodItemIds;
    private Double totalAmount;
    private String orderStatus;
    private String paymentMethod;
    private String paymentStatus;
    private String orderDate;

    public Order() {
    }

    public Order(String id, String customerId, String restaurantId, List<String> foodItemIds,
                 Double totalAmount, String orderStatus, String paymentMethod,
                 String paymentStatus, String orderDate) {
        this.id = id;
        this.customerId = customerId;
        this.restaurantId = restaurantId;
        this.foodItemIds = foodItemIds;
        this.totalAmount = totalAmount;
        this.orderStatus = orderStatus;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
        this.orderDate = orderDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public String getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(String restaurantId) {
        this.restaurantId = restaurantId;
    }

    public List<String> getFoodItemIds() {
        return foodItemIds;
    }

    public void setFoodItemIds(List<String> foodItemIds) {
        this.foodItemIds = foodItemIds;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(String orderDate) {
        this.orderDate = orderDate;
    }
}