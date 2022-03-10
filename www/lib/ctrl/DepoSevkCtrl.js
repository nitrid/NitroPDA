function DepoSevkCtrl($scope,$window,$timeout,db)
{
    let IslemSelectedRow = null;
    let StokSelectedRow = null;
    let PartiLotSelectedRow = null;

    $('#MdlPartiLot').on('hide.bs.modal', function () 
    {
        if($scope.TxtParti == "" && $scope.TxtLot == 0)
        {
            $scope.BtnTemizle();
        }
    });
    $('#MdlRenkBeden').on('hide.bs.modal', function () 
    {   
        if($scope.RenkListe.length < 0 && $scope.BedenListe.length < 0)
        {
            if($scope.Stok[0].RENK == '' ||  $scope.Stok[0].BEDEN == '')
            {
                $scope.BtnTemizle();
            }
        }
    });
    function Init()
    {
        gtag('config', 'UA-12198315-14', 
        {
            'page_title' : 'Depolararası Sevk Fişi',
            'page_path': '/Deposevk'
        });

        UserParam = Param[$window.sessionStorage.getItem('User')];
        $scope.Firma = $window.sessionStorage.getItem('Firma');

        $scope.Seri = "";
        $scope.Sira = 0; 
        $scope.EvrakTip = 2;
        $scope.CDepo;
        $scope.GDepo;
        $scope.CDepoAdi;
        $scope.GDepoAdi;
        $scope.Sorumluluk = UserParam.DepoSevk.Sorumluluk;
        $scope.SubeNo = UserParam.Sistem.SubeNo;
        $scope.Proje = "";
        $scope.Barkod = "";
        $scope.Birim = "0";
        $scope.StokGridTip = "0";
        $scope.StokGridText = "";
        $scope.Tip = 2;
        $scope.Cins = 6;
        $scope.NormalIade = 0;
        $scope.BelgeTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.Tarih2Ters = moment(new Date()).format("YYYYMMDD");
        $scope.PlasiyerKodu = 0;
        $scope.SatirNo = "";
        $scope.CmbEvrakTip = "0";
        
        $scope.CDepoListe = [];
        $scope.GDepoListe = [];
        $scope.SorumlulukListe = [];
        $scope.ProjeListe = [];
        $scope.BedenHarListe = [];
        $scope.DepoSevkListe = [];
        $scope.BirimListe = [];
        $scope.StokListe = [];
        $scope.PartiLotListe = [];
        $scope.RenkListe = [];
        $scope.BedenListe = [];   

        $scope.Stok = [];
        $scope.Miktar = 1;
        $scope.Miktar.length = "";
        $scope.Birim = [];

        $scope.ToplamMiktar = 0;
        $scope.Miktar2 = 0;
        $scope.ToplamSatir = 0;

        $scope.OtoEkle = false;
        $scope.EvrakLock = false;
        $scope.Barkod = "";
        $scope.IslemListeSelectedIndex = -1;
        $scope.PartiLotListeSelectedIndex = 0;

        $scope.TxtParti = "";
        $scope.TxtLot = 0;
        $scope.SktTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.LblPartiLotAlert = "";

        // DÜZENLE MODAL
        $scope.MiktarEdit = 0;

        $scope.TblLoading = true;
       // $scope.EvrakTipChange();
        
    }
    function InitIslemGrid()
    {   
        $("#TblIslem").jsGrid({
            responsive: true,
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.DepoSevkListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            
            fields: 
            [
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
            },
            {
                name: "sth_parti_kodu",
                title: "PARTI",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sth_lot_no",
                title: "LOT",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "MIKTAR2",
                title: "MIKTAR2",
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
    function InitStokGrid()
    {
        $("#TblStok").jsGrid
        ({
            responsive: true,
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.StokListe,
            paging: true,
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
    function InitStokHarGrid()
    {
        $("#TblStokHarListe").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.StokHarGonderListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
            {
                name: "sth_evrakno_seri",
                title: "SERI",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sth_evrakno_sira",
                title: "SIRA",
                type: "number",
                align: "center",
                width: 75
            },
            {
                name: "sth_cari_kod",
                title: "CARİ KODU",
                type: "number",
                align: "center",
                width: 150
            },
            {
                name: "sth_tutar",
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
            pGuid, // RECno
            Kirilim($scope.Stok[0].BEDENPNTR,$scope.Stok[0].RENKPNTR), // BEDEN NO
            $scope.Miktar,
            0,
            0
        ];
        
        db.ExecuteTag($scope.Firma,'BedenHarInsert',Data,function(data)
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

        $scope.DepoSevkListe = pData;
        $("#TblIslem").jsGrid({data : $scope.DepoSevkListe});    
        $scope.BtnTemizle();
        ToplamMiktarHesapla();
        
        $window.document.getElementById("Barkod").focus();
    } 
    function InsertData()
    {   
        var InsertData = 
        [
            UserParam.MikroId,
            UserParam.MikroId,
            0, //FİRMA NO
            $scope.SubeNo, //ŞUBE NO
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
            "",
            '', //İŞEMRİKODU
            $scope.PlasiyerKodu,
            0, //HARDOVİZCİNSİ
            0, //HARDOVİZKURU
            0, //ALTDOVİZKURU
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
            '00000000-0000-0000-0000-000000000000', //sth_sth_uid
            '00000000-0000-0000-0000-000000000000', //sth_fat_uid,
            $scope.GDepo,
            $scope.CDepo,
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
            0,   // FİYATLİSTENO
            0,   //NAKLİYEDEPO
            0   //NAKLİYEDURUM
        ];
        db.ExecuteTag($scope.Firma,'StokHarInsert',InsertData,function(InsertResult)
        {   
            console.log(InsertResult.result.err)
            if(typeof(InsertResult.result.err) == 'undefined')
            {      
                db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(DepoSevkData)
                {  
                    
                    console.log("2")
                    if($scope.Stok[0].BEDENPNTR != 0 && $scope.Stok[0].RENKPNTR != 0)
                    {   
                        BedenHarInsert(InsertResult.result.recordset[0].sth_Guid);
                    } 
                    console.log("3")
                    InsertAfterRefresh(DepoSevkData);   
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
                $scope.InsertLock = false;
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
            db.StokBarkodGetir($scope.Firma,pBarkod,$scope.CDepo,async function(BarkodData)
            {    
                $scope.Stok = BarkodData;
                if(UserParam.Sistem.PartiLotKontrol == 1)
                {
                    for(i = 0;i < $scope.DepoSevkListe.length;i++)
                    {   
                        if($scope.Stok[0].PARTI != "" && $scope.Stok[0].LOT != "")
                        {
                            if($scope.Stok[0].PARTI == $scope.DepoSevkListe[i].sth_parti_kodu && $scope.Stok[0].LOT == $scope.DepoSevkListe[i].sth_lot_no)
                            {
                                alertify.alert("<a style='color:#3e8ef7''>" + "Okutmuş Olduğunuz "+ $scope.Stok[0].PARTI + ". " + "Parti " + $scope.Stok[0].LOT + ". " +"Lot Daha Önceden Okutulmuş !" + "</a>" );
                                $scope.InsertLock = false;
                                return;
                            }
                        }
                    }
                }
                if(BarkodData.length > 0)
                {   
                    $scope.Stok = BarkodData
                    $scope.Stok[0].Satir = 0;
                    $scope.Stok[0].Miktar = 0;
                    $scope.Stok[0].TOPMIKTAR = 1;

                    await db.GetPromiseTag($scope.Firma,'CmbBirimGetir',[BarkodData[0].KODU],function(data)
                    {   
                        $scope.BirimListe = data;
                        $scope.Birim = JSON.stringify($scope.Stok[0].BIRIMPNTR); 
                        console.log($scope.Birim)

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
                        if($scope.Stok[0].PARTI !='')
                        {
                            db.GetData($scope.Firma,'PartiLotGetir',[$scope.Stok[0].KODU,$scope.CDepo,'',0],function(data)
                            {   
                                $scope.PartiLotList = [];
                                $scope.PartiLotListe = data;
                                console.log(data)
                                let Check = false;
                                for (let i = 0; i < data.length; i++)
                                {
                                    if(data[i].SKTTARIH >= $scope.Tarih2Ters) // SKT BUGÜNÜ GEÇMİŞ Mİ? GEÇMEMİŞ İSE GİR.
                                    {                        
                                        if($scope.PartiLotList.length != 0)
                                        {
                                            console.log($scope.PartiLotList[0].TARIH,data[i - 1].TARIH, i-1)
                                            if($scope.PartiLotList[0].TARIH == data[i].TARIH)
                                            {
                                                $scope.PartiLotList.push(data[i]);
                                                for (let i = 0; i < $scope.PartiLotList.length; i++)
                                                {
                                                    if($scope.Stok[0].PARTI == $scope.PartiLotList[i].PARTI && $scope.Stok[0].LOT == $scope.PartiLotList[i].LOT)
                                                    {
                                                        Check = true;
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                        else
                                        {
                                            console.log("Girdi")
                                            $scope.PartiLotList.push(data[i]); //DİĞERLERİNE GÖRE İLK GİRİLEN VE SKT Sİ GEÇMEMİŞ PARTILOT 
                                            console.log($scope.PartiLotList)
                                            for (let i = 0; i < $scope.PartiLotList.length; i++)
                                            {
                                                if($scope.Stok[0].PARTI == $scope.PartiLotList[i].PARTI && $scope.Stok[0].LOT == $scope.PartiLotList[i].LOT)
                                                {
                                                    Check = true;
                                                    break;
                                                }
                                            }
                                        }
                                    }
                                }
                                console.log($scope.PartiLotList)
                                if(Check == true)
                                {
                                    if(UserParam.Sistem.PartiLotMiktarKontrol == 1 && $scope.Stok[0].LOT != 0)
                                    {   
                                        $scope.Miktar = $scope.PartiLotList[0].MIKTAR;
                                        $scope.Stok[0].TOPMIKTAR = $scope.Miktar * $scope.Stok[0].CARPAN;
                                    }
                                    $scope.MiktarFiyatValid();
                                }
                                else
                                {
                                    alertify.alert("Daha yakın olan tarihli bir partilot mevcut veya SKT geçmiş",function()
                                    { 
                                        $scope.BtnTemizle();
                                    },
                                    function(){});      
                                }
                            });
                        }
                        else
                        {
                            PartiLotEkran();
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
                }
                else
                {    
                    // var sound = document.getElementById("audio");
                    // sound.play();
                    alertify.alert("<a style='color:#3e8ef7''>" + "Stok Bulunamamıştır !" + "</a>" );                 
                    console.log("Stok Bulunamamıştır.");
                    Beep();
                }
            });
        }
    }
    function UpdateData(pData) 
    {
        db.ExecuteTag($scope.Firma,'StokHarUpdate',pData.Param,function(InsertResult)
        {   
            if(typeof(InsertResult.result.err) == 'undefined')
            {   
                db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(DepoSevkData)
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
                                    value.BdnHar_Har_uid,   // Guid
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
                            console.log(pData.Param[Guid])
                        }
                    }                        
                    InsertAfterRefresh(DepoSevkData);
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
    function ToplamMiktarHesapla()
    {
        $scope.ToplamMiktar = 0;
        $scope.ToplamSatir = 0;

        angular.forEach($scope.DepoSevkListe,function(value)
        {   
            $scope.ToplamMiktar += value.sth_miktar;
            $scope.ToplamSatir += 1 ;
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
    $scope.BtnPartiEnter = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            $scope.BtnPartiLotGetir();
            $timeout(function() 
            {
                if($scope.PartiLotListe != '')
                {
                    $scope.BtnPartiLotSec();
                    $timeout(function(){$scope.Insert();},150)
                }
                else
                {
                    $('#MdlPartiLot').modal('hide');
                    alertify.okBtn("Tamam");
                    alertify.alert("Parti Bulunamadı");
                    $('#MdlPartiLot').modal('hide');
                    $scope.TxtParti = "";
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
                }
            },250)         
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
    $scope.BtnCariListele = function()
    {
        let Kodu = '';
        let Adi = '';

        if($scope.TxtCariAra != "")
        {
            if($scope.CmbCariAra == "0")
                Kodu = $scope.TxtCariAra;
            else
                Adi = $scope.TxtCariAra;
        }
        
        db.CariListe($scope.Firma,'CariListeGetir',[Kodu,Adi,UserParam.Sistem.PlasiyerKodu],function(data)
        {
            $scope.CariListe = data;      
            $("#TblCari").jsGrid({data : $scope.CariListe});
            $("#TblCari").jsGrid({pageIndex: true})
        });
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
            
        db.GetData($scope.Firma,'StokAdiGetir',[Kodu,Adi,$scope.CDepo],function(StokData)
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
    $scope.BtnStokGridSec = function()
    {
        $("#MdlStokGetir").modal('hide');
        StokBarkodGetir($scope.Barkod);
        $scope.BtnStokGridGetir();
        $("#TblStok").jsGrid({pageIndex : true})
    }
    $scope.BtnManuelArama = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            $scope.BtnStokGridGetir();
        }
    }
    $scope.BtnCariListeleEnter = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            $scope.BtnCariListele();
        }
    }
    $scope.BtnStokBarkodGetir = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            StokBarkodGetir($scope.Barkod);    
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
        $scope.MiktarEdit = $scope.DepoSevkListe[$scope.IslemListeSelectedIndex].sth_miktar;
        $("#MdlDuzenle").modal('show');
    }
    $scope.BtnDuzenleKaydet = function(pIndex)
    {
        $scope.Update(pIndex);
        angular.element('#MdlDuzenle').modal('hide');
    }
    $scope.EvrakAdi = function()
    {
        if($scope.EvrakTip == 2)
        {
            return 'Depolar Arası Sevk';
        }
        else
        {
            return 'Depolar Arası Satış';
        } 
    }
 /* $scope.EvrakTipChange = function()
    {
        if($scope.CmbEvrakTip == 0)
        {   
            $scope.Tip = 2;
            $scope.Cins = 6;
            $scope.NormalIade = 0;
        }
        else if($scope.CmbEvrakTip == 15)
        {
            $scope.Tip = 2;
            $scope.Cins = 6;
            $scope.NormalIade = 0;
        }
        db.MaxSira($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip],function(data){$scope.Sira = data});
    } */
    $scope.EvrakGetir = function ()
    {   
        db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
        {   
            if(data.length > 0)
            {
                Init();
                InitIslemGrid()
                $scope.Seri = data[0].sth_evrakno_seri;
                $scope.Sira = data[0].sth_evrakno_sira;
                $scope.EvrakTip = data[0].sth_evraktip.toString();
                $scope.BelgeNo = data[0].sth_belge_no;
                $scope.Tarih = new Date(data[0].sth_tarih).toLocaleDateString();
                $scope.BelgeTarih = new Date(data[0].sth_belge_tarih).toLocaleDateString();
                $scope.Barkod = "";
                $scope.CmbEvrakTip = "0";

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

                db.GetData($scope.Firma,'StokBedenHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,11],function(BedenData)
                {   
                    $scope.BedenHarListe = BedenData;
                });

                db.DepoGetir($scope.Firma,UserParam.DepoSevk.CDepoListe,function(e)
                {
                    $scope.CDepoListe = e; 
                    $scope.CDepo = data[0].sth_cikis_depo_no.toString();
                    $scope.CDepoListe.forEach(function(item) 
                    {
                        if(item.KODU == data[0].sth_cikis_depo_no)
                            $scope.CDepoAdi = item.ADI;
                    });          
                });
                db.DepoGetir($scope.Firma,UserParam.DepoSevk.GDepoListe,function(e)
                {
                    $scope.GDepoListe = e; 
                    $scope.GDepo = data[0].sth_giris_depo_no.toString();
                    $scope.GDepoListe.forEach(function(item) 
                    {
                        if(item.KODU == data[0].sth_giris_depo_no)
                            $scope.GDepoAdi = item.ADI;
                    });          
                });
               
                db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(e){$scope.SorumlulukListe = e; $scope.Sorumluluk = data[0].sth_stok_srm_merkezi});
                db.FillCmbDocInfo($scope.Firma,'CmbProjeGetir',function(e){$scope.ProjeListe = e; $scope.Proje = data[0].sth_proje_kodu}); 
            
                $scope.DepoSevkListe = data;
                $("#TblIslem").jsGrid({data : $scope.DepoSevkListe});  
            
                ToplamMiktarHesapla();

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
            if($scope.DepoSevkListe.length > 0)
            {
                if(UserParam.DepoSevk.EvrakSil == 0)
                {
                    db.ExecuteTag($scope.Firma,'StokHarEvrDelete',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
                    {
                        if(typeof(data.result.err) == 'undefined')
                        {
                            angular.forEach($scope.DepoSevkListe,function(value)
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
    $scope.Insert = function()
    {
        if(typeof($scope.Stok[0].KODU) != 'undefined')
        {
            if(UserParam.DepoSevk.EksiyeDusme == 1 && ($scope.Miktar * $scope.Stok[0].CARPAN) > $scope.Stok[0].DEPOMIKTAR)
            {
                alertify.alert("Eksiye Düşmeye İzin Verilmiyor.");
            }
            else
            {
                $scope.InsertLock = true
                if(UserParam.Sistem.SatirBirlestir == 0 || $scope.Stok[0].RENKPNTR != 0 || $scope.Stok[0].BEDENPNTR != 0 || $scope.Stok[0].DETAYTAKIP != 1 || $scope.Stok[0].DETAYTAKIP != 2)
                {   
                    InsertData();
                }
                else
                {
                    let UpdateStatus = false;

                    angular.forEach($scope.DepoSevkListe,function(value)
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
    $scope.SatirDelete = function()
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Bu Belgeyi Satırı İstediğinize Eminmisiniz ?', 
        function()
        { 
            if($scope.IslemListeSelectedIndex > -1)
            {
                if(UserParam.DepoSevk.EvrakSil == 0)
                {
                    db.ExecuteTag($scope.Firma,'StokHarSatirDelete',[$scope.DepoSevkListe[$scope.IslemListeSelectedIndex].sth_Guid],function(data)
                    {
                        if(typeof(data.result.err) == 'undefined')
                        {
                            db.ExecuteTag($scope.Firma,'BedenHarDelete',[$scope.DepoSevkListe[$scope.IslemListeSelectedIndex].sth_Guid,11],function(data)
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
                        
                        if($scope.DepoSevkListe.length <= 1)
                        {
                            $scope.YeniEvrak();
                        }
                        else
                        {   
                            db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
                            {
                                db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(Bedendata)
                                {
                                    $scope.BedenHarListe = Bedendata;
                                });

                                $scope.DepoSevkListe = data;
                                $("#TblIslem").jsGrid({data : $scope.DepoSevkListe});    
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
    $scope.MaxSira = async function()
    {
        await db.MaxSiraPromiseTag($scope.Firma,'MaxStokHarSira',[$scope.CDepo,$scope.Tarih],function(data){$scope.EvrakNo = data});
    }
    $scope.YeniEvrak =  async function ()
    {
        Init();
        InitIslemGrid();
        InitStokGrid();
        InitPartiLotGrid();
        InitStokHarGrid();
        $scope.MainClick();
      
        $scope.EvrakLock = false;
        $scope.Seri = UserParam.DepoSevk.Seri;
        $scope.BelgeNo = UserParam.DepoSevk.BelgeNo;
        $scope.CmbEvrakTip = UserParam.DepoSevk.EvrakTip;

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
        
        db.DepoGetir($scope.Firma,UserParam.DepoSevk.CDepoListe,function(data)
        {
            $scope.CDepoListe = data; 
            console.log(data)
            $scope.CDepo = UserParam.DepoSevk.CDepo;
            $scope.CDepoListe.forEach(function(item) 
            {
                if(item.KODU == $scope.CDepo)
                    $scope.CDepoAdi = item.ADI;
            });          
        });
        db.DepoGetir($scope.Firma,UserParam.DepoSevk.GDepoListe,function(data)
        {
            $scope.GDepoListe = data; 
            $scope.GDepo = UserParam.DepoSevk.GDepo;
            $scope.GDepoListe.forEach(function(item) 
            {
                if(item.KODU == $scope.GDepo)
                    $scope.GDepoAdi = item.ADI;
            });     
        });
        db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(data)
        {
            $scope.SorumlulukListe = data; 
            $scope.Sorumluluk = UserParam.DepoSevk.Sorumluluk

            console.log($scope.SorumlulukListe)
        });
        db.FillCmbDocInfo($scope.Firma,'CmbProjeGetir',function(data)
        {
            $scope.ProjeListe = data; 
            $scope.Proje = UserParam.DepoSevk.Proje
        });
        await db.MaxSiraPromiseTag($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip],function(data)
        {
            $scope.Sira = data
        });
        
        BarkodFocus();
    }
    $scope.MiktarFiyatValid = function()
    {
        $scope.Stok[0].TOPMIKTAR = $scope.Stok[0].CARPAN * $scope.Miktar
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
    $scope.MiktarFiyatValid = function()
    {
        $scope.Stok[0].TOPMIKTAR = $scope.Stok[0].CARPAN * $scope.Miktar
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
                $scope.DepoSevkListe[pIndex].sth_Guid
            ],
            BedenPntr : $scope.DepoSevkListe[pIndex].BEDENPNTR,
            RenkPntr : $scope.DepoSevkListe[pIndex].RENKPNTR,
            Miktar : $scope.MiktarEdit,
            Guid :  $scope.DepoSevkListe[pIndex].sth_Guid
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
    }
    $scope.BtnBarkodGetirClick = function()
    {
        StokBarkodGetir($scope.Barkod);
    }
    $scope.BelgeBilgisiClick = function() 
    {
        $("#TbBelgeBilgisi").addClass('active');
        $("#TbMain").removeClass('active');
    }
    $scope.BarkodGirisClick = function()
    {   
        if($scope.Sira == 0 || typeof $scope.Sira == "undefined")
        {            
            alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Evrak Siranın Gelmesini Bekleyin!" + "</a>" );
        }
        else
        {
            if($scope.GDepo == $scope.CDepo)
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Giriş ve Çıkış Deposu Aynı Olamaz !" + "</a>" );

                $("#TbMain").addClass('active');
                $("#TbBelgeBilgisi").removeClass('active');
                $("#TbBarkodGiris").removeClass('active');
                $("#TbIslemSatirlari").removeClass('active');
                $("#TbStok").removeClass('active');
            }
            else
            {
                $("#TbBarkodGiris").addClass('active');
                $("#TbMain").removeClass('active');
                $("#TbBelgeBilgisi").removeClass('active');
                $("#TbIslemSatirlari").removeClass('active');
                $("#TbStok").removeClass('active');
                BarkodFocus();
            }
        }
    }
    $scope.IslemSatirlariClick = function()
    {   
        if($scope.ToplamSatir <= 0)
        {
            alertify.alert("<a style='color:#3e8ef7''>" + "Gösterilecek Belge Yok !" + "</a>" );
            $("#TbMain").addClass('active');
            $("#TbBelgeBilgisi").removeClass('active');
            $("#TbBarkodGiris").removeClass('active');
            $("#TbIslemSatirlari").removeClass('active');
            $("#TbStok").removeClass('active');
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
    $scope.ManuelAramaClick = function() 
    {
        $("#TbStok").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');

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
    $scope.BtnGonder = function()
    {
        db.GetData($scope.Firma,'StokHareketGonderGetir',[2],function(Data)
            {
                $scope.StokHareketGonderListe = Data;
                console.log(Data)
                if($scope.StokHareketGonderListe.length > 0)
                {
                    $scope.Loading = false;
                    $scope.TblLoading = true;
                    $("#TblStokHarListe").jsGrid({data : $scope.StokHareketGonderListe});
                    $("#TblStokHarListe").jsGrid({pageIndex: true});
                    $("#MdlGonder").modal('show');
                }
                else
                {
                    alertify.alert("Sipariş Bulunamadı");
                    $scope.Loading = false;
                    $scope.TblLoading = true;
                    $("#TblStokHarListe").jsGrid({data : $scope.StokHareketGonderListe});
                    $("#TblStokHarListe").jsGrid({pageIndex: true});
                }   
            });
    }
    $scope.EvrakGonder = async function()
    {
        if(localStorage.mode == 'false')
        {
            let Status = await db.ConnectionPromise()
            if(!Status)
            {
                alertify.okBtn("Tamam");
                alertify.alert("Bağlantı Problemi !");
                return;
            }
            
            for (let i = 0; i < $scope.StokHareketGonderListe.length; i++) 
            {
                let TmpStatus = true
                let TmpStokHarData = await db.GetPromiseTag($scope.Firma,'StokHarGetir',[$scope.StokHareketGonderListe[i].sth_evrakno_seri,$scope.StokHareketGonderListe[i].sth_evrakno_sira,$scope.StokHareketGonderListe[i].sth_tip,0]);
                let TmpBedenData = await db.GetPromiseTag($scope.Firma,'StokBedenHarGetir',[$scope.StokHareketGonderListe[i].sth_evrakno_seri,$scope.StokHareketGonderListe[i].sth_evrakno_sira,$scope.StokHareketGonderListe[i].sth_tip,9]);
                
                localStorage.mode = 'true';
                let TmpMaxSira = await db.GetPromiseTag($scope.Firma,'MaxStokHarSira',[$scope.StokHareketGonderListe[i].sth_evrakno_seri,$scope.StokHareketGonderListe[i].sth_tip,$scope.StokHareketGonderListe[i].sth_cins])
                for (let m = 0; m < TmpStokHarData.length; m++)
                {
                    let InsertData = 
                    [
                        TmpStokHarData[m].sth_create_user,
                        TmpStokHarData[m].sth_lastup_user,
                        TmpStokHarData[m].sth_firmano, //FIRMA NO
                        TmpStokHarData[m].sth_subeno, //ŞUBE NO
                        TmpStokHarData[m].sth_tarih,
                        TmpStokHarData[m].sth_tip,
                        TmpStokHarData[m].sth_cins, //CİNSİ
                        TmpStokHarData[m].sth_normal_iade,
                        TmpStokHarData[m].sth_evraktip,
                        TmpStokHarData[m].sth_evrakno_seri,
                        TmpMaxSira[0].MAXEVRSIRA,
                        "",
                        TmpStokHarData[m].sth_belge_tarih,
                        TmpStokHarData[m].sth_stok_kod,
                        TmpStokHarData[m].sth_isk_mas1,
                        TmpStokHarData[m].sth_isk_mas2,
                        TmpStokHarData[m].sth_isk_mas3,
                        TmpStokHarData[m].sth_isk_mas4,
                        TmpStokHarData[m].sth_isk_mas5,
                        TmpStokHarData[m].sth_isk_mas6,
                        TmpStokHarData[m].sth_isk_mas7,
                        TmpStokHarData[m].sth_isk_mas8,
                        TmpStokHarData[m].sth_isk_mas9,
                        TmpStokHarData[m].sth_isk_mas10,
                        TmpStokHarData[m].sth_sat_iskmas1,
                        TmpStokHarData[m].sth_sat_iskmas2,
                        TmpStokHarData[m].sth_sat_iskmas3,
                        TmpStokHarData[m].sth_sat_iskmas4,
                        TmpStokHarData[m].sth_sat_iskmas5,
                        TmpStokHarData[m].sth_sat_iskmas6,
                        TmpStokHarData[m].sth_sat_iskmas7,
                        TmpStokHarData[m].sth_sat_iskmas8,
                        TmpStokHarData[m].sth_sat_iskmas9,
                        TmpStokHarData[m].sth_sat_iskmas10,
                        TmpStokHarData[m].sth_cari_cinsi,
                        TmpStokHarData[m].sth_cari_kodu,
                        TmpStokHarData[m].sth_isemri_gider_kodu,
                        TmpStokHarData[m].sth_plasiyer_kodu,
                        TmpStokHarData[m].sth_har_doviz_cinsi,
                        TmpStokHarData[m].sth_har_doviz_kuru,
                        TmpStokHarData[m].sth_alt_doviz_kuru,
                        TmpStokHarData[m].sth_stok_doviz_cinsi,
                        TmpStokHarData[m].sth_stok_doviz_kuru,
                        TmpStokHarData[m].sth_miktar,
                        TmpStokHarData[m].sth_miktar2,
                        TmpStokHarData[m].sth_birim_pntr,
                        TmpStokHarData[m].sth_tutar,
                        TmpStokHarData[m].sth_iskonto1,
                        TmpStokHarData[m].sth_iskonto2,
                        TmpStokHarData[m].sth_iskonto3,
                        TmpStokHarData[m].sth_iskonto4,
                        TmpStokHarData[m].sth_iskonto5,
                        TmpStokHarData[m].sth_iskonto6,
                        TmpStokHarData[m].sth_masraf1,
                        TmpStokHarData[m].sth_masraf2,
                        TmpStokHarData[m].sth_masraf3,
                        TmpStokHarData[m].sth_masraf4,
                        TmpStokHarData[m].sth_vergi_pntr, 
                        TmpStokHarData[m].sth_vergi, 
                        TmpStokHarData[m].sth_masraf_vergi_pntr,
                        TmpStokHarData[m].sth_masraf_vergi,
                        TmpStokHarData[m].sth_odeme_op,
                        TmpStokHarData[m].sth_aciklama,
                        TmpStokHarData[m].sth_sip_uid,
                        TmpStokHarData[m].sth_fat_uid,
                        TmpStokHarData[m].sth_giris_depo_no,
                        TmpStokHarData[m].sth_cikis_depo_no,
                        TmpStokHarData[m].sth_malkbl_sevk_tarihi,
                        TmpStokHarData[m].sth_cari_srm_merkezi,
                        TmpStokHarData[m].sth_stok_srm_merkezi,
                        "",
                        TmpStokHarData[m].sth_adres_no,
                        TmpStokHarData[m].sth_parti_kodu,
                        TmpStokHarData[m].sth_lot_no,
                        TmpStokHarData[m].sth_proje_kodu,
                        TmpStokHarData[m].sth_exim_kodu,
                        TmpStokHarData[m].sth_disticaret_turu,
                        TmpStokHarData[m].sth_otvvergisiz_fl,
                        TmpStokHarData[m].sth_oivvergisiz_fl,
                        TmpStokHarData[m].sth_fiyat_liste_no,
                        TmpStokHarData[m].sth_nakliyedeposu,
                        TmpStokHarData[m].sth_nakliyedurumu,
                    ];
                    console.log(InsertData)
                    let TmpResult = await db.ExecutePromiseTag($scope.Firma,'StokHarInsert',InsertData)
                    if(typeof(TmpResult.result.err) != 'undefined')
                    {
                        TmpStatus = false;
                    }
                    let TmpBeden = TmpBedenData.find(x => x.BdnHar_Har_uid == TmpStokHarData[m].sth_Guid)
                    if(typeof TmpBeden != 'undefined')
                    {
                        let InsertDataBdn =
                        [
                            TmpBeden.BdnHar_create_user, // KULLANICI
                            TmpBeden.BdnHar_lastup_user, // KULLANICI
                            TmpBeden.BdnHar_Tipi, // BEDEN TİP
                            TmpResult.result.recordset[0].sth_Guid, // GUID
                            TmpBeden.BdnHar_BedenNo, // BEDEN NO
                            TmpBeden.BdnHar_HarGor,  // MİKTAR
                            0, // REZERVASYON MİKTAR
                            0  // REZERVASYON TESLİM MİKTAR
                        ]
                        let TmpBdnResult = await db.ExecutePromiseTag($scope.Firma,'BedenHarInsert',InsertDataBdn)
                        if(typeof(TmpBdnResult.result.err) != 'undefined')
                        {
                            TmpStatus = false;
                        }
                    }
                }
                
                localStorage.mode = 'false';
                if (TmpStatus)
                {
                    let TmpUpdateQuery = 
                    {
                        db : '{M}.' + $scope.Firma,
                        query: "UPDATE STOKHAR SET status = 1 WHERE sth_evrakno_seri = '@sth_evrakno_seri' AND sth_evrakno_sira = @sth_evrakno_sira AND sth_tip = @sth_tip AND sth_cins = @sth_cins" ,
                        param:  ['sth_evrakno_seri:string|20','sth_evrakno_sira:int','sth_tip:int','sth_cins:int'],
                        value : [$scope.StokHareketGonderListe[i].sth_evrakno_seri,$scope.StokHareketGonderListe[i].sth_evrakno_sira,$scope.StokHareketGonderListe[i].sth_tip,$scope.StokHareketGonderListe[i].sth_cins]

                    }
                    await db.GetPromiseQuery(TmpUpdateQuery)
                    
                    await db.GetData($scope.Firma,'StokHareketGonderGetir',[],function(Data)
                    {
                        if(Data.length == 0)
                        {
                            $("#MdlGonder").modal('hide');
                            alertify.alert("Aktarım Tamamlandı!")
                        }
                    });
                }
            }
        }
        else
        {
            alertify.okBtn("Tamam");
            alertify.alert("Bu menü sadece offline mod'da çalışır !");
        }
    }
}
