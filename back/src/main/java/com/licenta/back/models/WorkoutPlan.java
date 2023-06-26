package com.licenta.back.models;

import com.licenta.back.user.User;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="workoutPlans")
public class WorkoutPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "difficulty")
    private String difficulty;

    @Column(name = "published")
    private boolean published;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;


    @ElementCollection
    @CollectionTable(name = "exercises", joinColumns = @JoinColumn(name = "workout_plan_id"))
    @Column(name = "exercise")
    @OrderColumn(name = "order_index")
    private List<String> exercises = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "reps", joinColumns = @JoinColumn(name = "workout_plan_id"))
    @Column(name = "reps")
    @OrderColumn(name = "order_index")
    private List<Integer> reps = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "breaks", joinColumns = @JoinColumn(name = "workout_plan_id"))
    @Column(name = "breaks")
    @OrderColumn(name = "order_index")
    private List<Integer> breaks = new ArrayList<>();

    public Integer getUserID(){
        return user.getId();
    }

    public List<Integer> getReps() {
        return reps;
    }

    public void setReps(List<Integer> reps) {
        this.reps = reps;
    }

    public List<Integer> getBreaks() {
        return breaks;
    }

    public void setBreaks(List<Integer> breaks) {
        this.breaks = breaks;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public WorkoutPlan(String title, String description, boolean published, List<String> exercises, List<Integer> reps, List<Integer> breaks, User user, String difficulty) {
        this.title = title;
        this.description = description;
        this.published = published;
        this.exercises = exercises;
        this.reps = reps;
        this.breaks = breaks;
        this.user = user;
        this.difficulty = difficulty;
    }
    public WorkoutPlan(){

    }

    public Integer getId() {
        return id;
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

    public List<String> getExercises() {
        return exercises;
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

    public void setExercises(List<String> exercises) {
        this.exercises = exercises;
    }

    @Override
    public String toString() {
        return "WorkoutPlan{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", published=" + published +
                '}';
    }
}
