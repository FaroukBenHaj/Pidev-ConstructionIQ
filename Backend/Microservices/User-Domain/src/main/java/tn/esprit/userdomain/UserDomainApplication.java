package tn.esprit.userdomain;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import tn.esprit.userdomain.roles.Role;
import tn.esprit.userdomain.roles.RoleRepository;

@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
public class UserDomainApplication {
	public static void main(String[] args) {
		SpringApplication.run(UserDomainApplication.class, args);
	}

@Bean
public CommandLineRunner runner(RoleRepository roleRepository) {
		return args -> {
			if (roleRepository.findByRoleName("Role_USER").isEmpty()) {
				roleRepository.save(Role.builder()
						.roleName("Role_USER")
						.build());
			}
			if (roleRepository.findByRoleName("ROLE_ADMIN").isEmpty()) {
				roleRepository.save(Role.builder()
						.roleName("ROLE_ADMIN")
						.build());
			}
		};
	}
}