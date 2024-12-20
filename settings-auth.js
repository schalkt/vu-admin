
window.VuSettings = {
    button: {
        registration: {
            label: 'Regisztráció',
            class: 'btn btn-warning me-2',
            icon: 'bi bi-person-plus me-2',
        },
        login: {
            class: 'btn btn-outline-primary',
            icon: 'bi bi-box-arrow-in-right me-2',
            label: (params, settings, self) => {

                if (!self.auth || !self.auth.user) {
                    return 'Bejelentkezés';
                }

                let fullName = [self.auth.user.firstName, self.auth.user.lastName].join(' ');
                let role = self.auth.user.role ? ` (${self.auth.user.role})` : '';
                let img = `<img class='img-fluid rounded me-2' width='22' src='${self.auth.user.image}' />`;

                return img + fullName + role;

            },
            dropdowns: [
                {
                    action: 'BUTTON_ROLES',
                    class: 'dropdown-item',
                    label: (params, settings, self) => {
                        return 'Szerepkörök'
                    },
                },
                {
                    class: 'dropdown-item fw-light',
                    label: (params, settings, self) => {
                        return self.auth.user.email;
                    },
                }, {
                    class: 'dropdown-divider'
                }, {
                    class: 'dropdown-item cursor-pointer',
                    label: (params, settings, self) => {
                        return `<i class='bi bi-person me-1'></i> Profil adatok`
                    },
                    action: (params, self) => {
                        self.showProfilModal();
                    }
                }, {
                    class: 'dropdown-item cursor-pointer',
                    label: (params, settings, self) => {
                        return `<i class='bi bi-box-arrow-right me-1'></i> Kilépés`
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
        title: {
            login: 'Bejelentkezés',
            registration: 'Regisztráció',
            forgot: 'Elfelejtett jelszó',
            activation: 'Aktiválás',
        },
        submit: {
            login: 'Bejelentkezés',
            registration: 'Regisztráció',
            forgot: 'Elfelejtett jelszó',
            activation: 'Aktiválás',
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
            label: 'Felhasználónév',
            icon: 'bi bi-envelope',
            placeholder: 'Add meg a felhasználóneved',
            help: 'A Freemail és Citromail szolgáltatók nem minden esetben fogadják be megfelelően az e-maileket, így a kézbesítés nem garantált.'
        },
        password: {
            label: 'Jelszó',
            icon: 'bi bi-key-fill',
            placeholder: 'Add meg a jelszavad',
            type: 'password',
            help: 'Legyen benne legalább 1 kisbetű, 1 nagybetű és 1 szám. Minimum 4 karakter.',
            _pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$',
            pattern: '^(?=.*[a-z]).+$',
            minlength: 4,
            hash: 11
        },
        password_again: {
            label: 'Jelszó ismét',
            icon: 'bi bi-key-fill',
            type: 'password',
            placeholder: 'Ismételd meg a jelszavad',
            _help: 'Ide gépeld be újra a jelszavadat amit megadtál.'
        },
        registration: {
            help: `<div class='bg-white text-muted p-2 rounded shadow-sm'>A regisztráció beküldése után egy <strong>visszaigazoló levél</strong> fog érkezni az e-mail címedre, melyben az aktiváló linkre kell <strong>kattintani</strong>, hogy a regisztráció érvényesítve legyen. A kattintás után megjelenik weboldalunk, ahol <strong>további adatok</strong> megadására van lehetőség.</div>`,
        },
        inputs: {
            'role': {
                label: 'Szerepkör',
                hidden: true,
                prefix: `<i class='bi bi-person-badge'></i>`,
                type: 'select',
                placeholder: null,
                multiple: false,
                required: true,
                panels: ['registration'],
                options: [{
                    label: 'Tulajdonos',
                    value: 'owner'
                },
                {
                    label: 'Bérlő',
                    value: 'tenant'
                }],
                suffix: null,
                help: 'Ha ugyanazzal az e-mail címmel, de másik szerepkörrel is regisztrálsz, akkor mindkét szerepkört használni tudod a rendszerben. A jelszavad pedig az lesz, amit utoljára megadtál.'
            },
            'lastname': {
                panels: ['activation'],
                label: 'Vezetéknév',
                prefix: null,
                suffix: null,
                type: 'text',
                placeholder: null,
                required: true,
                colclass: 'col-md-6',
            },
            'firstname': {
                panels: ['activation'],
                label: 'Keresztnév',
                prefix: null,
                suffix: null,
                type: 'text',
                placeholder: null,
                required: true,
                colclass: 'col-md-6'
            },
            'phone1': {
                panels: ['activation'],
                label: 'Telefonszám',
                prefix: null,
                suffix: null,
                type: 'text',
                placeholder: 'pl.: +36 70 1111-222',
                required: true,
                colclass: 'col-md-6'
            },
            'birthdate': {
                panels: ['activation'],
                label: 'Születési dátum',
                prefix: null,
                suffix: null,
                type: 'date',
                placeholder: null,
                required: true,
                colclass: 'col-md-6'
            }
        },
        accepts: [{
            label: () => {
                return `Elfogadom az <a href='/aszf.pdf'>Általános Szerződési Feltételeket</a>`
            },
            panels: ['registration'],
            required: true,
            name: 'aszf',
        },
        {
            label: () => {
                return `Elfogadom az <a href='/adatkezelesi-tajekoztato.pdf'>Adatkezelési tájékoztatóban</a> leírtakat`
            },
            panels: ['registration'],
            required: true,
            name: 'gdpr',

        },
        {
            label: 'Feliratkozom a hírlevelekre',
            panels: ['registration', 'login'],
            required: false,
            name: 'newsletter',

        }],
        onSuccess: {
            login: (responseData, auth) => {

                console.log(responseData, auth);
                
                auth.user = responseData;
                auth.user.token = responseData.accessToken;
                auth.user.roles = ['admin', 'guest'];            
                auth.settings = {
                    entitiesVariable: 'VuEntities',
                    entities: {
                        post: '/entity-post.js',
                        product: '/entity-product.js',
                        user: '/entity-user.js',
                    }
                };
            },
            activation: (responseData, auth) => {

                console.log(responseData, auth);
            
                auth.user = responseData;
                auth.user.token = responseData.accessToken;
                auth.user.roles = ['admin', 'guest'];            
                auth.settings = {
                    entitiesVariable: 'VuEntities',
                    entities: {
                        post: '/entity-post.js',
                        product: '/entity-product.js',
                        user: '/entity-user.js',
                    }
                };
            }
        }
    }
};

