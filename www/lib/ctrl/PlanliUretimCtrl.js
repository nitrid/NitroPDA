function PlanliUretimCtrl($scope,$window,$timeout,db)  
{   
    function InitBarkodTabGrid()
    {   
        $("#TblBarkTab").jsGrid({
            responsive: true,
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.StokHarListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
            {
                name: "sth_stok_kod",
                title: "ADI",
                type: "text",
                align: "center",
                width: 75
            },
            {
                name: "ADI",
                title: "PMIKTAR",
                type: "text",
                align: "center",
                width: 75
            },
            {
                name: "ADI",
                title: "GMIKTAR",
                type: "text",
                align: "center",
                width: 75
            },
            {
                name: "ADI",
                title: "GIRIS",
                type: "text",
                align: "center",
                width: 75
            },
            {
                name: "",
                title: "KODU",
                type: "number",
                align: "center",
                width: 75
            }, 
            {
                name: "ADI",
                title: "KATSAYI",
                type: "text",
                align: "center",
                width: 75
            },
            {
                name: "ADI",
                title: "PARTI",
                type: "text",
                align: "center",
                width: 75
            },
            {
                name: "ADI",
                title: "LOT",
                type: "text",
                align: "center",
                width: 75
            },
           ],
            rowClick: function(args)
            {
                $scope.IslemListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitEmirGrid()
    {   
        $("#TblEmir").jsGrid({
            responsive: true,
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.StokHarListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
     
            fields: 
            [{
                name: "KODU",
                title: "KODU",
                type: "number",
                align: "center",
                width: 75
            }, 
            {
                name: "ADI",
                title: "ADI",
                type: "text",
                align: "center",
                width: 75
            },
            {
                name: "TARIH",
                title: "TARIH",
                type: "text",
                align: "center",
                width: 75
            }
           ],
            rowClick: function(args)
            {
                $scope.IslemListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function Init()
    {
        UserParam = Param[$window.sessionStorage.getItem('User')];
        $scope.Firma = $window.sessionStorage.getItem('Firma');
    }
    $scope.YeniEvrak = function()
    {
        InitEmirGrid();
        Init();
        InitBarkodTabGrid();
    }
    $scope.MainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbIsEmriSecim").removeClass('active');
    }
    $scope.BelgeBilgisiClick = function() 
    {
        $("#TbBelgeBilgisi").addClass('active');
        $("#TbMain").removeClass('active');
    }
    $scope.BarkodGirisClick = function() 
    {   
        if($scope.Sira == 0 || typeof $scope.Sira == "undefined")
        {            
            alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Evrak Siranın Gelmesini Bekleyin!" + "</a>" );
        }
        else
        {
            if($scope.CariAdi != "")
            {
                $("#TbBarkodGiris").addClass('active');
                $("#TbMain").removeClass('active');
                $("#TbCariSec").removeClass('active');
                $("#TbBelgeBilgisi").removeClass('active');
                $("#TbIslemSatirlari").removeClass('active');
                $("#TbIsEmriSecim").removeClass('active');
                            
                BarkodFocus();
            }
            else
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Cari Seçiniz !" + "</a>" );
            }
        }
    }
    $scope.IslemSatirlariClick = function()
    {   
        if($scope.ToplamSatir <= 0)
        {
            alertify.alert("Gösterilecek Evrak Bulunamadı!");
            $("#TbMain").addClass('active');
        }
        else
        {
            $("#TbIslemSatirlari").addClass('active');
            $("#TbMain").removeClass('active');
            $("#TbBelgeBilgisi").removeClass('active');
            $("#TbBarkodGiris").removeClass('active');
            $("#TbIsEmriSecim").removeClass('active');
        }
    }
    $scope.IsEmriSecimClick = function()
    {
        $("#TbIsEmriSecim").addClass('active');
        $("#TbMain").removeClass('active');
    }
} 