//import {customServices} from '/usr/src/app/primo-explore/custom/UCA/js/services';
import { kohaServices } from '../customServices/kohaServices';
import { shareDataService } from '../customServices/shareDataService';

angular.module('kohaItemsAvailability', ['kohaServices', 'shareDataService']).controller('kohaItemsAvailabilityController', ['$scope', '$state','kohaItemDataService', 'pnxShareDataService', function ($scope, $state, kohaItemDataService, pnxShareDataService) {
    this.$onInit = function () {
        setTimeout(() => {
        if ($scope.$ctrl.parentCtrl.item) {
            /*--- default : koha display false----*/
            $scope.kohaDisplay = false;
            /*---bib record metadata---*/
            let obj = $scope.$ctrl.parentCtrl.item.pnx;
            console.log(obj)
            let data = pnxShareDataService.pnxData(obj)
                if(data) {
                /*---items from Koha---*/
                kohaItemDataService.kohaData(data.koha_ids).then(function (successResponse) {
                    $scope.items = successResponse.items;
                    /*--- display custom koha items ----*/
                    $scope.kohaDisplay = true
                   /*---hide div.search-result-availability-line-wrapper if prm-icon is physical item----*/ 
             let elems = angular.element(document.querySelectorAll('div.search-result-availability-line-wrapper > prm-search-result-availability-line > div.layout-align-start-start > div.layout-row'));
             //console.log(elems)
             length = elems.length;
             for (let index = 0; index < length; index++) {
                //console.log(elems[index])
                if (elems[index].querySelector('prm-icon[ng-if*="$ctrl.isPhysical"]')) {
                 elems[index].style.display = 'none';
                }
             }
                    $scope.record_type = data.type

                });
            }
            else {
                $scope.kohaDisplay = false;
            }

        }
    }, "500");
    }
}]).component('prmBriefResultAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'kohaItemsAvailabilityController',
    templateUrl: 'custom/UCA/html/prmBriefResultAfter.html'
});
