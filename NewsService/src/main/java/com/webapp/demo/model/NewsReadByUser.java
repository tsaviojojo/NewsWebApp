package com.webapp.demo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Date;

@Entity
public class NewsReadByUser {

    @EmbeddedId
    NewsReadByUserKey id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "userId")
    @JsonIgnore
    private User user;

    @ManyToOne
    @MapsId("newsId")
    @JoinColumn(name = "newsId")
    @JsonIgnore
    private News news;

    private Date publishedDate;


    public Date getPublishedDate() {
        return publishedDate;
    }

    public void setPublishedDate(Date publishedDate) {
        this.publishedDate = publishedDate;
    }

    public NewsReadByUserKey getId() {
        return id;
    }

    public void setId(NewsReadByUserKey id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public News getNews() {
        return news;
    }

    public void setNews(News news) {
        this.news = news;
    }

}
