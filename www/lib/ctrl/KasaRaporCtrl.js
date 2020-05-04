function KasaRaporCtrl($scope,$window,db)
{   

    function InitKasaRaporGrid()
    {   
        $("#TblKasaListe").jsGrid
        ({
            width: "100%",
            height: "300px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.KasaListe,
            fields: 
            [
              
                {
                    name: "ADI",
                    title: "ADI",
                    type: "text",
                    align: "center",
                    width: 120
                },
                {
                    name: "TIP",
                    title: "TIP",
                    type: "text",
                    align: "center",
                    width: 120
                    
                },
                {
                    name: "DOVIZSEMBOL",
                    title: "DOVIZ CINSI",
                    type: "number",
                    align: "center",
                    width: 120
                },
                {
                    name: "ANADOVIZ",
                    title: "BAKIYE",
                    type: "number",
                    align: "center",
                    width: 120
                },

            ],
        });
    }
    $scope.Init = function()
    {   
        $scope.Firma = $window.sessionStorage.getItem('Firma');
        UserParam = Param[$window.sessionStorage.getItem('User')];

        $scope.Loading = false;
        $scope.TblLoading = true;

        InitKasaRaporGrid();
    }
    $scope.BtnGetir = function()
    {
        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query: 
            "select msg_S_0954 AS TIP, " +
            "msg_S_0955 AS KODU, " +
            "msg_S_0956 AS ADI, " +
            "msg_S_0044 AS MUHKODU, " +
            "CONVERT(NVARCHAR,CAST([msg_S_0957\\T] AS DECIMAL(10,2))) AS ANADOVIZ, " +
            "[msg_S_0957\\T] AS TOPLAM, " +
            "CONVERT(NVARCHAR,CAST([msg_S_1714\\T] AS DECIMAL(10,2))) AS ALTERNATIFDOVIZ, " +
            "CONVERT(NVARCHAR,CAST([msg_S_0959\\T] AS DECIMAL(10,2))) AS ORJINALDOVIZ, " +
            "msg_S_0254 AS DOVIZSEMBOL " +
            "from KASALAR_YONETIM " 
        }
        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.KasaListe = Data;
            $("#TblKasaListe").jsGrid({data : $scope.KasaListe})
            $scope.ToplamBakiye = parseFloat(db.SumColumn($scope.KasaListe,"TOPLAM")).toFixed(2)
            console.log($scope.ToplamBakiye)
            
        });
    }
}