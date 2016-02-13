angular.module('Application', [])
	.controller('ApplicationController', function ($scope, $mdSidenav, $state) {
		
		 $scope.menuItems = [
	         { name: 'Lobby', path: 'lobby' },
	         { name: 'Live', path: 'live' },
	         { name: 'Upcoming', path: 'upcoming' },
	         { name: 'History', path: 'history' }	         
	    ];

		 $scope.myaccountMenuItems = [		        	         
	         { name: 'Transaction Histroy', path: 'transactionHistroy' },
	         { name: 'My Account', path: 'myaccount' }       
	    ];
		 
		$scope.title = 'home';

		$scope.go = function (path, title) {
			$state.go(path);
			$scope.title = title;
		}
		
		$scope.menuIcon = 'menu';
		$scope.menuToggle = function () {
			if ($scope.menuIcon == 'menu') {
				$mdSidenav('left')
				.open();
				$scope.menuIcon = 'arrow_back';
			}
			else {
				$mdSidenav('left')
				.close();
				$scope.menuIcon = 'menu';
			}
		}
		
		$scope.currentUser = null;
		//$scope.userRoles = USER_ROLES;
		$scope.setCurrentUser = function (user) {
			console.log("Current user: " + user)
			$scope.currentUser = user;
			
		};
		
	});