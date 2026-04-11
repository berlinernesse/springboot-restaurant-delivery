package com.ernesse.foodservice.controller;

import com.ernesse.foodservice.model.FoodItem;
import com.ernesse.foodservice.service.FoodItemService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/fooditems")
public class FoodItemController {

    private final FoodItemService foodItemService;

    public FoodItemController(FoodItemService foodItemService) {
        this.foodItemService = foodItemService;
    }

    @GetMapping
    public Flux<FoodItem> getAllFoodItems() {
        return foodItemService.getAllFoodItems();
    }

    @GetMapping("/{id}")
    public Mono<FoodItem> getFoodItemById(@PathVariable String id) {
        return foodItemService.getFoodItemById(id);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public Flux<FoodItem> getFoodItemsByRestaurantId(@PathVariable String restaurantId) {
        return foodItemService.getFoodItemsByRestaurantId(restaurantId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<FoodItem> addFoodItem(@Valid @RequestBody FoodItem foodItem) {
        return foodItemService.addFoodItem(foodItem);
    }

    @PutMapping("/{id}")
    public Mono<FoodItem> updateFoodItem(@PathVariable String id,
                                         @Valid @RequestBody FoodItem foodItem) {
        return foodItemService.updateFoodItem(id, foodItem);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> deleteFoodItem(@PathVariable String id) {
        return foodItemService.deleteFoodItem(id);
    }
}