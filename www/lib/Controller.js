angular.module('app.controller', [])
.controller('Login',['$scope','$rootScope','$window','db',Login])
.controller('Main',['$scope','$rootScope','$window','db',Main])
.controller('KullaniciParametreCtrl',['$scope','$window','db',KullaniciParametreCtrl])
.controller('SiparisCtrl',['$scope','$window','$timeout','db','$filter',SiparisCtrl])
.controller('SayimCtrl',['$scope','$window','$timeout','db',SayimCtrl])
.controller('DepoSevkCtrl',['$scope','$window','$timeout','db',DepoSevkCtrl])
.controller('DepoMalKabulCtrl',['$scope','$window','$timeout','db',DepoMalKabulCtrl])
.controller('DepoNakliyeCtrl',['$scope','$window','$timeout','db',DepoNakliyeCtrl])
.controller('NakliyeOnayCtrl',['$scope','$window','$timeout','db',NakliyeOnayCtrl])
.controller('IrsaliyeCtrl',['$scope','$window','$timeout','db','$filter',IrsaliyeCtrl])
.controller('CariListeCtrl',['$scope','$window','db',CariListeCtrl])
.controller('FiyatGorCtrl',['$scope','$window','$timeout','db',FiyatGorCtrl])
.controller('MalKabulEslestirmeCtrl',['$scope','$window','$timeout','db',MalKabulEslestirmeCtrl]) 
.controller('FireCtrl',['$scope','$window','$timeout','db',FireCtrl])
.controller('FaturaCtrl',['$scope','$window','$timeout','$location','db','$filter',FaturaCtrl])
.controller('DepoSiparisCtrl',['$scope','$window','$timeout','db',DepoSiparisCtrl])
.controller('SiparisEslestirmeCtrl',['$scope','$window','$timeout','db',SiparisEslestirmeCtrl])
.controller('AnaSayfaCtrl',['$scope','$window','$timeout','db',AnaSayfaCtrl])
.controller('AktarimCtrl',['$scope','$window','db',AktarimCtrl])
.controller('UrunGirisCikisCtrl',['$scope','$window','$timeout','db',UrunGirisCikisCtrl])
.controller('PlanliUretimCtrl',['$scope','$window','$timeout','db',PlanliUretimCtrl])
.controller('FasonGirisCikisCtrl',['$scope','$window','$timeout','db',FasonGirisCikisCtrl])
.controller('EvrakGonderCtrl',['$scope','$window','$timeout','db',EvrakGonderCtrl])
.controller('CariHesapHareketCtrl',['$scope','$window','db',CariHesapHareketCtrl])
.controller('StokRaporCtrl',['$scope','$window','db',StokRaporCtrl])
.controller('CariSecimliSiparisDurumCtrl',['$scope','$window','db',CariSecimliSiparisDurumCtrl])
.controller('TahsilatMakbuzuCtrl',['$scope','$window','$timeout','db',TahsilatMakbuzuCtrl])
.controller('YapilacakTahsilatlarCtrl',['$scope','$window','db',YapilacakTahsilatlarCtrl])
.controller('YapilanTahsilatlarCtrl',['$scope','$window','db',YapilanTahsilatlarCtrl])
.controller('DuraganCarilerCtrl',['$scope','$window','db',DuraganCarilerCtrl])
.controller('GenelAyarlarCtrl',['$scope','$window','db',GenelAyarlarCtrl])
.controller('KasaRaporCtrl',['$scope','$window','db',KasaRaporCtrl])
.controller('StokHareketCtrl',['$scope','$window','db',StokHareketCtrl])
.controller('DepoDurumRaporCtrl',['$scope','$window','db',DepoDurumRaporCtrl])
.controller('GelenHavaleCtrl',['$scope','$window','$timeout','db',GelenHavaleCtrl])
.controller('KonsinyeIrsaliyeCtrl',['$scope','$window','$timeout','db','$filter',KonsinyeIrsaliyeCtrl])
.controller('StokVirmanCtrl',['$scope','$window','$timeout','db','$filter',StokVirmanCtrl])
.controller('KrediSozlesmeIzlemeCtrl',['$scope','$window','db',KrediSozlesmeIzlemeCtrl])
.controller('VadeAralikliFaturalarCtrl',['$scope','$window','db',VadeAralikliFaturalarCtrl])
.controller('CariAnalizCtrl',['$scope','$window','db',CariAnalizCtrl])
.controller('BankaRaporCtrl',['$scope','$window','db',BankaRaporCtrl])
.controller('IsEmriDepoSevkEslestirmeCtrl',['$scope','$window','$timeout','db',IsEmriDepoSevkEslestirmeCtrl])


