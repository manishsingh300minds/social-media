import { Component, OnInit} from '@angular/core';
import { PostsService } from '../../services/posts.service';
import {Router} from "@angular/router";
import {PostType} from "../../models/post.model";

@Component({
  selector: 'listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  postData: PostType[] = [];
  expand = false;
  previousId = 0;

  constructor(private postService: PostsService, public router : Router) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this.postService.getPosts().subscribe((posts:any) => {
      this.postData = posts;
    });
  }

  deletePost(post : any){
    const postId = post.id;
    this.postService.deletePost(postId).subscribe(
      () => {
        alert(post.title+'post has been deleted')
      },
      (err) => console.log("Error: ",err)
    );
    this.postData = this.postData.filter(data => data !== post);
  }
}
