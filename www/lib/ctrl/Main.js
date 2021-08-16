 function Main ($scope,$rootScope,$window,db)
{
    $scope.Firma = $window.sessionStorage.getItem('Firma');
    $scope.User = $window.sessionStorage.getItem('User');
    let UserParam;
    $rootScope.Lock = false;
    $rootScope.LoadingShow = function() 
    {
        $rootScope.Lock = true;
        $("#loading").show();
    }
    $rootScope.LoadingHide = function() 
    {
        $rootScope.Lock = false;
        $("#loading").hide();
    }
    $rootScope.MessageBox = function(pMsg)
    {
        alertify.alert(pMsg);
    }
    function MenuOlustur(MenuData)
    {   
        let HtmlText = "<li class='site-menu-category'>" + MenuData.Menu.Name + "</li>";
        
        for(i = 0;i < MenuData.Menu.Item.length;i++)
        {
            if(MasterMenuControl(MenuData.Menu.Item[i]))
            {
                HtmlText = HtmlText + "<li class='site-menu-item has-sub'>";
           
                HtmlText = HtmlText + "<a href='javascript:void(0)'>";
                HtmlText = HtmlText + "<i class='site-menu-icon " + MenuData.Menu.Item[i].Icon + "'></i>";
                HtmlText = HtmlText + "<span class='site-menu-title'>" + MenuData.Menu.Item[i].Name + "</span>";
                HtmlText = HtmlText + "<span class='site-menu-arrow'></span>";
                HtmlText = HtmlText + "</a>";
                HtmlText = HtmlText + "<ul class='site-menu-sub'>";

                for(x = 0;x < MenuData.Menu.Item[i].Item.length;x++)
                {
                    if(Param[$scope.User].Menu[MenuData.Menu.Item[i].Item[x].Name] == "1")
                    {
                        HtmlText = HtmlText + "<li class='site-menu-item'>";
                        HtmlText = HtmlText + "<a class='animsition-link' href='" + MenuData.Menu.Item[i].Item[x].Link + "'>";
                        HtmlText = HtmlText + "<span class='site-menu-title'>" + MenuData.Menu.Item[i].Item[x].Name + "</span>";
                        HtmlText = HtmlText + "</a></li>";
                    }
                }
                
                HtmlText = HtmlText + "</ul>";
                HtmlText = HtmlText + "</li>";
            }
        }

        if($scope.User == "0")
        {
            HtmlText = HtmlText + "<li class='site-menu-category'>Yönetici Paneli</li>";
            HtmlText = HtmlText + "<li class='site-menu-item has-sub'>";
            HtmlText = HtmlText + "<a href='javascript:void(0)'>";
            HtmlText = HtmlText + "<i class='site-menu-icon'></i>";
            HtmlText = HtmlText + "<span class='site-menu-title'> Ayarlar</span>";
            HtmlText = HtmlText + "<span class='site-menu-arrow'></span>";
            HtmlText = HtmlText + "</a>";
            HtmlText = HtmlText + "<ul class='site-menu-sub'>";

            HtmlText = HtmlText + "<li class='site-menu-item'>";
            HtmlText = HtmlText + "<a class='animsition-link' href='#!KullaniciParametre'>";
            HtmlText = HtmlText + "<span class='site-menu-title'>Kullanıcı ve Parametreler</span>";
            HtmlText = HtmlText + "</a></li>";

            HtmlText = HtmlText + "<li class='site-menu-item'>";
            HtmlText = HtmlText + "<a class='animsition-link' href='#!GenelAyarlar'>";
            HtmlText = HtmlText + "<span class='site-menu-title'>Genel Ayarlar</span>";
            HtmlText = HtmlText + "</a></li>";

            HtmlText = HtmlText + "</ul>";
            HtmlText = HtmlText + "</li>";
        }
        $("#menu").html(HtmlText);     
    }
    function MasterMenuControl(MenuData)
    {        
        for(x = 0;x < MenuData.Item.length;x++)
        {            
            if(Param[$scope.User].Menu[MenuData.Item[x].Name] == "1")
            {
                return true;
            }
        }
        return false;
    }
    $scope.BtnMain = function()
    {
        var url = "main.html";
        $window.location.href = url;
    }
    $scope.Init = function()
    {
        UserParam = Param[$window.sessionStorage.getItem('User')];
        $scope.DepoNo = 1;
        if(typeof localStorage.FaturaParam != 'undefined')
        {
            localStorage.removeItem("FaturaParam");
        }
        if(localStorage.mode == 'true')
        {
            db.Connection(function(data)
            {
                db.Emit('GetMenu','',function(MenuData)
                {
                    MenuOlustur(JSON.parse(MenuData));
                });    
            });
        }
        else
        {
            db.LocalDb.OpenDatabase($scope.Firma);

            db.LocalDb.Execute(QueryLocal.ParamGetir,[],function(MenuData)
            {
                MenuOlustur(JSON.parse(MenuData.result.recordset[0].MENUDATA));
            });
        }
    }
    $scope.BtnMenuDbTransfer = async function()
    {   
        $scope.Firm = $window.sessionStorage.Firma;
        if(localStorage.mode == 'false')
        {
            $('#vt-aktarim').modal("show");
            let Status = await db.ConnectionPromise()
            if(!Status)
            {
                alertify.okBtn("Tamam");
                alertify.alert("Bağlantı Problemi !");
                return;
            }
            db.Connection(function(data)
            {
                if(data == true)
                {
                    $scope.IsDbCreateWorking = false;
                    $scope.TransferEventMaster = "";
                    $scope.TransferEventAlt = "";
                    $scope.TransferEventProgress = 0;
                    db.Emit('QMikroDb',QuerySql.Firma,(data) =>
                    {
                        if(typeof data.result.err == 'undefined')
                        {
                            $scope.VtFirm = $scope.Firm;
                            $scope.VtFirmList = data.result.recordset;
                            db.Disconnect();

                            setTimeout(function () 
                            {
                                $('select').selectpicker('refresh');
                            },500)
                            $scope.BtnDbCreate();
                        }
                    });
                }
            });
        }
        else
        {
            alertify.okBtn("Tamam");
            alertify.alert("Online Mod'da iken çalıştıramazsın");
        }
    }
    $scope.BtnDbCreate = function()
    {    
        db.Connection(function()
        {
            $scope.IsDbCreateWorking = true;
            $scope.TransferEventMaster = "";
            $scope.TransferEventAlt = "";
            $scope.TransferEventProgress = 0;
            
            db.Emit('GetMenu','',function(pMenuData)
            {
                db.LocalDb.Filter.STOK = [$scope.DepoNo,'','','','','','','','','','']
                db.LocalDb.Filter.PARAM = [pMenuData,UserParam.Sayim.DepoNo,new Date(),UserParam.AlinanSiparis.Seri,UserParam.SatisFatura.Seri,UserParam.SatisIrsaliye.Seri]
                //QuerySql.StokTbl.value = [$scope.DepoNo];
                db.LocalDb.Filter.PARTI  = [$scope.DepoNo];
                QuerySql.NakliyeOnayTbl.value = [$scope.DepoNo];

                db.LocalDb.OpenDatabase($scope.VtFirm,function(data)
                {
                    if(data == 2)
                    {
                        if(typeof localStorage.localDb == 'undefined')
                        {
                            localStorage.localDb = JSON.stringify(JSON.parse('[{"FIRM" : "' + $scope.VtFirm + '"}]'));                            
                        }
                        else
                        {
                            let TmpDbArr = JSON.parse(localStorage.localDb);
                            let DuplicArr = TmpDbArr.filter(function(item)
                            {
                                if(item.FIRM == $scope.VtFirm)
                                {
                                    return item
                                }
                            });
                            
                            if(DuplicArr.length == 0)
                            {
                                TmpDbArr.push({"FIRM" : $scope.VtFirm });
                                localStorage.localDb = JSON.stringify(TmpDbArr);
                            }
                        }
                        
                        db.SafeApply($scope,function()
                        {
                            $scope.Firma = JSON.parse(localStorage.localDb)[0].FIRM;
                            $scope.User = "0";
                            $scope.FirmaList = JSON.parse(localStorage.localDb);
                            $scope.UserList = Param;                        
                            $scope.IsDbCreateWorking = false;      
                        });  
                        
                        db.Disconnect();
                        angular.element('#vt-aktarim').modal('hide');
                        alertify.alert("<a style='color:#3e8ef7''>" + $scope.DepoNo + " " + "'nolu Deponun Stok Aktarımı Tamamlandı.. !" + "</a>" );
                        
                    }
                                    
                });
            });

            
        });
        if(db.SocketConnected)
        {
            
            //$scope.$apply();
        }
    }
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