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

// Texts of this file are English translation keys. Translations for other languages go into
// window.VuSettings.translate: they override the built-in dictionary (src/i18n.js) for every component,
// and an entity config's own `translate` overrides them again for that entity.
const REGISTRATION_HELP = `<div class='text-muted p-2 rounded shadow-sm'>After submitting the registration you will receive a <strong>confirmation e-mail</strong>; <strong>click</strong> the activation link in it to validate your registration. After the click our website opens, where you can enter <strong>further details</strong>.</div>`;

// entities: <vu-admin :auth="auth"> (without entity) renders these, in this order.
// value: the config script URL, or { url, preset, title } (preset: passed to the entity function, title: used in the browser tab title)
// a nav item with href "#<entity>" (e.g. "#user") → only that table is shown
const ADMIN_SETTINGS = () => ({
    entitiesVariable: 'VuEntities',
    entities: {
        product: { url: '/vu-entity-product.js', preset: 'dash', title: 'Products' },
        post: { url: '/vu-entity-post.js', title: 'Posts' },
        user: { url: '/vu-entity-user.js', title: 'Users' },
        todos: { url: '/vu-entity-todos.js', title: 'Todos' },
    },
    // start page (empty hash / "#"): entity tables in a Bootstrap grid; without it every entity is shown
    dashboard: {
        class: 'row g-3',                      // container class
        items: [
            // counters: number of records (optionally filtered), the card links to the filtered entity view
            {
                type: 'count',
                entity: 'user',
                title: 'Users',
                icon: 'bi bi-people',
                roles: ['admin'],              // only for these roles (the active role of the role switch)
            },
            {
                type: 'count',
                entity: 'todos',
                title: 'Open todos',
                icon: 'bi bi-list-check',
                filter: { completed: false },  // → link "#todos?completed=false"
            },
            {
                type: 'count',
                entity: 'todos',
                title: 'Completed todos',
                icon: 'bi bi-check2-circle',
                filter: { completed: true },
            },
            {
                type: 'count',
                entity: 'product',
                title: 'Products',
                icon: 'bi bi-box-seam',
                // class: 'col-6 col-md-3',    // default
            },
            // tables
            {
                entity: 'user',                // key of `entities`
                roles: ['admin'],
                class: 'col-md-6',             // column class
                title: 'Latest users',         // table title (translation key), default: the entity's own
                columns: ['image', 'firstName', 'createdAt', '#buttons'],  // visible columns in this order (by `name`, unnamed ones by `title`)
                filters: false,                // hide the filter row (default: shown)
                limit: 10,                     // initial rows per page, the page size selector stays
                limits: [5, 10, 20, 50],       // page size options (null hides the selector), default: the entity's own
                pages: 5,                      // number of page buttons in the pagination, default: the entity's own
                order: { createdAt: 'DESC' },  // sort, replaces the entity default: { field: 'ASC' | 'DESC', ... }
            },
            {
                entity: 'todos',
                class: 'col-md-6',
                title: 'Open todos',
                columns: ['todo', 'userId', 'completed', '#buttons'],
                filters: true,
                limit: 10,
                limits: [5, 10, 20, 50],
                order: { completed: 'ASC', id: 'DESC' },
                // settings: { ... }           // any further entity config override (deep-merged)
                // preset: 'dashboard'         // passed to the entity function; also the localStorage state key
            },
        ],
    },
});

