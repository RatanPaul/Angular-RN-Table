/**
 * Created by LNS on 10/11/2015.
 */

(function(angular) {
    'use strict';
    angular.module('rpTable', [])
        .directive('rpTable', function() {
            return {
                restrict: 'A',
                scope:{
                    rpData:"=",
                    rpColDefs:"="
                },
                templateUrl: 'view/table.html',
                link: function(scope, element, attrs)
                {
                    scope.sortKey = '';
                    scope.sort = function(keyname){
                        scope.sortKey = keyname;
                        scope.reverse = !scope.reverse;
                    }
                    scope.displayFilter = function(col){
                        if(col.filterable)
                            col.isFilterDisplay = col.isFilterDisplay ? false : true;
                    }
                    scope.reset = function(){
                        scope.sortKey = '';
                       for(var i = 0; i < scope.rpColDefs.length; i++){
                           scope.rpColDefs[i].isFilterDisplay = false;
                       }
                    }
                    scope.main = {
                        page: 1,
                        take: 15
                    };
                    scope.nextPage = function() {
                        if (scope.main.page < scope.main.pages) {
                            scope.main.page++;

                        }
                    };

                    scope.previousPage = function() {
                        if (scope.main.page > 1) {
                            scope.main.page--;
                            scope.loadPage();
                        }
                    };
                 }
            };
        })
        .directive('compile', ['$compile',function ($compile) {
        return {
            restrict: 'A',
            link    : function (scope, element, attrs) {
                scope.cellTemplateScope = scope.$eval(attrs.cellTemplateScope);
                scope.$watch(attrs.compile, function (new_val) {
                    var link = $compile(new_val);
                    var new_elem = link(scope);
                    element.append(new_elem);
                });
            }
        };
    }]);
})(window.angular);