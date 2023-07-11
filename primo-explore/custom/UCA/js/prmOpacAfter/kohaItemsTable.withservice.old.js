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
            $scope.userIsGuest = userData.isGuest();
            /*--- bib record metadata ---*/
            let obj = $scope.$ctrl.parentCtrl.item.pnx;
            let type = obj.display.type[0];
            let toplevels = obj.facets.toplevel
            /*---bib record identifers --------*/
            let sourceids = obj.control.sourceid;
            let sourcerecordid = obj.control.sourcerecordid[0]
            /*--- init ----*/
            let koha_ids;
            /*---items from Koha---*/
            if(sourceids.some(x => x.includes("_KOHA")) && toplevels.includes("available")) {
                console.log(sourceids)
                if(sourceids.length > 1) {
                    koha_ids = sourceids
                               .filter(item => item.includes("_KOHA"))
                               .map(x => x.split("$$O33UCA_KOHA")[1])
                               .toString()
                  }
                  else {
                      koha_ids = sourcerecordid
                  }
                /*---items from Koha---*/
                kohaItemDataService.kohaData(koha_ids).then(function (successResponse) {
                    $scope.items = successResponse.items;
                    $scope.biblio_id = $scope.items[0]["biblio_id"]
                    $scope.resa = successResponse.resa_button;
                    /*--- display custom koha items table ----*/
                    $scope.kohaTableDisplay = true
                    /*---hide native primo items table ----*/
                    angular.element(document.querySelector('prm-opac>md-tabs'))[0].style.display = "none"
                    /*----Réservation button----*/
                    $scope.record_type = type
                    console.log(type)
                    $scope.biblio_id = sourcerecordid
                    let reservationUrl = URLs._UCA_CAS + URLs._koha_prod + "/cgi-bin/koha/opac-reserve.pl?biblionumber=" + $scope.biblio_id
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