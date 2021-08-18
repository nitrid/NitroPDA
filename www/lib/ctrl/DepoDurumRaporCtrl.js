function DepoDurumRaporCtrl($scope,$window,db)
{   
    let DepoSelectedRow = null;

    function InitDepoGrid()
    {   
        $("#TblDepo").jsGrid
        ({
            width: "100%",
            height: "300px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.DepoListe,
            fields: 
            [
                {
                    name: "ADI",
                    title: "DEPO ADI",
                    type: "text",
                    align: "center",
                    width: 120
                },
                {
                    name: "KODU",
                    title: "DEPO KODU",
                    type: "text",
                    align: "center",
                    width: 120
                },
            ],
            rowClick: function(args)
            {
                $scope.DepoListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitDepoRaporGrid()
    {   
        let DepoDurumRaporu = 
        [
            {
                name: "STOKADI",
                title: "STOK ADI",
                type: "number",
                align: "center",
                width: 120
                
            },
            {
                name: "YUKLENEN",
                title: "YÜKLENEN",
                type: "number",
                align: "center",
                width: 120
                
            },
            {
                name: "SATILAN",
                title: "SATILAN",
                type: "text",
                align: "center",
                width: 120
            },
            {
                name: "KALAN",
                title: "GUNCEL MIKTAR",
                type: "text",
                align: "center",
                width: 120
            }
        ]

       if($scope.CmbRaporTip == 1)
        {
            DepoDurumRaporu = 
            [
                {
                    name: "STOKADI",
                    title: "STOK ADI",
                    type: "text",
                    align: "center",
                    width: 120
                    
                },
                {
                    name: "STOKKOD",
                    title: "STOK KODU",
                    type: "number",
                    align: "center",
                    width: 120
                },
                {
                    name: "KALAN",
                    title: "GUNCEL MIKTAR",
                    type: "text",
                    align: "center",
                    width: 120
                }
            ]
        }

        $("#TblStokListe").jsGrid
        ({
            width: "100%",
            height: "300px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.RaporData,
            fields: DepoDurumRaporu,
        });
    }
    function FisData(pData)
    {
        $scope.FisLength = pData;
        if($scope.FisDizaynTip = "0")
        {
            if($scope.CmbRaporTip == 0)
            {
                $scope.FisDeger = "";
                $scope.FisData = "";
                $scope.FisBilgiText = "";
                $scope.FisBilgi = "";
               try 
               {
                    $scope.FisDeger = "";
                    $scope.FisDeger += $scope.DepoAdi + "                         " + $scope.Tarih + "\n" + "                                      " + $scope.Saat;
                    for(let i=0; i < pData.length; i++)
                    {
                        $scope.FisData = $scope.FisData +  SpaceLength(pData[i].STOKADI,22) + " " + SpaceLength(parseFloat(pData[i].YUKLENEN.toFixed(2)),7) + " " + SpaceLength(parseFloat(pData[i].SATILAN.toFixed(2)),9) + " " + SpaceLength(parseFloat(pData[i].KALAN.toFixed(2)),9) + "\n";
                    }
               } 
               catch (error) 
               {
                   console.log(error)
               }
            }
            else if($scope.CmbRaporTip == 1)
            {
                $scope.FisDeger = "";
                $scope.FisData = "";
                $scope.FisBilgiText = "";
                $scope.FisBilgi = "";
               try 
               {
                    $scope.FisDeger = "";
                    $scope.FisDeger += $scope.DepoAdi + "                         " + $scope.Tarih + "\n" + "                                      " + $scope.Saat;
                    for(let i=0; i < pData.length; i++)
                    {
                        $scope.FisData = $scope.FisData +  SpaceLength(pData[i].STOKADI,22) + " " + SpaceLength(parseFloat(pData[i].STOKKOD),7) + SpaceLength(parseFloat(pData[i].KALAN.toFixed(2)),9) + "\n";
                    }
               } 
               catch (error) 
               {
                   console.log(error)
               }
            }
        }
    }
    function SpaceLength(pData,pLength)
     {
         try 
         {
             let x = pLength - pData.toString().length;

             if(pData.toString().length > pLength)
             {
                 pData = pData.substring(0,pLength);
             }

             Space = "";

             for(let i=0; i < x; i++)
             {
                 Space = Space + " ";
             }

             return pData + Space
            
         } 
         catch (error) 
         {
             console.log(error)
         }
     }
    $scope.Init = function()
    {   
        $scope.Firma = $window.sessionStorage.getItem('Firma');
        UserParam = Param[$window.sessionStorage.getItem('User')];

        $scope.CmbDepoAra = "0";
        $scope.TxtDepoAra = "";
        $scope.DepoAdi = "";
        $scope.StokAdi = "";
        $scope.StokKodu = "";
        $scope.Tarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.SonTarih = moment(new Date(new Date().getFullYear(), 11, 31)).format("YYYYMMDD");
        $scope.Saat = moment(new Date()).format("LTS");
        $scope.FisDizaynTip = UserParam.Sistem.FisDizayn
        $scope.CmbRaporTip = "0";

        $scope.DepoListe = [];
        $scope.RaporData = [];

        $scope.Loading = false;
        $scope.TblLoading = true;
        $scope.DepoNo = UserParam.DepoDurumRaporu.Depo;

        InitDepoGrid();
        InitDepoRaporGrid();
        $scope.BtnDepoListele();
    }
    $scope.RaporTipChange = function()
    {
        if($scope.CmbRaporTip == 0)
        {
            $scope.RaporData = [];
            InitDepoRaporGrid();
        }
        else if ($scope.CmbRaporTip == 1)
        {
            $scope.RaporData = [];
            InitDepoRaporGrid();
        }
    }
    $scope.BtnGetir = function()
    {
        console.log($scope.CmbRaporTip)
        if($scope.CmbRaporTip == 0)
        {
            var TmpQuery = 
            {
                db : '{M}.' + $scope.Firma,
                query: 
                "SELECT  " +
                "sth_stok_kod AS STOKKOD, " +
                "(SELECT sto_isim FROM STOKLAR WHERE sto_kod = sth_stok_kod) AS STOKADI, " +
                "SUM(sth_miktar) AS YUKLENEN, " +
                "(SELECT dep_adi FROM DEPOLAR WHERE	dep_no = @DEPONO) AS DEPO, " +
                "ISNULL((SELECT SUM(sth_miktar) FROM STOK_HAREKETLERI WHERE sth_stok_kod = STOKLAR.sth_stok_kod and sth_tip = 1 and sth_tarih >= @TARIH AND sth_cikis_depo_no = @DEPONO ),0) AS SATILAN, " +
                "ISNULL((SELECT dbo.fn_DepodakiMiktar (STOKLAR.sth_stok_kod,@DEPONO,GETDATE())),0) AS KALAN " +
                "FROM STOK_HAREKETLERI AS STOKLAR WHERE sth_tip = 2 AND sth_tarih = @TARIH AND sth_giris_depo_no = @DEPONO  GROUP BY sth_stok_kod ",
                param:  ['DEPONO','TARIH'],
                type:   ['int','date',],
                value:  [$scope.DepoNo,$scope.Tarih]
            }
            db.GetDataQuery(TmpQuery,function(Data)
            {
                $scope.RaporData = Data;
    
                if($scope.RaporData.length > 0)
                {
                    FisData(Data)
                    $("#TblStokListe").jsGrid({data : $scope.RaporData});
                }
                else
                {
                    alertify.alert("Rapor İçeriği Boş !")
                }
            });
        }
        else if($scope.CmbRaporTip == 1)
        {
            var TmpQuery = 
            {
                db : '{M}.' + $scope.Firma,
                query: 
                "SELECT  " +
                "sto_kod AS STOKKOD, " +
                "sto_isim AS STOKADI, " +
                "ISNULL((SELECT dbo.fn_DepodakiMiktar (sto_kod,@DEPONO,GETDATE())),0) AS KALAN " +
                "FROM STOKLAR WHERE ISNULL((SELECT dbo.fn_DepodakiMiktar (sto_kod,@DEPONO,GETDATE())),0) > 0 ",
                param:  ['DEPONO','TARIH'],
                type:   ['int','date',],
                value:  [$scope.DepoNo,$scope.Tarih]
            }
            db.GetDataQuery(TmpQuery,function(Data)
            {
                $scope.RaporData = Data;
    
                if($scope.RaporData.length > 0)
                {
                    FisData(Data)
                    $("#TblStokListe").jsGrid({data : $scope.RaporData});
                }
                else
                {
                    alertify.alert("Rapor İçeriği Boş !")
                }
            });
        }
    }
    $scope.BtnDepoListele = function()
    {   
        $scope.Loading = true;
        $scope.TblLoading = false;

        let Kodu = '';
        let Adi = '';

        if($scope.TxtDepoAra != "")
        {
            if($scope.CmbDepoAra == "0")
            {   
                Adi = $scope.TxtDepoAra.replace("*","%").replace("*","%");
            }
            else
            {
                Kodu = $scope.TxtDepoAra.replace("*","%").replace("*","%");
            }
        }
        db.GetData($scope.Firma,'DepoAra',[Kodu,Adi,$scope.DepoNo,''],function(data)
        {
            if(data.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $scope.DepoListe = data;
                for(let i = 0; $scope.DepoListe.length > i; i++)
                {    
                    if($scope.DepoListe[i].KODU == $scope.DepoNo)
                    {
                        $scope.DepoAdi = $scope.DepoListe[i].ADI;
                    }
                }
                $("#TblDepo").jsGrid({data : $scope.DepoListe});
            }
            else
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                alertify.alert("Depo bulunamadı")
            }
        });
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
            $scope.DepoNo = $scope.DepoListe[pIndex].KODU;
            $scope.BtnGetir();
            $scope.MainClick();
        }
    }
    $scope.BtnDepoListeleEnter = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            $scope.BtnDepoListele();
        }
    }
    $scope.MainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbDepo").removeClass('active');
    }
    $scope.DepoSec = function() 
    {
        $("#TbDepo").addClass('active');
        $("#TbMain").removeClass('active');
    }
    $scope.BtnTemizle = function()
    {
        $scope.DepoAdi = "";
        $scope.DepoNo = 0;
    }
    $scope.BtnFisYazdir = function()
    {
        console.log('%c TRABZON!!', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(4,77,145) , 9px 9px 0 rgb(217,31,38) , 12px 12px 0 rgb(4,77,145) , 15px 15px 0 rgb(217,31,38) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(217,31,38)');
        if($scope.FisDizaynTip == 0)
        {
            if($scope.CmbRaporTip == 0)
            {
                let FisDizayn = "";
                let i = 55 - $scope.FisLength.length;
                let Satır = "";
    
                for(let x = 0; x <= i; x++)
                {    
                    Satır = Satır + "                                             -"+ "\n"; 
                }
                //FİŞ DİZAYNI
                FisDizayn = "                                             -" + "\n" + 
                $scope.FisDeger + "\n" +
                SpaceLength("ÜRÜN ADI",21) + SpaceLength("YUKLENEN",10) + SpaceLength("SATILAN",9) + SpaceLength("KALAN",5) + "\n" + 
                $scope.FisData + "\n" //İÇERİK
                FisDizayn = FisDizayn + "   " +"YÜKLENEN: " + parseFloat(db.SumColumn($scope.FisLength,"YUKLENEN").toFixed(2)) + " " + "SATILAN: " + parseFloat(db.SumColumn($scope.FisLength,"SATILAN").toFixed(2)) + " " + "KALAN: " + parseFloat(db.SumColumn($scope.FisLength,"KALAN").toFixed(2)) + "\n" +
                Satır 
                FisDizayn = FisDizayn +  "   "
                "-\n" + "-\n" + "-\n" + "-\n" + "-\n" + "-\n" + "-\n" + "-\n" + "-\n" + "-\n" + "-\n"
                FisDizayn = FisDizayn.split("İ").join("I").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u");
                console.log(FisDizayn)
                db.BTYazdir(FisDizayn,UserParam.Sistem,function(pStatus)
                {
                    if(pStatus)
                    {
                        alertify.alert("<a style='color:#3e8ef7''>" + "Yazdırma İşlemi Gerçekleşti </a>" );
                    }
                });
            }
            else if ($scope.CmbRaporTip == 1)
            {
                console.log('%c TRABZON!!', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(4,77,145) , 9px 9px 0 rgb(217,31,38) , 12px 12px 0 rgb(4,77,145) , 15px 15px 0 rgb(217,31,38) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(217,31,38)');          
                let FisDizayn = "";
                let i = 55 - $scope.FisLength.length;
                let Satır = "";
    
                for(let x = 0; x <= i; x++)
                {    
                    Satır = Satır + "                                             -"+ "\n"; 
                }
                //FİŞ DİZAYNI
                FisDizayn = "                                             -" + "\n" + 
                $scope.FisDeger + "\n" +
                SpaceLength("ÜRÜN ADI",21) + SpaceLength("YUKLENEN",10) + SpaceLength("SATILAN",9) + SpaceLength("KALAN",5) + "\n" + 
                $scope.FisData + "\n"  //İÇERİK
                FisDizayn = FisDizayn + "KALAN: " + parseFloat(db.SumColumn($scope.FisLength,"KALAN").toFixed(2)) + "\n" +
                Satır 
                FisDizayn = FisDizayn +  "   "
                "-\n" + "-\n" + "-\n" + "-\n" + "-\n" + "-\n" + "-\n" + "-\n" + "-\n" + "-\n" + "-\n"
                FisDizayn = FisDizayn.split("İ").join("I").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u");
                console.log(FisDizayn)
                db.BTYazdir(FisDizayn,UserParam.Sistem,function(pStatus)
                {
                    if(pStatus)
                    {
                        alertify.alert("<a style='color:#3e8ef7''>" + "Yazdırma İşlemi Gerçekleşti </a>" );
                    }
                });
            }
        }
    }
}