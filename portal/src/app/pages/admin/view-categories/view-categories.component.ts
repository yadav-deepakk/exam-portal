import { Component, OnInit } from "@angular/core";
import { CategoryModel } from "src/app/models/category";
import { CategoryService } from "src/app/services/category.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-view-categories",
    templateUrl: "./view-categories.component.html",
    styleUrls: ["./view-categories.component.css"],
})
export class ViewCategoriesComponent implements OnInit {
    categories: CategoryModel[] | null = null;

    constructor(private categService: CategoryService) {}

    ngOnInit(): void {
        this.categService.getCategories().subscribe(
            (data: CategoryModel[]) => {
                console.log("Categories received : \n");
                data.forEach((cat) => console.log(cat.categoryId + " " + cat.categoryTitle));
                this.categories = data;
            },
            (error) => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    text: "Unable to load all categories, Something went wrong!",
                    timer: 1500,
                });
            }
        );
    }
}
