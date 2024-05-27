import { QuizModel } from "./quiz";

export interface QuestionModel {
    questionId: BigInt;
    questionContent: String | string;
    questionImage?: String | string | null;
    option1: String | string;
    option2: String | string;
    option3: String | string;
    option4: String | string;
    answer: String | string;
    questionOfQuiz: QuizModel | null;
}
