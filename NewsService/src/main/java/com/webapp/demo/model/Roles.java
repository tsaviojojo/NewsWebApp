package com.webapp.demo.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@SequenceGenerator(name="roleIdSeq", initialValue = 4)
public class Roles {

    @Id
    private String roleTitle;
    private boolean viewNews;
    private boolean createNews;
    private boolean updateNews;
    private boolean onlyUpdateOwnNews;
    private boolean deleteNews;

    @OneToMany(mappedBy = "roles")
    private Set<User> userSet;

    public boolean isCreateNews() {
        return createNews;
    }

    public void setCreateNews(boolean createNews) {
        this.createNews = createNews;
    }

    public String getRoleTitle() {
        return roleTitle;
    }

    public void setRoleTitle(String roleTitle) {
        this.roleTitle = roleTitle;
    }

    public boolean isViewNews() {
        return viewNews;
    }

    public void setViewNews(boolean viewNews) {
        this.viewNews = viewNews;
    }

    public boolean isUpdateNews() {
        return updateNews;
    }

    public void setUpdateNews(boolean updateNews) {
        this.updateNews = updateNews;
    }

    public boolean isOnlyUpdateOwnNews() {
        return onlyUpdateOwnNews;
    }

    public void setOnlyUpdateOwnNews(boolean onlyUpdateOwnNews) {
        this.onlyUpdateOwnNews = onlyUpdateOwnNews;
    }

    public boolean isDeleteNews() {
        return deleteNews;
    }

    public void setDeleteNews(boolean deleteNews) {
        this.deleteNews = deleteNews;
    }
}
