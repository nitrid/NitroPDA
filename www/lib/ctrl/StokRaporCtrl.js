function StokRaporCtrl($scope,$window,db)
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
    function InitStokRaporGrid()
    {   
        $("#TblStokListe").jsGrid
        ({
            width: "100%",
            height: "300px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.StokListe,
            fields: 
            [
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
                    type: "number",
                    align: "center",
                    width: 120
                    
                },
                {
                    name: "RENK",
                    title: "RENK",
                    type: "text",
                    align: "center",
                    width: 120
                },
                {
                    name: "BEDEN",
                    title: "BEDEN",
                    type: "text",
                    align: "center",
                    width: 120
                },
                {
                    name: "DEPOMIKTAR",
                    title: "DEPO MİKTARI",
                    type: "number",
                    align: "center",
                    width: 120
                },
                {
                    name: "FIYAT",
                    title: "FIYAT",
                    type: "number",
                    align: "center",
                    width: 120
                },
                {
                    name: "MALIYET",
                    title: "MALIYET",
                    type: "number",
                    align: "center",
                    width: 120
                },
                {
                    name: "TOPLAMFIYAT",
                    title: "TOPLAM FIYAT",
                    type: "number",
                    align: "center",
                    width: 120
                },  {
                    name: "TOPLAMMALIYET",
                    title: "TOPLAM MALIYET",
                    type: "number",
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

        $scope.CmbDepoAra = "0";
        $scope.TxtDepoAra = "";
        $scope.DepoAdi = "";
        $scope.DepoNo = UserParam.StokRaporu.DepoNo;
        $scope.DepoDongu();
        $scope.StokAdi = "";
        $scope.StokKodu = "";
        $scope.IlkTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.SonTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.ToplamDeger = 0;
        $scope.ToplamMaliyet = 0;

        $scope.DepoListe = [];
        $scope.StokListe = [];

        $scope.Loading = false;
        $scope.TblLoading = true;

        InitDepoGrid();
        InitStokRaporGrid();
    }
    $scope.BtnGetir = function()
    {
        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query: 
            "SELECT sto_kod AS STOKKODU,"+ 
            "sto_isim AS STOKADI,"+
            "sto_renk_kodu AS RENK,"+
            "sto_beden_kodu AS BEDEN,"+
            "(SELECT TOP 1 dbo.fn_StokSatisFiyati(sto_kod,1,@DEPONO,1)) AS FIYAT, " +
            "(SELECT TOP 1 dbo.fn_StokSatisFiyati(sto_kod,1,@DEPONO,1)) * ISNULL((SELECT dbo.fn_DepodakiMiktar (sto_kod,@DEPONO,CONVERT(VARCHAR(10),GETDATE(),112))),0) AS TOPLAMFIYAT, " +
            "sto_standartmaliyet * ISNULL((SELECT dbo.fn_DepodakiMiktar (sto_kod,@DEPONO,CONVERT(VARCHAR(10),GETDATE(),112))),0) AS TOPLAMMALIYET, " +
            "sto_standartmaliyet AS MALIYET, " +
            "ISNULL((SELECT dbo.fn_DepodakiMiktar (sto_kod,@DEPONO,CONVERT(VARCHAR(10),GETDATE(),112))),0) AS DEPOMIKTAR " +
            "FROM STOKLAR",
            param:  ['STOKKODU','STOKADI','DEPONO'],
            type:   ['string','string','int'],
            value:  [$scope.StokKod,$scope.StokAdi,$scope.DepoNo]
        }
        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.StokListe = Data;
            if($scope.StokListe.length > 0)
            {
                console.log(Data)
                $("#TblStokListe").jsGrid({data : $scope.StokListe});
                $scope.ToplamDeger = parseFloat(db.SumColumn($scope.StokListe,"TOPLAMFIYAT")).toFixed(2)
                $scope.ToplamMaliyet = parseFloat(db.SumColumn($scope.StokListe,"TOPLAMMALIYET")).toFixed(2)
                
            }
            else
            {
                alertify.alert("Rapor İçeriği Boş !")
            }
        });
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
                $scope.DepoListe = data
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
    $scope.DepoDongu = function()
    {
        db.GetData($scope.Firma,'DepoAra',['','',$scope.DepoNo,''],function(data)
        {
            console.log(data)
            for (let i = 0; i < data.length; i++)
            {
                if($scope.DepoNo == data[i].KODU)
                {
                    $scope.DepoAdi = data[i].ADI;
                }
            }
        });
    }
}