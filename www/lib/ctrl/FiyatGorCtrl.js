function FiyatGorCtrl($scope,$window,$timeout,db)
{   
    let FiyatDegisSelectedRow = null;
    let StokSelectedRow = null;
   
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

        $scope.Special = "1";
        $scope.SpecialListe = [];

        $scope.FiyatListeSelectedIndex = -1;

        $scope.BarkodLock = false;
        $scope.EvrakLock = false;
        $scope.DepoMiktar = false;
        $scope.Combo = true;
        $scope.FiyatGizle = true;

        $scope.Loading = false;
        $scope.TblLoading = true;
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
                } 
            ],
            rowClick: function(args)
            {
                $scope.StokListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function StokBarkodGetir(pBarkod)
    {
        if(pBarkod != '')
        {   
            db.StokBarkodGetir($scope.Firma,pBarkod,$scope.DepoNo,function(BarkodData) 
            { 
                if(BarkodData.length <= 0)
                {
                    alertify.alert("Stok Bulunamamıştır.");
                }
                if(BarkodData.length > 0)
                {          
                           
                    $scope.Stok = BarkodData;
                    
                    $scope.Barkod = $scope.Stok[0].BARKOD;
                    $scope.StokKodu = $scope.Stok[0].KODU;
                    $scope.BarkodLock = true;

                    //Fiyat Getir
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
                        console.log(pFiyat[0].FIYAT)
                        $scope.Fiyat = pFiyat[0].FIYAT
                        $scope.Stok[0].DOVIZSEMBOL = pFiyat[0].DOVIZSEMBOL;
                        $scope.SatisFiyatListe2 = (pFiyat.length > 1) ? pFiyat[1].FIYAT : 0;
                    });
                    
                    //Depo Miktar Getir
                    var DepoMiktar =
                    {
                        db : '{M}.' + $scope.Firma,
                        query : "SELECT dep_adi DEPOADI,dep_no DEPONO,(SELECT dbo.fn_DepodakiMiktar(@STOKKODU,DEPOLAR.dep_no,GETDATE())) AS DEPOMIKTAR FROM DEPOLAR ",
                        param : ['STOKKODU'],
                        type : ['string|50'],
                        value : [$scope.StokKodu]
                    }
                   //Son Alış Getir
                    db.GetData($scope.Firma,'TumSonAlisGetir',[BarkodData[0].KODU],function(data)
                    {
                        $scope.SonAlis = data[0].SONFIYAT
                    });
                    db.GetDataQuery(DepoMiktar,function(pDepoMiktar)
                    {   
                        $scope.DepoMiktarListe = pDepoMiktar
                        $("#TblDepoMiktar").jsGrid({data : $scope.DepoMiktarListe});
                    });
                    BarkodFocus()
                }
            });
        }
        else
        {
            console.log("Aradığınız Stok Bulunamamıştır.")
            alertify.alert("Stok Bulunamamıştır.");
        }
    }
    function InsertData()
    {   
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
    $scope.BtnStokBarkodGetir = function(keyEvent)
    {
        if(keyEvent.which == 13)
        {
            StokBarkodGetir($scope.Barkod);
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
        }
        else if($scope.StokGridTip == "1")
        {
            Kodu = $scope.StokGridText.replace("*","%").replace("*","%");
        } 
        else if($scope.StokGridTip == "2")
        {
            Marka = $scope.Marka;
        }
        db.GetData($scope.Firma,'StokGetir',[Kodu,Adi,$scope.DepoNo,Marka],function(StokData)
        {
            $scope.StokListe = StokData;
            if($scope.StokListe.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblStok").jsGrid({data : $scope.StokListe});
            }
            else
            {
                $("#TblStok").jsGrid({data : $scope.StokListe});
            }
           
        });
    }
    $scope.BtnStokGridSec = function()
    {
        $("#MdlStokGetir").modal('hide');
        StokBarkodGetir($scope.Barkod);
        $scope.StokListe = [];
        $("#TblStok").jsGrid({data : $scope.StokListe});
    }
    $scope.BtnBarkodGetirClick = function()
    {
        StokBarkodGetir($scope.Barkod);
    }
    $scope.BtnTemizle = function()
    {   
        InitDepoMiktarGrid();

        $scope.Stok = [];
        $scope.DepoMiktarListe = [];
        $scope.Fiyat = "";
        $scope.Barkod = "";
        $scope.SonAlis = "";
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
                
                console.log(item)
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
        
        if(UserParam.FiyatGor.FiyatGizle == "1")
        {
            $scope.FiyatGizle = false;
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
        db.MaxSira($scope.Firma,'MaxEtiketSira',[$scope.Seri],function(data){$scope.Sira = data});
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
        if ( StokSelectedRow ) { StokSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        StokSelectedRow = $row;
        
        $scope.Barkod = $scope.StokListe[pIndex].KODU;
    }
    $scope.Insert = function()
    {
        InsertData();
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
           $("#MdlReyonDegisikligi").modal('hide');
        });
    }  
}