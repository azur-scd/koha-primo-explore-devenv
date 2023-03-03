angular.module('kohaItemsTable', []).controller('kohaItemsTableController', ['$scope', '$rootScope' ,'$http','URLs', function ($scope, $rootScope, $http,URLs) {
    this.$onInit = function() {
        if ($scope.$ctrl.parentCtrl.item) {
            /* --- user ---*/
            let self = this;
            self.scope = $scope;
            self.rootScope = $rootScope;
            let userData = self.rootScope.$$childHead.$ctrl.userSessionManagerService;
            console.log(userData)
            $scope.userIsGuest = userData.isGuest();
            /*--- items ---*/
            let obj = $scope.$ctrl.parentCtrl.item.pnx;
            let type = obj.display.type[0];
            let toplevel = obj.facets.toplevel[0]
            /*---Prod--------*/
            let sourceid = obj.control.sourceid[0];
            let sourcerecordid = obj.control.sourcerecordid[0]
            /*-----End prod----------*/
                       /*---items from Koha---*/
                       if (sourceid.includes("_KOHA") && toplevel != 'online_resources') {
                        let url = URLs._prodscd_koha_primo_middleware + "biblios_items/" + sourcerecordid
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
                            console.log(response.data)
                            $scope.items = response.data
                            $scope.record_type = type
                            $scope.biblio_id = sourcerecordid
                            let reservationUrl = URLs._UCA_CAS + URLs._koha_prod +"/cgi-bin/koha/opac-reserve.pl?biblionumber=" + sourcerecordid
                            $scope.open = function () {
                                window.open( reservationUrl, "_system"); 
                                return false;
                            }
                        });
                    }

        }
    }
}]).component('prmOpacAfter', {
	  bindings: {parentCtrl: '<'},
    controller: 'kohaItemsTableController',
    templateUrl: 'custom/UCA/html/prmOpacAfter.html'
  });