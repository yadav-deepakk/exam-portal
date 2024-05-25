import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryModel } from "src/app/models/category";
import { CategoryService } from "src/app/services/category.service";
import Swal from "sweetalert2";

@Component({
    selector: "app-update-category",
    templateUrl: "./update-category.component.html",
    styleUrls: ["./update-category.component.css"],
})
export class UpdateCategoryComponent implements OnInit {
    public categoryIdRouteParam: Number | undefined = undefined;
    public categoryData: CategoryModel | null = null;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private categService: CategoryService,
        private snack: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.categoryIdRouteParam = this.activatedRoute.snapshot.params["categoryId"];
        if (this.categoryIdRouteParam) {
            this.categService.getCategoryById(this.categoryIdRouteParam!).subscribe(
                (data: CategoryModel) => {
                    console.log("Data: " + data);
                    this.categoryData = data;
                },
                (error: any) => {
                    console.log("error occured in receveing category data.");
                    Swal.fire({
                        icon: "error",
                        title: "Category Data",
                        text: "Unable to receive category data.",
                    });
                }
            );
        }
    }

    public onUpdateCategoryFormSubmit(): void {
        console.log("Update button pressed");
        // 1. validate the form
        let validation: boolean = this.validateUpdateCategoryForm();
        if (!validation) {
            console.log("Invalid Form Data!");
            return;
        }

        console.log("Validation done.");

        // 2. Update in the database.
        this.categService.updateCategory(this.categoryData!).subscribe(
            (data: CategoryModel) => {
                console.log("updated data: " + data);
                if (data.categoryId) {
                    Swal.fire({
                        icon: "success",
                        title: "Category Update",
                        text: "Update Successful.",
                    }).then((res) => {
                        // 3. redirection to the all categories page.
                        if (res.isConfirmed) this.router.navigate(["admin/category"]);
                    });
                }
            },
            (error: any) => {
                Swal.fire({
                    icon: "error",
                    title: "Category Update",
                    text: "Error in updating the new category data",
                });
            }
        );
    }

    public validateUpdateCategoryForm(): boolean {
        if (this.categoryData?.categoryTitle == null || this.categoryData?.categoryTitle?.trim() == "") {
            this.snack.open("Please enter a category title", "OK", { duration: 3000 });
            return false;
        }

        let titleLen: number = this.categoryData?.categoryTitle?.trim().length ?? 0;
        if (titleLen < 1 && titleLen > 1000) {
            this.snack.open("category title can be 100 characters long.", "OK", {
                duration: 3000,
            });
            return false;
        }

        let descriptionLen: number = this.categoryData?.categoryDescription?.trim().length ?? 0;
        if (descriptionLen < 1 && descriptionLen > 2500) {
            this.snack.open("category description can be 2500 character long!", "OK", { duration: 3000 });
            return false;
        }

        return true;
    }
}
