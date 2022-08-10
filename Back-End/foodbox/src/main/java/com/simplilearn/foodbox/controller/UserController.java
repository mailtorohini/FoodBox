package com.simplilearn.foodbox.controller;

import com.simplilearn.foodbox.dao.UserRepository;
import com.simplilearn.foodbox.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;



@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/")
public class UserController {


    @Autowired
    private UserRepository userRepository;

    // get all users
    @GetMapping("/users")
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    // create user rest api
    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    // get user by id rest api
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("user not exist with id :" + id));
        return ResponseEntity.ok(user);
    }
//
//    // update user rest api
//
//    @PutMapping("/users/{id}")
//    public ResponseEntity<user> updateuser(@PathVariable Long id, @RequestBody user userDetails){
//        user user = userRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("user not exist with id :" + id));
//
//        user.setFirstName(userDetails.getFirstName());
//        user.setLastName(userDetails.getLastName());
//        user.setEmailId(userDetails.getEmailId());
//
//        user updateduser = userRepository.save(user);
//        return ResponseEntity.ok(updateduser);
//    }
//
//    // delete user rest api
//    @DeleteMapping("/users/{id}")
//    public ResponseEntity<Map<String, Boolean>> deleteuser(@PathVariable Long id){
//        user user = userRepository.findById(id)
//                .orElseThrow(() -> new ResourceNotFoundException("user not exist with id :" + id));
//
//        userRepository.delete(user);
//        Map<String, Boolean> response = new HashMap<>();
//        response.put("deleted", Boolean.TRUE);
//        return ResponseEntity.ok(response);
//    }


}
