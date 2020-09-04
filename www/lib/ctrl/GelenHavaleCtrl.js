function GelenHavaleCtrl($scope,$window,$timeout,db)
{
    let CariSelectedRow = null;
    let IslemSelectedRow = null;
    let Tip = 0;

    function Init()
    {

        $scope.Firma = $window.sessionStorage.getItem('Firma');
        UserParam = Param[$window.sessionStorage.getItem('User')];

        $scope.Seri = "";
        $scope.Sira = 0;
        $scope.BelgeNo = "";
        $scope.CariKodu = "";
        $scope.CariAdi = "";
        $scope.CariBakiye = 0;
        $scope.Sorumluluk = "";
        $scope.SorumlulukAdi = "";
        $scope.Personel = "";
        $scope.PersonelAdi = "";
        $scope.BankaKodu = "01";
        $scope.SntckPoz = 0;
        $scope.KasTip = 0;
        $scope.BankaHizmet = 2;
        $scope.KarsiGrupNo = 1;
        $scope.CariAltDovizKuru = 1;
        $scope.Toplam = 0;
        $scope.Meblag = 0;
        $scope.Vade = moment(new Date()).format("YYYY-MM-DD");
        $scope.Aciklama = "EFT";
        $scope.Tarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.Saat = moment(new Date()).format("LTS");
        $scope.ChaCins = 0;
        $scope.ChaEvrakTip = 34;
        $scope.TrefNo = '';

        $scope.CariListe = [];
        $scope.SorumlulukListe = [];
        $scope.PersonelListe = [];
        $scope.BankaListe = [];
        $scope.CariHarListe = [];
        $scope.DizaynListe = [];

        $scope.Tutar = "";

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
                title: "BANKA KODU",
                type: "text",
                align: "center",
                width: 125
            },
            {
                name: "TUTAR",
                title: "TUTAR",
                type: "number",
                align: "center",
                width: 150
            },
            {
                name: "BANKAADI",
                title: "BANKA ADI",
                type: "text",
                align: "center",
                width: 150
            }
            
           ],
            rowClick: function(args)
            {
                //$scope.IslemListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitIslemDetayGrid()
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
                title: "BANKA KODU",
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
                name: "BANKAADI",
                title: "BANKA ADI",
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
    function InitDizaynGrid()
    {
        $("#TblDizayn").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.DizaynListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
            {
                name: "TIP",
                title: "TIP",
                type: "text",
                align: "center",
                width: 100
            },
            {
                name: "SERI",
                title: "SERI",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "SIRA",
                title: "SIRA",
                type: "number",
                align: "center",
                width: 75
            },
            {
                name: "CARIKOD",
                title: "CARİ KODU",
                type: "number",
                align: "center",
                width: 150
            },
            {
                name: "CARIADI",
                title: "CARİ ADI",
                type: "number",
                align: "center",
                width: 200
            },
            {
                name: "TUTAR",
                title: "TUTAR",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "VADE",
                title: "VADE",
                type: "number",
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
                $scope.ChaTip, //CHATİP
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
                $scope.BankaHizmet,  //KASAHIZMET
                $scope.BankaKodu, //KASAHIZKOD
                $scope.BankaDoviz,
                $scope.BankaKuru,
                $scope.KarsiGrupNo, //KARSIDGRUPNO
                $scope.Sorumluluk, //KARSISORUMLULUKKODU
                $scope.Tutar ,  //MEBLAG
                $scope.Tutar ,  //ARATOPLAM
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
                    //$scope.Tutar = 0; ALİ KEMAL KARACA TARAFINDAN ONAYLANDI :)
                    DipToplamHesapla();
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
    function DipToplamHesapla()
    {
        parseFloat($scope.Toplam = db.SumColumn($scope.CariHarListe,"cha_meblag")).toFixed(2)
    }
    function BarkodFocus()
    {
        $timeout( function(){$window.document.getElementById("Tutar").focus();},100);  
    }
    $scope.YeniEvrak = async function (pTip)
    {
        Init();
        InitCariGrid();
        InitIslemGrid();
        InitIslemDetayGrid();
        InitDizaynGrid();

        Tip = pTip;

        if(Tip == 0)
        {
            ParamName = "GelenHavale";
        }
        $scope.MainClick();

        $scope.Seri = UserParam[ParamName].Seri;
        $scope.BelgeNo = UserParam[ParamName].BelgeNo;
        $scope.ChaEvrakTip = UserParam[ParamName].ChaEvrakTip;
        $scope.ChaTip = UserParam[ParamName].ChaTip;
        $scope.CariKodu = UserParam[ParamName].Cari;

        if(typeof (localStorage.FaturaParam) != 'undefined')
        {
            $scope.CariKodu = JSON.parse(localStorage.FaturaParam).CariKodu
        }
        if($scope.CariKodu != "")
        {       
            db.GetData($scope.Firma,'CariGetir',[$scope.CariKodu,'',UserParam.Sistem.PlasiyerKodu],function(data)
            {
                $scope.CariListe = data;
                $("#TblCari").jsGrid({data : $scope.CariListe});

                let Obj = $("#TblCari").data("JSGrid");
                let Item = Obj.rowByItem(data[0]);
                
                $scope.CariListeRowClick(0,Item,Obj);
                $scope.MeblaGirisClick();
                
                $scope.Loading = false;
                $scope.TblLoading = true;
            });
        }
        await db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(data)
        {
            $scope.SorumlulukListe = data; 
            $scope.Sorumluluk = UserParam[ParamName].Sorumluluk;
            $scope.SorumlulukListe.forEach(function(item)
            {
                if(item.KODU == $scope.Sorumluluk)
                    $scope.SorumlulukAdi = item.ADI;
            });
        });   
        await db.FillCmbDocInfo($scope.Firma,'CmbPersonelGetir',function(data)
        {
            $scope.PersonelListe = data;
            $scope.Personel = UserParam[ParamName].Personel;
            $scope.PersonelListe.forEach(function(item)
            {
                $scope.PersonelAdi == item.ADI;
            });
        });
        await db.FillCmbDocInfo($scope.Firma,'CmbBankaGetir',function(data)
        {
            $scope.BankaListe = data;
            $scope.BankaKodu = UserParam[ParamName].BankaKodu;
            $scope.BankaListe.forEach(function(item)
            {
                if(item.KODU == $scope.BankaKodu)
                {
                    $scope.BankaAdi = item.ADI;
                    $scope.BankaDoviz = item.DOVIZCINSI;
                    $scope.BankaKuru = item.DOVIZKUR;
                    $scope.BankaDovizAdi = item.DOVIZSEMBOL;
                }
            });
        });  
        await db.MaxSiraPromiseTag($scope.Firma,'MaxCariHarSira',[$scope.Seri,$scope.ChaEvrakTip],function(data){$scope.Sira = data});
    }
    $scope.EvrakGetir = function(pData)
    {
        $scope.TahKontrol = pData;
        db.GetData($scope.Firma,'CariHarGetir',[$scope.Seri,$scope.Sira,$scope.ChaEvrakTip],function(data)
        {
            if(data.length > 0)
            {
                Init();
                InitIslemGrid(); 
                InitIslemDetayGrid();

                $scope.Seri = data[0].cha_evrakno_seri;
                $scope.Sira = data[0].cha_evrakno_sira;
                $scope.ChaEvrakTip = data[0].cha_evrak_tip;
                $scope.Sorumluluk = data[0].cha_srmrkkodu;
                $scope.ChaCins = data[0].cha_cinsi;
                $scope.BelgeNo = data[0].cha_belge_no;
                $scope.Aciklama = data[0].cha_aciklama;
                $scope.Personel = data[0].cha_satici_kodu;
                $scope.CariKodu = data[0].cha_kod;
                $scope.CariAdi = data[0].CARIADI;
                $scope.Tarih = new Date(data[0].cha_tarihi).toLocaleDateString();

                $scope.CariHarListe = data;
                $("#TblIslemSatirlari").jsGrid({data : $scope.CariHarListe});
                $("#TblIslem").jsGrid({data : $scope.CariHarListe});

                db.FillCmbDocInfo($scope.Firma,'CmbBankaGetir',function(data)
                {
                    $scope.BankaListe = data;
                });
                
                if($scope.CariKodu != "")
                {
                    db.GetData($scope.Firma,'CariGetir',[$scope.CariKodu,'',UserParam.Sistem.PlasiyerKodu],function(data)
                    {
                        $scope.CariListe = data;
                        $("#TblCari").jsGrid({data : $scope.CariListe});

                        let Obj = $("#TblCari").data("JSGrid");
                        let Item = Obj.rowByItem(data[0]);
                        
                        $scope.CariListeRowClick(0,Item,Obj);
                        $scope.Loading = false;
                        $scope.TblLoading = true;
                    });
                }

                db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(e){$scope.SorumlulukListe = e; $scope.Sorumluluk = data[0].cha_srmrkkodu});
                db.FillCmbDocInfo($scope.Firma,'CmbPersonelGetir',function(e){$scope.PersonelListe = e; $scope.Personel = data[0].cha_satici_kodu});
                
                angular.element('#MdlEvrakGetir').modal('hide');
                alertify.alert($scope.Seri + " - " + $scope.Sira + " " +"Başarıyla Getirildi.");
            }
            else
            {
                angular.element('#MdlEvrakGetir').modal('hide');
                alertify.alert("Evrak Bulunamadı !");
            }
        });
    }
    $scope.DovizChange = function()
    {
            if($scope.DovizChangeKodu == 0)
            {
                $scope.CariDovizCinsi = $scope.CariAnaDovizCinsi;
                $scope.CariDovizKuru = $scope.CariAnaDovizKuru
                $scope.CariDovizAdi = $scope.DovizAnaSembol
            }
            else if($scope.DovizChangeKodu == 1)
            {
                $scope.CariDovizCinsi = $scope.CariDovizCinsi1;
                $scope.CariDovizKuru = $scope.CariDovizKuru1;
                $scope.CariDovizAdi = $scope.DovizSembol1
            }
            else if($scope.DovizChangeKodu == 2)
            {
                $scope.CariDovizCinsi = $scope.CariDovizCinsi2
                $scope.CariDovizKuru =  $scope.CariDovizKuru2
                $scope.CariDovizAdi = $scope.DovizSembol2
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
        parseFloat($scope.CariBakiye = $scope.CariListe[pIndex].BAKIYE).toFixed(2);
        $scope.CariDovizCinsi1 = $scope.CariListe[pIndex].DOVIZCINSI1;
        $scope.CariDovizCinsi2 = $scope.CariListe[pIndex].DOVIZCINSI2;
        $scope.CariAnaDovizCinsi = $scope.CariListe[pIndex].DOVIZCINSI;
        $scope.CariDovizKuru = $scope.CariListe[pIndex].DOVIZKUR;
        $scope.CariAnaDovizKuru = $scope.CariListe[pIndex].DOVIZKUR;
        $scope.CariDovizKuru1 = $scope.CariListe[pIndex].DOVIZKUR1;
        $scope.CariDovizKuru2 = $scope.CariListe[pIndex].DOVIZKUR2;
        $scope.CariAltDovizKuru = $scope.CariListe[pIndex].ALTDOVIZKUR;
        $scope.CariVDADI = $scope.CariListe[pIndex].VDADI;
        $scope.CariVDNO = $scope.CariListe[pIndex].VDNO;
        $scope.Adres = $scope.CariListe[pIndex].ADRES;
        $scope.Adres1 = $scope.CariListe[pIndex].ADRES1;
        $scope.Adres2 = $scope.CariListe[pIndex].ADRES2;
        $scope.CariDovizAdi = $scope.CariListe[pIndex].DOVIZSEMBOL; 
        $scope.DovizSembol = $scope.CariListe[pIndex].DOVIZSEMBOL;
        $scope.DovizAnaSembol = $scope.CariListe[pIndex].DOVIZSEMBOL;
        $scope.DovizSembol1 = $scope.CariListe[pIndex].DOVIZSEMBOL1;
        $scope.DovizSembol2 = $scope.CariListe[pIndex].DOVIZSEMBOL2;
        $scope.DovizChangeKodu = "0"
        $scope.DovizChange()
    }
    $scope.IslemListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( IslemSelectedRow ) { IslemSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        IslemSelectedRow = $row;
        $scope.IslemListeSelectedItem = pItem;
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
    $scope.Insert = function()
    { 
        $scope.CariBakiye -= $scope.Tutar;
        if($scope.BankaKodu != "")
        {
            if($scope.Tutar != "")
            {
                if($scope.BankaDoviz == $scope.CariDovizCinsi)
                {
                    CariHarInsert();
                }
                else
                {
                    alertify.alert()
                    $('#MdlDoviz').modal('show');
                }
            }
            else
            {
                alertify.alert("Lütfen Tutar Giriniz.");
            }
        }
        else
        {
            alertify.alert("Lütfen Banka Seçiniz.");
        }
    }
    $scope.BtnCariDoviz = function()
    {
        $scope.Tutar = ($scope.Tutar * $scope.BankaKuru) / $scope.CariDovizKuru;
        CariHarInsert();
        $('#MdlDoviz').modal('hide');
    }
    $scope.BtnBankaDoviz = function()
    {
       CariHarInsert();
       $('#MdlDoviz').modal('hide');
    }
    $scope.EvrakDelete = function()
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Bu Belgeyi Silmek İstediğinize Eminmisiniz ?', 
        function()
        { 
            if($scope.CariHarListe.length > 0)
            {
                if(UserParam[ParamName].EvrakSil == 0)
                {
                    db.ExecuteTag($scope.Firma,'CariHarEvrDelete',[$scope.Seri,$scope.Sira,$scope.ChaEvrakTip],function(data)
                    {   
                        if(typeof(data.result.err) != 'undefined')
                        {
                            console.log(data.result.err);
                        }
                        else
                        {
                            db.ExecuteTag($scope.Firma,'CekHarDelete',[$scope.Seri,$scope.Sira])
                            alertify.alert("<a style='color:#3e8ef7''>" + "Evrak Silme İşlemi Başarıyla Gerçekleşti !" + "</a>" );
                            if(Tip == 0)
                            {
                                ParamName = "GelenHavale";
                                $scope.YeniEvrak(0)
                            }
                        }
                    });
                }
                else
                {
                    alertify.alert("<a style='color:#3e8ef7''>" + "Evrak Silmeye Yetkiniz Yok !" + "</a>" );
                }
            }
            else
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Silinecek Belge Yok !" + "</a>" );
            }
        }
        ,function(){});
    }
    $scope.SatirSil = function()
    {
        if(UserParam[ParamName].EvrakSil == 0)
        {
            alertify.okBtn('Evet');
            alertify.cancelBtn('Hayır');

            alertify.confirm('Seçilen Satırı Silmek İstediğinize Eminmisiniz ?', 
            function()
            { 
                if($scope.IslemListeSelectedIndex > -1)
                {
                    db.ExecuteTag($scope.Firma,'CekHarDelete',[$scope.IslemListeSelectedItem.cha_trefno],function(data)
                    {
                        if(typeof(data.result.err) == 'undefined')
                        {
                            db.ExecuteTag($scope.Firma,'CariHarSatirDelete',[$scope.IslemListeSelectedItem.cha_Guid],function(data)
                            {
                                if(typeof(data.result.err) == 'undefined')
                                {
                                    alertify.alert("Satır Silme İşlemi Başarıyla Gerçekleşti");

                                    db.GetData($scope.Firma,'CariHarGetir',[$scope.Seri,$scope.Sira,$scope.ChaEvrakTip],function(data)
                                    {
                                        if(data.length > 0)
                                        {
                                            $scope.CariHarListe = data;
                                            DipToplamHesapla();
                                            $("#TblIslemSatirlari").jsGrid({data : $scope.CariHarListe});
                                            $("#TblIslem").jsGrid({data : $scope.CariHarListe});
                                        }
                                        else
                                        {
                                            $scope.YeniEvrak();
                                        }
                                    });
                                }
                                else
                                {
                                    alertify.alert("Cari Hesap Hareketleri Silme İşleminde Hata");
                                }
                            });
                        }
                        else
                        {
                            alertify.alert("Ödeme Emirleri Silme İşleminde Hata");
                        }
                    });
                }
                else
                {
                    alertify.alert("Lütfen Silmek İstediğiniz Satırı Seçin");
                }
            },
            function(){});
        }
        else
        {
            alertify.alert("Evrak Silmeye Yetkiniz Yok");
        }
    }
    $scope.BtnDuzenle = function()
    {
        $('#MdlDuzenle').modal('show');
        $scope.Meblag = $scope.IslemListeSelectedItem.cha_meblag;
    }
    $scope.BtnDuzenleKaydet = function()
    {
        let Param =
        [
            $scope.Meblag,
            $scope.Meblag,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            $scope.IslemListeSelectedItem.cha_Guid
        ]
        db.ExecuteTag($scope.Firma,'CariHarUpdate',Param,function(InsertResult)
        {   
            if(typeof(InsertResult.result.err) == 'undefined')
            {
                db.ExecuteTag($scope.Firma,'CekHarUpdate',[$scope.Meblag,$scope.IslemListeSelectedItem.cha_trefno],function(InsertResult)
                {
                    if(typeof(InsertResult.result.err) == 'undefined')
                    {
                        db.GetData($scope.Firma,'CariHarGetir',[$scope.Seri,$scope.Sira,$scope.ChaEvrakTip],function(data)
                        {
                            $scope.CariHarListe = data;
                            DipToplamHesapla();
                            $("#TblIslemSatirlari").jsGrid({data : $scope.CariHarListe});
                            $("#TblIslem").jsGrid({data : $scope.CariHarListe});
                            alertify.alert("Düzenleme İşlemi Başarıyla Gerçekleşti");
                            $('#MdlDuzenle').modal('hide');
                        });
                    }
                    else
                    {
                        alertify.alert("Düzenleme İşleminde Hata");
                    }
                });
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
        $("#TbDizayn").removeClass('active');
    }
    $scope.BelgeBilgisiClick = function() 
    {
        $("#TbBelgeBilgisi").addClass('active');
        $("#TbMain").removeClass('active');
    }
    $scope.MeblaGirisClick = function() 
    {   
        if($scope.CariKodu.length > 0)
        {
            $("#TbMeblagGiris").addClass('active');
            $("#TbMain").removeClass('active');
            $("#TbCariSec").removeClass('active');
            $("#TbBelgeBilgisi").removeClass('active');
            $("#TbIslemSatirlari").removeClass('active');
            $("#TbDizayn").removeClass('active');
            BarkodFocus();
        }
        else
        {
            alertify.alert("Lütfen Cari Seçiniz");
        }
    }
    $scope.IslemSatirlariClick = function()
    {   
        if($scope.CariHarListe.length > 0)
        {
            $("#TbIslemSatirlari").addClass('active');
            $("#TbMain").removeClass('active');
            $("#TbBelgeBilgisi").removeClass('active');
            $("#TbMeblagGiris").removeClass('active');
            $("#TbDizayn").removeClass('active');
        }
        else
        {
            alertify.alert("Kayıtlı Evrak Olmadan İşlem Satırlarına Giremezsiniz.");
        }
    }
    $scope.CariSecClick = function()
    {
        $("#TbCariSec").addClass('active');
        $("#TbMain").removeClass('active');
    }
}