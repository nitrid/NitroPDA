function FireCtrl($scope,$window,$timeout,db)
{
    let IslemSelectedRow = null;
    let StokSelectedRow = null;
    function Init()
    {
        gtag('config', 'UA-12198315-14', 
        {
            'page_title' : 'Fire Fişi',
            'page_path': '/Fire'
        });

        UserParam = Param[$window.sessionStorage.getItem('User')];
        $scope.Firma = $window.sessionStorage.getItem('Firma');

        $scope.EvrakTip = 0;
        $scope.Seri = "";
        $scope.Sira = 0;
        $scope.BelgeNo = "";
        $scope.BelgeTarih = new Date().toLocaleDateString('tr-TR',{ year: 'numeric', month: 'numeric', day: 'numeric' });
        $scope.DepoNo;
        $scope.DepoAdi = "";
        $scope.Tip = 1;
        $scope.Cins = 4;
        $scope.NormalIade = 0;
        $scope.Barkod = "";
        $scope.Birim = "0";
        $scope.StokGridTip = "0";
        $scope.StokGridText = "";
        $scope.Miktar = 0;
        $scope.Miktar2 = 0;
        $scope.Sorumluluk;
        $scope.GiderKodu;
        $scope.GiderKoduAdi = "";

        $scope.EvrakLock = false;
        $scope.IslemListeSelectedIndex = -1;

        $scope.ToplamMiktar = 0;
        $scope.ToplamSatir = 0;

        $scope.DepoListe = [];
        $scope.FireListe = [];
        $scope.BirimListe = [];
        $scope.StokListe = [];
        $scope.SorumlulukListe = [];
        $scope.GiderKoduListe = [];
        
        $scope.Stok = [];
        $scope.Birim = [];
        $scope.Satir = 0;
        $scope.Miktar = 1;

        // DÜZENLE MODAL
        $scope.MiktarEdit = 0;
    }
    function StokBarkodGetir(pBarkod)
    {
        if(pBarkod != '')
        {
            db.StokBarkodGetir($scope.Firma,pBarkod,$scope.DepoNo,function(BarkodData)
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
                    });
                    
                }
                else
                {
                    console.log("Stok Bulunamamıştır.");
                }
            });
        }
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
            data : $scope.FireListe,
            
            fields: 
            [{
                name: "NO",
                title: "NO",
                type: "number",
                align: "center",
                width: 75
                
            }, {
                name: "ADI",
                title: "ADI",
                type: "text",
                align: "center",
                width: 300
            }, {
                name: "MIKTAR",
                title: "MIKTAR",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "MIKTAR2",
                title: "MIKTAR 2",
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
            width: "100%",
            height: "400px",
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
    function InsertData()
    {
        var InsertData = 
        [
            UserParam.MikroId,
            UserParam.MikroId,
            0, //FİRMA NO
            0, //ŞUBE NO
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
            1, //ISKONTO TUTAR 1
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
            "",
            $scope.GiderKodu,//İŞEMRİ KODU
            "", //PLASİYERKODU
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
            '00000000-0000-0000-0000-000000000000', //sth_sip_uid
            '00000000-0000-0000-0000-000000000000' , //sth_fat_uid,
            $scope.DepoNo, //GİRİSDEPO
            $scope.DepoNo, //CİKİSDEPO
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
            1,  // FİYATLİSTENO
            0,   //NAKLİYEDEPO 
            0
        ];
        console.log(InsertData)
        db.ExecuteTag($scope.Firma,'StokHarInsert',InsertData,function(InsertResult)
        {
            if(typeof(InsertResult.result.err) == 'undefined')
            {   
                 
                if(typeof($scope.Stok[0].sth_Guid) != 'undefined')
                {
                    db.ExecuteTag($scope.Firma,'StokHarUpdate',[$scope.Miktar * $scope.Stok[0].CARPAN,$scope.Stok[0].sth_Guid]);
                }

                db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,],function(FireData)
                {
                    InsertAfterRefresh(FireData);
                });
            }
            else
            {
                console.log(InsertResult.result.err);
            }
            alertify.alert("Kayıt İşlemi Gerçekleştirildi !");
        });
    }
    function UpdateData(pData) 
    {
        db.ExecuteTag($scope.Firma,'StokHarUpdate',pData.Param,function(InsertResult)
        {   
            if(typeof(InsertResult.result.err) == 'undefined')
            {   
                db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(FireData)
                {   
                    InsertAfterRefresh(FireData);
                });
            }
            else
            {
                console.log(InsertResult.result.err);
            }
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

        $scope.FireListe = pData;
        $("#TblIslem").jsGrid({data : $scope.FireListe});    
        $scope.BtnTemizle();
        ToplamMiktarHesapla();
        
        $window.document.getElementById("Barkod").focus();
    }
    function ToplamMiktarHesapla()
    {
        $scope.ToplamMiktar = 0;
        $scope.ToplamSatir = 0;

        angular.forEach($scope.FireListe,function(value)
        {
            $scope.ToplamMiktar += value.sth_miktar;
            $scope.ToplamSatir += 1 ;
        });
    }
    $scope.MaxSira = function()
    {
        db.MaxSiraPromiseTag($scope.Firma,'MaxStokHarSira',[$scope.DepoNo,$scope.Tarih],function(data){$scope.EvrakNo = data});
    }
    $scope.YeniEvrak =  function()
    {
        Init();
        InitIslemGrid();
        InitStokGrid();
        $scope.MainClick();

        $scope.EvrakLock = false;
        $scope.EvrakTip = UserParam.Fire.EvrakTip;
        $scope.Seri = UserParam.Fire.Seri;
        $scope.EvrakTipChange();

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

        db.DepoGetir($scope.Firma,UserParam.Fire.DepoListe,function(data)
        {   
            $scope.DepoListe = data; 
            $scope.DepoNo = UserParam.Fire.DepoNo;
            $scope.DepoListe.forEach(function(item) 
            {
                if(item.KODU == $scope.DepoNo)
                    $scope.DepoAdi = item.ADI;
            });          
        });
        db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(data)
        {
            $scope.SorumlulukListe = data; 
            $scope.Sorumluluk = UserParam.Fire.Sorumluluk
        });
        db.MaxSiraPromiseTag($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip],function(data)
        {
            $scope.Sira = data
        });

        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "SELECT his_kod AS KODU,his_isim AS ADI FROM MASRAF_HESAPLARI " ,
        }
        db.GetDataQuery(TmpQuery,function(Data)
        {
            $scope.GiderKoduListe = Data;
            $scope.GiderKodu = UserParam.Fire.IsEmriGiderKodu;
            $scope.GiderKoduListe.forEach(function(item) 
            {
                if(item.KODU == $scope.GiderKodu)
                    $scope.GiderKoduAdi = item.ADI;
            });
        });
        BarkodFocus();
    }
    $scope.BtnStokBarkodGetir = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            StokBarkodGetir($scope.Barkod);    
        }
    }
    $scope.EvrakTipChange = function()
    {
        $scope.Tip = 1;
        $scope.Cins = 4;
        $scope.NormalIade = 0;
       
        db.MaxSiraPromiseTag($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip],function(data){$scope.Sira = data});
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
    $scope.DepoChange = function()
    {
        $scope.DepoListe.forEach(function(item) 
        {
            if(item.KODU == $scope.DepoNo)
                $scope.DepoAdi = item.ADI;
        });
    }
    $scope.GiderKoduChange = function()
    {
        $scope.GiderKoduListe.forEach(function(item) 
        {
            if(item.KODU == $scope.GiderKodu)
            $scope.GiderKoduAdi = item.ADI;
        });
    }
    $scope.BtnStokGridGetir = function()
    {
        let Kodu = '';
        let Adi = '';

        if($scope.StokGridTip == "0")
        {
            Kodu = $scope.StokGridText.replace("*","%").replace("*","%");
        }
        else
        {
            Adi = $scope.StokGridText.replace("*","%").replace("*","%");
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
    }
    $scope.MiktarFiyatValid = function()
    {
        $scope.Stok[0].TOPMIKTAR = $scope.Stok[0].CARPAN * $scope.Miktar
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
    $scope.Insert = function()
    {
        if(typeof($scope.Stok[0].KODU) != 'undefined')
        {
            if(UserParam.Sistem.SatirBirlestir == 0)
            {
                InsertData();
            }
            else
            {
                let UpdateStatus = false;

                angular.forEach($scope.FireListe,function(value)
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
                                $scope.Stok[0].FIYAT * TmpMiktar,
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
                                value.Sth_Guid
                            ],
                            BedenPntr : $scope.Stok[0].BEDENPNTR,
                            RenkPntr : $scope.Stok[0].RENKPNTR,
                            Miktar : $scope.Miktar * $scope.Stok[0].CARPAN
                        };
                        
                        UpdateStatus = true;
                        UpdateData(Data);
                    }
                });
                if(!UpdateStatus)
                {
                    InsertData();
                } 
            }
        }
        else
        {   alertify.alert("Barkod Okutunuz!");
            console.log("Barkod Okutunuz!");
        }
        BarkodFocus();
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
    $scope.BtnDuzenle = function ()
    {
        $scope.MiktarEdit = $scope.FireListe[$scope.IslemListeSelectedIndex].sth_miktar;
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
            if($scope.FireListe.length > 0)
            {
                if(UserParam.Fire.EvrakSil == 0)
                {
                    db.ExecuteTag($scope.Firma,'StokHarEvrDelete',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
                    {
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
        ,function(){});
    }
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


                db.DepoGetir($scope.Firma,UserParam.Fire.DepoListe,function(e)
                {
                    $scope.DepoListe = e; 
                    $scope.DepoNo = data[0].sth_cikis_depo_no.toString();
                    $scope.DepoListe.forEach(function(item) 
                    {
                        if(item.KODU == data[0].sth_cikis_depo_no)
                            $scope.DepoAdi = item.ADI;
                    });          
                });
                db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(e){$scope.SorumlulukListe = e; $scope.Sorumluluk = data[0].sth_stok_srm_merkezi});
            
                $scope.FireListe = data;
                $("#TblIslem").jsGrid({data : $scope.FireListe});  
            
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
    $scope.SatirDelete = function()
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Bu Satırı Silmek İstediğinize Eminmisiniz  ?', 
        function()
        { 
            if($scope.IslemListeSelectedIndex > -1)
            {
                if(UserParam.Fire.EvrakSil == 0)
                {
                    db.ExecuteTag($scope.Firma,'StokHarSatirDelete',[$scope.FireListe[$scope.IslemListeSelectedIndex].sth_Guid],function(data)
                    {
                        if($scope.FireListe.length <= 1)
                        {
                            $scope.YeniEvrak();
                        }
                        else
                        {   
                            db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
                            {
                                $scope.FireListe = data;
                                $("#TblIslem").jsGrid({data : $scope.FireListe});    
                                $scope.BtnTemizle();
                                ToplamMiktarHesapla();
                            });
                        }
                    });
                }
                else
                {
                    alertify.okBtn("Tamam");
                    alertify.alert("Belge Silme Yetkiniz Yok !");
                }
            }
            else
            {
                alertify.okBtn("Tamam");
                alertify.alert("Satır Seçmeden Silemezsiniz !");
            }
        },
        function(){});
    }
    $scope.Update = function(pIndex)
    {
        let Data = 
        {
            Param :
            [
                $scope.MiktarEdit,
                $scope.Miktar2,
                0, //TURAR
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
                $scope.FireListe[pIndex].sth_Guid
            ],
            BedenPntr : 0,
            RenkPntr : 0,
            Miktar : $scope.MiktarEdit
        };
        
        UpdateData(Data);
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
        else if($scope.GiderKodu == "")
        {
            alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Gider Kodu Seçin" + "</a>" );
        }
        else
        { 
            $("#TbBarkodGiris").addClass('active');
            $("#TbMain").removeClass('active');
            $("#TbBelgeBilgisi").removeClass('active');         
            $("#TbIslemSatirlari").removeClass('active');
            $("#TbBarkodGiris").addClass('active');
            $("#TbMain").removeClass('active');
            $("#TbBelgeBilgisi").removeClass('active');
            $("#TbIslemSatirlari").removeClass('active');
        }
    }
    $scope.IslemSatirlariClick = function()
    {   
        $("#TbMain").addClass('active');
        $("#TbIslemSatirlari").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
    }
}