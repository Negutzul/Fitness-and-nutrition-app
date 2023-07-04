package com.licenta.back.controllers;

        import com.licenta.back.jwtAuth.AuthenticationResponse;
        import com.licenta.back.jwtAuth.AuthenticationService;
        import com.licenta.back.jwtAuth.CustomResponses.CustomBadRequestResponse;
        import com.licenta.back.jwtAuth.Exceptions.EmailAlreadyExistsException;
        import com.licenta.back.jwtAuth.RegisterRequest;
        import com.licenta.back.jwtToken.TokenRepository;
        import com.licenta.back.models.*;
        import com.licenta.back.repository.*;
        import com.licenta.back.user.Role;
        import com.licenta.back.user.User;
        import com.licenta.back.user.UserRepository;
        import jakarta.transaction.Transactional;
        import lombok.RequiredArgsConstructor;
        import org.springframework.http.HttpStatus;
        import org.springframework.http.ResponseEntity;
        import org.springframework.security.access.prepost.PreAuthorize;
        import org.springframework.security.core.Authentication;
        import org.springframework.security.core.context.SecurityContextHolder;
        import org.springframework.web.bind.annotation.*;

        import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;

    private final LockerRepository lockerRepository;

    private final TokenRepository tokenRepository;

    private final MealPlanRepository mealPlanRepository;

    private final WorkoutRepository workoutRepository;

    private final AuthenticationService service;
    private final FavoritesmpInterface favoritesmpInterface;
    private final FavoriteswkInterface favoriteswkInterface;

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @GetMapping("/test")
    public ResponseEntity<String> sayHello() {
        return ResponseEntity.ok("Hello admin from secured endpoint");
    }

    @PostMapping("/registerTrainer")
    public Object registerTrainer(
            @RequestBody RegisterRequest request
    ) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        if(user.getRole().equals(Role.ADMIN))
            try {
                return (ResponseEntity<AuthenticationResponse>) ResponseEntity.ok(service.registerTrainer(request));
            }catch (EmailAlreadyExistsException e){
                CustomBadRequestResponse c = new CustomBadRequestResponse();
                return c.handleBadRequestException(e.getMessage());
            }
        return new ResponseEntity<>("error not admin", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Transactional
    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") Integer id) {
        Integer userID = id;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) authentication.getPrincipal();
        if(user.getRole().equals(Role.ADMIN))
            try {
                tokenRepository.deleteByUserId(userID);
                List<MealPlan> mealPlans = mealPlanRepository.findByUserId(userID);
                for(MealPlan mp : mealPlans){
                    favoritesmpInterface.deleteByMealPlanId(mp.getId());
                }
                mealPlanRepository.deleteByUserId(userID);

                List<WorkoutPlan> workoutPlans = workoutRepository.findByUserId(userID);
                for (WorkoutPlan wk : workoutPlans) {
                    wk.getExercises().clear();  // Clear the associated collections
                    wk.getReps().clear();
                    wk.getBreaks().clear();
                    favoriteswkInterface.deleteByWorkoutPlanId(wk.getId());
                }

                workoutRepository.deleteByUserId(userID);


                lockerRepository.deleteByUserId(userID);

                workoutRepository.deleteByUserId(userID);

                userRepository.deleteById(userID);

                return ResponseEntity.ok("user removed succcesfuly");
            }catch (Exception e){
                return new ResponseEntity<>("error admin contact suport", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        return new ResponseEntity<>("error not admin", HttpStatus.INTERNAL_SERVER_ERROR);
    }


}
