angular.module('kohaItemsTable', []).controller('kohaItemsTableController', ['$scope', '$rootScope' ,'$http','KOHA_MIDDLEWARE_URL', 'URLs', function ($scope, $rootScope, $http,KOHA_MIDDLEWARE_URL, URLs) {
    this.$onInit = function() {
        if ($scope.$ctrl.parentCtrl.item) {
            /*---default : kohaTable display false----*/
            $scope.kohaTableDisplay = false;
            /* --- to detect if user is logged or not -> displaying the connection button or not---*/
            let self = this;
            self.scope = $scope;
            self.rootScope = $rootScope;
            let userData = self.rootScope.$$childHead.$ctrl.userSessionManagerService;
            console.log(userData)
            $scope.userIsGuest = userData.isGuest();
            /*--- bib record metadata ---*/
            let obj = $scope.$ctrl.parentCtrl.item.pnx;
            let type = obj.display.type[0];
            let toplevels = obj.facets.toplevel
            /*--- bib record identifers -------*/
            let sourceid = obj.control.sourceid[0];
            let sourcerecordid = obj.control.sourcerecordid[0]
                       /*---items from Koha---*/
                       if (sourceid.includes("_KOHA") && toplevels.includes("available")) {
                        let url = KOHA_MIDDLEWARE_URL._api + "biblios_items/" + sourcerecordid
                        $http({
                            "headers": {
                                'Content-Type': 'application/json',
                                'X-From-ExL-API-Gateway': undefined
                            },
                            method: 'GET',
                            //jsonpCallbackParam: 'callback',
                            url: url,
                            cache: true,
                        }).then(function (response) {
                            /*---kohaTable display true----*/
                            $scope.kohaTableDisplay = true
                            console.log(response.data)
                            /*---hide native primo items table ----*/
                            angular.element(document.querySelector('prm-opac>md-tabs'))[0].style.display = "none"
                            $scope.items = response.data
                            $scope.record_type = type
                            $scope.biblio_id = sourcerecordid
                            let reservationUrl = URLs._UCA_CAS + URLs._koha_prod +"/cgi-bin/koha/opac-reserve.pl?biblionumber=" + sourcerecordid
                            $scope.open = function () {
                                window.open( reservationUrl, "_system"); 
                                return false;
                            }
                        }).catch(function (response) {
                            //if error, returns to native Primo display
                            $scope.kohaTableDisplay = false;
                        })
                    }

        }
    }
}]).component('prmOpacAfter', {
	  bindings: {parentCtrl: '<'},
    controller: 'kohaItemsTableController',
    templateUrl: 'custom/UCA/html/prmOpacAfter.html'
  });