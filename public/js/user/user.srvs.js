myServices.factory('userInfo', function($rootScope, $http, $q) {
	var user = {
        name: 'noob',
        role: 0
    };
    return {
		getUser: function() {
            return angular.copy(user);
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
            return angular.copy(user);
        },
        determineRole: function(rolesArray) {
			var usrRole;
			var roleMap = {
				'ROLE_USER': 1,
				'ROLE_CONTRIBUTER': 2,
				'ROLE_ADMIN': 3
			};
			if (rolesArray.length === 1) {
				usrRole = roleMap[rolesArray[0]];
			} else {
				var temp = 0;
				for (var i = 0; i < rolesArray.length; i++) {
					if (roleMap[rolesArray[i]] > temp) {
						usrRole = temp = roleMap[rolesArray[i]];
					}
				}
			}
			return usrRole;
        },
        isUserAuth: function() {
			return !!(user.role === 1 || user.role === 2 || user.role === 3);
        },
        isUserContributer: function() {
        	return !!(user.role === 2 || user.role === 3);
        },
        isUserAdmin: function() {
        	return !!(user.role === 3);
        },
		signInUser: function (email, pw) {
			return $http.post(config.apiUrl + '/auth/' + email, {'password': pw}).then(function (result) {
				return result.data;
			});
		},
		signOutUser: function () {
			return $http.get(config.apiUrl + '/auth/logout').then(function (result) {
				return result.data;
			});
		}
	};
});