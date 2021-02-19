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
            "FROM dbo.fn_CariFoy('',0,'',0,'20200101','20200101','20211231',0,'') WHERE [#msg_S_0103\\T] < 0 ORDER BY [#msg_S_0200],[msg_S_0098] ASC " +
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
            "FROM dbo.fn_CariFoy('',0,'',0,'20200101','20200101','20211231',0,'') WHERE [#msg_S_0103\\T] > 0 ORDER BY [#msg_S_0200],[msg_S_0098] ASC " +
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
            " SELECT CONVERT(VARCHAR(10), VADE_TARIH, 104) AS TARIH, " +
            "DATEDIFF(day,CAST(CAST(GETDATE() AS DATE) AS DATETIME),VADE_TARIH) AS GECEN_GUN, " +
            "SIRA AS SIRA, SERI AS SERI, " +
            "(SELECT cari_unvan1 FROM CARI_HESAPLAR WHERE cari_kod = CARIKODU) AS UNVAN , " +
            " convert(varchar,cast(TUTAR as money), 1) AS  TUTAR " +
            "FROM  #FatTmp WHERE TUTAR > 0 --AND  VADE_TARIH >= @ILKTARIH AND VADE_TARIH <= @SONTARIH " ,
            param:  ['ILKTARIH','SONTARIH'],
            type:   ['date','date',],
            value:  [$scope.IlkTarih,$scope.SonTarih]
        }

        db.GetDataQuery(TmpQuery,function(Data)
        {
            console.log(Data)
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