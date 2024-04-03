package com.exam.portal.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.portal.entities.User;

public interface UserRepo extends JpaRepository<User, Long>{

}
