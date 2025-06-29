import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPostRequest } from '../models/add-blog-post-request.model';
import { Observable, Subscription } from 'rxjs';
import { BlogpostService } from '../services/blogpost.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../category/models/category.model';
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnDestroy, OnInit {
  model!: AddBlogPostRequest;
  categories$? : Observable<Category[]>
  private addBlogPostSubscription?: Subscription
  imageUploadSubscription?: Subscription;
  isImageSelectorVisible: boolean = false;

  constructor(private blogpostService: BlogpostService,
    private categoryService: CategoryService,
    private router: Router,
    private imageService: ImageService
  ) {
    this.model = {
      title: "",
      shortDescription: "",
      content: "",
      urlHandle: "",
      featuredImageUrl: "",
      author: "",
      isVisible: true,
      publishedDate: new Date(),
      categories: []
    }
  }
  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();

    this.imageUploadSubscription = this.imageService.onSelectImage().subscribe({
          next: (image) => {
            if (this.model) {
              this.model.featuredImageUrl = image.url;
              this.isImageSelectorVisible = false;
            }
            this.closeImageSelector();
          }
        });
  }

  ngOnDestroy(): void {
    if (this.addBlogPostSubscription) {
      console.log("Destroyed the blogpost subscription");
      this.addBlogPostSubscription.unsubscribe();
    }
    this.imageUploadSubscription?.unsubscribe();
  }

  onFormSubmit() : void {
    console.log(this.model);
    this.addBlogPostSubscription = this.blogpostService.addBlogPost(this.model)
      .subscribe({
        next: (response) => {
          console.log("Blogpost added successfully:", response);
          this.router.navigateByUrl('/admin/blogpost');
        },
        error: (error) => {
          console.error("Error occurred:", error);
        }
      });
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }
  closeImageSelector(): void {
    this.isImageSelectorVisible = false;
  }
}
