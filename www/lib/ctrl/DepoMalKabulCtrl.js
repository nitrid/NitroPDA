function DepoMalKabulCtrl($scope,$window,$timeout,db)
{
    let IslemSelectedRow = null;
    let SiparisSelectedRow = null;
    let SiparisListeGetirRow = null;
    let ParamName = "";

    let UserParam = null;
    let EvrakParam = null;

    function Init()
    {
        gtag('config', 'UA-12198315-14', 
        {
            'page_title' : 'Mal Kabul Eşleştirme',
            'page_path': '/MalKabulEslestirme'
        });

        UserParam = Param[$window.sessionStorage.getItem('User')];
        $scope.Kullanici = UserParam.Kullanici.split("o",2).pop(1);
        $scope.Firma = $window.sessionStorage.getItem('Firma');
        
        $scope.CDepo;
        $scope.GDepo;
        $scope.CDepoAdi;
        $scope.GDepoAdi;
        $scope.Seri = "";
        $scope.Sira = 0;
        $scope.SipSeri = "";
        $scope.SipSira = 0;
        $scope.Sorumluluk = "";
        $scope.SorumlulukAdi = "";
        $scope.DepoAdi = "";
        $scope.BelgeNo = "";
        $scope.Barkod = "";
        $scope.StokGridText = "";
        $scope.OdemeNo = "0";
        $scope.Birim = "0";
        $scope.NormalIade = "0"
        $scope.StokGridTip = "0";
        $scope.CmbEvrakTip = UserParam.DepoMalKabul.EvrakTip
        $scope.ToplamSatir = 0;
        $scope.Miktar2 = 0;
        $scope.StokTip = 0;
        $scope.StokCins = 0;
        $scope.EvrakTip = 2;
        $scope.Cins = 6;
        $scope.Tip = 2;
        $scope.Tarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.DepoNo = 0;
        $scope.Personel = ''
        $scope.NDepo = UserParam.DepoMalKabul.NDepo
        $scope.NakliyeDurum = 0
        $scope.YazdirSeri = "";
        $scope.YazdirSira = "";
        $scope.SipSeriSira = "";

        $scope.Aciklama1 = "";
        $scope.Aciklama2 = "";
        $scope.Aciklama3 = "";
        $scope.Aciklama4 = "";
        $scope.Aciklama5 = "";
        
        $scope.SipIlkTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.SipSonTarih = moment(new Date()).format("DD.MM.YYYY");

        $scope.CDepoListe = [];
        $scope.GDepoListe = [];
        $scope.NDepoListe = [];
        $scope.DepoMalKListe = [];
        $scope.BirimListe = [];
        $scope.DepoMalKListe = [];
        $scope.DepoSiparisListe = [];
        $scope.SiparisListeGetir = [];
        $scope.StokListe = [];
        $scope.BedenHarListe = [];
        
        $scope.Stok = [];
        $scope.Miktar = 1;
        $scope.ToplamMiktar = 0;
        $scope.Tutar = 0;

        $scope.MiktarLock = false;
        $scope.OtoEkle = false;
        $scope.EvrakLock = false;
        $scope.BarkodLock = false;
        $scope.IslemListeSelectedIndex = -1;
        $scope.SiparisKabulListeSelectedIndex = 0;

        // DÜZENLE MODAL
        $scope.MiktarEdit = 0;
        $scope.FiyatEdit = 0;
        
        $scope.Loading = false;
        $scope.TblLoading = true;
    }
    function InitIslemGrid()
    {   
        
        $("#TblIslem").jsGrid({
            responsive: true,
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.DepoMalKListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            
            fields: 
            [
            {
                name: "sth_stok_kod",
                title: "KODU",
                type: "text",
                align: "center",
                width: 200
            }, 
            {
                name: "ADI",
                title: "ADI",
                type: "text",
                align: "center",
                width: 200
            }, 
            {
                name: "MIKTAR",
                title: "MIKTAR",
                type: "text",
                align: "center",
                width: 100
            }],
            rowClick: function(args)
            {
                $scope.IslemListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitSiparisListeGrid()
    {
        $("#TblSiparisListe").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.DepoSiparisListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: [
                {
                    name: "GIRISDEPOADI",
                    title: "GİRİŞ DEPO ADI",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "CIKISDEPOADI",
                    title: "ÇIKIŞ DEPO ADI",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "TESLIMTARIH",
                    title: "TESLİM TARİH",
                    type: "text",
                    align: "center",
                    width: 150
                },
                {
                    name: "SERI",
                    title: "SERİ",
                    type: "text",
                    align: "center",
                    width: 100
                },
                {
                    name: "SIRA",
                    title: "SIRA",
                    type: "text",
                    align: "center",
                    width: 100
                },
                {
                    name: "SIPMIKTAR",
                    title: "SİP MİKTAR",
                    type: "text",
                    align: "center",
                    width: 100
                },
                {
                    name: "TESLIMMIKTAR",
                    title: "TESLİM MİKTAR",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "BMIKTAR",
                    title: "BEKLEYEN MİKTAR",
                    type: "text",
                    align: "center",
                    width: 200
                }
             
            ],
            rowClick: function(args)
            {
                $scope.SiparisListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitSiparisListeGetirGrid()
    {
        $("#TblSiparisGetirListe").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            editing: true,
            data : $scope.SiparisListeGetir,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: [
                // { 
                //     itemTemplate: function(_, item) 
                //     {
                        
                //         return $("<button type='submit' class='btn btn-primary btn-block btn-sm'></button>").text("D")
                //             .on("click", function() 
                //             {
                //                 $scope.ManuelGiris(item);
                //             });
                //     },
                //     width: 45
                // },
                {
                    name: "KODU",
                    title: "KODU",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "ADI",
                    title: "ADI",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "MIKTAR",
                    title: "MİKTAR",
                    type: "number",
                    align: "center",
                    width: 100
                },
                {
                    name: "SIPMIKTAR",
                    title: "SİP MİKTAR",
                    type: "text",
                    align: "center",
                    width: 100
                },
                {
                    name: "TESLIMMIKTAR",
                    title: "TESLİM MİKTAR",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "BMIKTAR",
                    title: "BEKLEYEN MİKTAR",
                    type: "text",
                    align: "center",
                    width: 200
                }
             
            ],
            rowClick: function(args)
            {
                $scope.SiparisListeGetirRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InsertData(pCallback)
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
            1, //ISKONTO TUTAR 2
            1, //ISKONTO TUTAR 3
            1, //ISKONTO TUTAR 4
            1, //ISKONTO TUTAR 5
            1, //ISKONTO TUTAR 6
            1, //ISKONTO TUTAR 7
            1, //ISKONTO TUTAR 8
            1, //ISKONTO TUTAR 9
            1, //ISKONTO TUTAR 10
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
            '',
            '', // İŞEMRİKODU
            $scope.Personel,
           0, //HARDOVİZCİNSİ
            1, //HARDOVİZKURU
            1, //ALTDOVİZKURU
            0, //STOKDOVİZCİNSİ
            0, //STOKDOVİZKURU
            $scope.Miktar * $scope.Stok[0].CARPAN,
            $scope.Miktar2,
            $scope.Stok[0].BIRIMPNTR,
            0,
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
            0, //VERGİPNTR
            0,             //VERGİ
            0, // MASRAFVERGİPNTR,
            0, // MASRAFVERGİ
            $scope.OdemeNo,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
            '',//AÇIKLAMA
            $scope.SipGuid, //sth_sip_uid
            '00000000-0000-0000-0000-000000000000' , //sth_fat_uid,
            ($scope.NakliyeDurum == 1) ? $scope.NDepo : $scope.GDepo, //GİRİSDEPONO
            $scope.CDepo, //CİKİSDEPONO
            $scope.Tarih, //MALKABULSEVKTARİHİ
            '', // CARİSORUMLULUKMERKEZİ
            $scope.Sorumluluk,
            0,  // VERGİSİZFL
            0,  // ADRESNO
            '',
            0,
            '',
            '', // EXİMKODU
            0,  // DİSTİCARETTURU
            0,  // OTVVERGİSİZFL
            0,  // OİVVERGİSİZ
            1,
            ($scope.NakliyeDurum == 1) ? $scope.GDepo : 0,   //NAKLİYEDEPO
            0
        ];

        db.ExecuteTag($scope.Firma,'StokHarInsert',InsertData,function(InsertResult)
        {   
            
            if(typeof(InsertResult.result.err) == 'undefined')
            {
                console.log(InsertResult.result.recordsets[0][0].sth_Guid)
               
                if(typeof($scope.Stok[0].RECNO) != 'undefined')
                {
                    db.ExecuteTag($scope.Firma,'StokHarEkInsert',[UserParam.MikroId,UserParam.MikroId,InsertResult.result.recordsets[0][0].sth_Guid,$scope.Stok[0].RECNO]);
                    db.ExecuteTag($scope.Firma,'StokHarDepoSiparisUpdate',[$scope.Miktar * $scope.Stok[0].CARPAN,$scope.Stok[0].RECNO]);
                }
                db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(Data)
                {   
                  //  if($scope.Stok[0].BEDENPNTR != 0 && $scope.Stok[0].RENKPNTR != 0)
                  //  {
                  //      BedenHarInsert(InsertResult.result.recordset[0].sth_Guid);
                  //  } 
                  
                    InsertAfterRefresh(Data);
                    $scope.InsertLock = false;
                    
                    if(typeof pCallback != 'undefined')
                    {
                        pCallback(true);
                    }

                    FisData(Data)
                });
            }
            else
            {
                if(typeof pCallback != 'undefined')
                {
                    pCallback(false);
                }
                console.log(InsertResult.result.err);
            }
        });
    }
    function InsertAfterRefresh(pData)
    {    
        $scope.EvrakLock = true;
        $scope.BarkodLock = false;

        $scope.DepoMalKListe = pData;
        $("#TblIslem").jsGrid({data : $scope.DepoMalKListe});    
        $scope.BtnTemizle();
        ToplamMiktarHesapla();
        $scope.BtnSiparisListeGetir();
        
        $window.document.getElementById("Barkod").focus();
    } 
    function ToplamMiktarHesapla()
    {
        $scope.ToplamMiktar = 0;
        $scope.ToplamSatir = 0;

        angular.forEach($scope.DepoMalKListe,function(value)
        {
            $scope.ToplamMiktar += value.sth_miktar;
            $scope.ToplamSatir += 1 ;
        });
    }
    function BarkodFocus()
    {
        $timeout( function(){$window.document.getElementById("Barkod").focus();},100);
    }
    function StokBarkodGetir(pBarkod)
    {
        if(pBarkod != '')
        {
            // KILO BARKOD KONTROL EDİLİYOR. DÖNEN DEĞERLER ATANIYOR. ALI KEMAL KARACA 18.09.2019
            //pBarkod = db.KiloBarkod(pBarkod,UserParam).Barkod;
            $scope.Miktar = db.KiloBarkod(pBarkod,UserParam).Miktar;
            //SİPARİŞE BAĞLI VEYA NORMAL STOK OLARAK GETİRME FONKSİYONU
            EslestirmeStokGetir(pBarkod,async function(pData,pTip)
            {
                $scope.Stok = pData
                //FONKSİYONDA $scope.Stok İÇERİĞİ BOŞ GELİRSE TÜM İŞLEMLER İPTAL EDİLİYOR. ALI KEMAL KARACA 18.09.2019
                if($scope.Stok.length == 0)
                {
                    $scope.InsertLock = false;
                    $scope.BtnTemizle();
                    return;
                }
                //BİRİM GETİRİLİYOR
                await db.GetPromiseTag($scope.Firma,'CmbBirimGetir',[$scope.Stok[0].KODU],function(data)
                {   
                    $scope.BirimListe = data; 
                    $scope.Birim = JSON.stringify($scope.Stok[0].BIRIMPNTR);

                    if($scope.BirimListe.length > 0)
                    {
                        $scope.Stok[0].BIRIMPNTR = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].BIRIMPNTR;
                        $scope.Stok[0].BIRIM = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].BIRIM;
                        $scope.Stok[0].CARPAN = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].KATSAYI;
                    }
                    else
                    {  //BİRİMSİZ ÜRÜNLERDE BİRİMİ ADETMİŞ GİBİ DAVRANIYOR. RECEP KARACA 23.09.2019
                        $scope.Stok[0].BIRIMPNTR = 1;
                        $scope.Stok[0].BIRIM = 'ADET';
                        $scope.Stok[0].CARPAN = 1;
                    }
                });
                //ESLESTİRMESTOKGETİR FONKSİYONUNDAN DÖNEN TİPE GÖRE İŞLEMLER YAPILIYOR.
                if (pTip == 'Stok')
                {
                    console.log($scope.Stok)
                    //EĞER TİP STOK İSE..
                    let FiyatParam = 
                    { 
                        CARIADI : $scope.CariAdi,
                        CariKodu : $scope.CariKodu,
                        CariFiyatListe : $scope.CariFiyatListe,
                        DepoNo : $scope.DepoNo,
                        FiyatListe : 1,
                        AlisSatis : ($scope.EvrakTip === 0 ? 0 : 1)
                    };
                    await db.FiyatGetir($scope.Firma,pData,FiyatParam,UserParam[ParamName]);
                }
                //RENK BEDEN ,PARTİ LOT KONTROLÜ YAPILIYOR VE POP UP EKRANLARI AÇILIYOR.
                RenkBedenPartiLotKontrol();

                if($scope.OtoEkle == true)
                {
                    MiktarLock = true
                    $scope.Insert()
                }
                else
                {
                    $timeout( function(){$window.document.getElementById("Miktar").focus();},100);
                    $timeout( function(){$window.document.getElementById("Miktar").select();},300);
                }
                $scope.MiktarFiyatValid();
                $scope.AciklamaGetir();
                $scope.BarkodLock = true;
                $scope.$apply();
            });
        }
    }
    function EslestirmeStokGetir(pBarkod,pCallback)
    {
        let TmpParam =
        [
            $scope.GDepo,
            $scope.CDepo,
            $scope.SipSeri,
            $scope.SipSira,
            pBarkod
        ];
        db.GetData($scope.Firma,'DepoSiparisStok',TmpParam,function(BarkodData)
        {
            console.log(TmpParam)
            if(BarkodData.length > 0)
            {
                pCallback(BarkodData,'Siparis');
                $scope.OkutulanSayı()
            }
            else if(UserParam.Sistem.SiparisOlmayanBarkodKabul == 1)
            {
                alertify.okBtn('Evet');
                alertify.cancelBtn('Hayır');
        
                alertify.confirm('Bu Stok Siparişe Ait değil. Yinede Devam Edilsin Mi ?',function()
                { 
                    db.StokBarkodGetir($scope.Firma,pBarkod,$scope.DepoNo,function(StokData)
                    {
                        if(StokData.length > 0)
                        {
                            console.log(StokData)
                            pCallback(StokData,'Stok');
                        }
                        else
                        {
                            alertify.alert("Stok Bulunamamıştır !");
                            pCallback([],'');
                            Beep();
                        }
                    });
                })
            }
            else
            {   
                alertify.alert("Siparişte Olmayan BarkodKabul Parametreniz Kapalı !");
                console.log("Siparişte Olmayan BarkodKabul Parametreniz Kapalı !");
                pCallback([],'');
            }
        });
        
    }
    async function RenkBedenPartiLotKontrol()
    {
        if(UserParam.Sistem.PartiLotKontrol == 1)
        {
            for(i = 0;i < $scope.DepoMalKListe.length;i++)
            {   
                if($scope.Stok[0].PARTI != "" && $scope.Stok[0].LOT != "")
                { 
                    if($scope.Stok[0].PARTI == $scope.DepoMalKListe[i].sth_parti_kodu && $scope.Stok[0].LOT == $scope.DepoMalKListe[i].sth_lot_no)
                    {
                        alertify.alert("<a style='color:#3e8ef7''>" + "Okutmuş Olduğunuz "+ $scope.Stok[0].PARTI + ". " + "Parti " + $scope.Stok[0].LOT + ". " +"Lot Daha Önceden Okutulmuş !" + "</a>" );
                        $scope.InsertLock = false;
                        $scope.BtnTemizle();
                        return;
                    }
                }
            }
        }
        // if($scope.Stok[0].BEDENPNTR != 0 || $scope.Stok[0].RENKPNTR != 0)
        // {   
        //     if($scope.Stok[0].BEDENKODU != '' || $scope.Stok[0].RENKKODU != '')
        //     {   
        //         $('#MdlRenkBeden').modal("show");
        //         await db.GetPromiseTag($scope.Firma,'RenkGetir',[$scope.Stok[0].RENKKODU],function(pRenkData)
        //         {
        //             $scope.RenkListe = pRenkData;
        //             $scope.Stok[0].RENKPNTR = "1";
        //         });
        //         await db.GetPromiseTag($scope.Firma,'BedenGetir',[$scope.Stok[0].BEDENKODU],function(pBedenData)
        //         {  
        //             $scope.BedenListe = pBedenData;
        //             $scope.Stok[0].BEDENPNTR = "1";
        //         });
        //     }
        // } 
        if($scope.Stok[0].DETAYTAKIP == 1 || $scope.Stok[0].DETAYTAKIP == 2)
        {
            if($scope.Stok[0].PARTI !='')
            {
                await db.GetPromiseTag($scope.Firma,'PartiLotGetir',[$scope.Stok[0].KODU,$scope.DepoNo,$scope.Stok[0].PARTI,$scope.Stok[0].LOT],function(data)
                {   
                    $scope.PartiLotListe = data;
                    
                    if ($scope.Stok[0].PARTI != '')
                    {  
                        $scope.Miktar = $scope.PartiLotListe[0].MIKTAR  * $scope.Stok[0].CARPAN;
                    }
                });
            }
            else
            {                
                PartiLotEkran();
            }
        }
    }
    $scope.OkutulanSayı = function() //değişecek
    {
        db.GetData($scope.Firma,'EslestirmeOtukmaSayı',[$scope.Seri,$scope.Sira,$scope.Stok[0].KODU],function(data)
        {
            $scope.Okutulan = data;
        });
    }
    $scope.YeniEvrak = async function()
    {
        Init();
        InitIslemGrid();
        InitSiparisListeGrid();
        InitSiparisListeGetirGrid();
        $scope.MainClick();
        ParamName = "DepoMalKabul";

        $scope.EvrakLock = false;
        $scope.Seri = UserParam.DepoMalKabul.Seri;
        
        $scope.BelgeNo = UserParam.DepoMalKabul.BelgeNo;
        $scope.Personel =  ''

        $scope.Stok = 
        [
            {
                SATIR :0,
                MIKTAR :0,
                BIRIM : '',
                BIRIMPNTR : 0, 
                TOPMIKTAR : 0
            }
        ];

        await db.DepoGetir($scope.Firma,UserParam.DepoMalKabul.CDepoListe,function(data)
        {
            $scope.CDepoListe = data; 
            $scope.CDepo = UserParam.DepoMalKabul.CDepo;
            $scope.CDepoListe.forEach(function(item) 
            {
                if(item.KODU == $scope.CDepo)
                    $scope.CDepoAdi = item.ADI;
            });          
        });
        await db.DepoGetir($scope.Firma,UserParam.DepoMalKabul.GDepoListe,function(data)
        {
            $scope.GDepoListe = data; 
            $scope.GDepo = UserParam.DepoMalKabul.GDepo;
            $scope.GDepoListe.forEach(function(item) 
            {
                if(item.KODU == $scope.GDepo)
                    $scope.GDepoAdi = item.ADI;
            });     
        });
        await db.DepoGetir($scope.Firma,UserParam.DepoMalKabul.NDepoListe,function(data)
        {
            $scope.NDepoListe = data; 
            $scope.NDepo = UserParam.DepoMalKabul.NDepo;
            $scope.NDepoListe.forEach(function(item) 
            {
                if(item.KODU == $scope.NDepo)
                    $scope.NDepoAdi = item.ADI;
            });     
        });
        console.log($scope.Seri)
        await db.MaxSiraPromiseTag($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip],function(data)
        {
            console.log(data)
            $scope.Sira = data
        });
        
        BarkodFocus();
        $scope.EvrakTipChange();
    }
    $scope.EvrakGetir = function()
    {
        db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
        {
            if(data.length > 0)
            {
                Init();
                InitIslemGrid();

                $scope.Seri = data[0].sth_evrakno_seri;
                $scope.Sira = data[0].sth_evrakno_sira;

                $scope.Tarih = new Date(data[0].ssip_belge_tarih).toLocaleDateString();
                $scope.Stok = 
                [
                    {
                        BIRIM : '',
                        Miktar :0,
                        Miktar2:0,
                        BIRIMPNTR : 0, 
                        TOPMIKTAR : 0
                    }
                ];
                $scope.Miktar = 1;
            
                $scope.TOPMIKTAR = 1;

                
                db.FillCmbDocInfo($scope.Firma,'CmbDepoGetir',function(e)
                {
                    $scope.CDepoListe = e; $scope.CDepo = data[0].sth_cikis_depo_no.toString();
                    $scope.CDepoListe.forEach(function(item) 
                    {
                        if(item.KODU == $scope.CDepo)
                            $scope.CDepoAdi = item.ADI;
                    }); 
                });
                db.FillCmbDocInfo($scope.Firma,'CmbDepoGetir',function(e)
                {
                    $scope.GDepoListe = e; $scope.GDepo = data[0].sth_giris_depo_no.toString();
                    $scope.GDepoListe.forEach(function(item) 
                    {
                        if(item.KODU == $scope.GDepo)
                            $scope.GDepoAdi = item.ADI;
                    }); 
                });
                db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(e){$scope.SorumlulukListe = e; $scope.Sorumluluk = data[0].ssip_sormerkezi});

                $scope.DepoMalKListe = data;
                $("#TblIslem").jsGrid({data : $scope.DepoMalKListe});  
            
                ToplamMiktarHesapla();
                $scope.AciklamaGetir();

                $scope.EvrakLock = true;
                $scope.BarkodLock = false;

                angular.element('#MdlEvrakGetir').modal('hide');
                alertify.alert("<a style='color:#3e8ef7''>" + $scope.ToplamSatir + " " + "- Satır Evrak Getirildi !" + "</a>" );
                BarkodFocus();
            }
            else
            {
                angular.element('#MdlEvrakGetir').modal('hide');
                alertify.okBtn("Tamam");
                alertify.alert("Belge Bulunamadı !");
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
            console.log($scope.DepoMalKListe)
            if($scope.DepoMalKListe.length > 0)
            {
                db.ExecuteTag($scope.Firma,'StokHarEvrDelete',[$scope.Seri,$scope.Sira,$scope.EvrakTip,$scope.Cins],function(data)
                {
                    console.log(1)
                    if(typeof(data.result.err) == 'undefined')
                    {
                        console.log
                        angular.forEach($scope.DepoMalKListe,function(value)
                        {
                            console.log([value.sth_miktar,value.sth_sip_uid])
                            if(value.sth_Guid != 0)
                            {
                                console.log([value.sth_miktar,value.sth_sip_uid])
                                db.ExecuteTag($scope.Firma,'StokHarDepoSiparisDeleteUpdate',[value.sth_miktar,value.sth_sip_uid]);
                            }
                            db.ExecuteTag($scope.Firma,'BedenHarDelete',[value.sth_Guid,11],function(data)
                            {
                                if(typeof(data.result.err) != 'undefined')
                                {
                                    console.log(data.result.err);
                                }
                                $scope.YeniEvrak();
                            });
                        });
                    }
                    else
                    {
                        console.log(data.result.err);
                    }

                });
            }
            else
            {
                alertify.okBtn("Tamam");
                alertify.alert("Silinecek Belge Yok !");
            }
        });
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
                db.ExecuteTag($scope.Firma,'StokHarSatirDelete',[$scope.DepoMalKListe[$scope.IslemListeSelectedIndex].sth_Guid],function(data)
                {
                    console.log($scope.DepoMalKListe[$scope.IslemListeSelectedIndex])
                    console.log([$scope.DepoMalKListe[$scope.IslemListeSelectedIndex].sth_miktar,$scope.DepoMalKListe[$scope.IslemListeSelectedIndex].sth_sip_uid])
                    db.ExecuteTag($scope.Firma,'StokHarDepoSiparisDeleteUpdate',[$scope.DepoMalKListe[$scope.IslemListeSelectedIndex].sth_miktar,$scope.DepoMalKListe[$scope.IslemListeSelectedIndex].sth_sip_uid],function(data)
                    {   
                    });
                    console.log($scope.IslemListeSelectedIndex,[$scope.DepoMalKListe[$scope.IslemListeSelectedIndex]])
                    db.ExecuteTag($scope.Firma,'BedenHarDelete',[$scope.DepoMalKListe[$scope.IslemListeSelectedIndex].sth_Guid,9],function(data)
                    {
                        if(typeof(data.result.err) != 'undefined')
                        {
                            console.log(data.result.err);
                        }       
                    });
                    
                    if($scope.DepoMalKListe.length <= 1)
                    {
                        $scope.YeniEvrak()
                    }
                    else
                    {   
                        db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
                        {
                            db.GetData($scope.Firma,'StokBedenHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,11],function(BedenData)
                            {
                                $scope.BedenHarListe = BedenData;
                            });

                            $scope.DepoMalKListe = data;
                            $("#TblIslem").jsGrid({data : $scope.DepoMalKListe});    
                            $scope.BtnTemizle();
                        });
                    }
                });
            }
            else
            {
                alertify.okBtn("Tamam");
                alertify.alert("Seçili satır olmadan evrak silemezsiniz !");
            }
        },
        function(){});
    }
    $scope.EvrakTipChange = async function()
    {
        if($scope.CmbEvrakTip == 0)
        {   
            $scope.EvrakTip = 2;
            $scope.Cins = 6;
            $scope.Tip = 2;
            $scope.NakliyeDurum = 0
        }
        else if($scope.CmbEvrakTip == 1)
        {   
            $scope.EvrakTip = 17;
            $scope.Cins = 6;
            $scope.Tip = 2;
            $scope.NakliyeDurum = 1
        }
    }
    $scope.GDepoChange = function()
    {
        $scope.GDepoListe.forEach(function(item) 
        {
            if(item.KODU == $scope.GDepo)
                $scope.GDepoAdi = item.ADI;
        });
    }
    $scope.CDepoChange = function()
    {
        $scope.CDepoListe.forEach(function(item) 
        {
            if(item.KODU == $scope.CDepo)
                $scope.CDepoAdi = item.ADI;
        });
    }
    $scope.NDepoChange = function()
    {
        $scope.NDepoListe.forEach(function(item) 
        {
            if(item.KODU == $scope.NDepo)
                $scope.NDepoAdi = item.ADI;
        });
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
    $scope.BtnSiparisListele = async function()
    {
        $scope.Loading = true;
        $scope.TblLoading = false;

        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "SELECT " +
                    "MAX(ssip_Guid) AS SIPGUID, " +
                    "ISNULL((SELECT TOP 1 dep_adi FROM DEPOLAR WHERE dep_no = SIPARIS.ssip_girdepo),'') AS GIRISDEPOADI, " +
                    "ISNULL((SELECT TOP 1 dep_adi FROM DEPOLAR WHERE dep_no = SIPARIS.ssip_cikdepo),'') AS CIKISDEPOADI, " + 
                    "CONVERT(VARCHAR,SIPARIS.ssip_teslim_tarih, 104) AS TESLIMTARIH, " +
                    "SIPARIS.ssip_evrakno_seri AS SERI, " +
                    "SIPARIS.ssip_evrakno_sira AS SIRA, " +
                    "SUM(SIPARIS.ssip_miktar) AS SIPMIKTAR, " +
                    "SUM(SIPARIS.ssip_teslim_miktar) AS TESLIMMIKTAR, " + 
                    "SIPARIS.ssip_girdepo AS GIRISDEPO, " + 
                    "SIPARIS.ssip_cikdepo AS CIKISDEPO, " + 
                    "SUM(SIPARIS.ssip_miktar - SIPARIS.ssip_teslim_miktar) AS BMIKTAR, " + 
                    "COUNT(SIPARIS.ssip_satirno) AS SATIR " +
                    "FROM DEPOLAR_ARASI_SIPARISLER AS SIPARIS " + 
                    "WHERE SIPARIS.ssip_teslim_tarih>=@ILKTARIH AND SIPARIS.ssip_teslim_tarih<=@SONTARIH " +
                    "GROUP BY SIPARIS.ssip_teslim_tarih,SIPARIS.ssip_evrakno_seri,SIPARIS.ssip_evrakno_sira,SIPARIS.ssip_girdepo, " + 
                    "SIPARIS.ssip_cikdepo " +
                    "HAVING SUM(SIPARIS.ssip_miktar - SIPARIS.ssip_teslim_miktar) > 0 " +
                    "ORDER BY ssip_teslim_tarih " ,
            param:  ['ILKTARIH','SONTARIH'],
            type:   ['date','date'],
            value:  [$scope.SipIlkTarih,$scope.SipSonTarih]
        }
        await db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.DepoSiparisListe = Data;
            if($scope.DepoSiparisListe.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblSiparisListe").jsGrid({data : $scope.DepoSiparisListe});
            }
            else
            {
                alertify.alert("Seçilen " + $scope.SipIlkTarih + " - " + $scope.SipSonTarih + " Tarih Aralığında Sipariş Bulunamamıştır.");
                $scope.Loading = false;
                $scope.TblLoading = true;
            }
        });
    }
    $scope.BtnSiparisListeGetir = async function()
    {
        $scope.Loading = true;
        $scope.TblLoading = false;

        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "SELECT " +
                    "MAX(BARKOD.bar_kodu) AS BARKOD, " +
                    "DEPOSIPARIS.ssip_stok_kod AS KODU, " +
                    "ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod=DEPOSIPARIS.ssip_stok_kod),'') AS ADI, " +
                    "DEPOSIPARIS.ssip_satirno AS SATIRNO, " +
                    "DEPOSIPARIS.ssip_belgeno AS BELGENO, " +
                    "DEPOSIPARIS.ssip_b_fiyat AS BFIYAT, " +
                    "ISNULL(BEDENHAR.BdnHar_HarGor, DEPOSIPARIS.ssip_miktar) AS SIPMIKTAR, " +
                    "ISNULL(BEDENHAR.BdnHar_TesMik, DEPOSIPARIS.ssip_teslim_miktar) AS TESLIMMIKTAR, " +
                    "DEPOSIPARIS.ssip_tutar AS TUTAR, " +
                    "DEPOSIPARIS.ssip_girdepo AS GDEPO, " +
                    "DEPOSIPARIS.ssip_cikdepo as CDEPO, " +
                    "ISNULL((BEDENHAR.BdnHar_HarGor - BEDENHAR.BdnHar_TesMik)	,(DEPOSIPARIS.ssip_miktar - DEPOSIPARIS.ssip_teslim_miktar)) AS BMIKTAR, " +
                    "CONVERT(FLOAT,0) AS MIKTAR, " +
                    "(SELECT dbo.fn_StokBirimi (DEPOSIPARIS.ssip_stok_kod,DEPOSIPARIS.ssip_birim_pntr)) AS BIRIM, " +
                    "ISNULL((SELECT dbo.fn_DepodakiMiktar (STOK.sto_kod,@CDEPO,CONVERT(VARCHAR(10),GETDATE(),112))),0) AS DEPOMIKTAR " +
                    "FROM DEPOLAR_ARASI_SIPARISLER AS DEPOSIPARIS " +
                    "INNER JOIN  BARKOD_TANIMLARI AS BARKOD ON  " +
                    "BARKOD.bar_stokkodu=DEPOSIPARIS.ssip_stok_kod " +
                    "LEFT OUTER JOIN BEDEN_HAREKETLERI AS BEDENHAR ON  " +
                    "BEDENHAR.[BdnHar_Tipi] = 1 AND BdnHar_Guid = DEPOSIPARIS.ssip_Guid " +
                    "INNER JOIN STOKLAR AS STOK ON " +
                    "STOK.sto_kod = DEPOSIPARIS.ssip_stok_kod " +
                    "WHERE DEPOSIPARIS.ssip_evrakno_seri = @SIPSERI AND DEPOSIPARIS.ssip_evrakno_sira = @SIPSIRA AND  DEPOSIPARIS.ssip_miktar > DEPOSIPARIS.ssip_teslim_miktar  " +
                    "GROUP BY " +
                    "DEPOSIPARIS.ssip_stok_kod, " +
                    "STOK.sto_isim, " +
                    "DEPOSIPARIS.ssip_tarih, " +
                    "DEPOSIPARIS.ssip_teslim_tarih, " +
                    "DEPOSIPARIS.ssip_evrakno_seri, " +
                    "DEPOSIPARIS.ssip_evrakno_sira, " +
                    "DEPOSIPARIS.ssip_satirno, " +
                    "DEPOSIPARIS.ssip_belgeno, " +
                    "DEPOSIPARIS.ssip_b_fiyat, " +
                    "BEDENHAR.BdnHar_HarGor, " +
                    "DEPOSIPARIS.ssip_miktar," + 
                    "DEPOSIPARIS.ssip_birim_pntr," +
                    "BEDENHAR.BdnHar_TesMik, " +
                    "DEPOSIPARIS.ssip_teslim_miktar, " +
                    "DEPOSIPARIS.ssip_tutar, " +
                    "DEPOSIPARIS.ssip_girdepo, " +
                    "DEPOSIPARIS.ssip_cikdepo, " +
                    "BEDENHAR.BdnHar_BedenNo, " +
                    "STOK.sto_renk_kodu, " +
                    "STOK.sto_beden_kodu, " +
                    "BARKOD.bar_birimpntr, " +
                    "STOK.sto_kod, " +
                    "STOK.sto_detay_takip " ,
            param:  ['CDEPO','SIPSERI','SIPSIRA'],
            type:   ['int','string|25','int'],
            value:  [$scope.CDepo,$scope.SipSeri,$scope.SipSira]
        }
        await db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.SiparisListeGetir = Data;
            if($scope.SiparisListeGetir.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblSiparisGetirListe").jsGrid({data : $scope.SiparisListeGetir});
            }
            else
            {
                angular.element('#MdlSiparisListeGetir').modal('hide');
                alertify.alert("Seçilen  Sipariş Tamamlanmıştır.");
                $scope.Loading = false;
                $scope.TblLoading = true;
            }
        });
    }
    $scope.BtnSiparisListeGetirSec = function()
    {
        angular.element('#MdlSiparisListeGetir').modal('hide');
        StokBarkodGetir($scope.Barkod);
    }
    $scope.AciklamaGetir = function()
    {   
        db.GetData($scope.Firma,'AciklamaGetir',[86,0,0,$scope.Seri,$scope.Sira],function(pData)
        {
            console.log(pData)
            if(pData.length > 0)
            {
                $scope.AciklamaSatir = pData
                $scope.Aciklama1 = $scope.AciklamaSatir[0].egk_evracik1,
                $scope.Aciklama2 = $scope.AciklamaSatir[0].egk_evracik2,
                $scope.Aciklama3 = $scope.AciklamaSatir[0].egk_evracik3,
                $scope.Aciklama4 = $scope.AciklamaSatir[0].egk_evracik4,
                $scope.Aciklama5 = $scope.AciklamaSatir[0].egk_evracik5,
                $scope.AciklamaGuid = $scope.AciklamaSatir[0].egk_Guid
            }
        })
    }
    $scope.BtnAciklamaKaydet = function()
    {
        var InsertData =
        [
            16,
            2,
            2,
            $scope.Seri,
            $scope.Sira,
            $scope.Aciklama1,
            $scope.Aciklama2,
            $scope.Aciklama3,
            $scope.Aciklama4,
            $scope.Aciklama5
        ];
        console.log(InsertData)
        db.ExecuteTag($scope.Firma,'AciklamaInsert',InsertData,function(InsertResult)
        {
            if(typeof(InsertResult.result.err) == 'undefined')
            {
                alertify.alert('Başarıyla Kaydedildi')
                console.log(InsertResult)
            }
        });
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
                TOPMIKTAR :0
            }
        ];
        $scope.Miktar = 1;
        $scope.BarkodLock = false;
        

        $scope.BirimListe = [];
        BarkodFocus();      
    }
    $scope.BtnDuzenle = function()
    {
        $scope.MiktarEdit = $scope.DepoMalKListe[$scope.IslemListeSelectedIndex].sth_miktar;
        $("#MdlDuzenle").modal('show');
    }
    $scope.Insert = function()
    {
        $scope.InsertLock = true
        if(typeof($scope.Stok[0].KODU) != 'undefined')
        {      
            if(($scope.Miktar *  $scope.Stok[0].CARPAN) > ($scope.Stok[0].SIPMIKTAR - $scope.Stok[0].TESLIMMIKTAR))
            {
                alertify.okBtn("Tamam");
                alertify.alert("Girdiğiniz Miktar Sipariş Miktarından Büyük !");
                $scope.InsertLock = false;
                return;
            }
            else
            {
                if(UserParam.Sistem.SatirBirlestir == 0 || $scope.Stok[0].RENKPNTR != 0 || $scope.Stok[0].BEDENPNTR != 0 || $scope.Stok[0].DETAYTAKIP != 1 || $scope.Stok[0].DETAYTAKIP != 2)
                {              
                    InsertData();
                }
                else
                {
                    let UpdateStatus = false;
    
                    angular.forEach($scope.DepoMalKListe,function(value)
                    {
                        if(value.sth_stok_kod == $scope.Stok[0].KODU)
                        {   
                            let TmpMiktar = value.sth_miktar + ($scope.Miktar * $scope.Stok[0].CARPAN);
    
                            let Data = 
                            {
                                Param :
                                [
                                    TmpMiktar,
                                    TmpMiktar,
                                    0, //TUTAR
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
                            $scope.InsertLock = false 
                        }                     
                    });
    
                    if(!UpdateStatus)
                    {
                        InsertData();
                        $scope.InsertLock = false 
                    }                
                }
            }
          
        }
        else
        {   
            alertify.alert("<a style='color:#3e8ef7''>" + "Barkod Okutunuz !" + "</a>" );
            console.log("Barkod Okutunuz!");
            $scope.InsertLock = false;
        }     
        
        BarkodFocus();
    }
    $scope.BtnStokBarkodGetir = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            StokBarkodGetir($scope.Barkod);    
        }
    }
    $scope.BtnBarkodGetirClick = function()
    {
        StokBarkodGetir($scope.Barkod);   
    }
    $scope.MiktarFiyatValid = function()
    {
        $scope.Stok[0].TOPMIKTAR = $scope.Stok[0].CARPAN * $scope.Miktar
        $scope.Stok[0].TUTAR = ($scope.Stok[0].CARPAN * $scope.Miktar) * $scope.Stok[0].FIYAT;
    }
    $scope.IslemListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( IslemSelectedRow ) { IslemSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        IslemSelectedRow = $row;
        $scope.IslemListeSelectedIndex = pIndex;
    }
    $scope.SiparisListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( SiparisSelectedRow ) { SiparisSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        SiparisSelectedRow = $row;
        
        $scope.SipSeri = $scope.DepoSiparisListe[pIndex].SERI;
        $scope.SipSira = $scope.DepoSiparisListe[pIndex].SIRA;
        $scope.CDepo = $scope.DepoSiparisListe[pIndex].CIKISDEPO.toString();
        $scope.GDepo = $scope.DepoSiparisListe[pIndex].GIRISDEPO.toString();
        $scope.CDepoAdi = $scope.DepoSiparisListe[pIndex].CIKISDEPOADI;
        $scope.GDepoAdi = $scope.DepoSiparisListe[pIndex].GIRISDEPOADI;
        $scope.SipGuid = $scope.DepoSiparisListe[pIndex].SIPGUID;
    }
    $scope.SiparisListeGetirRowClick = function(pIndex,pItem,pObj)
    {
        if ( SiparisListeGetirRow ) { SiparisListeGetirRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        SiparisListeGetirRow = $row;
        
        $scope.Barkod = $scope.SiparisListeGetir[pIndex].BARKOD;
    }
    $scope.MainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TbSiparisSecimi").removeClass('active');
    }
    $scope.BelgeBilgisiClick = function() 
    {
        $("#TbBelgeBilgisi").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbSiparisSecimi").removeClass('active');
    }
    $scope.BarkodGirisClick = function() 
    {
        if($scope.Sira == 0 || typeof $scope.Sira == "undefined")
        {            
            alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Evrak Siranın Gelmesini Bekleyin!" + "</a>" );
        }
        else
        {
            if($scope.EvrakTip == 17 && $scope.NDepo == 0)
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Nakliye Deponuzu Seçin!" + "</a>" );
            }
            else
            {
                console.log($scope.DepoMalKListe)
                if($scope.GDepo == $scope.CDepo <= 0 && $scope.DepoSiparisListe.length < 1 || $scope.GDepo != $scope.CDepo <= 0 && $scope.DepoSiparisListe.length < 1) 
                {
                    alertify.alert("Bu Ekrana Girebilmeniz İçin Sipariş Seçimi Yapılmalı ve Giriş ve Çıkış Depoları Farklı Olmalıdır.");
                }
                else
                {
                    $("#TbBarkodGiris").addClass('active');
                    $("#TbMain").removeClass('active');
                    $("#TbBelgeBilgisi").removeClass('active');
                    $("#TbIslemSatirlari").removeClass('active');
                    $("#TbSiparisSecimi").removeClass('active');
                }
            }
        }
        BarkodFocus();
    }
    $scope.TbIslemSatirlariClick = function() 
    {
        $("#TbIslemSatirlari").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbSiparisSecimi").removeClass('active');
    }
    $scope.SiparisSecimiClick = function() 
    {
        if($scope.DepoMalKListe.length == 0)
        {
            $("#TbSiparisSecimi").addClass('active');
            $("#TbMain").removeClass('active');
        }
        else
        {
            alertify.okBtn("Tamam");
            alertify.alert("Kayıtlı Evrak Olmadan Bu Menüye Giremezsiniz!");            
        }
    }
    $scope.SiparisEkranSec = function()
    {
        $("#TbBarkodGiris").removeClass('active');
    }
    $scope.ManuelGiris = function(pItem)
     {
        $scope.Barkod = pItem.BARKOD
        StokBarkodGetir(pItem.BARKOD)
        $scope.Miktar = pItem.MIKTAR
        $scope.Insert()
    }
    $scope.SiparisYazdir = function ()
    {
        console.log($scope.SipSeriSira)
        $scope.YazdirSeri = $scope.SipSeriSira.split("-",1).pop(1);
        $scope.YazdirSira = $scope.SipSeriSira.split("-",2).pop(1);

        let TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
                query:  "SELECT * FROM DEPOLAR_ARASI_SIPARISLER WHERE ssip_evrakno_seri = @ssip_evrakno_seri AND ssip_evrakno_sira = @ssip_evrakno_sira ",
                param:  ['ssip_evrakno_seri','ssip_evrakno_sira'],
                type:   ['string|25','int'],
                value:  [$scope.YazdirSeri,$scope.YazdirSira]
        }
        console.log(TmpQuery)
        db.GetDataQuery(TmpQuery,function(data)
        {   
            if(data.length > 0)
            {
                if($scope.YazdirSeri != '')
                {
                    let TmpQuery = 
                    {
                        db : '{M}.' + $scope.Firma,
                            query:  "UPDATE DEPOLAR_ARASI_SIPARISLER SET ssip_special1 = 1 " +
                                    "WHERE ssip_evrakno_seri = @ssip_evrakno_seri AND ssip_evrakno_sira = @ssip_evrakno_sira ",
                            param:  ['ssip_evrakno_seri','ssip_evrakno_sira'],
                            type:   ['string|25','int'],
                            value:  [$scope.YazdirSeri,$scope.YazdirSira]
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
                        $('#MdlSipYazdir').modal('hide');
                    });
                }
                else
                {
                    alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Sipariş Barkodunu Okutunuz !" + "</a>" ); 
                    $('#MdlSipYazdir').modal('hide');
                }
            }
            else
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Sipariş Bulunamadı !" + "</a>" ); 
                $('#MdlSipYazdir').modal('hide');
            }
        });    
    }
    $scope.BtnSiparisYazdir = function()
    {
        $('#MdlSipYazdir').modal("show");
    }
    $scope.ScanSipBarkod = function()
    {
        
        cordova.plugins.barcodeScanner.scan(
            function (result) 
            {
                $scope.SipSeriSira = result.text;
                BarkodSiparisAra(13)
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