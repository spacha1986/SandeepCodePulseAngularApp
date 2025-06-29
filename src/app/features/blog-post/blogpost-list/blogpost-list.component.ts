import { Component, OnInit } from '@angular/core';
import { BlogpostService } from '../services/blogpost.service';
import { BlogPost } from '../models/blogpost.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {

  allBlogPosts$?: Observable<BlogPost[]>;

  constructor (private blogpostService : BlogpostService) {

  }

  ngOnInit(): void {
      //get all blog post from api
      this.fetchBlogPosts();
  }

  fetchBlogPosts() : void {
    this.allBlogPosts$ = this.blogpostService.getBlogPosts();
  }

}
