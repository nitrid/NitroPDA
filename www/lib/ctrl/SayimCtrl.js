function SayimCtrl($scope,$window,$timeout,db)  
{
    let IslemSelectedRow = null;
    let StokSelectedRow = null;
    let PartiLotSelectedRow = null;
    let SeriNoSelectedRow = null;
    $scope.CmbEvrakTip = '0';

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
            'page_title' : 'Sayım Fişi',
            'page_path': '/Sayim'
        });

        UserParam = Param[$window.sessionStorage.getItem('User')];
        $scope.Firma = $window.sessionStorage.getItem('Firma');
        
        $scope.EvrakNo = 1;
        $scope.Barkod = "";
        $scope.Tarih = new Date().toLocaleDateString('tr-TR',{ year: 'numeric', month: 'numeric', day: 'numeric' });
        $scope.Tarih2 = moment(new Date()).format("DDMMYYYY");
        $scope.Tarih2Ters = moment(new Date()).format("YYYYMMDD");
        console.log($scope.Tarih)
        $scope.DepoNo;
        $scope.DepoAdi = "";
        $scope.RafKodu = "";
        $scope.RafTip = 0;
        $scope.Birim = 0;
        $scope.StokGridTip = "0";
        $scope.StokGridText = "";
        $scope.TxtParti = "";
        $scope.LblPartiLotAlert = "";
        $scope.BasimAdet = 0;
        $scope.OkutmaSayisi = 0;
        $scope.SeriNoSayi = 0;

        $scope.DepoListe = [];
        $scope.SayimListe = [];
        $scope.BirimListe = [];
        $scope.StokListe = [];
        $scope.PartiLotListe = [];
        $scope.Stok = [];

        $scope.ToplamMiktar1 = 0;
        $scope.ToplamMiktar2 = 0;
        $scope.ToplamMiktar3 = 0;
        $scope.ToplamMiktar4 = 0;
        $scope.ToplamMiktar5 = 0;
        $scope.ToplamSatir = 0;
        $scope.Aciklama = "";

        $scope.Miktar1 = 1;
        $scope.Miktar2 = 0;
        
        $scope.Miktar = 1;

        // DÜZENLE MODAL
        $scope.MiktarEdit = 0;

        $scope.OtoEkle = false;
        $scope.EvrakLock = false;
        $scope.BarkodLock = false; 
        $scope.IslemListeSelectedIndex = -1; 
        $scope.PartiLotListeSelectedIndex = 0;
        $scope.CmbEvrakTip = "0";

        $scope.Loading = false;
        $scope.TblLoading = true;
    }
    function InitIslemGrid()
    {
        $("#TblIslem").jsGrid({
            responsive: true,
            width: "100%",
            height: "350px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.SayimListe,
            paging : true,
            pageSize: 50,
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
                name: "sym_Stokkodu",
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
                name: "sym_miktar1",
                title: "SAYIM1",
                type: "number",
                align: "center",
                width: 100
            }, 
            {
                name: "sym_miktar2",
                title: "SAYIM2",
                type: "number",
                align: "center",
                width: 100
            }, 
            {
                name: "sym_miktar3",
                title: "SAYIM3",
                type: "number",
                align: "center",
                width: 100
            }, 
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
        ({
            width: "100%",
            height: "500px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.StokListe,
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
                name: "sym_evrakno",
                title: "EVRAKNO",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sym_tarihi",
                title: "TARİH",
                type: "number",
                align: "center",
                width: 75
            },
           ],
            rowClick: function(args)
            {
                $scope.$apply();
            }
        });
    }
    function InitSeriNoGrid()
    {
        $("#TblSeriNo").jsGrid
        ({
            width: "100%",         
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.SeriNoListe,
            paging : true,
            pageSize: 10,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: [
                {
                    name: "SERINO",
                    title: "SERINO",
                    type: "text",
                    align: "center",
                    width: 200
                }, 
                {
                    name: "STOK",
                    title: "STOK",
                    type: "text",
                    align: "center",
                    width: 200
                }, 
            ],
            rowClick: function(args)
            {
                $scope.SeriNoListeRowClick(args.itemIndex,args.item,this);
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
       $scope.OkutmaSayisi = 0;
       $scope.BasimAdet = 0;
       angular.forEach($scope.SayimListe,function(value)
       {
            $scope.ToplamMiktar1 += value.sym_miktar1;
            $scope.ToplamMiktar2 += value.sym_miktar2;
            $scope.ToplamMiktar3 += value.sym_miktar3;
            $scope.ToplamMiktar4 += value.sym_miktar4;
            $scope.ToplamMiktar5 += value.sym_miktar5;
            $scope.ToplamSatir += 1;
            if(value.sym_Stokkodu == $scope.EskiBarkod)
            {
                $scope.OkutmaSayisi += value.sym_miktar2;
                $scope.BasimAdet += value.sym_miktar1;
            }
       });
    }
    function BarkodFocus()
    {
        $timeout( function(){$window.document.getElementById("Barkod").focus();},100);
    }
    function InsertAfterRefresh(pData)
    {
        console.log(pData)
        $scope.EvrakLock = true;
        $scope.BarkodLock = false;
        $scope.EskiBarkod = $scope.Stok[0].KODU;
        console.log($scope.Stok[0].KODU)
        $scope.SayimListe = pData;
        console.log($scope.SayimListe)
        $scope.BtnTemizle();        
        $window.document.getElementById("Barkod").focus();
        ToplamMiktarHesapla();        
    }  
    function InsertData()
    {      
        var InsertData = 
        [
            UserParam.MikroId,
            UserParam.MikroId,
            $scope.Tarih,
            $scope.DepoNo,
            $scope.EvrakNo,
            $scope.Stok[0].KODU,
            $scope.Miktar * ($scope.Stok[0].CARPAN * $scope.Miktar1),
            1,
            $scope.Stok[0].BIRIMPNTR,
            $scope.Stok[0].BARKOD,
            $scope.Stok[0].RENKPNTR,
            $scope.Stok[0].BEDENPNTR,
            $scope.Stok[0].PARTI,
            $scope.Stok[0].LOT,
            ''
        ];
        db.ExecuteTag($scope.Firma,'SayimInsert',InsertData,function(InsertResult)
        {    
            console.log(InsertResult)
            if(typeof(InsertResult.result.err) == 'undefined')
            {     
                if(UserParam.Sayim.RafYonetimi == "1")
                {
                    if($scope.RafKodu != "")
                    {
                        var InsertRafData = 
                        [
                            UserParam.MikroId,
                            UserParam.MikroId,
                            $scope.RafTip,
                            $scope.Stok[0].KODU,
                            $scope.RafKodu,
                            $scope.Stok[0].PARTI,
                            $scope.Stok[0].LOT,
                            $scope.Miktar * $scope.Stok[0].CARPAN,
                        ];
                        console.log(InsertRafData)
                        db.ExecuteTag($scope.Firma,'RafHareketleriInsert',InsertRafData,function(InsertResult)
                        {  
                            $scope.RafKodu = "";
                        });
                    }
                }

                console.log(localStorage.mode)
                if(localStorage.mode == 'true')
                {
                    $scope.SayimListe.push(InsertResult.result.recordset[0]);
                    InsertAfterRefresh($scope.SayimListe);
                    $scope.InsertLock = false;
                    if(UserParam.Sistem.Titresim == 1)
                    {
                        Confirmation();
                    }
                }
                else
                {
                    db.GetData($scope.Firma,'SayimGetir',[$scope.DepoNo,$scope.EvrakNo,$scope.Tarih],function(SayimData)
                    {
                        $scope.SayimListe.push(SayimData[0]);
                        InsertAfterRefresh(SayimData);
                        $scope.InsertLock = false
                        if(UserParam.Sistem.Titresim == 1)
                        {
                            Confirmation();
                        }
                    });
                }
            }
            else
            {
                console.log(InsertResult.result.err);
            }
        });
    }
    function UpdateData(pData) 
    {  
        db.ExecuteTag($scope.Firma,'SayimUpdate',pData.Param,function(InsertResult)
        {  
            if(typeof(InsertResult.result.err) == 'undefined')
            {   
                db.GetData($scope.Firma,'SayimGetir',[$scope.DepoNo,$scope.EvrakNo,$scope.Tarih],function(SayimData)
                {
                    InsertAfterRefresh(SayimData);
                    $("#TblIslem").jsGrid({data : $scope.SayimListe});
                    Confirmation();
                    //ToplamMiktarHesapla();
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
                $scope.Miktar = (Uzunluk / UserParam.Sistem.KiloCarpan)
            }
        }
        if(pBarkod != '')
        {
            db.StokBarkodGetir($scope.Firma,pBarkod,$scope.DepoNo, async function(BarkodData)
            {   
                if(BarkodData.length > 0)
                {
                    $scope.Stok = BarkodData;
                    $scope.StokKodu = $scope.Stok[0].KODU;
                    $scope.Stok[0].TOPMIKTAR = 1;
                    $scope.Stok[0].LOT = 0;
                    db.GetData($scope.Firma,'CmbBirimGetir',[BarkodData[0].KODU],function(data)
                    {
                        $scope.BirimListe = data; 
                        console.log(data)
                        //EKREM TARAFINDAN GEÇİCİ OLARAK YAPILDI. BİRİMİNİ ATMIYORDU.
                        if($scope.Stok[0].BIRIMPNTR == null)
                        {
                            $scope.Stok[0].BIRIMPNTR = 1
                        }
                        //
                        $scope.Birim = JSON.stringify($scope.Stok[0].BIRIMPNTR);

                        if($scope.BirimListe.length > 0)
                        {
                            console.log($scope.Birim)
                            $scope.Stok[0].BIRIMPNTR = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].BIRIMPNTR;
                            $scope.Stok[0].BIRIM = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].BIRIM;
                            $scope.Stok[0].CARPAN = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].KATSAYI;
                            $scope.MiktarFiyatValid();
                        }
                        else
                        {
                            //BİRİMSİZ ÜRÜNLERDE BİRİMİ ADETMİŞ GİBİ DAVRANIYOR. RECEP KARACA 23.09.2019
                            $scope.Stok[0].BIRIMPNTR = 1;
                            $scope.Stok[0].BIRIM = 'ADET';
                            $scope.Stok[0].CARPAN = 1;
                            $scope.MiktarFiyatValid();
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
                    });    
                    if($scope.Stok[0].BEDENKODU != '' || $scope.Stok[0].RENKKODU != '') //RENK BEDEN
                    {   if(localStorage.mode == true)
                        {
                            if($scope.Stok[0].BEDENKODU != '' && $scope.Stok[0].BEDENPNTR == 0)
                            {
                                $('#MdlRenkBeden').modal("show");
                            }
                            else if($scope.Stok[0].RENKKODU != '' && $scope.Stok[0].RENKPNTR == 0)
                            {
                                $('#MdlRenkBeden').modal("show");
                            }
                        }
                        else
                        {
                            $('#MdlRenkBeden').modal("show");
                        }
                        await db.GetPromiseTag($scope.Firma,'RenkGetir',[$scope.Stok[0].RENKKODU],function(pRenkData)
                        {
                            $scope.RenkListe = pRenkData;
                            if($scope.Stok[0].RENKPNTR == 0)
                            {
                                $scope.Stok[0].RENKPNTR = "1";
                            }
                        });
                        await db.GetPromiseTag($scope.Firma,'BedenGetir',[$scope.Stok[0].BEDENKODU],function(pBedenData)
                        {  
                            $scope.BedenListe = pBedenData;
                            if($scope.Stok[0].BEDENPNTR == 0)
                            {
                                $scope.Stok[0].BEDENPNTR = "1";
                            }
                        })
                    }
                    if($scope.Stok[0].DETAYTAKIP == 1 || $scope.Stok[0].DETAYTAKIP == 2)
                    {
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
                            $timeout( function(){
                            $window.document.getElementById("Parti").focus();
                            $window.document.getElementById("Parti").select();
                            },250)
                        }
                    }      
                    if($scope.Stok[0].DETAYTAKIP == 3)
                    {
                        if($scope.Stok[0].SERINO != '')
                        {
                            db.GetData($scope.Firma,'SeriNoGetir',[$scope.Stok[0].KODU,''],function(data)
                            {
                                $scope.MiktarFiyatValid();
                            });
                        }
                        else
                        {
                            SeriNoEkran();
                        }
                    }       
                    if(UserParam.Sayim.RafYonetimi == "1")
                    {
                        $("#MdlRaf").modal('show');
                    }
                    $scope.OkutmaSayisi = 0;
                    $scope.BasimAdet = 0;
                    $scope.EskiBarkod = $scope.Stok[0].KODU
                    if($scope.SayimListe.length > 0)
                    {
                        for (let i = 0; i < $scope.SayimListe.length; i++) 
                        {
                            if($scope.SayimListe[i].sym_Stokkodu == $scope.EskiBarkod)
                            {
                                $scope.OkutmaSayisi += $scope.SayimListe[i].sym_miktar2;
                                $scope.BasimAdet += $scope.SayimListe[i].sym_miktar1;
                            }
                        }
                    }
                    else
                    {
                        ToplamMiktarHesapla()
                    }
                }
                else
                {            
                    alertify.alert("Stok Bulunamamıştır.")
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
    function Beep()
    {
        navigator.notification.vibrate(1000);
        //navigator.vibrate([100,100,200,100,300]);
        document.getElementById("Beep").play();
    }
    function Confirmation()
    {
        navigator.vibrate([100,100,200,100,300]);
    }
    function SeriNoEkran()
    {
        if($scope.Stok[0].SERINO == '')
        {   
            if($scope.Stok[0].DETAYTAKIP == 3)
            {
                $scope.TxtSeriNo = "";
                $scope.SeriNoListe = [];
                $scope.BtnSeriNoGetir()
                $("#TblSeriNo").jsGrid({data : $scope.SeriNoListe});

                $('#MdlSeriNo').modal('show');
                $timeout( function(){
                    $window.document.getElementById("SeriNo").focus();
                    $window.document.getElementById("SeriNo").select();
                },400)
            }
        }
    }
    function AktarimSiraGetir(pSira,pTarih,pDepo,pCallback)
    {
        localStorage.mode = 'true';
        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "SELECT " +
                    "CASE WHEN MAX(sym_evrakno) IS NOT NULL THEN " +
                    "(SELECT ISNULL(MAX(sym_evrakno),0) + 1 FROM SAYIM_SONUCLARI WHERE sym_tarihi = @sym_tarihi AND sym_depono = @sym_depono) " +
                    "ELSE " +
                    "@sym_evrakno END AS EVRAKNO " +
                    "FROM SAYIM_SONUCLARI WHERE sym_tarihi = @sym_tarihi AND sym_depono = @sym_depono AND sym_evrakno = @sym_evrakno",
            param:  ['sym_tarihi','sym_depono','sym_evrakno'],
            type:   ['date','int','int'],
            value:  [pTarih,pDepo,pSira]
        }

        db.GetDataQuery(TmpQuery,function(data)
        {
            localStorage.mode = 'false';
            pCallback(data[0].EVRAKNO);
        });
    }
    $scope.YeniEvrak = async function()
    {
        Init();
        InitIslemGrid();
        InitStokGrid();
        InitPartiLotGrid();
        InitStokHarGrid();
        InitSeriNoGrid();

        $scope.EvrakLock = false;
        $scope.DepoNo = UserParam.Sayim.DepoNo;
        console.log(UserParam.Sayim.EvrakNo)
        $scope.EvrakNo = UserParam.Sayim.EvrakNo;
        $scope.CmbEvrakTip = "0";
        $scope.Stok = 
        [
            {
                BIRIM : '',
                BIRIMPNTR : 0, 
                TOPMIKTAR : 0
            }
        ];
        db.DepoGetir($scope.Firma,UserParam.Sayim.DepoListe,function(data)
        {
            $scope.DepoListe = data; 
            $scope.DepoNo = UserParam.Sayim.DepoNo;
            
            $scope.DepoListe.forEach(function(item) 
            {
                if(item.KODU == $scope.DepoNo)
                    $scope.DepoAdi = item.ADI;
            });     
        }); 
        // if(UserParam.Sayim.EvrakNo == 1)
        // {
        //     await db.MaxSiraPromiseTag($scope.Firma,'MaxSayimSira',[$scope.DepoNo,$scope.Tarih],function(data)
        //     {  
        //         $scope.EvrakNo = data;
        //     });
        // }

        BarkodFocus();
    }
    $scope.BtnStokGridGetir = function()
    {
        let Kodu = '';
        let Adi = '';
        $scope.Loading = true;
        $scope.TblLoading = false;

        if($scope.StokGridTip == "0")
        {   
            Adi = $scope.StokGridText.replace("*","%").replace("*","%");
        }
        else
        {
            Kodu = $scope.StokGridText.replace("*","%").replace("*","%");
        }
            
        db.GetData($scope.Firma,'StokAdiGetir',[Kodu,Adi,$scope.DepoNo,''],function(StokData)
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
        $scope.Barkod = "";
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
    $scope.BtnPartiLotGetir = function()
    {   
        if(isNaN($scope.TxtLot))
        $scope.TxtLot = 0;

        db.GetData($scope.Firma,'PartiLotGetir',[$scope.Stok[0].KODU,$scope.DepoNo,$scope.TxtParti,$scope.TxtLot],function(data)
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

            let UzunlukLot = 5 - $scope.TxtLot.toString().length;
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
            $scope.BarkodInsert = StokKodu.substring(0,5) + "" + $scope.TxtParti + "" +  Lot;
            db.GetData($scope.Firma,'BarkodGetir',[$scope.BarkodInsert,0],function(BarkodData)
            {
                if(BarkodData.length > 0)
                {
                    alertify.alert("Barkod Mevcut")
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
                                $scope.Tarih,
                                $scope.SktTarih
                            ]   
                            db.ExecuteTag($scope.Firma,'PartiLotInsert',Data,function(InsertResult)
                            {
                                if(typeof(InsertResult.result.err) == 'undefined')
                                {
                                    $scope.Stok[0].PARTI = $scope.TxtParti;
                                    $scope.Stok[0].LOT = $scope.TxtLot;
                                    if(UserParam.Sistem.PartiBarkodOlustur == 1)
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
    $scope.BtnStokBarkodGetir = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            StokBarkodGetir($scope.Barkod);  
            $scope.Barkod = "";    
        }
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
        StokBarkodGetir($scope.Barkod);
        $scope.BarkodGirisClick();
    }
    $scope.PartiLotListeRowClick = function(pIndex,pItem,pObj)
    {   
        if ( PartiLotSelectedRow ) { PartiLotSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        PartiLotSelectedRow = $row;
        $scope.PartiLotListeSelectedIndex = pIndex;
    }
    $scope.SeriNoListeRowClick = function(pIndex,pItem,pObj)
    {   
        if ( SeriNoSelectedRow ) { SeriNoSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        SeriNoSelectedRow = $row;
        $scope.SeriNoListeSelectedIndex = pIndex;
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
    $scope.BtnTemizle = function()
    {   
        $scope.DepoMiktar = 0;
        $scope.KalanMiktar = 0;
        //$scope.Barkod = "";
        $scope.Stok = null;
        $scope.Stok = 
        [
            {
                BIRIM : '',
                BIRIMPNTR : 0, 
                TOPMIKTAR : 0
            }
        ];
        $scope.Miktar = 1;
        //ENKAY İÇİ YAPILDI
        
        $scope.BarkodLock = false;
        $scope.Barkod = "";
        $scope.BirimListe = [];
        BarkodFocus();      
    }
    $scope.BtnDuzenle = function()
    {
        $scope.MiktarEdit = $scope.SayimListe[$scope.IslemListeSelectedIndex].sym_miktar1;
        $("#MdlDuzenle").modal('show');
    }
    $scope.BtnDuzenleKaydet = function(pIndex)
    {
        $scope.Update(pIndex);
        angular.element('#MdlDuzenle').modal('hide');
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
    $scope.Insert = function()
    { 
        $scope.InsertLock = true

        if(typeof($scope.Stok[0].KODU) != 'undefined')
        {   
            if(UserParam.Sistem.SatirBirlestir == 0 || $scope.Stok[0].DETAYTAKIP == 1 || $scope.Stok[0].DETAYTAKIP == 2  )
            {          
                InsertData();
            }
            else
            {   
                let UpdateStatus = false;
                console.log($scope.SayimListe)
                angular.forEach($scope.SayimListe,function(value)
                {   
                    if($scope.CmbEvrakTip == 0)
                    {
                        if(value.sym_Stokkodu == $scope.Stok[0].KODU)
                        {   
                            let TmpMiktar = value.sym_miktar1 + ($scope.Miktar * $scope.Stok[0].CARPAN);
                            let Data = 
                            {
                                Param :
                                [
                                    TmpMiktar,
                                    value.sym_miktar2 + 1,
                                    0,
                                    0,
                                    0,
                                    value.sym_Guid
                                ],
                                Miktar : $scope.Miktar * $scope.Stok[0].CARPAN
                            };

                            UpdateStatus = true;
                            UpdateData(Data);
                            $scope.InsertLock = false 
                        }  
                    }   
                    if($scope.CmbEvrakTip == 1)
                    {
                        if(value.sym_Stokkodu == $scope.Stok[0].KODU)
                        {   
                            let TmpMiktar = value.sym_miktar2 + ($scope.Miktar * $scope.Stok[0].CARPAN);
                            let Data = 
                            {
                                Param :
                                [
                                    value.sym_miktar1,
                                    TmpMiktar,
                                    0,
                                    0,
                                    0,
                                    value.sym_Guid
                                ],
                                Miktar : $scope.Miktar * $scope.Stok[0].CARPAN
                            };

                            UpdateStatus = true;
                            UpdateData(Data);
                            $scope.InsertLock = false 
                        }     
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
            console.log("Barkod Okutunuz!");
            $scope.InsertLock = false
        }

        $scope.DepoMiktar = 0;
        $scope.KalanMiktar = 0;
        BarkodFocus();
    }
    $scope.BtnBarkodGetirClick = function()
    {
        StokBarkodGetir($scope.Barkod);
    }
    $scope.EvrakGetir = function ()
    {   
        db.GetData($scope.Firma,'SayimGetir',[$scope.DepoNo,$scope.EvrakNo,$scope.Tarih],function(data)
        {   
            if(data.length > 0)
            {
                Init();
                InitIslemGrid();
                
                $scope.DepoNo = data[0].sym_depono.toString();
                $scope.EvrakNo = data[0].sym_evrakno.toString();
                // $scope.Tarih = moment(data[0].sym_tarihi).format("DD.MM.YYYY");
                $scope.Tarih = data[0].sym_tarihi
                
                $scope.Barkod = "";
                $scope.Stok = 
                [
                    {
                        BIRIM : '',
                        BIRIMPNTR : 0, 
                        TOPMIKTAR : 0
                    }
                ];
                $scope.Miktar = 1;
                
                $scope.ToplamMiktar1 = 0;
                $scope.ToplamMiktar2 = 0;
                $scope.ToplamMiktar3 = 0;
                $scope.ToplamMiktar4 = 0;
                $scope.ToplamMiktar5 = 0;
            
                $scope.TOPMIKTAR = 0;

                db.DepoGetir($scope.Firma,UserParam.Sayim.DepoListe,function(e)
                {
                    $scope.DepoListe = e; 
                    $scope.DepoNo = data[0].sym_depono.toString();
                    $scope.DepoListe.forEach(function(item) 
                    {
                        if(item.KODU == $scope.DepoNo)
                            $scope.DepoAdi = item.ADI;
                    });     
                });

                $scope.SayimListe = data;
                $("#TblIslem").jsGrid({data : $scope.SayimListe});
            
                ToplamMiktarHesapla();

                $scope.EvrakLock = true;
                $scope.BarkodLock = false;

                angular.element("#MdlEvrakGetir").modal('hide');

                BarkodFocus();
            }
            else
            {
                angular.element('#MdlEvrakGetir').modal('hide');
                alertify.okBtn("Tamam");
                alertify.alert("Belge Bulunamadı!");
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
            if($scope.SayimListe.length > 0)
            {
                if(UserParam.Sayim.EvrakSil == 0)
                {
                    db.ExecuteTag($scope.Firma,'SayimEvrDelete',[$scope.EvrakNo,$scope.Tarih,$scope.DepoNo],function(data)
                    {
                        $scope.YeniEvrak();
                    });
                }
                else
                {
                    alertify.okBtn("Tamam");
                    alertify.alert("Belge Silme Yektini Yok !");
                }
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

        alertify.confirm('Bu Satırı Silmek İstediğinize Eminmisiniz?', 
        function()
        { 
            if($scope.IslemListeSelectedIndex > -1)
            {   
                if(UserParam.Sayim.EvrakSil == 0)
                {  
                    db.ExecuteTag($scope.Firma,'SayimSatirDelete',[$scope.SayimListe[$scope.IslemListeSelectedIndex].sym_Guid],function(data)
                    {   
                        if($scope.SayimListe.length <= 1)
                        {
                            $scope.YeniEvrak();
                        }
                        else
                        {
                            db.GetData($scope.Firma,'SayimGetir',[$scope.DepoNo,$scope.EvrakNo,$scope.Tarih],function(data)
                            {   
                                $scope.SayimListe = data;
                                
                                $("#TblIslem").jsGrid({data : $scope.SayimListe});    
                                $scope.BtnTemizle();
                                ToplamMiktarHesapla();
                            });
                        }
                    });
                }
                else
                {
                    alertify.okBtn("Tamam");
                    alertify.alert("Belge Silme Yetkiniz Yok!");
                }
            }
            else
            {
                alertify.okBtn("Tamam");
                alertify.alert("Satır Seçmeden Silemezsiniz !");
            }
        });
    }
    $scope.Update = function(pIndex)
    {   
        if($scope.CmbEvrakTip == 0)
        {
            let Data = 
            {
                Param :
                [   
                    $scope.MiktarEdit,
                    $scope.SayimListe[pIndex].sym_miktar2,
                    0,
                    0,
                    0,
                    $scope.SayimListe[pIndex].sym_Guid
                ],
                Miktar :  $scope.MiktarEdit
            };
    
            UpdateData(Data);
        }
        else if($scope.CmbEvrakTip == 1)
        {
            let Data = 
            {
                Param :
                [   
                    $scope.SayimListe[pIndex].sym_miktar1,
                    $scope.MiktarEdit,
                    0,
                    0,
                    0,
                    $scope.SayimListe[pIndex].sym_Guid
                ],
                Miktar :  $scope.MiktarEdit
            };
    
            UpdateData(Data);
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

    }
    $scope.MainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TbStok").removeClass('active');
    }
    $scope.BelgeBilgisiClick = function() 
    {
        $("#TbBelgeBilgisi").addClass('active');
        $("#TbMain").removeClass('active');
    }
    $scope.BarkodGirisClick = function()
    {   
        if($scope.EvrakNo == 0 || typeof $scope.EvrakNo == "undefined")
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
            BarkodFocus();
        }
    }
    $scope.TbIslemSatirlariClick = function()
    {   
        if($scope.ToplamSatir <= 0)
        {
            alertify.alert("Gösterilecek Belge Yok!");
            $("#TbMain").addClass('active');
            $("#TbIslemSatirlari").removeClass('active');
            $("#TbBarkodGiris").removeClass('active');
            $("#TbStok").removeClass('active');
        }
        else
        {
            $("#TbIslemSatirlari").addClass('active');
            $("#TbMain").removeClass('active');
            $("#TbBelgeBilgisi").removeClass('active');
            $("#TbBarkodGiris").removeClass('active');
            $("#TbStok").removeClass('active');
            console.log($scope.Tarih)
            db.GetData($scope.Firma,'SayimGetir',[$scope.DepoNo,$scope.EvrakNo,$scope.Tarih],function(SayimData)
            {   
                console.log([$scope.DepoNo,$scope.EvrakNo,$scope.Tarih])
                console.log(SayimData)
                InsertAfterRefresh(SayimData);     
                $("#TblIslem").jsGrid({data : $scope.SayimListe});           
            });            
        }
    }
    $scope.PageRefresh = function()
    {
        $scope.DepoListe.forEach(function(item) 
        {
            if(item.KODU == $scope.DepoNo)
                $scope.DepoAdi = item.ADI;
        });
    }
    $scope.BtnGonder = function()
    {
        db.GetData($scope.Firma,'SayimHareketGonderGetir',[],function(Data)
        {
            $scope.SayimHareketGonderListe = Data;
            console.log(Data)
            if($scope.SayimHareketGonderListe.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblStokHarListe").jsGrid({data : $scope.SayimHareketGonderListe});
                $("#TblStokHarListe").jsGrid({pageIndex: true});
                $("#MdlGonder").modal('show');
            }
            else
            {
                alertify.alert("Evrak Bulunamadı");
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblStokHarListe").jsGrid({data : $scope.SayimHareketGonderListe});
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

            for (let i = 0; i < $scope.SayimHareketGonderListe.length; i++) 
            {
                let TmpStatus = true
                let TmpSayimData = await db.GetPromiseTag($scope.Firma,'SayimGetir',[$scope.SayimHareketGonderListe[i].sym_depono,$scope.SayimHareketGonderListe[i].sym_evrakno,$scope.SayimHareketGonderListe[i].sym_tarihi]);
                localStorage.mode = 'true';
                let TmpMaxSira = await db.GetPromiseTag($scope.Firma,'MaxSayimSira',[$scope.SayimHareketGonderListe[i].sym_depono,$scope.SayimHareketGonderListe[i].sym_tarihi]);
                for(let m = 0;m < TmpSayimData.length;m++)
                {
                    console.log(TmpSayimData[m].sym_tarihi)
                    var InsertData = 
                    [
                        TmpSayimData[m].sym_create_user,
                        TmpSayimData[m].sym_lastup_user,
                        TmpSayimData[m].sym_tarihi,
                        TmpSayimData[m].sym_depono,
                        TmpMaxSira[0].MAXEVRSIRA,
                        TmpSayimData[m].sym_Stokkodu,
                        TmpSayimData[m].sym_miktar1,
                        0,
                        TmpSayimData[m].sym_birim_pntr,
                        TmpSayimData[m].sym_barkod,
                        TmpSayimData[m].sym_renkno,
                        TmpSayimData[m].sym_bedenno,
                        TmpSayimData[m].sym_parti_kodu,
                        TmpSayimData[m].sym_lot_no,
                        TmpSayimData[m].sym_serino
                    ];
                    console.log(InsertData)
                   
                    await db.ExecutePromiseTag($scope.Firma,'SayimInsert',InsertData,function(InsertResult)
                    {    
                        if(typeof(InsertResult.result.err) != 'undefined')
                        {
                            console.log(InsertResult.result.err);
                            TmpStatus = false;
                        }
                    });  
                }

                localStorage.mode = 'false';
                if (TmpStatus)
                {
                    console.log("GİRDİ")
                    let TmpUpdateQuery = 
                    {
                        db : '{M}.' + $scope.Firma,
                        query: "UPDATE SAYIM SET status = 1 WHERE sym_evrakno = @sym_evrakno AND sym_create_date = '@sym_tarihi' " ,
                        param:  ['sym_evrakno:int','sym_tarihi:date'],
                        value : [$scope.SayimHareketGonderListe[i].sym_evrakno,$scope.SayimHareketGonderListe[i].sym_tarihi]
                    }
                    console.log($scope.SayimHareketGonderListe[i].sym_tarihi)
                    console.log(TmpUpdateQuery)
                    await db.GetPromiseQuery(TmpUpdateQuery)
                    
                    await db.GetData($scope.Firma,'SayimHareketGonderGetir',[],function(Data)
                    {
                        console.log(Data)
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
    $scope.EvrakTipChange = function()
    {
        if($scope.CmbEvrakTip == 0)
        {
            $scope.OtoEkle = false
            $scope.Miktar1 = 1
            $scope.Miktar2 = 0
        }
        else if($scope.CmbEvrakTip == 1)
        {
            $scope.OtoEkle = false
            $scope.Miktar1 = 0
            $scope.Miktar2 = 1
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
    // RAF SİSTEMİ
    $scope.RafEkle = function()
    {
        db.GetData($scope.Firma,'RafGetir',[$scope.RafKodu],function(RafData)
        {
            $scope.RafListe = RafData;
            if ($scope.RafListe.length > 0)
            {
                $scope.RafListe.forEach(item => 
                {
                    if(item.DEPO == $scope.DepoNo)
                    {
                        $scope.RafTip = 1
                    }
                    else
                    {
                        alertify.alert("Öyle bir depo kaydı yok")
                    }
                });
                $("#MdlRaf").modal('hide');
            }
            else
            {
                $scope.RafKodu = "";
                $("#MdlRaf").modal('hide');
                alertify.alert("Raf Bulunamadı")
            }
        });
    }
    //SERİ NO
    $scope.BtnSeriNoOlustur = function()
    {
        if($scope.TxtSeriNo == '')
        {
            $("#LblSeriNoAlert").show();
            $scope.LblSeriNoAlert = "SeriNo Alanı Boş Geçilemez !"
        }
        else
        {   
            db.GetData($scope.Firma,'StokSeriNoGetir',['',0,$scope.Stok[0].KODU,$scope.TxtSeriNo,''],function(data)
            {
                if(data.length > 0)
                {
                    $("#TblSeriNo").jsGrid({data : $scope.SeriNoListe});
                    $("#LblSeriNoAlert").show();
                    $scope.LblSeriNoAlert = "Bu SeriNo Daha Önceden Oluşturulmuş ! Üzerine kaydedildi.."
                    let AlsStsSorgu = "";
                    if(ParamName == "AlisIrsaliye")
                    {
                        AlsStsSorgu = "chz_al_evr_seri = @SERI, chz_al_evr_sira = @SIRA, chz_al_cari_kodu = @CARIKOD,chz_lastup_date = GETDATE(),chz_al_tarih = GETDATE() "
                    }
                    else
                    {
                        AlsStsSorgu = "chz_st_evr_seri = @SERI, chz_st_evr_sira = @SIRA, chz_st_cari_kodu = @CARIKOD,chz_lastup_date = GETDATE(),chz_st_tarih = GETDATE() "
                    }
                    var TmpQuery = 
                    {
                        db : '{M}.' + $scope.Firma,
                        query:  "UPDATE STOK_SERINO_TANIMLARI SET " + AlsStsSorgu +
                        "WHERE chz_stok_kodu = @chz_stok_kodu " +
                        "AND ((chz_serino = @chz_serino) OR (@chz_serino = ''))",
                        param : ['SERI','SIRA','CARIKOD','chz_stok_kodu','chz_serino'],
                        type : ['string|25','int','string|25','string|25','string|25'],
                        value:  [$scope.Seri,$scope.Sira,$scope.CariKodu,$scope.Stok[0].KODU,$scope.TxtSeriNo]
                    }
                    db.ExecuteQuery(TmpQuery,function(uData)
                    {
                        $scope.Stok[0].SERINO = $scope.TxtSeriNo;
                        db.GetData($scope.Firma,'StokSeriNoGetir',[$scope.Seri,$scope.Sira,$scope.Stok[0].KODU,'',$scope.CariKodu],function(pData)
                        {
                            if(typeof(uData.result.err) == 'undefined')
                            {
                                if(pData.length > 0)
                                {
                                    $scope.SeriNoSayi = pData.length;
                                    $scope.Miktar = $scope.SeriNoSayi;
                                    $scope.MiktarFiyatValid();
                                    $scope.SeriNoListe = pData;
                                    $("#TblSeriNo").jsGrid({data : $scope.SeriNoListe});
                                    $timeout( function(){$("#LblSeriNoAlert").hide();},1000)
                                    $scope.TxtSeriNo = "";
                                }
                            }
                        });
                    });
                }
                else
                {
                    let Data = 
                    [
                        UserParam.MikroId,
                        UserParam.MikroId,
                        $scope.TxtSeriNo,
                        $scope.Stok[0].KODU
                    ]
                    db.ExecuteTag($scope.Firma,'StokSeriNoInsert',Data,function(InsertResult)
                    {
                        if(typeof(InsertResult.result.err) == 'undefined')
                        {
                            let AlsStsSorgu = "";
                            if(ParamName == "AlisIrsaliye")
                            {
                                AlsStsSorgu = "chz_al_evr_seri = @SERI, chz_al_evr_sira = @SIRA, chz_al_cari_kodu = @CARIKOD, chz_al_tarih = GETDATE(), "
                            }
                            else
                            {
                                AlsStsSorgu = "chz_st_evr_seri = @SERI, chz_st_evr_sira = @SIRA, chz_st_cari_kodu = @CARIKOD, chz_st_tarih = GETDATE(), "
                            }
                            var TmpQuery = 
                            {
                                db : '{M}.' + $scope.Firma,
                                query:  "UPDATE STOK_SERINO_TANIMLARI SET " + AlsStsSorgu + "chz_lastup_date = GETDATE() " +
                                "WHERE chz_stok_kodu = @chz_stok_kodu " +
                                "AND ((chz_serino = @chz_serino) OR (@chz_serino = '')) AND (chz_al_evr_sira = 0 OR chz_st_evr_sira = 0) ",
                                param : ['SERI','SIRA','CARIKOD','chz_stok_kodu','chz_serino'],
                                type : ['string|25','int','string|25','string|25','string|25'],
                                value:  [$scope.Seri,$scope.Sira,$scope.CariKodu,$scope.Stok[0].KODU,$scope.TxtSeriNo]
                            }
                            db.ExecuteQuery(TmpQuery,function(uData)
                            {   
                                $scope.Stok[0].SERINO = $scope.TxtSeriNo;
                                db.GetData($scope.Firma,'StokSeriNoGetir',[$scope.Seri,$scope.Sira,$scope.Stok[0].KODU,'',$scope.CariKodu],function(data)
                                {
                                    if(typeof(uData.result.err) == 'undefined')
                                    {
                                        if(data.length > 0)
                                        {
                                            $scope.SeriNoSayi = data.length;
                                            $scope.Miktar = $scope.SeriNoSayi;
                                            $scope.MiktarFiyatValid();
                                            $scope.SeriNoListe = data;
                                            $("#TblSeriNo").jsGrid({data : $scope.SeriNoListe});
                                            $timeout( function(){$("#LblSeriNoAlert").hide();},1000)
                                            $scope.TxtSeriNo = "";
                                        }
                                    }
                                });
                            });
                        }
                    });
                }
            });
        }
    }
    $scope.BtnSeriNoGetir = function()
    {
        if(ParamName == "SatisIrsaliye")
        {
            db.GetData($scope.Firma,'StokSeriNoGetir',[$scope.Seri,$scope.Sira,$scope.Stok[0].KODU,$scope.TxtSeriNo,$scope.CariKodu],function(data)
            { 
                $scope.SeriNoListe = data;
                $scope.SeriNoSayi = data.length;
                $scope.Miktar = $scope.SeriNoSayi;
                $scope.MiktarFiyatValid();
                
                $("#TblSeriNo").jsGrid({data : $scope.SeriNoListe});
            });
        }
        else
        {
            db.GetData($scope.Firma,'StokSeriNoGetir',[$scope.Seri,$scope.Sira,$scope.Stok[0].KODU,$scope.TxtSeriNo,$scope.CariKodu],function(data)
            { 
                $scope.SeriNoListe = data;
                $scope.SeriNoSayi = data.length;
                $scope.Miktar = $scope.SeriNoSayi;
                $scope.MiktarFiyatValid();
                
                $("#TblSeriNo").jsGrid({data : $scope.SeriNoListe});
            });
        }
    }
    $scope.BtnSeriNoEnter = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            $scope.BtnSeriNoOlustur(); 
        }
    }
    $scope.BtnSeriNoDelete = function()
    {
        if(typeof $scope.SeriNoListeSelectedIndex != "undefined")
        {
            var TmpQuery = 
            {
                db : '{M}.' + $scope.Firma,
                query: "DELETE FROM STOK_SERINO_TANIMLARI WHERE chz_Guid = @GUID  ",
                param:  ['GUID'],
                type:   ['string|50'],
                value:  [$scope.SeriNoListe[$scope.SeriNoListeSelectedIndex].chz_Guid]
            }
            db.ExecuteQuery(TmpQuery,function(data)
            {
                $scope.BtnSeriNoGetir();
            });
        }
        else
        {
            alertify.alert("Lütfen Satır Seçin")
        }
    }
} 