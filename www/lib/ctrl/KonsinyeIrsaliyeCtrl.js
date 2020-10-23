function KonsinyeIrsaliyeCtrl($scope,$window,$timeout,db,$filter)
{
    let CariSelectedRow = null;
    let IslemSelectedRow = null;
    let StokSelectedRow = null;
    function Init()
    {
        UserParam = Param[$window.sessionStorage.getItem('User')];
        $scope.Firma = $window.sessionStorage.getItem('Firma');

        //TEXT
        $scope.Seri = "";
        $scope.Sira = "";
        $scope.Tarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.Saat = moment(new Date()).format("LTS");
        $scope.TxtCariAra = "";
        $scope.CariKodu = "";
        $scope.CariAdi = "";
        $scope.CariSoyAdi = "";
        $scope.CariVDADI = "";
        $scope.CariVDNO = "";
        $scope.Adres = "";
        $scope.Adres1 = "";
        $scope.Adres2 = "";
        $scope.DovizChangeKodu = "";
        $scope.DovizSembol;
        $scope.DovizSembol1;
        $scope.DovizSembol2;
        $scope.StokGridText = "";
        $scope.Barkod = "";
        $scope.StokKodu = "";
        $scope.AdresNo = "0";
        $scope.Aciklama = "";
        $scope.OdemeNo = "0";

        //INT
        $scope.EvrakTip = 1;
        $scope.NormalIade = 0;
        $scope.Tip = 1
        $scope.Cins = 0
        $scope.CmbEvrakTip = 0
        $scope.PersonelTip = 0
        $scope.EvrakDovizTip = 0;
        $scope.DepoNo = 0;
        $scope.CariDovizCinsi = 0
        $scope.CariDovizCinsi1 = 0;
        $scope.CariDovizCinsi2 = 0;
        $scope.CariDovizKuru = 0;
        $scope.CariDovizKuru1 = 0;
        $scope.CariDovizKuru2 = 0;
        $scope.CariAltDovizKuru = 0;
        $scope.CariBakiye = 0;
        $scope.Fiyat = 0;
        $scope.Miktar = 1;
        $scope.FiyatListeNo = 1;
        $scope.AraToplam = 0;
        $scope.ToplamIndirim = 0;
        $scope.ToplamKdv = 0;
        $scope.NetToplam = 0;
        $scope.GenelToplam = 0;
        $scope.ToplamSatir = 0;
        $scope.MiktarEdit = 0;
        $scope.FiyatEdit = 0;

        // TRUE/FALSE
        $scope.FiyatLock = false;
        $scope.SevkMiktar = true;
        $scope.AlisMiktar = false;
        $scope.AlisIadeMiktar = false;
        $scope.SevkIadeMiktar = false;

        // LİSTE/DİZİ
        $scope.CariListe = [];
        $scope.CariFiyatListe = [];
        $scope.StokListe = [];
        $scope.Stok = [];
        $scope.BirimListe = [];
        $scope.DepoMiktarListe  = [];
        $scope.RenkListe = [];
        $scope.BedenListe = [];
        $scope.PartiLotListe = [];
        $scope.KonsinyeListe =  [];
        $scope.KonsinyeMiktarListe = [];
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
                    name: "RISK",
                    type: "number",
                    align: "center",
                    width: 75
                },
                {
                    name: "RISKLIMIT",
                    type: "number",
                    align: "center",
                    width: 90
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
    function AdresNoGetir()
    {
        db.GetData($scope.Firma,'CmbAdresNo',[$scope.CariKodu],function(data)
        {
            $scope.AdresNoListe = data;
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
            data : $scope.KonsinyeListe,
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
                name: "kon_stok_kod",
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
                name: "kon_miktar",
                title: "MİKTAR",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "kon_miktar2",
                title: "MİKTAR2",
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
                name: "kons_tutar",
                title: "TUTAR",
                type: "number",
                align: "center",
                width: 200
            },
            {
                name: "kon_iskonto1",
                title: "IND1",
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
                    name: "ADI",
                    title: "ADI",
                    type: "text",
                    align: "center",
                    width: 200
                }, 
                {
                    name: "DEPOMIKTAR",
                    title: "DEPO MIKTAR",
                    type: "number",
                    align: "center",
                    width: 100
                },
                {
                    name: "BIRIM1",
                    title: "BIRIM 1",
                    type: "number",
                    align: "center",
                    width: 100
                },
                {
                    name: "DOVIZCINS",
                    title: "DOVIZ",
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
                    $scope.StokKodu = $scope.Stok[0].KODU;
                    //DURUM = BEKLETİLİYOR (PARTİLOTKONTROL)
                    // if(UserParam.Sistem.PartiLotKontrol == 1)
                    // {
                    //     for(i = 0;i < $scope.KonsinyeListe.length;i++)
                    //     {   
                    //         if($scope.Stok[0].PARTI != "" && $scope.Stok[0].LOT != "")
                    //         {
                    //             if($scope.Stok[0].PARTI == $scope.KonsinyeListe[i].sth_parti_kodu && $scope.Stok[0].LOT == $scope.IrsaliyeListe[i].sth_lot_no)
                    //             {
                    //                 alertify.alert("<a style='color:#3e8ef7''>" + "Okutmuş Olduğunuz "+ $scope.Stok[0].PARTI + ". " + "Parti " + $scope.Stok[0].LOT + ". " +"Lot Daha Önceden Okutulmuş !" + "</a>" );
                    //                 $scope.InsertLock = false;
                    //                 $scope.BtnTemizle();
                    //                 return;
                    //             }
                    //         }
                    //     }
                    // }
                    $scope.Stok[0].FIYAT = 0;
                    $scope.Stok[0].TUTAR = 0;
                    $scope.Stok[0].INDIRIM = 0;
                    $scope.Stok[0].KDV = 0;
                    $scope.Stok[0].TOPTUTAR = 0;
                    // Fiyat Getir (Stok Detay)
                    var Fiyat = 
                    {
                        db : '{M}.' + $scope.Firma,
                        query : "SELECT TOP 1 " + 
                                "CASE WHEN (SELECT sfl_kdvdahil FROM STOK_SATIS_FIYAT_LISTE_TANIMLARI WHERE sfl_sirano=sfiyat_listesirano) = 0 THEN " + 
                                "dbo.fn_StokSatisFiyati(sfiyat_stokkod,sfiyat_listesirano,sfiyat_deposirano,0) " + 
                                "ELSE " + 
                                "dbo.fn_StokSatisFiyati(sfiyat_stokkod,sfiyat_listesirano,sfiyat_deposirano,0) / ((SELECT dbo.fn_VergiYuzde ((SELECT TOP 1 sto_toptan_vergi FROM STOKLAR WHERE sto_kod = sfiyat_stokkod)) / 100) + 1) " + 
                                "END AS FIYAT, " + 
                                "sfiyat_doviz AS DOVIZ, " + 
                                "ISNULL((SELECT dbo.fn_DovizSembolu(ISNULL(sfiyat_doviz,0))),'TL') AS DOVIZSEMBOL, " + 
                                "ISNULL((SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(sfiyat_doviz,0),2)),1) AS DOVIZKUR, " + 
                                "sfiyat_iskontokod AS ISKONTOKOD " + 
                                "FROM STOK_SATIS_FIYAT_LISTELERI " +
                                "WHERE sfiyat_stokkod = @STOKKODU AND sfiyat_listesirano = @FIYATLISTE AND sfiyat_deposirano IN (0,@DEPONO) " +
                                "ORDER BY sfiyat_deposirano DESC", 
                        param: ['STOKKODU','FIYATLISTE','DEPONO'],
                        type:  ['string|50','int','int'],
                        value: [$scope.StokKodu,$scope.FiyatListeNo,$scope.DepoNo]
                    }
                    db.GetDataQuery(Fiyat,function(pFiyat)
                    {                         
                        $scope.Fiyat = pFiyat[0].FIYAT
                        $scope.Stok[0].DOVIZSEMBOL = pFiyat[0].DOVIZSEMBOL;
                    });
                    
                    var KonsinyeMiktar =
                    {
                        db : '{M}.' + $scope.Firma,
                        query : "SELECT GirenKonsinye AS ALISMIKTAR,GirendenIadeedilen AS SEVKIADEMIKTAR, CikanKonsinye AS SEVKMIKTAR,CikandanIadeedilen AS ALISIADEMIKTAR FROM fn_Konsinye_Ozet_Oku(@STOKKODU,0,@CARIKOD,@DEPONO) ", //"0" CARİ CİNSİ
                        param : ['STOKKODU','CARIKOD','DEPONO'],
                        type : ['string|50','string|25','int'],
                        value : [$scope.StokKodu,$scope.CariKodu,$scope.DepoNo]
                    }
                    db.GetDataQuery(KonsinyeMiktar,function(pKonsinyeMiktar)
                    {   
                        $scope.KonsinyeMiktarListe = pKonsinyeMiktar
                    });

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
                        //json.stringify = js nesnesini string'e çevirir.
                        $scope.Birim = JSON.stringify($scope.Stok[0].BIRIMPNTR); 

                        if($scope.BirimListe.length > 0)
                        {
                            $scope.Stok[0].BIRIMPNTR = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].BIRIMPNTR;
                            $scope.Stok[0].BIRIM = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].BIRIM;
                            $scope.Stok[0].CARPAN = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].KATSAYI;
                            console.log($scope.Stok[0].CARPAN)
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
                        FiyatListe : $scope.FiyatListeNo,
                        AlisSatis : ($scope.EvrakTip === 13 ? 0 : 1),
                        OdemeNo : $scope.OdemeNo
                    };
                    await db.FiyatGetir($scope.Firma,BarkodData,FiyatParam,UserParam.KonsinyeIrsaliye,function()
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
                    if($scope.Stok[0].DETAYTAKIP == 1 || $scope.Stok[0].DETAYTAKIP == 2)
                    {
                        if($scope.Stok[0].PARTI !='')
                        {
                            db.GetData($scope.Firma,'PartiLotGetir',[$scope.Stok[0].KODU,$scope.DepoNo,$scope.Stok[0].PARTI,$scope.Stok[0].LOT],function(data)
                            {  
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
                            //PartiLotEkran();
                            $timeout( function(){
                            $window.document.getElementById("Parti").focus();
                            $window.document.getElementById("Parti").select();
                            },250)
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
                    $scope.Stok[0].CARPAN = 1;
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
            $scope.NormalIade,
            $scope.Seri,
            $scope.Sira,
            $scope.BelgeNo,
            $scope.Tarih,
            $scope.Stok[0].KODU,
            $scope.CariKodu,
            $scope.Personel, //SATICI KOD
            $scope.Miktar * $scope.Stok[0].CARPAN, //MIKTAR
            $scope.Aciklama,
            $scope.DepoNo, //GİRİSDEPONO
            $scope.DepoNo, //CİKİSDEPONO
            $scope.Miktar, // MIKTAR2
            $scope.AdresNo,  // ADRESNO
            '', // CARİSORUMLULUKMERKEZİ
            $scope.Sorumluluk,
            $scope.Proje,
            $scope.CariDovizCinsi, //HARDOVİZCİNSİ
            $scope.CariDovizKuru, //HARDOVİZKURU
            $scope.CariAltDovizKuru, //ALTDOVİZKURU
            $scope.Stok[0].DOVIZCINSI, //STOKDOVİZCİNSİ
            1, //STOKDOVİZKURU
            $scope.Stok[0].BIRIMPNTR, //BIRIMPNTR
            $scope.Stok[0].TUTAR,     //TUTAR
            0, //ISKONTO1
            0, //ISKONTO2
            0, //ISKONTO3
            0, //ISKONTO4
            0, //ISKONTO5
            0, //ISKONTO6
            $scope.Stok[0].TOPTANVERGIPNTR, //VERİPNTR
            $scope.Stok[0].KDV,             //VERGİ
            $scope.Cins,
            $scope.EvrakTip
        ];
        db.ExecuteTag($scope.Firma,'KonsinyeHarInsert',InsertData,function(InsertResult)
        {  
            if(typeof(InsertResult.result.err) == 'undefined')
            {  
                db.GetData($scope.Firma,'KonsinyeHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(KonsinyeData)
                {  
                    if($scope.Stok[0].BEDENPNTR != 0 && $scope.Stok[0].RENKPNTR != 0)
                    {   
                        BedenHarInsert(InsertResult.result.recordset[0].sth_Guid);
                    } 
                    InsertAfterRefresh(KonsinyeData);  

                    $scope.InsertLock = false
                    if(UserParam.Sistem.Titresim == 1)
                    {
                        Confirmation();
                    }
                    // FisData(KonsinyeData);
                    
                });
            }
            else
            {
                console.log(InsertResult.result.err);
            }        
        });
    }
    function InsertAfterRefresh(pData)
    {    
        $scope.EvrakLock = true;
        $scope.BarkodLock = false;

        $scope.KonsinyeListe = pData;
        console.log($scope.KonsinyeListe)
        $("#TblIslem").jsGrid({data : $scope.KonsinyeListe});    
        $scope.BtnTemizle();
        DipToplamHesapla();
        ToplamMiktarHesapla();
        
        $window.document.getElementById("Barkod").focus();
    }
    function UpdateData(pData) 
    {   
        db.ExecuteTag($scope.Firma,'KonsinyeHarUpdate',pData.Param,function(InsertResult)
        {
            if(typeof(InsertResult.result.err) == 'undefined')
            {
                db.GetData($scope.Firma,'KonsinyeHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,0],function(KonsinyeData)
                {
                    // if(pData.BedenPntr != 0 && pData.RenkPntr != 0)
                    // {
                    //     let UpdateStatus = false;
                    //     angular.forEach($scope.BedenHarListe,function(value)
                    //     {
                    //         if(value.BdnHar_Har_uid == pData.Guid && value.BdnHar_BedenNo == Kirilim(pData.BedenPntr,pData.RenkPntr))
                    //         {console.log(Kirilim(pData.BedenPntr,pData.RenkPntr))
                    //             let Data =
                    //             [
                    //                 value.BdnHar_Tipi,      // TİPİ
                    //                 value.BdnHar_Har_uid,   // GUID
                    //                 value.BdnHar_BedenNo,   // BEDEN NO
                    //                 pData.Miktar, // MİKTAR
                    //                 0, // REZERVASYON MİKTARI
                    //                 0, // REZERVASYON TESLİM MİKTARI
                                    
                    //             ];

                    //             UpdateStatus = true;
                    //             BedenHarUpdate(Data);
                    //         }                            
                    //     });

                    //     if(!UpdateStatus)
                    //     {
                    //         BedenHarInsert(pData.Guid);
                    //     }
                    // }                        
                    InsertAfterRefresh(KonsinyeData);
                    // FisData(KonsinyeData);
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
    function DipToplamHesapla()
    {
        $scope.AraToplam = 0;
        $scope.ToplamIndirim = 0;
        $scope.ToplamKdv = 0;
        $scope.NetToplam = 0;
        $scope.GenelToplam = 0;

        angular.forEach($scope.KonsinyeListe,function(value)
        {
            $scope.AraToplam += value.kons_tutar;
            $scope.ToplamIndirim += (value.kons_iskonto1 + value.kons_iskonto2 + value.kons_iskonto3 + value.kons_iskonto4 + value.kons_iskonto5 + value.kons_iskonto6);
            $scope.ToplamKdv +=  value.kons_vergi //(value.sth_tutar - (value.sth_iskonto1 + value.sth_iskonto2 + value.sth_iskonto3 + value.sth_iskonto4 + value.sth_iskonto5 + value.sth_iskonto6)) * (value.TOPTANVERGI / 100);
        });
        $scope.NetToplam = $scope.AraToplam - $scope.ToplamIndirim;
        $scope.GenelToplam = $scope.NetToplam + $scope.ToplamKdv;
    }
    function ToplamMiktarHesapla()
    {
        $scope.ToplamSatir = 0;

        angular.forEach($scope.KonsinyeListe,function(value)
        {
            $scope.ToplamSatir += 1 ;
        });
    }
    function Confirmation()
    {
        navigator.vibrate([100,100,200,100,300]);
    }
    function BarkodFocus()
    {
        $timeout( function(){$window.document.getElementById("Barkod").focus();},100);  
    }
    //ANA MENÜ
    $scope.MainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbStok").removeClass('active');
        $("#TbDizayn").removeClass('active');
    }
    $scope.YeniEvrak = function ()
    {
        Init();
        InitCariGrid();
        InitIslemGrid();
        InitStokGrid();

        console.log($scope.AlisMiktar)

        $scope.FiyatListeNo = UserParam.KonsinyeIrsaliye.FiyatListe;
        $scope.EvrakLock = false;
        $scope.Seri = UserParam.KonsinyeIrsaliye.Seri;
        $scope.BelgeNo = UserParam.KonsinyeIrsaliye.BelgeNo;
        $scope.CmbEvrakTip = UserParam.KonsinyeIrsaliye.EvrakTip;
        $scope.CariKodu = UserParam.KonsinyeIrsaliye.Cari;
        if(UserParam.KonsinyeIrsaliye.FiyatLock == 1)
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
            db.GetData($scope.Firma,'CariListeGetir',[$scope.CariKodu,'',UserParam.Sistem.PlasiyerKodu],function(data)
            {
                $scope.CariListe = data;
                $("#TblCari").jsGrid({data : $scope.CariListe});

                let Obj = $("#TblCari").data("JSGrid");
                let Item = Obj.rowByItem(data[0]);
                
                $scope.CariListeRowClick(0,Item,Obj);
            });
        }

        db.DepoGetir($scope.Firma,UserParam.KonsinyeIrsaliye.DepoListe,function(data)
        {
            $scope.DepoListe = data; 
            $scope.DepoNo = UserParam.KonsinyeIrsaliye.DepoNo;
            $scope.DepoListe.forEach(function(item) 
            {
                if(item.KODU == $scope.DepoNo)
                    $scope.DepoAdi = item.ADI;
            });     
        });
        db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(data)
        {
            $scope.SorumlulukListe = data; 
            $scope.Sorumluluk = UserParam.KonsinyeIrsaliye.Sorumluluk;
            $scope.SorumlulukListe.forEach(function(item)
            {
                if(item.KODU == $scope.Sorumluluk)
                    $scope.SorumlulukAdi = item.ADI;
            });
        });
        db.GetPromiseTag($scope.Firma,'PersonelTipGetir',[$scope.PersonelTip],function(data)
        {
            $scope.PersonelListe = data;
            $scope.Personel = UserParam.KonsinyeIrsaliye.Personel;
            $scope.PersonelListe.forEach(function(item)
            {
                if(item.KODU == $scope.Personel)
                  $scope.PersonelAdi = item.ADI;
            });
        });    
        db.FillCmbDocInfo($scope.Firma,'CmbProjeGetir',function(data){$scope.ProjeListe = data; $scope.Proje = UserParam.KonsinyeIrsaliye.Proje});
        db.FillCmbDocInfo($scope.Firma,'CmbOdemePlanGetir',function(data){$scope.OdemePlanListe = data; $scope.OdemeNo = '0'});

        //db.MaxSira($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip],function(data){$scope.Sira = data});
        
        $scope.EvrakTipChange();
        BarkodFocus();
    }
    $scope.EvrakTipChange = async function()
    {
        if($scope.CmbEvrakTip == 0) //Konsinye Sevk
        {
            $scope.EvrakTip = 1;
            $scope.NormalIade = 0;
            $scope.Tip = 1;
            $scope.Cins = 0;
            $scope.MiktarChange(0)
            console.log("Konsinye Sevk")
        }
        else if($scope.CmbEvrakTip == 1) //Konsinye Alış
        {
            $scope.EvrakTip = 13;
            $scope.NormalIade = 0;
            $scope.Tip = 0;
            $scope.Cins = 0; 
            $scope.MiktarChange(1)
            console.log("Konsinye Alış")
        }
        else if($scope.CmbEvrakTip == 2) //Konsinye İade Alış
        {
            $scope.EvrakTip = 13;
            $scope.NormalIade = 1;
            $scope.Tip = 0;
            $scope.Cins = 0;
            $scope.MiktarChange(2)
            console.log("Konsinye İade Alış")
        }
        else if($scope.CmbEvrakTip == 3) //Konsinye İade Çıkış
        {
            $scope.EvrakTip = 1;
            $scope.NormalIade = 1;
            $scope.Tip = 1;
            $scope.Cins = 0;
            $scope.MiktarChange(3)
            console.log("Konsinye İade Çıkış")
        } 
        await db.MaxSira($scope.Firma,'MaxKonsinyeHarSira',[$scope.Seri,$scope.EvrakTip],function(data){$scope.Sira = data});
    }
    $scope.EvrakGetir = function ()
    {
        db.GetData($scope.Firma,'KonsinyeHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],async function(data)
        {
            if(data.length > 0)
            {
                Init();
                InitCariGrid();
                InitIslemGrid(); 
                
                $scope.CariFiyatListe = data[0].kon_fiyat_liste_no;
                $scope.Seri = data[0].kon_evrakno_seri;
                $scope.Sira = data[0].kon_evrakno_sira;
                $scope.Tip = data[0].kon_tip;
                $scope.EvrakTip = data[0].kon_evraktip.toString();
                $scope.CariKodu = data[0].kon_cari_kod;
                $scope.CariAdi = data[0].CARIADI;
                $scope.Sorumluluk = data[0].kon_stok_srm_merkez;
                $scope.Personel = data[0].kon_satici_kod;
                $scope.BelgeNo = data[0].kon_belge_no;
                $scope.Tarih = new Date(data[0].kon_tarih).toLocaleDateString();
                $scope.KabulTarihi = new Date(data[0].kon_malkbl_sevk_tarihi).toLocaleDateString();
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
                    $scope.Risk = $scope.CariListe[0].RISK;
                    $scope.RiskLimit = $scope.CariListe[0].RISKLIMIT;
                    $scope.Il = $scope.CariListe[0].IL;

                    $("#TblCari").jsGrid({data : $scope.CariListe});

                    let Obj = $("#TblCari").data("JSGrid");
                    let Item = Obj.rowByItem(data[0]);
                    
                    $scope.CariListeRowClick(0,Item,Obj);
                    
                });

                db.DepoGetir($scope.Firma,UserParam.KonsinyeIrsaliye.DepoListe,function(e)
                {
                    $scope.DepoListe = e; 
                    $scope.DepoNo = data[0].kon_giris_depo_no.toString();
                    $scope.DepoListe.forEach(function(item) 
                    {
                        if(item.KODU == $scope.DepoNo)
                            $scope.DepoAdi = item.ADI;
                    });     
                });
                
                db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(e){$scope.SorumlulukListe = e; $scope.Sorumluluk = data[0].kon_stok_srm_merkez; $scope.SorumlulukAdi = data[0].SORUMLUMERADI});
                db.FillCmbDocInfo($scope.Firma,'CmbPersonelGetir',function(e){$scope.PersonelListe = e; $scope.Personel = [0].kon_satici_kod; $scope.PersonelAdi = data[0].PERSONELADI});
                db.FillCmbDocInfo($scope.Firma,'CmbProjeGetir',function(e){$scope.ProjeListe = e; $scope.Proje = data[0].kon_proje_kodu});
                db.FillCmbDocInfo($scope.Firma,'CmbOdemePlanGetir',function(e){$scope.OdemePlanListe = e; $scope.OdemeNo = data[0].kons_odeme_op.toString()});
                
                $scope.KonsinyeListe = data;
                $("#TblIslem").jsGrid({data : $scope.KonsinyeListe});  
                DipToplamHesapla();
                ToplamMiktarHesapla()
                

                $scope.EvrakLock = true;
                $scope.BarkodLock = false;

                angular.element('#MdlEvrakGetir').modal('hide');

                BarkodFocus();
                // FisData(data)

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
    $scope.EvrakDelete = function()
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Evrağı silmek istediğinize eminmisiniz ?', 
        function()
        { 
            if($scope.KonsinyeListe.length > 0)
            {
                if(UserParam.KonsinyeIrsaliye.EvrakSil == 0)
                {
                    db.ExecuteTag($scope.Firma,'KonsHarEvrDelete',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
                    {
                        if(typeof(data.result.err) == 'undefined')
                        {
                            angular.forEach($scope.KonsinyeIrsaliye,function(value)
                            {
                                db.ExecuteTag($scope.Firma,'BedenHarDelete',[value.kon_Guid,11],function(data)
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
    //BELGE BİLGİSİ
    $scope.BelgeBilgisiClick = function() 
    {
        $("#TbBelgeBilgisi").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbDizayn").removeClass('active');
    }
    //CARI SEÇ 
    $scope.CariSecClick = function()
    {
        if($scope.Sira == 0 || typeof $scope.Sira == "undefined")
        {            
            alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Evrak Siranın Gelmesini Bekleyin!" + "</a>" );
        }
        else
        {
        $("#TbCariSec").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbDizayn").removeClass('active');
        }
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
            $scope.CariSoyAdi = $scope.CariListe[pIndex].UNVAN2;
            $scope.CariFiyatListe = $scope.CariListe[pIndex].SATISFK;      
            $scope.CariDovizCinsi = $scope.CariListe[pIndex].DOVIZCINSI;
            $scope.CariDovizCinsi1 = $scope.CariListe[pIndex].DOVIZCINSI1;
            $scope.CariDovizCinsi2 = $scope.CariListe[pIndex].DOVIZCINSI2;
            $scope.CariDovizKuru = $scope.CariListe[pIndex].DOVIZKUR;
            $scope.CariDovizKuru1 = $scope.CariListe[pIndex].DOVIZKUR1;
            $scope.CariDovizKuru2 = $scope.CariListe[pIndex].DOVIZKUR2;
            $scope.CariAltDovizKuru = $scope.CariListe[pIndex].ALTDOVIZKUR;
            $scope.CariBakiye = $scope.CariListe[pIndex].BAKIYE;
            $scope.CariVDADI = $scope.CariListe[pIndex].VDADI;
            $scope.CariVDNO = $scope.CariListe[pIndex].VDNO;
            $scope.Adres = $scope.CariListe[pIndex].ADRES;
            $scope.Adres1 = $scope.CariListe[pIndex].ADRES1;
            $scope.Adres2 = $scope.CariListe[pIndex].ADRES2;
            $scope.DovizSembol = $scope.CariListe[pIndex].DOVIZSEMBOL
            $scope.DovizSembol1 = $scope.CariListe[pIndex].DOVIZSEMBOL1
            $scope.DovizSembol2 = $scope.CariListe[pIndex].DOVIZSEMBOL2
            $scope.Risk = $scope.CariListe[pIndex].RISK
            $scope.RiskLimit = $scope.CariListe[pIndex].RISKLIMIT;
            $scope.DovizChangeKodu = "0"
            $scope.DovizChange()
            $scope.MainClick();
            AdresNoGetir();
        }
    }
    $scope.DovizChange = function()
    {
            if($scope.DovizChangeKodu == 0)
            {
               $scope.EvrakDovizTip = $scope.DovizSembol
            }
            else if($scope.DovizChangeKodu == 1)
            {
                $scope.CariDovizCinsi = $scope.CariDovizCinsi1;
                $scope.CariDovizKuru = $scope.CariDovizKuru1;
                $scope.EvrakDovizTip = $scope.DovizSembol1
            }
            else if($scope.DovizChangeKodu == 2)
            {
                $scope.CariDovizCinsi = $scope.CariDovizCinsi2
                $scope.CariDovizKuru =  $scope.CariDovizKuru2
                $scope.EvrakDovizTip = $scope.DovizSembol2
            }
    }
    //BARKOD GİRİŞ
    $scope.BarkodGirisClick = function() 
    {   
        if($scope.Sira == 0 || typeof $scope.Sira == "undefined")
        {            
            alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Evrak Siranın Gelmesini Bekleyin!" + "</a>" );
        }
        else
        {
            if($scope.CariAdi != "")
            {
                $("#TbBarkodGiris").addClass('active');
                $("#TbMain").removeClass('active');
                $("#TbCariSec").removeClass('active');
                $("#TbBelgeBilgisi").removeClass('active');
                $("#TbIslemSatirlari").removeClass('active');
                $("#TbStok").removeClass('active');
                $("#TbDizayn").removeClass('active');
                            
                BarkodFocus();
            }
            else
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Cari Seçiniz !" + "</a>" );
            }
        }
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
    $scope.MiktarFiyatValid = function()
    {
        $scope.Stok[0].TUTAR = ($scope.Stok[0].CARPAN * $scope.Miktar) * $scope.Stok[0].FIYAT;
        $scope.Stok[0].KDV = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].TOPTANVERGI / 100);
        $scope.Stok[0].TOPTUTAR = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) + $scope.Stok[0].KDV;
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
        $scope.KonsinyeMiktarListe = [];
        BarkodFocus();  
    }
    $scope.MiktarChange = function(pIndex)
    {
        if(pIndex == 0)
        {
            $scope.SevkMiktar = true;
            $scope.AlisMiktar = false;
            $scope.AlisIadeMiktar = false;
            $scope.SevkIadeMiktar = false;
            console.log("Konsinye Sevk")
        }
        else if(pIndex == 1)
        {
            $scope.SevkMiktar = false;
            $scope.AlisMiktar = true;
            $scope.AlisIadeMiktar = false;
            $scope.SevkIadeMiktar = false;
            console.log("Konsinye Alış")

        }
        else if(pIndex == 2)
        {
            $scope.AlisIadeMiktar = true;
            $scope.SevkMiktar = false;
            $scope.AlisMiktar = false;
            $scope.SevkIadeMiktar = false;
            console.log("Konsinye İade Alış")
        }
        else if(pIndex == 3)
        {
            $scope.SevkIadeMiktar = true;
            $scope.SevkMiktar = false;
            $scope.AlisMiktar = false;
            $scope.AlisIadeMiktar = false;
        }
        else
        {
            alertify.alert("Index değerleri yanlış")
        }
    }
    $scope.Insert = function()
    { 
        if(typeof($scope.Stok[0].KODU) != 'undefined')
        {
            if(UserParam.KonsinyeIrsaliye.EksiyeDusme == 1 && $scope.EvrakTip == 1 &&  ($scope.Miktar * $scope.Stok[0].CARPAN) > $scope.Stok[0].DEPOMIKTAR)
            {
                alertify.alert("Eksiye Düşmeye İzin Verilmiyor.");
                return;
            } 
            $scope.InsertLock = true
            if(UserParam.Sistem.SatirBirlestir == 0 || $scope.Stok[0].DETAYTAKIP == 2)
            {          
                InsertData();
            }
            // else
            // {
            //     if($scope.Stok[0].RENKPNTR != 0 || $scope.Stok[0].BEDENPNTR != 0)
            //     {
            //         let UpdateStatus = false;

            //         angular.forEach($scope.IrsaliyeListe,function(value)
            //         {
            //             if(value.sth_stok_kod == $scope.Stok[0].KODU)
            //             {   
            //                 let TmpQuery = 
            //                 {
            //                     db :'{M}.' + $scope.Firma,
            //                     query:  "SELECT BdnHar_Guid from BEDEN_HAREKETLERI WHERE BdnHar_Har_uid=@BdnHar_Har_uid AND BdnHar_BedenNo = @BdnHar_BedenHarNo",
            //                     param : ['BdnHar_Har_uid','BdnHar_BedenHarNo'],
            //                     type : ['string|50','int'],
            //                     value : [value.sth_Guid,Kirilim($scope.Stok[0].BEDENPNTR,$scope.Stok[0].RENKPNTR)]
            //                 }
            //                 db.GetDataQuery(TmpQuery,function(Data)
            //                 {
            //                     if(Data.length > 0)
            //                     {
            //                         db.ExecuteTag($scope.Firma,'BedenHarGorUpdate',[$scope.Miktar * $scope.Stok[0].CARPAN,Data[0].BdnHar_Guid],function(data)
            //                         {
            //                             console.log(data)
            //                         });
            //                     }
            //                     else
            //                     {
            //                         BedenHarInsert(value.sth_Guid)
            //                     }
            //                 });
                           

            //                 let TmpFiyat  = value.sth_tutar / value.sth_miktar
            //                 let TmpMiktar = value.sth_miktar + ($scope.Miktar * $scope.Stok[0].CARPAN);
            //                 let Data = 
            //                 {
            //                     Param :
            //                     [
            //                         TmpMiktar,
            //                         0,
            //                         TmpFiyat * TmpMiktar,
            //                         $scope.Stok[0].TOPTANVERGIPNTR,
            //                         0, //ISKONTO TUTAR 1
            //                         0, //ISKONTO TUTAR 2
            //                         0, //ISKONTO TUTAR 3
            //                         0, //ISKONTO TUTAR 4
            //                         0, //ISKONTO TUTAR 5
            //                         0, //ISKONTO TUTAR 6
            //                         0, //SATIR ISKONTO TİP 1
            //                         0, //SATIR ISKONTO TİP 2
            //                         0, //SATIR ISKONTO TİP 3
            //                         0, //SATIR ISKONTO TİP 4
            //                         0, //SATIR ISKONTO TİP 5
            //                         0, //SATIR ISKONTO TİP 6
            //                         value.sth_Guid
            //                     ],
            //                     BedenPntr : $scope.Stok[0].BEDENPNTR,
            //                     RenkPntr : $scope.Stok[0].RENKPNTR,
            //                     Miktar : TmpMiktar,
            //                     Guid : value.sth_Guid
            //                 };
    
            //                 UpdateStatus = true;
            //                 UpdateData(Data);
            //             }                        
            //         });
    
            //         if(!UpdateStatus)
            //         {
            //             InsertData();
            //         } 
            //     }
            //     else
            //     {
            //         let UpdateStatus = false;

            //         angular.forEach($scope.IrsaliyeListe,function(value)
            //         {
            //             if(value.sth_stok_kod == $scope.Stok[0].KODU)
            //             {   
            //                 let TmpFiyat  = value.sth_tutar / value.sth_miktar
            //                 let TmpMiktar = value.sth_miktar + ($scope.Miktar * $scope.Stok[0].CARPAN);
            //                 let Data = 
            //                 {
            //                     Param :
            //                     [
            //                         TmpMiktar,
            //                         0,
            //                         TmpFiyat * TmpMiktar,
            //                         $scope.Stok[0].TOPTANVERGIPNTR,
            //                         0, //ISKONTO TUTAR 1
            //                         0, //ISKONTO TUTAR 2
            //                         0, //ISKONTO TUTAR 3
            //                         0, //ISKONTO TUTAR 4
            //                         0, //ISKONTO TUTAR 5
            //                         0, //ISKONTO TUTAR 6
            //                         0, //SATIR ISKONTO TİP 1
            //                         0, //SATIR ISKONTO TİP 2
            //                         0, //SATIR ISKONTO TİP 3
            //                         0, //SATIR ISKONTO TİP 4
            //                         0, //SATIR ISKONTO TİP 5
            //                         0, //SATIR ISKONTO TİP 6
            //                         value.sth_Guid
            //                     ],
            //                     BedenPntr : $scope.Stok[0].BEDENPNTR,
            //                     RenkPntr : $scope.Stok[0].RENKPNTR,
            //                     Miktar : TmpMiktar,
            //                     Guid : value.sth_Guid
            //                 };
            //                 UpdateStatus = true;
            //                 UpdateData(Data);
            //             }                        
            //         });
    
            //         if(!UpdateStatus)
            //         {
            //             InsertData();
            //         } 
            //     }
            // }
        }
        else
        {
            console.log("Barkod Okutunuz!");
            $scope.InsertLock = false
        }     
        BarkodFocus();
    }
        // Manuel Arama
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
                if ($scope.StokListe.length > 0)
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
        $scope.StokListeRowClick = function(pIndex,pItem,pObj)
        {
            if ( StokSelectedRow ) { StokSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
            var $row = pObj.rowByItem(pItem);
            $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
            StokSelectedRow = $row;
            
            $scope.Barkod = $scope.StokListe[pIndex].KODU;
            $scope.BarkodGirisClick();
            StokBarkodGetir($scope.Barkod);
        }
    //İŞLEM SATIRLARI
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
    $scope.IslemListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( IslemSelectedRow ) { IslemSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        IslemSelectedRow = $row;
        $scope.IslemListeSelectedIndex = pIndex;
        console.log(pIndex)
        console.log(pItem)
    }
    $scope.SatirDelete = function()
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Evrağı silmek istediğinize eminmisiniz ?', 
        function()
        { 
            if($scope.IslemListeSelectedIndex > -1)
            {
                if(UserParam.KonsinyeIrsaliye.EvrakSil == 0)
                {
                    db.ExecuteTag($scope.Firma,'KonsHarSatirDelete',[$scope.KonsinyeListe[$scope.IslemListeSelectedIndex].kon_Guid],function(data)
                    {   
                        console.log(data)
                        // if(typeof(data.result.err) == 'undefined')
                        // {
                        //     db.ExecuteTag($scope.Firma,'BedenHarDelete',[$scope.KonsinyeListe[$scope.IslemListeSelectedIndex].kon_Guid,''],function(data)
                        //     {
                        //         if(typeof(data.result.err) != 'undefined')
                        //         {
                        //             console.log(data.result.err);
                        //         }       
                        //     });
                        // }
                        // else
                        // {
                        //     console.log(data.result.err);
                        // }
                        
                        if($scope.KonsinyeListe.length <= 1)
                        {
                            $scope.YeniEvrak();
                            $scope.MainClick();
                            console.log("Girdi")
                        }
                        else
                        {   
                            db.GetData($scope.Firma,'KonsinyeHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
                            {
                                console.log(data)
                                db.GetData($scope.Firma,'KonsBedenHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,''],function(BedenData)
                                {
                                    $scope.BedenHarListe = BedenData;
                                    console.log(BedenData)
                                });
                                $scope.KonsinyeListe = data;
                                console.log(data)
                                $("#TblIslem").jsGrid({data : $scope.KonsinyeListe});    
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
    $scope.BtnDuzenle = function()
    {
        console.log($scope.KonsinyeListe[0])
        $scope.MiktarEdit = $scope.KonsinyeListe[$scope.IslemListeSelectedIndex].MIKTAR;
        $scope.FiyatEdit = $scope.KonsinyeListe[$scope.IslemListeSelectedIndex].kons_tutar / $scope.KonsinyeListe[$scope.IslemListeSelectedIndex].MIKTAR;
        console.log($scope.KonsinyeListe[0])
        $("#MdlDuzenle").modal('show');
    }
    $scope.BtnDuzenleKaydet = function(pIndex)
    {   
        console.log($scope.KonsinyeListe[pIndex])
        let TmpTutar = $scope.FiyatEdit * $scope.MiktarEdit;
        let TmpYuzde1 = $scope.KonsinyeListe[pIndex].kons_iskonto1 / $scope.KonsinyeListe[pIndex].kons_tutar; 
        let TmpYuzde2 = $scope.KonsinyeListe[pIndex].kons_iskonto2 / ($scope.KonsinyeListe[pIndex].kons_tutar - $scope.KonsinyeListe[pIndex].kons_iskonto1); 
        let TmpYuzde3 = $scope.KonsinyeListe[pIndex].kons_iskonto3 / ($scope.KonsinyeListe[pIndex].kons_tutar - ($scope.KonsinyeListe[pIndex].kons_iskonto1 + $scope.KonsinyeListe[pIndex].kons_iskonto2));
        let TmpYuzde4 = $scope.KonsinyeListe[pIndex].kons_iskonto4 / ($scope.KonsinyeListe[pIndex].kons_tutar - ($scope.KonsinyeListe[pIndex].kons_iskonto1 + $scope.KonsinyeListe[pIndex].kons_iskonto2 + $scope.KonsinyeListe[pIndex].kons_iskonto3));
        let TmpYuzde5 = $scope.KonsinyeListe[pIndex].kons_iskonto5 / ($scope.KonsinyeListe[pIndex].kons_tutar - ($scope.KonsinyeListe[pIndex].kons_iskonto1 + $scope.KonsinyeListe[pIndex].kons_iskonto2 + $scope.KonsinyeListe[pIndex].kons_iskonto3 + $scope.KonsinyeListe[pIndex].kons_iskonto4));

        $scope.KonsinyeListe[pIndex].kons_iskonto1 = TmpTutar * TmpYuzde1;
        $scope.KonsinyeListe[pIndex].kons_iskonto2 = (TmpTutar - $scope.KonsinyeListe[pIndex].kons_iskonto1) * TmpYuzde2;
        $scope.KonsinyeListe[pIndex].kons_iskonto3 = (TmpTutar - ($scope.KonsinyeListe[pIndex].kons_iskonto1 + $scope.KonsinyeListe[pIndex].kons_iskonto2)) * TmpYuzde3;
        $scope.KonsinyeListe[pIndex].kons_iskonto4 = (TmpTutar- ($scope.KonsinyeListe[pIndex].kons_iskonto1 + $scope.KonsinyeListe[pIndex].kons_iskonto2 + $scope.KonsinyeListe[pIndex].kons_iskonto3)) * TmpYuzde4;
        $scope.KonsinyeListe[pIndex].kons_iskonto5 = (TmpTutar - ($scope.KonsinyeListe[pIndex].kons_iskonto1 + $scope.KonsinyeListe[pIndex].kons_iskonto2 + $scope.KonsinyeListe[pIndex].kons_iskonto3 + $scope.KonsinyeListe[pIndex].kons_iskonto4)) * TmpYuzde5;

        $scope.Update(pIndex);
    
        angular.element('#MdlDuzenle').modal('hide');
    }
    $scope.Update = function(pIndex)
    {   
        let Data = 
        {   
            Param :
            [
                $scope.MiktarEdit,
                $scope.Miktar,
                $scope.FiyatEdit * $scope.MiktarEdit,
                $scope.KonsinyeListe[pIndex].kons_vergi_pntr,
                $scope.KonsinyeListe[pIndex].kons_iskonto1, //ISKONTO TUTAR 1
                $scope.KonsinyeListe[pIndex].kons_iskonto2, //ISKONTO TUTAR 2
                $scope.KonsinyeListe[pIndex].kons_iskonto3, //ISKONTO TUTAR 3
                $scope.KonsinyeListe[pIndex].kons_iskonto4, //ISKONTO TUTAR 4
                $scope.KonsinyeListe[pIndex].kons_iskonto5, //ISKONTO TUTAR 5
                0, //ISKONTO TUTAR 6
                $scope.KonsinyeListe[pIndex].kons_sat_iskmas1, //SATIR ISKONTO 1
                $scope.KonsinyeListe[pIndex].kons_sat_iskmas2, //SATIR ISKONTO 2
                $scope.KonsinyeListe[pIndex].kons_sat_iskmas3, //SATIR ISKONTO 3
                $scope.KonsinyeListe[pIndex].kons_sat_iskmas4, //SATIR ISKONTO 4
                $scope.KonsinyeListe[pIndex].kons_sat_iskmas5, //SATIR ISKONTO 5
                0, // SATIR ISKONTO 6
                $scope.KonsinyeListe[pIndex].kon_Guid
            ],
            BedenPntr : $scope.KonsinyeListe[pIndex].BEDENPNTR,
            RenkPntr : $scope.KonsinyeListe[pIndex].RENKPNTR,
            Miktar : $scope.MiktarEdit,
            Guid : $scope.KonsinyeListe[pIndex].kon_Guid
        };
        UpdateData(Data);   
    }
}