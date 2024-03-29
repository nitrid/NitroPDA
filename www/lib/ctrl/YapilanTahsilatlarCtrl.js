function YapilanTahsilatlarCtrl($scope,$window,db)
{       
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
                    name: "CARI",
                    title: "CARI",
                    type: "text",
                    align: "center",
                    width: 120
                    
                },
                {
                    name: "TUTAR",
                    title: "TUTAR",
                    type: "text",
                    align: "center",
                    width: 120
                    
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
    $scope.Init = function()
    {   
        $scope.Firma = $window.sessionStorage.getItem('Firma');
        UserParam = Param[$window.sessionStorage.getItem('User')];

        $scope.PlasiyerKodu = UserParam.Sistem.PlasiyerKodu;
        $scope.ToplamBakiye = 0;
        $scope.IlkTarih = moment(new Date(new Date().getFullYear(), 0, 1)).format("DD.MM.YYYY");
        $scope.SonTarih = moment(new Date()).format("DD.MM.YYYY");
        console.log(IlkTarih)
        console.log($scope.PlasiyerKodu)
        InitTahsilatRapor();
        InitCariFoy()


    }
    $scope.BtnGetir = function()
    {
        console.log(1)
        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "SELECT cha_evrakno_seri AS SERI,cha_evrakno_sira AS SIRA,(select cari_unvan1 from CARI_HESAPLAR where cari_kod = cha_kod ) AS CARI,cha_meblag AS TUTAR FROM CARI_HESAP_HAREKETLERI WHERE cha_evrak_tip = 1 AND cha_tarihi >= @ILKTARIH AND cha_tarihi <= @SONTARIH ",
            param:  ['ILKTARIH','SONTARIH'], 
            type:   ['date','date'], 
            value:  [$scope.IlkTarih,$scope.SonTarih]    
        }
    
        db.GetDataQuery(TmpQuery,function(Data)
        {
            console.log(Data)
            $scope.IslemListe = Data;
            $("#TblTahsilatRapor").jsGrid({data : $scope.IslemListe});
            $scope.ToplamBakiye = parseFloat(db.SumColumn($scope.IslemListe,"TUTAR")).toFixed(2)
        });
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
            console.log(Data)
            $scope.CariFoyListe = Data;
            $("#TblCariFoy").jsGrid({data : $scope.CariFoyListe});
        });
        $("#MdlIslemDetay").modal('show');
    }
   
}