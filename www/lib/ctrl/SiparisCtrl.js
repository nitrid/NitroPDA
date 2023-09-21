function SiparisCtrl($scope,$window,$timeout,db,$filter)
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
        if($scope.RenkListe.length < 0 && $scope.BedenListe.length < 0)
        {
            if($scope.Stok[0].RENK == '' ||  $scope.Stok[0].BEDEN == '')
            {
                $scope.BtnTemizle();
            }
        }
    });
    function Init() 
    {
        gtag('config', 'UA-12198315-14', 
        {
            'page_title' : 'Siparis',
            'page_path': '/Siparis'
        });
        

        $scope.Firma = $window.sessionStorage.getItem('Firma');
        UserParam = Param[$window.sessionStorage.getItem('User')];

        $scope.Seri = "";
        $scope.Sira;
        $scope.ProjeKod = "";
        $scope.EvrakTip = 0;
        $scope.CariKodu = "";  
        $scope.CariAdi = "";
        $scope.CariFiyatListe = 0;
        $scope.CariDovizCinsi = 0;
        $scope.CariDovizKuru = 0;
        $scope.CariAltDovizKuru = 0;
        $scope.CariIskontoKodu = "";     
        $scope.Status = 0;   
        $scope.BelgeNo = "";
        $scope.SatirAciklama = "";
        $scope.DepoNo;
        $scope.DepoAdi;
        $scope.Tarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.Saat = moment(new Date()).format("LTS");
        $scope.TeslimTarihi = moment(new Date()).format("DD.MM.YYYY");
        $scope.Sorumluluk = "";
        $scope.SorumlulukAdi = "";
        $scope.Personel;
        $scope.PersonelAdi;
        $scope.Proje = "";
        $scope.OdemeNo = "0";
        $scope.OdemePlan = "0";
        $scope.Barkod = "";
        $scope.Birim = "1";
        $scope.StokGridTip = "0";
        $scope.StokGridText = "";
        $scope.ToplamSatir = 0;
        $scope.CariBakiye = "";
        $scope.Adres = "";
        $scope.Adres1 = "";
        $scope.Adres2 = "";
        $scope.CariVDADI = "";
        $scope.CariVDNO = "";
        $scope.Fiyat = "";
        $scope.AciklamaTip = 21;
        $scope.AciklamaEvrTip = 0;
        $scope.AciklamaHarTip = 0;
        $scope.EvrakDovizTip = "";
        $scope.Risk = 0;
        $scope.RiskLimit = 0;
        $scope.CheckEvrak = 0;
        $scope.PaketBarkodKontrol = false;
        $scope.PBarkodListe = [];

        $scope.RiskParam = UserParam.Sistem.RiskParam;
        $scope.FisDizaynTip = UserParam.Sistem.FisDizayn;
        $scope.ProjeGetirParam = UserParam[ParamName].ProjeGetir;

        $scope.FiyatListe = [];
        $scope.DepoListe = [];
        $scope.CariListe = [];
        $scope.SorumlulukListe = [];
        $scope.PersonelListe = [];
        $scope.ProjeListe = [];
        $scope.OdemePlanListe = [];
        $scope.SiparisListe = [];
        $scope.BedenHarListe = [];
        $scope.BirimListe = [];
        $scope.StokListe = [];
        $scope.PartiLotListe = [];
        $scope.RenkListe = [];
        $scope.BedenListe = [];
        $scope.DepoMiktarListe = [];
        $scope.StokDurumListe = [];
        $scope.ProjeEvrakGetirListe = [];

        $scope.AciklamaGuid = ''
        $scope.Aciklama1 = ''
        $scope.Aciklama2 = ''
        $scope.Aciklama3 = ''
        $scope.Aciklama4 = ''
        $scope.Aciklama5 = ''

        $scope.AraToplam = 0;
        $scope.ToplamIndirim = 0;
        $scope.NetToplam = 0;
        $scope.ToplamKdv = 0;
        $scope.GenelToplam = 0;

        $scope.Stok = [];
        $scope.Miktar = 1;                

        $scope.CmbCariAra = "0";
        $scope.TxtCariAra = ""; 
        $scope.OtoEkle = false;
        $scope.EvrakLock = false;
        $scope.BarkodLock = false;
        $scope.FiyatLock = false;
        $scope.DepoMiktar = false;

        $scope.IslemListeSelectedIndex = -1;  
        $scope.PartiLotListeSelectedIndex = 0;
        $scope.ProjeEvrakSelectedIndex  = 0;

        $scope.TxtParti = "";
        $scope.TxtLot = 0;
        $scope.SktTarih = new Date().toLocaleDateString();
        $scope.LblPartiLotAlert = "";

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

        $scope.Loading = false;
        $scope.TblLoading = true;
        $scope.IskontoGizle = true;
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
            pageSize: 30,
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
            data : $scope.SiparisListe,
            paging : true,
            pageIndex : true,
            pageSize: 30,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
           
            fields: 
            [
            {
                name: "NO",
                title: "NO",
                type: "number",
                align: "center",
                width: 75
                
            }, 
            {
                name: "sip_stok_kod",
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
                name: "sip_miktar",
                title: "MİKTAR",
                type: "number",
                align: "center",
                width: 100
            }, 
            {
                name: "FIYAT",
                title: "FİYAT",
                type: "number",
                align: "center",
                width: 100
            }, 
            {
                name: "TUTAR",
                title: "TUTAR",
                type: "number",
                align: "center",
                width: 100
            }, 
            {
                name: "sip_iskonto_1",
                title: "IND1",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sip_iskonto_2",
                title: "IND2",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sip_iskonto_3",
                title: "IND3",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sip_iskonto_4",
                title: "IND4",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sip_iskonto_5",
                title: "IND5",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sip_iskonto_6",
                title: "IND6",
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
        ({
            width: "100%",
            height: "auto",
            autoload : true,
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.StokListe,
            paging : true,
            pageSize: 50,

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
            pageSize: 30,
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
    function InitDepoMiktarGrid()
    {
        $("#TblDepoMiktar").jsGrid
        ({
            responsive: true,
            width: "100%",
            height: "150px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            paging: true,
            pageSize: 30,
            data : $scope.DepoMiktarListe,
            fields: [
                {
                    name: "DEPONO",
                    title: "DEPO NO",
                    type: "number",
                    align: "center",
                    width: 75
                }, 
                {
                    name: "DEPOADI",
                    title: "DEPO ADI",
                    type: "text",
                    align: "center",
                    width: 210
                }, 
                {
                    name: "DEPOMIKTAR",
                    title: "DEPO MIKTAR",
                    type: "number",
                    align: "center",
                    width: 200
                } 
            ],
            rowClick: function(args)
            {
                $scope.StokListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitStokDurumGrid()
    {
        $("#TblStokDurum").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.StokDurumListe,
            paging : true,
            pageSize: 30,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
            {
                name: "CARIKODU",
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
                name: "EVRAKTIP",
                title: "SERI",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "TARIH",
                title: "TARIH",
                type: "number",
                align: "center",
                width: 75
            },
            {
                name: "MIKTAR",
                title: "MIKTAR",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "BFIYAT",
                title: "BFIYAT",
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
    function InitStokDepoGrid()
    {
        $("#TblStokDepo").jsGrid
        ({
            responsive: true,
            width: "100%",
            height: "150px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            paging: true,
            pageSize: 30,
            data : $scope.StokListe,
            fields: [
                {
                    name: "KODU",
                    title: "KODU",
                    type: "number",
                    align: "center",
                    width: 75
                }, 
                {
                    name: "DEPOMIKTAR",
                    title: "DEPO MIKTAR",
                    type: "number",
                    align: "center",
                    width: 100
                } 
            ]
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
            pageSize: 30,
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
            pageSize: 30,
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
    function InitSipGrid()
    {
        $("#TblSipListe").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.SiparisGonderListe,
            paging : true,
            pageSize: 30,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
            {
                name: "sip_evrakno_seri",
                title: "SERI",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sip_evrakno_sira",
                title: "SIRA",
                type: "number",
                align: "center",
                width: 75
            },
            {
                name: "sip_musteri_kod",
                title: "CARİ KODU",
                type: "number",
                align: "center",
                width: 150
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
                $scope.$apply();
            }
        });
    }
    function BarkodFocus()
    {
        $timeout( function(){$window.document.getElementById("Barkod").focus();},100);  
    }
    function CariFocus()
    {
        $timeout( function(){$window.document.getElementById("CariFocus").focus();},100);  
    }
    function StokFocus()
    {
        $timeout( function(){$window.document.getElementById("StokFocus").focus();},100);  
    }
    function BedenHarInsert(pGuid)
    {
        let Data =
        [
            UserParam.MikroId, // KULLANICI
            UserParam.MikroId, // KULLANICI
            9, // BEDEN TİP
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
                db.GetData($scope.Firma,'SipBedenHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,9],function(BedenData)
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
    function BedenHarUpdate(pData)
    {
        db.ExecuteTag($scope.Firma,'BedenHarUpdate',pData,function(data)
        {
            if(typeof(data.result.err) == 'undefined')
            {
                db.GetData($scope.Firma,'SipBedenHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,9],function(BedenData)
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
    function DipToplamHesapla()
    {
        $scope.AraToplam = 0;
        $scope.ToplamIndirim = 0;
        $scope.ToplamKdv = 0;
        $scope.NetToplam = 0;
        $scope.GenelToplam = 0;

        angular.forEach($scope.SiparisListe,function(value)
        {
            $scope.AraToplam += value.sip_tutar;
            $scope.ToplamIndirim += (value.sip_iskonto_1 + value.sip_iskonto_2 + value.sip_iskonto_3 + value.sip_iskonto_4 + value.sip_iskonto_5 + value.sip_iskonto_6);
            $scope.ToplamKdv +=  (value.sip_tutar - (value.sip_iskonto_1 + value.sip_iskonto_2 + value.sip_iskonto_3 + value.sip_iskonto_4 + value.sip_iskonto_5 + value.sip_iskonto_6)) * (value.VERGIPNTR / 100);
        });
        $scope.NetToplam = $scope.AraToplam - $scope.ToplamIndirim;
        $scope.GenelToplam = $scope.NetToplam + $scope.ToplamKdv;
    }
    function InsertAfterRefresh(pData)
    {    
        $scope.EvrakLock = true;
        $scope.BarkodLock = false;

        $scope.SiparisListe = pData;
        $("#TblIslem").jsGrid({data : $scope.SiparisListe});     
        $scope.BtnTemizle();
        DipToplamHesapla();
        ToplamMiktarHesapla();

        $window.document.getElementById("Barkod").focus();
    }  
    function InsertData()
    {   
        return new Promise(resolve => 
        {
            var InsertData = 
            [
                UserParam.MikroId,
                UserParam.MikroId,
                0, //FIRMA NO
                0, //ŞUBE NO
                $scope.Tarih,
                $scope.TeslimTarihi,
                $scope.EvrakTip,
                0, //CİNSİ
                $scope.Seri,
                $scope.Sira,
                $scope.BelgeNo,
                $scope.Tarih,
                $scope.Personel,
                $scope.CariKodu,
                $scope.Stok[0].KODU,
                $scope.Stok[0].FIYAT,
                $scope.Miktar * $scope.Stok[0].CARPAN,
                $scope.Stok[0].BIRIMPNTR,
                0, //TESLİM MİKTARI
                $scope.Stok[0].TUTAR,
                $scope.Stok[0].ISK.TUTAR1, //ISKONTO TUTAR 1
                $scope.Stok[0].ISK.TUTAR2, //ISKONTO TUTAR 2
                $scope.Stok[0].ISK.TUTAR3, //ISKONTO TUTAR 3
                $scope.Stok[0].ISK.TUTAR4, //ISKONTO TUTAR 4
                $scope.Stok[0].ISK.TUTAR5, //ISKONTO TUTAR 5
                $scope.Stok[0].ISK.TUTAR6, //ISKONTO TUTAR 6
                $scope.Stok[0].TOPTANVERGIPNTR,
                $scope.Stok[0].KDV,
                $scope.OdemeNo,
                $scope.SatirAciklama, //AÇIKLAMA
                $scope.DepoNo,
                $scope.SipOnayKulNo,
                $scope.Sorumluluk,
                $scope.Sorumluluk,
                $scope.CariDovizCinsi,
                $scope.CariDovizKuru,
                $scope.CariAltDovizKuru,
                1, //ADRES NO
                $scope.Stok[0].ISK.TIP1, //ISKONTO TİP 1
                $scope.Stok[0].ISK.TIP2, //ISKONTO TİP 2
                $scope.Stok[0].ISK.TIP3, //ISKONTO TİP 3
                $scope.Stok[0].ISK.TIP4, //ISKONTO TİP 4
                $scope.Stok[0].ISK.TIP5, //ISKONTO TİP 5
                $scope.Stok[0].ISK.TIP6, //ISKONTO TİP 6
                0, //SATIR ISKONTO TİP 1
                0, //SATIR ISKONTO TİP 2
                0, //SATIR ISKONTO TİP 3
                0, //SATIR ISKONTO TİP 4
                0, //SATIR ISKONTO TİP 5
                0, //SATIR ISKONTO TİP 6
                $scope.Stok[0].PARTI,
                $scope.Stok[0].LOT,
                $scope.Proje,
                $scope.CariFiyatListe,
                0, //REZERVASYON MİKTARI
                0  //REZERVASYON TESLİM MİKTARI
            ];
            console.log(InsertData)
            db.ExecuteTag($scope.Firma,'SiparisInsert',InsertData,function(InsertResult)
            {          
                if(typeof(InsertResult.result.err) == 'undefined')
                {                                   
                    db.GetData($scope.Firma,'SiparisGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,0],function(SiparisData)
                    {
                        if($scope.Stok[0].BEDENPNTR != 0 && $scope.Stok[0].RENKPNTR != 0)
                        {
                            BedenHarInsert(InsertResult.result.recordset[0].sip_Guid);
                        } 
                        
                        InsertAfterRefresh(SiparisData);
                        FisData(SiparisData);  
                        $scope.InsertLock = false;
                        if(UserParam.Sistem.Titresim == 1)
                        {
                            Confirmation();
                        }
                        resolve()
                    });
                }
                else
                {
                    console.log(InsertResult.result.err);
                    $scope.InsertLock = false;
                    resolve()
                }
            });
        })
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
    function UpdateData(pData) 
    {
        console.log(pData.Param)
        db.ExecuteTag($scope.Firma,'SiparisUpdate',pData.Param,function(InsertResult)
        {
            if(typeof(InsertResult.result.err) == 'undefined')
            {
                db.GetData($scope.Firma,'SiparisGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,0],function(SiparisData)
                {
                    if(pData.BedenPntr != 0 && pData.RenkPntr != 0)
                    {
                        let UpdateStatus = false;
                        angular.forEach($scope.BedenHarListe,function(value)
                        {
                            if(value.BdnHar_Har_uid == pData.Guid && value.BdnHar_BedenNo == Kirilim(pData.BedenPntr,pData.RenkPntr))
                            {
                                let Data =
                                [
                                    value.BdnHar_Tipi,      // TİPİ
                                    value.BdnHar_Har_uid,   // Guid
                                    value.BdnHar_BedenNo,   // BEDEN NO
                                    pData.Miktar, // MİKTAR
                                    0, // REZERVASYON MİKTARI
                                    0, // REZERVASYON TESLİM MİKTARI
                                    '', // SERİ
                                    0,  // SIRA
                                    0,  // TİP
                                    0   // SATIRNO
                                ];
                                UpdateStatus = true;
                                BedenHarUpdate(Data);
                            }                            
                        });

                        if(!UpdateStatus)
                        {
                            BedenHarInsert(pData.Guid);
                        }
                    }                        
                    InsertAfterRefresh(SiparisData);
                    FisData(SiparisData);
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
    async function StokBarkodGetir(pBarkod)
    {
        return new Promise(resolve => 
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
                var Uzunluk = Kilo.slice(UserParam.Sistem.KiloBaslangic,((UserParam.Sistem.KiloBaslangic)+(UserParam.Sistem.KiloUzunluk)));
                pBarkod = kBarkod
                $scope.Miktar = (Uzunluk / UserParam.Sistem.KiloCarpan)
            }
            }
            // ----------------------------------------------------
            if(UserParam[ParamName].TedarikcidenSiparis == 1)
            {
                if(pBarkod != '')
                {
                    db.TedarikciStokBarkodGetir($scope.Firma,pBarkod,$scope.DepoNo,$scope.CariKodu,async function(BarkodData)
                    {   
                        if(BarkodData.length > 0)
                        {
                            $scope.Stok = BarkodData;
                            $scope.StokKodu = $scope.Stok[0].KODU;
                            for(i = 0;i < $scope.SiparisListe.length;i++)
                            {   
                                if(UserParam.Sistem.PartiLotKontrol == 1)
                                {
                                    if($scope.Stok[0].PARTI != "" && $scope.Stok[0].LOT != "")
                                    {
                                        if($scope.Stok[0].PARTI == $scope.SiparisListe[i].sip_parti_kodu && $scope.Stok[0].LOT == $scope.SiparisListe[i].sip_lot_no)
                                        {
                                            alertify.alert("<a style='color:#3e8ef7''>" + "Okutmuş Olduğunuz "+ $scope.Stok[0].PARTI + ". " + "Parti " + $scope.Stok[0].LOT + ". " +"Lot Daha Önceden Okutulmuş !" + "</a>" );
                                            $scope.InsertLock = false;
                                            $scope.BtnTemizle();
                                            return;
                                        }
                                    }
                                }
                            }
                            $scope.Stok[0].FIYAT = 0;
                            $scope.Stok[0].TUTAR = 0;
                            $scope.Stok[0].INDIRIM = 0;
                            $scope.Stok[0].ISKONTOKOD = "";
                            $scope.Stok[0].ISK = {ORAN1: 0,ORAN2: 0, ORAN3:0, ORAN4: 0, ORAN5: 0, ORAN6: 0, TUTAR1: 0, TUTAR2: 0, TUTAR3: 0, TUTAR4: 0, TUTAR5: 0, TUTAR6: 0, TIP1: 0, TIP2: 0, TIP3: 0, TIP4: 0, TIP5: 0, TIP6: 0}
                            $scope.Stok[0].KDV = 0;
                            $scope.Stok[0].TOPTUTAR = 0;
        
                            // Fiyat Getir (Stok Detay)
                            var Fiyat = 
                            {
                                db : '{M}.' + $scope.Firma,
                                query : "SELECT TOP 1 " + 
                                        "CASE WHEN (SELECT sfl_kdvdahil FROM STOK_SATIS_FIYAT_LISTE_TANIMLARI WHERE sfl_sirano=sfiyat_listesirano) = 0 THEN " + 
                                        "dbo.fn_StokSatisFiyati(sfiyat_stokkod,sfiyat_listesirano,sfiyat_deposirano,1) " + 
                                        "ELSE " + 
                                        "dbo.fn_StokSatisFiyati(sfiyat_stokkod,sfiyat_listesirano,sfiyat_deposirano,1) / ((SELECT dbo.fn_VergiYuzde ((SELECT TOP 1 sto_toptan_vergi FROM STOKLAR WHERE sto_kod = sfiyat_stokkod)) / 100) + 1) " + 
                                        "END AS FIYAT, " + 
                                        "sfiyat_doviz AS DOVIZ, " + 
                                        "dbo.fn_StokSatisFiyati(sfiyat_stokkod,2,sfiyat_deposirano,1) FIYAT2 " + 
                                        "ISNULL((SELECT dbo.fn_DovizSembolu(ISNULL(sfiyat_doviz,0))),'TL') AS DOVIZSEMBOL, " + 
                                        "ISNULL((SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(sfiyat_doviz,0),2)),1) AS DOVIZKUR, " + 
                                        "sfiyat_iskontokod AS ISKONTOKOD " + 
                                        "FROM STOK_SATIS_FIYAT_LISTELERI " +
                                        "WHERE sfiyat_stokkod = @STOKKODU AND sfiyat_listesirano = @FIYATLISTE AND sfiyat_deposirano IN (0,@DEPONO) " +
                                        "ORDER BY sfiyat_deposirano DESC", 
                                param: ['STOKKODU','FIYATLISTE','DEPONO'],
                                type:  ['string|50','int','int'],
                                value: [$scope.StokKodu,$scope.FiyatListeNo,$scope.DepoNo]
                            }
                            db.GetDataQuery(Fiyat,function(pFiyat)
                            {          
                                console.log(pFiyat[0])
                                $scope.Fiyat2 = pFiyat[0].FIYAT2          
                                $scope.Fiyat = pFiyat[0].FIYAT
                                $scope.Stok[0].DOVIZSEMBOL = pFiyat[0].DOVIZSEMBOL;
                                $scope.SatisFiyatListe2 = (pFiyat.length > 1) ? pFiyat[1].FIYAT : 0;
                            });
                            
                            //Depo Miktar Getir (Stok Detay)
                            var DepoMiktar =
                            {
                                db : '{M}.' + $scope.Firma,
                                query : "SELECT dep_adi DEPOADI,dep_no DEPONO,(SELECT dbo.fn_DepodakiMiktar(@STOKKODU,DEPOLAR.dep_no,GETDATE())) AS DEPOMIKTAR FROM DEPOLAR ",
                                param : ['STOKKODU'],
                                type : ['string|50'],
                                value : [$scope.StokKodu]
                            }
                            db.GetDataQuery(DepoMiktar,function(pDepoMiktar)
                            {   
                                $scope.DepoMiktarListe = pDepoMiktar
                                $("#TblDepoMiktar").jsGrid({data : $scope.DepoMiktarListe});
                            });
                            
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
                                CariIskontoKodu : $scope.CariIskontoKodu,
                                OdemeNo : $scope.OdemeNo,
                                FiyatListe : $scope.FiyatListeNo,
                                DepoNo : $scope.DepoNo,
                                AlisSatis : ($scope.EvrakTip === 0 ? 1 : 0)
                            };
                            await db.FiyatGetir($scope.Firma,BarkodData,FiyatParam,UserParam[ParamName],function()
                            {   
                                $scope.Fiyat = $scope.Stok[0].FIYAT;
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
                                else if (UserParam[ParamName].PartiSec == 1)
                                {
                                    PartiLotEkran();
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

                        }
                        else
                        {   
                            alertify.alert("<a style='color:#3e8ef7''>" + "Stok Bulunamadı ya da Bu Cari Tedarikçisi Değil" + "</a>" );          
                            console.log("Stok Bulunamamıştır.");
                            Beep();
                        }
                    });
                }
            }
            else
            {   
                if(localStorage.mode == 'false')
                {
                    if(pBarkod != '')
                    {
                        db.StokBarkodGetir2($scope.Firma,pBarkod,$scope.DepoNo,async function(BarkodData)
                        {   
                            if(BarkodData.length > 0)
                            {
                                $scope.Stok = BarkodData;
                                $scope.StokKodu = $scope.Stok[0].KODU;
                                for(i = 0;i < $scope.SiparisListe.length;i++)
                                {   
                                    if(UserParam.Sistem.PartiLotKontrol == 1)
                                    {
                                        if($scope.Stok[0].PARTI != "" && $scope.Stok[0].LOT != "")
                                        {
                                            if($scope.Stok[0].PARTI == $scope.SiparisListe[i].sip_parti_kodu && $scope.Stok[0].LOT == $scope.SiparisListe[i].sip_lot_no)
                                            {
                                                alertify.alert("<a style='color:#3e8ef7''>" + "Okutmuş Olduğunuz "+ $scope.Stok[0].PARTI + ". " + "Parti " + $scope.Stok[0].LOT + ". " +"Lot Daha Önceden Okutulmuş !" + "</a>" );
                                                $scope.InsertLock = false;
                                                $scope.BtnTemizle();
                                                return;
                                            }
                                        }
                                    }
                                }
                                $scope.Stok[0].FIYAT = 0;
                                $scope.Stok[0].TUTAR = 0;
                                $scope.Stok[0].INDIRIM = 0;
                                $scope.Stok[0].ISKONTOKOD = "";
                                $scope.Stok[0].ISK = {ORAN1: 0,ORAN2: 0, ORAN3:0, ORAN4: 0, ORAN5: 0, ORAN6: 0, TUTAR1: 0, TUTAR2: 0, TUTAR3: 0, TUTAR4: 0, TUTAR5: 0, TUTAR6: 0, TIP1: 0, TIP2: 0, TIP3: 0, TIP4: 0, TIP5: 0, TIP6: 0}
                                $scope.Stok[0].KDV = 0;
                                $scope.Stok[0].TOPTUTAR = 0;
                                $scope.OdemeNo = $scope.OdemePlan;
                                
                                // Fiyat Getir (Stok Detay)
                                // var Fiyat = 
                                // {
                                //     db : '{M}.' + $scope.Firma,
                                //     query : "SELECT TOP 1 " + 
                                //             "CASE WHEN (SELECT sfl_kdvdahil FROM STOK_SATIS_FIYAT_LISTE_TANIMLARI WHERE sfl_sirano=sfiyat_listesirano) = 0 THEN " + 
                                //             "dbo.fn_StokSatisFiyati(sfiyat_stokkod,sfiyat_listesirano,sfiyat_deposirano,1) " + 
                                //             "ELSE " + 
                                //             "dbo.fn_StokSatisFiyati(sfiyat_stokkod,sfiyat_listesirano,sfiyat_deposirano,1) / ((SELECT dbo.fn_VergiYuzde ((SELECT TOP 1 sto_toptan_vergi FROM STOKLAR WHERE sto_kod = sfiyat_stokkod)) / 100) + 1) " + 
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
                                    
                                //     console.log(pFiyat)
                                //     $scope.Fiyat = pFiyat[0].FIYAT
                                //     $scope.Stok[0].DOVIZSEMBOL = pFiyat[0].DOVIZSEMBOL;
                                //     $scope.SatisFiyatListe2 = (pFiyat.length > 1) ? pFiyat[1].FIYAT : 0;
                                // });
                                
                                // //Depo Miktar Getir (Stok Detay)
                                var DepoMiktar =
                                {
                                    db : '{M}.' + $scope.Firma,
                                    query : "SELECT dep_adi DEPOADI,dep_no DEPONO,(SELECT dbo.fn_DepodakiMiktar(@STOKKODU,DEPOLAR.dep_no,GETDATE())) AS DEPOMIKTAR FROM DEPOLAR ",
                                    param : ['STOKKODU'],
                                    type : ['string|50'],
                                    value : [$scope.StokKodu]
                                }
                                db.GetDataQuery(DepoMiktar,function(pDepoMiktar)
                                {   
                                    console.log(pDepoMiktar)
                                    $scope.DepoMiktarListe = pDepoMiktar
                                    $("#TblDepoMiktar").jsGrid({data : $scope.DepoMiktarListe});
                                });
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
                                        CariIskontoKodu : $scope.CariIskontoKodu,
                                        OdemeNo : $scope.OdemeNo < 0 ? 0 : $scope.OdemeNo,
                                        FiyatListe : $scope.FiyatListeNo,
                                        DepoNo : $scope.DepoNo,
                                        AlisSatis : ($scope.EvrakTip === 0 ? 1 : 0)
                                    };
                                    console.log(FiyatParam,BarkodData)
                                    await db.FiyatGetir($scope.Firma,BarkodData,FiyatParam,UserParam[ParamName], async function()
                                    {   
                                        $scope.Fiyat = $scope.Stok[0].FIYAT;
                                        console.log($scope.OdemeNo)
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
                                    else if (UserParam[ParamName].PartiSec == 1)
                                    {
                                        PartiLotEkran();
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
                else
                {
                    if(pBarkod != '')
                    {
                        db.StokBarkodGetir($scope.Firma,pBarkod,$scope.DepoNo,async function(BarkodData)
                        {   
                            console.log(BarkodData)
                            if(BarkodData.length > 0)
                            {
                                if(BarkodData[0].PAKET != "" && typeof BarkodData[0].PAKET != "undefined")
                                {
                                    console.log([pBarkod,$scope.DepoNo,$scope.FiyatListeNo])
                                    await db.GetData($scope.Firma,'PaketBarkodGetir',[pBarkod,$scope.DepoNo,$scope.FiyatListeNo],async function(PBarkodData)
                                    {
                                        $scope.PBarkodListe = PBarkodData;
                                        console.log(PBarkodData)
                                        if($scope.PBarkodListe.length > 0)
                                        {
                                            $scope.Loading = false;
                                            $scope.TblLoading = true;
                                            $scope.Stok[0] = JSON.parse(JSON.stringify($scope.PBarkodListe[0]));
                                            $scope.Stok[0].FIYAT = 0;
                                            $scope.Stok[0].TUTAR = 0;
                                            $scope.Stok[0].INDIRIM = 0;
                                            $scope.Stok[0].ISK = {ORAN1: 0,ORAN2: 0, ORAN3:0, ORAN4: 0, ORAN5: 0, ORAN6: 0, TUTAR1: 0, TUTAR2: 0, TUTAR3: 0, TUTAR4: 0, TUTAR5: 0, TUTAR6: 0, TIP1: 0, TIP2: 0, TIP3: 0, TIP4: 0, TIP5: 0, TIP6: 0}
                                            $scope.Stok[0].TOPTUTAR = 0;
                                            $scope.Stok[0].KDV = db.SumColumn($scope.PBarkodListe,"KDV")
                                            $scope.Stok[0].FIYAT = $scope.Stok[0].PKTFIYAT;
                                            $scope.Stok[0].BIRIMPNTR = 1;
                                            $scope.Stok[0].BIRIM = 'ADET';
                                            $scope.Stok[0].CARPAN = 1;
                                            
                                            $scope.PaketBarkodKontrol = true;
                                            $scope.MiktarFiyatValid();
                                            
                                            if($scope.OtoEkle == true)
                                            {
                                                // $scope.Insert()
                                            }
                                            else
                                            {
                                                $window.document.getElementById("Miktar").focus();
                                                $window.document.getElementById("Miktar").select();
                                            }
                                        }
                                        else
                                        {
                                            alertify.alert("<a style='color:#3e8ef7''>" + "Stok Bulunamamıştır !" + "</a>" );          
                                            $("#MdlReyonDegisikligi").modal('hide');
                                            Beep();
                                        }
                                    });
                                }
                                else
                                {
                                    $scope.Stok = BarkodData;
                                    console.log(BarkodData)
                                    $scope.StokKodu = $scope.Stok[0].KODU;
                                    for(i = 0;i < $scope.SiparisListe.length;i++)
                                    {   
                                        if(UserParam.Sistem.PartiLotKontrol == 1)
                                        {
                                            if($scope.Stok[0].PARTI != "" && $scope.Stok[0].LOT != "")
                                            {
                                                if($scope.Stok[0].PARTI == $scope.SiparisListe[i].sip_parti_kodu && $scope.Stok[0].LOT == $scope.SiparisListe[i].sip_lot_no)
                                                {
                                                    alertify.alert("<a style='color:#3e8ef7''>" + "Okutmuş Olduğunuz "+ $scope.Stok[0].PARTI + ". " + "Parti " + $scope.Stok[0].LOT + ". " +"Lot Daha Önceden Okutulmuş !" + "</a>" );
                                                    $scope.InsertLock = false;
                                                    $scope.BtnTemizle();
                                                    return;
                                                }
                                            }
                                        }
                                    }
                                    $scope.Stok[0].FIYAT = 0;
                                    $scope.Stok[0].TUTAR = 0;
                                    $scope.Stok[0].INDIRIM = 0;
                                    $scope.Stok[0].ISKONTOKOD = "";
                                    $scope.Stok[0].ISK = {ORAN1: 0,ORAN2: 0, ORAN3:0, ORAN4: 0, ORAN5: 0, ORAN6: 0, TUTAR1: 0, TUTAR2: 0, TUTAR3: 0, TUTAR4: 0, TUTAR5: 0, TUTAR6: 0, TIP1: 0, TIP2: 0, TIP3: 0, TIP4: 0, TIP5: 0, TIP6: 0}
                                    $scope.Stok[0].KDV = 0;
                                    $scope.Stok[0].TOPTUTAR = 0;
                                    $scope.OdemeNo = $scope.OdemePlan;
                                    
                                    // Fiyat Getir (Stok Detay)
                                    var Fiyat = 
                                    {
                                        db : '{M}.' + $scope.Firma,
                                        query : "SELECT TOP 1 " + 
                                                "CASE WHEN (SELECT sfl_kdvdahil FROM STOK_SATIS_FIYAT_LISTE_TANIMLARI WHERE sfl_sirano=sfiyat_listesirano) = 0 THEN " + 
                                                "dbo.fn_StokSatisFiyati(sfiyat_stokkod,sfiyat_listesirano,sfiyat_deposirano,1) " + 
                                                "ELSE " + 
                                                "dbo.fn_StokSatisFiyati(sfiyat_stokkod,sfiyat_listesirano,sfiyat_deposirano,1) / ((SELECT dbo.fn_VergiYuzde ((SELECT TOP 1 sto_toptan_vergi FROM STOKLAR WHERE sto_kod = sfiyat_stokkod)) / 100) + 1) " + 
                                                "END AS FIYAT, " + 
                                                "sfiyat_doviz AS DOVIZ, " + 
                                                "dbo.fn_StokSatisFiyati(sfiyat_stokkod,2,sfiyat_deposirano,1) AS FIYAT2, " + 
                                                "ISNULL((SELECT dbo.fn_DovizSembolu(ISNULL(sfiyat_doviz,0))),'TL') AS DOVIZSEMBOL, " + 
                                                "ISNULL((SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(sfiyat_doviz,0),2)),1) AS DOVIZKUR, " + 
                                                "sfiyat_iskontokod AS ISKONTOKOD " + 
                                                "FROM STOK_SATIS_FIYAT_LISTELERI " +
                                                "WHERE sfiyat_stokkod = @STOKKODU AND sfiyat_listesirano = @FIYATLISTE AND sfiyat_deposirano IN (0,@DEPONO) " +
                                                "ORDER BY sfiyat_deposirano DESC", 
                                        param: ['STOKKODU','FIYATLISTE','DEPONO'],
                                        type:  ['string|50','int','int'],
                                        value: [$scope.StokKodu,$scope.FiyatListeNo,$scope.DepoNo]
                                    }
                                    db.GetDataQuery(Fiyat,function(pFiyat)
                                    {                         
                                        console.log(pFiyat[0])
                                        $scope.Fiyat2 = pFiyat[0].FIYAT2    
                                        $scope.Fiyat = pFiyat[0].FIYAT
                                        $scope.Stok[0].DOVIZSEMBOL = pFiyat[0].DOVIZSEMBOL;
                                        $scope.SatisFiyatListe2 = (pFiyat.length > 1) ? pFiyat[1].FIYAT : 0;
                                    });
                                    
                                    //Depo Miktar Getir (Stok Detay)
                                    var DepoMiktar =
                                    {
                                        db : '{M}.' + $scope.Firma,
                                        query : "SELECT dep_adi DEPOADI,dep_no DEPONO,(SELECT dbo.fn_DepodakiMiktar(@STOKKODU,DEPOLAR.dep_no,GETDATE())) AS DEPOMIKTAR FROM DEPOLAR ",
                                        param : ['STOKKODU'],
                                        type : ['string|50'],
                                        value : [$scope.StokKodu]
                                    }
                                    db.GetDataQuery(DepoMiktar,function(pDepoMiktar)
                                    {   
                                        console.log(pDepoMiktar)
                                        $scope.DepoMiktarListe = pDepoMiktar
                                        console.log($scope.DepoMiktarListe)
                                        $("#TblDepoMiktar").jsGrid({data : $scope.DepoMiktarListe});
                                    });
                                    await db.GetPromiseTag($scope.Firma,'CmbBirimGetir',[BarkodData[0].KODU],function(data)
                                    {   
                                        $scope.BirimListe = data;
                                        $scope.Birim = JSON.stringify($scope.Stok[0].BIRIMPNTR); 
                                        console.log($scope.BirimListe)
                
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
                                        CariIskontoKodu : $scope.CariIskontoKodu,
                                        OdemeNo : $scope.OdemeNo < 0 ? 0 : $scope.OdemeNo,
                                        FiyatListe : $scope.FiyatListeNo,
                                        DepoNo : $scope.DepoNo,
                                        AlisSatis : ($scope.EvrakTip === 0 ? 1 : 0)
                                    };
                                    console.log(FiyatParam,BarkodData)
                                    await db.FiyatGetir($scope.Firma,BarkodData,FiyatParam,UserParam[ParamName], async function()
                                    {   
                                        if($scope.PBarkodListe.length > 0)
                                        {
                                            for (let i = 0; i < $scope.PBarkodListe.length; i++) 
                                            {
                                                console.log($scope.PBarkodListe[i])
                                                console.log($scope.Stok[0].KODU)
                                                if($scope.Stok[0].KODU == $scope.PBarkodListe[i].STOKKODU)
                                                {
                                                    $scope.Stok[0].FIYAT = $scope.PBarkodListe[i].BIRIMFIYAT;
                                                    $scope.Miktar = $scope.PaketMiktar * $scope.PBarkodListe[i].MIKTAR;
                                                    await $scope.MiktarFiyatValid(); 
                                                    return;
                                                }
                                            }
                                        }
                                        else
                                        {
                                            $scope.Fiyat = $scope.Stok[0].FIYAT;
                                            await $scope.MiktarFiyatValid(); 
                                        }
                                        $scope.BarkodLock = true;
                                        $scope.$apply();
                                    });
                                    // db.GetData($scope.Firma,'StokDetayGetir',[$scope.Stok[0].KODU,'',$scope.DepoNo,''],function(StokData)
                                    // {
                                    //     $scope.StokDetayListe = StokData;
                                    //     console.log(StokData)
                                    //     if($scope.StokDetayListe.length > 0)
                                    //     {
                                    //         $scope.Loading = false;
                                    //         $scope.TblLoading = true;
                                    //         $("#TblStokDepo").jsGrid({data : $scope.StokDetayListe});
                                    //         $("#TblStokDepo").jsGrid({pageIndex: true});
                                    //     }
                                    //     else
                                    //     {
                                    //         alertify.alert("Stok Bulunamadı");
                                    //         $scope.Loading = false;
                                    //         $scope.TblLoading = true;
                                    //         $("#TblStokDepo").jsGrid({data : $scope.StokDetayListe});
                                    //         $("#TblStokDepo").jsGrid({pageIndex: true});
                                    //     }
                                    // });
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
                                        else if (UserParam[ParamName].PartiSec == 1)
                                        {
                                            PartiLotEkran();
                                        }
                                    }
                                    if($scope.OtoEkle == true)
                                    {
                                        $scope.Insert()
                                        resolve()
                                    }
                                    else
                                    {
                                        $window.document.getElementById("Miktar").focus();
                                        $window.document.getElementById("Miktar").select();
                                        resolve()
                                    }
                                }
                            }
                            else
                            {   
                                //STOKTA OLMADIĞI İÇİN PAKETTE VAR MI DİYE KONTROL EDİYOR
                                await db.GetData($scope.Firma,'PaketBarkodGetir',[pBarkod,$scope.DepoNo,$scope.FiyatListeNo],async function(PBarkodData)
                                {
                                    $scope.PBarkodListe = PBarkodData;
                                    console.log($scope.PBarkodListe)
                                    if ($scope.PBarkodListe.length > 0) //PAKETTE OKUTMUŞ OLDUĞU KODDAN VAR İSE
                                    {
                                        $scope.Loading = false;
                                        $scope.TblLoading = true;
                                        $scope.Stok[0] = JSON.parse(JSON.stringify($scope.PBarkodListe[0]));
                                        $scope.Stok[0].FIYAT = 0;
                                        $scope.Stok[0].TUTAR = 0;
                                        $scope.Stok[0].INDIRIM = 0;
                                        $scope.Stok[0].ISK = {ORAN1: 0,ORAN2: 0, ORAN3:0, ORAN4: 0, ORAN5: 0, ORAN6: 0, TUTAR1: 0, TUTAR2: 0, TUTAR3: 0, TUTAR4: 0, TUTAR5: 0, TUTAR6: 0, TIP1: 0, TIP2: 0, TIP3: 0, TIP4: 0, TIP5: 0, TIP6: 0}
                                        $scope.Stok[0].TOPTUTAR = 0;
                                        $scope.Stok[0].KDV = db.SumColumn($scope.PBarkodListe,"KDV")
                                        $scope.Stok[0].FIYAT = $scope.Stok[0].PKTFIYAT;
                                        $scope.Stok[0].BIRIMPNTR = 1;
                                        $scope.Stok[0].BIRIM = 'ADET';
                                        $scope.Stok[0].CARPAN = 1;
                                        
                                        $scope.PaketBarkodKontrol = true;
                                        $scope.MiktarFiyatValid(); 
            
                                        if($scope.OtoEkle == true)
                                        {
                                            // $scope.Insert()
                                        }
                                        else
                                        {
                                            $window.document.getElementById("Miktar").focus();
                                            $window.document.getElementById("Miktar").select();
                                        }
                                    }
                                    else
                                    {
                                        alertify.alert("<a style='color:#3e8ef7''>" + "Stok Bulunamamıştır !" + "</a>" );          
                                        $("#MdlReyonDegisikligi").modal('hide');
                                        Beep();
                                    }
                                });
                            }
                        });
                    }
                }
            }
        })
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
    function ToplamMiktarHesapla()
    {
        $scope.ToplamSatir = 0;

        angular.forEach($scope.SiparisListe,function(value)
        {
            $scope.ToplamSatir += 1 ;
        });
    }
    function FisData(pData)
    {
        $scope.FisLength = pData;
        if($scope.FisDizaynTip = "0")
        {
            $scope.FisBilgiText = "";
            $scope.FisBilgi = "";
           try 
           {
            $scope.FisDeger = "";
            $scope.FisData = "";

            $scope.FisDeger = SpaceLength($scope.CariKodu,35) + $scope.Seri + "-" + $scope.Sira + "\n" + SpaceLength($scope.CariAdi,35) + $scope.Tarih +"\n" + "Adres: " +SpaceLength($scope.Adres1,28) + $scope.Saat + "\n"  + "Adres2: " + SpaceLength($scope.Adres2,40) + "\n" + SpaceLength($scope.Adres,40) + "\n" +"Vergi Dairesi: "+SpaceLength($scope.CariVDADI,45) + "\n" + "Vergi No: "+ $scope.CariVDNO

            for(let i=0; i < pData.length; i++)
            {
                console.log(pData[i])
                $scope.FisData = $scope.FisData +  SpaceLength(pData[i].ADI,19) + "   " + SpaceLength(pData[i].sip_miktar,4) + SpaceLength(pData[i].BIRIMADI,6) + SpaceLength(parseFloat(pData[i].FIYAT.toFixed(2)),6) + " " + SpaceLength(parseFloat(pData[i].sip_tutar.toFixed(2)),8) + "\n";
                console.log(pData[i].sip_tutar)
            } 
           } 
           catch (error) 
           {
               console.log(error)
           }
        }
        else if($scope.FisDizaynTip == "1")
        {
            try 
            {
                $scope.FisDeger = "";
                $scope.FisData = "";
    
                $scope.FisDeger = SpaceLength($scope.CariKodu,35) + $scope.Seri + "-" + $scope.Sira + "\n" + SpaceLength($scope.CariAdi,35) + $scope.Tarih +"\n" + "Adres: " +SpaceLength($scope.Adres1,28) + $scope.Saat + "\n"  + "Adres2: " + SpaceLength($scope.Adres2,40) + "\n" + SpaceLength($scope.Adres,40) + "\n" +"Vergi Dairesi: "+SpaceLength($scope.CariVDADI,45) + "\n" + "Vergi No: "+ $scope.CariVDNO
                console.log(pData)
                for(let i=0; i < pData.length; i++)
                {
                    $scope.FisData = $scope.FisData +  SpaceLength(pData[i].ADI,25) + " " + SpaceLength(pData[i].BIRIM,4) + SpaceLength(pData[i].BIRIMADI,6) + SpaceLength(parseFloat(pData[i].FIYAT,2),6) + SpaceLength(parseFloat(pData[i].sip_tutar,2),5) + "\n";
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
        try 
        {
            let x = pLength - pData.toString().length;

            if(pData.toString().length > pLength)
            {
                pData = pData.substring(0,pLength);
            }

            Space = "";

            for(let i=0; i < x; i++)
            {
                Space = Space + " ";
            }

            return pData + Space
        
        } 
        catch (error) 
        {
            console.log(error)
        }
    }
    function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
    }
    $scope.PDFSave = function()
    {
        // /**
        // * Convert a base64 string in a Blob according to the data and contentType.
        // * 
        // * @param b64Data {String} Pure base64 string without contentType
        // * @param contentType {String} the content type of the file i.e (application/pdf - text/plain)
        // * @param sliceSize {Int} SliceSize to process the byteCharacters
        // * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
        // * @return Blob
        // */
        if (window.cordova && cordova.platformId !== "browser") 
        {
            document.addEventListener("deviceready", function () 
            {
                // var storageLocation = cordova.file.externalRootDirectory  + "download/";
                // var blob = Jhxlsx.getBlob(RaporListeData,options);

                switch (cordova.platform) 
                {
                    case "Android":
                      storageLocation = cordova.file.externalRootDirectory  + "download/";
                      break;
            
                    case "iOS":
                      storageLocation = cordova.file.documentsDirectory;
                      break;
                }
                // The base64 content
                var myBase64 = "JVBERi0xLjcKCjE....";
                // Define the mimetype of the file to save, in this case a PDF
                var contentType = "application/pdf";
                // The path where the file will be saved

                var folderpath = "file:///storage/emulated/0/download/";
                $scope.Base64DataLong = 'data:' + contentType + ';' + 'base64,' + $scope.Base64Data
                // The name of your file
                var filename = "Siparis" + $scope.CariKodu + '-' + $scope.Tarih + ".pdf";
                alertify.alert(folderpath,filename,$scope.Base64Data,contentType);
                $scope.savebase64AsPDF(folderpath,filename,$scope.Base64Data,contentType);
            });
        }
    }
    $scope.savebase64AsPDF = function(folderpath,filename,content,contentType)
    {
        // Convert the base64 string in a Blob
        var DataBlob = b64toBlob(content,contentType);

        console.log("Starting to write the file :3");

        window.resolveLocalFileSystemURL(folderpath, function(dir) {
            console.log("Access to the directory granted succesfully");
            dir.getFile(filename, {create:true}, function(file) {
                console.log("File created succesfully.");
                alertify.alert("File created succesfully.")
                file.createWriter(function(fileWriter) {
                    console.log("Writing content to file");
                    fileWriter.write(DataBlob);
                }, function(){
                    alert('Unable to save file in path '+ folderpath);
                });
            });
        });
    }
    $scope.PDFShareButton = function()
    {
        // this is the complete list of currently supported params you can pass to the plugin (all optional)
        var options = {
            message: '', // not supported on some apps (Facebook, Instagram)
            subject: 'Siparis', // fi. for email
            files: [$scope.Base64DataLong], // an array of filenames either locally or remotely
        };
        
        
        var onSuccess = function(result) {
            console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
            console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
        };
        
        var onError = function(msg) {
            console.log("Sharing failed with message: " + msg);
        };
        console.log(options)
        if (window.cordova && cordova.platformId !== "browser") 
        {
            document.addEventListener("deviceready", function () 
            {
                // var storageLocation = cordova.file.externalRootDirectory  + "download/";
                // var blob = Jhxlsx.getBlob(RaporListeData,options);

                switch (cordova.platform) 
                {
                    case "Android":
                      storageLocation = cordova.file.externalRootDirectory  + "download/";
                      break;
            
                    case "iOS":
                      storageLocation = cordova.file.documentsDirectory;
                      break;
                }
                window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
            });
        }
        // window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
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
                Adi = Adi + '%'
            }
            else
            {
                Kodu = $scope.TxtCariAra.replace("*","%").replace("*","%");
                Kodu = Kodu + '%'
            }
        }
        
        db.GetData($scope.Firma,'CariListeGetir',[Kodu,Adi,UserParam.Sistem.PlasiyerKodu],function(data)
        {
            console.log(Kodu,Adi,UserParam.Sistem.PlasiyerKodu)
            $scope.CariListe = data;
            if($scope.CariListe.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblCari").jsGrid({data : $scope.CariListe});  
                $("#TblCari").jsGrid({pageIndex: true})
                CariFocus();
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
    $scope.BtnRenkBedenSec = function()
    {
        if($scope.RenkListe != "")
        {
            $scope.Stok[0].RENK = $.grep($scope.RenkListe, function (Item) 
            {   
                return Item.PNTR == $scope.Stok[0].RENKPNTR;
            })[0].KIRILIM;
        }
        else
        {
            $scope.Stok[0].RENKPNTR = "1";
        }
        if($scope.BedenListe != "")
        {   
            $scope.Stok[0].BEDEN = $.grep($scope.BedenListe, function (Item) 
            {
                return Item.PNTR == $scope.Stok[0].BEDENPNTR;
            })[0].KIRILIM;
        }
        else
        {
            $scope.Stok[0].BEDENPNTR = "1";
        }

        $('#MdlRenkBeden').modal('hide');

        PartiLotEkran();
    }
    $scope.BtnPartiLotSec = function()
    {   
        $scope.Stok[0].PARTI = $scope.PartiLotListe[$scope.PartiLotListeSelectedIndex].PARTI;
        $scope.Stok[0].LOT = $scope.PartiLotListe[$scope.PartiLotListeSelectedIndex].LOT;

        $scope.TxtParti = $scope.PartiLotListe[$scope.PartiLotListeSelectedIndex].PARTI;
        $scope.TxtLot = $scope.PartiLotListe[$scope.PartiLotListeSelectedIndex].LOT;
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
                        '',
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
    $scope.BtnStokGridGetir = function()
    {
        $scope.Loading = true;
        $scope.TblLoading = false;
        let Kodu = '';
        let Adi = '';

        if($scope.StokGridTip == "1")
        {   
            Kodu = $scope.StokGridText.replace("*","%").replace("*","%");
            Kodu = Kodu + '%';
        }
        else
        {
            Adi = $scope.StokGridText.replace("*","%").replace("*","%");
            Adi = Adi + '%';
        }

        if(UserParam[ParamName].TedarikcidenSiparis == 1)
        {
            console.log(localStorage.mode)
            db.GetData($scope.Firma,'StokAnaSaglayiciGetir',[Kodu,Adi,$scope.DepoNo,'',$scope.CariKodu],function(StokData)
            {
                $scope.StokListe = StokData;
                if($scope.StokListe.length > 0)
                {
                    $scope.Loading = false;
                    $scope.TblLoading = true;
                    $("#TblStok").jsGrid({data : $scope.StokListe});
                    $("#TblStok").jsGrid({pageIndex: true});
                }
                else
                {
                    alertify.alert("Stok Bulunamadı")
                    $scope.Loading = false;
                    $scope.TblLoading = true;
                    $("#TblStok").jsGrid({data : $scope.StokListe});
                    $("#TblStok").jsGrid({pageIndex: true});
                }   
            });
        }
        else
        {
            console.log(localStorage.mode)
            if(localStorage.mode == 'false')
            {
                db.GetData($scope.Firma,'StokGetir2',[Kodu,Adi,$scope.DepoNo,''],function(StokData)
                {
                    $scope.StokListe = StokData;
                    if($scope.StokListe.length > 0)
                    {
                        $scope.Loading = false;
                        $scope.TblLoading = true;
                        $("#TblStok").jsGrid({data : $scope.StokListe});
                        $("#TblStok").jsGrid({pageIndex: true});
                    }
                    else
                    {
                        alertify.alert("Stok Bulunamadı");
                        $scope.Loading = false;
                        $scope.TblLoading = true;
                        $("#TblStok").jsGrid({data : $scope.StokListe});
                        $("#TblStok").jsGrid({pageIndex: true});
                    }   
                });
            }
            else
            {
                db.GetData($scope.Firma,'StokGetir',[Kodu,Adi,$scope.DepoNo,''],function(StokData)
                {
                    $scope.StokListe = StokData;
                    console.log(StokData)
                    if($scope.StokListe.length > 0)
                    {
                        $scope.Loading = false;
                        $scope.TblLoading = true;
                        $("#TblStok").jsGrid({data : $scope.StokListe});
                        $("#TblStok").jsGrid({pageIndex: true});
                    }
                    else
                    {
                        alertify.alert("Stok Bulunamadı");
                        $scope.Loading = false;
                        $scope.TblLoading = true;
                        $("#TblStok").jsGrid({data : $scope.StokListe});
                        $("#TblStok").jsGrid({pageIndex: true});
                    }   
                });
            }
        }
        StokFocus();
    }
    $scope.BtnStokGridSec = function()
    {
        $("#MdlStokGetir").modal('hide');
        StokBarkodGetir($scope.Barkod);
        $scope.BtnStokGridGetir();
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
    $scope.BtnStokBarkodGetir = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            StokBarkodGetir($scope.Barkod);  
        }
    }
    $scope.BtnBarkodGetirClick = function()
    {
        StokBarkodGetir($scope.Barkod);
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
        $scope.Fiyat = 0;
        $scope.Miktar = 1;
        $scope.BarkodLock = false;
        $scope.SatirAciklama = "";

        $scope.BirimListe = [];
        BarkodFocus();      
    }
    $scope.BtnDuzenle = function()
    {
        $scope.MiktarEdit = $scope.SiparisListe[$scope.IslemListeSelectedIndex].sip_miktar;
        $scope.FiyatEdit = $scope.SiparisListe[$scope.IslemListeSelectedIndex].sip_b_fiyat;

        $("#MdlDuzenle").modal('show');
    }
    $scope.BtnDuzenleKaydet = function(pIndex)
    {
        let TmpTutar = $scope.FiyatEdit * $scope.MiktarEdit;
        let TmpYuzde1 = $scope.SiparisListe[pIndex].sip_iskonto_1 / $scope.SiparisListe[pIndex].sip_tutar; 
        let TmpYuzde2 = $scope.SiparisListe[pIndex].sip_iskonto_2 / ($scope.SiparisListe[pIndex].sip_tutar - $scope.SiparisListe[pIndex].sip_iskonto_1); 
        let TmpYuzde3 = $scope.SiparisListe[pIndex].sip_iskonto_3 / ($scope.SiparisListe[pIndex].sip_tutar - ($scope.SiparisListe[pIndex].sip_iskonto_1 + $scope.SiparisListe[pIndex].sip_iskonto_2));
        let TmpYuzde4 = $scope.SiparisListe[pIndex].sip_iskonto_4 / ($scope.SiparisListe[pIndex].sip_tutar - ($scope.SiparisListe[pIndex].sip_iskonto_1 + $scope.SiparisListe[pIndex].sip_iskonto_2 + $scope.SiparisListe[pIndex].sip_iskonto_3));
        let TmpYuzde5 = $scope.SiparisListe[pIndex].sip_iskonto_5 / ($scope.SiparisListe[pIndex].sip_tutar - ($scope.SiparisListe[pIndex].sip_iskonto_1 + $scope.SiparisListe[pIndex].sip_iskonto_2 + $scope.SiparisListe[pIndex].sip_iskonto_3 + $scope.SiparisListe[pIndex].sip_iskonto_4));

        $scope.SiparisListe[pIndex].sip_iskonto_1 = TmpTutar * TmpYuzde1;
        $scope.SiparisListe[pIndex].sip_iskonto_2 = (TmpTutar - $scope.SiparisListe[pIndex].sip_iskonto_1) * TmpYuzde2;
        $scope.SiparisListe[pIndex].sip_iskonto_3 = (TmpTutar - ($scope.SiparisListe[pIndex].sip_iskonto_1 + $scope.SiparisListe[pIndex].sip_iskonto_2)) * TmpYuzde3;
        $scope.SiparisListe[pIndex].sip_iskonto_4 = (TmpTutar- ($scope.SiparisListe[pIndex].sip_iskonto_1 + $scope.SiparisListe[pIndex].sip_iskonto_2 + $scope.SiparisListe[pIndex].sip_iskonto_3)) * TmpYuzde4;
        $scope.SiparisListe[pIndex].sip_iskonto_5 = (TmpTutar - ($scope.SiparisListe[pIndex].sip_iskonto_1 + $scope.SiparisListe[pIndex].sip_iskonto_2 + $scope.SiparisListe[pIndex].sip_iskonto_3 + $scope.SiparisListe[pIndex].sip_iskonto_4)) * TmpYuzde5;

        $scope.Update(pIndex);
        angular.element('#MdlDuzenle').modal('hide');
    }
    $scope.BtnIskontoKaydet = function()
    {   
        if($scope.IskontoTip == 0)
        {   
            for(i = 0;i < $scope.SiparisListe.length;i++)
            {
                $scope.SiparisListe[i].sip_iskonto_1 = $scope.SiparisListe[i].sip_tutar * ($scope.IskYuzde1 / 100);
                $scope.SiparisListe[i].sip_iskonto_2 = ($scope.SiparisListe[i].sip_tutar - $scope.SiparisListe[i].sip_iskonto_1) * ($scope.IskYuzde2 / 100);
                $scope.SiparisListe[i].sip_iskonto_3 = ($scope.SiparisListe[i].sip_tutar - ($scope.SiparisListe[i].sip_iskonto_1 + $scope.SiparisListe[i].sip_iskonto_2)) * ($scope.IskYuzde3 / 100);
                $scope.SiparisListe[i].sip_iskonto_4 = ($scope.SiparisListe[i].sip_tutar - ($scope.SiparisListe[i].sip_iskonto_1 + $scope.SiparisListe[i].sip_iskonto_2 + $scope.SiparisListe[i].sip_iskonto_3)) * ($scope.IskYuzde4 / 100);
                $scope.SiparisListe[i].sip_iskonto_5 = ($scope.SiparisListe[i].sip_tutar - ($scope.SiparisListe[i].sip_iskonto_1 + $scope.SiparisListe[i].sip_iskonto_2 + $scope.SiparisListe[i].sip_iskonto_3 + $scope.SiparisListe[i].sip_iskonto_4)) * ($scope.IskYuzde5 / 100);

                $scope.FiyatEdit = $scope.SiparisListe[i].sip_b_fiyat;
                $scope.MiktarEdit = $scope.SiparisListe[i].sip_miktar;
                console.log($scope.SiparisListe[i])
                $scope.Update(i);
            }
        }
        else
        {
            let i = $scope.IslemListeSelectedIndex;

            $scope.SiparisListe[i].sip_iskonto_1 = $scope.SiparisListe[i].sip_tutar * ($scope.IskYuzde1 / 100);
            $scope.SiparisListe[i].sip_iskonto_2 = ($scope.SiparisListe[i].sip_tutar - $scope.SiparisListe[i].sip_iskonto_1) * ($scope.IskYuzde2 / 100);
            $scope.SiparisListe[i].sip_iskonto_3 = ($scope.SiparisListe[i].sip_tutar - ($scope.SiparisListe[i].sip_iskonto_1 + $scope.SiparisListe[i].sip_iskonto_2)) * ($scope.IskYuzde3 / 100);
            $scope.SiparisListe[i].sip_iskonto_4 = ($scope.SiparisListe[i].sip_tutar - ($scope.SiparisListe[i].sip_iskonto_1 + $scope.SiparisListe[i].sip_iskonto_2 + $scope.SiparisListe[i].sip_iskonto_3)) * ($scope.IskYuzde4 / 100);
            $scope.SiparisListe[i].sip_iskonto_5 = ($scope.SiparisListe[i].sip_tutar - ($scope.SiparisListe[i].sip_iskonto_1 + $scope.SiparisListe[i].sip_iskonto_2 + $scope.SiparisListe[i].sip_iskonto_3 + $scope.SiparisListe[i].sip_iskonto_4)) * ($scope.IskYuzde5 / 100);
            $scope.FiyatEdit = $scope.SiparisListe[i].sip_b_fiyat;
            $scope.MiktarEdit = $scope.SiparisListe[i].sip_miktar;

            $scope.Update(i);
        }

        $("#MdlIskontoEkran").modal('hide');
    }
    $scope.BtnOnlineYazdir = function()
    {   
        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "UPDATE SIPARISLER SET sip_special1 = @sip_special1,sip_special2 = 1 " +
                    "WHERE sip_evrakno_seri = @sip_evrakno_seri AND sip_evrakno_sira = @sip_evrakno_sira AND sip_tip = @sip_tip ",
            param:  ['sip_special1','sip_evrakno_seri','sip_evrakno_sira','sip_tip'],
            type:   ['string|25','string|25','int','int',],
            value:  [$scope.Special,$scope.Seri,$scope.Sira,$scope.EvrakTip]
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
    $scope.YeniEvrak = async function (pAlinanVerilen)
    {
        //ALINAN = 0 VERİLEN = 1
        if(pAlinanVerilen == 0)
            ParamName = "AlinanSiparis";
        else
            ParamName = "VerilenSiparis";

        Init();
        InitCariGrid();
        InitIslemGrid();
        InitStokGrid();
        InitPartiLotGrid();
        InitDepoMiktarGrid();
        InitStokDepoGrid();
        InitProjeEvrakGetirGrid();
        InitDizaynGrid();
        InitSipGrid();
        InitStokDurumGrid();
        
        $scope.EvrakLock = false;
        $scope.Seri = UserParam[ParamName].Seri;
        $scope.BelgeNo = UserParam[ParamName].BelgeNo;
        $scope.EvrakTip = pAlinanVerilen;
        $scope.CariKodu = UserParam[ParamName].Cari;
        $scope.Special = UserParam[ParamName].Special;

        if(pAlinanVerilen == 0)
        $scope.PersonelTip = "0";
        else
        $scope.PersonelTip= "1"
        console.log(UserParam[ParamName])
        if(UserParam[ParamName].IskontoGizle == "1")
        {
            $scope.IskontoGizle = false;
        }
        if(UserParam[ParamName].FiyatLock == 1)
        {
            $scope.FiyatLock = true;
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
            db.GetData($scope.Firma,'CariGetir',[$scope.CariKodu,'',UserParam.Sistem.PlasiyerKodu],function(data)
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
            $scope.FiyatListeNo = UserParam[ParamName].FiyatListe;
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
        db.FillCmbDocInfo($scope.Firma,'CmbProjeGetir',function(data){$scope.ProjeListe = data; console.log(data); $scope.Proje = UserParam[ParamName].Proje});
        db.FillCmbDocInfo($scope.Firma,'CmbOdemePlanGetir',function(data){$scope.OdemePlanListe = data; $scope.OdemeNo = $scope.OdemePlan;});
        
        if(localStorage.mode == 'true')
        {
            console.log([$scope.Seri,$scope.EvrakTip,0])
            await db.MaxSiraPromiseTag($scope.Firma,'MaxSiparisSira',[$scope.Seri,$scope.EvrakTip,0],function(data)
            {
                $scope.Sira = data
            });
        }
        else
        {
            await db.GetPromiseTag($scope.Firma,'ParamGetir',[],function(data)
            {
                console.log(data)
                $scope.Sira = data[0].ALINAN_SIPARIS_SIRA + 1
                db.MaxSiraPromiseTag($scope.Firma,'MaxSiparisSira',[$scope.Seri,$scope.EvrakTip,0],function(SiraData)
                {
                    if(SiraData >= $scope.Sira)
                    {
                        $scope.Sira = SiraData;
                    }
                });
            });
        }

        if(UserParam.AlinanSiparis.SiparisOnay == "0")
        {
            $scope.SipOnayKulNo = 0;
        }
        else
        {
           $scope.SipOnayKulNo = UserParam.MikroId
        }
        if(UserParam[ParamName].ProjeGetir == 1)
        {
            console.log($scope.CheckEvrak)
            $scope.ProjeEvrakGetirModal($scope.CheckEvrak);
        }
        BarkodFocus();
    }
    $scope.StokDetayClick = async function()
    {
        await db.GetPromiseTag($scope.Firma,'StokDetay',[$scope.CariKodu,$scope.Stok[0].KODU],function(Data) //STOK DETAY
        {   
            $scope.StokDetay = Data;
            console.log(Data)
        });
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
    $scope.MiktarFiyatValid = function()
    {
        return new Promise(resolve => 
        {
            $scope.Stok[0].INDIRIM = 0;
        
            $scope.Stok[0].TUTAR = ($scope.Stok[0].CARPAN * $scope.Miktar) * $scope.Stok[0].FIYAT;
            $scope.Stok[0].ISK.TUTAR1 = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].ISK.ORAN1 / 100);
            $scope.Stok[0].ISK.TIP1 = $scope.Stok[0].ISK.TUTAR1 === 0 ? 0 : 1; 
            $scope.Stok[0].INDIRIM = $scope.Stok[0].INDIRIM + (($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].ISK.ORAN1 / 100));       
            
            $scope.Stok[0].ISK.TUTAR2 = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].ISK.ORAN2 / 100);
            $scope.Stok[0].ISK.TIP2 = $scope.Stok[0].ISK.TUTAR2 === 0 ? 0 : 1;
            $scope.Stok[0].INDIRIM = $scope.Stok[0].INDIRIM + (($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].ISK.ORAN2 / 100));
            
            $scope.Stok[0].ISK.TUTAR3 = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].ISK.ORAN3 / 100);
            $scope.Stok[0].ISK.TIP3 = $scope.Stok[0].ISK.TUTAR3 === 0 ? 0 : 1;
            $scope.Stok[0].INDIRIM = $scope.Stok[0].INDIRIM + (($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].ISK.ORAN3 / 100));
            
            $scope.Stok[0].ISK.TUTAR4 = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].ISK.ORAN4 / 100);
            $scope.Stok[0].ISK.TIP4 = $scope.Stok[0].ISK.TUTAR4 === 0 ? 0 : 1;
            $scope.Stok[0].INDIRIM = $scope.Stok[0].INDIRIM + (($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].ISK.ORAN4 / 100));
            
            $scope.Stok[0].ISK.TUTAR5 = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].ISK.ORAN5 / 100);
            $scope.Stok[0].ISK.TIP5 = $scope.Stok[0].ISK.TUTAR5 === 0 ? 0 : 1;
            $scope.Stok[0].INDIRIM = $scope.Stok[0].INDIRIM + (($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].ISK.ORAN5 / 100));
            
            $scope.Stok[0].ISK.TUTAR6 = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].ISK.ORAN6 / 100);
            $scope.Stok[0].ISK.TIP6 = $scope.Stok[0].ISK.TUTAR6 === 0 ? 0 : 1;
            $scope.Stok[0].INDIRIM = $scope.Stok[0].INDIRIM + (($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].ISK.ORAN6 / 100));

            if($scope.PaketBarkodKontrol == false)
            {
                $scope.Stok[0].KDV = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].TOPTANVERGI / 100);
            }
            else
            {
                let StokKDV = 0;
                let PaketTutar;
                if($scope.PBarkodListe.length > 0)
                {
                    for (let i = 0; i < $scope.PBarkodListe.length; i++)
                    {
                        console.log($scope.PBarkodListe[i].TUTAR)
                        PaketTutar = ($scope.Stok[0].CARPAN * $scope.Miktar) * $scope.PBarkodListe[i].TUTAR;
                        StokKDV += PaketTutar * ($scope.PBarkodListe[i].VERGI / 100);
                    }
                    $scope.Stok[0].KDV = StokKDV;
                }
                else
                {
                    $scope.Stok[0].KDV = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].TOPTANVERGI / 100);
                }
                console.log($scope.Stok[0].KDV)
            }
            $scope.Stok[0].TOPTUTAR = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) + $scope.Stok[0].KDV;
            $scope.Stok[0].TOPTANVERGIPNTR = 0;
            resolve()
        })
    }
    $scope.CariListeRowClick = function(pIndex,pItem,pObj)
    {    
        if ( CariSelectedRow ) { CariSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        CariSelectedRow = $row;
        console.log($scope.CariListe[pIndex])
        $scope.CariKodu = $scope.CariListe[pIndex].KODU;
        $scope.CariAdi = $scope.CariListe[pIndex].UNVAN1;
        $scope.CariFiyatListe = $scope.CariListe[pIndex].SATISFK;      
        $scope.CariDovizCinsi = $scope.CariListe[pIndex].DOVIZCINSI;
        $scope.CariDovizCinsi1 = $scope.CariListe[pIndex].DOVIZCINSI1;
        $scope.CariDovizCinsi2 = $scope.CariListe[pIndex].DOVIZCINSI2;
        $scope.CariIskontoKodu = $scope.CariListe[pIndex].ISKONTOKOD;
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
        if($scope.CariListe[pIndex].ODEMEPLANI == 0)
        {
            $scope.OdemePlan = 0;
        }
        else
        {
            $scope.OdemePlan =  $scope.CariListe[pIndex].ODEMEPLANI;
        }
        console.log($scope.OdemePlan)
        $scope.DovizChangeKodu = "0";
        $scope.DovizChange()
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
        $scope.ProjeEvrakSelectedIndex = pIndex;
        $scope.Seri = $scope.ProjeEvrakGetirListe[$scope.ProjeEvrakSelectedIndex].SERI;
        $scope.Sira = $scope.ProjeEvrakGetirListe[$scope.ProjeEvrakSelectedIndex].SIRA;
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
            for(i = 0;i < $scope.SiparisListe.length;i++)
            {
                $scope.IskTplTutar += $scope.SiparisListe[i].sip_tutar;
                $scope.IskTutar1 += $scope.SiparisListe[i].sip_iskonto_1;
                $scope.IskTplTutar1 = $scope.IskTplTutar - $scope.IskTutar1;
                $scope.IskTutar2 += $scope.SiparisListe[i].sip_iskonto_2;
                $scope.IskTplTutar2 = $scope.IskTplTutar1 - $scope.IskTutar2;
                $scope.IskTutar3 += $scope.SiparisListe[i].sip_iskonto_3;
                $scope.IskTplTutar3 = $scope.IskTplTutar2 - $scope.IskTutar3;
                $scope.IskTutar4 += $scope.SiparisListe[i].sip_iskonto_4;
                $scope.IskTplTutar4 = $scope.IskTplTutar3 - $scope.IskTutar4;
                $scope.IskTutar5 += $scope.SiparisListe[i].sip_iskonto_5;
                $scope.IskTplTutar5 = $scope.IskTplTutar4 - $scope.IskTutar5;
            }
        }
        else
        {
            $scope.IskTplTutar = $scope.SiparisListe[$scope.IslemListeSelectedIndex].sip_tutar;
            $scope.IskTutar1 = $scope.SiparisListe[$scope.IslemListeSelectedIndex].sip_iskonto_1;
            $scope.IskTplTutar1 = $scope.IskTplTutar - $scope.IskTutar1;
            $scope.IskTutar2 = $scope.SiparisListe[$scope.IslemListeSelectedIndex].sip_iskonto_2;
            $scope.IskTplTutar2 = $scope.IskTplTutar1 - $scope.IskTutar2;
            $scope.IskTutar3 = $scope.SiparisListe[$scope.IslemListeSelectedIndex].sip_iskonto_3;
            $scope.IskTplTutar3 = $scope.IskTplTutar2 - $scope.IskTutar3;
            $scope.IskTutar4 = $scope.SiparisListe[$scope.IslemListeSelectedIndex].sip_iskonto_4;
            $scope.IskTplTutar4 = $scope.IskTplTutar3 - $scope.IskTutar4;
            $scope.IskTutar5 = $scope.SiparisListe[$scope.IslemListeSelectedIndex].sip_iskonto_5;
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
            this['IskTutar' + pIndex] = $filter('number')(this['IskTutar' + pIndex],2);
        }
        else
        {
            this['IskYuzde' + pIndex] = (100 * this['IskTutar' + pIndex]) / TmpTutar;
            this['IskYuzde' + pIndex] = $filter('number')(this['IskYuzde' + pIndex],2);
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

            this['IskTplTutar' + i] = $filter('number')(this['IskTplTutar' + i],2);
        }
    }
    $scope.EvrakAdi = function()
    {
        if($scope.EvrakTip == 0)
        {
            return 'Alınan Sipariş';
        }
        else
        {
            return 'Verilen Sipariş';
        } 
    }
    $scope.EvrakTipChange = async function()
    {
        await db.MaxSiraPromiseTag($scope.Firma,'MaxSiparisSira',[$scope.Seri,$scope.EvrakTip,0],function(data){$scope.Sira = data});
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
    $scope.Insert = async function()
    {
        if($scope.Stok[0].FIYAT < $scope.Fiyat)
        {
            alertify.alert("Fiyatı düşüremezsin")
            $scope.Stok[0].FIYAT = $scope.Fiyat
            $scope.MiktarFiyatValid();
            return;
        }
        if(typeof($scope.Stok[0].KODU) != 'undefined')
        {   
            if(ParamName == "AlinanSiparis")
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
            if(UserParam.AlinanSiparis.EksiyeDusme == 1 &&  $scope.EvrakTip == 0 && ($scope.Miktar * $scope.Stok[0].CARPAN) > $scope.Stok[0].DEPOMIKTAR)
            {
                alertify.alert("Eksiye Düşmeye İzin Verilmiyor.");
                return;
            }
            $scope.InsertLock = true
            if($scope.PBarkodListe.length > 0) //PAKETTEKİLERİ INSERT ETME İŞLEMİ
            {
                if($scope.PaketBarkodKontrol == true || $scope.Stok[0].PAKET != "")
                {
                    // if($scope.Stok[0].PAKET != "")
                    // {
                    //     await db.GetData($scope.Firma,'PaketBarkodGetir',[$scope.Stok[0].KODU,$scope.DepoNo,$scope.FiyatListeNo],async function(PBarkodData)
                    //     {
                    //         $scope.PBarkodListe = PBarkodData;
                    //     });
                    // }
    
                    $scope.PaketBarkodKontrol = false;
    
                    for (let i = 0; i <= $scope.PBarkodListe.length; i++)
                    {
                        if($scope.PBarkodListe.length == i)
                        {
                            $scope.PBarkodListe = [];
                            $scope.BtnTemizle();
                        }
                        else
                        {
                            console.log($scope.PBarkodListe[i])
                            if(typeof $scope.PBarkodListe[i] != "undefined")
                            {
                                if(i == 0)
                                {
                                    $scope.PaketMiktar = $scope.Miktar;
                                }
                                $scope.Miktar = 1;
                                await StokBarkodGetir($scope.PBarkodListe[i].STOKKODU)
                                await InsertData();
    
                                console.log(i,$scope.PBarkodListe.length)
                            }
                        }
                    }
                    return;
                }
            }
            if(UserParam.Sistem.SatirBirlestir == 0 || $scope.Stok[0].RENKPNTR != 0 || $scope.Stok[0].BEDENPNTR != 0 || $scope.Stok[0].DETAYTAKIP == 1 || $scope.Stok[0].DETAYTAKIP == 2)
            {
                InsertData();
            }
            else
            {
                let UpdateStatus = false;

                angular.forEach($scope.SiparisListe,function(value)
                {
                    if(value.sip_stok_kod == $scope.Stok[0].KODU)
                    {
                        if(value.FIYAT == $scope.Stok[0].FIYAT)
                        {
                            let TmpMiktar = value.sip_miktar + ($scope.Miktar * $scope.Stok[0].CARPAN);
                            if(UserParam[ParamName].SatisSarti == 0)
                            {
                                let Data = 
                                {
                                    Param :
                                    [
                                        $scope.Stok[0].FIYAT,
                                        TmpMiktar,
                                        $scope.Stok[0].FIYAT * TmpMiktar,
                                        $scope.Stok[0].TOPTANVERGIPNTR,
                                        value.sip_iskonto_1 + $scope.Stok[0].ISK.TUTAR1, //ISKONTO TUTAR 1
                                        value.sip_iskonto_2 + $scope.Stok[0].ISK.TUTAR2, //ISKONTO TUTAR 2
                                        value.sip_iskonto_3 + $scope.Stok[0].ISK.TUTAR3, //ISKONTO TUTAR 3
                                        value.sip_iskonto_4 + $scope.Stok[0].ISK.TUTAR4, //ISKONTO TUTAR 4
                                        value.sip_iskonto_5 + $scope.Stok[0].ISK.TUTAR5, //ISKONTO TUTAR 5
                                        value.sip_iskonto_6 + $scope.Stok[0].ISK.TUTAR6, //ISKONTO TUTAR 6
                                        $scope.Stok[0].ISK.TIP1, //SATIR ISKONTO TİP 1
                                        $scope.Stok[0].ISK.TIP2, //SATIR ISKONTO TİP 2
                                        $scope.Stok[0].ISK.TIP3, //SATIR ISKONTO TİP 3
                                        $scope.Stok[0].ISK.TIP4, //SATIR ISKONTO TİP 4
                                        $scope.Stok[0].ISK.TIP5, //SATIR ISKONTO TİP 5
                                        $scope.Stok[0].ISK.TIP6, //SATIR ISKONTO TİP 6
                                        value.sip_Guid
                                    ],
                                    BedenPntr : $scope.Stok[0].BEDENPNTR,
                                    RenkPntr : $scope.Stok[0].RENKPNTR,
                                    Miktar : TmpMiktar,
                                    Guid : value.sip_Guid
                                };
                                UpdateStatus = true;
                                UpdateData(Data);
                            }
                            else
                            {
                                let Data = 
                                {
                                    Param :
                                    [
                                        $scope.Stok[0].FIYAT,
                                        TmpMiktar,
                                        $scope.Stok[0].FIYAT * TmpMiktar,
                                        $scope.Stok[0].TOPTANVERGIPNTR,
                                        value.sip_iskonto_1 + $scope.Stok[0].ISK.TUTAR1, //ISKONTO TUTAR 1
                                        value.sip_iskonto_2 + $scope.Stok[0].ISK.TUTAR2, //ISKONTO TUTAR 2
                                        value.sip_iskonto_3 + $scope.Stok[0].ISK.TUTAR3, //ISKONTO TUTAR 3
                                        value.sip_iskonto_4 + $scope.Stok[0].ISK.TUTAR4, //ISKONTO TUTAR 4
                                        value.sip_iskonto_5 + $scope.Stok[0].ISK.TUTAR5, //ISKONTO TUTAR 5
                                        value.sip_iskonto_6 + $scope.Stok[0].ISK.TUTAR6, //ISKONTO TUTAR 6
                                        $scope.Stok[0].ISK.TIP1, //SATIR ISKONTO TİP 1
                                        $scope.Stok[0].ISK.TIP2, //SATIR ISKONTO TİP 2
                                        $scope.Stok[0].ISK.TIP3, //SATIR ISKONTO TİP 3
                                        $scope.Stok[0].ISK.TIP4, //SATIR ISKONTO TİP 4
                                        $scope.Stok[0].ISK.TIP5, //SATIR ISKONTO TİP 5
                                        $scope.Stok[0].ISK.TIP6, //SATIR ISKONTO TİP 6
                                        value.sip_Guid
                                    ],
                                    BedenPntr : $scope.Stok[0].BEDENPNTR,
                                    RenkPntr : $scope.Stok[0].RENKPNTR,
                                    Miktar : TmpMiktar,
                                    Guid : value.sip_Guid
                                };
                                UpdateStatus = true;
                                UpdateData(Data);
                            }
                        }
                    }                        
                });

                if(!UpdateStatus)
                {
                    InsertData();
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
    $scope.ProjeEvrakGetirModal = async function(pParam)
    {
        if(typeof pParam == "undefined")
        {
            pParam = $scope.CheckEvrak;
            console.log($scope.CheckEvrak)
        }
        if($scope.ProjeGetirParam == "0")
        {
            $("#MdlEvrakGetir").modal('show');
        }
        else if($scope.ProjeGetirParam == "1")
        {
            $scope.CheckEvrak = pParam;
            if($scope.CheckEvrak == 0 )
            {
                $("#MdlProjeEvrakGetir").modal('show');
                $timeout( function(){
                    $window.document.getElementById("ProjeLabel").focus();
                    $window.document.getElementById("ProjeLabel").select();
                },100);  
            }
        }
    }
    $scope.ProjeEvrakGetir = async function()
    {
        $scope.ProjeEvrakGetirListe = [];

        // Okuttuğu proje kodundan mikroda evrak var mı onu aratıyor. 
        // Boş girilmişse, o gün proje kodundan girilmiş bütün evrakları getirir.
        await db.GetData($scope.Firma,'SiparisProjeGetir',[$scope.EvrakTip,0,$scope.ProjeKod],async function(data)
        {
            for (let i = 0; i < data.length; i++)
            {
                if(data[i].sip_teslim_miktar < data[i].sip_miktar)
                {
                    $scope.ProjeEvrakGetirListe.push(data[i]);
                }
            }
            
            // Okuttuğu proje kodunu mikro'dan gelen proje kodu listesinde arıyor.
            let TmpProjeListe = $scope.ProjeListe.find(x => x.KODU == $scope.ProjeKod)
            console.log(TmpProjeListe)
            console.log($scope.ProjeEvrakGetirListe)

            
            // Okuttuğu proje kodu mikro da yoksa VEYA Proje kodu boş ve Mikroda kayıtlı evrak yoksa
            if((typeof TmpProjeListe == "undefined") || TmpProjeListe.KODU == "" && $scope.ProjeEvrakGetirListe.length == 0)
            {
                console.log("Proje bulunamadı")
                angular.element('#MdlProjeEvrakGetir').modal('hide');
                alertify.alert("Proje Bulunamadı")
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblProjeEvrakGetirListe").jsGrid({data : $scope.ProjeEvrakGetirListe});
                $("#TblProjeEvrakGetirListe").jsGrid({pageIndex: true})
                $scope.CheckEvrak = 0;
            }
            // Okuttuğu proje koduna kayıtlı evrak var mı?
            else if($scope.ProjeEvrakGetirListe.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblProjeEvrakGetirListe").jsGrid({data : $scope.ProjeEvrakGetirListe});  
                $("#TblProjeEvrakGetirListe").jsGrid({pageIndex: true})
                $scope.CheckEvrak = 0;
                if($scope.ProjeEvrakGetirListe.length == 1)
                {
                    let Obj = $("#TblProjeEvrakGetirListe").data("JSGrid");
                    let Item = Obj.rowByItem($scope.ProjeEvrakGetirListe[0]);
                    $scope.ProjeEvrakListeRowClick(0,Item,Obj);
                    $scope.ProjeEvrakSec(); 
                }
            }
            // Okuttuğu proje kodu boş değilse
            else if($scope.ProjeEvrakGetirListe.length == 0 && TmpProjeListe.KODU != '')
            {
                //YENİEVRAK
                alertify.alert("Proje, Mikroda Kayıtlı ve Bulundu")
                $scope.Proje = $scope.ProjeKod;
                $scope.CheckEvrak = 1;
                angular.element('#MdlProjeEvrakGetir').modal('hide');
                $scope.ProjeChange();
            }
        });
    }
    $scope.ProjeEvrakSec = function()
    {
       angular.element('#MdlProjeEvrakGetir').modal('hide');
       $scope.EvrakGetir();
    }
    $scope.ProjeChange = async function()
    {
        $scope.ProjeListe.forEach(function(item) 
        {
            if(item.KODU == $scope.Proje)
            {
                $scope.Proje = item.KODU;
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
    $scope.EvrakGetir = function()
    {
        db.GetData($scope.Firma,'SiparisGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,0],function(data)
        {
            if(data.length > 0)
            {
                Init();
                InitCariGrid();
                InitIslemGrid();                
                
                $scope.Seri = data[0].sip_evrakno_seri;
                $scope.Sira = data[0].sip_evrakno_sira;
                $scope.EvrakTip = data[0].sip_tip.toString();
                $scope.CariKodu = data[0].sip_musteri_kod;
                $scope.BelgeNo = data[0].sip_belgeno;
                $scope.Tarih = new Date(data[0].sip_tarih).toLocaleDateString();                
                $scope.TeslimTarihi = new Date(data[0].sip_teslim_tarih).toLocaleDateString();
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
                
                db.GetData($scope.Firma,'SipBedenHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,9],function(BedenData)
                {
                    $scope.BedenHarListe = BedenData;
                });
                
                db.GetData($scope.Firma,'CariGetir',[$scope.CariKodu,'',UserParam.Sistem.PlasiyerKodu],function(CariData)
                {
                    $scope.CariListe = CariData;
                    $scope.CariAdi = $scope.CariListe[0].UNVAN1
                    $scope.Adres = $scope.CariListe[0].ADRES;
                    $scope.Adres1 = $scope.CariListe[0].ADRES1;
                    $scope.Adres2 = $scope.CariListe[0].ADRES2;
                    $scope.CariBakiye = $scope.CariListe[0].BAKIYE;
                    $scope.CariVDADI = $scope.CariListe[0].VDADI;
                    $scope.CariVDNO = $scope.CariListe[0].VDNO;                    
                    $scope.Risk = $scope.CariListe[0].RISK
                    $scope.RiskLimit = $scope.CariListe[0].RISKLIMIT;

                    $("#TblCari").jsGrid({data : $scope.CariListe});

                    let Obj = $("#TblCari").data("JSGrid");
                    let Item = Obj.rowByItem(CariData[0]);
                    
                    $scope.CariListeRowClick(0,Item,Obj);

                    FisData(data)
                });
                db.DepoGetir($scope.Firma,UserParam[ParamName].DepoListe,function(e)
                {    
                    $scope.DepoListe = e; 
                    $scope.DepoNo = data[0].sip_depono.toString();
                    $scope.DepoListe.forEach(function(item) 
                    {
                        if(item.KODU == $scope.DepoNo)
                            $scope.DepoAdi = item.ADI;
                    });     
                });
                
                db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(e){$scope.SorumlulukListe = e; $scope.Sorumluluk = data[0].sip_stok_sormerk; $scope.SorumlulukAdi = data[0].SORUMLUMERADI});
                db.FillCmbDocInfo($scope.Firma,'CmbPersonelGetir',function(e){$scope.PersonelListe = e; $scope.Personel = data[0].sip_satici_kod; $scope.PersonelAdi = data[0].PERSONELADI});    
                db.FillCmbDocInfo($scope.Firma,'CmbProjeGetir',function(e){$scope.ProjeListe = e; $scope.Proje = data[0].sip_projekodu});
                db.FillCmbDocInfo($scope.Firma,'CmbOdemePlanGetir',function(e){$scope.OdemePlanListe = e; $scope.OdemeNo = data[0].sip_opno.toString()});
                
                $scope.SiparisListe = data;
                $("#TblIslem").jsGrid({data : $scope.SiparisListe});  

                ToplamMiktarHesapla();
                DipToplamHesapla();
                $scope.EvrakLock = true;
                $scope.BarkodLock = false;

                angular.element('#MdlEvrakGetir').modal('hide');

                BarkodFocus();

                alertify.alert("<a style='color:#3e8ef7''>" + $scope.ToplamSatir + " " + "Satır Kayıt Başarıyla Getirildi.. !" + "</a>" );
            }
            else
            {
                angular.element('#MdlEvrakGetir').modal('hide');
                alertify.alert("<a style='color:#3e8ef7''>" + "Belge Bulunamadı !" + "</a>" );
            }
        });
    }
    $scope.EvrakDelete = function(pAlinanVerilen)
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Evrağı silmek istediğinize eminmisiniz ?', 
        function()
        { 
            if($scope.SiparisListe.length > 0)
            {
                if(UserParam[ParamName].EvrakSil == 0)
                {
                    db.ExecuteTag($scope.Firma,'SiparisEvrDelete',[$scope.Seri,$scope.Sira,$scope.EvrakTip,0],function(data)
                    {
                        if(typeof(data.result.err) == 'undefined')
                        {
                            angular.forEach($scope.SiparisListe,function(value)
                            {
                                db.ExecuteTag($scope.Firma,'BedenHarDelete',[value.sip_Guid,9],function(data)
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
                        if(pAlinanVerilen == 0)
                        {   ParamName = "AlinanSiparis";
                            $scope.YeniEvrak(0)
                        }
                        else
                        {
                            ParamName = "VerilenSiparis";
                            $scope.YeniEvrak(1)
                        } 
                        alertify.alert("<a style='color:#3e8ef7''>" + "Evrak Silme İşlemi Başarıyla Gerçekleşti !" + "</a>" );
                    });

                }
                else
                {
                    alertify.alert("<a style='color:#3e8ef7''>" + "Evrak Silme Yetkiniz Yok !" + "</a>" );
                }
            }
            else
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Silinecek Belge Yok !" + "</a>" );
            }
        }
        ,function(){});
    }
    $scope.SatirDelete = function(pAlinanVerilen)
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Seçili Satırı Silmek İstediğinize Eminmisiniz ?', 
        function()
        { 
            if($scope.IslemListeSelectedIndex > -1)
            {
                if(UserParam[ParamName].EvrakSil == 0)
                {
                    db.ExecuteTag($scope.Firma,'SiparisSatirDelete',[$scope.SiparisListe[$scope.IslemListeSelectedIndex].sip_Guid],function(data)
                    {
                        if(typeof(data.result.err) == 'undefined')
                        {
                            db.ExecuteTag($scope.Firma,'BedenHarDelete',[$scope.SiparisListe[$scope.IslemListeSelectedIndex].sip_Guid,9],function(data)
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
                        if($scope.SiparisListe.length <= 1)
                        {
                            if(pAlinanVerilen == 0)
                            {   ParamName = "AlinanSiparis";
                                $scope.YeniEvrak(0)
                            }
                            else
                            {
                                ParamName = "VerilenSiparis";
                                $scope.YeniEvrak(1)
                            }  
                        }
                        else
                        {
                            db.GetData($scope.Firma,'SiparisGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,0],function(SiparisData)
                            {
                                db.GetData($scope.Firma,'SipBedenHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,9],function(BedenData)
                                {
                                    $scope.BedenHarListe = BedenData;
                                });

                                $scope.SiparisListe = SiparisData;
                                $("#TblIslem").jsGrid({data : $scope.SiparisListe});    
                                $scope.BtnTemizle();
                                DipToplamHesapla();
                                ToplamMiktarHesapla();
                            });
                        }
                    });
                }
                else
                {
                    alertify.alert("<a style='color:#3e8ef7''>" + "Evrak Silme Yetkiniz Yok !" + "</a>" );
                }
            }
            else
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Seçili Satır Olmadan Evrak Silemezsiniz !" + "</a>" );
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
                $scope.FiyatEdit,
                $scope.MiktarEdit,
                $scope.FiyatEdit * $scope.MiktarEdit,
                $scope.SiparisListe[pIndex].sip_vergi_pntr,
                $scope.SiparisListe[pIndex].sip_iskonto_1, //ISKONTO TUTAR 1
                $scope.SiparisListe[pIndex].sip_iskonto_2, //ISKONTO TUTAR 2
                $scope.SiparisListe[pIndex].sip_iskonto_3, //ISKONTO TUTAR 3
                $scope.SiparisListe[pIndex].sip_iskonto_4, //ISKONTO TUTAR 4
                $scope.SiparisListe[pIndex].sip_iskonto_5, //ISKONTO TUTAR 5
                0, //ISKONTO TUTAR 6
                $scope.SiparisListe[pIndex].sip_isk1, //SATIR ISKONTO TİP 1
                $scope.SiparisListe[pIndex].sip_isk2, //SATIR ISKONTO TİP 2
                $scope.SiparisListe[pIndex].sip_isk3, //SATIR ISKONTO TİP 3
                $scope.SiparisListe[pIndex].sip_isk4, //SATIR ISKONTO TİP 4
                $scope.SiparisListe[pIndex].sip_isk5, //SATIR ISKONTO TİP 5
                0, //SATIR ISKONTO TİP 6
                $scope.SiparisListe[pIndex].sip_Guid
            ],
            BedenPntr : $scope.SiparisListe[pIndex].BEDENPNTR,
            RenkPntr : $scope.SiparisListe[pIndex].RENKPNTR,
            Miktar : $scope.MiktarEdit,
            Guid : $scope.SiparisListe[pIndex].sip_Guid
            
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
    $scope.MainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TblAciklama").removeClass('active');
        $("#TbStok").removeClass('active');
        $("#TbDizayn").removeClass('active');
        $("#TbStokDurum").removeClass('active');
        $("#TbPDF").removeClass('active');
    }
    $scope.ManuelAramaClick = function() 
    {
        $("#TbStok").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TblAciklama").removeClass('active');
        $("#TbDizayn").removeClass('active');
        $("#TbStokDurum").removeClass('active');
        $("#TbPDF").removeClass('active');

        StokFocus();
    }
    $scope.CariSecClick = function() 
    {
        if($scope.Sira == 0 || typeof $scope.Sira == "undefined")
        {            
            alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Evrak Siranın Gelmesini Bekleyin!" + "</a>" );
        }
        else
        {
            if($scope.SiparisListe.length == 0)
            {
                $("#TbCariSec").addClass('active');
                $("#TbMain").removeClass('active');
                $("#TbBelgeBilgisi").removeClass('active');
                $("#TbIslemSatirlari").removeClass('active');
                $("#TblAciklama").removeClass('active');
                $("#TbStok").removeClass('active');
                $("#TbDizayn").removeClass('active');
                $("#TbPDF").removeClass('active');
                CariFocus();
            }        
            else
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Cari Seçim Ekranına Girmeye Yetkiniz Yok !" + "</a>" );
            }
        }
    }
    $scope.BelgeBilgisiClick = function() 
    {
        $("#TbBelgeBilgisi").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TblAciklama").removeClass('active');
        $("#TbStok").removeClass('active');
        $("#TbDizayn").removeClass('active');
        $("#TbStokDurum").removeClass('active');
        $("#TbPDF").removeClass('active');
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
                $("#TblAciklama").removeClass('active');
                $("#TbStok").removeClass('active');
                $("#TbDizayn").removeClass('active');
                $("#TbStokDurum").removeClass('active');
                $("#TbPDF").removeClass('active');
                            
                BarkodFocus();
            }
            else
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Cari Seçiniz !" + "</a>" );
            }
        }
    }
    $scope.TbIslemSatirlariClick = function() 
    {
        $("#TbIslemSatirlari").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TblAciklama").removeClass('active');
        $("#TbStok").removeClass('active');
        $("#TbDizayn").removeClass('active');
        $("#TbStokDurum").removeClass('active');
        $("#TbPDF").removeClass('active');
    }
    $scope.PDFClick = function()
    {
        $("#TbPDF").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');

        var TmpQuery =
        {
            db : '{M}.' + $scope.Firma,
            query:  "SELECT 'C:\\Projeler\\DevPrint\\DevPrintDesign\\bin\\Debug\\Report1.repx' AS PATH,  " +
            "SIPARISLER.sip_stok_kod AS STOK_KOD, SIPARISLER.sip_b_fiyat AS BIRIMF, SIPARISLER.sip_miktar AS MIKTAR,   " +
            "CONVERT(VARCHAR(10),GETDATE(),108)  as SAAT,  " +
            "SIPARISLER.sip_iskonto_1 AS ISKONTO1,   " +
            "SIPARISLER.sip_iskonto_1 * 100 / CASE WHEN SIPARISLER.sip_tutar = 0 THEN 1 ELSE SIPARISLER.sip_tutar END AS ISKONTOY1,   " +
            "SIPARISLER.sip_iskonto_2 AS ISKONTO2, SIPARISLER.sip_iskonto_2 * 100 / CASE WHEN (SIPARISLER.sip_tutar - SIPARISLER.sip_iskonto_1)   " +
            "= 0 THEN 1 ELSE (SIPARISLER.sip_tutar - SIPARISLER.sip_iskonto_1) END AS ISKONTOY2, SIPARISLER.sip_create_date AS TARIH,   " +
            "SIPARISLER.sip_evrakno_seri AS SERI, SIPARISLER.sip_evrakno_sira AS SIRA, 0 AS EVRAKTIP, SIPARISLER.sip_belgeno AS BELGENO,   " +
            "SIPARISLER.sip_aciklama AS ACIKLAMA, SIPARISLER.sip_musteri_kod AS CARIKODU, 0 AS MEBLAG, SIPARISLER.sip_vergi AS KDV,   " +
            "SIPARISLER.sip_tutar AS TUTAR, 0 AS ARATOPLAM, STOKLAR.sto_isim AS STOK_ADI, CARI_HESAPLAR.cari_unvan1 AS CARIADI,   " +
            "CARI_HESAPLAR.cari_unvan2 AS CARIADI2, CARI_HESAP_ADRESLERI.adr_cadde AS CADDE, CARI_HESAP_ADRESLERI.adr_sokak AS SOKAK,   " +
            "CARI_HESAP_ADRESLERI.adr_ilce AS ILCE, CARI_HESAP_ADRESLERI.adr_il AS IL, CARI_HESAP_ADRESLERI.adr_tel_bolge_kodu AS BOLGE,   " +
            "CARI_HESAP_ADRESLERI.adr_tel_no1 AS TELNO, CARI_HESAPLAR.cari_vdaire_adi AS VDADI, CARI_HESAPLAR.cari_vdaire_no AS VDNO,   " +
            "MIN(BARKOD_TANIMLARI.bar_kodu) AS BARKOD, CASE WHEN dbo.fn_VergiYuzde(CONVERT(tinyint, SIPARISLER.sip_vergi_pntr)) = 0 THEN NULL   " +
            "ELSE dbo.fn_VergiYuzde(CONVERT(tinyint, SIPARISLER.sip_vergi_pntr)) END AS KDVORAN,   " +
            "CASE WHEN SIPARISLER.sip_vergi = 0 THEN (CASE WHEN SIPARISLER.sip_tutar = 0 THEN 1 ELSE SIPARISLER.sip_tutar END - (SIPARISLER.sip_iskonto_1  " +
            "+ SIPARISLER.sip_iskonto_2)) * dbo.fn_VergiYuzde(CONVERT(tinyint, SIPARISLER.sip_vergi_pntr))   " +
            "/ 100 ELSE SIPARISLER.sip_vergi END AS sth_vergi, SIPARISLER.sip_iskonto_1 + SIPARISLER.sip_iskonto_2 AS ISK12TOP,  " +
            "CASE WHEN iSNULL(ODEME_PLANLARI.odp_adi, 'D') = 'D' THEN 'PESIN' ELSE ODEME_PLANLARI.odp_adi END AS ODEMEPLAN, " +
            "(SELECT     dbo.fn_StokBirimi(SIPARISLER.sip_stok_kod, SIPARISLER.sip_birim_pntr) AS Expr1  " +
            ") AS BIRIM, SIPARISLER.sip_tutar - (SIPARISLER.sip_iskonto_1 + SIPARISLER.sip_iskonto_2)   " +
            "+ SIPARISLER.sip_vergi AS GENELTOPLAMA, SIPARISLER.sip_special1,  " +
            "CASE WHEN dbo.fn_VergiYuzde(CONVERT(tinyint, SIPARISLER.sip_vergi_pntr)) = 1 THEN  " +
            "SIPARISLER.sip_vergi  " +
            "ELSE 0 END AS YUZDE1,  " +
            "CASE WHEN dbo.fn_VergiYuzde(CONVERT(tinyint, SIPARISLER.sip_vergi_pntr)) = 8 THEN  " +
            "SIPARISLER.sip_vergi  " +
            "ELSE 0 END AS YUZDE8,  " +
            "CASE WHEN dbo.fn_VergiYuzde(CONVERT(tinyint, SIPARISLER.sip_vergi_pntr)) = 18 THEN  " +
            "SIPARISLER.sip_vergi  " +
            "ELSE 0 END AS YUZDE18  " +
            "FROM ODEME_PLANLARI RIGHT OUTER JOIN  " +
            "SIPARISLER ON ODEME_PLANLARI.odp_no = SIPARISLER.sip_opno LEFT OUTER JOIN  " +
            "CARI_HESAPLAR ON SIPARISLER.sip_musteri_kod = CARI_HESAPLAR.cari_kod LEFT OUTER JOIN  " +
            "STOKLAR INNER JOIN  " +
            "BARKOD_TANIMLARI ON STOKLAR.sto_kod = BARKOD_TANIMLARI.bar_stokkodu ON SIPARISLER.sip_stok_kod = STOKLAR.sto_kod LEFT OUTER JOIN  " +
            "CARI_HESAP_ADRESLERI ON SIPARISLER.sip_musteri_kod = CARI_HESAP_ADRESLERI.adr_cari_kod AND   " +
            "SIPARISLER.sip_adresno = CARI_HESAP_ADRESLERI.adr_adres_no  " +
            "WHERE sip_evrakno_seri = @SERI AND sip_evrakno_sira = @SIRA " +
            "GROUP BY SIPARISLER.sip_stok_kod, SIPARISLER.sip_b_fiyat, SIPARISLER.sip_miktar, SIPARISLER.sip_iskonto_1,   " +
            "SIPARISLER.sip_iskonto_1 * 100 / CASE WHEN SIPARISLER.sip_tutar = 0 THEN 1 ELSE SIPARISLER.sip_tutar END, SIPARISLER.sip_iskonto_2,   " +
            "SIPARISLER.sip_iskonto_2 * 100 / CASE WHEN (SIPARISLER.sip_tutar - SIPARISLER.sip_iskonto_1)   " +
            "= 0 THEN 1 ELSE (SIPARISLER.sip_tutar - SIPARISLER.sip_iskonto_1) END, SIPARISLER.sip_create_date, SIPARISLER.sip_evrakno_seri,   " +
            "SIPARISLER.sip_evrakno_sira, SIPARISLER.sip_belgeno, SIPARISLER.sip_aciklama, SIPARISLER.sip_musteri_kod, SIPARISLER.sip_vergi,   " +
            "SIPARISLER.sip_tutar, STOKLAR.sto_isim, CARI_HESAPLAR.cari_unvan1, CARI_HESAPLAR.cari_unvan2, CARI_HESAP_ADRESLERI.adr_cadde,   " +
            "CARI_HESAP_ADRESLERI.adr_sokak, CARI_HESAP_ADRESLERI.adr_ilce, CARI_HESAP_ADRESLERI.adr_il,   " +
            "CARI_HESAP_ADRESLERI.adr_tel_bolge_kodu, CARI_HESAP_ADRESLERI.adr_tel_no1, CARI_HESAPLAR.cari_vdaire_adi,   " +
            "CARI_HESAPLAR.cari_vdaire_no, SIPARISLER.sip_iskonto_1 + SIPARISLER.sip_iskonto_2,   " +
            "SIPARISLER.sip_tutar - (SIPARISLER.sip_iskonto_1 + SIPARISLER.sip_iskonto_2) + SIPARISLER.sip_vergi, SIPARISLER.sip_special1,SIPARISLER.sip_vergi_pntr,ODEME_PLANLARI.odp_adi " +
            ",CARI_HESAPLAR.cari_kod,SIPARISLER.sip_birim_pntr",
            param:  ['SERI','SIRA'], 
            type:   ['string|25','int'], 
            value:  [$scope.Seri,$scope.Sira]    
        }
        db.GetPromiseQuery(TmpQuery,function(ppData)
        {
            console.log(ppData)
            console.log(JSON.stringify(ppData[0]))
            console.log(ppData[0])
            let pData = []
            if(ppData.length > 0)
            {
                for(let i = 0; i < ppData.length; i++)
                {
                    ppData[i] = JSON.parse(JSON.stringify(ppData[i]).split("İ").join("I").split("ı").join("i").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u"));
                    pData.push(ppData[i]);
                }
                pData = pData;
                console.log(pData)

                //console.log(pData[0].BASEIMAGE.substring(pData[0].BASEIMAGE.indexOf(",") +1 ))
                $scope.Base64ImageSrc = '../../img/' + $scope.StokKodu + '.png'
                console.log($scope.Base64ImageSrc)
                console.log(JSON.stringify(pData))
                console.log("{TYPE:'REVIEW',PATH:'" + pData[0].PATH.replaceAll('\\','/') + "',DATA:" + JSON.stringify(pData) + "}")
                db.Emit('DevPrint',"{TYPE:'REVIEW',PATH:'" + pData[0].PATH.replaceAll('\\','/') + "',DATA:" + JSON.stringify(pData) + "}",(pResult)=>
                {
                    console.log(pResult)
                    $scope.Base64Data = pResult.split('|')[1];
                    if(pResult.split('|')[0] != 'ERR')
                    {
                        // atob() is used to convert base64 encoded PDF to binary-like data.
                        // (See also https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/
                        // Base64_encoding_and_decoding.)
                        var pdfData = atob(pResult.split('|')[1])
                        //
                        // The workerSrc property shall be specified.
                        //
                        pdfjsLib.GlobalWorkerOptions.workerSrc =
                            'buildpdf/pdf.worker.js';

                        // Opening PDF by passing its binary data as a string. It is still preferable
                        // to use Uint8Array, but string or array-like structure will work too.
                        var loadingTask = pdfjsLib.getDocument({ data: pdfData, });
                        (async function() 
                        {
                            var pdf = await loadingTask.promise;
                            // Fetch the first page.
                            var page = await pdf.getPage(1);
                            var scale = 0.58;
                            var viewport = page.getViewport({ scale: scale, });
                            // Support HiDPI-screens.
                            var outputScale = window.devicePixelRatio || 1;

                            // Prepare canvas using PDF page dimensions.
                            var canvas = document.getElementById('the-canvas');
                            var context = canvas.getContext('2d');

                            canvas.width = Math.floor(viewport.width * outputScale);
                            canvas.height = Math.floor(viewport.height * outputScale);
                            canvas.style.width = Math.floor(viewport.width) + "px";
                            canvas.style.height =  Math.floor(viewport.height) + "px";

                            var transform = outputScale !== 1
                            ? [outputScale, 0, 0, outputScale, 0, 0]
                            : null;

                            // Render PDF page into canvas context.
                            var renderContext = {
                            canvasContext: context,
                            transform,
                            viewport,
                            };
                            page.render(renderContext);

                            var contentType2 = "application/pdf";
                            $scope.Base64DataLong = 'data:' + contentType2 + ';' + 'base64,' + $scope.Base64Data
                            console.log($scope.Base64DataLong)
                        })();
                    }
                })
            }
            console.log($scope.Base64ImageSrc)
        });
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
    $scope.YazdirTipSecim = function()
    {
        if(UserParam.Sistem.OnlineYazdir == "1")
        {
            $scope.BtnOnlineYazdir();
        }
        else
        {
            $scope.BtnFisYazdir();
        }
    }
    $scope.BtnFisYazdir = async function()
    {
        // var FisBilgi = document.getElementById('FisBilgi').textContent;
        if($scope.FisDizaynTip == 0)
        {
            let FisDizayn = ""; 
            if(typeof ($scope.TahToplam) == 'undefined')
            {
                $scope.TahToplam = 0;
                $scope.FatSeri = "";
                $scope.FatSira = 0;
            }
            console.log(localStorage.mode)
            if(localStorage.mode == 'true')
            {
                var TmpQuery = 
                {
                    db : '{M}.' + $scope.Firma,
                    query:  "SELECT CONVERT(NVARCHAR,CAST(ISNULL((SELECT dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,cari_doviz_cinsi,0,0,0,0)),0)AS DECIMAL(15,2))) AS BAKIYE " +
                            "FROM CARI_HESAPLAR  WHERE cari_kod = @CARIKODU " ,
                    param:  ['CARIKODU'],
                    type:   ['string|25'],
                    value:  [$scope.CariKodu]    
                }
                db.GetDataQuery(TmpQuery,function(Data)
                {
                    $scope.CariBakiye = Data[0].BAKIYE
                });
            }
            else if(localStorage.mode == 'false')
            {
                var TmpQuery = 
                {
                    db : '{M}.' + $scope.Firma,
                    query:  "SELECT BAKIYE AS BAKIYE " +
                            "FROM CARI WHERE KODU = '@CARIKODU' " ,
                    param:  ['CARIKODU'],
                    type:   ['string|25'],
                    value:  [$scope.CariKodu]    
                }
                console.log(TmpQuery)
                await db.GetPromiseQuery(TmpQuery,async function(Data)
                {
                    console.log(Data)
                    $scope.CariBakiye = Data[0].BAKIYE
                });
            }
            console.log($scope.CariBakiye,$scope.GenelToplam,$scope.TahToplam )

            $scope.CariBakiye = $scope.CariBakiye - $scope.GenelToplam + $scope.TahToplam 
            console.log($scope.CariBakiye)
            KalanBakiye = $scope.CariBakiye + $scope.GenelToplam
            OncekiBakiye = KalanBakiye - $scope.GenelToplam
            
            FisGenelToplam = $scope.GenelToplam + $scope.CariBakiye
            FisKalanBakiye = $scope.CariBakiye + $scope.GenelToplam - $scope.TahToplam
            let i = 26 - $scope.FisLength.length;
            let Satır = "";
    
            for(let x = 0; x <= i; x++)
            {    
                Satır = Satır + "                                             -"+ "\n"; 
            }
            //FİŞ DİZAYNI
            FisDizayn = "              BRN SARAPCILIK" + "\n" + "       TEL : 0212 438 2580" + "\n" + "       EMAIL : muhasebe@baron.gen.tr" + "\n" + "       IBAN : TR51 0006200021100006298898" + "\n" + " " + $scope.FisDeger + "\n" + "                                            -" + "\n" + "URUN ADI          "+ " MIKTAR"+  " BIRIM" + " FIYAT" + " TUTAR" + "\n" + $scope.FisData + "\n" + "                                            -" + "\n" + " " + "\n"
            FisDizayn = FisDizayn + "Toplam Miktar : "+ SpaceLength(db.SumColumn($scope.SiparisListe,"sip_miktar"),5) + "      Ara Toplam : " + parseFloat($scope.AraToplam.toFixed(2)) + "\n" +"                       Toplam Indirim : " + parseFloat($scope.ToplamIndirim.toFixed(2)) + "\n" + "                           Net Toplam : " + parseFloat($scope.NetToplam.toFixed(2)) + "\n" + "                            ToplamKdv : " + parseFloat($scope.ToplamKdv.toFixed(2))  + "\n" + "                         Genel Toplam : " + parseFloat($scope.GenelToplam.toFixed(2))   + "\n" + "\n" +"\n" + "Önceki Bakiye : " + parseFloat($scope.CariBakiye.toFixed(2)) + "\n" + "                                            -" + "\n" + "                                            -" + "\n" + "                                            -" + "\n" + "                                            -" + "\n"
            FisDizayn = FisDizayn.split("İ").join("I").split("ı").join("i").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u");
            console.log(FisDizayn)
            db.BTYazdir(FisDizayn,UserParam.Sistem,function(pStatus)
            {
                if(pStatus)
                {
                    alertify.alert("<a style='color:#3e8ef7''>" + "Yazdırma İşlemi Gerçekleşti </a>" );         
                   
                }
            });
        }
        else if($scope.FisDizaynTip = 1)
        {
            let FisDizayn = "";

            FisDizayn = "              BRN SARAPCILIK" + "\n" + "       TEL : 0212 438 2580" + "\n" + "       EMAIL : muhasebe@baron.gen.tr" + "\n" + "      IBAN : TR51 0006200021100006298898" + "\n" + " " + $scope.FisDeger + "\n" + "                                            -" + "\n" + "URUN ADI              "+ " MIKTAR"+  " BIRIM" + " FIYAT" + " TUTAR" + "\n" + $scope.FisData + "\n" + "                                            -" + "\n" + " " + "\n"
            FisDizayn = FisDizayn + "Toplam Miktar : "+ SpaceLength(db.SumColumn($scope.SiparisListe,"sip_miktar"),5) + "      Ara Toplam : " + parseFloat($scope.AraToplam.toFixed(4)) + "\n" +"                       Toplam Indirim : " + parseFloat($scope.ToplamIndirim.toFixed(4)) + "\n" + "                           Net Toplam : " + parseFloat($scope.NetToplam.toFixed(4)) + "\n" + "                            ToplamKdv : " + parseFloat($scope.ToplamKdv.toFixed(4))  + "\n" + "                         Genel Toplam : " + parseFloat($scope.GenelToplam.toFixed(4))   + "\n" + "\n" +"\n" + "Önceki Bakiye : " + parseFloat($scope.CariBakiye.toFixed(2)) + "\n" + "                                            -" + "\n" + "                                            -" + "\n" + "                                            -" + "\n" + "                                            -" + "\n"
            FisDizayn = FisDizayn.split("İ").join("I").split("ı").join("i").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u");
    
            db.BTYazdir(FisDizayn,UserParam.Sistem,function(pStatus)
            {
                if(pStatus)
                {
                    alertify.alert("<a style='color:#3e8ef7''>" + "Yazdırma İşlemi Gerçekleşti </a>" );
                }
            });
        }
    }
    $scope.BtnAciklamaGir = function()
    {
        $("#TbStok").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TbMain").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TblAciklama").addClass('active');
        $scope.AciklamaGetir();
    }
    $scope.BtnAciklamaKaydet = function()
    {
        if($scope.AciklamaGuid == '')
        {
            var InsertData =
            [
                0,
                0,
                $scope.Seri,
                $scope.Sira,
                $scope.Aciklama1,
                $scope.Aciklama2,
                $scope.Aciklama3,
                $scope.Aciklama4,
                $scope.Aciklama5
            ];

            db.ExecuteTag($scope.Firma,'AciklamaInsert',InsertData,function(InsertResult)
            {
                if(typeof(InsertResult.result.err) == 'undefined')
                {
                    alertify.alert('Başarıyla Kaydedildi')
                    $scope.TbIslemSatirlariClick()
                }
            })
        }
        else
        {
            var  InsertData =  [$scope.Aciklama1,$scope.Aciklama2,$scope.Aciklama3,$scope.Aciklama4,$scope.Aciklama5,$scope.AciklamaGuid]            
            db.ExecuteTag($scope.Firma,'AciklamaUpdate',InsertData,function(InsertResult)
            {
                if(typeof(InsertResult.result.err) == 'undefined')
                {
                    alertify.alert('Başarıyla Kaydedildi')
                }
            })
        }
    }
    $scope.AciklamaGetir = function()
    {   
        db.GetData($scope.Firma,'AciklamaGetir',[0,0,$scope.Seri,$scope.Sira],function(pData)
        {
            if(pData.length > 0)
            {
                $scope.AciklamaSatir = pData
                $scope.Aciklama1 = $scope.AciklamaSatir[0].egk_evracik1,
                $scope.Aciklama2 = $scope.AciklamaSatir[0].egk_evracik2,
                $scope.Aciklama3 = $scope.AciklamaSatir[0].egk_evracik3,
                $scope.Aciklama4 = $scope.AciklamaSatir[0].egk_evracik4,
                $scope.Aciklama5 = $scope.AciklamaSatir[0].egk_evracik5,
                $scope.AciklamaGuid = $scope.AciklamaSatir[0].egk_Guid
            }

        });
    }
    $scope.BtnEtiketBas = function()
    {
        for(i = 0; i < $scope.SiparisListe.length; i++)
        {
            $scope.StokKodu = $scope.SiparisListe[i].sip_stok_kod;
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
                $scope.SiparisListe[i].sip_miktar,
                $scope.DepoNo,
                $scope.StokKodu,
                1,
                1,
                $scope.Barkod,
                $scope.SiparisListe[i].sip_miktar
            ]
            db.ExecuteTag($scope.Firma,'EtiketInsert',InsertData,function()
            {

            });
        }
        if(i == $scope.SiparisListe.length)
        {
            alertify.alert("Etiket Yazdırıldı.");
        }
        else
        {
            alertify.alert("Etiket Yazdıralamadı.");
        }
    }
    $scope.ExcelExport = function()
    {
        db.GetData($scope.Firma,'SiparisGetirExcel',[$scope.Seri,$scope.Sira,$scope.EvrakTip,0],function(ExcelData)
        {   
            $scope.ExcelDataListesi = ExcelData

        let ExcelDataListe = [];
        let ExcelHeaderListe = [];

        for(i = 0; i < Object.keys($scope.ExcelDataListesi[0]).length; i++)
        {
            let a = {};
            
            a.text = Object.keys($scope.ExcelDataListesi[0])[i];
            ExcelHeaderListe.push(a)
        }

        ExcelDataListe.push(ExcelHeaderListe)

        for(i = 0; i < $scope.ExcelDataListesi.length; i++)
        {
            let Dizi = [];
            for(m = 0;m < Object.keys($scope.ExcelDataListesi[i]).length;m++)
            {
                let b = {};
                b.text = $scope.ExcelDataListesi[i][Object.keys($scope.ExcelDataListesi[i])[m]]
                Dizi.push(b);
            }
            
            ExcelDataListe.push(Dizi)
        }
        var RaporListeData = 
        [
            {
                "sheetName":"Sayfa",
                "data":  ExcelDataListe
            },
            
        ];
        var options = 
        {
            fileName:"VerilenSiparisRapor",
            extension:".xlsx",
            sheetName:"Sayfa",
            fileFullName:"VerilenSiparisRapor.xlsx",
            header:true,
            maxCellWidth: 20
        };

        if (window.cordova && cordova.platformId !== "browser") 
        {
            document.addEventListener("deviceready", function () 
            {
                var storageLocation = cordova.file.externalRootDirectory  + "download/";
                var blob = Jhxlsx.getBlob(RaporListeData,options);

                switch (cordova.platform) 
                {
                    case "Android":
                      storageLocation = cordova.file.externalRootDirectory  + "download/";
                      break;
            
                    case "iOS":
                      storageLocation = cordova.file.documentsDirectory;
                      break;
                }

                window.resolveLocalFileSystemURL(storageLocation,function (dir) 
                {
                    dir.getFile(options.fileFullName ,{create: true},function (file) 
                    {
                        file.createWriter(function (fileWriter) 
                        {
                            fileWriter.write(blob);

                            fileWriter.onwriteend = function () 
                            {
                                
                            };
        
                            fileWriter.onerror = function (err) 
                            {
                                console.error(err);
                            };
                        },
                        function (err) 
                        {
                            console.error(err);
                        }
                        );
                    },
                    function (err) 
                    {
                        console.error(err);
                    }
                    );
                },
                function (err) 
                {
                    console.error(err);
                });
            });
        }
        else
        {
            Jhxlsx.export(RaporListeData, options);
        }
        

        console.log(Jhxlsx.getBlob(Jhxlsx,options))
    });
    }
    $scope.BtnGunSonuYazdir = async function()
    {  
        if($scope.FisDizaynTip == "0")
        {   
            let FisDeger = "";
            let FisDizayn = "";
            $scope.GunSonuData = "";

            for(let i=0; i < $scope.DizaynListe.length; i++)
            {
                $scope.GunSonuData = $scope.GunSonuData + SpaceLength($scope.DizaynListe[i].CARIADI,20) + " " + SpaceLength($scope.DizaynListe[i].SERI + "-" + $scope.DizaynListe[i].SIRA,10) + " " + SpaceLength(parseFloat($scope.DizaynListe[i].TUTAR.toFixed(2)),8) + "\n";
            } 
            let i = 48 - $scope.DizaynListe.length;
            let Satır = "";
    
            for(let x = 0; x <= i; x++)
            {    
                Satır = Satır + "                                          -"+ "\n"; 
            }

            FisDeger = "PLASIYER : " + SpaceLength($scope.DizaynListe[0].PERSONEL,15) + "        "+ $scope.Tarih + "\n"  + "                                  " + $scope.Saat + "\n"

            FisDizayn = "                                             " + "\n" + 
                        FisDeger + "\n" +
                        "           CARI SATIŞ DURUM RAPORU              " + "\n" +
                        "CARIADI              F.SERI    F.TUTAR" + "\n" +
                        $scope.GunSonuData + 
                        "------------------------------" + "\n" + 
                        "              Genel Toplam: " + $scope.DGenelToplam.toFixed(2) + "\n" + 
                        "                                          -" + "\n" +
                        "                                          -" + "\n" +
                        "                                          -" + "\n" +
                        "                                          -" + "\n" +
                        "                                          -" + "\n" +
                        "                                          -" + "\n" +
                        "                                          -" + "\n" +
                        "                                          -" + "\n" +
                        "                                          -" + "\n" 
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
    
            FisDeger = FisDeger + "                              IRSALIYE GUN SONU " + "\n" 
            FisDeger = FisDeger + "                                                   "+ $scope.Tarih + "\n" +"\n" +"\n" +"\n" +"\n" +"\n" + "\n";
    
            for(let i=0; i < $scope.DizaynListe.length; i++)
            {
                $scope.GunSonuData = $scope.GunSonuData +  SpaceLength($scope.DizaynListe[i].SERI,10) + "  " +  SpaceLength($scope.DizaynListe[i].SIRA,10) + "  " + SpaceLength($scope.DizaynListe[i].CARIKOD,15) + "  " + SpaceLength($scope.DizaynListe[i].CARIADI,20) + SpaceLength(parseFloat($scope.DizaynListe[i].TUTAR.toFixed(2)),8) + "\n";
            }
    
            $scope.GunSonuDizayn = "                                             " + "\n" + 
                        FisDeger + "\n" + "\n" +
                        "SERI        SIRA       CARI KODU            CARI ADI        TUTAR" + "\n" + 
                        "                                              " + "\n" + 
                        $scope.GunSonuData + "\n"  +
                        "                                                                                                                                   - " + "\n " +
                        "                                                                                                                                   - " + "\n "
            $scope.GunSonuDizayn = $scope.GunSonuDizayn + "                                                   TOPLAM : " + $scope.DGenelToplam.toFixed(2)
            $scope.GunSonuDizayn = $scope.GunSonuDizayn.split("İ").join("I").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u");
            
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

        if(localStorage.mode == 'true')
        {
            var TmpQuery = 
            {
                db : '{M}.' + $scope.Firma,
                query:  "SELECT  " +
                        "sip_evrakno_seri AS SERI,  " +
                        "sip_evrakno_sira AS SIRA,  " +
                        "LEFT(CONVERT(VARCHAR(8),MAX(sip_create_date),108),5) AS SAAT,  " +
                        "MAX(sip_musteri_kod) AS CARIKOD,  " +
                        "(SELECT cari_unvan1 FROM CARI_HESAPLAR WHERE cari_kod = MAX(sip_musteri_kod)) + ' ' + " +
                        "(SELECT cari_unvan2 FROM CARI_HESAPLAR WHERE cari_kod = MAX(sip_musteri_kod)) AS CARIADI,  " +
                        "ISNULL((SELECT cari_per_adi  FROM CARI_PERSONEL_TANIMLARI WHERE cari_per_kod = MAX(sip_satici_kod)),'') AS PERSONEL, " +
                        "ROUND(SUM(sip_tutar),2) TUTAR " +
                        "FROM SIPARISLER  " +
                        "WHERE sip_tip = 0 AND sip_cins = 0 AND sip_create_date = CONVERT(VARCHAR(10),GETDATE(),112) " +
                        "AND sip_evrakno_seri = '" + $scope.Seri + "' " + 
                        "GROUP BY sip_evrakno_seri,sip_evrakno_sira " 
            }
        }
        else if(localStorage.mode == 'false')
        {
            var TmpQuery = 
            {
                db : '{M}.' + $scope.Firma,
                query:  "SELECT  " +
                "sip_evrakno_seri AS SERI,  " +
                "sip_evrakno_sira AS SIRA,  " +
                "MAX(sip_musteri_kod) AS CARIKOD,  " +
                "(SELECT UNVAN1 FROM CARI WHERE KODU = sip_musteri_kod) AS CARIADI,  " +
                "IFNULL((SELECT PERSONELADI FROM PERSONEL WHERE PERSONELKODU = sip_satici_kod),'') AS PERSONEL, " +
                "ROUND(SUM(sip_tutar),2) TUTAR " +
                "FROM SIPARIS  " +
                "WHERE sip_tip = 0 AND sip_cins = 0 AND sip_create_date = date('now') " +
                "AND sip_evrakno_seri = '" + $scope.Seri + "' " + 
                "GROUP BY sip_evrakno_seri,sip_evrakno_sira ",
            }
        }

        await db.GetPromiseQuery(TmpQuery,async function(Data)
        {
            $scope.DGenelToplam = db.SumColumn(Data,"TUTAR");
            $scope.DizaynListe = Data;
            $("#TblDizayn").jsGrid({data : $scope.DizaynListe});
            $("#TbDizayn").addClass('active');
        });
    }
    $scope.StokDurumRaporClick = async function()
    {
        $("#TbStok").removeClass('active');
        $("#TbMain").removeClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');

        await db.GetData($scope.Firma,'StokDurumGetir',[$scope.Barkod,$scope.CariKodu],function(Data)
        {
            $scope.StokDurumListe = Data;
            $("#TblStokDurum").jsGrid({data : $scope.StokDurumListe});
            $("#TbStokDurum").addClass('active');
        });
    }
    $scope.BtnGonder = function()
    {
        db.GetData($scope.Firma,'SiparisGonderGetir',[],function(Data)
            {
                $scope.SiparisGonderListe = Data;
                if($scope.SiparisGonderListe.length > 0)
                {
                    $scope.Loading = false;
                    $scope.TblLoading = true;
                    $("#TblSipListe").jsGrid({data : $scope.SiparisGonderListe});
                    $("#TblSipListe").jsGrid({pageIndex: true});
                    $("#MdlGonder").modal('show');
                }
                else
                {
                    alertify.alert("Sipariş Bulunamadı");
                    $scope.Loading = false;
                    $scope.TblLoading = true;
                    $("#TblSipListe").jsGrid({data : $scope.SiparisGonderListe});
                    $("#TblSipListe").jsGrid({pageIndex: true});
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
            
            for (let i = 0; i < $scope.SiparisGonderListe.length; i++) 
            {
                let TmpStatus = true
                let TmpSipData = await db.GetPromiseTag($scope.Firma,'SiparisGetir',[$scope.SiparisGonderListe[i].sip_evrakno_seri,$scope.SiparisGonderListe[i].sip_evrakno_sira,$scope.SiparisGonderListe[i].sip_tip,0]);
                let TmpBedenData = await db.GetPromiseTag($scope.Firma,'SipBedenHarGetir',[$scope.SiparisGonderListe[i].sip_evrakno_seri,$scope.SiparisGonderListe[i].sip_evrakno_sira,$scope.SiparisGonderListe[i].sip_tip,9]);
                console.log(TmpSipData)
                localStorage.mode = 'true';
                let TmpMaxSira = await db.GetPromiseTag($scope.Firma,'MaxSiparisSira',[$scope.SiparisGonderListe[i].sip_evrakno_seri,$scope.SiparisGonderListe[i].sip_tip,$scope.SiparisGonderListe[i].sip_cins])
                for (let m = 0; m < TmpSipData.length; m++) 
                {
                    let InsertData = 
                    [
                        TmpSipData[m].sip_create_user,
                        TmpSipData[m].sip_lastup_user,
                        TmpSipData[m].sip_firmano, //FIRMA NO
                        TmpSipData[m].sip_subeno, //ŞUBE NO
                        TmpSipData[m].sip_tarih,
                        TmpSipData[m].sip_teslim_tarih,
                        TmpSipData[m].sip_tip,
                        TmpSipData[m].sip_cins, //CİNSİ
                        TmpSipData[m].sip_evrakno_seri,
                        TmpMaxSira[0].MAXEVRSIRA,
                        TmpSipData[m].sip_belgeno,
                        TmpSipData[m].sip_belge_tarih,
                        TmpSipData[m].sip_satici_kod,
                        TmpSipData[m].sip_musteri_kod,
                        TmpSipData[m].sip_stok_kod,
                        TmpSipData[m].sip_b_fiyat,
                        TmpSipData[m].sip_miktar,
                        TmpSipData[m].sip_birim_pntr,
                        TmpSipData[m].sip_teslim_miktar, //TESLİM MİKTARI
                        TmpSipData[m].sip_tutar,
                        TmpSipData[m].sip_iskonto_1, //ISKONTO TUTAR 1
                        TmpSipData[m].sip_iskonto_2, //ISKONTO TUTAR 2
                        TmpSipData[m].sip_iskonto_3, //ISKONTO TUTAR 3
                        TmpSipData[m].sip_iskonto_4, //ISKONTO TUTAR 4
                        TmpSipData[m].sip_iskonto_5, //ISKONTO TUTAR 5
                        TmpSipData[m].sip_iskonto_6, //ISKONTO TUTAR 6
                        TmpSipData[m].sip_vergi_pntr,
                        TmpSipData[m].sip_vergi,
                        TmpSipData[m].sip_opno,
                        TmpSipData[m].sip_aciklama, //AÇIKLAMA
                        TmpSipData[m].sip_depono,
                        TmpSipData[m].sip_OnaylayanKulNo,
                        TmpSipData[m].sip_cari_sormerk,
                        TmpSipData[m].sip_stok_sormerk,
                        TmpSipData[m].sip_doviz_cinsi,
                        TmpSipData[m].sip_doviz_kuru,
                        TmpSipData[m].sip_alt_doviz_kuru,
                        TmpSipData[m].sip_adresno, //ADRES NO
                        TmpSipData[m].sip_iskonto1, //ISKONTO TİP 1
                        TmpSipData[m].sip_iskonto2, //ISKONTO TİP 2
                        TmpSipData[m].sip_iskonto3, //ISKONTO TİP 3
                        TmpSipData[m].sip_iskonto4, //ISKONTO TİP 4
                        TmpSipData[m].sip_iskonto5, //ISKONTO TİP 5
                        TmpSipData[m].sip_iskonto6, //ISKONTO TİP 6
                        TmpSipData[m].sip_isk1, //SATIR ISKONTO TİP 1
                        TmpSipData[m].sip_isk2, //SATIR ISKONTO TİP 2
                        TmpSipData[m].sip_isk3, //SATIR ISKONTO TİP 3
                        TmpSipData[m].sip_isk4, //SATIR ISKONTO TİP 4
                        TmpSipData[m].sip_isk5, //SATIR ISKONTO TİP 5
                        TmpSipData[m].sip_isk6, //SATIR ISKONTO TİP 6
                        TmpSipData[m].sip_parti_kodu,
                        TmpSipData[m].sip_lot_no,
                        TmpSipData[m].sip_projekodu,
                        TmpSipData[m].sip_fiyat_liste_no,
                        TmpSipData[m].sip_rezervasyon_miktari, //REZERVASYON MİKTARI
                        TmpSipData[m].sip_rezerveden_teslim_edilen  //REZERVASYON TESLİM MİKTARI
                    ];
                    let TmpResult = await db.ExecutePromiseTag($scope.Firma,'SiparisInsert',InsertData)
                    if(typeof(TmpResult.result.err) != 'undefined')
                    {
                        TmpStatus = false;
                    }
                    let TmpBeden = TmpBedenData.find(x => x.BdnHar_Har_uid == TmpSipData[m].sip_Guid)
                    if(typeof TmpBeden != 'undefined')
                    {
                        let InsertDataBdn =
                        [
                            TmpBeden.BdnHar_create_user, // KULLANICI
                            TmpBeden.BdnHar_lastup_user, // KULLANICI
                            TmpBeden.BdnHar_Tipi, // BEDEN TİP
                            TmpResult.result.recordset[0].sip_Guid, // GUID
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
                    let TmpUpdateQuery = 
                    {
                        db : '{M}.' + $scope.Firma,
                        query: "UPDATE SIPARIS SET status = 1 WHERE sip_evrakno_seri = '@sip_evrakno_seri' AND sip_evrakno_sira = @sip_evrakno_sira AND sip_tip = @sip_tip AND sip_cins = @sip_cins" ,
                        param:  ['sip_evrakno_seri:string|20','sip_evrakno_sira:int','sip_tip:int','sip_cins:int'],
                        value : [$scope.SiparisGonderListe[i].sip_evrakno_seri,$scope.SiparisGonderListe[i].sip_evrakno_sira,$scope.SiparisGonderListe[i].sip_tip,$scope.SiparisGonderListe[i].sip_cins]

                    }
                    await db.GetPromiseQuery(TmpUpdateQuery)
                    
                    await db.GetData($scope.Firma,'SiparisGonderGetir',[],function(Data)
                    {
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