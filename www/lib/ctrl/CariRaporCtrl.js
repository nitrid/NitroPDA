function CariRaporCtrl($scope,$window,db)
{   
    let CariSelectedRow = null;

    function InitCariGrid()
    {   
        $("#TblCari").jsGrid
        ({
            width: "100%",
            height: "300px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.CariListe,
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
    function InitCariFoyGrid()
    {   
        $("#TblCariFoy").jsGrid
        ({
            width: "100%",
            height: "300px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.CariFoyListe,
            fields: 
            [
                {
                    name: "SERI",
                    title: "SERİ",
                    type: "text",
                    align: "center",
                    width: 120
                    
                },
                {
                    name: "SIRA",
                    title: "SIRA",
                    type: "number",
                    align: "center",
                    width: 120
                    
                },
                {
                    name: "EVRAKTIP",
                    title: "EVRAK TİP",
                    type: "text",
                    align: "center",
                    width: 120
                },
                {
                    name: "CINSI",
                    title: "CİNSİ",
                    type: "text",
                    align: "center",
                    width: 120
                },
                {
                    name: "VADETARIH",
                    title: "VADE TARİH",
                    type: "text",
                    align: "center",
                    width: 120
                },
                {
                    name: "VADEGUN",
                    title: "VADE GÜN",
                    type: "number",
                    align: "center",
                    width: 120
                },
                {
                    name: "BA",
                    title: "BORÇ/ALACAK",
                    type: "text",
                    align: "center",
                    width: 120
                },
                {
                    name: "ANADOVIZBORC",
                    title: "A.D BORC",
                    type: "text",
                    align: "center",
                    width: 120
                },
                {
                    name: "ANADOVIZALACAK",
                    title: "A.D ALACAK",
                    type: "text",
                    align: "center",
                    width: 120
                },
                {
                    name: "ANADOVIZBORCBAKIYE",
                    title: "A.D BORÇ BAKIYE",
                    type: "text",
                    align: "center",
                    width: 120
                },
                {
                    name: "ANADOVIZALACAKBAKIYE",
                    title: "A.D ALACAK BAKİYE",
                    type: "text",
                    align: "center",
                    width: 120
                },
                {
                    name: "ORJINALDOVIZBORCBAKIYE",
                    title: "O.D.B BORÇ BAKİYE",
                    type: "text",
                    align: "center",
                    width: 120
                },
                {
                    name: "ORJINALDOVIZALACAKBAKİYE",
                    title: "O.D ALACAK BAKİYE",
                    type: "text",
                    align: "center",
                    width: 120
                },
                {
                    name: "ORJINALDOVIZ",
                    title: "ORJINAL DÖVİZ",
                    type: "text",
                    align: "center",
                    width: 120
                }
            ],
        });
    }
    $scope.Init = function()
    {   
        $scope.Firma = $window.sessionStorage.getItem('Firma');
        UserParam = Param[$window.sessionStorage.getItem('User')];

        $scope.CmbCariAra = "0";
        $scope.TxtCariAra = "";
        $scope.IlkTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.SonTarih = moment(new Date()).format("DD.MM.YYYY");

        $scope.CariListe = [];
        $scope.CariFoyListe = [];

        InitCariGrid();
        InitCariFoyGrid();
    }
    $scope.BtnGetir = function()
    {
        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "SELECT " +
                    "CASE WHEN EVRAKTIP = 0 THEN 'ÖDEME' WHEN EVRAKTIP = 1 THEN 'TEDİYE' END AS TIPADI, " +
                    "EVRAKTIP AS EVRAKTIP, " +
                    "MKODU AS KODU, " +
                    "ISNULL((SELECT cari_unvan1 FROM CARI_HESAPLAR WHERE cari_kod = MKODU),'') AS CARIADI, " +
                    "CASE WHEN TIP = 0 THEN " +
                    "'NAKİT' " +
                    "WHEN TIP = 1 THEN " +
                    "'KREDİ KARTI' " +
                    "WHEN TIP = 2 THEN " +
                    "'AÇIK HESAP' " +
                    "END AS TIP, " +
                    "CAST(SUM(TUTAR) AS decimal(10,2)) AS TUTAR " +
                    "FROM TERP_POS_TAHSILAT WHERE SUBE = @SUBE AND TARIH >= @ILKTARIH AND TARIH <= @SONTARIH " +
                    "GROUP BY MKODU,TIP,EVRAKTIP",
            param:  ['SUBE','ILKTARIH','SONTARIH'],
            type:   ['int','date','date'],
            value:  [$scope.Sube,$scope.IlkTarih,$scope.SonTarih]
        }

        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.IslemListe = Data;
            $("#TblIslem").jsGrid({data : $scope.IslemListe});
            $scope.GenelToplam = db.SumColumn($scope.IslemListe,"TUTAR","EVRAKTIP = 0") - db.SumColumn($scope.IslemListe,"TUTAR","EVRAKTIP = 1");
        });
    }
    $scope.BtnCariSec = function()
    {   
        $('#MdlCariGetir').modal('hide');
    }
    $scope.BtnCariListele = function()
    {   
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
        
        db.GetData($scope.Firma,'CariListeGetir',[Kodu,Adi],function(data)
        {
            $scope.CariListe = data;      
            $("#TblCari").jsGrid({data : $scope.CariListe});
        });
    }
    $scope.BtnCariFoyGetir = function()
    {
        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "SELECT  " +
                    "msg_S_0090 AS SERI, " +
                    "msg_S_0091 AS SIRA, " +
                    "msg_S_0094 AS EVRAKTIP, " +
                    "msg_S_0090 AS CINSI, " +
                    "CONVERT(VARCHAR(10),msg_S_0098,112) VADETARIH, " +
                    "msg_S_0099 AS VADEGUN, " +
                    "msg_S_0100 AS BA, " +
                    "[msg_S_0101\\T] AS ANADOVIZBORC, " +
                    "[msg_S_0102\\T] AS ANADOVIZALACAK, " +
                    "[msg_S_1706] AS ANADOVIZBORCBAKIYE, " +
                    "[msg_S_1707] AS ANADOVIZALACAKBAKIYE, " +
                    "[msg_S_1710] AS ORJINALDOVIZBORCBAKIYE, " +
                    "[msg_S_1711] AS ORJINALDOVIZALACAKBAKİYE, " +
                    "[msg_S_0112] AS ORJINALDOVIZ " +
                    "FROM dbo.fn_CariFoy ('',0,@KODU,0,'20181231',@ILKTARIH,@SONTARIH,0,'') ORDER BY #msg_S_0092 ASC " ,
            param:  ['KODU','ILKTARIH','SONTARIH'],
            type:   ['string|25','date','date',],
            value:  [$scope.Carikodu,$scope.IlkTarih,$scope.SonTarih]
        }

        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.CariFoyListe = Data;
            $("#TblCariFoy").jsGrid({data : $scope.CariFoyListe});
        });
    }
    $scope.CariListeRowClick = function(pIndex,pItem,pObj)
    {
        if(!$scope.EvrakLock)
        {
            if ( CariSelectedRow ) { CariSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
            var $row = pObj.rowByItem(pItem);
            $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
            CariSelectedRow = $row;
            
            $scope.CariAdi = $scope.CariListe[pIndex].UNVAN1;
            $scope.Carikodu =$scope.CariListe[pIndex].KODU;
        }
    }
}