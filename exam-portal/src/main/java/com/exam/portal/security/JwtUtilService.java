package com.exam.portal.security;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtUtilService {

	@Value("${jwt.token.encryption_key}")
	private String SECRET_KEY;

	@Value("${jwt.token.validity_millisec}")
	private Long JWT_TOKEN_VALIDITY; // in milliseconds already

	Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

	public <T> T extractClaims(String token, Function<Claims, T> claimResolver) {
		Claims claims = this.extractAllClaims(token);
		return claimResolver.apply(claims);
	}

	public Claims extractAllClaims(String token) {
		return Jwts.parserBuilder().setSigningKey(this.getSigninKey()).build().parseClaimsJws(token).getBody();
	}

	private Key getSigninKey() {
		byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
		return Keys.hmacShaKeyFor(keyBytes);
	}

	public String extractUsernameFromToken(String token) {
		return this.extractClaims(token, Claims::getSubject);
	}

	public boolean isTokenValid(String token, UserDetails userDetail) {
		String tokenUsername = this.extractUsernameFromToken(token);
		return tokenUsername.equals(userDetail.getUsername()) && !this.isTokenExpired(token);
	}

	private Date extractExpiration(String token) {
		return this.extractClaims(token, Claims::getExpiration);
	}

	private boolean isTokenExpired(String token) {
		return this.extractExpiration(token).before(new Date());
	}

	public String generateToken(UserDetails userDetail) {
		Map<String, Object> extraClaims = new HashMap<>();
		return this.doGenerateToken(extraClaims, userDetail);
	}

	public String doGenerateToken(Map<String, Object> extraClaims, UserDetails userDetail) {

		final String token = Jwts.builder().setClaims(extraClaims).setSubject(userDetail.getUsername())
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY))
				.signWith(getSigninKey(), SignatureAlgorithm.HS256).compact()

		;

		logger.info("Generated JWT - Token: {}", token);
		return token;
	}

}
