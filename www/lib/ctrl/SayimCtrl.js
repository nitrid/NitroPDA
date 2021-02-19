function SayimCtrl($scope,$window,$timeout,db)  
{
    let IslemSelectedRow = null;
    let StokSelectedRow = null;
    let PartiLotSelectedRow = null;
    $scope.CmbEvrakTip = '0';

    $('#MdlPartiLot').on('hide.bs.modal', function () 
    {
        if($scope.TxtParti == "" && $scope.TxtLot == 0)
        {
            $scope.BtnTemizle();
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
        
        $scope.EvrakNo = UserParam.Sayim.EvrakNo;
        console.log($scope.EvrakNo)
        $scope.Barkod = "";
        $scope.Tarih = new Date().toLocaleDateString('tr-TR',{ year: 'numeric', month: 'numeric', day: 'numeric' });
        $scope.DepoNo;
        $scope.DepoAdi = "";

        $scope.Birim = 0;
        $scope.StokGridTip = "0";
        $scope.StokGridText = "";
        $scope.TxtParti = "";
        $scope.LblPartiLotAlert = "";


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
    function ToplamMiktarHesapla()
    {
       $scope.ToplamMiktar1 = 0;
       $scope.ToplamMiktar2 = 0;
       $scope.ToplamMiktar3 = 0;
       $scope.ToplamMiktar4 = 0;
       $scope.ToplamMiktar5 = 0;
       $scope.ToplamSatir = 0;

       angular.forEach($scope.SayimListe,function(value)
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
    function InsertAfterRefresh(pData)
    {      
        $scope.EvrakLock = true;
        $scope.BarkodLock = false;
        $scope.SayimListe = pData;        
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
            $scope.Miktar * ($scope.Stok[0].CARPAN * $scope.Miktar2),
            $scope.Stok[0].BIRIMPNTR,
            $scope.Stok[0].BARKOD,
            $scope.Stok[0].RENKPNTR,
            $scope.Stok[0].BEDENPNTR,
            $scope.Stok[0].PARTI,
            $scope.Stok[0].LOT,
            ''
        ];
        console.log(InsertData)
        db.ExecuteTag($scope.Firma,'SayimInsert',InsertData,function(InsertResult)
        {    
            if(typeof(InsertResult.result.err) == 'undefined')
            {     
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
                    var TmpQuery = 
                    {
                        db : '{M}.' + $scope.Firma,
                        query:  "SELECT IFNULL((SELECT ADI FROM STOK WHERE KODU = sym_Stokkodu),'') AS ADI, " +
                                "sym_satirno AS NO, " +
                                "* FROM SAYIM WHERE sym_tarihi = @sym_tarihi AND " +
                                "sym_depono = @sym_depono AND sym_evrakno = @sym_evrakno " + 
                                "AND sym_satirno = (SELECT IFNULL(MAX(sym_satirno),0) FROM SAYIM WHERE sym_evrakno=@sym_evrakno AND sym_depono=@sym_depono AND sym_tarihi='@sym_tarihi') ORDER BY sym_lastup_date ASC ",
                        param:  ['sym_tarihi','sym_depono','sym_evrakno'],
                        type:   ['date','int','int'],
                        value:  [$scope.Tarih,$scope.DepoNo,$scope.EvrakNo]
                    }
                    db.GetDataQuery(TmpQuery,function(SayimData)
                    {
                        $scope.SayimListe.push(SayimData[0]);
                        InsertAfterRefresh($scope.SayimListe);     
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
            db.StokBarkodGetir($scope.Firma,pBarkod,$scope.DepoNo,function(BarkodData)
            {   
                if(BarkodData.length > 0)
                {
                    $scope.Stok = BarkodData;
                    console.log(1)
                    $scope.StokKodu = $scope.Stok[0].KODU;
                    $scope.Stok[0].TOPMIKTAR = 1;
                    // if(UserParam.Sistem.PartiLotKontrol == 1)
                    // {
                    //     for(i = 0;i < $scope.IrsaliyeListe.length;i++)
                    //     {   
                    //         if($scope.Stok[0].PARTI != "" && $scope.Stok[0].LOT != "")
                    //         {
                    //             if($scope.Stok[0].PARTI == $scope.IrsaliyeListe[i].sth_parti_kodu && $scope.Stok[0].LOT == $scope.IrsaliyeListe[i].sth_lot_no)
                    //             {
                    //                 alertify.alert("<a style='color:#3e8ef7''>" + "Okutmuş Olduğunuz "+ $scope.Stok[0].PARTI + ". " + "Parti " + $scope.Stok[0].LOT + ". " +"Lot Daha Önceden Okutulmuş !" + "</a>" );
                    //                 $scope.InsertLock = false;
                    //                 $scope.BtnTemizle();
                    //                 return;
                    //             }
                    //         }
                    //     }
                    // }
                    console.log(1)
                    db.GetData($scope.Firma,'CmbBirimGetir',[BarkodData[0].KODU],function(data)
                    {
                        $scope.BirimListe = data; 
                        console.log(data)
                        $scope.Birim = JSON.stringify($scope.Stok[0].BIRIMPNTR);

                        if($scope.BirimListe.length > 0)
                        {
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
                            PartiLotEkran();
                            $timeout( function(){
                            $window.document.getElementById("Parti").focus();
                            $window.document.getElementById("Parti").select();
                            },250)
                        }
                    }               
                }
                else
                {                        
                    Beep();
                    console.log("Stok Bulunamamıştır.");
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

        $scope.EvrakLock = false;
        $scope.DepoNo = UserParam.Sayim.DepoNo;
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
        
       await db.MaxSiraPromiseTag($scope.Firma,'MaxSayimSira',[$scope.DepoNo,$scope.Tarih],function(data)
        {  
            
        });
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
            if(UserParam.Sistem.SatirBirlestir == 0 || $scope.Stok[0].RENKPNTR != 0 || $scope.Stok[0].BEDENPNTR != 0 || $scope.Stok[0].DETAYTAKIP == 1 || $scope.Stok[0].DETAYTAKIP == 2)
            {
                InsertData();
            }
            if(UserParam.Sistem.SatirBirlestir == 0 || $scope.Stok[0].DETAYTAKIP == 1 || $scope.Stok[0].DETAYTAKIP == 2  )
            {          
                InsertData();
            }
            else
            {   
                let UpdateStatus = false;

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
                                    value.sym_miktar2,
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
                $scope.Tarih = moment(data[0].sym_tarihi).format("DD.MM.YYYY");
                
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
            
            db.GetData($scope.Firma,'SayimGetir',[$scope.DepoNo,$scope.EvrakNo,$scope.Tarih],function(SayimData)
            {   
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

            AktarimSiraGetir($scope.SayimListe[0].sym_evrakno,$scope.SayimListe[0].sym_tarihi,$scope.SayimListe[0].sym_depono,async function(EvrakNo)
            {
                alertify.okBtn("Tamam");
                alertify.alert("Sayım fişi aktarımı başladı.");

                for(i = 0;i < $scope.SayimListe.length;i++)
                {
                    localStorage.mode = 'true';

                    var InsertData = 
                    [
                        $scope.SayimListe[i].sym_create_user,
                        $scope.SayimListe[i].sym_lastup_user,
                        $scope.SayimListe[i].sym_tarihi,
                        $scope.SayimListe[i].sym_depono,
                        EvrakNo,
                        $scope.SayimListe[i].sym_Stokkodu,
                        $scope.SayimListe[i].sym_miktar1,
                        $scope.SayimListe[i].sym_birim_pntr,
                        $scope.SayimListe[i].sym_barkod,
                        $scope.SayimListe[i].sym_renkno,
                        $scope.SayimListe[i].sym_bedenno,
                        $scope.SayimListe[i].sym_parti_kodu,
                        $scope.SayimListe[i].sym_lot_no,
                        $scope.SayimListe[i].sym_serino
                    ];
                    
                    await db.ExecutePromiseTag($scope.Firma,'SayimInsert',InsertData,function(InsertResult)
                    {    
                        if(typeof(InsertResult.result.err) != 'undefined')
                        {
                            console.log(InsertResult.result.err);
                        }
                        localStorage.mode = 'false';
                    });    
                }

                alertify.alert("Sayım fişi aktarımı tamamlandı.");
            });
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
} 