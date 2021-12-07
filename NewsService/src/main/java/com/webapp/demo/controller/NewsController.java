package com.webapp.demo.controller;

import com.webapp.demo.dao.NewsRepo;
import com.webapp.demo.model.News;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class NewsController {

    @Autowired
    NewsRepo newsRepository;

    @GetMapping("/news")
    public List<News> getNews() {
        return newsRepository.findAll();
    }

    @PostMapping("/news")
    void addNews(@RequestBody News news) {
        newsRepository.save(news);
    }

    @DeleteMapping("/news/{newsId}")
    void deleteNews(@PathVariable("newsId") long newsId) {
        newsRepository.deleteById(newsId);
    }

    @PutMapping("/news/{newsId}")
    void updateNews(@PathVariable("newsId") long newsId,@RequestBody News news) {
        System.out.println(newsId);
        System.out.println(news.getNewsTitle());
        System.out.println(news.getNewsContent());
        newsRepository.findById(newsId)
                .map(tempNews -> {
                    tempNews.setNewsTitle(news.getNewsTitle());
                    tempNews.setNewsContent(news.getNewsContent());
                    return newsRepository.save(tempNews);
                })
                .orElseGet(() -> {
                    news.setNewsId(newsId);
                    return newsRepository.save(news);
                });
    }
}
