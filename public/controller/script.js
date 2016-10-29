var myApp=angular.module("myApp",['ngRoute']); //passing ngRoute as a dependency



//Routing Implementation


myApp.config(function ($routeProvider) {

    $routeProvider

    .when('/', {

        templateUrl: 'views/usecase.html',
        controller: 'jsoncontroller'
    })

	.when('/usecase', {

	    templateUrl: 'views/usecase.html',
	    controller: 'jsoncontroller'
	})

	.when('/addcase', {

	    templateUrl: 'views/addcase.html',
	    controller: 'addcasecontroller'

	})
    .when('/usecasetimeline/:id', {

    templateUrl:'views/usecasetimeline.html',
    controller:'usecasetimelinecontroller'
    });

});



//Controllers Implementation

myApp.controller("jsoncontroller",getjson);

function getjson($scope,$http) {
    $http.get('/getusecases').success(function (response)     // making a get request to get all usecases
{

$scope.jsondata=response;
});

console.log("function called");
}





myApp.controller("addcasecontroller",addcase);

function addcase($scope,$http)
{

    $scope.addusecase = function () {
        console.log($scope.usecase);
        $http({                                           // making a post request to enter new usecase
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: $scope.usecase,
            url: '/postusecase'
        }).success(function (response) {
            console.log("response received");
            $scope.usecase.message = "UseCase Added Successfully";
            $scope.usecase.title = "";
            $scope.usecase.body = "";
        });




    }

}

myApp.controller("usecasetimelinecontroller", usecasetimeline);

function usecasetimeline($scope, $http, $routeParams) {
  
    var timelinedata = [];
    $http({                                           // making a get request to get the milestones of the current usecase
        url: '/getusecasebyid', 
        params: { id: $routeParams.id },
        method: "get"
    })
       .success(function (response) {

           console.log(response);

           var count = Object.keys(response).length;
           console.log(count)

           if (count < 4) {                               //checking if no milestone object is received
               $scope.message = "No Milestones found!";
               console.log("less than 3");
           }

           else if (response.milestones.length == 0) {   //checking if the milesotes object is empty
               $scope.message = "No Milestones found!";
           }


           else {

               var getdate = { id: response.milestones[0].id, content: response.milestones[0].name, start: response.milestones[0].start_date, end: response.milestones[0].end_date };
               timelinedata.push(getdate);
               var getdate1 = { id: response.milestones[1].id, content: response.milestones[1].name, start: response.milestones[1].start_date, end: response.milestones[1].end_date };
               timelinedata.push(getdate1);
               var getdate2 = { id: response.milestones[2].id, content: response.milestones[2].name, start: response.milestones[2].start_date, end: response.milestones[2].end_date };
               timelinedata.push(getdate2);
               var getdate3 = { id: response.milestones[3].id, content: response.milestones[3].name, start: response.milestones[3].start_date, end: response.milestones[3].end_date };
               timelinedata.push(getdate3);
               var getdate4 = { id: response.milestones[4].id, content: response.milestones[4].name, start: response.milestones[4].start_date, end: response.milestones[4].end_date };
               timelinedata.push(getdate4);
              


               var container = document.getElementById('visualization');

               // Create a DataSet (allows two way data-binding)
               var items = new vis.DataSet(timelinedata);




               // Configuration for the Timeline
               var options = {};

               // Create a Timeline
               var timeline = new vis.Timeline(visualization, items, options);
           }
       });

}
