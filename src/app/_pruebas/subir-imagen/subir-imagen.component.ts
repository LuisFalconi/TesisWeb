import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-subir-imagen',
  templateUrl: './subir-imagen.component.html',
  styleUrls: ['./subir-imagen.component.css']
})
export class SubirImagenComponent implements OnInit {

  constructor() { }

  public newPostForm = new FormGroup({
    titlePost: new FormControl ('', Validators.required),
    contentPost: new FormControl('', Validators.required),
    tagsPost: new FormControl('', Validators.required),
    imagePost: new FormControl('', Validators.required),
  });

  ngOnInit() {
  }

//   addNewPost(data: PostI) {
//     console.log('New post', data);
//     this.postSvc.preAddAndUpdatePost(data, this.image);
//   }

//   handleImage(event: any): void {
//     this.image = event.target.files[0];
//   }

 }
