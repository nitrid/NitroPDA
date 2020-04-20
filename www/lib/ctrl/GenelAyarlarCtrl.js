function GenelAyarlarCtrl($scope,$window,db)
{

    $scope.Init = function()
    {

        $scope.SqlServer =''
        $scope.SqlDatabase =''
        $scope.SqlKullanici =''
        $scope.SqlSifre = '' 

        $scope.FirmaGetir();
        $scope.ConfigGetir()
        console.log(1)
    }
    $scope.FirmaGetir = function()
    {
        db.Emit('QMikroDb',QuerySql.Firma,(data) =>
        {
            if(typeof data.result.err == 'undefined')
            {
                setTimeout(function () 
                {
                    $('select').selectpicker('refresh');
                },500)
               
                /*else
                {
                    $scope.Firm = UserParam.Sistem.Firma;
                }*/
                $scope.User = "0";
                $scope.FirmList = data.result.recordset;
                $scope.UserList = Param;
                console.log($scope.FirmList)
            }
            else
            {
                console.log("Mikro Sql Query Çalıştırma Hatası : " + data.result.err);
            }
        });
    }
    $scope.ConfigGetir = function()
    {
        db.Emit('ConfigRead','',function(ConfigData)
        {
            $scope.SqlServer = ConfigData.server
            $scope.SqlDatabase = ConfigData.database
            $scope.SqlKullanici = ConfigData.uid
            $scope.SqlSifre = ConfigData.pwd
        });
    }
    $scope.SqlClick = function()
    {
        $("#TbSql").addClass('active');
        $("#TbBaglanti").removeClass('active');
        $("#TbFirma").removeClass('active');
    }
    $scope.BaglantiClick = function()
    {
        $("#TbBaglanti").addClass('active');
        $("#TbSql").removeClass('active');
        $("#TbFirma").removeClass('active');
    }
    $scope.FirmaClick = function()
    {
        $("#TbFirma").addClass('active');
        $("#TbBaglanti").removeClass('active');
        $("#TbSql").removeClass('active');
    }
    $scope.Kaydet = function()
    {
        console.log($scope.SqlServer)
        let SqlAyarlar = 
        {
            server:$scope.SqlServer,
            database:$scope.SqlDatabase,
            uid:$scope.SqlKullanici,
            pwd:$scope.SqlSifre,
            trustedConnection : false,
            firm: ""
        }
        db.Emit('ConfigSave',SqlAyarlar,function(status)
        {
            console.log(status)
        });
    }
}