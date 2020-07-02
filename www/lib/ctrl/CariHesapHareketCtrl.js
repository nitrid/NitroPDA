function CariHesapHareketCtrl($scope,$window,db)
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
                {
                    name: "DOVIZCINS",
                    title: "DÖVİZ",
                    type: "text",
                    align: "center",
                    width: 200
                },
             
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
                query:  "SELECT  " +
                        "CONVERT(VARCHAR(10),msg_S_0089,104) AS TARIH, " +       
                        "msg_S_0090 + '-' + CONVERT(NVARCHAR,msg_S_0091) AS SERISIRA, " +
                        "msg_S_0094 AS EVRAKTIP, " +
                        "msg_S_0003 AS CINSI, " +
                        "CONVERT(VARCHAR(10),msg_S_0098,112) VADETARIH, " +
                        "msg_S_0099 AS VADEGUN, " +
                        "msg_S_0100 AS BA, " +
                        "msg_s_0112 AS DOVIZCINS, " +
                        "CONVERT(NVARCHAR,CAST([msg_S_0101\\T] AS DECIMAL(10,2))) AS ANADOVIZBORC, " +
                        "CONVERT(NVARCHAR,CAST([msg_S_0102\\T] AS DECIMAL(10,2))) AS ANADOVIZALACAK, " +
                        "ROUND(CONVERT(NVARCHAR,CAST([#msg_S_0103\\T] AS DECIMAL(10,2))),2)  AS ANADOVIZBAKIYE, " +
                        "ROUND(CONVERT(NVARCHAR,CAST([msg_S_1706] AS DECIMAL(10,2))),2) AS ANADOVIZBORCBAKIYE, " +
                        "CONVERT(NVARCHAR,CAST([msg_S_1707] AS DECIMAL(10,2))) AS ANADOVIZALACAKBAKIYE, " +
                        "CONVERT(NVARCHAR,CAST([msg_S_1710] AS DECIMAL(10,2))) AS ORJINALDOVIZBORCBAKIYE, " +
                        "CONVERT(NVARCHAR,CAST([msg_S_1711] AS DECIMAL(10,2))) AS ORJINALDOVIZALACAKBAKİYE, " +
                        "(select ROUND(dbo.fn_CariHesapAnaDovizBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,@ILKTARIH,@SONTARIH ,0,0,0,0,0),2) from CARI_HESAPLAR where cari_kod = @KODU) AS ANADOVIZBAKIYE1, " +
                        "(select ROUND(dbo.fn_CariHesapOrjinalDovizBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,@ILKTARIH,@SONTARIH ,0,0,0,0,0),2) from CARI_HESAPLAR where cari_kod = @KODU) AS ORJINALDOVIZBAKIYE, " +
                        "(select ROUND(dbo.fn_CariHesapAlternatifDovizBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,@ILKTARIH,@SONTARIH ,0,0,0,0,0),2) from CARI_HESAPLAR where cari_kod = @KODU) AS ALTERNATIFDOVIZBAKIYE, " +
                        "[msg_S_0112] AS ORJINALDOVIZ " +
                        "FROM dbo.fn_CariFoy ('',0,@KODU,0,'20181231',@ILKTARIH,@SONTARIH,0,'') ORDER BY #msg_S_0092 ASC " ,
                param:  ['KODU','ILKTARIH','SONTARIH'],
                type:   ['string|25','date','date',],
                value:  [$scope.Carikodu,$scope.IlkTarih,$scope.SonTarih]
            }
    
            db.GetDataQuery(TmpQuery,function(Data)
            {
                $scope.CariFoyListe = Data;                
                $scope.Bakiye = db.SumColumn($scope.CariFoyListe,"ANADOVIZBAKIYE");
                $scope.AnaDovizBakiye = $scope.CariFoyListe[0].ANADOVIZBAKIYE1
                $scope.OrjDovizBakiye = $scope.CariFoyListe[0].ORJINALDOVIZBAKIYE
                $scope.OrjDoviz = $scope.CariFoyListe[0].ORJINALDOVIZ
                $scope.AltDovizBakiye = $scope.CariFoyListe[0].ALTERNATIFDOVIZBAKIYE

                let TmpBakiye = 0;
                for (let i = 0; i < $scope.CariFoyListe.length; i++) 
                {
                    TmpBakiye += $scope.CariFoyListe[i].ANADOVIZBAKIYE;
                    console.log($scope.CariFoyListe[i].ANADOVIZBAKIYE);
                    $scope.CariFoyListe[i].ANADOVIZBAKIYE = TmpBakiye.toFixed(2);
                }

                $("#TblCariFoy").jsGrid({data : $scope.CariFoyListe});
            });

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
    $scope.CariSecClick = function() 
    {
        $("#TbCari").addClass('active');
        $("#TbMain").removeClass('active');
    }
    $scope.MainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbCari").removeClass('active');
    }
    $scope.BtnTemizle = function()
    {
        $scope.CariAdi = "";
        $scope.Carikodu = "";
    }
}