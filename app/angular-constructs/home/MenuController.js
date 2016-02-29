angular.module('Menu', [])
	.controller('MenuController', function ($scope, $mdSidenav, $state, $rootScope) {
		
		$scope.$on('$viewContentLoaded', function() {
			$rootScope
		});
		
		 $scope.menuItems = [
	         { name: 'Lobby', path: 'lobby' },
	         { name: 'Live', path: 'live' },
	         { name: 'Upcoming', path: 'upcoming' },
	         { name: 'History', path: 'history' }	         
	    ];

		 $scope.myaccountMenuItems = [		        	         
	         { name: 'Transaction Histroy', path: 'transactionHistroy' },
	         { name: 'My Account', path: 'myaccount' },
	         { name: 'Change Password', path: 'changepassword' },
	         { name: 'Log out', path: 'logout' }	         
	        
	    ];
		 
		$scope.title = 'home';

		
		
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
		
	});