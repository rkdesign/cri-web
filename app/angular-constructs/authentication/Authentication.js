'use strict';

var angular = angular;
var module = angular.module('Authentication', []);

module.controller('RegistrationController', function ($scope, $rootScope, $state, AUTH_EVENTS, AuthService, URLS, $mdDialog, $mdMedia) {
	$scope.credentials = {
			firstName 		: '',
			lastName 		: '',
			username		: '',
			email			: '',
			password		: '',
			confirmpassword	: '',
			gender			: '',
			age				: '',
			gymtimings		: '',
			mailingAddress	: '',
			phonenumber		: ''		
	};
	
	
	$scope.registrationError = false;
	$scope.registrationSuccess = false;
	$scope.register = function (credentials) {
		$scope.authFailureMessage = "";
		$scope.authSuccessMessage = "";
		$scope.registrationError = false;
		$scope.registrationSuccess = false;
		
		if($scope.registerForm.$valid) {
			
			credentials.username = credentials.username.toLowerCase().replace(/\s+/g,'');
			credentials.email = credentials.email.toLowerCase().replace(/\s+/g,'');
			AuthService.register(credentials)
			.then(function (user) {
				$rootScope.registrationSuccess = true;	
				$state.go('login');			
				$scope.registrationError = false;
				$scope.CallMailService(credentials.username, credentials.email,credentials.password);				
			})
			.catch(function (res) {
				$scope.authFailureMessage = res.data.error.message;
				$scope.registrationError = true;
				$rootScope.registrationSuccess = false;	
			})
			.finally(function () {
				$scope.credentials.password = "";
				$scope.credentials.confirmpassword = "";
			});
		}
	};

});

module.controller('LoginController', function ($scope, $rootScope, $state, AUTH_EVENTS, USER_ROLES, AuthService, $mdDialog, $mdMedia, SessionService) {
	 	
	$scope.credentials = {
		username: "",
		password: ""
	};
		
	
		
	$scope.login = function (credentials) {
		
		$scope.authFailureMessage = "";
		$scope.authSuccessMessage = "";		
		$scope.loginError = false;	
		$scope.loginSuccess=false;
		
		 
		if($scope.loginForm.$valid) {
			credentials.username = credentials.username.toLowerCase().replace(/\s+/g,'');
			$scope.loginError = false;
			$state.go("lobby", "lobby");
			$state.go("admin", "Admin");
			//$scope.callLoginService(credentials);
		}
	};
	
	/*$scope.callLoginService =  function(credentials){
		AuthService.login(credentials)
		.then(function (data) {				
			$scope.loginError = false;							
			$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);	
			$rootScope.loggedIn = true;
			$scope.getUserPrivileges(data.user);
			
		})					
		.catch(function (res) {
			$scope.authFailureMessage = AUTH_EVENTS.loginFailed;
			$scope.loginError = true;				
		})
		.then(function () {
			$scope.credentials.password = "";
			$scope.credentials.username = "";
		});
	}*/
	
		$scope.getUserPrivileges = function(user){
			AdminDataService.getUserPrivileges(user.id)
			.success(function (data) {			
				//$scope.fitnesCompanyAdmin = (data.fitnessCompaniesAdministrated.length > 0) ? true : false;
				//$scope.fitnesCenterAdmin = (data.fitnessCentersAdministrated.length > 0) ? true : false;
				//$scope.admin = (data.roles.length > 0) ? true : false;		
				
				if(data.roles.length > 0){					
					user.userRoles = USER_ROLES.admin;
					$scope.setCurrentUser(user);
					//$state.go("admin");
				}else{
					user.userRoles = USER_ROLES.guest;
					$scope.setCurrentUser(user);
					//$state.go("workout-statistics");
				}
			})
			.catch(function (res) {
				var message = AUTH_MESSAGES[res.data.error.message] || res.data.error.message;
				$scope.authFailureMessage = message;			
				$scope.authError = true;
			});
		}
	
	
			$scope.getPublicProfile = function(){
		    	facebook.getUser().then(function(r){
		    		var response = r.user;
		    		console.log(r.user);
		    		var userDetails = {
		       				firstName 		: response.first_name,
		       				lastName 		: response.last_name,
		       				username		: response.name.toLowerCase().replace(/\s+/g,''),
		       				email			: response.email.toLowerCase().replace(/\s+/g,''),
		       				password		: response.first_name+"@1234",
		       				gender			: response.gender,
		       				age				: (response.age_range) ? response.age_range : 21,
		       				gymtimings		: '',
		       				mailingAddress	: '',
		       				phonenumber		: ''    
		       		};
		        	   
		            // $scope.ValidateUserRegistration(userDetails);
		             console.log(userDetails)
		    	});
		    }
		    $scope.img = "";
		    
		    $scope.getProfilePicture = function(){
		    	facebook.getUserPicture("me",{width:300, height:300}).then(function(r){
		    		$scope.img = r.picture.url;
		    	});
		    }
        
   
	
         $scope.ValidateUserRegistration = function(userProfile){
        	 
        	 $scope.facebookUserProfileRegistration(userProfile);
        	 
        	 /*AuthService.emailValidate(userDetails.email)
        	 .then(function (data) {				
				if(data){
					$scope.setCurrentUser(data.user);	
					SessionService.create(user);
					$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);	
					$rootScope.loggedIn = true;
					$state.go("workout-statistics");					
				}else{
					$scope.facebookUserProfileRegistration(userProfile);
				}
			})					
			.catch(function (res) {
				$scope.authFailureMessage = AUTH_EVENTS.loginFailed;
				$scope.loginError = true;				
			});*/
         }
         
         $scope.facebookUserProfileRegistration = function(userProfile){        	       	        	         	 			
 			AuthService.register(userProfile)
 			.then(function (user) {
 				var credentials={
 						username : userProfile.username,
 						password : userProfile.password
 				} 				
 				$scope.callLoginService(credentials);
 			})
 			.catch(function (res) {
 				$scope.authFailureMessage = res.data.error.message;
 				$scope.registrationError = true;
 			});
 			
         };	
});

