import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, Observable, of } from "rxjs";
import { QuizModel } from "src/app/models/quiz";
import { QuizService } from "src/app/services/quiz.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-user-home",
    templateUrl: "./user-home.component.html",
    styleUrls: ["./user-home.component.css"],
})
export class UserHomeComponent implements OnInit {
    allQuizzes: QuizModel[] = []; // quiz with no filteration
    quizzesToDisplay: QuizModel[] = []; // quizzes after using array higher order function
    categoryIdPathVar: Number | undefined = undefined;

    constructor(private activatedRoute: ActivatedRoute, private quizService: QuizService) {}

    filterQuizzesBasedOnCategory(): void {
        if (this.categoryIdPathVar && this.categoryIdPathVar != 0) {
            this.quizzesToDisplay = this.allQuizzes?.filter(
                (currQuiz) => currQuiz.isActiveQuiz && currQuiz.category.categoryId == this.categoryIdPathVar
            )!;
        } else this.quizzesToDisplay = this.allQuizzes?.filter((quiz) => quiz.isActiveQuiz);
    }

    ngOnInit(): void {
        // subscribe for route change and filter out allQuizzes to get valid quizzes to display
        this.activatedRoute.params.subscribe((params) => {
            this.categoryIdPathVar = params["categoryId"];
            if (this.allQuizzes.length == 0) {
                this.quizService.getAllQuiz().subscribe(
                    (data: QuizModel[]) => {
                        console.log(data);
                        this.allQuizzes = data;
                        this.filterQuizzesBasedOnCategory();
                    },
                    (error: any) => {
                        console.log(error);
                        Swal.fire({
                            icon: "error",
                            title: "Quiz Loading",
                            text: "Error in loading all quizzes from server.",
                        });
                    }
                );
            } else this.filterQuizzesBasedOnCategory();
        });
    }
}
