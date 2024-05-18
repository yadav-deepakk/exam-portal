package com.exam.portal.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exam.portal.entities.Category;

@RestController
@RequestMapping("category")
public class CategoryController {

	@GetMapping
	public ResponseEntity<List<Category>> getAllCategories() {
		return null;
	}

}
