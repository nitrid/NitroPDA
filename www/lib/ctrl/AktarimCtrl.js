function AktarimCtrl($scope,$window,db)
{
    $scope.Firma = $window.sessionStorage.getItem('Firma');
    $scope.User = $window.sessionStorage.getItem('User');
    let UserParam = null;
    let EvrakParam = null;
    

    function Init()
    {
        UserParam = Param[$window.sessionStorage.getItem('User')];


        $scope.StokDepoNo = UserParam.Sistem.AktarimDepoNo
        $scope.AnaGrup1 = "";
        $scope.AnaGrup2 = "";
        $scope.AltGrup1 = "";
        $scope.AltGrup2 = "";
        $scope.Uretici1 = "";
        $scope.Uretici2 = "";
        $scope.Sektor1 = "";
        $scope.Sektor2 = "";
        $scope.Marka1 = "";
        $scope.Marka2 = "";
        $scope.Grup1 = "";
        $scope.Grup2 = "";
        $scope.Bolge1 = "";
        $scope.Bolge2 = "";
        $scope.Temsilci1 = "";
        $scope.Temsilci2 = "";
        $scope.CSektor1 = "";
        $scope.CSektor2 = "";


        $scope.StokChec = false;
        $scope.CariChec = false;
        $scope.SipChec = false;
        $scope.NakChec = false;
        $scope.DBDelete = true;

        db.LocalDb.On('TransferEvent',function(e)
        {   
            db.SafeApply($scope,function()
            {
                $scope.TransferEventMaster = e.MasterMsg;
                $scope.TransferEventAlt = e.AltMsg;
                if(typeof e.Status != 'undefined')
                {
                    $scope.TransferEventProgress = (e.Status.index / e.Status.count) * 100;
                }        
            });     
        });
    }
    $scope.YeniEvrak = function ()
    {
        Init();
    }
    $scope.BtnStokAktar  = function ()
    {   if($scope.StokChec == true)
        {
            QuerySql.StokTbl.value = [$scope.StokDepoNo,$scope.AnaGrup1 ,$scope.AnaGrup2 ,$scope.AltGrup1 ,$scope.AltGrup2 ,$scope.Uretici1 ,$scope.Uretici2 ,$scope.Sektor1,$scope.Sektor2 ,$scope.Marka1 ,$scope.Marka2]
            db.Connection(function(pStatus)
            {
                if(pStatus == true)
                {   
                    db.LocalDb.DataStokTransfer($scope.DBDelete,function(data)
                    {
                        console.log(data)
                    });
                }
            });
        }
    }
    $scope.BtnCariAktar  = function ()
    {   if($scope.CariChec == true)
        { QuerySql.CariTbl.value = [$scope.Grup1,$scope.Grup2,$scope.Bolge1,$scope.Bolge2,$scope.Temsilci1,$scope.Temsilci2,$scope.CSektor1,$scope.CSektor2]
            db.Connection(function(pStatus)
            {
                if(pStatus == true)
                {   
                    db.LocalDb.DataCariTransfer($scope.DBDelete,function(data)
                    {
                        console.log(data)
                    });
                }
            });
        }
    }
    $scope.BtnSipAktar  = function ()
    {   if($scope.SipChec == true)
        {
            db.Connection(function(pStatus)
            {
                if(pStatus == true)
                {   
                    db.LocalDb.DataSipTransfer($scope.DBDelete,function(data)
                    {
                        console.log(data)
                    });
                }
            });
        }
    }
    $scope.BtnNakAktar  = function ()
    {   if($scope.NakChec == true)
        { QuerySql.NakliyeOnayTbl.value = $scope.StokDepoNo
            db.Connection(function(pStatus)
            {
                if(pStatus == true)
                {   
                    db.LocalDb.DataNakTransfer($scope.DBDelete,function(data)
                    {
                        console.log(data)
                    });
                }
            });
        }
    }
    $scope.Aktar = function ()
    {
        db.Connection(function(pStatus)
        {
            if(pStatus == true)
            {   
                db.LocalDb.DataTransfer(function(data)
                {
                    console.log(data)
                });
            }
        });
    }
    $scope.BtnTopluAktar = function ()
    {
        if($scope.StokChec == true)
        {
            $scope.BtnStokAktar()
        }
        if($scope.CariChec == true)
        {
            $scope.BtnCariAktar()
        }
        if($scope.SipChec == true)
        {
            $scope.BtnSipAktar()
        }
        if($scope.NakChec == true)
        {
            $scope.BtnNakAktar()
        }
        
        $scope.Aktar()
    }

    db.LocalDb.On('TransferEvent',function(e)
    {   
        console.log(e);
        db.SafeApply($scope,function()
        {
            $scope.TransferEventMaster = e.MasterMsg;
            $scope.TransferEventAlt = e.AltMsg;
            if(typeof e.Status != 'undefined')
            {
                $scope.TransferEventProgress = (e.Status.index / e.Status.count) * 100;
            }        
            
        });     
    });
}