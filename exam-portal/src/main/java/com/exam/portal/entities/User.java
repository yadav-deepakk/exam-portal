package com.exam.portal.entities;

import com.exam.portal.models.Authority;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userId;
	private String firstName;
	private String lastName;
	private String userName;
	private String email;
	private String password;
	private String profile;
	private String phone;

	@Builder.Default
	private Boolean isActive = true;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "user")
	@Builder.Default
	@JsonIgnore
	private Set<UserRole> userRoles = new HashSet<>();

	// UserDetails Method
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Set<Authority> authoritySet = new HashSet<>();
		for (UserRole userRole : userRoles)
			authoritySet.add(Authority.builder().authorityName(userRole.getRole().getRoleName()).build());
		return authoritySet;
	}

	@Override
	public String getUsername() {
		return userName;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return isActive;
	}

}