module.controller('ResetPasswordController', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {
	$scope.credentials = {
		email: ''		
	};
	$scope.authError = false;	
	$scope.authSuccess=false;

	$scope.fotgotpassword = function (credentials) {
		$scope.authFailureMessage = "";
		
		$scope.$broadcast('runCustomValidations', {
            forms: ['loginForm']
        });
		if($scope.loginForm.$valid) {
		AuthService.resetpassword(credentials)
			.then(function (user) {
						
			})
			.catch(function (res) {
				
				$scope.authFailureMessage = res.data.error.message;
			})
			.then(function () {
				$scope.credentials.email = "";
			});
		}
	};
});


module.controller('LogoutController', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {

	$scope.authError = false;	
	$scope.authSuccess=false;
	
	$scope.logout = function () {
		$scope.logoutStatus = "Logging out...";
		AuthService.logout()
			.then(function () {
				$scope.authError = false;
				$scope.authSuccess=true;
				$scope.logoutStatus = "You have been logged out. Goodbye!";
			})
			.catch(function () {
				$scope.authError = true;
				$scope.authSuccess=false;
				$scope.logoutStatus = "There was some kind of error logging you out! You may still be logged in...";
			})
			.finally(function () {
				$rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
				$scope.setCurrentUser(null);
				$rootScope.loggedIn = false;
			});
	};
	$scope.logout();
});

