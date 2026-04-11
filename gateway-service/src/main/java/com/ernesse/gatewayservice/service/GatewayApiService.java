package com.ernesse.gatewayservice.service;

import com.ernesse.gatewayservice.model.FoodItem;
import com.ernesse.gatewayservice.model.Order;
import com.ernesse.gatewayservice.model.Restaurant;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class GatewayApiService {

    private final WebClient webClient;

    public GatewayApiService(WebClient webClient) {
        this.webClient = webClient;
    }

    public Flux<Restaurant> getAllRestaurants() {
        return webClient.get()
                .uri("/restaurants")
                .retrieve()
                .bodyToFlux(Restaurant.class);
    }

    public Mono<Restaurant> getRestaurantById(String id) {
        return webClient.get()
                .uri("/restaurants/{id}", id)
                .retrieve()
                .bodyToMono(Restaurant.class);
    }

    public Flux<FoodItem> getAllFoodItems() {
        return webClient.get()
                .uri("/fooditems")
                .retrieve()
                .bodyToFlux(FoodItem.class);
    }

    public Flux<FoodItem> getFoodItemsByRestaurantId(String restaurantId) {
        return webClient.get()
                .uri("/fooditems/restaurant/{restaurantId}", restaurantId)
                .retrieve()
                .bodyToFlux(FoodItem.class);
    }

    public Flux<Order> getAllOrders() {
        return webClient.get()
                .uri("/orders")
                .retrieve()
                .bodyToFlux(Order.class);
    }

    public Mono<Order> createOrder(Order order) {
        return webClient.post()
                .uri("/orders")
                .bodyValue(order)
                .retrieve()
                .bodyToMono(Order.class);
    }
}