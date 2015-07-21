// JavaScript source code


var app = angular.module('customerApp', []);
app.controller('customerCtrl', function ($scope, $http) {

    var custUri = 'https://my.ncarb.org/Public/api/certification/search?pageSize=20&page=0&';
    var custUriEnd = '&orderBy=name';

    $scope.customer = { lastName: "", firstName: "", city: "", stateCode: "", countryCode: "USA" };

    $scope.reset = function () {
        $scope.customer = { lastName: "", firstName: "", city: "", stateCode: "", countryCode: "USA" };
    }

    
    $scope.search = function () {

        var lastName = $scope.customer.lastName;
        var firstName = $scope.customer.firstName;
        var city = $scope.customer.city;
        var stateCode = $scope.customer.stateCode;
        var countryCode = $scope.customer.countryCode;

        $http.get(custUri + 'lastName=' + lastName + '&firstName=' + firstName + '&city=' + city + '&stateCode=' + stateCode + '&countryCode=' + countryCode + custUriEnd)
             .success(function (response) {

                 $scope.customers = response;

             });

    }

});


