// Require utils
var kuf = require('plugins/wazuh/utils/kibanaUrlFormatter.js');
// Require config
var app = require('ui/modules').get('app/wazuh', []);

app.controller('generalController', function ($scope, $q, DataFactory, tabProvider, $mdToast) {
    //Initialisation

    $scope.load = true;
    $scope.search = '';
    $scope.menuNavItem = 'agents';
    $scope.submenuNavItem = '';
	
	
	
    var objectsArray = [];

    $scope.pageId = (Math.random().toString(36).substring(3));
    tabProvider.register($scope.pageId);

    //Print Error
    var printError = function (error) {
        $mdToast.show({
            template: '<md-toast>' + error.html + '</md-toast>',
            position: 'bottom left',
            hideDelay: 5000,
        });
        if ($scope.blocked) {
            $scope.blocked = false;
        }
    };

    //Tabs
    $scope.setTab = function (tab, group) {
        tabProvider.setTab($scope.pageId, tab, group);
    };

    $scope.isSetTab = function (tab, group) {
        return tabProvider.isSetTab($scope.pageId, tab, group);
    };

    //Functions

    $scope.getAgentStatusClass = function (agentStatus) {
        if (agentStatus == "active")
            return "green"
        else if (agentStatus == "disconnected")
            return "red";
        else
            return "red";
    };
	
	$scope.formatAgentStatus = function (agentStatus) {
        if (agentStatus == "active")
            return "Active"
        else if (agentStatus == "disconnected")
            return "Disconnected";
        else
            return "Never connected";
    };

    $scope.agentsSearch = function (search) {
        var defered = $q.defer();
        var promise = defered.promise;

        if (search) {
            DataFactory.filters.set(objectsArray['/agents'], 'search', search);
        } else {
            DataFactory.filters.unset(objectsArray['/agents'], 'search');
        }

        DataFactory.get(objectsArray['/agents'])
            .then(function (data) {
                defered.resolve(data.data.items);
            }, function (data) {
                printError(data);
                defered.reject();
            });
        return promise;
    };

    $scope.applyAgent = function (agent) {
        if (agent) {
            $scope.submenuNavItem == '' ? $scope.submenuNavItem = 'overview' : null;
            $scope._agent = agent;
			$scope.search = agent.name;
        }        
    };

    $scope.addAgent = function () {
        if ($scope.newName == undefined) {
            notify.error('Error adding agent: Specify an agent name');
        }
        else if ($scope.newIp == undefined) {
            notify.error('Error adding agent: Specify an IP address');
        }
        else {
            DataFactory.getAndClean('post', '/agents', {
                name: $scope.newName,
                ip: $scope.newIp
            }).then(function (data) {
                $mdToast.show($mdToast.simple().textContent('Agent added successfully.'));
                $scope.agentsGet();
            }, printError);
        }
    };

    //Load
    DataFactory.initialize('get', '/agents', {}, 256, 0)
        .then(function (data) {
            objectsArray['/agents'] = data;
            DataFactory.get(data).then(function (data) {
                DataFactory.filters.register(objectsArray['/agents'], 'search', 'string');
                $scope.load = false;
            }, printError);
        }, printError);

    //Destroy
    $scope.$on("$destroy", function () {
        angular.forEach(objectsArray, function (value) {
            DataFactory.clean(value)});
        tabProvider.clean($scope.pageId);
    });


});