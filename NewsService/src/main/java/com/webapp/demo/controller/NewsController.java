package com.webapp.demo.controller;

import com.webapp.demo.dao.NewsReadByUserRepo;
import com.webapp.demo.dao.NewsRepo;
import com.webapp.demo.dao.RolesRepo;
import com.webapp.demo.dao.UserRepo;
import com.webapp.demo.model.News;
import com.webapp.demo.model.NewsReadByUser;
import com.webapp.demo.model.Roles;
import com.webapp.demo.model.User;
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

    @Autowired
    NewsReadByUserRepo newsReadByUserRepo;

    @GetMapping("/news")
    public List<News> getNews() {
        return newsRepository.findAll();
    }

    @GetMapping("/news/{userId}")
    public List<News> getNews(@PathVariable("userId") String userName) {
        List<User> userList = userRepo.findAll();
        long userId = 0;
        for(User user: userList){
            if(user.getUserName().equals(userName)){
                userId= user.getUserId();
            }
        }
        return newsRepository.findAllUnreadNews(userId);
    }

    @GetMapping("/newsread/{userId}")
    public List<News> getReadNews(@PathVariable("userId") String userName) {
        List<User> userList = userRepo.findAll();
        long userId = 0;
        for(User user: userList){
            if(user.getUserName().equals(userName)){
                userId= user.getUserId();
            }
        }
        return newsRepository.findAllReadNews(userId);
    }

    @PostMapping("/news")
    void addNews(@RequestBody News news) {
        newsRepository.save(news);
    }

    @DeleteMapping("/news/{newsId}")
    void deleteNews(@PathVariable("newsId") long newsId) {
        List<User> userList = userRepo.findAll();
        NewsReadByUser newsReadByUser = new NewsReadByUser();
        newsReadByUser.setNews(newsRepository.findById(newsId).orElse(new News()));
        for(User user: userList){
            newsReadByUser.setUser(user);
            newsReadByUserRepo.delete(newsReadByUser);
        }
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
