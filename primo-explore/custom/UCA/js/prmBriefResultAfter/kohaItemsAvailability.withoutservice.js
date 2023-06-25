angular.module('kohaItemsAvailability', []).controller('kohaItemsAvailabilityController', ['$scope', '$http', '$element', 'KOHA_MIDDLEWARE_URL', function ($scope, $http, $element, KOHA_MIDDLEWARE_URL) {
    this.$onInit = function () {
        if ($scope.$ctrl.parentCtrl.item) {
            /*---koha display false----*/
            $scope.kohaDisplay = false;
            /*---bib record metadata---*/
            let obj = $scope.$ctrl.parentCtrl.item.pnx;
            let type = obj.display.type[0];
            let toplevels = obj.facets.toplevel
            //let toplevel = obj.facets.toplevel[0]
            /*---Prod--------*/
            let sourceid = obj.control.sourceid[0];
            let sourcerecordid = obj.control.sourcerecordid[0]
            /*-----End prod----------*/
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
                    /*---koha display true----*/
                    $scope.kohaDisplay = true
                    /*--- get koha API item metadata ---*/
                    $scope.items = response.data
                    $scope.record_type = type
                    $scope.biblio_id = sourcerecordid
                    /*---hide div.search-result-availability-line-wrapper if prm-icon is physical item----*/
                    let primoElem = $element.parent().parent().children()[3]
                    let elems = angular.element(document.querySelectorAll('div.result-item-text div.search-result-availability-line-wrapper prm-search-result-availability-line div.layout-align-start-start div.layout-row'));
                    console.log(elems)
                    let index = 0,
                        length = elems.length;
                    for (; index < length; index++) {
                        if (elems[index].querySelector('prm-icon[ng-if*="isPhysical"]')) {
                            elems[index].style.display = 'none';
                        }
                    }
                }).catch(function (response) {
                    //if error, returns to native Primo display
                    $scope.kohaDisplay = false;
                })
            }

        }
    }
}]).component('prmBriefResultAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'kohaItemsAvailabilityController',
    templateUrl: 'custom/UCA/html/prmBriefResultAfter.html'
});
