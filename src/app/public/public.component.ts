import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from '../services/posts.service';
import {PostType} from "../models/post.model";
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss']
})
export class PublicComponent implements OnInit {
  postData: PostType[] = [];
  totalPosts = 10;
  postsPerPage = 5;
  pageSizeOptions = [2,5,10,20];
  constructor(private postService: PostsService, public router : Router) {}
  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this.postService.getPosts().subscribe((posts:any) => {
      this.postData = posts;
    });
  }

  onChangePage(event : PageEvent){
    console.log(event);
  }
}
