function CariHesapBakiyeCtrl($scope,$window,db)
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
    function InitIslemGrid()
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
                    name: "msg_S_0200",
                    title: "CARİ KODU",
                    type: "text",
                    align: "center",
                    width: 120
                    
                },
                {
                    name: "msg_S_1033",
                    title: "CARİ ADI",
                    type: "text",
                    align: "center",
                    width: 150
                    
                },
                {
                    name: "msg_S_0957",
                    title: "ANA DÖVİZ BAKİYE",
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

        $scope.CmbCariAra = "0";
        $scope.TxtCariAra = "";
        $scope.CariKodu = "";
        $scope.IlkTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.SonTarih = moment(new Date()).format("DD.MM.YYYY");

        $scope.CariListe = [];
        $scope.CariFoyListe = [];

        InitCariGrid();
        InitIslemGrid();
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
    $scope.BtnGetir = function()
    {
        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "exec dbo.msp_CARI_BAKIYE_ANALIZ_FOYU N'0',0,0,@KODU ,@KODU,@KODU,N'0,1,2',null,null,1,0,N'',0,N'',0,N'',0,0,0,0,0,0,1 ",

            param:  ['KODU'],
            type:   ['string|25'],
            value:  [$scope.CariKodu]
        }

        db.GetDataQuery(TmpQuery,function(Data)
        {
            for(i=0; i < Data.length; i++)
            {
                if(Data[i].msg_S_0957 < 0)
                {
                    $scope.Deneme ="Borç"
                }
                else
                {
                    console.log("Alacak")
                }
            }

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