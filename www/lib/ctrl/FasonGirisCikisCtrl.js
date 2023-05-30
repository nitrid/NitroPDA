function FasonGirisCikisCtrl($scope,$window,$timeout,db)
{   
    let IsEmriSelectedRow = null;
    let CariSelectedRow = null;
    let IslemSelectedRow = null;
    let StokSelectedRow = null;
    let PartiLotSelectedRow = null;
    let ParamName = "";

    $('#MdlRenkBeden').on('hide.bs.modal', function () 
    {   
        if($scope.Stok[0].RENK == '' ||  $scope.Stok[0].BEDEN == '')
        {
            $scope.BtnTemizle();
        }
    });
    function Init()
    {
        UserParam = Param[$window.sessionStorage.getItem('User')];
        $scope.Firma = $window.sessionStorage.getItem('Firma');

        $scope.Seri = "";
        $scope.Sira = 0;
        $scope.BelgeNo = "";
        $scope.CariKodu = "";
        $scope.CariAdi = "";
        $scope.CariFiyatListe = 0;
        $scope.CariDovizCinsi = 0;
        $scope.CariDovizKuru = 0;
        $scope.Depo;
        $scope.DepoAdi;
        $scope.Sorumluluk = "";
        $scope.SorumlulukAdi = "";
        $scope.Personel = "";
        $scope.PersonelAdi = "";
        $scope.Barkod = "";
        $scope.ToplamSatir = 0;
        $scope.IsEmriKodu = "";
        $scope.IsEmriAdi = "";
        $scope.IsMerkezi;
        $scope.IsMerkeziAdi; 
        $scope.Proje = "";
        $scope.Tip = 0;
        $scope.Cins = 7;
        $scope.NormalIade = 0;
        $scope.EvrakTip = 12;
        $scope.BelgeTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.Tarih2 = moment(new Date()).format("DDMMYYYY");
        $scope.Tarih2Ters = moment(new Date()).format("YYYYMMDD");
        $scope.SubeNo = UserParam.Sistem.SubeNo;
        $scope.SatirNo = "";
        $scope.CmbEvrakTip = "0";
        $scope.GirisCikis = 0;
        $scope.CariBakiye = "";
        $scope.CariVDADI = "";
        $scope.CariVDNO = "";

        $scope.TxtDaraliAgr = "";
        $scope.TxtSafiAgr = "";
        $scope.TxtEn = "";
        $scope.TxtBoy = "";
        $scope.TxtYukseklik = "";
        $scope.TxtOzgulAgr = "";

        $scope.DepoListe = [];
        $scope.CariListe = [];
        $scope.IsEmriListe = [];
        $scope.IsMerkeziListe = [];
        $scope.PersonelListe = [];
        $scope.StokListe = [];
        $scope.BirimListe = [];
        $scope.StokHarListe = [];
        $scope.ProjeListe = [];
        $scope.PartiLotListe = [];
        $scope.BedenHarListe = [];
        $scope.IsEmriStokData = [];

        $scope.Stok = [];
        $scope.Miktar = 1;
        $scope.ToplamMiktar = 0;
        $scope.Miktar2 = 0;
        
        $scope.StokGridTip = "0";
        $scope.StokGridText = "";
        $scope.CmbIsEmriAra = "0";
        $scope.TxtIsEmriAra = ""; 
        $scope.CmbCariAra = "0";
        $scope.TxtCariAra = "";

        $scope.OtoEkle = false;
        $scope.EvrakLock = false;
        $scope.BarkodLock = false;

        $scope.TblStokShow = false;
        $scope.TblStok2Show = true;
        
        $scope.MiktarEdit = 0;
    }
    function InitEmirGrid()
    {
        $("#TblEmir").jsGrid({
            responsive: true,
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.IsEmriListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [{
                
                name: "KODU",
                title: "KODU",
                type: "number",
                align: "center",
                width: 75
            }, 
            {
                name: "ADI",
                title: "ADI",
                type: "text",
                align: "center",
                width: 75
            },
            {
                name: "TARIH",
                title: "TARIH",
                type: "text",
                align: "center",
                width: 75
            }
           ],
            rowClick: function(args)
            {
                $scope.IsEmriListeRowClick(args.itemIndex,args.item,this);
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
            data : $scope.StokHarListe,
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
                title: "MIKTAR",
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
            pageSize: 10,
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
                } 
            ],
            rowClick: function(args)
            {
                $scope.StokListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitStokReceteGrid()
    {
        $("#TblStok2").jsGrid
        (   {
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.StokListe,
            paging : true,
            pageSize: 10,
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
                    name: "MIKTAR",
                    title: "MIKTAR",
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
            pageSize: 10,
            paging : true,
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
                    name: "SKTTARIH",
                    title: "SKT TARİHİ",
                    type: "text",
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
    function BarkodFocus()
    {
        $timeout( function(){$window.document.getElementById("Barkod").focus();},100);  
    }
    function Confirmation()
    {
        navigator.vibrate([100,100,200,100,300]);
    }
    function Delay(time) 
    {
        return new Promise(resolve => setTimeout(resolve, time));
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
            db.StokBarkodGetir($scope.Firma,pBarkod,$scope.Depo,async function(BarkodData)
            {    
                $scope.Stok = BarkodData;
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
                                return;
                            }
                        }
                    }
                }
                console.log($scope.Stok)
                if(UserParam[ParamName].ReceteKontrol == 1)
                {
                    db.GetPromiseTag($scope.Firma,'IsEmriStokGetir',[$scope.IsEmriKodu,$scope.GirisCikis,pBarkod,''],function(StokData)
                    {
                        console.log(StokData)
                        $scope.IsEmriStokData = StokData;
                        if($scope.IsEmriStokData.length == 0)
                        {
                            alertify.alert("Stok Bulunamadı");
                            return;
                        }
                    });
                }
                await Delay(100);
                if(BarkodData.length > 0)
                {
                    $scope.Stok = BarkodData
                    $scope.Stok[0].Satir = 0;
                    $scope.Stok[0].Miktar = 0;
                    $scope.Stok[0].TOPMIKTAR = 1;
                    if($scope.IsEmriStokData.length > 0)
                    {
                        $scope.Stok[0].UPLGUID = $scope.IsEmriStokData[0].GUID;
                        $scope.Stok[0].ISEMRI = $scope.IsEmriStokData[0].ISEMRI;
                        $scope.Stok[0].KALAN = $scope.IsEmriStokData[0].KALAN;
                        $scope.Stok[0].ISHGUID = $scope.IsEmriStokData[0].ISHGUID;
                    }
                    else
                    {
                        $scope.Stok[0].UPLGUID = "00000000-0000-0000-0000-000000000000";
                        $scope.Stok[0].ISEMRI = $scope.IsEmriKodu;
                        $scope.Stok[0].KALAN = $scope.Stok[0].DEPOMIKTAR;
                        $scope.Stok[0].ISHGUID = "00000000-0000-0000-0000-000000000000";
                    }
                    
                    $scope.BarkodLock = true;

                    await db.GetPromiseTag($scope.Firma,'CmbBirimGetir',[$scope.Stok[0].KODU],function(data)
                    {
                        $scope.BirimListe = data; 
                        $scope.Birim = JSON.stringify($scope.Stok[0].BIRIMPNTR);

                        if($scope.BirimListe.length > 0)
                        {
                            console.log($scope.BirimListe)
                            $scope.Stok[0].BIRIMPNTR = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].BIRIMPNTR;  
                            $scope.Stok[0].BIRIM = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].BIRIM;
                            $scope.Stok[0].CARPAN = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].KATSAYI;
                        }
                        else
                        { //BİRİMSİZ ÜRÜNLERDE BİRİMİ ADETMİŞ GİBİ DAVRANIYOR. RECEP KARACA 23.09.2019
                            console.log(2)
                            $scope.Stok[0].BIRIMPNTR = 1;
                            $scope.Stok[0].BIRIM = 'ADET';
                            $scope.Stok[0].CARPAN = 1;
                        }
                    });

                    if($scope.Stok[0].BEDENPNTR == 0 || $scope.Stok[0].RENKPNTR == 0)
                    {   
                        if($scope.Stok[0].BEDENKODU != '' || $scope.Stok[0].RENKKODU != '')
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
                        console.log($scope.Stok[0])
                        if($scope.Stok[0].PARTI != '')
                        {
                            db.GetData($scope.Firma,'PartiLotGetir',[$scope.Stok[0].KODU,$scope.DepoNo,$scope.Stok[0].PARTI,$scope.Stok[0].LOT],function(data)
                            {
                                $scope.PartiLotListe = data;
                                console.log(data)
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
    function InsertData()
    {   
        var InsertData = 
        [
            UserParam.MikroId,
            UserParam.MikroId,
            0, //FİRMA NO
            $scope.SubeNo , //ŞUBE NO
            $scope.BelgeTarih,
            $scope.Tip,
            $scope.Cins,
            $scope.NormalIade,
            $scope.EvrakTip,
            $scope.Seri,
            $scope.Sira,
            $scope.BelgeNo,
            $scope.BelgeTarih,
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
            $scope.IsEmriKodu,
            $scope.Personel,
            $scope.CariDovizCinsi, //HARDOVİZCİNSİ
            $scope.CariDovizKuru, //HARDOVİZKURU
            $scope.CariAltDovizKuru, //ALTDOVİZKURU
            0, //STOKDOVİZCİNSİ
            0, //STOKDOVİZKURU
            $scope.Miktar * $scope.Stok[0].CARPAN,
            $scope.Miktar2,
            $scope.Stok[0].BIRIMPNTR,
            0, // TUTAR
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
            0, // VERİPNTR
            0, // VERGİ
            0, // MASRAFVERGİPNTR
            0, // MASRAFVERGİ
            0, // ODEMEOP                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
            '', //AÇIKLAMA
            '00000000-0000-0000-0000-000000000000', //sth_sip_uid
            '00000000-0000-0000-0000-000000000000', //sth_fat_uid,
            $scope.Depo,
            $scope.Depo,
            $scope.BelgeTarih, // MALKABULTARİH
            $scope.Sorumluluk, // CARİSORUMLULUKMERKEZİ
            $scope.Sorumluluk, // STOKSORUMLULUKMERKEZİ
            0,  // VERGİSİZFL
            0,  // ADRESNO
            $scope.Stok[0].PARTI,
            $scope.Stok[0].LOT,
            '', // PROJE
            '', // EXİMKODU
            0,  // DİSTİCARETTURU
            0,  // OTVVERGİSİZFL
            0,  // OİVVERGİSİZ
            $scope.CariFiyatListe,
            0,  //NAKLİYEDEPO
            0   //NAKLİYEDURUMU
        ];
        db.ExecuteTag($scope.Firma,'StokHarInsert',InsertData,function(InsertResult)
        {
            if(typeof(InsertResult.result.err) == 'undefined')
            {
                if($scope.GirisCikis == 1)
                {
                    if($scope.Stok[0].ISHGUID == '00000000-0000-0000-0000-000000000000')
                    {
                        var InsertData = 
                        [
                            $scope.Stok[0].KODU,
                            0,
                            $scope.IsEmriKodu,
                            $scope.Miktar * $scope.Stok[0].CARPAN, //SEVKMIKTAR
                            0, //IADEMIKTAR
                            0, //TUKETMIKTAR
                            0, //URETMIKTAR
                            0, //URETIADEMIKTAR
                            0, //PLANSEVKMIKTAR
                            0  //PLANURETIM
                        ];
                        db.ExecuteTag($scope.Firma,'IsEmriHarInsert',InsertData,function(InsertResult)
                        {
                            console.log(InsertResult)
                        })
                    }
                    else
                    {
                        db.ExecuteTag($scope.Firma,'IsEmriTukUpdate',[$scope.Miktar * $scope.Stok[0].CARPAN,$scope.Stok[0].ISHGUID]);
                    }
                }
                else
                {
                    if($scope.Stok[0].ISHGUID == '00000000-0000-0000-0000-000000000000')
                    {
                        var InsertData = 
                        [
                            $scope.Stok[0].KODU,
                            0,
                            $scope.IsEmriKodu,
                            0,//SEVKMIKTAR
                            0, //IADEMIKTAR
                            0, //TUKETMIKTAR
                            $scope.Miktar * $scope.Stok[0].CARPAN, //URETMIKTAR
                            0, //URETIADEMIKTAR
                            0, //PLANSEVKMIKTAR
                            0  //PLANURETIM
                        ];
                        db.ExecuteTag($scope.Firma,'IsEmriHarInsert',InsertData,function(InsertResult)
                        {
                            console.log(InsertResult)
                        })
                    }
                    else
                    {
                        db.ExecuteTag($scope.Firma,'IsEmriUrtUpdate',[$scope.Miktar * $scope.Stok[0].CARPAN,$scope.Stok[0].ISHGUID]);
                    }
                }
                db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(IsEmriData)
                {
                    $scope.StokHarListe = IsEmriData;
                    if($scope.Stok[0].BEDENPNTR != 0 && $scope.Stok[0].RENKPNTR != 0)
                    {
                        BedenHarInsert(InsertResult.result.recordset[0].sth_Guid);
                    }
                    InsertAfterRefresh(IsEmriData);
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
        ToplamMiktarHesapla();
        $window.document.getElementById("Barkod").focus();
    }
    function ToplamMiktarHesapla()
    {
        $scope.ToplamMiktar = 0;
        $scope.ToplamSatir = 0;

        angular.forEach($scope.StokHarListe,function(value)
        {
            $scope.ToplamMiktar += value.sth_miktar;
            $scope.ToplamSatir += 1 ;
        });
    }
    function UpdateData(pData) 
    {
        db.ExecuteTag($scope.Firma,'StokHarUpdate',pData.Param,function(InsertResult)
        {   
            if(typeof(InsertResult.result.err) == 'undefined')
            {   
                db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(IsEmriData)
                {                    
                    InsertAfterRefresh(IsEmriData);
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
    function PartiLotEkran()
    {
        if($scope.Stok[0].PARTI == '')
        {
            if($scope.Stok[0].DETAYTAKIP == 1 || $scope.Stok[0].DETAYTAKIP == 2)
            {
                $scope.LblPartiLotAlert = "";
                $scope.TxtParti = "";
                $scope.TxtLot = 0;
                $scope.SktTarih = moment(new Date()).format("DD.MM.YYYY");
                $scope.PartiLotListe = [];
                $scope.MaxLot();
                $scope.$apply();

                $("#LblPartiLotAlert").hide();
                $("TblPartiLot").jsGrid({data : $scope.PartiLotListe});
                $('#MdlPartiLot').modal('show');
            }
        }
    }
    function BedenHarInsert(pGuid)
    {
        let Data =
        [
            UserParam.MikroId, // KULLANICI
            UserParam.MikroId, // KULLANICI
            9, // BEDEN TİP
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
        db.ExecuteTag($scope.Firma,'BedenHarUpdate',pData,function(data)
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
    $scope.YeniEvrak = async function()
    {
        $scope.EvrakLock = false;
        Init();
        InitCariGrid()
        InitEmirGrid();
        InitIslemGrid();
        InitStokGrid();
        InitStokReceteGrid();
        InitPartiLotGrid();
        $scope.MainClick();
        ParamName = "FasonGirisCikis";

        $scope.Seri = UserParam[ParamName].Seri;
        $scope.BelgeNo = UserParam[ParamName].BelgeNo;
        $scope.CmbEvrakTip = UserParam[ParamName].CmbEvrakTip;
        $scope.CariKodu = UserParam.FasonGirisCikis.Cari;

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
            $scope.Depo = UserParam[ParamName].Depo;
            $scope.DepoListe.forEach(function(item) 
            {
                if(item.KODU == $scope.Depo)
                $scope.DepoAdi = item.ADI;
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
        db.FillCmbDocInfo($scope.Firma,'CmbProjeGetir',function(data)
        {
            $scope.ProjeListe = data; 
            $scope.Proje = UserParam.FasonGirisCikis.Proje
        });
        db.FillCmbDocInfo($scope.Firma,'IsMerkeziGetir',function(data)
        {
            $scope.IsMerkeziListe = data;
            $scope.IsMerkezi = UserParam[ParamName].IsMerkezi;
            $scope.IsMerkeziListe.forEach(function(item)
            {
                if(item.KODU == $scope.IsMerkezi)
                  $scope.IsMerkeziAdi == item.ADI;
            });
        });

        await db.MaxSiraPromiseTag($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip],function(data)
        {
            $scope.Sira = data
        });
        $scope.EvrakTipChange(0);
    }
    $scope.EvrakGetir = function ()
    {   
        db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
        {   
            if(data.length > 0)
            {
                Init();
                InitEmirGrid();
                InitIslemGrid();
                
                $scope.CariFiyatListe = data[0].sth_fiyat_liste_no;
                $scope.Seri = data[0].sth_evrakno_seri;
                $scope.Sira = data[0].sth_evrakno_sira;
                $scope.EvrakTip = data[0].sth_evraktip.toString();
                $scope.CariKodu = data[0].sth_cari_kodu;
                $scope.CariAdi = data[0].CARIADI;
                $scope.IsEmriKodu = data[0].sth_isemri_gider_kodu;
                console.log($scope.IsEmriKodu)
                $scope.EvrakTip = data[0].sth_evraktip.toString();
                if($scope.EvrakTip == 0)
                {
                    $scope.CmbEvrakTip = "1";
                }
                else
                {
                    $scope.CmbEvrakTip = "0";
                }
                $scope.BelgeNo = data[0].sth_belge_no;
                $scope.Tarih = new Date(data[0].sth_tarih).toLocaleDateString();
                $scope.BelgeTarih = new Date(data[0].sth_belge_tarih).toLocaleDateString();
                $scope.Barkod = "";
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
                $scope.ToplamMiktar1 = 0;
                $scope.TOPMIKTAR = 1;
                
                db.GetPromiseTag($scope.Firma,'CariGetir',[$scope.CariKodu,'',UserParam.Sistem.PlasiyerKodu],function(data)
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
                db.DepoGetir($scope.Firma,UserParam[ParamName].DepoListe,function(data)
                {
                    $scope.DepoListe = data; 
                    $scope.Depo = UserParam[ParamName].Depo;
                    $scope.DepoListe.forEach(function(item) 
                    {
                        if(item.KODU == $scope.Depo)
                        $scope.DepoAdi = item.ADI;
                    });     
                });

                db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(e){$scope.SorumlulukListe = e; $scope.Sorumluluk = data[0].sth_stok_srm_merkezi});
                db.FillCmbDocInfo($scope.Firma,'CmbProjeGetir',function(e){$scope.ProjeListe = e; $scope.Proje = data[0].sth_proje_kodu}); 
            
                $scope.StokHarListe = data;
                $("#TblIslem").jsGrid({data : $scope.StokHarListe});  

                ToplamMiktarHesapla();
                $scope.EvrakTipChange(1);
                $scope.EvrakLock = true;
                $scope.BarkodLock = false;

                angular.element('#MdlEvrakGetir').modal('hide');

                BarkodFocus();

                alertify.alert("<a style='color:#3e8ef7''>" + $scope.ToplamSatir + " " + "- Satır Evrak Getirildi !" + "</a>" );
            }
            else
            {
                angular.element('#MdlEvrakGetir').modal('hide');
                alertify.alert("<a style='color:#3e8ef7''>" + "Evrak Bulunamadı !" + "</a>" );
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
            let GirisCikis = $scope.GirisCikis;
            if($scope.StokHarListe.length > 0)
            {
                if(UserParam.FasonGirisCikis.EvrakSil == 0)
                {
                    db.ExecuteTag($scope.Firma,'StokHarEvrDelete',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
                    {
                        if(typeof(data.result.err) == 'undefined')
                        {
                            console.log($scope.IsEmriKodu,GirisCikis)
                            db.GetData($scope.Firma,'IsEmriListeGetir',[$scope.IsEmriKodu,GirisCikis,'',''],function(StokData)
                            {
                                console.log(StokData)
                                $scope.StokListe = StokData;
                                if ($scope.StokListe.length > 0)
                                {
                                    angular.forEach($scope.StokListe,function(value)
                                    {
                                        console.log(value)
                                        if(GirisCikis == 1)
                                        {
                                            db.ExecuteTag($scope.Firma,'IsEmriTukUpdate',[value.GERCEKLESEN * -1,value.ISHGUID]);
                                        }
                                        else
                                        {
                                            db.ExecuteTag($scope.Firma,'IsEmriUrtUpdate',[value.GERCEKLESEN * -1,value.ISHGUID]);
                                        }
                                    })
                                    // angular.forEach($scope.StokListe,function(value)
                                    // {
                                    //     console.log(value)
                                    //     db.ExecuteTag($scope.Firma,'IsEmriMiktarUpdate',[value.SPECIAL * -1,value.GUID]);
                                    // })
                                }
                            });
                            angular.forEach($scope.StokHarListe,function(value)
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
                        $scope.YeniEvrak();
                    });
                }
                else
                {
                    alertify.alert("<a style='color:#3e8ef7''>" + "Belge Silmeye Yetkiniz Yok !" + "</a>" );
                }
            }
            else
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Kayıtlı Belge Yok !" + "</a>" );
            }
        }
        ,function(){});
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
                $("#TblCari").jsGrid({data : $scope.CariListe});
                $("#TblCari").jsGrid({pageIndex: true})
            }     
            
        });
    }
    $scope.BtnPartiLotGetir = function()
    {   
        if(isNaN($scope.TxtLot))
        $scope.TxtLot = 0;

        db.GetData($scope.Firma,'PartiLotGetir',[$scope.Stok[0].KODU,$scope.Depo,$scope.TxtParti,$scope.TxtLot],function(data)
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
            $scope.Aciklama = 0;
            //Sona 0 koyma işlemi Açıklama ve Lot tarafında
            let Uzunluk = 5 - $scope.Aciklama.length;
            let Miktar = [];
            for (let i = 0; i < Uzunluk; i++) 
            {
                Miktar.push(0);
            }
            Miktar = Miktar.toString();
            Miktar = Miktar.split(",").join("");
            $scope.Aciklama = Miktar + "" + $scope.Aciklama;

            let UzunlukLot = 3 - $scope.TxtLot.toString().length;
            let MiktarLot = [];
            for (let i = 0; i < UzunlukLot; i++) 
            {
                MiktarLot.push(0);
            }
            MiktarLot = MiktarLot.toString();
            MiktarLot = MiktarLot.split(",").join("");
            let Lot = MiktarLot + "" + $scope.TxtLot;

            //Stok Kodunun ilk 7 hanesi alınıyor
            let StokKodu = $scope.Stok[0].KODU.substring(0,7)

            //Tarih Formatı yapılıyor
            let GunAy = $scope.Tarih2.substring(0,4)
            let Yil = $scope.Tarih2.substring(7,8)
            let TarihY = GunAy + "" + Yil;
            $scope.BarkodInsert = StokKodu + "" + $scope.TxtParti + "" +  Lot + "" + TarihY;
            db.GetData($scope.Firma,'BarkodGetir',[$scope.BarkodInsert,0],function(BarkodData)
            {
                if(BarkodData.length > 0)
                {
                    $('#MdlPartiLot').modal('hide');
                    alertify.alert("Barkod Daha Önceden Kaydedilmiş")
                }
                else
                {
                    db.GetData($scope.Firma,'PartiLotGetir',[$scope.Stok[0].KODU,$scope.DepoNo,$scope.TxtParti,$scope.TxtLot],function(data)
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
                                $scope.Aciklama,
                                $scope.SktTarih,
                                $scope.TxtDaraliAgr,
                                $scope.TxtSafiAgr,
                                $scope.TxtEn,
                                $scope.TxtBoy,
                                $scope.TxtYukseklik,
                                $scope.TxtOzgulAgr
                            ]   
                            db.ExecuteTag($scope.Firma,'PartiLotInsert',Data,function(InsertResult)
                            {
                                if(typeof(InsertResult.result.err) == 'undefined')
                                {
                                    $scope.Stok[0].PARTI = $scope.TxtParti;
                                    $scope.Stok[0].LOT = $scope.TxtLot;
                                    if(UserParam[ParamName].PartiBarkodOlustur == 1)
                                    {
                                        let BarkodInsertData = 
                                        [
                                            $scope.BarkodInsert,
                                            $scope.Stok[0].KODU,
                                            $scope.Stok[0].BIRIMPNTR,
                                            3,  //bar_baglantitipi
                                            2,  //bar_barkodtipi
                                            $scope.TxtParti,
                                            $scope.TxtLot
                                        ]
                                        db.ExecuteTag($scope.Firma,'BarkodInsert',BarkodInsertData,function(InsertResult)
                                        {
                                        });
                                    }
                                    $('#MdlPartiLot').modal('hide');
                                }
                            });
                        }
                    });
                }
            });
        }
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
    $scope.SatirDelete = function()
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Bu Belgeyi Satırı İstediğinize Eminmisiniz ?', 
        function()
        { 
            if($scope.IslemListeSelectedIndex > -1)
            {
                if(UserParam.FasonGirisCikis.EvrakSil == 0)
                {
                    db.ExecuteTag($scope.Firma,'StokHarSatirDelete',[$scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_Guid],function(data)
                    {
                        if(typeof(data.result.err) == 'undefined')
                        {
                            db.ExecuteTag($scope.Firma,'BedenHarDelete',[$scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_Guid,11],function(data)
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
                            db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
                            {
                                $scope.StokHarListe = data;
                                $("#TblIslem").jsGrid({data : $scope.StokHarListe});    
                                $scope.BtnTemizle();
                                ToplamMiktarHesapla();
                            });
                        }
                    });
                }
                else
                {
                    alertify.alert("<a style='color:#3e8ef7''>" + "Belgeleri Silmeye Yetkiniz Yok !" + "</a>" );
                }
            }
            else
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Seçili Satır Olmadan Belgeleri Silemezsiniz !" + "</a>" );
            }
        },
        function(){});
    }
    $scope.EvrakTipChange = async function()
    {
        console.log($scope.CmbEvrakTip)
        if($scope.CmbEvrakTip == 0)
        {
            $scope.GirisCikis = 0; //Giriş
            $scope.Tip = 0
            $scope.Cins = 8
            $scope.EvrakTip = 12
        }
        else if($scope.CmbEvrakTip == 1)
        {
            $scope.GirisCikis = 1; //Çıkış
            $scope.Tip = 1
            $scope.Cins = 8
            $scope.EvrakTip = 0
        }
        await db.MaxSira($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip],function(data){$scope.Sira = data});
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
    $scope.BtnDuzenle = function ()
    {
        $scope.MiktarEdit = $scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_miktar;
        $("#MdlDuzenle").modal('show');
    }
    $scope.BtnDuzenleKaydet = function(pIndex)
    {
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
                $scope.Miktar2,
                0, //TUTAR
                0, //VERGİ
                0, //İSKONTO1
                0, //İSKONTO2
                0, //İSKONTO3
                0, //İSKONTO4
                0, //İSKONTO5
                0, //İSKONTO6
                0, //SATISKMAS1
                0, //SATISKMAS2
                0, //SATISKMAS3
                0, //SATISKMAS4
                0, //SATISKMAS5
                0, //SATISKMAS6
                $scope.StokHarListe[pIndex].sth_Guid
            ],
            BedenPntr : $scope.StokHarListe[pIndex].BEDENPNTR,
            RenkPntr : $scope.StokHarListe[pIndex].RENKPNTR,
            Miktar : $scope.MiktarEdit,
            Guid :  $scope.IsEmriListe[pIndex].sth_Guid
        };
        
        UpdateData(Data);
    }
    $scope.Insert = function()
    {
        $scope.InsertLock = true
        if(UserParam.SatisIrsaliye.EksiyeDusme == 1 && ($scope.Miktar * $scope.Stok[0].CARPAN) > $scope.Stok[0].KALAN)
        {
            alertify.alert("Eksiye Düşmeye İzin Verilmiyor.");
            return;
        } 
        if(typeof($scope.Stok[0].KODU) != 'undefined')
        {
            if(UserParam.Sistem.SatirBirlestir == 0 )
            {   
                InsertData();
            }
            else
            {
                let UpdateStatus = false;

                angular.forEach($scope.StokHarListe,function(value)
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
        else
        {   
            alertify.alert("<a style='color:#3e8ef7''>" + "Barkod Okutunuz !" + "</a>" );
            console.log("Barkod Okutunuz!");
            $scope.InsertLock = false;
        }     
        
        BarkodFocus();
    }
    $scope.DepoChange = function()
    {
        $scope.DepoListe.forEach(function(item) 
        {
            if(item.KODU == $scope.Depo)
                $scope.DepoAdi = item.ADI;
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
    $scope.IsMerkeziChange = function()
    {
        $scope.IsMerkeziListe.forEach(function(item)
        {
            if(item.KODU == $scope.IsMerkezi)
            $scope.IsMerkeziAdi = item.ADI;
        });
    }
    $scope.IsEmriListele = function()
    {
        let Kodu = '';
        let Adi = '';   

        if($scope.TxtIsEmriAra != "")
        {
            if($scope.CmbIsEmriAra == "0")
            {   
                Adi = $scope.TxtIsEmriAra.replace("*","%").replace("*","%");
            }
            else
            {
                Kodu = $scope.TxtIsEmriAra.replace("*","%").replace("*","%");
            }

        }
        
        db.GetData($scope.Firma,'IsEmriGetir',[Kodu,Adi],function(data)
        {
            $scope.IsEmriListe = data;

            if($scope.IsEmriListe.length > 0)
            {
                $("#TblEmir").jsGrid({data : $scope.IsEmriListe});
            }
            else
            {
               alertify.alert("İş Emri bulunamadı")
               $("#TblCari").jsGrid({data : $scope.CariListe});
            }
        });
    }
    $scope.IsEmriListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( IsEmriSelectedRow ) { IsEmriSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        IsEmriSelectedRow = $row;
        console.log($scope.IsEmriListe[pIndex])
        if($scope.GirisCikis == 0)
        {
            var TmpQuery = 
            {
                db : '{M}.' + $scope.Firma,
                query:  "SELECT * FROM STOK_HAREKETLERI WHERE sth_isemri_gider_kodu = @IsEmri and sth_cari_kodu = @CariKodu" ,
                param:  ['IsEmri','CariKodu'], 
                type:   ['string|25','string|25'], 
                value:  [$scope.IsEmriKodu,$scope.CariKodu]    
            }
            db.GetPromiseQuery(TmpQuery,function(Data)
            {
                if(Data.length == 0)
                {
                    alertify.okBtn("Tamam")
                    alertify.alert("Seçilen iş emrine ait fasoncu ve fason çıkış kaydı bulunamadı")
                }
            })
        }


        $scope.IsEmriKodu = $scope.IsEmriListe[pIndex].KODU;
        $scope.IsEmriAdi = $scope.IsEmriListe[pIndex].ADI;
        console.log($scope.IsEmriListe[pIndex])
        // $scope.MainClick();
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
        $scope.Miktar = $scope.StokListe[pIndex].MIKTAR;
        console.log($scope.StokListe[pIndex].KODU)
        $scope.BarkodGirisClick();
        StokBarkodGetir($scope.Barkod);
    }
    $scope.PartiLotListeRowClick = function(pIndex,pItem,pObj)
    {   
        if ( PartiLotSelectedRow ) { PartiLotSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        PartiLotSelectedRow = $row;
        $scope.PartiLotListeSelectedIndex = pIndex;
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
    $scope.BtnBarkodGetirClick = function()
    {
        StokBarkodGetir($scope.Barkod);
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
        if(UserParam.FasonGirisCikis.ReceteKontrol == "1")
        {
            $scope.TblStok2Show = true;
            $scope.TblStokShow = false;
            db.GetData($scope.Firma,'IsEmriListeGetir',[$scope.IsEmriKodu,$scope.GirisCikis,Kodu,Adi],function(StokData)
            {
                $scope.StokListe = [];
                for (let i = 0; i < StokData.length; i++) 
                {
                    console.log(StokData)
                    
                    if(StokData[i].KALAN > 0)
                    {
                        $scope.StokListe.push(StokData[i])
                    }
                }
                if ($scope.StokListe.length > 0)
                {
                    $scope.Loading = false;
                    $scope.TblLoading = true;
                    $("#TblStok2").jsGrid({data : $scope.StokListe});
                    $("#TblStok2").jsGrid({data : $scope.StokListe});
                    $("#TblStok2").jsGrid({pageIndex: true});
                }
                else
                {
                    alertify.alert("Stok Bulunamadı")
                    $scope.Loading = false;
                    $scope.TblLoading = true;
                    $("#TblStok2").jsGrid({data : $scope.StokListe});
                    $("#TblStok2").jsGrid({data : $scope.StokListe});
                    $("#TblStok2").jsGrid({pageIndex: true});
                }
            });
        }
        else
        {
            $scope.TblStokShow = true;
            $scope.TblStok2Show = false;
            db.GetData($scope.Firma,'StokAdiGetir',[Kodu,Adi,$scope.Depo],function(StokData)
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
    }
    $scope.BtnStokGridSec = function()
    {
        $("#MdlStokGetir").modal('hide');
        StokBarkodGetir($scope.Barkod);
        $scope.BtnStokGridGetir();
        $("#TblStok").jsGrid({pageIndex: true})
    }
    $scope.BtnManuelArama = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            $scope.BtnStokGridGetir();
        }
    }
    $scope.BtnIsEmriListeleEnter = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            $scope.IsEmriListele();
        }
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
        $scope.Stok[0].TOPMIKTAR = $scope.Stok[0].CARPAN * $scope.Miktar
    }
    $scope.MiktarPress = function(keyEvent)
    {
        if(keyEvent.which == 40)
        {
            $window.document.getElementById("Miktar").focus();
            $window.document.getElementById("Miktar").select();
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
    $scope.ManuelAramaClick = function() 
    {
        $("#TbStok").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TbIsEmriSecim").removeClass('active');
    }
    $scope.MainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbIsEmriSecim").removeClass('active');
        $("#TbStok").removeClass('active');
    }
    $scope.BelgeBilgisiClick = function() 
    {
        $("#TbBelgeBilgisi").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbIsEmriSecim").removeClass('active');
        $("#TbStok").removeClass('active');
    }
    $scope.BarkodGirisClick = function() 
    {   
        if($scope.Sira == 0 || typeof $scope.Sira == "undefined")
        {            
            alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Evrak Siranın Gelmesini Bekleyin!" + "</a>" );
        }
        else
        {
            if($scope.CariAdi == "" && $scope.IsEmriKodu != "")
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Cari Seçiniz !" + "</a>" );
            }
            else if($scope.CariAdi != "" && $scope.IsEmriKodu == "")
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen İş Emri Seçiniz !" + "</a>" );
            }
            else if($scope.CariAdi == "" && $scope.IsEmriKodu == "")
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Cari ve İş Emri Seçiniz !" + "</a>" );
            }
            else
            {
                $("#TbBarkodGiris").addClass('active');
                $("#TbMain").removeClass('active');
                $("#TbCariSec").removeClass('active');
                $("#TbBelgeBilgisi").removeClass('active');
                $("#TbIslemSatirlari").removeClass('active');
                $("#TbIsEmriSecim").removeClass('active');
                $("#TbStok").removeClass('active');
                            
                BarkodFocus();
            }
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
            $("#TbIsEmriSecim").removeClass('active');
            $("#TbStok").removeClass('active');
        }
    }
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
        $("#TbIsEmriSecim").removeClass('active');
        $("#TbStok").removeClass('active');
        }
    }
    $scope.IsEmriSecimClick = function()
    {
        if($scope.StokHarListe.length == 0)
        {
            $("#TbIsEmriSecim").addClass('active');
            $("#TbMain").removeClass('active');
            $("#TbBarkodGiris").removeClass('active');
            $("#TbBelgeBilgisi").removeClass('active');
            $("#TbIslemSatirlari").removeClass('active');
            $("#TbStok").removeClass('active');
        }        
        else
        {
            alertify.okBtn("Tamam");
            alertify.alert("İş Emri Seçmeye yetkiniz yok");
        }
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
}