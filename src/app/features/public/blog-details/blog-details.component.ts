import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogpostService } from '../../blog-post/services/blogpost.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../../blog-post/models/blogpost.model';
@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  url: string | null = null;
  blogPost$? : Observable<BlogPost>

  constructor(private route: ActivatedRoute, private blogPostService: BlogpostService) { 

  }

  ngOnInit(): void {
    this.route.paramMap
    .subscribe(params => {
      this.url = params.get('url');
      console.log('Blog URL from route:', this.url);
      if (this.url) {
        this.loadBlogPostByUrl(this.url);
      }
    });
  }

  loadBlogPostByUrl(url: string): void {
    this.blogPost$ = this.blogPostService.getBlogPostByUrlHandle(url);
  }
  
}
