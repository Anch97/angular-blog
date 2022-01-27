import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { of, Subscription, switchMap } from 'rxjs';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from 'src/app/shared/posts.service';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  // form will allow us to change data of particular post
  form!: FormGroup
  // in order to save id of the post we create here post variable
  post!: Post
  submitted = false

  updateSub!: Subscription

  // activatedroute - current route opened
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private alertservice: AlertService
    ) { }

  // we dont need to unsubscribe from routes because angular does it automatically, we need to unsubscribe only from streams we make by ourselves
  // first we need to make a request to database in order to get separate post by its id
  // switchMap subscribes also to internal observable and cancels previous subscription
  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getById(params['id'])
        })
      ).subscribe((post: Post) => {
        this.post = post
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required),
          author: new FormControl(post.author, Validators.required)
        })
      })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    this.updateSub = this.postsService.update({
      // we use spread allows here to not define id, date and author (because we dont need to update them) and type only text and title that we need to update
      ...this.post,
      text: this.form.value.text,
      title: this.form.value.title
    }).subscribe(() => {
      this.submitted = false
      this.alertservice.success('Post was updated')
    })
  }

  ngOnDestroy(){
    if(this.updateSub) {
      this.updateSub.unsubscribe()
    }
  }
}
