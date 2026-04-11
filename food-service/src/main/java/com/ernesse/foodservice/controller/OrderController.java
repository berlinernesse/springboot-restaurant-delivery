package com.ernesse.foodservice.controller;

import com.ernesse.foodservice.model.Order;
import com.ernesse.foodservice.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public Flux<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/{id}")
    public Mono<Order> getOrderById(@PathVariable String id) {
        return orderService.getOrderById(id);
    }

    @GetMapping("/customer/{customerId}")
    public Flux<Order> getOrdersByCustomerId(@PathVariable String customerId) {
        return orderService.getOrdersByCustomerId(customerId);
    }

    @GetMapping("/restaurant/{restaurantId}")
    public Flux<Order> getOrdersByRestaurantId(@PathVariable String restaurantId) {
        return orderService.getOrdersByRestaurantId(restaurantId);
    }

    @GetMapping("/status/{orderStatus}")
    public Flux<Order> getOrdersByStatus(@PathVariable String orderStatus) {
        return orderService.getOrdersByStatus(orderStatus);
    }

    @GetMapping("/payment/{paymentStatus}")
    public Flux<Order> getOrdersByPaymentStatus(@PathVariable String paymentStatus) {
        return orderService.getOrdersByPaymentStatus(paymentStatus);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Order> addOrder(@Valid @RequestBody Order order) {
        return orderService.addOrder(order);
    }

    @PutMapping("/{id}")
    public Mono<Order> updateOrder(@PathVariable String id,
                                   @Valid @RequestBody Order order) {
        return orderService.updateOrder(id, order);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> deleteOrder(@PathVariable String id) {
        return orderService.deleteOrder(id);
    }
}