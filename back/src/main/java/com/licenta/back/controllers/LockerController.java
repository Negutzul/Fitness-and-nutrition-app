package com.licenta.back.controllers;
import com.licenta.back.models.Locker;
import com.licenta.back.user.User;

import com.licenta.back.repository.LockerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/api/locker")
public class LockerController {

    HttpStatus status;
    String message;
    @Autowired
    LockerRepository lockerRepository;

//    @GetMapping("/testLocker")
//    public ResponseEntity<String> testLocker() {
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        Integer userId = ((User) authentication.getPrincipal()).getId();
//        return new ResponseEntity<>(lockerRepository.findByUserId(userId).get().toString(), HttpStatus.OK);
//    }

    @GetMapping("/testa")
    public ResponseEntity<String> testam() {
        return new ResponseEntity<>("Buna lume!", HttpStatus.OK);
    }


    @GetMapping("/getLockerContent")
    public ResponseEntity<String> getLocker() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Integer userId = ((User) authentication.getPrincipal()).getId();
        return new ResponseEntity<>(lockerRepository.findByUserId(userId).getNoteContent(), HttpStatus.OK);
    }

    @PutMapping("/putLockerContent")
    public ResponseEntity<String> updateLockerNote(
            @RequestBody String updatedNoteContent
    ) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Integer userId = ((User) authentication.getPrincipal()).getId();
        Locker locker = lockerRepository.findById(lockerRepository.findByUserId(userId).getId())
                .orElseThrow();

        locker.setNoteContent(updatedNoteContent);

        lockerRepository.save(locker);

        return ResponseEntity.ok("Locker note updated successfully");
    }

}
