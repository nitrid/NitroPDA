function IrsaliyeCtrl($scope,$window,$timeout,db,$filter)
{      
    let CariSelectedRow = null;
    let IslemSelectedRow = null;
    let StokSelectedRow = null;
    let PartiLotSelectedRow = null;
    let ProjeEvrakSelectedRow = null;
    let ParamName = "";

    $('#MdlPartiLot').on('hide.bs.modal', function () 
    {
        if($scope.TxtParti == "" && $scope.TxtLot == 0)
        {
            $scope.BtnTemizle();
        }
    });

    $('#MdlRenkBeden').on('hide.bs.modal', function () 
    {   
        if($scope.Stok[0].RENK == '' ||  $scope.Stok[0].BEDEN == '')
        {
            $scope.BtnTemizle();
        }
    });

    function Init()
    {
        gtag('config', 'UA-12198315-14', 
        {
            'page_title' : 'İrsaliye',
            'page_path': '/Irsaliye'
        });

        UserParam = Param[$window.sessionStorage.getItem('User')];
        $scope.Firma = $window.sessionStorage.getItem('Firma');

        $scope.Seri = "";
        $scope.Sira = 0;
        $scope.EvrakTip = 13;
        $scope.CariKodu = "";
        $scope.CariAdi = "";
        $scope.CariSoyAdi = "";
        $scope.CariFiyatListe = 0;
        $scope.CariDovizCinsi = 0;
        $scope.CariDovizKuru = 0;
        $scope.BelgeNo = "";
        $scope.DepoNo;
        $scope.DepoAdi = "";
        $scope.Tip = 0;
        $scope.NormalIade = 0;
        $scope.Tarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.Saat = moment(new Date()).format("LTS");
        $scope.MalKabulSevkTarihi = moment(new Date()).format("DD.MM.YYYY");
        $scope.BelgeTarih = 0;
        $scope.Sorumluluk = "";
        $scope.SorumlulukAdi = "";
        $scope.OdemeNo = "0";
        $scope.Barkod = "";
        $scope.Birim = 0;
        $scope.StokGridTip = "0";
        $scope.StokGridText = "";
        $scope.Personel = "";
        $scope.PersonelAdi = "";
        $scope.Proje = "";
        $scope.Miktar2 = 0;
        $scope.CmbEvrakTip = '1';
        $scope.Cins = 0;
        $scope.ToplamSatir = 0;
        $scope.CariBakiye = "";
        $scope.Adres = "";
        $scope.Adres1 = "";
        $scope.Adres2 = "";
        $scope.Il = "";
        $scope.CariVDADI = "";
        $scope.CariVDNO = "";
        $scope.VergiEdit = "";
        $scope.Fiyat = "";
        $scope.EvrakDovizTip = "";
        $scope.Special = "1";
        $scope.Aciklama = "";
        $scope.BelgeNo = "";
        $scope.AdresNo = "0";
        $scope.ProjeKod = "";
        $scope.ProjeGetirParam = UserParam[ParamName].ProjeGetir;
        $scope.RiskParam = UserParam.Sistem.RiskParam;
        $scope.Risk = 0;
        $scope.RiskLimit = 0;
        $scope.FisDizaynTip = "0";
        $scope.SonSatisMiktar = "0";

        $scope.DepoListe = [];
        $scope.CariListe = [];
        $scope.SorumlulukListe = [];
        $scope.PersonelListe = [];
        $scope.ProjeListe = [];
        $scope.OdemePlanListe = [];
        $scope.IrsaliyeListe = [];
        $scope.EIrsListe = []
        $scope.BedenHarListe = [];
        $scope.BirimListe = [];
        $scope.StokListe = [];
        $scope.PartiLotListe = [];
        $scope.RenkListe = [];
        $scope.BedenListe = [];
        $scope.DepoMiktarListe = [];
        $scope.AdresNoListe = [];
        $scope.ProjeEvrakGetirListe = [];
        $scope.SonSatisListe = [];
        $scope.KirilimListe = [];

        $scope.AraToplam = 0;
        $scope.ToplamIndirim = 0;
        $scope.NetToplam = 0;
        $scope.ToplamKdv = 0;
        $scope.GenelToplam = 0;

        $scope.Stok = [];
        $scope.Miktar = 1;

        $scope.CmbCariAra = "0";
        $scope.TxtCariAra = "";
        $scope.EvrakLock = false;
        $scope.BarkodLock = false;
        $scope.FiyatLock = false;
        $scope.IslemListeSelectedIndex = -1;
        $scope.PartiLotListeSelectedIndex = 0;

        $scope.TxtParti = "";
        $scope.TxtLot = 0;
        $scope.SktTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.LblPartiLotAlert = "";

        $scope.OtoEkle = false;

        // DÜZENLE MODAL
        $scope.MiktarEdit = 0;
        $scope.FiyatEdit = 0;
        //İSKONTO MODAL
        $scope.IskontoTip = 0;
        $scope.IskYuzde1 = 0;
        $scope.IskYuzde2 = 0;
        $scope.IskYuzde3 = 0;
        $scope.IskYuzde4 = 0;
        $scope.IskYuzde5 = 0;
        $scope.IskTutar1 = 0;
        $scope.IskTutar2 = 0;
        $scope.IskTutar3 = 0;
        $scope.IskTutar4 = 0;
        $scope.IskTutar5 = 0;
        $scope.IskTplTutar1 = 0;
        $scope.IskTplTutar2 = 0;
        $scope.IskTplTutar3 = 0;
        $scope.IskTplTutar4 = 0;
        $scope.IskTplTutar5 = 0;
        $scope.IskTplTutar = 0;
        $scope.TblLoading = true;

        //DIZAYN
        $scope.DGenelToplam = 0;
        $scope.DizaynListe = [];

        //E İRSALİYE MODAL
        $scope.TxtSfrAd = ''
        $scope.TxtSrfSoyAd = ''
        $scope.TxtSfrTckn = ''
        $scope.TxtPlaka = ''
    }
    function InitCariGrid()
    {   
        $("#TblCari").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.CariListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
                {
                    name: "KODU",
                    type: "number",
                    align: "center",
                    width: 100
                },
                {
                    name: "UNVAN1",
                    type: "text",
                    align: "center",
                    width: 300
                },
                {
                    name: "BAKIYE",
                    type: "number",
                    align: "center",
                    width: 75
                },
                {
                    name: "RISK",
                    type: "number",
                    align: "center",
                    width: 75
                },
                {
                    name: "RISKLIMIT",
                    type: "number",
                    align: "center",
                    width: 90
                },
                {
                    name: "DOVIZSEMBOL",
                    title: "DOVIZ",
                    type: "text",
                    align: "center",
                    width: 100
                }
            ],
            rowClick: function(args)
            {
                $scope.CariListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitIslemGrid()
    {   
        $("#TblIslem").jsGrid({
            responsive: true,
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.IrsaliyeListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            
            fields: 
            [{
                name: "NO",
                title: "NO",
                type: "number",
                align: "center",
                width: 75
                
            }, 
            {
                name: "sth_stok_kod",
                title: "KODU",
                type: "text",
                align: "center",
                width: 100
            },
            {
                name: "ADI",
                title: "ADI",
                type: "text",
                align: "center",
                width: 200
            }, 
            {
                name: "sth_miktar",
                title: "MİKTAR",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sth_miktar2",
                title: "MİKTAR2",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "FIYAT",
                title: "FIYAT",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sth_tutar",
                title: "TUTAR",
                type: "number",
                align: "center",
                width: 200
            },
            {
                name: "sth_iskonto1",
                title: "IND1",
                type: "number",
                align: "center",
                width: 100
            }
            ],
            rowClick: function(args)
            {
                $scope.IslemListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitStokGrid()
    {
        $("#TblStok").jsGrid
        (   {
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.StokListe,
            paging : true,
            pageSize: 7,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: [
                {
                    name: "KODU",
                    title: "KODU",
                    type: "text",
                    align: "center",
                    width: 125
                }, 
                {
                    name: "ADI",
                    title: "ADI",
                    type: "text",
                    align: "center",
                    width: 200
                }, 
                {
                    name: "DEPOMIKTAR",
                    title: "DEPO MIKTAR",
                    type: "number",
                    align: "center",
                    width: 100
                },
                {
                    name: "BIRIM1",
                    title: "BIRIM 1",
                    type: "number",
                    align: "center",
                    width: 100
                },
                {
                    name: "DOVIZCINS",
                    title: "DOVIZ",
                    type: "number",
                    align: "center",
                    width: 100
                }
            ],
            rowClick: function(args)
            {
                $scope.StokListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitPartiLotGrid()
    {
        let CustomDate = function (config) 
        {
            jsGrid.Field.call(this, config);
        };

        CustomDate.prototype = new jsGrid.Field(
        {
            itemTemplate: function (value) 
            {
                return new Date(value).toLocaleDateString('tr-TR',{ year: 'numeric', month: 'numeric', day: 'numeric' });
            }
        });

        jsGrid.fields.CustomDate = CustomDate;

        $("#TblPartiLot").jsGrid
        ({
            width: "100%",         
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.PartiLotListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: [
                {
                    name: "PARTI",
                    title: "PARTI",
                    type: "text",
                    align: "center",
                    width: 200
                }, 
                {
                    name: "LOT",
                    title: "LOT",
                    type: "number",
                    align: "center",
                    width: 100
                }, 
                {
                    name: "STOK",
                    title: "STOK",
                    type: "text",
                    align: "center",
                    width: 200
                }, 
                {
                    name: "MIKTAR",
                    title: "MIKTAR",
                    type: "number",
                    align: "center",
                    width: 100
                }, 
                {
                    name: "KALAN",
                    title: "KALAN",
                    type: "number",
                    align: "center",
                    width: 100
                }, 
                {
                    name: "SKTTARIH",
                    title: "SKT TARİHİ",
                    type: "CustomDate",
                    align: "center",
                    width: 100
                }  
            ],
            rowClick: function(args)
            {
                $scope.PartiLotListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitDizaynGrid()
    {
        $("#TblDizayn").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.DizaynListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
            {
                name: "SERI",
                title: "SERI",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "SIRA",
                title: "SIRA",
                type: "number",
                align: "center",
                width: 75
            },
            {
                name: "CARIKOD",
                title: "CARİ KODU",
                type: "number",
                align: "center",
                width: 150
            },
            {
                name: "CARIADI",
                title: "CARİ ADI",
                type: "number",
                align: "center",
                width: 200
            },
            {
                name: "TUTAR",
                title: "TUTAR",
                type: "number",
                align: "center",
                width: 100
            }
           ],
            rowClick: function(args)
            {
                $scope.CariListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitProjeEvrakGetirGrid()
    {
        $("#TblProjeEvrakGetirListe").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            editing: true,
            data : $scope.ProjeEvrakGetirListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: [
                // { 
                //       itemTemplate: function(_, item) 
                //       {
                //           return $("<button type='submit' class='btn btn-primary btn-block btn-sm'></button>").text("D")
                //               .on("click", function() 
                //               {
                //                   $scope.ManuelGiris(item);
                //               });
                //       },
                //       width: 45
                // },
                {
                    name: "SERI",
                    title: "SERI",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "SIRA",
                    title: "SIRA",
                    type: "number",
                    align: "center",
                    width: 100
                },
                {
                    name: "PROJEKOD",
                    title: "PROJEKOD",
                    type: "number",
                    align: "center",
                    width: 100
                },
            ],
            rowClick: function(args)
            {
                $scope.ProjeEvrakListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitStokHarGrid()
    {
        $("#TblStokHarListe").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.StokHarGonderListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
            {
                name: "sth_evrakno_seri",
                title: "SERI",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sth_evrakno_sira",
                title: "SIRA",
                type: "number",
                align: "center",
                width: 75
            },
            {
                name: "sth_cari_kod",
                title: "CARİ KODU",
                type: "number",
                align: "center",
                width: 150
            },
            {
                name: "sth_tutar",
                title: "TUTAR",
                type: "number",
                align: "center",
                width: 100
            }
           ],
            rowClick: function(args)
            {
                $scope.$apply();
            }
        });
    }
    function BarkodFocus()
    {
        $timeout( function(){$window.document.getElementById("Barkod").focus();},100);  
    }
    function BedenHarInsert(pGuid)
    {
        let Data =
        [
            UserParam.MikroId, // KULLANICI
            UserParam.MikroId, // KULLANICI
            11, // BEDEN TİP
            pGuid, // GUID
            Kirilim($scope.Stok[0].BEDENPNTR,$scope.Stok[0].RENKPNTR), // BEDEN NO
            $scope.Miktar,  // MİKTAR
            0,  // REZERVASYON MİKTAR
            0  // REZERVASYON TESLİM MİKTAR
        ];
        db.ExecuteTag($scope.Firma,'BedenHarInsert',Data,function(data)
        {   
            if(typeof(data.result.err) == 'undefined')
            {   
                db.GetData($scope.Firma,'StokBedenHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,11],function(BedenData)
                {
                    $scope.BedenHarListe = BedenData;
                    db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(IrsaliyeData)
                    {
                        InsertAfterRefresh(IrsaliyeData);
                    });

                });
            }
            else
            {
                console.log(data.result.err);
            }
        });
    }
    function BedenHarUpdate(pData) 
    {
        db.ExecuteTag($scope.Firma,'BedenHarUpdate',pData,function(data)
        {
            if(typeof(data.result.err) == 'undefined')
            {
                db.GetData($scope.Firma,'StokBedenHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,11],function(BedenData)
                {
                    $scope.BedenHarListe = BedenData;
                });
            }
            else
            {
                console.log(data.result.err);
            }
        });
    }
    function Beep()
    {
        navigator.notification.vibrate(1000);
        document.getElementById("Beep").play();
    }
    function Confirmation()
    {
        navigator.vibrate([100,100,200,100,300]);
    }
    function InsertAfterRefresh(pData)
    {    
        $scope.EvrakLock = true;
        $scope.BarkodLock = false;

        $scope.IrsaliyeListe = pData;
        $("#TblIslem").jsGrid({data : $scope.IrsaliyeListe});    
        
        DipToplamHesapla();
        ToplamMiktarHesapla();
        $scope.BtnTemizle();
        
        $window.document.getElementById("Barkod").focus();
    }
    function DipToplamHesapla()
    {
        $scope.AraToplam = 0;
        $scope.ToplamIndirim = 0;
        $scope.ToplamKdv = 0;
        $scope.NetToplam = 0;
        $scope.GenelToplam = 0;

        angular.forEach($scope.IrsaliyeListe,function(value)
        {
            $scope.AraToplam += value.sth_tutar;
            $scope.ToplamIndirim += (value.sth_iskonto1 + value.sth_iskonto2 + value.sth_iskonto3 + value.sth_iskonto4 + value.sth_iskonto5 + value.sth_iskonto6);
            $scope.ToplamKdv +=  value.sth_vergi //(value.sth_tutar - (value.sth_iskonto1 + value.sth_iskonto2 + value.sth_iskonto3 + value.sth_iskonto4 + value.sth_iskonto5 + value.sth_iskonto6)) * (value.TOPTANVERGI / 100);
        });
        $scope.NetToplam = $scope.AraToplam - $scope.ToplamIndirim;
        $scope.GenelToplam = $scope.NetToplam + $scope.ToplamKdv;
    }
    function ToplamMiktarHesapla()
    {
        $scope.ToplamSatir = 0;

        angular.forEach($scope.IrsaliyeListe,function(value)
        {
            $scope.ToplamSatir += 1 ;
        });
    }    
    function InsertData()
    {   
        var InsertData = 
        [
            UserParam.MikroId,
            UserParam.MikroId,
            0, //FİRMA NO
            0, //ŞUBE NO
            $scope.Tarih,
            $scope.Tip,
            $scope.Cins,
            $scope.NormalIade,
            $scope.EvrakTip,
            $scope.Seri,
            $scope.Sira,
            $scope.BelgeNo,
            $scope.Tarih,
            $scope.Stok[0].KODU,
            0, //ISKONTO TUTAR 1
            0, //ISKONTO TUTAR 2
            0, //ISKONTO TUTAR 3
            0, //ISKONTO TUTAR 4
            0, //ISKONTO TUTAR 5
            0, //ISKONTO TUTAR 6
            0, //ISKONTO TUTAR 7
            0, //ISKONTO TUTAR 8
            0, //ISKONTO TUTAR 9
            0, //ISKONTO TUTAR 10
            0, //SATIR ISKONTO TİP 1
            0, //SATIR ISKONTO TİP 2
            0, //SATIR ISKONTO TİP 3
            0, //SATIR ISKONTO TİP 4
            0, //SATIR ISKONTO TİP 5
            0, //SATIR ISKONTO TİP 6
            0, //SATIR ISKONTO TİP 7
            0, //SATIR ISKONTO TİP 8
            0, //SATIR ISKONTO TİP 9
            0, //SATIR ISKONTO TİP 10
            0, //CARİCİNSİ
            $scope.CariKodu,
            '',//İŞEMRİKODU
            $scope.Personel,
            $scope.CariDovizCinsi, //HARDOVİZCİNSİ
            $scope.CariDovizKuru, //HARDOVİZKURU
            $scope.CariAltDovizKuru, //ALTDOVİZKURU
            $scope.Stok[0].DOVIZCINSI, //STOKDOVİZCİNSİ
            1, //STOKDOVİZKURU
            $scope.Miktar * $scope.Stok[0].CARPAN,
            $scope.Miktar2,
            $scope.Stok[0].BIRIMPNTR,
            $scope.Stok[0].TUTAR,
            0, // İSKONTO 1
            0, // İSKONTO 2
            0, // İSKONTO 3
            0, // İSKONTO 4
            0, // İSKONTO 5
            0, // İSKONTO 6
            0, // MASRAF 1
            0, // MASRAF 2
            0, // MASRAF 3
            0, // MASRAF 4
            $scope.Stok[0].TOPTANVERGIPNTR, //VERİPNTR
            $scope.Stok[0].KDV,             //VERGİ
            0, // MASRAFVERGİPNTR,
            0, // MASRAFVERGİ
            $scope.OdemeNo,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
            '',//AÇIKLAMA
            '00000000-0000-0000-0000-000000000000', //sth_sip_uid
            '00000000-0000-0000-0000-000000000000', //sth_fat_uid,
            $scope.DepoNo, //GİRİSDEPONO
            $scope.DepoNo, //CİKİSDEPONO
            $scope.Tarih, //MALKABULSEVKTARİHİ
            $scope.Sorumluluk, // CARİSORUMLULUKMERKEZİ
            $scope.Sorumluluk,
            0,  //VERGİSİZFL
            $scope.AdresNo,  // ADRESNO
            $scope.Stok[0].PARTI,
            $scope.Stok[0].LOT,
            $scope.Proje,
            '', // EXİMKODU
            0,  // DİSTİCARETTURU
            0,  // OTVVERGİSİZFL
            0,  // OİVVERGİSİZ
            $scope.CariFiyatListe,
            0,  //NAKLİYEDEPO
            0   // NAKLİYEDURUMU
        ];
        console.log($scope.Sorumluluk)
        db.ExecuteTag($scope.Firma,'StokHarInsert',InsertData,function(InsertResult)
        {  
            if(typeof(InsertResult.result.err) == 'undefined')
            {  
                db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(IrsaliyeData)
                {  
                    $scope.IrsaliyeListe = IrsaliyeData;
                    console.log($scope.Stok[0])
                    if($scope.Stok[0].BEDENPNTR != 0 && $scope.Stok[0].RENKPNTR != 0)
                    {   
                        BedenHarInsert(InsertResult.result.recordset[0].sth_Guid);
                    } 
                    InsertAfterRefresh(IrsaliyeData);  
                    $scope.InsertLock = false
                    if(UserParam.Sistem.Titresim == 1)
                    {
                        Confirmation();
                    }
                    FisData(IrsaliyeData);
                });
            }
            else
            {
                console.log(InsertResult.result.err);
            }
        });
    }
    function UpdateData(pData) 
    {   
        db.ExecuteTag($scope.Firma,'StokHarUpdate',pData.Param,function(InsertResult)
        {
            if(typeof(InsertResult.result.err) == 'undefined')
            {
                db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,0],function(IrsaliyeData)
                {
                    // if(pData.BedenPntr != 0 && pData.RenkPntr != 0)
                    // {
                    //     let UpdateStatus = false;
                    //     angular.forEach($scope.BedenHarListe,function(value)
                    //     {
                    //         if(value.BdnHar_Har_uid == pData.Guid && value.BdnHar_BedenNo == Kirilim(pData.BedenPntr,pData.RenkPntr))
                    //         {console.log(Kirilim(pData.BedenPntr,pData.RenkPntr))
                    //             let Data =
                    //             [
                    //                 value.BdnHar_Tipi,      // TİPİ
                    //                 value.BdnHar_Har_uid,   // GUID
                    //                 value.BdnHar_BedenNo,   // BEDEN NO
                    //                 pData.Miktar, // MİKTAR
                    //                 0, // REZERVASYON MİKTARI
                    //                 0, // REZERVASYON TESLİM MİKTARI
                                    
                    //             ];

                    //             UpdateStatus = true;
                    //             BedenHarUpdate(Data);
                    //         }                            
                    //     });

                    //     if(!UpdateStatus)
                    //     {
                    //         BedenHarInsert(pData.Guid);
                    //     }
                    // }                        
                    InsertAfterRefresh(IrsaliyeData);
                    FisData(IrsaliyeData);
                    $scope.InsertLock = false;
                    if(UserParam.Sistem.Titresim == 1)
                    {
                        Confirmation();
                    }
                });
            }
            else
            {
                console.log(InsertResult.result.err);
            }
        });
    }
    function StokBarkodGetir(pBarkod)
    {
        // KİLO BARKODU KONTROLÜ - RECEP KARACA 10.09.2019
        let Kilo = pBarkod;
        let KiloFlag = UserParam.Sistem.KiloFlag;
        let FlagDizi = KiloFlag.split(',')
        let Flag = Kilo.slice(0,2);
 
        for (i = 0; i < FlagDizi.length; i++ )
        {
            if(Flag == FlagDizi[i])
            {
                var kBarkod = Kilo.slice(0,UserParam.Sistem.KiloBaslangic);
                var Uzunluk = Kilo.slice(parseInt(UserParam.Sistem.KiloBaslangic),parseInt(UserParam.Sistem.KiloBaslangic)+parseInt(UserParam.Sistem.KiloUzunluk));
                pBarkod = kBarkod
                $scope.Miktar = (Uzunluk / UserParam.Sistem.KiloCarpan)
            }
        }
        // ----------------------------------------------------
        if(pBarkod != '')
        {
            db.StokBarkodGetir($scope.Firma,pBarkod,$scope.DepoNo,async function(BarkodData)
            {   
                if(BarkodData.length > 0)
                { 
                    $scope.Stok = BarkodData;
                    $scope.StokKodu = $scope.Stok[0].KODU;
                    if(UserParam.Sistem.PartiLotKontrol == 1)
                    {
                        console.log(1)
                        for(i = 0;i < $scope.IrsaliyeListe.length;i++)
                        {   
                            console.log(1.5)
                            if($scope.Stok[0].PARTI != "" && $scope.Stok[0].LOT != "")
                            {
                                console.log(2)
                                if($scope.Stok[0].PARTI == $scope.IrsaliyeListe[i].sth_parti_kodu && $scope.Stok[0].LOT == $scope.IrsaliyeListe[i].sth_lot_no)
                                {
                                    alertify.alert("<a style='color:#3e8ef7''>" + "Okutmuş Olduğunuz "+ $scope.Stok[0].PARTI + ". " + "Parti " + $scope.Stok[0].LOT + ". " +"Lot Daha Önceden Okutulmuş !" + "</a>" );
                                    $scope.InsertLock = false;
                                    $scope.BtnTemizle();
                                    return;
                                }
                                else
                                {
                                    alertify.alert("hahah")
                                }
                            }
                        }
                    }
                    $scope.Stok[0].FIYAT = 0;
                    $scope.Stok[0].TUTAR = 0;
                    $scope.Stok[0].INDIRIM = 0;
                    $scope.Stok[0].KDV = 0;
                    $scope.Stok[0].TOPTUTAR = 0;
                    //----------OFFLINE ICIN GEÇİCİ OLARAK KAPATILDI------------\\ 
                    // // Fiyat Getir (Stok Detay)
                    // var Fiyat = 
                    // {
                    //     db : '{M}.' + $scope.Firma,
                    //     query : "SELECT TOP 1 " + 
                    //             "CASE WHEN (SELECT sfl_kdvdahil FROM STOK_SATIS_FIYAT_LISTE_TANIMLARI WHERE sfl_sirano=sfiyat_listesirano) = 0 THEN " + 
                    //             "dbo.fn_StokSatisFiyati(sfiyat_stokkod,sfiyat_listesirano,sfiyat_deposirano,0) " + 
                    //             "ELSE " + 
                    //             "dbo.fn_StokSatisFiyati(sfiyat_stokkod,sfiyat_listesirano,sfiyat_deposirano,0) / ((SELECT dbo.fn_VergiYuzde ((SELECT TOP 1 sto_toptan_vergi FROM STOKLAR WHERE sto_kod = sfiyat_stokkod)) / 100) + 1) " + 
                    //             "END AS FIYAT, " + 
                    //             "sfiyat_doviz AS DOVIZ, " + 
                    //             "ISNULL((SELECT dbo.fn_DovizSembolu(ISNULL(sfiyat_doviz,0))),'TL') AS DOVIZSEMBOL, " + 
                    //             "ISNULL((SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(sfiyat_doviz,0),2)),1) AS DOVIZKUR, " + 
                    //             "sfiyat_iskontokod AS ISKONTOKOD " + 
                    //             "FROM STOK_SATIS_FIYAT_LISTELERI " +
                    //             "WHERE sfiyat_stokkod = @STOKKODU AND sfiyat_listesirano = @FIYATLISTE AND sfiyat_deposirano IN (0,@DEPONO) " +
                    //             "ORDER BY sfiyat_deposirano DESC", 
                    //     param: ['STOKKODU','FIYATLISTE','DEPONO'],
                    //     type:  ['string|50','int','int'],
                    //     value: [$scope.StokKodu,$scope.FiyatListeNo,$scope.DepoNo]
                    // }
                    // db.GetDataQuery(Fiyat,function(pFiyat)
                    // {                         
                    //     $scope.Fiyat = pFiyat[0].FIYAT
                    //     $scope.Stok[0].DOVIZSEMBOL = pFiyat[0].DOVIZSEMBOL;
                    //     $scope.SatisFiyatListe2 = (pFiyat.length > 1) ? pFiyat[1].FIYAT : 0;
                    // });
                    
                    // //Depo Miktar Getir (Stok Detay)
                    // var DepoMiktar =
                    // {
                    //     db : '{M}.' + $scope.Firma,
                    //     query : "SELECT dep_adi DEPOADI,dep_no DEPONO,(SELECT dbo.fn_DepodakiMiktar(@STOKKODU,DEPOLAR.dep_no,GETDATE())) AS DEPOMIKTAR FROM DEPOLAR ",
                    //     param : ['STOKKODU'],
                    //     type : ['string|50'],
                    //     value : [$scope.StokKodu]
                    // }
                    // db.GetDataQuery(DepoMiktar,function(pDepoMiktar)
                    // {   
                    //     $scope.DepoMiktarListe = pDepoMiktar
                    //     $("#TblDepoMiktar").jsGrid({data : $scope.DepoMiktarListe});
                    // });

                    await db.GetPromiseTag($scope.Firma,'CmbBirimGetir',[BarkodData[0].KODU],function(data)
                    {   
                        $scope.BirimListe = data;
                        $scope.Birim = JSON.stringify($scope.Stok[0].BIRIMPNTR); 

                        if($scope.BirimListe.length > 0)
                        {
                            $scope.Stok[0].BIRIMPNTR = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].BIRIMPNTR;
                            $scope.Stok[0].BIRIM = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].BIRIM;
                            $scope.Stok[0].CARPAN = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].KATSAYI;
                            $scope.MiktarFiyatValid();
                        }
                        else
                        {  //BİRİMSİZ ÜRÜNLERDE BİRİMİ ADETMİŞ GİBİ DAVRANIYOR. RECEP KARACA 23.09.2019
                            $scope.Stok[0].BIRIMPNTR = 1;
                            $scope.Stok[0].BIRIM = 'ADET';
                            $scope.Stok[0].CARPAN = 1;
                            $scope.MiktarFiyatValid();

                        }
                        
                    });

                    //****** FİYAT GETİR */
                    let FiyatParam = 
                    { 
                        CariKodu : $scope.CariKodu,
                        CariFiyatListe : $scope.CariFiyatListe,
                        CariDovizKuru : $scope.CariDovizKuru,
                        DepoNo : $scope.DepoNo,
                        FiyatListe : $scope.FiyatListeNo,
                        AlisSatis : ($scope.EvrakTip === 13 ? 0 : 1),
                        OdemeNo : $scope.OdemeNo
                    };
                    
                    await db.FiyatGetir($scope.Firma,BarkodData,FiyatParam,UserParam[ParamName],function()
                    {   
                        $scope.MiktarFiyatValid(); 
                        $scope.BarkodLock = true;
                        $scope.$apply();
                    });
                    if($scope.Stok[0].BEDENPNTR == 0 || $scope.Stok[0].RENKPNTR == 0)
                    {
                        if($scope.Stok[0].BEDENKODU != '' && $scope.Stok[0].RENKKODU != '')
                        {                
                            $('#MdlRenkBeden').modal("show");
                            db.GetData($scope.Firma,'RenkGetir',[$scope.Stok[0].RENKKODU],function(pRenkData)
                            {
                                $scope.RenkListe = pRenkData;
                                $scope.Stok[0].RENKPNTR = "1";
                            });
                            db.GetData($scope.Firma,'BedenGetir',[$scope.Stok[0].BEDENKODU],function(pBedenData)
                            {
                                $scope.BedenListe = pBedenData;
                                $scope.Stok[0].BEDENPNTR = "1";
                            });
                        }
                    }
                    if($scope.Stok[0].DETAYTAKIP == 1 || $scope.Stok[0].DETAYTAKIP == 2)
                    {
                        if($scope.Stok[0].PARTI !='')
                        {
                            db.GetData($scope.Firma,'PartiLotGetir',[$scope.Stok[0].KODU,$scope.DepoNo,$scope.Stok[0].PARTI,$scope.Stok[0].LOT],function(data)
                            {  
                                $scope.PartiLotListe = data;

                                if(UserParam.Sistem.PartiLotMiktarKontrol == 1 && $scope.Stok[0].LOT != 0)
                                {   
                                    $scope.Miktar = $scope.PartiLotListe[0].MIKTAR;
                                    $scope.Stok[0].TOPMIKTAR = $scope.Miktar * $scope.Stok[0].CARPAN;
                                }
                                $scope.MiktarFiyatValid();
                            });
                        }
                        else
                        {
                            PartiLotEkran();
                            $timeout( function(){
                            $window.document.getElementById("Parti").focus();
                            $window.document.getElementById("Parti").select();
                            },250)
                        }
                    }
                    if($scope.OtoEkle == true)
                    {
                        $scope.Insert()
                    }
                    else
                    {
                        $window.document.getElementById("Miktar").focus();
                        $window.document.getElementById("Miktar").select();
                    }
                   // offline için kapatıldı $scope.SonSatisGetir();
                }
                else
                {   
                    alertify.alert("<a style='color:#3e8ef7''>" + "Stok Bulunamamıştır !" + "</a>" );          
                    console.log("Stok Bulunamamıştır.");
                    Beep();
                }
            });
        }
    }
    function PartiLotEkran()
    {
        if($scope.Stok[0].PARTI == '')
        {   
            if($scope.Stok[0].DETAYTAKIP == 1 || $scope.Stok[0].DETAYTAKIP == 2)
            {   
                $scope.LblPartiLotAlert = "";
                $scope.TxtParti = "";
                $scope.TxtLot = 0;
                $scope.SktTarih = new Date().toLocaleDateString();
                $scope.PartiLotListe = [];

                $("#LblPartiLotAlert").hide();
                
                $("#TblPartiLot").jsGrid({data : $scope.PartiLotListe});

                $('#MdlPartiLot').modal('show');
            }
        }
    }
    function Kirilim(pBeden,pRenk)
    {
        if(pBeden != 0 && pRenk != 0)
        {
            return ((parseInt(pRenk) - 1) * 40) + parseInt(pBeden);
        }
        else if(pRenk == 0)
        {
            return pBeden;
        }
        else if(pBeden == 0)
        {
            return (parseInt(pRenk) - 1) * 40 + 1;
        }
    }
    function FisData(pData)
    { 
        $scope.KirilimGetir();
        //Offline'da ISNULL Hatasını KirilimGetir fonksiyonu çalışıyor diye yapıyor.
        $scope.FisLength = pData;
        if($scope.FisDizaynTip == "0")
        {
            $scope.FisDeger = "";
            $scope.FisData = "";
           try 
           {
                $scope.FisDeger = "";
                $scope.FisDeger = "                                    " + $scope.Tarih + "\n" + "                                    " +$scope.Seri + " - " + $scope.Sira + "\n" +"                                    "+ $scope.Tarih + "\n" + "                                    "+  $scope.Saat + "\n" + SpaceLength($scope.CariAdi,40) + "\n" + SpaceLength($scope.Adres1,50) + "\n" + SpaceLength($scope.Adres,10) + "\n" +  "  " + SpaceLength($scope.CariVDADI,25) + " " + $scope.CariVDNO + "\n";
    
                for(let i=0; i < pData.length; i++)
                {
                    $scope.FisData = $scope.FisData + SpaceLength(pData[i].ADI.substring(0,20),20) + "          " +   SpaceLength(parseFloat(pData[i].MIKTAR.toFixed(2)),4) + " " + SpaceLength(pData[i].BIRIMADI,4) + "\n";
                } 
           } 
           catch (error) 
           {
               console.log(error)
           }
        }
        else if($scope.FisDizaynTip == "1")
        {
            $scope.FisDeger = "";
            $scope.FisData = "";
           try 
           {
                $scope.FisDeger = "";
                $scope.FisDeger = "                                    "+ $scope.Tarih + "\n" + "                                    " +$scope.Seri + " - " + $scope.Sira + "\n" +"                                    "+ $scope.Tarih + "\n" + "                                    "+  $scope.Saat + "\n" + SpaceLength($scope.CariAdi,40) + "\n" + SpaceLength($scope.Adres1,50) + "\n" + SpaceLength($scope.Adres,25) + "\n" +  "  " + SpaceLength($scope.CariVDADI,25) + " " + $scope.CariVDNO + "\n";
                for(let i=0; i < pData.length; i++)
                {
                   $scope.FisData = $scope.FisData +  SpaceLength(pData[i].ADI.substring(0,28),30) + SpaceLength(pData[i].RENK + " " + pData[i].BEDEN,20) + SpaceLength(parseFloat(pData[i].MIKTAR.toFixed(2)),6) +  SpaceLength(parseFloat(pData[i].FIYAT.toFixed(2)),7) + " " +SpaceLength(parseFloat(pData[i].sth_tutar.toFixed(2)),7) + "\n";       
                } 
           } 
           catch (error) 
           {
               console.log(error)
           }
        }
        else if($scope.FisDizaynTip == "2")
        {
            $scope.FisDeger = "";
            $scope.FisData = "";
           try 
           {
                $scope.FisDeger = "";
                $scope.FisDeger = "                                    "+ $scope.Tarih + "\n" + "                                    " +$scope.Seri + " - " + $scope.Sira + "\n" +"                                    "+ $scope.Tarih + "\n" + "                                    "+  $scope.Saat + "\n" + SpaceLength($scope.CariAdi,40) + "\n" + SpaceLength($scope.Adres1,50) + "\n" + SpaceLength($scope.Adres,25) + "\n" +  "  " + SpaceLength($scope.CariVDADI,25) + " " + $scope.CariVDNO + "\n";
                for(let i=0; i < $scope.KirilimListe.length; i++)
                {
                   console.log($scope.KirilimListe[i].S38 + $scope.KirilimListe[i].S40 + $scope.KirilimListe[i].S42 * Number($scope.KirilimListe[i].BFIYAT))
                   $scope.FisData = $scope.FisData + SpaceLength($scope.KirilimListe[i].STOKKOD,20) +  SpaceLength($scope.KirilimListe[i].RENK,10) + SpaceLength($scope.KirilimListe[i].S38,2) + " " + SpaceLength($scope.KirilimListe[i].S40,2) + " " + SpaceLength($scope.KirilimListe[i].S42,2) + " " + SpaceLength($scope.KirilimListe[i].S44,2) + SpaceLength($scope.KirilimListe[i].S46,2) + " " + SpaceLength($scope.KirilimListe[i].S48,2) + " " + SpaceLength($scope.KirilimListe[i].S50,2) + " " + SpaceLength($scope.KirilimListe[i].S52,2) + " " + SpaceLength($scope.KirilimListe[i].S54,2) +   SpaceLength(($scope.KirilimListe[i].TOPMIKTAR),7) + " " + SpaceLength($scope.KirilimListe[i].BFIYAT,7) + " " + SpaceLength($scope.KirilimListe[i].TOPTUTAR,5)  + "\n";       
                } 
           } 
           catch (error) 
           {
               console.log(error)
           }
        }
        else if($scope.FisDizaynTip == "3")
        {
            $scope.FisDeger = "";
            $scope.FisData = "";
           try 
           {
                $scope.FisDeger = "";
                $scope.FisDeger = "                                    "+ $scope.Tarih + "\n" + "                                    " +$scope.Seri + " - " + $scope.Sira + "\n" +"                                    "+ $scope.Tarih + "\n" + "                                    "+  $scope.Saat + "\n" + SpaceLength($scope.CariAdi,40) + "\n" + SpaceLength($scope.Adres1,50) + "\n" + SpaceLength($scope.Adres,25) + "\n" +  "  " + SpaceLength($scope.CariVDADI,25) + " " + $scope.CariVDNO + "\n";
                for(let i=0; i < $scope.KirilimListe.length; i++)
                {
                   console.log($scope.KirilimListe[i].S36 + $scope.KirilimListe[i].S37 + $scope.KirilimListe[i].S38 * Number($scope.KirilimListe[i].BFIYAT))
                   $scope.FisData = $scope.FisData + SpaceLength($scope.KirilimListe[i].STOKKOD,20) +  SpaceLength($scope.KirilimListe[i].RENK,10) + SpaceLength($scope.KirilimListe[i].S36,5) + " " + SpaceLength($scope.KirilimListe[i].S37,5) + " " + SpaceLength($scope.KirilimListe[i].S38,8) + SpaceLength(($scope.KirilimListe[i].TOPMIKTAR),7) + "\n";       
                } 
           } 
           catch (error) 
           {
               console.log(error)
           }
        }
    }
    function SpaceLength(pData,pLength)
    {
        let x = pLength - pData.toString().length;

        if(pData.toString().length > pLength)
        {
            pData = pData.toString().substring(0,pLength);
        }

        Space = "";

        for(let i=0; i < x; i++)
        {
            Space = Space + " ";
        }

        return pData + Space
    }
    function AdresNoGetir()
    {
        db.GetData($scope.Firma,'CmbAdresNo',[$scope.CariKodu],function(data)
        {
            $scope.AdresNoListe = data;
        });
    }
    $scope.KirilimGetir = function ()
    {
        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "SELECT BFIYAT,STOKKOD,RENK,ISNULL(PVT.[36],0) AS S36,ISNULL(PVT.[37],0) S37,ISNULL(PVT.[38],0) AS S38, " +
            "(ISNULL(PVT.[36],0) + ISNULL(PVT.[37],0) + ISNULL(PVT.[38],0)) AS TOPMIKTAR, " +
            "(ISNULL(PVT.[36],0) + ISNULL(PVT.[37],0) + ISNULL(PVT.[38],0)) * BFIYAT AS TOPTUTAR " +
            "FROM " +
            "( " +
            "SELECT  " +
            "(SELECT dbo.fn_renk_kirilimi((SELECT [dbo].fn_bedenharnodan_renk_no_bul(BdnHar_BedenNo)),(SELECT sto_renk_kodu FROM STOKLAR WHERE sto_kod = @STOKKOD))) AS RENK,  " +
            "(select sth_stok_kod FROM STOK_HAREKETLERI WHERE sth_Guid = BdnHar_Har_uid ) AS STOKKOD , " +
            "ISNULL((SELECT dbo.fn_beden_kirilimi((SELECT [dbo].fn_bedenharnodan_beden_no_bul(BdnHar_BedenNo)),(SELECT  sto_renk_kodu FROM STOKLAR WHERE sto_kod = @STOKKOD))),0) AS BEDEN , " +
            "(SELECT [dbo].fn_bedenharnodan_renk_no_bul(BdnHar_BedenNo)) AS RENKPNTR,  " +
            "ISNULL(BdnHar_HarGor,0) AS MIKTAR, " +
            "(sth_tutar / sth_miktar) AS BFIYAT " +
            "FROM BEDEN_HAREKETLERI AS BDN INNER JOIN STOK_HAREKETLERI AS STH ON BDN.BdnHar_Har_uid = STH.sth_Guid " +
            "WHERE STH.sth_evrakno_seri = @SERI AND STH.sth_evrakno_sira = @SIRA " +
            ")AS VERI " +
            "PIVOT " +
            "( SUM(MIKTAR) " +
            "FOR BEDEN IN ([36],[37],[38])) " +
            "AS PVT GROUP BY RENKPNTR,PVT.[36],PVT.[37],PVT.[38],PVT.STOKKOD,PVT.RENK,BFIYAT",
            param:  ['STOKKOD','SERI','SIRA'],
            type:   ['string|25','string|50','int'],
            value:  [$scope.IrsaliyeListe[0].sth_stok_kod,$scope.Seri,$scope.Sira]
        }
        db.GetPromiseQuery(TmpQuery,function(data)
        {   
            $scope.KirilimListe = data
        });
    }
    // $scope.MaxSira = async function()
    // {   
    //     await db.MaxSiraPromiseTag($scope.Firma,'MaxStokHarSira',[$scope.DepoNo,$scope.Tarih],function(data){$scope.EvrakNo = data});
    // }
    $scope.YeniEvrak = function (pAlisSatis)
    {
        //ALIŞ = 0 SATIŞ = 1
        if(pAlisSatis == 0)
            ParamName = "AlisIrsaliye";
        else
            ParamName = "SatisIrsaliye";

        Init();
        InitCariGrid();
        InitIslemGrid();
        InitStokGrid();
        InitPartiLotGrid();
        InitDizaynGrid();
        InitProjeEvrakGetirGrid();
        InitStokHarGrid();

        $scope.FiyatListeNo = UserParam[ParamName].FiyatListe;
        $scope.EvrakLock = false;
        $scope.Seri = UserParam[ParamName].Seri;
        $scope.OfflineSira = UserParam[ParamName].OfflineSira;
        $scope.BelgeNo = UserParam[ParamName].BelgeNo;
        $scope.CmbEvrakTip = UserParam[ParamName].EvrakTip;
        $scope.CariKodu = UserParam[ParamName].Cari;
        if(UserParam[ParamName].FiyatLock == 1)
        {
            $scope.FiyatLock = true;
        }
        if(pAlisSatis == 0)
        {
            $scope.PersonelTip = 1
        }
        else
        {
            $scope.PersonelTip = 0
        }
        $scope.Stok = 
        [
            {
                BIRIM : '',
                BIRIMPNTR : 0, 
                FIYAT : 0,
                TUTAR : 0,
                INDIRIM : 0,
                KDV : 0,
                TOPTUTAR :0
            }
        ];
        if($scope.CariKodu != "")
        {
            db.GetData($scope.Firma,'CariListeGetir',[$scope.CariKodu,'',UserParam.Sistem.PlasiyerKodu],function(data)
            {
                $scope.CariListe = data;
                $("#TblCari").jsGrid({data : $scope.CariListe});

                let Obj = $("#TblCari").data("JSGrid");
                let Item = Obj.rowByItem(data[0]);
                
                $scope.CariListeRowClick(0,Item,Obj);
            });
        }
        db.DepoGetir($scope.Firma,UserParam[ParamName].DepoListe,function(data)
        {
            $scope.DepoListe = data; 
            $scope.DepoNo = UserParam[ParamName].DepoNo;
            $scope.DepoListe.forEach(function(item) 
            {
                if(item.KODU == $scope.DepoNo)
                    $scope.DepoAdi = item.ADI;
            });     
        });
        db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(data)
        {
            $scope.SorumlulukListe = data; 
            $scope.Sorumluluk = UserParam[ParamName].Sorumluluk;
            $scope.SorumlulukListe.forEach(function(item)
            {
                if(item.KODU == $scope.Sorumluluk)
                    $scope.SorumlulukAdi = item.ADI;
            });
        });
        db.GetPromiseTag($scope.Firma,'PersonelTipGetir',[$scope.PersonelTip],function(data)
        {
            $scope.PersonelListe = data;
            $scope.Personel = UserParam[ParamName].Personel;
            $scope.PersonelListe.forEach(function(item)
            {
                if(item.KODU == $scope.Personel)
                  $scope.PersonelAdi = item.ADI;
            });
        });
        db.FillCmbDocInfo($scope.Firma,'CmbProjeGetir',function(data){$scope.ProjeListe = data; $scope.Proje = UserParam[ParamName].Proje});
        db.FillCmbDocInfo($scope.Firma,'CmbOdemePlanGetir',function(data){$scope.OdemePlanListe = data; $scope.OdemeNo = '0'});
        db.GetPromiseTag($scope.Firma,'FiyatListeGetir',[$scope.PersonelTip],function(data)
        {
            $scope.FiyatListe = data;
            $scope.FiyatListeNo = UserParam[ParamName].FiyatListe;

            
        }); 
        //db.MaxSira($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip],function(data){$scope.Sira = data});       
        
        $scope.EvrakTipChange();
        BarkodFocus();
    }
    $scope.BtnCariListele = function()
    {   
        $scope.Loading = true;
        $scope.TblLoading = false;
        let Kodu = '';
        let Adi = '';

        if($scope.TxtCariAra != "")
        {
            if($scope.CmbCariAra == "0")
            {   
                Adi = $scope.TxtCariAra.replace("*","%").replace("*","%");
            }
            else
            {
                Kodu = $scope.TxtCariAra.replace("*","%").replace("*","%");
            }
        }
        
        db.GetData($scope.Firma,'CariListeGetir',[Kodu,Adi,UserParam.Sistem.PlasiyerKodu],function(data)
        {
            $scope.CariListe = data;
            if($scope.CariListe.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblCari").jsGrid({data : $scope.CariListe});
                $("#TblCari").jsGrid({pageIndex: true})
            } 
            else
            {
                alertify.alert("Cari Bulunamadı")
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblCari").jsGrid({data : $scope.CariListe});
                $("#TblCari").jsGrid({pageIndex: true})
            }     
            
        });
    }
    $scope.BtnPartiLotGetir = function()
    {   
        if(isNaN($scope.TxtLot))
        $scope.TxtLot = 0;

        db.GetData($scope.Firma,'PartiLotGetir',[$scope.Stok[0].KODU,$scope.DepoNo,$scope.TxtParti,$scope.TxtLot],function(data)
        { 
            $scope.PartiLotListe = data;
            $("#TblPartiLot").jsGrid({data : $scope.PartiLotListe});
        });
    }
    $scope.BtnPartiLotSec = function()
    {   
        $scope.Stok[0].PARTI = $scope.PartiLotListe[$scope.PartiLotListeSelectedIndex].PARTI;
        $scope.Stok[0].LOT = $scope.PartiLotListe[$scope.PartiLotListeSelectedIndex].LOT;

        $scope.TxtParti = $scope.PartiLotListe[$scope.PartiLotListeSelectedIndex].PARTI;
        $scope.TxtLot = $scope.PartiLotListe[$scope.PartiLotListeSelectedIndex].LOT;
        if(UserParam.Sistem.PartiLotKontrol == 1)//PARTI-LOT KONTROL
        {
            console.log($scope.IrsaliyeListe)
            if($scope.IrsaliyeListe != [])
            {
                for(i = 0;i < $scope.IrsaliyeListe.length;i++)
                {   
                    console.log($scope.IrsaliyeListe)
                    console.log($scope.IrsaliyeListe[i].sth_parti_kodu,$scope.Stok[0].PARTI,"  LOT   ",$scope.Stok[0].LOT,$scope.IrsaliyeListe[i].sth_lot_no)
                    if($scope.Stok[0].PARTI != "" && $scope.Stok[0].LOT != "")
                    {
                        console.log($scope.IrsaliyeListe[i].sth_parti_kodu,$scope.Stok[0].PARTI,"  LOT   ",$scope.Stok[0].LOT,$scope.IrsaliyeListe[i].sth_lot_no)
                        if($scope.Stok[0].PARTI == $scope.IrsaliyeListe[i].sth_parti_kodu && $scope.Stok[0].LOT == $scope.IrsaliyeListe[i].sth_lot_no)
                        {
                            $('#MdlPartiLot').modal('hide');
                            console.log(1)
                            alertify.alert("<a style='color:#3e8ef7''>" + "Okutmuş Olduğunuz "+ $scope.Stok[0].PARTI + ". " + "Parti " + $scope.Stok[0].LOT + ". " +"Lot Daha Önceden Okutulmuş !" + "</a>" );
                            $scope.InsertLock = false;
                            $scope.BtnTemizle();
                            return;
                        }
                    }
                }
            }
        }
        $scope.PartiLotListe = [];
        
        $('#MdlPartiLot').modal('hide');
    }
    $scope.BtnPartiLotOlustur = function()
    {   
        if($scope.TxtParti == '')
        {
            $("#LblPartiLotAlert").show();
            $scope.LblPartiLotAlert = "Parti Alanı Boş Geçilemez !"
        }
        else
        {   
            if(isNaN($scope.TxtLot))
            $scope.TxtLot = 0;
          
            db.GetData($scope.Firma,'PartiLotGetir',[$scope.Stok[0].KODU,$scope.DepoNo,$scope.TxtParti,$scope.TxtLot],function(data)
            {   
                if(data.length > 0)
                {
                    $scope.PartiLotListe = data;
                    $("#TblPartiLot").jsGrid({data : $scope.PartiLotListe});
                    $("#LblPartiLotAlert").show();
                    $scope.LblPartiLotAlert = "Bu PartiLot Daha Önceden Oluşturulmuş !"
                }
                else
                {
                    let Data = 
                    [
                        UserParam.MikroId,
                        UserParam.MikroId,
                        $scope.TxtParti,
                        $scope.TxtLot,
                        $scope.Stok[0].KODU,
                        $scope.SktTarih
                    ]   
                    db.ExecuteTag($scope.Firma,'PartiLotInsert',Data,function(InsertResult)
                    {
                        if(typeof(InsertResult.result.err) == 'undefined')
                        {
                            $scope.Stok[0].PARTI = $scope.TxtParti;
                            $scope.Stok[0].LOT = $scope.TxtLot;
                            $('#MdlPartiLot').modal('hide');
                        }
                    });
                }
            });
        }
    }
    $scope.BtnPartiEnter = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            $scope.BtnPartiLotGetir();
            $timeout(function() 
            {
                if($scope.PartiLotListe != '')
                {
                    $scope.BtnPartiLotSec();
                    $timeout(function(){$scope.Insert();},150)
                }
                else
                {
                    $('#MdlPartiLot').modal('hide');
                    alertify.okBtn("Tamam");
                    alertify.alert("Parti Bulunamadı");
                    $('#MdlPartiLot').modal('hide');
                    $scope.TxtParti = "";
                    $scope.Barkod = "";
                    $scope.Stok = null;
                    $scope.Stok = 
                    [
                        {
                            BIRIM : '',
                            BIRIMPNTR : 0, 
                            FIYAT : 0,
                            TUTAR : 0,
                            INDIRIM : 0,
                            KDV : 0,
                            TOPTUTAR :0
                        }
                    ];
                    $scope.Miktar = 1;
                    $scope.BarkodLock = false;
            
                    $scope.BirimListe = [];
                }
            },250)         
        }
    }
    $scope.BtnRenkBedenSec = function()
    {
        $scope.Stok[0].RENK = $.grep($scope.RenkListe, function (Item) 
        {
            return Item.PNTR == $scope.Stok[0].RENKPNTR;
        })[0].KIRILIM;
        
        $scope.Stok[0].BEDEN = $.grep($scope.BedenListe, function (Item) 
        {
            return Item.PNTR == $scope.Stok[0].BEDENPNTR;
        })[0].KIRILIM;
        $('#MdlRenkBeden').modal('hide');

        PartiLotEkran();
    }
    $scope.BtnStokGridGetir = function()
    {
        $scope.Loading = true;
        $scope.TblLoading = false;
        let Kodu = '';
        let Adi = '';

        if($scope.StokGridTip == "0")
        {   
            Adi = $scope.StokGridText.replace("*","%").replace("*","%");
        }
        else
        {
            Kodu = $scope.StokGridText.replace("*","%").replace("*","%");
        }
            
        db.GetData($scope.Firma,'StokGetir',[Kodu,Adi,$scope.DepoNo,''],function(StokData)
        {
            $scope.StokListe = StokData;
            if ($scope.StokListe.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblStok").jsGrid({data : $scope.StokListe});
                $("#TblStok").jsGrid({data : $scope.StokListe});
                $("#TblStok").jsGrid({pageIndex: true});
            }
            else
            {
                alertify.alert("Stok Bulunamadı")
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblStok").jsGrid({data : $scope.StokListe});
                $("#TblStok").jsGrid({data : $scope.StokListe});
                $("#TblStok").jsGrid({pageIndex: true});
            }
        });

    }
    $scope.BtnStokGridSec = function()
    {
        $("#MdlStokGetir").modal('hide');
        StokBarkodGetir($scope.Barkod);
        //$scope.BtnStokGridGetir();
        $("#TblStok").jsGrid({pageIndex: true})
    }
    $scope.BtnManuelArama = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            $scope.BtnStokGridGetir();
        }
    }
    $scope.BtnCariListeleEnter = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            $scope.BtnCariListele();
        }
    }
    $scope.BtnBarkodGetirClick = function()
    {
        StokBarkodGetir($scope.Barkod); 
    }
    $scope.BtnStokBarkodGetir = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            StokBarkodGetir($scope.Barkod); 
        }
    }
    $scope.BtnOnlineYazdir = function()
    {   
        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "UPDATE STOK_HAREKETLERI SET sth_special1 = 1 " +
                    "WHERE sth_evrakno_seri = @sth_evrakno_seri AND sth_evrakno_sira = @sth_evrakno_sira AND sth_evraktip = @sth_evraktip ",
            param:  ['sth_evrakno_seri','sth_evrakno_sira','sth_evraktip'],
            type:   ['string|25','int','int',],
            value:  [$scope.Seri,$scope.Sira,$scope.EvrakTip]
        }

        db.ExecuteQuery(TmpQuery,function(data)
        {   
            if(typeof(data.result.err) == 'undefined')
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Yazdırma İşlemi Başarıyla Gerçekleşti !" + "</a>" ); 
            }
            else
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Yazdırma İşleminde Hata !" + "</a>" ); 
            }
        });
    }
    $scope.BtnEtiketBas = function()
    {
        for(i = 0; i < $scope.IrsaliyeListe.length; i++)
        {
            $scope.StokKodu = $scope.IrsaliyeListe[i].sth_stok_kod;
            var InsertData = 
            [
                UserParam.MikroId,
                UserParam.MikroId,
                1,
                $scope.Seri,
                $scope.Sira,
                "",
                $scope.BelgeNo,
                0,
                0,
                $scope.IrsaliyeListe[i].sth_miktar,
                $scope.DepoNo,
                $scope.StokKodu,
                1,
                1,
                $scope.Barkod,
                $scope.IrsaliyeListe[i].sth_miktar
            ]
            db.ExecuteTag($scope.Firma,'EtiketInsert',InsertData,function(InsertResult)
            {

            });
        }
        if(i == $scope.IrsaliyeListe.length)
        {
            alertify.alert("Etiket Yazdırıldı.");
        }
        else
        {
            alertify.alert("Etiket Yazdıralamadı.");
        }
    }
    $scope.MiktarFiyatValid = function()
    {
        $scope.Stok[0].TUTAR = ($scope.Stok[0].CARPAN * $scope.Miktar) * $scope.Stok[0].FIYAT;
        $scope.Stok[0].KDV = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].TOPTANVERGI / 100);
        $scope.Stok[0].TOPTUTAR = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) + $scope.Stok[0].KDV;
    }
    $scope.CariListeRowClick = function(pIndex,pItem,pObj)
    {
        if(!$scope.EvrakLock)
        {
            if ( CariSelectedRow ) { CariSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
            var $row = pObj.rowByItem(pItem);
            $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
            CariSelectedRow = $row;
            
            $scope.CariKodu = $scope.CariListe[pIndex].KODU;
            $scope.CariAdi = $scope.CariListe[pIndex].UNVAN1;
            $scope.CariSoyAdi = $scope.CariListe[pIndex].UNVAN2;
            $scope.CariFiyatListe = $scope.CariListe[pIndex].SATISFK;      
            $scope.CariDovizCinsi = $scope.CariListe[pIndex].DOVIZCINSI;
            $scope.CariDovizCinsi1 = $scope.CariListe[pIndex].DOVIZCINSI1;
            $scope.CariDovizCinsi2 = $scope.CariListe[pIndex].DOVIZCINSI2;
            $scope.CariDovizKuru = $scope.CariListe[pIndex].DOVIZKUR;
            $scope.CariDovizKuru1 = $scope.CariListe[pIndex].DOVIZKUR1;
            $scope.CariDovizKuru2 = $scope.CariListe[pIndex].DOVIZKUR2;
            $scope.CariAltDovizKuru = $scope.CariListe[pIndex].ALTDOVIZKUR;
            $scope.CariBakiye = $scope.CariListe[pIndex].BAKIYE;
            $scope.CariVDADI = $scope.CariListe[pIndex].VDADI;
            $scope.CariVDNO = $scope.CariListe[pIndex].VDNO;
            $scope.Adres = $scope.CariListe[pIndex].ADRES;
            $scope.Adres1 = $scope.CariListe[pIndex].ADRES1;
            $scope.Adres2 = $scope.CariListe[pIndex].ADRES2;
            $scope.DovizSembol = $scope.CariListe[pIndex].DOVIZSEMBOL
            $scope.DovizSembol1 = $scope.CariListe[pIndex].DOVIZSEMBOL1
            $scope.DovizSembol2 = $scope.CariListe[pIndex].DOVIZSEMBOL2
            $scope.Risk = $scope.CariListe[pIndex].RISK
            $scope.RiskLimit = $scope.CariListe[pIndex].RISKLIMIT;
            $scope.DovizChangeKodu = "0"
            $scope.DovizChange()
            $scope.MainClick();
            AdresNoGetir();
        }
    }
    $scope.IslemListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( IslemSelectedRow ) { IslemSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        IslemSelectedRow = $row;
        $scope.IslemListeSelectedIndex = pIndex;
    }
    $scope.StokListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( StokSelectedRow ) { StokSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        StokSelectedRow = $row;
        
        $scope.Barkod = $scope.StokListe[pIndex].KODU;
        $scope.BarkodGirisClick();
        StokBarkodGetir($scope.Barkod);
    }
    $scope.PartiLotListeRowClick = function(pIndex,pItem,pObj)
    {   
        if ( PartiLotSelectedRow ) { PartiLotSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        PartiLotSelectedRow = $row;
        $scope.PartiLotListeSelectedIndex = pIndex;
    }
    $scope.ProjeEvrakListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( ProjeEvrakSelectedRow ) { ProjeEvrakSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        ProjeEvrakSelectedRow = $row;
        $scope.ProjeEvrakSelectedIndex = pItem;

        $scope.Seri = $scope.ProjeEvrakSelectedIndex.SERI;
        $scope.Sira = $scope.ProjeEvrakSelectedIndex.SIRA;
    }
    $scope.BtnTemizle = function()
    {
        $scope.Barkod = "";
        $scope.Stok = null;
        $scope.Stok = 
        [
            {
                BIRIM : '',
                BIRIMPNTR : 0, 
                FIYAT : 0,
                TUTAR : 0,
                INDIRIM : 0,
                KDV : 0,
                TOPTUTAR :0
            }
        ];
        $scope.Miktar = 1;
        $scope.BarkodLock = false;
        $scope.SonSatisMiktar = "0";

        $scope.BirimListe = [];
        BarkodFocus();      
    }
    $scope.BtnDuzenle = function()
    {
        $scope.MiktarEdit = $scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_miktar;
        $scope.FiyatEdit = $scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_tutar / $scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_miktar;

        $("#MdlDuzenle").modal('show');
    }
    $scope.DovizChange = function()
    {
            if($scope.DovizChangeKodu == 0)
            {
               $scope.EvrakDovizTip = $scope.DovizSembol
            }
            else if($scope.DovizChangeKodu == 1)
            {
                $scope.CariDovizCinsi = $scope.CariDovizCinsi1;
                $scope.CariDovizKuru = $scope.CariDovizKuru1;
                $scope.EvrakDovizTip = $scope.DovizSembol1
            }
            else if($scope.DovizChangeKodu == 2)
            {
                $scope.CariDovizCinsi = $scope.CariDovizCinsi2
                $scope.CariDovizKuru =  $scope.CariDovizKuru2
                $scope.EvrakDovizTip = $scope.DovizSembol2
            }
    }
    $scope.BtnVergiDuzenle = function()
    {
        $("#MdlVergiDuzenle").modal('show');
    }
    $scope.BtnDuzenleKaydet = function(pIndex)
    {   
        let TmpTutar = $scope.FiyatEdit * $scope.MiktarEdit;
        let TmpYuzde1 = $scope.IrsaliyeListe[pIndex].sth_iskonto1 / $scope.IrsaliyeListe[pIndex].sth_tutar; 
        let TmpYuzde2 = $scope.IrsaliyeListe[pIndex].sth_iskonto2 / ($scope.IrsaliyeListe[pIndex].sth_tutar - $scope.IrsaliyeListe[pIndex].sth_iskonto1); 
        let TmpYuzde3 = $scope.IrsaliyeListe[pIndex].sth_iskonto3 / ($scope.IrsaliyeListe[pIndex].sth_tutar - ($scope.IrsaliyeListe[pIndex].sth_iskonto1 + $scope.IrsaliyeListe[pIndex].sth_iskonto2));
        let TmpYuzde4 = $scope.IrsaliyeListe[pIndex].sth_iskonto4 / ($scope.IrsaliyeListe[pIndex].sth_tutar - ($scope.IrsaliyeListe[pIndex].sth_iskonto1 + $scope.IrsaliyeListe[pIndex].sth_iskonto2 + $scope.IrsaliyeListe[pIndex].sth_iskonto3));
        let TmpYuzde5 = $scope.IrsaliyeListe[pIndex].sth_iskonto5 / ($scope.IrsaliyeListe[pIndex].sth_tutar - ($scope.IrsaliyeListe[pIndex].sth_iskonto1 + $scope.IrsaliyeListe[pIndex].sth_iskonto2 + $scope.IrsaliyeListe[pIndex].sth_iskonto3 + $scope.IrsaliyeListe[pIndex].sth_iskonto4));

        $scope.IrsaliyeListe[pIndex].sth_iskonto1 = TmpTutar * TmpYuzde1;
        $scope.IrsaliyeListe[pIndex].sth_iskonto2 = (TmpTutar - $scope.IrsaliyeListe[pIndex].sth_iskonto1) * TmpYuzde2;
        $scope.IrsaliyeListe[pIndex].sth_iskonto3 = (TmpTutar - ($scope.IrsaliyeListe[pIndex].sth_iskonto1 + $scope.IrsaliyeListe[pIndex].sth_iskonto2)) * TmpYuzde3;
        $scope.IrsaliyeListe[pIndex].sth_iskonto4 = (TmpTutar- ($scope.IrsaliyeListe[pIndex].sth_iskonto1 + $scope.IrsaliyeListe[pIndex].sth_iskonto2 + $scope.IrsaliyeListe[pIndex].sth_iskonto3)) * TmpYuzde4;
        $scope.IrsaliyeListe[pIndex].sth_iskonto5 = (TmpTutar - ($scope.IrsaliyeListe[pIndex].sth_iskonto1 + $scope.IrsaliyeListe[pIndex].sth_iskonto2 + $scope.IrsaliyeListe[pIndex].sth_iskonto3 + $scope.IrsaliyeListe[pIndex].sth_iskonto4)) * TmpYuzde5;

        $scope.Update(pIndex);
    
        angular.element('#MdlDuzenle').modal('hide');
    }
    $scope.BtnVergiDuzenleKaydet = function()
    {
        if($scope.ToplamKdv >= 1 )
        {
            for(i = 0;i < $scope.IrsaliyeListe.length;i++)
            {
                $scope.IrsaliyeListe[i].sth_vergi = ($scope.VergiEdit / $scope.ToplamKdv) *  $scope.IrsaliyeListe[i].sth_vergi
    
                let sth_vergi = $scope.IrsaliyeListe[i].sth_vergi
                let sth_Guid = $scope.IrsaliyeListe[i].sth_Guid

                let TmpQuery = 
                {
                    db :'{M}.' + $scope.Firma,
                    query:  "UPDATE STOK_HAREKETLERI SET sth_vergi = @sth_vergi WHERE sth_Guid = @sth_Guid",
                    param : ['sth_vergi','sth_Guid'],
                    type : ['float','string|50'],
                    value : [sth_vergi,sth_Guid]
                }
                db.GetDataQuery(TmpQuery,function(Data)
                {
                    DipToplamHesapla() 
                });
            }
    
            angular.element('#MdlVergiDuzenle').modal('hide');
        }
        else
        {
            let sth_vergi = $scope.VergiEdit
            let sth_Guid = $scope.IrsaliyeListe[0].sth_Guid
            let TmpQuery = 
            {

                db :'{M}.' + $scope.Firma,
                query:  "UPDATE STOK_HAREKETLERI SET sth_vergi = @sth_vergi WHERE sth_Guid = @sth_Guid",
                param : ['sth_vergi','sth_Guid'],
                type : ['float','string|50'],
                value : [sth_vergi,sth_Guid]
            }
            db.GetDataQuery(TmpQuery,function(Data)
            {
                db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
                    {
                        $scope.IrsaliyeListe = data;
                        $("#TblIslem").jsGrid({data : $scope.IrsaliyeListe});  
                        DipToplamHesapla();  
                    });
            });
            angular.element('#MdlVergiDuzenle').modal('hide');
        }
    }
    $scope.MiktarPress = function(keyEvent)
    {
        if(keyEvent.which == 40)
        {
            $window.document.getElementById("Fiyat").focus();
            $window.document.getElementById("Fiyat").select();
        }
        if(keyEvent.which == 13)
        {     
            $scope.Insert();
        }
    }
    $scope.FiyatPress = function(keyEvent)
    {
        if(keyEvent.which == 38)
        {
            $window.document.getElementById("Miktar").focus();
            $window.document.getElementById("Miktar").select();
        }
        if(keyEvent.which == 13)
        {
            $scope.Insert();
        }
    }
    $scope.BtnIskontoEkran = function(pTip)
    {
        $scope.IskontoTip = pTip;
        $scope.IskYuzde1 = 0;
        $scope.IskYuzde2 = 0;
        $scope.IskYuzde3 = 0;
        $scope.IskYuzde4 = 0;
        $scope.IskYuzde5 = 0;
        $scope.IskTutar1 = 0;
        $scope.IskTutar2 = 0;
        $scope.IskTutar3 = 0;
        $scope.IskTutar4 = 0;
        $scope.IskTutar5 = 0;
        $scope.IskTplTutar1 = 0;
        $scope.IskTplTutar2 = 0;
        $scope.IskTplTutar3 = 0;
        $scope.IskTplTutar4 = 0;
        $scope.IskTplTutar5 = 0;
        $scope.IskTplTutar = 0;
        
        if(pTip == 0)
        {
            for(i = 0;i < $scope.IrsaliyeListe.length;i++)
            {
                $scope.IskTplTutar += $scope.IrsaliyeListe[i].sth_tutar;
                $scope.IskTutar1 += $scope.IrsaliyeListe[i].sth_iskonto1;
                $scope.IskTplTutar1 = $scope.IskTplTutar - $scope.IskTutar1;
                $scope.IskTutar2 += $scope.IrsaliyeListe[i].sth_iskonto2;
                $scope.IskTplTutar2 = $scope.IskTplTutar1 - $scope.IskTutar2;
                $scope.IskTutar3 += $scope.IrsaliyeListe[i].sth_iskonto3;
                $scope.IskTplTutar3 = $scope.IskTplTutar2 - $scope.IskTutar3;
                $scope.IskTutar4 += $scope.IrsaliyeListe[i].sth_iskonto4;
                $scope.IskTplTutar4 = $scope.IskTplTutar3 - $scope.IskTutar4;
                $scope.IskTutar5 += $scope.IrsaliyeListe[i].sth_iskonto5;
                $scope.IskTplTutar5 = $scope.IskTplTutar4 - $scope.IskTutar5;
            }
        }
        else
        {
            $scope.IskTplTutar = $scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_tutar;
            $scope.IskTutar1 = $scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_iskonto1;
            $scope.IskTplTutar1 = $scope.IskTplTutar - $scope.IskTutar1;
            $scope.IskTutar2 = $scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_iskonto2;
            $scope.IskTplTutar2 = $scope.IskTplTutar1 - $scope.IskTutar2;
            $scope.IskTutar3 = $scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_iskonto3;
            $scope.IskTplTutar3 = $scope.IskTplTutar2 - $scope.IskTutar3;
            $scope.IskTutar4 = $scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_iskonto4;
            $scope.IskTplTutar4 = $scope.IskTplTutar3 - $scope.IskTutar4;
            $scope.IskTutar5 = $scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_iskonto5;
            $scope.IskTplTutar5 = $scope.IskTplTutar4 - $scope.IskTutar5;
        }

        $scope.IskYuzde1 = (100 * $scope.IskTutar1) / $scope.IskTplTutar;
        $scope.IskYuzde2 = (100 * $scope.IskTutar2) / $scope.IskTplTutar1;
        $scope.IskYuzde3 = (100 * $scope.IskTutar3) / $scope.IskTplTutar2;
        $scope.IskYuzde4 = (100 * $scope.IskTutar4) / $scope.IskTplTutar3;
        $scope.IskYuzde5 = (100 * $scope.IskTutar5) / $scope.IskTplTutar4;

        $scope.IskTutar1 = $filter('number')($scope.IskTutar1,2);
        $scope.IskTutar2 = $filter('number')($scope.IskTutar2,2);
        $scope.IskTutar3 = $filter('number')($scope.IskTutar3,2);
        $scope.IskTutar4 = $filter('number')($scope.IskTutar4,2);
        $scope.IskTutar5 = $filter('number')($scope.IskTutar5,2);

        $scope.IskYuzde1 = $filter('number')($scope.IskYuzde1,2);
        $scope.IskYuzde2 = $filter('number')($scope.IskYuzde2,2);
        $scope.IskYuzde3 = $filter('number')($scope.IskYuzde3,2);
        $scope.IskYuzde4 = $filter('number')($scope.IskYuzde4,2);
        $scope.IskYuzde5 = $filter('number')($scope.IskYuzde5,2);

        $("#MdlIskontoEkran").modal('show');
    }
    $scope.IskontoValid = function(pTip,pIndex)
    {
        let TmpTutar = 0;

        if(pIndex == 1)
        {
            TmpTutar = $scope.IskTplTutar;

        }
        else
        {
            TmpTutar = this['IskTplTutar' + (pIndex - 1)];

        }

        if(pTip == 0)
        {
            this['IskTutar' + pIndex] = TmpTutar * (this['IskYuzde' + pIndex] / 100);
            this['IskTutar' + pIndex] = $filter('number')(this['IskTutar' + pIndex],4);

        }
        else
        {
            this['IskYuzde' + pIndex] = (100 * this['IskTutar' + pIndex]) / TmpTutar;
            this['IskYuzde' + pIndex] = $filter('number')(this['IskYuzde' + pIndex],4);
        }

        for(i = pIndex;i < 6;i++)
        {
            if(i == 1)
            {
                this['IskTplTutar' + i] = $scope.IskTplTutar - this['IskTutar' + pIndex];
            }
            else
            {
                this['IskTplTutar' + i] = this['IskTplTutar' + (i-1)] - this['IskTutar' + i];
            }

            this['IskTplTutar' + i] = $filter('number')(this['IskTplTutar' + i],4);

        }
    }
    $scope.BtnIskontoKaydet = function()
    {   
        if($scope.IskontoTip == 0)
        {   
            for(i = 0;i < $scope.IrsaliyeListe.length;i++)
            {
                $scope.IrsaliyeListe[i].sth_iskonto1 = $scope.IrsaliyeListe[i].sth_tutar * ($scope.IskYuzde1 / 100);
                $scope.IrsaliyeListe[i].sth_iskonto2 = ($scope.IrsaliyeListe[i].sth_tutar - $scope.IrsaliyeListe[i].sth_iskonto1) * ($scope.IskYuzde2 / 100);
                $scope.IrsaliyeListe[i].sth_iskonto3 = ($scope.IrsaliyeListe[i].sth_tutar - ($scope.IrsaliyeListe[i].sth_iskonto1 + $scope.IrsaliyeListe[i].sth_iskonto2)) * ($scope.IskYuzde3 / 100);
                $scope.IrsaliyeListe[i].sth_iskonto4 = ($scope.IrsaliyeListe[i].sth_tutar - ($scope.IrsaliyeListe[i].sth_iskonto1 + $scope.IrsaliyeListe[i].sth_iskonto2 + $scope.IrsaliyeListe[i].sth_iskonto3)) * ($scope.IskYuzde4 / 100);
                $scope.IrsaliyeListe[i].sth_iskonto5 = ($scope.IrsaliyeListe[i].sth_tutar - ($scope.IrsaliyeListe[i].sth_iskonto1 + $scope.IrsaliyeListe[i].sth_iskonto2 + $scope.IrsaliyeListe[i].sth_iskonto3 + $scope.IrsaliyeListe[i].sth_iskonto4)) * ($scope.IskYuzde5 / 100);

                $scope.FiyatEdit = $scope.IrsaliyeListe[i].sth_tutar / $scope.IrsaliyeListe[i].sth_miktar;
                $scope.MiktarEdit = $scope.IrsaliyeListe[i].sth_miktar;

                $scope.Update(i);
            }
            
        }
        else
        {
            let i = $scope.IslemListeSelectedIndex;

            $scope.IrsaliyeListe[i].sth_iskonto1 = $scope.IrsaliyeListe[i].sth_tutar * ($scope.IskYuzde1 / 100);
            $scope.IrsaliyeListe[i].sth_iskonto2 = ($scope.IrsaliyeListe[i].sth_tutar - $scope.IrsaliyeListe[i].sth_iskonto1) * ($scope.IskYuzde2 / 100);
            $scope.IrsaliyeListe[i].sth_iskonto3 = ($scope.IrsaliyeListe[i].sth_tutar - ($scope.IrsaliyeListe[i].sth_iskonto1 + $scope.IrsaliyeListe[i].sth_iskonto2)) * ($scope.IskYuzde3 / 100);
            $scope.IrsaliyeListe[i].sth_iskonto4 = ($scope.IrsaliyeListe[i].sth_tutar - ($scope.IrsaliyeListe[i].sth_iskonto1 + $scope.IrsaliyeListe[i].sth_iskonto2 + $scope.IrsaliyeListe[i].sth_iskonto3)) * ($scope.IskYuzde4 / 100);
            $scope.IrsaliyeListe[i].sth_iskonto5 = ($scope.IrsaliyeListe[i].sth_tutar - ($scope.IrsaliyeListe[i].sth_iskonto1 + $scope.IrsaliyeListe[i].sth_iskonto2 + $scope.IrsaliyeListe[i].sth_iskonto3 + $scope.IrsaliyeListe[i].sth_iskonto4)) * ($scope.IskYuzde5 / 100);
            
            $scope.FiyatEdit = $scope.IrsaliyeListe[i].sth_tutar / $scope.IrsaliyeListe[i].sth_miktar;
            $scope.MiktarEdit = $scope.IrsaliyeListe[i].sth_miktar;

            $scope.Update(i);
        }
        $("#MdlIskontoEkran").modal('hide');
        DipToplamHesapla()
    }
    $scope.EvrakTipChange = async function()
    {
        if(ParamName == "AlisIrsaliye")
        {
            if($scope.CmbEvrakTip == 0) //Perakende Alış
            {
               $scope.EvrakTip = 13;
               $scope.NormalIade = 0;
               $scope.Tip = 0;
               $scope.Cins = 1;
            }
            else if($scope.CmbEvrakTip == 1) //Toptan Alış
            {
                $scope.EvrakTip = 13;
                $scope.NormalIade = 0;
                $scope.Tip = 0;
                $scope.Cins = 0; 
            }
            else if($scope.CmbEvrakTip == 2) //Perakende Alış İade
            {
                $scope.EvrakTip = 13;
                $scope.NormalIade = 1;
                $scope.Tip = 0;
                $scope.Cins = 1;
                
            }
            else if($scope.CmbEvrakTip == 3) //Toptan Alış İade
            {
                $scope.EvrakTip = 13;
                $scope.NormalIade = 1;
                $scope.Tip = 0;
                $scope.Cins = 0;

            } 
        }
        else
        {
            if($scope.CmbEvrakTip == 0) //Perakende Satis
            {
               $scope.EvrakTip = 1;
               $scope.NormalIade = 0;
               $scope.Tip = 1;
               $scope.Cins = 1;
            }
            else if($scope.CmbEvrakTip == 1) //Toptan Satis
            {
                $scope.EvrakTip = 1;
                $scope.NormalIade = 0;
                $scope.Tip = 1;
                $scope.Cins = 0; 
            }
            else if($scope.CmbEvrakTip == 2) //Perakende Satis İade
            {
                $scope.EvrakTip = 1;
                $scope.NormalIade = 1;
                $scope.Tip = 1;
                $scope.Cins = 1;
            }
            else if($scope.CmbEvrakTip == 3) //Toptan Satis İade
            {
                $scope.EvrakTip = 1;
                $scope.NormalIade = 1;
                $scope.Tip = 1;
                $scope.Cins = 0;
            }
            else if($scope.CmbEvrakTip == 4) // İhraç Kayıtlı İrsaliye
            {
                $scope.EvrakTip = 1;
                $scope.NormalIade = 0;
                $scope.Tip = 1;
                $scope.Cins = 2;
            }
        }
        if(localStorage.mode == 'false')
        {
            let TabloSira = await db.GetPromiseTag($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip]);
            console.log(TabloSira)
            if(typeof TabloSira == "undefined")
            {
                $scope.OfflineSira = parseInt($scope.OfflineSira) + 1;
               $scope.Sira = $scope.OfflineSira
            }
            else
            {
                await db.MaxSira($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip],function(data){$scope.Sira = data});
            }
        }
        else
        {
            await db.MaxSira($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip],function(data){$scope.Sira = data});
        }
    }
    $scope.BirimChange = function()
    {
        if($scope.BirimListe.length > 0)
        {
            $scope.Stok[0].BIRIMPNTR = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].BIRIMPNTR;
            $scope.Stok[0].BIRIM = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].BIRIM;
            $scope.Stok[0].CARPAN = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].KATSAYI;
            $scope.MiktarFiyatValid();
        }
    }
    $scope.DepoChange = function()
    {
        $scope.DepoListe.forEach(function(item) 
        {
            if(item.KODU == $scope.DepoNo)
                $scope.DepoAdi = item.ADI;
        });
    }
    $scope.SorumlulukChange = function()
    {
        $scope.SorumlulukListe.forEach(function(item) 
        {
            if(item.KODU == $scope.Sorumluluk)
                $scope.SorumlulukAdi = item.ADI;
        });
    }
    $scope.PersonelChange = function()
    {
        $scope.PersonelListe.forEach(function(item)
        {
            if(item.KODU == $scope.Personel)
            $scope.PersonelAdi = item.ADI;
        });
    }
    $scope.Insert = function()
    { 
        if(typeof($scope.Stok[0].KODU) != 'undefined')
        {
            if(ParamName == "SatisIrsaliye")
            {
                if($scope.RiskParam != 0)
                {
                    let TmpRiskOran = ($scope.Risk / $scope.RiskLimit) * 100;

                    if(TmpRiskOran >= 100)
                    {
                        alertify.alert("Risk limitini aştınız");
                        return;
                    }
                    if(TmpRiskOran >= UserParam.Sistem.RiskLimitOran)
                    {
                        alertify.alert("Risk limitinin %" + parseInt(TmpRiskOran) + " kadarı doldu");
                    }
                }
            }
            if(UserParam.SatisIrsaliye.EksiyeDusme == 1 && $scope.EvrakTip == 1 &&  ($scope.Miktar * $scope.Stok[0].CARPAN) > $scope.Stok[0].DEPOMIKTAR)
            {
                alertify.alert("Eksiye Düşmeye İzin Verilmiyor.");
                return;
            } 
            $scope.InsertLock = true
            if(UserParam.Sistem.SatirBirlestir == 0 || $scope.Stok[0].DETAYTAKIP == 1 || $scope.Stok[0].DETAYTAKIP == 2  )
            {          
                InsertData();
            }
            else
            {
                if($scope.Stok[0].RENKPNTR != 0 || $scope.Stok[0].BEDENPNTR != 0)
                {
                    let UpdateStatus = false;

                    angular.forEach($scope.IrsaliyeListe,function(value)
                    {
                        if(value.sth_stok_kod == $scope.Stok[0].KODU)
                        {   
                            
                            let TmpQuery = 
                            {
                                db :'{M}.' + $scope.Firma,
                                query:  "SELECT BdnHar_Guid from BEDEN_HAREKETLERI WHERE BdnHar_Har_uid=@BdnHar_Har_uid AND BdnHar_BedenNo = @BdnHar_BedenHarNo",
                                param : ['BdnHar_Har_uid','BdnHar_BedenHarNo'],
                                type : ['string|50','int'],
                                value : [value.sth_Guid,Kirilim($scope.Stok[0].BEDENPNTR,$scope.Stok[0].RENKPNTR)]
                            }
                            db.GetDataQuery(TmpQuery,function(Data)
                            {
                                if(Data.length > 0)
                                {
                                    db.ExecuteTag($scope.Firma,'BedenHarGorUpdate',[$scope.Miktar * $scope.Stok[0].CARPAN,Data[0].BdnHar_Guid],function(data)
                                    {
                                    });
                                }
                                else
                                {
                                    BedenHarInsert(value.sth_Guid)
                                }
                            });

                            let TmpFiyat  = value.sth_tutar / value.sth_miktar
                            let TmpMiktar = value.sth_miktar + ($scope.Miktar * $scope.Stok[0].CARPAN);
                            let Data = 
                            {
                                Param :
                                [
                                    TmpMiktar,
                                    0,
                                    TmpFiyat * TmpMiktar,
                                    $scope.Stok[0].TOPTANVERGIPNTR,
                                    0, //ISKONTO TUTAR 1
                                    0, //ISKONTO TUTAR 2
                                    0, //ISKONTO TUTAR 3
                                    0, //ISKONTO TUTAR 4
                                    0, //ISKONTO TUTAR 5
                                    0, //ISKONTO TUTAR 6
                                    0, //SATIR ISKONTO TİP 1
                                    0, //SATIR ISKONTO TİP 2
                                    0, //SATIR ISKONTO TİP 3
                                    0, //SATIR ISKONTO TİP 4
                                    0, //SATIR ISKONTO TİP 5
                                    0, //SATIR ISKONTO TİP 6
                                    value.sth_Guid
                                ],
                                BedenPntr : $scope.Stok[0].BEDENPNTR,
                                RenkPntr : $scope.Stok[0].RENKPNTR,
                                Miktar : TmpMiktar,
                                Guid : value.sth_Guid
                            };
    
                            UpdateStatus = true;
                            UpdateData(Data);
                        }                        
                    });
    
                    if(!UpdateStatus)
                    {
                        InsertData();
                    } 
                }
                else
                {
                    let UpdateStatus = false;
                console.log("Girdi")
                    angular.forEach($scope.IrsaliyeListe,function(value)
                    {
                        if(value.sth_stok_kod == $scope.Stok[0].KODU)
                        {   
                            let TmpFiyat  = value.sth_tutar / value.sth_miktar
                            let TmpMiktar = value.sth_miktar + ($scope.Miktar * $scope.Stok[0].CARPAN);
                            let Data = 
                            {
                                Param :
                                [
                                    TmpMiktar,
                                    0,
                                    TmpFiyat * TmpMiktar,
                                    $scope.Stok[0].TOPTANVERGIPNTR,
                                    0, //ISKONTO TUTAR 1
                                    0, //ISKONTO TUTAR 2
                                    0, //ISKONTO TUTAR 3
                                    0, //ISKONTO TUTAR 4
                                    0, //ISKONTO TUTAR 5
                                    0, //ISKONTO TUTAR 6
                                    0, //SATIR ISKONTO TİP 1
                                    0, //SATIR ISKONTO TİP 2
                                    0, //SATIR ISKONTO TİP 3
                                    0, //SATIR ISKONTO TİP 4
                                    0, //SATIR ISKONTO TİP 5
                                    0, //SATIR ISKONTO TİP 6
                                    value.sth_Guid
                                ],
                                BedenPntr : $scope.Stok[0].BEDENPNTR,
                                RenkPntr : $scope.Stok[0].RENKPNTR,
                                Miktar : TmpMiktar,
                                Guid : value.sth_Guid
                            };
                            UpdateStatus = true;
                            UpdateData(Data);
                        }                        
                    });
    
                    if(!UpdateStatus)
                    {
                        InsertData();
                    } 
                  
                }
            }
        }
        else
        {
            console.log("Barkod Okutunuz!");
            $scope.InsertLock = false
        }     
        BarkodFocus();
    }
    $scope.EvrakGetir = function ()
    {
        db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],async function(data)
        {
            if(data.length > 0)
            {
                Init();
                InitCariGrid();
                InitIslemGrid(); 
                
                $scope.CariFiyatListe = data[0].sth_fiyat_liste_no;
                $scope.Seri = data[0].sth_evrakno_seri;
                $scope.Sira = data[0].sth_evrakno_sira;
                $scope.Tip = data[0].sth_tip;
                $scope.EvrakTip = data[0].sth_evraktip.toString();
                $scope.CariKodu = data[0].sth_cari_kodu;
                $scope.CariAdi = data[0].CARIADI;
                $scope.Sorumluluk = data[0].sth_stok_srm_merkezi;
                $scope.Personel = data[0].sth_plasiyer_kodu;
                $scope.BelgeNo = data[0].sth_belge_no;
                $scope.Tarih = new Date(data[0].sth_tarih).toLocaleDateString();
                $scope.KabulTarihi = new Date(data[0].sth_malkbl_sevk_tarihi).toLocaleDateString();
                $scope.Barkod = "";
                $scope.Stok = 
                [
                    {
                        BIRIM : '',
                        BIRIMPNTR : 0, 
                        FIYAT : 0,
                        TUTAR : 0,
                        INDIRIM : 0,
                        KDV : 0,
                        TOPTUTAR :0
                    }
                ];
                $scope.Miktar = 1;

                $scope.AraToplam = 0;
                $scope.ToplamIndirim = 0;
                $scope.NetToplam = 0;
                $scope.ToplamKdv = 0;
                $scope.GenelToplam = 0;

                $scope.CmbCariAra = "0";
                $scope.TxtCariAra = "";

                await db.GetPromiseTag($scope.Firma,'StokBedenHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,11],function(BedenData)
                {
                    $scope.BedenHarListe = BedenData;
                });
                await db.GetPromiseTag($scope.Firma,'CariGetir',[$scope.CariKodu,'',UserParam.Sistem.PlasiyerKodu],function(data)
                {
                    $scope.CariListe = data;
                    $scope.Adres = $scope.CariListe[0].ADRES;
                    $scope.Adres1 = $scope.CariListe[0].ADRES1;
                    $scope.Adres2 = $scope.CariListe[0].ADRES2;
                    $scope.CariBakiye = $scope.CariListe[0].BAKIYE;
                    $scope.CariVDADI = $scope.CariListe[0].VDADI;
                    $scope.CariVDNO = $scope.CariListe[0].VDNO;
                    $scope.Risk = $scope.CariListe[0].RISK;
                    $scope.RiskLimit = $scope.CariListe[0].RISKLIMIT;
                    $scope.Il = $scope.CariListe[0].IL;

                    $("#TblCari").jsGrid({data : $scope.CariListe});

                    let Obj = $("#TblCari").data("JSGrid");
                    let Item = Obj.rowByItem(data[0]);
                    
                    $scope.CariListeRowClick(0,Item,Obj);
                    
                });

                db.DepoGetir($scope.Firma,UserParam[ParamName].DepoListe,function(e)
                {
                    $scope.DepoListe = e; 
                    $scope.DepoNo = data[0].sth_giris_depo_no.toString();
                    $scope.DepoListe.forEach(function(item) 
                    {
                        if(item.KODU == $scope.DepoNo)
                            $scope.DepoAdi = item.ADI;
                    });     
                });
                
                db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(e){$scope.SorumlulukListe = e; $scope.Sorumluluk = data[0].sth_stok_srm_merkezi; $scope.SorumlulukAdi = data[0].SORUMLUMERADI});
                db.FillCmbDocInfo($scope.Firma,'CmbPersonelGetir',function(e){$scope.PersonelListe = e;$scope.PersonelAdi = data[0].PERSONELADI});
                db.FillCmbDocInfo($scope.Firma,'CmbProjeGetir',function(e){$scope.ProjeListe = e; $scope.Proje = data[0].sth_proje_kodu});
                db.FillCmbDocInfo($scope.Firma,'CmbOdemePlanGetir',function(e){$scope.OdemePlanListe = e; $scope.OdemeNo = data[0].sth_odeme_op.toString()});
                
                $scope.IrsaliyeListe = data;
                
                $("#TblIslem").jsGrid({data : $scope.IrsaliyeListe});  
                DipToplamHesapla();
                ToplamMiktarHesapla()
                

                $scope.EvrakLock = true;
                $scope.BarkodLock = false;

                angular.element('#MdlEvrakGetir').modal('hide');

                BarkodFocus();
                $scope.KirilimGetir();
                $timeout(function(){FisData(data);},200);  
                

                alertify.alert("Evrak Başarıyla Getirildi.");
            }
            else
            {
                angular.element('#MdlEvrakGetir').modal('hide');
                alertify.okBtn("Tamam");
                alertify.alert("Evrak bulunamadı !");
            }
        });
    }
    $scope.EvrakDelete = function(pAlisSatis)
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Evrağı silmek istediğinize eminmisiniz ?', 
        function()
        { 
            if($scope.IrsaliyeListe.length > 0)
            {
                if(UserParam[ParamName].EvrakSil == 0)
                {
                    db.ExecuteTag($scope.Firma,'StokHarEvrDelete',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
                    {
                        if(typeof(data.result.err) == 'undefined')
                        {
                            angular.forEach($scope.IrsaliyeListe,function(value)
                            {
                                db.ExecuteTag($scope.Firma,'BedenHarDelete',[value.sth_Guid,11],function(data)
                                {
                                    if(typeof(data.result.err) != 'undefined')
                                    {
                                        console.log(data.result.err);
                                    }       
                                });
                            });
                        }
                        else
                        {
                            console.log(data.result.err);
                        }
                         //ALIŞ = 0 SATIŞ = 1
                        if(pAlisSatis == 0)
                        {
                            ParamName = "AlisIrsaliye";
                            $scope.YeniEvrak(0)
                        }
                        else
                        {
                            ParamName = "SatisIrsaliye";
                            $scope.YeniEvrak(1)
                        }
                    });
                    alertify.alert("Evrak silme işlemi başarıyla gerçekleşti. !");
                }
                else
                {
                    alertify.okBtn("Tamam");
                    alertify.alert("Evrak silme yetkiniz yok !");
                }
            }
            else
            {
                alertify.okBtn("Tamam");
                alertify.alert("Kayıtlı evrak olmadan evrak silemezsiniz !");
            }
        }
        ,function(){});
    }
    $scope.SatirDelete = function(pAlisSatis)
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Evrağı silmek istediğinize eminmisiniz ?', 
        function()
        { 
            if($scope.IslemListeSelectedIndex > -1)
            {
                if(UserParam[ParamName].EvrakSil == 0)
                {
                    db.ExecuteTag($scope.Firma,'StokHarSatirDelete',[$scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_Guid],function(data)
                    {
                        if(typeof(data.result.err) == 'undefined')
                        {
                            db.ExecuteTag($scope.Firma,'BedenHarDelete',[$scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_Guid,11],function(data)
                            {
                                if(typeof(data.result.err) != 'undefined')
                                {
                                    console.log(data.result.err);
                                }       
                            });
                        }
                        else
                        {
                            console.log(data.result.err);
                        }
                        
                        if($scope.IrsaliyeListe.length <= 1)
                        {
                            //ALIŞ = 0 SATIŞ = 1
                            if(pAlisSatis == 0)
                            {
                                ParamName = "AlisIrsaliye";
                                $scope.YeniEvrak(0)
                            }
                            else
                            {
                                ParamName = "SatisIrsaliye";
                                $scope.YeniEvrak(1)
                            }
                        }
                        else
                        {   
                            db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
                            {
                                db.GetData($scope.Firma,'StokBedenHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,11],function(BedenData)
                                {
                                    $scope.BedenHarListe = BedenData;
                                });

                                $scope.IrsaliyeListe = data;
                                $("#TblIslem").jsGrid({data : $scope.IrsaliyeListe});    
                                $scope.BtnTemizle();
                            });
                        }
                    });
                }
                else
                {
                    alertify.okBtn("Tamam");
                    alertify.alert("Evrak silme yetkiniz yok !");
                }
            }
            else
            {
                alertify.okBtn("Tamam");
                alertify.alert("Seçili satır olmadan evrak silemezsiniz !");
            }
        },
        function(){});
    }
    $scope.Update = function(pIndex)
    {   
        let Data = 
        {   
            Param :
            [
                $scope.MiktarEdit,
                0,
                $scope.FiyatEdit * $scope.MiktarEdit,
                $scope.IrsaliyeListe[pIndex].sth_vergi_pntr,
                $scope.IrsaliyeListe[pIndex].sth_iskonto1, //ISKONTO TUTAR 1
                $scope.IrsaliyeListe[pIndex].sth_iskonto2, //ISKONTO TUTAR 2
                $scope.IrsaliyeListe[pIndex].sth_iskonto3, //ISKONTO TUTAR 3
                $scope.IrsaliyeListe[pIndex].sth_iskonto4, //ISKONTO TUTAR 4
                $scope.IrsaliyeListe[pIndex].sth_iskonto5, //ISKONTO TUTAR 5
                0, //ISKONTO TUTAR 6
                $scope.IrsaliyeListe[pIndex].sth_sat_iskmas1, //SATIR ISKONTO 1
                $scope.IrsaliyeListe[pIndex].sth_sat_iskmas2, //SATIR ISKONTO 2
                $scope.IrsaliyeListe[pIndex].sth_sat_iskmas3, //SATIR ISKONTO 3
                $scope.IrsaliyeListe[pIndex].sth_sat_iskmas4, //SATIR ISKONTO 4
                $scope.IrsaliyeListe[pIndex].sth_sat_iskmas5, //SATIR ISKONTO 5
                0, // SATIR ISKONTO 6
                $scope.IrsaliyeListe[pIndex].sth_Guid
            ],
            BedenPntr : $scope.IrsaliyeListe[pIndex].BEDENPNTR,
            RenkPntr : $scope.IrsaliyeListe[pIndex].RENKPNTR,
            Miktar : $scope.MiktarEdit,
            Guid : $scope.IrsaliyeListe[pIndex].sth_Guid
        };
        UpdateData(Data);   
    }
    $scope.MaxLot = function()
    {   
        if($scope.Stok[0].DETAYTAKIP == 2)
        {
            db.GetData($scope.Firma,'MaxPartiLot',[$scope.TxtParti],function(pData)
            {
                $scope.TxtLot = pData[0].LOT;
            });
        }
        else
        {
            $scope.TxtLot = 1;
        }
    }
    $scope.ManuelAramaClick = function() 
    {
        $("#TbStok").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TbDizayn").removeClass('active');
    }
    $scope.MainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbStok").removeClass('active');
        $("#TbDizayn").removeClass('active');
    }
    $scope.BelgeBilgisiClick = function() 
    {
        $("#TbBelgeBilgisi").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbDizayn").removeClass('active');
    }
    $scope.BarkodGirisClick = function() 
    {   
        if($scope.Sira == 0 || typeof $scope.Sira == "undefined")
        {            
            alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Evrak Siranın Gelmesini Bekleyin!" + "</a>" );
        }
        else
        {
            if($scope.CariAdi != "")
            {
                $("#TbBarkodGiris").addClass('active');
                $("#TbMain").removeClass('active');
                $("#TbCariSec").removeClass('active');
                $("#TbBelgeBilgisi").removeClass('active');
                $("#TbIslemSatirlari").removeClass('active');
                $("#TbStok").removeClass('active');
                $("#TbDizayn").removeClass('active');
                            
                BarkodFocus();
            }
            else
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Cari Seçiniz !" + "</a>" );
            }
        }
    }
    $scope.IslemSatirlariClick = function()
    {   
        if($scope.ToplamSatir <= 0)
        {
            alertify.alert("Gösterilecek Evrak Bulunamadı!");
            $("#TbMain").addClass('active');
            $("#TbBelgeBilgisi").removeClass('active');
            $("#TbBarkodGiris").removeClass('active');
            $("#TbStok").removeClass('active');
            $("#TbDizayn").removeClass('active');
        }
        else
        {
            $("#TbIslemSatirlari").addClass('active');
            $("#TbMain").removeClass('active');
            $("#TbBelgeBilgisi").removeClass('active');
            $("#TbBarkodGiris").removeClass('active');
            $("#TbStok").removeClass('active');
        }
    }
    $scope.CariSecClick = function()
    {
        if($scope.Sira == 0 || typeof $scope.Sira == "undefined")
        {            
            alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Evrak Siranın Gelmesini Bekleyin!" + "</a>" );
        }
        else
        {
        $("#TbCariSec").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbDizayn").removeClass('active');
        }
    }
    $scope.ScanBarkod = function()
    {
        cordova.plugins.barcodeScanner.scan(
        function (result) 
        {
            $scope.Barkod = result.text;
            StokBarkodGetir($scope.Barkod);
        },
        function (error) 
        {
            //alert("Scanning failed: " + error);
        },
        {
            prompt : "Barkod Okutunuz",
            orientation : "portrait"
        }
        );
    }
    $scope.ProjeEvrakGetir = function()
    {
        db.GetData($scope.Firma,'StokProjeGetir',[$scope.EvrakTip,0,$scope.ProjeKod],function(data)
        {
            $scope.ProjeEvrakGetirListe = data;
            if($scope.ProjeEvrakGetirListe.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblProjeEvrakGetirListe").jsGrid({data : $scope.ProjeEvrakGetirListe});  
                $("#TblProjeEvrakGetirListe").jsGrid({pageIndex: true})
            }
            else
            {
                angular.element('#MdlProjeEvrakGetir').modal('hide');
                alertify.alert("Evrak Bulunamadı")
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblProjeEvrakGetirListe").jsGrid({data : $scope.ProjeEvrakGetirListe});
                $("#TblProjeEvrakGetirListe").jsGrid({pageIndex: true})
            }
        });
    }
    $scope.BtnProjeListeleEnter = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            $scope.ProjeEvrakGetir();
        }
    }
    $scope.ProjeEvrakSec = function()
    {
       angular.element('#MdlProjeEvrakGetir').modal('hide');
       $scope.EvrakGetir()
    }
    $scope.ProjeEvrakGetirModal = async function()
    {
        if($scope.ProjeGetirParam == "0")
        {
            $("#MdlEvrakGetir").modal('show');
        }
        else if($scope.ProjeGetirParam == "1")
        {
            $("#MdlProjeEvrakGetir").modal('show');
            $timeout( function(){
                $window.document.getElementById("ProjeLabel").focus();
                $window.document.getElementById("ProjeLabel").select();
            },100);  
        }
    }
    //GÜN SONU RAPORU
    $scope.BtnGunSonuYazdir = async function()
    {  
        if($scope.FisDizaynTip == "0")
        {   
            let FisDeger = "";
            let FisDizayn = "";
            $scope.GunSonuData = "";

            for(let i=0; i < $scope.DizaynListe.length; i++)
            {
                $scope.GunSonuData = $scope.GunSonuData + SpaceLength($scope.DizaynListe[i].CARIADI,30) + " " + SpaceLength($scope.DizaynListe[i].SAAT,5) + " " +SpaceLength($scope.DizaynListe[i].SERI + "-" + $scope.DizaynListe[i].SIRA,10) + " " + SpaceLength(parseFloat($scope.DizaynListe[i].TUTAR.toFixed(2)),10) + "\n";
            } 

            FisDeger = "RAGIP GOKYAR                        "+ $scope.Tarih;

            FisDizayn = "                                             " + "\n" + 
                        FisDeger + "\n" +
                        "           CARI SATIŞ DURUM RAPORU              " + "\n" +
                        "CARIADI                        SAAT F.SERI    F.TUTAR" + "\n" +
                        $scope.GunSonuData + 
                        "------------------------------------------------------------" + "\n" + 
                        "                                                  " + $scope.DGenelToplam.toFixed(2) + "\n" + 
                        "                                              " + "\n" 
            FisDizayn = FisDizayn.split("İ").join("I").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u");

            console.log(FisDizayn)  
            
            db.BTYazdir(FisDizayn,UserParam.Sistem,function(pStatus)
            {
                if(pStatus)
                {
                    alertify.alert("<a style='color:#3e8ef7''>" + "Yazdırma İşlemi Gerçekleşti </a>" );
                }
            });
        }
        else if($scope.FisDizaynTip == "1")
        {
            let FisDeger = "";
            $scope.GunSonuData = "";
    
            FisDeger = FisDeger + "                            IRSALIYE GUN SONU " + "\n" 
            FisDeger = FisDeger + "                                                            "+ $scope.Tarih + "\n" + "                                                            " +$scope.Seri + " - " + $scope.Sira + "\n" +"                                                            "+ $scope.Tarih + "\n" + "                                                            "+  $scope.Saat + "\n" + SpaceLength($scope.CariAdi,40) + "\n" + SpaceLength($scope.Adres1,50) + "\n" + SpaceLength($scope.Adres,10) + "\n" +  "  " + SpaceLength($scope.CariVDADI,25) + " " + $scope.CariVDNO + "\n";
    
            for(let i=0; i < $scope.DizaynListe.length; i++)
            {
                $scope.GunSonuData = $scope.GunSonuData +  SpaceLength($scope.DizaynListe[i].SERI,10) + "  " +  SpaceLength($scope.DizaynListe[i].SIRA,10) + "  " + SpaceLength($scope.DizaynListe[i].CARIKOD,15) + "  " + SpaceLength($scope.DizaynListe[i].CARIADI,20) + SpaceLength(parseFloat($scope.DizaynListe[i].TUTAR.toFixed(2)),8) + "\n";
            }
            $scope.GunSonuDizayn = "                                             " + "\n" + 
                        FisDeger + "\n" + "\n" +
                        "SERI        SIRA       CARI KODU            CARI ADI        TUTAR" + "\n" + 
                        "                                              " + "\n" + 
                        $scope.FisData + "\n"  +
                        "                                                                    - " + "\n " +
                        "                                                                   - " + "\n "
            $scope.GunSonuDizayn = $scope.GunSonuDizayn + "                                                   TOPLAM : " + $scope.DGenelToplam.toFixed(2)
            $scope.GunSonuDizayn = $scope.GunSonuDizayn.split("İ").join("I").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u").split("ı").join("i");
            
            console.log($scope.GunSonuDizayn)
            db.BTYazdir($scope.GunSonuDizayn,UserParam.Sistem,function(pStatus)
            {
                if(pStatus)
                {
                    alertify.alert("<a style='color:#3e8ef7''>" + "Yazdırma İşlemi Gerçekleşti </a>" );         
                }
            });
        }
    }
    $scope.BtnGunSonuRaporClick = async function()
    {
        $("#TbStok").removeClass('active');
        $("#TbMain").removeClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');

        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "SELECT " +
                    "sth_evrakno_seri AS SERI, " +
                    "sth_evrakno_sira AS SIRA, " +
                    "LEFT(CONVERT(VARCHAR(8),MAX(sth_create_date),108),5) AS SAAT, " +
                    "MAX(sth_cari_kodu) AS CARIKOD, " +
                    "(SELECT cari_unvan1 FROM CARI_HESAPLAR WHERE cari_kod = MAX(sth_cari_kodu)) + ' ' +" +
                    "(SELECT cari_unvan2 FROM CARI_HESAPLAR WHERE cari_kod = MAX(sth_cari_kodu)) " +
                    "AS CARIADI, " +
                    "ROUND(SUM(sth_tutar),2) TUTAR " +
                    "FROM STOK_HAREKETLERI  " +
                    "WHERE sth_tip = 1 AND sth_evraktip = 1 AND sth_cins = 0 AND sth_tarih = CONVERT(VARCHAR(10),GETDATE(),112) " +
                    "GROUP BY sth_evrakno_seri,sth_evrakno_sira " 
        }

        await db.GetPromiseQuery(TmpQuery,async function(Data)
        {
            $scope.DGenelToplam = db.SumColumn(Data,"TUTAR");
            $scope.DizaynListe = Data;
            $("#TblDizayn").jsGrid({data : $scope.DizaynListe});
            $("#TbDizayn").addClass('active');
        });
    }
    //FİŞ YAZDIR OPSİYONLARI
    $scope.DizaynSec = function()
    {
        $("#MdlDizaynEkran").modal('show');
        $scope.FisDizaynTip = "0"
    }
    $scope.DizaynChange = function()
    {
        FisData($scope.IrsaliyeListe)
    }
    //"DİZAYN"\\
    $scope.BtnFisYazdir = async function()
    {
        if($scope.FisDizaynTip == "0")
        {
            let FisDizayn = "";

            let i = 35 - $scope.FisLength.length;
            let Satır = "";
            for(let x = 0; x <= i; x++)
            {    
                Satır = Satır + "                                             -"+ "\n"; 
            } 
            FisDizayn = "                                             -" + "\n" + 
            "                   ESER GIDA                  " + "\n" +
            "        SÜT VE SÜT ÜRÜNLERİ PAZARLAMA         " + "\n" +
            "Merkez: Vişnelik Mh. Atatürk Bulvari No:177/8 " + "\n" +
            "TEL:0222 330 42 42 Odunpazari/ESKİŞEHİR     " + "\n"   +
            "Şube1 : Ortaköy Mh. TÜVTÜRK Yani No: 379 MUĞLA" + "\n" +
            "Tel:0252 214 78 58 muglasutas@hotmail.com    " + "\n"  +
            $scope.FisDeger + "\n" + "\n" +
            SpaceLength("ÜRÜN ADI",20) + "          " + SpaceLength("MIK",4) + " " + SpaceLength("BRM",4) + "\n" + 
            $scope.FisData + "\n" + //İÇERİK
            Satır + "SÜTAŞ A.Ş TARAFINDAN FATURA EDİLECEKTİR." + "\n" +
            "-\n" + "-\n" + "-\n" + "-\n" + "-\n" + "-\n" + "-\n" + "-\n"
            FisDizayn = FisDizayn.split("İ").join("I").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u");
            
            console.log(FisDizayn)
           
            db.BTYazdir(FisDizayn,UserParam.Sistem,function(pStatus)
            {
                if(pStatus)
                {
                    alertify.alert("<a style='color:#3e8ef7''>" + "Yazdırma İşlemi Gerçekleşti </a>" );
                }
            });
        }
        else if($scope.FisDizaynTip == "1")
        {
            let FisDizayn = "";
            let FisDeger = "";
            let i = 51 - $scope.FisLength.length;
            let Satır = "";
            for(let x = 0; x <= i; x++)
            {    
                Satır += "                                                                   -" + "\n"; 
            }
            FisDeger = FisDeger + "                                " + "\n" 
            FisDeger = FisDeger + SpaceLength($scope.CariAdi.substring(0,61),63) + $scope.Seri + "-" +  $scope.Sira + "\n" + SpaceLength($scope.CariSoyAdi.substring(0,43),45) + SpaceLength($scope.Il.substring(0,16),18) +  $scope.Tarih + "\n" + "                                                               " + $scope.Saat + "\n";
            FisDizayn = "                                             " + "\n" + 
            FisDeger +                                       
            "        " + "\n" + 
            "                                              " + "\n" +
            $scope.FisData + "\n"  
            FisDizayn = FisDizayn + "MIKTAR TOPLAM : " + db.SumColumn($scope.FisLength,"MIKTAR") + "\n" + "                                               ARA TOPLAM     : " +$scope.AraToplam + "\n" +"                                               TOPLAM KDV     : " + parseFloat($scope.ToplamKdv.toFixed(2),7) + "\n" +"                                               TOPLAM INDIRIM : " + $scope.ToplamIndirim + "\n" + "                                               GENEL TOPLAM   : "+ parseFloat($scope.GenelToplam.toFixed(2),7)+"\n" + Satır
            FisDizayn = FisDizayn.split("İ").join("I").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u").split("ı").join("i");
            
            console.log(FisDizayn)
            db.BTYazdir(FisDizayn,UserParam.Sistem,function(pStatus)
            {
                if(pStatus)
                {
                    alertify.alert("<a style='color:#3e8ef7''>" + "Yazdırma İşlemi Gerçekleşti </a>" );         
                }
            });
        }
        else if($scope.FisDizaynTip == "2")
        {
            let FisDizayn = "";
            let FisDeger = "";
            let i = 51 - $scope.FisLength.length;
            let Satır = "";
            for(let x = 0; x <= i; x++)
            {    
                Satır += "                                                                   -" + "\n"; 
            }
            FisDeger = FisDeger + "                                " + "\n" 
            FisDeger = FisDeger + SpaceLength($scope.CariAdi.substring(0,61),63) + $scope.Seri + "-" +  $scope.Sira + "\n" + SpaceLength($scope.CariSoyAdi.substring(0,43),45) + SpaceLength($scope.Il.substring(0,20),25) +  $scope.Tarih + "\n" + "                                                               " + $scope.Saat + "\n";
            FisDizayn = "                                             " + "\n" + 
            FisDeger +                                       
            "        " + "\n" + 
            "STOKKOD              RENK   38-40-42-44-46-48-50-52-54    MIKTAR   BFIYAT  TOPTUTAR" + "\n" +
            "--------------------------------------------------------------------------" + "\n" +
            $scope.FisData  +
            "--------------------------------------------------------------------------" + "\n"
            FisDizayn = FisDizayn + "MIKTAR TOPLAM : " + db.SumColumn($scope.FisLength,"MIKTAR") + "\n" + "                                               ARA TOPLAM     : " +$scope.AraToplam + "\n" +"                                               TOPLAM KDV     : " + parseFloat($scope.ToplamKdv.toFixed(2),7) + "\n" +"                                               TOPLAM INDIRIM : " + $scope.ToplamIndirim + "\n" + "                                               GENEL TOPLAM   : "+ parseFloat($scope.GenelToplam.toFixed(2),7)+"\n" + Satır
            FisDizayn = FisDizayn.split("İ").join("I").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u").split("ı").join("i");
            
            console.log(FisDizayn)
            db.BTYazdir(FisDizayn,UserParam.Sistem,function(pStatus)
            {
                if(pStatus)
                {
                    alertify.alert("<a style='color:#3e8ef7''>" + "Yazdırma İşlemi Gerçekleşti </a>" );         
                }
            });
        }
        else if($scope.FisDizaynTip == "3")
        {
            let FisDizayn = "";
            let FisDeger = "";
            let i = 55 - $scope.FisLength.length;
            let Satır = "";
            for(let x = 0; x <= i; x++)
            {    
                Satır += "                                                                   -" + "\n"; 
            }
            FisDeger = FisDeger + "                                " + "\n" 
            FisDeger = FisDeger + SpaceLength($scope.CariAdi.substring(0,61),63) + $scope.Seri + "-" +  $scope.Sira + "\n" + SpaceLength($scope.CariSoyAdi.substring(0,43),45) + SpaceLength($scope.Il.substring(0,16),18) +  $scope.Tarih + "\n" + "                                                               " + $scope.Saat + "\n";
            FisDizayn = "                                             " + "\n" + 
            FisDeger +                                       
            "        " + "\n" + 
            "STOKKOD              RENK     38-40-42-44-46-48-50-52-54    MIKTAR  " + "\n" +
            "--------------------------------------------------------------------------" + "\n" +
            $scope.FisData + 
            "--------------------------------------------------------------------------" + "\n"  
            FisDizayn = FisDizayn + "MIKTAR TOPLAM : " + db.SumColumn($scope.FisLength,"MIKTAR") + "\n" + Satır
            FisDizayn = FisDizayn.split("İ").join("I").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u").split("ı").join("i");
            
            console.log(FisDizayn)
            db.BTYazdir(FisDizayn,UserParam.Sistem,function(pStatus)
            {
                if(pStatus)
                {
                    alertify.alert("<a style='color:#3e8ef7''>" + "Yazdırma İşlemi Gerçekleşti </a>" );         
                }
            });
        }
        else
        {
            alertify.alert("Reis parametreni kontrol et ya yazamıyorum bir şey")
        }
    }
    $scope.BtnEIrsModalAc = async function()
    {
        if($scope.IrsaliyeListe.length == 0)
        {
            alertify.alert("İrsaliye kayıt etmeden gönderemezsiniz !")
            return;
        }

        $scope.EIrsListe = await db.GetPromiseTag($scope.Firma,'EIrsGetir',[$scope.Seri,$scope.Sira]);

        if($scope.EIrsListe.length == 0)
        {
            $scope.TxtSfrAd = "";
            $scope.TxtSrfSoyAd = "";
            $scope.TxtSfrTckn = "";
            $scope.TxtPlaka = "";      

            $('#MdlEIrsGonder').modal("show");      
        }
        else
        {            
            db.SafeApply($scope,() =>
            {
                $scope.TxtSfrAd = $scope.EIrsListe[0].eir_sofor_adi;
                $scope.TxtSrfSoyAd = $scope.EIrsListe[0].eir_sofor_soyadi;
                $scope.TxtSfrTckn = $scope.EIrsListe[0].eir_sofor_tckn;
                $scope.TxtPlaka = $scope.EIrsListe[0].eir_tasiyici_arac_plaka;    
            });             

            if($scope.EIrsListe[0].eir_uuid == '00000000-0000-0000-0000-000000000000')
            {
                $('#MdlEIrsGonder').modal("show");
            }
            else
            {
                db.EIrsDurum($scope.EIrsListe[0].eir_uuid,(pData) => 
                {
                    if(typeof pData.err != 'undefined')
                    {
                        alertify.alert(pData.err.Message)
                    }
                    if(pData.result.Message == 'Başarılı')
                    {
                        alertify.alert("E-İrsaliye Durumu : " + pData.result.documents[0].Messsage)
                    }
                })
            }
        }

        
    }
    $scope.BtnEIrsKaydet = async function()
    {
        if($scope.TxtSrfSoyAd != '' && $scope.TxtSfrAd != '' && $scope.TxtSfrTckn != '' && $scope.TxtPlaka != '')
        {            
            if($scope.EIrsListe.length == 0)
            {
                let InsertData = 
                [
                    $scope.EvrakTip,
                    3,
                    $scope.Seri,
                    $scope.Sira,
                    '',
                    $scope.TxtPlaka,
                    '',
                    '',
                    $scope.TxtSfrAd,
                    $scope.TxtSrfSoyAd,
                    '',
                    '',
                    $scope.TxtSfrTckn,
                    ''
                ];
    
                await db.ExecutePromiseTag($scope.Firma,'EIrsDetayInsert',InsertData);
            }
            
            let TmpData = await db.GetPromiseTag($scope.Firma,'EIrsSemaGetir',[$scope.Seri,$scope.Sira]);

            if(TmpData.length > 0)
            {
                db.EIrsGonder(TmpData,(pData) =>
                {
                    $('#MdlEIrsGonder').modal("hide");
                    
                    if(typeof pData.err == 'undefined')
                    {
                        if(typeof pData.result.UUID != 'undefined')
                        {
                            db.ExecuteTag($scope.Firma,'EIrsUpdate',[pData.result.UUID,$scope.Seri,$scope.Sira],function(pResult)
                            {                         
                            });
                        }
                        else
                        {
                            alertify.alert("E-Irsaliye gönderilemedi !")
                        }
                    }
                    else
                    {
                        alertify.alert("E-Irsaliye gönderilemedi ! " + pData.err.Message)
                    }
                });
            }
        }
        else
        {
            alert("Lütfen Tüm Alanları Doldurun")           
        }
    }
    $scope.BtnEIrsGoster = async function()
    {                
        if($scope.IrsaliyeListe.length == 0)
        {
            alertify.alert("İrsaliye kayıt etmeden gösteremezsiniz !")
            return;
        }

        $scope.EIrsListe = await db.GetPromiseTag($scope.Firma,'EIrsGetir',[$scope.Seri,$scope.Sira]);
        if($scope.EIrsListe.length == 0)
        {
            alertify.alert("E-İrsaliye göndermeden gösteremezsiniz !")
            return;
        }
        else
        {
            if($scope.EIrsListe[0].eir_uuid == '00000000-0000-0000-0000-000000000000')
            {
                alertify.alert("E-İrsaliye göndermeden gösteremezsiniz !")
                return;
            }

            db.EIrsGoster($scope.EIrsListe[0].eir_uuid,(pData) =>
            {
                let win = window.open("","E-Irsaliye");
                win.document.write(pData);
            })
        }
    }
    $scope.SonSatisGetir = function()
    {
        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query: "SELECT TOP 1 sth_miktar AS MIKTAR " +
                    "FROM STOK_HAREKETLERI WHERE sth_cari_kodu = @CARIKOD and sth_stok_kod = @STOKKOD AND sth_evraktip = @EVRAKTIP ORDER BY sth_create_date DESC ",
            param:  ['CARIKOD','STOKKOD','EVRAKTIP'],
            type:   ['string|25','string|25','int',],
            value:  [$scope.CariKodu,$scope.StokKodu,$scope.EvrakTip]
        }
        db.ExecuteQuery(TmpQuery,function(data)
        {  
            $scope.SonSatisListe = data.result.recordset[0];
            $scope.SonSatisMiktar = $scope.SonSatisListe.MIKTAR
        });
    }
    $scope.BtnTahClick = function()
    {
        let Param =
        {
            "Seri" : $scope.Seri,
            "Sira" : $scope.Sira,
            "CariKodu" : $scope.CariKodu,
            "Tutar" : parseFloat($scope.GenelToplam.toFixed(2))
        }
        localStorage.IrsaliyeParam = JSON.stringify(Param);
    }
    $scope.BtnGonder = function()
    {
        db.GetData($scope.Firma,'StokHareketGonderGetir',[$scope.Tip,$scope.Cins],function(Data)
        {
            $scope.StokHareketGonderListe = Data;
            console.log(Data)
            if($scope.StokHareketGonderListe.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblStokHarListe").jsGrid({data : $scope.StokHareketGonderListe});
                $("#TblStokHarListe").jsGrid({pageIndex: true});
                $("#MdlGonder").modal('show');
            }
            else
            {
                alertify.alert("Evrak Bulunamadı");
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblStokHarListe").jsGrid({data : $scope.StokHareketGonderListe});
                $("#TblStokHarListe").jsGrid({pageIndex: true});
            }   
        });
    }
    $scope.EvrakGonder = async function()
    {
        if(localStorage.mode == 'false')
        {
            let Status = await db.ConnectionPromise()
            if(!Status)
            {
                alertify.okBtn("Tamam");
                alertify.alert("Bağlantı Problemi !");
                return;
            }
            
            for (let i = 0; i < $scope.StokHareketGonderListe.length; i++) 
            {
                let TmpStatus = true
                let TmpStokHarData = await db.GetPromiseTag($scope.Firma,'StokHarGetir',[$scope.StokHareketGonderListe[i].sth_evrakno_seri,$scope.StokHareketGonderListe[i].sth_evrakno_sira,$scope.StokHareketGonderListe[i].sth_tip,0]);
                let TmpBedenData = await db.GetPromiseTag($scope.Firma,'StokBedenHarGetir',[$scope.StokHareketGonderListe[i].sth_evrakno_seri,$scope.StokHareketGonderListe[i].sth_evrakno_sira,$scope.StokHareketGonderListe[i].sth_tip,9]);
                
                localStorage.mode = 'true';
                let TmpMaxSira = await db.GetPromiseTag($scope.Firma,'MaxStokHarSira',[$scope.StokHareketGonderListe[i].sth_evrakno_seri,$scope.StokHareketGonderListe[i].sth_tip,$scope.StokHareketGonderListe[i].sth_cins])
                for (let m = 0; m < TmpStokHarData.length; m++)
                {
                    let InsertData = 
                    [
                        TmpStokHarData[m].sth_create_user,
                        TmpStokHarData[m].sth_lastup_user,
                        TmpStokHarData[m].sth_firmano, //FIRMA NO
                        TmpStokHarData[m].sth_subeno, //ŞUBE NO
                        TmpStokHarData[m].sth_tarih,
                        TmpStokHarData[m].sth_tip,
                        TmpStokHarData[m].sth_cins, //CİNSİ
                        TmpStokHarData[m].sth_normal_iade,
                        TmpStokHarData[m].sth_evraktip,
                        TmpStokHarData[m].sth_evrakno_seri,
                        TmpMaxSira[0].MAXEVRSIRA,
                        TmpStokHarData[m].sth_belge_no,
                        TmpStokHarData[m].sth_belge_tarih,
                        TmpStokHarData[m].sth_stok_kod,
                        TmpStokHarData[m].sth_isk_mas1,
                        TmpStokHarData[m].sth_isk_mas2,
                        TmpStokHarData[m].sth_isk_mas3,
                        TmpStokHarData[m].sth_isk_mas4,
                        TmpStokHarData[m].sth_isk_mas5,
                        TmpStokHarData[m].sth_isk_mas6,
                        TmpStokHarData[m].sth_isk_mas7,
                        TmpStokHarData[m].sth_isk_mas8,
                        TmpStokHarData[m].sth_isk_mas9,
                        TmpStokHarData[m].sth_isk_mas10,
                        TmpStokHarData[m].sth_sat_iskmas1,
                        TmpStokHarData[m].sth_sat_iskmas2,
                        TmpStokHarData[m].sth_sat_iskmas3,
                        TmpStokHarData[m].sth_sat_iskmas4,
                        TmpStokHarData[m].sth_sat_iskmas5,
                        TmpStokHarData[m].sth_sat_iskmas6,
                        TmpStokHarData[m].sth_sat_iskmas7,
                        TmpStokHarData[m].sth_sat_iskmas8,
                        TmpStokHarData[m].sth_sat_iskmas9,
                        TmpStokHarData[m].sth_sat_iskmas10,
                        TmpStokHarData[m].sth_cari_cinsi,
                        TmpStokHarData[m].sth_cari_kodu,
                        TmpStokHarData[m].sth_isemri_gider_kodu,
                        TmpStokHarData[m].sth_plasiyer_kodu,
                        TmpStokHarData[m].sth_har_doviz_cinsi,
                        TmpStokHarData[m].sth_har_doviz_kuru,
                        TmpStokHarData[m].sth_alt_doviz_kuru,
                        TmpStokHarData[m].sth_stok_doviz_cinsi,
                        TmpStokHarData[m].sth_stok_doviz_kuru,
                        TmpStokHarData[m].sth_miktar,
                        TmpStokHarData[m].sth_miktar2,
                        TmpStokHarData[m].sth_birim_pntr,
                        TmpStokHarData[m].sth_tutar,
                        TmpStokHarData[m].sth_iskonto1,
                        TmpStokHarData[m].sth_iskonto2,
                        TmpStokHarData[m].sth_iskonto3,
                        TmpStokHarData[m].sth_iskonto4,
                        TmpStokHarData[m].sth_iskonto5,
                        TmpStokHarData[m].sth_iskonto6,
                        TmpStokHarData[m].sth_masraf1,
                        TmpStokHarData[m].sth_masraf2,
                        TmpStokHarData[m].sth_masraf3,
                        TmpStokHarData[m].sth_masraf4,
                        TmpStokHarData[m].sth_vergi_pntr, 
                        TmpStokHarData[m].sth_vergi, 
                        TmpStokHarData[m].sth_masraf_vergi_pntr,
                        TmpStokHarData[m].sth_masraf_vergi,
                        TmpStokHarData[m].sth_odeme_op,
                        TmpStokHarData[m].sth_aciklama,
                        TmpStokHarData[m].sth_sip_uid,
                        TmpStokHarData[m].sth_fat_uid,
                        TmpStokHarData[m].sth_giris_depo_no,
                        TmpStokHarData[m].sth_cikis_depo_no,
                        TmpStokHarData[m].sth_malkbl_sevk_tarihi,
                        TmpStokHarData[m].sth_cari_srm_merkezi,
                        TmpStokHarData[m].sth_stok_srm_merkezi,
                        TmpStokHarData[m].sth_vergisiz_fl,
                        TmpStokHarData[m].sth_adres_no,
                        TmpStokHarData[m].sth_parti_kodu,
                        TmpStokHarData[m].sth_lot_no,
                        TmpStokHarData[m].sth_proje_kodu,
                        TmpStokHarData[m].sth_exim_kodu,
                        TmpStokHarData[m].sth_disticaret_turu,
                        TmpStokHarData[m].sth_otvvergisiz_fl,
                        TmpStokHarData[m].sth_oivvergisiz_fl,
                        TmpStokHarData[m].sth_fiyat_liste_no,
                        TmpStokHarData[m].sth_nakliyedeposu,
                        TmpStokHarData[m].sth_nakliyedurumu,
                    ];
                    console.log(InsertData)
                    let TmpResult = await db.ExecutePromiseTag($scope.Firma,'StokHarInsert',InsertData)
                    if(typeof(TmpResult.result.err) != 'undefined')
                    {
                        TmpStatus = false;
                    }
                    let TmpBeden = TmpBedenData.find(x => x.BdnHar_Har_uid == TmpStokHarData[m].sth_Guid)
                    if(typeof TmpBeden != 'undefined')
                    {
                        let InsertDataBdn =
                        [
                            TmpBeden.BdnHar_create_user, // KULLANICI
                            TmpBeden.BdnHar_lastup_user, // KULLANICI
                            TmpBeden.BdnHar_Tipi, // BEDEN TİP
                            TmpResult.result.recordset[0].sth_Guid, // GUID
                            TmpBeden.BdnHar_BedenNo, // BEDEN NO
                            TmpBeden.BdnHar_HarGor,  // MİKTAR
                            0, // REZERVASYON MİKTAR
                            0  // REZERVASYON TESLİM MİKTAR
                        ]
                        let TmpBdnResult = await db.ExecutePromiseTag($scope.Firma,'BedenHarInsert',InsertDataBdn)
                        if(typeof(TmpBdnResult.result.err) != 'undefined')
                        {
                            TmpStatus = false;
                        }
                    }
                }
                
                localStorage.mode = 'false';
                if (TmpStatus)
                {
                    await db.GetData($scope.Firma,'StokHareketGonderGetir',[],function(Data)
                    {console.log(Data)});
                    let TmpUpdateQuery = 
                    {
                        db : '{M}.' + $scope.Firma,
                        query: "UPDATE STOKHAR SET status = 1 WHERE sth_evrakno_seri = '@sth_evrakno_seri' AND sth_evrakno_sira = @sth_evrakno_sira AND sth_tip = '@sth_tip' AND sth_cins = '@sth_cins'" ,
                        param:  ['sth_evrakno_seri:string|20','sth_evrakno_sira:int','sth_tip:int','sth_cins:int'],
                        value : [$scope.StokHareketGonderListe[i].sth_evrakno_seri,$scope.StokHareketGonderListe[i].sth_evrakno_sira,$scope.StokHareketGonderListe[i].sth_tip,$scope.StokHareketGonderListe[i].sth_cins]

                    }
                    await db.GetPromiseQuery(TmpUpdateQuery)
                    
                    await db.GetData($scope.Firma,'StokHareketGonderGetir',[],function(Data)
                    {
                        console.log(Data)
                        if(Data.length == 0)
                        {
                            $("#MdlGonder").modal('hide');
                            alertify.alert("Aktarım Tamamlandı!")
                        }
                    });
                }
            }
        }
        else
        {
            alertify.okBtn("Tamam");
            alertify.alert("Bu menü sadece offline mod'da çalışır !");
        }
    }
}