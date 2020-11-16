function CariAnalizCtrl($scope,$window,db)
{       
    let PersonelSelectedRow = null;
    let IslemSelectedRow = null;
    let CariSelectedRow = null;

    
    function InitTahsilatRapor()
    {   
        $("#TblTahsilatRapor").jsGrid
        ({
            width: "100%",
            height: "auto",
            updateOnResize: true,
            heading: true,
            selecting: true,
            sorting: true,
            paging: true,
            pageSize: 12,
            pageButtonCount: 3,
            data : $scope.TahsilatRapor,
            fields: 
            [
                {
                    name: "ADI",
                    title: "CARİ ADI",
                    type: "text",
                    align: "center",
                    width: 200
                    
                },
                { name: "BAKIYE" ,title : "BAKIYE" ,width : "100" ,align: "center",  },
                { name: "SONTAHSILATISLEM" ,title : "SON TAHSİLAT(GÜN)" ,width : "100" ,align: "center",},
                { name: "SONTAHSILATISLEMADI" ,title : "TAHSİLAT TİPİ" ,width : "100" ,align: "center",},
                { name: "SONTEDIYEISLEM" ,title : "SON TEDİYE(GÜN)" ,width : "100" ,align: "center",},
                { name: "SONTEDIYEISLEMADI" ,title : "TEDİYE TİPİ" ,width : "100" ,align: "center",},
                { name: "ORTALAMAVADE" ,title : "ORTALAMA VADE(GUN)" ,width : "100" ,align: "center",},
            ],
            rowClick: function(args)
            {
                $scope.IslemDetayRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitCariFoy()
    {   
        $("#TblCariFoy").jsGrid
        ({
            width: "150%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            sorting: true,
            paging: true,
            pageSize: 12,
            pageButtonCount: 3,
            data : $scope.CariFoyListe,
            fields: 
            [
                {
                    name: "TARIH",
                    title: "TARİH",
                    type: "text",
                    align: "center",
                    width: 120
                    
                },
                {
                    name: "SERISIRA",
                    title: "SERİ SIRA",
                    type: "text",
                    align: "center",
                    width: 120
                    
                },
                {
                    name: "EVRAKTIP",
                    title: "EVRAK TİP",
                    type: "text",
                    align: "center",
                    width: 180
                },
                {
                    name: "CINSI",
                    title: "CİNSİ",
                    type: "text",
                    align: "center",
                    width: 120
                },
           
                {
                    name: "ANADOVIZBORC",
                    title: "BORÇ",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "ANADOVIZALACAK",
                    title: "ALACAK",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "ANADOVIZBAKIYE",
                    title: "BAKİYE",
                    type: "text",
                    align: "center",
                    width: 200
                },
            ],
        });
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
                } 
            ],
            rowClick: function(args)
            {
                $scope.CariListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitPersonelGrid()
    {   
        $("#TblPersonel").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.PersonelListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{Sayfa} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
                {
                    name: "KODU",
                    type: "number",
                    align: "center",
                    width: 100
                    
                },
                {
                    name: "ADI",
                    type: "text",
                    align: "center",
                    width: 75
                } 
            ],
            rowClick: function(args)
            {
                $scope.PersonelListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    $scope.Init = function()
    {   
        $scope.Firma = $window.sessionStorage.getItem('Firma');
        UserParam = Param[$window.sessionStorage.getItem('User')];

        $scope.PlasiyerKodu = UserParam.Sistem.PlasiyerKodu;
        $scope.ToplamBakiye = 0;
        $scope.CmbCariAra = "0";
        $scope.TxtCariAra = "";
        $scope.CariAdi = ""
        $scope.CariKodu = ""
        $scope.TxtPersonelAra = "";
        $scope.CmbPersonelAra = "";
        $scope.CmbEvrakTip = "0";
        InitTahsilatRapor();
        InitCariFoy();
        InitCariGrid();
        InitPersonelGrid();
        $scope.BtnPersonelListele()
        $scope.MainClick();
        $scope.Evrakadi = 'Tahsilat Raporu'
        $scope.CariListe = [];
    }
    $scope.BtnPersonelSec = function()
    {   
        $('#MdlPersonelGetir').modal('hide');
    }
    $scope.BtnPersonelListele = function()
    {   
        let Kodu = '';
        let Adi = '';
        $scope.Loading = true;
        $scope.TblLoading = false;

        if($scope.TxtPersonelAra != "")
        {
            if($scope.CmbPersonelAra == "0")
            {   
                Adi = $scope.TxtPersonelAra.replace("*","%").replace("*","%");
            }
            else
            {
                Kodu = $scope.TxtPersonelAra.replace("*","%").replace("*","%");
            }
        }
        
        db.GetData($scope.Firma,'CmbPersonelGetir',[Kodu,Adi,UserParam.Sistem.PlasiyerKodu],function(data)
        {
            $scope.Loading = false;
            $scope.TblLoading = true;
            $scope.PersonelListe = data;
            $("#TblPersonel").jsGrid({data : $scope.PersonelListe});
            $("#TblPersonel").jsGrid({pageIndex : true});
        });
    }
    $scope.BtnTemizle = function()
    {
        $scope.PersonelAdi = "";
        $scope.PlasiyerKodu = "";
    }
    $scope.BtnGetir = function()
    {
        if($scope.CmbEvrakTip == '0')
        {
            console.log($scope.CariKodu)
            var TmpQuery = 
            {
                db : '{M}.' + $scope.Firma,
                query : "SELECT  " +
                "cari_kod AS KOD, " +
                "cari_unvan1 AS ADI, " +
                "CONVERT(NVARCHAR(15),CAST((SELECT dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,cari_doviz_cinsi,0,0,0,0))AS MONEY),1) AS BAKIYE,  " +
                "ISNULL((SELECT TOP 1 (SELECT DATEDIFF(day, cha_tarihi,getdate()) ) from CARI_HESAP_HAREKETLERI WHERE cha_kod = cari_kod and cha_tip = 1 and cha_evrak_tip <> 0 order by cha_tarihi desc),'0') AS SONTAHSILATISLEM , " +
                "ISNULL((SELECT TOP 1 [dbo].[fn_CariHarEvrTipUzun](cha_evrak_tip) from CARI_HESAP_HAREKETLERI WHERE cha_kod = cari_kod and cha_tip = 1 and cha_evrak_tip <> 0 order by cha_tarihi desc),'YOK') AS SONTAHSILATISLEMADI , " +
                "ISNULL((SELECT TOP 1 (SELECT DATEDIFF(day, cha_tarihi,getdate()) ) from CARI_HESAP_HAREKETLERI WHERE cha_kod = cari_kod and cha_tip = 0 and cha_evrak_tip <> 63 order by cha_tarihi desc),'0') AS SONTEDIYEISLEM , " +
                "ISNULL((SELECT TOP 1 [dbo].[fn_CariHarEvrTipUzun](cha_evrak_tip) from CARI_HESAP_HAREKETLERI WHERE cha_kod = cari_kod and cha_tip = 0 and cha_evrak_tip <> 63 order by cha_tarihi desc),'YOK') AS SONTEDIYEISLEMADI , " +
                "ISNULL((SELECT avg(cha_vade) * -1  FROM CARI_HESAP_HAREKETLERI where cha_kod = cari_kod and cha_vade <1000),0) AS ORTALAMAVADE " +
                "FROM  " +
                "CARI_HESAPLAR WHERE ((cari_kod = @CariKodu) OR (@CariKodu = '')) " ,
                param:['CariKodu',],
                type:['string|50',],  
                value:  [$scope.CariKodu]    
            }
        
            db.GetDataQuery(TmpQuery,function(Data)
            { console.log(Data)
                $scope.IslemListe = Data;
                $("#TblTahsilatRapor").jsGrid({data : $scope.IslemListe});
                $scope.ToplamBakiye = parseFloat(db.SumColumn($scope.IslemListe,"TOPLAM")).toFixed(2)
            });
        }
        else if($scope.CmbEvrakTip == '1')
        {
            var TmpQuery = 
            {
                db : '{M}.' + $scope.Firma,
                query:  "select cari_kod AS KODU,cari_unvan1 AS ADI,CONVERT(NVARCHAR,CAST(ISNULL((SELECT dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,cari_doviz_cinsi,0,0,0,0)),0)AS DECIMAL(15,2))) AS BAKIYE,(ISNULL((SELECT dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,cari_doviz_cinsi,1,1,1,1)),0) *  (-1))  AS TOPLAM from CARI_HESAPLAR " +
                " where ISNULL((SELECT dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,cari_doviz_cinsi,1,1,1,1)),0) < 0 AND ((cari_temsilci_kodu = @PLASIYERKODU) OR (@PLASIYERKODU = '')) ORDER BY ISNULL((SELECT dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,cari_doviz_cinsi,1,1,1,1)),0) ",
                param:  ['PLASIYERKODU'], 
                type:   ['string|25'], 
                value:  [$scope.PlasiyerKodu]    
            }
            db.GetDataQuery(TmpQuery,function(Data)
            {
                $scope.IslemListe = Data;
                $("#TblTahsilatRapor").jsGrid({data : $scope.IslemListe});
                $scope.ToplamBakiye = parseFloat(db.SumColumn($scope.IslemListe,"TOPLAM")).toFixed(2)
            });
        }
    }
    $scope.IslemDetayRowClick = function(pIndex,pItem,pObj)
    {
        
        if ( IslemSelectedRow ) { IslemSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = $("#TblTahsilatRapor").jsGrid("rowByItem", pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        IslemSelectedRow = $row;

        $scope.CariAdi = $scope.IslemListe[pIndex].ADI;
        $scope.IlkTarih = moment(new Date(new Date().getFullYear(), 0, 1)).format("DD.MM.YYYY");
        $scope.SonTarih = moment(new Date()).format("DD.MM.YYYY");

        console.log($scope.CariKodu)
        console.log($scope.IlkTarih)
        console.log($scope.SonTarih)
        let TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "SELECT  " +
                    "CONVERT(VARCHAR(10),msg_S_0089,104) AS TARIH, " +       
                    "msg_S_0090 + '-' + CONVERT(NVARCHAR,msg_S_0091) AS SERISIRA, " +
                    "msg_S_0094 AS EVRAKTIP, " +
                    "msg_S_0003 AS CINSI, " +
                    "CONVERT(VARCHAR(10),msg_S_0098,112) VADETARIH, " +
                    "msg_S_0099 AS VADEGUN, " +
                    "msg_S_0100 AS BA, " +
                    "CONVERT(NVARCHAR,CAST([msg_S_0101\\T] AS DECIMAL(10,2))) AS ANADOVIZBORC, " +
                    "CONVERT(NVARCHAR,CAST([msg_S_0102\\T] AS DECIMAL(10,2))) AS ANADOVIZALACAK, " +
                    "ROUND(CONVERT(NVARCHAR,CAST([#msg_S_0103\\T] AS DECIMAL(10,2))),2) AS ANADOVIZBAKIYE, " +
                    "CONVERT(NVARCHAR,CAST([msg_S_1706] AS DECIMAL(10,2))) AS ANADOVIZBORCBAKIYE, " +
                    "CONVERT(NVARCHAR,CAST([msg_S_1707] AS DECIMAL(10,2))) AS ANADOVIZALACAKBAKIYE, " +
                    "CONVERT(NVARCHAR,CAST([msg_S_1710] AS DECIMAL(10,2))) AS ORJINALDOVIZBORCBAKIYE, " +
                    "CONVERT(NVARCHAR,CAST([msg_S_1711] AS DECIMAL(10,2))) AS ORJINALDOVIZALACAKBAKİYE, " +
                    "[msg_S_0112] AS ORJINALDOVIZ " +
                    "FROM dbo.fn_CariFoy ('',0,@KODU,0,'20181231',@ILKTARIH,@SONTARIH,0,'') ORDER BY #msg_S_0092 DESC " ,
            param:  ['KODU','ILKTARIH','SONTARIH'],
            type:   ['string|25','date','date',],
            value:  [$scope.CariKodu,$scope.IlkTarih,$scope.SonTarih]
        }

        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.CariFoyListe = Data;
            $("#TblCariFoy").jsGrid({data : $scope.CariFoyListe});
        });
        $scope.FoyClick();
    }
    $scope.PersonelListeRowClick = function(pIndex,pItem,pObj)
    {
        if(!$scope.EvrakLock)
        {
            if ( PersonelSelectedRow ) { PersonelSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
            var $row = $("#TblPersonel").jsGrid("rowByItem", pItem);
            $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
            PersonelSelectedRow = $row;
            
            $scope.PersonelAdi = $scope.PersonelListe[pIndex].ADI;
            $scope.PlasiyerKodu = $scope.PersonelListe[pIndex].KODU;
            $scope.BtnPersonelSec();
            $scope.MainClick();
        }
    }
    $scope.OdemeChange = function()
    {

        $scope.Evrakadi = 'Ödeme Raporu'
        $scope.CmbEvrakTip = 1
        $scope.PersonelAdi = "";
        $scope.PlasiyerKodu = "";
        $scope.IslemListe = "";
        InitTahsilatRapor();
        $scope.ToplamBakiye = 0
        $("#TblTahsilatRapor").jsGrid({data : $scope.IslemListe});

    }
     $scope.TahsilatChange = function()
    {

        $scope.Evrakadi = 'Tahsilat Raporu'
        $scope.CmbEvrakTip = 0
        $scope.PersonelAdi = "";
        $scope.PlasiyerKodu = "";
        $scope.IslemListe = "";
        InitTahsilatRapor();
        $scope.ToplamBakiye = 0
        $("#TblTahsilatRapor").jsGrid({data : $scope.IslemListe});

    }
    $scope.BtnTemsilciTab = function()
    {
        $("#TbTemsilci").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbCariFoy").removeClass('active');

    }
    $scope.MainClick = function()
    {
        $("#TbMain").addClass('active');
        $("#TbTemsilci").removeClass('active');
        $("#TbCariFoy").removeClass('active');
        
        $("#TbCari").removeClass('active');
      
    }
    $scope.FoyClick = function()
    {
        $("#TbMain").removeClass('active');
        $("#TbTemsilci").removeClass('active');
        $("#TbCariFoy").addClass('active');
    }
    $scope.BtnCariTab = function()
    {
        $("#TbCari").addClass('active');
        $("#TbSube").removeClass('active');
        $("#TbMain").removeClass('active');
    }
    $scope.BtnCariTemizle = function()
    {
        $scope.CariKodu = "";
        $scope.CariAdi = "";
    }
    $scope.BtnCariListele = function()
    {   
        let Kodu = '';
        let Adi = '';
        $scope.Loading = true;
        $scope.TblLoading = false;

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

            if ($scope.CariListe.length > 0)   
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
    $scope.CariListeRowClick = function(pIndex,pItem,pObj)
    {
       
            if ( CariSelectedRow ) { CariSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
            var $row = $("#TblCari").jsGrid("rowByItem", pItem);
            $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
            CariSelectedRow = $row;
            console.log($scope.CariListe[pIndex].KODU)

            
            $scope.CariAdi = $scope.CariListe[pIndex].UNVAN1;
            $scope.CariKodu = $scope.CariListe[pIndex].KODU;
            console.log($scope.CariKodu)
            $scope.MainClick();
    }  
}