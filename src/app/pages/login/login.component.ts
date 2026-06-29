import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  loading = false;
  serverError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get email() {
    return this.form.get('email')!;
  }

  get password() {
    return this.form.get('password')!;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.serverError = null;
    const { email, password } = this.form.value;

    try {
      this.auth.login(email, password).subscribe({
        next: () => {
          this.loading = false;
          const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo');
          this.router.navigate([redirectTo ? `/${redirectTo}` : '/']);
        },
        error: (err) => {
          this.loading = false;
          this.serverError = err?.message ?? 'Something went wrong. Try again.';
        }
      });
    } catch (err) {
      this.loading = false;
      this.serverError = (err as any)?.message ?? 'Something went wrong. Try again.';
    }
  }
}