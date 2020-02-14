function DepoSiparisCtrl($scope,$window,$timeout,db)
{      
    let IslemSelectedRow = null;
    let StokSelectedRow = null;

    function Init()
    {
        gtag('config', 'UA-12198315-14', 
        {
            'page_title' : 'Depolararası Sipariş Fişi',
            'page_path': '/Deposiparis'
        });
        
        UserParam = Param[$window.sessionStorage.getItem('User')];
        $scope.Firma = $window.sessionStorage.getItem('Firma');

        $scope.Seri = "";
        $scope.Sira = 0;
        $scope.BelgeNo = "";
        $scope.EvrakTip = "Depo Sipariş"
       
        $scope.Sorumluluk = "";
        $scope.GDepo;
        $scope.CDepo;
        $scope.CDepoAdi;
        $scope.GDepoAdi;
        $scope.BelgeTarih = new Date().toLocaleDateString('tr-TR',{ year: 'numeric', month: 'numeric', day: 'numeric' });
        $scope.Barkod = "";
        $scope.Birim = "0";
        $scope.StokGridTip = "0";
        $scope.StokGridText = "";

        $scope.SorumlulukListe = [];
        $scope.GDepoListe = [];
        $scope.CDepoListe = [];
        $scope.DepoSiparisListe = [];
        $scope.BirimListe = [];
        
        $scope.OtoEkle = false;
        $scope.EvrakLock = false;
        $scope.BarkodLock = false;

        $scope.Stok = [];
        $scope.Miktar = 1;
        $scope.Birim = [];

        $scope.ToplamMiktar = 0;
        $scope.ToplamSatir = 0;

        $scope.IslemListeSelectedIndex = -1;
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
            data : $scope.DepoSiparisListe,
            
            fields: 
            [{
                name: "NO",
                title: "NO",
                type: "number",
                align: "center",
                width: 75
                
            },
            {
                name: "KODU",
                title: "KODU",
                type: "number",
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
                name: "MIKTAR",
                title: "MIKTAR",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "BIRIM",
                title: "BIRIM",
                type: "number",
                align: "center",
                width: 50
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
            width: "100%",
            height: "350px",
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
        $scope.ToplamMiktar = 0;
        $scope.ToplamSatir = 0;

        angular.forEach($scope.DepoSiparisListe,function(value)
        {
            $scope.ToplamMiktar += value.ssip_miktar;
            $scope.ToplamSatir += 1 ;
        });
    }
    function BarkodFocus()
    {
        $timeout( function(){$window.document.getElementById("Barkod").focus();},100);
    }
    function Kirilim(pBeden,pRenk)
    {
        if(pBeden != 0 && pRenk != 0)
        {
            return ((pRenk - 1) * 40) + pBeden;
        }
        else if(pRenk == 0)
        {
            return pBeden;
        }
        else if(pBeden == 0)
        {
            return (pRenk - 1) * 40 + 1;
        }
    }
    function BedenHarInsert(pGuid)
    {   
        let Data =
        [   
            UserParam.MikroId, // KULLANICI
            UserParam.MikroId, // KULLANICI
            9, // BEDEN TİP
            pGuid, // RECno
            Kirilim($scope.Stok[0].BEDENPNTR,$scope.Stok[0].RENKPNTR), // BEDEN NO
            $scope.Miktar
        ];
        
        db.ExecuteTag($scope.Firma,'BedenHarInsert',Data,function(data)
        {  
            if(typeof(data.result.err) == 'undefined')
            {  
                db.GetData($scope.Firma,'BedenHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,9],function(BedenData)
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
    function InsertAfterRefresh(pData)
    {    
        $scope.EvrakLock = true;
        $scope.BarkodLock = false;

        $scope.DepoSiparisListe = pData;
        $("#TblIslem").jsGrid({data : $scope.DepoSiparisListe});    
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
            0, //FİRMANNO
            0, //SUBENO
            $scope.BelgeTarih, //TARİH
            $scope.BelgeTarih, //TESLİMTARİH
            $scope.Seri,
            $scope.Sira,
            0,
            $scope.BelgeTarih,
            $scope.Stok[0].KODU,
            $scope.Miktar * $scope.Stok[0].CARPAN,
            0, //BFİYAT
            0, //TUTAR
            0, //TESLIMMIKTARI
            $scope.GDepo,
            $scope.CDepo,
            $scope.Stok[0].BIRIMPNTR,
            0,
            $scope.Sorumluluk
        ];

        db.ExecuteTag($scope.Firma,'DepoSiparisInsert',InsertData,function(InsertResult)
        {   
            if(typeof(InsertResult.result.err) == 'undefined')
            {   
                db.GetData($scope.Firma,'DepoSiparisGetir',[$scope.Seri,$scope.Sira],function(DepoSiparisData)
                {             
                    if($scope.Stok[0].BEDENPNTR != 0 && $scope.Stok[0].RENKPNTR != 0)
                    {   
                        BedenHarInsert(InsertResult.result.recordset[0].ssip_Guid);
                    } 
                    InsertAfterRefresh(DepoSiparisData); 
                    $scope.InsertLock = false
                });
            }            
            else
            {
                console.log(InsertResult.result.err);
                $scope.InsertLock = false 
            }
          
        });
    }
    function UpdateData(Data) 
    {   
        db.ExecuteTag($scope.Firma,'DepoSiparisUpdate',Data.Param,function(InsertResult)
        {      
            db.GetData($scope.Firma,'DepoSiparisGetir',[$scope.Seri,$scope.Sira],function(data)
            {   
                InsertAfterRefresh(data)
            });
        });
    }
    function StokBarkodGetir(pBarkod)
    {
        if(pBarkod != '')
        {
            db.StokBarkodGetir($scope.Firma,pBarkod,$scope.GDepo,function(BarkodData)
            {
                if(BarkodData.length > 0)
                {   
                    $scope.Stok = BarkodData;
                    $scope.Stok[0].Satir = 0;
                    $scope.Stok[0].Miktar = 0;
                    $scope.Stok[0].TOPMIKTAR = 1;
                    db.GetData($scope.Firma,'CmbBirimGetir',[BarkodData[0].KODU],function(data)
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
                    $scope.BarkodLock = true;
                }
                else
                {
                    console.log("Stok Bulunamamıştır.");
                    alertify.alert("Stok Bulunamaıştır!");
                }

            });
            
        }
    }
    $scope.YeniEvrak = async function()
    {
        Init();
        InitStokGrid();
        InitIslemGrid();
        InitPartiLotGrid();
        $scope.MainClick();

        $scope.EvrakLock = false;
        $scope.Seri = UserParam.DepoSiparis.Seri;

        $scope.Stok = 
        [
            {
                SATIR :0,
                MIKTAR :0,
                BIRIM : '',
                BIRIMPNTR : 0, 
                TOPMIKTAR : 1
            }
        ]
        db.DepoGetir($scope.Firma,UserParam.DepoSiparis.CDepoListe,function(data)
        {
            $scope.CDepoListe = data; 
            $scope.CDepo = UserParam.DepoSiparis.CDepo;
            $scope.CDepoListe.forEach(function(item) 
            {
                if(item.KODU == $scope.CDepo)
                    $scope.CDepoAdi = item.ADI;
            });          
        });
        db.DepoGetir($scope.Firma,UserParam.DepoSiparis.GDepoListe,function(data)
        {
            $scope.GDepoListe = data; 
            $scope.GDepo = UserParam.DepoSiparis.GDepo;
            $scope.GDepoListe.forEach(function(item) 
            {
                if(item.KODU == $scope.GDepo)
                    $scope.GDepoAdi = item.ADI;
            });     
        });
        db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(data)
        {   
            $scope.SorumlulukListe = data; 
            $scope.Sorumluluk = UserParam.DepoSiparis.Sorumluluk;
            $scope.SorumlulukListe.forEach(function(item)
            {
                if(item.KODU == $scope.Sorumluluk)
                    $scope.SorumlulukAdi = item.ADI;
            });
        });
        await db.MaxSiraPromiseTag($scope.Firma,'DepoSiparisMaxSira',[$scope.Seri],function(data)
        {
            $scope.Sira = data
        });
        BarkodFocus();
    }
    $scope.Insert = function()
    { $scope.InsertLock = true
        if(typeof($scope.Stok[0].KODU) != 'undefined')
        { 
            if(UserParam.Sistem.SatirBirlestir == 0 || $scope.Stok[0].RENKPNTR != 0 || $scope.Stok[0].BEDENPNTR != 0 || $scope.Stok[0].DETAYTAKIP == 1 || $scope.Stok[0].DETAYTAKIP == 2)
            {
                InsertData();
            }
            else
            {
                let UpdateStatus = false;
                
                angular.forEach($scope.DepoSiparisListe,function(value)
                {  
                    if(value.ssip_stok_kod == $scope.Stok[0].KODU)
                    {   
                        let TmpMiktar = value.ssip_miktar + ($scope.Miktar * $scope.Stok[0].CARPAN);
                       
                        let Data = 
                        {
                            Param :
                            [
                                TmpMiktar,
                                value.ssip_Guid
                            ],
                            BedenPntr : $scope.Stok[0].BEDENPNTR,
                            RenkPntr : $scope.Stok[0].RENKPNTR,
                            Miktar : $scope.Miktar * $scope.Stok[0].CARPAN
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
        {   alertify.alert("Barkod Okutunuz!");
            console.log("Barkod Okutunuz!");
            $scope.InsertLock = false
        }     
        BarkodFocus();
    }
    $scope.BtnStokBarkodGetir = function(keyEvent)
    {
        if(keyEvent.which == 13)
        {   
            StokBarkodGetir($scope.Barkod);

          
        }
    }
    $scope.BtnStokGridGetir = function()
    {
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
            $("#TblStok").jsGrid({data : $scope.StokListe});
        });
    }
    $scope.BtnStokGridSec = function()
    {
        $("#MdlStokGetir").modal('hide');
        StokBarkodGetir($scope.Barkod);
        $scope.BtnStokGridGetir();
        $("#TblStok").jsGrid({pageIndex: true})
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
    $scope.EvrakGetir = function()
    {
        db.GetData($scope.Firma,'DepoSiparisGetir',[$scope.Seri,$scope.Sira],function(data)
        {
            if(data.length > 0)
            {
                Init();
                InitIslemGrid();

                $scope.Seri = data[0].ssip_evrakno_seri;
                $scope.Sira = data[0].ssip_evrakno_sira;

                $scope.BelgeTarih = new Date(data[0].ssip_belge_tarih).toLocaleDateString();
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

                db.GetData($scope.Firma,'BedenHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,9],function(BedenData)
                {
                    $scope.BedenHarListe = BedenData;
                });
                
                db.FillCmbDocInfo($scope.Firma,'CmbDepoGetir',function(e){$scope.CDepoListe = e; $scope.CDepo = data[0].ssip_girdepo.toString()});
                db.FillCmbDocInfo($scope.Firma,'CmbDepoGetir',function(e){$scope.GDepoListe = e; $scope.GDepo = data[0].ssip_cikdepo.toString()});
                db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(e){$scope.SorumlulukListe = e; $scope.Sorumluluk = data[0].ssip_sormerkezi});

                $scope.DepoSiparisListe = data;
                $("#TblIslem").jsGrid({data : $scope.DepoSiparisListe});  
            
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
    $scope.EvrakTipChange = function()
    {
        if($scope.EvrakTip == 0)
        {   
            $scope.Tip = 2;
            $scope.Cins = 6;
            $scope.NormalIade = 0;
        }
        else if($scope.EvrakTip == 15)
        {
            $scope.Tip = 2;
            $scope.Cins = 6;
            $scope.NormalIade = 0;
        }
        db.MaxSiraPromiseTag($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip],function(data){$scope.Sira = data});
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
            }
        ];
        $scope.Miktar = 1;
        $scope.BarkodLock = false;
        
        $scope.BirimListe = [];
        BarkodFocus();      
    }
    $scope.BtnDuzenle = function ()
    {
        $scope.MiktarEdit = $scope.DepoSiparisListe[$scope.IslemListeSelectedIndex].ssip_miktar;
        $("#MdlDuzenle").modal('show');
    }
    $scope.BtnDuzenleKaydet = function(pIndex)
    {
        $scope.Update(pIndex);
        angular.element('#MdlDuzenle').modal('hide');
    }
    $scope.EvrakDelete = function()
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Bu Belgeyi Silmek İstediğinize Eminmisiniz ?', 
        function()
        { 
            if($scope.DepoSiparisListe.length > 0)
            {
                db.ExecuteTag($scope.Firma,'DepoSiparisEvrakDelete',[$scope.Seri,$scope.Sira],function(data)
                {
                    $scope.YeniEvrak();
                });
            }
            else
            {
                alertify.okBtn("Tamam");
                alertify.alert("Silinecek Belge Yok !");
            }
        });
    }
    $scope.BtnBarkodGetirClick = function()
    {
        StokBarkodGetir($scope.Barkod);
    }
    $scope.SatirDelete = function()
    {
        alertify.okBtn('Ever');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Bu Satırı Silmek İstediğinize Eminmisiniz ?', 
        function()
        { 
            if($scope.IslemListeSelectedIndex > -1)
            {
                db.ExecuteTag($scope.Firma,'DepoSiparisSatirDelete',[$scope.DepoSiparisListe[$scope.IslemListeSelectedIndex].ssip_Guid],function(data)
                {   
                    if(typeof(data.result.err) == 'undefined')
                    {  
                        db.ExecuteTag($scope.Firma,'BedenHarDelete',[$scope.DepoSiparisListe[$scope.IslemListeSelectedIndex].ssip_uid,9],function(data)
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
                    
                    if($scope.DepoSiparisListe.length <= 1)
                    {   
                        $scope.YeniEvrak();
                    }
                    else
                    {   
                        db.GetData($scope.Firma,'DepoSiparisGetir',[$scope.Seri,$scope.Sira],function(data)
                        {
                            db.GetData($scope.Firma,'DepoSiparisGetir',[$scope.Seri,$scope.Sira],function(Bedendata)
                            {
                                $scope.BedenHarListe = Bedendata;
                            });
                            $scope.DepoSiparisListe = data;
                            $("#TblIslem").jsGrid({data : $scope.DepoSiparisListe});    
                            ToplamMiktarHesapla();
                        });
                    }

                });
            }
            else
            {
                alertify.okBtn("Tamam");
                alertify.alert("Seçili Bir Satır Olmadan Belgeleri Silemezsiniz !");
            }
        },
        function(){});
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
    $scope.MaxSira = async function()
    {
        await db.MaxSiraPromiseTag($scope.Firma,'DepoSiparisMaxSira',[$scope.Seri],function(data){$scope.EvrakNo = data});
    }
    $scope.Update = function(pIndex)
    {
        let Data1 = 
        {
            Param :
            [
                $scope.MiktarEdit,
                $scope.DepoSiparisListe[pIndex].ssip_Guid
            ],
    
            Miktar : $scope.MiktarEdit
        };
        console.log(Data1)
        console.log($scope.DepoSiparisListe[pIndex])
        UpdateData(Data1);
    }
    $scope.MainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
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
                alertify.alert("Giriş ve Çıkış Deposu Aynı Olamaz!");

                $("#TbMain").addClass('active');
                $("#TbBelgeBilgisi").removeClass('active');
                $("#TbBarkodGiris").removeClass('active');
                $("#TbIslemSatirlari").removeClass('active');
            }
            else
            {
                $("#TbBarkodGiris").addClass('active');
                $("#TbMain").removeClass('active');
                $("#TbBelgeBilgisi").removeClass('active');
                $("#TbIslemSatirlari").removeClass('active');
            }
        }
        BarkodFocus();
    }
    $scope.IslemSatirlariClick = function()
    {   
        $("#TbIslemSatirlari").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
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