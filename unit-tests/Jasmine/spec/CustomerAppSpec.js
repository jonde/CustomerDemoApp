/* Customer App Unit Test with Jasmine */



/* Customer App Unit Test with Jasmine */


describe('customerCtrl', function () {

    var scope, httpBackend, http, controller;

    //var uri = 'https://my.ncarb.org/Public/api/certification/search?pageSize=20&page=0&lastName=Doe&firstName=Jon&city=Washington&stateCode=DC&countryCode=USA&orderBy=name';
    var uri = 'https://my.ncarb.org/Public/api/certification/search?pageSize=20&page=0&lastName=&firstName=&city=&stateCode=&countryCode=USA&orderBy=name';

    // Set up the module
    beforeEach(module('customerApp'));

    beforeEach(inject(function ($rootScope, $controller, $httpBackend,
                          $http) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        controller = $controller;
        http = $http;
        httpBackend.when("GET", uri).respond({
                                                                "data": [{
                                                                    firstName: "Jon",
                                                                    lastName: "Doe",
                                                                    city: "Washington",
                                                                    stateCode: "DC",
                                                                    countryCode: "USA"
                                                                },
                                                                {
                                                                    firstName: "Foo",
                                                                    lastName: " Bar",
                                                                    city: "Charlotte",
                                                                    stateCode: "NC",
                                                                    countryCode: "USA"
                                                                }
                                                                ],

                                                                "paging": {
                                                                    "count": 2,
                                                                    "pageSize": 20,
                                                                    "page": 0,
                                                                    "totalPages": 1
                                                                }
                                                            }
                                                        );

        $controller('customerCtrl', {
            $scope: scope,
            $http: $http
        });
    }));

    it('should make a http GET request for customers and return all customers in USA, including at least one in Washington, DC', function () {
        httpBackend.expectGET(uri);
        controller('customerCtrl', {
            $scope: scope,
            $http: http            
        });
                
        //for search function:
        scope.customer = { lastName: "", firstName: "", city: "", stateCode: "", countryCode: "USA" };
        
        scope.search();
        httpBackend.flush();
        expect(scope.customers.paging.count).toEqual(2);
        expect(scope.customers.data[0].city).toEqual('Washington');
        expect(scope.customers.data[0].stateCode).toEqual('DC');

    });
   
 });



