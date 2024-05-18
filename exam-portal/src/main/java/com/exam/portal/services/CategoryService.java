package com.exam.portal.services;

import java.util.Optional;
import java.util.Set;

import com.exam.portal.entities.Category;

public interface CategoryService {
	public boolean addCategory(Category category);

	public Optional<Category> getCategoryById(Integer categoryId);

	public Optional<Set<Category>> getAllCategories();

	public boolean updateCategory(Category category);

	public boolean deleteCategoryById(Integer categoryId);

}
