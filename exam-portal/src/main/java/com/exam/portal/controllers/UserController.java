package com.exam.portal.controllers;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.exam.portal.entities.Role;
import com.exam.portal.entities.User;
import com.exam.portal.entities.UserRole;
import com.exam.portal.services.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

	@Autowired
	UserService userService;

	@GetMapping
	public ResponseEntity<User> getUserByUserName(@RequestParam(name = "userName", required = true) String userName) {
		System.out.println("GET: /user?" + ", userName=" + userName);
		try {
			User usr = this.userService.getUserByUserName(userName);
			if (usr != null) {
				return new ResponseEntity<>(usr, HttpStatus.OK);
			} else
				throw new Exception("No user found with given userName=" + userName);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/create")
	public ResponseEntity<User> createNormalUser(@RequestBody User user) {
		System.out.println("POST: /user/create");
		System.out.println(user);
		try {
			Role normalRole = new Role(2, "NORMAL");
			Set<UserRole> userRoleSet = new HashSet<>();
			userRoleSet.add(new UserRole(normalRole, user));
			this.userService.createUser(user, userRoleSet);
			User insertedUser = this.userService.getUserByUserName(user.getUserName());
			return new ResponseEntity<>(insertedUser, HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/update")
	public ResponseEntity<String> updateNormalUser(@RequestParam(name = "userName", required = true) String userName,
			@RequestBody User user) {
		System.out.println("PUT: /user/update");
		System.out.println("userName=" + userName);
		System.out.println(user);
		try {
			boolean updateSuccess = this.userService.updateUserInfo(userName, user);
			if (updateSuccess) {
				return new ResponseEntity<String>("User updation successful.", HttpStatus.OK);
			} else {
				throw new Exception("Error occured in user updation.");
			}

		} catch (Exception e) {
			System.out.println(e.getMessage());
			e.printStackTrace();
			return new ResponseEntity<String>("Error in user updation.", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/delete")
	public ResponseEntity<String> deleteUserByUserId(@RequestParam(name = "id", required = true) Long id) {
		System.out.println("DELETE: /user/delete");
		System.out.println("id=" + id);
		try {
			this.userService.deleteUserById(id);
			return new ResponseEntity<String>("user deletion successful.", HttpStatus.OK);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			e.printStackTrace();
			return new ResponseEntity<String>("Error in user deletion.", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
