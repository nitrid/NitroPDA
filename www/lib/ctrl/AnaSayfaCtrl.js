function AnaSayfaCtrl($scope,$window,$timeout,db)
{
    $scope.Firma = $window.sessionStorage.getItem('Firma');
    $scope.User = $window.sessionStorage.getItem('User');
    $scope.Loading = true;
    function MenuOlustur(MenuData)
    {   
        let MenuList = [];
        let HtmlText = "";

        for(i = 0;i < MenuData.Menu.Item.length;i++)
        {
            for(x = 0;x < MenuData.Menu.Item[i].Item.length;x++)
            {   
                if(Param[$scope.User].Menu[MenuData.Menu.Item[i].Item[x].Name] == "1")
                {
                    
                    MenuList.push(MenuData.Menu.Item[i].Item[x])
                }
            }
        }

        for(i = 0; i < MenuList.length; i ++)
        {        
            if(i % 2 == 0)
            
            {
                HtmlText = HtmlText + "<div class='row mx-5 pt-5'>";
                HtmlText = HtmlText + "<div class='col-6 px-5'>"
                HtmlText = HtmlText + "<a href='" + MenuList[i].Link + "'>";
                HtmlText = HtmlText + "<button class='form-group btn btn-block btn-primary h-100'><label class='h5 text-white'>"+ MenuList[i].Name +"</label></button>";
                HtmlText = HtmlText + "</a></div>";
            }
            else
            {
                HtmlText = HtmlText + "<div class='col-6 px-5'>"
                HtmlText = HtmlText + "<a href='" + MenuList[i].Link + "'>";
                HtmlText = HtmlText + "<button class='form-group btn btn-block btn-info h-100'><label class='h5 text-white'>"+ MenuList[i].Name +"</label></button>";
                HtmlText = HtmlText + "</a></div>";
                HtmlText = HtmlText + "</div>";
            }
            
        }
        $("#AnaSayfa").html(HtmlText);
    }
    $scope.YeniEvrak = function()
    {

        gtag('config', 'UA-12198315-14', 
        {
            'page_title' : 'Anasayfa',
            'page_path': '/Anasayfa'
        });

        if(localStorage.mode == 'true')
        {
            db.Emit('GetMenu','',function(MenuData)
            {

                if(MenuData.length > 0)
                {
                    $scope.Loading = false;
                }
                MenuOlustur(JSON.parse(MenuData));
      
               // $scope.AnimLoading = false;
            });
        }
        else
        {
            db.LocalDb.Execute(QueryLocal.ParamGetir,[],function(MenuData)
            {
                MenuOlustur(JSON.parse(MenuData.result.recordset[0].MENUDATA));
            });
        }
    }
} 