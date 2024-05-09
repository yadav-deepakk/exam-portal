package com.exam.portal.auth;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.exam.portal.entities.Role;
import com.exam.portal.entities.User;
import com.exam.portal.entities.UserRole;
import com.exam.portal.models.JwtResponse;
import com.exam.portal.models.SignInRequest;
import com.exam.portal.models.SignUpRequest;
import com.exam.portal.repositories.UserRepo;
import com.exam.portal.security.JwtUtilService;
import com.exam.portal.services.UserService;

@Service
public class AuthenticateService {

	@Autowired
	private UserService userService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserRepo repository;

	@Autowired
	private AuthenticationManager authManager;

	@Autowired
	JwtUtilService jwtService;

	public JwtResponse signUp(SignUpRequest req) {
		User user = User.builder().firstName(req.getFirstName()).lastName(req.getLastName()).userName(req.getUserName())
				.email(req.getEmail()).phone(req.getPhone()).password(passwordEncoder.encode(req.getPassword()))
				.build();

		user.setProfile("default.png");
		Role normalRole = Role.builder().roleId(2).roleName("NORMAL").build(); // new Role(2, "NORMAL");
		Set<UserRole> userRoleSet = new HashSet<>();
		userRoleSet.add(UserRole.builder().user(user).role(normalRole).build());

		userService.createUser(user, userRoleSet);

		final String jwtToken = jwtService.generateToken(user);
		return JwtResponse.builder().username(req.getUserName()).jwt(jwtToken).build();
	}

	public JwtResponse signIn(SignInRequest req) {
		authManager.authenticate(new UsernamePasswordAuthenticationToken(req.getUserName(), req.getPassword()));
		User user = repository.findByUserName(req.getUserName()).orElseThrow();
		final String jwtToken = jwtService.generateToken(user);

		return JwtResponse.builder().username(req.getUserName()).jwt(jwtToken).build();
	}
}
