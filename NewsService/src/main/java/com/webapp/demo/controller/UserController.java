package com.webapp.demo.controller;

import com.webapp.demo.dao.RolesRepo;
import com.webapp.demo.dao.UserRepo;
import com.webapp.demo.model.News;
import com.webapp.demo.model.Roles;
import com.webapp.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    @Autowired
    UserRepo userRepository;

    @Autowired
    RolesRepo roleRepository;

    @GetMapping("/user")
    public List<User> getUser() {
        return userRepository.findAll();
    }

    @GetMapping("/user/{userId}")
    public Optional<User> getUser(@PathVariable("userId") long userId) {
        return userRepository.findById(userId);
    }

    @PostMapping("/user")
    void addUser(@RequestBody User user) {
        user.setRoles(roleRepository.findById(user.getUserRole()).orElse(new Roles()));
        userRepository.save(user);
    }

    @PutMapping("/user/{userId}")
    void updateNews(@PathVariable("userId") long userId,@RequestBody User user) {
        userRepository.findById(userId)
                .map(tempUser -> {
                    tempUser.setUserName(user.getUserName());
                    tempUser.setUserRole(user.getUserRole());
                    tempUser.setRoles(roleRepository.findById(user.getUserRole()).orElse(new Roles()));
                    return userRepository.save(tempUser);
                })
                .orElseGet(() -> {
                    user.setUserId(userId);
                    return userRepository.save(user);
                });
    }
}
