import { Component, OnInit } from "@angular/core";
import { CategoryModel } from "src/app/models/category";
import { CategoryService } from "src/app/services/category.service";

@Component({
    selector: "app-user-sidebar",
    templateUrl: "./user-sidebar.component.html",
    styleUrls: ["./user-sidebar.component.css"],
})
export class UserSidebarComponent implements OnInit {
    categories: CategoryModel[] | null = null;
    constructor(private categoryService: CategoryService) {}
    ngOnInit(): void {
        this.categoryService.getCategories().subscribe(
            (data: CategoryModel[]) => {
                console.log("received category: " + data);
                this.categories = data;
            },
            (error: any) => {
                console.log("error: " + error);
            }
        );
    }
}
