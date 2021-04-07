function CariStokHesapHareketCtrl($scope,$window,db)
{   
    let CariSelectedRow = null;

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
    function InitCariFoyGrid()
    {   
        $("#TblCariFoy").jsGrid
        ({
            width: "100%",
            height: "auto",
            updateOnResize: true,
            heading: true,
            selecting: true,
            pageSize: 15,
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
                    name: "STOKKODU",
                    title: "STOK KODU",
                    type: "text",
                    align: "center",
                    width: 120
                    
                },
                {
                    name: "STOKADI",
                    title: "STOK ADI",
                    type: "text",
                    align: "center",
                    width: 180
                },
                {
                    name: "EVRAKSERI",
                    title: "SERI",
                    type: "text",
                    align: "center",
                    width: 120
                },
           
                {
                    name: "EVRAKSIRA",
                    title: "SIRA",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "EVRAKTIPI",
                    title: "EVRAK TİPİ",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "GIRINMIK",
                    title: "GİREN MİKTAR",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "CIKANMIK",
                    title: "ÇIKAN MİKTAR",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "BIRIMFIYAT",
                    title: "BİRİM FİYAT",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "TUTAR",
                    title: "TUTAR",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "KDVDAHIL",
                    title: "KDV DAHIL",
                    type: "text",
                    align: "center",
                    width: 200
                },
             
            ],
        });
    }
    function InitCariFoyDetayGrid()
    {   
        $("#TblCariFoyDetay").jsGrid
        ({
            width: "100%",
            height: "auto",
            updateOnResize: true,
            heading: true,
            selecting: true,
            pageSize: 15,
            pageButtonCount: 3,
            data : $scope.CariFoyListeDetay,
            fields: 
            [ 
            {
                name: "sth_stok_kod",
                title: "KODU",
                type: "text",
                align: "center",
                width: 100
            },
            {
                name: "ADI",
                title: "ADI",
                type: "text",
                align: "center",
                width: 200
            }, 
            {
                name: "sth_miktar",
                title: "MİKTAR",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "FIYAT",
                title: "FIYAT",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "TUTAR",
                title: "TUTAR",
                type: "number",
                align: "center",
                width: 200
            },
            {
                name: "sth_iskonto1",
                title: "IND1",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sth_iskonto2",
                title: "IND2",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sth_iskonto3",
                title: "IND3",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sth_iskonto4",
                title: "IND4",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sth_iskonto5",
                title: "IND5",
                type: "number",
                align: "center",
                width: 100
            }
            ],
        });
    }
    $scope.Init = function()
    {   console.log(123)
        $scope.Firma = $window.sessionStorage.getItem('Firma');
        UserParam = Param[$window.sessionStorage.getItem('User')];
        
        $scope.CmbCariAra = "0";
        $scope.TxtCariAra = "";
        $scope.IlkTarih = moment(new Date(new Date().getFullYear(), 0, 1)).format("DD.MM.YYYY");
        $scope.SonTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.Bakiye = 0;
        $scope.CariAdi = "";
        $scope.Carikodu = "";
        
        $scope.CariListe = [];
        $scope.CariFoyListe = [];

        InitCariGrid();
        InitCariFoyGrid();
        InitCariFoyDetayGrid();
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
            $scope.Loading = false;
            $scope.TblLoading = true; 
            $scope.CariListe = data;      
            $("#TblCari").jsGrid({data : $scope.CariListe});
            $("#TblCari").jsGrid({pageIndex: true})
        });
    }
    $scope.BtnCariFoyGetir = function()
    {
        if($scope.Carikodu == '')
        {
            alertify.alert("Lütfen Cari Seçin !" );
        }
        else
        {
            let TmpQuery = 
            {
                db : '{M}.' + $scope.Firma,
                query:  "SELECT msg_S_0001 AS STOKKODU, " +
                "msg_S_0002 AS STOKADI," +
                "#msg_S_0010 AS BIRIM," +
                "msg_S_0090 AS EVRAKSERI," +
                "msg_S_0157  AS EVRAKSIRA," +
                "msg_S_0094 AS EVRAKTIPI," +
                "[#msg_S_0167\\T] AS GIRENMIK," +
                "[#msg_S_0168\\T] AS CIKANMIK," +
                "[msg_S_1795\\O] AS BIRIMFIYAT," +
                "msg_S_1840 AS TUTAR," +
                "msg_S_1868 AS KDVDAHIL," +
                "(SELECT dbo.fn_CariHesapBakiye(0,0,@KODU,'','',0,0,0,0,0,0)) AS BAKIYE, " +
                "CONVERT(varchar,msg_S_0089,104) AS TARIH " +
                " FROM dbo.fn_CariStokHareketFoyu (0,@KODU,@ILKTARIH,@SONTARIH) ORDER BY [msg_S_0089], [msg_S_0077], [msg_S_0094], [msg_S_0090], [msg_S_0157], [msg_S_0158], [msg_S_0097] ",
                param:  ['KODU','ILKTARIH','SONTARIH'],
                type:   ['string|25','date','date',],
                value:  [$scope.Carikodu,$scope.IlkTarih,$scope.SonTarih]
            }
    
            db.GetDataQuery(TmpQuery,function(Data)
            {
                $scope.CariFoyListe = Data; 
                $scope.Bakiye = Data[0].BAKIYE
                $("#TblCariFoy").jsGrid({data : $scope.CariFoyListe});
            });

        }
    }
    $scope.BtnCariFoyDetayGetir = function()
    {
      if($scope.EvrakTipNo == 3 || $scope.EvrakTipNo == 4)
      {
        db.GetData($scope.Firma,'StokHarGetir',[$scope.EvrakNoSeri,$scope.EvrakNoSira,$scope.EvrakTipNo],function(Data)
        {   
            $scope.CariFoyDetayListe = Data
            console.log(Data)

            $("#TblCariFoyDetay").jsGrid({data : $scope.CariFoyDetayListe});
            $scope.DetayClick();

        });
      }
      else
      {
          alertify.alert('Sadece Fatura Evraklarının Detayı Görülebilir...')
      }
        
    }
    $scope.BtnCariListeleEnter = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            $scope.BtnCariListele();
        }
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
            $scope.MainClick();
        }
    }
    $scope.CariFoyRowClick = function(pIndex,pItem,pObj)
    {
        if(!$scope.EvrakLock)
        {
            if ( CariSelectedRow ) { CariSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
            var $row = pObj.rowByItem(pItem);
            $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
            CariSelectedRow = $row;
            
            $scope.EvrakTipNo = $scope.CariFoyListe[pIndex].EVRAKTIPNO;
            $scope.EvrakNoSeri = $scope.CariFoyListe[pIndex].SERI;
            $scope.EvrakNoSira =  $scope.CariFoyListe[pIndex].SIRA;
            $scope.BtnCariFoyDetayGetir();
        }
    }
    $scope.CariSecClick = function() 
    {
        $("#TbCari").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbDetay").removeClass('active');
    }
    $scope.MainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbCari").removeClass('active');
        $("#TbDetay").removeClass('active');
        $scope.CariFoyDetayListe = []
        $("#TblCariFoyDetay").jsGrid({data : $scope.CariFoyDetayListe});

    }
    $scope.BtnTemizle = function()
    {
        $scope.CariAdi = "";
        $scope.Carikodu = "";
    }
    $scope.DetayClick = function()
    {
        $("#TbDetay").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbCari").removeClass('active');
    }
}