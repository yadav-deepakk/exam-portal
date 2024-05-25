import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { QuizModel } from "../models/quiz";

const baseURL: String|string = "http://localhost:8080/quiz";

@Injectable({
    providedIn: "root",
})
export class QuizService {
    constructor(private http: HttpClient) {}

    public postQuiz(quiz: QuizModel): Observable<QuizModel> {
        return this.http.post<QuizModel>(`${baseURL}`, quiz);
    }

    public getAllQuiz(): Observable<QuizModel[]> {
        return this.http.get<QuizModel[]>(`${baseURL}`);
    }

    public getQuizById(id: BigInt): Observable<QuizModel> {
        return this.http.get<QuizModel>(`${baseURL}/${id}`);
    }

    public updateQuiz(quiz: QuizModel): Observable<QuizModel> {
        return this.http.put<QuizModel>(`${baseURL}`, quiz);
    }

    public deleteQuizById(id: BigInt): Observable<Boolean> {
        return this.http.delete<Boolean>(`${baseURL}/${id}`);
    }
}
