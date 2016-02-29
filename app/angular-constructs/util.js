//Show Dialog
function showDialog($scope, ev, templateURL, controller, $mdDialog, $mdMedia){
		$scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
	    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
	    
	    $mdDialog.show({
	      controller: controller,
	      templateUrl: templateURL,
	      parent: angular.element(document.body),
	      scope: $scope,
	      targetEvent: ev,
	      preserveScope: true,
	      clickOutsideToClose:false,
	      fullscreen: useFullScreen
	    });
	    
	    $scope.$watch(function() {
	      return $mdMedia('xs') || $mdMedia('sm');
	    }, function(wantsFullScreen) {
	      $scope.customFullscreen = (wantsFullScreen === true);
	    });
}
