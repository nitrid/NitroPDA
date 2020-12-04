function FiyatGorCtrl($scope,$window,$timeout,db)
{   
    let FiyatDegisSelectedRow = null;
    let StokSelectedRow = null;
    let EklenecekStokSelectedRow= null;
    let BarkodSelectedRow = null;
    
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

        $scope.Special = UserParam.FiyatGor.Special;
        $scope.SpecialListe = [];

        $scope.FiyatListeSelectedIndex = -1;

        $scope.BarkodLock = false;
        $scope.EvrakLock = false;
        $scope.DepoMiktar = false;
        $scope.Combo = true;
        $scope.FiyatGizle = true;
        $scope.StokResim = false;
        
        $scope.Loading = false;
        $scope.TblLoading = true

        $scope.ListeFiyatNo = 0;
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
                $scope.BarkodListeRowClik(args.itemIndex,args.item,this);
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
                    
                    $scope.Barkod = $scope.Stok[0].BARKOD;
                    console.log($scope.Barkod)
                    $scope.StokKodu = $scope.Stok[0].KODU;
                    $scope.BarkodLock = true;
                    $scope.ReyonStok = $scope.Stok[0].BARKOD;

                    //Maliyet Getir
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
                        value: [$scope.StokKodu,$scope.FiyatListe,$scope.DepoNo]
                    }
                    db.GetDataQuery(Fiyat,function(pFiyat)
                    {  
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
                        $scope.SktGetirListe = pSktGetir
                        $scope.MaxSkt = $scope.SktGetirListe[0].SKT                  
                    });
                     //Son Alış Getir
                     db.GetData($scope.Firma,'TumSonAlisGetir',[BarkodData[0].KODU],function(data)
                     {
                         if(typeof(data) != 'undefined')
                         {
                             $scope.SonAlis = data[0].SONFIYAT
                             $scope.SonAlisDoviz = data[0].DOVIZSEMBOL
                         }
                     });
                    if($scope.Barkod == '')
                    {
                        console.log(1)
                        var BarkodGetir =
                        {
                            db : '{M}.' + $scope.Firma,
                            query : "SELECT bar_kodu AS BARKOD FROM BARKOD_TANIMLARI WHERE bar_stokkodu = @STOKKODU ",
                            param : ['STOKKODU'],
                            type : ['string|50'],
                            value : [$scope.StokKodu]
                        }
                        db.GetDataQuery(BarkodGetir,function(data)
                        {   
                            if(data.length > 0)
                            $scope.Barkodliste = data
                            $("#TblBarkodlar").jsGrid({data : $scope.Barkodliste});
                            $("#MdlBarkodlar").modal('show');
                            
                        });
                    }
                    BarkodFocus()
                    
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
    function InsertData()
    {   
        console.log(InsertData)
        if($scope.Barkod > 0)
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
                        $scope.SonAlisDoviz = ""
                        $scope.BarkodLock = false;
                        BarkodFocus();
                        
                        InsertAfterRefresh(EtiketData);
                        alertify.alert("Etiket Yazdırıldı.");

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
            alertify.alert("Barkod Okutmadan Ekleme Yapılmaz!");
        }
    }
    function BarkodFocus()
    {
        $timeout( function(){$window.document.getElementById("Barkod").focus();},100);
    }
    function InsertAfterRefresh(pData)
    {   
        $scope.EtiketListe = pData;
        $("#TblIslem").jsGrid({data : $scope.EtiketListe});    
        $scope.BtnTemizle();
        $window.document.getElementById("Barkod").focus();
    }
    $scope.FiyatListeChange = function()
    {
        var Fiyat = 
        {
            db : '{M}.' + $scope.Firma,
            query : "SELECT " + 
                    "CASE WHEN (SELECT sfl_kdvdahil FROM STOK_SATIS_FIYAT_LISTE_TANIMLARI WHERE sfl_sirano=sfiyat_listesirano) = 0 THEN " + 
                    "dbo.fn_StokSatisFiyati(sfiyat_stokkod,sfiyat_listesirano,sfiyat_deposirano,1) " + 
                    "ELSE " + 
                    "dbo.fn_StokSatisFiyati(sfiyat_stokkod,sfiyat_listesirano,sfiyat_deposirano,1) / ((SELECT dbo.fn_VergiYuzde ((SELECT TOP 1 sto_toptan_vergi FROM STOKLAR WHERE sto_kod = sfiyat_stokkod)) / 100) + 1) " + 
                    "END AS FIYAT, " + 
                    "(SELECT sfl_aciklama AS ADI FROM STOK_SATIS_FIYAT_LISTE_TANIMLARI WHERE sfl_sirano = sfiyat_listesirano) AS SATISADI, " +
                    "sfiyat_listesirano AS FIYATSIRALISTE " +
                    "FROM STOK_SATIS_FIYAT_LISTELERI " +
                    "WHERE sfiyat_stokkod = @STOKKODU AND sfiyat_deposirano IN (0,@DEPONO) " +
                    "ORDER BY sfiyat_deposirano DESC", 
            param: ['STOKKODU','DEPONO'],
            type:  ['string|50','int'],
            value: [$scope.StokKodu,$scope.DepoNo]
        }
        db.GetDataQuery(Fiyat,function(pFiyat)
        {  
            $scope.FiyatListeler = pFiyat;
            $scope.DigerFiyat = $scope.ListeFiyatNo;
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
            $scope.StokListe = StokData;
            if ($scope.StokListe.length > 0)
            {
                console.log(2)
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
    },
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
        $("#TbStok").removeClass('active');
        $("#TbMain").addClass('active');
        StokBarkodGetir($scope.Barkod);
        $scope.StokListe = [];
        $("#TblStok").jsGrid({data : $scope.StokListe});
    }
    $scope.BtnBarkodGetirClick = function()
    {
        StokBarkodGetir($scope.Barkod);
        $scope.Barkod = "";
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

        var FiyatDegisDetay = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "SELECT " +
                    "fid_evrak_seri_no AS SERI, " +
                    "fid_evrak_sira_no AS SIRA, " +
                    "fid_stok_kod AS STOKKOD, " +
                    "ISNULL((SELECT bar_kodu FROM BARKOD_TANIMLARI WHERE bar_stokkodu = fid_stok_kod),'') AS BARKOD, " +
                    "fid_eskifiy_tutar AS ESKITUTAR, " +
                    "fid_yenifiy_tutar AS YENITUTAR, " +
                    "dbo.fn_DepodakiMiktar(fid_stok_kod,@DEPONO,GETDATE()) AS DEPOMIKTAR, " +
                    "fid_evrak_satir_no AS SATIR, " +
                    "CONVERT(VARCHAR(10),fid_evrak_tarih,121) TARIH  " +
                    "FROM STOK_FIYAT_DEGISIKLIKLERI " +
                    "WHERE fid_evrak_seri_no = @SERI AND fid_evrak_sira_no = @SIRA ",
            param: ['SERI','SIRA','DEPONO'],
            type:  ['string|50','int','int'],
            value: [$scope.FiyatDegSeri,$scope.FiyatDegSira,$scope.DepoNo]
        }

        db.GetDataQuery(FiyatDegisDetay,function(pFiyatDegisDetay)
        {  
            $scope.FiyatDegisDetay = pFiyatDegisDetay;
        });
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
        
        if(UserParam.FiyatGor.FiyatGizle == "1")
        {
            $scope.FiyatGizle = false;
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
        
       // db.FillCmbDocInfo($scope.Firma,'CmbDepoGetir',function(data){$scope.DepoListe = data; $scope.DepoNo = UserParam.FiyatGor.DepoNo});
        db.MaxSiraPromiseTag($scope.Firma,'MaxEtiketSira',[$scope.Seri],function(data){$scope.Sira = data});
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
    $scope.BarkodListeRowClik = function(pIndex,pItem,pObj)
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
    }
    $scope.Insert = function()
    {
        InsertData();
    }
    $scope.ManuelAramaCikis = function()
    {
        $("#TbStok").removeClass('active');
        $("#TbMain").addClass('active');
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
                $scopeEklenecekCarpan = 1;
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
           $scope.EklenecekBirimPntr
        ];

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
}