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
    private String newsContent;

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

    public String getNewsTitle() {
        return newsTitle;
    }

    public void setNewsTitle(String newsTitle) {
        this.newsTitle = newsTitle;
    }

    public String getNewsContent() {
        return newsContent;
    }

    public void setNewsContent(String newsContent) {
        this.newsContent = newsContent;
    }

}
