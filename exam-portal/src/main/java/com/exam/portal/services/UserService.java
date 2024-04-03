package com.exam.portal.services;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.portal.entities.User;
import com.exam.portal.entities.UserRole;
import com.exam.portal.repositories.UserRepo;

@Service
public class UserService {
	@Autowired
	UserRepo userRepo;

	public void createUser(User user, Set<UserRole> userRoles) {
		try {
			user.setUserRoles(userRoles);
			userRepo.save(user);
		}catch (Exception e) {
			throw e; 
		}
	}
}
