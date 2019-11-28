function NakliyeOnayCtrl($scope,$window,$timeout,db)
{
    let IslemSelectedRow = null;
    let StokSelectedRow = null;
    let NakliyeSelectedRow = null;
    let NakliyeIndex

    function Init()
    {
        UserParam = Param[$window.sessionStorage.getItem('User')];
        $scope.Firma = $window.sessionStorage.getItem('Firma');

        $scope.Seri = "";
        $scope.Sira = 0; 
        $scope.EkrakTip = 2;
        $scope.CDepo;
        $scope.GDepo;
        $scope.NDepo;
        $scope.CDepoAdi = UserParam.NakliyeOnay.NDepo
        $scope.GDepoAdi = UserParam.NakliyeOnay.GDepo
        $scope.NDepoAdi = UserParam.NakliyeOnay.NDepo
        $scope.Sorumluluk = UserParam.NakliyeOnay.Sorumluluk;
        $scope.Proje = "";
        $scope.Barkod = "";
        $scope.Birim = "0";
        $scope.StokGridTip = "0";
        $scope.StokGridText = "";
        $scope.Tip = 2;
        $scope.Cins = 6;
        $scope.EvrakTip = 17;
        $scope.NormalIade = 0;
        $scope.BelgeTarih = new Date().toLocaleDateString('tr-TR',{ year: 'numeric', month: 'numeric', day: 'numeric' });
        $scope.PlasiyerKodu = 0; 
        $scope.SatirNo = "";
        $scope.NakTarih1 = new Date().toLocaleDateString('tr-TR',{ year: 'numeric', month: 'numeric', day: 'numeric' });
        $scope.NakTarih2 = new Date().toLocaleDateString('tr-TR',{ year: 'numeric', month: 'numeric', day: 'numeric' });

        $scope.CDepoListe = [];
        $scope.GDepoListe = [];
        $scope.NDepoListe = [];
        $scope.SorumlulukListe = [];
        $scope.BedenHarListe = [];
        $scope.NakliyeOnayListe = [];
        $scope.BirimListe = [];
        $scope.StokListe = [];
        $scope.NakliyeListe = [];

        $scope.Stok1 = [];
        $scope.Miktar = 1;
        $scope.Birim = [];
        $scope.Guid = "";
        $scope.Onaylanan = 0;
        $scope.Toplam = 0;

        $scope.ToplamMiktar = 0;
        $scope.Miktar2 = 0;
        $scope.ToplamSatir = 0;

        $scope.OtoEkle = false;
        $scope.EvrakLock = false;
        $scope.Barkod = "";
        $scope.IslemListeSelectedIndex = -1;
        $scope.NakliyeListeSelectedIndex = 0;
        $scope.MiktarEdit = 0;
        
    }
    function InitIslemGrid()
    {   
        $("#TblIslem").jsGrid({
            responsive: true,
            width: "100%",
            height: "250px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.NakliyeOnayListe,
            
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
                name: "ADI",
                title: "ADI",
                type: "text",
                align: "center",
                width: 200
            }, 
            {
                name: "MIKTAR",
                title: "NAKLİYE MİKTAR",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sth_special1",
                title: "ONAYLANAN MİKTAR",
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
    function InitNakliyeListeGrid()
    {
        $("#TblNakliyeListe").jsGrid
        (   {
            width: "100%",
            height: "250px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.NakliyeListe,
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
                    name: "CDEPO",
                    title: "CIKIS DEPO",
                    type: "number",
                    align: "center",
                    width: 150
                } , 
                {
                    name: "NDEPO",
                    title: "NAKLIYE DEPO",
                    type: "number",
                    align: "center",
                    width: 150
                } , 
                {
                    name: "GDEPO",
                    title: "GIRIS DEPO",
                    type: "number",
                    align: "center",
                    width: 150
                } , 
            ],
            rowClick: function(args)
            {
                $scope.NakliyeListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function ToplamMiktarHesapla()
    {
        $scope.ToplamMiktar = 0;
        $scope.ToplamSatir = 0;

        angular.forEach($scope.NakliyeOnayListe,function(value)
        {
            $scope.ToplamMiktar += value.sth_miktar;
            $scope.ToplamSatir += 1 ;
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

        $scope.NakliyeOnayListe = pData;
        $("#TblIslem").jsGrid({data : $scope.NakliyeOnayListe});    
        $scope.BtnTemizle();
        ToplamMiktarHesapla();
        
        $window.document.getElementById("Barkod").focus();
    } 
    function UpdateData(pData) 
    { console.log(pData)
        if((parseFloat($scope.NakliyeOnayListe[NakliyeIndex].sth_special1) + parseFloat($scope.Miktar)) <=  $scope.NakliyeOnayListe[NakliyeIndex].MIKTAR)
        {
            db.ExecuteTag($scope.Firma,'NakliyeOnayUpdate',pData.Param,function(pData)
            { 
                if(pData != 0)
                {
                    db.GetData($scope.Firma,'NakliyeGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(BosData)
                    {
                        InsertAfterRefresh(BosData)
                    });
                }
            });
        }
        else
        {
            alertify.alert("Girdiğiniz Miktar Nakliye Miktarından Büyük!");
            BarkodLock = false
            InsertLock = false
        }
    }
    function StokBarkodGetir(pBarkod)
    {
        
            if(pBarkod != '')
            {
                db.StokBarkodGetir($scope.Firma,pBarkod,$scope.CDepo,function(BarkodData)
                {
                    $scope.Stok1 = BarkodData;
                    let x = NakliyeStokKontrol($scope.Stok1[0].KODU,$scope.NakliyeOnayListe);
                    if(x)
                    {
                        if($scope.NakliyeOnayListe[NakliyeIndex].sth_special1 == "")
                            $scope.NakliyeOnayListe[NakliyeIndex].sth_special1 = 0
                        
                        db.GetData($scope.Firma,'CmbBirimGetir',[$scope.Stok1[0].KODU],function(data)
                        {   
                            $scope.BirimListe = data; 
                            $scope.Birim = JSON.stringify($scope.Stok1[0].BIRIMPNTR);

                            if($scope.BirimListe.length > 0)
                            {
                                $scope.Stok1[0].BIRIMPNTR = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].BIRIMPNTR;
                                $scope.Stok1[0].BIRIM = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].BIRIM;
                                $scope.Stok1[0].CARPAN = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].KATSAYI;
                            }

                            $scope.MiktarFiyatValid();    
                            
                        });  
                        $scope.Onaylanan = $scope.NakliyeOnayListe[NakliyeIndex].sth_special1      
                        $scope.Toplam =  $scope.NakliyeOnayListe[NakliyeIndex].MIKTAR
                        if($scope.OtoEkle == true)
                        {
                            $scope.Ekle();
                        }

                        $("#Miktar").focus()
                    }
                    else
                    {
                        alertify.alert("Okuttuğunuz Stoğun Nakliyesi Tamamlandı Veya Nakliye Evrağında Yok!");
                        $scope.BtnTemizle()
                    }
                });
               
            }
            else
            {
                alertify.alert("Barkod Okutunuz!");
                BarkodLock = false
                InsertLock = false
            }
    }
    function NakliyeStokKontrol(pStokKodu,pDataListe)
    {
        for(var i = 0; i < pDataListe.length; i++)
        {  
          if(pStokKodu == pDataListe[i].sth_stok_kod) 
          { 
              if(pDataListe[i].sth_special1 != pDataListe[i].MIKTAR)
              {
                NakliyeIndex = i;
                return true;
              }
          }
        } 
        return false;
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
    $scope.MaxSira = function()
    {
        db.MaxSira($scope.Firma,'MaxStokHarSira',[$scope.DepoNo,$scope.Tarih],function(data){$scope.EvrakNo = data});
    }
    $scope.YeniEvrak = function ()
    {
        Init();
        InitIslemGrid();
        InitStokGrid();
        InitNakliyeListeGrid()
        $scope.MainClick();
        InsertAfterRefresh(UserParam.NakliyeOnay)
        
       
        $scope.EvrakLock = false;
        $scope.Seri = UserParam.NakliyeOnay.Seri;
        $scope.BelgeNo = UserParam.NakliyeOnay.BelgeNo;

   
 

        db.MaxSira($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EkrakTip],function(data)
        {
            $scope.Sira = data
        });
      
        db.MaxSira($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip],function(data){$scope.Sira = data});
        
        BarkodFocus();

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
    }
    $scope.BtnStokBarkodGetir = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            StokBarkodGetir($scope.Barkod);
            BarkodLock = true    
        }
    }
    $scope.BtnNakliyeListele = async function()
    {
        let TmpParam = [$scope.NakTarih1,$scope.NakTarih2,17];

        await db.GetPromiseTag($scope.Firma,"NakliyeListele",TmpParam,function(data)
        {
            $scope.NakliyeListe = data;
            $("#TblNakliyeListe").jsGrid({data : $scope.NakliyeListe});
        });
    }
    $scope.BtnNakliyeSec = function()
    {
        db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function()
        {   
         
            Init()
            InitIslemGrid()
            
            $scope.Seri =  $scope.NakliyeListeItem.SERI;
            $scope.Sira =  $scope.NakliyeListeItem.SIRA;
            $scope.EvrakTip = $scope.NakliyeListeItem.TIP;
            $scope.Tarih = new Date($scope.NakliyeListeItem.TARIH).toLocaleDateString();
            $scope.Barkod = "";



           $scope.NakliyeListeItem.MIKTAR

            db.DepoGetir($scope.Firma,UserParam.NakliyeOnay.CDepoListe,function(e)
            {
                $scope.CDepoListe = e; 
                $scope.CDepo = $scope.NakliyeListeItem.CDEPO.toString();
                $scope.CDepoListe.forEach(function(item) 
                {
                    if(item.KODU == $scope.NakliyeListeItem.CDEPO)
                        $scope.CDepoAdi = item.ADI;
                });          
            });
            db.DepoGetir($scope.Firma,UserParam.NakliyeOnay.GDepoListe,function(e)
            {
                $scope.GDepoListe = e; 
                $scope.GDepo = $scope.NakliyeListeItem.GDEPO.toString();
                $scope.GDepoListe.forEach(function(item) 
                {
                    if(item.KODU == $scope.NakliyeListeItem.GDEPO)
                        $scope.GDepoAdi = item.ADI;
                });          
            });
            db.DepoGetir($scope.Firma,UserParam.NakliyeOnay.NDepoListe,function(e)
            {
                $scope.NDepoListe = e; 
                $scope.NDepo = $scope.NakliyeListeItem.NDEPO.toString();
                $scope.NDepoListe.forEach(function(item) 
                {
                    if(item.KODU == $scope.NakliyeListeItem.NDEPO)
                        $scope.NDepoAdi = item.ADI;
                }); 
            });
            console.log($scope.NakliyeListeItem)
        $scope.MainClick();
        $scope.EvrakGetir();

      });
    }
    $scope.MiktarFiyatValid = function()
    {
        $scope.Stok1[0].TOPMIKTAR = $scope.Stok1[0].CARPAN * $scope.Miktar
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
    $scope.NakliyeListeRowClick = function(pIndex,pItem,pObj)
    {   
        if ( NakliyeSelectedRow ) { NakliyeSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        NakliyeSelectedRow = $row;
        $scope.NakliyeListeSelectedIndex = pIndex;
        $scope.NakliyeListeItem = pItem;
    }
    $scope.BtnTemizle = function()
    {
        $scope.Barkod = "";
        $scope.Stok1 = null;
        $scope.Stok1 = 
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
    $scope.MiktarPress = function(keyEvent)
    {
        if(keyEvent.which == 40)
        {
            $window.document.getElementById("Miktar").focus();
            $window.document.getElementById("Miktar").select();
        }
        if(keyEvent.which == 13)
        {
            $scope.Ekle();
        }
    }
    $scope.EvrakAdi = function()
    {
        if($scope.EvrakTip == 17)
        {
            return 'Depo Nakliye';
        }
    }
    $scope.EvrakTipChange = function()
    {
        if($scope.EvrakTip == 17)
        {   
            $scope.Tip = 2;
            $scope.Cins = 6;
            $scope.NormalIade = 0;
        }
        db.MaxSira($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip],function(data){$scope.Sira = data});
    }
    $scope.BirimChange = function()
    {
        if($scope.BirimListe.length > 0)
        {
            $scope.Stok1[0].BIRIMPNTR = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].BIRIMPNTR;
            $scope.Stok1[0].BIRIM = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].BIRIM;
            $scope.Stok1[0].CARPAN = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].KATSAYI;
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
    $scope.NDepoChange = function()
    {
        $scope.NDepoListe.forEach(function(item) 
        {
            if(item.KODU == $scope.NDepo)
                $scope.NDepoAdi = item.ADI;
        });
    }
    $scope.BtnBarkodGetirClick = function()
    {
        StokBarkodGetir($scope.Barkod);
    }
    $scope.Ekle = function()
    {
        $scope.InsertLock = true
  
        if(typeof($scope.Stok1[0].KODU) != 'undefined')
            {
                let Data = 
                {
                    Param :
                    [
                        $scope.Special = parseFloat($scope.NakliyeOnayListe[NakliyeIndex].sth_special1)+parseFloat($scope.Miktar),
                        0, // NAKLIYE DURUMU
                        $scope.NakliyeOnayListe[NakliyeIndex].sth_Guid,
                    ],
                    Miktar : $scope.Miktar * $scope.Stok1[0].CARPAN
                };
                UpdateData(Data);
                $scope.InsertLock = false 
            }                        
        BarkodFocus();
    }
    $scope.MiktarFiyatValid = function()
    {
        $scope.Stok1[0].TOPMIKTAR = $scope.Stok1[0].CARPAN * $scope.Miktar
    }
    $scope.BtnTemizle = function()
    {
        $scope.Barkod = "";
        $scope.Stok1 = null;
        $scope.Stok1 = 
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
    $scope.EvrakDelete = function()
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Evrağı silmek istediğinize eminmisiniz ?', 
        function()
        { 
            if($scope.NakliyeOnayListe.length > 0)
            {
                if(UserParam.NakliyeOnay.EvrakSil == 0)
                {
                    db.ExecuteTag($scope.Firma,'StokHarEvrDelete',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
                    {
                        if(typeof(data.result.err) == 'undefined')
                        {
                            angular.forEach($scope.NakliyeOnayListe,function(value)
                            {
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
                    alertify.alert("Belge Silme Yetkiniz Yok !");
                }
            }
            else
            {
                alertify.okBtn("Tamam");
                alertify.alert("Kayıtlı Belge Yok!");
            }
        }
        ,function(){});
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
                if(UserParam.NakliyeOnay.EvrakSil == 0)
                {
                    db.ExecuteTag($scope.Firma,'StokHarSatirDelete',[$scope.NakliyeOnayListe[$scope.IslemListeSelectedIndex].sth_Guid],function(data)
                    {
                        if(typeof(data.result.err) == 'undefined')
                        {
                            db.ExecuteTag($scope.Firma,'BedenHarDelete',[$scope.NakliyeOnayListe[$scope.IslemListeSelectedIndex].sth_Guid,9],function(data)
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
                        
                        if($scope.NakliyeOnayListe.length <= 1)
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

                                $scope.NakliyeOnayListe = data;
                                $("#TblIslem").jsGrid({data : $scope.NakliyeOnayListe});    
                                $scope.BtnTemizle();
                                ToplamMiktarHesapla();
                            });
                        }
                    });
                }
                else
                {
                    alertify.okBtn("Ok");
                    alertify.alert("Belgeleri silme yetkiniz yok !");
                }
            }
            else
            {
                alertify.okBtn("Ok");
                alertify.alert("Seçili satır olmadan belgeleri silemezsiniz !");
            }
        },
        function(){});
    }
    $scope.BtnKaydetClick = function()
    {
        for(var i = 0; i < $scope.NakliyeOnayListe.length; i++)
        { console.log($scope.NakliyeOnayListe[i])
            let pData = 
            {
                Param :
                [
                    $scope.NakliyeOnayListe[i].sth_special1,
                    1, // NAKLIYE DURUMU
                    1, //TERMİNALDEN YAPILDIĞINA DAİR DURUM
                    $scope.NakliyeOnayListe[i].sth_Guid
                ],
                Miktar : $scope.Miktar * $scope.Stok1[0].CARPAN
                
            };
            db.ExecuteTag($scope.Firma,'NakliyeOnayKaydet',pData.Param,function(pData)
            {
                if(pData != 0)
                {
                    db.GetData($scope.Firma,'NakliyeGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(BosData)
                    {
                        InsertAfterRefresh(BosData)
                    });
                }
            });
            if($scope.NakliyeOnayListe[i].MIKTAR != $scope.NakliyeOnayListe[i].sth_special1)
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
                    $scope.NakliyeOnayListe[i].sth_stok_kod,
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
                    0, //PLASİYER
                    0, //HARDOVİZCİNSİ
                    0, //HARDOVİZKURU
                    0, //ALTDOVİZKURU
                    0, //STOKDOVİZCİNSİ
                    0, //STOKDOVİZKURU
                    parseFloat($scope.NakliyeOnayListe[i].MIKTAR) - parseFloat($scope.NakliyeOnayListe[i].sth_special1),
                    $scope.Miktar2,
                    0,
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
                    $scope.GDepo,
                    $scope.CDepo,
                    $scope.BelgeTarih, // MALKABULTARİH
                    '', // CARİSORUMLULUKMERKEZİ
                    '', // STOKSORUMLULUKMERKEZİ
                    0,  // VERGİSİZFL
                    0,  // ADRESNO
                    0,
                    0,
                    '', // PROJE
                    '', // EXİMKODU
                    0,  // DİSTİCARETTURU
                    0,  // OTVVERGİSİZFL
                    0,  // OİVVERGİSİZ
                    0,   // FİYATLİSTENO
                    $scope.NDepo,
                    0,
                    
                ];
                console.log(InsertData)
                db.ExecuteTag($scope.Firma,'NakliyeInsert',InsertData)
            }
        }
    }
    $scope.EvrakGetir = function()
    {
        {   
            db.GetData($scope.Firma,'NakliyeGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
            {   
                if(data.length > 0)
                {
                    Init();
                    InitIslemGrid()
                    
                    $scope.Seri = data[0].sth_evrakno_seri;
                    $scope.Sira = data[0].sth_evrakno_sira;
                    $scope.EvrakTip = data[0].sth_evraktip.toString();
                    $scope.BelgeNo = data[0].sth_belge_no;
                    $scope.Tarih = moment(new Date(data[0].sth_tarih)).format("DD.MM.YYYY");
                    $scope.BelgeTarih = moment(new Date(data[0].sth_belge_tarih)).format("DD.MM.YYYY");
                    console.log($scope.BelgeTarih)
                    $scope.Barkod = "";
                    $scope.Stok1 = 
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
    
                   
                    db.DepoGetir($scope.Firma,UserParam.DepoNakliye.CDepoListe,function(e)
                    {
                        $scope.CDepoListe = e; 
                        $scope.CDepo = data[0].sth_cikis_depo_no.toString();
                        $scope.CDepoListe.forEach(function(item) 
                        {
                            if(item.KODU == data[0].sth_cikis_depo_no)
                                $scope.CDepoAdi = item.ADI;
                        });          
                    });
                    db.DepoGetir($scope.Firma,UserParam.DepoNakliye.GDepoListe,function(e)
                    {
                        $scope.GDepoListe = e; 
                        $scope.GDepo = data[0].sth_giris_depo_no.toString();
                        $scope.GDepoListe.forEach(function(item) 
                        {
                            if(item.KODU == data[0].sth_giris_depo_no)
                                $scope.GDepoAdi = item.ADI;
                        });          
                    });
                    db.DepoGetir($scope.Firma,UserParam.DepoNakliye.NDepoListe,function(e)
                    {
                        $scope.NDepoListe = e; 
                        $scope.NDepo = data[0].sth_nakliyedeposu.toString();
                        $scope.NDepoListe.forEach(function(item) 
                        {
                            if(item.KODU == data[0].sth_nakliyedeposu)
                                $scope.NDepoAdi = item.ADI;
                        });          
                    });
                    db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(e){$scope.SorumlulukListe = e; $scope.Sorumluluk = data[0].sth_stok_srm_merkezi});
                    db.FillCmbDocInfo($scope.Firma,'CmbProjeGetir',function(e){$scope.ProjeListe = e; $scope.Proje = data[0].sth_proje_kodu}); 
                
                    $scope.NakliyeOnayListe = data;
                    $("#TblIslem").jsGrid({data : $scope.NakliyeOnayListe});  
                  
                    ToplamMiktarHesapla();
    
                    $scope.EvrakLock = true;
                    $scope.BarkodLock = false;
    
                    angular.element('#MdlEvrakGetir').modal('hide');
    
                    BarkodFocus();
                }
                else
                {
                    angular.element('#MdlEvrakGetir').modal('hide');
                    alertify.okBtn("Ok");
                    alertify.alert("No documents found !");
                }
            });
        }
    }
    $scope.MainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbNakliyeSecim").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
    }
    $scope.NakliyeSecimClick = function() 
    {
        $("#TbNakliyeSecim").addClass('active');
        $("#TbMain").removeClass('active');
    }
    $scope.BarkodGirisClick = function()
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
    $scope.IslemSatirlariClick = function()
    {   
 
            $("#TbIslemSatirlari").addClass('active');
            $("#TbMain").removeClass('active');
            $("#TbBelgeBilgisi").removeClass('active');
            $("#TbBarkodGiris").removeClass('active');
        
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
            console.log($scope.NakliyeOnayListe[0])
            AktarimSiraGetir($scope.NakliyeOnayListe[0].sth_evrakno_seri,$scope.NakliyeOnayListe[0].sth_evrakno_sira, async function(EvrakSira)
            {
                alertify.okBtn("Tamam");
                alertify.alert("Sayım fişi aktarımı başladı.");
                console.log(EvrakSira)
                for(i = 0;i < $scope.NakliyeOnayListe.length;i++)
                {
                    localStorage.mode = 'true';
                    console.log($scope.NakliyeOnayListe[i].sth_special1.length)
                    if($scope.NakliyeOnayListe[i].sth_special1.length > 0)
                    {
                        let pData = 
                        {
                            Param :
                            [
                                $scope.NakliyeOnayListe[i].sth_special1,
                                1, // NAKLIYE DURUMU
                                $scope.NakliyeOnayListe[i].sth_giris_depo_no,
                                $scope.NakliyeOnayListe[i].sth_nakliyedeposu,
                                $scope.NakliyeOnayListe[i].sth_Guid,

                            ],
                            Miktar : $scope.Miktar * $scope.Stok1[0].CARPAN
                            
                        };
                        console.log(pData.Param)
                        db.ExecuteTag($scope.Firma,'NakliyeOnayKaydet',pData.Param,function(pData)
                        {
                            console.log(pData)
                        });
                    }
                    else if($scope.NakliyeOnayListe[i].sth_special1.length <= 0)
                    {
                        var InsertData = 
                        [
                            1,
                            1,
                            0, //FİRMA NO
                            0, //ŞUBE NO
                            $scope.Tarih,
                            $scope.NakliyeOnayListe[i].sth_tip,
                            $scope.NakliyeOnayListe[i].sth_cins,
                            $scope.NakliyeOnayListe[i].sth_normal_iade,
                            $scope.NakliyeOnayListe[i].sth_evraktip,
                            $scope.NakliyeOnayListe[i].sth_evrakno_seri,
                            $scope.NakliyeOnayListe[i].sth_evrakno_sira,
                            $scope.NakliyeOnayListe[i].sth_belge_no,
                            $scope.Tarih,
                            $scope.NakliyeOnayListe[i].sth_stok_kod,
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
                            '', //CARIKOD
                            $scope.NakliyeOnayListe[i].sth_plasiyer_kodu,
                            0, //HARDOVİZCİNSİ
                            0, //HARDOVİZKURU
                            0, //ALTDOVİZKURU
                            0, //STOKDOVİZCİNSİ
                            0, //STOKDOVİZKURU
                            $scope.NakliyeOnayListe[i].sth_miktar,
                            $scope.NakliyeOnayListe[i].sth_miktar2,
                            $scope.NakliyeOnayListe[i].sth_birim_pntr,
                            $scope.NakliyeOnayListe[i].sth_tutar,
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
                            $scope.NakliyeOnayListe[i].sth_vergi_pntr, //VERİPNTR
                            $scope.NakliyeOnayListe[i].sth_vergi,             //VERGİ
                            0, // MASRAFVERGİPNTR,
                            0, // MASRAFVERGİ
                            $scope.NakliyeOnayListe[i].sth_odeme_op,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                            '',//AÇIKLAMA
                            '00000000-0000-0000-0000-000000000000', //sth_sip_uid
                            '00000000-0000-0000-0000-000000000000', //sth_fat_uid,
                            $scope.NakliyeOnayListe[i].sth_giris_depo_no, //GİRİSDEPONO
                            $scope.NakliyeOnayListe[i].sth_cikis_depo_no,             //CİKİSDEPONO
                            $scope.Tarih, //MALKABULSEVKTARİHİ
                            '', // CARİSORUMLULUKMERKEZİ
                            $scope.NakliyeOnayListe[i].sth_stok_srm_merkezi,
                            0,  // VERGİSİZFL
                            $scope.NakliyeOnayListe[i].sth_parti_kodu,
                            $scope.NakliyeOnayListe[i].sth_lot_no,
                            0,  // LOT
                            $scope.NakliyeOnayListe[i].sth_proje_kodu,
                            '', // EXİMKODU
                            0,  // DİSTİCARETTURU
                            0,  // OTVVERGİSİZFL
                            0,  // OİVVERGİSİZ
                            $scope.NakliyeOnayListe[i].sth_fiyat_liste_no,
                            $scope.NakliyeOnayListe[i].sth_nakliyedeposu,
                            $scope.NakliyeOnayListe[i].sth_nakliyedurumu
                        ];
                        
                        await db.ExecuteTag($scope.Firma,'StokHarInsert',InsertData,function(InsertResult)
                        {    
                            if(typeof(InsertResult.result.err) == 'undefined')
                            {
                                localStorage.mode = 'false';
                            }
                        });
                    }    
                };

                alertify.alert("Depo Nakliye fişi aktarımı tamamlandı.");
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
