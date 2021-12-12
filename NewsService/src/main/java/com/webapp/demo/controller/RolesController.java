package com.webapp.demo.controller;

import com.webapp.demo.dao.RolesRepo;
import com.webapp.demo.model.Roles;
import com.webapp.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.management.relation.Role;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class RolesController {

    @Autowired
    RolesRepo roleRepository;

    @GetMapping("/role")
    public List<Roles> getRole() {
        return roleRepository.findAll();
    }

    @GetMapping("/role/{roleTitle}")
    public Optional<Roles> getUser(@PathVariable("roleTitle") String roleTitle) {
        return roleRepository.findById(roleTitle);
    }

    @PostMapping("/role")
    void addRole(@RequestBody Roles roles) {
        roleRepository.save(roles);
    }

}
