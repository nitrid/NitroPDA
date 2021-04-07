function ProformaSiparisRaporuCtrl($scope,$window,db)
{   
    let CariSelectedRow = null;
    let SubeSelectedRow = null;
    let IslemSelectedRow = null;

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
                },
                {
                    name: "DOVIZSEMBOL",
                    title: "DOVIZ",
                    type: "text",
                    align: "center",
                    width: 100
                }
            ],
            rowClick: function(args)
            {
                $scope.CariListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitSubeGrid()
    {   
        $("#TblSube").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.SubeListe,
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
                    width: 75
                } 
            ],
            rowClick: function(args)
            {
                $scope.SubeListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function IslemGrid()
    {   
        $("#TblCariFoy").jsGrid
        ({
            width: "100%",
            height: "300px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.IslemListe,
            fields: 
            [
                {
                    name: "TARIH",
                    title: "TARIH",
                    type: "text",
                    align: "center",
                    width: 180
                },
                {
                    name: "SERI-SIRA",
                    title: "SERİ - SIRA",
                    type: "text",
                    align: "center",
                    width: 150
                    
                },
                {
                    name: "CARIADI",
                    title: "CARİ",
                    type: "text",
                    align: "center",
                    width: 150
                    
                },
              
                {
                    name: "MIKTAR",
                    title: "MİKTARI",
                    type: "text",
                    align: "center",
                    width: 180
                },
                             {
                    name: "TUTARKDVDAHIL",
                    title: "TUTAR",
                    type: "text",
                    align: "center",
                    width: 250
                }
            ],
            rowClick: function(args)
            {
                $scope.IslemDetayRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function IslemDetayGrid()
    {   
        $("#TblIslemDetay").jsGrid
        ({
            width: "100%",
            height: "auto",
            updateOnResize: true,
            heading: true,
            data : $scope.IslemDetayListe,
            fields: 
            [          
               
                {
                    name: "STOKKODU",
                    title: "STOK KODU",
                    type: "text",
                    align: "center",
                    width: 250
                },
                {
                    name: "STOKADI",
                    title: "STOK ADI",
                    type: "text",
                    align: "center",
                    width: 250
                },
                {
                    name: "SIPMIKTAR",
                    title: "MİKTAR",
                    type: "text",
                    align: "center",
                    width: 80
                },
                {
                    name: "DEPOLAR",
                    title: "SUBE",
                    type: "text",
                    align: "center",
                    width: 80
                },
                {
                    name: "TESLIMMIKTAR",
                    title: "TESLİM",
                    type: "text",
                    align: "center",
                    width: 80 
                },
                {
                    name: "TESLIMEDILMEYENMIKTAR",
                    title: "BEKLEYEN",
                    type: "text",
                    align: "center",
                    width: 80
                },
                {
                    name: "BFIYAT",
                    title: "BİRİM FIYAT",
                    type: "text",
                    align: "center",
                    width: 100
                },
                {
                    name: "TUTAR",
                    title: "TUTAR",
                    type: "text",
                    align: "center",
                    width: 100
                }
            ],
        });
    }
    function DipToplamHesapla()
    {
        $scope.AraToplam = 0;
        $scope.ToplamIndirim = 0;
        $scope.ToplamKdv = 0;
        $scope.NetToplam = 0;
        $scope.GenelToplam = 0;

        angular.forEach($scope.IslemDetayListe,function(value)
        {
            $scope.AraToplam += value.pro_tutari;
            $scope.ToplamIndirim += (value.pro_iskonto_1 + value.pro_iskonto_2 + value.pro_iskonto_3 + value.pro_iskonto_4 + value.pro_iskonto_5 + value.pro_iskonto_6);
            $scope.ToplamKdv +=  (value.pro_tutari - (value.pro_iskonto_1 + value.pro_iskonto_2 + value.pro_iskonto_3 + value.pro_iskonto_4 + value.pro_iskonto_5 + value.pro_iskonto_6)) * (value.TOPTANVERGI / 100);
        });
        $scope.NetToplam = $scope.AraToplam - $scope.ToplamIndirim;
        $scope.GenelToplam = $scope.NetToplam + $scope.ToplamKdv;
    }
    $scope.Init = function()
    {   
        $scope.Firma = $window.sessionStorage.getItem('Firma');
        UserParam = Param[$window.sessionStorage.getItem('User')];

        $scope.CmbCariAra = "0";
        $scope.TxtCariAra = "";
        $scope.CmbSubeAra = "0";
        $scope.TxtSubeAra = "";
        $scope.EvrakTip = "0";
        $scope.SipTip = "2";
        $scope.Carikodu = "";
        $scope.CariAdi = "";
        $scope.SubeKodu = UserParam.RaporParams.Depo
        {
            var TmpQuery = 
            {
                db : '{M}.' + $scope.Firma,
                query:  "SELECT dep_adi FROM DEPOLAR WHERE dep_no = @dep_no" ,
                param:  ['dep_no'], 
                type:   ['int'], 
                value:  [$scope.SubeKodu]
            }
            db.GetDataQuery(TmpQuery,function(Data)
            {
                $scope.SubeAdi = Data[0].dep_adi
            });
        }
        $scope.SubeAdi = "";
        $scope.ToplamSatir = "";
        $scope.IlkTarih = moment(new Date(new Date().getFullYear(), 0, 1)).format("DD.MM.YYYY");
        $scope.SonTarih = moment(new Date()).format("DD.MM.YYYY");

        $scope.CariListe = [];
        $scope.SubeListe = [];
        $scope.IslemListe = [];
        $scope.IslemDetayListe = [];
        $scope.TemsiciKodu = UserParam.Sistem.PlasiyerKodu

        InitCariGrid();
        IslemGrid();
        IslemDetayGrid();
        InitSubeGrid();
        $scope.MainClick();
    }
    $scope.BtnCariSec = function()
    {   
        $('#MdlCariGetir').modal('hide');
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
            
            $scope.CariListe = data;  

            if ($scope.CariListe.length > 0)   
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblCari").jsGrid({data : $scope.CariListe});
                $("#TblCari").jsGrid({pageIndex: true})
            }
            else
            {
                alertify.alert("Cari Bulunamadı")
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblCari").jsGrid({data : $scope.CariListe});
                $("#TblCari").jsGrid({pageIndex: true})
            }
        });
    }
    $scope.BtnCariTemizle = function()
    {
        $scope.Carikodu = "";
        $scope.CariAdi = "";
    }
    $scope.BtnGetir = function()
    {
        var str = '';

        if($scope.EvrakTip == 0)
        {
            $scope.Tip = "0";
        }
        else
        {
            $scope.Tip = "1";
        }
        console.log($scope.SubeKodu)
        console.log($scope.Carikodu)
        console.log($scope.TemsiciKodu)

        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "SELECT " +
                    "pro_evrakno_seri + ' - ' +CONVERT(NVARCHAR(25),pro_evrakno_sira) AS [SERI-SIRA], " +
                    "pro_evrakno_seri AS SERI," +
                    "pro_evrakno_sira AS SIRA," +
                    "pro_mustkodu AS CARIKOD, " +
                    "(SELECT cari_unvan1 FROM CARI_HESAPLAR WHERE cari_kod = pro_mustkodu) AS CARIADI, " +
                    "SUM(pro_miktar) AS MIKTAR, " +
                    "CONVERT(NVARCHAR,pro_belge_tarihi,104) AS TARIH, " +
                    "CONVERT(NVARCHAR,CAST(SUM(pro_tutari)  AS DECIMAL(10,2))) AS TUTARKDVHARIC, " +
                    "CONVERT(NVARCHAR,CAST(SUM(pro_tutari) + SUM(pro_vergi) AS DECIMAL(10,2))) AS TUTARKDVDAHIL, " +
                    "(SELECT dep_adi AS ADI FROM DEPOLAR WHERE PROFORMA_SIPARISLER.pro_depono = dep_no) AS DEPOLAR " +
                    "FROM PROFORMA_SIPARISLER " +
                    "WHERE (pro_depono = @DEPONO OR @DEPONO = '') AND ((pro_mustkodu = @KODU) OR (@KODU = '')) AND ((pro_saticikodu = @pro_saticikodu) OR (@pro_saticikodu = '')) AND  pro_belge_tarihi >= @ILKTARIH AND pro_belge_tarihi <= @SONTARIH AND pro_tipi = @TIP "+ 
                    "GROUP BY pro_evrakno_seri,pro_evrakno_sira,pro_mustkodu,pro_belge_tarihi,pro_depono ORDER BY pro_belge_tarihi DESC" ,
            param:  ['DEPONO','KODU','pro_saticikodu','ILKTARIH','SONTARIH','TIP'], 
            type:   ['string|25','string|25','string|25','date','date','int'], 
            value:  [$scope.SubeKodu,$scope.Carikodu,$scope.TemsiciKodu,$scope.IlkTarih,$scope.SonTarih,$scope.Tip]
        }

        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.IslemListe = Data;
            console.log(Data)
            $("#TblCariFoy").jsGrid({data : $scope.IslemListe});
            $scope.$apply();
        });
    }
    $scope.BtnSubeSec = function()
    {   
        $('#MdlSubeGetir').modal('hide');
    }
    $scope.BtnSubeListele = function()
    {   
        let Kodu = '';
        let Adi = '';
        $scope.Loading = true;
        $scope.TblLoading = false;

        if($scope.TxtSubeAra != "")
        {
            if($scope.CmbSubeAra == "0")
            {   
                Adi = $scope.TxtSubeAra.replace("*","%").replace("*","%");
            }
            else
            {
                Kodu = $scope.TxtSubeAra.replace("*","%").replace("*","%");
            }
        }
        
        db.GetData($scope.Firma,'CmbDepoGetir',[Kodu,Adi,UserParam.Sistem.PlasiyerKodu],function(data)
        {
            $scope.Loading = false;
            $scope.TblLoading = true;
            $scope.SubeListe = data;
            $("#TblSube").jsGrid({data : $scope.SubeListe});
            $("#TblSube").jsGrid({pageIndex : true});
        });
    }
    $scope.BtnSubeTemizle = function()
    {
        $scope.SubeKodu = '';
        $scope.SubeAdi = "";
    }
    $scope.CariListeRowClick = function(pIndex,pItem,pObj)
    {
        if(!$scope.EvrakLock)
        {
            if ( CariSelectedRow ) { CariSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
            var $row = $("#TblCari").jsGrid("rowByItem", pItem);
            $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
            CariSelectedRow = $row;
            
            $scope.CariAdi = $scope.CariListe[pIndex].UNVAN1;
            $scope.Carikodu =$scope.CariListe[pIndex].KODU;
            $scope.MainClick();
        }
    }
    $scope.SubeListeRowClick = function(pIndex,pItem,pObj)
    {
        if(!$scope.EvrakLock)
        {
            if ( SubeSelectedRow ) { SubeSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
            var $row = $("#TblSube").jsGrid("rowByItem", pItem);
            $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
            SubeSelectedRow = $row;
            
            $scope.SubeAdi = $scope.SubeListe[pIndex].ADI;
            $scope.SubeKodu = $scope.SubeListe[pIndex].KODU;
            $scope.MainClick();
        }
    }
    $scope.IslemDetayRowClick = function(pIndex,pItem,pObj)
    {
        if(!$scope.EvrakLock)
        {
            if ( IslemSelectedRow ) { IslemSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
            var $row = $("#TblIslem").jsGrid("rowByItem", pItem);
            $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
            IslemSelectedRow = $row;

            $scope.Seri = $scope.IslemListe[pIndex].SERI;
            $scope.Sira = $scope.IslemListe[pIndex].SIRA;

            var TmpQuery = 
            {
                db : '{M}.' + $scope.Firma,
                query:  "SELECT " +
                        "pro_mustkodu AS CARIKOD, " +
                        "pro_stokkodu AS STOKKODU, " +
                        "ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod = pro_stokkodu),'') AS STOKADI," +
                        "ISNULL((SELECT dbo.fn_StokBirimi(pro_stokkodu,pro_birim_pntr)),'') AS BIRIM, " +
                        "pro_miktar AS SIPMIKTAR, " +
                        "pro_tesmiktari AS TESLIMMIKTAR, " +
                        "pro_miktar - pro_tesmiktari AS TESLIMEDILMEYENMIKTAR, " +
                        "CONVERT(NVARCHAR,CAST(pro_bfiyati AS DECIMAL(10,2))) AS BFIYAT, " +
                        "CONVERT(NVARCHAR,pro_belge_tarihi,104) AS TARIH, " +
                        "(SELECT dbo.fn_VergiYuzde (pro_vergipntr)) AS TOPTANVERGI, " +
                        "CONVERT(NVARCHAR,CAST(pro_tutari AS DECIMAL(10,2))) AS TUTAR,* " +
                        "FROM PROFORMA_SIPARISLER  WHERE pro_evrakno_seri = @SERI AND pro_evrakno_sira = @SIRA ORDER BY pro_satirno ASC",
                param:  ['SERI','SIRA'], 
                type:   ['string|25','int'], 
                value:  [$scope.Seri,$scope.Sira]
            }

            db.GetDataQuery(TmpQuery,function(Data)
            {
                $scope.IslemDetayListe = Data;
                $("#TblIslemDetay").jsGrid({data : $scope.IslemDetayListe});
                $scope.ToplamSatir = $scope.IslemDetayListe.length;
                DipToplamHesapla(Data);
            });
        }
        
        $("#MdlIslemDetay").modal('show');
        $('#IlkTarih').bootstrapMaterialDatePicker({format: "DD.MM.YYYY",lang: "tr",time:false,date:true,currentDate:new Date()});
    }
    $scope.MainClick = function()
    {
        $("#TbMain").addClass('active');
        $("#TbSube").removeClass('active');
        $("#TbCari").removeClass('active');
    }
    $scope.BtnCariTab = function()
    {
        $("#TbCari").addClass('active');
        $("#TbSube").removeClass('active');
        $("#TbMain").removeClass('active');
    }
    $scope.BtnSubeTab = function()
    {
        $("#TbSube").addClass('active');
        $("#TbCari").removeClass('active');
        $("#TbMain").removeClass('active');
        $scope.BtnSubeListele();
    }
    $scope.ExcelExport = function()
    {
        
        $scope.ExcelDataListesi = $scope.IslemListe

        let ExcelDataListe = [];
        let ExcelHeaderListe = [];

        for(i = 0; i < Object.keys($scope.ExcelDataListesi[0]).length; i++)
        {
            let a = {};
            
            a.text = Object.keys($scope.ExcelDataListesi[0])[i];
            ExcelHeaderListe.push(a)
        }

        ExcelDataListe.push(ExcelHeaderListe)

        for(i = 0; i < $scope.ExcelDataListesi.length; i++)
        {
            let Dizi = [];

            for(m = 0;m < Object.keys($scope.ExcelDataListesi[i]).length;m++)
            {
                let b = {};
                b.text = $scope.ExcelDataListesi[i][Object.keys($scope.ExcelDataListesi[i])[m]]
                Dizi.push(b);
                console.log(Dizi)
            }
            
            ExcelDataListe.push(Dizi)
        }
        console.log(ExcelDataListe)
        var RaporListeData = 
        [
            {
                "sheetName":"Sayfa",
                "data":  ExcelDataListe
            },
            
        ];
        var options = {
            fileName:"VerilenSiparisRapor",
            extension:".xlsx",
            sheetName:"Sayfa",
            fileFullName:"report.xlsx",
            header:true,
            maxCellWidth: 20
        };

        Jhxlsx.export(RaporListeData, options);

        var url ='data.json';
        $.get(url, {},function (data) 
        {
            Jhxlsx.export(data.RaporListeData, data.options);
            db.Connection(function(data)
            {
            });
        })




        
    }
}