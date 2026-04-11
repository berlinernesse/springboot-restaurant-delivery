package com.ernesse.foodservice.service;

import com.ernesse.foodservice.model.Order;
import com.ernesse.foodservice.repository.OrderRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Flux<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Mono<Order> getOrderById(String id) {
        return orderRepository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("Order not found with id: " + id)));
    }

    public Flux<Order> getOrdersByCustomerId(String customerId) {
        return orderRepository.findByCustomerId(customerId);
    }

    public Flux<Order> getOrdersByRestaurantId(String restaurantId) {
        return orderRepository.findByRestaurantId(restaurantId);
    }

    public Flux<Order> getOrdersByStatus(String orderStatus) {
        return orderRepository.findByOrderStatus(orderStatus);
    }

    public Flux<Order> getOrdersByPaymentStatus(String paymentStatus) {
        return orderRepository.findByPaymentStatus(paymentStatus);
    }

    public Mono<Order> addOrder(Order order) {
        return orderRepository.save(order);
    }

    public Mono<Order> updateOrder(String id, Order updatedOrder) {
        return orderRepository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("Order not found with id: " + id)))
                .flatMap(existingOrder -> {
                    existingOrder.setCustomerId(updatedOrder.getCustomerId());
                    existingOrder.setRestaurantId(updatedOrder.getRestaurantId());
                    existingOrder.setFoodItemIds(updatedOrder.getFoodItemIds());
                    existingOrder.setTotalAmount(updatedOrder.getTotalAmount());
                    existingOrder.setOrderStatus(updatedOrder.getOrderStatus());
                    existingOrder.setPaymentMethod(updatedOrder.getPaymentMethod());
                    existingOrder.setPaymentStatus(updatedOrder.getPaymentStatus());
                    existingOrder.setOrderDate(updatedOrder.getOrderDate());
                    return orderRepository.save(existingOrder);
                });
    }

    public Mono<Void> deleteOrder(String id) {
        return orderRepository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("Order not found with id: " + id)))
                .flatMap(existingOrder -> orderRepository.delete(existingOrder));
    }
}