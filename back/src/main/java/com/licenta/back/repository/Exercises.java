package com.licenta.back.repository;

import com.licenta.back.models.Favoritesmp;
import com.licenta.back.models.Favoriteswk;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface Exercises extends JpaRepository<Favoritesmp, Integer> {
    Optional<Favoritesmp> findById(Integer id);
    void deleteByMealPlanId(Integer mpId);
}