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
                    name: "SERI",
                    title: "SERİ",
                    type: "text",
                    align: "center",
                    width: 120
                    
                },
                {
                    name: "SIRA",
                    title: "SIRA",
                    type: "number",
                    align: "center",
                    width: 120
                },
                {
                    name: "CARIKOD",
                    title: "CARI KODU",
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
                    title: "MIKTAR",
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
            height: "300px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.IslemDetayListe,
            fields: 
            [
                {
                    name: "SERI",
                    title: "SERİ",
                    type: "text",
                    align: "center",
                    width: 120
                    
                },
                {
                    name: "SIRA",
                    title: "SIRA",
                    type: "number",
                    align: "center",
                    width: 120
                },
                {
                    name: "SATIRNO",
                    title: "SATIR NO",
                    type: "text",
                    align: "center",
                    width: 180
                },
                {
                    name: "MIKTAR",
                    title: "MIKTAR",
                    type: "text",
                    align: "center",
                    width: 180
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
        });
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
            $("#TblCari").jsGrid({data : $scope.CariListe});
        });
    }
    $scope.BtnGetir = function()
    {
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
            $scope.SiparisOnayListele = "-1";
        }
        else
        {
            $scope.SiparisOnayListele = "0";
        }

        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "SELECT " +
                    "sip_evrakno_seri AS SERI, " +
                    "sip_evrakno_sira AS SIRA, " +
                    "sip_musteri_kod AS CARIKOD, " +
                    "SUM(sip_miktar) AS MIKTAR, " +
                    "CONVERT(NVARCHAR,sip_belge_tarih,104) AS TARIH, " +
                    "ROUND(SUM(sip_tutar),2) AS TUTAR " +
                    "FROM SIPARISLER " +
                    "WHERE ((sip_musteri_kod = @KODU) OR (@KODU = '')) AND sip_belge_tarih >= @ILKTARIH AND sip_belge_tarih <= @SONTARIH AND sip_tip = @TIP AND sip_OnaylayanKulNo <> @ONAYLAYANKULNO " +
                    "GROUP BY sip_evrakno_seri,sip_evrakno_sira,sip_musteri_kod,sip_belge_tarih ORDER BY sip_belge_tarih DESC" ,
            param:  ['KODU','ILKTARIH','SONTARIH','TIP','ONAYLAYANKULNO'], 
            type:   ['string|25','date','date','int','int'], 
            value:  [$scope.Carikodu,$scope.IlkTarih,$scope.SonTarih,$scope.Tip,$scope.SiparisOnayListele]
        }

        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.IslemListe = Data;
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
                        "sip_evrakno_seri AS SERI, " +
                        "sip_evrakno_sira AS SIRA, " +
                        "sip_musteri_kod AS CARIKOD, " +
                        "sip_miktar AS MIKTAR, " +
                        "sip_satirno AS SATIRNO, " + 
                        "sip_b_fiyat AS BFIYAT, " + 
                        "CONVERT(NVARCHAR,sip_belge_tarih,104) AS TARIH, " +
                        "ROUND(sip_tutar,4) AS TUTAR " +
                        "FROM SIPARISLER WHERE sip_evrakno_seri = @SERI AND sip_evrakno_sira = @SIRA ORDER BY sip_satirno ASC",
                param:  ['SERI','SIRA'], 
                type:   ['string|25','int'], 
                value:  [$scope.Seri,$scope.Sira]
            }

            db.GetDataQuery(TmpQuery,function(Data)
            {
                $scope.IslemDetayListe = Data;
                $("#TblIslemDetay").jsGrid({data : $scope.IslemDetayListe});
            });
        }
        $("#MdlIslemDetay").modal('show');
    }
}