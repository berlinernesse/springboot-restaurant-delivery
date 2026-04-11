package com.ernesse.foodservice.repository;

import com.ernesse.foodservice.model.FoodItem;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

public interface FoodItemRepository extends ReactiveMongoRepository<FoodItem, String> {
    Flux<FoodItem> findByRestaurantId(String restaurantId);
}