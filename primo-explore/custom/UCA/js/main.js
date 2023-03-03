import {kohaItemsAvailability} from './prmBriefResultAfter/kohaItemsAvailability';
import {kohaItemsTable} from './prmOpacAfter/kohaItemsTable';

    let app = angular.module('viewCustom', ['angularLoad', 'kohaItemsAvailability', 'kohaItemsTable']);

    /****************************************************************************************************/

        /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

        /*var app = angular.module('centralCustom', ['angularLoad']);*/

    /****************************************************************************************************/

  //factory pour requête API
  app.config(['$sceDelegateProvider', function ($sceDelegateProvider) {
      let urlWhitelist = $sceDelegateProvider.resourceUrlWhitelist();
      urlWhitelist.push('http://catalogue.unice.fr:1701**',
                        'http://catalogue.unice.fr**',
                        'https://demo.biblibre.com**',
                        'https://pro-bu-cotedazur-koha.preprod.biblibre.eu**',
                        'https://catalogue-bu-cotedazur-koha.preprod.biblibre.eu**',
                        'https://api.archives-ouvertes.fr**',
                        'https://books.google.com**',
                        'http://books.google.com**',
                        'https://bu.univ-cotedazur.fr**',
                        'http://localhost:8003**',
                        'https://localhost:5000**',
                        'http://dev-scd.unice.fr**',
                        'https://api-scd.univ-cotedazur.fr**');
      $sceDelegateProvider.resourceUrlWhitelist(urlWhitelist);
    }])

      app.constant('URLs', {
        _UCA_CAS: 'https://login.unice.fr/login?service=',
        _koha_prod: 'https://catalogue-bu-univ-cotedazur.biblibre.fr',
        _koha_preprod: 'https://catalogue-bu-cotedazur-koha.preprod.biblibre.eu',
        _testbiblibre_koha_api_public: 'https://demo.biblibre.com/api/v1/public/',
        _testbiblibre_koha_api_privee: 'https://demo.biblibre.com/api/v1/',
        _preprod_koha_api_public: 'https://catalogue-bu-cotedazur-koha.preprod.biblibre.eu/api/v1/public/',
        _preprod_koha_api_privee: 'https://catalogue-bu-cotedazur-koha.preprod.biblibre.eu/api/v1/',
        _local_koha_primo_middleware: 'https://localhost:5000/koha-primo-middleware/api/v1/koha/',
        _devscd_koha_primo_middleware: 'http://dev-scd.unice.fr/koha-primo-middleware/api/v1/koha/',
        _prodscd_koha_primo_middleware: 'https://api-scd.univ-cotedazur.fr/koha-primo-middleware/api/v1/koha/',
    });

// load jquery
app.component('prmTopBarBefore', {
  bindings: { parentCtrl: '<' },
  controller: [function controller() {
      this.$onInit = function() {
        const url = "https://code.jquery.com/jquery-3.6.3.min.js"
        const head = document.getElementsByTagName('head')[0];
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        head.appendChild(script);
      };
  }]
});

// matomo
app.component('prmExploreMainAfter', {
  templateUrl: 'custom/UCA/html/matomo.html'
});

app.run(['$templateCache', function($templateCache) {
  $templateCache.put('components/search/fullView/getit/opac/locations/locations.html','<prm-uca-items-table-koha></prm-uca-items-table-koha>');
}]);
     /*if customDisplayExemplaire_without_module : 
       1. en-tête import {customDisplayExemplaireConfig} from './prmBriefResultAfter/customDisplayExemplaire';
       2. enlever l'instanciation du module dans angular.module
       3. ajouter app.component('prmBriefResultAfter', customDisplayExemplaireConfig);
     */
