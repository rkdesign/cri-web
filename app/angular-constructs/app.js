var app = angular.module('cri-web', [
	'ngAria',
	'ngMessages', 
	'ngMdIcons',
	'ngMaterial',
    'Application',
    'Menu',
    'ui.router',
    'Authentication',
    'facebook-service',
    'Home',
    'Admin',
    'Lobby',
    'Upcoming',
    'Live',
    'History',
    'TransactionHistory',
    'MyAccount',
    'ReferFriend',
    'Wallet',
    'ConfirmPasswordValidation'
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
			
			$stateProvider.state('default', {				
				url: '/',
				views: {			            
			            'content': {
			                templateUrl: 'angular-constructs/home/views/index.html',
			                controller: 'HomeController'			                	
			            },
			            'footer': {
			                templateUrl: 'angular-constructs/shared/views/footer.html'
			            }
			        }
							
				}).state('register', {
					url: '/register',
					views: {
			            'content': {			               
			                controller: 'RegistrationController'
			            }
			        }
					
				}).state('login', {
					url: '/login',
					views: {
			            'content': {
			            	templateUrl: 'angular-constructs/authentication/views/login.html',
							controller: 'LoginController'
			            }
			        }
					,
					data: {
						requireLogin: false,
					}
				})
				.state('changepassword', {
					url: '/changepassword',
					views: {
			            'header': {
			                templateUrl: 'angular-constructs/home/views/menu.html',
			                controller: 'MenuController'
			            },
			            'content': {
			            	templateUrl: 'angular-constructs/authentication/views/changepassword.html',
							controller: 'Changepassword'
			            },
			            'footer': {
			                templateUrl: 'angular-constructs/shared/views/footer.html'
			            }
			        }
					
				}).state('resetpassword', {
					url: '/resetpassword',
					views: {			            
			            'content': {
							templateUrl: 'angular-constructs/authentication/views/resetpassword.html',
							controller: 'ResetPasswordController'
			            }
			        }
				}).state('forgotpassword', {
					url: '/forgotpassword',
					views: {			            
			            'content': {
							templateUrl: 'angular-constructs/authentication/views/forgotpassword.html',
							controller: 'ForgotPasswordController'
			            },
			            'footer': {
			                templateUrl: 'angular-constructs/shared/views/footer.html'
			            }
			        }
				})
				.state('logout', {
					url: '/logout',
					views: {			            
			            'content': {
			            	templateUrl: 'angular-constructs/authentication/views/logout.html',
							controller: 'LogoutController'
			            },
			            'footer': {
			                templateUrl: 'angular-constructs/shared/views/footer.html'
			            }
			        }					
				}).state('admin', {
					url: '/admin',
					views: {
			            'header': {
			                templateUrl: 'angular-constructs/home/views/adminMenu.html',
			                controller: 'MenuController'
			            },
			            'content': {
			            	templateUrl: 'angular-constructs/admin/views/admin.html',
							controller: 'AdminController'
			            },
			            'footer': {
			                templateUrl: 'angular-constructs/shared/views/footer.html'
			            }
			        }
					
				}).state('home', {
					url: '/home',
					views: {
			            'header': {
			                templateUrl: 'angular-constructs/home/views/menu.html',
			                controller: 'MenuController'
			            },
			            'content': {
							templateUrl: 'angular-constructs/home/views/home.html',
							controller: 'HomeController'
			            },
			            'footer': {
			                templateUrl: 'angular-constructs/shared/views/footer.html'
			            }
			        }
				}).state('lobby', {
					url: '/lobby',
					views: {
			            'header': {
			                templateUrl: 'angular-constructs/home/views/menu.html',
			                controller: 'MenuController'
			            },
			            'content': {
							templateUrl: 'angular-constructs/lobby/views/lobby.html',
							controller: 'LobbyController'
			            },
			            'footer': {
			                templateUrl: 'angular-constructs/shared/views/footer.html'
			            }
			        } 
				}).state('upcoming', {
					url: '/upcoming',
					views: {
			            'header': {
			                templateUrl: 'angular-constructs/home/views/menu.html',
			                controller: 'MenuController'
			            },
			            'content': {
			            	templateUrl: 'angular-constructs/upcoming/views/upcoming.html',
							controller: 'UpcomingController'
			            },
			            'footer': {
			                templateUrl: 'angular-constructs/shared/views/footer.html'
			            }
			        } 
				}).state('live', {
					url: '/live',
					views: {
			            'header': {
			                templateUrl: 'angular-constructs/home/views/menu.html',
			                controller: 'MenuController'
			            },
			            'content': {
			            	templateUrl: 'angular-constructs/live/views/live.html',
							controller: 'LiveController'
			            },
			            'footer': {
			                templateUrl: 'angular-constructs/shared/views/footer.html'
			            }
			        } 
				}).state('history', {
					url: '/history',
					views: {
			            'header': {
			                templateUrl: 'angular-constructs/home/views/menu.html',
			                controller: 'MenuController'
			            },
			            'content': {
							templateUrl: 'angular-constructs/history/views/history.html',
							controller: 'HistoryController'
			            },
			            'footer': {
			                templateUrl: 'angular-constructs/shared/views/footer.html'
			            }
			        }
				}).state('transactionHistroy', {
					url: '/transactionHistroy',
					views: {
			            'header': {
			                templateUrl: 'angular-constructs/home/views/menu.html',
			                controller: 'MenuController'
			            },
			            'content': {
							templateUrl: 'angular-constructs/transactionHistroy/views/transactionhistory.html',
							controller: 'TransactionHistoryController'
			            },
			            'footer': {
			                templateUrl: 'angular-constructs/shared/views/footer.html'
			            }
			        } 
				}).state('myaccount', {
					url: '/myaccount',
					views: {
			            'header': {
			                templateUrl: 'angular-constructs/home/views/menu.html',
			                controller: 'MenuController'
			            },
			            'content': {
			            	templateUrl: 'angular-constructs/myAccount/views/myAccount.html',
							controller: 'MyAccountController'
			            },
			            'footer': {
			                templateUrl: 'angular-constructs/shared/views/footer.html'
			            }
			        }
				}).state('referFriend', {
					url: '/referFriend',
					views: {
			            'header': {
			                templateUrl: 'angular-constructs/home/views/menu.html',
			                controller: 'MenuController'
			            },
			            'content': {
							templateUrl: 'angular-constructs/referFriend/views/referFriend.html',
							controller: 'ReferFriendController'
			            },
			            'footer': {
			                templateUrl: 'angular-constructs/shared/views/footer.html'
			            }
			        } 
				}).state('wallet', {
					url: '/wallet',
					views: {
			            'header': {
			                templateUrl: 'angular-constructs/home/views/menu.html',
			                controller: 'MenuController'
			            },
			            'content': {
							templateUrl: 'angular-constructs/wallet/views/wallet.html',
							controller: 'WalletController'
			            },
			            'footer': {
			                templateUrl: 'angular-constructs/shared/views/footer.html'
			            }
			        } 
				});
		}
	])

//Upon refresh/load of the SPA, send user straight to login page if they are not authenticated, else send them to home
	.run(function ($rootScope, $state,$location) {

		$state.go("default");
		
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
			//var requireLogin = toState.data.requireLogin;
			//console.log("Logged in? " + $rootScope.loggedIn);
			//if (requireLogin && $rootScope.loggedIn !== true) {
				//event.preventDefault();
				//$state.go("login");
				//$location.path('/') 
			//}
		});

	})

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('docs-dark', 'default')	
      .primaryPalette('yellow', {
          'default': '400', // by default use shade 400 from the cyan palette for primary intentions
          'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
          'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
          'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
      })
      .dark()
      .accentPalette('orange',{
          'default': '200' // use shade 200 for default, and keep all other shades the same
      })
      .warnPalette('red')
    .backgroundPalette('grey');
});

app.config(function($mdIconProvider) {
    $mdIconProvider
      .iconSet('social', 'bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg', 24)
      .defaultIconSet('img/icons/sets/core-icons.svg', 24);    
});
	
