function FaturaCtrl($scope,$window,$timeout,db,$filter)
{
    let CariSelectedRow = null;
    let IslemSelectedRow = null;
    let StokSelectedRow = null;
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
            'page_title' : 'Fatura',
            'page_path': '/Fatura'
        });

        UserParam = Param[$window.sessionStorage.getItem('User')];
        $scope.Firma = $window.sessionStorage.getItem('Firma');

        $scope.Seri = "";
        $scope.Sira = 0;
        $scope.EvrakTip;
        $scope.Tip;
        $scope.Cins;
        $scope.NormalIade;
        $scope.DepoNo;
        $scope.DepoAdi = "";
        $scope.Tarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.Sorumluluk = "";
        $scope.SorumlulukAdi = "";
        $scope.Personel = "";
        $scope.PersonelAdi = "";
        $scope.Proje = "";
        $scope.OdemeNo = "0";
        $scope.CmbEvrakTip = "1";
        $scope.Barkod = "";
        $scope.Birim = 1;
        $scope.CariKodu = "";
        $scope.CariAdi = "";
        $scope.Miktar = 1;
        $scope.Miktar2 = 0;
        $scope.ToplamSatir = 0;
        $scope.Meblag = 0;
        $scope.OtoEkle = false;

        //CARİHAREKET
        $scope.ChaEvrakTip = 0;
        $scope.ChaTip = 1;
        $scope.ChaCins = 6;
        $scope.ChaNormalIade = 0;
        $scope.ChaGuid = "";

        $scope.AraToplam = 0;
        $scope.ToplamIndirim = 0;
        $scope.NetToplam = 0;
        $scope.ToplamKdv = 0;
        $scope.GenelToplam = 0;
        
        $scope.CmbCariAra = "0";
        $scope.TxtCariAra = "";

        $scope.StokGridTip = "0";
        $scope.StokGridText = "";

        $scope.BirimListe = [];
        $scope.DepoListe = [];
        $scope.SorumlulukListe = [];
        $scope.PersonelListe = [];
        $scope.ProjeListe = [];
        $scope.OdemePlanListe = [];
        $scope.CariListe = [];
        $scope.StokListe = [];
        $scope.StokHarListe = [];
        $scope.CariHarListe = [];

        $scope.IslemListeSelectedIndex = -1;

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

        $scope.EvrakLock = false;
        $scope.BarkodLock = false;

        $scope.TblLoading = true; 
       
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
                db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(Data)
                {   
                    $scope.StokHarListe = Data;
                });

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
    function CariHarInsert(pCallback)
    {   
        let Vergi = [0,0,0,0,0,0,0,0,0,0];
        for(let i = 0;i < Vergi.length;i++)
        {
            Vergi[$scope.Stok[0].TOPTANVERGIPNTR - 1] = $scope.Stok[0].KDV;
        } 

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
            $scope.CariDovizCinsi, //DCİNS
            $scope.CariDovizKuru, //DKUR
            $scope.CariAltDovizKuru, //ALTDKUR
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
            0, //VERİPNTR
            Vergi[0], //VERGİ1
            Vergi[1], //VERGİ2
            Vergi[2], //VERGİ3
            Vergi[3], //VERGİ4
            Vergi[4], //VERGİ5
            Vergi[5], //VERGİ6
            Vergi[6], //VERGİ7
            Vergi[7], //VERGİ8
            Vergi[8], //VERGİ9
            Vergi[9], //VERGİ10
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
            if(typeof InsertResult.result.err == 'undefined')
            {
                $scope.ChaGuid = InsertResult.result.recordset[0].cha_Guid;
                $scope.InsertLock = false;
                db.GetData($scope.Firma,'CariHarGetir',[$scope.Seri,$scope.Sira,$scope.ChaEvrakTip],function(data)
                {
                    $scope.CariHarListe = data;
                    pCallback(true);
                });
            }
            else
            {
                pCallback(false);
            }
        });
    }
    function CariHarUpdate(pCallback)
    {   
        $scope.TopIskonto = 
        (db.SumColumn($scope.StokHarListe,"sth_iskonto1") + db.SumColumn($scope.StokHarListe,"sth_iskonto2") + 
        db.SumColumn($scope.StokHarListe,"sth_iskonto3") + db.SumColumn($scope.StokHarListe,"sth_iskonto4") + db.SumColumn($scope.StokHarListe,"sth_iskonto5"))
        
        let AraToplam = db.SumColumn($scope.StokHarListe,"sth_tutar");
        let Meblag = ((db.SumColumn($scope.StokHarListe,"sth_tutar") - $scope.TopIskonto) + db.SumColumn($scope.StokHarListe,"sth_vergi"));
        let Vergi = [0,0,0,0,0,0,0,0,0,0];

        for(let i = 0;i < Vergi.length;i++)
        {
            Vergi[i] = db.SumColumn($scope.StokHarListe,"sth_vergi","sth_vergi_pntr = " + (i + 1));
        } 

        var CariHarUpdate = 
        [
            Meblag, //MEBLAG
            AraToplam, // ARATOPLAM
            Vergi[0],  //CHARVERGİ1
            Vergi[1],  //CHAVERGİ2
            Vergi[2],  //CHAVERHGİ3
            Vergi[3],  //CHAVERGİ4
            Vergi[4],  //CHAVERGİ5
            Vergi[5],  //CHAVERGİ6
            Vergi[6],  //CHAVERGİ7
            Vergi[7],  //CHAVERGİ8
            Vergi[8],  //CHAVERGİ9
            Vergi[9],  //CHAVERGİ10
            0,  //FTISKONTO
            0,  //FTISKONTO2
            0,  //FTISKONTO3
            0,  //FTISKONTO4
            0,  //FTISKONTO5
            0,  //FTISKONTO6
            0,  //OTVTUTARI
            $scope.StokHarListe[0].sth_fat_uid
        ];
        
        db.ExecuteTag($scope.Firma,'CariHarUpdate',CariHarUpdate,function(InsertResult)
        {   
            db.GetData($scope.Firma,'CariHarGetir',[$scope.Seri,$scope.Sira,$scope.ChaEvrakTip],function(data)
            {
                $scope.CariHarListe = data;
            });

            if(typeof pCallback != 'undefined')
            {
                pCallback(InsertResult);
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
        ToplamMiktarHesapla();
        
        $window.document.getElementById("Barkod").focus();
    }
    function StokBarkodGetir(pBarkod)
    {
        if(pBarkod != '')
        {   
            db.StokBarkodGetir($scope.Firma,pBarkod,$scope.DepoNo,async function(BarkodData)
            {   
                if(BarkodData.length > 0)
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
                        AlisSatis : ($scope.EvrakTip === 3 ? 0 : 1)
                    };
                    await db.FiyatGetir($scope.Firma,BarkodData,FiyatParam,UserParam[ParamName],function()
                    {   
                        $scope.MiktarFiyatValid();
                        $scope.BarkodLock = true;
                        $scope.$apply();
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
                            db.GetData($scope.Firma,'PartiLotGetir',[$scope.Stok[0].KODU,$scope.CDepo,$scope.Stok[0].PARTI,$scope.Stok[0].LOT],function(data)
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
    function StokHarInsert(pCallback)
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
            ($scope.ChaGuid != "") ? $scope.ChaGuid : '00000000-0000-0000-0000-000000000000' , //sth_fat_uid,
            $scope.DepoNo, //GİRİSDEPONO
            0,             //CİKİSDEPONO
            $scope.Tarih, //MALKABULSEVKTARİHİ
            '', // CARİSORUMLULUKMERKEZİ
            $scope.Sorumluluk,
            0,  // VERGİSİZFL
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
                db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(Data)
                {   
                    if($scope.Stok[0].BEDENPNTR != 0 && $scope.Stok[0].RENKPNTR != 0)
                    {
                        BedenHarInsert(InsertResult.result.recordset[0].sth_Guid);
                    } 

                    InsertAfterRefresh(Data);
                    $scope.InsertLock = false;
                    if(UserParam.Sistem.Titresim == 1)
                    {
                        Confirmation();
                    }
                    
                    if(typeof pCallback != 'undefined')
                    {
                        pCallback(true);
                    }
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
            $scope.ToplamKdv +=  (value.sth_tutar - (value.sth_iskonto1 + value.sth_iskonto2 + value.sth_iskonto3 + value.sth_iskonto4 + value.sth_iskonto5 + value.sth_iskonto6)) * (value.TOPTANVERGI / 100);
        });
        $scope.NetToplam = $scope.AraToplam - $scope.ToplamIndirim;
        $scope.GenelToplam = $scope.NetToplam + $scope.ToplamKdv;
    }
    function UpdateData(pData)
    {    
        db.ExecuteTag($scope.Firma,'StokHarUpdate',pData.Param,function(InsertResult)
        {   
            if(typeof(InsertResult.result.err) == 'undefined')
            {
                db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(FaturaData)
                {   
                    if(pData.BedenPntr != 0 || pData.RenkPntr != 0)
                    {   
                        let value = db.ListEqual($scope.BedenHarListe,{BdnHar_Har_uid : pData.Guid, BdnHar_BedenNo : Kirilim(pData.BedenPntr,pData.RenkPntr)});
                        if(value != null)
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
                            BedenHarUpdate(Data);
                        }
                        else
                        {
                            BedenHarInsert(pData.Guid);
                        }
                    }

                    InsertAfterRefresh(FaturaData);
                    if(UserParam.Sistem.Titresim == 1)
                    {
                        Confirmation();
                    }

                    CariHarUpdate(function(data)
                    {   
                        if(data.result.err)
                        {
                            console.log(data.result.err)
                        }
                    });
                });
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
    function ToplamMiktarHesapla()
    {
        $scope.ToplamSatir = 0;

        angular.forEach($scope.StokHarListe,function(value)
        {
            $scope.ToplamSatir += 1 ;
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
            }
            
        });
    }
    $scope.BtnStokGridSec = function()
    {
        $("#MdlStokGetir").modal('hide');
        StokBarkodGetir($scope.Barkod);
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
    $scope.BirimChange = function()
    {
        if($scope.BirimListe.length > 0)
        {
            $scope.Stok[0].BIRIMPNTR = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].BIRIMPNTR;
            $scope.Stok[0].BIRIM = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].BIRIM;
            $scope.Stok[0].CARPAN = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].KATSAYI;
            console.log($scope.Birim)
            $scope.MiktarFiyatValid();
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
            for(i = 0;i < $scope.StokHarListe.length;i++)
            {
                $scope.IskTplTutar += $scope.StokHarListe[i].sth_tutar;
                $scope.IskTutar1 += $scope.StokHarListe[i].sth_iskonto1;
                $scope.IskTplTutar1 = $scope.IskTplTutar - $scope.IskTutar1;
                $scope.IskTutar2 += $scope.StokHarListe[i].sth_iskonto2;
                $scope.IskTplTutar2 = $scope.IskTplTutar1 - $scope.IskTutar2;
                $scope.IskTutar3 += $scope.StokHarListe[i].sth_iskonto3;
                $scope.IskTplTutar3 = $scope.IskTplTutar2 - $scope.IskTutar3;
                $scope.IskTutar4 += $scope.StokHarListe[i].sth_iskonto4;
                $scope.IskTplTutar4 = $scope.IskTplTutar3 - $scope.IskTutar4;
                $scope.IskTutar5 += $scope.StokHarListe[i].sth_iskonto5;
                $scope.IskTplTutar5 = $scope.IskTplTutar4 - $scope.IskTutar5;
            }
        }
        else
        {
            $scope.IskTplTutar = $scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_tutar;
            $scope.IskTutar1 = $scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_iskonto1;
            $scope.IskTplTutar1 = $scope.IskTplTutar - $scope.IskTutar1;
            $scope.IskTutar2 = $scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_iskonto2;
            $scope.IskTplTutar2 = $scope.IskTplTutar1 - $scope.IskTutar2;
            $scope.IskTutar3 = $scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_iskonto3;
            $scope.IskTplTutar3 = $scope.IskTplTutar2 - $scope.IskTutar3;
            $scope.IskTutar4 = $scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_iskonto4;
            $scope.IskTplTutar4 = $scope.IskTplTutar3 - $scope.IskTutar4;
            $scope.IskTutar5 = $scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_iskonto5;
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
    $scope.BtnIskontoKaydet = function()
    {   
        if($scope.IskontoTip == 0)
        {   
            for(i = 0;i < $scope.StokHarListe.length;i++)
            {
                $scope.StokHarListe[i].sth_iskonto1 = $scope.StokHarListe[i].sth_tutar * ($scope.IskYuzde1 / 100);
                $scope.StokHarListe[i].sth_iskonto2 = ($scope.StokHarListe[i].sth_tutar - $scope.StokHarListe[i].sth_iskonto1) * ($scope.IskYuzde2 / 100);
                $scope.StokHarListe[i].sth_iskonto3 = ($scope.StokHarListe[i].sth_tutar - ($scope.StokHarListe[i].sth_iskonto1 + $scope.StokHarListe[i].sth_iskonto2)) * ($scope.IskYuzde3 / 100);
                $scope.StokHarListe[i].sth_iskonto4 = ($scope.StokHarListe[i].sth_tutar - ($scope.StokHarListe[i].sth_iskonto1 + $scope.StokHarListe[i].sth_iskonto2 + $scope.StokHarListe[i].sth_iskonto3)) * ($scope.IskYuzde4 / 100);
                $scope.StokHarListe[i].sth_iskonto5 = ($scope.StokHarListe[i].sth_tutar - ($scope.StokHarListe[i].sth_iskonto1 + $scope.StokHarListe[i].sth_iskonto2 + $scope.StokHarListe[i].sth_iskonto3 + $scope.StokHarListe[i].sth_iskonto4)) * ($scope.IskYuzde5 / 100);

                $scope.FiyatEdit = $scope.StokHarListe[i].sth_tutar / $scope.StokHarListe[i].sth_miktar;
                $scope.MiktarEdit = $scope.StokHarListe[i].sth_miktar;

                $scope.Update(i);
            }
        }
        else
        {
            let i = $scope.IslemListeSelectedIndex;

            $scope.StokHarListe[i].sth_iskonto1 = $scope.StokHarListe[i].sth_tutar * ($scope.IskYuzde1 / 100);
            $scope.StokHarListe[i].sth_iskonto2 = ($scope.StokHarListe[i].sth_tutar - $scope.StokHarListe[i].sth_iskonto1) * ($scope.IskYuzde2 / 100);
            $scope.StokHarListe[i].sth_iskonto3 = ($scope.StokHarListe[i].sth_tutar - ($scope.StokHarListe[i].sth_iskonto1 + $scope.StokHarListe[i].sth_iskonto2)) * ($scope.IskYuzde3 / 100);
            $scope.StokHarListe[i].sth_iskonto4 = ($scope.StokHarListe[i].sth_tutar - ($scope.StokHarListe[i].sth_iskonto1 + $scope.StokHarListe[i].sth_iskonto2 + $scope.StokHarListe[i].sth_iskonto3)) * ($scope.IskYuzde4 / 100);
            $scope.StokHarListe[i].sth_iskonto5 = ($scope.StokHarListe[i].sth_tutar - ($scope.StokHarListe[i].sth_iskonto1 + $scope.StokHarListe[i].sth_iskonto2 + $scope.StokHarListe[i].sth_iskonto3 + $scope.StokHarListe[i].sth_iskonto4)) * ($scope.IskYuzde5 / 100);
            
            $scope.FiyatEdit = $scope.StokHarListe[i].sth_tutar / $scope.StokHarListe[i].sth_miktar;
            $scope.MiktarEdit = $scope.StokHarListe[i].sth_miktar;

            $scope.Update(i);
        }

        $("#MdlIskontoEkran").modal('hide');
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
        db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
            {
                if(data.length > 0)
                {
                    Init();
                    InitCariGrid();
                    InitIslemGrid(); 
    
                    $scope.Seri = data[0].sth_evrakno_seri;
                    $scope.Sira = data[0].sth_evrakno_sira;
                    $scope.EvrakTip = data[0].sth_evraktip.toString();
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

                    db.GetData($scope.Firma,'CariHarGetir',[$scope.Seri,$scope.Sira,$scope.ChaEvrakTip],function(Data)
                    {
                        $scope.CariHarListe = Data;
                    });
    
                    $scope.AraToplam = 0;
                    $scope.ToplamIndirim = 0;
                    $scope.NetToplam = 0;
                    $scope.ToplamKdv = 0;
                    $scope.GenelToplam = 0;
    
                    $scope.CmbCariAra = "0";
                    $scope.TxtCariAra = "";
                    
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
                    db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(e){$scope.SorumlulukListe = e; $scope.Sorumluluk = data[0].sth_stok_srm_merkezi});
                    db.FillCmbDocInfo($scope.Firma,'CmbPersonelGetir',function(e){$scope.PersonelListe = e; $scope.Personel = data[0].sth_plasiyer_kodu});
                    db.FillCmbDocInfo($scope.Firma,'CmbProjeGetir',function(e){$scope.ProjeListe = e; $scope.Proje = data[0].sth_proje_kodu});
                    db.FillCmbDocInfo($scope.Firma,'CmbOdemePlanGetir',function(e){$scope.OdemePlanListe = e; $scope.OdemeNo = data[0].sth_odeme_op.toString()});
                    
                    $scope.StokHarListe = data;
                    $("#TblIslem").jsGrid({data : $scope.StokHarListe});  
    
                    DipToplamHesapla();
                    ToplamMiktarHesapla()

                    $scope.EvrakLock = true;
                    $scope.BarkodLock = false;
    
                    angular.element('#MdlEvrakGetir').modal('hide');

                    alertify.alert("<a style='color:#3e8ef7''>" + $scope.ToplamSatir + " " + "Satır Kayıt Başarıyla Getirildi.. !" + "</a>" );

                    BarkodFocus();
                }
                else
                {
                    angular.element('#MdlEvrakGetir').modal('hide');
                    alertify.alert("<a style='color:#3e8ef7''>" + "Belge Bulunamadı !" + "</a>" );
                }
        });            
    }
    $scope.EvrakTipChange = async function()
    {
        if(ParamName == "AlisFatura")
        {   
            if($scope.CmbEvrakTip == 0) //Perakende Satış Faturası
            {
               $scope.EvrakTip = 3;
               $scope.NormalIade = 0;
               $scope.Tip = 1;
               $scope.Cins = 1;
               $scope.ChaEvrakTip = 0;
               $scope.ChaTip = 0;
               $scope.ChaCins = 7;
               $scope.ChaTicaretTuru = 1;
            }
            else if($scope.CmbEvrakTip == 1) //Toptan Satış Faturası
            {
                $scope.EvrakTip = 3;
                $scope.NormalIade = 0;
                $scope.Tip = 0;
                $scope.Cins = 0;
                $scope.ChaEvrakTip = 0;
                $scope.ChaTip = 1;
                $scope.ChaCins = 6;
                $scope.ChaTicaretTuru = 0;
            }
            else if($scope.CmbEvrakTip == 2) //İhraç Kayıtlı Yurtiçi Ticaret
            {
                $scope.EvrakTip = 3;
                $scope.NormalIade = 0;
                $scope.Tip = 0;
                $scope.Cinsi = 2;
                $scope.ChaEvrakTip = 0;
                $scope.ChaTip = 1;
                $scope.ChaCins = 13;
                $scope.ChaTicaretTuru = 2;
            }
            else if($scope.CmbEvrakTip == 3) //İhraç Kayıtlı Yurtdışı Ticaret
            {
                $scope.EvrakTip = 3;
                $scope.NormalIade = 0;
                $scope.Tip = 0;
                $scope.Cinsi = 2;
                $scope.ChaEvrakTip = 0;
                $scope.ChaTip = 1;
                $scope.ChaCins = 13;
                $scope.ChaTicaretTuru = 4;
            }
        }
        else
        {
            if($scope.CmbEvrakTip == 0) //Perakende Satış Faturası
            {
               $scope.EvrakTip = 4;
               $scope.NormalIade = 0;
               $scope.Tip = 1;
               $scope.Cins = 1;
               $scope.ChaEvrakTip = 63;
               $scope.ChaTip = 0;
               $scope.ChaCins = 7;
               $scope.ChaTicaretTuru = 1;
            }
            else if($scope.CmbEvrakTip == 1) //Toptan Satış Faturası
            {
                $scope.EvrakTip = 4;
                $scope.NormalIade = 0;
                $scope.Tip = 1;
                $scope.Cins = 0;
                $scope.ChaEvrakTip = 63;
                $scope.ChaTip = 0;
                $scope.ChaCins = 6;
                $scope.ChaTicaretTuru = 0;
            }
            else if($scope.CmbEvrakTip == 2) //İhraç Kayıtlı Yurtiçi Ticaret
            {
                $scope.EvrakTip = 4;
                $scope.NormalIade = 0;
                $scope.Tip = 1;
                $scope.Cinsi = 2;
                $scope.ChaEvrakTip = 63;
                $scope.ChaTip = 0;
                $scope.ChaCins = 13;
                $scope.ChaTicaretTuru = 2;
            }
            else if($scope.CmbEvrakTip == 3) //İhraç Kayıtlı Yurtdışı Ticaret
            {
                $scope.EvrakTip = 4;
                $scope.NormalIade = 0;
                $scope.Tip = 1;
                $scope.Cinsi = 2;
                $scope.ChaEvrakTip = 63;
                $scope.ChaTip = 0;
                $scope.ChaCins = 13;
                $scope.ChaTicaretTuru = 4;
            }
        }
        await db.MaxSira($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip],function(data){$scope.Sira = data});
    }
    $scope.EvrakDelete = function(pAlisSatis)
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Bu Belgeyi Silmek İstediğinize Eminmisiniz ?', 
        function()
        { 
            if($scope.StokHarListe.length > 0)
            {
                if(UserParam[ParamName].EvrakSil == 0)
                {
                    db.ExecuteTag($scope.Firma,'StokHarEvrDelete',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
                    {
                        if(typeof(data.result.err) == 'undefined')
                        {
                            angular.forEach($scope.StokHarListe,function(value)
                            {
                                db.ExecuteTag($scope.Firma,'CariHarEvrDelete',[$scope.Seri,$scope.Sira,$scope.ChaEvrakTip],function(data)
                                {   
                                    if(typeof(data.result.err) != 'undefined')
                                    {
                                        console.log(data.result.err);
                                    }
                                });

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
                            ParamName = "AlisFatura";
                            $scope.YeniEvrak(0)
                        }
                        else
                        {
                            ParamName = "SatisFatura";
                            $scope.YeniEvrak(1)
                        }
                    });
                    alertify.alert("<a style='color:#3e8ef7''>" + "Evrak Silme İşlemi Başarıyla Gerçekleşti !" + "</a>" );
                }
                else
                {
                    alertify.okBtn("Tamam");
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
    $scope.Insert = function()
    {
        if(typeof($scope.Stok[0].KODU) != 'undefined')
        {   
            $scope.InsertLock = true
            if(typeof $scope.CariHarListe == 'undefined' || $scope.CariHarListe.length == 0 )
            {   
                CariHarInsert(function(pResult)
                {
                    if(pResult)
                    {
                        StokHarInsert();                        
                    }
                });
                $scope.InsertLock = false;
            }
            else
            {   
                if(UserParam.Sistem.SatirBirlestir == 0 || $scope.Stok[0].RENKPNTR != 0 || $scope.Stok[0].BEDENPNTR != 0 || $scope.Stok[0].DETAYTAKIP == 1 || $scope.Stok[0].DETAYTAKIP == 2)
                {
                    StokHarInsert(function(pResult)
                    {
                        if(pResult)
                        {
                            CariHarUpdate(); 
                        }
                    });
                    $scope.InsertLock = false;                    
                }
                else
                {   
                    //Liste İçerisinde StokKodu Aynı Olanlar Aranıyor. 17.09.2019 - MahiR
                    let value = db.ListEqual($scope.StokHarListe,{sth_stok_kod : $scope.Stok[0].KODU});
                    if(value != null)
                    {   
                        let TmpFiyat  = value.sth_tutar / value.sth_miktar
                        let TmpMiktar = value.sth_miktar + ($scope.Miktar * $scope.Stok[0].CARPAN);
                        let Data = 
                        {
                            Param :
                            [
                                TmpMiktar,
                                TmpMiktar,
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

                        UpdateData(Data);
                        $scope.InsertLock = false
                    }
                    else
                    {
                        StokHarInsert(function(pResult)
                        {
                            if(pResult)
                            {
                                CariHarUpdate(); 
                            }
                        });
                        $scope.InsertLock = false; 
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
            this['IskTutar' + pIndex] = $filter('number')(this['IskTutar' + pIndex],2);
        }
        else
        {
            this['IskYuzde' + pIndex] = (100 * this['IskTutar' + pIndex]) / TmpTutar;
            this['IskYuzde' + pIndex] = $filter('number')(this['IskYuzde' + pIndex],2);
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

            this['IskTplTutar' + i] = $filter('number')(this['IskTplTutar' + i],2);
        }
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
                    db.ExecuteTag($scope.Firma,'StokHarSatirDelete',[$scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_Guid],function(data)
                    {  
                        if(typeof(data.result.err) == 'undefined')
                        {    
                            db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
                            {
                                db.ExecuteTag($scope.Firma,'BedenHarDelete',[$scope.StokHarListe[$scope.IslemListeSelectedIndex].sth_Guid,11],function(data)
                                {
                                    if(typeof(data.result.err) != 'undefined')
                                    {
                                        console.log(data.result.err);
                                    }       
                                });

                                InsertAfterRefresh(data);

                                if($scope.StokHarListe.length > 0)
                                {
                                    CariHarUpdate(function(data)
                                    {
                                        console.log(data)
                                    });
                                }
                                else
                                {                                       
                                    db.ExecuteTag($scope.Firma,'CariHarSatirDelete',[$scope.CariHarListe[0].cha_Guid],function(data)
                                    {   
                                        //ALIŞ = 0 SATIŞ = 1
                                        if(pAlisSatis == 0)
                                        {
                                            ParamName = "AlisFatura";
                                            $scope.YeniEvrak(0)
                                        }
                                        else
                                        {
                                            ParamName = "SatisFatura";
                                            $scope.YeniEvrak(1)
                                        }
                                    });

                                    
                                }
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
                    alertify.alert("<a style='color:#3e8ef7''>" + "Evrak Silme Yetkiniz Yok !" + "</a>" );
                }
            }
            else
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Seçili Satır Olmadan Evrak Silemezsiniz !" + "</a>" );
            }
        },
        function(){});
    }
    $scope.YeniEvrak = async function (pAlisSatis)
    {
        Init();
        InitCariGrid();
        InitStokGrid();
        InitIslemGrid();
        InitPartiLotGrid();

       //ALIŞ = 0 SATIŞ = 1
        if(pAlisSatis == 0)
        {
            ParamName = "AlisFatura";
        }
        else
        {
            ParamName = "SatisFatura";
        }

        $scope.EvrakLock = false;
        $scope.Seri = UserParam[ParamName].Seri;
        $scope.BelgeNo = UserParam[ParamName].BelgeNo;
        $scope.CmbEvrakTip = UserParam[ParamName].EvrakTip;
        $scope.CariKodu = UserParam[ParamName].Cari;

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
        db.FillCmbDocInfo($scope.Firma,'CmbProjeGetir',function(data)
        {
            $scope.ProjeListe = data; 
            $scope.Proje = UserParam[ParamName].Proje
        });
        db.FillCmbDocInfo($scope.Firma,'CmbOdemePlanGetir',function(data)
        {
            $scope.OdemePlanListe = data; 
            $scope.OdemeNo = '0'
        });

        $scope.EvrakTipChange();
        BarkodFocus();
    }
    $scope.SorumlulukChange = function()
    {
        $scope.SorumlulukListe.forEach(function(item) 
        {
            if(item.KODU == $scope.Sorumluluk)
                $scope.SorumlulukAdi = item.ADI;
        });
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
    $scope.PersonelChange = function()
    {
        $scope.PersonelListe.forEach(function(item)
        {
            if(item.KODU == $scope.Personel)
            $scope.PersonelAdi = item.ADI;
        });
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
                ($scope.ChaGuid != "") ? $scope.ChaGuid : '00000000-0000-0000-0000-000000000000' , //sth_fat_uid,
            ],
            BedenPntr : $scope.StokHarListe[pIndex].BEDENPNTR,
            RenkPntr : $scope.StokHarListe[pIndex].RENKPNTR,
            Miktar : $scope.MiktarEdit,
            Guid :  $scope.StokHarListe[pIndex].sth_Guid
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
        }
    }
    $scope.StokListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( StokSelectedRow ) { StokSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        StokSelectedRow = $row;
        
        $scope.Barkod = $scope.StokListe[pIndex].KODU;
    }
    $scope.IslemListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( IslemSelectedRow ) { IslemSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        IslemSelectedRow = $row;
        $scope.IslemListeSelectedIndex = pIndex;
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
            alertify.alert("<a style='color:#3e8ef7''>" + "Gösterilecek Evrak Bulunamadı !" + "</a>" );
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
    $scope.MainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TbCariSec").removeClass('active');
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
