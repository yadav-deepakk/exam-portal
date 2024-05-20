package com.exam.portal.services.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
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
import com.exam.portal.services.QuizService;

@Service
public class QuestionServiceImpl implements QuestionService {

	@Autowired
	private QuizService quizService;

	@Autowired
	private QuestionRepo questionRepo;

	private Logger log = LoggerFactory.getLogger(QuestionServiceImpl.class);

	@Override
	public Question addQuestion(Question question) {
		return questionRepo.save(question);
	}

	@Override
	public Optional<Question> getQuestionById(Long questionId) {
		return questionRepo.findById(questionId);
	}

	@Override
	public Set<Question> getAllQuestions() {
		return new LinkedHashSet<>(questionRepo.findAll());
	}

	@Override
	public Question updateQuestion(Question question) {
		return this.addQuestion(question);
	}

	@Override
	public Set<Question> getQuestionsOfQuiz(Long quizId) {
		Quiz quiz = quizService.getQuizById(quizId).get();
		List<Question> quesList = new ArrayList<Question>(quiz.getQuestionsSet());

		if (quesList.size() < quiz.getQuestionCount()) { // quiz has insufficient question.
			log.error("Quiz has insufficient question to form a Question Set");
			return null;
		}

		Collections.shuffle(quesList);
		if (quesList.size() > quiz.getQuestionCount()) {
			quesList = quesList.subList(0, quiz.getQuestionCount());
		}

		return new HashSet<>(quesList);
	}

	@Override
	public boolean deleteQuestionById(Long questionId) {
		Optional<Question> question = questionRepo.findById(questionId);
		if (question.isEmpty())
			return false;

		questionRepo.delete(question.get());
		return true;
	}
}
