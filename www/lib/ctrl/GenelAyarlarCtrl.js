function GenelAyarlarCtrl($scope,$window,db)
{

    $scope.Init = function()
    {

        $scope.SqlServer =''
        $scope.SqlDatabase =''
        $scope.SqlKullanici =''
        $scope.SqlSifre = ''
        $scope.CmbFirm = 
        {
            FirmaListe : []
        }; 

        
        $scope.FirmaGetir();
        $scope.ConfigGetir()

        
        $scope.SecilenFirmalar = [];
    }
    $scope.selectpicker = function () 
    {
        $('select').selectpicker('refresh');
    }

    $scope.FirmaGetir = function()
    {
        db.Emit('QMikroDb',QuerySql.Firma,(data) =>
        {
            if(typeof data.result.err == 'undefined')
            {           
                {
                    $scope.Firm = "";
                }
                $scope.User = "0";
                $scope.FirmList = data.result.recordset;
                $scope.UserList = Param;
                console.log($scope.FirmList)
                setTimeout($scope.selectpicker,100)
                console.log($scope.FirmList.FIRM)
               
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
            $scope.CmbFirm.FirmaListe = ConfigData.firm2
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
        for (let i = 0; i < $scope.CmbFirm.FirmaListe.length; i++)
        {
            $scope.SecilenFirmalar.push({FIRM: $scope.CmbFirm.FirmaListe[i]})
            console.log($scope.SecilenFirmalar)
        }

        console.log($scope.SqlServer)
        let SqlAyarlar = 
        {
            server:$scope.SqlServer,
            database:$scope.SqlDatabase,
            uid:$scope.SqlKullanici,
            pwd:$scope.SqlSifre,
            trustedConnection : false,
            firm: $scope.SecilenFirmalar,
            firm2 : $scope.CmbFirm.FirmaListe
        } 
        db.Emit('ConfigSave',SqlAyarlar,function(status)
        {
            console.log(status)
            $scope.FirmaTemizle();
        }); 

        // FİRMALAR LOGİN SAYFASINDA GELMESİ İÇİN OBJE OLARAK GENEL AYARLARDA GÖZÜKMESİ İCİN DİZİ OLARAK KAYIT EDİLİYOR // EKREM-RECEP 20.04.2020 

 
    }
    $scope.FirmaTemizle = function()
    {
        $scope.SecilenFirmalar = []
    }
    $scope.BtnMain = function()
    {
        var url = "main.html";
        $window.location.href = url;
    }
}