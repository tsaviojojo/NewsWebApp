package com.webapp.demo.model;

import javax.persistence.*;
import java.util.Date;
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
    private String newsAuthor;
    private Date newsPublished;
    private Date newsValidFrom;
    private Date newsValidTo;
    @Column(columnDefinition="BOOLEAN DEFAULT false")
    private boolean newsSavedAsDraft;

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

    public Date getNewsPublished() {
        return newsPublished;
    }

    public void setNewsPublished(Date newsPublished) {
        this.newsPublished = newsPublished;
    }

    public Date getNewsValidFrom() {
        return newsValidFrom;
    }

    public void setNewsValidFrom(Date newsValidFrom) {
        this.newsValidFrom = newsValidFrom;
    }

    public Date getNewsValidTo() {
        return newsValidTo;
    }

    public void setNewsValidTo(Date newsValidTo) {
        this.newsValidTo = newsValidTo;
    }

    public boolean isNewsSavedAsDraft() {
        return newsSavedAsDraft;
    }

    public void setNewsSavedAsDraft(boolean newsSavedAsDraft) {
        this.newsSavedAsDraft = newsSavedAsDraft;
    }

    public String getNewsAuthor() {
        return newsAuthor;
    }

    public void setNewsAuthor(String newsAuthor) {
        this.newsAuthor = newsAuthor;
    }
}
