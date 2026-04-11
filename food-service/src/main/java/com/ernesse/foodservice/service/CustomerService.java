package com.ernesse.foodservice.service;

import com.ernesse.foodservice.model.Customer;
import com.ernesse.foodservice.repository.CustomerRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public Flux<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Mono<Customer> getCustomerById(String id) {
        return customerRepository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("Customer not found with id: " + id)));
    }

    public Mono<Customer> getCustomerByEmail(String email) {
        return customerRepository.findByEmail(email)
                .switchIfEmpty(Mono.error(new RuntimeException("Customer not found with email: " + email)));
    }

    public Mono<Customer> addCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public Mono<Customer> updateCustomer(String id, Customer updatedCustomer) {
        return customerRepository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("Customer not found with id: " + id)))
                .flatMap(existingCustomer -> {
                    existingCustomer.setName(updatedCustomer.getName());
                    existingCustomer.setEmail(updatedCustomer.getEmail());
                    existingCustomer.setPhoneNumber(updatedCustomer.getPhoneNumber());
                    existingCustomer.setAddress(updatedCustomer.getAddress());
                    return customerRepository.save(existingCustomer);
                });
    }

    public Mono<Void> deleteCustomer(String id) {
        return customerRepository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("Customer not found with id: " + id)))
                .flatMap(existingCustomer -> customerRepository.delete(existingCustomer));
    }
}