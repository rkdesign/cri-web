require.config({
    baseUrl: "",
    
    // alias libraries paths.  Must set 'angular'
    paths: {
        'angular'					: 'bower_components/angular/angular.min',
        'angular-route'				: 'bower_components/angular-aria/angular-aria.min',
        'angularAMD'				: 'bower_components/angularAMD/angularAMD.min',
        'angular-animate' 			: 'bower_components/angular-animate/angular-animate',
        'angular-material' 			: 'bower_components/angular-material/angular-material',
        'angular-messages'			: 'bower_components/angular-messages/angular-messages.min',
        'angular-ui-router'			: 'bower_components/angular-ui-router/release/angular-ui-router.min',
        'angular-material-icons'	: 'bower_components/angular-material-icons/angular-material-icons.min',
        'svg-morpheus' 				: 'bower_components/svg-morpheus/compile/minified/svg-morpheus',
        	
        	'app' : 'angular-constructs/app',
         'Application':   'angular-constructs/shared/Application',
          'Authentication':  'angular-constructs/authentication/Authentication',
        'FacebookIntegration' :	'angular-constructs/authentication/FacebookIntegration',    
         'HomeController'  :  'angular-constructs/home/HomeController',
         'LobbyController':   'angular-constructs/lobby/LobbyController',
          'HistoryController' : ' angular-constructs/history/HistoryController ',   
          'LiveController':  'angular-constructs/live/LiveController',    
          'UpcomingController' :  'angular-constructs/upcoming/UpcomingController',
         'MyAccountController':   'angular-constructs/myAccount/MyAccountController',
          'TransactionHistoryController': ' angular-constructs/transactionHistroy/TransactionHistoryController',
          'ReferFriendController':  'angular-constructs/referFriend/ReferFriendController',   
          'WalletController':  'angular-constructs/wallet/WalletController',        	
    },
    
    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angularAMD': ['angular'],
        'angular-route': ['angular']
    },
    
    // kick start application
    deps: ['angular-constructs/bootstrap']

});
