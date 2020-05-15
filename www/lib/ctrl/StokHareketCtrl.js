function StokHareketCtrl($scope,$window,db)
{   
    let DepoSelectedRow = null;
    let StokSelectedRow = null;

    function InitDepoGrid()
    {
        $("#TblDepo").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.DepoListe,
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
                    width: 300
                },
            ],
            rowClick: function(args)
            {
                $scope.DepoListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitStokGrid()
    {
        $("#TblStok").jsGrid
        ({
            width: "100%",
            height: "500px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.StokListe,
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
                    title: "GENEL MIKTAR",
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
    function InitStokFoyGrid()
    {   
        $("#TblStokFoy").jsGrid
        ({
            width: "100%",
            height: "auto",
            updateOnResize: true,
            heading: true,
            selecting: true,
            pageSize: 15,
            pageButtonCount: 3,
            data : $scope.StokFoyListe,
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
                    name: "DEPO",
                    title: "DEPO",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "KARSIDEPO",
                    title: "KARSI DEPO",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "GIRISMIKTAR",
                    title: "GİRİS MIKTAR",
                    type: "number",
                    align: "center",
                    width: 200
                },
                {
                    name: "CIKISMIKTAR",
                    title: "ÇIKIS MIKTAR",
                    type: "number",
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
        

        $scope.IlkTarih = moment(new Date(new Date().getFullYear(), 0, 1)).format("DD.MM.YYYY");
        $scope.SonTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.ToplamMiktar = 0;
        $scope.DepoAdi = "";
        $scope.DepoKodu = "";
        $scope.StokGridTip = "0";
        $scope.StokGridText = "";
        $scope.StokKodu = "";
        $scope.StokAdi = "";
        $scope.DepoListe = [];
        $scope.StokFoyListe =[];
        $scope.StokListe = [];
        

        InitDepoGrid();
        InitStokFoyGrid();
        InitStokGrid()
    }
    $scope.BtnStokFoyGetir = function()
    {
        if($scope.DepoKodu == '')
        {
            alertify.alert("Lütfen Depo Seçin !" );
        }
        else
        {
            let TmpQuery = 
            {
                db : '{M}.' + $scope.Firma,
                query:  "SELECT  " +
                        "CONVERT(VARCHAR(10),#msg_S_0092,104) AS TARIH, " +
                        "msg_S_0094 AS EVRAKTIP, " +
                        "msg_S_0090 + '-' + CONVERT(NVARCHAR,msg_S_0157) AS SERISIRA, " +
                        "msg_S_0888 AS CINSI, " +
                        "msg_S_0159 AS DEPO, " +
                        "msg_s_0160 AS KARSIDEPO, " +
                        "[msg_S_0163\\T] AS GIRISMIKTAR, " +
                        "[msg_S_0164\\T] AS CIKISMIKTAR, " +
                        "ISNULL((SELECT dbo.fn_DepodakiMiktar(@KODU,@DEPO,CONVERT(VARCHAR(10),GETDATE(),112))),0) AS DEPOMIKTAR " +
                        "FROM dbo.fn_StokFoy (@KODU,'20191231',@ILKTARIH,@SONTARIH,1,@DEPO) ORDER BY #msg_S_0092 DESC " ,
                param:  ['KODU','ILKTARIH','SONTARIH','DEPO'],
                type:   ['string|25','date','date','int'],
                value:  [$scope.StokKodu,$scope.IlkTarih,$scope.SonTarih,$scope.DepoKodu]
            }
    
            db.GetDataQuery(TmpQuery,function(Data)
            {
                $scope.StokFoyListe = Data;
                $scope.ToplamMiktar = $scope.StokFoyListe[0].DEPOMIKTAR;
                console.log($scope.StokFoyListe)
                $("#TblStokFoy").jsGrid({data : $scope.StokFoyListe});
            });
        }
    }
    $scope.DepoListeRowClick = function(pIndex,pItem,pObj)
    {
        if(!$scope.EvrakLock)
        {
            if ( DepoSelectedRow ) { DepoSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
            var $row = pObj.rowByItem(pItem);
            $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
            DepoSelectedRow = $row;
            
            $scope.DepoAdi = $scope.DepoListe[pIndex].ADI;
            $scope.DepoKodu =$scope.DepoListe[pIndex].KODU;
            $scope.MainClick();
        }
    }
    $scope.DepoListeleClick = function() 
    {
        $("#TbDepo").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbStok").removeClass('active');

        db.DepoGetir($scope.Firma,'',function(data)
        {   
            $scope.DepoListe = data; 
            $("#TblDepo").jsGrid({data : $scope.DepoListe});
        });


    }
    $scope.MainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbDepo").removeClass('active');
        $("#TbStok").removeClass('active');
    }
    $scope.StokListeClick = function()
    {
        $("#TbStok").addClass('active');
        $("#TbDepo").removeClass('active');
        $("#TbMain").removeClass('active');
    }
    $scope.BtnTemizle = function()
    {
        $scope.DepoAdi = "";
        $scope.DepoKodu = "";
    }
    $scope.BtnManuelArama = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            $scope.BtnStokGridGetir();
        }
    }
    $scope.BtnStokGridGetir = function()
    {
        let Kodu = '';
        let Adi = '';
        $scope.Loading = true;
        $scope.TblLoading = false;

        if($scope.StokGridTip == "0")
        {   
            Adi = $scope.StokGridText.replace("*","%").replace("*","%");
        }
        else
        {
            Kodu = $scope.StokGridText.replace("*","%").replace("*","%");
        }
            
        db.GetData($scope.Firma,'StokAdiGetir',[Kodu,Adi,0,''],function(StokData)
        {
            $scope.StokListe = StokData;
            if($scope.StokListe.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblStok").jsGrid({data : $scope.StokListe});
                $("#TblStok").jsGrid({data : $scope.StokListe});
                $("#TblStok").jsGrid({pageIndex: true});
            }
            else
            {
                alertify.alert("Stok Bulunamadı")
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblStok").jsGrid({data : $scope.StokListe});
                $("#TblStok").jsGrid({data : $scope.StokListe});
                $("#TblStok").jsGrid({pageIndex: true});
            }
        });
    }
    $scope.StokListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( StokSelectedRow ) { StokSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        StokSelectedRow = $row;
        $scope.StokKodu = $scope.StokListe[pIndex].KODU;
        $scope.StokAdi = $scope.StokListe[pIndex].ADI;
        {
            $scope.MainClick()
        }
    }
    $scope.BtnStokTemizle = function()
    {
        $scope.StokKodu = ""
        $scope.StokAdi = ""
    }
   
}