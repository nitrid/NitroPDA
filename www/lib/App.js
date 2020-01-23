angular.module("app",
[
    'ngRoute',
    'app.controller',
    'app.db'
])
.config(function($routeProvider)
{       
    $routeProvider
    .when("/",
    {
        templateUrl : "html/evraklar/Anasayfa.html"
    }) 
    .when("/SayimFisi",
    {
        templateUrl : "html/evraklar/SayimFisi.html"
    })
    .when("/Deposevk",
    {
        templateUrl : "html/evraklar/Deposevk.html"
    })
    .when("/DepoSiparis",
    {
        templateUrl : "html/evraklar/DepoSiparis.html"
    })
    .when("/DepoMalKabul",
    {
        templateUrl : "html/evraklar/DepoMalKabul.html"
    })
    .when("/AlinanSiparis",
    {
        templateUrl : "html/evraklar/AlinanSiparis.html"
    })
    .when("/VerilenSiparis",
    {
        templateUrl : "html/evraklar/VerilenSiparis.html"
    })
    .when("/SiparisEslestirme",
    {
        templateUrl : "html/evraklar/SiparisEslestirme.html"
    })
    .when("/AlisIrsaliye",
    {
        templateUrl : "html/evraklar/AlisIrsaliye.html"
    })
    .when("/DepoNakliye",
    {
        templateUrl : "html/evraklar/DepoNakliye.html"
    })
    .when("/NakliyeOnay",
    {
        templateUrl : "html/evraklar/NakliyeOnay.html"
    })
    .when("/SatisIrsaliye",
    {
        templateUrl : "html/evraklar/SatisIrsaliye.html"
    })
    .when("/CariListesi",
    {
        templateUrl : "html/evraklar/CariListesi.html"
    })
    .when("/CariEkle",
    {
        templateUrl : "html/evraklar/CariEkle.html"
    })
    .when("/FiyatGor",
    {
        templateUrl : "html/evraklar/FiyatGor.html"
    })
    .when("/MalKabulEslestirme",
    {
        templateUrl : "html/evraklar/MalKabulEslestirme.html"
    })
    .when("/AlisFaturasi",
    {
        templateUrl : "html/evraklar/AlisFaturasi.html"
    })
    .when("/SatisFatura",
    {
        templateUrl : "html/evraklar/SatisFatura.html"
    })
    .when("/Fire",
    {
        templateUrl : "html/evraklar/Fire.html"
    })
    .when("/Aktarim",
    {
        templateUrl : "html/evraklar/Aktarim.html"
    })
    .when("/UrunGirisCikis",
    {
        templateUrl : "html/evraklar/UrunGirisCikis.html"
    })
    .when("/PlanliUretim",
    {
        templateUrl : "html/evraklar/PlanliUretim.html"
    })
    .when("/FasonGirisCikis",
    {
        templateUrl : "html/evraklar/FasonGirisCikis.html"
    })
    .when("/EvrakGonder",
    {
        templateUrl : "html/evraklar/EvrakGonder.html"
    })
    .when("/KullaniciParametre",
    {
        templateUrl : "html/ayarlar/KullaniciParametre.html"
    })
    .when("/CariSecimliSiparisDurumRaporu",
    {
        templateUrl : "html/rapor/CariSecimliSiparisDurumRaporu.html"
    })
    .when("/CariHesapHareket",
    {
        templateUrl : "html/rapor/CariHesapHareket.html"
    })
    .when("/CariHesapBakiye",
    {
        templateUrl : "html/rapor/CariHesapBakiye.html"
    })
    .when("/StokRapor",
    {
        templateUrl : "html/rapor/StokRapor.html"
    })
    .when("/TahsilatMakbuzu",
    {
        templateUrl : "html/evraklar/TahsilatMakbuzu.html"
    });
});

// angular.module("app").directive("keypressDetector", function() {
//     return {
//         restrict: "A",
//         link: function(scope, elem, attrs) {
//             document.onkeydown = function(e){
//                 if(e.keyCode === 13){
//                     //do something
//                     console.log("111");
//                 }
//             }
//         }
//     }
// })

