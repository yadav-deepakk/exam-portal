import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { CategoryModel } from "src/app/models/category";
import { QuizModel } from "src/app/models/quiz";
import { CategoryService } from "src/app/services/category.service";
import { QuizService } from "src/app/services/quiz.service";

@Component({
    selector: "app-user-home",
    templateUrl: "./user-home.component.html",
    styleUrls: ["./user-home.component.css"],
})
export class UserHomeComponent implements OnInit {
    allQuizzes: QuizModel[] = []; // quiz with no filteration
    quizzesToDisplay: QuizModel[] = []; // quizzes after using array higher order function
    categoryIdQueryParam: Number | undefined = undefined;

    constructor(private activatedRoute: ActivatedRoute, private quizService: QuizService) {}

    ngOnInit(): void {
        // get all quizzes
        this.quizService.getAllQuiz().subscribe(
            (data: QuizModel[]) => {
                this.allQuizzes = data;
                console.log(this.allQuizzes);
                this.quizzesToDisplay = this.allQuizzes.filter((quiz) => quiz.isActiveQuiz);
            },
            (error) => {
                console.log("Error in receiving all quizzes: " + error);
            }
        );

        // subscribe for route change and filter out allQuizzes to get valid quizzes to display
        this.activatedRoute.params.subscribe((params) => {
            this.categoryIdQueryParam = params["categoryId"];
            console.log(this.categoryIdQueryParam ? "true" : "false");

            if (this.categoryIdQueryParam && this.categoryIdQueryParam != 0) {
                this.quizzesToDisplay = this.allQuizzes?.filter(
                    (currQuiz) => currQuiz.isActiveQuiz && currQuiz.category.categoryId == this.categoryIdQueryParam
                )!;
            } else {
                console.log("can not filter all quizzes!");
                this.quizzesToDisplay = this.allQuizzes;
            }

            console.log(this.allQuizzes);
            console.log(this.quizzesToDisplay);
        });
    }
}
