function RotaCtrl($scope,$window,$timeout,db)
{
    let CariSelectedRow = null;
    let CariSelectedRoww = null;
    function Init()
    {
        $scope.Firma = $window.sessionStorage.getItem('Firma');
        UserParam = Param[$window.sessionStorage.getItem('User')];
        //STRING/TEXT
        $scope.CariKodu = "";
        $scope.ZiyaretKodu = "";
        $scope.CariAdi = "";
        $scope.TxtCariAra = "";
        //SAYISAL
        $scope.CariBakiye = 0;
        $scope.AdresNo = 0;

        //DİZİ/LİSTE
        $scope.CariListe = [];

        //BOOLEAN/KONTROL
        $scope.Personel = UserParam.Sistem.PlasiyerKodu;
        $scope.Loading = false;
        $scope.TblLoading = true;
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
                    name: "CARIKOD",
                    type: "number",
                    align: "center",
                    width: 100
                },
                {
                    name: "CARIAD",
                    type: "text",
                    align: "center",
                    width: 300
                },
                {
                    name: "ZIYARETKOD",
                    type: "text",
                    align: "center",
                    width: 200
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
            },
            rowClass: function(item, itemIndex)
            { 
                if(item.TAMAMLANDI == true)
                {
                    return itemIndex = 'bg-green';
                }
            }
        });
    }
    $scope.YeniEvrak = function()
    {
        Init();
        InitCariGrid();
        $scope.BtnCariListele();
    }
    $scope.BtnCariListele = function()
    {   
        $scope.Loading = true;
        $scope.TblLoading = false;
        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "SELECT " +
            "zyrt_CariKodu as CARIKOD, " +
            "(SELECT cari_unvan1 FROM CARI_HESAPLAR WHERE cari_kod = zyrt_CariKodu) AS CARIAD, " +
            "(SELECT (SELECT dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,cari_doviz_cinsi,0,0,0,0) FROM CARI_HESAPLAR WHERE cari_kod = zyrt_CariKodu)) AS BAKIYE, " +
            "(SELECT ISNULL((SELECT dbo.fn_DovizSembolu(ISNULL(cari_doviz_cinsi,0))),'')  FROM CARI_HESAPLAR WHERE cari_kod = zyrt_CariKodu) AS DOVIZSEMBOL, " +
            "zyrt_kodu AS ZIYARETKOD, " +
            "zyrt_PersonelKodu AS PLASIYER, " +
            "zyrt_AdresNo AS ADRES, " + 
            "zyrt_tamamlandi_fl AS TAMAMLANDI "+
            "FROM ZIYARET_HAREKETLERI AS ZIYARET " +
            "INNER JOIN CARI_HESAP_ADRESLERI AS ADRES ON  " +
            "ADRES.adr_cari_kod = ZIYARET.zyrt_CariKodu AND  ADRES.adr_adres_no = ZIYARET.zyrt_AdresNo " +
            "WHERE zyrt_bas_zamani >= '20201222' AND zyrt_bit_zamani <= '20201223' AND zyrt_PersonelKodu = @PLASIYER " +
            "ORDER  BY ADRES.adr_uzaklik_kodu ASC ",
            param:  ["PLASIYER"],
            type:   ["int"],
            value:  [$scope.Personel]
        }
        db.GetPromiseQuery(TmpQuery,function(data)
        {   
            var TamamlananRow = "";
            $scope.CariListe = data;

            
            if($scope.CariListe.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;    
                $("#TblCari").jsGrid({data : $scope.CariListe});
                $("#TblCari").jsGrid({pageIndex : true});
                
            }
            else
            {
                alertify.alert("Cari Bulunamadı")
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblCari").jsGrid({data : $scope.CariListe});
                $("#TblCari").jsGrid({pageIndex : true});
            }
        });
    }
    $scope.CariListeRowClick = function(pIndex,pItem,pObj)
    {
            if ( CariSelectedRow ) { CariSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
            var $row = pObj.rowByItem(pItem);
            $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
            CariSelectedRow = $row;
            
            $scope.CariKodu = $scope.CariListe[pIndex].CARIKOD;
            $scope.CariAdi = $scope.CariListe[pIndex].CARIAD;
            $scope.ZiyaretKodu = $scope.CariListe[pIndex].ZIYARETKOD;
            $scope.Adres = $scope.CariListe[pIndex].ADRES;
    }
    $scope.EvrakGit = function(pData)
    {
        db.Rota =
        {
            Kodu: $scope.CariKodu,
            Adi: $scope.CariAdi,
            Adres: $scope.Adres,
            Ziyaret: $scope.ZiyaretKodu
        }
        if(pData == 0)
        {
            //FATURA
            var url = "main.html#!/SatisFatura";
            $window.location.href = url;
        }
        else if(pData == 1)
        {
            var url = "main.html#!/TahsilatMakbuzu";
            $window.location.href = url;
        }
        else if(pData == 2)
        {
            var url = "main.html#!/SatisIrsaliye";
            $window.location.href = url;
        }
        else if(pData == 3)
        {
            var url = "main.html#!/AlinanSiparis";
            $window.location.href = url;
        }
    }
}