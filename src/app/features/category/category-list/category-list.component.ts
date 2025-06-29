import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit{

  constructor(private categoryService: CategoryService) {

  }
  categories: any[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  allcategories$?: Observable<Category[]>;
  list: number[] = [];
  totalcount?: number;
  pageNumber: number = 1;
  pageSize: number = 5;

  ngOnInit(): void {
    //this.fetchCategories();
    this.fetchCategoriesWithPipes();
  }

  fetchCategoriesWithPipes(): void {
    
    this.categoryService.getCategoryCount().subscribe({
      next: (count) => {
        this.totalcount = count;
        this.list = new Array(Math.ceil(this.totalcount / this.pageSize));
        this.allcategories$ = this.categoryService.getCategories(
          undefined, 
          undefined, 
          undefined, 
          this.pageNumber, 
          this.pageSize
        );
      }
    });
  }

  fetchCategories(): void {
    this.isLoading = true;
    this.error = null;
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load categories.';
        this.isLoading = false;
      }
    });
  }

  
  onSearch(queryText: string) {
    this.allcategories$ = this.categoryService.getCategories(queryText);
  }

  searchAndSortBy(queryText?: string, sortBy?: string, sortDirection?: string) {
    this.allcategories$ = this.categoryService.getCategories(queryText, sortBy, sortDirection);
  }

  getPage(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.allcategories$ = this.categoryService.getCategories(undefined, undefined, undefined, pageNumber, this.pageSize);
  }

  getPrevPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getPage(this.pageNumber);
    }
  }

  getNextPage() {
    if (this.pageNumber < this.list.length) {
      this.pageNumber++;
      this.getPage(this.pageNumber);
    } 
  }

}
