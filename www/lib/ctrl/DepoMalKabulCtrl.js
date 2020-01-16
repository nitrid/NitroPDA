function DepoMalKabulCtrl($scope,$window,$timeout,db)
{
    let IslemSelectedRow = null;
    let SiparisSelectedRow = null;
    let SiparisListeGetirRow = null;
    let ParamName = "";

    let UserParam = null;
    let EvrakParam = null;

    function Init()
    {
        gtag('config', 'UA-12198315-14', 
        {
            'page_title' : 'Mal Kabul Eşleştirme',
            'page_path': '/MalKabulEslestirme'
        });

        UserParam = Param[$window.sessionStorage.getItem('User')];
        $scope.Firma = $window.sessionStorage.getItem('Firma');
        
        $scope.CDepo;
        $scope.GDepo;
        $scope.CDepoAdi;
        $scope.GDepoAdi;
        $scope.Seri = "";
        $scope.Sira = 0;
        $scope.DepoAdi = "";
        $scope.BelgeNo = "";
        $scope.Barkod = "";
        $scope.StokGridText = "";
        $scope.OdemeNo = "0";
        $scope.Birim = "0";
        $scope.StokGridTip = "0";
        $scope.CmbEvrakTip = "0";
        $scope.ToplamSatir = 0;
        $scope.Miktar2 = 0;
        $scope.StokTip = 0;
        $scope.StokCins = 0;
        $scope.EvrakTip = 2;
        $scope.Cins = 6;
        $scope.Tip = 2;
        $scope.Tarih = moment(new Date()).format("DD.MM.YYYY");
        
        $scope.SipIlkTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.SipSonTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.SipSeri = "";
        $scope.SipSira = 0;

        $scope.CDepoListe = [];
        $scope.GDepoListe = [];
        $scope.StokHarListe = [];
        $scope.BirimListe = [];
        $scope.SiparisListe = [];
        $scope.SiparisListeGetir = [];
        
        $scope.Stok = [];
        $scope.Miktar = 1;

        $scope.MiktarLock = false;
        $scope.OtoEkle = false;
        $scope.EvrakLock = false;
        $scope.BarkodLock = false;
        $scope.IslemListeSelectedIndex = -1;
        $scope.SiparisKabulListeSelectedIndex = 0;

        // DÜZENLE MODAL
        $scope.MiktarEdit = 0;
        $scope.FiyatEdit = 0;
        
        $scope.Loading = false;
        $scope.TblLoading = true;
    }
    function InitIslemGrid()
    {   
        $("#TblIslem").jsGrid({
            responsive: true,
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.DepoSevkListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            
            fields: 
            [
            {
                name: "ADI",
                title: "ADI",
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
                name: "MIKTAR2",
                title: "MIKTAR2",
                type: "text",
                align: "center",
                width: 100
            }],
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
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.StokListe,
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
    function InitSiparisListeGrid()
    {
        $("#TblSiparisListe").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.SiparisListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: [
                {
                    name: "GIRISDEPOADI",
                    title: "GİRİŞ DEPO ADI",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "CIKISDEPOADI",
                    title: "ÇIKIŞ DEPO ADI",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "TESLIMTARIH",
                    title: "TESLİM TARİH",
                    type: "text",
                    align: "center",
                    width: 150
                },
                {
                    name: "SERI",
                    title: "SERİ",
                    type: "text",
                    align: "center",
                    width: 100
                },
                {
                    name: "SIRA",
                    title: "SIRA",
                    type: "text",
                    align: "center",
                    width: 100
                },
                {
                    name: "SIPMIKTAR",
                    title: "SİP MİKTAR",
                    type: "text",
                    align: "center",
                    width: 100
                },
                {
                    name: "TESLIMMIKTAR",
                    title: "TESLİM MİKTAR",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "BMIKTAR",
                    title: "BEKLEYEN MİKTAR",
                    type: "text",
                    align: "center",
                    width: 200
                }
             
            ],
            rowClick: function(args)
            {
                $scope.SiparisListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitSiparisListeGetirGrid()
    {
        $("#TblSiparisGetirListe").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.SiparisGetirListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: [
                {
                    name: "ADI",
                    title: "ADI",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "SIPMIKTAR",
                    title: "SİP MİKTAR",
                    type: "text",
                    align: "center",
                    width: 100
                },
                {
                    name: "TESLIMMIKTAR",
                    title: "TESLİM MİKTAR",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "BMIKTAR",
                    title: "BEKLEYEN MİKTAR",
                    type: "text",
                    align: "center",
                    width: 200
                }
             
            ],
            rowClick: function(args)
            {
                $scope.SiparisListeGetirRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function BarkodFocus()
    {
        $timeout( function(){$window.document.getElementById("Barkod").focus();},100);
    }
    function StokBarkodGetir(pBarkod)
    {
        if(pBarkod != '')
        {
            db.StokBarkodGetir($scope.Firma,pBarkod,$scope.CDepo,async function(BarkodData)
            {    
                $scope.Stok = BarkodData;
                if(BarkodData.length > 0)
                {   
                    $scope.Stok = BarkodData
                    $scope.Stok[0].Satir = 0;
                    $scope.Stok[0].Miktar = 0;
                    $scope.Stok[0].TOPMIKTAR = 1;

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
                    });

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
                    BeepAndConfirmation();
                }
            });
        }
    }
    function BeepAndConfirmation()
    {
        navigator.vibrate([100,100,200,100,300]);
        navigator.notification.vibrate(1000);
        document.getElementById("Beep").play();
    }
    $scope.YeniEvrak = async function()
    {
        Init();
        InitIslemGrid();
        InitStokGrid();
        InitSiparisListeGrid();
        InitSiparisListeGetirGrid();
        $scope.MainClick();

        $scope.EvrakLock = false;
        $scope.Seri = UserParam.DepoSevk.Seri;
        $scope.BelgeNo = UserParam.DepoSevk.BelgeNo;
        $scope.EvrakTip = UserParam.DepoSevk.EvrakTip;

        $scope.Stok = 
        [
            {
                SATIR :0,
                MIKTAR :0,
                BIRIM : '',
                BIRIMPNTR : 0, 
                TOPMIKTAR : 0
            }
        ];

        await db.DepoGetir($scope.Firma,UserParam.DepoSevk.CDepoListe,function(data)
        {
            $scope.CDepoListe = data; 
            $scope.CDepo = UserParam.DepoSevk.CDepo;
            $scope.CDepoListe.forEach(function(item) 
            {
                if(item.KODU == $scope.CDepo)
                    $scope.CDepoAdi = item.ADI;
            });          
        });
        await db.DepoGetir($scope.Firma,UserParam.DepoSevk.GDepoListe,function(data)
        {
            $scope.GDepoListe = data; 
            $scope.GDepo = UserParam.DepoSevk.GDepo;
            $scope.GDepoListe.forEach(function(item) 
            {
                if(item.KODU == $scope.GDepo)
                    $scope.GDepoAdi = item.ADI;
            });     
        });
        
        BarkodFocus();
        $scope.EvrakTipChange();
    }
    $scope.EvrakTipChange = async function()
    {
        if($scope.CmbEvrakTip == 0)
        {   
            $scope.EvrakTip = 2;
            $scope.Cins = 6;
            $scope.Tip = 2;
        }
        await db.MaxSira($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip],function(data){$scope.Sira = data});
    }
    $scope.BtnSiparisListele = async function()
    {
        $scope.Loading = true;
        $scope.TblLoading = false;

        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "SELECT " +
                    "ISNULL((SELECT TOP 1 dep_adi FROM DEPOLAR WHERE dep_no = SIPARIS.ssip_girdepo),'') AS GIRISDEPOADI, " +
                    "ISNULL((SELECT TOP 1 dep_adi FROM DEPOLAR WHERE dep_no = SIPARIS.ssip_cikdepo),'') AS CIKISDEPOADI, " + 
                    "CONVERT(VARCHAR,SIPARIS.ssip_teslim_tarih, 104) AS TESLIMTARIH, " +
                    "SIPARIS.ssip_evrakno_seri AS SERI, " +
                    "SIPARIS.ssip_evrakno_sira AS SIRA, " +
                    "SUM(SIPARIS.ssip_miktar) AS SIPMIKTAR, " +                     
                    "SUM(SIPARIS.ssip_teslim_miktar) AS TESLIMMIKTAR, " + 
                    "SIPARIS.ssip_girdepo AS GIRISDEPO, " + 
                    "SIPARIS.ssip_cikdepo AS CIKISDEPO, " + 
                    "SUM(SIPARIS.ssip_miktar - SIPARIS.ssip_teslim_miktar) AS BMIKTAR, " + 
                    "COUNT(SIPARIS.ssip_satirno) AS SATIR " +
                    "FROM DEPOLAR_ARASI_SIPARISLER AS SIPARIS " + 
                    "WHERE SIPARIS.ssip_teslim_tarih>=@ILKTARIH AND SIPARIS.ssip_teslim_tarih<=@SONTARIH " +
                    "GROUP BY SIPARIS.ssip_teslim_tarih,SIPARIS.ssip_evrakno_seri,SIPARIS.ssip_evrakno_sira,SIPARIS.ssip_girdepo, " + 
                    "SIPARIS.ssip_cikdepo " +
                    "HAVING SUM(SIPARIS.ssip_miktar - SIPARIS.ssip_teslim_miktar) > 0 " +
                    "ORDER BY ssip_teslim_tarih " ,
            param:  ['ILKTARIH','SONTARIH'],
            type:   ['date','date'],
            value:  [$scope.SipIlkTarih,$scope.SipSonTarih]
        }
        await db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.SiparisListe = Data;
            if($scope.SiparisListe.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblSiparisListe").jsGrid({data : $scope.SiparisListe});
            }
            else
            {
                alertify.alert("Seçilen " + $scope.SipIlkTarih + " - " + $scope.SipSonTarih + " Tarih Aralığında Sipariş Bulunamamıştır.");
                $scope.Loading = false;
                $scope.TblLoading = true;
            }
        });
    }
    $scope.BtnSiparisListeGetir = async function()
    {
        $scope.Loading = true;
        $scope.TblLoading = false;

        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "SELECT " +
                    "MAX(BARKOD.bar_kodu) AS BARKOD, " +
                    "DEPOSIPARIS.ssip_stok_kod AS KODU, " +
                    "ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod=DEPOSIPARIS.ssip_stok_kod),'') AS ADI, " +
                    "DEPOSIPARIS.ssip_satirno AS SATIRNO, " +
                    "DEPOSIPARIS.ssip_belgeno AS BELGENO, " +
                    "DEPOSIPARIS.ssip_b_fiyat AS BFIYAT, " +
                    "ISNULL(BEDENHAR.BdnHar_HarGor, DEPOSIPARIS.ssip_miktar) AS SIPMIKTAR, " +
                    "ISNULL(BEDENHAR.BdnHar_TesMik, DEPOSIPARIS.ssip_teslim_miktar) AS TESLIMMIKTAR, " +
                    "DEPOSIPARIS.ssip_tutar AS TUTAR, " +
                    "DEPOSIPARIS.ssip_girdepo AS GDEPO, " +
                    "DEPOSIPARIS.ssip_cikdepo as CDEPO, " +
                    "ISNULL((BEDENHAR.BdnHar_HarGor - BEDENHAR.BdnHar_TesMik)	,(DEPOSIPARIS.ssip_miktar - DEPOSIPARIS.ssip_teslim_miktar)) AS BMIKTAR, " +
                    "CONVERT(FLOAT,0) AS MIKTAR, " +
                    "(SELECT dbo.fn_StokBirimi (DEPOSIPARIS.ssip_stok_kod,DEPOSIPARIS.ssip_birim_pntr)) AS BIRIM, " +
                    "ISNULL((SELECT dbo.fn_DepodakiMiktar (STOK.sto_kod,@CDEPO,CONVERT(VARCHAR(10),GETDATE(),112))),0) AS DEPOMIKTAR " +
                    "FROM DEPOLAR_ARASI_SIPARISLER AS DEPOSIPARIS " +
                    "INNER JOIN  BARKOD_TANIMLARI AS BARKOD ON  " +
                    "BARKOD.bar_stokkodu=DEPOSIPARIS.ssip_stok_kod " +
                    "LEFT OUTER JOIN BEDEN_HAREKETLERI AS BEDENHAR ON  " +
                    "BEDENHAR.[BdnHar_Tipi] = 1 AND BdnHar_Guid = DEPOSIPARIS.ssip_Guid " +
                    "INNER JOIN STOKLAR AS STOK ON " +
                    "STOK.sto_kod = DEPOSIPARIS.ssip_stok_kod " +
                    "WHERE DEPOSIPARIS.ssip_evrakno_seri = @SIPSERI AND DEPOSIPARIS.ssip_evrakno_sira = @SIPSIRA " +
                    "GROUP BY " +
                    "DEPOSIPARIS.ssip_stok_kod, " +
                    "STOK.sto_isim, " +
                    "DEPOSIPARIS.ssip_tarih, " +
                    "DEPOSIPARIS.ssip_teslim_tarih, " +
                    "DEPOSIPARIS.ssip_evrakno_seri, " +
                    "DEPOSIPARIS.ssip_evrakno_sira, " +
                    "DEPOSIPARIS.ssip_satirno, " +
                    "DEPOSIPARIS.ssip_belgeno, " +
                    "DEPOSIPARIS.ssip_b_fiyat, " +
                    "BEDENHAR.BdnHar_HarGor, " +
                    "DEPOSIPARIS.ssip_miktar," + 
                    "DEPOSIPARIS.ssip_birim_pntr," +
                    "BEDENHAR.BdnHar_TesMik, " +
                    "DEPOSIPARIS.ssip_teslim_miktar, " +
                    "DEPOSIPARIS.ssip_tutar, " +
                    "DEPOSIPARIS.ssip_girdepo, " +
                    "DEPOSIPARIS.ssip_cikdepo, " +
                    "BEDENHAR.BdnHar_BedenNo, " +
                    "STOK.sto_renk_kodu, " +
                    "STOK.sto_beden_kodu, " +
                    "BARKOD.bar_birimpntr, " +
                    "STOK.sto_kod, " +
                    "STOK.sto_detay_takip " ,
            param:  ['CDEPO','SIPSERI','SIPSIRA'],
            type:   ['int','string|25','int'],
            value:  [$scope.CDepo,$scope.SipSeri,$scope.SipSira]
        }
        await db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.SiparisListeGetir = Data;
            if($scope.SiparisListeGetir.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblSiparisGetirListe").jsGrid({data : $scope.SiparisListeGetir});
            }
            else
            {
                alertify.alert("Seçilen " + $scope.SipIlkTarih + " - " + $scope.SipSonTarih + " Tarih Aralığında Sipariş Bulunamamıştır.");
                $scope.Loading = false;
                $scope.TblLoading = true;
            }
        });
    }
    $scope.BtnSiparisListeGetirSec = function()
    {
        
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
                TOPMIKTAR :0
            }
        ];
        $scope.Miktar = 1;
        $scope.BarkodLock = false;
        
        $scope.BirimListe = [];
        BarkodFocus();      
    }
    $scope.BtnStokBarkodGetir = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            StokBarkodGetir($scope.Barkod);    
        }
    }
    $scope.MiktarFiyatValid = function()
    {
        $scope.Stok[0].TOPMIKTAR = $scope.Stok[0].CARPAN * $scope.Miktar
    }
    $scope.SiparisListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( SiparisSelectedRow ) { SiparisSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        SiparisSelectedRow = $row;
        
        $scope.SipSeri = $scope.SiparisListe[pIndex].SERI;
        $scope.SipSira = $scope.SiparisListe[pIndex].SIRA;
        $scope.CDepo = $scope.SiparisListe[pIndex].CIKISDEPO.toString();
        $scope.GDepo = $scope.SiparisListe[pIndex].GIRISDEPO.toString();
        $scope.CDepoAdi = $scope.SiparisListe[pIndex].CIKISDEPOADI;
        $scope.GDepoAdi = $scope.SiparisListe[pIndex].GIRISDEPOADI;
    }
    $scope.SiparisListeGetirRowClick = function(pIndex,pItem,pObj)
    {
        if ( SiparisListeGetirRow ) { SiparisListeGetirRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        SiparisListeGetirRow = $row;
        
        $scope.Barkod = $scope.SiparisListeGetir[pIndex].BARKOD;

        console.log($scope.Barkod)
    }
    $scope.MainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TbSiparisSecimi").removeClass('active');
    }
    $scope.BelgeBilgisiClick = function() 
    {
        $("#TbBelgeBilgisi").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbSiparisSecimi").removeClass('active');
    }
    $scope.BarkodGirisClick = function() 
    {
        if($scope.GDepo == $scope.CDepo && $scope.SiparisListe.length <= 0)
        {
            alertify.alert("Bu Ekrana Girebilmeniz İçin Sipariş Seçimi Yapılmalı ve Giriş ve Çıkış Depoları Farklı Olmalıdır.");
            BeepAndConfirmation();
        }
        else
        {
            $("#TbBarkodGiris").addClass('active');
            $("#TbMain").removeClass('active');
            $("#TbBelgeBilgisi").removeClass('active');
            $("#TbIslemSatirlari").removeClass('active');
            $("#TbSiparisSecimi").removeClass('active');
        }
        BarkodFocus();
    }
    $scope.TbIslemSatirlariClick = function() 
    {
        $("#TbIslemSatirlari").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbSiparisSecimi").removeClass('active');
    }
    $scope.SiparisSecimiClick = function() 
    {
        if($scope.StokHarListe.length == 0)
        {
            $("#TbSiparisSecimi").addClass('active');
            $("#TbMain").removeClass('active');
        }
        else
        {
            alertify.okBtn("Tamam");
            alertify.alert("Kayıtlı Evrak Olmadan Bu Menüye Giremezsiniz!");            
        }
    }
    $scope.SiparisEkranSec = function()
    {
        $("#TbBarkodGiris").removeClass('active');
    }
}