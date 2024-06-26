import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CategoryModel } from "../models/category";
import { HttpClient } from "@angular/common/http";
import { QuizModel } from "../models/quiz";

const baseUrl: string = "http://localhost:8080/category";

@Injectable({
    providedIn: "root",
})
export class CategoryService {
    constructor(private http: HttpClient) {}

    public postCategory(category: CategoryModel): Observable<CategoryModel> {
        return this.http.post<CategoryModel>(baseUrl, category);
    }

    public getCategoryById(categoryId: Number): Observable<CategoryModel> {
        return this.http.get<CategoryModel>(`${baseUrl}/${categoryId}`);
    }

    // public getQuizzesByCategoryId(categoryId: Number): Observable<QuizModel[]> {
    //     return this.http.get<QuizModel[]>(`${baseUrl}/quizzes/${categoryId}`);
    // }

    public getCategories(): Observable<CategoryModel[]> {
        return this.http.get<CategoryModel[]>(baseUrl);
    }

    public updateCategory(categoryToBeUpdated: CategoryModel): Observable<CategoryModel> {
        return this.http.put<CategoryModel>(baseUrl, categoryToBeUpdated);
    }

    public deleteCategory(categoryId: Number): Observable<Boolean> {
        return this.http.delete<Boolean>(`${baseUrl}/${categoryId}`);
    }
}
