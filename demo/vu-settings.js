
window.VuSettings = {
	button: {
		registration: {
			class: 'btn btn-warning me-2',
			label: 'Register',
			icon: 'bi bi-person-plus me-2',
		},
		login:
		{
			class: 'btn btn-outline-primary me-2',
			icon: 'bi bi-box-arrow-in-right me-2',

			dropdowns: [
				{
					class: 'dropdown-item fw-light',
					label: (params, settings, self) => {
						return window.VuAdminHelpers.escapeHtml(self.auth.user.email);
					},
				}, {
					// built-in language switch: browser language by default, the choice is kept in localStorage
					action: 'BUTTON_LANGUAGE',
					class: 'dropdown-item',
					label: 'Language',
				}, {
					class: 'dropdown-divider'
				}, {
					class: 'dropdown-item cursor-pointer',
					label: (params, settings, self) => {
						return `<i class='bi bi-box-arrow-right me-1'></i> ${window.VuAdminHelpers.translate('Sign out')}`
					},
					action: (params, self) => {
						self.logout();
					}
				}],
			label: (params, settings, self) => {

				if (!self.auth || !self.auth.user) {
					return 'Sign in';
				}

				const { escapeHtml, safeUrl } = window.VuAdminHelpers;
				let fullName = escapeHtml([self.auth.user.firstName, self.auth.user.lastName].join(' '));
				let img = `<img class='img-fluid rounded me-2' width='22' src='${escapeHtml(safeUrl(self.auth.user.image))}' />`;

				return img + `<span class='d-none d-md-inline'>${fullName}</span>`;

			}

		}
	},
	auth: {
		debug: true,
        title: {
            login: 'Sign in',
            registration: 'Register',
            forgot: 'Forgot password',
            activation: 'Activation',
        },
        submit: {
            login: 'Sign in',
            registration: 'Register',
            forgot: 'Forgot password',
            activation: 'Activation',
        },
        api: {
            login: '/api/auth/login',
            register: '/api/auth/register',
            password: '/api/auth/password',
            activation: '/api/auth/activate',
        },
		username: {
			value: 'emilys',
			type: 'text',
			label: 'Username',
			icon: 'bi bi-envelope',
			placeholder: 'Enter your username',
			_help: 'Some e-mail providers do not always accept our e-mails properly, so delivery is not guaranteed.'
		},
		password: {
			label: 'Password',
			icon: 'bi bi-key-fill',
			placeholder: 'Enter your password',
			type: 'password',
			help: 'Use at least 1 lowercase letter, 1 uppercase letter and 1 digit. Minimum 4 characters.',
			_pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$',
			pattern: '^(?=.*[a-z]).+$',
			minlength: 4,
			hash: 11
		},
		password_again: {
			label: 'Password again',
			icon: 'bi bi-key-fill',
			type: 'password',
			placeholder: 'Repeat your password',
			_help: 'Type the password you entered again.'
		},
		_help: '<strong>Help</strong><br>Below...',
		accepts: [{
			label: () => {
				return `I accept the <a href='/terms.pdf'>Terms and Conditions</a>`
			},
			panels: ['registration'],
			required: true,
			name: 'aszf',
		},
		{
			label: () => {
				return `I accept the <a href='/privacy-policy.pdf'>Privacy Policy</a>`
			},
			panels: ['registration'],
			required: true,
			name: 'gdpr',

		},
		{
			label: 'Subscribe to the newsletter',
			panels: ['registration', 'login'],
			required: false,
			name: 'newsletter',

		}],
		onSuccess: {
			login: (responseData, auth) => {
				auth.user = responseData;
				// auth.token = responseData.accessToken;
				auth.header = {
					'X-Auth-Token' : responseData.accessToken,
				};

			}
		}
	},	

};

