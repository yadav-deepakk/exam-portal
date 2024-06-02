import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { QuizModel } from "src/app/models/quiz";
import { QuizService } from "src/app/services/quiz.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-instructions",
    templateUrl: "./instructions.component.html",
    styleUrls: ["./instructions.component.css"],
})
export class InstructionsComponent implements OnInit {
    quizIdPathVar: BigInt | undefined = undefined;
    quiz: QuizModel | null = null;
    constructor(private activatedRoute: ActivatedRoute, private quizService: QuizService, private router: Router) {}

    ngOnInit(): void {
        this.quizIdPathVar = this.activatedRoute.snapshot.params["quizId"];
        this.quizService.getQuizById(this.quizIdPathVar!).subscribe(
            (data: QuizModel) => {
                console.log(data);
                this.quiz = data;
            },
            (error: any) => {
                console.log(error);
                Swal.fire({ icon: "error", title: "Quiz Fetch", text: "Failed to get quiz details" });
            }
        );
    }

    startQuiz(): void {
        Swal.fire({
            icon: "warning",
            title: "Start Quiz " + this.quiz?.quizTitle,
            text: "Do you want to start the quiz NOW?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Start",
            denyButtonText: "NO!",
        }).then((res) => {
            if (res.isConfirmed) {
                Swal.fire({
                    icon: "info",
                    title: "Starting the quiz",
                    text: "Redirecting to quiz questions",
                    timer: 3000,
                }).then(() => {
                    this.router.navigate(["/start/" + this.quiz?.quizId]);
                });
            }
        });
    }
}
