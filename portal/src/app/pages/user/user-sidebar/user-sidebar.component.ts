import { Component, OnInit } from "@angular/core";
import { CategoryModel } from "src/app/models/category";
import { CategoryService } from "src/app/services/category.service";
import Swal from "sweetalert2";

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
                console.log(data);
                this.categories = data;
            },
            (error: any) => {
                console.log("error: " + error);
                Swal.fire({
                    icon: "error",
                    title: "Categories Retreival",
                    text: "Error in loading categories from server!",
                });
            }
        );
    }
}
