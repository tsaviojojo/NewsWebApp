package com.webapp.demo.model;

import javax.persistence.*;
import java.util.Set;

@Entity
// already inserted into the table using data.sql
@SequenceGenerator(name="newIdSeq", initialValue = 106)
public class News {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "newIdSeq")
    private long newsId;
    private String newsTitle;
    private String newsText;

    @OneToMany(mappedBy = "news")
    Set<NewsReadByUser> readNews;

    public long getNewsId() {
        return newsId;
    }

    public void setNewsId(long newsId) {
        this.newsId = newsId;
    }

    public Set<NewsReadByUser> getReadNews() {
        return readNews;
    }

    public void setReadNews(Set<NewsReadByUser> readNews) {
        this.readNews = readNews;
    }

    public long getNewsID() {
        return newsId;
    }

    public void setNewsID(long newsID) {
        this.newsId = newsId;
    }

    public String getNewsTitle() {
        return newsTitle;
    }

    public void setNewsTitle(String newsTitle) {
        this.newsTitle = newsTitle;
    }

    public String getNewsText() {
        return newsText;
    }

    public void setNewsText(String newsText) {
        this.newsText = newsText;
    }

}
