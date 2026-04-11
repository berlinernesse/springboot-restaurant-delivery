package com.ernesse.foodservice.service;

import com.ernesse.foodservice.model.FoodItem;
import com.ernesse.foodservice.repository.FoodItemRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class FoodItemService {

    private final FoodItemRepository foodItemRepository;

    public FoodItemService(FoodItemRepository foodItemRepository) {
        this.foodItemRepository = foodItemRepository;
    }

    public Flux<FoodItem> getAllFoodItems() {
        return foodItemRepository.findAll();
    }

    public Mono<FoodItem> getFoodItemById(String id) {
        return foodItemRepository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("Food item not found with id: " + id)));
    }

    public Flux<FoodItem> getFoodItemsByRestaurantId(String restaurantId) {
        return foodItemRepository.findByRestaurantId(restaurantId);
    }

    public Mono<FoodItem> addFoodItem(FoodItem foodItem) {
        return foodItemRepository.save(foodItem);
    }

    public Mono<FoodItem> updateFoodItem(String id, FoodItem updatedFoodItem) {
        return foodItemRepository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("Food item not found with id: " + id)))
                .flatMap(existingFoodItem -> {
                    existingFoodItem.setName(updatedFoodItem.getName());
                    existingFoodItem.setCategory(updatedFoodItem.getCategory());
                    existingFoodItem.setPrice(updatedFoodItem.getPrice());
                    existingFoodItem.setAvailabilityStatus(updatedFoodItem.getAvailabilityStatus());
                    existingFoodItem.setRestaurantId(updatedFoodItem.getRestaurantId());
                    return foodItemRepository.save(existingFoodItem);
                });
    }

    public Mono<Void> deleteFoodItem(String id) {
        return foodItemRepository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("Food item not found with id: " + id)))
                .flatMap(existingFoodItem -> foodItemRepository.delete(existingFoodItem));
    }
}