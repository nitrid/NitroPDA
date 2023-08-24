function Login ($scope,$rootScope,$window,db)
{
    let UserSelectedRow = null;
    let Firma = "";
    let UserParam;
    $scope.server_adress = localStorage.host;
    $scope.IsDbCreateWorking = false;
    $scope.TransferEventProgress = 0;    
    $scope.FirmLock = false;    
    $scope.KulLock = false;
    $rootScope.MessageBox = function(pMsg)
    {
        alertify.alert(pMsg);
    }
    function UserControl()
    {
        for(i = 0;i < Param.length;i++)
        {
            if(Param[i].Kullanici == $scope.Kullanici )
            {
                return true;
            }
        }
        return false;
    }
    function UserControl2()
    {
        for(x = 0;x < Param.length;x++)
        {
            if($scope.Kullanici == Param[x].Kullanici)
            {
                console.log(Param[x].Kullanici)
                if(Param[x].Sifre == $scope.Password)
                {
                    console.log("asdas")
                    return true;
                }
            }
        }
        return false;
    }
    function InitUserGrid()
    {
        $("#TblUser").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : Param,
            paging : true,
            pageSize: 30,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: [
                {
                    name: "Kullanici",
                    title: "KULLANICI ADI",
                    type: "text",
                    align: "center",
                    width: 125
                },
                {
                    name: "MikroId",
                    title: "MIKRO ID",
                    type: "text",
                    align: "center",
                    width: 200
                }, 
            ],
            rowClick: function(args)
            {
                $scope.UserListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    $scope.UserListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( UserSelectedRow ) { UserSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        UserSelectedRow = $row;
        
        $scope.Kullanici = Param[pIndex].Kullanici;
        console.log($('#MdlUserList').modal)
        setTimeout(function(){$('#MdlUserList').modal('hide');},100);

    }
    $scope.Init = function()
    {   
        InitUserGrid();
        console.log($window.document.getElementById("TblUser"))
        $scope.Firm = ""
        gtag('config', 'UA-12198315-14', 
        {
            'page_title' : 'Login',
            'page_path': '/Login'
        });
        console.log(Param)
        $scope.Kullanici = localStorage.username;
        $scope.Password = localStorage.Password;
        $scope.SecilenFirmalar = []
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
        }
        
        if(typeof Param[$window.sessionStorage.getItem('User')] != 'undefined')
        { 
            UserParam.Sistem.Firma = localStorage.Firma
        }
        
        $scope.DepoNo = 1;
        if(localStorage.username != '' && localStorage.Password != '')
        {
            if(typeof localStorage.username != 'undefined' && typeof localStorage.Password != 'undefined')
            {
                document.getElementById("BeniHatirla").checked = true;
                document.getElementById("Sifirla").checked = true;
                $scope.FirmaClick();
                $scope.KulLock = true;
            }
        }

        if (typeof localStorage.host == 'undefined')
        {
            localStorage.mode = "true";
            $scope.server_adress = window.location.hostname;
            $scope.HostSettingSave();
        }
        $scope.switchValue = localStorage.mode === "true" ? true : false; // Başlangıçta true olarak ayarla
        setTimeout(function () 
        {
            new Switchery(document.querySelector('.js-switch'));
        },500)
        // Switchery'yi etkinleştirme

        $scope.$watch('switchValue', function(newVal) {
            console.log('Switch değeri değişti: ' + newVal);
        });
    }
    $scope.HostSettingSave = function()
    {
        localStorage.host = $scope.server_adress;

        db.SetHost($scope.server_adress);
        $window.location.reload();
    }
    $scope.BtnEntry = function()
    {
        if($scope.Firm == "" )
        {
            alertify.alert("Lütfen Firma Seçiniz");
        }
        else
        {
            if(document.getElementById("BeniHatirla").checked == true)
            {
                console.log(localStorage.username,localStorage.Password,$scope.Kullanici,$scope.Password)
                if(localStorage.username != $scope.Kullanici || localStorage.Password != $scope.Password) 
                {
                    if($scope.FirmaClick(2))
                    {
                        $window.sessionStorage.setItem('Firma', $scope.Firm);
                        var url = "main.html";
                        $window.location.href = url;
                        localStorage.username = $scope.Kullanici
                        localStorage.Password = $scope.Password
                    }
                }
                else
                {
                    $window.sessionStorage.setItem('Firma', $scope.Firm);
                    var url = "main.html";
                    $window.location.href = url;
                    localStorage.username = $scope.Kullanici
                    localStorage.Password = $scope.Password
                }
            }
            else
            {
                localStorage.username = "";
                localStorage.Password = "";
                $window.sessionStorage.setItem('Firma', $scope.Firm);
                var url = "main.html";
                $window.location.href = url;
            }
        }
    }
    $scope.FirmaClick = function(pParam)
    {
        if(pParam == 0)
        {
            UserControl()
        }
        else if(pParam == 1)
        {
            UserControl()
            UserControl2()
        }
        else
        {
            if(UserControl() && UserControl2())
            {                    
                $window.sessionStorage.setItem('User', i);
                UserParam = Param[$window.sessionStorage.getItem('User')];
                if(localStorage.mode == 'true')
                {
                    db.Connection(function(data)
                    {       
                        if(data == true)
                        {
                            $('#alert').alert('close');                    
                            $scope.ConfigControl();
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
                                        $scope.FirmList = data.result.recordset;
                                    }
                                    else
                                    {
                                        if(UserParam.Sistem.FirmaListe == "")
                                        {
                                            $scope.FirmList = data.result.recordset;
                                        }
                                        else
                                        {
                                            let FirmDizi = UserParam.Sistem.FirmaListe.split(',')
                                            console.log(FirmDizi)
                                            FirmDizi.forEach(SipItem => 
                                                    {
                                                        console.log(SipItem)
                                                        $scope.SecilenFirmalar = []
                                                        $scope.SecilenFirmalar.push({FIRM: SipItem})
                                                    });
                                            $scope.FirmList = $scope.SecilenFirmalar       
                                        }
                                    }
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
                    $scope.FirmList = JSON.parse(localStorage.localDb);
                    setTimeout(function () 
                    {
                        $('select').selectpicker('refresh');
                    },500)
                }
                return true;
            }
            else
            {
                alertify.okBtn("Tamam");
                alertify.alert("Kullanıcı adı veya şifre yanlış");
                return false;
            }
        } 

    }
    $scope.BtnExit = function()
    {
        navigator.app.exitApp();
    }
    $scope.BtnTryConnect = function()
    {
        db.SetHost($scope.server_adress);

        if(localStorage.mode == 'false')
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
        console.log(UserControl())
        if(UserControl() == false)
        {
            alertify.okBtn("Tamam");
            alertify.alert("Kullanıcı adı veya şifre yanlış");
            $('#vt-aktarim').modal("hide");
        }
        else
        {
            if(localStorage.mode == 'false')
            {
                $('#vt-aktarim').modal("show");
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
    
                                setTimeout(function () 
                                {
                                    $('select').selectpicker('refresh');
                                },500)
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
    
                        setTimeout(function () 
                        {
                            $('select').selectpicker('refresh');
                        },500)
                        alertify.alert("Online Mod'da Çalıştırılamaz")
                        return;
                    }
                });
            }
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
                db.LocalDb.Filter.STOK = [UserParam.Sistem.OfflineDepo,'','','','','','','','','','']
                db.LocalDb.Filter.STOK2 = [UserParam.AlinanSiparis.DepoNo,'','','','','','','','','','']
                db.LocalDb.Filter.PARAM = [pMenuData,UserParam.Sistem.OfflineDepo,new Date(),UserParam.AlinanSiparis.Seri,UserParam.SatisFatura.Seri,UserParam.SatisIrsaliye.Seri]
                //QuerySql.StokTbl.value = [$scope.DepoNo];
                db.LocalDb.Filter.PARTI  = [UserParam.Sistem.OfflineDepo];
                QuerySql.NakliyeOnayTbl.value = [UserParam.Sistem.OfflineDepo];

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
    $scope.ChangeMode = function()
    {
        localStorage.mode = $scope.switchValue
        
        $window.location.reload();
    }
    $scope.SifirlaMode = function()
    {
       $scope.KulLock = document.getElementById("Sifirla").checked
    }
    $scope.ConfigControl = function()
    {
        db.Emit('ConfigRead','',function(ConfigData)
        {
            if(ConfigData.server == "")
            {
                $('#sql-settings').modal("show");
            }
            else
            {
            }
        });
    }
    $scope.ConfigSave = function()
    {
        let SqlAyarlar = 
        {
            server:$scope.server,
            database:$scope.database,
            uid:$scope.kullanici,
            pwd:$scope.sifre,
            trustedConnection : false,
            firm: ""
        }
        db.Emit('ConfigSave',SqlAyarlar,function(status)
        {
            console.log(status)
        });
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