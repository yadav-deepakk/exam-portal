import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CategoryModel } from "src/app/models/category";
import { QuizModel } from "src/app/models/quiz";
import { CategoryService } from "src/app/services/category.service";
import { QuizService } from "src/app/services/quiz.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-quiz",
    templateUrl: "./quiz.component.html",
    styleUrls: ["./quiz.component.css"],
})
export class QuizComponent implements OnInit {
    quizzes: QuizModel[] | null = null;

    constructor(private quizService: QuizService, private categoryService: CategoryService) {}

    ngOnInit(): void {
        this.quizService.getAllQuiz().subscribe(
            (data: QuizModel[]) => {
                console.log("Success in loading quizzes: " + data);
                this.quizzes = data;
                this.quizzes.forEach((quiz) => console.log(quiz));
            },
            (error: any) => {
                console.log("Error Occured: " + error);
                Swal.fire({
                    icon: "error",
                    text: "Error in loading quizzes.",
                    timer: 2000,
                });
            }
        );
    }

    deleteQuiz(quizId: BigInt | undefined): void {
        if (!quizId) return;
        Swal.fire({
            icon: "warning",
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                this.quizService.deleteQuizById(quizId).subscribe(
                    (data: Boolean) => {
                        console.log("deleted: " + data);
                        Swal.fire({
                            icon: "success",
                            text: "Deletion successful.",
                        });
                        this.ngOnInit();
                    },
                    (error: any) => {
                        console.log("error in deletion: " + error);
                        Swal.fire({
                            icon: "error",
                            text: "Some problem occured in deletion.",
                        });
                    }
                );
            }
        });
    }
}
