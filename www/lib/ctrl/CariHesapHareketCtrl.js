function CariHesapHareketCtrl($scope,$window,db)
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
                    title: "ANA DOViZ BORÇ",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "ANADOVIZALACAK",
                    title: "ANA DÖVİZ ALACAK",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "ANADOVIZBORCBAKIYE",
                    title: "ANA DÖVİZ BORÇ BAKIYE",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "ANADOVIZALACAKBAKIYE",
                    title: "ANA DÖVİZ ALACAK BAKİYE",
                    type: "text",
                    align: "center",
                    width: 220
                },
                {
                    name: "ORJINALDOVIZBORCBAKIYE",
                    title: "ORJINAL DÖVİZ BORÇ BAKİYE",
                    type: "text",
                    align: "center",
                    width: 250
                },
                {
                    name: "ORJINALDOVIZALACAKBAKİYE",
                    title: "ORJINAL DÖVİZ ALACAK BAKİYE",
                    type: "text",
                    align: "center",
                    width: 250
                },
                {
                    name: "ORJINALDOVIZ",
                    title: "ORJINAL DÖVİZ",
                    type: "text",
                    align: "center",
                    width: 180
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
        $scope.IlkTarih = moment("01.01." + new Date().getFullYear()).format("DD.MM.YYYY");
        $scope.SonTarih = moment(new Date()).format("DD.MM.YYYY");

        $scope.CariListe = [];
        $scope.CariFoyListe = [];

        InitCariGrid();
        InitCariFoyGrid();
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
        
        db.GetData($scope.Firma,'CariListeGetir',[Kodu,Adi,UserParam.Sistem.PlasiyerKodu],function(data)
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
                    "msg_S_0003 AS CINSI, " +
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