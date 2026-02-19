package com.example.auditProject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.auditProject.entity.AuditLog;
public interface AuditLogRepository extends JpaRepository<AuditLog,Long> {
}
