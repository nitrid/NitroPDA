function TahsilatMakbuzuCtrl($scope,$window,$timeout,db)
{
    let CariSelectedRow = null;
    let IslemSelectedRow = null;
    let Tip = 0;

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
        $scope.GunSonuDizayn = "";
        $scope.KasaBanka = "0";
        $scope.SntckPoz = 0;
        $scope.KasTip = 0;
        $scope.KasaHizmet = 4;
        $scope.KarsiGrupNo = 0;
        $scope.CariAltDovizKuru = 1;
        $scope.Toplam = 0;
        $scope.Meblag = 0;
        $scope.Vade = moment(new Date()).format("YYYY-MM-DD");
        $scope.Aciklama = "NAKİT KASASI";
        $scope.Tarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.Saat = moment(new Date()).format("LTS");
        $scope.ChaCins = 0;
        $scope.ChaEvrakTip = 1;
        $scope.TrefNo = "";
        $scope.DNakitToplam = 0;
        $scope.DKrediToplam = 0;
        $scope.DGenelToplam = 0;
        $scope.FisDizaynTip = UserParam.Sistem.FisDizayn;

        $scope.CariListe = [];
        $scope.SorumlulukListe = [];
        $scope.PersonelListe = [];
        $scope.KasaListe = [];
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
                title: "KASA KODU",
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
                name: "KASAADI",
                title: "KASA ADI",
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
                $scope.KasaHizmet,  //KASAHIZMET
                $scope.KasaBanka, //KASAHIZKOD
                $scope.KasaDoviz,
                $scope.KasaKuru,
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
                    FisData(CariHarGetir)
                    $("#TblIslem").jsGrid({data : $scope.CariHarListe});
                    $("#TblIslemSatirlari").jsGrid({data : $scope.CariHarListe});
                    
                    if($scope.TahsilatCinsi != 0)
                    {
                        OdemeEmirleriInsert();
                    }
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
                0,                   //FİRMA NO
                0,                   //ŞUBE NO
                $scope.SckTip,       //TIP
                $scope.TrefNo,       //REFNO
                $scope.CariAdi,      //BORCLU
                $scope.Tarih,        //VADE
                $scope.Tutar,        //TUTAR
                0,                   //DOVIZ
                0,                   //ODENEN
                0,                   //SAHIPCARİCİNS
                $scope.CariKodu,     //SAHİPCARİKODU
                0,                   //CARİGRUPNO
                $scope.KasaHizmet ,  //NEREDECARİCİNS
                $scope.KasaBanka,    //NEREDECARİKODU
                $scope.KarsiGrupNo,  //NEREDECARİGRUPNO
                $scope.Tarih,        //SCKILKHAREKETTARİHİ
                $scope.Seri,         //İLKEVRAKSERİ
                $scope.Sira,         //İLKEVRAKSIRA
                $scope.CariHarListe[$scope.CariHarListe.length - 1].cha_satir_no, //İLKEVRAKSATIRNO
                $scope.Tarih,        //SONHAREKETTARİHİ
                1,                   //DOVIZKUR
                $scope.SntckPoz,     //SCKSONPOZ
                $scope.Sorumluluk,   //SORUMLULUKMERKEZI
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
    function DipToplamHesapla()
    {
        parseFloat($scope.Toplam = db.SumColumn($scope.CariHarListe,"cha_meblag")).toFixed(2)
    }
    function BarkodFocus()
    {
        $timeout( function(){$window.document.getElementById("Tutar").focus();},100);  
    }
    function FisData(pData)
    {
        $scope.Fisdeger = pData;
        (pData)
        $scope.FisData = "";
        try 
        {
            $scope.FisDeger = "";
            $scope.FisDeger = SpaceLength($scope.CariAdi,40) + "\n" +"                                    "+ $scope.Tarih + "\n" + "                                    "+  $scope.Saat + "\n"+ "                                    " + $scope.Seri + " - " + $scope.Sira + "\n"+ $scope.Adres1 + "\n" + $scope.Adres +"\n" + "\n";
            for(let i=0; i < pData.length; i++)
            {
                $scope.FisData = $scope.FisData + "\n";                
            } 
        } 
        catch (error) 
        {
            console.log(error)
        }
    }
    function SpaceLength(pData,pLength)
    {
        try 
        {
            let x = pLength - pData.toString().length;

            if(pData.toString().length > pLength)
            {
                pData = pData.substring(0,pLength);
            }

            Space = "";

            for(let i=0; i < x; i++)
            {
                Space = Space + " ";
            }

            return pData + Space
            
        } 
        catch (error) 
        {
            console.log(error)
        }
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
            ParamName = "TahsilatMakbuzu";
        }
        else
        {
            ParamName = "TediyeMakbuzu";
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
        await db.GetData($scope.Firma,'CmbKasaGetir',[$scope.KasTip],function(data)
        {
            $scope.KasaListe = data;
            $scope.KasaBankaListe = $scope.KasaListe;
            $scope.KasaBanka = UserParam[ParamName].NakitKasa;
            $scope.KasaListe.forEach(function(item)
            {
                if(item.KODU == $scope.KasaBanka)
                {
                    $scope.KasaAdi = item.ADI;
                    $scope.KasaDoviz = item.DOVIZCINSI;
                    $scope.KasaKuru = item.DOVIZKUR;
                    $scope.KasaDovizAdi = item.DOVIZSEMBOL
                }
            });
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
            $scope.KasaBanka = UserParam[ParamName].NakitKasa;
            $scope.ChaCins = 0;
            $scope.KasTip = 0
            $scope.TrefNo = "";
            $scope.SntckPoz = 0;
            $scope.KasaHizmet = 4;
            $scope.KarsiGrupNo = 0;
            $scope.Aciklama = "NAKİT KASASI";
            await db.GetPromiseTag($scope.Firma,'CmbKasaGetir',[$scope.KasTip],function(data)
            {
                $scope.KasaBankaListe = data;
                $scope.KasaListe = data;
                $scope.KasaBanka = UserParam[ParamName].NakitKasa;
            }); 
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
                $scope.KasaListe = data;
                $scope.KasaBanka = UserParam[ParamName].CekKasa;
            });  
        }
        else if($scope.TahsilatCinsi == "2")  //Senet
        {
            $scope.KasTip = 3; //KASA GETİRMEK İÇİN KULLANILAN PARAMETRE
            $scope.ChaCins = 2;
            $scope.SntckPoz = 0;
            $scope.KasaHizmet = 4;
            $scope.KarsiGrupNo = 0;
            $scope.SckTip = 1; //ODEME EMİRLERİ TABLOSU
            $scope.Aciklama = "SENET KASASI";

            await db.GetPromiseTag($scope.Firma,'MaxCekRefNo',[$scope.SckTip],function(data)
            {
                $scope.TrefNo = data[0].MAXREFNO
            });  
            await db.GetPromiseTag($scope.Firma,'CmbKasaGetir',[$scope.KasTip],function(data)
            {
                $scope.KasaBankaListe = data;
                $scope.KasaListe = data;
                $scope.KasaBanka = UserParam[ParamName].SenetKasa;
                $scope.KasaBankaListe.forEach(function(item)
                {
                    if(item.KODU == $scope.KasaBanka)
                    {
                        $scope.KasaAdi = item.ADI;
                        $scope.KasaDoviz = item.DOVIZCINSI;
                        $scope.KasaKuru = item.DOVIZKUR;
                        $scope.KasaDovizAdi = item.DOVIZSEMBOL
                    }
                });
            });  
        }
        else if($scope.TahsilatCinsi == "3") //Kredi Kartı
        {
            $scope.KasaBankaListe = $scope.BankaListe;
            $scope.KasaBanka = UserParam[ParamName].KrediKasa;
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
        $scope.KasaChange();
    }
    $scope.KasaChange = function()
    {
        $scope.KasaListe.forEach(function(item)
        {
            if(item.KODU == $scope.KasaBanka)
            {
                $scope.KasaAdi = item.ADI;
                $scope.KasaDoviz =item.DOVIZCINSI;
                $scope.KasaKuru = item.DOVIZKUR;
                $scope.KasaDovizAdi = item.DOVIZSEMBOL
            }
        });
    }
    $scope.Insert = function()
    { 
        $scope.CariBakiye -= $scope.Tutar;
        if($scope.KasaBanka != "")
        {
            if($scope.Tutar != "")
            {
                if($scope.KasaDoviz == $scope.CariDovizCinsi)
                {
                    CariHarInsert();                    
                }
                else
                {
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
        $scope.Tutar = ($scope.Tutar * $scope.KasaKuru) / $scope.CariDovizKuru;
        CariHarInsert();
        if($scope.TahsilatCinsi != 0)
        {
            OdemeEmirleriInsert();
        }
        $('#MdlDoviz').modal('hide');
    }
    $scope.BtnKasaDoviz = function()
    {
       CariHarInsert();
       if($scope.TahsilatCinsi != 0)
       {
           OdemeEmirleriInsert();
       }
       $('#MdlDoviz').modal('hide');
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

                db.GetData($scope.Firma,'CmbKasaGetir',[$scope.KasTip],function(data)
                {
                    $scope.KasaListe = data;
                    $scope.KasaBankaListe = $scope.KasaListe;
                    $scope.KasaBanka = UserParam[ParamName].NakitKasa;
                });  
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
                        FisData(data);
                        $scope.Loading = false;
                        $scope.TblLoading = true;
                    });
                }

                db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(e){$scope.SorumlulukListe = e; $scope.Sorumluluk = data[0].cha_srmrkkodu});
                db.FillCmbDocInfo($scope.Firma,'CmbPersonelGetir',function(e){$scope.PersonelListe = e; $scope.Personel = data[0].cha_satici_kodu});
                
                DipToplamHesapla();                
                angular.element('#MdlEvrakGetir').modal('hide');
                alertify.alert($scope.Seri + " - " + $scope.Sira + " " +"Başarılıyla Getirildi.");
            }
            else
            {
                angular.element('#MdlEvrakGetir').modal('hide');
                alertify.alert("Evrak Bulunamadı !");
            }
        });
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
                                ParamName = "TahsilatMakbuzu";
                                $scope.YeniEvrak(0)
                            }
                            else
                            {
                                ParamName = "TediyeMakbuzu";
                                $scope.YeniEvrak(1)
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
            $scope.Seri,
            $scope.Sira,
            $scope.ChaEvrakTip,
            0
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
                            FisData(data)
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
    $scope.BtnFatClick = function()
    {
        if(typeof (localStorage.FaturaParam) != 'undefined')
        {
            $scope.FatSeri = JSON.parse(localStorage.FaturaParam).Seri
            $scope.FatSira = JSON.parse(localStorage.FaturaParam).Sira
            $scope.FatTip = JSON.parse(localStorage.FaturaParam).EvrakTip

            let Param =
            {
                "Seri" : $scope.FatSeri,
                "Sira" : $scope.FatSira,
                "TahSeri" : $scope.Seri,
                "TahSira" : $scope.Sira,
                "EvrakTip" : $scope.FatTip,
                "Toplam" : $scope.Toplam
            }

            localStorage.FaturaParam = JSON.stringify(Param);
        }
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
    $scope.BtnOnlineYazdir = function()
    {   
        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "UPDATE CARI_HESAP_HAREKETLERI SET cha_special1 = 1 " +
                    "WHERE cha_evrakno_seri = @cha_evrakno_seri AND cha_evrakno_sira = @cha_evrakno_sira AND cha_evrak_tip = @cha_evrak_tip ",
            param:  ['cha_evrakno_seri','cha_evrakno_sira','cha_evrak_tip'],
            type:   ['string|25','int','int',],
            value:  [$scope.Seri,$scope.Sira,$scope.ChaEvrakTip]
        }

        db.ExecuteQuery(TmpQuery,function(data)
        {   
            if(typeof(data.result.err) == 'undefined')
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Yazdırma İşlemi Başarıyla Gerçekleşti !" + "</a>" ); 
            }
            else
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Yazdırma İşleminde Hata !" + "</a>" ); 
            }
        });
    }
    $scope.BtnFisYazdir = async function()
    {
        if($scope.FisDizaynTip == "0")
        {
            let FisDizayn = "";
            let OncekiBakiye = 0;
            let NakitAlinan = 0;
            let KalanBakiye = 0;
            $scope.DizaynListe2 = [];
            let TmpQuery = 
            {
                db : '{M}.' + $scope.Firma,
                query:  "SELECT " +
                        "cha_cinsi AS EVRAKTIP, " +
                        "CONVERT(VARCHAR(10),MAX(cha_vade),112) AS VADE, " +
                        "CASE WHEN cha_cinsi = 0 THEN 'NAKIT' WHEN cha_cinsi = 19 THEN 'K.KARTI'  " +
                        "WHEN cha_cinsi = 1 THEN 'M. ÇEKİ' WHEN cha_cinsi = 2 THEN 'M. SENEDİ' END AS TIP, " +
                        "cha_evrakno_seri AS SERI,  " +
                        "cha_evrakno_sira AS SIRA,  " +
                        "MAX(cha_kod) AS CARIKOD, " +
                        "(SELECT cari_unvan1 FROM CARI_HESAPLAR WHERE cari_kod = MAX(cha_kod)) + ' ' +  " +
                        "(SELECT cari_unvan2 FROM CARI_HESAPLAR WHERE cari_kod = MAX(cha_kod)) AS CARIADI, " +
                        "ROUND(SUM(cha_meblag),2) AS TUTAR " +
                        "FROM CARI_HESAP_HAREKETLERI WHERE cha_evrak_tip = @cha_evrak_tip AND cha_evrakno_seri = @cha_evrakno_seri AND cha_evrakno_sira = @cha_evrakno_sira " +
                        "GROUP BY cha_evrakno_seri,cha_evrakno_sira,cha_cinsi ",
                param : ['cha_evrak_tip:int','cha_evrakno_seri:string|20','cha_evrakno_sira:int'],
                value : [$scope.ChaEvrakTip,$scope.Seri,$scope.Sira] 
            }
           await db.GetPromiseQuery(TmpQuery,function(Data)
            {
                console.log(Data)
                $scope.DNakitToplam = db.SumColumn(Data,"TUTAR","EVRAKTIP = 0");
                $scope.DKrediToplam = db.SumColumn(Data,"TUTAR","EVRAKTIP = 19");
                $scope.DSenetToplam = db.SumColumn(Data,"TUTAR","EVRAKTIP = 2");
                $scope.DCekToplam = db.SumColumn(Data,"TUTAR","EVRAKTIP = 1");
                $scope.DizaynListe2 = Data;
            });
            if($scope.TahKontrol == 1)
            {
                OncekiBakiye = $scope.CariBakiye + $scope.Toplam
                KalanBakiye = OncekiBakiye - $scope.Toplam
                NakitAlinan = $scope.Toplam
            }
            else
            {
                OncekiBakiye = $scope.CariBakiye
                NakitAlinan = $scope.Toplam
                KalanBakiye = $scope.CariBakiye - $scope.Toplam
            }
            let i = 36 - $scope.DizaynListe2.length;
            let Satır = "";
            console.log(1)
            for(let x = 0; x <= i; x++)
            {    
                Satır = Satır + "                                             -"+ "\n"; 
            } 
            FisDizayn = 
            "                   ESER GIDA                  " + "\n" +
            "        SÜT VE SÜT ÜRÜNLERİ PAZARLAMA         " + "\n" +
            "Merkez: Vişnelik Mh. Atatürk Bulvari No:177/8 " + "\n" +
            "TEL:0222 330 42 42 Odunpazari/ESKİŞEHİR     " + "\n" +
            "Şube1:Ortaköy Mh. TÜVTÜRK Yani No: 379 MUĞLA" + "\n" +
            "Tel:0252 214 78 58 muglasutas@hotmail.com    " + "\n" +
            "              TAHSILAT FISI" + "\n" + "                                            -" + "\n" +
            $scope.FisDeger + "\n" +
            "Nakit = " + $scope.DNakitToplam + "\n" + "K.Kartı = " + $scope.DKrediToplam + "\n" + "Toplam = " +$scope.Toplam.toFixed(2) + "\n" + Satır 
            FisDizayn = FisDizayn +"\n" + "Önceki Bakiye : " + parseFloat(OncekiBakiye).toFixed(2) + "\n" + "Kalan Bakiye  : " + parseFloat(KalanBakiye).toFixed(2) + "\n" + "                                            -" + "-\n" + "-\n" + "-\n" + "-\n" + "-\n" + "-\n" + "-\n" + "-\n" 
            FisDizayn = FisDizayn.split("İ").join("I").split("ı").join("i").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u");
            console.log(FisDizayn)
            db.BTYazdir(FisDizayn,UserParam.Sistem,function(pStatus)
            {
                if(pStatus)
                {
                    alertify.alert("<a style='color:#3e8ef7''>" + "Yazdırma İşlemi Gerçekleşti </a>" );    
                    $scope.TahKontrol = 0;
                }
            });
        }
        else if($scope.FisDizaynTip == "1")
        {
            let FisDizayn = "";
            let OncekiBakiye = 0;
            let NakitAlinan = 0;
            let KalanBakiye = 0;

            if($scope.TahKontrol == 1)
            {
                OncekiBakiye = $scope.CariBakiye + $scope.Toplam
                KalanBakiye = OncekiBakiye - $scope.Toplam
                NakitAlinan = $scope.Toplam
            }
            else
            {
                OncekiBakiye = $scope.CariBakiye
                NakitAlinan = $scope.Toplam
                KalanBakiye = $scope.CariBakiye - $scope.Toplam
            }

            FisDizayn = "              TAHSILAT FISI" + "\n" + "                                            -" + "\n" + $scope.FisDeger + "\n"
            FisDizayn = FisDizayn +"\n" + "Önceki Bakiye : " + parseFloat(OncekiBakiye).toFixed(2) + "\n" + "Nakit Alinan  : " + parseFloat(NakitAlinan).toFixed(2) + "\n" + "Kalan Bakiye  : " + parseFloat(KalanBakiye).toFixed(2) + "\n" + "                                            -" + "\n" 
            FisDizayn = FisDizayn.split("İ").join("I").split("ı").join("i").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u");

            console.log(FisDizayn)
            db.BTYazdir(FisDizayn,UserParam.Sistem,function(pStatus)
            {
                if(pStatus)
                {
                    alertify.alert("<a style='color:#3e8ef7''>" + "Yazdırma İşlemi Gerçekleşti </a>" );    
                    $scope.TahKontrol = 0;
                }
            });
        }
    }
    //GÜN SONU RAPORU
    $scope.BtnGunSonuYazdir = async function()
    {  
        if($scope.FisDizaynTip == "0")
        {   
            let FisDeger = "";
            let FisDizayn = "";
            $scope.GunSonuData = "";
            
            for(let i=0; i < $scope.DizaynListe.length; i++)
            {
                let TmpNakit = 0;
                let TmpKKarti = 0;
                if($scope.DizaynListe[i].EVRAKTIP == 0)
                {
                    TmpNakit = $scope.DizaynListe[i].TUTAR;
                }
                if($scope.DizaynListe[i].EVRAKTIP == 19)
                {
                    TmpKKarti = $scope.DizaynListe[i].TUTAR
                }
                $scope.GunSonuData = $scope.GunSonuData + SpaceLength($scope.DizaynListe[i].CARIADI,25) + " " + SpaceLength(TmpNakit.toString(),8) + " " + SpaceLength(TmpKKarti.toString(),8) + "\n";
            } 
            let i = 46 - $scope.DizaynListe.length;
            let Satır = "";
    
            for(let x = 0; x <= i; x++)
            {    
                Satır = Satır + "                                          -"+ "\n"; 
            }
            
            FisDeger = "PLASIYER : " + SpaceLength($scope.DizaynListe[0].PERSONEL,15) + "        "+ $scope.Tarih + "\n" + "                                  " + $scope.Saat + "\n";
            //FisDeger = FisDeger + "\n"
            FisDizayn = "                                             " + "\n" +
                        "            TAHSILAT DURUM RAPORU            " + "\n" +
                        FisDeger + "\n" +
                        "CARIADI                   NAKIT    K.KARTI" + "\n" +
                        $scope.GunSonuData + 
                        "-----------------------------------------" + "\n" + 
                        "                          NAKIT : " + $scope.DNakitToplam.toFixed(2) + "\n" + 
                        "                        K.KARTI : " + $scope.DKrediToplam.toFixed(2) + "\n" + 
                        "                         TOPLAM : " + $scope.DGenelToplam.toFixed(2) + "\n" + 
                        Satır +
                        "                                         --" + "\n" +
                        "                                         --" + "\n" +
                        "                                         --" + "\n" +
                        "                                         --" + "\n" +
                        "                                         --" + "\n" +
                        "                                         --" + "\n" +
                        "                                         --" + "\n" +
                        "                                         --" + "\n" 
            FisDizayn = FisDizayn.split("İ").join("I").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u");

            console.log(FisDizayn)
            
            db.BTYazdir(FisDizayn,UserParam.Sistem,function(pStatus)
            {
                if(pStatus)
                {
                    alertify.alert("<a style='color:#3e8ef7''>" + "Yazdırma İşlemi Gerçekleşti </a>" );         
                }
            });
        }
        else if($scope.FisDizaynTip == "1")
        {
            let FisDeger = "";
            $scope.GunSonuData = "";
    
            FisDeger = FisDeger + "                                  TAHSILAT GUN SONU " + "\n" 
            FisDeger = FisDeger + "                                                    Tarih : "+ $scope.Tarih + "\n" +"\n" +"\n" +"\n" +"\n" +"\n" + "\n";
    
            for(let i=0; i < $scope.DizaynListe.length; i++)
            {
                $scope.GunSonuData = $scope.GunSonuData + SpaceLength($scope.DizaynListe[i].TIP,10) + " " + SpaceLength($scope.DizaynListe[i].SERI,8) + " " +  SpaceLength($scope.DizaynListe[i].SIRA,6) + " " + SpaceLength($scope.DizaynListe[i].CARIKOD,8) + "  " + SpaceLength($scope.DizaynListe[i].CARIADI,18) + SpaceLength(parseFloat($scope.DizaynListe[i].TUTAR.toFixed(2)),7) + " " + SpaceLength($scope.DizaynListe[i].VADE,10) + "\n";
            } 
    
            $scope.GunSonuDizayn = $scope.GunSonuDizayn + "                                                Senet Toplam : " + $scope.DSenetToplam.toFixed(2) + "\n " 
            $scope.GunSonuDizayn = $scope.GunSonuDizayn + "                                                  Çek Toplam : " + $scope.DCekToplam.toFixed(2) + "\n "
            $scope.GunSonuDizayn = $scope.GunSonuDizayn + "                                                Nakit Toplam : " + $scope.DNakitToplam.toFixed(2) + "\n " 
            $scope.GunSonuDizayn = $scope.GunSonuDizayn + "                                          Kredi Kartı Toplam : " + $scope.DKrediToplam.toFixed(2) + "\n "
            $scope.GunSonuDizayn = $scope.GunSonuDizayn + "                                                      Toplam : " + $scope.DGenelToplam.toFixed(2) + "\n "
            $scope.GunSonuDizayn = $scope.GunSonuDizayn.split("İ").join("I").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u");
            
            console.log($scope.GunSonuDizayn)
            db.BTYazdir($scope.GunSonuDizayn,UserParam.Sistem,function(pStatus)
            {
                if(pStatus)
                {
                    alertify.alert("<a style='color:#3e8ef7''>" + "Yazdırma İşlemi Gerçekleşti </a>" );         
                }
            });
        }
    }
    $scope.BtnGunSonuRaporClick = async function()
    {
        $("#TbMeblagGiris").removeClass('active');
        $("#TbMain").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');

        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "SELECT " +
                    "cha_cinsi AS EVRAKTIP, " +
                    "CONVERT(VARCHAR(10),MAX(cha_vade),112) AS VADE, " +
                    "CASE WHEN cha_cinsi = 0 THEN 'NAKIT' WHEN cha_cinsi = 19 THEN 'K.KARTI'  " +
                    "WHEN cha_cinsi = 1 THEN 'M. ÇEKİ' WHEN cha_cinsi = 2 THEN 'M. SENEDİ' END AS TIP, " +
                    "cha_evrakno_seri AS SERI,  " +
                    "cha_evrakno_sira AS SIRA,  " +
                    "MAX(cha_kod) AS CARIKOD, " +
                    "(SELECT cari_unvan1 FROM CARI_HESAPLAR WHERE cari_kod = MAX(cha_kod)) + ' ' +  " +
                    "(SELECT cari_unvan2 FROM CARI_HESAPLAR WHERE cari_kod = MAX(cha_kod)) AS CARIADI, " +
                    "ISNULL((SELECT cari_per_adi FROM CARI_PERSONEL_TANIMLARI WHERE cari_per_kod = MAX(cha_satici_kodu)),'') AS PERSONEL, " +
                    "ROUND(SUM(cha_meblag),2) AS TUTAR " +
                    "FROM CARI_HESAP_HAREKETLERI WHERE cha_tip = 1 AND cha_evrak_tip = 1 AND cha_tarihi = CONVERT(VARCHAR(10),GETDATE(),112) " +
                    "AND cha_satici_kodu = '" + $scope.Personel + "'" + 
                    "GROUP BY cha_evrakno_seri,cha_evrakno_sira,cha_cinsi " 
        }
        await db.GetPromiseQuery(TmpQuery,async function(Data)
        {
            $scope.DNakitToplam = db.SumColumn(Data,"TUTAR","EVRAKTIP = 0");
            $scope.DKrediToplam = db.SumColumn(Data,"TUTAR","EVRAKTIP = 19");
            $scope.DSenetToplam = db.SumColumn(Data,"TUTAR","EVRAKTIP = 2");
            $scope.DCekToplam = db.SumColumn(Data,"TUTAR","EVRAKTIP = 1");
            $scope.DGenelToplam = $scope.DNakitToplam + $scope.DKrediToplam + $scope.DSenetToplam + $scope.DCekToplam;
            $scope.DizaynListe = Data;
            $("#TblDizayn").jsGrid({data : $scope.DizaynListe});
            $("#TbDizayn").addClass('active');
        });
    }
}