package com.example.auditProject.controller;

import com.example.auditProject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.example.auditProject.entity.User;
import java.util.List;
@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    @PostMapping
    public User createUser(@RequestBody User user){
        return userService.createUser(user);
    }

    @GetMapping
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/deleted")
    public List<User> getDeletedUser(){
        return userService.getDeletedUsers();
    }

    @PutMapping("/{id}/soft-delete")
    public String softDelete(@PathVariable Long id)
    {
        userService.softDelete(id);
        return "User soft deleted successfully";
    }
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id)
    {
        userService.softDelete(id);
        return "User soft Deleted successfully";
    }

    @PutMapping("/{id}/restore")
    public String restore(@PathVariable Long id){
        userService.restore(id);
        return "User restored Successfully";
    }
}

