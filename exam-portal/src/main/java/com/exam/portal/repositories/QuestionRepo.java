package com.exam.portal.repositories;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.exam.portal.entities.Question;
import com.exam.portal.entities.Quiz;


public interface QuestionRepo extends JpaRepository<Question, Long>{
	public Set<Question> findByQuiz(Quiz quiz); 
}
