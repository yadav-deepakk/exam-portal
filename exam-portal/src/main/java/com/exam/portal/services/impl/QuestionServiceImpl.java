package com.exam.portal.services.impl;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Optional;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exam.portal.entities.Question;
import com.exam.portal.entities.Quiz;
import com.exam.portal.repositories.QuestionRepo;
import com.exam.portal.services.QuestionService;

@Service
public class QuestionServiceImpl implements QuestionService {

	@Autowired
	private QuestionRepo questionRepo;

	private Logger log = LoggerFactory.getLogger(QuizServiceImpl.class);

	@Override
	public boolean addQuestion(Question question) {
		try {
			questionRepo.save(question);
		} catch (Exception e) {
			log.warn(e.getMessage());
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public Optional<Question> getQuestionById(Long questionId) {
		return questionRepo.findById(questionId);
	}

	@Override
	public Optional<Set<Question>> getAllQuestions() {
		return Optional.of(new LinkedHashSet<>(questionRepo.findAll()));
	}

	@Override
	public boolean updateQuetion(Question question) {
		return this.addQuestion(question);
	}

	@Override
	public boolean deleteQuestionById(Long questionId) {
		try {
			Optional<Question> question = questionRepo.findById(questionId); 
			if(question.isEmpty()) {
				throw new Exception("No Question found with questionId:" + questionId + " to delete."); 
			}
			log.warn("Question:{} is being deleted!", questionId);
			questionRepo.delete(question.get());
		}catch(Exception e) {
			log.warn(e.getMessage());
			e.printStackTrace();
			return false;
		}
		return true; 
	}

	@Override
	public Optional<Set<Question>> getQuestionsOfQuiz(Quiz quiz) {
		return Optional.of(new HashSet<>(questionRepo.findByQuiz(quiz)));
	}

}
