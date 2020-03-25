function Login ($scope,$rootScope,$window,db)
{
    let Firma = "";
    $scope.server_adress = localStorage.host;
    $scope.server_port = localStorage.port;
    $scope.socket_port = localStorage.socketport;        
    $scope.IsDbCreateWorking = false;
    $scope.TransferEventProgress = 0;    
    $scope.FirmLock = false

    $scope.Init = function()
    {   
        gtag('config', 'UA-12198315-14', 
        {
            'page_title' : 'Login',
            'page_path': '/Login'
        });
        $scope.Kullanici = localStorage.username
        for(i = 0;i < Param.length;i++)
        {
            if(Param[i].Kullanici == $scope.Kullanici)
            {
                $window.sessionStorage.setItem('User', i);  
            }
        }
        UserParam = Param[$window.sessionStorage.getItem('User')];
        
        if(typeof Param[$window.sessionStorage.getItem('User')] != 'undefined')
        {
            Firma = UserParam.Sistem.Firma
            console.log(Firma)
        }
        
        if(typeof Param[$window.sessionStorage.getItem('User')] != 'undefined')
        { 
            UserParam.Sistem.Firma = localStorage.Firma
            $scope.Firm = UserParam.Sistem.Firma;
        }
        
        $scope.DepoNo = "";
        
        $scope.Password = localStorage.Password

        if(typeof localStorage.username != 'undefined' && typeof localStorage.Password != 'undefined')
        {
            document.getElementById("BeniHatirla").checked = true;
            //Firma = localStorage.Firma;
        }

        if (typeof localStorage.host == 'undefined')
        {
            localStorage.mode = "true";
            $scope.server_adress = "pda.tone.ist";            
            $scope.server_port = "8089";
            $scope.socket_port = "8091";
            $scope.HostSettingSave();
        }
        
        if(localStorage.mode == 'true')
        {
            db.Connection(function(data)
            {       
                if(data == true)
                {
                    $('#alert').alert('close');

                    db.Emit('QMikroDb',QuerySql.Firma,(data) =>
                    {
                        if(typeof data.result.err == 'undefined')
                        {
                            setTimeout(function () 
                            {
                                $('select').selectpicker('refresh');
                            },500)
                            if(Firma != '')
                            {
                                $scope.Firm = Firma;
                                $scope.FirmLock = true
                            }
                            /*else
                            {
                                $scope.Firm = UserParam.Sistem.Firma;
                            }*/
                            $scope.User = "0";
                            $scope.FirmList = data.result.recordset;
                            $scope.UserList = Param;
                        }
                        else
                        {
                            console.log("Mikro Sql Query Çalıştırma Hatası : " + data.result.err);
                        }
                    });
                }
                else
                {
                    $('#alert-box').html('<div class="alert alert-icon alert-danger alert-dismissible" role="alert" id="alert">' +
                    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
                    '<span aria-hidden="true">&times;</span>' +
                    '</button>' +
                    '<i class="icon wb-bell" aria-hidden="true"></i> Sunucuya erişim sağlanamadı.' +
                    '<p class="mt-15">' +
                    '<button class="btn btn-primary" data-target="#server-settings" data-toggle="modal"' +
                    'type="button">Ayarlar</button></p></div>');
                    db.Disconnect();
                }
            });
        }
        else
        {
            $scope.Firm = JSON.parse(localStorage.localDb)[0].FIRM;
            $scope.User = "0";
            $scope.FirmList = JSON.parse(localStorage.localDb);
            $scope.UserList = Param;
        }
    }
    $scope.HostSettingSave = function()
    {
        localStorage.host = $scope.server_adress;
        localStorage.port = $scope.server_port;
        localStorage.socketport = $scope.socket_port;

        db.SetHost($scope.server_adress,$scope.socket_port);
        $window.location.reload();
    }
    $scope.BtnEntry = function()
    {
        console.log(Param)
        for(i = 0;i < Param.length;i++)
        {
            console.log($scope.Firm)
            if( typeof $scope.Firm !=  "undefined")
            {
                if(Param[i].Kullanici == $scope.Kullanici && Param[i].Sifre == $scope.Password)
                {
                    
                    console.log("Kullanıcı adı ve şifre doğru");
                    
                    $window.sessionStorage.setItem('Firma', $scope.Firm);
                    $window.sessionStorage.setItem('User', i);
                    
                    if(document.getElementById("BeniHatirla").checked == true)
                    {
                        localStorage.username = $scope.Kullanici
                        localStorage.Password = $scope.Password
                        //localStorage.Firma = $scope.Firm
                    }
                    var url = "main.html";
                    $window.location.href = url;
                    return;
                } 
            }
            else
            {
                alertify.alert("Firmanın yüklenmesini bekleyin"); 
                return;  
            }   
        }  
        
        alertify.okBtn("Tamam");
        alertify.alert("Kullanıcı adı veya şifre yanlış");
    }
    $scope.BtnExit = function()
    {
        navigator.app.exitApp();
    }
    $scope.BtnTryConnect = function()
    {
        db.SetHost($scope.server_adress,$scope.socket_port);

        if(localStorage.mode == 'true')
        {
            db.Disconnect();
        }

        db.Connection(function(data)
        {
            if(data == true)
            {
                $scope.ConnectionStatus = 'Bağlantı Başarılı.';

                if(localStorage.mode == 'false')
                {
                    db.Disconnect();
                }
            }
            else
            {
                $scope.ConnectionStatus = 'Bağlantı Başarısız.';
                db.Disconnect();
            }
            $scope.$apply();            
        });
    }
    $scope.BtnMenuDbTransfer = function()
    {   
        if(localStorage.mode == 'false')
        {
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
                            $scope.VtFirm = data.result.recordset[0].FIRM;
                            $scope.VtFirmList = data.result.recordset;
                            db.Disconnect();
                        }
                    });
                }
            });
        }
        else
        {
            $scope.IsDbCreateWorking = false;
            $scope.TransferEventMaster = "";
            $scope.TransferEventAlt = "";
            $scope.TransferEventProgress = 0;

            db.Emit('QMikroDb',QuerySql.Firma,(data) =>
            {
                if(typeof data.result.err == 'undefined')
                {
                    $scope.VtFirm = data.result.recordset[0].FIRM;
                    $scope.VtFirmList = data.result.recordset;
                }
            });
        }
    }
    $scope.BtnDbCreate = function()
    {    
        db.Connection(function()
        {
            let MenuData = "";
            $scope.IsDbCreateWorking = true;
            $scope.TransferEventMaster = "";
            $scope.TransferEventAlt = "";
            $scope.TransferEventProgress = 0;

            db.Emit('GetMenu','',function(pMenuData)
            {
                MenuData = pMenuData;
            });

            QuerySql.StokTbl.value = [$scope.DepoNo];
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
                    
                    db.LocalDb.Execute(QueryLocal.ParamInsert,[MenuData]);

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
        if(db.SocketConnected)
        {
            
            //$scope.$apply();
        }
    }
    $scope.ChangeMode = function()
    {
        localStorage.mode = document.getElementById('inputBasicOn').checked;
        $window.location.reload();
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