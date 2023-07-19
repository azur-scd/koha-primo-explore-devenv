import { kohaServices } from '../customServices/kohaServices';
import { shareDataService } from '../customServices/shareDataService';

angular.module('kohaItemsTable', ['kohaServices', 'shareDataService']).controller('kohaItemsTableController', ['$scope', '$rootScope', 'URLs', 'kohaItemDataService', 'pnxShareDataService', function ($scope, $rootScope, URLs, kohaItemDataService, pnxShareDataService) {
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
            console.log($scope)
            /*--- bib record metadata ---*/
            let obj = $scope.$ctrl.parentCtrl.item.pnx;
            let data = pnxShareDataService.pnxData(obj)
            if(data){
                /*---items from Koha---*/
                kohaItemDataService.kohaData(data.koha_ids).then(function (successResponse) {
                    $scope.items = successResponse.items;
                    $scope.biblio_id = $scope.items[0]["biblio_id"]
                    $scope.resa = successResponse.resa_button;
                    /*--- display custom koha items table ----*/
                    $scope.kohaTableDisplay = true
                    /*---hide native primo items table ----*/
                    angular.element(document.querySelector('prm-opac>md-tabs'))[0].style.display = "none"
                    /*----Réservation button----*/
                    $scope.record_type = data.type
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