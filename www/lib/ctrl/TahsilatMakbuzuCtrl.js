function TahsilatMakbuzuCtrl($scope,$window,$timeout,db,$filter)
{
    let CariSelectedRow = null;
    let IslemSelectedRow = null;

    function Init()
    {
        gtag('config', 'UA-12198315-14', 
        {
            'page_title' : 'Tahsilat',
            'page_path': '/Tahsilat'
        });

        $scope.Firma = $window.sessionStorage.getItem('Firma');
        UserParam = Param[$window.sessionStorage.getItem('User')];

        $scope.Seri = "";
        $scope.Sira = 0;
        $scope.BelgeNo = "";
        $scope.CariKodu = "";
        $scope.CariAdi = "";
        $scope.CariBakiye = 0;
        $scope.CmbEvrakTip = "0";
        $scope.Sorumluluk = "";
        $scope.SorumlulukAdi = "";
        $scope.Personel = "";
        $scope.PersonelAdi = "";
        $scope.TahsilatCinsi = "0";
        $scope.KasaBanka = "0";
        $scope.SntckPoz = 0;
        $scope.KasTip = 0;
        $scope.KasaHizmet = 4;
        $scope.KarsiGrupNo = 0;
        $scope.CariAltDovizKuru = 1;
        $scope.Vade = moment(new Date()).format("YYYY-MM-DD");
        $scope.Aciklama = "NAKİT KASASI";
        $scope.Tarih = moment(new Date()).format("DD.MM.YYYY");

        $scope.ChaCins = 0;
        $scope.ChaEvrakTip = 1;
        $scope.TrefNo = "";
       
        $scope.CariListe = [];
        $scope.SorumlulukListe = [];
        $scope.PersonelListe = [];
        $scope.KasaListe = [];
        $scope.BankaListe = [];
        $scope.CariHarListe = [];

        $scope.Tutar = 0;

        $scope.CmbCariAra = "0";
        $scope.TxtCariAra = ""; 
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
                } 
            ],
            rowClick: function(args)
            {
                $scope.CariListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitIslemGrid()
    {
        $("#TblIslem").jsGrid({
            responsive: true,
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.CariHarListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
           
            fields: 
            [
            {
                name: "cha_kasa_hizkod",
                title: "KASA KODU",
                type: "text",
                align: "center",
                width: 125
            },
            {
                name: "cha_meblag",
                title: "TUTAR",
                type: "number",
                align: "center",
                width: 150
            },
            {
                name: "KASAADI",
                title: "KASA ADI",
                type: "text",
                align: "center",
                width: 150
            }
            
           ],
            rowClick: function(args)
            {
                $scope.IslemListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitIslemSatirlariGrid()
    {
        $("#TblIslemSatirlari").jsGrid({
            responsive: true,
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.CariHarListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
           
            fields: 
            [
            {
                name: "cha_kasa_hizkod",
                title: "KASA KODU",
                type: "text",
                align: "center",
                width: 125
            },
            {
                name: "cha_meblag",
                title: "TUTAR",
                type: "number",
                align: "center",
                width: 150
            },
            {
                name: "KASAADI",
                title: "KASA ADI",
                type: "text",
                align: "center",
                width: 150
            }
            
           ],
            rowClick: function(args)
            {
                $scope.IslemListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function CariHarInsert()
    {
        try 
        {
            var InsertData = 
            [
                UserParam.MikroId,
                UserParam.MikroId,
                0, //FİRMA NO
                0, //ŞUBE NO
                $scope.ChaEvrakTip,
                $scope.Seri,
                $scope.Sira,
                $scope.Tarih,
                1, //CHATİP
                $scope.ChaCins,
                0, //NORMALIADE
                0, //TPOZ
                0, //CHATICARETTURU
                $scope.BelgeNo,
                $scope.Tarih,
                $scope.Aciklama, //ACIKLAMA
                $scope.Personel, //SATICIKODU
                "", //EXIMKODU
                "", //PROJEKODU
                0,  //CARICINS
                $scope.CariKodu,
                "",
                $scope.CariDovizCinsi, //DCİNS
                $scope.CariDovizKuru, //DKUR
                $scope.CariAltDovizKuru, //ALTDKUR
                0, //GRUPNO
                $scope.Sorumluluk,
                $scope.KasaHizmet,  //KASAHIZMET
                $scope.KasaBanka, //KASAHIZKOD
                $scope.KarsiGrupNo, //KARSIDGRUPNO
                $scope.Sorumluluk, //KARSISORUMLULUKKODU
                $scope.Tutar,  //MEBLAG
                $scope.Tutar,  //ARATOPLAM
                $scope.Vade, //VADE
                0, //FTISKONTO1
                0, //FTISKONTO2
                0, //FTISKONTO3
                0, //FTISKONTO4
                0, //FTISKONTO5
                0, //FTISKONTO6
                0, //FTMASRAF1
                0, //FTMASRAF2
                0, //FTMASRAF3
                0, //FTMASRAF4
                0, //VERİPNTR
                0, //VERGİ1
                0, //VERGİ2
                0, //VERGİ3
                0, //VERGİ4
                0, //VERGİ5
                0, //VERGİ6
                0, //VERGİ7
                0, //VERGİ8
                0, //VERGİ9
                0, //VERGİ10
                0, //VERGİSİZFL
                0, //OTVTUTARİ
                0, //OTVVERGİSİZFL
                0, //OIVERGİSİZFL
                $scope.TrefNo, //TREFNO
                $scope.SntckPoz, //SNTCKPOZ
                0 //EISLEMTURU
                ];
            db.ExecuteTag($scope.Firma,'CariHarInsert',InsertData,function(InsertResult)
            {   
                db.GetData($scope.Firma,'CariHarGetir',[$scope.Seri,$scope.Sira,$scope.ChaEvrakTip],function(CariHarGetir)
                {
                    $scope.CariHarListe = CariHarGetir;
                    $scope.Tutar = 0;
                    $("#TblIslem").jsGrid({data : $scope.CariHarListe});  
                    $("#TblIslemSatirlari").jsGrid({data : $scope.CariHarListe});           
                });
            });
        } 
        catch (error) 
        {
            alertify.alert("Cari Hareket Kayıt İşleminde Hata.");
        }
    }
    function OdemeEmirleriInsert()
    {
        try 
        {
            var InsertData = 
            [
                UserParam.MikroId,
                UserParam.MikroId,
                0, //FİRMA NO
                0, //ŞUBE NO
                $scope.SckTip,     //TIP
                $scope.TrefNo,     //REFNO
                $scope.CariAdi,      //BORCLU
                $scope.Tarih,         //VADE
                $scope.Tutar,        //TUTAR
                0,                   //DOVIZ
                0,                   //ODENEN            
                0,                   //SAHIPCARİCİNS
                $scope.CariKodu,     //SAHİPCARİKODU
                0,                   //CARİGRUPNO
                $scope.KasaHizmet ,//NEREDECARİCİNS
                $scope.KasaBanka,    //NEREDECARİKODU
                $scope.KarsiGrupNo, //NEREDECARİGRUPNO
                $scope.Tarih,        //SCKILKHAREKETTARİHİ
                $scope.Seri,         //İLKEVRAKSERİ
                $scope.Sira,         //İLKEVRAKSIRA
                $scope.Tarih,        //SONHAREKETTARİHİ
                1,                   //DOVIZKUR
                $scope.SntckPoz,      //SCKSONPOZ
                $scope.Sorumluluk,    //SORUMLULUKMERKEZI
                ""                   //PROJE
                ];

            db.ExecuteTag($scope.Firma,'CekHarInsert',InsertData,function(InsertResult)
            {   
                //$scope.TahsilatCinsi = "0"
                $scope.TahsilatCinsiChange();
            });
        } 
        catch (error) 
        {
            alertify.alert("Çek Kayıt İşleminde Hata.");
        }
    }
    $scope.CariListeRowClick = function(pIndex,pItem,pObj)
    {    
        if ( CariSelectedRow ) { CariSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        CariSelectedRow = $row;
        
        $scope.CariKodu = $scope.CariListe[pIndex].KODU;
        $scope.CariAdi = $scope.CariListe[pIndex].UNVAN1;
        $scope.CariBakiye = $scope.CariListe[pIndex].BAKIYE;
        $scope.CariDovizCinsi = $scope.CariListe[pIndex].DOVIZCINSI;
        $scope.CariDovizKuru = $scope.CariListe[pIndex].DOVIZKUR;
        $scope.CariAltDovizKuru = $scope.CariListe[pIndex].ALTDOVIZKUR;
    }
    $scope.IslemListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( IslemSelectedRow ) { IslemSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        IslemSelectedRow = $row;
        $scope.IslemListeSelectedIndex = pIndex;
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
        
        db.GetData($scope.Firma,'CariListeGetir',[Kodu,Adi,UserParam.Sistem.PlasiyerKodu],function(data)
        {
            $scope.CariListe = data;
            if($scope.CariListe.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblCari").jsGrid({data : $scope.CariListe});  
            }
            else
            {
                $("#TblCari").jsGrid({data : $scope.CariListe});
            }
        });
    }
    $scope.YeniEvrak = async function ()
    {
        Init();
        InitCariGrid();
        InitIslemGrid();
        InitIslemSatirlariGrid();

        $scope.Seri = UserParam.TahsilatMakbuzu.Seri;
        $scope.BelgeNo = UserParam.TahsilatMakbuzu.BelgeNo;
        $scope.ChaEvrakTip = UserParam.TahsilatMakbuzu.ChaEvrakTip;
        $scope.CariKodu = UserParam.TahsilatMakbuzu.Cari;

        await db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(data)
        {
            $scope.SorumlulukListe = data; 
            $scope.Sorumluluk = UserParam.TahsilatMakbuzu.Sorumluluk;
            $scope.SorumlulukListe.forEach(function(item)
            {
                if(item.KODU == $scope.Sorumluluk)
                    $scope.SorumlulukAdi = item.ADI;
            });
        });   
        await db.FillCmbDocInfo($scope.Firma,'CmbPersonelGetir',function(data)
        {
            $scope.PersonelListe = data;
            $scope.Personel = UserParam.TahsilatMakbuzu.Personel;
            $scope.PersonelListe.forEach(function(item)
            {
                $scope.PersonelAdi == item.ADI;
            });
        });
        await db.GetData($scope.Firma,'CmbKasaGetir',[$scope.KasTip],function(data)
        {
            $scope.KasaListe = data;
            $scope.KasaBankaListe = $scope.KasaListe;
            $scope.KasaBanka = UserParam.TahsilatMakbuzu.NakitKasa;
        });  
        await db.FillCmbDocInfo($scope.Firma,'CmbBankaGetir',function(data)
        {
            $scope.BankaListe = data;
        });  
        await db.MaxSiraPromiseTag($scope.Firma,'MaxCariHarSira',[$scope.Seri,$scope.ChaEvrakTip],function(data){$scope.Sira = data});
    }
    $scope.TahsilatCinsiChange = async function()
    {
        if($scope.TahsilatCinsi == "0") //Nakit
        {
            $scope.KasaBankaListe = $scope.KasaListe;
            $scope.KasaBanka = UserParam.TahsilatMakbuzu.NakitKasa;
            $scope.ChaCins = 0;
            $scope.TrefNo = "";
            $scope.SntckPoz = 0;
            $scope.KasaHizmet = 4;
            $scope.KarsiGrupNo = 0;
            $scope.Aciklama = "NAKİT KASASI";
        }
        else if($scope.TahsilatCinsi == "1")  //Çek
        {
            $scope.KasTip = 1; //KASA GETİRMEK İÇİN KULLANILAN PARAMETRE
            $scope.ChaCins = 1;
            $scope.SntckPoz = 0;
            $scope.KasaHizmet = 4;
            $scope.KarsiGrupNo = 0;
            $scope.SckTip = 0; //ODEME EMİRLERİ TABLOSU
            $scope.Aciklama = "ÇEK KASASI";

            await db.GetPromiseTag($scope.Firma,'MaxCekRefNo',[$scope.SckTip],function(data)
            {
                $scope.TrefNo = data[0].MAXREFNO
            });  
            await db.GetPromiseTag($scope.Firma,'CmbKasaGetir',[$scope.KasTip],function(data)
            {
                $scope.KasaBankaListe = data;
                $scope.KasaBanka = UserParam.TahsilatMakbuzu.CekKasa;
            });  
        }
        else if($scope.TahsilatCinsi == "2") //Kredi Kartı
        {
            $scope.KasaBankaListe = $scope.BankaListe;
            $scope.KasaBanka = UserParam.TahsilatMakbuzu.KrediKasa;
            $scope.SntckPoz = 2;
            $scope.ChaCins = 19;
            $scope.KasaHizmet = 2;
            $scope.KarsiGrupNo = 7;
            $scope.SckTip = 6; //ODEME EMİRLERİ TABLOSU
            $scope.Aciklama = "KREDİ KARTI KASASI";

            await db.GetPromiseTag($scope.Firma,'MaxCekRefNo',[$scope.SckTip],function(data)
            {
                $scope.TrefNo = data[0].MAXREFNO
            });  
        }
    }
    $scope.Insert = function()
    {
        if($scope.Tutar > 0)
        {
            CariHarInsert();
            if($scope.TahsilatCinsi !=0)
            {
                OdemeEmirleriInsert();
            }
        }
        else
        {
            alertify.alert("Lütfen Tutar Giriniz.");
        }
    }
    $scope.EvrakGetir = function()
    {
        db.GetData($scope.Firma,'CariHarGetir',[$scope.Seri,$scope.Sira,$scope.ChaEvrakTip],function(data)
        {
            if(data.length > 0)
            {
                Init();
                InitIslemGrid(); 
                InitIslemSatirlariGrid();

                $scope.Seri = data[0].cha_evrakno_seri;
                $scope.Sira = data[0].cha_evrakno_sira;
                $scope.ChaEvrakTip = data[0].cha_evrak_tip;
                $scope.CariKodu = data[0].cha_kod;
                $scope.Sorumluluk = data[0].cha_srmrkkodu;
            }
            else
            {
                angular.element('#MdlEvrakGetir').modal('hide');
                alertify.alert("Evrak Bulunamadı !");
            }
        });
    }
    $scope.MainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbMeblagGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TbCariSec").removeClass('active');
    }
    $scope.BelgeBilgisiClick = function() 
    {
        $("#TbBelgeBilgisi").addClass('active');
        $("#TbMain").removeClass('active');
    }
    $scope.MeblaGirisClick = function() 
    {   
        if($scope.CariListe.length > 0)
        {
            $("#TbMeblagGiris").addClass('active');
            $("#TbMain").removeClass('active');
            $("#TbCariSec").removeClass('active');
            $("#TbBelgeBilgisi").removeClass('active');
            $("#TbIslemSatirlari").removeClass('active');
        }
        else
        {
            alertify.alert("Lütfen Cari Seçiniz");
        }
    }
    $scope.IslemSatirlariClick = function()
    {   
        $("#TbIslemSatirlari").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbMeblagGiris").removeClass('active');
    }
    $scope.CariSecClick = function()
    {
        $("#TbCariSec").addClass('active');
        $("#TbMain").removeClass('active');
    }
}