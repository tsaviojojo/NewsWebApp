package com.webapp.demo.model;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class NewsReadByUserKey implements Serializable {

    @Column(name = "userId")
    long userId;

    @Column(name = "newsId")
    long newsId;

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public long getNewsId() {
        return newsId;
    }

    public void setNewsId(long newsId) {
        this.newsId = newsId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        NewsReadByUserKey that = (NewsReadByUserKey) o;
        return userId == that.userId &&
                newsId == that.newsId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, newsId);
    }
}
