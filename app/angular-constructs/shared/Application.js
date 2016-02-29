angular.module('Application', [])
	.controller('ApplicationController', function ($scope, $mdSidenav, $state, $rootScope) {
		$scope.go = function (path, title) {
			$state.go(path);
			$scope.title = title;
		}
		
		$scope.currentUser = null;
		//$scope.userRoles = USER_ROLES;
		$scope.setCurrentUser = function (user) {
			console.log("Current user: " + user)
			$scope.currentUser = user;
			
		};
		
	});