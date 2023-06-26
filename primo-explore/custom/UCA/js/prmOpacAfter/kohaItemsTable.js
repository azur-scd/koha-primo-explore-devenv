import { kohaServices } from '../customServices/kohaServices';

angular.module('kohaItemsTable', ['kohaServices']).controller('kohaItemsTableController', ['$scope', '$rootScope', 'URLs', 'kohaItemDataService', function ($scope, $rootScope, URLs, kohaItemDataService) {
    this.$onInit = function () {
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
                /*---items from Koha---*/
                kohaItemDataService.kohaData(sourcerecordid).then(function (successResponse) {
                    $scope.items = successResponse.items;
                    $scope.resa = successResponse.resa_button;
                    /*--- display custom koha items table ----*/
                    $scope.kohaTableDisplay = true
                    /*---hide native primo items table ----*/
                    angular.element(document.querySelector('prm-opac>md-tabs'))[0].style.display = "none"
                    /*----Réservation button----*/
                    $scope.record_type = type
                    $scope.biblio_id = sourcerecordid
                    let reservationUrl = URLs._UCA_CAS + URLs._koha_prod + "/cgi-bin/koha/opac-reserve.pl?biblionumber=" + sourcerecordid
                    $scope.open = function () {
                        window.open(reservationUrl, "_system");
                        return false;
                    }
                });
            }
            else {
                //if error, returns to native Primo display
                $scope.kohaTableDisplay = false;
            }
        }
    }
}]).component('prmOpacAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'kohaItemsTableController',
    templateUrl: 'custom/UCA/html/prmOpacAfter.html'
});