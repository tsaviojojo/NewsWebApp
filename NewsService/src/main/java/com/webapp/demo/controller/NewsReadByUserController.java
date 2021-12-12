package com.webapp.demo.controller;

import com.webapp.demo.dao.NewsReadByUserRepo;
import com.webapp.demo.dao.NewsRepo;
import com.webapp.demo.dao.RolesRepo;
import com.webapp.demo.dao.UserRepo;
import com.webapp.demo.model.News;
import com.webapp.demo.model.NewsReadByUser;
import com.webapp.demo.model.NewsReadByUserKey;
import com.webapp.demo.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class NewsReadByUserController {

    @Autowired
    NewsReadByUserRepo newsReadByUserRepo;

    @Autowired
    NewsRepo newsRepository;

    @Autowired
    UserRepo userRepo;

    @PostMapping("/newsRead/{userName}")
    void addNews(@RequestBody News news,@PathVariable("userName") String userName) {

        NewsReadByUser newsReadByUser = new NewsReadByUser();
        NewsReadByUserKey newsReadByUserKey = new NewsReadByUserKey();
        newsReadByUserKey.setNewsId(news.getNewsId());

        newsReadByUser.setId(newsReadByUserKey);
        newsReadByUser.setNews(news);
        List<User> userList = userRepo.findAll();
        for(User user:userList) {
            if (user.getUserName().equals(userName)) {
                newsReadByUser.setUser(user);
                newsReadByUserKey.setUserId(user.getUserId());
            }
        }

        newsReadByUserRepo.save(newsReadByUser);
    }

    @GetMapping("/newsRead/{userName}/{newsId}")
    public boolean getNewsReadStatus(@PathVariable("userName") String userName,@PathVariable long newsId) {
        System.out.println(newsId);

        NewsReadByUserKey newsReadByUserKey = new NewsReadByUserKey();
        newsReadByUserKey.setNewsId(newsId);
        List<User> userList = userRepo.findAll();
        for(User user:userList) {
            if (user.getUserName().equals(userName)) {
                newsReadByUserKey.setUserId(user.getUserId());
            }
        }
        if(newsReadByUserRepo.findById(newsReadByUserKey).isPresent()) {
            return true;
        }
        return false;
    }
}
