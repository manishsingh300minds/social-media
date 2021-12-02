import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { PostType } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  api = environment.serverUrl;
  constructor(private http: HttpClient) { }

  getPosts(postsPerPage: number, currentPage : number): Observable<any> {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`;
    return this.http.get<any>(this.api + '/listing'+queryParams).pipe(map((postData: any) => {
      return  {
        posts: postData.posts.map((post: any) => {
          return {
            title: post.title,
            description: post.description,
            id: post._id,
            image: post.image
          }
        }),
        maxPosts : postData.maxPosts
      }
    }),
      catchError(this.handleError));
  }

  addPost(data: any): Observable<any> {
    const postData = new FormData();
    postData.append("title", data.title);
    postData.append("description", data.description);
    postData.append("image", data.image, data.image.name);
    return this.http.post<Task>(this.api + 'create', postData).pipe(catchError(this.handleError));
  }

  updatePost(id: string, title: string, description: string, image: File | string | null) {
    let postData: PostType | FormData;
    if (typeof (image) === 'object' && image) {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("description", description);
      postData.append("image", image, image.name);
    }
    else {
      if(image)
      postData = {
        id: id,
        title: title,
        description: description,
        image: image
      }
    }
    // @ts-ignore
    return this.http.put(`${this.api}/create/${id}`, postData).pipe(catchError(this.handleError));
  }

  deletePost(id: string): Observable<any> {
    return this.http.delete<void>(`${this.api}/listing/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<any> {
    if (errorResponse.error instanceof Error) {
      console.log("Client Side Error:", errorResponse.error.message);
    }
    else {
      console.log("Client Side Error:", errorResponse);
    }
    return errorResponse.error;
  }
}
