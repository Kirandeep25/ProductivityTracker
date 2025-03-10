import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../user-service.service';
import { User } from '../user';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userid: number = 0;
  password: string = '';
  errorMessage: string = '';

  constructor(private userService: UserServiceService, private router: Router) {}

  ngOnInit() {}

  login() {
    const user: User = {
      userid: this.userid,
      password: this.password
    };

    this.userService.login(user).subscribe({
      next: (response: any) => {
        console.log('Login successful!', response);

        if (response && response.userid) {
          localStorage.setItem('user', JSON.stringify(response)); // ✅ Store user in localStorage
          this.router.navigate(['/tasks']); // ✅ Redirect to task list
        } else {
          this.errorMessage = 'Invalid response from server';
        }
      },
      error: (error) => {
        console.error('Error logging in:', error);
        this.errorMessage = 'Invalid credentials! Please try again.';
      }
    });
  }
}
