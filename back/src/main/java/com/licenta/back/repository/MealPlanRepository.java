package com.licenta.back.repository;

import com.licenta.back.models.MealPlan;
import com.licenta.back.models.WorkoutPlan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MealPlanRepository extends JpaRepository<MealPlan, Integer> {
    List<MealPlan> findByPublished(boolean published);

    List<MealPlan> findByTitleContaining(String title);

    List<MealPlan> findByUserId(Integer id);
    void deleteByUserId(Integer userId);


}
