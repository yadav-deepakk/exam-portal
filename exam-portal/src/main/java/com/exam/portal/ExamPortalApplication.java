package com.exam.portal;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.exam.portal.entities.Role;
import com.exam.portal.entities.User;
import com.exam.portal.entities.UserRole;
import com.exam.portal.services.UserService;

@SpringBootApplication
public class ExamPortalApplication implements CommandLineRunner {

	@Autowired
	UserService userService;

	public static void main(String[] args) {
		SpringApplication.run(ExamPortalApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Creation of an ADMIN User...");

		User u1 = new User("yadav_deepakk", "deepak@yadav.com", "deepak", "yadav", true, 1212120021);
		Role role1 = new Role("ADMIN");
		UserRole userRole = new UserRole(role1, u1);

		Set<UserRole> userRoleSet = new HashSet<>();
		userRoleSet.add(userRole);

		User user = this.userService.createUser(u1, userRoleSet);
		System.out.println("Admin User Created: " + user.getUserName());
		System.out.println("ADMIN User Creation Done...");
	}

}
