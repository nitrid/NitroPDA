function AlisSatisRaporuCtrl($scope,$window,db)
{   

    function InitAlisSatisRaporGrid()
    {   
        $("#TblAlisSatisRaporGrid").jsGrid
        ({
            width: "100%",
            height: "300px",
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
                    title: "SERI SIRA",
                    type: "text",
                    align: "center",
                    width: 120
                },
                {
                    name: "CARIADI",
                    title: "CARI",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "TIP",
                    title: "TİP",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "TUTAR",
                    title: "TUTAR",
                    type: "text",
                    align: "center",
                    width: 200
                },
            ],
            rowClick: function(args)
            {

            }
        });
    }
    $scope.Init = function()
    {   
        console.log(123)
        $scope.Firma = $window.sessionStorage.getItem('Firma');
        UserParam = Param[$window.sessionStorage.getItem('User')];
        
        $scope.IlkTarih = moment(new Date(new Date().getFullYear(), 0, 1)).format("DD.MM.YYYY");
        $scope.SonTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.Bakiye = 0;
        $scope.RaporTip = "0";
        $scope.EvrakTip = "3";

        $scope.ToplamBakiye = 0;
        
        $scope.CariFoyListe = [];

        InitAlisSatisRaporGrid();
    }
    $scope.BtnGetir = function()
    {
        console.log($scope.RaporTip)
        let TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  
            "SELECT sth_evrakno_seri + '-' + CONVERT (NVARCHAR,sth_evrakno_sira) AS SERISIRA," +
            "sth_cari_kodu AS CARI," +
            "(select cari_unvan1 from CARI_HESAPLAR WHERE cari_kod=sth_cari_kodu) AS CARIADI, " + //İÇ SELECT, GÖRÜYORSUNUZ ANLATMAYA GEREK YOK 
            "sth_cari_kodu AS CARIKODU, " +
            "CASE WHEN sth_normal_iade = 0 THEN 'NORMAL' ELSE 'İADE' END AS TIP," + //CASE WHEN, İF ELSE GİBİ ÇALIŞIR KOŞUL VERİLİR(WHEN koşul), O KOŞUL GERÇEKLEŞTİĞİNDE (THEN sonuç) "bunu" yap denir. 
            "sum(sth_tutar) AS TUTAR," +
            "CONVERT (NVARCHAR,sth_tarih,104) AS TARIH " + //CONVERT, TARIH FORMATINI DEĞİŞTİRMEK İÇİN KULLANILDI. AYNI ZAMANDA BİR VERİYİ HERHANGİ BİR DEĞİŞKEN TİPİNE DÖNÜŞTÜRMEK İÇİN DE KULLANILIR.
            "FROM STOK_HAREKETLERI WHERE sth_tarih >= @ILKTARIH AND sth_tarih <= @SONTARIH AND " + //TARİHE GÖRE FİLTRELEME
            "sth_tip = @TIP AND sth_cins = 0 AND sth_evraktip = @EVRAKTIP " + // SATIŞ FATURASI OLANLARI GETİR
            "GROUP BY sth_evrakno_seri,sth_evrakno_sira,sth_cari_kodu,sth_normal_iade,sth_tarih ", //AYNI DEĞERLERE SAHİP OLANLARI GRUPLA/TEK Bİ SATIR OLARAK GETİR
            param:  ['ILKTARIH','SONTARIH','TIP','EVRAKTIP'],
            type:   ['date','date','int','int'], 
            value:  [$scope.IlkTarih,$scope.SonTarih,$scope.RaporTip,$scope.EvrakTip]
        }

        db.GetDataQuery(TmpQuery,function(Data)
        {

            $scope.CariFoyListe = Data;       
            if(Data.length > 0)
            {
                $scope.CariFoyListe = Data;
                $("#TblAlisSatisRaporGrid").jsGrid({data : $scope.CariFoyListe});
                $scope.ToplamBakiye = parseFloat(db.SumColumn($scope.CariFoyListe,"TUTAR")).toFixed(2)
            }
            else
            {
                alertify.alert("Veri bulunamadı");
                $scope.ToplamBakiye = "0"
            }    
            
            $("#TblAlisSatisRaporGrid").jsGrid({data : $scope.CariFoyListe});
        });
    }
    $scope.RaporTipChange = function()
    {
        console.log($scope.RaporTip,$scope.EvrakTip)
        if($scope.RaporTip == "1")
        {
            $scope.EvrakTip = "4";
        }
        else
        {
            $scope.EvrakTip = "3";
        }
        $("#TblAlisSatisRaporGrid").jsGrid({data : []});
        $scope.ToplamBakiye = 0;
    }
    
}