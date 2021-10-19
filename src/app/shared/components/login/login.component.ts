import {Component, OnInit} from '@angular/core';
import {AuthService} from '@app/modules/auth/shared/_services/auth.service';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginRequest, SignUpRequest} from '@app/modules/auth/shared/_models/User';
import {EnterTriggerAnimation} from '@shared/_animations/animations';

import anime from 'animejs/lib/anime.es.js';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	animations: [
		EnterTriggerAnimation
	],
	providers: [AuthService]
})
export class LoginComponent implements OnInit {
	userName: FormControl = new FormControl('', [Validators.required, Validators.nullValidator, Validators.minLength(6), Validators.maxLength(255)]);
	email: FormControl = new FormControl('', [Validators.required, Validators.nullValidator, Validators.minLength(10), Validators.email, Validators.maxLength(255)]);
	password: FormControl = new FormControl('', [Validators.required, Validators.nullValidator, Validators.minLength(8)]);
	loginFormGroup: FormGroup;
	registerFormGroup: FormGroup;
	toggleForms = true;

	constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
		if (localStorage.getItem('token') && authService.currentUserValue) {
			// os._snackbar.open('Redirecting to dashboard')._dismissAfter(2000);
			setTimeout(() => this.router.navigate(['../dashboard']).then(() => null), 2000);
		}
		this.loginFormGroup = this.fb.group([this.email, this.password]);
		this.registerFormGroup = this.fb.group([this.userName, this.email, this.password]);
	}

	ngOnInit(): void {
		// const overlayRef = this.overlay.create();
		// const userProfilePortal = new ComponentPortal(UserProfileComponent);
		// overlayRef.attach(userProfilePortal);
		anime({
			targets: 'svg path',
			d: 'm-2,-110.30547c213.92539,-164.88947 427.85073,164.88946 641.77607,0l0,296.80101c-139.92534,-24.11052 -264.85068,196.11055 -641.77607,0l0,-296.80101z',
			easing: 'easeOutQuad',
			duration: 4000,
			direction: 'alternate',
			loop: true,
		});
	}

	async register(): Promise<void> {
		await this.authService.attemptToRegister(new SignUpRequest(this.userName.value, this.email.value, this.password.value))
			.then(value => console.log(value));
	}

	async login(): Promise<void> {
		await this.authService.attemptToLogin(new LoginRequest(this.email.value, this.password.value))
			.then(value => console.log(value));
	}

}
