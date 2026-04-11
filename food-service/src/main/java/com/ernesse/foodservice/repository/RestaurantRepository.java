package com.ernesse.foodservice.repository;

import com.ernesse.foodservice.model.Restaurant;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

public interface RestaurantRepository extends ReactiveMongoRepository<Restaurant, String> {
    Flux<Restaurant> findByCity(String city);
}