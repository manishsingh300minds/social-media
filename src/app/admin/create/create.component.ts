import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {mimeType} from "./mime-type.validator";

@Component({
  selector: 'create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  private _success = new Subject<string>();
  alertMessage = '';
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert!: NgbAlert;

  postForm!: FormGroup;
  public mode = 'create';
  post: any;
  editPostId : any;
  cardTitle = '';
  submitText = '';
  imagePreview: any = null;


  constructor(private postService : PostsService, public route : ActivatedRoute, public router: Router) {}

  ngOnInit(): void {
    this._success.subscribe(message => this.alertMessage = message);

    this.postForm = new FormGroup({
      'title' : new FormControl(null,{
        validators : [Validators.required]
      }),
      'description' : new FormControl(null,{
        validators : [Validators.required]
      }),
      'image' : new FormControl(null,{
        validators : [Validators.required],
        asyncValidators : [mimeType]
      }),
    });

    this.route.paramMap.subscribe((param) => {
      if(param.has('title')){
        this.post = {
          title : param.get('title'),
          description : param.get('description')
        }
        this.editPostId = param.get('id');
        this.mode = 'edit';
        this.cardTitle = 'Update your Post!!'
        this.submitText = 'Update Post';
      }
      else{
        this.post = {};
        this.mode = 'create';
        this.cardTitle = 'Add a new Post!!'
        this.submitText = 'Add Post';
      }
    });
  }

  addPost(){
    const newPost = this.postForm.value;
    if(this.mode === 'create'){
      this.postService.addPost(newPost).subscribe((res)=>{
        this._success.next(res.msg);
        this._success.pipe(debounceTime(5000)).subscribe(() => {
            if (this.selfClosingAlert)
              this.selfClosingAlert.close();
        });
        this.postForm.reset();
      },
        (error : any) => console.log("Server error:",error));
    }
    else{
      this.postService.updatePost(this.editPostId,newPost.title,newPost.description).subscribe((res) => {
        this._success.next(res.msg);
        this._success.pipe(debounceTime(5000)).subscribe(() => {
            if (this.selfClosingAlert)
              this.selfClosingAlert.close();
        });
        this.router.navigate(['create']);
      },
        (error : any) => console.log("Updating server error:",error));
    }
  }

  onImage(event : Event){
    const target= event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.postForm.patchValue({image: file});
    this.postForm.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(file)
  }
}
