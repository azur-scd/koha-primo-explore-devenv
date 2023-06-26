!function r(a,i,l){function c(t,e){if(!i[t]){if(!a[t]){var o="function"==typeof require&&require;if(!e&&o)return o(t,!0);if(n)return n(t,!0);throw(e=new Error("Cannot find module '"+t+"'")).code="MODULE_NOT_FOUND",e}o=i[t]={exports:{}},a[t][0].call(o.exports,function(e){return c(a[t][1][e]||e)},o,o.exports,r,a,i,l)}return i[t].exports}for(var n="function"==typeof require&&require,e=0;e<l.length;e++)c(l[e]);return c}({1:[function(e,t,o){"use strict";angular.module("kohaServices",[]).factory("kohaItemDataService",["$http","$q","KOHA_MIDDLEWARE_URL",function(t,e,o){return{kohaData:function(e){e=o._api+"biblios_items/"+e;return t({headers:{"Content-Type":"application/json","X-From-ExL-API-Gateway":void 0},method:"GET",url:e,cache:!0}).then(function(e){return e.data})}}}])},{}],2:[function(e,t,o){"use strict";e("./prmBriefResultAfter/kohaItemsAvailability"),e("./prmOpacAfter/kohaItemsTable");e=angular.module("viewCustom",["angularLoad","kohaItemsAvailability","kohaItemsTable"]);e.config(["$sceDelegateProvider",function(e){var t=e.resourceUrlWhitelist();t.push("http://catalogue.unice.fr:1701**","http://catalogue.unice.fr**","https://demo.biblibre.com**","https://pro-bu-cotedazur-koha.preprod.biblibre.eu**","https://catalogue-bu-cotedazur-koha.preprod.biblibre.eu**","https://api.archives-ouvertes.fr**","https://books.google.com**","http://books.google.com**","https://bu.univ-cotedazur.fr**","http://localhost:8003**","https://localhost:5000**","http://dev-scd.unice.fr**","https://api-scd.univ-cotedazur.fr**"),e.resourceUrlWhitelist(t)}]),e.constant("URLs",{_UCA_CAS:"https://login.unice.fr/login?service=",_koha_prod:"https://catalogue-bu-univ-cotedazur.biblibre.fr",_koha_preprod:"https://catalogue-bu-cotedazur-koha.preprod.biblibre.eu",_testbiblibre_koha_api_public:"https://demo.biblibre.com/api/v1/public/",_testbiblibre_koha_api_privee:"https://demo.biblibre.com/api/v1/",_preprod_koha_api_public:"https://catalogue-bu-cotedazur-koha.preprod.biblibre.eu/api/v1/public/",_preprod_koha_api_privee:"https://catalogue-bu-cotedazur-koha.preprod.biblibre.eu/api/v1/",_local_koha_primo_middleware:"https://localhost:5000/koha-primo-middleware/api/v0/koha/",_devscd_koha_primo_middleware:"http://dev-scd.unice.fr/koha-primo-middleware/api/v1/koha/",_prodscd_koha_primo_middleware:"https://api-scd.univ-cotedazur.fr/koha-primo-middleware/api/v1/koha/"}),e.provider("KOHA_MIDDLEWARE_URL",["URLs",function(e){this.$get=function(){return{_api:e._local_koha_primo_middleware}}}]),e.component("prmTopBarBefore",{bindings:{parentCtrl:"<"},controller:[function(){this.$onInit=function(){var e=document.getElementsByTagName("head")[0],t=document.createElement("script");t.type="text/javascript",t.src="https://code.jquery.com/jquery-3.6.3.min.js",e.appendChild(t)}}]}),e.component("prmExploreMainAfter",{templateUrl:"custom/UCA/html/matomo.html"})},{"./prmBriefResultAfter/kohaItemsAvailability":3,"./prmOpacAfter/kohaItemsTable":4}],3:[function(e,t,o){"use strict";e("../customServices/kohaServices");angular.module("kohaItemsAvailability",["kohaServices"]).controller("kohaItemsAvailabilityController",["$scope","kohaItemDataService",function(i,l){this.$onInit=function(){var e,r,t,o,a;i.$ctrl.parentCtrl.item&&(i.kohaDisplay=!1,e=i.$ctrl.parentCtrl.item.pnx,r=e.display.type[0],t=e.facets.toplevel,o=e.control.sourceid[0],a=e.control.sourcerecordid[0],o.includes("_KOHA")&&t.includes("available")?l.kohaData(a).then(function(e){i.items=e.items,i.kohaDisplay=!0;var t=angular.element(document.querySelectorAll("div.search-result-availability-line-wrapper > prm-search-result-availability-line > div.layout-align-start-start > div.layout-row"));console.log(t),length=t.length;for(var o=0;o<length;o++)console.log(t[o]),t[o].querySelector('prm-icon[ng-if*="$ctrl.isPhysical"]')&&(t[o].style.display="none");i.record_type=r,i.biblio_id=a}):i.kohaDisplay=!1)}}]).component("prmBriefResultAfter",{bindings:{parentCtrl:"<"},controller:"kohaItemsAvailabilityController",templateUrl:"custom/UCA/html/prmBriefResultAfter.html"})},{"../customServices/kohaServices":1}],4:[function(e,t,o){"use strict";e("../customServices/kohaServices");angular.module("kohaItemsTable",["kohaServices"]).controller("kohaItemsTableController",["$scope","$rootScope","URLs","kohaItemDataService",function(i,l,c,n){this.$onInit=function(){var e,o,t,r,a;i.$ctrl.parentCtrl.item&&(i.kohaTableDisplay=!1,this.scope=i,this.rootScope=l,e=this.rootScope.$$childHead.$ctrl.userSessionManagerService,console.log(e),i.userIsGuest=e.isGuest(),e=i.$ctrl.parentCtrl.item.pnx,o=e.display.type[0],t=e.facets.toplevel,r=e.control.sourceid[0],a=e.control.sourcerecordid[0],r.includes("_KOHA")&&t.includes("available")?n.kohaData(a).then(function(e){i.items=e.items,i.resa=e.resa_button,i.kohaTableDisplay=!0,angular.element(document.querySelector("prm-opac>md-tabs"))[0].style.display="none",i.record_type=o,i.biblio_id=a;var t=c._UCA_CAS+c._koha_prod+"/cgi-bin/koha/opac-reserve.pl?biblionumber="+a;i.open=function(){return window.open(t,"_system"),!1}}):i.kohaTableDisplay=!1)}}]).component("prmOpacAfter",{bindings:{parentCtrl:"<"},controller:"kohaItemsTableController",templateUrl:"custom/UCA/html/prmOpacAfter.html"})},{"../customServices/kohaServices":1}]},{},[2]);
//# sourceMappingURL=custom.js.map
