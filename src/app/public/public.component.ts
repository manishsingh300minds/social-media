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
  expand = false;
  totalPosts = 0;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [2,5,10,20];

  constructor(private postService: PostsService, public router : Router) {}
  ngOnInit(): void {
    this.getPosts(this.postsPerPage,this.currentPage);
  }

  getPosts(postsPerPage : number,currentPage: number) {
    this.postService.getPosts(postsPerPage,currentPage).subscribe((postsData) => {
      this.postData = postsData.posts;
      this.totalPosts = postsData.maxPosts;
    });
  }

  onChangePage(event : PageEvent){
    this.currentPage = event.pageIndex+1;
    this.postsPerPage = event.pageSize;
    this.getPosts(this.postsPerPage,this.currentPage);
  }
}
