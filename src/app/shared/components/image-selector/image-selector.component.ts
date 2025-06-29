import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Observable, Subscription } from 'rxjs';
import { BlogImage } from '../../models/blog-image.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnInit, OnDestroy{

  private file?: File;
  fileName: string = '';
  title:string = '';
  private uploadImageSubscription?: Subscription;
  images$?: Observable<BlogImage[]>

  @ViewChild('form', {static: false}) imageUploadForm?: NgForm

  constructor(private imageService: ImageService) {

  }
  ngOnInit(): void {
    this.getImages();
  }

  ngOnDestroy(): void {
    if (this.uploadImageSubscription) {
      this.uploadImageSubscription.unsubscribe();
    }
  }

  onFileUploadChanged(event: Event): void {
    const input = event.currentTarget as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      console.log('File selected:', this.file.name);
    } else {
      console.log('No file selected');
    }
  }

  uploadImage(): void {
    if (this.file && this.file.name !== '' && this.title.trim() !== '') {
      // Implement the logic to upload the file, e.g., using a service
      console.log('Uploading file:', this.file.name);
      this.imageService.uploadImage(this.file, this.fileName, this.title)
      .subscribe({
        next: (response) =>{
          console.log(response);
          this.imageUploadForm?.resetForm();
          this.getImages();
        }
      });

    } else {
      console.log('No file to upload');
    }
  }

  private getImages():  void {
    this.images$ = this.imageService.getAllImages()
  }

  selectImage(image: BlogImage): void {
    this.imageService.selectImage(image);
    console.log('Image selected:', image);
  }
}
