var myServices = angular.module('myServices', []);

myServices.factory('userInfo', function($rootScope) {
	var user = {
        name: 'guest',
        role: 0
    }
    return {
		getUser: function() {
            return user;
        },
        updateUser: function(newName, newRole) {
        	if (arguments.length == 2) {
        		user.name = newName;
        		user.role = newRole;
        	} else {
        		if (typeof arguments[0] == 'string') {
        			user.name = arguments[0];
        			user.role = 1;
        		} else {
        			user.role = arguments[1];
        		}
        	}
            $rootScope.$broadcast('userChange');
            return user;
        }
	};
});
