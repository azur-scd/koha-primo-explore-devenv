angular.module('kohaItemsAvailability', []).controller('kohaItemsAvailabilityController', ['$scope', '$http', '$element', 'URLs', function ($scope, $http, $element, URLs) {
    this.$onInit = function() {
        if ($scope.$ctrl.parentCtrl.item) {
             /*---koha display false----*/
            $scope.kohaDisplay = false; 
            /*---bib record metadata---*/
            let obj = $scope.$ctrl.parentCtrl.item.pnx;
            let type = obj.display.type[0];
            let toplevel = obj.facets.toplevel[0]
            /*---Prod--------*/
            let sourceid = obj.control.sourceid[0];
            let sourcerecordid = obj.control.sourcerecordid[0]
            /*-----End prod----------*/
                /*---items from Koha---*/
                if (sourceid.includes("_KOHA") && toplevel != 'online_resources') {
                //var url = URLs._preprod_koha_api_public + "biblios/" + sourcerecordid.toString() +"/items";
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
                    //console.log(response.data)
                    /*---koha display true----*/
                    $scope.kohaDisplay = true
                    /*---hide div.search-result-availability-line-wrapper ----*/
                    $element.parent().parent().children()[3].style.display = "none"
                    /*--- get koha API item metadata ---*/
                    $scope.items = response.data
                    $scope.record_type = type
                    $scope.biblio_id = sourcerecordid
                }).catch(function(response){
                     // error 
                     var elems = angular.element(document.querySelectorAll('.search-result-availability-line-wrapper'));
                     var index = 0,
                         length = elems.length;
                     for (; index < length; index++) {
                         elems[index].style.display = 'block';
                     }
                     var elems = angular.element(document.querySelectorAll('prm-brief-result-container prm-search-result-availability-line>*:not(:nth-last-child(1))'));
                     var index = 0,
                         length = elems.length;
                     for (; index < length; index++) {
                         elems[index].style.display = 'block';
                     }
                })        
            }

        }
    }
}]).component('prmBriefResultAfter', {
	  bindings: {parentCtrl: '<'},
    controller: 'kohaItemsAvailabilityController',
    templateUrl: 'custom/UCA/html/prmBriefResultAfter.html'
  });
