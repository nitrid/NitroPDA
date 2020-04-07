function GenelAyarlarCtrl($scope,$window,db)
{
    let KullaniciSelectedRow = null;
    let DGetir = false;
    let File = "./www/lib/Param.js";

    $scope.Init = function()
    {
        $scope.SqlClick()
        $scope.FirmaGetir();
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
    $scope.KullaniciListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( KullaniciSelectedRow ) { KullaniciSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        KullaniciSelectedRow = $row;
        $scope.KullaniciListeSelectedIndex = pIndex;
    }
    $scope.Kaydet = function()
    {
        if (DGetir)
        {
            Param[$scope.KullaniciListeSelectedIndex].Kullanici = $scope.Kullanici;
            Param[$scope.KullaniciListeSelectedIndex].Sifre = $scope.Sifre;
            Param[$scope.KullaniciListeSelectedIndex].MikroId = $scope.MikroId;
        }
        else
        {
            Param.push(JSON.parse(JSON.stringify(CreateParam())));
            Param[Param.length-1].Kullanici = $scope.Kullanici;
            Param[Param.length-1].Sifre = $scope.Sifre;
            Param[Param.length-1].MikroId = $scope.MikroId;
        }
        
        db.Emit('ParamSave',[Param,File]);
        
        $window.location.reload();
    }
    $scope.BtnYeni = function ()
    {
        DGetir = false;

        $scope.Kullanici = "";
        $scope.Sifre = "";
        $scope.MikroId = "";
    }
    $scope.BtnParametre = function()
    {
        $("#Grup1").hide();
        $("#Grup2").show();
        
        $scope.CmbParamList = [];

        for(i = 0; i < Object.keys(Param[$scope.KullaniciListeSelectedIndex]).length;i++)
        {
            if(typeof Object.values(Param[$scope.KullaniciListeSelectedIndex])[i] == "object")
            {
                $scope.CmbParamList.push({Name : Object.keys(Param[$scope.KullaniciListeSelectedIndex])[i]});
                $scope.Kullanici = $scope.KullaniciListe[$scope.KullaniciListeSelectedIndex].Kullanici;
            }
        }

        $scope.CmbParamChange();
    }

    $scope.BtnParamKaydet = function()
    {
        let ParamData = GetParamObject($scope.ParamName);
        for(i = 0; i < Object.keys(ParamData).length;i++)
        {
            Param[$scope.KullaniciListeSelectedIndex][$scope.ParamName][Object.keys(ParamData)[i]] = document.getElementById(Object.keys(ParamData)[i]).value;
        }

        console.log(File)
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Parametreleri kayıt etmek istediğinize eminmisiniz ?', 
        function()
        {             
            db.Emit('ParamSave',[Param,File]);
            $("#Grup2").show();
            alertify.okBtn('Tamam');
            alertify.alert('Ayarlar kaydedildi');
        }
        ,function(){});
    }
}