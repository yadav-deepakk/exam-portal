import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { QuestionModel } from "src/app/models/question";
import { QuestionService } from "src/app/services/question.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-quiz-questions",
    templateUrl: "./quiz-questions.component.html",
    styleUrls: ["./quiz-questions.component.css"],
})
export class QuizQuestionsComponent implements OnInit {
    quizIdQueryParam: BigInt | undefined = undefined;
    quizTitleQueryParam: String | string | undefined = undefined;
    allQuestionsOfQuiz: QuestionModel[] | null = null;

    constructor(private activatedRoute: ActivatedRoute, private questionService: QuestionService) {}

    ngOnInit(): void {
        this.quizIdQueryParam = this.activatedRoute.snapshot.params["quizId"];
        this.quizTitleQueryParam = this.activatedRoute.snapshot.params["quizTitle"];
        if (this.quizIdQueryParam) {
            this.questionService.getAllQuestionOfQuizForAdmin(this.quizIdQueryParam).subscribe(
                (data: QuestionModel[]) => {
                    console.table(data);
                    this.allQuestionsOfQuiz = data;
                },
                (error: any) => {
                    console.log("error: " + error);
                    Swal.fire({
                        icon: "error",
                        title: "Questions Fetch",
                        text: "Unable to fetch the questions of quiz " + this.quizTitleQueryParam + "!",
                    });
                }
            );
        }
    }

    deleteQuestion(id: BigInt | undefined, content: string | String | undefined): void {
        if (id && content) {
            Swal.fire({
                icon: "info",
                title: "Question Delete",
                showCancelButton: true,
                cancelButtonText: "Cancel",
                confirmButtonText: "Yes, Delete it!",
                text: "Are you sure ? \n Delete:  " + content + "\nYou won't be able to revert this",
            }).then((res) => {
                if (res.isConfirmed) {
                    // fire delete query;
                    this.questionService.deleteQuestion(id).subscribe(
                        (data: Boolean) => {
                            console.log("deletion :" + data);
                            if (data === true) {
                                // display success;
                                Swal.fire({
                                    icon: "success",
                                    title: "Question Delete",
                                    text: "Question has been deleted successfully.",
                                });
                                console.log("filter out: " + id);
                                this.allQuestionsOfQuiz = this.allQuestionsOfQuiz?.filter(
                                    (ques) => ques.questionId !== id
                                )!;
                                console.log("After filter");
                                console.table(this.allQuestionsOfQuiz);
                            } else {
                                // display error (if any);
                                Swal.fire({
                                    icon: "error",
                                    title: "Question Delete",
                                    text: "Some error in question deletion.",
                                });
                            }
                        },
                        (error: any) => {
                            Swal.fire({
                                icon: "error",
                                title: "Question Delete",
                                text: "Some error in question deletion.",
                            });
                        }
                    );
                }
            });
        }
    }
}
