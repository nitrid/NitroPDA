function TahsilatMakbuzuCtrl($scope,$window,$timeout,db,$filter)
{
    let CariSelectedRow = null;

    function Init()
    {
        gtag('config', 'UA-12198315-14', 
        {
            'page_title' : 'Tahsilat',
            'page_path': '/Tahsilat'
        });

        $scope.Firma = $window.sessionStorage.getItem('Firma');
        UserParam = Param[$window.sessionStorage.getItem('User')];

        $scope.Seri = "";
        $scope.Sira = 0;
        $scope.EvrakTip = 1;
        $scope.BelgeNo = "";
        $scope.CariKodu = "";
        $scope.CariAdi = "";
        $scope.CariBakiye = 0;
        $scope.CmbEvrakTip = "0";
        $scope.Sorumluluk = "";
        $scope.SorumlulukAdi = "";
        $scope.Personel = "";
        $scope.PersonelAdi = "";
        $scope.Tarih = moment(new Date()).format("DD.MM.YYYY");
       
        $scope.CariListe = [];
        $scope.SorumlulukListe = [];
        $scope.PersonelListe = [];

        $scope.CmbCariAra = "0";
        $scope.TxtCariAra = ""; 
    }
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
    function InitIslemGrid()
    {
        $("#TblIslem").jsGrid({
            responsive: true,
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.SiparisListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
           
            fields: 
            [
            {
                name: "NO",
                title: "NO",
                type: "number",
                align: "center",
                width: 75
                
            }, 
            {
                name: "sip_stok_kod",
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
                name: "sip_miktar",
                title: "MİKTAR",
                type: "number",
                align: "center",
                width: 100
            }, 
            {
                name: "FIYAT",
                title: "FİYAT",
                type: "number",
                align: "center",
                width: 100
            }, 
            {
                name: "sip_tutar",
                title: "TUTAR",
                type: "number",
                align: "center",
                width: 100
            }
           ],
            rowClick: function(args)
            {
                $scope.IslemListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    $scope.CariListeRowClick = function(pIndex,pItem,pObj)
    {    
        if ( CariSelectedRow ) { CariSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        CariSelectedRow = $row;
        
        $scope.CariKodu = $scope.CariListe[pIndex].KODU;
        $scope.CariAdi = $scope.CariListe[pIndex].UNVAN1;
        $scope.CariBakiye = $scope.CariListe[pIndex].BAKIYE;
    }
    $scope.BtnCariListele = function()
    {   
        $scope.Loading = true;
        $scope.TblLoading = false;
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
            if($scope.CariListe.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblCari").jsGrid({data : $scope.CariListe});  
            }
            else
            {
                $("#TblCari").jsGrid({data : $scope.CariListe});
            }
        });
    }
    $scope.YeniEvrak = async function ()
    {
        Init();
        InitCariGrid();
        InitIslemGrid();

        $scope.Seri = UserParam.TahsilatMakbuzu.Seri;
        $scope.BelgeNo = UserParam.TahsilatMakbuzu.BelgeNo;
        $scope.EvrakTip = UserParam.TahsilatMakbuzu.EvrakTip;
        $scope.CariKodu = UserParam.TahsilatMakbuzu.Cari;

        await db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(data)
        {
            $scope.SorumlulukListe = data; 
            $scope.Sorumluluk = UserParam.TahsilatMakbuzu.Sorumluluk;
            $scope.SorumlulukListe.forEach(function(item)
            {
                if(item.KODU == $scope.Sorumluluk)
                    $scope.SorumlulukAdi = item.ADI;
            });
        });   
        await db.FillCmbDocInfo($scope.Firma,'CmbPersonelGetir',function(data)
        {
            $scope.PersonelListe = data;
            $scope.Personel = UserParam.TahsilatMakbuzu.Personel;
            $scope.PersonelListe.forEach(function(item)
            {
                $scope.PersonelAdi == item.ADI;
            });
        });
        await db.MaxSira($scope.Firma,'MaxCariHarSira',[$scope.Seri,$scope.EvrakTip],function(data){$scope.Sira = data});
    }
    $scope.MainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbMeblagGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TbCariSec").removeClass('active');
    }
    $scope.BelgeBilgisiClick = function() 
    {
        $("#TbBelgeBilgisi").addClass('active');
        $("#TbMain").removeClass('active');
    }
    $scope.MeblaGirisClick = function() 
    {   
        if($scope.CariListe.length > 0)
        {
            $("#TbMeblagGiris").addClass('active');
            $("#TbMain").removeClass('active');
            $("#TbCariSec").removeClass('active');
            $("#TbBelgeBilgisi").removeClass('active');
            $("#TbIslemSatirlari").removeClass('active');
        }
        else
        {
            alertify.alert("Lütfen Cari Seçiniz");
        }
    }
    $scope.IslemSatirlariClick = function()
    {   
        $("#TbIslemSatirlari").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbMeblagGiris").removeClass('active');
    }
    $scope.CariSecClick = function()
    {
        $("#TbCariSec").addClass('active');
        $("#TbMain").removeClass('active');
    }
}