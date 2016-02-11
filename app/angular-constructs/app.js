var app = angular.module('cri-web', [
	'ngMaterial',
    'Application',
    'ui.router',
    'Authentication',
    'facebook-service'
     
]);

//Set up constants
app
	.constant('AUTH_EVENTS', {
		loginSuccess: 'auth-login-success',
		loginFailed: 'auth-login-failed',
		logoutSuccess: 'auth-logout-success',
		sessionTimeout: 'auth-session-timeout',
		notAuthenticated: 'auth-not-authenticated',
		notAuthorized: 'auth-not-authorized',
		registraionSuccess : 'You have registered successfully',
		userUpdateSuccess : 'User details successfully updated',
		userUpdateFailed : 'User details updated failed',
		passwordUpdateFailed : 'User details updated failed',
		passwordUpdateSuccess : 'User details updated failed'
	})
	.constant('AUTH_MESSAGES', {
		"Error.Passport.Email.NotFound": "Email not found",
		"Error.Passport.Username.NotFound": "Username not found",
		"Error.Passport.Password.Wrong": "Incorrect password",
	})
	.constant('USER_ROLES', {
		all: '*',
		admin: 'admin',		
		guest: 'guest'
	})
	.constant('URLS', {
		SITE_URL				: "http://10.10.10.11:8400/",		
		REGISTER				: 'cri-web',
		LOGIN					: 'cri-web/login',
		LOGOUT					: 'cri-web/logout',
		GET_USER_INFO			: 'cri-web/getuserdetails',
		UPDATE_USER_DETAILS		: 'cri-web/updateduserdetails',
		RESETPASSWORD			: 'cri-web/resetpassword',
		CHANGE_PASSWORD			: 'cri-web/chanagepassword'
	})

//Set up routes
	.config(['$stateProvider', '$urlRouterProvider',
		function ($stateProvider, $urlRouterProvider, SessionService, $httpProvider) {

			//Set up routes
			$urlRouterProvider.otherwise('/');
			$stateProvider
			$stateProvider.state('/', {
				url: '/',				
				data: {
					requireLogin: false,
				}
			}).state('register', {
				url: '/register',
				templateUrl: 'angular-constructs/authentication/html/register.html',
				controller: 'RegistrationController',
				data: {
					requireLogin: false,
				} 
			}).state('login', {
				url: '/login',
				templateUrl: 'angular-constructs/authentication/html/login.html',
				controller: 'LoginController',
				data: {
					requireLogin: false,
				}
			})
				.state('changepassword', {
					url: '/changepassword',
					templateUrl: 'angular-constructs/authentication/html/changepassword.html',
					controller: 'Changepassword',
					data: {
						requireLogin: true,
					}
				}).state('resetpassword', {
					url: '/resetpassword',
					templateUrl: 'angular-constructs/authentication/html/forgotpassword.html',
					controller: 'ForgotPasswordController',
					data: {
						requireLogin: false,
					}
				}).state('logout', {
					url: '/logout',
					templateUrl: 'angular-constructs/authentication/html/logout.html',
					controller: 'LogoutController',
					data: {
						requireLogin: true,
					}
				}).state('admin', {
					url: '/admin',
					templateUrl: 'angular-constructs/authentication/admin.html',
					controller: 'AdminController',
					data: {
						requireLogin: true,
					}
				});
		}
	])

//Upon refresh/load of the SPA, send user straight to login page if they are not authenticated, else send them to home
	.run(function ($rootScope, $state) {

		$state.go("/");

		$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
			var requireLogin = toState.data.requireLogin;
			//console.log("Logged in? " + $rootScope.loggedIn);
			if (requireLogin && $rootScope.loggedIn !== true) {
				//event.preventDefault();
				//$state.go("login");
			}
		});

	})
