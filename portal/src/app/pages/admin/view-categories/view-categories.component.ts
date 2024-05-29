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

    deleteCategory(id: Number | undefined, title: String | string | undefined): void {
        if (!id) return;

        Swal.fire({
            title: "sure! do you want to delete " + title + "!",
            text: "You wont be able to recover it.",
            confirmButtonText: "Yes, Delete it",
            showCancelButton: true,
            cancelButtonText: "Cancel",
        }).then((res) => {
            if (res.isConfirmed) {
                this.categService.deleteCategory(id).subscribe(
                    (data: Boolean) => {
                        console.log("Deletion data: " + data);
                        if (data === true) {
                            console.log("Deletion successful!");
                            Swal.fire({
                                icon: "success",
                                titleText: "Category Delete",
                                text: "Deletion Successful.",
                            });
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Category Delete",
                                text: "Category Deletion Unsuccesful",
                            });
                        }
                        this.categories = this.categories?.filter((category) => category.categoryId !== id)!;
                    },
                    (error) => {
                        console.log(error);
                        Swal.fire({
                            icon: "error",
                            title: "Category Delete",
                            text: "Something went wrong!",
                        });
                    }
                );
            }
        });
    }
}
