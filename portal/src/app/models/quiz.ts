import { CategoryModel } from "./category";

export interface QuizModel {
    quizId?: BigInt;
    quizTitle?: String | string;
    quizDescription?: String | string | null;
    questionCount?: Number;
    quizMaxMarks?: Number;
    isActiveQuiz?: Boolean;
    category: CategoryModel;
}
