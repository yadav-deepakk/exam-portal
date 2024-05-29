import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryModel } from "src/app/models/category";
import { QuestionModel } from "src/app/models/question";
import { QuizModel } from "src/app/models/quiz";
import { QuestionService } from "src/app/services/question.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-add-questions",
    templateUrl: "./add-questions.component.html",
    styleUrls: ["./add-questions.component.css"],
})
export class AddQuestionsComponent implements OnInit {
    quizIdQueryParameter: BigInt | undefined = undefined;
    quizTitleQueryParameter: String | string | undefined = undefined;
    category: CategoryModel = {};
    quiz: QuizModel = {
        quizId: undefined,
        category: this.category,
    };
    question: QuestionModel = {
        questionId: undefined,
        questionContent: "",
        questionImage: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        answer: "",
        quiz: undefined,
    };

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private questionService: QuestionService,
        private snack: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.quizIdQueryParameter = this.activatedRoute.snapshot.params["quizId"];
        this.quizTitleQueryParameter = this.activatedRoute.snapshot.params["quizTitle"];
        this.quiz.quizId = this.quizIdQueryParameter;
        this.question.quiz = this.quiz;
    }

    onAddQuesFormSubmit(): void {
        // validate the form and return if errors.
        let validation: boolean = this.validateForm();
        if (!validation) {
            console.log("Error in form validation.");
            return;
        }

        // submit the ques in backend for saving purpose, display success
        console.log(JSON.stringify(this.question));
        this.questionService.postQuestion(this.question!).subscribe(
            (data: QuestionModel) => {
                console.log("data received after question post: " + data);
                Swal.fire({
                    icon: "success",
                    title: "Question Post",
                    text: "Question saved successfully.",
                });
                this.router.navigate([
                    `/admin/questions/quiz/${this.quizIdQueryParameter}/${this.quizTitleQueryParameter}`,
                ]);
            },
            // if error then display it for error.
            (error: any) => {
                console.log();
                Swal.fire({
                    icon: "error",
                    title: "Question Post",
                    text: "Error in saving question to quiz " + this.quizIdQueryParameter,
                });
            }
        );
    }

    validateForm(): boolean {
        // check all empty and null cases.at
        if (
            this.question.questionContent?.trim() == "" ||
            this.question.questionContent == null ||
            this.question.option1?.trim() == "" ||
            this.question.option1 == null ||
            this.question.option2?.trim() == "" ||
            this.question.option2 == null ||
            this.question.option3?.trim() == "" ||
            this.question.option3 == null ||
            this.question.option4?.trim() == "" ||
            this.question.option4 == null ||
            this.question.answer?.trim() == "" ||
            this.question.answer == null
        ) {
            this.snack.open("Fields are mandatory!", "OK", { duration: 2400 });
            return false;
        }
        return true;
    }
}
