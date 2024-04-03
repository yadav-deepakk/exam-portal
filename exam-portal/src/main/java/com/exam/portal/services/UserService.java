package com.exam.portal.services;

import java.util.Set;

import com.exam.portal.entities.User;
import com.exam.portal.entities.UserRole;

public interface UserService {
	public User createUser(User user, Set<UserRole> userRoles) throws Exception;
}
