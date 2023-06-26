package com.licenta.back.repository;

import com.licenta.back.models.Favoritesmp;
import com.licenta.back.models.Favoriteswk;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.Optional;

public interface FavoriteswkInterface extends JpaRepository<Favoriteswk, Integer> {
    Optional<Favoriteswk> findById(Integer id);


    List<Favoriteswk> findByLockerId(Integer id);

    void deleteByWorkoutPlanId(Integer mpId);
}
