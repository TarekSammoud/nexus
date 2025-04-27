import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoleType } from '../../core/entities/user/enums';
import { SignUp } from '../../core/entities/user/signup.model';
import { AuthService } from '../../core/services/user-management/auth.service'; // ✅ utiliser AuthService

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user: SignUp;
  RoleType = RoleType;
  emailError: string | null = null;
  phoneError: string | null = null;

  isAdmin: boolean = false; // tu l'avais mis mais on va l'initialiser bien


  constructor(private authService: AuthService, private router: Router) {
    this.user = new SignUp({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      roleType: RoleType.PLAYER,
    });
  }

  ngOnInit(): void {
    const role = localStorage.getItem('user_role');
    this.isAdmin = role === 'ADMIN';  // ✅
  }

  onSubmit(): void {
    if (!this.user.email || !this.user.password) {
      alert('Email and password are required');
      return;
    }

    // Check for unique email
    this.authService.checkEmailUnique(this.user.email).subscribe({
      next: (isUnique) => {
        if (!isUnique) {
          this.emailError = 'This email is already taken. Please choose another one.';
          return;  // Stop if the email is not unique
        }

        // Check for unique phone number (if provided)
        if (this.user.phoneNumber) {
          this.authService.checkPhoneUnique(this.user.phoneNumber).subscribe({
            next: (isPhoneUnique) => {
              if (!isPhoneUnique) {
                this.phoneError = 'The phone number is already taken.';
                return;  // Stop if the phone number is not unique
              }

              // If everything is valid, register the user
              this.authService.register(this.user).subscribe({
                next: () => {
                  console.log('Signup successful');
                  if (this.isAdmin) {
                    // If admin, stay on the current page
                    alert('User successfully signed up');
                  } else {
                    // If not an admin, redirect to login page
                    this.router.navigate(['/login']);
                  }
                },
                error: (err) => {
                  console.error('Error during signup', err);
                  alert('Error during signup.');
                }
              });
            },
            error: () => {
              this.phoneError = 'Error checking the phone number uniqueness.';
            }
          });
        } else {
          // If no phone number is provided, proceed with registration without checking phone number
          this.authService.register(this.user).subscribe({
            next: () => {
              console.log('Signup successful');
              if (this.isAdmin) {
                // If admin, stay on the current page
                alert('User successfully signed up');
              } else {
                // If not an admin, redirect to login page
                this.router.navigate(['/login']);
              }
            },
            error: (err) => {
              console.error('Error during signup', err);
              alert('Error during signup.');
            }
          });
        }
      },
      error: () => {
        this.emailError = 'Error checking email uniqueness.';
      }
    });
  }


}
