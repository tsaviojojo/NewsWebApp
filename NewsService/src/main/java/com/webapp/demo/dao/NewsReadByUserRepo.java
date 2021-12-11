package com.webapp.demo.dao;

import com.webapp.demo.model.NewsReadByUser;
import com.webapp.demo.model.NewsReadByUserKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsReadByUserRepo extends JpaRepository<NewsReadByUser, Long> {

}
