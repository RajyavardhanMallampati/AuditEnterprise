package com.example.auditProject.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.auditProject.entity.User;
import java.util.List;

public interface UserRepository extends JpaRepository<User,Long> {
    List<User> findByIsDeletedFalse();
    List<User> findByIsDeletedTrue();


}
