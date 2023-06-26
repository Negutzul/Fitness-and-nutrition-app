package com.licenta.back.repository;

import com.licenta.back.models.MealPlan;
import com.licenta.back.models.WorkoutPlan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkoutRepository extends JpaRepository<WorkoutPlan, Integer> {
        List<WorkoutPlan> findByPublished(boolean published);

        List<WorkoutPlan> findByTitleContaining(String title);

        List<WorkoutPlan> findByDifficulty(String difficulty);

        List<WorkoutPlan> findByUserId(Integer id);
        void deleteByUserId(Integer userId);

}
