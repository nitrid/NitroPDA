function UrunGirisCikisCtrl($scope,$window,$timeout,db)  
{   
    let IsEmriSelectedRow = null;
    let IslemSelectedRow = null;
    let ParamName = "";
    function Init()
    {
        UserParam = Param[$window.sessionStorage.getItem('User')];
        $scope.Firma = $window.sessionStorage.getItem('Firma');

        $scope.Seri = "";
        $scope.Sira;
        $scope.EvrakTip = 0;
        $scope.BelgeNo = "";
        $scope.DepoNo;
        $scope.DepoAdi;
        $scope.Tarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.Sorumluluk = "";
        $scope.SorumlulukAdi = "";
        $scope.Personel = "";
        $scope.PersonelAdi = "";
        $scope.Barkod = "";
        $scope.ToplamSatir = 0;
        $scope.IsEmriKodu = "";
        $scope.IsEmriAdi = "";
        

        $scope.IsEmriListe = [];

        $scope.CmbIsEmriAra = "0";
        $scope.TxtIsEmriAra = ""; 
    }
    function InitEmirGrid()
    {
        $("#TblEmir").jsGrid({
            responsive: true,
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.IsEmriListe,
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
                $scope.IsEmriListeRowClick(args.itemIndex,args.item,this);
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
            data : $scope.StokHarListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [{
                name: "NO",
                title: "NO",
                type: "number",
                align: "center",
                width: 75
            }, 
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
                title: "MIKTAR",
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
                name: "sth_tutar",
                title: "TUTAR",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sth_iskonto1",
                title: "IND1",
                type: "number",
                align: "center",
                width: 200
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
            rowClick: function(args)
            {
                $scope.IslemListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    $scope.YeniEvrak = async function()
    {
        InitEmirGrid();
        InitIslemGrid();
        Init();
        ParamName = "UrunGirisCikis";

        $scope.Seri = UserParam[ParamName].Seri;
        $scope.BelgeNo = UserParam[ParamName].BelgeNo;

        await db.MaxSira($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip],function(data)
        {
            $scope.Sira = data
        });
    }
    $scope.IsEmriListele = function()
    {   
        let Kodu = '';
        let Adi = '';

        if($scope.TxtIsEmriAra != "")
        {
            if($scope.CmbIsEmriAra == "0")
            {   
                Adi = $scope.TxtIsEmriAra.replace("*","%").replace("*","%");
            }
            else
            {
                Kodu = $scope.TxtIsEmriAra.replace("*","%").replace("*","%");
            }
        }
        
        db.GetData($scope.Firma,'IsEmriGetir',[Kodu,Adi,UserParam.Sistem.PlasiyerKodu],function(data)
        {
            console.log(data)
            $scope.IsEmriListe = data;
            if($scope.IsEmriListe.length > 0)
            {
                $("#TblEmir").jsGrid({data : $scope.IsEmriListe});  
            }
            else
            {
               alertify.alert("İş Emri bulunamadı")
            }
        });
    }
    $scope.IsEmriListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( IsEmriSelectedRow ) { IsEmriSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        IsEmriSelectedRow = $row;
        $scope.IsEmriKodu = $scope.IsEmriListe[pIndex].KODU;
        $scope.IsEmriAdi = $scope.IsEmriListe[pIndex].ADI;
        
    }
    $scope.IslemListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( IslemSelectedRow ) { IslemSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        IslemSelectedRow = $row;
        $scope.IslemListeSelectedIndex = pIndex;
    }
    $scope.Insert = function()
    {
        $scope.InsertLock = true
  
        if(typeof($scope.Stok[0].KODU) != 'undefined')
        {
            if(UserParam.Sistem.SatirBirlestir == 0 || $scope.Stok[0].RENKPNTR != 0 || $scope.Stok[0].BEDENPNTR != 0 || $scope.Stok[0].DETAYTAKIP != 1 || $scope.Stok[0].DETAYTAKIP != 2)
            {   
                InsertData();
            }
            else
            {
                let UpdateStatus = false;

                angular.forEach($scope.DepoSevkListe,function(value)
                {
                    if(value.sth_stok_kod == $scope.Stok[0].KODU)
                    {   
                        let TmpMiktar = value.sth_miktar + ($scope.Miktar * $scope.Stok[0].CARPAN);

                        let Data = 
                        {
                            Param :
                            [
                                TmpMiktar,
                                TmpMiktar,
                                0, //TUTAR
                                $scope.Stok[0].TOPTANVERGIPNTR,
                                0, //ISKONTO TUTAR 1
                                0, //ISKONTO TUTAR 2
                                0, //ISKONTO TUTAR 3
                                0, //ISKONTO TUTAR 4
                                0, //ISKONTO TUTAR 5
                                0, //ISKONTO TUTAR 6
                                0, //SATIR ISKONTO TİP 1
                                0, //SATIR ISKONTO TİP 2
                                0, //SATIR ISKONTO TİP 3
                                0, //SATIR ISKONTO TİP 4
                                0, //SATIR ISKONTO TİP 5
                                0, //SATIR ISKONTO TİP 6
                                value.sth_Guid
                            ],
                           
                            BedenPntr : $scope.Stok[0].BEDENPNTR,
                            RenkPntr : $scope.Stok[0].RENKPNTR,
                            Miktar : TmpMiktar,
                            Guid : value.sth_Guid
                        };

                        UpdateStatus = true;
                        UpdateData(Data);
                        $scope.InsertLock = false 
                    }                        
                });

                if(!UpdateStatus)
                {
                    InsertData();
                    $scope.InsertLock = false 
                }                
            }
        }
        else
        {   
            alertify.alert("<a style='color:#3e8ef7''>" + "Barkod Okutunuz !" + "</a>" );
            console.log("Barkod Okutunuz!");
            $scope.InsertLock = false;
        }     
        
        BarkodFocus();
    }
    $scope.BtnBarkodGetirClick = function()
    {
        StokBarkodGetir($scope.Barkod);
    }
    $scope.BtnStokGridSec = function()
    {
        $("#MdlStokGetir").modal('hide');
        StokBarkodGetir($scope.Barkod);
        $scope.BtnStokGridGetir();
    }
    $scope.BtnStokBarkodGetir = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            StokBarkodGetir($scope.Barkod);    
        }
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