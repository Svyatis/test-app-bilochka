import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  loginForm: FormGroup;
  loading = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    this.authService.user.subscribe(user => { if (user) { this.router.navigate(['/admin']); } });
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (window.innerWidth < 767) {
      window.scrollTo({
        top: window.innerHeight - 30
      });
    }
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    this.authService.login(this.f.username.value, this.f.password.value).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
    }).then((user: any) => {
      this.authService.updateUserData(user.user);
    }).finally(() => {
      this.loading = false;
      this.router.navigate(['/admin']);
    });
  }
}
