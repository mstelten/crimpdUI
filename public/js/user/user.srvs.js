myServices.factory('userInfo', function($rootScope, $http, $q) {
	var user = {
        name: 'noob',
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
			return !!(user.role == (1 || 2 || 3));
        },
        isUserContributer: function() {
        	return !!(user.role = (2 || 3));
        },
        isUserAdmin: function() {
        	return !!(user.role = 3);
        },
		signInUser: function (email, pw) {
			var deferred = $q.defer();
			$http.post(config.apiUrl + '/auth/' + email, {'password': pw}).success(function (data) {
				deferred.resolve(data);
			});
			return deferred.promise;
		},
		signOutUser: function () {
			var deferred = $q.defer();
			$http.get(config.apiUrl + '/auth/logout').success(function (data) {
				deferred.resolve(data);
			});
			return deferred.promise;
		}
	};
});