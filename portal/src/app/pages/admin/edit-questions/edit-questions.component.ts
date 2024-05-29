import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { QuestionModel } from "src/app/models/question";
import { QuestionService } from "src/app/services/question.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-edit-questions",
    templateUrl: "./edit-questions.component.html",
    styleUrls: ["./edit-questions.component.css"],
})
export class EditQuestionsComponent implements OnInit {
    quizIdQueryParam: BigInt | undefined = undefined;
    quizTitleQueryParam: String | string | undefined = undefined;
    questionIdQueryParam: BigInt | undefined = undefined;
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
        private quesService: QuestionService,
        private snack: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.quizIdQueryParam = this.activatedRoute.snapshot.params["quizId"];
        this.quizTitleQueryParam = this.activatedRoute.snapshot.params["quizTitle"];
        this.questionIdQueryParam = this.activatedRoute.snapshot.params["questionId"];

        if (this.questionIdQueryParam) {
            this.quesService.getQuestionById(this.questionIdQueryParam).subscribe(
                (data: QuestionModel) => {
                    console.log("data recieved: " + data);
                    this.question = data;
                },
                (error: any) => {
                    console.log("Error received in getting the question " + error);
                    Swal.fire({
                        icon: "error",
                        title: "Question Get",
                        text: "Error in getting question details.",
                    });
                }
            );
        } else {
            this.snack.open("Error in getting question Id", "OK", { duration: 2400 });
        }
    }

    updateQuestion(): void {
        // validate form and return if error exists.
        let validation: boolean = this.validateForm();
        if (!validation) {
            console.log("Form validation failed!!");
            return;
        }

        // update question in backend through API call.
        this.quesService.updateQuestion(this.question!).subscribe(
            (data: QuestionModel) => {
                console.log("Success in receiving data: " + data);
                // show success if update successful.
                if (data.questionId) {
                    Swal.fire({
                        icon: "success",
                        title: "Question Update",
                        text: "Question update success.",
                    });
                    this.router.navigate([
                        `/admin/questions/quiz/${this.quizIdQueryParam}/${this.quizTitleQueryParam}`,
                    ]);
                } else {
                    console.log("Error in updating the question");
                    Swal.fire({
                        icon: "error",
                        title: "Question Update",
                        text: "Error Received in updating the question.",
                    });
                }
            },
            (error: any) => {
                // show error if any.
                console.log("Error in updating the question" + error);
                Swal.fire({
                    icon: "error",
                    title: "Question Update",
                    text: "Error Received in updating the question.",
                });
            }
        );
    }

    validateForm(): boolean {
        // all empty and null checks
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
