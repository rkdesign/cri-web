angular.module('Home', [])
	.controller('HomeController', function ($scope, $mdDialog, $mdMedia) {
		$scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
	  	$scope.dialogTitle = "Login";
		
		
		$scope.showLoginPage = function(ev){
			$scope.passDialogParamaters(ev,'angular-constructs/authentication/views/login.html');
		}
		
		$scope.showRegistrationPage = function(ev){
			$scope.passDialogParamaters(ev,'angular-constructs/authentication/views/register.html');
		}
		
		$scope.showResetPasswordPage = function(ev){
			$scope.passDialogParamaters(ev,'angular-constructs/authentication/views/resetpassword.html');
		}
		
		$scope.passDialogParamaters = function(ev, templateURL){
			var controller = 'DialogController';
			showDialog($scope, ev, templateURL, controller, $mdDialog, $mdMedia);
		}
		
		
		
	});

module.controller('DialogController', function ($scope, $mdDialog) {
	$scope.cancel = function() {
	    $mdDialog.cancel();
 };
});