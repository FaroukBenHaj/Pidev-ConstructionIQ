package com.example.pi_project.Repositories;
import com.example.pi_project.Entities.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;



public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByMeetingId(Long meetingId);
}