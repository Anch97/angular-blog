import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger

  constructor(
    private router: Router,
    public auth: AuthService
    ) {}

  ngOnInit(): void {
  }

  // navigation to admin/login page via button
  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/admin', 'login'])
  }

  someMethod() {
    this.trigger.openMenu()
  }
}
