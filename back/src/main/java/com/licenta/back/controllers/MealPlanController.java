package com.licenta.back.controllers;

import com.licenta.back.models.MealPlan;
import com.licenta.back.repository.MealPlanRepository;
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



}
