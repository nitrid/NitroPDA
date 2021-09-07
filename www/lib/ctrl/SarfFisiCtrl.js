function SarfFisiCtrl($scope,$window,$timeout,db,$filter)
{      
    let IslemSelectedRow = null;
    let StokReceteSelectedRow = null;
    let StokSelectedRow = null;
    let ParamName = "SarfFisi";
    let AnaKodu = "";

    $('#MdlPartiLot').on('hide.bs.modal', function () 
    {
        if($scope.TxtParti == "" && $scope.TxtLot == 0)
        {
            $scope.BtnTemizle();
        }
    });

    $('#MdlRenkBeden').on('hide.bs.modal', function () 
    {   
        if($scope.Stok[0].RENK == '' ||  $scope.Stok[0].BEDEN == '')
        {
            $scope.BtnTemizle();
        }
    });
    function Init()
    {
        gtag('config', 'UA-12198315-14', 
        {
            'page_title' : 'İrsaliye',
            'page_path': '/Irsaliye'
        });

        UserParam = Param[$window.sessionStorage.getItem('User')];
        $scope.Firma = $window.sessionStorage.getItem('Firma');

        $scope.Seri = "STV";
        $scope.Sira = 0;
        $scope.Tip = 1;
        $scope.Cins = 5;
        $scope.NormalIade = 0;
        $scope.EvrakTip = 0;
        $scope.BelgeNo = "";
        $scope.DepoNo;
        $scope.DepoAdi = "";
        $scope.Tarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.Saat = moment(new Date()).format("LTS");
        $scope.MalKabulSevkTarihi = moment(new Date()).format("DD.MM.YYYY");
        $scope.BelgeTarih = 0;
        $scope.Sorumluluk = "";
        $scope.SorumlulukAdi = "";
        $scope.OdemeNo = "0";
        $scope.Barkod = "";
        $scope.Birim = 0;
        $scope.StokGridTip = "0";
        $scope.StokGridText = "";
        $scope.Proje = "";
        $scope.Miktar2 = 0;
        $scope.ToplamSatir = 0;
        $scope.CariBakiye = "";
        $scope.Adres = "";
        $scope.Adres1 = "";
        $scope.Adres2 = "";
        $scope.Il = "";
        $scope.CariVDADI = "";
        $scope.CariVDNO = "";
        $scope.VergiEdit = "";
        $scope.Fiyat = "";
        $scope.EvrakDovizTip = "";
        $scope.Special = "1";
        $scope.Aciklama = "";
        $scope.BelgeNo = "";
        $scope.AdresNo = "0";
        $scope.RiskParam = UserParam.Sistem.RiskParam;
        $scope.Risk = 0;
        $scope.RiskLimit = 0; 
        $scope.FisDizaynTip = "0";
        $scope.TxtReceteStokGrid = "";
        $scope.VirmanMiktar = 0;
        $scope.VirmanFiyat = 0;
        $scope.GiderKodu = "";
        $scope.GiderAdi = "";

        $scope.DepoListe = [];
        $scope.CariListe = [];
        $scope.SorumlulukListe = [];
        $scope.ProjeListe = [];
        $scope.OdemePlanListe = [];
        $scope.IrsaliyeListe = [];
        $scope.BedenHarListe = [];
        $scope.BirimListe = [];
        $scope.StokListe = [];
        $scope.StokReceteListe = [];
        $scope.StokTuketimListe = [];
        $scope.PartiLotListe = [];
        $scope.RenkListe = [];
        $scope.BedenListe = [];
        $scope.DepoMiktarListe = [];
        $scope.AdresNoListe = [];
        $scope.GirisHareket = [];
        $scope.MasrafHesapListe = [];

        $scope.AraToplam = 0;
        $scope.ToplamIndirim = 0;
        $scope.NetToplam = 0;
        $scope.ToplamKdv = 0;
        $scope.GenelToplam = 0;

        $scope.Stok = [];
        $scope.Miktar = 1;

        $scope.CmbCariAra = "0";
        $scope.TxtReceteMiktar = "";
        $scope.EvrakLock = false;
        $scope.BarkodLock = false;
        $scope.FiyatLock = false;
        $scope.IslemListeSelectedIndex = -1;

        $scope.TxtParti = "";
        $scope.SktTarih = moment(new Date()).format("DD.MM.YYYY");

        $scope.OtoEkle = false;

        // DÜZENLE MODAL
        $scope.MiktarEdit = 0;
        $scope.FiyatEdit = 0;
        //İSKONTO MODAL
        $scope.IskontoTip = 0;
        $scope.IskYuzde1 = 0;
        $scope.IskYuzde2 = 0;
        $scope.IskYuzde3 = 0;
        $scope.IskYuzde4 = 0;
        $scope.IskYuzde5 = 0;
        $scope.IskTutar1 = 0;
        $scope.IskTutar2 = 0;
        $scope.IskTutar3 = 0;
        $scope.IskTutar4 = 0;
        $scope.IskTutar5 = 0;
        $scope.IskTplTutar1 = 0;
        $scope.IskTplTutar2 = 0;
        $scope.IskTplTutar3 = 0;
        $scope.IskTplTutar4 = 0;
        $scope.IskTplTutar5 = 0;
        $scope.IskTplTutar = 0;

        $scope.TblLoading = true;

        //DIZAYN
        $scope.DGenelToplam = 0;
        $scope.DizaynListe = [];
    }
    function InitIslemGrid()
    {   
        $("#TblIslem").jsGrid({
            responsive: true,
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.IrsaliyeListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            
            fields: 
            [{
                name: "NO",
                title: "NO",
                type: "number",
                align: "center",
                width: 75
                
            }, 
            {
                name: "sth_stok_kod",
                title: "KODU",
                type: "text",
                align: "center",
                width: 100
            },
            {
                name: "ADI",
                title: "ADI",
                type: "text",
                align: "center",
                width: 200
            }, 
            {
                name: "sth_miktar",
                title: "MİKTAR",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "VIRMANTIP",
                title: "HAREKET",
                type: "number",
                align: "center",
                width: 100
            }
            ],
            rowClick: function(args)
            {
                $scope.IslemListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitStokGrid()
    {
        $("#TblStokReceteListe").jsGrid
        (   {
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.StokReceteListe,
            paging : true,
            pageSize: 7,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: [
                {
                    name: "ANAKOD",
                    title: "ANAKOD",
                    type: "text",
                    align: "center",
                    width: 125
                }, 
                {
                    name: "ISIM",
                    title: "ISIM",
                    type: "text",
                    align: "center",
                    width: 100
                }
            ],
            rowClick: function(args)
            {
                $scope.StokReceteListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
        $("#TblStok").jsGrid
        (   {
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.StokListe,
            paging : true,
            pageSize: 7,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: [
                {
                    name: "KODU",
                    title: "KODU",
                    type: "text",
                    align: "center",
                    width: 125
                }, 
                {
                    name: "ADI",
                    title: "ADI",
                    type: "text",
                    align: "center",
                    width: 300
                }, 
                {
                    name: "DEPOMIKTAR",
                    title: "DEPO MIKTAR",
                    type: "number",
                    align: "center",
                    width: 100
                } 
            ],
            rowClick: function(args)
            {
                $scope.StokListeRowClick(args.itemIndex,args.item,this);
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
            }
           ],
            rowClick: function(args)
            {
                $scope.$apply();
            }
        });
    }
    function DipToplamHesapla()
    {
        $scope.AraToplam = 0;
        $scope.ToplamIndirim = 0;
        $scope.ToplamKdv = 0;
        $scope.NetToplam = 0;
        $scope.GenelToplam = 0;

        angular.forEach($scope.IrsaliyeListe,function(value)
        {
            $scope.AraToplam += value.sth_tutar;
            $scope.ToplamIndirim += (value.sth_iskonto1 + value.sth_iskonto2 + value.sth_iskonto3 + value.sth_iskonto4 + value.sth_iskonto5 + value.sth_iskonto6);
            $scope.ToplamKdv +=  value.sth_vergi //(value.sth_tutar - (value.sth_iskonto1 + value.sth_iskonto2 + value.sth_iskonto3 + value.sth_iskonto4 + value.sth_iskonto5 + value.sth_iskonto6)) * (value.TOPTANVERGI / 100);
        });
        $scope.NetToplam = $scope.AraToplam - $scope.ToplamIndirim;
        $scope.GenelToplam = $scope.NetToplam + $scope.ToplamKdv;
    }
    function BarkodFocus()
    {
        $timeout( function(){$window.document.getElementById("Barkod").focus();},100);  
    }
    function BedenHarInsert(pGuid)
    {
        let Data =
        [
            UserParam.MikroId, // KULLANICI
            UserParam.MikroId, // KULLANICI
            11, // BEDEN TİP
            pGuid, // GUID
            Kirilim($scope.Stok[0].BEDENPNTR,$scope.Stok[0].RENKPNTR), // BEDEN NO
            $scope.Miktar,  // MİKTAR
            0,  // REZERVASYON MİKTAR
            0  // REZERVASYON TESLİM MİKTAR
        ];
        db.ExecuteTag($scope.Firma,'BedenHarInsert',Data,function(data)
        {   
            if(typeof(data.result.err) == 'undefined')
            {   
                db.GetData($scope.Firma,'StokBedenHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,11],function(BedenData)
                {
                    $scope.BedenHarListe = BedenData;
                    db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(IrsaliyeData)
                    {
                        InsertAfterRefresh(IrsaliyeData);
                    });

                });
            }
            else
            {
                console.log(data.result.err);
            }
        });
    }
    function BedenHarUpdate(pData) 
    {
        db.ExecuteTag($scope.Firma,'BedenHarUpdate',pData,function(data)
        {
            if(typeof(data.result.err) == 'undefined')
            {
                db.GetData($scope.Firma,'StokBedenHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,11],function(BedenData)
                {
                    $scope.BedenHarListe = BedenData;
                });
            }
            else
            {
                console.log(data.result.err);
            }
        });
    }
    function Beep()
    {
        navigator.notification.vibrate(1000);
        document.getElementById("Beep").play();
    }
    function Confirmation()
    {
        navigator.vibrate([100,100,200,100,300]);
    }
    function InsertAfterRefresh(pData)
    {    
        $scope.EvrakLock = true;
        $scope.BarkodLock = false;

        $scope.IrsaliyeListe = pData;
        $("#TblIslem").jsGrid({data : $scope.IrsaliyeListe}); 
        $scope.BtnTemizle();
        DipToplamHesapla();
        ToplamMiktarHesapla();
        
        $window.document.getElementById("Barkod").focus();
    }
    function ToplamMiktarHesapla()
    {
        $scope.ToplamSatir = 0;

        angular.forEach($scope.IrsaliyeListe,function(value)
        {
            $scope.ToplamSatir += 1 ;
        });
    }    
    function InsertData()
    {   
        var InsertData = 
        [
            UserParam.MikroId,
            UserParam.MikroId,
            0, //FİRMA NO
            0, //ŞUBE NO
            $scope.Tarih,
            $scope.Tip, //0 İSE GİREN 1 ÇIKAN
            $scope.Cins,
            $scope.NormalIade,
            $scope.EvrakTip,
            $scope.Seri,
            $scope.Sira,
            $scope.BelgeNo,
            $scope.Tarih,
            $scope.Stok[0].KODU,
            0, //ISKONTO TUTAR 1
            0, //ISKONTO TUTAR 2
            0, //ISKONTO TUTAR 3
            0, //ISKONTO TUTAR 4
            0, //ISKONTO TUTAR 5
            0, //ISKONTO TUTAR 6
            0, //ISKONTO TUTAR 7
            0, //ISKONTO TUTAR 8
            0, //ISKONTO TUTAR 9
            0, //ISKONTO TUTAR 10
            0, //SATIR ISKONTO TİP 1
            0, //SATIR ISKONTO TİP 2
            0, //SATIR ISKONTO TİP 3
            0, //SATIR ISKONTO TİP 4
            0, //SATIR ISKONTO TİP 5
            0, //SATIR ISKONTO TİP 6
            0, //SATIR ISKONTO TİP 7
            0, //SATIR ISKONTO TİP 8
            0, //SATIR ISKONTO TİP 9
            0, //SATIR ISKONTO TİP 10
            0, //CARİCİNSİ
            '',//CARİKODU
            $scope.GiderKodu,//İŞEMRİKODU
            '',//PERSONEL
            0, //HARDOVİZCİNSİ
            0, //HARDOVİZKURU
            0, //ALTDOVİZKURU
            0, //STOKDOVİZCİNSİ
            0, //STOKDOVİZKURU
            $scope.Miktar * $scope.Stok[0].CARPAN,
            $scope.Miktar2,
            $scope.Stok[0].BIRIMPNTR,
            $scope.Stok[0].TUTAR,
            0, // İSKONTO 1
            0, // İSKONTO 2
            0, // İSKONTO 3
            0, // İSKONTO 4
            0, // İSKONTO 5
            0, // İSKONTO 6
            0, // MASRAF 1
            0, // MASRAF 2
            0, // MASRAF 3
            0, // MASRAF 4
            $scope.Stok[0].TOPTANVERGIPNTR, //VERİPNTR
            $scope.Stok[0].KDV,             //VERGİ
            0, // MASRAFVERGİPNTR,
            0, // MASRAFVERGİ
            $scope.OdemeNo,
            '',//AÇIKLAMA
            '00000000-0000-0000-0000-000000000000', //sth_sip_uid
            '00000000-0000-0000-0000-000000000000', //sth_fat_uid,
            $scope.DepoNo, //GİRİSDEPONO
            $scope.DepoNo, //CİKİSDEPONO
            $scope.Tarih, //MALKABULSEVKTARİHİ
            '', // CARİSORUMLULUKMERKEZİ
            '', // SORUMLULUK
            0,  // VERGİSİZFL
            $scope.AdresNo,  // ADRESNO
            $scope.Stok[0].PARTI,
            $scope.Stok[0].LOT,
            $scope.Proje,
            '', // EXİMKODU
            0,  // DİSTİCARETTURU
            0,  // OTVVERGİSİZFL
            0,  // OİVVERGİSİZ
            0,  //CARİFİYATLİSTE
            0,   //NAKLİYEDEPO
            0,   // NAKLİYEDURUMU
        ];

        db.ExecuteTag($scope.Firma,'StokHarInsert',InsertData,function(InsertResult)
        {  
            if(typeof(InsertResult.result.err) == 'undefined')
            {  
                db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(IrsaliyeData)
                {  
                    $scope.IrsaliyeListe = IrsaliyeData;
                    if($scope.Stok[0].BEDENPNTR != 0 && $scope.Stok[0].RENKPNTR != 0)
                    {   
                        BedenHarInsert(InsertResult.result.recordset[0].sth_Guid);
                    } 
                    InsertAfterRefresh(IrsaliyeData);  

                    $scope.InsertLock = false
                    if(UserParam.Sistem.Titresim == 1)
                    {
                        Confirmation();
                    }
                    FisData(IrsaliyeData);
                    
                });
            }
            else
            {
                console.log(InsertResult.result.err);
            }
            
        });
    }
    function UpdateData(pData) 
    {   
        db.ExecuteTag($scope.Firma,'StokHarUpdate',pData.Param,function(InsertResult)
        {
            if(typeof(InsertResult.result.err) == 'undefined')
            {
                db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,0],function(IrsaliyeData)
                {                      
                    InsertAfterRefresh(IrsaliyeData);
                    FisData(IrsaliyeData);
                    $scope.InsertLock = false;
                    if(UserParam.Sistem.Titresim == 1)
                    {
                        Confirmation();
                    }
                });
            }
            else
            {
                console.log(InsertResult.result.err);
            }
        });
    }
    function StokBarkodGetir(pBarkod)    
    {
        // KİLO BARKODU KONTROLÜ - RECEP KARACA 10.09.2019
        let Kilo = pBarkod;
        let KiloFlag = UserParam.Sistem.KiloFlag;
        let FlagDizi = KiloFlag.split(',')
        let Flag = Kilo.slice(0,2);
 
        for (i = 0; i < FlagDizi.length; i++ )
        {
            if(Flag == FlagDizi[i])
            {
                var kBarkod = Kilo.slice(0,UserParam.Sistem.KiloBaslangic);
                var Uzunluk = Kilo.slice(parseInt(UserParam.Sistem.KiloBaslangic),parseInt(UserParam.Sistem.KiloBaslangic)+parseInt(UserParam.Sistem.KiloUzunluk));
                pBarkod = kBarkod
                $scope.Miktar = (Uzunluk * UserParam.Sistem.KiloCarpan)
            }
        }
        // ----------------------------------------------------
        if(pBarkod != '')
        {
            db.StokBarkodGetir($scope.Firma,pBarkod,$scope.DepoNo,async function(BarkodData)
            {   
                if(BarkodData.length > 0)
                { 
                    $scope.Stok = BarkodData;
                    $scope.StokKodu = $scope.Stok[0].KODU;
                    if(UserParam.Sistem.PartiLotKontrol == 1)
                    {
                        for(i = 0;i < $scope.IrsaliyeListe.length;i++)
                        {   
                            if($scope.Stok[0].PARTI != "" && $scope.Stok[0].LOT != "")
                            {
                                if($scope.Stok[0].PARTI == $scope.IrsaliyeListe[i].sth_parti_kodu && $scope.Stok[0].LOT == $scope.IrsaliyeListe[i].sth_lot_no)
                                {
                                    alertify.alert("<a style='color:#3e8ef7''>" + "Okutmuş Olduğunuz "+ $scope.Stok[0].PARTI + ". " + "Parti " + $scope.Stok[0].LOT + ". " +"Lot Daha Önceden Okutulmuş !" + "</a>" );
                                    $scope.InsertLock = false;
                                    $scope.BtnTemizle();
                                    return;
                                }
                            }
                        }
                    }
                    $scope.Stok[0].FIYAT = 0;
                    $scope.Stok[0].TUTAR = 0;
                    $scope.Stok[0].INDIRIM = 0;
                    $scope.Stok[0].KDV = 0;
                    $scope.Stok[0].TOPTUTAR = 0;     
                    
                    //Depo Miktar Getir (Stok Detay)
                    var DepoMiktar =
                    {
                        db : '{M}.' + $scope.Firma,
                        query : "SELECT dep_adi DEPOADI,dep_no DEPONO,(SELECT dbo.fn_DepodakiMiktar(@STOKKODU,DEPOLAR.dep_no,GETDATE())) AS DEPOMIKTAR FROM DEPOLAR ",
                        param : ['STOKKODU'],
                        type : ['string|50'],
                        value : [$scope.StokKodu]
                    }
                    db.GetDataQuery(DepoMiktar,function(pDepoMiktar)
                    {   
                        $scope.DepoMiktarListe = pDepoMiktar
                        $("#TblDepoMiktar").jsGrid({data : $scope.DepoMiktarListe});
                    });

                    await db.GetPromiseTag($scope.Firma,'CmbBirimGetir',[BarkodData[0].KODU],function(data)
                    {   
                        $scope.BirimListe = data;
                        $scope.Birim = JSON.stringify($scope.Stok[0].BIRIMPNTR); 

                        if($scope.BirimListe.length > 0)
                        {
                            
                            $scope.Stok[0].BIRIMPNTR = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].BIRIMPNTR;
                            $scope.Stok[0].BIRIM = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].BIRIM;
                            $scope.Stok[0].CARPAN = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].KATSAYI;
                            $scope.MiktarFiyatValid();
                        }
                        else
                        {  //BİRİMSİZ ÜRÜNLERDE BİRİMİ ADETMİŞ GİBİ DAVRANIYOR. RECEP KARACA 23.09.2019
                            $scope.Stok[0].BIRIMPNTR = 1;
                            $scope.Stok[0].BIRIM = 'ADET';
                            $scope.Stok[0].CARPAN = 1;
                            $scope.MiktarFiyatValid();

                        }
                        
                    });

                    if($scope.Stok[0].BEDENPNTR == 0 || $scope.Stok[0].RENKPNTR == 0)
                    {
                        if($scope.Stok[0].BEDENKODU != '' && $scope.Stok[0].RENKKODU != '')
                        {                
                            $('#MdlRenkBeden').modal("show");
                            db.GetData($scope.Firma,'RenkGetir',[$scope.Stok[0].RENKKODU],function(pRenkData)
                            {
                                $scope.RenkListe = pRenkData;
                                $scope.Stok[0].RENKPNTR = "1";
                            });
                            db.GetData($scope.Firma,'BedenGetir',[$scope.Stok[0].BEDENKODU],function(pBedenData)
                            {
                                $scope.BedenListe = pBedenData;
                                $scope.Stok[0].BEDENPNTR = "1";
                            });
                        }
                    }

                    let FiyatParam = 
                    { 
                        CariKodu : $scope.CariKodu,
                        CariFiyatListe : $scope.CariFiyatListe,
                        CariDovizKuru : $scope.CariDovizKuru,
                        CariIskontoKodu : $scope.CariIskontoKodu,
                        DepoNo : $scope.DepoNo,
                        FiyatListe : $scope.FiyatListeNo,
                        AlisSatis : 1,
                        OdemeNo : $scope.OdemeNo
                    };
                    
                    await db.FiyatGetir($scope.Firma,BarkodData,FiyatParam,UserParam[ParamName],function()
                    {   
                        $scope.Fiyat = $scope.Stok[0].FIYAT;
                        console.log(FiyatParam)
                        $scope.MiktarFiyatValid(); 
                        $scope.BarkodLock = true;
                        $scope.$apply();
                    });
                    // if($scope.Stok[0].DETAYTAKIP == 1 || $scope.Stok[0].DETAYTAKIP == 2)
                    // {
                    //     if($scope.Stok[0].PARTI !='')
                    //     {
                    //         db.GetData($scope.Firma,'PartiLotGetir',[$scope.Stok[0].KODU,$scope.DepoNo,$scope.Stok[0].PARTI,$scope.Stok[0].LOT],function(data)
                    //         {  
                    //             $scope.PartiLotListe = data;

                    //             if(UserParam.Sistem.PartiLotMiktarKontrol == 1 && $scope.Stok[0].LOT != 0)
                    //             {   
                    //                 $scope.Miktar = $scope.PartiLotListe[0].MIKTAR;
                    //                 $scope.Stok[0].TOPMIKTAR = $scope.Miktar * $scope.Stok[0].CARPAN;
                    //             }
                    //             $scope.MiktarFiyatValid();
                    //         });
                    //     }
                    //     else
                    //     {
                    //         PartiLotEkran();
                    //     }
                    // }
                    if($scope.OtoEkle == true)
                    {
                        $scope.Insert()
                    }
                    else
                    {
                        $window.document.getElementById("Miktar").focus();
                        $window.document.getElementById("Miktar").select();
                    }
                    console.log($scope.Barkod)
                }
                else
                {   
                    alertify.alert("<a style='color:#3e8ef7''>" + "Stok Bulunamamıştır !" + "</a>" );          
                    console.log("Stok Bulunamamıştır.");
                    Beep();
                }
            });
        }
    }
    function Kirilim(pBeden,pRenk)
    {
        if(pBeden != 0 && pRenk != 0)
        {
            return ((parseInt(pRenk) - 1) * 40) + parseInt(pBeden);
        }
        else if(pRenk == 0)
        {
            return pBeden;
        }
        else if(pBeden == 0)
        {
            return (parseInt(pRenk) - 1) * 40 + 1;
        }
    }
    function FisData(pData)
    { 
        $scope.FisLength = pData;
        if($scope.FisDizaynTip == "0")
        {
            $scope.FisDeger = "";
            $scope.FisData = "";
           try 
           {
                $scope.FisDeger = "";
                $scope.FisDeger = "                                    " + $scope.Tarih + "\n" + "                                    " +$scope.Seri + " - " + $scope.Sira + "\n" +"                                    "+ $scope.Tarih + "\n" + "                                    "+  $scope.Saat + "\n" + SpaceLength($scope.CariAdi,40) + "\n" + SpaceLength($scope.Adres1,50) + "\n" + SpaceLength($scope.Adres,10) + "\n" +  "  " + SpaceLength($scope.CariVDADI,25) + " " + $scope.CariVDNO + "\n";
    
                for(let i=0; i < pData.length; i++)
                {
                    $scope.FisData = $scope.FisData + SpaceLength(pData[i].ADI.substring(0,20),20) + "          " +   SpaceLength(parseFloat(pData[i].MIKTAR.toFixed(2)),4) + " " + SpaceLength(pData[i].BIRIMADI,4) + "\n";
                } 
           } 
           catch (error) 
           {
               console.log(error)
           }
        }
        else if($scope.FisDizaynTip == "1")
        {
            $scope.FisDeger = "";
            $scope.FisData = "";
           try 
           {
                $scope.FisDeger = "";
                $scope.FisDeger = "                                    "+ $scope.Tarih + "\n" + "                                    " +$scope.Seri + " - " + $scope.Sira + "\n" +"                                    "+ $scope.Tarih + "\n" + "                                    "+  $scope.Saat + "\n" + SpaceLength($scope.CariAdi,40) + "\n" + SpaceLength($scope.Adres1,50) + "\n" + SpaceLength($scope.Adres,25) + "\n" +  "  " + SpaceLength($scope.CariVDADI,25) + " " + $scope.CariVDNO + "\n";
    
                for(let i=0; i < pData.length; i++)
                {
                   $scope.FisData = $scope.FisData +  SpaceLength(pData[i].ADI.substring(0,28),30) + SpaceLength(pData[i].RENK + " " + pData[i].BEDEN,20) + SpaceLength(parseFloat(pData[i].MIKTAR.toFixed(2)),6) +  SpaceLength(parseFloat(pData[i].FIYAT.toFixed(2)),7) + " " +SpaceLength(parseFloat(pData[i].sth_tutar.toFixed(2)),7) + "\n";       
                } 
           } 
           catch (error) 
           {
               console.log(error)
           }
        }
    }
    function SpaceLength(pData,pLength)
    {
        let x = pLength - pData.toString().length;

        if(pData.toString().length > pLength)
        {
            pData = pData.toString().substring(0,pLength);
        }

        Space = "";

        for(let i=0; i < x; i++)
        {
            Space = Space + " ";
        }

        return pData + Space
    }
    $scope.MaxSira = async function()
    {   
        await db.MaxSiraPromiseTag($scope.Firma,'MaxStokHarSira',[$scope.DepoNo,$scope.Tarih],function(data){$scope.EvrakNo = data});
    }
    $scope.YeniEvrak = function ()
    {
        Init();
        console.log(UserParam);
        InitIslemGrid();
        InitStokGrid();
        InitDizaynGrid();

        $scope.FiyatListeNo = UserParam.SarfFisi.FiyatListe;
        $scope.EvrakLock = false;
        $scope.Seri = UserParam.SarfFisi.Seri;
        $scope.BelgeNo = UserParam.SarfFisi.BelgeNo;
        $scope.CariKodu = UserParam.SarfFisi.Cari;
        if(UserParam.SarfFisi.FiyatLock == 1)
        {
            $scope.FiyatLock = true;
        }
        $scope.Stok = 
        [
            {
                BIRIM : '',
                BIRIMPNTR : 0, 
                FIYAT : 0,
                TUTAR : 0,
                INDIRIM : 0,
                KDV : 0,
                TOPTUTAR :0
            }
        ];

        db.DepoGetir($scope.Firma,UserParam.SarfFisi.DepoListe,function(data)
        {
            $scope.DepoListe = data; 
            $scope.DepoNo = UserParam.SarfFisi.DepoNo;
            $scope.DepoListe.forEach(function(item) 
            {
                if(item.KODU == $scope.DepoNo)  
                    $scope.DepoAdi = item.ADI;
            });   
        });
        db.FillCmbDocInfo($scope.Firma,'MasrafHesapGetir',function(data)
        {
            $scope.MasrafHesapListe = data; 
            $scope.GiderKodu = UserParam.SarfFisi.DepoNo;
            $scope.MasrafHesapListe.forEach(function(item) 
            {
                if(item.KODU == $scope.GiderKodu )
                    $scope.GiderAdi = item.ADI;
            });     
        });
        db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(data)
        {
            $scope.SorumlulukListe = data; 
            $scope.Sorumluluk = UserParam.SarfFisi.Sorumluluk;
            $scope.SorumlulukListe.forEach(function(item)
            {
                if(item.KODU == $scope.Sorumluluk)
                    $scope.SorumlulukAdi = item.ADI;
            });
        });  
        db.FillCmbDocInfo($scope.Firma,'CmbProjeGetir',function(data){$scope.ProjeListe = data; $scope.Proje = UserParam.SarfFisi.Proje});
        db.FillCmbDocInfo($scope.Firma,'CmbOdemePlanGetir',function(data){$scope.OdemePlanListe = data; $scope.OdemeNo = '0'});

        db.MaxSira($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip],function(data){$scope.Sira = data});       
        
        BarkodFocus();
    }
    $scope.BtnStokGridGetir = function()
    {
        $scope.Loading = true;
        $scope.TblLoading = false;
        let Kodu = '';
        let Adi = '';

        if($scope.StokGridTip == "0")
        {   
            Adi = $scope.StokGridText.replace("*","%").replace("*","%");
        }
        else
        {
            Kodu = $scope.StokGridText.replace("*","%").replace("*","%");
        }
            
        db.GetData($scope.Firma,'StokGetir',[Kodu,Adi,$scope.DepoNo,''],function(StokData)
        {
            $scope.StokListe = StokData;
            if($scope.StokListe.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblStok").jsGrid({data : $scope.StokListe});
                $("#TblStok").jsGrid({data : $scope.StokListe});
                $("#TblStok").jsGrid({pageIndex: true});
            }
            else
            {
                alertify.alert("Stok Bulunamadı")
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblStok").jsGrid({data : $scope.StokListe});
                $("#TblStok").jsGrid({data : $scope.StokListe});
                $("#TblStok").jsGrid({pageIndex: true});
            }
            
        });
    }
    $scope.BtnStokGridSec = function()
    {
        $("#MdlStokGetir").modal('hide');
        StokBarkodGetir($scope.Barkod);
        //$scope.BtnStokGridGetir();
        $("#TblStok").jsGrid({pageIndex: true})
    }
    $scope.BtnManuelArama = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            $scope.BtnStokGridGetir();
        }
    }
    $scope.SarfFisiEnter = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            $scope.BtnStokGridGetir();
        }  
    }
    $scope.BtnBarkodGetirClick = function()
    {
        StokBarkodGetir($scope.Barkod);
    }
    $scope.BtnStokBarkodGetir = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            StokBarkodGetir($scope.Barkod);    
        }
    }
    $scope.BtnOnlineYazdir = function()
    {   
        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "UPDATE STOK_HAREKETLERI SET sth_special1 = 1 " +
                    "WHERE sth_evrakno_seri = @sth_evrakno_seri AND sth_evrakno_sira = @sth_evrakno_sira AND sth_evraktip = @sth_evraktip ",
            param:  ['sth_evrakno_seri','sth_evrakno_sira','sth_evraktip'],
            type:   ['string|25','int','int',],
            value:  [$scope.Seri,$scope.Sira,$scope.EvrakTip]
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
    $scope.MiktarFiyatValid = function()
    {
        console.log($scope.Stok)
        $scope.Stok[0].TUTAR = ($scope.Stok[0].CARPAN * $scope.Miktar) * $scope.Stok[0].FIYAT;
        $scope.Stok[0].KDV = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].TOPTANVERGI / 100);
        $scope.Stok[0].TOPTUTAR = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) + $scope.Stok[0].KDV;
    }
    $scope.IslemListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( IslemSelectedRow ) { IslemSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        IslemSelectedRow = $row;
        $scope.IslemListeSelectedIndex = pIndex;
    }
    $scope.StokListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( StokSelectedRow ) { StokSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        StokSelectedRow = $row;
        console.log($scope.Barkod)
        $scope.Barkod = $scope.StokListe[pIndex].KODU;
        console.log($scope.Barkod)
        $scope.BarkodGirisClick();
        StokBarkodGetir($scope.Barkod);
        console.log($scope.Barkod)
    }
    $scope.BtnTemizle = function()
    {
        $scope.Barkod = "";
        $scope.Stok = null;
        $scope.Stok = 
        [
            {
                BIRIM : '',
                BIRIMPNTR : 0, 
                FIYAT : 0,
                TUTAR : 0,
                INDIRIM : 0,
                KDV : 0,
                TOPTUTAR :0
            }
        ];
        $scope.Miktar = 1;
        $scope.BarkodLock = false;

        $scope.BirimListe = [];
        BarkodFocus();      
    }
    $scope.BtnDuzenle = function()
    {
        $scope.MiktarEdit = $scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_miktar;
        $scope.FiyatEdit = $scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_tutar / $scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_miktar;

        $("#MdlDuzenle").modal('show');
    }
    $scope.BtnDuzenleKaydet = function(pIndex)
    {   
        let TmpTutar = $scope.FiyatEdit * $scope.MiktarEdit;
        let TmpYuzde1 = $scope.IrsaliyeListe[pIndex].sth_iskonto1 / $scope.IrsaliyeListe[pIndex].sth_tutar; 
        let TmpYuzde2 = $scope.IrsaliyeListe[pIndex].sth_iskonto2 / ($scope.IrsaliyeListe[pIndex].sth_tutar - $scope.IrsaliyeListe[pIndex].sth_iskonto1); 
        let TmpYuzde3 = $scope.IrsaliyeListe[pIndex].sth_iskonto3 / ($scope.IrsaliyeListe[pIndex].sth_tutar - ($scope.IrsaliyeListe[pIndex].sth_iskonto1 + $scope.IrsaliyeListe[pIndex].sth_iskonto2));
        let TmpYuzde4 = $scope.IrsaliyeListe[pIndex].sth_iskonto4 / ($scope.IrsaliyeListe[pIndex].sth_tutar - ($scope.IrsaliyeListe[pIndex].sth_iskonto1 + $scope.IrsaliyeListe[pIndex].sth_iskonto2 + $scope.IrsaliyeListe[pIndex].sth_iskonto3));
        let TmpYuzde5 = $scope.IrsaliyeListe[pIndex].sth_iskonto5 / ($scope.IrsaliyeListe[pIndex].sth_tutar - ($scope.IrsaliyeListe[pIndex].sth_iskonto1 + $scope.IrsaliyeListe[pIndex].sth_iskonto2 + $scope.IrsaliyeListe[pIndex].sth_iskonto3 + $scope.IrsaliyeListe[pIndex].sth_iskonto4));

        $scope.IrsaliyeListe[pIndex].sth_iskonto1 = TmpTutar * TmpYuzde1;
        $scope.IrsaliyeListe[pIndex].sth_iskonto2 = (TmpTutar - $scope.IrsaliyeListe[pIndex].sth_iskonto1) * TmpYuzde2;
        $scope.IrsaliyeListe[pIndex].sth_iskonto3 = (TmpTutar - ($scope.IrsaliyeListe[pIndex].sth_iskonto1 + $scope.IrsaliyeListe[pIndex].sth_iskonto2)) * TmpYuzde3;
        $scope.IrsaliyeListe[pIndex].sth_iskonto4 = (TmpTutar- ($scope.IrsaliyeListe[pIndex].sth_iskonto1 + $scope.IrsaliyeListe[pIndex].sth_iskonto2 + $scope.IrsaliyeListe[pIndex].sth_iskonto3)) * TmpYuzde4;
        $scope.IrsaliyeListe[pIndex].sth_iskonto5 = (TmpTutar - ($scope.IrsaliyeListe[pIndex].sth_iskonto1 + $scope.IrsaliyeListe[pIndex].sth_iskonto2 + $scope.IrsaliyeListe[pIndex].sth_iskonto3 + $scope.IrsaliyeListe[pIndex].sth_iskonto4)) * TmpYuzde5;

        $scope.Update(pIndex);
        angular.element('#MdlDuzenle').modal('hide');
    }
    $scope.MiktarPress = function(keyEvent)
    {
        if(keyEvent.which == 40)
        {
            $window.document.getElementById("Fiyat").focus();
            $window.document.getElementById("Fiyat").select();
        }
        if(keyEvent.which == 13)
        {     
            $scope.Insert();
        }
    }
    $scope.FiyatPress = function(keyEvent)
    {
        if(keyEvent.which == 38)
        {
            $window.document.getElementById("Miktar").focus();
            $window.document.getElementById("Miktar").select();
        }
        if(keyEvent.which == 13)
        {
            $scope.Insert();
        }
    }
    $scope.BtnIskontoEkran = function(pTip)
    {
        $scope.IskontoTip = pTip;
        $scope.IskYuzde1 = 0;
        $scope.IskYuzde2 = 0;
        $scope.IskYuzde3 = 0;
        $scope.IskYuzde4 = 0;
        $scope.IskYuzde5 = 0;
        $scope.IskTutar1 = 0;
        $scope.IskTutar2 = 0;
        $scope.IskTutar3 = 0;
        $scope.IskTutar4 = 0;
        $scope.IskTutar5 = 0;
        $scope.IskTplTutar1 = 0;
        $scope.IskTplTutar2 = 0;
        $scope.IskTplTutar3 = 0;
        $scope.IskTplTutar4 = 0;
        $scope.IskTplTutar5 = 0;
        $scope.IskTplTutar = 0;
        
        if(pTip == 0)
        {
            for(i = 0;i < $scope.IrsaliyeListe.length;i++)
            {
                $scope.IskTplTutar += $scope.IrsaliyeListe[i].sth_tutar;
                $scope.IskTutar1 += $scope.IrsaliyeListe[i].sth_iskonto1;
                $scope.IskTplTutar1 = $scope.IskTplTutar - $scope.IskTutar1;
                $scope.IskTutar2 += $scope.IrsaliyeListe[i].sth_iskonto2;
                $scope.IskTplTutar2 = $scope.IskTplTutar1 - $scope.IskTutar2;
                $scope.IskTutar3 += $scope.IrsaliyeListe[i].sth_iskonto3;
                $scope.IskTplTutar3 = $scope.IskTplTutar2 - $scope.IskTutar3;
                $scope.IskTutar4 += $scope.IrsaliyeListe[i].sth_iskonto4;
                $scope.IskTplTutar4 = $scope.IskTplTutar3 - $scope.IskTutar4;
                $scope.IskTutar5 += $scope.IrsaliyeListe[i].sth_iskonto5;
                $scope.IskTplTutar5 = $scope.IskTplTutar4 - $scope.IskTutar5;
            }
        }
        else
        {
            $scope.IskTplTutar = $scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_tutar;
            $scope.IskTutar1 = $scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_iskonto1;
            $scope.IskTplTutar1 = $scope.IskTplTutar - $scope.IskTutar1;
            $scope.IskTutar2 = $scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_iskonto2;
            $scope.IskTplTutar2 = $scope.IskTplTutar1 - $scope.IskTutar2;
            $scope.IskTutar3 = $scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_iskonto3;
            $scope.IskTplTutar3 = $scope.IskTplTutar2 - $scope.IskTutar3;
            $scope.IskTutar4 = $scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_iskonto4;
            $scope.IskTplTutar4 = $scope.IskTplTutar3 - $scope.IskTutar4;
            $scope.IskTutar5 = $scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_iskonto5;
            $scope.IskTplTutar5 = $scope.IskTplTutar4 - $scope.IskTutar5;
        }

        $scope.IskYuzde1 = (100 * $scope.IskTutar1) / $scope.IskTplTutar;
        $scope.IskYuzde2 = (100 * $scope.IskTutar2) / $scope.IskTplTutar1;
        $scope.IskYuzde3 = (100 * $scope.IskTutar3) / $scope.IskTplTutar2;
        $scope.IskYuzde4 = (100 * $scope.IskTutar4) / $scope.IskTplTutar3;
        $scope.IskYuzde5 = (100 * $scope.IskTutar5) / $scope.IskTplTutar4;

        $scope.IskTutar1 = $filter('number')($scope.IskTutar1,2);
        $scope.IskTutar2 = $filter('number')($scope.IskTutar2,2);
        $scope.IskTutar3 = $filter('number')($scope.IskTutar3,2);
        $scope.IskTutar4 = $filter('number')($scope.IskTutar4,2);
        $scope.IskTutar5 = $filter('number')($scope.IskTutar5,2);

        $scope.IskYuzde1 = $filter('number')($scope.IskYuzde1,2);
        $scope.IskYuzde2 = $filter('number')($scope.IskYuzde2,2);
        $scope.IskYuzde3 = $filter('number')($scope.IskYuzde3,2);
        $scope.IskYuzde4 = $filter('number')($scope.IskYuzde4,2);
        $scope.IskYuzde5 = $filter('number')($scope.IskYuzde5,2);

        $("#MdlIskontoEkran").modal('show');
    }
    $scope.IskontoValid = function(pTip,pIndex)
    {
        let TmpTutar = 0;

        if(pIndex == 1)
        {
            TmpTutar = $scope.IskTplTutar;

        }
        else
        {
            TmpTutar = this['IskTplTutar' + (pIndex - 1)];

        }

        if(pTip == 0)
        {
            this['IskTutar' + pIndex] = TmpTutar * (this['IskYuzde' + pIndex] / 100);
            this['IskTutar' + pIndex] = $filter('number')(this['IskTutar' + pIndex],4);

        }
        else
        {
            this['IskYuzde' + pIndex] = (100 * this['IskTutar' + pIndex]) / TmpTutar;
            this['IskYuzde' + pIndex] = $filter('number')(this['IskYuzde' + pIndex],4);
        }

        for(i = pIndex;i < 6;i++)
        {
            if(i == 1)
            {
                this['IskTplTutar' + i] = $scope.IskTplTutar - this['IskTutar' + pIndex];
            }
            else
            {
                this['IskTplTutar' + i] = this['IskTplTutar' + (i-1)] - this['IskTutar' + i];
            }

            this['IskTplTutar' + i] = $filter('number')(this['IskTplTutar' + i],4);

        }
    }
    $scope.BtnIskontoKaydet = function()
    {   
        if($scope.IskontoTip == 0)
        {   
            for(i = 0;i < $scope.IrsaliyeListe.length;i++)
            {
                $scope.IrsaliyeListe[i].sth_iskonto1 = $scope.IrsaliyeListe[i].sth_tutar * ($scope.IskYuzde1 / 100);
                $scope.IrsaliyeListe[i].sth_iskonto2 = ($scope.IrsaliyeListe[i].sth_tutar - $scope.IrsaliyeListe[i].sth_iskonto1) * ($scope.IskYuzde2 / 100);
                $scope.IrsaliyeListe[i].sth_iskonto3 = ($scope.IrsaliyeListe[i].sth_tutar - ($scope.IrsaliyeListe[i].sth_iskonto1 + $scope.IrsaliyeListe[i].sth_iskonto2)) * ($scope.IskYuzde3 / 100);
                $scope.IrsaliyeListe[i].sth_iskonto4 = ($scope.IrsaliyeListe[i].sth_tutar - ($scope.IrsaliyeListe[i].sth_iskonto1 + $scope.IrsaliyeListe[i].sth_iskonto2 + $scope.IrsaliyeListe[i].sth_iskonto3)) * ($scope.IskYuzde4 / 100);
                $scope.IrsaliyeListe[i].sth_iskonto5 = ($scope.IrsaliyeListe[i].sth_tutar - ($scope.IrsaliyeListe[i].sth_iskonto1 + $scope.IrsaliyeListe[i].sth_iskonto2 + $scope.IrsaliyeListe[i].sth_iskonto3 + $scope.IrsaliyeListe[i].sth_iskonto4)) * ($scope.IskYuzde5 / 100);

                $scope.FiyatEdit = $scope.IrsaliyeListe[i].sth_tutar / $scope.IrsaliyeListe[i].sth_miktar;
                $scope.MiktarEdit = $scope.IrsaliyeListe[i].sth_miktar;

                $scope.Update(i);
            }
            
        }
        else
        {
            let i = $scope.IslemListeSelectedIndex;

            $scope.IrsaliyeListe[i].sth_iskonto1 = $scope.IrsaliyeListe[i].sth_tutar * ($scope.IskYuzde1 / 100);
            $scope.IrsaliyeListe[i].sth_iskonto2 = ($scope.IrsaliyeListe[i].sth_tutar - $scope.IrsaliyeListe[i].sth_iskonto1) * ($scope.IskYuzde2 / 100);
            $scope.IrsaliyeListe[i].sth_iskonto3 = ($scope.IrsaliyeListe[i].sth_tutar - ($scope.IrsaliyeListe[i].sth_iskonto1 + $scope.IrsaliyeListe[i].sth_iskonto2)) * ($scope.IskYuzde3 / 100);
            $scope.IrsaliyeListe[i].sth_iskonto4 = ($scope.IrsaliyeListe[i].sth_tutar - ($scope.IrsaliyeListe[i].sth_iskonto1 + $scope.IrsaliyeListe[i].sth_iskonto2 + $scope.IrsaliyeListe[i].sth_iskonto3)) * ($scope.IskYuzde4 / 100);
            $scope.IrsaliyeListe[i].sth_iskonto5 = ($scope.IrsaliyeListe[i].sth_tutar - ($scope.IrsaliyeListe[i].sth_iskonto1 + $scope.IrsaliyeListe[i].sth_iskonto2 + $scope.IrsaliyeListe[i].sth_iskonto3 + $scope.IrsaliyeListe[i].sth_iskonto4)) * ($scope.IskYuzde5 / 100);
            
            $scope.FiyatEdit = $scope.IrsaliyeListe[i].sth_tutar / $scope.IrsaliyeListe[i].sth_miktar;
            $scope.MiktarEdit = $scope.IrsaliyeListe[i].sth_miktar;

            $scope.Update(i);
        }
        $("#MdlIskontoEkran").modal('hide');
        DipToplamHesapla()
    }
    $scope.BirimChange = function()
    {
        if($scope.BirimListe.length > 0)
        {
            $scope.Stok[0].BIRIMPNTR = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].BIRIMPNTR;
            $scope.Stok[0].BIRIM = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].BIRIM;
            $scope.Stok[0].CARPAN = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].KATSAYI;
            $scope.MiktarFiyatValid();
        }
    }
    $scope.DepoChange = function()
    {
        $scope.DepoListe.forEach(function(item) 
        {
            if(item.KODU == $scope.DepoNo)
                $scope.DepoAdi = item.ADI;
        });
    }
    $scope.MasrafHChange = function()
    {
        $scope.MasrafHesapListe.forEach(function(item) 
        {
            if(item.KODU == $scope.GiderKodu)
                $scope.GiderAdi = item.ADI;
        });
    }
    $scope.Insert = function()
    { 
        if(typeof($scope.Stok[0].KODU) != 'undefined')
        {
            if(ParamName == "SarfFisi")
            {
                if($scope.RiskParam != 0)
                {
                    let TmpRiskOran = ($scope.Risk / $scope.RiskLimit) * 100;

                    if(TmpRiskOran >= 100)
                    {
                        alertify.alert("Risk limitini aştınız");
                        return;
                    }
                    if(TmpRiskOran >= UserParam.Sistem.RiskLimitOran)
                    {
                        alertify.alert("Risk limitinin %" + parseInt(TmpRiskOran) + " kadarı doldu");
                    }
                }
            }
            if(UserParam.SatisIrsaliye.EksiyeDusme == 1 && $scope.EvrakTip == 1 &&  ($scope.Miktar * $scope.Stok[0].CARPAN) > $scope.Stok[0].DEPOMIKTAR)
            {
                alertify.alert("Eksiye Düşmeye İzin Verilmiyor.");
                return;
            } 
            $scope.InsertLock = true
            if(UserParam.Sistem.SatirBirlestir == 0 || $scope.Stok[0].DETAYTAKIP == 1 || $scope.Stok[0].DETAYTAKIP == 2  )
            {          
                InsertData();
            }
            else
            {
                if($scope.Stok[0].RENKPNTR != 0 || $scope.Stok[0].BEDENPNTR != 0)
                {
                    let UpdateStatus = false;

                    angular.forEach($scope.IrsaliyeListe,function(value)
                    {
                        if(value.sth_stok_kod == $scope.Stok[0].KODU && value.sth_tip == $scope.Tip)
                        {   
                            
                            let TmpQuery = 
                            {
                                db :'{M}.' + $scope.Firma,
                                query:  "SELECT BdnHar_Guid from BEDEN_HAREKETLERI WHERE BdnHar_Har_uid=@BdnHar_Har_uid AND BdnHar_BedenNo = @BdnHar_BedenHarNo",
                                param : ['BdnHar_Har_uid','BdnHar_BedenHarNo'],
                                type : ['string|50','int'],
                                value : [value.sth_Guid,Kirilim($scope.Stok[0].BEDENPNTR,$scope.Stok[0].RENKPNTR)]
                            }
                            db.GetDataQuery(TmpQuery,function(Data)
                            {
                                if(Data.length > 0)
                                {
                                    db.ExecuteTag($scope.Firma,'BedenHarGorUpdate',[$scope.Miktar * $scope.Stok[0].CARPAN,Data[0].BdnHar_Guid],function(data)
                                    {
                                        console.log(data)
                                    });
                                }
                                else
                                {
                                    BedenHarInsert(value.sth_Guid)
                                }
                            });
                           

                            let TmpFiyat  = value.sth_tutar / value.sth_miktar
                            let TmpMiktar = value.sth_miktar + ($scope.Miktar * $scope.Stok[0].CARPAN);
                            let Data = 
                            {
                                Param :
                                [
                                    TmpMiktar,
                                    0,
                                    TmpFiyat * TmpMiktar,
                                    $scope.Stok[0].TOPTANVERGIPNTR,
                                    0, //ISKONTO TUTAR 1
                                    0, //ISKONTO TUTAR 2
                                    0, //ISKONTO TUTAR 3
                                    0, //ISKONTO TUTAR 4
                                    0, //ISKONTO TUTAR 5
                                    0, //ISKONTO TUTAR 6
                                    0, //SATIR ISKONTO TİP 1
                                    0, //SATIR ISKONTO TİP 2
                                    0, //SATIR ISKONTO TİP 3
                                    0, //SATIR ISKONTO TİP 4
                                    0, //SATIR ISKONTO TİP 5
                                    0, //SATIR ISKONTO TİP 6
                                    value.sth_Guid
                                ],
                                BedenPntr : $scope.Stok[0].BEDENPNTR,
                                RenkPntr : $scope.Stok[0].RENKPNTR,
                                Miktar : TmpMiktar,
                                Guid : value.sth_Guid
                            };
    
                            UpdateStatus = true;
                            UpdateData(Data);
                        }                        
                    });
    
                    if(!UpdateStatus)
                    {

                        InsertData();
                    } 
                }
                else
                {
                    let UpdateStatus = false;

                    angular.forEach($scope.IrsaliyeListe,function(value)
                    {
                        if(value.sth_stok_kod == $scope.Stok[0].KODU  && value.sth_tip == $scope.Tip)
                        {   
                            console.log(value.sth_tip)
                            console.log( $scope.Tip)
                            let TmpFiyat  = value.sth_tutar / value.sth_miktar
                            let TmpMiktar = value.sth_miktar + ($scope.Miktar * $scope.Stok[0].CARPAN);
                            let Data = 
                            {
                                Param :
                                [
                                    TmpMiktar,
                                    0,
                                    TmpFiyat * TmpMiktar,
                                    $scope.Stok[0].TOPTANVERGIPNTR,
                                    0, //ISKONTO TUTAR 1
                                    0, //ISKONTO TUTAR 2
                                    0, //ISKONTO TUTAR 3
                                    0, //ISKONTO TUTAR 4
                                    0, //ISKONTO TUTAR 5
                                    0, //ISKONTO TUTAR 6
                                    0, //SATIR ISKONTO TİP 1
                                    0, //SATIR ISKONTO TİP 2
                                    0, //SATIR ISKONTO TİP 3
                                    0, //SATIR ISKONTO TİP 4
                                    0, //SATIR ISKONTO TİP 5
                                    0, //SATIR ISKONTO TİP 6
                                    value.sth_Guid
                                ],
                                BedenPntr : $scope.Stok[0].BEDENPNTR,
                                RenkPntr : $scope.Stok[0].RENKPNTR,
                                Miktar : TmpMiktar,
                                Guid : value.sth_Guid
                            };
    
                            UpdateStatus = true;
                            UpdateData(Data);
                        }                        
                    });
    
                    if(!UpdateStatus)
                    {
                        InsertData();
                    } 
                }
            }
        }
        else
        {
            console.log("Barkod Okutunuz!");
            $scope.InsertLock = false
        }     

        BarkodFocus();
    }
    $scope.EvrakGetir = function ()
    {
        db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],async function(data)
        {
            if(data.length > 0)
            {
                
                Init();
                InitIslemGrid(); 
                
                $scope.CariFiyatListe = data[0].sth_fiyat_liste_no;
                $scope.Seri = data[0].sth_evrakno_seri;
                $scope.Sira = data[0].sth_evrakno_sira;
                $scope.Tip = data[0].sth_tip;
                $scope.EvrakTip = data[0].sth_evraktip.toString();
                $scope.CariKodu = data[0].sth_cari_kodu;
                $scope.CariAdi = data[0].CARIADI;
                $scope.Sorumluluk = data[0].sth_stok_srm_merkezi;
                $scope.BelgeNo = data[0].sth_belge_no;
                $scope.Tarih = new Date(data[0].sth_tarih).toLocaleDateString();
                $scope.KabulTarihi = new Date(data[0].sth_malkbl_sevk_tarihi).toLocaleDateString();
                $scope.Barkod = "";
                $scope.Stok = 
                [
                    {
                        BIRIM : '',
                        BIRIMPNTR : 0, 
                        FIYAT : 0,
                        TUTAR : 0,
                        INDIRIM : 0,
                        KDV : 0,
                        TOPTUTAR :0
                    }
                ];
                $scope.Miktar = 1;

                $scope.AraToplam = 0;
                $scope.ToplamIndirim = 0;
                $scope.NetToplam = 0;
                $scope.ToplamKdv = 0;
                $scope.GenelToplam = 0;

                $scope.CmbCariAra = "0";
                $scope.TxtCariAra = "";
                
                $scope.BedenHarListe = await db.GetPromiseTag($scope.Firma,'StokBedenHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,11])

                db.DepoGetir($scope.Firma,UserParam.SarfFisi.DepoListe,function(e)
                {
                    $scope.DepoListe = e; 
                    $scope.DepoNo = data[0].sth_giris_depo_no.toString();
                    $scope.DepoListe.forEach(function(item) 
                    {
                        if(item.KODU == $scope.DepoNo)
                            $scope.DepoAdi = item.ADI;
                    });     
                });
                
                db.FillCmbDocInfo($scope.Firma,'CmbOdemePlanGetir',function(e){$scope.OdemePlanListe = e; $scope.OdemeNo = data[0].sth_odeme_op.toString()});
                
                $scope.IrsaliyeListe = data;
                $("#TblIslem").jsGrid({data : $scope.IrsaliyeListe});  
                DipToplamHesapla();
                ToplamMiktarHesapla()
                
                $scope.EvrakLock = true;
                $scope.BarkodLock = false;

                angular.element('#MdlEvrakGetir').modal('hide');

                BarkodFocus();
                FisData(data)

                alertify.alert("Evrak Başarıyla Getirildi.");
            }
            else
            {
                angular.element('#MdlEvrakGetir').modal('hide');
                alertify.okBtn("Tamam");
                alertify.alert("Evrak bulunamadı !");
            }
        });
    }
    $scope.EvrakDelete = function(pAlisSatis)
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Evrağı silmek istediğinize eminmisiniz ?', 
        function()
        { 
            if($scope.IrsaliyeListe.length > 0)
            {
                if(UserParam.SarfFisi.EvrakSil == 0)
                {
                    db.ExecuteTag($scope.Firma,'StokHarEvrDelete',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
                    {
                        if(typeof(data.result.err) == 'undefined')
                        {
                            angular.forEach($scope.IrsaliyeListe,function(value)
                            {
                                db.ExecuteTag($scope.Firma,'BedenHarDelete',[value.sth_Guid,11],function(data)
                                {
                                    if(typeof(data.result.err) != 'undefined')
                                    {
                                        console.log(data.result.err);
                                    }       
                                });
                            });
                        }
                        else
                        {
                            console.log(data.result.err);
                        }
                         //ALIŞ = 0 SATIŞ = 1
                        if(pAlisSatis == 0)
                        {
                            ParamName = "Stok";
                            $scope.YeniEvrak(0)
                        }
                        else
                        {
                            ParamName = "SatisIrsaliye";
                            $scope.YeniEvrak(1)
                        }
                    });
                    alertify.alert("Evrak silme işlemi başarıyla gerçekleşti. !");
                }
                else
                {
                    alertify.okBtn("Tamam");
                    alertify.alert("Evrak silme yetkiniz yok !");
                }
            }
            else
            {
                alertify.okBtn("Tamam");
                alertify.alert("Kayıtlı evrak olmadan evrak silemezsiniz !");
            }
        }
        ,function(){});
    }
    $scope.SatirDelete = function(pAlisSatis)
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Evrağı silmek istediğinize eminmisiniz ?', 
        function()
        { 
            if($scope.IslemListeSelectedIndex > -1)
            {
                if(UserParam.SarfFisi.EvrakSil == 0)
                {
                    db.ExecuteTag($scope.Firma,'StokHarSatirDelete',[$scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_Guid],function(data)
                    {
                        if(typeof(data.result.err) == 'undefined')
                        {
                            db.ExecuteTag($scope.Firma,'BedenHarDelete',[$scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_Guid,11],function(data)
                            {
                                if(typeof(data.result.err) != 'undefined')
                                {
                                    console.log(data.result.err);
                                }       
                            });
                        }
                        else
                        {
                            console.log(data.result.err);
                        }
                        
                        if($scope.IrsaliyeListe.length <= 1)
                        {
                            //ALIŞ = 0 SATIŞ = 1
                            if(pAlisSatis == 0)
                            {
                                ParamName = "SarfFisi";
                                $scope.YeniEvrak(0)
                            }
                            else
                            {
                                ParamName = "SarfFisi";
                                $scope.YeniEvrak(1)
                            }
                        }
                        else
                        {   
                            db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
                            {
                                db.GetData($scope.Firma,'StokBedenHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,11],function(BedenData)
                                {
                                    $scope.BedenHarListe = BedenData;
                                });

                                $scope.IrsaliyeListe = data;
                                $("#TblIslem").jsGrid({data : $scope.IrsaliyeListe});    
                                $scope.BtnTemizle();
                            });
                        }
                    });
                }
                else
                {
                    alertify.okBtn("Tamam");
                    alertify.alert("Evrak silme yetkiniz yok !");
                }
            }
            else
            {
                alertify.okBtn("Tamam");
                alertify.alert("Seçili satır olmadan evrak silemezsiniz !");
            }
        },
        function(){});
    }
    $scope.Update = function(pIndex)
    {   
        let Data = 
        {   
            Param :
            [
                $scope.MiktarEdit,
                0,
                $scope.FiyatEdit * $scope.MiktarEdit,
                $scope.IrsaliyeListe[pIndex].sth_vergi_pntr,
                $scope.IrsaliyeListe[pIndex].sth_iskonto1, //ISKONTO TUTAR 1
                $scope.IrsaliyeListe[pIndex].sth_iskonto2, //ISKONTO TUTAR 2
                $scope.IrsaliyeListe[pIndex].sth_iskonto3, //ISKONTO TUTAR 3
                $scope.IrsaliyeListe[pIndex].sth_iskonto4, //ISKONTO TUTAR 4
                $scope.IrsaliyeListe[pIndex].sth_iskonto5, //ISKONTO TUTAR 5
                0, //ISKONTO TUTAR 6
                $scope.IrsaliyeListe[pIndex].sth_sat_iskmas1, //SATIR ISKONTO 1
                $scope.IrsaliyeListe[pIndex].sth_sat_iskmas2, //SATIR ISKONTO 2
                $scope.IrsaliyeListe[pIndex].sth_sat_iskmas3, //SATIR ISKONTO 3
                $scope.IrsaliyeListe[pIndex].sth_sat_iskmas4, //SATIR ISKONTO 4
                $scope.IrsaliyeListe[pIndex].sth_sat_iskmas5, //SATIR ISKONTO 5
                0, // SATIR ISKONTO 6
                $scope.IrsaliyeListe[pIndex].sth_Guid
            ],
            BedenPntr : $scope.IrsaliyeListe[pIndex].BEDENPNTR,
            RenkPntr : $scope.IrsaliyeListe[pIndex].RENKPNTR,
            Miktar : $scope.MiktarEdit,
            Guid : $scope.IrsaliyeListe[pIndex].sth_Guid
        };
        UpdateData(Data);   
    }
    $scope.ManuelAramaClick = function() 
    {
        $("#TbStok").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TbDizayn").removeClass('active');
    }
    $scope.MainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbStok").removeClass('active');
        $("#TbDizayn").removeClass('active');
        $("#TbStokRecete").removeClass('active');
    }
    $scope.BelgeBilgisiClick = function() 
    {
        $("#TbBelgeBilgisi").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbDizayn").removeClass('active');
    }
    $scope.BarkodGirisClick = function() 
    {   
        if($scope.Sira == 0 || typeof $scope.Sira == "undefined")
        {            
            alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Evrak Siranın Gelmesini Bekleyin!" + "</a>" );
        }
        else
        {
            $("#TbBarkodGiris").addClass('active');
            $("#TbMain").removeClass('active');
            $("#TbBelgeBilgisi").removeClass('active');
            $("#TbIslemSatirlari").removeClass('active');
            $("#TbStok").removeClass('active');
            $("#TbDizayn").removeClass('active');
                        
            //BarkodFocus();
        }
    }
    $scope.IslemSatirlariClick = function()
    {   
        if($scope.ToplamSatir <= 0)
        {
            alertify.alert("Gösterilecek Evrak Bulunamadı!");
            $("#TbMain").addClass('active');
            $("#TbBelgeBilgisi").removeClass('active');
            $("#TbBarkodGiris").removeClass('active');
            $("#TbStok").removeClass('active');
            $("#TbDizayn").removeClass('active');
        }
        else
        {
            $("#TbIslemSatirlari").addClass('active');
            $("#TbMain").removeClass('active');
            $("#TbBelgeBilgisi").removeClass('active');
            $("#TbBarkodGiris").removeClass('active');
            $("#TbStok").removeClass('active');
        }
    }
    $scope.ScanBarkod = function()
    {
        cordova.plugins.barcodeScanner.scan(
        function (result) 
        {
            $scope.TxtReceteStokGrid = result.text;
            //$scope.SarfFisiEnter(13);
        },
        function (error) 
        {
            //alert("Scanning failed: " + error);
        },
        {
            prompt : "Barkod Okutunuz",
            orientation : "portrait"
        }
        );
    }
}