window.VuSettings = {
    theme: 'dark',

    // <vu-admin-app>: the page layout (header, brand, nav, views) – every key is optional
    app: {
        title: 'VU Admin',                     // brand text + browser tab title (translation key)
        documentTitle: '{view} | {title}',     // tab title, {view} = active view; can be a function: (title, view) => ...
        logo: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.11.3/icons/grid-3x3-gap-fill.svg',
        favicon: '',                           // empty → the one in the HTML stays
        brand: { href: '#', height: 24 },
        container: 'container-fluid',
        header: { class: 'sticky-top navbar navbar-expand p-2 border shadow bg-body-tertiary' },
        nav: { url: '/api/navs', menu: 'admin' },
    },

    // languages offered in the user menu (default: English, Magyar)
    languages: [
        { value: 'en', label: 'English' },
        { value: 'hu', label: 'Magyar' },
    ],

    // project-level translations: override / extend the built-in dictionary
    translate: {
        hu: {
            // override of a built-in text
            'Save and close': 'Mentés és bezárás',

            // user menu
            'Register': 'Regisztráció',

            // auth modal
            'Sign in': 'Bejelentkezés',
            'Forgot password': 'Elfelejtett jelszó',
            'Activation': 'Aktiválás',
            'Set new password': 'Új jelszó beállítása',
            'Two-factor authentication': 'Kétlépéses hitelesítés',
            'Save password': 'Jelszó mentése',
            'Verify': 'Megerősítés',
            'Resend': 'Újraküldés',
            'Please select 1 icon to continue!': 'Kérjük, válassz ki 1 ikont a folytatáshoz!',
            'Verification code': 'Hitelesítő kód',
            '6-digit code': '6 jegyű kód',
            'Enter the 6-digit code sent to your e-mail address. The code is valid for 5 minutes.': 'Add meg az e-mail címedre küldött 6 jegyű kódot. A kód 5 percig érvényes.',
            'Invalid code, please try again!': 'Érvénytelen kód, kérjük, próbáld újra!',
            'Username / e-mail address': 'Felhasználónév / e-mail cím',
            'Enter your username': 'Add meg a felhasználóneved',
            'Some e-mail providers do not always accept our e-mails properly, so delivery is not guaranteed.': 'Egyes e-mail szolgáltatók nem mindig fogadják be megfelelően a leveleinket, így a kézbesítés nem garantált.',
            'Password': 'Jelszó',
            'Enter your password': 'Add meg a jelszavad',
            'Use at least 1 lowercase letter, 1 uppercase letter and 1 digit. Minimum 4 characters.': 'Legyen benne legalább 1 kisbetű, 1 nagybetű és 1 szám. Minimum 4 karakter.',
            'Forgot your password?': 'Elfelejtetted a jelszavad?',
            'Password again': 'Jelszó ismét',
            'Repeat your password': 'Ismételd meg a jelszavad',
            'Type the password you entered again.': 'Gépeld be újra a megadott jelszavad.',
            'The two passwords do not match!': 'A két jelszó nem egyezik!',
            'If the given e-mail address exists in our database, we send you an e-mail with a link. Clicking the link takes you to a page where you can set your new password. The link in the e-mail is valid for 1 hour only.': 'Ha a megadott e-mail cím szerepel az adatbázisunkban, küldünk egy e-mailt egy linkkel. A linkre kattintva egy oldalra jutsz, ahol beállíthatod az új jelszavad. A link csak 1 óráig érvényes.',
            [REGISTRATION_HELP]: "<div class='text-muted p-2 rounded shadow-sm'>A regisztráció beküldése után egy <strong>visszaigazoló levél</strong> érkezik az e-mail címedre; a benne lévő aktiváló linkre <strong>kattintva</strong> érvényesítheted a regisztrációt. Ezután megnyílik a weboldalunk, ahol <strong>további adatokat</strong> adhatsz meg.</div>",
            'Last name': 'Vezetéknév',
            'First name': 'Keresztnév',
            'Phone number': 'Telefonszám',
            'e.g. +36 70 1111-222': 'pl.: +36 70 1111-222',
            'Birth date': 'Születési dátum',
            'Two-factor authentication (2FA)': 'Kétlépéses hitelesítés (2FA)',
            'No 2FA': 'Nem kérek 2FA-t',
            'E-mail code': 'E-mail kód',
            'At sign-in we send a 6-digit code to your e-mail address that you need to enter to sign in.': 'Bejelentkezéskor egy 6 jegyű kódot küldünk az e-mail címedre, amit meg kell adnod a belépéshez.',
            "I accept the <a href='/terms.pdf'>Terms and Conditions</a>": "Elfogadom az <a href='/terms.pdf'>Általános Szerződési Feltételeket</a>",
            "I accept the <a href='/privacy-policy.pdf'>Privacy Policy</a>": "Elfogadom az <a href='/privacy-policy.pdf'>Adatkezelési tájékoztatót</a>",
            'Subscribe to the newsletter': 'Feliratkozom a hírlevélre',
            'Error {code}': 'Hiba ({code})',
            'Password update failed!': 'A jelszó frissítése sikertelen!',
            'Password reset successful': 'Sikeres jelszó-visszaállítás',

            // server (mock API) messages
            'Invalid username or password': 'Hibás felhasználónév vagy jelszó',
            'Invalid captcha answer': 'Érvénytelen captcha megoldás',
            'Registration failed': 'Sikertelen regisztráció',
            'This e-mail address is already taken': 'Ez az e-mail cím már foglalt',
            'Registration successful! The activation e-mail has been sent.': 'Sikeres regisztráció! Az aktiváló e-mailt elküldtük.',
            'Activation successful!': 'Sikeres aktiválás!',
            'The session has expired, please sign in again': 'A munkamenet lejárt, kérjük, jelentkezz be újra',
            'Invalid code': 'Érvénytelen kód',
            'User not found': 'A felhasználó nem található',
            'Cannot resend': 'Nem lehet újraküldeni',
            'Code sent': 'Kód elküldve',
            'Trust this device?': 'Megbízol ebben az eszközben?',
            'Only on your own device! The password is still required.': 'Csak saját eszközön válaszd! A jelszót ekkor is meg kell adni.',
            'No, always ask for a code': 'Nem, mindig kérjen kódot',
            'Do not ask for 1 day': '1 napig ne kérjen kódot',
            'Do not ask for 7 days': '7 napig ne kérjen kódot',
            'Do not ask for 30 days': '30 napig ne kérjen kódot',

            // navigation (/api/navs)
            'Dashboard': 'Vezérlőpult',
            'Content': 'Tartalom',
            'Products': 'Termékek',
            'Posts': 'Bejegyzések',
            'Todos': 'Teendők',
            'Users': 'Felhasználók',
            'Documentation': 'Dokumentáció',
            'Hidden menu item': 'Rejtett menüpont',
            'Disabled': 'Letiltott',

            // dashboard
            'Latest users': 'Legújabb felhasználók',
            'Open todos': 'Nyitott teendők',
            'Completed todos': 'Elvégzett teendők',
            'Created': 'Létrehozva',
            'User': 'Felhasználó',
            'Age': 'Kor',

            // profile (user menu → Profile)
            'Change password': 'Jelszó módosítása',
            'Current password': 'Jelenlegi jelszó',
            'New password': 'Új jelszó',
            'Password changed': 'A jelszó megváltozott',
            'The current password is incorrect': 'A jelenlegi jelszó hibás',
            'The new password must differ from the current one': 'Az új jelszó nem egyezhet a jelenlegivel',
            'Yes': 'Igen',
            'No': 'Nem',
        },
    },
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
                            const t = window.VuAdminHelpers.translate;
                            return `<span class='text-warning'><i class='bi bi-exclamation-triangle me-1'></i>${t('No role assigned')}</span><br><small class='text-muted' style='white-space:normal;display:block;max-width:220px'>${t('A role is required to view and edit data.')}</small>`;
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
                    // built-in language switch (languages: window.VuSettings.languages or English / Magyar)
                    action: 'BUTTON_LANGUAGE',
                    class: 'dropdown-item',
                    label: 'Language',
                }, {
                    // built-in theme switch: light / dark / system (stored in localStorage, wins over every `theme`)
                    action: 'BUTTON_THEME',
                    class: 'dropdown-item',
                    label: 'Theme',
                }, {
                    class: 'dropdown-divider'
                }, {
                    // built-in "Profile" item (profile panel: user data, password change);
                    // hidden with auth.profile.enabled: false
                    action: 'BUTTON_PROFILE',
                    class: 'dropdown-item cursor-pointer',
                }, {
                    class: 'dropdown-item cursor-pointer',
                    label: (params, settings, self) => {
                        return `<i class='bi bi-box-arrow-right me-1'></i> ${window.VuAdminHelpers.translate('Sign out')}`
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
        // user menu "Profile" (profile panel: user data, password change); false → no menu item, no panel
        profile: {
            enabled: true,
        },
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
            // "trust this device": no code on this browser for the chosen days (the server may cap it with the
            // 202 answer's `trustMaxDays`; options over it are hidden)
            trust: {
                label: 'Trust this device?',
                help: 'Only on your own device! The password is still required.',
                default: 0,
                options: [
                    { value: 0, label: 'No, always ask for a code' },
                    { value: 1, label: 'Do not ask for 1 day' },
                    { value: 7, label: 'Do not ask for 7 days' },
                    { value: 30, label: 'Do not ask for 30 days' },
                ],
            },
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
            changePassword: '/api/auth/password',  // profile → password change of the signed-in user
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
            registration: REGISTRATION_HELP,
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
                placeholder: 'e.g. +36 70 1111-222',
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
                    auth.response.message = window.VuAdminHelpers.translate('Error {code}', { code: auth.response.code }) + (auth.response.data?.message ? ' - ' + window.VuAdminHelpers.translate(auth.response.data.message) : '');
                }

            },
            registration: (auth) => {

                console.log(auth.response);

                if (auth.response) {
                    auth.response.message = window.VuAdminHelpers.translate('Error {code}', { code: auth.response.code }) + (auth.response.data?.message ? ' - ' + window.VuAdminHelpers.translate(auth.response.data.message) : '');
                }

            },
            forgot: (auth) => {

                console.log(auth.response);

                if (auth.response) {
                    auth.response.message = window.VuAdminHelpers.translate('Error {code}', { code: auth.response.code }) + (auth.response.data?.message ? ' - ' + window.VuAdminHelpers.translate(auth.response.data.message) : '');
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
                        : window.VuAdminHelpers.translate('Error {code}', { code: auth.response.code });
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

                // always from the current ADMIN_SETTINGS, so a config change applies on the next page load
                // (the copy restored from localStorage may be outdated)
                if (auth.user.role) {
                    auth.settings = ADMIN_SETTINGS();
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
                    auth.settings = ADMIN_SETTINGS();
                }
            },
            activation: (auth) => {

                console.log(auth);

                auth.user = auth.response.data;
                auth.user.token = auth.response.data.accessToken;

                if (auth.user.role) {
                    auth.settings = ADMIN_SETTINGS();
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
};

