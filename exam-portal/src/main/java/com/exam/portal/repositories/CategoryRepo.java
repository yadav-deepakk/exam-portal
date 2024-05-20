package com.exam.portal.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.exam.portal.entities.Category;

public interface CategoryRepo extends JpaRepository<Category, Integer> {
}
