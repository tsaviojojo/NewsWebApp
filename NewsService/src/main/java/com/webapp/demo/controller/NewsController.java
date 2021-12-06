package com.webapp.demo.controller;

import com.webapp.demo.dao.NewsRepo;
import com.webapp.demo.model.News;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class NewsController {

    @Autowired
    NewsRepo newsRepository;

    @GetMapping("/news")
    public List<News> getUser() {
        return newsRepository.findAll();
    }

    @PostMapping("/news")
    void addNews(News news) {
        newsRepository.save(news);
    }
}
