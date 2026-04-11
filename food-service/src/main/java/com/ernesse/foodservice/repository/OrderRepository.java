package com.ernesse.foodservice.repository;

import com.ernesse.foodservice.model.Order;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

public interface OrderRepository extends ReactiveMongoRepository<Order, String> {
    Flux<Order> findByCustomerId(String customerId);
    Flux<Order> findByRestaurantId(String restaurantId);
    Flux<Order> findByOrderStatus(String orderStatus);
    Flux<Order> findByPaymentStatus(String paymentStatus);
}