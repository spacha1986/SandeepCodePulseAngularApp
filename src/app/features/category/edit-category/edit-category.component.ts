import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request';
import { AlertService } from '../../common/alertdialogs/services/alert.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  categoryId: string | null = null;
  paramsSubscription?: Subscription;
  editCategorySubscription?: Subscription;
  deleteCategorySubscription?: Subscription;
  category?: Category

  constructor (private route: ActivatedRoute, 
    private categoryService: CategoryService,
    private alertService: AlertService,
    private router: Router) {

  }
  

  ngOnInit(): void {
    // Retrieve the category ID from the route parameters
    this.paramsSubscription = this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('id');
      if (this.categoryId) {
        this.categoryService.getCategoryById(this.categoryId)
        .subscribe({
          next: (response) =>{
            this.category = response;
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
    this.deleteCategorySubscription?.unsubscribe();
  }

  onFormSubmit() :void {
    const updateCategoryRequest : UpdateCategoryRequest = {
      name : this.category?.name ?? '',
      urlHandle : this.category?.urlHandle ?? ''
    }

    if (this.categoryId) {
      this.editCategorySubscription = this.categoryService.updateCategory(this.categoryId, updateCategoryRequest)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/categories')
          }
        })
    }
  }

  onDelete() : void {
    this.alertService.confirm('Delete Category Confirmation', 
      `Are you sure to delete category with id ${this.categoryId}?`, 
      'Yes',
      'No'
    )
    .then((confirmed) => {
      if (confirmed) {
        if (this.categoryId) {
        this.deleteCategorySubscription = this.categoryService.deleteCategory(this.categoryId)
          .subscribe({
            next: (response) => {
              this.router.navigateByUrl('/admin/categories')
            }
          })
        }
      }
    })
    .catch(() => {

    })
  }
}
