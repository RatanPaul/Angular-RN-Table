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
                    rpColDefs:"=",
                    rpItems:"="
                },
                templateUrl: 'view/table.html',
                link: function(scope, element, attrs)
                {
                    scope.sortKey = '';
                    scope.currentPage = 0;
                    scope.pagedItems = [];
                    scope.itemsPerPage = scope.rpItems ? scope.rpItems : 5;
                    scope.pagedItems = [];
                    scope.search = {};

                    for(var i =0; i < scope.rpColDefs.length; i++) if(scope.rpColDefs[i].filterable) scope.search[scope.rpColDefs[i].field] = '';

                    scope.sort = function(keyname){
                        scope.sortKey = keyname;
                        scope.reverse = !scope.reverse;
                    }
                    scope.displayFilter = function(col){
                        if(col.filterable)
                            col.isFilterDisplay = col.isFilterDisplay ? false : true;
                        if(!col.isFilterDisplay) scope.search[col.field] = '';
                    }
                    scope.reset = function(){
                        scope.sortKey = '';
                       for(var i = 0; i < scope.rpColDefs.length; i++){
                           scope.rpColDefs[i].isFilterDisplay = false;
                           scope.search[scope.rpColDefs[i].field] = '';
                       }
                        scope.globalSearch = '';
                    }

                    scope.gap = parseInt((scope.rpData.length / scope.itemsPerPage) == 0 ?
                                                (scope.rpData.length / scope.itemsPerPage)
                                                : (scope.rpData.length / scope.itemsPerPage) +1);

                    for (var i = 0; i < scope.rpData.length; i++) {
                        if (i % scope.itemsPerPage === 0) {
                            scope.pagedItems[Math.floor(i / scope.itemsPerPage)] = [ scope.rpData[i] ];
                        } else {
                            scope.pagedItems[Math.floor(i / scope.itemsPerPage)].push(scope.rpData[i]);
                        }
                    }
                    scope.prevPage = function () {
                        if (scope.currentPage > 0) {
                            scope.currentPage--;
                        }
                    };

                    scope.nextPage = function () {
                        if (scope.currentPage < scope.pagedItems.length - 1) {
                            scope.currentPage++;
                        }
                    };

                    scope.setPage = function () {
                        scope.currentPage = this.n;
                    };

                    scope.range = function (size,start, end) {
                        var ret = [];
                        if (size < end) {
                            end = size;
                            start = size-scope.gap;
                        }
                        for (var i = start; i < end; i++) {
                            ret.push(i);
                        }
                        return ret;
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