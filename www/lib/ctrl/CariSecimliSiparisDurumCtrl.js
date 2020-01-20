function CariSecimliSiparisDurumCtrl($scope,$window,db)
{   
    let CariSelectedRow = null;
    let IslemSelectedRow = null;

    function InitCariGrid()
    {   
        $("#TblCari").jsGrid
        ({
            width: "100%",
            height: "300px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.CariListe,
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
                    name: "SERI-SIRA",
                    title: "SERİ - SIRA",
                    type: "text",
                    align: "center",
                    width: 150
                    
                },
                {
                    name: "CARIKOD",
                    title: "CARI KODU",
                    type: "text",
                    align: "center",
                    width: 180
                },
                {
                    name: "CARIADI",
                    title: "CARI ADI",
                    type: "text",
                    align: "center",
                    width: 180
                },
                {
                    name: "TARIH",
                    title: "TARIH",
                    type: "text",
                    align: "center",
                    width: 180
                },
                {
                    name: "MIKTAR",
                    title: "SİPARİŞ MİKTARI",
                    type: "text",
                    align: "center",
                    width: 180
                },
                {
                    name: "TUTARKDVHARIC",
                    title: "TUTAR KDV HARİÇ",
                    type: "text",
                    align: "center",
                    width: 250
                },
                {
                    name: "TUTARKDVDAHIL",
                    title: "TUTAR KDV DAHİL",
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
            height: "400px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.IslemDetayListe,
            fields: 
            [
                {
                    name: "MIKTAR",
                    title: "MIKTAR",
                    type: "text",
                    align: "center",
                    width: 180
                },
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
                    title: "SİPARİŞ MİKTARI",
                    type: "text",
                    align: "center",
                    width: 250
                },
                {
                    name: "TESLIMMIKTAR",
                    title: "TESLİM MİKTARI",
                    type: "text",
                    align: "center",
                    width: 250
                },
                {
                    name: "TESLIMEDILMEYENMIKTAR",
                    title: "TESLİM EDİLMEYEN MİKTAR",
                    type: "text",
                    align: "center",
                    width: 250
                },
                {
                    name: "BFIYAT",
                    title: "BİRİM FIYAT",
                    type: "text",
                    align: "center",
                    width: 180
                },
                {
                    name: "TUTAR",
                    title: "TUTAR",
                    type: "text",
                    align: "center",
                    width: 180
                }
            ],
            rowClass: function(item, itemIndex) 
            {
                return item.TESLIMEDILMEYENMIKTAR <= 0 ? 'bg-green' : 'bg-red';
            }
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
            $scope.AraToplam += value.sip_tutar;
            $scope.ToplamIndirim += (value.sip_iskonto_1 + value.sip_iskonto_2 + value.sip_iskonto_3 + value.sip_iskonto_4 + value.sip_iskonto_5 + value.sip_iskonto_6);
            $scope.ToplamKdv +=  (value.sip_tutar - (value.sip_iskonto_1 + value.sip_iskonto_2 + value.sip_iskonto_3 + value.sip_iskonto_4 + value.sip_iskonto_5 + value.sip_iskonto_6)) * (value.TOPTANVERGI / 100);
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
        $scope.EvrakTip = "0";
        $scope.SipTip = "0";
        $scope.Carikodu = "";
        $scope.ToplamSatir = "";
        $scope.IlkTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.SonTarih = moment(new Date()).format("DD.MM.YYYY");

        $scope.CariListe = [];
        $scope.IslemListe = [];
        $scope.IslemDetayListe = [];

        InitCariGrid();
        IslemGrid();
        IslemDetayGrid();
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
            $scope.Loading = false;
            $scope.TblLoading = true;
            $scope.CariListe = data;      
            $("#TblCari").jsGrid({data : $scope.CariListe});
        });
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

        if($scope.SipTip == 0)
        {
            str = " AND sip_miktar >= 1";
        }
        else if ($scope.SipTip == 1)
        {
            str = " AND sip_miktar - sip_teslim_miktar = 0";
        }
        else
        {
            str = " AND sip_miktar <> sip_teslim_miktar ";
        }

        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "SELECT " +
                    "sip_evrakno_seri + ' - ' +CONVERT(NVARCHAR(25),sip_evrakno_sira) AS [SERI-SIRA], " +
                    "sip_evrakno_seri AS SERI," +
                    "sip_evrakno_sira AS SIRA," +
                    "sip_musteri_kod AS CARIKOD, " +
                    "(SELECT cari_unvan1 FROM CARI_HESAPLAR WHERE cari_kod = sip_musteri_kod) AS CARIADI, " +
                    "SUM(sip_miktar) AS MIKTAR, " +
                    "CONVERT(NVARCHAR,sip_belge_tarih,104) AS TARIH, " +
                    "CONVERT(NVARCHAR,CAST(SUM(sip_tutar)  AS DECIMAL(10,2))) AS TUTARKDVHARIC, " +
                    "CONVERT(NVARCHAR,CAST(SUM(sip_tutar) + SUM(sip_vergi) AS DECIMAL(10,2))) AS TUTARKDVDAHIL " +
                    "FROM SIPARISLER " +
                    "WHERE ((sip_musteri_kod = @KODU) OR (@KODU = '')) AND sip_belge_tarih >= @ILKTARIH AND sip_belge_tarih <= @SONTARIH AND sip_tip = @TIP"+ str +
                    "GROUP BY sip_evrakno_seri,sip_evrakno_sira,sip_musteri_kod,sip_belge_tarih ORDER BY sip_belge_tarih DESC" ,
            param:  ['KODU','ILKTARIH','SONTARIH','TIP'], 
            type:   ['string|25','date','date','int'], 
            value:  [$scope.Carikodu,$scope.IlkTarih,$scope.SonTarih,$scope.Tip]
        }

        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.IslemListe = Data;
            console.log(Data)
            $("#TblCariFoy").jsGrid({data : $scope.IslemListe});
        });
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
                        "sip_evrakno_seri + ' - ' +CONVERT(NVARCHAR(25),sip_evrakno_sira) AS [SERI-SIRA], " +
                        "sip_evrakno_seri AS SERI, " +
                        "sip_evrakno_sira AS SIRA, " +
                        "sip_musteri_kod AS CARIKOD, " +
                        "sip_stok_kod AS STOKKODU, " +
                        "ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod = sip_stok_kod),'') AS STOKADI," +
                        "ISNULL((SELECT dbo.fn_StokBirimi(sip_stok_kod,sip_birim_pntr)),'') AS BIRIM, " +
                        "sip_miktar AS SIPMIKTAR, " +
                        "sip_teslim_miktar AS TESLIMMIKTAR, " +
                        "sip_miktar - sip_teslim_miktar AS TESLIMEDILMEYENMIKTAR, " +
                        "sip_miktar AS MIKTAR, " +
                        "sip_satirno AS SATIRNO,  " +
                        "sip_b_fiyat AS BFIYAT, " +
                        "CONVERT(NVARCHAR,sip_belge_tarih,104) AS TARIH, " +
                        "(SELECT dbo.fn_VergiYuzde (sip_vergi_pntr)) AS TOPTANVERGI, " +
                        "ROUND(sip_tutar,4) AS TUTAR,* " +
                        "FROM SIPARISLER  WHERE sip_evrakno_seri = @SERI AND sip_evrakno_sira = @SIRA ORDER BY sip_satirno ASC",
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
    }
}