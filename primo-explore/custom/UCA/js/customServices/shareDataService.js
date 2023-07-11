angular.module('shareDataService', []).factory('pnxShareDataService', [function () {
    return {
        pnxData: function (obj) {
            /*--- init ----*/
            let koha_ids;
            /*---bib record metadata---*/
            let type = obj.display.type[0];
            let toplevels = obj.facets.toplevel
            /*---bib record identifers --------*/
            let sourceids = obj.control.sourceid;
            let sourcerecordid = obj.control.sourcerecordid[0]
            /*---apply rules to get valid Koha biblio_id numbers --------*/
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
            return {
                "type" : type,
                "koha_ids": koha_ids
              }
        }
      }
    }
}]);