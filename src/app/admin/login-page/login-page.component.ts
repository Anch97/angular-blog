import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  // we also connect formsmodule and reactivemodule in admin.module.ts imports
  form!: FormGroup
  submitted = false
  message!: string

  constructor(
    public auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Please, enter the login data.'
      } else if (params['authFailed']) {
        this.message = 'Session ended. Please, enter the login data again.'
      }
    })

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8)
      ])
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    // we add additional verification so user cant click button after log in
    this.submitted = true

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.auth.login(user).subscribe(() => {
      this.form.reset()
      this.router.navigate(['/admin', 'dashboard'])
      this.submitted = false
    }, () => { // for error processing, so the user can press login button if he typed invalid email/password before
      this.submitted = false
    })
  }
}
