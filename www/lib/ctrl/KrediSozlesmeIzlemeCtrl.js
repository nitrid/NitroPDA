function KrediSozlesmeIzlemeCtrl($scope,$window,db)
{   
    let KrediSelectedRow = null;

    function InitKrediGrid()
    {
        $("#TblKredi").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.KrediListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields:
            [
                {
                    name: "krsoz_kodu",
                    title: "Sözleşme Kodu",
                    type: "number",
                    align: "center",
                    width: 100
                },
                {
                    name: "krsoz_aciklama",
                    title: "Açıklama",
                    type: "text",
                    align: "center",
                    width: 300
                },
            ],
            rowClick: function(args)
            {
                $scope.KrediListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitKrediFoyGrid()
    {   
        $("#TblKrediFoy").jsGrid
        ({
            width: "100%",
            height: "auto",
            updateOnResize: true,
            heading: true,
            selecting: true,
            pageSize: 15,
            pageButtonCount: 3,
            data : $scope.KrediFoyListe,
            fields: 
            [
                {
                    name: "msg_S_0798",
                    title: "SOZLEME KODU",
                    type: "text",
                    align: "center",
                    width: 120
                    
                },
                {
                    name: "msg_S_0085",
                    title: "AÇIKLAMA",
                    type: "text",
                    align: "center",
                    width: 120
                    
                },
                {
                    name: "#msg_S_0516",
                    title: "FİRMA ADI",
                    type: "text",
                    align: "center",
                    width: 180
                },
                {
                    name: "msg_S_1352",
                    title: "BANKA ADI",
                    type: "text",
                    align: "center",
                    width: 120
                },
           
                {
                    name: "msg_S_2780",
                    title: "KREDİ TİPİ",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "#msg_S_0254",
                    title: "DOVİZ",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "#msg_S_0821",
                    title: "KABUL TARİH",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "msg_S_0360",
                    title: "KAPANIŞ TARİH",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "msg_S_2781\\T",
                    title: "KREDİ TUTARI",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "#msg_S_2784",
                    title: "TAKSİT ARALIĞI",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "msg_S_1551",
                    title: "TAKSİT SAYISI",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "msg_S_2810\\T",
                    title: "TAKSİT TUTARI",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "msg_S_2820",
                    title: "KALAN PARA",
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
        $scope.TxtSozlemeAra = "";
        $scope.IlkTarih = moment(new Date(new Date().getFullYear(), 0, 1)).format("DD.MM.YYYY");
        $scope.SonTarih = moment(new Date(new Date().getFullYear(), 11, 31)).format("DD.MM.YYYY");
        $scope.KrediKodu = '';
        
     
        InitKrediGrid();
        InitKrediFoyGrid();
    }
    $scope.BtnSozlemeListele = function()
    {   
        let Kodu = '';
        let Adi = '';
        $scope.Loading = true;
        $scope.TblLoading = false;  

        if($scope.TxtSozlemeAra != "")
        {
            if($scope.CmbCariAra == "0")
            {   
                Adi = $scope.TxtSozlemeAra.replace("*","%").replace("*","%");
            }
            else
            {
                Kodu = $scope.TxtSozlemeAra.replace("*","%").replace("*","%");
            }
        }
        
        db.GetData($scope.Firma,'KrediSozlemesiGetir',[],function(data)
        {
            console.log(data)
            $scope.Loading = false;
            $scope.TblLoading = true; 
            $scope.KrediListe = data;      
            $("#TblKredi").jsGrid({data : $scope.KrediListe});
            $("#TblKredi").jsGrid({pageIndex: true})
        });
    }
    $scope.BtnKrediFoyGetir = function()
    {
            let TmpQuery = 
            {
                db : '{M}.' + $scope.Firma,
                query:  "select * from dbo.fn_KrediSozlesmesiTaksitOperasyonu(N'0',@KODU,@ILKTARIH,@SONTARIH,0) order by [msg_S_0798],[msg_S_1552] ",
                param:  ['KODU','ILKTARIH','SONTARIH'],
                type:   ['string|25','date','date',],
                value:  [$scope.KrediKodu,$scope.IlkTarih,$scope.SonTarih]
            }
    console.log(TmpQuery)
            db.GetDataQuery(TmpQuery,function(Data)
            {
                console.log(Data)
                $scope.KrediFoyListe = Data;               

                $("#TblKrediFoy").jsGrid({data : $scope.KrediFoyListe});
            });

        
    }
    $scope.BtnSozlemeListeleEnter = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            $scope.BtnSozlemeListele();
        }
    }
    $scope.KrediListeRowClick = function(pIndex,pItem,pObj)
    {
        if(!$scope.EvrakLock)
        {
            if ( KrediSelectedRow ) { KrediSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
            var $row = pObj.rowByItem(pItem);
            $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
            KrediSelectedRow = $row;
            
            $scope.KrediKodu =$scope.KrediListe[pIndex].krsoz_kodu;
            $scope.MainClick();
        }
    }
    $scope.SozlemeKoduClick = function() 
    {
        $("#TbSozleme").addClass('active');
        $("#TbMain").removeClass('active');
        $scope.BtnSozlemeListele()
    }
    $scope.MainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbSozleme").removeClass('active');
    }
    $scope.BtnTemizle = function()
    {
        $scope.KrediKodu = '';
    }
}