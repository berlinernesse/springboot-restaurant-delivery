package com.ernesse.gatewayservice.controller;

import com.ernesse.gatewayservice.model.FoodItem;
import com.ernesse.gatewayservice.model.Order;
import com.ernesse.gatewayservice.model.Restaurant;
import com.ernesse.gatewayservice.model.Customer;
import org.springframework.web.bind.annotation.PutMapping;
import com.ernesse.gatewayservice.service.GatewayApiService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api")

public class GatewayController {

    private final GatewayApiService gatewayApiService;

    public GatewayController(GatewayApiService gatewayApiService) {
        this.gatewayApiService = gatewayApiService;
    }

    @GetMapping("/restaurants")
    public Flux<Restaurant> getAllRestaurants() {
        return gatewayApiService.getAllRestaurants();
    }

    @GetMapping("/restaurants/{id}")
    public Mono<Restaurant> getRestaurantById(@PathVariable String id) {
        return gatewayApiService.getRestaurantById(id);
    }

    @GetMapping("/fooditems")
    public Flux<FoodItem> getAllFoodItems() {
        return gatewayApiService.getAllFoodItems();
    }

    @GetMapping("/fooditems/restaurant/{restaurantId}")
    public Flux<FoodItem> getFoodItemsByRestaurantId(@PathVariable String restaurantId) {
        return gatewayApiService.getFoodItemsByRestaurantId(restaurantId);
    }

    @GetMapping("/orders")
    public Flux<Order> getAllOrders() {
        return gatewayApiService.getAllOrders();
    }

    @PostMapping("/orders")
    public Mono<Order> createOrder(@RequestBody Order order) {
        return gatewayApiService.createOrder(order);
    }

    @GetMapping("/customers/{id}")
    public Mono<Customer> getCustomerById(@PathVariable String id) {
        return gatewayApiService.getCustomerById(id);
    }

    @GetMapping("/customers/email/{email}")
    public Mono<Customer> getCustomerByEmail(@PathVariable String email) {
        return gatewayApiService.getCustomerByEmail(email);
    }

    @PostMapping("/customers")
    public Mono<Customer> createCustomer(@RequestBody Customer customer) {
        return gatewayApiService.createCustomer(customer);
    }

    @PutMapping("/customers/{id}")
    public Mono<Customer> updateCustomer(@PathVariable String id, @RequestBody Customer customer) {
        return gatewayApiService.updateCustomer(id, customer);
    }
}