/**
 * Created by LNS on 10/11/2015.
 */

(function(angular) {
    'use strict';
    angular.module('rpTable', [])
        .run(function($templateCache) {
            $templateCache.put('view/table.html', '<thead>'+
                '    <tr >'+
                '        <th ng-repeat="col in rpColDefs" >'+
                '            <div class="headerNameDiv" ng-show="!col.sortable">'+
                '                {{col.displayName || col.field}}'+
                '            </div>'+
                '            <div class="headerNameDiv" ng-click="sort(col.field)" ng-show="col.sortable">'+
                '                {{col.displayName || col.field}}'+
                '                <span class="glyphicon sort-icon" ng-show="sortKey === col.field" ng-class="{\'glyphicon-chevron-up\':!reverse,\'glyphicon-chevron-down\':reverse}"></span>'+
                '            </div>'+
                '            <div class="headerFilterDiv" ng-show="col.filterable">'+
                '                <span class="glyphicon glyphicon-filter" ng-style="col.isFilterDisplay && {\'color\':\'#0099CC\'}" style="cursor: pointer;" ng-click="displayFilter(col);"></span>'+
                '            </div>'+
                '            <div ng-style="{\'visibility\': col.isFilterDisplay && col.filterable?\'visible\':\'hidden\'}" >'+
                '                <input type="{{col.sortingType}}"  class="form-control input-sm" ng-model="search[col.field]" placeholder="Search by {{col.displayName || col.field}}">'+
                '            </div>'+
                '        </th>'+
                '    </tr>'+
                '</thead>'+
                '<tbody>'+
                '    <tr ng-repeat="data in pagedItems[currentPage] | orderBy:sortKey:reverse | filter:search | filter:globalSearch">'+
                '        <td ng-repeat="col in rpColDefs">'+
                '            <div ng-if="col.cellTemplate" compile="col.cellTemplate" cell-template-scope="col.cellTemplateScope"></div>'+
                '            <div ng-if="!col.cellTemplate">{{data[col.field]}}</div>'+
                '        </td>'+
                '    </tr>'+
                '</tbody>'+
                '<tfoot>'+
                '    <tr>'+
                '        <td colspan="1"><input type="text" class="form-control input-sm" placeholder="Global Search" ng-model="globalSearch"/></td>'+
                '        <td colspan="1"><button class="btn-primary btn btn-sm" ng-click="reset();">Reset</button></td>'+
                '        <td colspan="{{rpColDefs.length}}-2">'+
                '            <nav>'+
                '                <ul class="pagination pull-right" style="margin: 0px; ">'+
                '                    <li ng-class="{disabled: currentPage == 0}">'+
                '                        <a href="#" aria-label="Previous" ng-click="prevPage()">'+
                '                            <span aria-hidden="true">&laquo;</span>&nbsp;&nbsp;Prev'+
                '                        </a>'+
                '                    </li>'+
                '                    <li ng-repeat="n in range(pagedItems.length, currentPage, currentPage + gap) "'+
                '                        ng-class="{active: n == currentPage}"'+
                '                        ng-click="setPage()">'+
                '                        <a href ng-bind="n + 1">1</a>'+
                '                    </li>'+
                '                    <li ng-class="{disabled: (currentPage) == pagedItems.length - 1}">'+
                '                        <a href="#" aria-label="Next" ng-click="nextPage()">'+
                '                            Next&nbsp;&nbsp;<span aria-hidden="true">&raquo;</span>'+
                '                        </a>'+
                '                    </li>'+
                '                </ul>'+
                '            </nav>'+
                '        </td>'+
                '    </tr>'+
                '</tfoot>');
        })
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