module.factory('AuthService', function ($http, SessionService, AUTH_MESSAGES, URLS) {
	var authService = {};
	//user Registration Service
	authService.register = function (credentials) {
		//Real login
		return $http
			.post((URLS.SITE_URL + URLS.REGISTER), credentials, {
				cache: false,
				withCredentials: true,
			})
			.then(function (res) {
				if (res.data.error) {
					var message = AUTH_MESSAGES[res.data.error.message] || res.data.error.message;
					throw Error(message);
				} else {
					console.log("Login attempt: ");
					console.dir(res.data);					
					return res.data;
				}
			});
	};
	
	//user login Service
	authService.login = function (credentials) {
		//Real login
		return $http
			.post((URLS.SITE_URL + URLS.LOGIN), credentials, {
				cache: false,
				withCredentials: true,
			})
			.then(function (res) {
				if (res.data.error) {
					var message = AUTH_MESSAGES[res.data.error] || res.data.error;
					throw Error(message);
				} else {
					console.log("Login attempt: ");
					console.dir(res.data);
					SessionService.create(res.data);
					return res.data;
				}
			});
	};
		
	//user logout Service
	authService.logout = function () {
		
		return $http({
			 	url: URLS.SITE_URL + URLS.LOGOUT,
	            method: "POST",	           
	            headers: {'Authorization': SessionService.getID()}
			})	
			.success(function () {
				SessionService.destroy();
			}).error(function (res) {
				console.log(res)
			});
		
	};
	
	// get user details
	authService.getUserDetails = function() {
		return $http
			.get((URLS.SITE_URL + URLS.GET_USER_INFO + SessionService.getUserID()), {
				cache: false,
				withCredentials: true,
				headers: {'Authorization': SessionService.getID()}
			}).then(function (res) {
				if (res.data.error) {
					var message = AUTH_MESSAGES[res.data.error] || res.data.error;
					throw Error(message);
				} else {							
					return res.data;
				}
			});
	};
	
	//update user details
	authService.updateUserDetails = function(userDetails) {
		return $http
			.put((URLS.SITE_URL + URLS.UPDATE_USER_DETAILS + SessionService.getUserID()), userDetails, {
				cache: false,
				withCredentials: true,
				headers: {'Authorization': SessionService.getID()}
			}).then(function (res) {
				if (res.data.error) {
					var message = AUTH_MESSAGES[res.data.error] || res.data.error;
					throw Error(message);
				} else {							
					return res.data;
				}
			});
	};

	// password resest service
	authService.resetpassword = function (credentials) {
		//Real login
		return $http
			.post((URLS.SITE_URL + URLS.RESETPASSWORD), credentials, {
				cache: false,
				withCredentials: true,
				headers: {'Authorization': SessionService.getID()}
			})
			.then(function (res) {
				if (res.data.error) {
					var message = AUTH_MESSAGES[res.data.error] || res.data.error;
					throw Error(message);
				} else {
					console.log("Login attempt: ");
					console.dir(res.data);					
					return res.data;
				}
			});
	};
	
	// password resest service
	authService.changepassword = function (credentials) {
		//Real login
		return $http
			.put((URLS.SITE_URL + URLS.CHANGE_PASSWORD +  SessionService.getUserID()), credentials, {
				cache: false,
				withCredentials: true,
				headers: {'Authorization': SessionService.getID()}
			})
			.then(function (res) {
				if (res.data.error) {
					var message = AUTH_MESSAGES[res.data.error] || res.data.error;
					throw Error(message);
				} else {
					console.log("Login attempt: ");
					console.dir(res.data);					
					return res.data;
				}
			});
	};	

	authService.isAuthenticated = function () {
		return !!Session.userId;
	};

	authService.isAuthorized = function (authorizedRoles) {
		if (!angular.isArray(authorizedRoles)) {
			authorizedRoles = [authorizedRoles];
		}
		return (authService.isAuthenticated() &&
		authorizedRoles.indexOf(Session.userRole) !== -1);
	};
	
	return authService;
});

module.factory('SessionService', function () {

	var sessionService = {};

	sessionService.create = function (data) {		
			this.id = data.id;
			this.userID = data.userId;
			this.username = data.user.username;
			this.userEmail = data.user.email;		
	};

	sessionService.destroy = function () {
		this.id = null;
		this.userID = null;
		this.username = null;
		this.userEmail = null;
	};

	sessionService.getID = function () {
		return this.id;
	};
	
	sessionService.getUserID = function () {
		return this.userID;
	};

	sessionService.getUsername = function () {
		return this.username;
	}

	sessionService.getUserEmail = function () {
		return this.userEmail;
	};
	
	

	sessionService.isAuthorized = function () {
		return ((!!this.userID));
	};

	return sessionService;
})
