package com.exam.portal.services.impl;

import java.util.LinkedHashSet;
import java.util.Optional;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.portal.entities.Category;
import com.exam.portal.repositories.CategoryRepo;
import com.exam.portal.services.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepo categoryRepo;

	private Logger log = LoggerFactory.getLogger(CategoryServiceImpl.class);

	@Override
	public boolean addCategory(Category category) {
		try {
			categoryRepo.save(category);
		} catch (Exception e) {
			log.warn(e.getMessage());
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public Optional<Category> getCategoryById(Integer categoryId) {
		return categoryRepo.findById(categoryId);
	}

	@Override
	public Optional<Set<Category>> getAllCategories() {
		return Optional.of(new LinkedHashSet<>(categoryRepo.findAll()));
	}

	@Override
	public boolean updateCategory(Category category) {
		return this.addCategory(category);
	}

	@Override
	public boolean deleteCategoryById(Integer categoryId) {
		try {
			Optional<Category> category = categoryRepo.findById(categoryId);
			if (category.isEmpty()) {
				throw new Exception("No category found with given id:" + categoryId + " to delete.");
			}
			log.info("category: {} is being deleted!", categoryId);
			categoryRepo.delete(category.get());
		} catch (Exception e) {
			log.warn(e.getMessage());
			e.printStackTrace();
			return false;
		}
		return true;
	}

}
