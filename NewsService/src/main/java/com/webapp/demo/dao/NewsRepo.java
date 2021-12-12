package com.webapp.demo.dao;

import com.webapp.demo.model.News;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NewsRepo extends JpaRepository<News, Long> {

    @Query(value="SELECT * FROM news where news_id not in (select news_id from news_read_by_user where user_id = ?1)", nativeQuery = true)
    List<News> findAllUnreadNews(long userId);
}
