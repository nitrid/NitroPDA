function CariListeCtrl($scope,$window,db)
{
    function Init()
    {
        $scope.Firma = $window.sessionStorage.getItem('Firma');

        $scope.CariKodu = "";
        $scope.CariAdi = "";
        $scope.CariAdres = "";
    }
    $scope.YeniEvrak = function ()
    {
        Init();
    }
    $scope.EvrakGetir = function ()
    {
        db.GetData($scope.Firma,'RptCariListe',[],function(data)
        {
            Init();

            $scope.CariKodu = data[0].cari_kod;
        })
    }
}