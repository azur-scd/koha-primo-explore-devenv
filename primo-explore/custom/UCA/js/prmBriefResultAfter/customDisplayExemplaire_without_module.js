class customDisplayExemplaireController {
    constructor($http, $scope, $element, $sce, $templateCache,URLs) {
        this.$onInit = function () {
            //all data in $scope.$ctrl.parentCtrl.item and all pnx in $scope.$ctrl.parentCtrl.item.pnx
            // help https://github.com/jsicot/primo-explore-33UDR2/blob/master/js/prmBriefResultAfter/kohaAvailabilities.module.js
            if ($scope.$ctrl.parentCtrl.item) {
                $scope.kohaDisplay = false; 
                var obj = $scope.$ctrl.parentCtrl.item.pnx.control;
                /*---Prod--------
                var sourceid = obj.sourceid[0];
                var sourcerecordid = obj.sourcerecordid[0]
                ---------------*/
                /*---Test---*/
                var sourceid = "sc_aleph__uns01000500488"
                var sourcerecordid = "136"
                /*---End Test---*/
                if (sourceid.includes("sc_aleph")) {
                    //var url = `${URLs.testbiblibre_koha_api_public}biblios/${sourcerecordid.toString()}/items`;
                    //var url = "http://dev-scd.unice.fr/koha-primo-middleware/api/v1/koha_items/136";
                    var url = URLs._test_koha_primo_middleware + "api/v1/koha_items/" + sourcerecordid
                    $http({
                        "headers": {
                            'Content-Type': 'application/json',
                            'X-From-ExL-API-Gateway': undefined
                        },
                        method: 'GET',
                        //jsonpCallbackParam: 'callback',
                        url: url
                    }).then(function (response) {
                        $scope.kohaDisplay = false; 
                        var items = response.data;
                        $scope.home_library_id = items.home_library_id;
                        $scope.location = items.location;
                        $scope.callnumber = items.callnumber;
                        if (items.checked_out_date != null) {
                            $scope.availability = "Indisponible"
                        }
                        else {
                            $scope.availability = "Disponible"
                        }
                    });
                }
            }

        }

    }
}

customDisplayExemplaireController.$inject = ['$http', '$scope', '$element', '$templateCache'];
export let customDisplayExemplaireConfig = {
    bindings: { parentCtrl: '<' },
    controller: customDisplayExemplaireController,
    templateUrl: 'custom/UNS/html/prmBriefResultAfter.html'
}
