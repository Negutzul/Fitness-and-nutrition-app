package com.licenta.back.models;

import com.licenta.back.user.User;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="mealPlans")
public class MealPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "published")
    private boolean published;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;


    @Column(name = "bodyType")
    private String bodyType;

    public String getBodyType() {
        return bodyType;
    }

    public void setBodyType(String bodyType) {
        this.bodyType = bodyType;
    }

    public MealPlan(String title, String description, boolean published, User user, String bodyType) {
        this.title = title;
        this.description = description;
        this.published = published;
        this.user = user;
        this.bodyType = bodyType;
    }
    public MealPlan(){

    }

    public Integer getId() {
        return id;
    }

    public Integer getUserID(){
        return user.getId();
    }
    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public boolean isPublished() {
        return published;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

    @Override
    public String toString() {
        return "MealPlan{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", published=" + published +
                '}';
    }
}
