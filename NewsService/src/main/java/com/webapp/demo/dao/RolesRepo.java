package com.webapp.demo.dao;

import com.webapp.demo.model.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface RolesRepo extends JpaRepository<Roles, String> {

}
