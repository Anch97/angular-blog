import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { FbCreateResponse, Post } from "./interfaces";

@Injectable({
  providedIn: 'root'
})

export class PostsService {

  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    // due to firebase rules to show that we work with json we need to type .json
    return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
    // map allows transforming data from stream
      .pipe(map((response: FbCreateResponse | any) => {
        return {
          // spread operator
          ...post,
          id: response.name,
          date: new Date(post.date)
        }
      }))
  }

  // this method will get all posts that there are in database and parse it
  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
    // we use map to unparse the response, transform it and put everything in array
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response) //gives us array of IDs
          .map(key => ({ // here we transform every object into post object on frontend
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }))
        return []
      }))
  }

  // getting posts by id by parsing it
  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${environment.fbDbUrl}/posts/${id}.json`)
      .pipe(map((post: Post | any) => {
        return {
          ...post,
          id,
          date: new Date(post.date)
        }
      }))
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)
  }

  // patch() allows to partially update some data
  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.fbDbUrl}/posts/${post.id}.json`, post)
  }

}
