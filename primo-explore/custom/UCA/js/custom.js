!function o(i,a,l){function p(t,e){if(!a[t]){if(!i[t]){var r="function"==typeof require&&require;if(!e&&r)return r(t,!0);if(c)return c(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}r=a[t]={exports:{}},i[t][0].call(r.exports,function(e){return p(i[t][1][e]||e)},r,r.exports,o,i,a,l)}return a[t].exports}for(var c="function"==typeof require&&require,e=0;e<l.length;e++)p(l[e]);return p}({1:[function(e,t,r){"use strict";e("./prmBriefResultAfter/customDisplayExemplaire");e=angular.module("viewCustom",["angularLoad","customDisplayExemplaire"]);e.config(["$sceDelegateProvider",function(e){var t=e.resourceUrlWhitelist();t.push("http://catalogue.unice.fr:1701**","http://catalogue.unice.fr**","https://demo.biblibre.com**","https://pro-bu-cotedazur-koha.preprod.biblibre.eu**","https://catalogue-bu-cotedazur-koha.preprod.biblibre.eu**","https://api.archives-ouvertes.fr**","https://books.google.com**","http://books.google.com**","https://bu.univ-cotedazur.fr**","http://localhost:8003**","http://localhost:5002**","http://dev-scd.unice.fr**"),e.resourceUrlWhitelist(t)}]),e.constant("URLs",{_koha_preprod:"",_testbiblibre_koha_api_public:"https://demo.biblibre.com/api/v1/public/",_testbiblibre_koha_api_privee:"https://demo.biblibre.com/api/v1/",_preprod_koha_api_public:"https://catalogue-bu-cotedazur-koha.preprod.biblibre.eu/api/v1/public/",_preprod_koha_api_privee:"https://catalogue-bu-cotedazur-koha.preprod.biblibre.eu/api/v1/",_local_koha_primo_middleware:"http://localhost:5002/koha-primo-middleware/api/v1/koha/",_devscd_koha_primo_middleware:"http://dev-scd.unice.fr/koha-primo-middleware/api/v1/koha/"}),e.run(["$templateCache",function(e){e.put("components/search/searchResult/searchResultAvailability/searchResultAvailabilityLine.html",'<prm-uca-search-result-availability-koha ng-if="{{items}}"></prm-uca-search-result-availability-koha>')}])},{"./prmBriefResultAfter/customDisplayExemplaire":2}],2:[function(e,t,r){"use strict";angular.module("customDisplayExemplaire",[]).controller("customDisplayExemplaireController",["$compile","$scope","$http","$element","$sce","$templateCache","URLs",function(e,i,a,t,r,o,l){this.$onInit=function(){var t,e,r,o;i.$ctrl.parentCtrl.item&&(i.kohaDisplay=!1,o=i.$ctrl.parentCtrl.item.pnx,t=o.display.type[0],e=o.control.sourceid[0],r=o.control.sourcerecordid[0],e.includes("_KOHA"))&&(o=l._devscd_koha_primo_middleware+"biblios_items/"+r,a({headers:{"Content-Type":"application/json","X-From-ExL-API-Gateway":void 0},method:"GET",url:o,cache:!0}).then(function(e){console.log(e.data),i.items=e.data,i.record_type=t,i.biblio_id=r}))}}]).component("prmBriefResultAfter",{bindings:{parentCtrl:"<"},controller:"customDisplayExemplaireController",templateUrl:"custom/UCA/html/prmBriefResultAfter.html"})},{}]},{},[1]);
//# sourceMappingURL=custom.js.map
