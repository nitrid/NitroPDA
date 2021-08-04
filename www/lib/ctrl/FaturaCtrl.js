function FaturaCtrl($scope,$window,$timeout,$location,db,$filter,$rootScope)
{
    let CariSelectedRow = null;
    let IslemSelectedRow = null;
    let StokSelectedRow = null;
    let PartiLotSelectedRow = null;
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
            'page_title' : 'Fatura',
            'page_path': '/Fatura'
        });

        UserParam = Param[$window.sessionStorage.getItem('User')];
        $scope.Firma = $window.sessionStorage.getItem('Firma');
        $scope.KullaniciIndex = $window.sessionStorage.getItem('User');

        $scope.Seri = "";
        $scope.Sira = 0;

        $scope.EvrakTip;
        $scope.Tip;
        $scope.Cins;
        $scope.NormalIade;
        $scope.Tpoz = 0;
        $scope.CariCinsi = 0
        $scope.DepoNo;
        $scope.DepoAdi = "";
        $scope.Tarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.Saat = moment(new Date()).format("LTS");
        $scope.Vade = moment(new Date()).format("YYYY-MM-DD");
        $scope.Sorumluluk = "2";
        $scope.SorumlulukAdi = "";
        $scope.Personel = "";
        $scope.PersonelAdi = "";
        $scope.Proje = "";
        $scope.OdemeNo = "0";
        $scope.CmbEvrakTip = "1";
        $scope.Barkod = "";
        $scope.Birim = "1";
        $scope.CariKodu = "";
        $scope.KasaKodu = "";
        $scope.CariAdi = "";
        $scope.Miktar = 1;
        $scope.Miktar2 = 0;
        $scope.ToplamSatir = 0;
        $scope.Meblag = 0;
        $scope.OtoEkle = false;
        $scope.CariBakiye = "";
        $scope.CariIskontoKodu = "";
        $scope.Adres = "";
        $scope.Adres1 = "";
        $scope.Adres2 = "";
        $scope.AdresNo = "0";
        $scope.TeslimAdres = "";
        $scope.SiraNo = "";
        $scope.CariVDADI = "";
        $scope.CariVDNO = "";
        $scope.KasaSecim = false;
        $scope.KasaAdi = "";
        $scope.EvrakDovizTip = "";
        $scope.DisTicaretTur;
        $scope.VergisizFl = 0;
        $scope.BirimAdi = "";
        $scope.RiskParam = UserParam.Sistem.RiskParam;
        $scope.FisDizaynTip = UserParam.Sistem.FisDizayn;
        $scope.RotaKontrol = false;
        $scope.RotaAciklama = "";
        $scope.Indirim = 0;
        //CARİHAREKET
        if(ParamName == "AlisFatura")
        {
            $scope.ChaEvrakTip = 0;
        }
        else
        {
            $scope.ChaEvrakTip = 63;
        }
        
        $scope.ChaTip = 1;
        $scope.ChaCins = 6;
        $scope.ChaNormalIade = 0;

        $scope.AraToplam = 0;
        $scope.ToplamIndirim = 0;
        $scope.NetToplam = 0;
        $scope.ToplamKdv = 0;
        $scope.GenelToplam = 0;
        
        $scope.CmbCariAra = "0";
        $scope.TxtCariAra = "";

        $scope.StokGridTip = "0";
        $scope.StokGridText = "";

        $scope.BirimListe = [];
        $scope.DepoListe = [];
        $scope.SorumlulukListe = [];
        $scope.PersonelListe = [];
        $scope.ProjeListe = [];
        $scope.OdemePlanListe = [];
        $scope.CariListe = [];
        $scope.StokListe = [];
        $scope.KasaListe = [];
        $scope.StokHarListe = [];
        $scope.CariHarListe = [];
        $scope.AdresNoListe = [];
        $scope.StokDetay = [];
        $scope.CariHareketGonderListe = [];
        $scope.StokHareketGonderListe = [];

        $scope.IslemListeSelectedIndex = -1;
        $scope.PartiLotListeSelectedIndex = 0;

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

        $scope.EvrakLock = false;
        $scope.BarkodLock = false;
        $scope.FiyatLock = false;
        $scope.TblLoading = true;
        $scope.ManuelArama = false;
        $scope.Aciklama = "";
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
            data : $scope.StokHarListe,
            paging : true,
            pageSize: 30,
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
                name: "FIYAT",
                title: "FIYAT",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "TUTAR",
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
            },
            {
                name: "sth_iskonto2",
                title: "IND2",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sth_iskonto3",
                title: "IND3",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sth_iskonto4",
                title: "IND4",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sth_iskonto5",
                title: "IND5",
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
            pageSize: 30,
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
                    width: 300
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
            responsive: true,
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
    function InitStokHarGrid()
    {
        $("#TblStokHarListe").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.CariHareketGonderListe,
            paging : true,
            pageSize: 30,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
            {
                name: "cha_evrakno_seri",
                title: "SERI",
                type: "number",
                align: "center",
                width: 100,
                itemTemplate: function(value, item) {
                    console.log(value)
                    console.log(item)
                    if(item.status == 0)
                    {
                        return "<div style='background: white;'>" + value + "</div>"
                    }
                    else if (item.status == 1)
                    {
                        return "<div style='background: green;'>" + value + "</div>"
                    }
                    else if (item.status == 2)
                    {
                        return "<div style='background: yellow;'>" + value + "</div>"
                    }
                }
            },
            {
                name: "cha_evrakno_sira",
                title: "SIRA",
                type: "number",
                align: "center",
                width: 75,
                itemTemplate: function(value, item) {
                    console.log(value)
                    console.log(item)
                    if(item.status == 0)
                    {
                        return "<div style='background: white;'>" + value + "</div>"
                    }
                    else if (item.status == 1)
                    {
                        return "<div style='background: green;'>" + value + "</div>"
                    }
                    else if (item.status == 2)
                    {
                        return "<div style='background: yellow;'>" + value + "</div>"
                    }
                }
            },
            {
                name: "cha_kod",
                title: "CARİ KODU",
                type: "number",
                align: "center",
                width: 150,
                itemTemplate: function(value, item) {
                    console.log(value)
                    console.log(item)
                    if(item.status == 0)
                    {
                        return "<div style='background: white;'>" + value + "</div>"
                    }
                    else if (item.status == 1)
                    {
                        return "<div style='background: green;'>" + value + "</div>"
                    }
                    else if (item.status == 2)
                    {
                        return "<div style='background: yellow;'>" + value + "</div>"
                    }
                }
            },
            {
                name: "cha_meblag",
                title: "TUTAR",
                type: "number",
                align: "center",
                width: 100,
                itemTemplate: function(value, item) {
                    console.log(value)
                    console.log(item)
                    if(item.status == 0)
                    {
                        return "<div style='background: white;'>" + value + "</div>"
                    }
                    else if (item.status == 1)
                    {
                        return "<div style='background: green;'>" + value + "</div>"
                    }
                    else if (item.status == 2)
                    {
                        return "<div style='background: yellow;'>" + value + "</div>"
                    }
                }
            }
           ],
            rowClick: function(args)
            {
                $scope.$apply();
            }
        });
    }
    function BarkodFocus(pData)
    {
        if(pData == 1)
        {
            $timeout( function(){$window.document.getElementById("Barkod").focus();},300);  
        }
        if(pData == 0)
        {
            $timeout( function(){$window.document.getElementById("Miktar").focus();},300);  
        }
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
            11, // BEDEN TİP
            pGuid, // RECno
            Kirilim($scope.Stok[0].BEDENPNTR,$scope.Stok[0].RENKPNTR), // BEDEN NO
            $scope.Miktar,
            0,
            0
        ];
        db.ExecuteTag($scope.Firma,'BedenHarInsert',Data,function(data)
        {  
            if(typeof(data.result.err) == 'undefined')
            {  
                db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(Data)
                {   
                    $scope.StokHarListe = Data;
                });

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
    function CariHarInsert(pCallback)
    {   
        let Vergi = [0,0,0,0,0,0,0,0,0,0];
        for(let i = 0;i < Vergi.length;i++)
        {
            Vergi[$scope.Stok[0].TOPTANVERGIPNTR - 1] = $scope.Stok[0].KDV;        
        } 

        var InsertData = 
        [
            UserParam.MikroId,
            UserParam.MikroId,
            0, //FİRMA NO
            0, //ŞUBE NO
            $scope.ChaEvrakTip,
            $scope.Seri,
            $scope.Sira,
            $scope.Tarih,
            $scope.ChaTip,
            $scope.ChaCins,
            $scope.ChaNormalIade,
            $scope.Tpoz, //TPOZ
            $scope.ChaTicaretTuru, //CHATICARETTURU
            $scope.BelgeNo,
            $scope.Tarih,
            "", //ACIKLAMA
            $scope.Personel, //SATICIKODU
            "", //EXIMKODU
            $scope.Proje, //PROJEKODU
            $scope.CariCinsi,  //CARICINS
            ($scope.Tpoz == 1) ? $scope.KasaKodu : $scope.CariKodu,
            $scope.CariKodu,
            $scope.CariDovizCinsi, //DCİNS
            $scope.CariDovizKuru, //DKUR
            $scope.CariAltDovizKuru, //ALTDKUR
            $scope.CariDovizCinsi, //GRUPNO
            $scope.Sorumluluk,
            0,  //KASAHIZMET
            "", //KASAHIZKOD
            0, //KasaCİns
            1, //KasaKur
            0, //KARSIDGRUPNO
            "",
            $scope.Stok[0].TOPTUTAR, //MEBLAG
            $scope.Stok[0].TUTAR,    //ARATOPLAM
            $scope.Vade, //VADE
            0, //FTISKONTO1
            0, //FTISKONTO2
            0, //FTISKONTO3
            0, //FTISKONTO4
            0, //FTISKONTO5
            0, //FTISKONTO6
            0, //FTMASRAF1
            0, //FTMASRAF2
            0, //FTMASRAF3
            0, //FTMASRAF4
            0, //VERİPNTR
            Vergi[0], //VERGİ1
            Vergi[1], //VERGİ2
            Vergi[2], //VERGİ3
            Vergi[3], //VERGİ4
            Vergi[4], //VERGİ5
            Vergi[5], //VERGİ6
            Vergi[6], //VERGİ7
            Vergi[7], //VERGİ8
            Vergi[8], //VERGİ9
            Vergi[9], //VERGİ10
            0, //VERGİSİZFL
            0, //OTVTUTARİ
            0, //OTVVERGİSİZFL
            0, //OIVERGİSİZFL
            "", //TREFNO
            0, //SNTCKPOZ
            0 //EISLEMTURU
        ];
        db.ExecuteTag($scope.Firma,'CariHarInsert',InsertData,function(InsertResult)
        {   
            if(typeof InsertResult.result.err == 'undefined')
            {
                $scope.InsertLock = false;
                $scope.CariHarGuid = InsertResult.result.recordset[0].cha_Guid
                console.log(InsertResult.result.recordset[0])
                db.GetData($scope.Firma,'CariHarGetir',[$scope.Seri,$scope.Sira,$scope.ChaEvrakTip],function(data)
                {
                    $scope.CariHarListe = data;
                    pCallback(true);

                    console.log($scope.CariHarGuid)
                });
            }
            else
            {
                pCallback(false);
            }
        });
    }
    function CariHarUpdate(pCallback)
    {   
        $scope.TopIskonto = 
        (db.SumColumn($scope.StokHarListe,"sth_iskonto1") + db.SumColumn($scope.StokHarListe,"sth_iskonto2") + 
        db.SumColumn($scope.StokHarListe,"sth_iskonto3") + db.SumColumn($scope.StokHarListe,"sth_iskonto4") + db.SumColumn($scope.StokHarListe,"sth_iskonto5"))
        
        let AraToplam = db.SumColumn($scope.StokHarListe,"sth_tutar");
        let Meblag = ((db.SumColumn($scope.StokHarListe,"sth_tutar") - $scope.TopIskonto) + db.SumColumn($scope.StokHarListe,"sth_vergi"));
        let Vergi = [0,0,0,0,0,0,0,0,0,0];

        for(let i = 0;i < Vergi.length;i++)
        {
            Vergi[i] = db.SumColumn($scope.StokHarListe,"sth_vergi","sth_vergi_pntr = " + (i + 1));
        } 

        var CariHarUpdate = 
        [
            Meblag, //MEBLAG
            AraToplam, //ARATOPLAM
            Vergi[0],  //CHARVERGİ1
            Vergi[1],  //CHAVERGİ2
            Vergi[2],  //CHAVERHGİ3
            Vergi[3],  //CHAVERGİ4
            Vergi[4],  //CHAVERGİ5
            Vergi[5],  //CHAVERGİ6
            Vergi[6],  //CHAVERGİ7
            Vergi[7],  //CHAVERGİ8
            Vergi[8],  //CHAVERGİ9
            Vergi[9],  //CHAVERGİ10
            0,  //FTISKONTO
            0,  //FTISKONTO2
            0,  //FTISKONTO3
            0,  //FTISKONTO4
            0,  //FTISKONTO5
            0,  //FTISKONTO6
            0,  //OTVTUTARI
            $scope.Seri,    //SERI
            $scope.Sira,    //SIRA
            $scope.ChaEvrakTip, //EVRAKTIP
            0   //SATIRNO
        ];
        console.log($scope.CariHarListe)
        console.log(CariHarUpdate)
        db.ExecuteTag($scope.Firma,'CariHarUpdate',CariHarUpdate,function(InsertResult)
        {   
            db.GetData($scope.Firma,'CariHarGetir',[$scope.Seri,$scope.Sira,$scope.ChaEvrakTip],function(data)
            {
                $scope.CariHarListe = data;
            });

            if(typeof pCallback != 'undefined')
            {
                pCallback(InsertResult);
            }
        });
    }
    function InsertAfterRefresh(pData)
    {    
        $scope.EvrakLock = true;
        $scope.BarkodLock = false;

        $scope.StokHarListe = pData;
        $("#TblIslem").jsGrid({data : $scope.StokHarListe});    
        $scope.BtnTemizle();
        DipToplamHesapla();
        ToplamMiktarHesapla();
        
        $window.document.getElementById("Barkod").focus();
    }
    function StokBarkodGetir(pBarkod)
    {
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
        if(pBarkod != '')
        {   
            db.StokBarkodGetir($scope.Firma,pBarkod,$scope.DepoNo,async function(BarkodData)
            {   
                if(BarkodData.length > 0)
                { 
                    $scope.Stok = BarkodData;
                    $scope.Stok[0].FIYAT = 0;
                    $scope.Stok[0].TUTAR = 0;
                    $scope.Stok[0].INDIRIM = 0;
                    $scope.Stok[0].ISK = {ORAN1: 0,ORAN2: 0, ORAN3:0, ORAN4: 0, ORAN5: 0, ORAN6: 0, TUTAR1: 0, TUTAR2: 0, TUTAR3: 0, TUTAR4: 0, TUTAR5: 0, TUTAR6: 0, TIP1: 0, TIP2: 0, TIP3: 0, TIP4: 0, TIP5: 0, TIP6: 0}
                    $scope.Stok[0].KDV = 0;
                    $scope.Stok[0].TOPTUTAR = 0;

                    if(UserParam.Sistem.PartiLotKontrol == 1)//PARTI-LOT KONTROL
                    {
                        for(i = 0;i < $scope.StokHarListe.length;i++)
                        {   
                            if($scope.Stok[0].PARTI != "" && $scope.Stok[0].LOT != "")
                            {
                                if($scope.Stok[0].PARTI == $scope.StokHarListe[i].sth_parti_kodu && $scope.Stok[0].LOT == $scope.StokHarListe[i].sth_lot_no)
                                {
                                    alertify.alert("<a style='color:#3e8ef7''>" + "Okutmuş Olduğunuz "+ $scope.Stok[0].PARTI + ". " + "Parti " + $scope.Stok[0].LOT + ". " +"Lot Daha Önceden Okutulmuş !" + "</a>" );
                                    $scope.InsertLock = false;
                                    $scope.BtnTemizle();
                                    return;
                                }
                            }
                        }
                    }
                    //OFFLINE DOLAYISI İLE GEÇİCİ OLARAK KALDIRILDI
                    // await db.GetPromiseTag($scope.Firma,'StokDetay',[$scope.Stok[0].KODU],function(Data) //STOK DETAY
                    // {   
                    //     $scope.StokDetay = Data
                    // });
                    await db.GetPromiseTag($scope.Firma,'CmbBirimGetir',[BarkodData[0].KODU],function(data)//BIRIM GETİR
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
                    let FiyatParam = 
                    { 
                        CariKodu : $scope.CariKodu,
                        CariFiyatListe : $scope.CariFiyatListe,
                        CariDovizKuru : $scope.CariDovizKuru,
                        CariIskontoKodu : $scope.CariIskontoKodu,
                        DepoNo : $scope.DepoNo,
                        FiyatListe : $scope.FiyatListeNo,
                        AlisSatis : ($scope.EvrakTip === 3 ? 0 : 1),
                        OdemeNo : $scope.OdemeNo
                    };
                    await db.FiyatGetir($scope.Firma,BarkodData,FiyatParam,UserParam[ParamName],function()//FİYAT GETİR
                    {   
                        $scope.MiktarFiyatValid();
                        $scope.BarkodLock = true;
                        $scope.$apply();
                    });
                    if($scope.Stok[0].BEDENKODU != '' || $scope.Stok[0].RENKKODU != '') //RENK BEDEN
                    {   
                        if($scope.Stok[0].BEDENKODU != '' && $scope.Stok[0].BEDENPNTR == 0)
                        {
                            $('#MdlRenkBeden').modal("show");
                        }
                        else if($scope.Stok[0].RENKKODU != '' && $scope.Stok[0].RENKPNTR == 0)
                        {
                            $('#MdlRenkBeden').modal("show");
                        }
                        await db.GetPromiseTag($scope.Firma,'RenkGetir',[$scope.Stok[0].RENKKODU],function(pRenkData)
                        {
                            $scope.RenkListe = pRenkData;
                            if($scope.Stok[0].RENKPNTR == 0)
                            {
                                $scope.Stok[0].RENKPNTR = "1";
                            }
                        });
                        await db.GetPromiseTag($scope.Firma,'BedenGetir',[$scope.Stok[0].BEDENKODU],function(pBedenData)
                        {  
                            $scope.BedenListe = pBedenData;
                            if($scope.Stok[0].BEDENPNTR == 0)
                            {
                                $scope.Stok[0].BEDENPNTR = "1";
                            }
                        })
                    }
                    if($scope.Stok[0].DETAYTAKIP == 1 || $scope.Stok[0].DETAYTAKIP == 2)
                    {
                        if($scope.Stok[0].PARTI != '')
                        {
                            await db.GetPromiseTag($scope.Firma,'PartiLotGetir',[$scope.Stok[0].KODU,$scope.DepoNo,$scope.Stok[0].PARTI,$scope.Stok[0].LOT],function(data)
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
                        $timeout( function()
                        {
                            $window.document.getElementById("Miktar").focus();
                            $window.document.getElementById("Miktar").select();
                        },100);  
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
    function StokHarInsert(pCallback)
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
            '', // İŞEMRİKODU
            $scope.Personel,
            $scope.CariDovizCinsi, //HARDOVİZCİNSİ
            $scope.CariDovizKuru, //HARDOVİZKURU
            $scope.CariAltDovizKuru, //ALTDOVİZKURU
            $scope.Stok[0].DOVIZCINSI, //STOKDOVİZCİNSİ
            1, //STOKDOVİZKURU $scope.Stok[0].DOVIZCINSKURU
            $scope.Miktar * $scope.Stok[0].CARPAN,
            $scope.Miktar2,
            $scope.Stok[0].BIRIMPNTR,
            $scope.Stok[0].TUTAR,
            $scope.Stok[0].ISK.TUTAR1, //ISKONTO TUTAR 1
            $scope.Stok[0].ISK.TUTAR2, //ISKONTO TUTAR 2
            $scope.Stok[0].ISK.TUTAR3, //ISKONTO TUTAR 3
            $scope.Stok[0].ISK.TUTAR4, //ISKONTO TUTAR 4
            $scope.Stok[0].ISK.TUTAR5, //ISKONTO TUTAR 5
            $scope.Stok[0].ISK.TUTAR6, //ISKONTO TUTAR 6
            0, // MASRAF 1
            0, // MASRAF 2
            0, // MASRAF 3
            0, // MASRAF 4
            $scope.Stok[0].TOPTANVERGIPNTR, //VERGİPNTR
            $scope.Stok[0].KDV,             //VERGİ
            0, // MASRAFVERGİPNTR,
            0, // MASRAFVERGİ
            $scope.OdemeNo,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
            '',//AÇIKLAMA
            '00000000-0000-0000-0000-000000000000', //sth_sip_uid
            $scope.CariHarGuid, //sth_fat_uid,
            $scope.DepoNo, //GİRİSDEPONO
            $scope.DepoNo, //CİKİSDEPONO
            $scope.Tarih, //MALKABULSEVKTARİHİ
            '', // CARİSORUMLULUKMERKEZİ
            $scope.Sorumluluk,
            $scope.VergisizFl,  // VERGİSİZFL
            $scope.AdresNo,  // ADRESNO
            $scope.Stok[0].PARTI,
            $scope.Stok[0].LOT,
            $scope.Proje,
            '', // EXİMKODU
            $scope.DisTicaretTur,  // DİSTİCARETTURU
            0,  // OTVVERGİSİZFL
            0,  // OİVVERGİSİZ
            $scope.CariFiyatListe,
            0,   //NAKLİYEDEPO
            0
        ];
        console.log(InsertData)
        db.ExecuteTag($scope.Firma,'StokHarInsert',InsertData,function(InsertResult)
        {  
            if(typeof(InsertResult.result.err) == 'undefined')
            {
                db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(Data)
                {
                    if($scope.Stok[0].BEDENPNTR != 0 && $scope.Stok[0].RENKPNTR != 0)
                    {
                        BedenHarInsert(InsertResult.result.recordset[0].sth_Guid);
                    }
                    InsertAfterRefresh(Data);
                    $scope.InsertLock = false;
                    if(UserParam.Sistem.Titresim == 1)
                    {
                        Confirmation();
                    }
                    if(typeof pCallback != 'undefined')
                    {
                        pCallback(true);
                    }
                    FisData(Data)
                });
            }
            else
            {
                if(typeof pCallback != 'undefined')
                {
                    pCallback(false);
                }
                console.log(InsertResult.result.err);
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
    function DipToplamHesapla()
    {
        $scope.AraToplam = 0;
        $scope.ToplamIndirim = 0;
        $scope.ToplamKdv = 0;
        $scope.NetToplam = 0;
        $scope.GenelToplam = 0;

        angular.forEach($scope.StokHarListe,function(value)
        {
            console.log(value)
            if(value.sth_vergi == 0)
            {
                value.TOPTANVERGI = 0
            }
            $scope.AraToplam += value.sth_tutar;
            $scope.ToplamIndirim += (value.sth_iskonto1 + value.sth_iskonto2 + value.sth_iskonto3 + value.sth_iskonto4 + value.sth_iskonto5 + value.sth_iskonto6);
            $scope.ToplamKdv +=  (value.sth_tutar - (value.sth_iskonto1 + value.sth_iskonto2 + value.sth_iskonto3 + value.sth_iskonto4 + value.sth_iskonto5 + value.sth_iskonto6)) * (value.TOPTANVERGI / 100);
            console.log($scope.ToplamKdv)
            console.log([value.sth_tutar,value.sth_iskonto1,value.sth_iskonto2,value.sth_iskonto3,value.sth_iskonto4,value.sth_iskonto5,value.sth_iskonto6,value.TOPTANVERGI])
        });
        $scope.NetToplam = $scope.AraToplam - $scope.ToplamIndirim;
        $scope.GenelToplam = $scope.NetToplam + $scope.ToplamKdv;
    }
    function UpdateData(pData)
    {    
        db.ExecuteTag($scope.Firma,'StokHarUpdate',pData.Param,function(InsertResult)
        {   
            if(typeof(InsertResult.result.err) == 'undefined')
            {
                db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(FaturaData)
                {   
                    console.log(pData)
                    if(pData.BedenPntr != 0 || pData.RenkPntr != 0)
                    {   
                        let value = db.ListEqual($scope.BedenHarListe,{BdnHar_Har_uid : pData.Guid, BdnHar_BedenNo : Kirilim(pData.BedenPntr,pData.RenkPntr)});
                        if(value != null)
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
                            BedenHarUpdate(Data);
                        }
                        else
                        {
                            BedenHarInsert(pData.Guid);
                        }
                    }

                    InsertAfterRefresh(FaturaData);
                    if(UserParam.Sistem.Titresim == 1)
                    {
                        Confirmation();
                    }

                    CariHarUpdate(function(data)
                    {   
                        if(data.result.err)
                        {
                            console.log(data.result.err)
                        }
                    });
                    FisData(FaturaData);
                });
            }
        });
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

        angular.forEach($scope.StokHarListe,function(value)
        {
            $scope.ToplamSatir += 1 ;
        });
    }
    function FisData(pData)
    { 
        $scope.FisLength = pData;
        $scope.FisDeger = "";
        $scope.FisData = "";
        if($scope.AdresNoListe.length != 0)
        {
            console.log("Girdi")
           $scope.TeslimAdres += $scope.AdresNoListe[$scope.SiraNo].ADRES + " " + $scope.AdresNoListe[$scope.SiraNo].ADRES2 + " " + $scope.AdresNoListe[$scope.SiraNo].IL + " " + $scope.AdresNoListe[$scope.SiraNo].ILCE 
        } 
        console.log($scope.Adres)
       try 
       {
            $scope.FisDeger = "";
            $scope.FisDeger = 
            "Evrak No: " + $scope.Seri + " - " + $scope.Sira + "\n" +
            "Tarih: "+ $scope.Tarih + "                   " +  $scope.Saat + "\n" +
            SpaceLength($scope.CariKodu,12) +" | " + SpaceLength($scope.CariAdi,25) + "\n" +
            SpaceLength($scope.Adres,35) + "\n" +
            SpaceLength($scope.TeslimAdres,50) + "\n";
            
            for(let i=0; i < pData.length; i++)
            {
                $scope.FisData = $scope.FisData +  SpaceLength(pData[i].ADI.substring(0,17),18) + SpaceLength(parseFloat(pData[i].MIKTAR.toFixed(2).substring(0,6)) + " " + pData[i].BIRIMADI,10) + " " + SpaceLength(parseFloat(pData[i].FIYAT.toFixed(2)),6) + SpaceLength(parseFloat(pData[i].sth_iskonto1.toFixed(2)),3) + " " + SpaceLength(parseFloat(pData[i].sth_tutar.toFixed(2)),7) + "\n";                
            } 
       } 
       catch (error) 
       {
           console.log(error)
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
        $scope.AdresNo = UserParam[ParamName].AdresNo;
        if($scope.AdresNo == null)
        {
            $scope.AdresNo = "1"
        }
        db.GetData($scope.Firma,'CmbAdresNo',[$scope.CariKodu],function(data)
        {            
            $scope.AdresNoListe = data;
            //EVRAKGETIR
            if($scope.StokHarListe.length > 0) 
            {
                $scope.AdresNo = $scope.StokHarListe[0].sth_adres_no.toString()
                $scope.SiraNo = $scope.AdresNoListe.map(function(e) {return e.KODU; }).indexOf(Number($scope.AdresNo))

                if($scope.SiraNo == -1)
                {
                    $scope.AdresNo = $scope.AdresNoListe[0].KODU;
                    $scope.SiraNo = $scope.AdresNoListe.map(function(e) {return e.KODU; }).indexOf($scope.AdresNo)
                }
            }
            else 
            {
                //YENIEVRAK
                if($scope.AdresNoListe.length >= 1)
                {
                    for (let i = 0; i < $scope.AdresNoListe.length; i++)
                    {
                        if($scope.AdresNo == $scope.AdresNoListe[i].KODU)
                        {
                            $scope.AdresNo = $scope.AdresNoListe[i].KODU.toString()
                            $scope.SiraNo = $scope.AdresNoListe.map(function(e) {return e.KODU; }).indexOf(Number($scope.AdresNo))
                        }
                    }
                }
                else
                {
                    $scope.SiraNo = "0"
                    $scope.AdresNo = "1"

                    // if($scope.AdresNo == null)
                    // {
                    //     if($scope.AdresNoListe[0].KODU != "1")
                    //     {
                    //         $scope.AdresNo = $scope.AdresNoListe[0].KODU.toString()
                    //         $scope.SiraNo = $scope.AdresNoListe.map(function(e) {return e.KODU; }).indexOf(Number($scope.AdresNo))  
                    //     }
                    //     else
                    //     {
                    //         $scope.AdresNo = "1"
                    //         $scope.SiraNo = $scope.AdresNoListe.map(function(e) {return e.KODU; }).indexOf(Number($scope.AdresNo))    
                    //     }
                    // }
                }
            }
        });
    }
    function EvrakGetirChange()
    {
        if($scope.EvrakTip == 4 && $scope.Tip == 1 && $scope.NormalIade == 0 && $scope.Cins == 1 && $scope.DisTicaretTur == 0 && $scope.Tpoz == 0) //EVRAK GETİR İÇİN YAPILDI.
        {
            $scope.CmbEvrakTip = '0';
        }
        else if($scope.EvrakTip == 4 && $scope.Tip == 1 && $scope.NormalIade == 0 && $scope.Cins == 0 && $scope.DisTicaretTur == 0 && $scope.Tpoz == 0)
        {
            $scope.CmbEvrakTip = '1';
        }
        else if($scope.EvrakTip == 4 && $scope.Tip == 1 && $scope.NormalIade == 0 && $scope.Cins == 2 && $scope.DisTicaretTur == 0 && $scope.Tpoz == 0)
        {
            $scope.CmbEvrakTip = '2';
        }
        else if($scope.EvrakTip == 4 && $scope.Tip == 1 && $scope.NormalIade == 0 && $scope.Cins == 2 && $scope.DisTicaretTur == 4 && $scope.Tpoz == 0)
        {
            $scope.CmbEvrakTip = '3';
        }
        else if($scope.EvrakTip == 4 && $scope.Tip == 1 && $scope.NormalIade == 0 && $scope.Cins == 0 && $scope.DisTicaretTur == 0 && $scope.Tpoz == 1)
        {
            $scope.CmbEvrakTip = '4';
        }
        
        $scope.EvrakTipChange(false);
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
    $scope.BtnStokGridGetir = async function()
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
        console.log(Adi)
        await db.GetData($scope.Firma,'StokGetir',[Kodu,Adi,$scope.DepoNo,''],async function(StokData)
        {
            console.log(StokData)
            if(StokData.length > 0)
            {
                if(localStorage.mode == 'false')
                {
                    const StokData1 = await StokData;
                    for(x = 0;x < StokData1.length;x++)
                    {
                        let item = x;
                        await db.GetData($scope.Firma,'StokMiktarHesapla',[StokData1[x].KODU],async function(StokHarData)
                        {
                            if(StokHarData[0].DEPOMIKTAR != null)
                            {
                                StokData1[item].DEPOMIKTAR += StokHarData[0].DEPOMIKTAR;
                                $scope.StokListe = StokData1;
                                $("#TblStok").jsGrid({data : $scope.StokListe});
                            }
                        });
                    }
                    $scope.StokListe = StokData1;
                    $scope.Loading = false;
                    $scope.TblLoading = true;
                    $("#TblStok").jsGrid({data : $scope.StokListe});
                    $("#TblStok").jsGrid({pageIndex: true});
                }
                else
                {
                    $scope.StokListe = StokData;
                    $scope.Loading = false;
                    $scope.TblLoading = true;
                    $("#TblStok").jsGrid({data : $scope.StokListe});
                    $("#TblStok").jsGrid({data : $scope.StokListe});
                    $("#TblStok").jsGrid({pageIndex: true});
                }
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
        StokFocus();
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
    $scope.BtnStokGridSec = function()
    {
        $("#MdlStokGetir").modal('hide');
        StokBarkodGetir($scope.Barkod);
        $("#TblStok").jsGrid({pageIndex: true})
    }
    $scope.BtnCariListele = async function()
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
        await db.GetData($scope.Firma,'CariListeGetir',[Kodu,Adi,UserParam.Sistem.PlasiyerKodu],async function(data)
        {
            if(data.length > 0)
            {
                if(localStorage.mode == 'false')
                {
                    const datas = await data;
                    for(x = 0;x < datas.length;x++)
                    {
                        $scope.CariListe = datas;  
                        let item = x;
                        await db.GetData($scope.Firma,'CariMiktarHesapla',[datas[x].KODU],async function(CariHarData)
                        {
                            if(CariHarData[0].BAKIYE != 0)
                            {
                                datas[item].BAKIYE += CariHarData[0].BAKIYE;
                                $scope.CariListe = datas;  
                                $("#TblCari").jsGrid({data : $scope.CariListe});
                            }
                        });
                    }
                    $scope.CariListe = datas; 
                    $scope.Loading = false;
                    $scope.TblLoading = true;    
                    $("#TblCari").jsGrid({data : $scope.CariListe});
                    $("#TblCari").jsGrid({pageIndex : true});
                }
                else
                {
                    $scope.CariListe = data;  
                    if($scope.CariListe.length > 0)
                    {
                        $scope.Loading = false;
                        $scope.TblLoading = true;    
                        $("#TblCari").jsGrid({data : $scope.CariListe});
                        $("#TblCari").jsGrid({pageIndex : true});
                        CariFocus();
                    }
                    else
                    {
                        alertify.alert("Cari Bulunamadı")
                        $scope.Loading = false;
                        $scope.TblLoading = true;
                        $("#TblCari").jsGrid({data : $scope.CariListe});
                        $("#TblCari").jsGrid({pageIndex : true});
                    }
                }
            }
            else
            {
                alertify.alert("Cari Bulunamadı")
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblCari").jsGrid({data : $scope.CariListe});
                $("#TblCari").jsGrid({pageIndex : true});
            }
        });
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
        BarkodFocus(1);      
    }
    $scope.BtnDuzenle = function()
    {   
        $scope.MiktarEdit = $scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_miktar;
        $scope.FiyatEdit = $scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_tutar / $scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_miktar;

        $("#MdlDuzenle").modal('show');
    }
    $scope.BtnDuzenleKaydet = function(pIndex)
    {   
        let TmpTutar = $scope.FiyatEdit * $scope.MiktarEdit;
        let TmpYuzde1 = $scope.StokHarListe[pIndex].sth_iskonto1 / $scope.StokHarListe[pIndex].sth_tutar; 
        let TmpYuzde2 = $scope.StokHarListe[pIndex].sth_iskonto2 / ($scope.StokHarListe[pIndex].sth_tutar - $scope.StokHarListe[pIndex].sth_iskonto1); 
        let TmpYuzde3 = $scope.StokHarListe[pIndex].sth_iskonto3 / ($scope.StokHarListe[pIndex].sth_tutar - ($scope.StokHarListe[pIndex].sth_iskonto1 + $scope.StokHarListe[pIndex].sth_iskonto2));
        let TmpYuzde4 = $scope.StokHarListe[pIndex].sth_iskonto4 / ($scope.StokHarListe[pIndex].sth_tutar - ($scope.StokHarListe[pIndex].sth_iskonto1 + $scope.StokHarListe[pIndex].sth_iskonto2 + $scope.StokHarListe[pIndex].sth_iskonto3));
        let TmpYuzde5 = $scope.StokHarListe[pIndex].sth_iskonto5 / ($scope.StokHarListe[pIndex].sth_tutar - ($scope.StokHarListe[pIndex].sth_iskonto1 + $scope.StokHarListe[pIndex].sth_iskonto2 + $scope.StokHarListe[pIndex].sth_iskonto3 + $scope.StokHarListe[pIndex].sth_iskonto4));

        $scope.StokHarListe[pIndex].sth_iskonto1 = TmpTutar * TmpYuzde1;
        $scope.StokHarListe[pIndex].sth_iskonto2 = (TmpTutar - $scope.StokHarListe[pIndex].sth_iskonto1) * TmpYuzde2;
        $scope.StokHarListe[pIndex].sth_iskonto3 = (TmpTutar - ($scope.StokHarListe[pIndex].sth_iskonto1 + $scope.StokHarListe[pIndex].sth_iskonto2)) * TmpYuzde3;
        $scope.StokHarListe[pIndex].sth_iskonto4 = (TmpTutar- ($scope.StokHarListe[pIndex].sth_iskonto1 + $scope.StokHarListe[pIndex].sth_iskonto2 + $scope.StokHarListe[pIndex].sth_iskonto3)) * TmpYuzde4;
        $scope.StokHarListe[pIndex].sth_iskonto5 = (TmpTutar - ($scope.StokHarListe[pIndex].sth_iskonto1 + $scope.StokHarListe[pIndex].sth_iskonto2 + $scope.StokHarListe[pIndex].sth_iskonto3 + $scope.StokHarListe[pIndex].sth_iskonto4)) * TmpYuzde5;

        $scope.Update(pIndex);
        angular.element('#MdlDuzenle').modal('hide');
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
            for(i = 0;i < $scope.StokHarListe.length;i++)
            {
                $scope.IskTplTutar += $scope.StokHarListe[i].sth_tutar;
                $scope.IskTutar1 += $scope.StokHarListe[i].sth_iskonto1;
                $scope.IskTplTutar1 = $scope.IskTplTutar - $scope.IskTutar1;
                $scope.IskTutar2 += $scope.StokHarListe[i].sth_iskonto2;
                $scope.IskTplTutar2 = $scope.IskTplTutar1 - $scope.IskTutar2;
                $scope.IskTutar3 += $scope.StokHarListe[i].sth_iskonto3;
                $scope.IskTplTutar3 = $scope.IskTplTutar2 - $scope.IskTutar3;
                $scope.IskTutar4 += $scope.StokHarListe[i].sth_iskonto4;
                $scope.IskTplTutar4 = $scope.IskTplTutar3 - $scope.IskTutar4;
                $scope.IskTutar5 += $scope.StokHarListe[i].sth_iskonto5;
                $scope.IskTplTutar5 = $scope.IskTplTutar4 - $scope.IskTutar5;
            }
        }
        else
        {
            $scope.IskTplTutar = $scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_tutar;
            $scope.IskTutar1 = $scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_iskonto1;
            $scope.IskTplTutar1 = $scope.IskTplTutar - $scope.IskTutar1;
            $scope.IskTutar2 = $scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_iskonto2;
            $scope.IskTplTutar2 = $scope.IskTplTutar1 - $scope.IskTutar2;
            $scope.IskTutar3 = $scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_iskonto3;
            $scope.IskTplTutar3 = $scope.IskTplTutar2 - $scope.IskTutar3;
            $scope.IskTutar4 = $scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_iskonto4;
            $scope.IskTplTutar4 = $scope.IskTplTutar3 - $scope.IskTutar4;
            $scope.IskTutar5 = $scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_iskonto5;
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
    $scope.BtnIskontoKaydet = function()
    {   
        if($scope.IskontoTip == 0)
        {   
            for(i = 0;i < $scope.StokHarListe.length;i++)
            {
                $scope.StokHarListe[i].sth_iskonto1 = $scope.StokHarListe[i].sth_tutar * ($scope.IskYuzde1 / 100);
                $scope.StokHarListe[i].sth_iskonto2 = ($scope.StokHarListe[i].sth_tutar - $scope.StokHarListe[i].sth_iskonto1) * ($scope.IskYuzde2 / 100);
                $scope.StokHarListe[i].sth_iskonto3 = ($scope.StokHarListe[i].sth_tutar - ($scope.StokHarListe[i].sth_iskonto1 + $scope.StokHarListe[i].sth_iskonto2)) * ($scope.IskYuzde3 / 100);
                $scope.StokHarListe[i].sth_iskonto4 = ($scope.StokHarListe[i].sth_tutar - ($scope.StokHarListe[i].sth_iskonto1 + $scope.StokHarListe[i].sth_iskonto2 + $scope.StokHarListe[i].sth_iskonto3)) * ($scope.IskYuzde4 / 100);
                $scope.StokHarListe[i].sth_iskonto5 = ($scope.StokHarListe[i].sth_tutar - ($scope.StokHarListe[i].sth_iskonto1 + $scope.StokHarListe[i].sth_iskonto2 + $scope.StokHarListe[i].sth_iskonto3 + $scope.StokHarListe[i].sth_iskonto4)) * ($scope.IskYuzde5 / 100);

                $scope.FiyatEdit = $scope.StokHarListe[i].sth_tutar / $scope.StokHarListe[i].sth_miktar;
                $scope.MiktarEdit = $scope.StokHarListe[i].sth_miktar;

                $scope.Update(i);
            }
        }
        else
        {
            let i = $scope.IslemListeSelectedIndex;

            $scope.StokHarListe[i].sth_iskonto1 = $scope.StokHarListe[i].sth_tutar * ($scope.IskYuzde1 / 100);
            $scope.StokHarListe[i].sth_iskonto2 = ($scope.StokHarListe[i].sth_tutar - $scope.StokHarListe[i].sth_iskonto1) * ($scope.IskYuzde2 / 100);
            $scope.StokHarListe[i].sth_iskonto3 = ($scope.StokHarListe[i].sth_tutar - ($scope.StokHarListe[i].sth_iskonto1 + $scope.StokHarListe[i].sth_iskonto2)) * ($scope.IskYuzde3 / 100);
            $scope.StokHarListe[i].sth_iskonto4 = ($scope.StokHarListe[i].sth_tutar - ($scope.StokHarListe[i].sth_iskonto1 + $scope.StokHarListe[i].sth_iskonto2 + $scope.StokHarListe[i].sth_iskonto3)) * ($scope.IskYuzde4 / 100);
            $scope.StokHarListe[i].sth_iskonto5 = ($scope.StokHarListe[i].sth_tutar - ($scope.StokHarListe[i].sth_iskonto1 + $scope.StokHarListe[i].sth_iskonto2 + $scope.StokHarListe[i].sth_iskonto3 + $scope.StokHarListe[i].sth_iskonto4)) * ($scope.IskYuzde5 / 100);
            
            $scope.FiyatEdit = $scope.StokHarListe[i].sth_tutar / $scope.StokHarListe[i].sth_miktar;
            $scope.MiktarEdit = $scope.StokHarListe[i].sth_miktar;

            $scope.Update(i);
        }

        $("#MdlIskontoEkran").modal('hide');
    }
    $scope.BtnOnlineYazdir = function()
    {   
        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "UPDATE CARI_HESAP_HAREKETLERI SET cha_special1 = 1" +
                    "WHERE cha_evrakno_seri = @cha_evrakno_seri AND cha_evrakno_sira = @cha_evrakno_sira AND cha_evrak_tip = @cha_evrak_tip ",
            param:  ['cha_evrakno_seri','cha_evrakno_sira','cha_evrak_tip'],
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
    $scope.DepoChange = function()
    {
        $scope.DepoListe.forEach(function(item) 
        {
            if(item.KODU == $scope.DepoNo)
                $scope.DepoAdi = item.ADI;
        });
    }
    $scope.EvrakGetir = async function(pData)
    {
        $scope.FatKontrol = pData;
        await db.GetPromiseTag($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],async function(data)
        {
            if(data.length > 0)
            {
                Init();
                InitCariGrid();
                InitIslemGrid();
                InitPartiLotGrid();
                
                if(typeof db.Rota.Kodu != 'undefined')
                {
                    //YAPILACAK
                    $scope.RotaKontrol = true;
                }
                
                $scope.Seri = data[0].sth_evrakno_seri;
                $scope.Sira = data[0].sth_evrakno_sira;
                $scope.EvrakTip = data[0].sth_evraktip;
                $scope.Tip = data[0].sth_tip;
                $scope.NormalIade = data[0].sth_normal_iade;
                $scope.DisTicaretTur = data[0].sth_disticaret_turu;
                $scope.Cins = data[0].sth_cins;
                $scope.CariKodu = data[0].sth_cari_kodu;
                $scope.CariAdi = data[0].CARIADI;
                $scope.BelgeNo = data[0].sth_belge_no;
                $scope.Tarih = new Date(data[0].sth_tarih).toLocaleDateString();
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

                db.GetData($scope.Firma,'CariHarGetir',[$scope.Seri,$scope.Sira,$scope.ChaEvrakTip],function(Data)
                {
                    $scope.CariHarListe = Data;
                    $scope.Tpoz = Data[0].cha_tpoz
                    if($scope.Tpoz == 1 )
                    {
                        db.GetData($scope.Firma,'CmbKasaGetir',[0],function(data)
                        {
                            $scope.KasaListe = data;
                            $scope.KasaKodu = $scope.CariHarListe[0].cha_kod;
                            $scope.KasaListe.forEach(function(item)
                            {
                                if(item.KODU == $scope.KasaKodu)
                                {
                                    $scope.KasaAdi = item.ADI;
                                }
                               $scope.KasaChange(); 
                            });
                        }); 
                    }
                });

                $scope.AraToplam = 0;
                $scope.ToplamIndirim = 0;
                $scope.NetToplam = 0;
                $scope.ToplamKdv = 0;
                $scope.GenelToplam = 0;

                $scope.CmbCariAra = "0";
                $scope.TxtCariAra = "";
                
                if($scope.CariKodu != "")
                {
                    await db.GetData($scope.Firma,'CariGetir',[$scope.CariKodu,'',UserParam.Sistem.PlasiyerKodu],async function(data)
                    {
                        if(localStorage.mode = 'false')
                        {
                            const datas = await data;
                            for(x = 0;x < datas.length;x++)
                            {
                                $scope.CariListe = datas;  
                                let item = x;
                                await db.GetData($scope.Firma,'CariMiktarHesapla',[datas[x].KODU],async function(CariHarData)
                                {
                                    if(CariHarData[0].BAKIYE != 0)
                                    {
                                        datas[item].BAKIYE += CariHarData[0].BAKIYE;
                                        $scope.CariListe = datas;  
                                        $scope.Adres = $scope.CariListe[0].ADRES;
                                        $scope.Adres1 = $scope.CariListe[0].ADRES1;
                                        $scope.Adres2 = $scope.CariListe[0].ADRES2;
                                        $scope.CariBakiye = $scope.CariListe[0].BAKIYE;
                                        $scope.CariVDADI = $scope.CariListe[0].VDADI;
                                        $scope.CariVDNO = $scope.CariListe[0].VDNO;
                                        $scope.Risk = $scope.CariListe[0].RISK;
                                        $("#TblCari").jsGrid({data : $scope.CariListe});
                                        console.log(datas)
                                        let Obj = $("#TblCari").data("JSGrid");
                                        let Item = Obj.rowByItem(datas[0]);
                                        $scope.CariListeRowClick(0,Item,Obj);
                                        FisData(data);
                                    }
                                });
                            }
                        }
                        else
                        {
                            $scope.CariListe = data;
                            $scope.Adres = $scope.CariListe[0].ADRES;
                            $scope.Adres1 = $scope.CariListe[0].ADRES1;
                            $scope.Adres2 = $scope.CariListe[0].ADRES2;
                            $scope.CariBakiye = $scope.CariListe[0].BAKIYE;
                            $scope.CariVDADI = $scope.CariListe[0].VDADI;
                            $scope.CariVDNO = $scope.CariListe[0].VDNO;
                            $scope.Risk = $scope.CariListe[0].RISK;
                            $("#TblCari").jsGrid({data : $scope.CariListe});
                            
                            let Obj = $("#TblCari").data("JSGrid");
                            let Item = Obj.rowByItem(data[0]);
                            
                            $scope.CariListeRowClick(0,Item,Obj);
                            FisData(data);
                            $scope.Loading = false;
                            $scope.TblLoading = true;
                        }

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
                        $("#TblCari").jsGrid({data : $scope.CariListe});

                        let Obj = $("#TblCari").data("JSGrid");
                        let Item = Obj.rowByItem(data[0]);
                        
                        $scope.CariListeRowClick(0,Item,Obj);
                    });
                }
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
                db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(e){$scope.SorumlulukListe = e; $scope.Sorumluluk = data[0].sth_stok_srm_merkezi});
                db.FillCmbDocInfo($scope.Firma,'CmbPersonelGetir',function(e){$scope.PersonelListe = e; $scope.Personel = data[0].sth_plasiyer_kodu});
                db.FillCmbDocInfo($scope.Firma,'CmbProjeGetir',function(e){$scope.ProjeListe = e; $scope.Proje = data[0].sth_proje_kodu});
                db.FillCmbDocInfo($scope.Firma,'CmbOdemePlanGetir',function(e){$scope.OdemePlanListe = e; $scope.OdemeNo = data[0].sth_odeme_op.toString()});
                $scope.StokHarListe = data;
                $("#TblIslem").jsGrid({data : $scope.StokHarListe});  

                DipToplamHesapla();
                ToplamMiktarHesapla();
                EvrakGetirChange();

                $scope.EvrakLock = true;
                $scope.BarkodLock = false;

                angular.element('#MdlEvrakGetir').modal('hide');

                alertify.alert("<a style='color:#3e8ef7''>" + $scope.ToplamSatir + " " + "Satır Kayıt Başarıyla Getirildi.. !" + "</a>" );

                if(typeof localStorage.FaturaParam != 'undefined')
                {
                    localStorage.removeItem("FaturaParam");
                }
                
                BarkodFocus(1);
                $timeout(function(){FisData(data);},200);  

            }
            else
            {
                angular.element('#MdlEvrakGetir').modal('hide');
                alertify.alert("<a style='color:#3e8ef7''>" + "Evrak Bulunamadı !" + "</a>" );
            }
        });            
    }
    $scope.EvrakTipChange = async function(pTip)
    {
        if(ParamName == "AlisFatura")
        {   
            if($scope.CmbEvrakTip == 0) //Perakende Alış Faturası
            {
               $scope.VergisizFl = 0
               $scope.DisTicaretTur = 0; 
               $scope.EvrakTip = 3;
               $scope.NormalIade = 0;
               $scope.Tip = 0;
               $scope.Cins = 1;
               $scope.ChaEvrakTip = 0;
               $scope.ChaTip = 1;
               $scope.ChaCins = 6;
               $scope.ChaTicaretTuru = 1;
               $scope.Tpoz = 0;
               $scope.CariCinsi = 0;
               $scope.KasaKodu = "";
               $scope.KasaAdi = "";
            }
            else if($scope.CmbEvrakTip == 1) //Toptan Alıs Faturası
            {
                $scope.VergisizFl = 0
                $scope.DisTicaretTur = 0;
                $scope.EvrakTip = 3;
                $scope.NormalIade = 0;
                $scope.Tip = 0;
                $scope.Cins = 0;
                $scope.ChaEvrakTip = 0;
                $scope.ChaTip = 1;
                $scope.ChaCins = 6;
                $scope.ChaTicaretTuru = 0;
                $scope.Tpoz = 0;
                $scope.CariCinsi = 0;
                $scope.KasaKodu = "";
                $scope.KasaAdi = "";
            }
            else if($scope.CmbEvrakTip == 2) //İhraç Kayıtlı Yurtiçi Ticaret
            {
                $scope.VergisizFl = 0
                $scope.DisTicaretTur = 0;
                $scope.EvrakTip = 3;
                $scope.NormalIade = 0;
                $scope.Tip = 0;
                $scope.Cins = 2;
                $scope.ChaEvrakTip = 0;
                $scope.ChaTip = 1;
                $scope.ChaCins = 13;
                $scope.ChaTicaretTuru = 2;
                $scope.Tpoz = 0;
                $scope.CariCinsi = 0;
                $scope.KasaKodu = "";
                $scope.KasaAdi = "";
            }
            else if($scope.CmbEvrakTip == 3) //İhraç Kayıtlı Yurtdışı Ticaret
            {
                $scope.VergisizFl = 0
                $scope.DisTicaretTur = 0;
                $scope.EvrakTip = 3;
                $scope.NormalIade = 0;
                $scope.Tip = 0;
                $scope.Cins = 2;
                $scope.ChaEvrakTip = 0;
                $scope.ChaTip = 1;
                $scope.ChaCins = 13;
                $scope.ChaTicaretTuru = 4;
                $scope.Tpoz = 0;
                $scope.CariCinsi = 0;
                $scope.KasaKodu = "";
                $scope.KasaAdi = "";
            }
            else if($scope.CmbEvrakTip == 4) // Kapalı Toptan Alıs Faturası
            {
                $scope.VergisizFl = 0
                $scope.DisTicaretTur = 0;
                $scope.EvrakTip = 3;
                $scope.NormalIade = 0;
                $scope.Tip = 0;
                $scope.Cins = 0;
                $scope.ChaEvrakTip = 0;
                $scope.ChaTip = 1;
                $scope.ChaCins = 6;
                $scope.ChaTicaretTuru = 0;
                $scope.Tpoz = 1;
                $scope.CariCinsi = 4;
                db.GetData($scope.Firma,'CmbKasaGetir',[0],function(data)
                {
                    $scope.KasaListe = data;
                    $scope.KasaKodu = UserParam[ParamName].Kasa;
                    $scope.KasaListe.forEach(function(item)
                    {
                        if(item.KODU == $scope.KasaKodu)
                        {
                            $scope.KasaAdi = item.ADI;
                        }
                          
                    });
                });    
            }
            else if($scope.CmbEvrakTip == 5) //İthalat Faturası
            {
                $scope.VergisizFl = 1;
                $scope.DisTicaretTur = 3;
                $scope.EvrakTip = 3;
                $scope.NormalIade = 0;
                $scope.Tip = 0;
                $scope.Cins = 12;
                $scope.ChaEvrakTip = 0;
                $scope.ChaTip = 1;
                $scope.ChaCins = 6;
                $scope.ChaTicaretTuru = 4;
                $scope.Tpoz = 0;
                $scope.CariCinsi = 0;
                $scope.KasaKodu = "";
                $scope.KasaAdi = "";
            }
        }
        else
        {
            if($scope.CmbEvrakTip == 0) //Perakende Satış Faturası
            {
               $scope.VergisizFl = 0
               $scope.DisTicaretTur = 0;
               $scope.EvrakTip = 4;
               $scope.NormalIade = 0;
               $scope.Tip = 1;
               $scope.Cins = 1;
               $scope.ChaEvrakTip = 63;
               $scope.ChaTip = 0;
               $scope.ChaCins = 7;
               $scope.ChaTicaretTuru = 1;
               $scope.Tpoz = 0;
               $scope.CariCinsi = 0;
               $scope.KasaKodu = "";
               $scope.KasaAdi = "";
            }
            else if($scope.CmbEvrakTip == 1) //Toptan Satış Faturası
            {
                $scope.VergisizFl = 0
                $scope.DisTicaretTur = 0;
                $scope.EvrakTip = 4;
                $scope.NormalIade = 0;
                $scope.Tip = 1;
                $scope.Cins = 0;
                $scope.ChaEvrakTip = 63;
                $scope.ChaTip = 0;
                $scope.ChaCins = 6;
                $scope.ChaTicaretTuru = 0;
                $scope.Tpoz = 0;
                $scope.CariCinsi = 0;
                $scope.KasaKodu = "";
                $scope.KasaAdi = "";
            }
            else if($scope.CmbEvrakTip == 2) //İhraç Kayıtlı Yurtiçi Ticaret
            {
                $scope.VergisizFl = 0
                $scope.DisTicaretTur = 0;
                $scope.EvrakTip = 4;
                $scope.NormalIade = 0;
                $scope.Tip = 1;
                $scope.Cins = 2;
                $scope.ChaEvrakTip = 63;
                $scope.ChaTip = 0;
                $scope.ChaCins = 13;
                $scope.ChaTicaretTuru = 2;
                $scope.Tpoz = 0;
                $scope.CariCinsi = 0;
                $scope.KasaKodu = "";
                $scope.KasaAdi = "";
            }
            else if($scope.CmbEvrakTip == 3) //İhraç Kayıtlı Yurtdışı Ticaret
            {
                $scope.VergisizFl = 0
                $scope.DisTicaretTur = 4;
                $scope.EvrakTip = 4;
                $scope.NormalIade = 0;
                $scope.Tip = 1;
                $scope.Cins = 2;
                $scope.ChaEvrakTip = 63;
                $scope.ChaTip = 0;
                $scope.ChaCins = 13;
                $scope.ChaTicaretTuru = 4;
                $scope.Tpoz = 0;
                $scope.CariCinsi = 0;
                $scope.KasaKodu = "";
                $scope.KasaAdi = "";
            }
            else if($scope.CmbEvrakTip == 4) // Kapalı Toptan Satış Faturası
            {
                $scope.VergisizFl = 0
                $scope.DisTicaretTur = 0;
                $scope.EvrakTip = 4;
                $scope.NormalIade = 0;
                $scope.Tip = 1;
                $scope.Cins = 0;
                $scope.ChaEvrakTip = 63;
                $scope.ChaTip = 0;
                $scope.ChaCins = 6;
                $scope.ChaTicaretTuru = 0;
                $scope.Tpoz = 1;
                $scope.CariCinsi = 4;
                db.GetData($scope.Firma,'CmbKasaGetir',[0],function(data)
                {
                    $scope.KasaListe = data;
                    $scope.KasaKodu = UserParam[ParamName].Kasa;
                    $scope.KasaListe.forEach(function(item)
                    {
                        if(item.KODU == $scope.KasaKodu)
                        {
                            $scope.KasaAdi = item.ADI;
                        }
                    });
                });    
            }
        }
        if(pTip)//EVRAK GETİR İÇİN YAPILDI
        if(localStorage.mode == 'true')
        {
            await db.MaxSiraPromiseTag($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip],function(data){$scope.Sira = data});
        }
        else
        {
            await db.GetPromiseTag($scope.Firma,'ParamGetir',[],async function(data)
            {
                console.log(data)
                $scope.Sira = data[0].SATIS_FATURA_SIRA
                await db.MaxSiraPromiseTag($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip],function(SiraData)
                {
                    if(SiraData >= $scope.Sira)
                    {
                        $scope.Sira = SiraData;
                    }
                });
            });
        }
    }
    $scope.EvrakDelete = function(pAlisSatis)
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Evrakı Silmek İstediğinize Emin Misiniz ?', 
        function()
        { 
            if($scope.StokHarListe.length > 0)
            {
                if(UserParam[ParamName].EvrakSil == 0)
                {
                    db.ExecuteTag($scope.Firma,'StokHarEvrDelete',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
                    {
                        if(typeof(data.result.err) == 'undefined')
                        {
                            angular.forEach($scope.StokHarListe,function(value)
                            {
                                db.ExecuteTag($scope.Firma,'CariHarEvrDelete',[$scope.Seri,$scope.Sira,$scope.ChaEvrakTip],function(data)
                                {   
                                    if(typeof(data.result.err) != 'undefined')
                                    {
                                        console.log(data.result.err);
                                    }
                                });

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
                            ParamName = "AlisFatura";
                            $scope.YeniEvrak(0)
                        }
                        else
                        {
                            ParamName = "SatisFatura";
                            $scope.YeniEvrak(1)
                        }
                    });
                    alertify.alert("<a style='color:#3e8ef7''>" + "Evrak Silme İşlemi Başarıyla Gerçekleşti !" + "</a>" );
                }
                else
                {
                    alertify.okBtn("Tamam");
                    alertify.alert("<a style='color:#3e8ef7''>" + "Evrak Silmeye Yetkiniz Yok !" + "</a>" );
                }
            }
            else
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Silinecek Evrak Yok !" + "</a>" );
            }
        }
        ,function(){});
    }
    $scope.Insert = function()
    {
        if(String($scope.Miktar).length > 7)
        {
            alertify.alert("Miktar 7 haneden fazla olamaz")
        }
        else
        {
            if(typeof($scope.Stok[0].KODU) != 'undefined')
            {   
                if(ParamName == "SatisFatura")
                {
                    if($scope.RiskParam != 0)
                    {
                        let TmpRiskOran = ($scope.CariBakiye / $scope.Risk) * 100;
        
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
                if(UserParam.SatisFatura.EksiyeDusme == 1 &&  $scope.EvrakTip == 4 && ($scope.Miktar * $scope.Stok[0].CARPAN) > $scope.Stok[0].DEPOMIKTAR)
                {
                    alertify.alert("Eksiye Düşmeye İzin Verilmiyor.");
                    return;
                }
                $scope.InsertLock = true
    
                if(typeof $scope.CariHarListe == 'undefined' || $scope.CariHarListe.length == 0 )
                {   
                    CariHarInsert(function(pResult)
                    {   
                        if(pResult == true)
                        {
                            console.log($scope.CariHarGuid)
                            StokHarInsert();     
                        }
                    });
                    $scope.InsertLock = false;
                }
                else
                {   
                    //Liste İçerisinde StokKodu Aynı Olanlar Aranıyor. 17.09.2019 - MahiR
                    let value = db.ListEqual($scope.StokHarListe,{sth_stok_kod : $scope.Stok[0].KODU});
                    if(value != null)
                    {
                        if(value.FIYAT == $scope.Stok[0].FIYAT)
                        {
                            let TmpFiyat  = value.sth_tutar / value.sth_miktar
                            let TmpMiktar = value.sth_miktar + ($scope.Miktar * $scope.Stok[0].CARPAN);
                            console.log($scope.Stok[0].TOPTANVERGIPNTR)
                            let Data =
                            {
                                Param :
                                [
                                    TmpMiktar,
                                    TmpMiktar,
                                    TmpFiyat * TmpMiktar,
                                    $scope.Stok[0].TOPTANVERGIPNTR,
                                    value.sth_iskonto1 + $scope.Stok[0].ISK.TUTAR1, //ISKONTO TUTAR 1
                                    value.sth_iskonto2 + $scope.Stok[0].ISK.TUTAR2, //ISKONTO TUTAR 2
                                    value.sth_iskonto3 + $scope.Stok[0].ISK.TUTAR3, //ISKONTO TUTAR 3
                                    value.sth_iskonto4 + $scope.Stok[0].ISK.TUTAR4, //ISKONTO TUTAR 4
                                    value.sth_iskonto5 + $scope.Stok[0].ISK.TUTAR5, //ISKONTO TUTAR 5
                                    value.sth_iskonto6 + $scope.Stok[0].ISK.TUTAR6, //ISKONTO TUTAR 6
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
                            console.log(Data)
                            UpdateData(Data);
                            $scope.InsertLock = false
                        }
                        else
                        {
                            StokHarInsert(function(pResult)
                            {
                                if(pResult)
                                {
                                    CariHarUpdate(); 
                                }
                            });
                            $scope.InsertLock = false;
                        }
                    }
                    else
                    {
                        console.log($scope.CariHarGuid)
                        StokHarInsert(function(pResult)
                        {
                            if(pResult)
                            {
                                CariHarUpdate(); 
                            }
                        });
                        $scope.InsertLock = false;
                    }
                }
            }
            else
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Barkod Okutunuz !" + "</a>" );
                console.log("Barkod Okutunuz!");
                $scope.InsertLock = false;
            }     
            console.log($scope.ManuelArama)
            if($scope.ManuelArama == true)
            {
                $scope.ManuelAramaClick();
            }
            BarkodFocus(1);
        }
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
    $scope.SatirDelete = function(pAlisSatis)
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');
        alertify.confirm('Evrakı silmek istediğinize eminmisiniz ?', 
        function()
        { 
            if($scope.IslemListeSelectedIndex > -1)
            {   
                if(UserParam[ParamName].EvrakSil == 0)
                {   
                    db.ExecuteTag($scope.Firma,'StokHarSatirDelete',[$scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_Guid],function(data)
                    {  
                        if(typeof(data.result.err) == 'undefined')
                        {    
                            db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
                            {
                                FisData(data)
                                db.ExecuteTag($scope.Firma,'BedenHarDelete',[$scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_Guid,11],function(data)
                                {
                                    if(typeof(data.result.err) != 'undefined')
                                    {
                                        console.log(data.result.err);
                                    }       
                                });

                                InsertAfterRefresh(data);

                                if($scope.StokHarListe.length > 0)
                                {
                                    CariHarUpdate(function(data)
                                    {
                                    });
                                }
                                else
                                {                                       
                                    db.ExecuteTag($scope.Firma,'CariHarSatirDelete',[$scope.CariHarListe[0].cha_Guid],function(data)
                                    {   
                                        //ALIŞ = 0 SATIŞ = 1
                                        if(pAlisSatis == 0)
                                        {
                                            ParamName = "AlisFatura";
                                            $scope.YeniEvrak(0)
                                        }
                                        else
                                        {
                                            ParamName = "SatisFatura";
                                            $scope.YeniEvrak(1)
                                        }
                                    });                   
                                }
                            });
                        }
                        else
                        {
                            console.log(data.result.err);
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
    $scope.YeniEvrak = async function (pAlisSatis)
    {
        Init();
        InitCariGrid();
        InitStokGrid();
        InitIslemGrid();
        InitPartiLotGrid();
        InitDizaynGrid();
        InitStokDurumGrid();
        InitStokHarGrid();

       //ALIŞ = 0 SATIŞ = 1
        if(pAlisSatis == 0)
        {
            ParamName = "AlisFatura";
            $scope.PersonelTip  = 1
        }
        else
        {
            ParamName = "SatisFatura";
            $scope.PersonelTip = 0;
        }
        if($scope.TahToplam > 0)
        {
            $scope.TahToplam = 0;
            $scope.FatSeri = "";
            $scope.FatSira = 0;
        } 
        $scope.FatKontrol = 0;
        $scope.FiyatListeNo = UserParam[ParamName].FiyatListe;
        $scope.EvrakLock = false;
        $scope.Seri = UserParam[ParamName].Seri;
        $scope.BelgeNo = UserParam[ParamName].BelgeNo;
        $scope.CmbEvrakTip = UserParam[ParamName].EvrakTip;
        $scope.CariKodu = UserParam[ParamName].Cari;
        $scope.AdresNo = UserParam[ParamName].AdresNo;
        if(UserParam[ParamName].KDVYok == "1")
        {
            $scope.VergiChk = true;
        }
        else
        {
            $scope.VergiChk = false;
        }
        if(typeof db.Rota.Kodu != 'undefined')
        {
            //YAPILACAK
            $scope.RotaKontrol = true;
            $scope.CariKodu = db.Rota.Kodu;
            $scope.CariAdi = db.Rota.Adi;
        }
        if(UserParam[ParamName].FiyatLock == 1)
        {
            $scope.FiyatLock = true;
        }
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
        await db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',async function(data)
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
        db.FillCmbDocInfo($scope.Firma,'CmbProjeGetir',function(data)
        {
            $scope.ProjeListe = data; 
            $scope.Proje = UserParam[ParamName].Proje
        });
        db.FillCmbDocInfo($scope.Firma,'CmbOdemePlanGetir',function(data)
        {
            $scope.OdemePlanListe = data; 
            $scope.OdemeNo = '0'
        });
        db.GetPromiseTag($scope.Firma,'FiyatListeGetir',[$scope.PersonelTip],function(data)
        {
            $scope.FiyatListe = data;
            $scope.FiyatListeNo = UserParam[ParamName].FiyatListe;
        });  
        if(typeof (localStorage.FaturaParam) != 'undefined') // Fatura Tahsilat Geçişi İçin Yapıldı.
        {
            $scope.Seri = JSON.parse(localStorage.FaturaParam).Seri;
            $scope.Sira = JSON.parse(localStorage.FaturaParam).Sira;
            $scope.EvrakTip = JSON.parse(localStorage.FaturaParam).EvrakTip;
            $scope.TahToplam = JSON.parse(localStorage.FaturaParam).Toplam;
            $scope.FatSeri = JSON.parse(localStorage.FaturaParam).TahSeri;
            $scope.FatSira = JSON.parse(localStorage.FaturaParam).TahSira;
            $scope.EvrakGetir();
        }        
        $scope.EvrakTipChange(true);//EVRAK GETİR İÇİN TRUE FALSE DEĞERİ GÖNDERİLİYOR.
        BarkodFocus(1);
    }
    $scope.SorumlulukChange = function()
    {
        $scope.SorumlulukListe.forEach(function(item) 
        {
            if(item.KODU == $scope.Sorumluluk)
                $scope.SorumlulukAdi = item.ADI;
        });
    }
    $scope.MiktarPress = function(keyEvent)
    {
        if(keyEvent.which == 40)
        {
            $window.document.getElementById("Miktar").focus();
            $window.document.getElementById("Miktar").select();
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
    $scope.PersonelChange = function()
    {
        $scope.PersonelListe.forEach(function(item)
        {
            if(item.KODU == $scope.Personel)
            $scope.PersonelAdi = item.ADI;
        });
    }  
    $scope.KasaChange = function()
    {
        $scope.KasaListe.forEach(function(item)
        {
            if(item.KODU == $scope.KasaKodu)
            {
                $scope.KasaAdi = item.ADI;
                $scope.CariDovizCinsi =item.DOVIZCINSI;
                $scope.CariDovizKuru = item.DOVIZKUR;
                $scope.EvrakDovizTip = item.DOVIZSEMBOL
            }
        });
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
    $scope.AdresNoChange = function()
    {
        db.GetData($scope.Firma,'CmbAdresNo',[$scope.CariKodu],function(data)
        {            
            $scope.AdresNoListe = data;

            for (let i = 0; i < $scope.AdresNoListe.length; i++)
            {
                $scope.SiraNo = i
                if($scope.AdresNo == $scope.AdresNoListe[i].KODU)
                {
                    $scope.AdresNo = $scope.AdresNoListe[i].KODU.toString()
                }
                $scope.SiraNo = document.getElementById("SeciliAdres").selectedIndex
            }
            if($scope.AdresNoListe.length == 0)
            {
                $scope.SiraNo = "0"
                $scope.AdresNo = "1"
            }
            if($scope.SiraNo == '')
            {
                    if($scope.AdresNoListe[0].KODU != 1)
                    {
                        $scope.AdresNo = $scope.AdresNoListe[0].KODU.toString()
                        $scope.SiraNo = $scope.AdresNoListe.map(function(e) {return e.KODU; }).indexOf(Number($scope.AdresNo))    
                    }
                    else
                    {
                        $scope.AdresNo = "1"
                        $scope.SiraNo = $scope.AdresNoListe.map(function(e) {return e.KODU; }).indexOf(Number($scope.AdresNo))    
                    }
            }
            if($scope.AdresNoListe.length == 0)
            {
                $scope.SiraNo = "0"
                $scope.AdresNo = "1"
            }
        });
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
                $scope.StokHarListe[pIndex].sth_vergi_pntr,
                $scope.StokHarListe[pIndex].sth_iskonto1, //ISKONTO TUTAR 1
                $scope.StokHarListe[pIndex].sth_iskonto2, //ISKONTO TUTAR 2
                $scope.StokHarListe[pIndex].sth_iskonto3, //ISKONTO TUTAR 3
                $scope.StokHarListe[pIndex].sth_iskonto4, //ISKONTO TUTAR 4
                $scope.StokHarListe[pIndex].sth_iskonto5, //ISKONTO TUTAR 5
                0, //ISKONTO TUTAR 6
                $scope.StokHarListe[pIndex].sth_sat_iskmas1, //SATIR ISKONTO 1
                $scope.StokHarListe[pIndex].sth_sat_iskmas2, //SATIR ISKONTO 2
                $scope.StokHarListe[pIndex].sth_sat_iskmas3, //SATIR ISKONTO 3
                $scope.StokHarListe[pIndex].sth_sat_iskmas4, //SATIR ISKONTO 4
                $scope.StokHarListe[pIndex].sth_sat_iskmas5, //SATIR ISKONTO 5
                0, // SATIR ISKONTO 6
                $scope.StokHarListe[pIndex].sth_Guid
            ],
            BedenPntr : $scope.StokHarListe[pIndex].BEDENPNTR,
            RenkPntr : $scope.StokHarListe[pIndex].RENKPNTR,
            Miktar : $scope.MiktarEdit,
            Guid :  $scope.StokHarListe[pIndex].sth_Guid
        };
        console.log($scope.StokHarListe[pIndex].BEDENPNTR,console.log($scope.StokHarListe[pIndex].RENKPNTR))

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
    $scope.MiktarFiyatValid = function()
    {
        if($scope.CmbEvrakTip != 5)
        {
            $scope.Stok[0].INDIRIM = 0;
            console.log($scope.Stok[0].ISK)
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
            $scope.Stok[0].INDIRIM = $scope.Stok[0].INDIRIM.toFixed(2)
            $scope.Stok[0].TOPTANVERGI1 = 0;
            if($scope.VergiChk == false)
            {
                $scope.Stok[0].KDV = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].TOPTANVERGI / 100);
                $scope.Stok[0].TOPTANVERGI1 = $scope.Stok[0].TOPTANVERGI
            }
            else if($scope.VergiChk == true)
            {
                $scope.Stok[0].KDV = 0;
                $scope.Stok[0].TOPTANVERGI1 = 0;
                if(localStorage.mode == "false"){$scope.Stok[0].TOPTANVERGIPNTR = 1;}else{$scope.Stok[0].TOPTANVERGIPNTR = 0;}
            }
            $scope.Stok[0].TOPTUTAR = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) + $scope.Stok[0].KDV;
        }
        else
        {
            $scope.Stok[0].TUTAR = ($scope.Stok[0].CARPAN * $scope.Miktar) * $scope.Stok[0].FIYAT;
            $scope.Stok[0].KDV = 0;
            $scope.Stok[0].TOPTUTAR = $scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM;
            $scope.Stok[0].TOPTANVERGIPNTR = 0;
        }
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
            $scope.CariFiyatListe = $scope.CariListe[pIndex].SATISFK;
            $scope.CariDovizCinsi = $scope.CariListe[pIndex].DOVIZCINSI;
            $scope.CariDovizCinsi1 = $scope.CariListe[pIndex].DOVIZCINSI1;
            $scope.CariDovizCinsi2 = $scope.CariListe[pIndex].DOVIZCINSI2;
            $scope.CariDovizKuru = $scope.CariListe[pIndex].DOVIZKUR;
            $scope.CariDovizKuru1 = $scope.CariListe[pIndex].DOVIZKUR1;
            $scope.CariDovizKuru2 = $scope.CariListe[pIndex].DOVIZKUR2;
            $scope.CariAltDovizKuru = $scope.CariListe[pIndex].ALTDOVIZKUR;
            $scope.CariIskontoKodu = $scope.CariListe[pIndex].ISKONTOKOD;
            $scope.CariBakiye = $scope.CariListe[pIndex].BAKIYE;
            $scope.CariVDADI = $scope.CariListe[pIndex].VDADI;
            $scope.CariVDNO = $scope.CariListe[pIndex].VDNO;
            $scope.BirimAdi = $scope.CariListe[pIndex].BIRIMADI;
            $scope.Adres = $scope.CariListe[pIndex].ADRES;
            $scope.Adres1 = $scope.CariListe[pIndex].ADRES1;
            $scope.Adres2 = $scope.CariListe[pIndex].ADRES2;
            $scope.DovizSembol = $scope.CariListe[pIndex].DOVIZSEMBOL
            $scope.DovizSembol1 = $scope.CariListe[pIndex].DOVIZSEMBOL1
            $scope.DovizSembol2 = $scope.CariListe[pIndex].DOVIZSEMBOL2
            $scope.Risk = $scope.CariListe[pIndex].RISK
            $scope.DovizChangeKodu = "0"
            $scope.DovizChange()
            //$scope.MainClick()
            AdresNoGetir();
            if($scope.Tpoz == 1)
            {
                $scope.KasaChange();
            }
        }
    }
    $scope.StokListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( StokSelectedRow ) { StokSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        StokSelectedRow = $row;
        
        $scope.Barkod = $scope.StokListe[pIndex].KODU;
        $scope.BarkodGirisClick(0);
        BarkodFocus(0);
        StokBarkodGetir($scope.Barkod);
    }
    $scope.IslemListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( IslemSelectedRow ) { IslemSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        IslemSelectedRow = $row;
        $scope.IslemListeSelectedIndex = pIndex;
    }
    $scope.PartiLotListeRowClick = function(pIndex,pItem,pObj)
    {   
        if ( PartiLotSelectedRow ) { PartiLotSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        PartiLotSelectedRow = $row;
        $scope.PartiLotListeSelectedIndex = pIndex;
    }
    $scope.BelgeBilgisiClick = function() 
    {
        $("#TbBelgeBilgisi").addClass('active');
        $("#TbMain").removeClass('active');
    }
    $scope.BarkodGirisClick = function(pData) 
    {   
        if($scope.Sira == 0 || typeof $scope.Sira == "undefined")
        {            
            alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Evrak Siranın Gelmesini Bekleyin!" + "</a>" );
        }
        else
        {
            if(pData == 1)
            {
                console.log($scope.ManuelArama)
                if($scope.ManuelArama == true)
                {
                    $scope.ManuelArama = false;
                }
            }
            if($scope.EvrakTip == 4 && $scope.KasaKodu != "")
            {
                $("#TbBarkodGiris").addClass('active');
                $("#TbMain").removeClass('active');
                $("#TbCariSec").removeClass('active');
                $("#TbBelgeBilgisi").removeClass('active');
                $("#TbIslemSatirlari").removeClass('active');
                $("#TbStok").removeClass('active');
                $("#TbStokDurum").removeClass('active');
                BarkodFocus(1);
            }
            else if($scope.CariKodu != "")
            {
                $("#TbBarkodGiris").addClass('active');
                $("#TbMain").removeClass('active');
                $("#TbCariSec").removeClass('active');
                $("#TbBelgeBilgisi").removeClass('active');
                $("#TbIslemSatirlari").removeClass('active');
                $("#TbStok").removeClass('active');
                $("#TbStokDurum").removeClass('active');
                BarkodFocus(1);
            }              
            else
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Gerekli Alanları Doldurunuz. !" + "</a>" );
            }
        }
    }
    $scope.IslemSatirlariClick = function()
    {   
        if($scope.ToplamSatir <= 0)
        {
            alertify.alert("<a style='color:#3e8ef7''>" + "Gösterilecek Evrak Bulunamadı !" + "</a>" );
            $("#TbMain").addClass('active');
            $("#TbIslemSatirlari").removeClass('active');
            $("#TbBelgeBilgisi").removeClass('active');
            $("#TbBarkodGiris").removeClass('active');
            $("#TbStok").removeClass('active');
        }
        else
        {
            if(typeof db.Rota.Kodu != "undefined")
            {
                $scope.RotaKontrol = false;
            }
            else
            {
                $scope.RotaKontrol = true;
            }
            $("#TbIslemSatirlari").addClass('active');
            $("#TbMain").removeClass('active');
            $("#TbBelgeBilgisi").removeClass('active');
            $("#TbBarkodGiris").removeClass('active');
            $("#TbStok").removeClass('active');
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
        StokFocus()
        $scope.ManuelArama = true;
        console.log($scope.ManuelArama)
    }
    $scope.CariSecClick = function()
    {
        if($scope.EvrakLock == false)
        {
            if($scope.Sira == 0 || typeof $scope.Sira == "undefined")
            {            
                alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Evrak Siranın Gelmesini Bekleyin!" + "</a>" );
            }
            else
            {
                $("#TbCariSec").addClass('active');
                $("#TbMain").removeClass('active');
                CariFocus();
            }
        }
        else
        {
            alertify.alert("<a style='color:#3e8ef7''>" + "Cari Seçmek İçin Lütfen Yeni Evrak Seçin" + "</a>" );
        }
      
    }
    $scope.MainClick = function() 
    {
        if(typeof db.Rota.Kodu != "undefined")
        {
            $scope.RotaKontrol = true;
        }
        else
        {
            $scope.RotaKontrol = false;
        }
        $("#TbMain").addClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TbCariSec").removeClass('active');
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
        if($scope.FisDizaynTip == 0)
        {
            let FisDizayn = "";
            let FisGenelToplam = "";
    
            if(typeof ($scope.TahToplam) == 'undefined')
            {
                $scope.TahToplam = 0;
                $scope.FatSeri = "";
                $scope.FatSira = 0;
            }
            OncekiBakiye = 0;
            KalanBakiye = 0;
            $scope.OncekiBakiye = 0;
            //-----------OFFLINE İÇİN BEKLETİLİYOR//-----------\\
            // var TmpQuery = 
            // {
            //     db : '{M}.' + $scope.Firma,
            //     query:  "SELECT CONVERT(NVARCHAR,CAST(ISNULL((SELECT dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,cari_doviz_cinsi,0,0,0,0)),0)AS DECIMAL(15,2))) AS BAKIYE " +
            //             "FROM CARI_HESAPLAR  WHERE cari_kod = @CARIKODU " ,
            //     param:  ['CARIKODU'], 
            //     type:   ['string|25'], 
            //     value:  [$scope.CariKodu]    
            // }
        
            // await db.GetPromiseQuery(TmpQuery,function(Data)
            // {
            //     $scope.CariBakiye = Data[0].BAKIYE
            // });
            console.log($scope.FatKontrol)
            if($scope.FatKontrol == 1)
            {
                OncekiBakiye = $scope.CariBakiye - $scope.GenelToplam + $scope.TahToplam 
                KalanBakiye = OncekiBakiye + $scope.GenelToplam
            }
            else
            {
                OncekiBakiye = $scope.CariBakiye + $scope.TahToplam 
                KalanBakiye = OncekiBakiye + $scope.GenelToplam
            }


            console.log("Cari Bakiye 1 " + $scope.CariBakiye1)
            console.log("Cari Bakiye " + $scope.CariBakiye)
            console.log("Önceki Bakiye " + OncekiBakiye)
            console.log("Kalan Bakiye " + KalanBakiye)

            FisGenelToplam = $scope.GenelToplam + $scope.CariBakiye
            FisKalanBakiye = $scope.CariBakiye + $scope.GenelToplam - $scope.TahToplam
            $scope.ToplamAdet = db.SumColumn($scope.FisLength,"MIKTAR");
            console.log($scope.ToplamAdet)
            let i = 31 - $scope.FisLength.length;
            let Satır = "";
    
            for(let x = 0; x <= i; x++)
            {    
                Satır = Satır + "                                             -"+ "\n"; 
            }
            FisDizayn = "                                             -" + "\n" + 
                        "           SATIŞ FATURA BİLGİ FİŞİ            " + "\n" +
                        "              AZİZOĞLU SUCUKLARI              " + "\n" +
                        "V.DAIRESI: Burdur           V.NO: 127 004 7667" + "\n" +
                        "MERSİS NO: 0127004766700011 T.SİCİL NO: 4927  " + "\n" +
                        "Burdur Organize Sanayi Bölgesi 40. Sk. No: 38 " + "\n" +
                        "Tel:0248 252 98 17                            " + "\n" +
            $scope.FisDeger + "\n" + "\n" +
            SpaceLength("ÜRÜN ADI",17) +    SpaceLength(" MIK",10) + " " + SpaceLength("FIYAT",5) + " " + SpaceLength("ISK",4) + SpaceLength("NET TUTAR",5) + "\n" + 
            $scope.FisData + "\n" + //İÇERİK
            Satır
            FisDizayn = FisDizayn + "Toplam Adet: " + $scope.ToplamAdet + "\n"
            FisDizayn = FisDizayn + SpaceLength("Önceki B. : ",12) + SpaceLength(parseFloat(OncekiBakiye).toFixed(2),9)  + " " + SpaceLength("Brüt Top. : ",12) + parseFloat($scope.AraToplam).toFixed(2) + "\n" 
            FisDizayn = FisDizayn + SpaceLength("Bu Fatura. : ",12) + SpaceLength(parseFloat($scope.GenelToplam).toFixed(2),9)  + " " +SpaceLength("Top. KDV : ",11) + parseFloat($scope.ToplamKdv).toFixed(2) + "\n" 
            FisDizayn = FisDizayn + SpaceLength("Cari Bak. : ",12) + SpaceLength(parseFloat(KalanBakiye).toFixed(2),9)  + " " + "Genel Top. : " + parseFloat($scope.GenelToplam).toFixed(2) + "\n" +
            "-\n" + "-\n" + KalanBakiye + "-\n" + OncekiBakiye + "-\n" + "-\n" + "-\n" + "-\n" 
            FisDizayn = FisDizayn.split("İ").join("I").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u");
            console.log(FisDizayn)

            // var doc = new jsPDF()
            // doc.text(FisDizayn, 10, 10)
            // doc.save('deneme.pdf')

            db.BTYazdir(FisDizayn,UserParam.Sistem.FisDizayn,function(pStatus)
            {
                console.log(pStatus)
                if(pStatus)
                {
                    alertify.alert("<a style='color:#3e8ef7''>" + "Yazdırma İşlemi Gerçekleşti </a>" );         
                }
            });
        }
        else if ($scope.FisDizaynTip == 1)
        {
            let FisDizayn = "";
            let FisGenelToplam = "";
    
            if(typeof ($scope.TahToplam) == 'undefined')
            {
                $scope.TahToplam = 0;
                $scope.FatSeri = "";
                $scope.FatSira = 0;
            }
    
            var TmpQuery = 
            {
                db : '{M}.' + $scope.Firma,
                query:  "SELECT CONVERT(NVARCHAR,CAST(ISNULL((SELECT dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,cari_doviz_cinsi,0,0,0,0)),0)AS DECIMAL(15,2))) AS BAKIYE " +
                        "FROM CARI_HESAPLAR  WHERE cari_kod = @CARIKODU " ,
                param:  ['CARIKODU'], 
                type:   ['string|25'], 
                value:  [$scope.CariKodu]    
            }
        
            await db.GetPromiseQuery(TmpQuery,function(Data)
            {
                $scope.CariBakiye = Data[0].BAKIYE
            });
 
            $scope.CariBakiye = $scope.CariBakiye - $scope.GenelToplam + $scope.TahToplam 
            FisGenelToplam = $scope.GenelToplam + $scope.CariBakiye
            FisKalanBakiye = $scope.CariBakiye + $scope.GenelToplam - $scope.TahToplam
            let i = 20 - $scope.FisLength.length;
            let Satır = "";
    
            for(let x = 0; x <= i; x++)
            {
                Satır = Satır + "                                             -"+ "\n"; 
            } 
    
            FisDizayn = "                                             -" + "\n" + 
                        $scope.FisDeger + "-\n" + "\n" +
                        $scope.FisData + "-\n" + //İÇERİK
                        Satır
            FisDizayn = FisDizayn + "                         Ara Toplam : " + parseFloat($scope.AraToplam).toFixed(2) + "\n" +  "                     Toplam Iskonto : " +  parseFloat($scope.ToplamIndirim).toFixed(2) + "\n"
            FisDizayn = FisDizayn + "                         Toplam Kdv : "  + parseFloat($scope.ToplamKdv).toFixed(2) + "\n" + "                       Genel Toplam : " + parseFloat($scope.GenelToplam).toFixed(2) + "\n" +
            "                                             -" +$scope.CariBakiye + "\n" + 
            "                                             -" +FisKalanBakiye+ "\n" + 
            "                                             -" +FisGenelToplam+ "\n" + 
            "                                             -" + "\n" + 
            "                                             -" + "\n" + 
            "                                             -" + "\n" + 
            "                                             -" + "\n" + 
            "                                             -" + "\n"
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
        else
        {
            alertify.alert("Reis parametreni kontrol et ya yazamıyorum bir şey")
        }
    }
    $scope.BtnTahClick = function()
    {
        let Param =
        {
            "Seri" : $scope.Seri,
            "Sira" : $scope.Sira,
            "CariKodu" : $scope.CariKodu,
            "EvrakTip" : $scope.EvrakTip
        }
        localStorage.FaturaParam = JSON.stringify(Param);
    }
    $scope.BtnEtiketBas = function()
    {
        for(i = 0; i < $scope.StokHarListe.length; i++)
        {
            $scope.StokKodu = $scope.StokHarListe[i].sth_stok_kod;
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
                $scope.StokHarListe[i].sth_miktar,
                $scope.DepoNo,
                $scope.StokKodu,
                1,
                1,
                $scope.Barkod,
                $scope.StokHarListe[i].sth_miktar
            ]
            db.ExecuteTag($scope.Firma,'EtiketInsert',InsertData,function(InsertResult)
            {
                
            });
        }
        if(i == $scope.StokHarListe.length)
        {
            alertify.alert("Etiket Yazdırıldı.");
        }
        else
        {
            alertify.alert("Etiket Yazdıralamadı.");
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
                $scope.GunSonuData = $scope.GunSonuData + SpaceLength($scope.DizaynListe[i].CARIADI,20) + " " + SpaceLength($scope.DizaynListe[i].SAAT,5) + " " +SpaceLength($scope.DizaynListe[i].SERI + "-" + $scope.DizaynListe[i].SIRA,10) + " " + SpaceLength(parseFloat($scope.DizaynListe[i].TUTAR.toFixed(2)),8) + "\n";
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
                        "CARIADI              SAAT  F.SERI    F.TUTAR" + "\n" +
                        $scope.GunSonuData + 
                        "------------------------------------------------" + "\n" + 
                        "                      Genel Toplam: " + $scope.DGenelToplam.toFixed(2) + "\n" + 
                        Satır +
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

        if(localStorage.mode == 'false')
        {
            var TmpQuery = 
            {
                db : '{M}.' + $scope.Firma,
                query:  "SELECT " +
                        "sth_evrakno_seri AS SERI, " +
                        "sth_evrakno_sira AS SIRA, " +
                        // "LEFT(CONVERT(VARCHAR(8),MAX(sth_create_date),108),5) AS SAAT, " +
                        "MAX(sth_cari_kodu) AS CARIKOD,  " +
                        "(SELECT UNVAN1 FROM CARI WHERE KODU = sth_cari_kodu) AS CARIADI,  " +
                        "IFNULL((select PERSONELADI from PERSONEL where PERSONELKODU=sth_plasiyer_kodu),'') AS PERSONEL," +
                        "ROUND(SUM(sth_tutar),2) TUTAR " +
                        "FROM STOKHAR  " +
                        "WHERE sth_evraktip = 4 AND sth_tarih = date('now') " +
                        "AND sth_evrakno_seri = '" + $scope.Seri + "' " + 
                        "GROUP BY sth_evrakno_seri,sth_evrakno_sira " 
            }
        }
        else
        {
            var TmpQuery = 
            {
                db : '{M}.' + $scope.Firma,
                query:  "SELECT " +
                        "sth_evrakno_seri AS SERI, " +
                        "sth_evrakno_sira AS SIRA, " +
                        "LEFT(CONVERT(VARCHAR(8),MAX(sth_create_date),108),5) AS SAAT, " +
                        "MAX(sth_cari_kodu) AS CARIKOD, " +
                        "(SELECT cari_unvan1 FROM CARI_HESAPLAR WHERE cari_kod = MAX(sth_cari_kodu)) + ' ' +" +
                        "(SELECT cari_unvan2 FROM CARI_HESAPLAR WHERE cari_kod = MAX(sth_cari_kodu)) AS CARIADI, " +
                        "ISNULL((SELECT cari_per_adi  FROM CARI_PERSONEL_TANIMLARI WHERE cari_per_kod = MAX(sth_plasiyer_kodu)),'') AS PERSONEL, " +
                        "ROUND(SUM(sth_tutar),2) TUTAR " +
                        "FROM STOK_HAREKETLERI  " +
                        "WHERE sth_evraktip = 4 AND sth_cins = 1 AND sth_tarih = CONVERT(VARCHAR(10),GETDATE(),112) " +
                        "AND sth_evrakno_seri = '" + $scope.Seri + "'" + 
                        "GROUP BY sth_evrakno_seri,sth_evrakno_sira " 
            }
        }
        console.log(TmpQuery)
        await db.GetPromiseQuery(TmpQuery,async function(Data)
        {
            console.log(Data)
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
    $scope.BtnRota = function()
    {
        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "UPDATE ZIYARET_HAREKETLERI SET zyrt_Aciklama = @ACIKLAMA, zyrt_tamamlandi_fl = 1 WHERE zyrt_kodu = @ZIYARET ",
            param:  ['ACIKLAMA','ZIYARET'],
            type:   ['string|25','string|25'],
            value:  [$scope.RotaAciklama,db.Rota.Ziyaret]
        }
        db.ExecuteQuery(TmpQuery,function(data)
        {
            
        });
        db.Rota = {};
        var url = "main.html#!/Rota";
        $window.location.href = url;
    }
    $scope.HazirAciklama = function(pParam)
    {
        if(pParam == 0)
        {
            $scope.RotaAciklama = $("#RotaSelect option:selected").text()
        }
        else if(pParam = 1)
        {
            $scope.CmbAciklamaTip = "";
        }
    }
    //OFFLINE-AKTARIM
    $scope.BtnGonder = async function()
    {
        if(localStorage.mode == "false")
        {
            if(ParamName == 'AlisFatura')
            {
                db.GetData($scope.Firma,'CariHareketGonderGetir',[0],function(Data)
                {
                    $scope.CariHareketGonderListe = Data;
                    if($scope.CariHareketGonderListe.length > 0)
                    {
                        $scope.Loading = false;
                        $scope.TblLoading = true;
                        $("#TblStokHarListe").jsGrid({data : $scope.CariHareketGonderListe});
                        $("#TblStokHarListe").jsGrid({pageIndex: true});
                        $("#MdlGonder").modal('show');
                    }
                    else
                    {
                        alertify.alert("Evrak Bulunamadı");
                        $scope.Loading = false;
                        $scope.TblLoading = true;
                        $("#TblStokHarListe").jsGrid({data : $scope.CariHareketGonderListe});
                        $("#TblStokHarListe").jsGrid({pageIndex: true});
                    }   
                    
                });
            }
            else
            {
                db.GetData($scope.Firma,'CariHareketGonderGetir',[63],function(Data)
                {
                    console.log(Data)
                    $scope.CariHareketGonderList = Data;
                    for (let i = 0; i < $scope.CariHareketGonderList.length; i++) {
                        if($scope.CariHareketGonderList[i].status == 0)
                        {
                            $scope.CariHareketGonderListe = $scope.CariHareketGonderListe.concat($scope.CariHareketGonderList[i]) 
                        }
                    }
                    if($scope.CariHareketGonderList.length > 0)
                    {
                        $scope.Loading = false;
                        $scope.TblLoading = true;
                        $("#TblStokHarListe").jsGrid({data : $scope.CariHareketGonderList});
                        $("#TblStokHarListe").jsGrid({pageIndex: true});
                        $("#MdlGonder").modal('show');
                    }
                    else
                    {
                        alertify.alert("Evrak Bulunamadı");
                        $scope.Loading = false;
                        $scope.TblLoading = true;
                        $("#TblStokHarListe").jsGrid({data : $scope.CariHareketGonderList});
                        $("#TblStokHarListe").jsGrid({pageIndex: true});
                    }   
                    
                });
            }
            let TmpData = await db.GetPromiseTag($scope.Firma,'StokHareketGonderGetir',[$scope.EvrakTip]);
            $scope.StokHareketGonderListe = TmpData;
            console.log(TmpData)

            console.log($scope.CariHareketGonderListe)
        }
        else
        {
            alertify.alert("Online Modda Çalıştırılamaz!")
        }
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
            for (let i = 0; i < $scope.CariHareketGonderListe.length; i++) 
            {
                let TmpStatus = 1
                let TmpCariHarData = await db.GetPromiseTag($scope.Firma,'CariHarGetir',[$scope.CariHareketGonderListe[i].cha_evrakno_seri,$scope.CariHareketGonderListe[i].cha_evrakno_sira,$scope.CariHareketGonderListe[i].cha_evrak_tip]);
                let TmpStokHarData = await db.GetPromiseTag($scope.Firma,'StokHarGetir',[$scope.CariHareketGonderListe[i].cha_evrakno_seri,$scope.CariHareketGonderListe[i].cha_evrakno_sira,$scope.StokHareketGonderListe[i].sth_evraktip]);
                let TmpBedenData = await db.GetPromiseTag($scope.Firma,'StokBedenHarGetir',[$scope.CariHareketGonderListe[i].cha_evrakno_seri,$scope.CariHareketGonderListe[i].cha_evrakno_sira,$scope.CariHareketGonderListe[i].cha_evrak_tip,0]);
                
                localStorage.mode = 'true';
                let TmpMaxSira = await db.GetPromiseTag($scope.Firma,'MaxCariHarSira',[$scope.CariHareketGonderListe[i].cha_evrakno_seri,$scope.CariHareketGonderListe[i].cha_evrak_tip])
                for (let m = 0; m < TmpCariHarData.length; m++)
                {
                    let InsertCariData =
                    [
                        TmpCariHarData[m].cha_create_user,
                        TmpCariHarData[m].cha_lastup_user,
                        TmpCariHarData[m].cha_firmano,    
                        TmpCariHarData[m].cha_subeno,     
                        TmpCariHarData[m].cha_evrak_tip,
                        TmpCariHarData[m].cha_evrakno_seri,
                        TmpMaxSira[0].MAXEVRSIRA,
                        TmpCariHarData[m].cha_tarihi,     
                        TmpCariHarData[m].cha_tip,        
                        TmpCariHarData[m].cha_cinsi,      
                        TmpCariHarData[m].cha_normal_Iade,
                        TmpCariHarData[m].cha_tpoz,       
                        TmpCariHarData[m].cha_ticaret_turu,
                        TmpCariHarData[m].cha_belge_no,   
                        TmpCariHarData[m].cha_belge_tarih,
                        TmpCariHarData[m].cha_aciklama,   
                        TmpCariHarData[m].cha_satici_kodu,
                        TmpCariHarData[m].cha_EXIMkodu,   
                        TmpCariHarData[m].cha_projekodu,  
                        TmpCariHarData[m].cha_cari_cins,                          
                        TmpCariHarData[m].cha_kod,                              
                        TmpCariHarData[m].cha_ciro_cari_kodu,                   
                        TmpCariHarData[m].cha_d_cins,                             
                        TmpCariHarData[m].cha_d_kur,                              
                        TmpCariHarData[m].cha_altd_kur,                           
                        TmpCariHarData[m].cha_grupno,                             
                        TmpCariHarData[m].cha_srmrkkodu,                        
                        TmpCariHarData[m].cha_kasa_hizmet,                        
                        TmpCariHarData[m].cha_kasa_hizkod,                      
                        0,		                 
                        1,   	               
                        TmpCariHarData[m].cha_karsidgrupno ,	                 
                        TmpCariHarData[m].cha_karsisrmrkkodu,	                 
                        TmpCariHarData[m].cha_meblag,                             
                        TmpCariHarData[m].cha_aratoplam,                          
                        TmpCariHarData[m].cha_vade,                               
                        TmpCariHarData[m].cha_ft_iskonto1,                        
                        TmpCariHarData[m].cha_ft_iskonto2,                        
                        TmpCariHarData[m].cha_ft_iskonto3,                        
                        TmpCariHarData[m].cha_ft_iskonto4,                        
                        TmpCariHarData[m].cha_ft_iskonto5,                        
                        TmpCariHarData[m].cha_ft_iskonto6,                        
                        TmpCariHarData[m].cha_ft_masraf1,                         
                        TmpCariHarData[m].cha_ft_masraf2,                         
                        TmpCariHarData[m].cha_ft_masraf3,                         
                        TmpCariHarData[m].cha_ft_masraf4,                         
                        TmpCariHarData[m].cha_vergipntr,                          
                        TmpCariHarData[m].cha_vergi1,                             
                        TmpCariHarData[m].cha_vergi2,                             
                        TmpCariHarData[m].cha_vergi3,                             
                        TmpCariHarData[m].cha_vergi4,                             
                        TmpCariHarData[m].cha_vergi5,                             
                        TmpCariHarData[m].cha_vergi6,                             
                        TmpCariHarData[m].cha_vergi7,                             
                        TmpCariHarData[m].cha_vergi8,                             
                        TmpCariHarData[m].cha_vergi9,                             
                        TmpCariHarData[m].cha_vergi10,                            
                        TmpCariHarData[m].cha_vergisiz_fl,                        
                        TmpCariHarData[m].cha_otvtutari,                          
                        TmpCariHarData[m].cha_otvvergisiz_fl,                     
                        TmpCariHarData[m].cha_oivergisiz_fl,                      
                        TmpCariHarData[m].cha_trefno,                             
                        TmpCariHarData[m].cha_sntck_poz,                          
                        TmpCariHarData[m].cha_e_islem_turu,                       
                    ];
                    let TmpResultCari = await db.ExecutePromiseTag($scope.Firma,'CariHarInsert',InsertCariData)
                    if(typeof(TmpResultCari.result.err) != 'undefined')
                    {
                        TmpStatus = 0;
                    }
                    var TmpStokHar = TmpStokHarData.find(x => x.sth_fat_uid == TmpCariHarData[m].cha_Guid)
                    if(TmpStokHar)
                    {
                        console.log(Status)
                        let TmpMaxFatSira = await db.GetPromiseTag($scope.Firma,'MaxStokHarSira',[TmpStokHar.sth_evrakno_seri,TmpStokHar.sth_evraktip])
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
                                TmpMaxFatSira[0].MAXEVRSIRA,
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
                                TmpStokHar.sth_fat_uid,
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
                            var TmpResult =  await db.ExecutePromiseTag($scope.Firma,'StokHarInsert',InsertData)

                            if(typeof(TmpResult.result.err) != 'undefined')
                            {
                                TmpStatus = 0;
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
                                    alertify.alert("Bağlantı Problemi")
                                    TmpStatus = 0;
                                }
                            }
                        }
                    }
                    else
                    {
                        console.log("GUID BULUNAMADI")
                    }
                }
                localStorage.mode = 'false';
                if (TmpStatus == 1)
                {
                    let TmpUpdateQuery = 
                    {
                        db : '{M}.' + $scope.Firma,
                        query: "UPDATE STOKHAR SET status = 1 WHERE sth_evrakno_seri = '@sth_evrakno_seri' AND sth_evrakno_sira = @sth_evrakno_sira AND sth_tip = @sth_tip AND sth_cins = @sth_cins" ,
                        param:  ['sth_evrakno_seri:string|20','sth_evrakno_sira:int','sth_tip:int','sth_cins:int'],
                        value : [$scope.StokHareketGonderListe[i].sth_evrakno_seri,$scope.StokHareketGonderListe[i].sth_evrakno_sira,$scope.StokHareketGonderListe[i].sth_tip,$scope.StokHareketGonderListe[i].sth_cins]
                    }
                    let TmpUpdateQuery2 = 
                    {
                        db : '{M}.' + $scope.Firma,
                        query: "UPDATE CARIHAR SET status = 1 WHERE cha_evrakno_seri = '@cha_evrakno_seri' AND cha_evrakno_sira = @cha_evrakno_sira AND cha_evrak_tip = @cha_evrak_tip" ,
                        param:  ['cha_evrakno_seri:string|20','cha_evrakno_sira:int','cha_evrak_tip:int',],
                        value : [$scope.CariHareketGonderListe[i].cha_evrakno_seri,$scope.CariHareketGonderListe[i].cha_evrakno_sira,$scope.CariHareketGonderListe[i].cha_evrak_tip]
                    }
                    await db.GetPromiseQuery(TmpUpdateQuery)
                    await db.GetPromiseQuery(TmpUpdateQuery2)
                    console.log(1)
                    await db.GetData($scope.Firma,'StokHareketGonderGetir',[$scope.EvrakTip],function(Data)
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