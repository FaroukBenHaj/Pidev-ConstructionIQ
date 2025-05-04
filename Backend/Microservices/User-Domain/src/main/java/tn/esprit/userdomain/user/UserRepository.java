package tn.esprit.userdomain.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

//@Repository
public interface UserRepository{ /*extends JpaRepository<User, Long> {
    //Optional => est une classes generique qui sert a encapsuler un obj present ou absent
    // Pour eviter NullPointerException
    Optional<User> findByEmail(String email);*/
}
