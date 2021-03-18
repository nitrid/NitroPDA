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
        DepoMiktarListe = [];

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
            data : $scope.SiparisListe,
            paging : true,
            pageIndex : true,
            pageSize: 10,
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
    function InitDepoMiktarGrid()
    {
        $("#TblDepoMiktar").jsGrid
        ({
            width: "100%",
            height: "150px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.DepoMiktarListe,
            fields: [
                {
                    name: "DEPONO",
                    title: "DEPONO",
                    type: "number",
                    align: "center",
                    width: 75
                }, 
                {
                    name: "DEPOADI",
                    title: "DEPOADI",
                    type: "text",
                    align: "center",
                    width: 210
                }, 
                {
                    name: "DEPOMIKTAR",
                    title: "DEPO MIKTAR",
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
            pageSize: 10,
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
                name: "sip_tutar",
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
        var InsertData = 
        [
            UserParam.MikroId,
            UserParam.MikroId,
            0, //FIRMA NO
            1, //ŞUBE NO
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
            '', //AÇIKLAMA
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
                });
            }
            else
            {
                console.log(InsertResult.result.err);
                $scope.InsertLock = false;
            }
        });
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
            if(pBarkod != '')
            {
                db.StokBarkodGetir($scope.Firma,pBarkod,$scope.DepoNo,async function(BarkodData)
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
                        $scope.Stok[0].ISK = {ORAN1: 1,ORAN2: 0, ORAN3:0, ORAN4: 0, ORAN5: 0, ORAN6: 0, TUTAR1: 0, TUTAR2: 0, TUTAR3: 0, TUTAR4: 0, TUTAR5: 0, TUTAR6: 0, TIP1: 0, TIP2: 0, TIP3: 0, TIP4: 0, TIP5: 0, TIP6: 0}
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
                                CariIskontoKodu : $scope.CariIskontoKodu,
                                OdemeNo : $scope.OdemeNo < 0 ? 0 : $scope.OdemeNo,
                                FiyatListe : $scope.FiyatListeNo,
                                DepoNo : $scope.DepoNo,
                                AlisSatis : ($scope.EvrakTip === 0 ? 1 : 0)
                            };
                            await db.FiyatGetir($scope.Firma,BarkodData,FiyatParam,UserParam[ParamName], async function()
                            {   
                                if(typeof $scope.Stok[0].ODEPLAN != "undefined")
                                {
                                    if($scope.OdemePlan == 0)
                                    {
                                        $scope.OdemeNo == $scope.Stok[0].ODEPLAN;
                                    }
                                    else
                                    {
                                        $scope.OdemeNo == $scope.OdemePlan;
                                    }
                                }
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
            $scope.FisDeger = "";
            $scope.FisData = "";
            $scope.FisBilgiText = "";
            $scope.FisBilgi = "";
           try 
           {
                $scope.FisBilgi = $scope.FisBilgiText.fontsize(1);
                $scope.FisDeger = "";
                $scope.FisDeger = "                                  "+ $scope.Tarih + "\n" + "                                  " + $scope.Seri + " - " + $scope.Sira + "\n" +"                                  "+ $scope.Tarih + "\n" + "                                  "+  $scope.Saat + "\n" + SpaceLength($scope.CariAdi,40) + "\n" + SpaceLength($scope.Adres1,50) + "\n" + SpaceLength($scope.Adres,30) + "\n" +  "  " + SpaceLength($scope.CariVDADI,25) + " " + $scope.CariVDNO + "\n";
                for(let i=0; i < pData.length; i++)
                {
                    $scope.FisData = $scope.FisData +  SpaceLength(pData[i].ADI,17) + "  " + SpaceLength(pData[i].BIRIM + " " + pData[i].BIRIMADI,9) + " " + SpaceLength(parseFloat(pData[i].FIYAT.toFixed(2)),7) + " " + SpaceLength(parseFloat(pData[i].TUTAR.toFixed(2)),9) + "\n";
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
            db.GetData($scope.Firma,'StokGetir',[Kodu,Adi,$scope.DepoNo,''],function(StokData)
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
        $scope.Miktar = 1;
        $scope.BarkodLock = false;

        $scope.BirimListe = [];
        BarkodFocus();      
    }
    $scope.BtnDuzenle = function()
    {
        $scope.MiktarEdit = $scope.SiparisListe[$scope.IslemListeSelectedIndex].sip_miktar;
        $scope.FiyatEdit = $scope.SiparisListe[$scope.IslemListeSelectedIndex].sip_b_fiyat;

        $("#MdlDuzenle").modal('show');
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
            query:  "UPDATE SIPARISLER SET sip_special1 = 1 " +
                    "WHERE sip_evrakno_seri = @sip_evrakno_seri AND sip_evrakno_sira = @sip_evrakno_sira AND sip_tip = @sip_tip ",
            param:  ['sip_evrakno_seri','sip_evrakno_sira','sip_tip'],
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
        InitProjeEvrakGetirGrid();
        InitDizaynGrid();
        InitSipGrid();
        
        $scope.EvrakLock = false;
        $scope.Seri = UserParam[ParamName].Seri;
        $scope.BelgeNo = UserParam[ParamName].BelgeNo;
        $scope.EvrakTip = pAlinanVerilen;
        $scope.CariKodu = UserParam[ParamName].Cari;

        if(pAlinanVerilen == 0)
        $scope.PersonelTip = "0";
        else
        $scope.PersonelTip= "1"

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
        db.FillCmbDocInfo($scope.Firma,'CmbProjeGetir',function(data){$scope.ProjeListe = data; $scope.Proje = UserParam[ParamName].Proje});
        db.FillCmbDocInfo($scope.Firma,'CmbOdemePlanGetir',function(data){$scope.OdemePlanListe = data; $scope.OdemeNo = $scope.OdemePlan;});

        await db.MaxSiraPromiseTag($scope.Firma,'MaxSiparisSira',[$scope.Seri,$scope.EvrakTip,0],function(data)
        {
            $scope.Sira = data
        });

        if(UserParam.AlinanSiparis.SiparisOnay == "0")
        {
            $scope.SipOnayKulNo = 0;
        }
        else
        {
           $scope.SipOnayKulNo = UserParam.MikroId
        }
        BarkodFocus();
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

        $scope.Stok[0].KDV = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].TOPTANVERGI / 100);
        $scope.Stok[0].TOPTUTAR = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) + $scope.Stok[0].KDV;
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
        $scope.MainClick();
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
    $scope.Insert = function()
    {
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
    $scope.ProjeEvrakGetir = function()
    {
        db.GetData($scope.Firma,'SiparisProjeGetir',[$scope.EvrakTip,0,$scope.ProjeKod],function(data)
        {
            $scope.ProjeEvrakGetirListe = data;
            if($scope.ProjeEvrakGetirListe.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $scope.Status = $scope.ProjeEvrakGetirListe[0].status
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
    $scope.EvrakGetir = function()
    {
        db.GetData($scope.Firma,'SiparisGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,0],function(data)
        {
            if(data[0].status == 1)
            {
                $("#MdlEvrakGetir").modal('hide');
                alertify.alert("Aktarılmış Evrakı Çağıramazsın.")
            }
            else
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
    $scope.BtnFisYazdir = async function()
    {
        var FisBilgi = document.getElementById('FisBilgi').textContent;
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
            FisDizayn = "                                             -" + "\n" + 
            FisBilgi + "\n" +
            $scope.FisDeger + "\n" +
            SpaceLength("ÜRÜN ADI",19) +    SpaceLength("MIK" + " " + "BRM",7) + "   " + SpaceLength("FIYAT",9) + SpaceLength("NET TUTAR",5) + "\n" + 
            $scope.FisData + "\n" + //İÇERİK
            Satır
            FisDizayn = FisDizayn + SpaceLength("Onceki Bak.:",12) + " " + SpaceLength(parseFloat(OncekiBakiye).toFixed(2),10) + "   "+SpaceLength("Ara Top.:",10) + parseFloat($scope.AraToplam).toFixed(2) + "\n" + "                         Top. Isk.: " +  parseFloat($scope.ToplamIndirim).toFixed(2) + "\n" + "                           %1 KDV : " + parseFloat(db.SumColumn($scope.FisLength,"sip_vergi","sip_vergi_pntr = 2").toFixed(2)) + "\n" + "                           %8 KDV : " + parseFloat(db.SumColumn($scope.FisLength,"sip_vergi","sip_vergi_pntr = 3").toFixed(2)) + "\n" 
            FisDizayn = FisDizayn + "Kalan Bak.:  " + SpaceLength(parseFloat(KalanBakiye).toFixed(2),10) + "   " + SpaceLength("Top. KDV:",10) + parseFloat($scope.ToplamKdv).toFixed(2) + "\n" + "                       Genel Top. : " + parseFloat($scope.GenelToplam).toFixed(2) + "\n" +
            "-\n" + "-\n" + "-\n" + "-\n" + "-\n" + "-\n" + "-\n" + "-\n" + "-\n" + "-\n" + "-\n"
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

        })
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
        var options = {
            fileName:"VerilenSiparisRapor",
            extension:".xlsx",
            sheetName:"Sayfa",
            fileFullName:"report.xlsx",
            header:true,
            maxCellWidth: 20
        };

        Jhxlsx.export(RaporListeData, options);

        var url ='data.json';
        $.get(url, {},function (data) 
        {
            Jhxlsx.export(data.RaporListeData, data.options);
            db.Connection(function(data)
            {
            });
        })

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