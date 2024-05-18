package com.exam.portal.services;

import java.util.List;
import java.util.Optional;

import com.exam.portal.entities.Quiz;

public interface QuizService {
	public boolean addQuiz(Quiz quiz);

	public Optional<Quiz> getQuizById(Long quizId);

	public Optional<List<Quiz>> getAllQuizzes();

	public boolean updateQuiz(Quiz quiz);

	public boolean deleteQuizBy(Long quizId);
}
