function IrsaliyeCtrl($scope,$window,$timeout,db,$filter)
{      
    let CariSelectedRow = null;
    let IslemSelectedRow = null;
    let StokSelectedRow = null;
    let PartiLotSelectedRow = null;
    let ParamName = "";

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

        $scope.Seri = "";
        $scope.Sira = 0;
        $scope.EvrakTip = 13;
        $scope.CariKodu = "";
        $scope.CariAdi = "";
        $scope.CariFiyatListe = 0;
        $scope.CariDovizCinsi = 0;
        $scope.CariDovizKuru = 0;
        $scope.BelgeNo = "";
        $scope.DepoNo;
        $scope.DepoAdi = "";
        $scope.Tip = 0;
        $scope.NormalIade = 0;
        $scope.Tarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.Saat = moment(new Date()).format("LTS");
        $scope.MalKabulSevkTarihi = moment(new Date()).format("DD.MM.YYYY");
        $scope.BelgeTarih = 0;
        $scope.Sorumluluk = "";
        $scope.SorumlulukAdi = "";
        $scope.OdemeNo = "0";
        $scope.Barkod = "";
        $scope.Birim = "0";
        $scope.StokGridTip = "0";
        $scope.StokGridText = "";
        $scope.Personel = "";
        $scope.PersonelAdi = "";
        $scope.Proje = "";
        $scope.Miktar2 = 0;
        $scope.CmbEvrakTip = '1';
        $scope.Cins = 0;
        $scope.ToplamSatir = 0;
        $scope.CariBakiye = "";
        $scope.Adres = "";
        $scope.Adres1 = "";
        $scope.Adres2 = "";
        $scope.CariVDADI = "";
        $scope.CariVDNO = "";
        $scope.VergiEdit = "";

        $scope.DepoListe = [];
        $scope.CariListe = [];
        $scope.SorumlulukListe = [];
        $scope.PersonelListe = [];
        $scope.ProjeListe = [];
        $scope.OdemePlanListe = [];
        $scope.IrsaliyeListe = [];
        $scope.BedenHarListe = [];
        $scope.BirimListe = [];
        $scope.StokListe = [];
        $scope.PartiLotListe = [];
        $scope.RenkListe = [];
        $scope.BedenListe = [];

        $scope.AraToplam = 0;
        $scope.ToplamIndirim = 0;
        $scope.NetToplam = 0;
        $scope.ToplamKdv = 0;
        $scope.GenelToplam = 0;

        $scope.Stok = [];
        $scope.Miktar = 1;

        $scope.CmbCariAra = "0";
        $scope.TxtCariAra = "";
        $scope.EvrakLock = false;
        $scope.BarkodLock = false;
        $scope.FiyatLock = false;
        $scope.IslemListeSelectedIndex = -1;
        $scope.PartiLotListeSelectedIndex = 0;

        $scope.TxtParti = "";
        $scope.TxtLot = 0;
        $scope.SktTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.LblPartiLotAlert = "";

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
    }
    function InitCariGrid()
    {   
        $("#TblCari").jsGrid
        ({
            width: "100%",
            height: "500px",
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
                name: "FIYAT",
                title: "FIYAT",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sth_tutar",
                title: "TUTAR",
                type: "number",
                align: "center",
                width: 200
            },
            {
                name: "sth_iskonto1",
                title: "IND1",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sth_iskonto2",
                title: "IND2",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sth_iskonto3",
                title: "IND3",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sth_iskonto4",
                title: "IND4",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sth_iskonto5",
                title: "IND5",
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
                    name: "BIRM",
                    title: "BIRIM",
                    type: "text",
                    align: "center",
                    width: 100
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
    function InitPartiLotGrid()
    {
        let CustomDate = function (config) 
        {
            jsGrid.Field.call(this, config);
        };

        CustomDate.prototype = new jsGrid.Field(
        {
            itemTemplate: function (value) 
            {
                return new Date(value).toLocaleDateString('tr-TR',{ year: 'numeric', month: 'numeric', day: 'numeric' });
            }
        });

        jsGrid.fields.CustomDate = CustomDate;

        $("#TblPartiLot").jsGrid
        ({
            width: "100%",         
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.PartiLotListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: [
                {
                    name: "PARTI",
                    title: "PARTI",
                    type: "text",
                    align: "center",
                    width: 200
                }, 
                {
                    name: "LOT",
                    title: "LOT",
                    type: "number",
                    align: "center",
                    width: 100
                }, 
                {
                    name: "STOK",
                    title: "STOK",
                    type: "text",
                    align: "center",
                    width: 200
                }, 
                {
                    name: "MIKTAR",
                    title: "MIKTAR",
                    type: "number",
                    align: "center",
                    width: 100
                }, 
                {
                    name: "KALAN",
                    title: "KALAN",
                    type: "number",
                    align: "center",
                    width: 100
                }, 
                {
                    name: "SKTTARIH",
                    title: "SKT TARİHİ",
                    type: "CustomDate",
                    align: "center",
                    width: 100
                }  
            ],
            rowClick: function(args)
            {
                $scope.PartiLotListeRowClick(args.itemIndex,args.item,this);
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
        console.log(1)
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
            console.log(2)
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
            $scope.Tip,
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
            $scope.CariKodu,
            '',//İŞEMRİKODU
            $scope.Personel,
            $scope.CariDovizCinsi, //HARDOVİZCİNSİ
            $scope.CariDovizKuru, //HARDOVİZKURU
            $scope.CariAltDovizKuru, //ALTDOVİZKURU
            $scope.Stok[0].DOVIZCINSI, //STOKDOVİZCİNSİ
            $scope.Stok[0].DOVIZCINSKURU, //STOKDOVİZKURU
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
            $scope.Sorumluluk,
            0,  //VERGİSİZFL
            0,  // ADRESNO
            $scope.Stok[0].PARTI,
            $scope.Stok[0].LOT,
            $scope.Proje,
            '', // EXİMKODU
            0,  // DİSTİCARETTURU
            0,  // OTVVERGİSİZFL
            0,  // OİVVERGİSİZ
           $scope.CariFiyatListe,
           0   //NAKLİYEDEPO
        ];
        
        db.ExecuteTag($scope.Firma,'StokHarInsert',InsertData,function(InsertResult)
        {  
            if(typeof(InsertResult.result.err) == 'undefined')
            {  
                db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(IrsaliyeData)
                {  
                    if($scope.Stok[0].BEDENPNTR != 0 && $scope.Stok[0].RENKPNTR != 0)
                    {   
                        BedenHarInsert(InsertResult.result.recordset[0].sth_Guid);
                    } 

                    console.log(IrsaliyeData);
                    InsertAfterRefresh(IrsaliyeData);  
                    FisData(IrsaliyeData);  
                    $scope.InsertLock = false
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
    function UpdateData(pData) 
    {   
        db.ExecuteTag($scope.Firma,'StokHarUpdate',pData.Param,function(InsertResult)
        {
            if(typeof(InsertResult.result.err) == 'undefined')
            {
                db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,0],function(IrsaliyeData)
                {
                    if(pData.BedenPntr != 0 && pData.RenkPntr != 0)
                    {
                        let UpdateStatus = false;
                        angular.forEach($scope.BedenHarListe,function(value)
                        {
                            if(value.BdnHar_Har_uid == pData.Guid && value.BdnHar_BedenNo == Kirilim(pData.BedenPntr,pData.RenkPntr))
                            {
                                let Data =
                                [
                                    value.BdnHar_Tipi,      // TİPİ
                                    value.BdnHar_Har_uid,   // GUID
                                    value.BdnHar_BedenNo,   // BEDEN NO
                                    pData.Miktar, // MİKTAR
                                    0, // REZERVASYON MİKTARI
                                    0, // REZERVASYON TESLİM MİKTARI
                                    '', // SERİ
                                    0,  // SIRA
                                    0,  // TİP
                                    0   // SATIRNO
                                ];

                                UpdateStatus = true;
                                BedenHarUpdate(Data);
                            }                            
                        });

                        if(!UpdateStatus)
                        {
                            BedenHarInsert(pData.Guid);
                        }
                    }                        
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
                var Uzunluk = Kilo.slice(UserParam.Sistem.KiloBaslangic,((UserParam.Sistem.KiloBaslangic)+(UserParam.Sistem.KiloUzunluk)));
                pBarkod = kBarkod
                $scope.Miktar = (Uzunluk / UserParam.Sistem.KiloCarpan)
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

                    //****** FİYAT GETİR */
                    let FiyatParam = 
                    { 
                        CariKodu : $scope.CariKodu,
                        CariFiyatListe : $scope.CariFiyatListe,
                        CariDovizKuru : $scope.CariDovizKuru,
                        DepoNo : $scope.DepoNo,
                        AlisSatis : ($scope.EvrakTip === 13 ? 0 : 1)
                    };
                    
                    await db.FiyatGetir($scope.Firma,BarkodData,FiyatParam,UserParam[ParamName],function()
                    {   
                        $scope.MiktarFiyatValid(); 
                        $scope.BarkodLock = true;
                        $scope.$apply();
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
                    
                    if($scope.Stok[0].RENKPNTR != 0) // MAHİR TARAFINDAN GEÇİCİ OLARAK YAPILDI
                    {
                        $scope.Stok[0].BEDENPNTR = "1";
                    }
                    else if($scope.Stok[0].BEDENPNTR != 0)
                    {
                        $scope.Stok[0].RENKPNTR = "1";
                    }

                    if($scope.Stok[0].DETAYTAKIP == 1 || $scope.Stok[0].DETAYTAKIP == 2)
                    {
                        if($scope.Stok[0].PARTI !='')
                        {
                            db.GetData($scope.Firma,'PartiLotGetir',[$scope.Stok[0].KODU,$scope.DepoNo,$scope.Stok[0].PARTI,$scope.Stok[0].LOT],function(data)
                            {   console.log($scope.DepoNo)
                                $scope.PartiLotListe = data;

                                if(UserParam.Sistem.PartiLotMiktarKontrol == 1 && $scope.Stok[0].LOT != 0)
                                {   
                                    $scope.Miktar = $scope.PartiLotListe[0].MIKTAR;
                                    $scope.Stok[0].TOPMIKTAR = $scope.Miktar * $scope.Stok[0].CARPAN;
                                }
                                $scope.MiktarFiyatValid();
                            });
                        }
                        else
                        {
                            PartiLotEkran();
                        }
                    }
                    if($scope.OtoEkle == true)
                    {
                        $scope.Insert()
                    }
                    else
                    {
                        $window.document.getElementById("Miktar").focus();
                        $window.document.getElementById("Miktar").select();
                    }
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
    function PartiLotEkran()
    {
        if($scope.Stok[0].PARTI == '')
        {   
            if($scope.Stok[0].DETAYTAKIP == 1 || $scope.Stok[0].DETAYTAKIP == 2)
            {   
                $scope.LblPartiLotAlert = "";
                $scope.TxtParti = "";
                $scope.TxtLot = 0;
                $scope.SktTarih = new Date().toLocaleDateString();
                $scope.PartiLotListe = [];

                $("#LblPartiLotAlert").hide();
                
                $("#TblPartiLot").jsGrid({data : $scope.PartiLotListe});

                $('#MdlPartiLot').modal('show');
            }
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
        $scope.FisDeger = "";
        $scope.FisData = "";

        $scope.FisDeger = SpaceLength($scope.CariKodu,35) + $scope.Seri + "-" + $scope.Sira + "\n" + SpaceLength($scope.CariAdi,35) + $scope.Tarih +"\n" + "Adres: " +SpaceLength($scope.Adres1,28) + $scope.Saat + "\n"  + "Adres2: " + SpaceLength($scope.Adres2,40) + "\n" + SpaceLength($scope.Adres,40) + "\n" +"Vergi Dairesi: "+SpaceLength($scope.CariVDADI,45) + "\n" + "Vergi No: "+ $scope.CariVDNO

        for(let i=0; i < pData.length; i++)
        {
            $scope.FisData = $scope.FisData +  SpaceLength(pData[i].ADI,25) + " " + SpaceLength(pData[i].BIRIM,4) + SpaceLength(pData[i].BIRIMADI,6) + SpaceLength(parseFloat(pData[i].FIYAT,2),6) + SpaceLength(parseFloat(pData[i].sth_tutar,2),5) + "\n";
        }
    }
    function SpaceLength(pData,pLength)
    {
        let x = pLength - pData.toString().length;

        if(pData.toString().length > pLength)
        {
            pData = pData.substring(0,25);
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
        await db.MaxSira($scope.Firma,'MaxStokHarSira',[$scope.DepoNo,$scope.Tarih],function(data){$scope.EvrakNo = data});
    }
    $scope.YeniEvrak = function (pAlisSatis)
    {
        Init();
        InitCariGrid();
        InitIslemGrid();
        InitStokGrid();
        InitPartiLotGrid();

        //ALIŞ = 0 SATIŞ = 1
        if(pAlisSatis == 0)
            ParamName = "AlisIrsaliye";
        else
            ParamName = "SatisIrsaliye";

        $scope.EvrakLock = false;
        $scope.Seri = UserParam[ParamName].Seri;
        $scope.BelgeNo = UserParam[ParamName].BelgeNo;
        $scope.CmbEvrakTip = UserParam[ParamName].EvrakTip;
        $scope.CariKodu = UserParam[ParamName].Cari;
        if(UserParam[ParamName].FiyatLock == 1)
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
        
        if($scope.CariKodu != "")
        {
            db.GetData($scope.Firma,'CariGetir',[$scope.CariKodu,'',UserParam.Sistem.PlasiyerKodu],function(data)
            {
                $scope.CariListe = data;
                $("#TblCari").jsGrid({data : $scope.CariListe});

                let Obj = $("#TblCari").data("JSGrid");
                let Item = Obj.rowByItem(data[0]);
                
                $scope.CariListeRowClick(0,Item,Obj);
            });
        }

        db.DepoGetir($scope.Firma,UserParam[ParamName].DepoListe,function(data)
        {
            $scope.DepoListe = data; 
            $scope.DepoNo = UserParam[ParamName].DepoNo;
            $scope.DepoListe.forEach(function(item) 
            {
                if(item.KODU == $scope.DepoNo)
                    $scope.DepoAdi = item.ADI;
            });     
        });
        db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(data)
        {
            $scope.SorumlulukListe = data; 
            $scope.Sorumluluk = UserParam[ParamName].Sorumluluk;
            $scope.SorumlulukListe.forEach(function(item)
            {
                if(item.KODU == $scope.Sorumluluk)
                    $scope.SorumlulukAdi = item.ADI;
            });
        });
        db.FillCmbDocInfo($scope.Firma,'CmbPersonelGetir',function(data)
        {
            $scope.PersonelListe = data;
            $scope.Personel = UserParam[ParamName].Personel;
            $scope.PersonelListe.forEach(function(item)
            {
                if(item.KODU == $scope.Personel)
                  $scope.PersonelAdi == item.ADI;
            });
        });    
        db.FillCmbDocInfo($scope.Firma,'CmbProjeGetir',function(data){$scope.ProjeListe = data; $scope.Proje = UserParam[ParamName].Proje});
        db.FillCmbDocInfo($scope.Firma,'CmbOdemePlanGetir',function(data){$scope.OdemePlanListe = data; $scope.OdemeNo = '0'});

        //db.MaxSira($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip],function(data){$scope.Sira = data});       
        
        $scope.EvrakTipChange();
        BarkodFocus();
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
    $scope.BtnPartiLotGetir = function()
    {   
        if(isNaN($scope.TxtLot))
        $scope.TxtLot = 0;

        db.GetData($scope.Firma,'PartiLotGetir',[$scope.Stok[0].KODU,$scope.CDepo,$scope.TxtParti,$scope.TxtLot],function(data)
        {   
            $scope.PartiLotListe = data;
            $("#TblPartiLot").jsGrid({data : $scope.PartiLotListe});
        });
    }
    $scope.BtnPartiLotSec = function()
    {   
        $scope.Stok[0].PARTI = $scope.PartiLotListe[$scope.PartiLotListeSelectedIndex].PARTI;
        $scope.Stok[0].LOT = $scope.PartiLotListe[$scope.PartiLotListeSelectedIndex].LOT;

        $scope.TxtParti = $scope.PartiLotListe[$scope.PartiLotListeSelectedIndex].PARTI;
        $scope.TxtLot = $scope.PartiLotListe[$scope.PartiLotListeSelectedIndex].LOT;
        $scope.PartiLotListe = [];
        
        $('#MdlPartiLot').modal('hide');
    }
    $scope.BtnPartiLotOlustur = function()
    {   
        if($scope.TxtParti == '')
        {
            $("#LblPartiLotAlert").show();
            $scope.LblPartiLotAlert = "Parti Alanı Boş Geçilemez !"
        }
        else
        {   
            if(isNaN($scope.TxtLot))
            $scope.TxtLot = 0;
          
            db.GetData($scope.Firma,'PartiLotGetir',[$scope.Stok[0].KODU,$scope.CDepo,$scope.TxtParti,$scope.TxtLot],function(data)
            {   
                if(data.length > 0)
                {
                    $scope.PartiLotListe = data;
                    $("#TblPartiLot").jsGrid({data : $scope.PartiLotListe});
                    $("#LblPartiLotAlert").show();
                    $scope.LblPartiLotAlert = "Bu PartiLot Daha Önceden Oluşturulmuş !"
                }
                else
                {
                    let Data = 
                    [
                        UserParam.MikroId,
                        UserParam.MikroId,
                        $scope.TxtParti,
                        $scope.TxtLot,
                        $scope.Stok[0].KODU,
                        $scope.SktTarih
                    ]   
                    db.ExecuteTag($scope.Firma,'PartiLotInsert',Data,function(InsertResult)
                    {
                        if(typeof(InsertResult.result.err) == 'undefined')
                        {
                            $scope.Stok[0].PARTI = $scope.TxtParti;
                            $scope.Stok[0].LOT = $scope.TxtLot;
                            $('#MdlPartiLot').modal('hide');
                        }
                    });
                }
            });
            
        }
    }
    $scope.BtnRenkBedenSec = function()
    {
        $scope.Stok[0].RENK = $.grep($scope.RenkListe, function (Item) 
        {
            return Item.PNTR == $scope.Stok[0].RENKPNTR;
        })[0].KIRILIM;
        
        $scope.Stok[0].BEDEN = $.grep($scope.BedenListe, function (Item) 
        {
            return Item.PNTR == $scope.Stok[0].BEDENPNTR;
        })[0].KIRILIM;
        
        $('#MdlRenkBeden').modal('hide');

        PartiLotEkran();
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
            $scope.Loading = false;
            $scope.TblLoading = true;
            $("#TblStok").jsGrid({data : $scope.StokListe});
        });

    }
    $scope.BtnStokGridSec = function()
    {
        $("#MdlStokGetir").modal('hide');
        StokBarkodGetir($scope.Barkod);
        //$scope.BtnStokGridGetir();
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
        $scope.Stok[0].TUTAR = ($scope.Stok[0].CARPAN * $scope.Miktar) * $scope.Stok[0].FIYAT;
        $scope.Stok[0].KDV = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].TOPTANVERGI / 100);
        $scope.Stok[0].TOPTUTAR = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) + $scope.Stok[0].KDV;
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
            $scope.CariVDADI = $scope.CariListe[pIndex].VDADI;
            $scope.CariVDNO = $scope.CariListe[pIndex].VDNO;
            $scope.Adres = $scope.CariListe[pIndex].ADRES;
            $scope.Adres1 = $scope.CariListe[pIndex].ADRES1;
            $scope.Adres2 = $scope.CariListe[pIndex].ADRES2; 
        }
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
        
        $scope.Barkod = $scope.StokListe[pIndex].KODU;
    }
    $scope.PartiLotListeRowClick = function(pIndex,pItem,pObj)
    {   
        if ( PartiLotSelectedRow ) { PartiLotSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        PartiLotSelectedRow = $row;
        $scope.PartiLotListeSelectedIndex = pIndex;
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
    $scope.BtnVergiDuzenle = function()
    {
        $("#MdlVergiDuzenle").modal('show');
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
    $scope.BtnVergiDuzenleKaydet = function()
    {

        for(i = 0;i < $scope.IrsaliyeListe.length;i++)
        {
            $scope.IrsaliyeListe[i].sth_vergi = ($scope.VergiEdit / $scope.ToplamKdv) *  $scope.IrsaliyeListe[i].sth_vergi

            $scope.VergiUpdate(i);
        }
        angular.element('#MdlVergiDuzenle').modal('hide');
    }
    $scope.VergiUpdate = function(pIndex)
    {
        let sth_vergi = $scope.IrsaliyeListe[pIndex].sth_vergi
        let sth_Guid = $scope.IrsaliyeListe[pIndex].sth_Guid
        let TmpQuery = 
                                {
                                    db :'{M}.' + $scope.Firma,
                                    query:  "UPDATE STOK_HAREKETLERI SET sth_vergi = @sth_vergi WHERE sth_Guid = @sth_Guid",
                                    param : ['sth_vergi','sth_Guid'],
                                    type : ['float','string|50'],
                                    value : [sth_vergi,sth_Guid]
                                }
                                db.GetDataQuery(TmpQuery,function(Data)
                                {
                                    console.log('CREATED BY RECEP KARACA ;)')  
                                    DipToplamHesapla() 

                                });
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
    $scope.EvrakTipChange = async function()
    {
        if(ParamName == "AlisIrsaliye")
        {
            if($scope.CmbEvrakTip == 0) //Perakende Alış
            {
               $scope.EvrakTip = 13;
               $scope.NormalIade = 0;
               $scope.Tip = 0;
               $scope.Cins = 1;
            }
            else if($scope.CmbEvrakTip == 1) //Toptan Alış
            {
                $scope.EvrakTip = 13;
                $scope.NormalIade = 0;
                $scope.Tip = 0;
                $scope.Cins = 0; 
            }
            else if($scope.CmbEvrakTip == 2) //Perakende Alış İade
            {
                $scope.EvrakTip = 13;
                $scope.NormalIade = 1;
                $scope.Tip = 0;
                $scope.Cins = 1;
                
            }
            else if($scope.CmbEvrakTip == 3) //Toptan Alış İade
            {
                $scope.EvrakTip = 13;
                $scope.NormalIade = 1;
                $scope.Tip = 0;
                $scope.Cins = 0;

            } 
        }
        else
        {
            if($scope.CmbEvrakTip == 0) //Perakende Satis
            {
               $scope.EvrakTip = 1;
               $scope.NormalIade = 0;
               $scope.Tip = 1;
               $scope.Cins = 1;
            }
            else if($scope.CmbEvrakTip == 1) //Toptan Satis
            {
                $scope.EvrakTip = 1;
                $scope.NormalIade = 0;
                $scope.Tip = 1;
                $scope.Cins = 0; 
            }
            else if($scope.CmbEvrakTip == 2) //Perakende Satis İade
            {
                $scope.EvrakTip = 1;
                $scope.NormalIade = 1;
                $scope.Tip = 1;
                $scope.Cins = 1;
            }
            else if($scope.CmbEvrakTip == 3) //Toptan Satis İade
            {
                $scope.EvrakTip = 1;
                $scope.NormalIade = 1;
                $scope.Tip = 1;
                $scope.Cins = 0;
            }
           
        }
        await db.MaxSira($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip],function(data){$scope.Sira = data});
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
    $scope.SorumlulukChange = function()
    {
        $scope.SorumlulukListe.forEach(function(item) 
        {
            if(item.KODU == $scope.Sorumluluk)
                $scope.SorumlulukAdi = item.ADI;
        });
    }
    $scope.PersonelChange = function()
    {
        $scope.PersonelListe.forEach(function(item)
        {
            if(item.KODU == $scope.Personel)
            $scope.PersonelAdi = item.ADI;
        });
    }
    $scope.Insert = function()
    { 
        if(typeof($scope.Stok[0].KODU) != 'undefined')
        {
            if(UserParam.SatisIrsaliye.EksiyeDusme == 1 && $scope.EvrakTip == 1 &&  ($scope.Miktar * $scope.Stok[0].CARPAN) > $scope.Stok[0].DEPOMIKTAR)
            {
                alertify.alert("Eksiye Düşmeye İzin Verilmiyor.");
            }
            else
            {
                $scope.InsertLock = true
                if(UserParam.Sistem.SatirBirlestir == 0 || $scope.Stok[0].RENKPNTR != 0 || $scope.Stok[0].BEDENPNTR != 0 || $scope.Stok[0].DETAYTAKIP == 1 || $scope.Stok[0].DETAYTAKIP == 2)
                {          
                    InsertData();
                }
                else
                {
                    let UpdateStatus = false;

                    angular.forEach($scope.IrsaliyeListe,function(value)
                    {
                        if(value.sth_stok_kod == $scope.Stok[0].KODU)
                        {   
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
                                    value.sth_Guid,
                                    '00000000-0000-0000-0000-000000000000' //Fat Uid
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
                InitCariGrid();
                InitIslemGrid(); 

                $scope.CariFiyatListe = data[0].sth_fiyat_liste_no;
                $scope.Seri = data[0].sth_evrakno_seri;
                $scope.Sira = data[0].sth_evrakno_sira;
                $scope.EvrakTip = data[0].sth_evraktip.toString();
                $scope.CariKodu = data[0].sth_cari_kodu;
                $scope.CariAdi = data[0].CARIADI;
                $scope.Sorumluluk = data[0].sth_stok_srm_merkezi;
                $scope.Personel = data[0].sth_plasiyer_kodu;
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

                await db.GetPromiseTag($scope.Firma,'StokBedenHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,11],function(BedenData)
                {
                    $scope.BedenHarListe = BedenData;
                });
                await db.GetPromiseTag($scope.Firma,'CariGetir',[$scope.CariKodu,'',UserParam.Sistem.PlasiyerKodu],function(data)
                {
                    $scope.CariListe = data;
                    $scope.Adres = $scope.CariListe[0].ADRES;
                    $scope.Adres1 = $scope.CariListe[0].ADRES1;
                    $scope.Adres2 = $scope.CariListe[0].ADRES2;
                    $scope.CariBakiye = $scope.CariListe[0].BAKIYE;
                    $scope.CariVDADI = $scope.CariListe[0].VDADI;
                    $scope.CariVDNO = $scope.CariListe[0].VDNO;

                    $("#TblCari").jsGrid({data : $scope.CariListe});

                    let Obj = $("#TblCari").data("JSGrid");
                    let Item = Obj.rowByItem(data[0]);
                    
                    $scope.CariListeRowClick(0,Item,Obj);
                    
                });

                db.DepoGetir($scope.Firma,UserParam[ParamName].DepoListe,function(e)
                {
                    $scope.DepoListe = e; 
                    $scope.DepoNo = data[0].sth_giris_depo_no.toString();
                    $scope.DepoListe.forEach(function(item) 
                    {
                        if(item.KODU == $scope.DepoNo)
                            $scope.DepoAdi = item.ADI;
                    });     
                });
                
                db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(e){$scope.SorumlulukListe = e; $scope.Sorumluluk = data[0].sth_stok_srm_merkezi; $scope.SorumlulukAdi = data[0].SORUMLUMERADI});
                db.FillCmbDocInfo($scope.Firma,'CmbPersonelGetir',function(e){$scope.PersonelListe = e; $scope.Personel = [0].sth_plasiyer_kodu; $scope.PersonelAdi = data[0].PERSONELADI});
                db.FillCmbDocInfo($scope.Firma,'CmbProjeGetir',function(e){$scope.ProjeListe = e; $scope.Proje = data[0].sth_proje_kodu});
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
                if(UserParam[ParamName].EvrakSil == 0)
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
                            ParamName = "AlisIrsaliye";
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
                if(UserParam[ParamName].EvrakSil == 0)
                {
                    db.ExecuteTag($scope.Firma,'StokHarSatirDelete',[$scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_Guid],function(data)
                    {
                        if(typeof(data.result.err) == 'undefined')
                        {
                            db.ExecuteTag($scope.Firma,'BedenHarDelete',[$scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_Guid,11],function(data)
                            {
                                console.log($scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_Guid)
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
                                ParamName = "AlisIrsaliye";
                                $scope.YeniEvrak(0)
                            }
                            else
                            {
                                ParamName = "SatisIrsaliye";
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
                $scope.IrsaliyeListe[pIndex].sth_Guid,
                '00000000-0000-0000-0000-000000000000' //Fat Uid
            ],
            BedenPntr : $scope.IrsaliyeListe[pIndex].BEDENPNTR,
            RenkPntr : $scope.IrsaliyeListe[pIndex].RENKPNTR,
            Miktar : $scope.MiktarEdit,
            Guid : $scope.IrsaliyeListe[pIndex].sth_Guid
        };
        UpdateData(Data);   
    }
    $scope.MaxLot = function()
    {   
        if($scope.Stok[0].DETAYTAKIP == 2)
        {
            db.GetData($scope.Firma,'MaxPartiLot',[$scope.TxtParti],function(pData)
            {
                $scope.TxtLot = pData[0].LOT;
            });
        }
        else
        {
            $scope.TxtLot = 1;
        }
    }
    $scope.MainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TbCariSec").removeClass('active');
    }
    $scope.BelgeBilgisiClick = function() 
    {
        $("#TbBelgeBilgisi").addClass('active');
        $("#TbMain").removeClass('active');
    }
    $scope.BarkodGirisClick = function() 
    {   
        if($scope.CariAdi != "")
        {
            $("#TbBarkodGiris").addClass('active');
            $("#TbMain").removeClass('active');
            $("#TbCariSec").removeClass('active');
            $("#TbBelgeBilgisi").removeClass('active');
            $("#TbIslemSatirlari").removeClass('active');
                        
            BarkodFocus();
        }
        else
        {
            alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Cari Seçiniz !" + "</a>" );
        }
    }
    $scope.IslemSatirlariClick = function()
    {   
        if($scope.ToplamSatir <= 0)
        {
            alertify.alert("Gösterilecek Evrak Bulunamadı!");
            $("#TbMain").addClass('active');
        }
        else
        {
            $("#TbIslemSatirlari").addClass('active');
            $("#TbMain").removeClass('active');
            $("#TbBelgeBilgisi").removeClass('active');
            $("#TbBarkodGiris").removeClass('active');
        }
    }
    $scope.CariSecClick = function()
    {
        $("#TbCariSec").addClass('active');
        $("#TbMain").removeClass('active');
    }
    $scope.ScanBarkod = function()
    {
        cordova.plugins.barcodeScanner.scan(
            function (result) 
            {
                $scope.Barkod = result.text;
                StokBarkodGetir($scope.Barkod);
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
    $scope.BtnFisYazdir = function()
    {
        let FisDizayn = "";

        FisDizayn = "              BRN SARAPCILIK" + "\n" + "       TEL : 0212 438 2580" + "\n" + "       EMAIL : muhasebe@baron.gen.tr" + "\n" + "       IBAN : TR51 0006200021100006298898" + "\n" + " " +  "\n" + $scope.FisDeger + "\n" + "                                            -" + "\n" + "URUN ADI              "+ " MIKTAR"+  " BIRIM" + " FIYAT" + " TUTAR" + "\n" + $scope.FisData + "\n" + "                                            -" + "\n" + " " + "\n"
        FisDizayn = FisDizayn + "Toplam Miktar : "+ SpaceLength(db.SumColumn($scope.IrsaliyeListe,"MIKTAR"),5) + "      Ara Toplam : " + parseFloat($scope.AraToplam.toFixed(4)) + "\n" +"                       Toplam Indirim : " + parseFloat($scope.ToplamIndirim.toFixed(4)) + "\n" + "                           Net Toplam : " + parseFloat($scope.NetToplam.toFixed(4)) + "\n" + "                            ToplamKdv : " + parseFloat($scope.ToplamKdv.toFixed(4))  + "\n" + "                         Genel Toplam : " + parseFloat($scope.GenelToplam.toFixed(4))   + "\n" + "\n" +"\n" + "Önceki Bakiye : " + $scope.CariBakiye + "\n" + "                                            -" + "\n" + "                                            -" + "\n" + "                                            -" + "\n" + "                                            -" + "\n"
        FisDizayn = FisDizayn.split("İ").join("I").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u");

        console.log(FisDizayn);
        db.BTYazdir(FisDizayn,UserParam.Sistem,function(pStatus)
        {
            if(pStatus)
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Yazdırma İşlemi Gerçekleşti </a>" );                
            }
        });
    }
}
