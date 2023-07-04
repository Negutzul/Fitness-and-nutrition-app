package com.licenta.back.controllers;

import com.licenta.back.models.MealPlan;
import com.licenta.back.models.WorkoutPlan;
import com.licenta.back.repository.MealPlanRepository;
import com.licenta.back.user.Role;
import com.licenta.back.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/mealPlans")
public class MealPlanController {
    @Autowired
    MealPlanRepository mealPlanRepository;

    @GetMapping("/listMealPlans")
    public ResponseEntity<List<MealPlan>> getAllMealPlans(@RequestParam(required = false) String title) {
        try {
            List<MealPlan> mealPlans = new ArrayList<MealPlan>();

            if (title == null)
                mealPlanRepository.findAll().forEach(mealPlan -> mealPlans.add(mealPlan));
            else
                mealPlanRepository.findByTitleContaining(title).forEach(mealPlan -> mealPlans.add(mealPlan));

            if (mealPlans.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(mealPlans, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("ADMIN")
    @PostMapping("/addMealPlan")
    public ResponseEntity<String> createMealPlan(@RequestBody MealPlan mealPlan) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) authentication.getPrincipal();

            // Save mealPlan without recipes to generate an ID
            if(!(mealPlan.getBodyType().equals("ectomorph") || mealPlan.getBodyType().equals("mesomorph") || mealPlan.getBodyType().equals("endomorph")))
                throw new Exception("not a valid body type");
            MealPlan _mealPlan = mealPlanRepository
                    .save(new MealPlan(mealPlan.getTitle(), mealPlan.getDescription(), false, user, mealPlan.getBodyType()));

            return new ResponseEntity<>("meal plan added succesfuly", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/changeMealPlan/{id}")
    public ResponseEntity<MealPlan> updateWorkout(@PathVariable("id") Integer id, @RequestBody MealPlan mealPlan) {
        Optional<MealPlan> mealData = mealPlanRepository.findById(id);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        if (mealData.isPresent()) {
            if(user.getRole().equals(Role.ADMIN) || (user.getRole().equals(Role.TRAINER) && mealData.get().getUserID() == user.getId())) {
                MealPlan _mealPlan = mealData.get();
                _mealPlan.setTitle(mealPlan.getTitle());
                _mealPlan.setDescription(mealPlan.getDescription());
                _mealPlan.setBodyType(mealPlan.getBodyType());
                _mealPlan.setPublished(mealPlan.isPublished());
                return new ResponseEntity<>(mealPlanRepository.save(_mealPlan), HttpStatus.OK);
            }else return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/deleteMealPlan/{id}")
    public ResponseEntity<HttpStatus> deleteMealPlan(@PathVariable("id") Integer id) {
        Optional<MealPlan> mealData = mealPlanRepository.findById(id);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();

        if (mealData.isPresent()) {
            if(user.getRole().equals(Role.ADMIN) || (user.getRole().equals(Role.TRAINER) && mealData.get().getUserID() == user.getId())) {
                mealPlanRepository.deleteById(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

}
