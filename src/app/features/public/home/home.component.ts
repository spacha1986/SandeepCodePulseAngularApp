import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../../blog-post/services/blogpost.service';
import { BlogPost } from '../../blog-post/models/blogpost.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogs$?: Observable<BlogPost[]>;

  constructor(private blogPostService: BlogpostService) { }

  ngOnInit(): void {
    this.loadBlogPosts();
  }

  loadBlogPosts(): void {
    this.blogs$ = this.blogPostService.getBlogPosts();
    console.log('Blog posts loaded:', this.blogs$);
  }

}
