package com.licenta.back.repository;

import com.licenta.back.models.Favoritesmp;
import com.licenta.back.models.Favoriteswk;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;
import java.util.Optional;

public interface FavoritesmpInterface extends JpaRepository<Favoritesmp, Integer> {
    Optional<Favoritesmp> findById(Integer id);

    List<Favoritesmp> findByLockerId(Integer id);
    void deleteByMealPlanId(Integer mpId);
}
