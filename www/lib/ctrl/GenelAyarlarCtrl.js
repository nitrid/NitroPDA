function GenelAyarlarCtrl($scope,$window,db)
{

    $scope.Init = function()
    {

        $scope.SqlServer =''
        $scope.SqlDatabase =''
        $scope.SqlKullanici =''
        $scope.SqlSifre = ''
    
        
        $scope.ConfigGetir()

        
    }

    $scope.ConfigGetir = function()
    {
        db.Emit('ConfigRead','',function(ConfigData)
        {
            $scope.SqlServer = ConfigData.server
            $scope.SqlDatabase = ConfigData.database
            $scope.SqlKullanici = ConfigData.uid
        });
    }
    $scope.Kaydet = function()
    {
        

        let SqlAyarlar = 
        {
            server:$scope.SqlServer,
            database:$scope.SqlDatabase,
            uid:$scope.SqlKullanici,
            pwd:$scope.SqlSifre,
            trustedConnection : false,
        } 
        db.Emit('ConfigSave',SqlAyarlar,function(status)
        {
            console.log(status)
            $scope.FirmaTemizle();
        }); 
    }
    $scope.BtnMain = function()
    {
        var url = "main.html";
        $window.location.href = url;
    }
}