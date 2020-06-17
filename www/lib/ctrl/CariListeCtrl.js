function CariListeCtrl($scope,$window,db)
{
     let CariSelectedRow = null;

    function Init()
    {
        $scope.Firma = $window.sessionStorage.getItem('Firma');

        $scope.CariKodu = "";
        $scope.CariAdi = "";
        $scope.CariAdres = "";
        $scope.TxtCariAra = "";
        $scope.CmbCariAra = "0";
        $scope.VergiDaire = "";
        $scope.VergiNo = "";
        $scope.CariEkleKodu = "";
        $scope.CariEkleAdi = "";

        InitCariGrid();
        $scope.MainClick();
    }
    function InitCariGrid()
    {   
        $("#TblCari").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.CariListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
                {
                    name: "KODU",
                    type: "number",
                    align: "center",
                    width: 100
                },
                {
                    name: "UNVAN1",
                    type: "text",
                    align: "center",
                    width: 300
                },
                {
                    name: "BAKIYE",
                    type: "number",
                    align: "center",
                    width: 75
                },
                {
                    name: "DOVIZSEMBOL",
                    title: "DOVIZ",
                    type: "text",
                    align: "center",
                    width: 100
                }
            ],
            rowClick: function(args)
            {
                $scope.CariListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            } 
        });
    }
    $scope.YeniEvrak = function ()
    {
        Init();
    }
    $scope.EvrakGetir = function ()
    {
        db.GetData($scope.Firma,'RptCariListe',[],function(data)
        {
            Init();

            $scope.CariKodu = data[0].cari_kod;
        })
    }
    $scope.BtnCariListele = function()
    {   
        $scope.Loading = true;
        $scope.TblLoading = false;
        let Kodu = '';
        let Adi = '';

        if($scope.TxtCariAra != "")
        {
            if($scope.CmbCariAra == "0")
            {   
                Adi = $scope.TxtCariAra.replace("*","%").replace("*","%");
            }
            else
            {
                Kodu = $scope.TxtCariAra.replace("*","%").replace("*","%");
            }
        }
        
        db.GetData($scope.Firma,'CariListeGetir',[Kodu,Adi,''],function(data)
        {
            $scope.CariListe = data;
            if($scope.CariListe.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblCari").jsGrid({data : $scope.CariListe});
                $("#TblCari").jsGrid({pageIndex: true})
            } 
            else
            {
                alertify.alert("Cari Bulunamadı")
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblCari").jsGrid({data : $scope.CariListe});
                $("#TblCari").jsGrid({pageIndex: true})
            }     
            
        });
    }
    $scope.CariListeRowClick = function(pIndex,pItem,pObj)
    {
        if(!$scope.EvrakLock)
        {
            if ( CariSelectedRow ) { CariSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
            var $row = pObj.rowByItem(pItem);
            $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
            CariSelectedRow = $row;
            
            $scope.CariKodu = $scope.CariListe[pIndex].KODU;
            $scope.CariAdi = $scope.CariListe[pIndex].UNVAN1;
            $scope.CariFiyatListe = $scope.CariListe[pIndex].SATISFK;      
            $scope.CariDovizCinsi = $scope.CariListe[pIndex].DOVIZCINSI;
            $scope.CariDovizKuru = $scope.CariListe[pIndex].DOVIZKUR;
            $scope.CariAltDovizKuru = $scope.CariListe[pIndex].ALTDOVIZKUR;
            $scope.CariBakiye = $scope.CariListe[pIndex].BAKIYE;
            $scope.CariBakiyeAna = $scope.CariListe[pIndex].ANABAKIYE;
            $scope.CariBakiyeAlt = $scope.CariListe[pIndex].ALTBAKIYE;
            $scope.CariBakiyeOrj = $scope.CariListe[pIndex].ORJBAKIYE;            
            $scope.CariVDADI = $scope.CariListe[pIndex].VDADI;
            $scope.CariVDNO = $scope.CariListe[pIndex].VDNO;
            $scope.Adres = $scope.CariListe[pIndex].ADRES;
            $scope.Adres1 = $scope.CariListe[pIndex].ADRES1;
            $scope.Adres2 = $scope.CariListe[pIndex].ADRES2; 
            $scope.TelBolge =  $scope.CariListe[pIndex].TELBOLGE
            $scope.TelNo1 =  $scope.CariListe[pIndex].TELNO1
            $scope.DovizSembol = $scope.CariListe[pIndex].DOVIZSEMBOL
            $scope.DovizSembol1 = $scope.CariListe[pIndex].DOVIZSEMBOL1


            $scope.CariClick();
        }
    }
    $scope.CariClick = function() 
    {
        $("#TbDetay").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbCariEkle").removeClass('active');
    }
    $scope.MainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbDetay").removeClass('active');
        $("#TbCariEkle").removeClass('active');
    }
    $scope.CariEkleClick = function()
    {
        $("#TbCariEkle").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbDetay").removeClass('active');
    }
    $scope.CariEkleInsert = function()
    {
       console.log($scope.CariEkleKodu) 
       console.log($scope.CariEkleAdi)  
       console.log($scope.VergiDaire)  
       console.log($scope.VergiNo)  
        var InsertData = 
        [
            $scope.CariEkleKodu,
            $scope.CariEkleAdi,
            $scope.VergiDaire,
            $scope.VergiNo
        ]
        db.ExecuteTag($scope.Firma,'CariInsert',InsertData,function(InsertResult)
        {
            console.log(InsertResult)
            if($scope.CariEkleKodu == "" || $scope.CariEkleAdi == "" || $scope.VergiDaire == "" || $scope.VergiNo == "" )
            {
                console.log($scope.CariEkleKodu) 
                console.log($scope.CariEkleAdi)  
                console.log($scope.VergiDaire)  
                console.log($scope.VergiNo)  
                alertify.alert("Alanların hepsi dolu olmalıdır")
            }
        });
    }
}