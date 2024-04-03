package com.exam.portal.controllers;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.portal.entities.Role;
import com.exam.portal.entities.User;
import com.exam.portal.entities.UserRole;
import com.exam.portal.services.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

	@Autowired
	UserService userService;

	@PostMapping("/create")
	public ResponseEntity<String> createUser(@RequestBody User user) {
		try {
			Role normalRole = new Role(2, "NORMAL");
			Set<UserRole> userRoleSet = new HashSet<>();
			userRoleSet.add(new UserRole(normalRole, user));
			this.userService.createUser(user, userRoleSet);
			return new ResponseEntity<String>("User Insertion Successful", HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("Error Occured in Saving User.", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
