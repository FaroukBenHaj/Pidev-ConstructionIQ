package com.example.pi_project.Repositories;
import com.example.pi_project.Entities.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AgendaRepository extends JpaRepository<Agenda, Long> {
    List<Agenda> findByMeetingId(Long meetingId);
}