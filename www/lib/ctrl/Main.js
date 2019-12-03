 function Main ($scope,$rootScope,$window,db)
{
    $scope.Firma = $window.sessionStorage.getItem('Firma');
    $scope.User = $window.sessionStorage.getItem('User');
    console.log(1)

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
            HtmlText = HtmlText + "<span class='site-menu-title'>Kullanıcı Ayarları</span>";
            HtmlText = HtmlText + "<span class='site-menu-arrow'></span>";
            HtmlText = HtmlText + "</a>";
            HtmlText = HtmlText + "<ul class='site-menu-sub'>";

            HtmlText = HtmlText + "<li class='site-menu-item'>";
            HtmlText = HtmlText + "<a class='animsition-link' href='#!KullaniciParametre'>";
            HtmlText = HtmlText + "<span class='site-menu-title'>Kullanıcı ve Parametreler</span>";
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
    $scope.Init = function()
    {
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
}