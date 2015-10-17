var myApp = angular.module('tableApp', ['rpTable']);

myApp.controller('tableCtrl', function($scope)
{
    $scope.users = [{
        Id: 1, Name: 'Test Name 1',Age : 12,
        Country: 'INDIA',BirthDay: "20-1-2000"
    },{
        Id: 2,Name: 'Test Name 2', Age : 13,
        Country: 'USA',BirthDay: "20-12-2001"
    },{
       Id: 3,Name: 'Test Name 3',Age : 14,
       Country: 'UK',BirthDay: "20-12-2002"
    },{
        Id: 4,Name: 'Test Name 4',Age : 15,
        Country: 'RUSIA',BirthDay: "20-12-2003"
    },{
        Id: 5,Name: 'Test Name 5',Age : 16,
        Country: 'CHINA',BirthDay: "20-12-2004"
    },
    {
        Id: 6,Name: 'Test Name 5',Age : 16,
        Country: 'CHINA',BirthDay: "20-12-2004"
    },
    {
        Id: 7,Name: 'Test Name 5',Age : 16,
        Country: 'CHINA',BirthDay: "20-12-2004"
    },
        {
            Id: 8, Name: 'Test Name 1',Age : 12,
            Country: 'INDIA',BirthDay: "20-1-2000"
        },{
            Id: 9,Name: 'Test Name 2', Age : 13,
            Country: 'USA',BirthDay: "20-12-2001"
        },{
            Id: 10,Name: 'Test Name 3',Age : 14,
            Country: 'UK',BirthDay: "20-12-2002"
        },{
            Id: 11,Name: 'Test Name 4',Age : 15,
            Country: 'RUSIA',BirthDay: "20-12-2003"
        },{
            Id: 12,Name: 'Test Name 5',Age : 16,
            Country: 'CHINA',BirthDay: "20-12-2004"
        },
        {
            Id: 13,Name: 'Test Name 5',Age : 16,
            Country: 'CHINA',BirthDay: "20-12-2004"
        },
        {
            Id: 14,Name: 'Test Name 5',Age : 16,
            Country: 'CHINA',BirthDay: "20-12-2004"
        },
    ];
    $scope.cols = [{
        field: 'Id',
        displayName: "Demographic Id",
        sortable : false,
        filterable : false,
        sortingType: "number"
    },
    {
        field: 'Name',
        displayName: "Demographic Name",
        sortable : true,
        filterable : true,
        sortingType: "string"
    },
    {
        field: 'Age',
        displayName: "Demographic Age",
        sortable : true,
        filterable : true,
        sortingType: "string"
    },
    {
        field: 'Country',
        sortable : true,
        filterable : true,
        cellTemplate: "<input type='text' class='form-control' ng-click='cellTemplateScope.click(data[col.field])' ng-model='data[col.field]' value='{{data[col.field]}}'/>",
        cellTemplateScope: {
            click: function(data) {
                console.log(data);
            }
        },
        sortingType: "string"
    },
    {
        field: 'BirthDay',
        displayName: "Demographic Birthday",
        sortable : true,
        filterable : true,
        sortingType: "date"
    }];
})