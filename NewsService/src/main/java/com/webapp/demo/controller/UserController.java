package com.webapp.demo.controller;

import com.webapp.demo.dao.UserRepo;
import com.webapp.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    UserRepo userRepository;

    @GetMapping("/user")
    public List<User> getUser() {
        return userRepository.findAll();
    }

    @GetMapping("/user/{userId}")
    public Optional<User> getUser(@PathVariable("userId") long userId) {
        return userRepository.findById(userId);
    }

    @PostMapping("/user")
    void addUser(User user) {
        userRepository.save(user);
    }
}
