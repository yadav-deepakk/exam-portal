package com.exam.portal.models;

import org.springframework.security.core.GrantedAuthority;

public class Authority implements GrantedAuthority {
	private static final long serialVersionUID = 1L;

	private String authorityName;

	public Authority() {
		super();
	}

	public Authority(String authorityName) {
		super();
		this.authorityName = authorityName;
	}

	@Override
	public String getAuthority() {
		return authorityName;
	}

}
