package com.exam.portal.services.impl;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.portal.entities.Quiz;
import com.exam.portal.repositories.QuizRepo;
import com.exam.portal.services.QuizService;

@Service
public class QuizServiceImpl implements QuizService {

	@Autowired
	private QuizRepo quizRepo;

	private Logger log = LoggerFactory.getLogger(QuizServiceImpl.class);

	@Override
	public boolean addQuiz(Quiz quiz) {
		try {
			quizRepo.save(quiz);
		} catch (Exception e) {
			log.warn(e.getMessage());
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public Optional<Quiz> getQuizById(Long quizId) {
		return quizRepo.findById(quizId);
	}

	@Override
	public Optional<List<Quiz>> getAllQuizzes() {
		return Optional.of(quizRepo.findAll());
	}

	@Override
	public boolean updateQuiz(Quiz quiz) {
		return this.addQuiz(quiz);
	}

	@Override
	public boolean deleteQuizBy(Long quizId) {
		try {
			Optional<Quiz> quiz = quizRepo.findById(quizId);
			if (quiz.isEmpty()) {
				throw new Exception("No Quiz found with quizId:" + quizId + " to delete.");
			}
			log.warn("quiz:{} is being deleted!", quizId);
			quizRepo.delete(quiz.get());
		} catch (Exception e) {
			log.warn(e.getMessage());
			e.printStackTrace();
			return false;
		}
		return true;
	}

}
