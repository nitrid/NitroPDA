function BankaRaporCtrl($scope,$window,db)
{   
    function InitBankaRaporGrid()
    {   
        $("#TblBankaListe").jsGrid
        ({
            width: "100%",
            height: "300px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.BankaListe,
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
                    name: "SUBE",
                    title: "SUBE",
                    type: "text",
                    align: "center",
                    width: 120
                    
                },
                {
                    name: "HESAPNO",
                    title: "HESAPNO",
                    type: "text",
                    align: "center",
                    width: 120
                    
                },
                {
                    name: "HESAPTIPI",
                    title: "TIP",
                    type: "text",
                    align: "center",
                    width: 120
                    
                },
                {
                    name: "BAKIYE",
                    title: "BAKIYE",
                    type: "number",
                    align: "center",
                    width: 120
                },
                {
                    name: "DOVIZ",
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

        InitBankaRaporGrid();
    }
    $scope.BtnGetir = function()
    {
        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query: 
            "SELECT [msg_S_0070] AS ADI, " +
            "[msg_S_0822] AS SUBE, " +
            "[msg_S_0771] AS HESAPNO, " +
            "[msg_S_0559] AS HESAPTIPI, " +
            "[msg_S_0833\\T] AS BAKIYE, " +
            "[msg_S_0254] AS DOVIZ " +
            "FROM BANKALAR_YONETIM ", 
        }
        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.BankaListe = Data;
            $("#TblBankaListe").jsGrid({data : $scope.BankaListe})
            $scope.ToplamBakiye = parseFloat(db.SumColumn($scope.BankaListe,"TOPLAM")).toFixed(2)
        });
    }
}