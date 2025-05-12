package tn.esprit.userdomain.roles;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import tn.esprit.userdomain.user.User;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
//@Entity
@AllArgsConstructor
@NoArgsConstructor // Lombok annotation for no-args constructor
@Builder
//@EntityListeners(AuditingEntityListener.class)
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idRole;

    @Column(unique = true)
    private String roleName;

    @ManyToMany(mappedBy = "roles")
    @JsonIgnore // Prevent infinite loop during serialization
    private List<User> users;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(insertable = false)
    private LocalDateTime updatedDate;

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
}