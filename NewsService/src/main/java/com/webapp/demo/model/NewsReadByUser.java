package com.webapp.demo.model;

import javax.persistence.*;
import java.util.Set;

@Entity
public class NewsReadByUser {

    @EmbeddedId
    NewsReadByUserKey id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @MapsId("newsId")
    @JoinColumn(name = "newsId")
    private News news;

    private boolean isRead;

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

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
    }
}
