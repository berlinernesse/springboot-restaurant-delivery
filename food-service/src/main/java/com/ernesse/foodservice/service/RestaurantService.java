package com.ernesse.foodservice.service;

import com.ernesse.foodservice.model.Restaurant;
import com.ernesse.foodservice.repository.RestaurantRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    public Flux<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public Mono<Restaurant> getRestaurantById(String id) {
        return restaurantRepository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("Restaurant not found with id: " + id)));
    }

    public Flux<Restaurant> getRestaurantsByCity(String city) {
        return restaurantRepository.findByCity(city);
    }

    public Mono<Restaurant> addRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public Mono<Restaurant> updateRestaurant(String id, Restaurant updatedRestaurant) {
        return restaurantRepository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("Restaurant not found with id: " + id)))
                .flatMap(existingRestaurant -> {
                    existingRestaurant.setName(updatedRestaurant.getName());
                    existingRestaurant.setCity(updatedRestaurant.getCity());
                    existingRestaurant.setCuisineType(updatedRestaurant.getCuisineType());
                    existingRestaurant.setRating(updatedRestaurant.getRating());
                    return restaurantRepository.save(existingRestaurant);
                });
    }

    public Mono<Void> deleteRestaurant(String id) {
        return restaurantRepository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("Restaurant not found with id: " + id)))
                .flatMap(existingRestaurant -> restaurantRepository.delete(existingRestaurant));
    }
}