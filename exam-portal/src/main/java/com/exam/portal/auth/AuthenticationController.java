package com.exam.portal.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.portal.models.JwtResponse;
import com.exam.portal.models.SignInRequest;
import com.exam.portal.models.SignUpRequest;

@RestController
@RequestMapping("api/auth")
public class AuthenticationController {

	@Autowired
	AuthenticateService authService;

	@PostMapping("signin")
	public ResponseEntity<JwtResponse> signIn(@RequestBody SignInRequest request) {
		return ResponseEntity.ok(authService.signIn(request));
	}

	@PostMapping("signup")
	public ResponseEntity<JwtResponse> signUp(@RequestBody SignUpRequest request) {
		return ResponseEntity.ok(authService.signUp(request));
	}
}
