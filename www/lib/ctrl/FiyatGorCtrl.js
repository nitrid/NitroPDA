function FiyatGorCtrl($scope,$window,$timeout,db)
{   
    let FiyatDegisSelectedRow = null;
    let StokSelectedRow = null;
    let PaletSelectedRow = null;
    let EklenecekStokSelectedRow= null;
    let BarkodSelectedRow = null;
    let PartiLotSelectedRow = null;
    
    $('#MdlPartiLot').on('hide.bs.modal', function () 
    {
        if($scope.TxtParti == "" && $scope.TxtLot == 0)
        {
            
        }
    });

    function Init()
    {
        gtag('config', 'UA-12198315-14', 
        {
            'page_title' : 'Fiyat Gör Etiket Bas',
            'page_path': '/FiyatGor'
        });

        $scope.Firma = $window.sessionStorage.getItem('Firma');
        UserParam = Param[$window.sessionStorage.getItem('User')];
        
        $scope.IlkTarih = new Date().toLocaleDateString('tr-TR',{ year: 'numeric', month: 'numeric', day: 'numeric' });
        $scope.SonTarih = new Date().toLocaleDateString('tr-TR',{ year: 'numeric', month: 'numeric', day: 'numeric' });
        $scope.Barkod = "";
        $scope.Birim = "";
        $scope.Fiyat = "";
        $scope.DepoNo = UserParam.FiyatGor.DepoNo;
        $scope.Miktar = "";
        $scope.Seri = UserParam.FiyatGor.Seri;
        $scope.Sira;
        $scope.Aciklama = "";
        $scope.BelgeNo = "";
        $scope.EtiketTip = 0;
        $scope.StokGridTip = "0";
        $scope.StokGridText = "";
        $scope.Marka = "";
        $scope.Reyon = "";
        $scope.ReyonStok = "";
        $scope.MaxSkt = "";
        $scope.PaletKodu = "";
        $scope.PaletBarkod = "";
        $scope.PaletGuid = "";
        $scope.PaletStokMiktar = 0;
        $scope.PaletMiktar = 0;
        $scope.PltBrutAgr = 0;
        $scope.PltNetAgr = 0;

        $scope.BasimTipi = 0;
        $scope.BasimAdet = 1;
        $scope.RenkNo = 0;
        $scope.BedenNo = 0;
        $scope.BasilacakMiktar = 1;
        $scope.FiyatListe = UserParam.FiyatGor.FiyatListe;

        $scope.Stok = [];
        $scope.StokListe = [];
        $scope.DepoListe = [];
        $scope.DepoMiktarListe = [];
        $scope.EtiketListe = [];
        $scope.FiyatDegisListe = [];
        $scope.MarkaListe = [];
        $scope.FiyatSiraListe = [];
        $scope.BarkodListe = [];
        $scope.SktGetirListe = [];
        $scope.PartiLotListe = [];
        $scope.PaletListe = [];

        $scope.Special = UserParam.FiyatGor.Special;
        $scope.SpecialListe = [];

        $scope.FiyatListeSelectedIndex = -1;
        $scope.PartiLotListeSelectedIndex = 0;

        $scope.BarkodLock = false;
        $scope.EvrakLock = false;
        $scope.DepoMiktar = false;
        $scope.Combo = true;
        $scope.FiyatGizle = true;
        $scope.SonAlisGizle = true;
        $scope.StokResim = false;
        $scope.OtoEkle = false;
        $scope.PartiOlusturShow = true;
        
        $scope.Loading = false;
        $scope.TblLoading = true

        $scope.ListeFiyatNo = "1";
        $scope.FiyatListeNo = "1";

        $scope.TxtParti = "";
        $scope.TxtLot = 0;
        $scope.SktTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.Tarih2 = moment(new Date()).format("DDMMYYYY");
        $scope.Tarih2Ters = moment(new Date()).format("YYYYMMDD");
        $scope.LblPartiLotAlert = "";
        
        $scope.Base64Data = "";
        $scope.Base64DataLong = "";
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
    function InitBarkodlarGrid()
    {
        $("#TblBarkodlar").jsGrid
        ({
            width: "100%",
            height: "150px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.Barkodliste,
            fields: [
                {
                    name: "BARKOD",
                    title: "BARKOD",
                    type: "number",
                    align: "center",
                    width: 75
                }, 
            ],
            rowClick: function(args)
            {
                $scope.BarkodListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitFiyatDegis()
    {
        $("#TblFiyatDegis").jsGrid
        ({
            width: "100%",
            height: "250px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.FiyatDegisListe,
            fields: [
                {
                    name: "SERI",
                    title: "SERİ",
                    type: "number",
                    align: "center",
                    width: 100
                }, 
                {
                    name: "SIRA",
                    title: "SIRA",
                    type: "text",
                    align: "center",
                    width: 75
                },
                {
                    name: "TARIH",
                    title: "TARIH",
                    type: "number",
                    align: "center",
                    width: 100
                },
                {
                    name: "SATIR",
                    title: "SATIR",
                    type: "number",
                    align: "center",
                    width: 75
                }
            ],
            rowClick: function(args)
            {
                $scope.FiyatListeRowClick(args.itemIndex,args.item,this);
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
            data : $scope.Stok,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            
            fields: 
            [{
                name: "SERI",
                title: "SERI",
                type: "number",
                align: "center",
                width: 125
            },
            {
                name: "SIRA",
                title: "SIRA",
                type: "text",
                align: "center",
                width: 75
            },
            {
                name: "STOKKODU",
                title: "STOKKODU",
                type: "text",
                align: "center",
                width: 175
            },
            {
                name: "DEPONO",
                title: "DEPONO",
                type: "text",
                align: "center",
                width: 75
            },
            {
                name: "BASIMMIKTAR",
                title: "BASIMMIKTAR",
                type: "text",
                align: "center",
                width: 125
            }]
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
            pageSize: 10,
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
                    name: "FIYAT",
                    title: "FIYAT",
                    type: "number",
                    align: "center",
                    width: 100
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
    function InitPaletGrid()
    {
        $("#TblPalet").jsGrid
        (   {
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.PaletListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: [
                {
                    name: "PALET_KOD",
                    title: "PALET KODU",
                    type: "text",
                    align: "center",
                    width: 125
                }, 
                {
                    name: "STOK_KOD",
                    title: "STOK KODU",
                    type: "text",
                    align: "center",
                    width: 200
                }, 
                {
                    name: "STOK_BARKOD",
                    title: "BARKODU",
                    type: "text",
                    align: "center",
                    width: 300
                },
                {
                    name: "MIKTAR",
                    title: "MIKTAR",
                    type: "text",
                    align: "center",
                    width: 300
                }
            ],
            rowClick: function(args)
            {
                $scope.PaletListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitBarkodOlusturGrid()
    {
        $("#TblBarkodStok").jsGrid
        (   {
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.BarkodEkleListe,
            paging : true,
            pageSize: 10,
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
                } 
            ],
            rowClick: function(args)
            {
                $scope.BarkodEkleListeRowClick(args.itemIndex,args.item,this);
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
                    name: "BARKOD",
                    title: "BARKOD",
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
                    name: "SKTTARIHDATE",
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
            db.StokBarkodGetir($scope.Firma,pBarkod,$scope.DepoNo,function(BarkodData) 
            { 
                if(BarkodData.length <= 0)
                {
                    $("#MdlReyonDegisikligi").modal('hide');
                    $scope.ReyonStok = ""
                    alertify.okBtn('Evet');
                    alertify.cancelBtn('Hayır');
            
                    alertify.confirm('Barkod Bulunamadı ! Barkod Eklemek İstermisiniz ?',function()
                    { 
                        $('#MdlStokGetir').modal("show");
                    })
                }
                if(BarkodData.length > 0)
                {          
                           
                    $scope.Stok = BarkodData;   
                    console.log(BarkodData)
                    if($scope.Stok[0].BARKOD != "")
                    {
                        $scope.Barkod = $scope.Stok[0].BARKOD;
                    }
                    console.log($scope.Barkod)
                    $scope.StokKodu = $scope.Stok[0].KODU;
                    $scope.BarkodLock = true;
                    $scope.ReyonStok = $scope.Stok[0].BARKOD;
                    //Maliyet Getir
                    if(localStorage.mode == "true")
                    {
                        var Fiyat = 
                        {
                            db : '{M}.' + $scope.Firma,
                            query : "SELECT TOP 1 " + 
                                    "CASE WHEN (SELECT sfl_kdvdahil FROM STOK_SATIS_FIYAT_LISTE_TANIMLARI WHERE sfl_sirano=sfiyat_listesirano) = 0 THEN " + 
                                    "ROUND(dbo.fn_StokSatisFiyati(sfiyat_stokkod,sfiyat_listesirano,sfiyat_deposirano,1) * ((SELECT dbo.fn_VergiYuzde ((SELECT TOP 1 sto_toptan_vergi FROM STOKLAR WHERE sto_kod = sfiyat_stokkod)) / 100) + 1),2) " + 
                                    "ELSE " + 
                                    "ROUND(dbo.fn_StokSatisFiyati(sfiyat_stokkod,sfiyat_listesirano,sfiyat_deposirano,1) / ((SELECT dbo.fn_VergiYuzde ((SELECT TOP 1 sto_toptan_vergi FROM STOKLAR WHERE sto_kod = sfiyat_stokkod)) / 100) + 1),2) " + 
                                    "END AS FIYAT, " + 
                                    "ROUND(dbo.fn_StokSatisFiyati(sfiyat_stokkod,sfiyat_listesirano,sfiyat_deposirano,1),2) AS KDVDAHILFIYAT, " +
                                    "sfiyat_doviz AS DOVIZ, " + 
                                    "ISNULL((SELECT dbo.fn_DovizSembolu(ISNULL(sfiyat_doviz,0))),'TL') AS DOVIZSEMBOL, " + 
                                    "ISNULL((SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(sfiyat_doviz,0),2)),1) AS DOVIZKUR, " + 
                                    "sfiyat_iskontokod AS ISKONTOKOD " + 
                                    "FROM STOK_SATIS_FIYAT_LISTELERI " +
                                    "WHERE sfiyat_stokkod = @STOKKODU AND sfiyat_listesirano = @FIYATLISTE AND sfiyat_deposirano IN (0,@DEPONO) " +
                                    "ORDER BY sfiyat_deposirano DESC", 
                            param: ['STOKKODU','FIYATLISTE','DEPONO'],
                            type:  ['string|50','int','int'],
                            value: [$scope.StokKodu,$scope.FiyatListe,$scope.DepoNo]
                        }
                    }
                    else
                    {
                        var Fiyat = 
                        {
                            db : '{M}.' + $scope.Firma,
                            query : "SELECT " + 
                                    "FIYAT2 AS FIYAT, " +
                                    "KDVDAHILFIYAT, " +
                                    "DOVIZ, " + 
                                    "DOVIZSEMBOL, " + 
                                    "DOVIZKUR, " + 
                                    "ISKONTOKOD " + 
                                    "FROM FIYAT " +
                                    "WHERE STOKKODU = '@STOKKODU' AND LISTENO = '@FIYATLISTE' AND DEPONO IN (0,'@DEPONO') " +
                                    "ORDER BY DEPONO DESC", 
                            param: ['STOKKODU','FIYATLISTE','DEPONO'],
                            type:  ['string|50','int','int'],
                            value: [$scope.StokKodu,$scope.FiyatListe,$scope.DepoNo]
                        }
                    }
                    
                    console.log(Fiyat)
                    console.log(1)
                    db.GetDataQuery(Fiyat,function(pFiyat)
                    {  
                        console.log(pFiyat)
                        if(UserParam.FiyatGor.KdvFiyat == "0")
                        $scope.Fiyat = pFiyat[0].KDVDAHILFIYAT
                        else
                        $scope.Fiyat = pFiyat[0].FIYAT
                        $scope.Stok[0].DOVIZSEMBOL = pFiyat[0].DOVIZSEMBOL;
                        $scope.SatisFiyatListe2 = (pFiyat.length > 1) ? pFiyat[1].FIYAT : 0;
                    });
                    $scope.FiyatListeChange()
                    
                    //Depo Miktar Getir
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
                    //SKT Getir
                    var SktGetir =
                    {
                        db : '{M}.' + $scope.Firma,
                        query : "SELECT " + 
                        "pl_stokkodu, CONVERT(VARCHAR(10),pl_son_kullanim_tar,104) AS SKT, pl_partikodu, pl_lotno," + 
                        "ISNULL((SELECT [dbo].[fn_DepodakiPartiliMiktar] (pl_stokkodu,1,GETDATE(),pl_partikodu,pl_lotno)),0) AS MIKTAR " + 
                        "FROM PARTILOT " + 
                        "WHERE pl_stokkodu = @STOKKODU " + 
                        "ORDER BY ISNULL((SELECT [dbo].[fn_DepodakiPartiliMiktar] (pl_stokkodu,1,GETDATE(),pl_partikodu,pl_lotno)),0) DESC ",
                        param : ['STOKKODU'],
                        type : ['string|50'],
                        value : [$scope.StokKodu]
                    }
                    db.GetDataQuery(SktGetir,function(pSktGetir)
                    {                        
                        if(pSktGetir.length > 0)
                        {
                            $scope.SktGetirListe = pSktGetir
                            console.log($scope.SktGetirListe)
                            $scope.MaxSkt = $scope.SktGetirListe[0].SKT    
                        }    
                        else
                        {
                            console.log("Veri Yok (SKT)");
                        }
                    });
                    //Son Alış Getir
                    console.log(2)
                    db.GetData($scope.Firma,'TumSonAlisGetir',[BarkodData[0].KODU],function(data)
                    {
                        console.log(data)
                        if(typeof(data) != 'undefined')
                        {
                            if(localStorage.mode == "true")
                            {
                                $scope.SonAlis = data[0].SONFIYAT
                                $scope.SonAlisDoviz = data[0].DOVIZSEMBOL
                            }
                            else
                            {
                                if(data.length == 2)
                                {
                                    $scope.SonAlis = data[data.length - 1].SONFIYAT
                                    $scope.SonAlisDoviz = data[data.length - 1].DOVIZSEMBOL
                                }
                                else
                                {
                                    $scope.SonAlis = data[0].SONFIYAT
                                    $scope.SonAlisDoviz = data[0].DOVIZSEMBOL
                                }   
                            }
                        }
                    });
                    if($scope.Barkod == '')
                    {
                        if(localStorage.mode == "true")
                        {
                            var BarkodGetir =
                            {
                                db : '{M}.' + $scope.Firma,
                                query : "SELECT bar_kodu AS BARKOD FROM BARKOD_TANIMLARI WHERE bar_stokkodu = @STOKKODU ",
                                param : ['STOKKODU'],
                                type : ['string|50'],
                                value : [$scope.StokKodu]
                            }
                        }
                        else
                        {
                            var BarkodGetir =
                            {
                                db : '{M}.' + $scope.Firma,
                                query : "SELECT BARKOD AS BARKOD FROM BARKOD WHERE KODU = '@STOKKODU' ",
                                param : ['STOKKODU'],
                                type : ['string|50'],
                                value : [$scope.StokKodu]
                            }
                        }
                        db.GetDataQuery(BarkodGetir,function(data)
                        {
                            if(data.length > 0)
                            $scope.Barkodliste = data
                            $("#TblBarkodlar").jsGrid({data : $scope.Barkodliste});
                        });
                    }
                    if($scope.Stok[0].DETAYTAKIP == 1 || $scope.Stok[0].DETAYTAKIP == 2)
                    {
                        if($scope.Stok[0].PARTI !='')
                        {
                            db.GetData($scope.Firma,'PartiLotGetir',[$scope.Stok[0].KODU,$scope.DepoNo,'',0],function(data)
                            {
                                $scope.PartiLotListe = data;
                                if(UserParam.Sistem.PartiLotMiktarKontrol == 1 && $scope.Stok[0].LOT != 0)
                                {   
                                    $scope.Miktar = $scope.PartiLotListe[0].MIKTAR;
                                    $scope.Stok[0].TOPMIKTAR = $scope.Miktar * $scope.Stok[0].CARPAN;
                                }
                            });
                        }
                        else
                        {
                            PartiLotEkran();
                        }
                    }
                    else
                    {
                        if($scope.Barkod == "")
                        {
                            $("#MdlBarkodlar").modal('show');
                        }
                    }
                    if($scope.OtoEkle == true)
                    {
                        $timeout( function(){$scope.Insert();},150); 
                    }
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
                        value:  [$scope.CariKodu]    
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
                            $scope.Base64ImageSrc = '../../img/' + BarkodData[0].KODU + '.png'
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
                    BarkodFocus();
                }
            });
        }
        else
        {
            console.log("Aradığınız Stok Bulunamamıştır.")
            alertify.alert("Stok Bulunamamıştır.");
            $("#MdlReyonDegisikligi").modal('hide');
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
                $scope.PartiLotListe = [];
                $scope.MaxLot();
                console.log($scope.Tarih2)
                var TmpQuery = 
                {
                    db : '{M}.' + $scope.Firma,
                    query:  
                    "SELECT SUBSTRING(CONVERT(nvarchar,GETDATE(),112),3,4) + " + 
                    "ISNULL(MAX(SUBSTRING(CONVERT(nvarchar,pl_partikodu,112),5,15)),'000000') " +
                    "+ 1 AS PARTIKOD FROM PARTILOT WHERE pl_stokkodu = @STOKKOD AND pl_partikodu LIKE (@PARTITARIH + '%' ) ORDER BY MAX(pl_partikodu) DESC ",
                    param:  ['STOKKOD','PARTITARIH'],
                    type:   ['string|25','string|25'],
                    value:  [$scope.Stok[0].KODU,$scope.Tarih2]
                }
                db.GetPromiseQuery(TmpQuery,function(data)
                {   
                    console.log(data)
                    $scope.TxtParti = data[0].PARTIKOD;
                    $scope.Aciklama = "";
                });
                
                $("#LblPartiLotAlert").hide();
                
                $("#TblPartiLot").jsGrid({data : $scope.PartiLotListe});

                $('#MdlPartiLot').modal('show');
                
                $timeout( function(){
                $window.document.getElementById("Parti").focus();
                $window.document.getElementById("Parti").select();
                },400)
            }
        }
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
                var filename = "myPdf.pdf";
                alertify.alert(folderpath,filename,$scope.Base64Data,contentType);
                savebase64AsPDF(folderpath,filename,$scope.Base64Data,contentType);
            });
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
    function InsertData()
    {   
        console.log($scope.StokKodu)
        console.log($scope.Barkod.length)
        if($scope.BarkodInsert != "")
        {
            $scope.Barkod = $scope.BarkodInsert
        }
        if($scope.Barkod.length > 0 || $scope.StokKodu.length > 0)
        {
            var InsertData = 
            [
                UserParam.MikroId,
                UserParam.MikroId,
                $scope.Special,
                $scope.Seri,         
                $scope.Sira,        
                $scope.Aciklama,     
                $scope.BelgeNo,
                $scope.EtiketTip,
                $scope.BasimTipi,
                $scope.BasimAdet,
                $scope.DepoNo,
                $scope.StokKodu,
                $scope.RenkNo,
                $scope.BedenNo,
                $scope.Barkod,
                $scope.BasilacakMiktar
            ];
            console.log(InsertData)
            db.ExecuteTag($scope.Firma,'EtiketInsert',InsertData,function(InsertResult)
            {   
                console.log(InsertData)
                db.GetData($scope.Firma,'EtiketGetir',[$scope.Seri,$scope.Sira],function(EtiketData)
                {
                    if(typeof(InsertResult.result.err) == 'undefined')
                    {   
                        $scope.Stok = [];
                        $scope.Miktar = 0;
                        $scope.BasilacakMiktar = 1;
                        $scope.BasimAdet = 1;
                        $scope.Fiyat = "";
                        $scope.Barkod = "";
                        $scope.SonAlis = "";
                        $scope.SonAlisDoviz = "";
                        $scope.BarkodLock = false;
                        BarkodFocus();

                        InsertAfterRefresh(EtiketData);
                        alertify.alert("Etiket Yazdırıldı.", function (pUyari) {
                            BarkodFocus();
                            pUyari.preventDefault();
                        });
                    }
                    else
                    {   
                        alertify.alert("Etiket Yazdırmada Hata.");
                        console.log(InsertResult.result.err);
                    }
                });
            });
        }
        else
        {
            if($scope.StokKodu == "" && $scope.Barkod == "")
            {
                alertify.alert("Barkod Okutmadan Ekleme Yapılmaz!");
            }
            
        }
    }
    function BarkodFocus()
    {
        $timeout( function(){$window.document.getElementById("Barkod").focus();},100);
    }
    function PaletBarkodFocus()
    {
        $timeout( function(){$window.document.getElementById("PaletBarkod").focus();},100);
    }
    function InsertAfterRefresh(pData)
    {   
        $scope.EtiketListe = pData;
        $scope.BarkodInsert = "";
        $("#TblIslem").jsGrid({data : $scope.EtiketListe});    
        $scope.BtnTemizle();
        $window.document.getElementById("Barkod").focus();
    }
    $scope.PDFShareButton = function()
    {
        // this is the complete list of currently supported params you can pass to the plugin (all optional)
        var options = {
            message: '', // not supported on some apps (Facebook, Instagram)
            subject: 'PdfBelge', // fi. for email
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
    $scope.FiyatListeChange = function()
    {
        if(localStorage.mode == "true")
        {
            var Fiyat = 
            {
                db : '{M}.' + $scope.Firma,
                query : "SELECT " + 
                        "CASE WHEN (SELECT sfl_kdvdahil FROM STOK_SATIS_FIYAT_LISTE_TANIMLARI WHERE sfl_sirano=sfiyat_listesirano) = 0 THEN " + 
                        "ROUND(dbo.fn_StokSatisFiyati(sfiyat_stokkod,sfiyat_listesirano,sfiyat_deposirano,1) * ((SELECT dbo.fn_VergiYuzde ((SELECT TOP 1 sto_toptan_vergi FROM STOKLAR WHERE sto_kod = sfiyat_stokkod)) / 100) + 1),2) " + 
                        "ELSE " + 
                        "ROUND(dbo.fn_StokSatisFiyati(sfiyat_stokkod,sfiyat_listesirano,sfiyat_deposirano,1) / ((SELECT dbo.fn_VergiYuzde ((SELECT TOP 1 sto_toptan_vergi FROM STOKLAR WHERE sto_kod = sfiyat_stokkod)) / 100) + 1),2) " + 
                        "END AS FIYAT, " + 
                        "dbo.fn_StokSatisFiyati(sfiyat_stokkod,sfiyat_listesirano,sfiyat_deposirano,1) AS KDVDAHILFIYAT, " +
                        "(SELECT sfl_aciklama AS ADI FROM STOK_SATIS_FIYAT_LISTE_TANIMLARI WHERE sfl_sirano = sfiyat_listesirano) AS SATISADI, " +
                        "sfiyat_listesirano AS FIYATSIRALISTE " +
                        "FROM STOK_SATIS_FIYAT_LISTELERI " +
                        "WHERE sfiyat_stokkod = @STOKKODU AND sfiyat_deposirano IN (0,@DEPONO) " +
                        "ORDER BY sfiyat_deposirano DESC", 
                param: ['STOKKODU','DEPONO'],
                type:  ['string|50','int'],
                value: [$scope.StokKodu,$scope.DepoNo]
            }
        }
        else
        {
            var Fiyat = 
            {
                db : '{M}.' + $scope.Firma,
                query : "SELECT " + 
                        "FIYAT2 AS FIYAT, " + 
                        "KDVDAHILFIYAT, " +
                        "LISTEADI AS SATISADI, " +
                        "LISTENO AS FIYATSIRALISTE " +
                        "FROM FIYAT " +
                        "WHERE STOKKODU = '@STOKKODU' AND DEPONO IN (0,@DEPONO) " +
                        "ORDER BY DEPONO DESC", 
                param: ['STOKKODU','DEPONO'],
                type:  ['string|50','int'],
                value: [$scope.StokKodu,$scope.DepoNo]
            }
        }
        db.GetDataQuery(Fiyat,function(pFiyat)
        {  
            console.log(pFiyat)
            $scope.FiyatListeler = pFiyat;
            if(UserParam.FiyatGor.KdvFiyat == "0")
            {
                $scope.DigerFiyat = $scope.FiyatListeler[document.getElementById("FiyatSelect2").selectedIndex].KDVDAHILFIYAT;
                $scope.UpdateFiyat = $scope.FiyatListeler[document.getElementById("FiyatSelect").selectedIndex].KDVDAHILFIYAT;
            }
            else
            {
                $scope.DigerFiyat = $scope.FiyatListeler[document.getElementById("FiyatSelect2").selectedIndex].FIYAT;
                $scope.UpdateFiyat = $scope.FiyatListeler[document.getElementById("FiyatSelect").selectedIndex].FIYAT;    
            }
       });
    }
    $scope.BtnFiyatUpdate = function()
    {
        console.log([$scope.YeniFiyat,$scope.StokKodu,$scope.FiyatListeNo])
        db.ExecuteTag($scope.Firma,'FiyatListeUpdate',[$scope.YeniFiyat,$scope.StokKodu,$scope.FiyatListeNo],function(InsertResult)
        {
            console.log(InsertResult)
            $scope.FiyatListeChange()
        });
    }
    $scope.BtnStokBarkodGetir = function(keyEvent)
    {
        if(keyEvent.which == 13)
        {
            StokBarkodGetir($scope.Barkod);
        }
    }
    $scope.ReyonStokGetir = function(keyEvent)
    {
        if(keyEvent.which == 13)
        {
            StokBarkodGetir($scope.ReyonStok);
            $window.document.getElementById("Reyon").focus();
        }
    }
    $scope.BtnStokGridGetir = function()
    {
        let Kodu = '';
        let Adi = '';
        let Marka = '';
        $scope.Loading = true;
        $scope.TblLoading = false;

        if($scope.StokGridTip == "0")
        {   
            Adi = $scope.StokGridText.replace("*","%").replace("*","%") + '%';
            console.log(1)
        }
        else if($scope.StokGridTip == "1")
        {
            Kodu = $scope.StokGridText.replace("*","%").replace("*","%") + '%';
        } 
        else if($scope.StokGridTip == "2")
        {
            Marka = $scope.Marka;
        }
        db.GetData($scope.Firma,'StokAdiGetir',[Kodu,Adi,$scope.DepoNo],function(StokData)
        {
            $scope.StokListe = StokData;
            if ($scope.StokListe.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblStok").jsGrid({data : $scope.StokListe});
                $("#TblStok").jsGrid({data : $scope.StokListe});
                
            }
            else
            {
                alertify.alert("Stok Bulunamadı")
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblStok").jsGrid({data : $scope.StokListe});
                $("#TblStok").jsGrid({data : $scope.StokListe});
            }
           
        });
    }
    $scope.BtnBarkodEkleGridGetir = function()
    {
        let Kodu = '';
        let Adi = '';
        let Marka = '';
        $scope.Loading = true;
        $scope.TblLoading = false;

        if($scope.StokGridTip == "0")
        {   
            Adi = $scope.StokGridText.replace("*","%").replace("*","%");
            console.log(1)
        }
        else if($scope.StokGridTip == "1")
        {
            Kodu = $scope.StokGridText.replace("*","%").replace("*","%");
        } 
        else if($scope.StokGridTip == "2")
        {
            Marka = $scope.Marka;
        }
        db.GetData($scope.Firma,'StokAdiGetir',[Kodu,Adi,$scope.DepoNo],function(StokData)
        {
            $scope.BarkodEkleListe = StokData;
            if ($scope.BarkodEkleListe.length > 0)
            {
                console.log(2)
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblBarkodStok").jsGrid({data : $scope.BarkodEkleListe});
                $("#TblBarkodStok").jsGrid({data : $scope.BarkodEkleListe});
                
            }
            else
            {
                alertify.alert("Stok Bulunamadı")
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblBarkodStok").jsGrid({data : $scope.BarkodEkleListe});
                $("#TblBarkodStok").jsGrid({data : $scope.BarkodEkleListe});
            }
           
        });
    }
    $scope.BtnStokGridSec = function()
    {
        $("#TbPDF").removeClass('active');
        $("#TbStok").removeClass('active');
        $("#TbMain").addClass('active');
        StokBarkodGetir($scope.Barkod);
        $scope.StokListe = [];
        $("#TblStok").jsGrid({data : $scope.StokListe});
    }
    $scope.BtnBarkodGetirClick = function()
    {
        StokBarkodGetir($scope.Barkod);
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
    $scope.BtnTemizle = function()
    {   
        InitDepoMiktarGrid();

        $scope.Stok = [];
        $scope.DepoMiktarListe = [];
        $scope.Fiyat = "";
        $scope.Barkod = "";
        $scope.SonAlis = "";
        $scope.SonAlisDoviz = ""
        $scope.BarkodLock = false;
        $scope.DigerFiyat = "";
        $scope.UpdateFiyat = "";
        $window.document.getElementById("Barkod").focus();
    }
    $scope.BtnFiyatDegisListe = function()
    {
        var FiyatDegisiklik =
        {
            db : '{M}.' + $scope.Firma, 
            query : "SELECT " +
                    "fid_evrak_seri_no AS SERI, " +
                    "fid_evrak_sira_no AS SIRA, " +
                    "COUNT(fid_evrak_satir_no) AS SATIR, " +
                    "CONVERT(VARCHAR(10),fid_evrak_tarih,121) TARIH " +
                    "FROM STOK_FIYAT_DEGISIKLIKLERI " +
                    "WHERE fid_evrak_tarih >= @ILKTARIH AND fid_evrak_tarih <= @SONTARIH " +
                    "GROUP BY fid_evrak_seri_no,fid_evrak_sira_no,fid_evrak_tarih ",
            param : ['ILKTARIH','SONTARIH'],
            type : ['date','date'],
            value : [$scope.IlkTarih,$scope.SonTarih]
        }

        db.GetDataQuery(FiyatDegisiklik,function(pFiyatDegisiklik)
        {
            $scope.FiyatDegisListe = pFiyatDegisiklik
            $("#TblFiyatDegis").jsGrid({data : $scope.FiyatDegisListe});
        });
    }
    $scope.BtnEtiketEkle = function()
    {    
        $scope.FiyatDegisDetay.forEach(function(item) 
        {   
            var InsertData = 
            [
                UserParam.MikroId,
                UserParam.MikroId,
                $scope.Special,
                $scope.Seri,          
                $scope.Sira,      
                "",     // Açıklama
                "",     // BelgeNo
                1,      // EtiketTip
                $scope.BasimTipi,
                $scope.BasimAdet,
                $scope.DepoNo,
                item.STOKKOD,
                0,      // RenkNo
                0,      // BedenNo
                item.BARKOD,
                $scope.DepoMiktar == true ? (item.DEPOMIKTAR > 0) ? item.DEPOMIKTAR : 1 : $scope.BasilacakMiktar
            ];

            db.ExecuteTag($scope.Firma,'EtiketInsert',InsertData,function(InsertResult)
            {        
                console.log("kayıt işlemi gerçekleşti")
            });
        });
        db.GetData($scope.Firma,'EtiketGetir',[$scope.Seri,$scope.Sira],function(EtiketData)
        {    
            InsertAfterRefresh(EtiketData);
        });   

        $("#MdlFiyatDegisikligi").modal('hide');
        $("#MdlFiyatDegisikligi").hide();
        alertify.alert("Etiket Basım İşlemi Gerçekleşti .");
    }
    $scope.BtnTopluEtiketBas = function()
    {   
        if(typeof($scope.StokListe[0]) != 'undefined')
        {    
            $scope.StokListe.forEach(function(item) 
            {   
                var InsertData = 
                [
                    UserParam.MikroId,
                    UserParam.MikroId,
                    $scope.Special,
                    $scope.Seri,          
                    $scope.Sira,      
                    "",     // Açıklama
                    "",     // BelgeNo
                    1,      // EtiketTip
                    $scope.BasimTipi,
                    $scope.BasimAdet,
                    $scope.DepoNo,
                    item.KODU,
                    0,      // RenkNo
                    0,      // BedenNo
                    item.BARKOD,
                    $scope.TDepoMiktar == true ? (item.DEPOMIKTAR > 0) ? item.DEPOMIKTAR : 1 : $scope.BasilacakMiktar
                ];
                
                db.ExecuteTag($scope.Firma,'EtiketInsert',InsertData,function(InsertResult)
                {        
                    console.log("kayıt işlemi gerçekleşti")
                });
            });

            db.GetData($scope.Firma,'EtiketGetir',[$scope.Seri,$scope.Sira],function(EtiketData)
            {    
                $scope.StokListe = [];
                $("#TblStok").jsGrid({data : $scope.StokListe});
                $scope.TDepoMiktar = false;
                InsertAfterRefresh(EtiketData);
            }); 
            $("#MdlStokGetir").modal('hide');
            $("#MdlStokGetir").hide();
            alertify.alert("Etiket Basım İşlemi Gerçekleşti .");
        }
        else
        {
            $("#MdlStokGetir").modal('hide');
            $("#MdlStokGetir").hide();
            alertify.alert("Liste Doldurulmadan Etiket Basım İşlemi Gerçekleştirilemez .");
        }
    }
    $scope.ComboHideTextShow = function()
    {   
        if($scope.StokGridTip == "2")
        {   
            db.FillCmbDocInfo($scope.Firma,'CmbMarkaGetir',function(data)
            {
                $scope.MarkaListe = data;
                $scope.Marka = $scope.MarkaListe[0].KODU;
            });
            
            $scope.Combo = false;
            $scope.Text = true;
            $scope.StokListe = [];
            $("#TblStok").jsGrid({data : $scope.StokListe});
        }
        else if($scope.StokGridTip == "0" || $scope.StokGridTip == "1")
        {   
            $scope.Text = false;
            $scope.Combo = true;
            $scope.StokListe = [];
            $scope.StokGridText = "";
            $("#TblStok").jsGrid({data : $scope.StokListe});
        }
    }
    $scope.FiyatListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( FiyatDegisSelectedRow ) { FiyatDegisSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        FiyatDegisSelectedRow = $row;
        $scope.FiyatListeSelectedIndex = pIndex;

        $scope.FiyatDegSeri = pItem.SERI
        $scope.FiyatDegSira = pItem.SIRA

        // var FiyatDegisDetay = 
        // {
        //     db : '{M}.' + $scope.Firma,
        //     query:  "SELECT " +
        //             "fid_evrak_seri_no AS SERI, " +
        //             "fid_evrak_sira_no AS SIRA, " +
        //             "fid_stok_kod AS STOKKOD, " +
        //             "ISNULL((SELECT bar_kodu FROM BARKOD_TANIMLARI WHERE bar_stokkodu = fid_stok_kod),'') AS BARKOD, " +
        //             "fid_eskifiy_tutar AS ESKITUTAR, " +
        //             "fid_yenifiy_tutar AS YENITUTAR, " +
        //             "dbo.fn_DepodakiMiktar(fid_stok_kod,@DEPONO,GETDATE()) AS DEPOMIKTAR, " +
        //             "fid_evrak_satir_no AS SATIR, " +
        //             "CONVERT(VARCHAR(10),fid_evrak_tarih,121) TARIH  " +
        //             "FROM STOK_FIYAT_DEGISIKLIKLERI " +
        //             "WHERE fid_evrak_seri_no = @SERI AND fid_evrak_sira_no = @SIRA ",
        //     param: ['SERI','SIRA','DEPONO'],
        //     type:  ['string|50','int','int'],
        //     value: [$scope.FiyatDegSeri,$scope.FiyatDegSira,$scope.DepoNo]
        // }

        // db.GetDataQuery(FiyatDegisDetay,function(pFiyatDegisDetay)
        // {  
        //     $scope.FiyatDegisDetay = pFiyatDegisDetay;
        // });
    }
    $scope.YeniEvrak = function()
    {
        
        Init();
        InitIslemGrid();
        InitDepoMiktarGrid();
        InitFiyatDegis();
        InsertAfterRefresh();
        BarkodFocus();
        InitStokGrid();
        InitBarkodOlusturGrid()
        InitBarkodlarGrid();
        InitPartiLotGrid();
        InitPaletGrid();
        
        if(UserParam.FiyatGor.FiyatGizle == "1")
        {
            $scope.FiyatGizle = false;
        }
        if(UserParam.FiyatGor.SonAlisGizle == "1")
        {
            $scope.SonAlisGizle = false;
        }
        if(UserParam.FiyatGor.StokResmi == "1")
        {
            $scope.StokResim = true;
        }

        if(typeof UserParam.Etiket != 'undefined')
        {
            $scope.SpecialListe = UserParam.Etiket.Etiket
        }

        if($scope.DepoNo > 0)
        {
            $scope.EvrakLock = true;
        }
        db.DepoGetir($scope.Firma,UserParam.FiyatGor.DepoListe,function(data)
        {
            $scope.DepoListe = data; 
            $scope.DepoNo = UserParam.FiyatGor.DepoNo;
            $scope.DepoListe.forEach(function(item) 
            {
                if(item.KODU == $scope.DepoNo)
                    $scope.DepoAdi = item.ADI;
            });          
        });
        if(UserParam.Sistem.Palet == "1")
        {
            db.GetPromiseTag($scope.Firma,'PaletBarkodSira',[],function(data)
            {
                console.log(data)
                $scope.PaletKodu = data[0].PALET_KOD
            });
        }
        
        // db.FillCmbDocInfo($scope.Firma,'CmbDepoGetir',function(data){$scope.DepoListe = data; $scope.DepoNo = UserParam.FiyatGor.DepoNo});
        db.MaxSiraPromiseTag($scope.Firma,'MaxEtiketSira',[$scope.Seri],function(data){$scope.Sira = data});
        //$scope.Sira = 1;
    }
    $scope.DepoChange = function()
    {
        $scope.DepoListe.forEach(function(item) 
        {
            if(item.KODU == $scope.DepoNo)
                $scope.DepoAdi = item.ADI;
        }); 
    }
    $scope.StokListeRowClick = function(pIndex,pItem,pObj)
    {
        console.log(13231)
        if ( EklenecekStokSelectedRow ) { EklenecekStokSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        EklenecekStokSelectedRow = $row;
        
        $scope.Barkod = $scope.StokListe[pIndex].KODU;
        $scope.BtnStokGridSec();
    }
    $scope.BarkodListeRowClick = function(pIndex,pItem,pObj)
    {
        console.log(13231)
        if ( BarkodSelectedRow ) { BarkodSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        BarkodSelectedRow = $row;
        
        $scope.Barkod = $scope.Barkodliste[pIndex].BARKOD;
        $scope.BtnBarkodGetirClick();
        $("#MdlBarkodlar").modal('hide');
    }
    $scope.BarkodEkleListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( StokSelectedRow ) { StokSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        StokSelectedRow = $row;
        
        $scope.EklenecekStokKodu = $scope.BarkodEkleListe[pIndex].KODU;
        $scope.EklenecekStokAdi = $scope.BarkodEkleListe[pIndex].ADI;
    }
    $scope.ManuelAramaClick = function() 
    {
        $("#TbStok").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbPDF").removeClass('active');
        $("#TbPalet").removeClass('active');
    }
    $scope.PaletClick = async function() 
    {
        $("#TbPalet").addClass('active');
        $("#TbStok").removeClass('active');
        $("#TbMain").removeClass('active');
        $("#TbPDF").removeClass('active');
        PaletBarkodFocus();
    }
    $scope.PartiLotListeRowClick = function(pIndex,pItem,pObj)
    {   
        if ( PartiLotSelectedRow ) { PartiLotSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        PartiLotSelectedRow = $row;
        $scope.PartiLotListeSelectedIndex = pIndex;
        $scope.BarkodInsert = $scope.PartiLotListe[pIndex].BARKOD;
    }
    $scope.PDFClick = function()
    {
        $("#TbPDF").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbStok").removeClass('active');
        $("#TbPalet").removeClass('active');
    }
    $scope.MainClick = function()
    {
        $("#TbMain").addClass('active');
        $("#TbPDF").removeClass('active');
        $("#TbStok").removeClass('active');
        $("#TbPalet").removeClass('active');
    }
    $scope.Insert = function()
    {
        console.log($scope.BasilacakMiktar)
        if(String($scope.BasilacakMiktar).length > 5)
        {
            alertify.alert("Etiket miktarı 3 karakterden fazla olamaz")
            return;
        }
        if(typeof($scope.BasilacakMiktar) != "undefined")
        {
            if(($scope.BasilacakMiktar > 0 && $scope.BasilacakMiktar != ""))
            {
                InsertData();
            }
            else
            {
                alertify.alert("Miktar 0 veya boş olamaz")
            }
        }
        else
        {
            alertify.alert("Miktar da hata")
        }
    }
    $scope.ManuelAramaCikis = function()
    {
        $("#TbStok").removeClass('active');
        $("#TbMain").addClass('active');
        $("#TbPDF").removeClass('active');
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
    $scope.ScanReyon = function()
    {
        cordova.plugins.barcodeScanner.scan(
            function (result) 
            { 
                $scope.Reyon = result.text;
                $scope.BtnReyonUpdate()
            },
            function (error) 
            {
                //alert("Scanning failed: " + error);
            },
            {
                prompt : "Barkod Okutunuz",
                orientation : "portrait"
            },
            
        );
    }
    $scope.BtnReyonUpdate = function()
    {
        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "UPDATE STOKLAR SET sto_reyon_kodu = @sto_reyon_kodu WHERE sto_kod = @sto_kod ",
            param:  ['sto_reyon_kodu','sto_kod'],
            type:   ['string|25','string|25'],
            value:  [$scope.Reyon,$scope.Stok[0].KODU]
        }

        db.ExecuteQuery(TmpQuery,function(data)
        {   
           $scope.Stok[0].REYON = $scope.Reyon;
           $scope.Reyon = "";
           $scope.ReyonStok = ""
           $window.document.getElementById("ReyonStok").focus();
        });
    }
    $scope.BtnBarkodEkleGridSec = function()
    {
        $scope.TxtEklenecekBarkod = $scope.Barkod
        $('#MdlBarkodEkle').modal("show");
        $("#MdlStokGetir").modal('hide');
        $("#MdlStokGetir").hide();

        db.GetPromiseTag($scope.Firma,'CmbBirimGetir',[$scope.EklenecekStokKodu],function(data)
        {   
            $scope.BirimListe = data;
            console.log($scope.BirimListe)
            $scope.EklenecekBirim = "1"

            if($scope.BirimListe.length > 0)
            {
                console.log($scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.EklenecekBirim}))
                $scope.EklenecekBirimPntr = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.EklenecekBirim})[0].BIRIMPNTR;
                $scope.EklenecekBirimAdi = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.EklenecekBirim})[0].BIRIM;
                $scope.EklenecekCarpan = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.EklenecekBirim})[0].KATSAYI;
                console.log( $scope.EklenecekBirimPntr)
            }
            else
            {  //BİRİMSİZ ÜRÜNLERDE BİRİMİ ADETMİŞ GİBİ DAVRANIYOR. RECEP KARACA 23.09.2019
                $scope.EklenecekBirimPntr = 1;
                $scope.EklenecekBirim = 'ADET';
                $scope.EklenecekCarpan = 1;
            }
        });
    }
    $scope.BirimChange = function()
    {
        if($scope.BirimListe.length > 0)
        {
            console.log($scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.EklenecekBirim}))
            $scope.EklenecekBirimPntr = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.EklenecekBirim})[0].BIRIMPNTR;
            $scope.EklenecekBirimAdi = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.EklenecekBirim})[0].BIRIM;
            $scope.EklenecekCarpan = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.EklenecekBirim})[0].KATSAYI;
            console.log( $scope.EklenecekBirimPntr)
        }
    }
    $scope.BtnBarkodEkle = function()
    {
        var InsertData = 
        [
           $scope.Barkod,
           $scope.EklenecekStokKodu,
           $scope.EklenecekBirimPntr,
           0, //bar_baglantitipi
           0,  //bar_barkodtipi
           '',
           0
        ];
        console.log(InsertData)
        db.ExecuteTag($scope.Firma,'BarkodInsert',InsertData,function(InsertResult)
        {        
            console.log("kayıt işlemi gerçekleşti")
            $scope.EklenecekBirimPntr = ''
            $scope.EklenecekCarpan = ''
            $scope.EklenecekBirimAdi = ''
            $scope.EklenecekStokKodu = ''
            $scope.EklenecekStokAdi = ''
            StokBarkodGetir($scope.Barkod)
            $("#MdlBarkodEkle").modal('hide');
            $("#MdlBarkodEkle").hide();
        });
    }
    $scope.BtnPartiLotGetir = function()
    {
        for (let i = 0; i < $scope.TxtSayiArttir; i++) 
        {            
            $scope.TxtParti = $scope.TxtParti + 1
            console.log($scope.TxtParti)
        }

        if(isNaN($scope.TxtLot) || $scope.TxtLot == "")
        $scope.TxtLot = 0;
        console.log([$scope.Stok[0].KODU,$scope.DepoNo,$scope.TxtParti,$scope.TxtLot])
        db.GetData($scope.Firma,'PartiLotGetir',[$scope.Stok[0].KODU,$scope.DepoNo,$scope.TxtParti,$scope.TxtLot],function(data)
        { 
            $scope.PartiLotListe = data;
            console.log(data)
            $("#TblPartiLot").jsGrid({data : $scope.PartiLotListe});
            // for (let i = 0; i < data.length; i++)
            // {
            //     if(data[0].SKTTARIH == data[i].SKTTARIH)
            //     {
            //         $scope.PartiLotList.push(data[i]);
            //     }
            // }
            console.log($scope.Tarih2Ters)
            for (let i = 0; i < data.length; i++)
            {
                if(data[i].SKTTARIH >= $scope.Tarih2Ters)
                {                        
                    if($scope.PartiLotListe.length != 0)
                    {
                        if(data[i].TARIH == data[i - 1].TARIH)
                        {
                            $scope.PartiLotListe.push(data[i]);
                        }
                    }
                    else
                    {
                        $scope.PartiLotListe.push(data[i]);
                    }
                }
            }
            console.log($scope.PartiLotListe)
        });
    }
    $scope.BtnPartiLotSec = function()
    {
        $('#MdlPartiLot').modal('hide');
        console.log($scope.PartiLotListeSelectedIndex)
        $scope.Stok[0].PARTI = $scope.PartiLotListe[$scope.PartiLotListeSelectedIndex].PARTI;
        $scope.Stok[0].LOT = $scope.PartiLotListe[$scope.PartiLotListeSelectedIndex].LOT;

        $scope.TxtParti = $scope.PartiLotListe[$scope.PartiLotListeSelectedIndex].PARTI;
        $scope.TxtLot = $scope.PartiLotListe[$scope.PartiLotListeSelectedIndex].LOT;
        $scope.PartiLotListe = [];
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

            //Sona 0 koyma işlemi Açıklama ve Lot tarafında
            let Uzunluk = 5 - $scope.Aciklama.length;
            let Miktar = [];
            for (let i = 0; i < Uzunluk; i++) 
            {
                Miktar.push(0);
            }
            Miktar = Miktar.toString();
            Miktar = Miktar.split(",").join("");
            $scope.Aciklama = Miktar + "" + $scope.Aciklama;

            let UzunlukLot = 3 - $scope.TxtLot.toString().length;
            let MiktarLot = [];
            for (let i = 0; i < UzunlukLot; i++) 
            {
                MiktarLot.push(0);
            }
            MiktarLot = MiktarLot.toString();
            MiktarLot = MiktarLot.split(",").join("");
            let Lot = MiktarLot + "" + $scope.TxtLot;

            //Stok Kodunun ilk 7 hanesi alınıyor
            let StokKodu = $scope.Stok[0].KODU.substring(0,7)
            console.log(StokKodu)

            //Tarih Formatı yapılıyor
            let GunAy = $scope.Tarih2.substring(0,4)
            let Yil = $scope.Tarih2.substring(7,8)
            let TarihY = GunAy + "" + Yil;
            console.log(GunAy,Yil, GunAy + "" + Yil)
            if($scope.BarkodInsert != "")
            {
                $scope.BarkodInsert = StokKodu + "" + $scope.TxtParti + "" +  Lot + "" + TarihY;
                $scope.BarkodInsert = $scope.TxtParti
            }
            console.log($scope.BarkodInsert)
            db.GetData($scope.Firma,'BarkodGetir',[$scope.BarkodInsert,0],function(BarkodData)
            {
                if(BarkodData.length > 0)
                {
                    $('#MdlPartiLot').modal('hide');
                    alertify.alert("Barkod Daha Önceden Kaydedilmiş")
                }
                else
                {
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
                                $scope.Aciklama,
                                $scope.SktTarih
                            ]
                            console.log(Data)
                            db.ExecuteTag($scope.Firma,'PartiLotInsert',Data,function(InsertResult)
                            {
                                console.log(InsertResult)
                                if(typeof(InsertResult.result.err) == 'undefined')
                                {
                                    console.log(1)
                                    $scope.Stok[0].PARTI = $scope.TxtParti;
                                    $scope.Stok[0].LOT = $scope.TxtLot;
                                    if(UserParam.Sistem.PartiBarkodOlustur == 1)
                                    {
                                        let BarkodInsertData = 
                                        [
                                            $scope.BarkodInsert,
                                            $scope.Stok[0].KODU,
                                            $scope.Stok[0].BIRIMPNTR,
                                            3,  //bar_baglantitipi
                                            2,  //bar_barkodtipi
                                            $scope.TxtParti,
                                            $scope.TxtLot
                                        ]
                                        console.log(BarkodInsertData)
                                        db.ExecuteTag($scope.Firma,'BarkodInsert',BarkodInsertData,function(InsertResult)
                                        {
                                        });
                                    }
                                    $('#MdlPartiLot').modal('hide');
                                }
                            });
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
    $scope.PaletListeRowClick = function(pIndex,pItem,pObj)
    {
        console.log(13231)
        if ( PaletSelectedRow ) { PaletSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        PaletSelectedRow = $row;
        $scope.PaletListeSelectedIndex = pIndex;
        $scope.PaletBarkod = $scope.PaletListe[pIndex].STOK_BARKOD;
        $scope.PaletGuid = $scope.PaletListe[pIndex].GUID;
        $scope.PaletStokMiktar = $scope.PaletListe[pIndex].MIKTAR;
    }
    $scope.BtnPaletBarkodEkle = async function()
    {
        let BarkodListe = [];

        BarkodListe = await db.GetPromiseTag($scope.Firma,'PaletBarkodStokGetir',[$scope.PaletBarkod])
        console.log(BarkodListe)

        if(BarkodListe.length > 0)
        {
            alertify.alert("Bu barkod " + BarkodListe[0].PALET_KOD + " adlı Palette mevcut" ,function()
            {
                $("#TblPalet").jsGrid({data : $scope.PaletListe});
                PaletBarkodFocus();
            })
            return;
        }
        db.GetData($scope.Firma,'BarkodGetir',[$scope.PaletBarkod,0],function(BarkodData)
        {
            if(BarkodData.length == 0)
            {
                alertify.alert("Okutmuş olduğunuz barkod bulunamadı",function()
                {
                    $("#TblPalet").jsGrid({data : $scope.PaletListe});
                    PaletBarkodFocus();
                })
            }
            else if($scope.PaletKodu.toUpperCase() == $scope.PaletBarkod)
            {
                alertify.alert("Barkod ve Palet Kodu aynı olamaz!");
                
            }
            else
            {
                var InsertData = 
                [
                    UserParam.MikroId,
                    UserParam.MikroId,
                    $scope.PaletKodu.toUpperCase(),
                    BarkodData[0].KODU,
                    $scope.PaletBarkod,
                    BarkodData[0].PARTILOTMIKTAR,
                    0, // DURUM
                    $scope.PltBrutAgr,
                    $scope.PltNetAgr
                ];
                db.ExecuteTag($scope.Firma,'PaletBarkodInsert',InsertData,function(InsertResult)
                {
                    $scope.PaletMiktar = $scope.PaletMiktar + BarkodData[0].PARTILOTMIKTAR;
                    //YAZDIRMA İÇİN
                    $scope.BasimAdet = $scope.PaletMiktar;
                    $scope.StokKodu = $scope.PaletKodu.toUpperCase();
                    $scope.Barkod = $scope.PaletKodu.toUpperCase();
                    db.GetData($scope.Firma,'PaletBarkodGetir',[$scope.PaletKodu.toUpperCase()],function(data)
                    {
                        console.log(data)
                        $scope.PaletListe = data;
                        $("#TblPalet").jsGrid({data : $scope.PaletListe});
                        PaletBarkodFocus();
                    });
                    $scope.PaletBarkod = "";
                });
            }
        });
    }
    $scope.PaletBarkodGetir = async function(pData)
    {
        if($scope.PaletListe.length > 0)
        {
            if($scope.PaletListe[0].PALET_KOD == $scope.PaletKodu.toUpperCase())
            {
                if(pData == 1)
                {
                    return;
                }
            }
        }
        db.GetData($scope.Firma,'PaletBarkodGetir',[$scope.PaletKodu.toUpperCase()],function(data)
        {
            console.log(data)
            $scope.PaletListe = data;
            if($scope.PaletListe.length > 0)
            {
                $scope.PaletMiktar = db.SumColumn($scope.PaletListe,"MIKTAR");
                $scope.PltBrutAgr = $scope.PaletListe[0].BRUTAGR;
                $scope.PltNetAgr = $scope.PaletListe[0].NETAGR;
                $scope.BasimAdet = $scope.PaletMiktar;
                $scope.StokKodu = $scope.PaletKodu.toUpperCase();
                $scope.Barkod = $scope.PaletKodu.toUpperCase();
                if(pData == 1)
                {
                    alertify.alert("Palet Koduna ait kayıtlar bulundu",function()
                    {
                        $("#TblPalet").jsGrid({data : $scope.PaletListe});
                        PaletBarkodFocus();
                    })
                }
                else
                {
                    $("#TblPalet").jsGrid({data : $scope.PaletListe});
                }
            }
            else
            {
                $("#TblPalet").jsGrid({data : $scope.PaletListe});
            }
            PaletBarkodFocus();
        });
    }
    $scope.BtnPaletBarkodSil = function()
    {
        if($scope.PaletListeSelectedIndex > -1)
        {
            alertify.okBtn("Evet");
            alertify.cancelBtn("Hayır");
            alertify.confirm("Seçili satırı silmek istediğinize emin misiniz ?",function()
            {
                db.ExecuteTag($scope.Firma,'PaletBarkodSil',[$scope.PaletGuid],function(InsertResult)
                {
                    $scope.PaletMiktar = $scope.PaletMiktar - $scope.PaletStokMiktar;
                    $scope.PaletBarkod = "";
                    $scope.PaletGuid = "";
                    $scope.PaletListeSelectedIndex = -1;
                    $scope.PaletBarkodGetir(0)
                });
            },function(){})
        }
        else
        {
            alertify.alert("Lütfen Silmek İstediğiniz Satırı Seçiniz")
        }
    }
    $scope.YeniPaletKod = function()
    {
        db.GetPromiseTag($scope.Firma,'PaletBarkodSira',[],function(data)
        {
            console.log(data)
            PaletBarkodFocus();
            $scope.PaletKodu = data[0].PALET_KOD
            $scope.PaletMiktar = 0;
            $scope.PaletListe = [];
            $("#TblPalet").jsGrid({data : $scope.PaletListe});
        });
    }
    $scope.BtnPaletEnter = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            $scope.BtnPaletBarkodEkle();
        }
    }
    $scope.BtnPaletYazdir = async function()
    {
        alertify.okBtn("Evet");
        alertify.cancelBtn("Hayır");
        alertify.confirm("Yazdırmak istediğinize emin misiniz?",
        async function()
        {
            //UPDATE TARAFI
            for (let i = 0; i < $scope.PaletListe.length; i++) 
            {
                console.log(i + 1 + ". yazdırma")
                await $scope.NetBrutUpd(i)
            }
            //YAZDIRMA TARAFI
            console.log("Insert tarafı")
            await $scope.Insert()
        },
        function(){})
    }
    $scope.NetBrutUpd =  function(i)
    {
        return new Promise(async resolve => 
        { 
            let BrtAgirlik = $scope.PltBrutAgr / $scope.PaletListe.length
            let NetAgirlik = $scope.PltNetAgr / $scope.PaletListe.length;
            console.log(1)
            var TmpQuery = 
            {
                db : '{M}.' + $scope.Firma,
                query:  "UPDATE BEKA_PALET_TANIMLARI SET BRUTAGR = @sth_brutagirlik, NETAGR = @sth_netagirlik WHERE PALET_KOD = @PALETKOD ",
                param:  ['sth_brutagirlik','sth_netagirlik','PALETKOD'],
                type:   ['float','float','string|25'],
                value:  [$scope.PltBrutAgr,$scope.PltNetAgr,$scope.PaletListe[0].PALET_KOD]
            }
            console.log(2)
            await db.ExecutePromiseQuery(TmpQuery,async function(data)
            {   
                console.log(3)
                console.log(data)
                resolve();
            });
            await db.GetPromiseTag($scope.Firma,'BarkodGetir',[$scope.PaletListe[i].STOK_BARKOD,0],async function(BarkodData)
            {
                if(BarkodData.length > 0)
                {
                    var TmpQuery = 
                    {
                        db : '{M}.' + $scope.Firma,
                        query:  "UPDATE STOK_HAREKETLERI SET sth_brutagirlik = @sth_brutagirlik, sth_netagirlik = @sth_netagirlik WHERE sth_parti_kodu = @sth_parti_kodu AND " +
                        "sth_tip = 0 AND sth_cins = 7 AND sth_evraktip = 12 ",
                        param:  ['sth_brutagirlik','sth_netagirlik','sth_parti_kodu'],
                        type:   ['float','float','string|25'],
                        value:  [BrtAgirlik,NetAgirlik,BarkodData[0].PARTI]
                    }
                    console.log(2)
                    await db.ExecutePromiseQuery(TmpQuery,async function(data)
                    {   
                        console.log(3)
                        console.log(data)
                        resolve();
                    });
                }
            });
            console.log(5)
        })

    }
}