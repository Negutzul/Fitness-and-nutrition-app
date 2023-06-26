package com.licenta.back.repository;

import com.licenta.back.models.Locker;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LockerRepository extends JpaRepository<Locker, Integer> {
    Optional<Locker> findById(Integer id);
    Locker findByUserId(Integer userId);
    void deleteByUserId(Integer userId);

}
