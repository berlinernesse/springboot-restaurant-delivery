package com.ernesse.foodservice.controller;

import com.ernesse.foodservice.model.Restaurant;
import com.ernesse.foodservice.service.RestaurantService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/restaurants")
public class RestaurantController {

    private final RestaurantService restaurantService;

    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    @GetMapping
    public Flux<Restaurant> getAllRestaurants() {
        return restaurantService.getAllRestaurants();
    }

    @GetMapping("/{id}")
    public Mono<Restaurant> getRestaurantById(@PathVariable String id) {
        return restaurantService.getRestaurantById(id);
    }

    @GetMapping("/city/{city}")
    public Flux<Restaurant> getRestaurantsByCity(@PathVariable String city) {
        return restaurantService.getRestaurantsByCity(city);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Restaurant> addRestaurant(@Valid @RequestBody Restaurant restaurant) {
        return restaurantService.addRestaurant(restaurant);
    }

    @PutMapping("/{id}")
    public Mono<Restaurant> updateRestaurant(@PathVariable String id,
                                             @Valid @RequestBody Restaurant restaurant) {
        return restaurantService.updateRestaurant(id, restaurant);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> deleteRestaurant(@PathVariable String id) {
        return restaurantService.deleteRestaurant(id);
    }
}