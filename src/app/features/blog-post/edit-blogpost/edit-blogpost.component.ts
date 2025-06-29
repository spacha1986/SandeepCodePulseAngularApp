import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlogpostService } from '../services/blogpost.service';
import { CategoryService } from '../../category/services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../models/blogpost.model';
import { Category } from '../../category/models/category.model';
import { UpdateBlogPost } from '../models/update-blog-post-request.model';
import { AlertService } from '../../common/alertdialogs/services/alert.service';
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.css']
})
export class EditBlogpostComponent implements OnInit, OnDestroy {

  blogpostId: string | null = null;
  paramsSubscription?: Subscription;
  model?: BlogPost; 
  categories$? : Observable<Category[]>;
  selectedCategories? : string[];
  updateBlogPostSubscription?: Subscription;
  getBlogPostSubscription?: Subscription;
  deleteBlogPostSubsription?: Subscription;
  imageUploadSubscription?: Subscription;
  isImageSelectorVisible: boolean = false;

  constructor(private route: ActivatedRoute, 
      private blogpostService: BlogpostService,
      private categoryService: CategoryService,
      private router: Router,
      private alertService: AlertService,
      private imageService: ImageService) {
        
      }
      
  

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();

    // Retrieve the category ID from the route parameters
    this.paramsSubscription = this.route.paramMap.subscribe(
      params => {
        this.blogpostId = params.get('id');
        console.log('blogpost id: ', this.blogpostId);

        // Get blogpost from api
        if (this.blogpostId) {
          this.getBlogPostSubscription = this.blogpostService.getBlogPostById(this.blogpostId)
          .subscribe({
            next: (response) =>{
              this.model = response;
              this.selectedCategories = response.categories.map(x => x.id);
            }
          });
        }

        this.imageUploadSubscription = this.imageService.onSelectImage().subscribe({
          next: (image) => {
            if (this.model) {
              this.model.featuredImageUrl = image.url;
              this.isImageSelectorVisible = false;
            }
            this.closeImageSelector();
          }
        });
      });
  }

  onFormSubmit(): void {
    // convert this model to Request object
    if (this.model && this.blogpostId) {
      var updateBlogPost : UpdateBlogPost = {
        title: this.model.title,
        shortDescription: this.model.shortDescription,
        content: this.model.content,
        urlHandle: this.model.urlHandle,
        author: this.model.author,
        featuredImageUrl: this.model.featuredImageUrl,
        publishedDate: this.model.publishedDate,
        isVisible: this.model.isVisible,
        categories: this.selectedCategories ?? []
      }

      this.updateBlogPostSubscription = this.blogpostService.updateBlogPost(this.blogpostId, updateBlogPost)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/blogposts');
          }
        })

    }
    
  }

  onDelete() : void {
    console.log("deleting....");
    this.alertService.confirm('Delete BlogPost Confirmation', 
      `Are you sure to delete blogpost with id ${this.blogpostId}?`, 
      'Yes',
      'No'
    )
    .then((confirmed) => {
      console.log("modal closed...");
      if (confirmed) {
        if (this.blogpostId) {
          this.deleteBlogPostSubsription = this.blogpostService.deleteBlogPost(this.blogpostId)
          .subscribe({
            next:(response) => {
              console.log("Deleted hence going to blogpost list")
              this.router.navigateByUrl('/admin/blogposts');
            }
          });
        }
      }
    })
    .catch(() => {

    })
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }
  closeImageSelector(): void {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    console.log('Component EditBlogpostComponent destroyed');
    this.paramsSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubsription?.unsubscribe();
    this.imageUploadSubscription?.unsubscribe();
  }
}
