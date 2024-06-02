import { Component, HostListener, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { QuestionModel } from "src/app/models/question";
import { QuestionService } from "src/app/services/question.service";
import { LocationStrategy } from "@angular/common";

import Swal from "sweetalert2";

@Component({
    selector: "app-attempt",
    templateUrl: "./attempt.component.html",
    styleUrls: ["./attempt.component.css"],
})
export class AttemptComponent implements OnInit {
    // component rendering related
    quizIdPathVar: BigInt | undefined = undefined;
    allQuizQuestions: QuestionModel[] | null = null;
    quizTitle: String | string | undefined = undefined;
    quizMaxMarks: Number = 0;

    // timer
    timer: number = 0;
    totalRemainingTime: number = 0;
    mm: number = 0;
    ss: number = 0;

    // quiz submittion
    isQuizSubmitted: Boolean = false;
    quizScore: Number = 0.0;
    attempted: Number = 0;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private locationSt: LocationStrategy,
        private questionService: QuestionService
    ) {}

    ngOnInit(): void {
        this.quizIdPathVar = this.activatedRoute.snapshot.params["quizId"];
        this.questionService.getQuestionOfQuizForTest(this.quizIdPathVar!).subscribe(
            (data: QuestionModel[]) => {
                console.log(data);
                if (data == null || data == undefined || data.length == 0) {
                    Swal.fire({
                        icon: "warning",
                        title: "Unable to start Quiz!",
                        text: "Contact to ADMIN, either quiz is inactive or has insuffcient question to form a test.",
                    });
                    this.router.navigate(["/user/"]);
                    return;
                }
                this.allQuizQuestions = data;
                this.quizTitle = this.allQuizQuestions[0].quiz?.quizTitle;
                this.quizMaxMarks = this.allQuizQuestions[0].quiz?.quizMaxMarks ?? 1;

                // giving 2 min to each question to solve.
                this.totalRemainingTime = this.allQuizQuestions!.length * 2 * 60; // in sec;

                this.preventBackButton();
                this.startTimer();
            },
            (error: any) => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Questions Fetch",
                    text: "Error in fetching the questions.",
                });
            }
        );
    }

    @HostListener("contextmenu", ["$event"])
    onRightClick(event: Event) {
        event.preventDefault();
    }

    @HostListener("window:beforeunload", ["$event"])
    unloadHandler(event: Event) {
        event.preventDefault();
    }

    preventBackButton(): void {
        history.pushState(null, "", location.href);
        this.locationSt.onPopState(() => {
            history.pushState(null, "", location.href);
        });
    }

    submitQuiz(): void {
        // take confirmation
        Swal.fire({
            icon: "info",
            title: "Submit Quiz",
            text: "Do you really want to submit Quiz",
            showDenyButton: this.mm > 0 || this.ss > 20 ? true : false,
            confirmButtonText: "Yes",
            denyButtonText: "NO",
        }).then((res) => {
            // evaluate results
            if (res.isConfirmed) this.evaluateQuizResult(false);
        });
    }

    evaluateQuizResult(timerEnded: boolean): void {
        Swal.fire({
            icon: timerEnded ? "warning" : "success",
            title: "Quiz Submitted!",
            text: timerEnded ? "Times Up!" : "Thank you for taking up the Quiz",
        });

        console.log(this.allQuizQuestions);

        let attemptedQues = 0;
        let correctAns = 0;
        this.allQuizQuestions?.forEach((ques) => {
            attemptedQues += ques.givenAnswer ? 1 : 0;
            correctAns += ques.givenAnswer == ques.answer ? 1 : 0;
        });

        this.isQuizSubmitted = true;
        this.quizScore = (correctAns / this.allQuizQuestions!.length) * 100;
        this.attempted = attemptedQues;

        window.clearInterval(this.timer);

        console.log("Score: " + this.quizScore + "%");
        console.log("Attempted: " + this.attempted);
    }

    startTimer(): void {
        this.timer = window.setInterval(() => {
            this.totalRemainingTime--;
            this.mm = Math.floor(this.totalRemainingTime / 60);
            this.ss = this.totalRemainingTime % 60;
            if (this.totalRemainingTime <= 0) {
                window.clearInterval(this.timer);
                this.evaluateQuizResult(true);
            }
        }, 1000);
    }
}
