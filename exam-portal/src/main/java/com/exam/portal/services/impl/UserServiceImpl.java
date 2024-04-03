package com.exam.portal.services.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.portal.entities.User;
import com.exam.portal.entities.UserRole;
import com.exam.portal.repositories.RoleRepo;
import com.exam.portal.repositories.UserRepo;
import com.exam.portal.services.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	UserRepo userRepo;

	@Autowired
	RoleRepo roleRepo;

	@Override
	public User createUser(User user, Set<UserRole> userRoles) throws Exception {
		User local = this.userRepo.findByUserName(user.getUserName());
		if (local == null) {
			for (UserRole ur : userRoles) {
				roleRepo.save(ur.getRole());
			}
			user.getUserRoles().addAll(userRoles);
			local = this.userRepo.save(user);
		} else {
			System.out.println("User already present.");
			throw new Exception("User already exists into database.");
		}
		return local;
	}

}
