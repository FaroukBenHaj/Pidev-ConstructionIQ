package tn.esprit.userdomain.security;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import tn.esprit.userdomain.user.UserRepository;
//@Service
@RequiredArgsConstructor
public class UserDetailServiceIImpl { /*implements UserDetailsService {

    private final UserRepository respository;


    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return respository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found "));
  }*/
}
