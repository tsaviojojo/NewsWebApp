package com.webapp.demo.model;


import javax.persistence.*;
import java.util.Set;

enum Roles {
    ADMIN,
    READER,
    PUBLISHER
}

@Entity
// The 1st two are already inserted into the table using data.sql
@SequenceGenerator(name="userIdSeq", initialValue = 3)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "userIdSeq")
    private long userId;
    private String userName;
    private String userRole;
    private String userPassword;

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    @OneToMany(mappedBy = "user")
    Set<NewsReadByUser> readNews;

    public Set<NewsReadByUser> getReadNews() {
        return readNews;
    }

    public void setReadNews(Set<NewsReadByUser> readNews) {
        this.readNews = readNews;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

}
