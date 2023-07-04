package com.licenta.back.controllers;

import com.licenta.back.models.Favoriteswk;
import com.licenta.back.models.WorkoutPlan;
import com.licenta.back.repository.WorkoutRepository;
import com.licenta.back.repository.FavoriteswkInterface;
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
@RequestMapping("/api/workouts")
public class WorkoutController {

    @Autowired
    WorkoutRepository workoutRepository;

    @GetMapping("/listWorkouts")
    public ResponseEntity<List<WorkoutPlan>> getAllWorkouts(@RequestParam(required = false) String title) {
        try {
            List<WorkoutPlan> workoutPlans = new ArrayList<WorkoutPlan>();

            if (title == null)
                workoutRepository.findAll().forEach(workoutPlans::add);
            else
                workoutRepository.findByTitleContaining(title).forEach(workoutPlans::add);

            if (workoutPlans.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(workoutPlans, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/listWorkouts/{id}")
    public ResponseEntity<WorkoutPlan> getWorkoutById(@PathVariable("id") Integer id) {
        Optional<WorkoutPlan> workoutData = workoutRepository.findById(id);
        if (workoutData.isPresent()) {
            return new ResponseEntity<>(workoutData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping("/addWorkouts")
    public ResponseEntity<WorkoutPlan> createWorkout(@RequestBody WorkoutPlan workoutPlan) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) authentication.getPrincipal();
            if(user.getRole().equals(Role.ADMIN) || user.getRole().equals(Role.TRAINER)) {
                if (!(workoutPlan.getDifficulty().equals("easy") || workoutPlan.getDifficulty().equals("medium") || workoutPlan.getDifficulty().equals("hard"))) {
                    throw new Exception("Not a valid difficulty");
                }
                WorkoutPlan _workoutPlan = workoutRepository
                        .save(new WorkoutPlan(workoutPlan.getTitle(), workoutPlan.getDescription(), false, workoutPlan.getExercises(),
                                workoutPlan.getReps(), workoutPlan.getBreaks(), user, workoutPlan.getDifficulty()));
                return new ResponseEntity<>(_workoutPlan, HttpStatus.CREATED);
            }
            else throw new Exception("Not a valid difficulty");
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/changeWorkouts/{id}")
    public ResponseEntity<WorkoutPlan> updateWorkout(@PathVariable("id") Integer id, @RequestBody WorkoutPlan workoutPlan) {
        Optional<WorkoutPlan> workoutData = workoutRepository.findById(id);
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        if (workoutData.isPresent()) {
            if(user.getRole().equals(Role.ADMIN) || (user.getRole().equals(Role.TRAINER) && workoutData.get().getUserID() == user.getId())) {
                WorkoutPlan _workoutPlan = workoutData.get();
                _workoutPlan.setTitle(workoutPlan.getTitle());
                _workoutPlan.setDescription(workoutPlan.getDescription());
                _workoutPlan.setPublished(workoutPlan.isPublished());
                _workoutPlan.setBreaks(workoutPlan.getBreaks());
                _workoutPlan.setReps(workoutPlan.getReps());
                _workoutPlan.setDifficulty(workoutPlan.getDifficulty());
                _workoutPlan.setExercises(workoutPlan.getExercises());
                return new ResponseEntity<>(workoutRepository.save(_workoutPlan), HttpStatus.OK);
            }else return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @Autowired
    FavoriteswkInterface favoriteswkInterface;
    @DeleteMapping("/DeleteWorkout/{id}")
    public ResponseEntity<HttpStatus> deleteWorkout(@PathVariable("id") Integer id) {
        try {
            Optional<WorkoutPlan> workoutDataOptional = workoutRepository.findById(id);
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) authentication.getPrincipal();
            if (workoutDataOptional.isPresent()) {
                WorkoutPlan workoutData = workoutDataOptional.get();
                if (user.getRole().equals(Role.ADMIN) || (user.getRole().equals(Role.TRAINER) && workoutData.getUserID().equals(user.getId()))) {

                    // Clear the associated collections
                    workoutData.getExercises().clear();
                    workoutData.getReps().clear();
                    workoutData.getBreaks().clear();

                    // Save the WorkoutPlan with cleared collections
                    workoutRepository.save(workoutData);
                    favoriteswkInterface.deleteByWorkoutPlanId(workoutData.getId());
                    // Delete the WorkoutPlan
                    workoutRepository.deleteById(id);

                    return new ResponseEntity<>(HttpStatus.OK);
                }
            }
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/DeleteWorkout")
    public ResponseEntity<HttpStatus> deleteAllWorkouts() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User user = (User) authentication.getPrincipal();
            if(user.getRole().equals(Role.ADMIN)){
                favoriteswkInterface.deleteAll();
                workoutRepository.deleteAll();
                return new ResponseEntity<>(HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/listPublishedWorkouts")
    public ResponseEntity<List<WorkoutPlan>> findByPublished() {
        try {
            List<WorkoutPlan> workouts = workoutRepository.findByPublished(true);
            if (workouts.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(workouts, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/test")
    public ResponseEntity<String> testam() {
        return new ResponseEntity<>("Buna lume!", HttpStatus.OK);
    }
}
