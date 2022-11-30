import {customDisplayExemplaire} from './prmBriefResultAfter/customDisplayExemplaire';

    var app = angular.module('viewCustom', ['angularLoad', 'customDisplayExemplaire']);

    /****************************************************************************************************/

        /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

        /*var app = angular.module('centralCustom', ['angularLoad']);*/

    /****************************************************************************************************/
  //factory pour requête API
  app.config(['$sceDelegateProvider', function ($sceDelegateProvider) {
      var urlWhitelist = $sceDelegateProvider.resourceUrlWhitelist();
      //urlWhitelist.push('http://catalogue.unice.fr:1701/primo_library/libweb/custom/getapiprimoforbdd','http://catalogue.unice.fr:1701/primo_library/libweb/custom/getbusgeoloc','https://api.archives-ouvertes.fr**','https://books.google.com**','http://books.google.com**','https://maps.google.com/maps**');
      urlWhitelist.push('http://catalogue.unice.fr:1701**', 'http://catalogue.unice.fr**','https://demo.biblibre.com**','https://pro-bu-cotedazur-koha.preprod.biblibre.eu**', 'https://catalogue-bu-cotedazur-koha.preprod.biblibre.eu**', 'https://api.archives-ouvertes.fr**','https://books.google.com**','http://books.google.com**','https://bu.univ-cotedazur.fr**','http://localhost:8003**','http://localhost:5002**','http://dev-scd.unice.fr**');
      $sceDelegateProvider.resourceUrlWhitelist(urlWhitelist);
    }])

   /* app.factory('getExternalHttpService', ['$http', function ($http) {
        return {
          getApiData: function getApiData(url) {
            return $http({
               "headers": {
            'X-From-ExL-API-Gateway': undefined 
          },  
             // jsonpCallbackParam: 'callback',
            method: 'JSONP',
              //method: 'GET',
              url: url
            });
          }
        };
      }]);*/

      app.constant('URLs', {
        _koha_preprod: '',
        _testbiblibre_koha_api_public: 'https://demo.biblibre.com/api/v1/public/',
        _testbiblibre_koha_api_privee: 'https://demo.biblibre.com/api/v1/',
        _preprod_koha_api_public: 'https://catalogue-bu-cotedazur-koha.preprod.biblibre.eu/api/v1/public/',
        _preprod_koha_api_privee: 'https://catalogue-bu-cotedazur-koha.preprod.biblibre.eu/api/v1/',
        _local_koha_primo_middleware: 'http://localhost:5002/koha-primo-middleware/api/v1/koha/',
        _devscd_koha_primo_middleware: 'http://dev-scd.unice.fr/koha-primo-middleware/api/v1/koha/',
    });

app.run(['$templateCache', function($templateCache) {
  $templateCache.put('components/search/searchResult/searchResultAvailability/searchResultAvailabilityLine.html','<prm-uca-search-result-availability-koha ng-if="{{items}}"></prm-uca-search-result-availability-koha>');	

}]);
     /*if customDisplayExemplaire_without_module : 
       1. en-tête import {customDisplayExemplaireConfig} from './prmBriefResultAfter/customDisplayExemplaire';
       2. enlever l'instanciation du module dans angular.module
       3. ajouter app.component('prmBriefResultAfter', customDisplayExemplaireConfig);
     */


