var app = angular.module('cri-web', [
	'ngMaterial',
    'Application',
    'ui.router',
    'Authentication',
    'facebook-service',
    'Home',
    'Lobby',
    'Upcoming',
    'Live',
    'History',
    'TransactionHistory',
    'MyAccount',
    'ReferFriend',
    'Wallet'
     
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
					templateUrl: 'angular-constructs/authentication/views/register.html',
					controller: 'RegistrationController',
					data: {
						requireLogin: false,
					} 
				}).state('login', {
					url: '/login',
					templateUrl: 'angular-constructs/authentication/views/login.html',
					controller: 'LoginController',
					data: {
						requireLogin: false,
					}
				})
				.state('changepassword', {
					url: '/changepassword',
					templateUrl: 'angular-constructs/authentication/views/changepassword.html',
					controller: 'Changepassword',
					data: {
						requireLogin: true,
					}
				}).state('resetpassword', {
					url: '/resetpassword',
					templateUrl: 'angular-constructs/authentication/views/forgotpassword.html',
					controller: 'ForgotPasswordController',
					data: {
						requireLogin: false,
					}
				}).state('logout', {
					url: '/logout',
					templateUrl: 'angular-constructs/authentication/views/logout.html',
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
				}).state('home', {
					url: '/home',
					templateUrl: 'angular-constructs/home/views/home.html',
					controller: 'HomeController',
					data: {
						requireLogin: true,
					} 
				}).state('lobby', {
					url: '/lobby',
					templateUrl: 'angular-constructs/lobby/views/lobby.html',
					controller: 'LobbyController',
					data: {
						requireLogin: true,
					} 
				}).state('upcoming', {
					url: '/upcoming',
					templateUrl: 'angular-constructs/upcoming/views/upcoming.html',
					controller: 'UpcomingController',
					data: {
						requireLogin: true,
					} 
				}).state('live', {
					url: '/live',
					templateUrl: 'angular-constructs/live/views/live.html',
					controller: 'LiveController',
					data: {
						requireLogin: true,
					} 
				}).state('history', {
					url: '/history',
					templateUrl: 'angular-constructs/history/views/history.html',
					controller: 'HistoryController',
					data: {
						requireLogin: true,
					} 
				}).state('transactionHistroy', {
					url: '/transactionHistroy',
					templateUrl: 'angular-constructs/transactionHistroy/views/transactionhistory.html',
					controller: 'TransactionHistoryController',
					data: {
						requireLogin: true,
					} 
				}).state('myaccount', {
					url: '/myaccount',
					templateUrl: 'angular-constructs/myAccount/views/myAccount.html',
					controller: 'MyAccountController',
					data: {
						requireLogin: true,
					} 
				}).state('referFriend', {
					url: '/referFriend',
					templateUrl: 'angular-constructs/referFriend/views/referFriend.html',
					controller: 'ReferFriendController',
					data: {
						requireLogin: true,
					} 
				}).state('wallet', {
					url: '/wallet',
					templateUrl: 'angular-constructs/wallet/views/wallet.html',
					controller: 'WalletController',
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
