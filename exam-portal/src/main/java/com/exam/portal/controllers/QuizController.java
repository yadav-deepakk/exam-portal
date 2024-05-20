package com.exam.portal.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.exam.portal.entities.Quiz;
import com.exam.portal.services.QuizService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/quiz")
@CrossOrigin(origins = "http://localhost:4200/", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT })
public class QuizController {

	@Autowired
	private QuizService quizService;

	private Logger log = LoggerFactory.getLogger(QuizController.class);

	@PostMapping
	public ResponseEntity<Quiz> addQuiz(@Valid @RequestBody Quiz quiz) {
		log.info("POST: /quiz {}", quiz);
		return ResponseEntity.ok(quizService.addQuiz(quiz));
	}

	@GetMapping
	public ResponseEntity<List<Quiz>> getAllQuizzes() {
		log.info("GET: /quiz {}");
		return ResponseEntity.ok(quizService.getAllQuizzes());
	}

	@GetMapping("/{quizId}")
	public ResponseEntity<Quiz> getQuizById(@PathVariable Long quizId) {
		log.info("GET: /quiz/{}", quizId);
		return ResponseEntity.ok(quizService.getQuizById(quizId).get());
	}

	@PutMapping
	public ResponseEntity<Quiz> updateQuiz(@Valid @RequestBody Quiz quiz) {
		log.info("PUT: /quiz/ {}", quiz);
		return ResponseEntity.ok(quizService.updateQuiz(quiz));
	}

	@DeleteMapping("/{quizId}")
	public ResponseEntity<Boolean> deleteQuiz(@PathVariable Long quizId) {
		log.info("DELETE: /quiz/{}", quizId);
		return ResponseEntity.ok(quizService.deleteQuizById(quizId));
	}
}
