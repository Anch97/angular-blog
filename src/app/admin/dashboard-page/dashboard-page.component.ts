import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = []
  postsSub!: Subscription // variable for clearing the subscription to avoid memory leaks
  deleteSub!: Subscription
  searchStr = ''
  displayedColumns: string[] = ['position','author', 'title', 'date', 'action'];

  constructor(
    private postsService: PostsService,
    private alertService: AlertService
    ) { }

  ngOnInit(): void {
    this.postsSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts
    })
  }

  remove(id: string) {
    this.deleteSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id)
      this.alertService.danger('Post was deleted')
    })
  }

  ngOnDestroy() {
    if(this.postsSub) {
      this.postsSub.unsubscribe()
    }

    if(this.deleteSub) {
      this.deleteSub.unsubscribe()
    }
  }
}
