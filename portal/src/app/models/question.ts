import { QuizModel } from "./quiz";

export interface QuestionModel {
    quesId: BigInt;
    quesContent: String | string;
    quesImage?: String | string | null;
    option1: String | string;
    option2: String | string;
    option3: String | string;
    option4: String | string;
    answer: String | string;
    questiionOfQuiz: QuizModel | null;
}
