package com.example.auditProject.audit;
import com.example.auditProject.entity.AuditLog;
import com.example.auditProject.repository.AuditLogRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

@Aspect
@Component
@RequiredArgsConstructor
public class AuditAspect {
    private final AuditLogRepository auditLogRepository;
    private final ObjectMapper objectMapper;
    @Around("@annotation(auditable)")
    public Object logAudit(ProceedingJoinPoint joinPoint,Auditable auditable) throws Throwable {
    Object result;
    String oldValue=null;
    Object[] args=joinPoint.getArgs();
    if(args.length>0 && args[0]!=null)
    {
        oldValue=objectMapper.writeValueAsString(args[0]);
    }
    result=joinPoint.proceed();
    String newValue=null;
    if(result!=null)
    {
        newValue=objectMapper.writeValueAsString(result);
    }
    AuditLog log=new AuditLog();
    log.setEntityName(joinPoint.getTarget().getClass().getSimpleName());
    log.setAction(auditable.action());
    log.setOldValue(oldValue);
    log.setNewValue(newValue);
    log.setUsername("SYSTEM");
    log.setTimestamp(LocalDateTime.now());
    auditLogRepository.save(log);
    return result;
    }
}
