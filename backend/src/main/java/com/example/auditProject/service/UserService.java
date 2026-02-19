package com.example.auditProject.service;

import com.example.auditProject.repository.UserRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.auditProject.entity.User;
import java.util.List;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    public User createUser(User user)
    {
        return userRepository.save(user);
    }
    public List<User> getAllUsers(){
        return userRepository.findByIsDeletedFalse();
    }
    public List<User> getDeletedUsers(){
        return userRepository.findByIsDeletedTrue();
    }
    @Transactional
    public void softDelete(Long id){
        User user=userRepository.findById(id)
                .orElseThrow(()->new RuntimeException("user not found"));
        user.setDeleted(true);
        user.setDeletedAt(LocalDateTime.now());
    }
    @Transactional
    public void restore(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("user not found"));
        user.setDeleted(false);
        user.setDeletedAt(null);
    }
}
