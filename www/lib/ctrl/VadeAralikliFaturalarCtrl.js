function VadeAralikliFaturalarCtrl($scope,$window,db)
{   

    function InitVadeAralikGrid()
    {   
        $("#TblVadeAralikliFatura").jsGrid
        ({
            width: "100%",
            height: "auto",
            updateOnResize: true,
            heading: true,
            selecting: true,
            pageSize: 15,
            pageButtonCount: 3,
            data : $scope.VadeAralikliFaturaListe,
            fields: 
            [
                {
                    name: "UNVAN",
                    title: "UNVAN",
                    type: "text",
                    align: "center",
                    width: 120
                    
                },
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
                    type: "text",
                    align: "center",
                    width: 120
                },
                {
                    name: "TIP",
                    title: "EVRAK TİP",
                    type: "text",
                    align: "center",
                    width: 200
                },
           
                {
                    name: "TUTAR",
                    title: "BORÇ",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "TARIH",
                    title: "VADE TARİHİ",
                    type: "date",
                    align: "center",
                    width: 200
                },
                {
                    name: "GECEN_GUN",
                    title: "KALAN TARİH",
                    type: "text",
                    align: "center",
                    width: 120
                },             
            ],
        });
    }
    $scope.Init = function()
    {   console.log(123)
        $scope.Firma = $window.sessionStorage.getItem('Firma');
        UserParam = Param[$window.sessionStorage.getItem('User')];//DD.MM.YYYY
        
        $scope.IlkTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.SonTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.Bakiye = 0;

        $scope.VadeAralikliFaturaListe = [];

        InitVadeAralikGrid();
    }
    $scope.BtnVadeAralikliFaturaGetir = function()
    {
       

        let TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "SELECT *,CONVERT(VARCHAR(10), VADE_TARIHI, 104) AS TARIH, " +
                    "DATEDIFF(day,CAST(CAST(GETDATE() AS DATE) AS DATETIME),VADE_TARIHI) AS GECEN_GUN FROM " +
                    "(SELECT cha_evrakno_sira AS SIRA, cha_evrakno_seri AS SERI, " +
                    "CASE WHEN cha_vade > 1000 THEN CONVERT (datetime,convert(char(8),cha_vade)) ELSE ( cha_tarihi - cha_vade) END AS VADE_TARIHI, " +
                    "(SELECT cari_unvan1 FROM CARI_HESAPLAR WHERE cari_kod = CARI_HESAP_HAREKETLERI.cha_kod) AS UNVAN, " +
                    "(SELECT [dbo].fn_CariHarEvrTipUzun(cha_evrak_tip)) AS TIP, " +
                    "ROUND(cha_meblag,2,1) AS TUTAR " +
                    "FROM CARI_HESAP_HAREKETLERI WHERE cha_evrak_tip = '63' ) AS TMP WHERE VADE_TARIHI > @ILKTARIH AND VADE_TARIHI < @SONTARIH " ,
            param:  ['ILKTARIH','SONTARIH'],
            type:   ['date','date',],
            value:  [$scope.IlkTarih,$scope.SonTarih]
        }

        db.GetDataQuery(TmpQuery,function(Data)
        {
            if($scope.VadeAralikliFaturaListe.length >= 0)
            {
                $scope.VadeAralikliFaturaListe = Data;                
                $scope.Bakiye = db.SumColumn($scope.VadeAralikliFaturaListe,"TUTAR");
    
                $("#TblVadeAralikliFatura").jsGrid({data : $scope.VadeAralikliFaturaListe});
            }
            else
            {
                alertify.alert("Bu Tarihler Arasında Fatura Bulunamadı")
            }
        });
    }
    $scope.MainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbCari").removeClass('active');
    }
    $scope.BtnTemizle = function()
    {
        $scope.CariAdi = "";
        $scope.Carikodu = "";
    }
}