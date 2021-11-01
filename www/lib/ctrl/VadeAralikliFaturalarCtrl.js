function VadeAralikliFaturalarCtrl($scope,$window,db)
{   
    let CariSelectedRow = null;
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
                    title: "GEÇEN GÜN",
                    type: "text",
                    align: "center",
                    width: 120
                },             
            ],
        });
    }
    $scope.Init = function()
    { 
        $scope.Firma = $window.sessionStorage.getItem('Firma');
        UserParam = Param[$window.sessionStorage.getItem('User')];//DD.MM.YYYY
        
        $scope.IlkTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.SonTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.Bakiye = 0;
        $scope.CariAdi = '';
        $scope.Carikodu = '';
        $scope.TxtCariAra = '';
        $scope.CmbCariAra = 0;
        
        $scope.VadeAralikliFaturaListe = [];

        InitCariGrid()
        InitVadeAralikGrid();
    }
    $scope.CariListeRowClick = function(pIndex,pItem,pObj)
    {
        if(!$scope.EvrakLock)
        {
            if ( CariSelectedRow ) { CariSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
            var $row = pObj.rowByItem(pItem);
            $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
            CariSelectedRow = $row;
            
            $scope.CariAdi = $scope.CariListe[pIndex].UNVAN1;
            $scope.Carikodu =$scope.CariListe[pIndex].KODU;
            $scope.MainClick();
        }
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
            $("#TblCari").jsGrid({pageIndex: true})
        });
    }
    $scope.CariSecClick = function() 
    {
        $("#TbCari").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbDetay").removeClass('active');
    }
    $scope.deneme = function()
    {
        $scope.TumFaturalar = []
        let TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "SELECT cha_kod FROM CARI_HESAP_HAREKETLERI WHERE cha_tarihi  >= @ILKTARIH AND cha_tarihi  <= @SONTARIH GROUP BY cha_kod",
            param:  ['ILKTARIH','SONTARIH'],
            type:   ['date','date',],
            value:  [$scope.IlkTarih,$scope.SonTarih]
        }

        db.GetDataQuery(TmpQuery,function(Data)
        {
            for(i = 0;i < Data.length;i++)
            $scope.BtnVadeAralikliFaturaGetir(Data[i].cha_kod)
        });
    }
    $scope.BtnVadeAralikliFaturaGetir = function()
    {
       

        let TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:   "IF OBJECT_ID('tempdb..#TahTmp') IS NOT NULL DROP TABLE #TahTmp " +
            "IF OBJECT_ID('tempdb..#FatTmp') IS NOT NULL DROP TABLE #FatTmp " +
            " " +
            "CREATE TABLE #TahTmp " +
            "( " +
            "    GUID UNIQUEIDENTIFIER, " +
            "    TARIH DATETIME, " +
            "    VADE_TARIH DATETIME, " +
            "    SERI NVARCHAR(10), " +
            "    SIRA INT, " +
            "    TIP NVARCHAR(10), " +
            "    EVRAKTIP NVARCHAR(50), " +
            "    CARIKODU NVARCHAR(50), " +
            "    VADEGUN INT, " +
            "    TUTAR FLOAT, " +
            "    ORJINAL_TUTAR FLOAT, " +
            "    KAPATAN_SERI NVARCHAR(20), " +
            "    KAPATAN_SIRA INT " +
            ") " +
            " " +
            "INSERT INTO #TahTmp (GUID,TARIH,VADE_TARIH,SERI,SIRA,TIP,EVRAKTIP,CARIKODU,VADEGUN,TUTAR,ORJINAL_TUTAR,KAPATAN_SERI,KAPATAN_SIRA)  " +
            "SELECT  " +
            "CASE WHEN [#msg_S_0200] = '' THEN NEWID() ELSE [#msg_S_0088] END AS [#msg_S_0088], " +
            "[msg_S_0089],  " +
            "[msg_S_0098], " +
            "[msg_S_0090], " +
            "[msg_S_0091], " +
            "1, " +
            "[msg_S_0094], " +
            "[#msg_S_0200], " +
            "[msg_S_0099], " +
            "[#msg_S_0103\\T],  " +
            "[#msg_S_0103\\T], " +
            "'', " +
            "0 " +
            "FROM dbo.fn_CariFoy('',0,@carikodu,0,'20200101','20200101','20211231',0,'') WHERE [#msg_S_0103\\T] < 0 ORDER BY [#msg_S_0200],[msg_S_0098] ASC " +
            " " +
            "CREATE TABLE #FatTmp " +
            "( " +
            "    GUID UNIQUEIDENTIFIER, " +
            "    TARIH DATETIME, " +
            "    VADE_TARIH DATETIME, " +
            "    SERI NVARCHAR(10), " +
            "    SIRA INT, " +
            "    TIP NVARCHAR(10), " +
            "    EVRAKTIP NVARCHAR(50), " +
            "    CARIKODU NVARCHAR(50), " +
            "    VADEGUN INT, " +
            "    TUTAR FLOAT, " +
            "    ORJINAL_TUTAR FLOAT, " +
            "    KAPATAN_SERI NVARCHAR(20), " +
            "    KAPATAN_SIRA INT, " +
            "    BAKIYE FLOAT " +
            ") " +
            " " +
            "INSERT INTO #FatTmp (GUID,TARIH,VADE_TARIH,SERI,SIRA,TIP,EVRAKTIP,CARIKODU,VADEGUN,TUTAR,ORJINAL_TUTAR,KAPATAN_SERI,KAPATAN_SIRA,BAKIYE)  " +
            "SELECT  " +
            "CASE WHEN [#msg_S_0200] = '' THEN NEWID() ELSE [#msg_S_0088] END AS [#msg_S_0088], " +
            "[msg_S_0089],  " +
            "[msg_S_0098], " +
            "[msg_S_0090], " +
            "[msg_S_0091], " +
            "0, " +
            "[msg_S_0094], " +
            "[#msg_S_0200], " +
            "[msg_S_0099], " +
            "[#msg_S_0103\\T], " +
            "[#msg_S_0103\\T],  " +
            "'', " +
            "0, " +
            "dbo.fn_CariHesapBakiye(0,0,[#msg_S_0200],'','',0,0,0,0,0,0) " +
            "FROM dbo.fn_CariFoy('',0,@carikodu,0,'20200101','20200101','20211231',0,'') WHERE [#msg_S_0103\\T] > 0 ORDER BY [#msg_S_0200],[msg_S_0098] ASC " +
            " " +
            "DECLARE @TahGuid UNIQUEIDENTIFIER, @TahTutar FLOAT,@TahSeri NVARCHAR(20),@TahSira INT " +
            "DECLARE @FatGuid UNIQUEIDENTIFIER, @FatTutar FLOAT,@FatSeri NVARCHAR(20),@FatSira INT " +
            " " +
            "DECLARE TahCursor CURSOR  " +
            "FOR " +
            "SELECT GUID,TUTAR,SERI,SIRA FROM #TahTmp ORDER BY CARIKODU,TARIH ASC " +
            "OPEN TahCursor " +
            "FETCH NEXT FROM TahCursor INTO @TahGuid,@TahTutar,@TahSeri,@TahSira " +
            "WHILE @@FETCH_STATUS = 0 " +
            "BEGIN " +
            "    DECLARE FatCursor CURSOR  " +
            "    FOR " +
            "    SELECT GUID,TUTAR,SERI,SIRA FROM #FatTmp ORDER BY CARIKODU,TARIH ASC " +
            "    OPEN FatCursor " +
            " " +
            "    FETCH NEXT FROM FatCursor INTO @FatGuid,@FatTutar,@FatSeri,@FatSira " +
            "    WHILE @@FETCH_STATUS = 0 " +
            "    BEGIN " +
            "        IF @TahTutar * -1 > 0 AND @FatTutar > 0 " +
            "        BEGIN " +
            "            SET @FatTutar = @FatTutar + @TahTutar " +
            "            PRINT @FatTutar " +
            "            IF @FatTutar < 0 " +
            "            BEGIN			 " +
            "                UPDATE #FatTmp SET TUTAR = 0,KAPATAN_SERI = @TahSeri,KAPATAN_SIRA = @TahSira WHERE GUID = @FatGuid " +
            "                UPDATE #TahTmp SET TUTAR = @FatTutar * -1 WHERE GUID = @TahGuid " +
            "                " +
            "                SET @TahTutar = @FatTutar " +
            "                SET @FatTutar = 0 " +
            "            END " +
            "            ELSE " +
            "            BEGIN				 " +
            "                UPDATE #FatTmp SET TUTAR = @FatTutar WHERE GUID = @FatGuid " +
            "                UPDATE #TahTmp SET TUTAR = 0 WHERE GUID = @TahGuid " +
            " " +
            "                SET @TahTutar = 0 " +
            "            END " +
            "        END " +
            "         " +
            "        PRINT CONVERT(NVARCHAR,@FatTutar) + ' - ' + CONVERT(NVARCHAR,@TahTutar) " +
            "        FETCH NEXT FROM FatCursor INTO @FatGuid,@FatTutar,@FatSeri,@FatSira " +
            "    END " +
            "     " +
            "    CLOSE FatCursor " +
            "    DEALLOCATE FatCursor " +
            " " +
            "    FETCH NEXT FROM TahCursor INTO @TahGuid,@TahTutar,@TahSeri,@TahSira " +
            "END " +
            "CLOSE TahCursor " +
            "DEALLOCATE TahCursor " +
            " " +
            " SELECT  ISNULL((SELECT cha_tarihi FROM CARI_HESAP_HAREKETLERI WHERE cha_evrakno_seri = KAPATAN_SERI and cha_evrakno_sira = KAPATAN_SIRA and cha_kod = @carikodu and cha_tip = 1),GETDATE()) AS KAPANMATARIH, CONVERT(VARCHAR(10), VADE_TARIH, 104) AS TARIH, " +
            "DATEDIFF(day,CAST(CAST(ISNULL((SELECT cha_tarihi FROM CARI_HESAP_HAREKETLERI WHERE cha_evrakno_seri = KAPATAN_SERI and cha_evrakno_sira = KAPATAN_SIRA AND cha_tip = 1),GETDATE()) AS DATE) AS DATETIME),VADE_TARIH) AS GECEN_GUN, " +
            "SIRA AS SIRA, SERI AS SERI, " +
            "(SELECT cari_unvan1 FROM CARI_HESAPLAR WHERE cari_kod = CARIKODU) AS UNVAN , " +
            " convert(varchar,cast(ORJINAL_TUTAR as money), 1) AS  TUTAR " +
            "FROM  #FatTmp   ORDER BY VADE_TARIH" ,
            param:  ['carikodu','ILKTARIH','SONTARIH'],
            type:   ['string|50','date','date',],
            value:  [$scope.Carikodu,$scope.IlkTarih,$scope.SonTarih]
        }
       
        db.GetDataQuery(TmpQuery,function(Data)
        {
            console.log(Data)
                $scope.VadeAralikliFaturaListe = Data 
                $("#TblVadeAralikliFatura").jsGrid({data : $scope.VadeAralikliFaturaListe});
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
    $scope.ExcelExport = function()
    {
         
            $scope.ExcelDataListesi = $scope.VadeAralikliFaturaListe

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
            fileName:"ExtreRapor",
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