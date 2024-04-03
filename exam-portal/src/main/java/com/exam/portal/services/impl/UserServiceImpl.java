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

	@Override
	public User getUserByUserName(String userName) throws Exception {
		return this.userRepo.findByUserName(userName);
	}

	@Override
	public boolean updateUserInfo(String userName, User user) throws Exception {
		User localUser = this.userRepo.findByUserName(userName);
		if (localUser != null) {
			if (user.getEmail() != null)
				localUser.setEmail(user.getEmail());
			if (user.getFirstName() != null)
				localUser.setFirstName(user.getFirstName());
			if (user.getLastName() != null)
				localUser.setLastName(user.getLastName());
			if (user.getPhone() != null)
				localUser.setPhone(user.getPhone());
			if (user.isActive() != null)
				localUser.setActive(user.isActive());
			this.userRepo.save(localUser);
			return true;
		} else {
			System.out.println("No user found with this username.");
			return false;
		}
	}

	@Override
	public void deleteUserById(Long id) throws Exception {
		User u = this.userRepo.findById(id).get(); 
		System.out.println(u);
		if(u!= null) {
			this.userRepo.deleteById(id);
		}else {
			throw new Exception("User does not exist into database.");
		}
	}

}
