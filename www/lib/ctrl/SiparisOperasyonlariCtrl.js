function SiparisOperasyonlariCtrl($scope,$window,$timeout,db,$filter)
{
    let IslemSelectedRow = null;
    let SiparisKabulListeSelectedRow = null;
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
            'page_title' : 'Siparis',
            'page_path': '/Siparis'
        });
        

        $scope.Firma = $window.sessionStorage.getItem('Firma');
        UserParam = Param[$window.sessionStorage.getItem('User')];

        $scope.Seri = "";
        $scope.Sira;
        $scope.ProjeKod = "";
        $scope.EvrakTip = 0;
        $scope.CariKodu = "";  
        $scope.CariAdi = "";
        $scope.CariFiyatListe = 0;
        $scope.CariDovizCinsi = 0;
        $scope.CariDovizKuru = 0;
        $scope.CariAltDovizKuru = 0;
        $scope.CariIskontoKodu = "";        
        $scope.BelgeNo = "";
        $scope.DepoNo;
        $scope.DepoAdi;
        $scope.Tarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.SipTarih1 = new Date().toLocaleDateString('tr-TR',{ year: 'numeric', month: 'numeric', day: 'numeric' });
        $scope.SipTarih2 = new Date().toLocaleDateString('tr-TR',{ year: 'numeric', month: 'numeric', day: 'numeric' });
        $scope.Sorumluluk = "";
        $scope.SorumlulukAdi = "";
        $scope.Personel;
        $scope.PersonelAdi;
        $scope.Proje = "";
        $scope.OdemeNo = "0";
        $scope.Barkod = "";
        $scope.Birim = "1";
        $scope.StokGridTip = "0";
        $scope.StokGridText = "";
        $scope.ToplamSatir = 0;
        $scope.CariBakiye = "";
        $scope.Adres = "";
        $scope.Adres1 = "";
        $scope.Adres2 = "";
        $scope.CariVDADI = "";
        $scope.CariVDNO = "";
        $scope.Fiyat = "";
        $scope.AciklamaTip = 21;
        $scope.AciklamaEvrTip = 0;
        $scope.AciklamaHarTip = 0;
        $scope.EvrakDovizTip = "";
        $scope.SipSeriSira = "";
        $scope.CmbEvrakTip = "0"

        $scope.SipSeri = "";
        $scope.SipSira = 0;

        $scope.AciklamaGuid = ''
        $scope.Aciklama1 = ''
        $scope.Aciklama2 = ''
        $scope.Aciklama3 = ''
        $scope.Aciklama4 = ''
        $scope.Aciklama5 = ''

            

        $scope.IslemListeSelectedIndex = -1;  
        $scope.PartiLotListeSelectedIndex = 0;
        $scope.ProjeEvrakSelectedIndex  = 0;

        $scope.Loading = false;
        $scope.TblLoading = true;
    }
    function InitSiparisKabulListeGrid()
    {
        console.log(1)
        $("#TblSiparisKabulListe").jsGrid({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.SiparisKabulListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: [
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
                }, 
                {
                    name: "CARIADI",
                    title: "CARI ADI",
                    type: "number",
                    align: "center",
                    width: 300
                }, 
                {
                    name: "BMIKTAR",
                    title: "BİRİM",
                    type: "number",
                    align: "center",
                    width: 100
                }, 
                {
                    name: "SATIR",
                    title: "SATIR",
                    type: "number",
                    align: "center",
                    width: 50
                },
                {
                    name: "TESLIMTARIH",
                    title: "TESLIM TARIHI",
                    type: "text",
                    align: "center",
                    width: 120
                }
            ],
            rowClick: function(args)
            {
                $scope.SiparisKabulListeRowClick(args.itemIndex,args.item,this);
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
            data : $scope.SiparisListe,
            paging : true,
            pageIndex : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
           
            fields: 
            [
            {
                name: "NO",
                title: "NO",
                type: "number",
                align: "center",
                width: 75
                
            }, 
            {
                name: "sip_stok_kod",
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
                name: "sip_miktar",
                title: "MİKTAR",
                type: "number",
                align: "center",
                width: 100
            }, 
            {
                name: "FIYAT",
                title: "FİYAT",
                type: "number",
                align: "center",
                width: 100
            }, 
            {
                name: "TUTAR",
                title: "TUTAR",
                type: "number",
                align: "center",
                width: 100
            }, 
            {
                name: "sip_iskonto_1",
                title: "IND1",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sip_iskonto_2",
                title: "IND2",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sip_iskonto_3",
                title: "IND3",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sip_iskonto_4",
                title: "IND4",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sip_iskonto_5",
                title: "IND5",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sip_iskonto_6",
                title: "IND6",
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
    function Beep()
    {
        navigator.notification.vibrate(1000);
        document.getElementById("Beep").play();
    }
    function Confirmation()
    {
        navigator.vibrate([100,100,200,100,300]);
    }
    function DipToplamHesapla()
    {
        $scope.AraToplam = 0;
        $scope.ToplamIndirim = 0;
        $scope.ToplamKdv = 0;
        $scope.NetToplam = 0;
        $scope.GenelToplam = 0;

        angular.forEach($scope.SiparisListe,function(value)
        {
            $scope.AraToplam += value.sip_tutar;
            $scope.ToplamIndirim += (value.sip_iskonto_1 + value.sip_iskonto_2 + value.sip_iskonto_3 + value.sip_iskonto_4 + value.sip_iskonto_5 + value.sip_iskonto_6);
            $scope.ToplamKdv +=  (value.sip_tutar - (value.sip_iskonto_1 + value.sip_iskonto_2 + value.sip_iskonto_3 + value.sip_iskonto_4 + value.sip_iskonto_5 + value.sip_iskonto_6)) * (value.VERGIPNTR / 100);
        });
        $scope.NetToplam = $scope.AraToplam - $scope.ToplamIndirim;
        $scope.GenelToplam = $scope.NetToplam + $scope.ToplamKdv;
    }
    function InsertAfterRefresh(pData)
    {    
        $scope.EvrakLock = true;
        $scope.BarkodLock = false;

        $scope.SiparisListe = pData;
        $("#TblIslem").jsGrid({data : $scope.SiparisListe});    
        $scope.BtnTemizle();
        DipToplamHesapla();
        ToplamMiktarHesapla();
        
        $window.document.getElementById("Barkod").focus();
    }  
    function InsertData()
    {   
        var InsertData = 
        [
            UserParam.MikroId,
            UserParam.MikroId,
            0, //FIRMA NO
            0, //ŞUBE NO
            $scope.Tarih,
            $scope.TeslimTarihi,
            $scope.EvrakTip,
            0, //CİNSİ
            $scope.Seri,
            $scope.Sira,
            $scope.BelgeNo,
            $scope.Tarih,
            $scope.Personel,
            $scope.CariKodu,
            $scope.Stok[0].KODU,
            $scope.Stok[0].FIYAT,
            $scope.Miktar * $scope.Stok[0].CARPAN,
            $scope.Stok[0].BIRIMPNTR,
            0, //TESLİM MİKTARI
            $scope.Stok[0].TUTAR,
            $scope.Stok[0].ISK.TUTAR1, //ISKONTO TUTAR 1
            $scope.Stok[0].ISK.TUTAR2, //ISKONTO TUTAR 2
            $scope.Stok[0].ISK.TUTAR3, //ISKONTO TUTAR 3
            $scope.Stok[0].ISK.TUTAR4, //ISKONTO TUTAR 4
            $scope.Stok[0].ISK.TUTAR5, //ISKONTO TUTAR 5
            $scope.Stok[0].ISK.TUTAR6, //ISKONTO TUTAR 6
            $scope.Stok[0].TOPTANVERGIPNTR,
            $scope.Stok[0].KDV,
            $scope.OdemeNo,
            '', //AÇIKLAMA
            $scope.DepoNo,
            $scope.SipOnayKulNo,
            $scope.Sorumluluk,
            $scope.Sorumluluk,
            $scope.CariDovizCinsi,
            $scope.CariDovizKuru,
            $scope.CariAltDovizKuru,
            1, //ADRES NO
            $scope.Stok[0].ISK.TIP1, //ISKONTO TİP 1
            $scope.Stok[0].ISK.TIP2, //ISKONTO TİP 2
            $scope.Stok[0].ISK.TIP3, //ISKONTO TİP 3
            $scope.Stok[0].ISK.TIP4, //ISKONTO TİP 4
            $scope.Stok[0].ISK.TIP5, //ISKONTO TİP 5
            $scope.Stok[0].ISK.TIP6, //ISKONTO TİP 6
            0, //SATIR ISKONTO TİP 1
            0, //SATIR ISKONTO TİP 2
            0, //SATIR ISKONTO TİP 3
            0, //SATIR ISKONTO TİP 4
            0, //SATIR ISKONTO TİP 5
            0, //SATIR ISKONTO TİP 6
            $scope.Stok[0].PARTI,
            $scope.Stok[0].LOT,
            $scope.Proje,
            $scope.CariFiyatListe,
            0, //REZERVASYON MİKTARI
            0  //REZERVASYON TESLİM MİKTARI
        ];
        console.log(InsertData)

        db.ExecuteTag($scope.Firma,'SiparisInsert',InsertData,function(InsertResult)
        {          
            if(typeof(InsertResult.result.err) == 'undefined')
            {                                        
                db.GetData($scope.Firma,'SiparisGetir',[$scope.Seri,$scope.Sira,$scope.CmbEvrakTip,0],function(SiparisData)
                {   
                    if($scope.Stok[0].BEDENPNTR != 0 && $scope.Stok[0].RENKPNTR != 0)
                    {
                        BedenHarInsert(InsertResult.result.recordset[0].sip_Guid);
                    } 
                    InsertAfterRefresh(SiparisData);
                    FisData(SiparisData);  
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
                $scope.InsertLock = false;
            }
        });
    }

    function ToplamMiktarHesapla()
    {
        $scope.ToplamSatir = 0;

        angular.forEach($scope.SiparisListe,function(value)
        {
            $scope.ToplamSatir += 1 ;
        });
    }

    $scope.BtnOnlineYazdir = function()
    {   
        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "UPDATE SIPARISLER SET sip_special1 = 1 " +
                    "WHERE sip_evrakno_seri = @sip_evrakno_seri AND sip_evrakno_sira = @sip_evrakno_sira AND sip_tip = @sip_tip ",
            param:  ['sip_evrakno_seri','sip_evrakno_sira','sip_tip'],
            type:   ['string|25','int','int',],
            value:  [$scope.Seri,$scope.Sira,$scope.CmbEvrakTip]
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
    $scope.YeniEvrak =  function ()
    {

        console.log(1)
        Init();
        InitIslemGrid();
       
        InitSiparisKabulListeGrid()
        $("#TblSiparisKabulListe").jsGrid({data : ''});


        
        $scope.EvrakLock = false;

        console.log($scope.Firma)
        db.DepoGetir($scope.Firma,[''],function(data)
        {   
            $scope.DepoListe = data; 
            $scope.DepoNo = 1;
            console.log($scope.DepoListe)
            $scope.DepoListe.forEach(function(item) 
            {
                if(item.KODU == $scope.DepoNo)
                    $scope.DepoAdi = item.ADI;
            });
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
    $scope.SorumlulukChange = function()
    {
        $scope.SorumlulukListe.forEach(function(item) 
        {
            if(item.KODU == $scope.Sorumluluk)
                $scope.SorumlulukAdi = item.ADI;
        });
    }
    $scope.IslemListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( IslemSelectedRow ) { IslemSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        IslemSelectedRow = $row;
        $scope.IslemListeSelectedIndex = pIndex;
    }
    $scope.MainClick = function() 
    {
        $scope.YeniEvrak()
        $("#TbMain").addClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TblAciklama").removeClass('active');
        $("#TbStok").removeClass('active');

    }
    $scope.TbIslemSatirlariClick = function() 
    {
        $("#TbIslemSatirlari").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TblAciklama").removeClass('active');
        $("#TbStok").removeClass('active');

    }
    $scope.ScanBarkod = function()
    {
        cordova.plugins.barcodeScanner.scan(
            function (result) 
            {
                $scope.SipSeriSira = result.text;
                $scope.BtnSiparisKabulListele()
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

    $scope.BtnAciklamaGir = function()
    {
        $("#TbStok").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TbMain").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TblAciklama").addClass('active');
        $scope.AciklamaGetir();
    }
    $scope.BtnAciklamaKaydet = function()
    {
        if($scope.AciklamaGuid == '')
        {
            var InsertData =
            [
                $scope.CmbEvrakTip,
                0,
                $scope.Seri,
                $scope.Sira,
                $scope.Aciklama1,
                $scope.Aciklama2,
                $scope.Aciklama3,
                $scope.Aciklama4,
                $scope.Aciklama5
            ];

            db.ExecuteTag($scope.Firma,'AciklamaInsert',InsertData,function(InsertResult)
            {
                if(typeof(InsertResult.result.err) == 'undefined')
                {
                    $scope.TbIslemSatirlariClick()
                    alertify.alert('Başarıyla Kaydedildi')
                    console.log(InsertResult)
                }
            })
        }
        else
        {
            var  InsertData =  [$scope.Aciklama1,$scope.Aciklama2,$scope.Aciklama3,$scope.Aciklama4,$scope.Aciklama5,$scope.AciklamaGuid]            
            db.ExecuteTag($scope.Firma,'AciklamaUpdate',InsertData,function(InsertResult)
            {
                if(typeof(InsertResult.result.err) == 'undefined')
                {
                    alertify.alert('Başarıyla Kaydedildi')
                    console.log(InsertResult)
                }
            })
        }
    }
    $scope.AciklamaGetir = function()
    {   
        db.GetData($scope.Firma,'AciklamaGetir',[0,0,$scope.Seri,$scope.Sira],function(pData)
        {

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
    $scope.BtnEtiketBas = function()
    {
        console.log($scope.SiparisListe)
        for(i = 0; i < $scope.SiparisListe.length; i++)
        {
            console.log($scope.SiparisListe[i])
            $scope.StokKodu = $scope.SiparisListe[i].sip_stok_kod;
            var InsertData = 
            [
                UserParam.MikroId,
                UserParam.MikroId,
                1,
                $scope.Seri,
                $scope.Sira,
                "",
                $scope.BelgeNo,
                0,
                0,
                $scope.SiparisListe[i].sip_miktar,
                $scope.DepoNo,
                $scope.StokKodu,
                1,
                1,
                $scope.Barkod,
                $scope.SiparisListe[i].sip_miktar
            ]
            db.ExecuteTag($scope.Firma,'EtiketInsert',InsertData,function()
            {

            });
        }
        if(i == $scope.SiparisListe.length)
        {
            alertify.alert("Etiket Yazdırıldı.");
        }
        else
        {
            alertify.alert("Etiket Yazdıralamadı.");
        }
    }
    $scope.BtnSiparisKabulListele = async function()
    {
        $scope.Loading = true;
        $scope.TblLoading = false;
        $scope.SipSeri = $scope.SipSeriSira.split("-",1).pop(1);
        $scope.SipSira = $scope.SipSeriSira.split("-",2).pop(1);

        if($scope.SipSeriSira == "")
        {
            let TmpParam = [$scope.SipTarih1,$scope.SipTarih2,0,$scope.CmbEvrakTip,UserParam.Sistem.PlasiyerKodu,UserParam.Sistem.SiparisOnayListele,$scope.CariKodu];

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
                    $scope.Loading = false;
                    $scope.TblLoading = true;
                    $("#TblSiparisKabulListe").jsGrid({data : $scope.SiparisKabulListe});
                    alertify.alert("İstenilen tarihte sipariş bulunamadı")
                }
                
            });
        }
        else
        {
            $scope.SiparisKabulListele()
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
    $scope.BtnSiparisKabulSec = function()
    {

        $scope.Seri = $scope.SiparisKabulListe[$scope.SiparisKabulListeSelectedIndex].SERI;
        $scope.Sira = $scope.SiparisKabulListe[$scope.SiparisKabulListeSelectedIndex].SIRA;
        $scope.EvrakGetir();
    }
    $scope.EvrakGetir = function()
    {
        db.GetData($scope.Firma,'SiparisGetir',[$scope.Seri,$scope.Sira,$scope.CmbEvrakTip,0],function(data)
        {
            if(data.length > 0)
            {
                Init();
                InitIslemGrid();                
                
                $scope.Seri = data[0].sip_evrakno_seri;
                $scope.Sira = data[0].sip_evrakno_sira;
                $scope.EvrakTip = data[0].sip_tip.toString();
                $scope.CariKodu = data[0].sip_musteri_kod;
                $scope.BelgeNo = data[0].sip_belgeno;
                $scope.Tarih = new Date(data[0].sip_tarih).toLocaleDateString();                
                $scope.TeslimTarihi = new Date(data[0].sip_teslim_tarih).toLocaleDateString();
                $scope.Barkod = "";

                $scope.AraToplam = 0;
                $scope.ToplamIndirim = 0;
                $scope.NetToplam = 0;
                $scope.ToplamKdv = 0;
                $scope.GenelToplam = 0;

                $scope.CmbCariAra = "0";
                $scope.TxtCariAra = "";
                
                
                $scope.SiparisListe = data;
                $("#TblIslem").jsGrid({data : $scope.SiparisListe});  

                db.DepoGetir($scope.Firma,[''],function(e)
                {    
                    $scope.DepoListe = e; 
                    $scope.DepoNo = data[0].sip_depono.toString();
                    $scope.DepoListe.forEach(function(item) 
                    {
                        if(item.KODU == $scope.DepoNo)
                            $scope.DepoAdi = item.ADI;
                    });     
                });

                ToplamMiktarHesapla();
                DipToplamHesapla();
                console.log($scope.EvrakTip)
                $scope.EvrakLock = true;
                $scope.BarkodLock = false;

                angular.element('#MdlEvrakGetir').modal('hide');

                BarkodFocus();
                
                $scope.TbIslemSatirlariClick()
            }
            else
            {
                angular.element('#MdlEvrakGetir').modal('hide');
                alertify.alert("<a style='color:#3e8ef7''>" + "Belge Bulunamadı !" + "</a>" );
            }
        });
    }
    $scope.SiparisKabulListele = function()
    {
        let TmpParam = [$scope.SipSeri,$scope.SipSira,$scope.CmbEvrakTip];


        db.GetPromiseTag($scope.Firma,"SiparisSeriSiraListele",TmpParam,function(data)
        {
            $scope.SiparisKabulListe = data;
            if($scope.SiparisKabulListe.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblSiparisKabulListe").jsGrid({data : $scope.SiparisKabulListe});
            }
            
        });
    }
    $scope.BtnDuzenle = function()
    {

        $("#MdlDuzenle").modal('show');
    }
    $scope.BtnDuzenleKaydet = function(pIndex)
    {
        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "UPDATE SIPARISLER SET sip_depono = @sip_depono " +
                    "WHERE sip_evrakno_seri = @sip_evrakno_seri AND sip_evrakno_sira = @sip_evrakno_sira AND sip_tip = @sip_tip ",
            param:  ['sip_depono','sip_evrakno_seri','sip_evrakno_sira','sip_tip'],
            type:   ['int','string|25','int','int',],
            value:  [$scope.DepoNo,$scope.Seri,$scope.Sira,$scope.CmbEvrakTip]
        }

        db.ExecuteQuery(TmpQuery,function(data)
        {   
            if(typeof(data.result.err) == 'undefined')
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Depo Başarıyla Değiştirildi !" + "</a>" ); 
                angular.element('#MdlDuzenle').modal('hide');
            }
            else
            {
                alertify.alert("<a style='color:#3e8ef7''>" + " İşleminde Hata !" + "</a>" ); 
            }
        });
    }
}