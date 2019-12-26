function MalKabulEslestirmeCtrl($scope,$window,$timeout,db)
{
    let CariSelectedRow = null;
    let IslemSelectedRow = null;
    let StokSelectedRow = null;
    let PartiLotSelectedRow = null;
    let SiparisKabulListeSelectedRow = null;
    let ChaGuid = "";
    let ParamName = "";

    let UserParam = null;
    let EvrakParam = null;

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
            'page_title' : 'Mal Kabul Eşleştirme',
            'page_path': '/MalKabulEslestirme'
        });

        UserParam = Param[$window.sessionStorage.getItem('User')];
        $scope.Firma = $window.sessionStorage.getItem('Firma');

        $scope.Seri = "";
        $scope.Sira = 0;
        
        $scope.EvrakTip =13;
        $scope.CariKodu = "";
        $scope.CariAdi = "";
        $scope.CariFiyatListe = 0;
        $scope.CariDovizCinsi = 0;
        $scope.CariDovizKuru = 0;
        $scope.BelgeNo = "";
        $scope.DepoNo;     
        $scope.DepoAdi = "";       
        $scope.Sorumluluk = "";
        $scope.Personel = "";
        $scope.Proje = "";
        $scope.ToplamSatir = 0;
        $scope.Tarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.MalKabulSevkTarihi = moment(new Date()).format("DD.MM.YYYY");
        $scope.BelgeTarih = 0;
        $scope.OdemeNo = "0";
        $scope.Barkod = "";
        $scope.Birim = "0";
        $scope.StokGridTip = "0";
        $scope.StokGridText = "";        
        $scope.Miktar2 = 0;
        $scope.CmbEvrakTip = '0';
        $scope.StokTip = 0;
        $scope.StokCins = 0;        
        $scope.StokNormalIade = 0;
        $scope.StokEvrakTip = 0;
        $scope.CariTip = 0;
        $scope.CariCins = 0;        
        $scope.CariNormalIade = 0;
        $scope.CariEvrakTip = 0;
        $scope.ChaEvrakTip = 0;
        $scope.ChaTip = 1;
        $scope.ChaCins = 6;
        $scope.ChaNormalIade = 0;
        $scope.SipTarih1 = moment(new Date()).format("DD.MM.YYYY");
        $scope.SipTarih2 = moment(new Date()).format("DD.MM.YYYY");

        $scope.DepoListe = [];
        $scope.CariListe = [];
        $scope.SorumlulukListe = [];
        $scope.PersonelListe = [];
        $scope.ProjeListe = [];
        $scope.OdemePlanListe = [];
        $scope.StokHarListe = [];
        $scope.BedenHarListe = [];
        $scope.BirimListe = [];
        $scope.StokListe = [];
        $scope.PartiLotListe = [];
        $scope.RenkListe = [];
        $scope.BedenListe = [];
        $scope.SiparisKabulListe = [];
        
        $scope.AraToplam = 0;
        $scope.ToplamIndirim = 0;
        $scope.NetToplam = 0;
        $scope.ToplamKdv = 0;
        $scope.GenelToplam = 0;

        $scope.Stok = [];
        $scope.Miktar = 1;

        $scope.CmbCariAra = "0";
        $scope.TxtCariAra = "";
        $scope.MiktarLock = false;
        $scope.OtoEkle = false;
        $scope.EvrakLock = false;
        $scope.BarkodLock = false;
        $scope.IslemListeSelectedIndex = -1;
        $scope.PartiLotListeSelectedIndex = 0;
        $scope.SiparisKabulListeSelectedIndex = 0;

        $scope.TxtParti = "";
        $scope.TxtLot = 0;
        $scope.SktTarih = new Date().toLocaleDateString();
        $scope.LblPartiLotAlert = "";

        // DÜZENLE MODAL
        $scope.MiktarEdit = 0;
        $scope.FiyatEdit = 0;

        $scope.TblLoading = true;
    }
    function InitCariGrid()
    {   
        $("#TblCari").jsGrid
        ({
            width: "100%",
            height: "300px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.CariListe,
            fields: 
            [
                {
                    name: "KODU",
                    title: "KODU",
                    type: "number",
                    align: "center",
                    width: 100
                    
                },
                {
                    name: "UNVAN1",
                    title: "UNVAN",
                    type: "text",
                    align: "center",
                    width: 300
                },
                {
                    name: "BAKIYE",
                    title: "BAKIYE",
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
            height: "283px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.StokHarListe,
            //paging : true,
            //pageSize: 50,
            //pageButtonCount: 3,
            //pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
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
                title: "MIKTAR",
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
                width: 100
            },
            {
                name: "sth_iskonto1",
                title: "IND1",
                type: "number",
                align: "center",
                width: 200
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
    function InitSiparisListeGrid()
    {
        $("#TblSiparisListe").jsGrid
        ({
            width: "100%",
            height: "350px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.StokListe,
            fields: [
                {
                    name: "ADI",
                    title: "ADI",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "BMIKTAR",
                    title: "BEKLEYEN MIK.",
                    type: "number",
                    align: "center",
                    width: 100
                },
                {
                    name: "RENK",
                    title: "RENK",
                    type: "text",
                    align: "center",
                    width: 100
                },
                {
                    name: "BEDEN",
                    title: "BEDEN",
                    type: "text",
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
            height: "200px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.PartiLotListe,
            paging : true,
            pageSize: 50,
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
    function InitSiparisKabulListeGrid()
    {
        $("#TblSiparisKabulListe").jsGrid
        (   {
            width: "100%",
            height: "350px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.SiparisKabulListe,
            fields: [
                {
                    name: "TESLIMTARIH",
                    title: "TESLIM TARIHI",
                    type: "text",
                    align: "center",
                    width: 120
                }, 
                {
                    name: "SERI",
                    title: "SERI",
                    type: "text",
                    align: "center",
                    width: 60
                }, 
                {
                    name: "SIRA",
                    title: "SIRA NO",
                    type: "number",
                    align: "center",
                    width: 100
                }, 
                {
                    name: "CARIKOD",
                    title: "CARI KODU",
                    type: "number",
                    align: "center",
                    width: 150
                } , 
                {
                    name: "CARIADI",
                    title: "CARI ADI",
                    type: "number",
                    align: "center",
                    width: 300
                } , 
                {
                    name: "BMIKTAR",
                    title: "BİRİM",
                    type: "number",
                    align: "center",
                    width: 100
                } , 
                {
                    name: "SATIR",
                    title: "SATIR",
                    type: "number",
                    align: "center",
                    width: 50
                } 
            ],
            rowClick: function(args)
            {
                $scope.SiparisKabulListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function ToplamMiktarHesapla()
    {
       $scope.ToplamMiktar1 = 0;
       $scope.ToplamMiktar2 = 0;
       $scope.ToplamMiktar3 = 0;
       $scope.ToplamMiktar4 = 0;
       $scope.ToplamMiktar5 = 0;
       $scope.ToplamSatir = 0;

       angular.forEach($scope.StokHarListe,function(value)
       {
           $scope.ToplamMiktar1 += value.sym_miktar1;
           $scope.ToplamMiktar2 += value.sym_miktar2;
           $scope.ToplamMiktar3 += value.sym_miktar3;
           $scope.ToplamMiktar4 += value.sym_miktar4;
           $scope.ToplamMiktar5 += value.sym_miktar5;
           $scope.ToplamSatir += 1;
       });
    }
    function BarkodFocus()
    {
        $timeout( function(){$window.document.getElementById("Barkod").focus();},100);  
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
    function EslestirmeStokGetir(pBarkod,pCallback)
    {
        let TmpParam =
        [
            $scope.DepoNo,
            $scope.CariKodu,
            ($scope.SiparisKabulListe.length > 0) ? $scope.SiparisKabulListe[$scope.SiparisKabulListeSelectedIndex].SERI : "",
            ($scope.SiparisKabulListe.length > 0) ? $scope.SiparisKabulListe[$scope.SiparisKabulListeSelectedIndex].SIRA : 0,
            pBarkod
        ];

        db.GetData($scope.Firma,'SiparisStokGetir',TmpParam,function(BarkodData)
        { 
            if(BarkodData.length > 0)
            {
                pCallback(BarkodData,'Siparis');
               
            }
            else if(UserParam.Sistem.SiparisOlmayanBarkodKabul == 1)
            {
                console.log(222)
                alertify.okBtn('Evet');
                alertify.cancelBtn('Hayır');
        
                alertify.confirm('Bu Stok Siparişe Ait değil. Yinede Devam Edilsin Mi ?',function()
                { 
                    db.StokBarkodGetir($scope.Firma,pBarkod,$scope.DepoNo,function(StokData)
                    {
                        if(StokData.length > 0)
                        {
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
            for(i = 0;i < $scope.StokHarListe.length;i++)
            {   
                if($scope.Stok[0].PARTI != "" && $scope.Stok[0].LOT != "")
                { 
                    if($scope.Stok[0].PARTI == $scope.StokHarListe[i].sth_parti_kodu && $scope.Stok[0].LOT == $scope.StokHarListe[i].sth_lot_no)
                    {
                        alertify.alert("<a style='color:#3e8ef7''>" + "Okutmuş Olduğunuz "+ $scope.Stok[0].PARTI + ". " + "Parti " + $scope.Stok[0].LOT + ". " +"Lot Daha Önceden Okutulmuş !" + "</a>" );
                        $scope.InsertLock = false;
                        $scope.BtnTemizle();
                        return;
                    }
                }
            }
        }
        console.log($scope.Stok[0].BEDENPNTR);
        if($scope.Stok[0].BEDENPNTR == 0 || $scope.Stok[0].RENKPNTR == 0)
        {   
            if($scope.Stok[0].BEDENKODU != '' || $scope.Stok[0].RENKKODU != '')
            {   
                $('#MdlRenkBeden').modal("show");
                await db.GetPromiseTag($scope.Firma,'RenkGetir',[$scope.Stok[0].RENKKODU],function(pRenkData)
                {
                    $scope.RenkListe = pRenkData;
                    $scope.Stok[0].RENKPNTR = "1";
                });
                await db.GetPromiseTag($scope.Firma,'BedenGetir',[$scope.Stok[0].BEDENKODU],function(pBedenData)
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
                await db.GetPromiseTag($scope.Firma,'PartiLotGetir',[$scope.Stok[0].KODU,$scope.DepoNo,$scope.Stok[0].PARTI,$scope.Stok[0].LOT],function(data)
                {   
                    $scope.PartiLotListe = data;
                    
                    if(UserParam.Sistem.PartiLotMiktarKontrol == 1 && ($scope.Stok[0].PARTI != ''))
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
    function BarkodGetir(pBarkod)
    {
        if(pBarkod != '')
        {
            // KILO BARKOD KONTROL EDİLİYOR. DÖNEN DEĞERLER ATANIYOR. ALI KEMAL KARACA 18.09.2019
            pBarkod = db.KiloBarkod(pBarkod,UserParam).Barkod;
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
                //BİRİM GETİRİLİYOR c
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
                    { //BİRİMSİZ ÜRÜNLERDE BİRİMİ ADETMİŞ GİBİ DAVRANIYOR. RECEP KARACA 23.09.2019
                        $scope.Stok[0].BIRIMPNTR = 1;
                        $scope.Stok[0].BIRIM = 'ADET';
                        $scope.Stok[0].CARPAN = 1;
                    }
                });
                //ESLESTİRMESTOKGETİR FONKSİYONUNDAN DÖNEN TİPE GÖRE İŞLEMLER YAPILIYOR.
                if (pTip == 'Stok')
                {
                    //EĞER TİP STOK İSE..
                    let FiyatParam = 
                    { 
                        CARIADI : $scope.CariAdi,
                        CariKodu : $scope.CariKodu,
                        CariFiyatListe : $scope.CariFiyatListe,
                        DepoNo : $scope.DepoNo,
                        AlisSatis : ($scope.EvrakTip === 0 ? 0 : 1)
                    };
                    await db.FiyatGetir($scope.Firma,pData,FiyatParam,UserParam[ParamName]);
                }
                //RENK BEDEN ,PARTİ LOT KONTROLÜ YAPILIYOR VE POP UP EKRANLARI AÇILIYOR.
                //RenkBedenPartiLotKontrol();

                if($scope.OtoEkle == true)
                {
                    MiktarLock = true
                    $scope.Insert()
                }
                else
                {
                    $window.document.getElementById("Miktar").focus();
                    $window.document.getElementById("Miktar").select();
                }

                $scope.MiktarFiyatValid();
                $scope.BarkodLock = true;
                $scope.$apply();
            });
        }
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
                db.GetData($scope.Firma,'SipBedenHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,9],function(BedenData)
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
        db.BedenHarUpdate($scope.Firma,pData,function(data)
        {
            if(typeof(data.result.err) == 'undefined')
            {
                db.GetData($scope.Firma,'BedenHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(BedenData)
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
    function CariHarInsert()
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
            $scope.ChaTip,
            $scope.ChaCins,
            $scope.ChaNormalIade,
            0, //TPOZ
            0, //CHATICARETTURU
            $scope.BelgeNo,
            $scope.Tarih,
            "", //ACIKLAMA
            $scope.Personel, //SATICIKODU
            "", //EXIMKODU
            $scope.Proje, //PROJEKODU
            0,  //CARICINS
            $scope.CariKodu,
            $scope.CariKodu,
            0, //DCİNS
            1, //DKUR
            1, //ALTDKUR
            0, //GRUPNO
            $scope.Sorumluluk,
            0,  //KASAHIZMET
            "", //KASAHIZKOD
            0, //KARSIDGRUPNO
            $scope.Stok[0].TOPTUTAR, //MEBLAG
            $scope.Stok[0].TUTAR,    //ARATOPLAM
            0, //VADE
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
            $scope.Stok[0].TOPTANVERGIPNTR, //VERİPNTR
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
            "", //TREFNO
            0, //SNTCKPOZ
            0 //EISLEMTURU
        ];

        db.ExecuteTag($scope.Firma,'CariHarInsert',InsertData,function(InsertResult)
        {   
            ChaGuid = InsertResult.result.recordset[0].cha_Guid;
            $scope.InsertLock = false;
            StokHarInsert();
           
            db.GetData($scope.Firma,'CariHarGetir',[$scope.Seri,$scope.Sira,$scope.ChaEvrakTip],function(CariHarGetir)
            {
                $scope.CariHarListe = CariHarGetir;
            });
                
        });
    }
    function CariHarUpdate(pCallback)
    {   
        $scope.TopIskonto = 
        (db.SumColumn($scope.FaturaListe,"sth_iskonto1") + db.SumColumn($scope.FaturaListe,"sth_iskonto2") + 
        db.SumColumn($scope.FaturaListe,"sth_iskonto3") + db.SumColumn($scope.FaturaListe,"sth_iskonto4") + db.SumColumn($scope.FaturaListe,"sth_iskonto5"))

        var CariHarUpdate = 
        [
            (((db.SumColumn($scope.FaturaListe,"sth_tutar") - $scope.TopIskonto) + db.SumColumn($scope.FaturaListe,"sth_vergi")) + $scope.Stok[0].TUTAR), //MEBLAG
            db.SumColumn($scope.FaturaListe,"sth_tutar") + $scope.Stok[0].TUTAR, // ARATOPLAM
            0,  //CHARVERGİ1
            0,  //CHAVERGİ2
            0,  //CHAVERHGİ3
            0,  //CHAVERGİ4
            0,  //CHAVERGİ5
            0,  //CHAVERGİ6
            0,  //CHAVERGİ7
            0,  //CHAVERGİ8
            0,  //CHAVERGİ9
            0,  //CHAVERGİ10
            0,  //FTISKONTO
            0,  //FTISKONTO2
            0,  //FTISKONTO3
            0,  //FTISKONTO4
            0,  //FTISKONTO5
            0,  //FTISKONTO6
            0,  //OTVTUTARI
            $scope.CariHarListe[0].cha_Guid
        ];
        
        db.ExecuteTag($scope.Firma,'CariHarUpdate',CariHarUpdate,function(InsertResult)
        {   
            pCallback(InsertResult);
        });
    }
    function DipToplamHesapla()
    {
        $scope.AraToplam = 0;
        $scope.ToplamIndirim = 0;
        $scope.ToplamKdv = 0;
        $scope.NetToplam = 0;
        $scope.GenelToplam = 0;

        angular.forEach($scope.StokHarListe,function(value)
        {
            $scope.AraToplam += value.sth_tutar;
            $scope.ToplamIndirim += (value.sth_iskonto1 + value.sth_iskonto2 + value.sth_iskonto3 + value.sth_iskonto4 + value.sth_iskonto5 + value.sth_iskonto6);
            $scope.ToplamKdv += value.sth_vergi;
        });
        $scope.NetToplam = $scope.AraToplam - $scope.ToplamIndirim;
        $scope.GenelToplam = $scope.NetToplam + $scope.ToplamKdv;
    }
    function IrsInsert()
    { 
        if(typeof($scope.Stok[0].KODU) != 'undefined')
        {   
            if(UserParam.Sistem.SatirBirlestir == 0 || $scope.Stok[0].RENKPNTR != 0 || $scope.Stok[0].BEDENPNTR != 0 || $scope.Stok[0].DETAYTAKIP == 1 || $scope.Stok[0].DETAYTAKIP == 2)
            {   
                InsertDataIrs();
            }
            else
            {   
                let UpdateStatus = false;
                angular.forEach($scope.StokHarListe,function(value)
                {   
                    if(value.sth_stok_kod == $scope.Stok[0].KODU)
                    {   
                        let TmpFiyat  = value.sth_tutar / value.sth_miktar
                        let TmpMiktar = value.sth_miktar + ($scope.Miktar * $scope.Stok[0].CARPAN);
                        
                        let TmpIskonto1 = 0;
                        let TmpIskonto2 = 0;
                        let TmpIskonto3 = 0;
                        let TmpIskonto4 = 0;
                        let TmpIskonto5 = 0;
                        let TmpIskonto6 = 0;
                        let TmpIskontoTip1 = 0;
                        let TmpIskontoTip2 = 0;
                        let TmpIskontoTip3 = 0;
                        let TmpIskontoTip4 = 0;
                        let TmpIskontoTip5 = 0;
                        let TmpIskontoTip6 = 0;

                        if(typeof($scope.Stok[0].RECNO) != 'undefined')
                        {
                            TmpIskonto1 = ($scope.Stok[0].ISKONTO_1 / $scope.Stok[0].SIPMIKTAR) * TmpMiktar;
                            TmpIskonto2 = ($scope.Stok[0].ISKONTO_2 / $scope.Stok[0].SIPMIKTAR) * TmpMiktar;
                            TmpIskonto3 = ($scope.Stok[0].ISKONTO_3 / $scope.Stok[0].SIPMIKTAR) * TmpMiktar;
                            TmpIskonto4 = ($scope.Stok[0].ISKONTO_4 / $scope.Stok[0].SIPMIKTAR) * TmpMiktar;
                            TmpIskonto5 = ($scope.Stok[0].ISKONTO_5 / $scope.Stok[0].SIPMIKTAR) * TmpMiktar;
                            TmpIskonto6 = ($scope.Stok[0].ISKONTO_6 / $scope.Stok[0].SIPMIKTAR) * TmpMiktar;
                            
                            TmpIskontoTip1 = $scope.Stok[0].ISKONTO1;
                            TmpIskontoTip2 = $scope.Stok[0].ISKONTO2;
                            TmpIskontoTip3 = $scope.Stok[0].ISKONTO3;
                            TmpIskontoTip4 = $scope.Stok[0].ISKONTO4;
                            TmpIskontoTip5 = $scope.Stok[0].ISKONTO5;
                            TmpIskontoTip6 = $scope.Stok[0].ISKONTO6;
                        }
                        else
                        { 
                            if(typeof($scope.Stok[0].SATSART) != 'undefined')
                            {
                                TmpIskonto1 = value.sth_iskonto1 + ($scope.Stok[0].SATSART.ISKONTOM1 * ($scope.Miktar * $scope.Stok[0].CARPAN));
                            }
                        }
                        let Data = 
                        {
                            Param :
                            [
                                TmpMiktar,
                                TmpMiktar,
                                TmpFiyat * TmpMiktar,
                                $scope.Stok[0].TOPTANVERGIPNTR,
                                TmpIskonto1, //ISKONTO TUTAR 1
                                TmpIskonto2, //ISKONTO TUTAR 2
                                TmpIskonto3, //ISKONTO TUTAR 3
                                TmpIskonto4, //ISKONTO TUTAR 4
                                TmpIskonto5, //ISKONTO TUTAR 5
                                TmpIskonto6, //ISKONTO TUTAR 6
                                TmpIskontoTip1, //SATIR ISKONTO TİP 1
                                TmpIskontoTip2, //SATIR ISKONTO TİP 2
                                TmpIskontoTip3, //SATIR ISKONTO TİP 3
                                TmpIskontoTip4, //SATIR ISKONTO TİP 4
                                TmpIskontoTip5, //SATIR ISKONTO TİP 5
                                TmpIskontoTip6, //SATIR ISKONTO TİP 6
                                value.sth_Guid
                            ],
                            BedenPntr : $scope.Stok[0].BEDENPNTR,
                            RenkPntr : $scope.Stok[0].RENKPNTR,
                            Miktar : $scope.Miktar * $scope.Stok[0].CARPAN
                        };
                    console.log(Data)
                        UpdateStatus = true;
                        UpdateDataIrs(Data);
                    }                        
                });

                if(!UpdateStatus)
                { 
                    InsertDataIrs();
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
    function InsertDataIrs()
    {   
        let TmpIskonto1 = 0;
        let TmpIskonto2 = 0;
        let TmpIskonto3 = 0;
        let TmpIskonto4 = 0;
        let TmpIskonto5 = 0;
        let TmpIskonto6 = 0;
        let TmpIskontoTip1 = 0;
        let TmpIskontoTip2 = 1;
        let TmpIskontoTip3 = 1;
        let TmpIskontoTip4 = 1;
        let TmpIskontoTip5 = 1;
        let TmpIskontoTip6 = 1;
        let TmpIsk1 = 0;
        let TmpIsk2 = 0;
        let TmpIsk3 = 0;
        let TmpIsk4 = 0;
        let TmpIsk5 = 0;
        let TmpIsk6 = 0;
        //let TmpRec = 0;

        if(typeof($scope.Stok[0].RECNO) != 'undefined')
        {
            TmpIskonto1 = ($scope.Stok[0].ISKONTO_1 / $scope.Stok[0].SIPMIKTAR) * ($scope.Miktar * $scope.Stok[0].CARPAN);
            TmpIskonto2 = ($scope.Stok[0].ISKONTO_2 / $scope.Stok[0].SIPMIKTAR) * ($scope.Miktar * $scope.Stok[0].CARPAN);
            TmpIskonto3 = ($scope.Stok[0].ISKONTO_3 / $scope.Stok[0].SIPMIKTAR) * ($scope.Miktar * $scope.Stok[0].CARPAN);
            TmpIskonto4 = ($scope.Stok[0].ISKONTO_4 / $scope.Stok[0].SIPMIKTAR) * ($scope.Miktar * $scope.Stok[0].CARPAN);
            TmpIskonto5 = ($scope.Stok[0].ISKONTO_5 / $scope.Stok[0].SIPMIKTAR) * ($scope.Miktar * $scope.Stok[0].CARPAN);
            TmpIskonto6 = ($scope.Stok[0].ISKONTO_6 / $scope.Stok[0].SIPMIKTAR) * ($scope.Miktar * $scope.Stok[0].CARPAN);
            
            TmpIskontoTip1 = $scope.Stok[0].ISKONTO1;
            TmpIskontoTip2 = $scope.Stok[0].ISKONTO2;
            TmpIskontoTip3 = $scope.Stok[0].ISKONTO3;
            TmpIskontoTip4 = $scope.Stok[0].ISKONTO4;
            TmpIskontoTip5 = $scope.Stok[0].ISKONTO5;
            TmpIskontoTip6 = $scope.Stok[0].ISKONTO6;

            TmpIsk1 = $scope.Stok[0].ISK1;
            TmpIsk2 = $scope.Stok[0].ISK2;
            TmpIsk3 = $scope.Stok[0].ISK3;
            TmpIsk4 = $scope.Stok[0].ISK4;
            TmpIsk5 = $scope.Stok[0].ISK5;
            TmpIsk6 = $scope.Stok[0].ISK6;

            TmpRec = $scope.Stok[0].RECNO;
        }
        else
        {
            if(typeof($scope.Stok[0].SATSART) != 'undefined')
            {
                TmpIskonto1 = $scope.Stok[0].SATSART.ISKONTOM1 * ($scope.Miktar * $scope.Stok[0].CARPAN);
            }
        }
        var InsertData = 
        [
            Param[0].MikroId,
            Param[0].MikroId,
            0, //FİRMA NO
            0, //ŞUBE NO
            $scope.Tarih,
            $scope.StokTip,
            $scope.StokCins,
            $scope.StokNormalIade,
            $scope.StokEvrakTip,
            $scope.Seri,
            $scope.Sira,
            $scope.BelgeNo,
            $scope.Tarih,
            $scope.Stok[0].KODU,
            TmpIskontoTip1, //ISKONTO TİP 1
            TmpIskontoTip2, //ISKONTO TİP 2
            TmpIskontoTip3, //ISKONTO TİP 3
            TmpIskontoTip4, //ISKONTO TİP 4
            TmpIskontoTip5, //ISKONTO TİP 5
            TmpIskontoTip6, //ISKONTO TİP 6
            0, //ISKONTO TUTAR 7
            0, //ISKONTO TUTAR 8
            0, //ISKONTO TUTAR 9
            0, //ISKONTO TUTAR 10
            TmpIsk1, //ISKONTO TUTAR 1
            TmpIsk2, //ISKONTO TUTAR 2
            TmpIsk3, //ISKONTO TUTAR 3
            TmpIsk4, //ISKONTO TUTAR 4
            TmpIsk5, //ISKONTO TUTAR 5
            TmpIsk6, //ISKONTO TUTAR 6
            0, //SATIR ISKONTO TİP 7
            0, //SATIR ISKONTO TİP 8
            0, //SATIR ISKONTO TİP 9
            0, //SATIR ISKONTO TİP 10
            0, //CARİCİNSİ
            $scope.CariKodu,
            $scope.Personel,
            0, //HARDOVİZCİNSİ
            1, //HARDOVİZKURU
            1, //ALTDOVİZKURU
            0, //STOKDOVİZCİNSİ
            1, //STOKDOVİZKURU
            $scope.Miktar * $scope.Stok[0].CARPAN,
            $scope.Miktar2,
            $scope.Stok[0].BIRIMPNTR,
            $scope.Stok[0].TUTAR,
            TmpIskonto1, // İSKONTO 1
            TmpIskonto2, // İSKONTO 2
            TmpIskonto3, // İSKONTO 3
            TmpIskonto4, // İSKONTO 4
            TmpIskonto5, // İSKONTO 5
            TmpIskonto6, // İSKONTO 6
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
            $scope.Stok[0].RECNO, //sth_sip_uid
            '00000000-0000-0000-0000-000000000000', //sth_fat_uid,
            $scope.DepoNo, //GİRİSDEPO
            $scope.DepoNo, //CİKİS
            $scope.Tarih, //MALKABULSEVKTARİHİ
            $scope.Sorumluluk, // CARİSORUMLULUKMERKEZİ
            $scope.Sorumluluk, // STOKSORUMLULUKMERKEZİ
            0,  //VERGİSİZFL
            0,  // ADRESNO
            $scope.Stok[0].PARTI,
            $scope.Stok[0].LOT,
            $scope.Proje,
            '', // EXİMKODU
            0,  // DİSTİCARETTURU
            0,  // OTVVERGİSİZFL
            0,  // OİVVERGİSİZ
            $scope.CariFiyatListe ,  // FİYATLİSTENO
            0   //NAKLİYEDEPO
          ];
        db.ExecuteTag($scope.Firma,'StokHarInsert',InsertData,function(InsertResult)
        {   
            if(typeof(InsertResult.result.err) == 'undefined')
            {   
                if(typeof($scope.Stok[0].RECNO) != 'undefined')
                {
                    console.log($scope.Stok[0].RECNO)
                    
                    db.ExecuteTag($scope.Firma,'StokHarSiparisUpdate',[$scope.Miktar * $scope.Stok[0].CARPAN,$scope.Stok[0].RECNO]);
                }
                
                db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.StokEvrakTip],function(IrsaliyeData)
                {    
                    $scope.StokHarListe = IrsaliyeData;
                    if($scope.Stok[0].BEDENPNTR != 0 && $scope.Stok[0].RENKPNTR != 0)
                    {
                        BedenHarInsert(InsertResult.result.recordset[0].sth_Guid);
                    } 
                    InsertAfterRefresh(IrsaliyeData);       
                    $scope.InsertLock = false  
                    $scope.MiktarLock = false              
                });
            }
            else
            {
                console.log(InsertResult.result.err);
                $scope.InsertLock = false  
                $scope.MiktarLock = false 
            }
        });
    }
    function InsertAfterRefresh(pData)
    {    
        $scope.EvrakLock = true;
        $scope.BarkodLock = false;

        $scope.StokHarListe = pData;
        $("#TblIslem").jsGrid({data : $scope.StokHarListe});    
        $scope.BtnTemizle();
        DipToplamHesapla();
        $scope.BtnStokGridGetir();
        ToplamMiktarHesapla();  
        if(UserParam.Sistem.Titresim == 1)
        {
            Confirmation();
        }
        
        $window.document.getElementById("Barkod").focus();
    }
    function StokHarInsert()
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
            $scope.Personel,
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
            ChaGuid, //sth_fat_uid,
            $scope.DepoNo, //GİRİSDEPONO
            0,             //CİKİSDEPONO
            $scope.Tarih, //MALKABULSEVKTARİHİ
            '', // CARİSORUMLULUKMERKEZİ
            $scope.Sorumluluk,
            0,  // VERGİSİZFL
            $scope.Stok[0].PARTI,
            $scope.Stok[0].LOT,
            0,  // LOT
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
                db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(FaturaData)
                {
                    if($scope.Stok[0].BEDENPNTR != 0 && $scope.Stok[0].RENKPNTR != 0)
                    {   
                        BedenHarInsert(InsertResult.result.recordset[0].sth_Guid);
                    } 

                    InsertAfterRefresh(FaturaData);
                    $scope.InsertLock = false;

                });
            }
            
            if(typeof($scope.Stok[0].RECNO) != 'undefined')
            {
                db.ExecuteTag($scope.Firma,'StokHarSiparisUpdate',[$scope.Miktar * $scope.Stok[0].CARPAN,$scope.Stok[0].RECNO]);
            }
            
        });
    }
    function UpdateDataIrs(pData) 
    {   
        db.ExecuteTag($scope.Firma,'StokHarUpdate',pData.Param,function(InsertResult)
        {
            if(typeof(InsertResult.result.err) == 'undefined')
            {
                if(typeof($scope.Stok[0].RECNO) != 'undefined')
                {
                    db.ExecuteTag($scope.Firma,'StokHarSiparisUpdate',[$scope.Miktar * $scope.Stok[0].CARPAN,$scope.Stok[0].RECNO]);
                }
                
                db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.StokEvrakTip],function(IrsaliyeData)
                {   
                    if(pData.BedenPntr != 0 && pData.RenkPntr != 0)
                    {
                        let UpdateStatus = false;
                        angular.forEach($scope.BedenHarListe,function(value)
                        {
                            if(value.BdnHar_Har_uid == InsertResult.result.recordset[0].sth_Guid && value.BdnHar_BedenNo == Kirilim(pData.BedenPntr,pData.RenkPntr))
                            {
                                let Data =
                                [
                                    value.BdnHar_Tipi,      // TİPİ
                                    value.BdnHar_Har_uid,   // GUID
                                    value.BdnHar_BedenNo,   // BEDEN NO
                                    value.BdnHar_HarGor + pData.Miktar, // MİKTAR
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

                            $scope.InsertLock = false;                        
                        });

                      //  if(!UpdateStatus)
                      //  {
                      //      BedenHarInsert(InsertResult.result.recordset[0].sth_Guid);
                      //  }
                    }                        
                    InsertAfterRefresh(IrsaliyeData);
                    $scope.InsertLock = false
                });
            }
            else
            {
                console.log(InsertResult.result.err);
            }
        });
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
                $scope.$apply();

                $("#LblPartiLotAlert").hide();
                $("TblPartiLot").jsGrid({data : $scope.PartiLotListe});
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
    function AktarimSiraGetir(pSeri,pSira,pCallback)
    {
        localStorage.mode = 'true';
        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "SELECT " +
                    "CASE WHEN MAX(sth_evrakno_sira) IS NOT NULL THEN " +
                    "(SELECT ISNULL(MAX(sth_evrakno_sira),0) + 1 FROM STOK_HAREKETLERI WHERE sth_evrakno_seri = @sth_evrakno_seri AND sth_evrakno_sira = @sth_evrakno_sira) " +
                    "ELSE " +
                    "@sth_evrakno_sira END AS EvrakSira " +
                    "FROM STOK_HAREKETLERI WHERE sth_evrakno_seri = @sth_evrakno_seri AND sth_evrakno_sira = @sth_evrakno_sira",
            param:  ['sth_evrakno_seri','sth_evrakno_sira'],
            type:   ['string','int'],
            value:  [pSeri,pSira]
           
        }

        db.GetDataQuery(TmpQuery,function(data)
        {
            localStorage.mode = 'false';
            pCallback(data[0].EvrakSira);
        });
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
        
        db.GetData($scope.Firma,'CariGetir',[Kodu,Adi,UserParam.Sistem.PlasiyerKodu],function(data)
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
    $scope.BtnSiparisKabulListele = async function()
    {
        $scope.Loading = true;
        $scope.TblLoading = false;

        let TmpParam = [$scope.SipTarih1,$scope.SipTarih2,$scope.DepoNo,1,UserParam.Sistem.PlasiyerKodu,UserParam.Sistem.SiparisOnayListele,$scope.CariKodu];
     
        await db.GetPromiseTag($scope.Firma,"SiparisKabulListele",TmpParam,function(data)
        {
            $scope.SiparisKabulListe = data;
            if($scope.SiparisKabulListe.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblSiparisKabulListe").jsGrid({data : $scope.SiparisKabulListe});
            }
            else
            {
                $("#TblSiparisKabulListe").jsGrid({data : $scope.SiparisKabulListe});
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
    $scope.BtnStokBarkodGetir = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            BarkodGetir($scope.Barkod);    
        }
    }
    $scope.BtnSiparisKabulSec = function()
    {
        $scope.CariKodu = $scope.SiparisKabulListe[$scope.SiparisKabulListeSelectedIndex].CARIKOD;

        let Kodu =  '';
        let Adi = '';
        
        db.GetData($scope.Firma,'CariGetir',[Kodu,Adi,UserParam.Sistem.PlasiyerKodu],function(data)
        {
            $scope.CariListe = data;
            $("#TblCari").jsGrid({data : $scope.CariListe});

            let Obj = $("#TblCari").data("JSGrid");
            let Item = Obj.rowByItem(data[0]);
            
            $scope.CariListeRowClick(0,Item,Obj);

            $scope.BarkodGirisClick();
        });

        db.DepoGetir($scope.Firma,EvrakParam.DepoListe,function(data)
        {
            $scope.DepoListe = data; 
            $scope.DepoNo = EvrakParam.DepoNo;
            $scope.DepoListe.forEach(function(item) 
            {
                if(item.KODU == $scope.DepoNo)
                    $scope.DepoAdi = item.ADI;
            });     
        });


        db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(data){$scope.SorumlulukListe = data;$scope.Sorumluluk = $scope.SiparisKabulListe[$scope.SiparisKabulListeSelectedIndex].SORUMLULUK.toString();});
        db.FillCmbDocInfo($scope.Firma,'CmbPersonelGetir',function(data){$scope.PersonelListe = data;$scope.Personel = $scope.SiparisKabulListe[$scope.SiparisKabulListeSelectedIndex].PERSONEL.toString();});    
        db.FillCmbDocInfo($scope.Firma,'CmbProjeGetir',function(data){$scope.ProjeListe = data;$scope.ProjeKodu = $scope.SiparisKabulListe[$scope.SiparisKabulListeSelectedIndex].PROJE.toString();});
        db.FillCmbDocInfo($scope.Firma,'CmbOdemePlanGetir',function(data){$scope.OdemePlanListe = data; $scope.OdemeNo = $scope.SiparisKabulListe[$scope.SiparisKabulListeSelectedIndex].ODEMENO.toString();});
    }
    $scope.BtnStokGridGetir = function()
    {   
        $scope.Loading = true;
        $scope.TblLoading = false;
        let Seri = "";
        let Sira = 0;
        let Cari = "";
        console.log($scope.SiparisKabulListe)
        if($scope.SiparisKabulListe.length > 0)
        {
            
            Seri = $scope.SiparisKabulListe[$scope.SiparisKabulListeSelectedIndex].SERI;
            Sira =  $scope.SiparisKabulListe[$scope.SiparisKabulListeSelectedIndex].SIRA;
            Cari = $scope.SiparisKabulListe[$scope.SiparisKabulListeSelectedIndex].CARIKOD;
        }
        else
        {
            $scope.Loading = true;
            
            Cari = $scope.CariKodu;
        } 

        db.GetData($scope.Firma,'SiparisListeGetir',[$scope.DepoNo,Cari,Seri,Sira,1],function(StokData)
        {
            $scope.StokListe = StokData;
            console.log($scope.StokListe)
            if($scope.StokListe.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblSiparisListe").jsGrid({data : $scope.StokListe});
            }
            else
            {               
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#MdlStokGetir").modal('hide');
                alertify.alert("Sipariş içeriği boş")                
            }
            
        });
    }
    $scope.BtnStokGridSec = function()
    {
        $("#MdlStokGetir").modal('hide');
        BarkodGetir($scope.Barkod);
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
        if($scope.RenkListe != "")
        {
            $scope.Stok[0].RENK = $.grep($scope.RenkListe, function (Item) 
            {   
                return Item.PNTR == $scope.Stok[0].RENKPNTR;
            })[0].KIRILIM;
        }
        else
        {
            $scope.Stok[0].RENKPNTR = "1";
        }
        if($scope.BedenListe != "")
        {   
            $scope.Stok[0].BEDEN = $.grep($scope.BedenListe, function (Item) 
            {
                return Item.PNTR == $scope.Stok[0].BEDENPNTR;
            })[0].KIRILIM;
        }
        else
        {
            $scope.Stok[0].BEDENPNTR = "1";
        }

        $('#MdlRenkBeden').modal('hide');

        PartiLotEkran();
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
    $scope.BtnDuzenle = function()
    {
        $scope.MiktarEdit = $scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_miktar;
        $scope.FiyatEdit = $scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_tutar / $scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_miktar;

        $("#MdlDuzenle").modal('show');
    }
    $scope.BtnDuzenleKaydet = function(pIndex)
    {   
        let TmpTutar = $scope.FiyatEdit * $scope.MiktarEdit;
        let TmpYuzde1 = $scope.StokHarListe[pIndex].sth_iskonto1 / $scope.StokHarListe[pIndex].sth_tutar; 
        let TmpYuzde2 = $scope.StokHarListe[pIndex].sth_iskonto2 / ($scope.StokHarListe[pIndex].sth_tutar - $scope.StokHarListe[pIndex].sth_iskonto1); 
        let TmpYuzde3 = $scope.StokHarListe[pIndex].sth_iskonto3 / ($scope.StokHarListe[pIndex].sth_tutar - ($scope.StokHarListe[pIndex].sth_iskonto1 + $scope.StokHarListe[pIndex].sth_iskonto2));
        let TmpYuzde4 = $scope.StokHarListe[pIndex].sth_iskonto4 / ($scope.StokHarListe[pIndex].sth_tutar - ($scope.StokHarListe[pIndex].sth_iskonto1 + $scope.StokHarListe[pIndex].sth_iskonto2 + $scope.StokHarListe[pIndex].sth_iskonto3));
        let TmpYuzde5 = $scope.StokHarListe[pIndex].sth_iskonto5 / ($scope.StokHarListe[pIndex].sth_tutar - ($scope.StokHarListe[pIndex].sth_iskonto1 + $scope.StokHarListe[pIndex].sth_iskonto2 + $scope.StokHarListe[pIndex].sth_iskonto3 + $scope.StokHarListe[pIndex].sth_iskonto4));

        $scope.StokHarListe[pIndex].sth_iskonto1 = TmpTutar * TmpYuzde1;
        $scope.StokHarListe[pIndex].sth_iskonto2 = (TmpTutar - $scope.StokHarListe[pIndex].sth_iskonto1) * TmpYuzde2;
        $scope.StokHarListe[pIndex].sth_iskonto3 = (TmpTutar - ($scope.StokHarListe[pIndex].sth_iskonto1 + $scope.StokHarListe[pIndex].sth_iskonto2)) * TmpYuzde3;
        $scope.StokHarListe[pIndex].sth_iskonto4 = (TmpTutar- ($scope.StokHarListe[pIndex].sth_iskonto1 + $scope.StokHarListe[pIndex].sth_iskonto2 + $scope.StokHarListe[pIndex].sth_iskonto3)) * TmpYuzde4;
        $scope.StokHarListe[pIndex].sth_iskonto5 = (TmpTutar - ($scope.StokHarListe[pIndex].sth_iskonto1 + $scope.StokHarListe[pIndex].sth_iskonto2 + $scope.StokHarListe[pIndex].sth_iskonto3 + $scope.StokHarListe[pIndex].sth_iskonto4)) * TmpYuzde5;

        $scope.Update(pIndex);
        angular.element('#MdlDuzenle').modal('hide');
    }
    $scope.DepoChange = function()
    {
        $scope.DepoListe.forEach(function(item) 
        {
            if(item.KODU == $scope.DepoNo)
                $scope.DepoAdi = item.ADI;
        });
    }
    $scope.EvrakGetir = function ()
    {
        if($scope.CmbEvrakTip == 0)
        {
            db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.StokEvrakTip],function(data)
            {
                if(data.length > 0)
                {
                    Init();
                    InitCariGrid();
                    InitIslemGrid(); 
    
                    $scope.Seri = data[0].sth_evrakno_seri;
                    $scope.Sira = data[0].sth_evrakno_sira;
                    $scope.StokEvrakTip = data[0].sth_evraktip.toString();
                    $scope.CariKodu = data[0].sth_cari_kodu;
                    $scope.CariAdi = data[0].CARIADI;
                    $scope.BelgeNo = data[0].sth_belge_no;
                    $scope.Tarih = new Date(data[0].sth_tarih).toLocaleDateString();
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
    
                  //  db.GetData($scope.Firma,'SipBedenHarGetir',[$scope.Seri,$scope.Sira,$scope.StokEvrakTip],function(BedenData)
                   // {
                    //    $scope.BedenHarListe = BedenData;
                    //});
                    
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
                    db.DepoGetir($scope.Firma,EvrakParam.DepoListe,function(e)
                    {
                        $scope.DepoListe = e; 
                        $scope.DepoNo = data[0].sth_giris_depo_no.toString();
                        $scope.DepoListe.forEach(function(item) 
                        {
                            if(item.KODU == $scope.DepoNo)
                                $scope.DepoAdi = item.ADI;
                        });     
                    });
                    db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(e){$scope.SorumlulukListe = e; $scope.Sorumluluk = data[0].sth_stok_srm_merkezi});
                    db.FillCmbDocInfo($scope.Firma,'CmbPersonelGetir',function(e){$scope.PersonelListe = e; $scope.Personel = data[0].sth_plasiyer_kodu});
                    db.FillCmbDocInfo($scope.Firma,'CmbProjeGetir',function(e){$scope.ProjeListe = e; $scope.Proje = data[0].sth_proje_kodu});
                    db.FillCmbDocInfo($scope.Firma,'CmbOdemePlanGetir',function(e){$scope.OdemePlanListe = e; $scope.OdemeNo = data[0].sth_odeme_op.toString()});
                    
                    $scope.StokHarListe = data;
                    $("#TblIslem").jsGrid({data : $scope.StokHarListe});  
    
                    DipToplamHesapla();
                    ToplamMiktarHesapla();  
    
                    $scope.EvrakLock = true;
                    $scope.BarkodLock = false;
    
                    angular.element('#MdlEvrakGetir').modal('hide');
    
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
    }
    $scope.EvrakDelete = function()
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Bu Belgeyi Silmek İstediğinize Eminmisiniz ?', 
        function()
        { 
            if($scope.CmbEvrakTip == 0)
            {
                if($scope.StokHarListe.length > 0)
                {
                    if(EvrakParam.EvrakSil == 0)
                    {
                        db.ExecuteTag($scope.Firma,'StokHarEvrDelete',[$scope.Seri,$scope.Sira,$scope.StokEvrakTip],function(data)
                        {
                            if(typeof(data.result.err) == 'undefined')
                            {
                                angular.forEach($scope.StokHarListe,function(value)
                                {
                                    if(value.sth_Guid != 0)
                                    {
                                        let SipMiktar = value.sth_miktar * -1;
                                        db.ExecuteTag($scope.Firma,'StokHarSiparisUpdate',[SipMiktar,value.sth_Guid]);
                                    }
                                    db.ExecuteTag($scope.Firma,'BedenHarDelete',[value.sth_Guid,9],function(data)
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
                            $scope.YeniEvrak();
                        });
                    }
                    else
                    {
                        alertify.okBtn("Tamam");
                        alertify.alert("Belge Silme Yektiniz Yok !");
                    }
                }
                else
                {
                    alertify.okBtn("Tamam");
                    alertify.alert("Silinecek Belge Yok !");
                }
            }
        }
        ,function(){});
    }
    $scope.EvrakTipChange =async function()
    {
        if($scope.CmbEvrakTip == 0)
        {
            $scope.CariTip = 0;
            $scope.CariCins = 0;        
            $scope.CariNormalIade = 0;
            $scope.CariEvrakTip = 0;

            $scope.StokEvrakTip = 13;
            $scope.StokNormalIade = 0;
            $scope.StokTip = 0;
            $scope.StokCins = 0;

            EvrakParam = UserParam.AlisIrsaliye;
            ParamName = 'AlisIrsaliye'  
        }
        if($scope.CmbEvrakTip == 1)
        { 
            $scope.ChaEvrakTip = 0;
            $scope.ChaTip = 1;
            $scope.ChaCins = 6;
            $scope.ChaNormalIade = 0;

            $scope.CariEvrakTip = 0;
            $scope.CariTip = 1;
            $scope.CariCins = 6;
            $scope.CariNormalIade = 0;

            $scope.StokEvrakTip = 3;
            $scope.StokNormalIade = 0;
            $scope.StokTip = 0;
            $scope.StokCins = 0;

            $scope.FaturaListe = [];
            $scope.CariHarListe = [];

            EvrakParam = UserParam.AlisFatura;
            ParamName = 'AlisFatura'  
        }          
        $scope.Seri = EvrakParam.Seri;
        $scope.Sira = EvrakParam.Sira;
        $scope.BelgeNo = EvrakParam.BelgeNo;
        $scope.CariKodu = EvrakParam.Cari;

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

        db.DepoGetir($scope.Firma,EvrakParam.DepoListe,function(data)
        {
            $scope.DepoListe = data; 
            $scope.DepoNo = EvrakParam.DepoNo;
            $scope.DepoListe.forEach(function(item) 
            {
                if(item.KODU == $scope.DepoNo)
                    $scope.DepoAdi = item.ADI;
            });     
        });
        db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(data){$scope.SorumlulukListe = data;$scope.Sorumluluk = EvrakParam.Sorumluluk});
        db.FillCmbDocInfo($scope.Firma,'CmbPersonelGetir',function(data){$scope.PersonelListe = data;$scope.Personel = EvrakParam.Personel});    
        db.FillCmbDocInfo($scope.Firma,'CmbProjeGetir',function(data){$scope.ProjeListe = data;$scope.ProjeKodu = ''});
        db.FillCmbDocInfo($scope.Firma,'CmbOdemePlanGetir',function(data){$scope.OdemePlanListe = data; $scope.OdemeNo = '0'});

        if($scope.CmbEvrakTip == 0)
        {
            await db.MaxSira($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.StokEvrakTip],function(data){$scope.Sira = data});
        }
       
       if($scope.CmbEvrakTip == 1)
       {
            await db.MaxSira($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.StokEvrakTip],function(data){$scope.Sira = data});
       }     
    }
    $scope.YeniEvrak = function ()
    {
        Init();
        InitCariGrid();
        InitIslemGrid();
        InitSiparisListeGrid();
        InitPartiLotGrid();
        InitSiparisKabulListeGrid();

        $scope.EvrakLock = false;
        $scope.CmbEvrakTip = UserParam.Sistem.MalKabulEvrakTip;        
        $scope.EvrakTipChange();
        
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
    }
    $scope.Insert = function()
    { 
        $scope.InsertLock = true

        if(typeof($scope.Stok[0].RECNO) != 'undefined')
        {
            if(($scope.Miktar *  $scope.Stok[0].CARPAN) > ($scope.Stok[0].SIPMIKTAR - $scope.Stok[0].TESLIMMIKTAR))
            {
                alertify.okBtn("Tamam");
                alertify.alert("Girdiğiniz Miktar Sipariş Miktarından Büyük !");
                $scope.InsertLock = false;
                return;
            }
        }

        if($scope.CmbEvrakTip == 0)
        {
            IrsInsert();
        }
        else if($scope.CmbEvrakTip == 1)
        {
            if(typeof($scope.Stok[0].KODU) != 'undefined')
            {   
                $scope.InsertLock = true
    
                if(UserParam.Sistem.SatirBirlestir == 0 || $scope.Stok[0].RENKPNTR != 0 || $scope.Stok[0].BEDENPNTR != 0 || $scope.Stok[0].DETAYTAKIP == 1 || $scope.Stok[0].DETAYTAKIP == 2)
                {   
                    if($scope.CariHarListe.length > 0)
                    {   
                        CariHarUpdate(function(data)
                        {   
                            StokHarInsert();
                            $scope.InsertLock = false;
                        });
                    }
                    else
                    {   
                        CariHarInsert();
                    }
                }
                else
                {
                    
                }
            }
            else
            {
                console.log("Barkod Okutunuz!");
                alertify.alert("Barkod Bulunamadı.");
                $scope.InsertLock = false
            }     
            BarkodFocus();
        }
        
    }
    $scope.SatirDelete = function()
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Seçilen Satırı Silmek İstediğinize Eminmisiniz ?', 
        function()
        { 
            if($scope.CmbEvrakTip == 0)
            {
                if($scope.IslemListeSelectedIndex > -1)
                {
                    if(EvrakParam.EvrakSil == 0)
                    {
                        db.ExecuteTag($scope.Firma,'StokHarSatirDelete',[$scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_Guid],function(data)
                        {
                            if($scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_Guid != 0)
                            {
                                let SipMiktar = $scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_miktar * -1;
                                db.ExecuteTag($scope.Firma,'StokHarSiparisUpdate',[SipMiktar,$scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_Guid]);
                            }

                            if(typeof(data.result.err) == 'undefined')
                            {
                                db.ExecuteTag($scope.Firma,'BedenHarDelete',[$scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_Guid,9],function(data)
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
                            
                            if($scope.StokHarListe.length <= 1)
                            {
                                $scope.YeniEvrak();
                            }
                            else
                            {   
                                db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.StokEvrakTip],function(data)
                                {
                                    db.GetData($scope.Firma,'BedenHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(BedenData)
                                    {
                                        $scope.BedenHarListe = BedenData;
                                    });
    
                                    $scope.StokHarListe = data;
                                    $("#TblIslem").jsGrid({data : $scope.StokHarListe});    
                                    $scope.BtnTemizle();
                                });
                            }
                            ToplamMiktarHesapla();  
                        });
                    }
                    else
                    {
                        alertify.okBtn("Tamam");
                        alertify.alert("Silinecek Belge Yok !");
                    }
                }
                else
                {
                    alertify.okBtn("Tamam");
                    alertify.alert("Satır Seçmeden Silemezsiniz!");
                }
            }
        },
        function(){});
    }
    $scope.SiparisSecimi = function() 
    {
        if($scope.StokHarListe.length == 0)
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
    $scope.MiktarFiyatValid = function()
    {
        if(typeof($scope.Stok[0].RECNO) != 'undefined')
        {
            $scope.Stok[0].INDIRIM = (($scope.Stok[0].ISKONTO_1+$scope.Stok[0].ISKONTO_2+$scope.Stok[0].ISKONTO_3+$scope.Stok[0].ISKONTO_4+$scope.Stok[0].ISKONTO_5+$scope.Stok[0].ISKONTO_6) 
            / $scope.Stok[0].SIPMIKTAR) * ($scope.Stok[0].CARPAN * $scope.Miktar);
        }
        else
        {
            if(typeof($scope.Stok[0].SATSART) != 'undefined')
            {
                $scope.Stok[0].INDIRIM = $scope.Stok[0].SATSART.ISKONTOM1 * ($scope.Stok[0].CARPAN * $scope.Miktar);
            }
            else
            {
                $scope.Stok[0].INDIRIM = 0;
            }
        }
                                
        $scope.Stok[0].TUTAR = ($scope.Stok[0].CARPAN * $scope.Miktar) * $scope.Stok[0].FIYAT;
        $scope.Stok[0].KDV = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].TOPTANVERGI / 100);
        $scope.Stok[0].TOPTUTAR = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) + $scope.Stok[0].KDV;
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
    $scope.SiparisKabulListeRowClick = function(pIndex,pItem,pObj)
    {   
        if ( SiparisKabulListeSelectedRow ) { SiparisKabulListeSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        SiparisKabulListeSelectedRow = $row;
        $scope.SiparisKabulListeSelectedIndex = pIndex;
    }
    $scope.CariListeRowClick = function(pIndex,pItem,pObj)
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
    $scope.BtnBarkodGetirClick = function()
    {
        StokBarkodGetir($scope.Barkod);
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
                $scope.StokHarListe[pIndex].sth_vergi_pntr,
                $scope.StokHarListe[pIndex].sth_iskonto1, //ISKONTO TUTAR 1
                $scope.StokHarListe[pIndex].sth_iskonto2, //ISKONTO TUTAR 2
                $scope.StokHarListe[pIndex].sth_iskonto3, //ISKONTO TUTAR 3
                $scope.StokHarListe[pIndex].sth_iskonto4, //ISKONTO TUTAR 4
                $scope.StokHarListe[pIndex].sth_iskonto5, //ISKONTO TUTAR 5
                0, //ISKONTO TUTAR 6
                $scope.StokHarListe[pIndex].sth_sat_iskmas1, //SATIR ISKONTO 1
                $scope.StokHarListe[pIndex].sth_sat_iskmas2, //SATIR ISKONTO 2
                $scope.StokHarListe[pIndex].sth_sat_iskmas3, //SATIR ISKONTO 3
                $scope.StokHarListe[pIndex].sth_sat_iskmas4, //SATIR ISKONTO 4
                $scope.StokHarListe[pIndex].sth_sat_iskmas5, //SATIR ISKONTO 5
                0, // SATIR ISKONTO 6
                $scope.StokHarListe[pIndex].sth_Guid,
            ],
            BedenPntr : $scope.StokHarListe[pIndex].BEDENPNTR,
            RenkPntr : $scope.StokHarListe[pIndex].RENKPNTR,
            Miktar : $scope.MiktarEdit,
            Guid : $scope.StokHarListe[pIndex].sth_Guid
        };
        UpdateDataIrs(Data);   
    }
    $scope.MainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TbSiparisSecimi").removeClass('active');
    }
    $scope.CariSecClick = function() 
    {
        if($scope.StokHarListe.length == 0)
        {
            $("#TbCariSec").addClass('active');
            $("#TbMain").removeClass('active');

            db.DepoGetir($scope.Firma,EvrakParam.DepoListe,function(data)
            {
                $scope.DepoListe = data; 
                $scope.DepoListe.forEach(function(item) 
                {
                    if(item.KODU == $scope.DepoNo)
                        $scope.DepoAdi = item.ADI;
                });     
            });
        }        
        else
        {
            alertify.okBtn("Tamam");
            alertify.alert("Kayıtlı Evrak Olmadan Bu Menüye Giremezsiniz!");
        }
    }
    $scope.BelgeBilgisiClick = function() 
    {
        $("#TbBelgeBilgisi").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbSiparisSecimi").removeClass('active');
    }
    $scope.BarkodGirisClick = function() 
    {
        if($scope.CariKodu != "")
        {
            $("#TbBarkodGiris").addClass('active');
            $("#TbMain").removeClass('active');
            $("#TbCariSec").removeClass('active');
            $("#TbBelgeBilgisi").removeClass('active');
            $("#TbIslemSatirlari").removeClass('active');
            $("#TbSiparisSecimi").removeClass('active');
            
            BarkodFocus();
        }
        else
        {
            alertify.okBtn("Tamam");
            alertify.alert("Lütfen Cari Seçiniz !");
        }
    }
    $scope.TbIslemSatirlariClick = function() 
    {
        $("#TbIslemSatirlari").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbSiparisSecimi").removeClass('active');
    }
    $scope.EvrakGonder = async function()
    {
        if(localStorage.mode == 'false')
        {
            await db.ConnectionPromise(function(Status)
            {
                if(!Status)
                {
                    alertify.okBtn("Tamam");
                    alertify.alert("Bağlantı Problemi !");
                    return;
                }
            });

            AktarimSiraGetir($scope.StokHarListe[0].sth_evrakno_seri,$scope.StokHarListe[0].sth_evrakno_sira, async function(EvrakSira)
            {
                alertify.okBtn("Tamam");
                alertify.alert("Sayım fişi aktarımı başladı.");
                console.log()
                for(i = 0;i < $scope.StokHarListe.length;i++)
                {
                    localStorage.mode = 'true';

                    var InsertData = 
                    [
                        1,
                        1,
                        0, //FİRMA NO
                        0, //ŞUBE NO
                        $scope.Tarih,
                        $scope.StokHarListe[i].sth_tip,
                        $scope.StokHarListe[i].sth_cins,
                        $scope.StokHarListe[i].sth_normal_iade,
                        $scope.StokHarListe[i].sth_evraktip,
                        $scope.StokHarListe[i].sth_evrakno_seri,
                        EvrakSira,
                        $scope.StokHarListe[i].sth_belge_no,
                        $scope.Tarih,
                        $scope.StokHarListe[i].sth_stok_kod,
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
                        $scope.StokHarListe[i].sth_cari_kodu,
                        $scope.StokHarListe[i].sth_plasiyer_kodu,
                        0, //HARDOVİZCİNSİ
                        0, //HARDOVİZKURU
                        0, //ALTDOVİZKURU
                        0, //STOKDOVİZCİNSİ
                        0, //STOKDOVİZKURU
                        $scope.StokHarListe[i].sth_miktar,
                        $scope.StokHarListe[i].sth_miktar2,
                        $scope.StokHarListe[i].sth_birim_pntr,
                        $scope.StokHarListe[i].sth_tutar,
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
                        $scope.StokHarListe[i].sth_vergi_pntr, //VERİPNTR
                        $scope.StokHarListe[i].sth_vergi,             //VERGİ
                        0, // MASRAFVERGİPNTR,
                        0, // MASRAFVERGİ
                        $scope.StokHarListe[i].sth_odeme_op,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                        '',//AÇIKLAMA
                        $scope.StokHarListe[i].sth_sip_uid, //sth_sip_uid
                        '00000000-0000-0000-0000-000000000000', //sth_fat_uid,
                        $scope.StokHarListe[i].sth_giris_depo_no, //GİRİSDEPONO
                        $scope.StokHarListe[i].sth_cikis_depo_no,             //CİKİSDEPONO
                        $scope.Tarih, //MALKABULSEVKTARİHİ
                        '', // CARİSORUMLULUKMERKEZİ
                        $scope.StokHarListe[i].sth_stok_srm_merkezi,
                        0,  // VERGİSİZFL
                        $scope.StokHarListe[i].sth_parti_kodu,
                        $scope.StokHarListe[i].sth_lot_no,
                        0,  // LOT
                        $scope.StokHarListe[i].sth_proje_kodu,
                        '', // EXİMKODU
                        0,  // DİSTİCARETTURU
                        0,  // OTVVERGİSİZFL
                        0,  // OİVVERGİSİZ
                        $scope.StokHarListe[i].sth_fiyat_liste_no,
                       0   //NAKLİYEDEPO
                    ];
                    
                    await db.ExecutePromiseTag($scope.Firma,'StokHarInsert',InsertData,function(InsertResult)
                    {    
                        if(typeof(InsertResult.result.err) == 'undefined')
                        {
                            db.ExecuteTag($scope.Firma,'StokHarSiparisUpdate',[$scope.StokHarListe[i].sth_miktar,$scope.StokHarListe[i].sth_sip_uid])
                        }
                        localStorage.mode = 'false';
                    });    
                };

                alertify.alert("Sayım fişi aktarımı tamamlandı.");
            });
        }
        else
        {
            alertify.okBtn("Tamam");
            alertify.alert("Bu menü sadece offline mod'da çalışır !");
        }
    }
    $scope.ScanBarkod = function()
    {
        cordova.plugins.barcodeScanner.scan(
            function (result) 
            {
                $scope.Barkod = result.text;
                BarkodGetir($scope.Barkod);
            },
            function (error) 
            {
                alert("Scanning failed: " + error);
            },
            {
              prompt : "Barkod Okutunuz",
              orientation : "portrait"
            }
        );
    }
}