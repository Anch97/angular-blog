import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Post } from '../shared/interfaces';
import { PostsService } from '../shared/posts.service';

// we get id of the post, load this post and withdraw it in layout

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$!: Observable<Post>

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
    ) {}


  ngOnInit() {
    this.post$ = this.route.params
    //we call pipe() to change the stream and switchmap which allows to change direction of the stream from params to needed stream 
      .pipe(switchMap((params: Params) => {
        return this.postsService.getById(params['id'])
      }))
  }

}
