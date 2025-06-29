import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddBlogPostRequest } from '../models/add-blog-post-request.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { BlogPost } from '../models/blogpost.model';
import { UpdateBlogPost } from '../models/update-blog-post-request.model';

@Injectable({
  providedIn: 'root'
})
export class BlogpostService {

  constructor(private http: HttpClient) { }

  addBlogPost (model: AddBlogPostRequest) : Observable<void> {
    return this.http.post<void>(environment.apiBaseUrl + '/api/blogposts?addAuth=true', model)
  }
  
  getBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(environment.apiBaseUrl + '/api/blogposts');
  }

  getBlogPostById(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}`);
  }

  getBlogPostByUrlHandle(url: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${url}`);
  }
  
  updateBlogPost(id: string, updateBlogPost:UpdateBlogPost): Observable<BlogPost> {
    return this.http.put<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}?addAuth=true`, updateBlogPost);
  }

  deleteBlogPost(id: string): Observable<BlogPost> {
    return this.http.delete<BlogPost>(`${environment.apiBaseUrl}/api/blogposts/${id}?addAuth=true`);
  }
}
