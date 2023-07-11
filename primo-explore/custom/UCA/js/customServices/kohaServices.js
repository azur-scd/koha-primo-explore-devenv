angular.module('kohaServices', []).factory('kohaItemDataService', ['$http', '$q', 'KOHA_MIDDLEWARE_URL', function ($http, $q, KOHA_MIDDLEWARE_URL) {
  return {
    kohaData: function (koha_ids) {
      let url = KOHA_MIDDLEWARE_URL._api + "biblios_items?biblio_ids=" + koha_ids
      return $http({
        "headers": {
          'Content-Type': 'application/json',
          'X-From-ExL-API-Gateway': undefined
        },
        method: 'GET',
        url: url,
        cache: true,
      }).then(function (response) {
        return response.data;
      });
    }
  }

  /*this.getKohaData = function (sourcerecordid) {
    let url = KOHA_MIDDLEWARE_URL._api + "biblios_items/" + sourcerecordid
    $http({
        "headers": {
            'Content-Type': 'application/json',
            'X-From-ExL-API-Gateway': undefined
        },
        method: 'GET',
        url: url,
        cache: true,
    }).then(function (response) {
      return response.data;
    });
  }*/
}]);