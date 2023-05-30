function RafYonetimiCtrl($scope,$window,$timeout,db,$filter)
{
    let IslemSelectedRow = null;
    let StokSelectedRow = null;
    let RafSelectedRow = null;
    let ParamName = "";
    
    function Init() 
    {
        $scope.Firma = $window.sessionStorage.getItem('Firma');
        UserParam = Param[$window.sessionStorage.getItem('User')];

        $scope.Sira;
        $scope.DepoNo = "1";
        $scope.DepoAdi;
        $scope.TxtStokAra = "";
        $scope.CmbStokAra = "1";
        $scope.RafKodu = "";
        $scope.CmbRafAra = "1";
        $scope.TxtRafAra = ""
        $scope.StokKodu = "";
        $scope.Tarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.Saat = moment(new Date()).format("LTS");
        $scope.IlkTarih = moment().startOf('month').format("DD.MM.YYYY");
        $scope.SonTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.DepoListe = [];

        $scope.IslemListeSelectedIndex = -1;  

        $scope.TxtParti = "";
        $scope.TxtLot = 0;

        $scope.Loading = false;
        $scope.TblLoading = true;
    }
    function InitRaporGrid()
    {
        $("#TblRafRpr").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.RaporListe,
            paging : true,
            pageSize: 30,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields:
            [
                {
                    name: "TARIH",
                    type: "text",
                    align: "center",
                    width: 100
                },
                {
                    name: "CIKISTARIH",
                    type: "text",
                    align: "center",
                    width: 100
                },
                {
                    name: "ADI",
                    type: "text",
                    align: "center",
                    width: 300
                },
                {
                    name: "MIKTAR",
                    type: "text",
                    align: "center",
                    width: 90
                },
                {
                    name: "RAF",
                    title: "RAF",
                    type: "text",
                    align: "center",
                    width: 150
                },
                {
                    name: "PARTI",
                    title: "PARTI",
                    type: "text",
                    align: "center",
                    width: 150
                },
                {
                    name: "LOT",
                    title: "LOT",
                    type: "text",
                    align: "center",
                    width: 150
                }
            ],
            rowClick: function(args)
            {
                // $scope.CariListeRowClick(args.itemIndex,args.item,this);
                // $scope.$apply();
            }
        });
    }
    function InitStokGrid()
    {   
        $("#TblStok").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.StokListe,
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
                {
                    name: "DEPOMIKTAR",
                    title: "DEPO MİKTARI",
                    type: "text",
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
    function InitRafGetirGrid()
    {   
        $("#TblRaf").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.StokListe,
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
                }
            ],
            rowClick: function(args)
            {
                $scope.RafRaporListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function BarkodFocus()
    {
        $timeout( function(){$window.document.getElementById("Barkod").focus();},100);  
    }
    $scope.BtnStokListeleEnter = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            $scope.BtnStokListele();
        }
    }
    $scope.BtnTemizle = function()
    {
        $scope.Barkod = "";
        $scope.Stok = null;
        $scope.Stok = 
        [
            {
                BIRIM : '',
                BIRIMPNTR : 0, 
                FIYAT : 0,
                TUTAR : 0,
                INDIRIM : 0,
                KDV : 0,
                TOPTUTAR :0
            }
        ];
        $scope.Fiyat = 0;
        $scope.Miktar = 1;
        $scope.BarkodLock = false;
        $scope.SatirAciklama = "";

        $scope.BirimListe = [];
        BarkodFocus();      
    }
    $scope.YeniEvrak = async function ()
    {
        Init();
        InitRaporGrid();
        InitStokGrid();
        InitRafGetirGrid();
        $scope.EvrakLock = false;

        db.DepoGetir($scope.Firma,"",function(data)
        {   
            $scope.DepoListe = data; 
            // $scope.DepoNo = UserParam[ParamName].DepoNo;
            $scope.DepoNo = "1"
            $scope.DepoListe.forEach(function(item) 
            {
                if(item.KODU == $scope.DepoNo)
                    $scope.DepoAdi = item.ADI;
            });
            
        });
    }
    $scope.DepoChange = function()
    {
        $scope.DepoListe.forEach(function(item) 
        {
            if(item.KODU == $scope.DepoNo)
                $scope.DepoAdi = item.ADI;
        }); 
    }
    $scope.IslemListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( IslemSelectedRow ) { IslemSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        IslemSelectedRow = $row;
        $scope.IslemListeSelectedIndex = pIndex;
    }
    $scope.StokListeRowClick = function(pIndex,pItem,pObj)
    {
        if(!$scope.EvrakLock)
        {
            if ( StokSelectedRow ) { StokSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
            var $row = $("#TblStok").jsGrid("rowByItem", pItem);
            $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
            StokSelectedRow = $row;
            
            $scope.StokAdi = $scope.StokListe[pIndex].ADI;
            $scope.StokKodu =$scope.StokListe[pIndex].KODU;
            $scope.RaporClick();
        }
    }
    $scope.RafRaporListeRowClick = function(pIndex,pItem,pObj)
    {
        if(!$scope.EvrakLock)
        {
            if ( RafSelectedRow ) { RafSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
            var $row = $("#TblRaf").jsGrid("rowByItem", pItem);
            $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
            RafSelectedRow = $row;
            
            $scope.RafAdi = $scope.RafRaporListe[pIndex].ADI;
            $scope.RafKodu =$scope.RafRaporListe[pIndex].KODU;
            $scope.RaporClick();
        }
    }
    $scope.RafInsert = function()
    {
        var InsertData = 
        [
            UserParam.Kullanici,
            UserParam.Kullanici,
            $scope.RafKodu,
            $scope.RafAdi,
            $scope.Depo,
            $scope.Reyon,
            $scope.Sira
        ];
        console.log(InsertData)
        db.ExecuteTag($scope.Firma,'RafTanitimInsert',InsertData,function(InsertResult)
        {  

        });
    }
    $scope.MainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbRapor").removeClass('active');
        $("#TbStok").removeClass('active');
        $("#TbRaf").removeClass('active');
    }
    $scope.RaporClick = function()
    {
        $("#TbRapor").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbStok").removeClass('active');
        $("#TbRaf").removeClass('active');
    }
    $scope.StokSecClick = function() 
    {
        $("#TbStok").addClass('active');
        $("#TbRapor").removeClass('active');
        $("#TbMain").removeClass('active');
        $("#TbRaf").removeClass('active');
    }
    $scope.RafSecClick = function() 
    {
        $("#TbRaf").addClass('active');
        $("#TbRapor").removeClass('active');
        $("#TbMain").removeClass('active');
    }
    $scope.BtnRaporGetir = function()
    {
        db.GetData($scope.Firma,'RafRaporGetir',[$scope.StokKodu,$scope.RafKodu,$scope.IlkTarih,$scope.SonTarih],function(Data)
        {
            $scope.RaporListe = Data;   
            if(Data.length == 0)
            {
                alertify.alert("Veri Yok")
            }
            else
            {
                $("#TblRafRpr").jsGrid({data : $scope.RaporListe});
            }
        });
    }
    $scope.BtnStokSec = function()
    {   
        $('#MdlStokGetir').modal('hide');
    }
    $scope.BtnStokListele = function()
    {   
        let Kodu = '';
        let Adi = '';
        $scope.Loading = true;
        $scope.TblLoading = false;

        if($scope.TxtStokAra != "")
        {
            if($scope.CmbStokAra == "0")
            {   
                Adi = $scope.TxtStokAra.replace("*","%").replace("*","%");
            }
            else
            {
                Kodu = $scope.TxtStokAra.replace("*","%").replace("*","%");
            }
        }
        
        db.GetData($scope.Firma,'StokAdiGetir',[Kodu,Adi],function(data)
        {
            $scope.StokListe = data;  

            if ($scope.StokListe.length > 0)   
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblStok").jsGrid({data : $scope.StokListe});
                $("#TblStok").jsGrid({pageIndex: true})
            }
            else
            {
                alertify.alert("Stok Bulunamadı")
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblStok").jsGrid({data : $scope.StokListe});
                $("#TblStok").jsGrid({pageIndex: true})
            }
        });
    }
    $scope.BtnRafListele = function()
    {
        let Kodu = '';
        let Adi = '';
        $scope.Loading = true;
        $scope.TblLoading = false;

        console.log($scope.TxtRafAra)
        if($scope.TxtRafAra != "")
        {
            console.log($scope.TxtRafAra)
            if($scope.CmbRafAra == "0")
            {   
                Adi = $scope.TxtRafAra.replace("*","%").replace("*","%");
            }
            else
            {
                console.log($scope.TxtRafAra)
                Kodu = $scope.TxtRafAra.replace("*","%").replace("*","%");
            }
        }
        
        db.GetData($scope.Firma,'RafAdiGetir',[Kodu,Adi],function(data)
        {
            $scope.RafRaporListe = data;  

            if ($scope.RafRaporListe.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblRaf").jsGrid({data : $scope.RafRaporListe});
                $("#TblRaf").jsGrid({pageIndex: true})
            }
            else
            {
                alertify.alert("Raf Bulunamadı")
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblRaf").jsGrid({data : $scope.RafRaporListe});
                $("#TblRaf").jsGrid({pageIndex: true})
            }
        });
    }
    $scope.BtnStokTemizle = function()
    {
        $scope.StokKodu = "";
        $scope.StokAdi = "";
    }
    $scope.BtnRafTemizle = function()
    {
        $scope.RafKodu = "";
        $scope.RafAdi = "";
    }
}