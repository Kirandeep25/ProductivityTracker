import { Component } from '@angular/core';
import{ FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserServiceService } from '../user-service.service';
import { User } from '../user';
import { provideRouter, Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [FormsModule, HttpClientModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userid: number = 0;
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private userService: UserServiceService, private router: Router) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Passwords do not match!";
      return;
    }

    const user = { userid: this.userid, username:this.username, password: this.password };

    this.userService.register(user).subscribe(
      response => {
        alert("Registration Successful! Redirecting to Login..."); 
        //this.userid = 0;
        //this.password = '';
        //this.confirmPassword = '';
        //this.errorMessage = '';
        this.router.navigate(['/login']);
      },
      error => {
        if (error.error === "User ID already exists!") {
          alert("User ID already exists! Redirecting to Login...");
          this.router.navigate(['/login']); 
        } else {
          this.errorMessage = error.error || "Registration failed!";
        }
      }
    );
  }
}
