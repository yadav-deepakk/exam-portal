package com.exam.portal.services;

import java.util.Optional;
import java.util.Set;

import com.exam.portal.entities.Question;
import com.exam.portal.entities.Quiz;

public interface QuestionService {
	public boolean addQuestion(Question question);

	public Optional<Question> getQuestionById(Long questionId);

	public Optional<Set<Question>> getAllQuestions();

	public boolean updateQuetion(Question question);

	public boolean deleteQuestionById(Long questionId);
	
	public Optional<Set<Question>> getQuestionsOfQuiz(Quiz quiz); 
}
