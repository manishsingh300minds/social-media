import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostType } from '../admin/listing/listing.component';
import { PostsService } from '../posts.service';

@Component({
  selector: 'public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {

  postData: PostType[] = [];

  constructor(private postService: PostsService, public router : Router) {
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this.postService.getPosts().subscribe((posts:any) => {
      this.postData = posts;
      console.log("Post Data",this.postData)
    });
  }
}