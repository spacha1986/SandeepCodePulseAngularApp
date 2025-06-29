import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogImage } from '../models/blog-image.model';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  selectedImage?: BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
    id: '',
    fileName: '',
    title: '',
    url: '',
    fileExtension: '',
    dateCreated: ''
  });

  constructor(private http: HttpClient) { }

  uploadImage(file:File, fileName:string, title:string): Observable<BlogImage> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', title);

    return this.http.post<BlogImage>(environment.apiBaseUrl + '/api/images', formData);
  } 

  getAllImages() : Observable<BlogImage[]> {
    return this.http.get<BlogImage[]>(environment.apiBaseUrl + '/api/images');
  }

  selectImage(image: BlogImage): void {
    // Logic to handle image selection, e.g., emit an event or update a service state
    console.log('Image selected:', image);
    this.selectedImage?.next(image);  
  }

  onSelectImage(): Observable<BlogImage> {
    return this.selectedImage?.asObservable() || new Observable<BlogImage>();
  }
  
}
