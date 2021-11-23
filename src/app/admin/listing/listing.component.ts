import { Component, Input, OnInit} from '@angular/core';
import { PostsService } from '../../posts.service';
import {ActivatedRoute, Router, RouterModule} from "@angular/router";

@Component({
  selector: 'listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  postData: PostType[] = [];
  expand = false;
  previousId = 0;

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
export type PostType = {
  title? : string,
  description? : string
}
