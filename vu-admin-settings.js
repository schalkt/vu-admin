var handleError = function (response) {

	response.message = 'Error ' + response.code;

	if (response.data) {

		if (response.data.message) {
			response.message += ' - ' + response.data.message;
		}

		if (response.data.errors) {
			response.message += ' - ' + Object.values(response.data.errors).join(' ');
		}

	}

}

window.VuSettings = {
    theme: 'dark',
    button: {
        registration: {
            label: 'Register',
            class: 'btn btn-warning me-2',
            icon: 'bi bi-person-plus me-2',
        },
        login: {
            class: 'btn btn-outline-primary',
            icon: 'bi bi-box-arrow-in-right me-2',
            label: (params, settings, self) => {

                if (!self.auth || !self.auth.user) {
                    return 'Sign in';
                }

                const { escapeHtml, safeUrl } = window.VuAdminHelpers;
                let fullName = escapeHtml([self.auth.user.firstName, self.auth.user.lastName].join(' '));
                let role = self.auth.user.role ? ` (${escapeHtml(self.auth.user.role)})` : '';
                let img = `<img class='img-fluid rounded me-2' width='22' src='${escapeHtml(safeUrl(self.auth.user.image))}' />`;

                return img + fullName + role;

            },
            dropdowns: [
                {
                    action: 'BUTTON_ROLES',
                    class: 'dropdown-item',
                    label: (params, settings, self) => {
                        if (!self.auth?.user?.role) {
                            return `<span class='text-warning'><i class='bi bi-exclamation-triangle me-1'></i>No role assigned</span><br><small class='text-muted' style='white-space:normal;display:block;max-width:220px'>A role is required to view and edit data.</small>`;
                        }
                        return 'Switch role';
                    },
                    disabled: (params, settings, self) => {
                        return !self.auth?.user?.role;
                    },
                },
                {
                    class: 'dropdown-item fw-light',
                    label: (params, settings, self) => {
                        return window.VuAdminHelpers.escapeHtml(self.auth.user.email);
                    },
                }, {
                    class: 'dropdown-divider'
                }, {
                    class: 'dropdown-item cursor-pointer',
                    label: (params, settings, self) => {
                        return `<i class='bi bi-person me-1'></i> Profile`
                    },
                    action: (params, self) => {
                        self.showProfilModal();
                    }
                }, {
                    class: 'dropdown-item cursor-pointer',
                    label: (params, settings, self) => {
                        return `<i class='bi bi-box-arrow-right me-1'></i> Sign out`
                    },
                    action: (params, self) => {
                        self.logout();
                    }
                }
            ],
        }
    },
    auth: {
        debug: true,
        registrationEnabled: true,
        captcha: {
            url: '/api/auth/captcha',
            panels: ['login', 'registration', 'forgot'],
            error: 'Please select 1 icon to continue!',
        },
        twofa: {
            panels: ['login'],
            label: 'Verification code',
            placeholder: '6-digit code',
            info: 'Enter the 6-digit code sent to your e-mail address. The code is valid for 5 minutes.',
            error: 'Invalid code, please try again!',
        },
        title: {
            login: 'Sign in',
            registration: 'Register',
            forgot: 'Forgot password',
            activation: 'Activation',
            password: 'Set new password',
            twofa: 'Two-factor authentication',
        },
        submit: {
            login: 'Sign in',
            registration: 'Register',
            cancel: 'Cancel',
            forgot: 'Forgot password',
            password: 'Save password',
            activation: 'Activation',
            twofa: 'Verify',
            resend: 'Resend',
        },
        api: {
            login: '/api/auth/login',
            profile: '/api/auth/me',
            register: '/api/auth/register',
            forgot: '/password/forgot',
            password: '/password/update',
            activation: '/api/auth/activate',
            twofa: '/api/auth/twofa',
            twofaResend: '/api/auth/twofa-resend',
        },
        username: {
            value: 'emilys',
            type: 'text',
            label: 'Username / e-mail address',
            icon: 'bi bi-envelope',
            placeholder: 'Enter your username',
            help: 'Some e-mail providers do not always accept our e-mails properly, so delivery is not guaranteed.'
        },
        password: {
            label: 'Password',
            icon: 'bi bi-key-fill',
            placeholder: 'Enter your password',
            type: 'password',
            help: 'Use at least 1 lowercase letter, 1 uppercase letter and 1 digit. Minimum 4 characters.',
            forgot: 'Forgot your password?',
            pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$',
            pattern: '^(?=.*[a-z]).+$',
            minlength: 4,
            hash: 0
        },
        password_again: {
            label: 'Password again',
            icon: 'bi bi-key-fill',
            type: 'password',
            placeholder: 'Repeat your password',
            help: 'Type the password you entered again.',
            nomatch: 'The two passwords do not match!'
        },
        help: {
            forgot: 'If the given e-mail address exists in our database, we send you an e-mail with a link. Clicking the link takes you to a page where you can set your new password. The link in the e-mail is valid for 1 hour only.',
            registration: `<div class='text-muted p-2 rounded shadow-sm'>After submitting the registration you will receive a <strong>confirmation e-mail</strong>; <strong>click</strong> the activation link in it to validate your registration. After the click our website opens, where you can enter <strong>further details</strong>.</div>`
        },
        inputs: {
            'lastname': {
                panels: ['activation'],
                label: 'Last name',
                prefix: null,
                suffix: null,
                type: 'text',
                placeholder: null,
                required: true,
                colclass: 'col-md-6',
            },
            'firstname': {
                panels: ['activation'],
                label: 'First name',
                prefix: null,
                suffix: null,
                type: 'text',
                placeholder: null,
                required: true,
                colclass: 'col-md-6'
            },
            'phone1': {
                panels: ['activation'],
                label: 'Phone number',
                prefix: null,
                suffix: null,
                type: 'text',
                placeholder: 'pl.: +36 70 1111-222',
                required: true,
                colclass: 'col-md-6'
            },
            'birthdate': {
                panels: ['activation'],
                label: 'Birth date',
                prefix: null,
                suffix: null,
                type: 'date',
                placeholder: null,
                required: true,
                colclass: 'col-md-6'
            },
            'twofa': {
                panels: ['registration'],
                label: 'Two-factor authentication (2FA)',
                type: 'select',
                placeholder: null,
                multiple: false,
                required: false,
                options: [
                    { label: 'No 2FA', value: '' },
                    { label: 'E-mail code', value: 'email' },
                ],
                help: 'At sign-in we send a 6-digit code to your e-mail address that you need to enter to sign in.',
            },
        },
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
        onError: {
            login: (auth) => {

                console.log(auth.response);

                if (auth.response) {
                    auth.response.message = 'Error ' + auth.response.code + (auth.response.data?.message ? ' - ' + auth.response.data.message : '');
                }

            },
            registration: (auth) => {

                console.log(auth.response);

                if (auth.response) {
                    auth.response.message = 'Error ' + auth.response.code + (auth.response.data?.message ? ' - ' + auth.response.data.message : '');
                }

            },
            forgot: (auth) => {

                console.log(auth.response);

                if (auth.response) {
                    auth.response.message = 'Error ' + auth.response.code + (auth.response.data?.message ? ' - ' + auth.response.data.message : '');
                }
            },
            password: (auth) => {

                console.log(auth.response);

                if (auth.response) {

                    auth.response.message = 'Password update failed!';
                    //auth.response.message = 'Error ' + auth.response.code + ' - ' + auth.response.data.message;
                }
            },
            twofa: (auth) => {

                console.log(auth.response);

                if (auth.response) {
                    auth.response.message = auth.response.data?.message
                        ? auth.response.data.message
                        : 'Error ' + auth.response.code;
                }
            },
        },
        onSuccess: {

            profile: (auth) => {

                const data = auth.response.data;
                Object.assign(auth.user, data);
                if (data.accessToken) {
                    auth.user.token = data.accessToken;
                }

                if (auth.user.role && !auth.settings) {
                    auth.settings = {
                        entitiesVariable: 'VuEntities',
                        entities: {
                            post: '/vu-entity-post.js',
                            product: '/vu-entity-product.js',
                            user: '/vu-entity-user.js',
                            todos: '/vu-entity-todos.js',
                        }
                    };
                }

            },
            
            registration: (auth) => {

                console.log(auth.response);

                if (auth.response) {
                    auth.response.message = auth.response.data?.message || 'Registration successful! The activation e-mail has been sent.';
                }

            },
            login: (auth) => {

                console.log(auth);

                auth.user = auth.response.data;
                auth.user.token = auth.response.data.accessToken;

                if (auth.user.role) {
                    auth.settings = {
                        entitiesVariable: 'VuEntities',
                        entities: {
                            post: '/vu-entity-post.js',
                            product: '/vu-entity-product.js',
                            user: '/vu-entity-user.js',
                            todos: '/vu-entity-todos.js',
                        }
                    };
                }
            },
            activation: (auth) => {

                console.log(auth);

                auth.user = auth.response.data;
                auth.user.token = auth.response.data.accessToken;

                if (auth.user.role) {
                    auth.settings = {
                        entitiesVariable: 'VuEntities',
                        entities: {
                            post: '/vu-entity-post.js',
                            product: '/vu-entity-product.js',
                            user: '/vu-entity-user.js',
                            todos: '/vu-entity-todos.js',
                        }
                    };
                }
            },
            forgot: (auth) => {

                console.log(auth.response);

                if (auth.response) {
                    auth.response.message = auth.response.data.message ? auth.response.data.message : 'Password reset successful';
                }

            },
            password: (auth) => {


                console.log(auth.response);

                if (auth.response) {
                    auth.response.message = auth.response.data.message ? auth.response.data.message : 'Password reset successful';
                }

            },
        }
    },
    translate: {
        hu: {

        }
    }
};

