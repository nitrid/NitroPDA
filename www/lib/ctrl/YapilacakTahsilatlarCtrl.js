function YapilacakTahsilatlarCtrl($scope,$window,db)
{       
    let PersonelSelectedRow = null;
    let IslemSelectedRow = null;
    
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
            data : $scope.TahsilatRapor,
            fields: 
            [
                {
                    name: "KODU",
                    title: "KODU",
                    type: "text",
                    align: "center",
                    width: 120
                    
                },
                {
                    name: "ADI",
                    title: "CARİ ADI",
                    type: "text",
                    align: "center",
                    width: 120
                    
                },
                {
                    name: "BAKIYE",
                    title: "BAKİYE",
                    type: "number",
                    align: "center",
                    width: 180
                },
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
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            sorting: true,
            paging: true,
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
        $scope.TxtPersonelAra = "";
        $scope.CmbPersonelAra = "";
        $scope.CmbEvrakTip = "0";

        console.log($scope.PlasiyerKodu)
        InitTahsilatRapor();
        InitCariFoy();
        InitPersonelGrid();
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
            console.log(1)
            var TmpQuery = 
            {
                db : '{M}.' + $scope.Firma,
                query:  "select cari_kod AS KODU,cari_unvan1 AS ADI,CONVERT(NVARCHAR,CAST(ISNULL((SELECT dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,cari_doviz_cinsi,0,0,0,0)),0)AS DECIMAL(15,2))) AS BAKIYE,ISNULL((SELECT dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,cari_doviz_cinsi,1,1,1,1)),0) AS TOPLAM from CARI_HESAPLAR " +
                " where ISNULL((SELECT dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,cari_doviz_cinsi,1,1,1,1)),0) > 0 AND ((cari_temsilci_kodu = @PLASIYERKODU) OR (@PLASIYERKODU = '')) ORDER BY ISNULL((SELECT dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,cari_doviz_cinsi,1,1,1,1)),0) desc ",
                param:  ['PLASIYERKODU'], 
                type:   ['string|25'], 
                value:  [$scope.PlasiyerKodu]    
            }
        
            db.GetDataQuery(TmpQuery,function(Data)
            {
                console.log(Data)
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
                " where ISNULL((SELECT dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,cari_doviz_cinsi,1,1,1,1)),0) < 0 AND ((cari_temsilci_kodu = @PLASIYERKODU) OR (@PLASIYERKODU = '')) ORDER BY ISNULL((SELECT dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,cari_doviz_cinsi,1,1,1,1)),0) desc ",
                param:  ['PLASIYERKODU'], 
                type:   ['string|25'], 
                value:  [$scope.PlasiyerKodu]    
            }
            db.GetDataQuery(TmpQuery,function(Data)
            {
                console.log(Data)
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

        $scope.CariKodu = $scope.IslemListe[pIndex].KODU;
        $scope.IlkTarih = moment(new Date(new Date().getFullYear(), 0, 1)).format("DD.MM.YYYY");
        $scope.SonTarih = moment(new Date()).format("DD.MM.YYYY");

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
        $("#MdlIslemDetay").modal('show');
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
        }
    }
   
}