//import {customServices} from '/usr/src/app/primo-explore/custom/UCA/js/services';
import { kohaServices } from '../customServices/kohaServices';
import { shareDataService } from '../customServices/shareDataService';

angular.module('kohaItemsAvailability', ['kohaServices', 'shareDataService']).controller('kohaItemsAvailabilityController', ['$scope', 'kohaItemDataService', 'pnxShareDataService', function ($scope, kohaItemDataService, pnxShareDataService) {
    this.$onInit = function () {
        if ($scope.$ctrl.parentCtrl.item) {
            /*--- default : koha display false----*/
            $scope.kohaDisplay = false;
            /*---bib record metadata---*/
            let obj = $scope.$ctrl.parentCtrl.item.pnx;
            console.log(pnxShareDataService.pnxData(obj))
            let type = obj.display.type[0];
            let toplevels = obj.facets.toplevel
            /*---bib record identifers --------*/
            let sourceids = obj.control.sourceid;
            let sourcerecordid = obj.control.sourcerecordid[0]
            /*--- init ----*/
            let koha_ids;
            if(sourceids.some(x => x.includes("_KOHA")) && toplevels.includes("available")) {
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
                    /*--- display custom koha items ----*/
                    $scope.kohaDisplay = true
                    /*---hide div.search-result-availability-line-wrapper if prm-icon is physical item----*/
                    // first try : $element.parent().parent().children()[3].style.display = "none"
                    // second try : 
                    let elems = angular.element(document.querySelectorAll('div.search-result-availability-line-wrapper > prm-search-result-availability-line > div.layout-align-start-start > div.layout-row'));
                    //console.log(elems)
                    length = elems.length;
                    for (let index = 0; index < length; index++) {
                       //console.log(elems[index])
                       if (elems[index].querySelector('prm-icon[ng-if*="$ctrl.isPhysical"]')) {
                        elems[index].style.display = 'none';
                       }
                    }
                   /* let elems = angular.element(document.querySelectorAll('div.search-result-availability-line-wrapper > prm-search-result-availability-line > div.layout-align-start-start > div.layout-row'));
                    let index = 0,
                        length = elems.length;
                    for (; index < length; index++) {
                        if (elems[index].querySelector('prm-icon[ng-if*="$ctrl.isPhysical"]')) {
                            console.log(elems[index])
                            elems[index].style.display = 'none';
                        }
                    }*/
                    $scope.record_type = type
                    $scope.biblio_id = sourcerecordid

                });
            }
            else {
                $scope.kohaDisplay = false;
            }

        }
    }
}]).component('prmBriefResultAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'kohaItemsAvailabilityController',
    templateUrl: 'custom/UCA/html/prmBriefResultAfter.html'
});
