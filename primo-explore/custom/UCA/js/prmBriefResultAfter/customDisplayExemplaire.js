angular.module('customDisplayExemplaire', []).controller('customDisplayExemplaireController', ['$compile', '$scope', '$http', '$element', '$sce', '$templateCache','URLs', function ($compile, $scope, $http, $element, $sce, $templateCache,URLs) {
    this.$onInit = function() {
        if ($scope.$ctrl.parentCtrl.item) {
            $scope.kohaDisplay = false; 
            let obj = $scope.$ctrl.parentCtrl.item.pnx;
            let type = obj.display.type[0];
            /*---Prod--------*/
            let sourceid = obj.control.sourceid[0];
            let sourcerecordid = obj.control.sourcerecordid[0]
            /*-----End prod----------*/
            /*---Test---
            var sourceid = "33UCA_KOHA"
            var sourcerecordid = "136"
            ---End Test---*/
            //if (sourceid.includes("_KOHA")  && (type == "book" || type == "journal")) {
                if (sourceid.includes("_KOHA")) {
                //var url = URLs._preprod_koha_api_public + "biblios/" + sourcerecordid.toString() +"/items";
                let url = URLs._devscd_koha_primo_middleware + "biblios_items/" + sourcerecordid
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
                    //$element.children().addClass("ng-hide");
                    $scope.items = response.data
                    $scope.record_type = type
                    $scope.biblio_id = sourcerecordid
                });
            }
        }
    }
}]).component('prmBriefResultAfter', {
	  bindings: {parentCtrl: '<'},
    controller: 'customDisplayExemplaireController',
    templateUrl: 'custom/UCA/html/prmBriefResultAfter.html'
  });
