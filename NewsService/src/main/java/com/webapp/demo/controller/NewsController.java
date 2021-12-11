package com.webapp.demo.controller;

import com.webapp.demo.dao.NewsRepo;
import com.webapp.demo.dao.RolesRepo;
import com.webapp.demo.dao.UserRepo;
import com.webapp.demo.model.News;
import com.webapp.demo.model.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class NewsController {

    @Autowired
    NewsRepo newsRepository;

    @Autowired
    RolesRepo rolesRepo;

    @Autowired
    UserRepo userRepo;

    @GetMapping("/news")
    public List<News> getNews() {
        return newsRepository.findAll();
    }

    /*@GetMapping("/news/{userId}")
    public List<News> getUser(@PathVariable("userId") String userId) {
        // had to be changed.. getting userName and not userId.
        // find the userId using userName and the role assigned to it
        Roles roles = rolesRepo.findById(userId).orElse(new Roles());
        List<News> newsList = new ArrayList<>();
        if(roles.isViewNews() && roles.isUpdateNews()){
            newsList = newsRepository.findAll();
        }
        if(roles.isOnlyUpdateOwnNews()){
            // return only his news and also his saved news
        }
        if(roles.isViewNews() && !roles.isOnlyUpdateOwnNews() && !roles.isUpdateNews()){
            // return all news but not the saved news

        }
        return newsList;
    }*/

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
        newsRepository.findById(newsId)
                .map(tempNews -> {
                    tempNews.setNewsTitle(news.getNewsTitle());
                    tempNews.setNewsContent(news.getNewsContent());
                    tempNews.setNewsPublished(news.getNewsPublished());
                    tempNews.setNewsValidFrom(news.getNewsValidFrom());
                    tempNews.setNewsValidTo(news.getNewsValidTo());
                    tempNews.setNewsSavedAsDraft(news.isNewsSavedAsDraft());
                    tempNews.setNewsAuthor(news.getNewsAuthor());
                    return newsRepository.save(tempNews);
                })
                .orElseGet(() -> {
                    news.setNewsId(newsId);
                    return newsRepository.save(news);
                });
    }
}
