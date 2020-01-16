function DepoMalKabulCtrl($scope,$window,$timeout,db)
{
    let IslemSelectedRow = null;
    let SiparisSelectedRow = null;
    let SiparisKabulListeSelectedRow = null;
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
        $scope.DepoAdi = "";
        $scope.BelgeNo = "";
        $scope.Barkod = "";
        $scope.StokGridText = "";
        $scope.OdemeNo = "0";
        $scope.Birim = "0";
        $scope.StokGridTip = "0";
        $scope.CmbEvrakTip = "0";
        $scope.Sira = 0;
        $scope.EvrakTip = 13;
        $scope.ToplamSatir = 0;
        $scope.Miktar2 = 0;
        $scope.StokTip = 0;
        $scope.StokCins = 0;
        $scope.Tarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.SipIlkTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.SipSonTarih = moment(new Date()).format("DD.MM.YYYY");

        $scope.CDepoListe = [];
        $scope.GDepoListe = [];
        $scope.StokHarListe = [];
        $scope.BirimListe = [];
        $scope.SiparisListe = [];
        $scope.SiparisKabulListe = [];
        
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
                    name: "SERI-SIRA",
                    title: "SERİ - SIRA",
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
                $scope.SiparisListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function BarkodFocus()
    {
        $timeout( function(){$window.document.getElementById("Barkod").focus();},100);
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
    $scope.YeniEvrak = async function()
    {
        Init();
        InitIslemGrid();
        InitStokGrid();
        InitSiparisListeGrid();
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

        db.DepoGetir($scope.Firma,UserParam.DepoSevk.CDepoListe,function(data)
        {
            $scope.CDepoListe = data; 
            $scope.CDepo = UserParam.DepoSevk.CDepo;
            $scope.CDepoListe.forEach(function(item) 
            {
                if(item.KODU == $scope.CDepo)
                    $scope.CDepoAdi = item.ADI;
            });          
        });
        db.DepoGetir($scope.Firma,UserParam.DepoSevk.GDepoListe,function(data)
        {
            $scope.GDepoListe = data; 
            $scope.GDepo = UserParam.DepoSevk.GDepo;
            $scope.GDepoListe.forEach(function(item) 
            {
                if(item.KODU == $scope.GDepo)
                    $scope.GDepoAdi = item.ADI;
            });     
        });

        await db.MaxSira($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EkrakTip],function(data)
        {
            $scope.Sira = data
        });
        
        BarkodFocus();
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
                    "SIPARIS.ssip_evrakno_seri + ' - ' + CONVERT(NVARCHAR(50),SIPARIS.ssip_evrakno_sira) AS [SERI-SIRA], " + 
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
    $scope.SiparisListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( SiparisSelectedRow ) { SiparisSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        SiparisSelectedRow = $row;
        
        $scope.Barkod = $scope.SiparisListe[pIndex].KODU;
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
        $("#TbBarkodGiris").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TbSiparisSecimi").removeClass('active');
        
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