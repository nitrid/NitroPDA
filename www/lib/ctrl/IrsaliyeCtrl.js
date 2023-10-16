function IrsaliyeCtrl($scope,$window,$timeout,db,$filter)
{      
    let CariSelectedRow = null;
    let IslemSelectedRow = null;
    let StokSelectedRow = null;
    let MKupSelectedRow = null;
    let PartiLotSelectedRow = null;
    let SeriNoSelectedRow = null;
    let EvrakGetirListeSelectedRow = null;
    let ProjeEvrakSelectedRow = null;
    let IhracatSelectedRow = null;
    let ParamName = "";

    $('#MdlPartiLot').on('hide.bs.modal', function () 
    {
        if($scope.TxtParti == "" && $scope.TxtLot == 0)
        {
            
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
            'page_title' : 'İrsaliye',
            'page_path': '/Irsaliye'
        });

        UserParam = Param[$window.sessionStorage.getItem('User')];
        $scope.Firma = $window.sessionStorage.getItem('Firma');

        $scope.Seri = "";
        $scope.GetirSira = "";
        $scope.Sira = 0;
        $scope.EvrakTip = 13;
        $scope.CariKodu = "";
        $scope.CariAdi = "";
        $scope.CariSoyAdi = "";
        $scope.CariFiyatListe = 0;
        $scope.CariDovizCinsi = 0;
        $scope.CariDovizKuru = 0;
        $scope.BelgeNo = "";
        $scope.DepoNo;
        $scope.DepoAdi = "";
        $scope.Tip = 0;
        $scope.NormalIade = 0;
        $scope.Tarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.Tarih2 = moment(new Date()).format("DDMMYYYY");
        $scope.Tarih2Ters = moment(new Date()).format("YYYYMMDD");
        $scope.Saat = moment(new Date()).format("LTS");
        $scope.MalKabulSevkTarihi = moment(new Date()).format("DD.MM.YYYY");
        $scope.IlkTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.SonTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.BelgeTarih = 0;
        $scope.Sorumluluk = "";
        $scope.SorumlulukAdi = "";
        $scope.OdemeNo = "0";
        $scope.Barkod = "";
        $scope.Birim = 0;
        $scope.StokGridTip = "0";
        $scope.StokGridText = "";
        $scope.Personel = "";
        $scope.PersonelAdi = "";
        $scope.Proje = "";
        $scope.CmbEvrakTip = '1';
        $scope.Cins = 0;
        $scope.ToplamSatir = 0;
        $scope.CariBakiye = "";
        $scope.Adres = "";
        $scope.Adres1 = "";
        $scope.Adres2 = "";
        $scope.Il = "";
        $scope.CariVDADI = "";
        $scope.CariVDNO = "";
        $scope.VergiEdit = "";
        $scope.Fiyat = "";
        $scope.EvrakDovizTip = "";
        $scope.Special = "1";
        $scope.Aciklama = "";
        $scope.BelgeNo = "";
        $scope.AdresNo = "0";
        $scope.ProjeKod = "";
        $scope.ProjeGetirParam = UserParam[ParamName].ProjeGetir;
        $scope.RiskParam = UserParam.Sistem.RiskParam;
        $scope.SubeNo = UserParam.Sistem.SubeNo;
        $scope.Risk = 0;
        $scope.RiskLimit = 0;
        $scope.FisDizaynTip = "0";
        $scope.SonSatisMiktar = "0";
        $scope.TelNo1 = "";
        $scope.Email = "";
        $scope.CheckEvrak = 0;
        $scope.IhracatKodu = "";
        $scope.BasimAdet = 0;
        $scope.BasimMiktar = 0;
        $scope.SeriNoSayi = 0;
        $scope.Parca = 0;
        $scope.ParcaMiktar = 0;

        $scope.Reyon = "";
        $scope.ReyonStok = "";

        $scope.DepoListe = [];
        $scope.CariListe = [];
        $scope.SorumlulukListe = [];
        $scope.PersonelListe = [];
        $scope.ProjeListe = [];
        $scope.OdemePlanListe = [];
        $scope.IrsaliyeListe = [];
        $scope.EIrsListe = [];
        $scope.BedenHarListe = [];
        $scope.BirimListe = [];
        $scope.StokListe = [];
        $scope.PartiLotListe = [];
        $scope.RenkListe = [];
        $scope.BedenListe = [];
        $scope.DepoMiktarListe = [];
        $scope.AdresNoListe = [];
        $scope.ProjeEvrakGetirListe = [];
        $scope.SonSatisListe = [];
        $scope.KirilimListe = [];
        $scope.IhracatListe = [];
        $scope.PBarkodListe = [];
        $scope.IslemListeSelectedRows = [];
        $scope.PaletBarkodStok = [];
        $scope.PaletBarkodListe = [];
        $scope.PaletBarkodTamListe = [];

        $scope.AciklamaGuid = ''
        $scope.Aciklama1 = ''
        $scope.Aciklama2 = ''
        $scope.Aciklama3 = ''
        $scope.Aciklama4 = ''
        $scope.Aciklama5 = ''

        $scope.AraToplam = 0;
        $scope.ToplamIndirim = 0;
        $scope.NetToplam = 0;
        $scope.ToplamKdv = 0;
        $scope.GenelToplam = 0;

        $scope.Stok = [];
        $scope.Miktar = 1;
        $scope.Miktar2 = 1;

        $scope.CmbCariAra = "0";
        $scope.TxtCariAra = "";
        $scope.CmbIhracatAra = "0";
        $scope.TxtIhracatAra = "";
        $scope.EvrakLock = false;
        $scope.BarkodLock = false;
        $scope.FiyatLock = false;
        $scope.IhracatLoad = false;
        $scope.IslemListeSelectedIndex = -1;
        $scope.PartiLotListeSelectedIndex = 0;
        $scope.MKupListeSelectedIndex = -1;

        $scope.TxtParti = "";
        $scope.TxtLot = 0;
        $scope.SktTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.LblPartiLotAlert = "";

        $scope.OtoEkle = false;
        $scope.PartiOlusturShow = true;
        $scope.CokluSecim = true;
        $scope.PaketBarkodKontrol = false;
        $scope.ParcaKontrol = false;

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
        $scope.TblLoading = true;

        //DIZAYN
        $scope.DGenelToplam = 0;
        $scope.DizaynListe = [];

        //E İRSALİYE MODAL
        $scope.TxtSfrAd = ''
        $scope.TxtSrfSoyAd = ''
        $scope.TxtSfrTckn = ''
        $scope.TxtPlaka = ''

        //METREKÜP HESAPLA
        $scope.En = 0;
        $scope.Boy = 0;
        $scope.Kalinlik = 6;
        $scope.MetreKup = 0;
        $scope.MKupEvrakTip = 0;
        $scope.MKupGetirListe = [];
        $scope.MKupGuid = "";
        $scope.MKupToplamMiktar = 0;
        $scope.MKupToplamSatir = 0;
        $scope.MKupInsUpdTip = 1; //0: Insert, 1: Düzenle
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
            pageSize: 30,
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
                },
                {
                    name: "RISKLIMIT",
                    type: "number",
                    align: "center",
                    width: 90
                },
                {
                    name: "DOVIZSEMBOL",
                    title: "DOVIZ",
                    type: "text",
                    align: "center",
                    width: 100
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
            editing: false,
            selecting: true,
            data : $scope.IrsaliyeListe,
            paging : true,
            pageSize: 30,
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
                name: "sth_miktar2",
                title: "MİKTAR2",
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
            pageSize: 30,
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
    function InitMKupGrid()
    {
        $("#TblMKupListe").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.MKupGetirListe,
            paging : true,
            pageSize: 7,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: [
                {
                    name: "KALINLIK",
                    title: "KLN",
                    type: "text",
                    align: "center",
                    width: 75
                }, 
                {
                    name: "EN",
                    title: "EN",
                    type: "text",
                    align: "center",
                    width: 75
                }, 
                {
                    name: "BOY",
                    title: "BOY",
                    type: "text",
                    align: "center",
                    width: 75
                },
                {
                    name: "MKUP",
                    title: "MKUP",
                    type: "text",
                    align: "center",
                    width: 75
                }
            ],
            rowClick: function(args)
            {
                $scope.MKupListeRowClick(args.itemIndex,args.item,this);
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
                    name: "SKTTARIHDATE",
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
    function InitDizaynGrid()
    {
        $("#TblDizayn").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.DizaynListe,
            paging : true,
            pageSize: 30,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
            {
                name: "SERI",
                title: "SERI",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "SIRA",
                title: "SIRA",
                type: "number",
                align: "center",
                width: 75
            },
            {
                name: "CARIKOD",
                title: "CARİ KODU",
                type: "number",
                align: "center",
                width: 150
            },
            {
                name: "CARIADI",
                title: "CARİ ADI",
                type: "number",
                align: "center",
                width: 200
            },
            {
                name: "TUTAR",
                title: "TUTAR",
                type: "number",
                align: "center",
                width: 100
            }
           ],
            rowClick: function(args)
            {
                $scope.CariListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitProjeEvrakGetirGrid()
    {
        $("#TblProjeEvrakGetirListe").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            editing: true,
            data : $scope.ProjeEvrakGetirListe,
            paging : true,
            pageSize: 30,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: [
                // { 
                //       itemTemplate: function(_, item) 
                //       {
                //           return $("<button type='submit' class='btn btn-primary btn-block btn-sm'></button>").text("D")
                //               .on("click", function() 
                //               {
                //                   $scope.ManuelGiris(item);
                //               });
                //       },
                //       width: 45
                // },
                {
                    name: "SERI",
                    title: "SERI",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "SIRA",
                    title: "SIRA",
                    type: "number",
                    align: "center",
                    width: 100
                },
                {
                    name: "PROJEKOD",
                    title: "PROJEKOD",
                    type: "number",
                    align: "center",
                    width: 100
                },
            ],
            rowClick: function(args)
            {
                $scope.ProjeEvrakListeRowClick(args.itemIndex,args.item,this);
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
            pageSize: 30,
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
                name: "sth_cari_kodu",
                title: "CARİ KODU",
                type: "number",
                align: "center",
                width: 150
            },
            {
                name: "TUTAR",
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
    function InitDepoMiktarGrid()
    {
        $("#TblDepoMiktar").jsGrid
        ({
            responsive: true,
            width: "100%",
            height: "150px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            paging: true,
            pageSize: 30,
            data : $scope.DepoMiktarListe,
            fields: [
                {
                    name: "DEPONO",
                    title: "DEPO NO",
                    type: "number",
                    align: "center",
                    width: 75
                }, 
                {
                    name: "DEPOADI",
                    title: "DEPO ADI",
                    type: "text",
                    align: "center",
                    width: 210
                }, 
                {
                    name: "DEPOMIKTAR",
                    title: "DEPO MIKTAR",
                    type: "number",
                    align: "center",
                    width: 200
                } 
            ],
            rowClick: function(args)
            {
                $scope.StokListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitStokDurumGrid()
    {
        $("#TblStokDurum").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.StokDurumListe,
            paging : true,
            pageSize: 30,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
            {
                name: "CARIKODU",
                title: "CARİ KODU",
                type: "number",
                align: "center",
                width: 150
            },
            {
                name: "CARIADI",
                title: "CARİ ADI",
                type: "number",
                align: "center",
                width: 200
            },
            {
                name: "EVRAKTIP",
                title: "SERI",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "TARIH",
                title: "TARIH",
                type: "number",
                align: "center",
                width: 75
            },
            {
                name: "MIKTAR",
                title: "MIKTAR",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "BFIYAT",
                title: "BFIYAT",
                type: "number",
                align: "center",
                width: 100
            }
           ],
            rowClick: function(args)
            {
                $scope.CariListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitIhracatGrid()
    {   
        $("#TblIhracat").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.IhracatListe,
            paging : true,
            pageSize: 30,
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
                    name: "ADI",
                    type: "text",
                    align: "center",
                    width: 300
                },
                {
                    name: "CARI",
                    type: "number",
                    align: "center",
                    width: 75
                }
            ],
            rowClick: function(args)
            {
                $scope.IhracatListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitEvrakGrid()
    {   
        $("#TblGetir").jsGrid
        ({
            width: "100%",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.EvrakGetirListe,
            paging : true,
            pageSize: 30,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [
                {
                    name: "SERI",
                    type: "text",
                    align: "center",
                    width: 75
                },
                {
                    name: "SIRA",
                    type: "text",
                    align: "center",
                    width: 75
                },
                {
                    name: "CARIADI",
                    title: "CARIADI",
                    type: "text",
                    align: "center",
                    width: 150
                },
                {
                    name: "MIKTAR",
                    type: "text",
                    align: "center",
                    width: 75
                },
                {
                    name: "TUTAR",
                    title: "TUTAR",
                    type: "text",
                    align: "center",
                    width: 75
                },
            ],
            rowClick: function(args)
            {
                $scope.EvrakGetirListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitPaletDetayGrid()
    {
        $("#TblPaletDetay").jsGrid
        ({
            responsive: true,
            width: "100%",
            height: "400px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            paging: true,
            pageSize: 30,
            data : $scope.PaletBarkodListe,
            fields: [
                {
                    name: "PALET_KOD",
                    title: "PALET KODU",
                    type: "text",
                    align: "center",
                    width: 75
                }, 
                {
                    name: "STOK_KOD",
                    title: "STOK KOD",
                    type: "text",
                    align: "center",
                    width: 210
                }, 
                {
                    name: "STOK_BARKOD",
                    title: "BARKODU",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "MIKTAR",
                    title: "MİKTAR",
                    type: "number",
                    align: "center",
                    width: 200
                },{
                    name: "DURUM",
                    title: "DURUM",
                    type: "number",
                    align: "center",
                    width: 200
                },
            ],
            rowClick: function(args)
            {
                $scope.StokListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function BarkodFocus()
    {
        $timeout( function(){$window.document.getElementById("Barkod").focus();},100);  
    }
    function CariFocus()
    {
        $timeout( function(){$window.document.getElementById("CariFocus").focus();},100);  
    }
    function StokFocus()
    {
        $timeout( function(){$window.document.getElementById("StokFocus").focus();},100);  
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
                db.GetData($scope.Firma,'StokBedenHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,11],function(BedenData)
                {
                    $scope.BedenHarListe = BedenData;
                    db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(IrsaliyeData)
                    {
                        InsertAfterRefresh(IrsaliyeData);
                    });
                });
            }
            else
            {
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
        $scope.IrsaliyeListe = pData;
        $scope.EskiBarkod = $scope.Barkod;
        $("#TblIslem").jsGrid({data : $scope.IrsaliyeListe});    
        // if(ParamName == "AlisIrsaliye")
        // {
        //     $scope.BtnEtiketBasAuto();
        // }
        DipToplamHesapla();
        ToplamMiktarHesapla();
        if($scope.PBarkodListe.length == 0)
        {
            if($scope.Parca == 1 || $scope.Parca == 0)
            {
                if(UserParam[UserParam[ParamName].StokKalsin == "0"])
                {
                    $scope.BtnTemizle();
                }
                else
                {
                    StokBarkodGetir($scope.Barkod)
                }
            }
        }
        if(UserParam[ParamName].EIrsaliyeDetay == 1)
        {
            $scope.BtnEIrsKaydet();
        }
        $window.document.getElementById("Barkod").focus();
    }
    function DipToplamHesapla()
    {
        $scope.AraToplam = 0;
        $scope.ToplamIndirim = 0;
        $scope.ToplamKdv = 0;
        $scope.NetToplam = 0;
        $scope.GenelToplam = 0;

        angular.forEach($scope.IrsaliyeListe,function(value)
        {
            $scope.AraToplam += value.sth_tutar;
            $scope.ToplamIndirim += (value.sth_iskonto1 + value.sth_iskonto2 + value.sth_iskonto3 + value.sth_iskonto4 + value.sth_iskonto5 + value.sth_iskonto6);
            $scope.ToplamKdv +=  value.sth_vergi //(value.sth_tutar - (value.sth_iskonto1 + value.sth_iskonto2 + value.sth_iskonto3 + value.sth_iskonto4 + value.sth_iskonto5 + value.sth_iskonto6)) * (value.TOPTANVERGI / 100);
        });
        $scope.NetToplam = $scope.AraToplam - $scope.ToplamIndirim;
        $scope.GenelToplam = $scope.NetToplam + $scope.ToplamKdv;
    }
    function ToplamMiktarHesapla()
    {
        $scope.ToplamSatir = 0;

        angular.forEach($scope.IrsaliyeListe,function(value)
        {
            $scope.ToplamSatir += 1 ;
            if(value.sth_stok_kod == $scope.EskiBarkod)
            {
                $scope.BasimAdet += 1;
                $scope.BasimMiktar = value.sth_miktar2;
            }
        });
    }
    async function InsertData()
    {
        return new Promise(resolve => 
        {
            console.log($scope.Stok[0])
            var InsertData = 
            [
                UserParam.MikroId,
                UserParam.MikroId,
                0, //FİRMA NO
                $scope.SubeNo, //ŞUBE NO
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
                '',//İŞEMRİKODU
                $scope.Personel,
                $scope.CariDovizCinsi, //HARDOVİZCİNSİ
                $scope.CariDovizKuru, //HARDOVİZKURU
                $scope.CariAltDovizKuru, //ALTDOVİZKURU
                $scope.Stok[0].DOVIZCINSI, //STOKDOVİZCİNSİ
                1, //STOKDOVİZKURU
                $scope.Miktar * $scope.Stok[0].CARPAN,
                $scope.Miktar2,
                $scope.Stok[0].BIRIMPNTR,
                $scope.Stok[0].TUTAR,
                $scope.Stok[0].ISK.TUTAR1, //ISKONTO TUTAR 1
                $scope.Stok[0].ISK.TUTAR2, //ISKONTO TUTAR 2
                $scope.Stok[0].ISK.TUTAR3, //ISKONTO TUTAR 3
                $scope.Stok[0].ISK.TUTAR4, //ISKONTO TUTAR 4
                $scope.Stok[0].ISK.TUTAR5, //ISKONTO TUTAR 5
                $scope.Stok[0].ISK.TUTAR6, //ISKONTO TUTAR 6
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
                '00000000-0000-0000-0000-000000000000', //sth_fat_uid,
                $scope.DepoNo, //GİRİSDEPONO
                $scope.DepoNo, //CİKİSDEPONO
                $scope.Tarih, //MALKABULSEVKTARİHİ
                $scope.Sorumluluk, // CARİSORUMLULUKMERKEZİ
                $scope.Sorumluluk,
                0,  //VERGİSİZFL
                $scope.AdresNo,  // ADRESNO
                $scope.Stok[0].PARTI,
                $scope.Stok[0].LOT,
                $scope.Proje,
                $scope.IhracatKodu, // EXİMKODU
                0,  // DİSTİCARETTURU
                0,  // OTVVERGİSİZFL
                0,  // OİVVERGİSİZ
                $scope.CariFiyatListe,
                0,  //NAKLİYEDEPO
                0   // NAKLİYEDURUMU
            ];
            console.log(InsertData)
            db.ExecuteTag($scope.Firma,'StokHarInsert',InsertData,async function(InsertResult)
            {
                if(typeof(InsertResult.result.err) == 'undefined')
                {
                    if($scope.PaletBarkodStok.length > 0)
                    {
                        var TmpQuery = 
                        {
                            db : '{M}.' + $scope.Firma,
                            query: "UPDATE BEKA_PALET_TANIMLARI SET DURUM = 1 WHERE STOK_BARKOD = @STOKBARKOD ",
                            param:  ['STOKBARKOD',],
                            type:   ['string|50',],
                            value:  [$scope.PaletBarkodStok[0].STOK_BARKOD]
                        }
                        await db.ExecutePromiseQuery(TmpQuery,function(data)
                        {  
                            $scope.PaletBarkodStok = [];
                            console.log("UPDATE EDİLDİ")
                        });
                    }
                    db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(IrsaliyeData)
                    {  
                        $scope.IrsaliyeListe = IrsaliyeData;
                        if($scope.Stok[0].BEDENPNTR != 0 || $scope.Stok[0].RENKPNTR != 0)
                        {
                            BedenHarInsert(InsertResult.result.recordset[0].sth_Guid);
                        } 
                        InsertAfterRefresh(IrsaliyeData);
                        $scope.InsertLock = false
                        if(UserParam.Sistem.Titresim == 1)
                        {
                            Confirmation();
                        }
                        FisData(IrsaliyeData);
                        resolve();
                    });
                }
                else
                {
                    console.log(InsertResult.result.err)
                    resolve();
                }
            });
        })
    }
    function UpdateData(pData) 
    {   
        db.ExecuteTag($scope.Firma,'StokHarUpdate',pData.Param,function(InsertResult)
        {
            if(typeof(InsertResult.result.err) == 'undefined')
            {
                db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,0],function(IrsaliyeData)
                {
                    // if(pData.BedenPntr != 0 && pData.RenkPntr != 0)
                    // {
                    //     let UpdateStatus = false;
                    //     angular.forEach($scope.BedenHarListe,function(value)
                    //     {
                    //         if(value.BdnHar_Har_uid == pData.Guid && value.BdnHar_BedenNo == Kirilim(pData.BedenPntr,pData.RenkPntr))
                    //             let Data =
                    //             [
                    //                 value.BdnHar_Tipi,      // TİPİ
                    //                 value.BdnHar_Har_uid,   // GUID
                    //                 value.BdnHar_BedenNo,   // BEDEN NO
                    //                 pData.Miktar, // MİKTAR
                    //                 0, // REZERVASYON MİKTARI
                    //                 0, // REZERVASYON TESLİM MİKTARI
                                    
                    //             ];

                    //             UpdateStatus = true;
                    //             BedenHarUpdate(Data);
                    //         }                            
                    //     });

                    //     if(!UpdateStatus)
                    //     {
                    //         BedenHarInsert(pData.Guid);
                    //     }
                    // }                        
                    InsertAfterRefresh(IrsaliyeData);
                    FisData(IrsaliyeData);
                    $scope.InsertLock = false;
                    if(UserParam.Sistem.Titresim == 1)
                    {
                        Confirmation();
                    }
                });
            }
            else
            {
                console.log(InsertResult.result.err)
            }
        });
    }
    async function StokBarkodGetir(pBarkod)
    {
        return new Promise(resolve => 
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
                    var Uzunluk = Kilo.slice(parseInt(UserParam.Sistem.KiloBaslangic),parseInt(UserParam.Sistem.KiloBaslangic)+parseInt(UserParam.Sistem.KiloUzunluk));
                    pBarkod = kBarkod
                    $scope.Miktar = (Uzunluk / UserParam.Sistem.KiloCarpan)
                }
            }
            // ----------------------------------------------------
            if(pBarkod != '')
            {
                db.StokBarkodGetir($scope.Firma,pBarkod,$scope.DepoNo,async function(BarkodData)
                {
                    if(UserParam.Sistem.Palet == "1")
                    {
                        $scope.PaletBarkodStok = await db.GetPromiseTag($scope.Firma,'PaletBarkodStokGetir',[pBarkod.toUpperCase()])
                        if($scope.PaletBarkodStok.length > 0)
                        {
                            if($scope.PaletBarkodStok[0].DURUM == 1)
                            {
                                alertify.alert("İşlem yapılmış Barkod getirelemez")
                                return;
                            }
                            console.log($scope.PaletBarkodStok)
                            await db.GetPromiseTag($scope.Firma,'PaletBarkodGetir',[$scope.PaletBarkodStok[0].PALET_KOD],function(paletData)
                            {
                                console.log(1)
                                console.log(paletData)
                                $scope.PltStokOnly = true;
                                $scope.PaletDetayClick(paletData)
                            })
                        }
                    }
                    console.log(BarkodData)
                    if(BarkodData.length > 0)
                    { 
                        console.log(BarkodData[0].PAKET)
                        //HEM STOK HEM PAKET KODU AYNI İSE İLK BAŞTA PAKETİ GETİRİYOR
                        if(BarkodData[0].PAKET != "" && typeof BarkodData[0].PAKET != "undefined")
                        {
                            console.log([pBarkod,$scope.DepoNo,$scope.FiyatListeNo])
                            await db.GetData($scope.Firma,'PaketBarkodGetir',[pBarkod,$scope.DepoNo,$scope.FiyatListeNo],async function(PBarkodData)
                            {
                                $scope.PBarkodListe = PBarkodData;
                                console.log(PBarkodData)
                                if($scope.PBarkodListe.length > 0)
                                {
                                    $scope.Loading = false;
                                    $scope.TblLoading = true;
                                    $scope.Stok[0] = JSON.parse(JSON.stringify($scope.PBarkodListe[0]));
                                    $scope.Stok[0].FIYAT = 0;
                                    $scope.Stok[0].TUTAR = 0;
                                    $scope.Stok[0].INDIRIM = 0;
                                    $scope.Stok[0].ISK = {ORAN1: 0,ORAN2: 0, ORAN3:0, ORAN4: 0, ORAN5: 0, ORAN6: 0, TUTAR1: 0, TUTAR2: 0, TUTAR3: 0, TUTAR4: 0, TUTAR5: 0, TUTAR6: 0, TIP1: 0, TIP2: 0, TIP3: 0, TIP4: 0, TIP5: 0, TIP6: 0}
                                    $scope.Stok[0].TOPTUTAR = 0;
                                    $scope.Stok[0].KDV = db.SumColumn($scope.PBarkodListe,"KDV")
                                    $scope.Stok[0].FIYAT = $scope.Stok[0].PKTFIYAT;
                                    $scope.Stok[0].BIRIMPNTR = 1;
                                    $scope.Stok[0].BIRIM = 'ADET';
                                    $scope.Stok[0].CARPAN = 1;
                                    
                                    $scope.PaketBarkodKontrol = true;
                                    $scope.MiktarFiyatValid();
                                    
                                    if($scope.OtoEkle == true)
                                    {
                                        // $scope.Insert()
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
                                    $("#MdlReyonDegisikligi").modal('hide');
                                    Beep();
                                }
                            });
                        }
                        else
                        {
                            $scope.Stok = BarkodData;
                            $scope.StokKodu = $scope.Stok[0].KODU;
                            $scope.ReyonStok = $scope.Stok[0].BARKOD;
                            if(UserParam.Sistem.PartiLotKontrol == 1)
                            {
                                for(i = 0;i < $scope.IrsaliyeListe.length;i++)
                                {   
                                    if($scope.Stok[0].PARTI != "" && $scope.Stok[0].LOT != "")
                                    {
                                        if($scope.Stok[0].PARTI == $scope.IrsaliyeListe[i].sth_parti_kodu && $scope.Stok[0].LOT == $scope.IrsaliyeListe[i].sth_lot_no)
                                        {
                                            alertify.alert("<a style='color:#3e8ef7''>" + "Okutmuş Olduğunuz "+ $scope.Stok[0].PARTI + ". " + "Parti " + $scope.Stok[0].LOT + ". " +"Lot Daha Önceden Okutulmuş !" + "</a>" );
                                            $scope.InsertLock = false;
                                            $scope.BtnTemizle();
                                            return;
                                        }
                                        else
                                        {
                                            alertify.alert("hahah")
                                        }
                                    }
                                }
                            }
                            $scope.Stok[0].FIYAT = 0;
                            $scope.Stok[0].TUTAR = 0;
                            $scope.Stok[0].INDIRIM = 0;
                            $scope.Stok[0].ISK = {ORAN1: 0,ORAN2: 0, ORAN3:0, ORAN4: 0, ORAN5: 0, ORAN6: 0, TUTAR1: 0, TUTAR2: 0, TUTAR3: 0, TUTAR4: 0, TUTAR5: 0, TUTAR6: 0, TIP1: 0, TIP2: 0, TIP3: 0, TIP4: 0, TIP5: 0, TIP6: 0}
                            $scope.Stok[0].KDV = 0;
                            $scope.Stok[0].TOPTUTAR = 0;
                            
                            //Depo Miktar Getir (Stok Detay)
                            var DepoMiktar =
                            {
                                db : '{M}.' + $scope.Firma,
                                query : "SELECT dep_adi DEPOADI,dep_no DEPONO,(SELECT dbo.fn_DepodakiMiktar(@STOKKODU,DEPOLAR.dep_no,GETDATE())) AS DEPOMIKTAR FROM DEPOLAR ",
                                param : ['STOKKODU'],
                                type : ['string|50'],
                                value : [$scope.StokKodu]
                            }
                            db.GetDataQuery(DepoMiktar,function(pDepoMiktar)
                            {   
                                $scope.DepoMiktarListe = pDepoMiktar
                                $("#TblDepoMiktar").jsGrid({data : $scope.DepoMiktarListe});
                            });
        
                            await db.GetPromiseTag($scope.Firma,'CmbBirimGetir',[BarkodData[0].KODU],async function(data)
                            {   
                                $scope.BirimListe = data;
                                $scope.Birim = JSON.stringify($scope.Stok[0].BIRIMPNTR); 
                                
                                if($scope.BirimListe.length > 0)
                                {
                                    $scope.Stok[0].BIRIMPNTR = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].BIRIMPNTR;
                                    $scope.Stok[0].BIRIM = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].BIRIM;
                                    $scope.Stok[0].CARPAN = $scope.BirimListe.filter(function(d){return d.BIRIMPNTR == $scope.Birim})[0].KATSAYI;

                                    await $scope.MiktarFiyatValid();
                                }
                                else
                                {  //BİRİMSİZ ÜRÜNLERDE BİRİMİ ADETMİŞ GİBİ DAVRANIYOR. RECEP KARACA 23.09.2019
                                    $scope.Stok[0].BIRIMPNTR = 1;
                                    $scope.Stok[0].BIRIM = 'ADET';
                                    $scope.Stok[0].CARPAN = 1;
                                    await $scope.MiktarFiyatValid();
        
                                }
                                
                            });
        
                            //****** FİYAT GETİR */
                            let FiyatParam = 
                            { 
                                CariKodu : $scope.CariKodu,
                                CariFiyatListe : $scope.CariFiyatListe,
                                CariDovizKuru : $scope.CariDovizKuru,
                                CariIskontoKodu : $scope.CariIskontoKodu,
                                DepoNo : $scope.DepoNo,
                                FiyatListe : $scope.FiyatListeNo,
                                AlisSatis : ($scope.EvrakTip === 13 ? 0 : 1),
                                OdemeNo : $scope.OdemeNo
                            };
                            
                            await db.FiyatGetir($scope.Firma,BarkodData,FiyatParam,UserParam[ParamName],async function()
                            {
                                console.log($scope.PBarkodListe)
                                console.log($scope.PaletBarkodListe)
                                //PAKET/PALET INSERT MIKTAR HESAPLAMA

                                //PAKET BARKOD MİKTAR/FİYAT HESAPLAMA
                                if($scope.PBarkodListe.length > 0)
                                {
                                    for (let i = 0; i < $scope.PBarkodListe.length; i++) 
                                    {
                                        if($scope.Stok[0].KODU == $scope.PBarkodListe[i].STOKKODU)
                                        {
                                            $scope.Stok[0].FIYAT = $scope.PBarkodListe[i].STOKFIYAT;
                                            $scope.Miktar = $scope.PaketMiktar * $scope.PBarkodListe[i].MIKTAR;
                                            await $scope.MiktarFiyatValid();
                                            return;
                                        }
                                    }
                                }
                                else if($scope.PaletBarkodListe.length > 0)
                                {
                                    //PALET BARKOD MİKTAR HESAPLAMA - TABLODAN EŞLEŞEN KAYIDI GETİRİP İNSERT HALİNDEKİ SORGUYA MİKTARI BASIYOR
                                    //FİYATI FİYATLİSTE'DEN ÇEKİYOR
                                    for (let i = 0; i < $scope.PaletBarkodListe.length; i++) 
                                    {
                                        console.log(1)
                                        console.log($scope.Stok[0].BARKOD,$scope.PaletBarkodListe[i].STOK_BARKOD)
                                        if($scope.Stok[0].BARKOD == $scope.PaletBarkodListe[i].STOK_BARKOD)
                                        {
                                            console.log($scope.PaketMiktar,$scope.PaletBarkodListe[i].MIKTAR)
                                            $scope.Miktar = $scope.PaketMiktar * $scope.PaletBarkodListe[i].MIKTAR;
                                            if($scope.Miktar == 0)
                                            {
                                                $scope.Miktar = 1;
                                            }
                                            await $scope.MiktarFiyatValid();
                                            return;
                                        }
                                    }
                                }
                                else
                                {
                                    $scope.Fiyat = $scope.Stok[0].FIYAT;
                                    await $scope.MiktarFiyatValid(); 
                                }
                                $scope.BarkodLock = true;
                                $scope.$apply();
                            });
                            if($scope.Stok[0].BEDENPNTR == 0 || $scope.Stok[0].RENKPNTR == 0)
                            {
                                if($scope.Stok[0].BEDENKODU != '' && $scope.Stok[0].RENKKODU != '')
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
                                    await db.GetPromiseTag($scope.Firma,'PartiLotGetir',[$scope.Stok[0].KODU,$scope.DepoNo,$scope.Stok[0].PARTI,$scope.Stok[0].LOT],async function(data)
                                    {
                                        console.log(data)
                                        $scope.PartiLotListe = data;
                                        if(data.length > 0)
                                        {
                                            if(UserParam.Sistem.PartiLotMiktarKontrol == 1)
                                            {   
                                                $scope.Miktar = $scope.PartiLotListe[0].MIKTAR;
                                                $scope.Stok[0].TOPMIKTAR = $scope.Miktar * $scope.Stok[0].CARPAN;
                                            }
                                        }
                                        await $scope.MiktarFiyatValid();
                                    });
                                }
                                else
                                {
                                    PartiLotEkran();
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
                            if($scope.OtoEkle == true)
                            {
                                resolve();
                                $scope.Insert()
                            }
                            else
                            {
                                resolve();
                                $window.document.getElementById("Miktar").focus();
                                $window.document.getElementById("Miktar").select();
                            }
                        }
                    }
                    else
                    {   
                        //STOKTA OLMADIĞI İÇİN PAKETTE VAR MI DİYE KONTROL EDİYOR
                        await db.GetData($scope.Firma,'PaketBarkodGetir',[pBarkod,$scope.DepoNo,$scope.FiyatListeNo],async function(PBarkodData)
                        {
                            let PaletBarkodListe = [];
                            $scope.PBarkodListe = PBarkodData;
                            if(UserParam.Sistem.Palet == "1")
                            {
                                $scope.PaletBarkodTamListe = await db.GetPromiseTag($scope.Firma,'PaletBarkodGetir',[pBarkod.toUpperCase()])
                            }
                            console.log($scope.PaletBarkodTamListe)
                            if ($scope.PBarkodListe.length > 0) //PAKETTE OKUTMUŞ OLDUĞU KODDAN VAR İSE
                            {
                                $scope.Loading = false;
                                $scope.TblLoading = true;
                                $scope.Stok[0] = JSON.parse(JSON.stringify($scope.PBarkodListe[0]));
                                $scope.Stok[0].FIYAT = 0;
                                $scope.Stok[0].TUTAR = 0;
                                $scope.Stok[0].INDIRIM = 0;
                                $scope.Stok[0].ISK = {ORAN1: 0,ORAN2: 0, ORAN3:0, ORAN4: 0, ORAN5: 0, ORAN6: 0, TUTAR1: 0, TUTAR2: 0, TUTAR3: 0, TUTAR4: 0, TUTAR5: 0, TUTAR6: 0, TIP1: 0, TIP2: 0, TIP3: 0, TIP4: 0, TIP5: 0, TIP6: 0}
                                $scope.Stok[0].TOPTUTAR = 0;
                                $scope.Stok[0].KDV = db.SumColumn($scope.PBarkodListe,"KDV")
                                $scope.Stok[0].FIYAT = $scope.Stok[0].PKTFIYAT;
                                $scope.Stok[0].BIRIMPNTR = 1;
                                $scope.Stok[0].BIRIM = 'ADET';
                                $scope.Stok[0].CARPAN = 1;
                                
                                $scope.PaketBarkodKontrol = true;
                                $scope.MiktarFiyatValid(); 
    
                                $window.document.getElementById("Miktar").focus();
                                $window.document.getElementById("Miktar").select();
                                
                            }
                            else if($scope.PaletBarkodTamListe.length > 0) //PALET TABLOSUNDA OKUTMUŞ OLDUĞU KODDAN VAR İSE
                            {
                                $scope.PaletBarkodTamListe.forEach(function(item) 
                                {
                                    if(item.DURUM == 0)
                                    PaletBarkodListe.push(item)
                                });
                                $scope.PaletBarkodListe = PaletBarkodListe;
                                if(PaletBarkodListe.length > 0)
                                {
                                    $scope.PltStokOnly = false;
                                    $scope.Loading = false;
                                    $scope.TblLoading = true;
                                    $scope.Stok[0] = JSON.parse(JSON.stringify(PaletBarkodListe[0]));
                                    console.log($scope.Stok[0])
                                    console.log($scope.Stok[0].KODU)
                                    $scope.Stok[0].FIYAT = 0;
                                    $scope.Stok[0].TUTAR = 0;
                                    $scope.Stok[0].INDIRIM = 0;
                                    $scope.Stok[0].ISK = {ORAN1: 0,ORAN2: 0, ORAN3:0, ORAN4: 0, ORAN5: 0, ORAN6: 0, TUTAR1: 0, TUTAR2: 0, TUTAR3: 0, TUTAR4: 0, TUTAR5: 0, TUTAR6: 0, TIP1: 0, TIP2: 0, TIP3: 0, TIP4: 0, TIP5: 0, TIP6: 0}
                                    $scope.Stok[0].TOPTUTAR = 0;
                                    $scope.Stok[0].KDV = 0; //db.SumColumn($scope.PBarkodListe,"KDV")
                                    $scope.Stok[0].BIRIMPNTR = 1;
                                    $scope.Stok[0].BIRIM = 'ADET';
                                    $scope.Stok[0].CARPAN = 1;
                                    $scope.Stok[0].TOPTANVERGI = 0;
                                    $scope.Miktar = db.SumColumn(PaletBarkodListe,"MIKTAR");
                                    
                                    
                                    if($scope.OtoEkle == true)
                                    {
                                        // $scope.Insert()
                                    }
                                    else
                                    {
                                        $window.document.getElementById("Miktar").focus();
                                        $window.document.getElementById("Miktar").select();
                                        $timeout( function(){$scope.MiktarFiyatValid();},50);  
                                    }
                                }
                                else
                                {
                                    alertify.alert("Bu paletin gönderimi yapılmış")
                                }
                                console.log(PaletBarkodListe)
                                console.log($scope.PaletBarkodListe)
                                console.log(1)
                            }
                            else
                            {
                                alertify.alert("<a style='color:#3e8ef7''>" + "Stok Bulunamamıştır !" + "</a>" );          
                                $("#MdlReyonDegisikligi").modal('hide');
                                Beep();
                            }
                        });
                    }
                });
            }
        })
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
    function FisData(pData)
    { 
        // $scope.KirilimGetir();
        //Offline'da ISNULL Hatasını KirilimGetir fonksiyonu çalışıyor diye yapıyor.
        $scope.FisLength = pData;
        if($scope.FisDizaynTip == "0")
        {
            $scope.FisDeger = "";
            $scope.FisData = "";
           try 
           {
                $scope.FisDeger = "";
                $scope.FisDeger = SpaceLength($scope.CariKodu,35) + $scope.Seri + "-" + $scope.Sira + "\n" + SpaceLength($scope.CariAdi,35) + $scope.Tarih +"\n" + "Adres: " +SpaceLength($scope.Adres1,28) + $scope.Saat + "\n"  + "Adres2: " + SpaceLength($scope.Adres2,40) + "\n" + SpaceLength($scope.Adres,40) + "\n" +"Vergi Dairesi: "+SpaceLength($scope.CariVDADI,45) + "\n" + "Vergi No: "+ $scope.CariVDNO

                for(let i=0; i < pData.length; i++)
                {
                    $scope.FisData = $scope.FisData +  SpaceLength(pData[i].ADI,19) + "    " + SpaceLength(pData[i].MIKTAR,5) + SpaceLength(pData[i].BIRIMADI,6) + SpaceLength(parseFloat(pData[i].FIYAT,2),6) + parseFloat(pData[i].sth_tutar,2) + "\n";
                }
           } 
           catch (error) 
           {
           }
        }
        else if($scope.FisDizaynTip == "1")
        {
            $scope.FisDeger = "";
            $scope.FisData = "";
           try 
           {
                $scope.FisDeger = "";
                $scope.FisDeger = "                                    "+ $scope.Tarih + "\n" + "                                    " +$scope.Seri + " - " + $scope.Sira + "\n" +"                                    "+ $scope.Tarih + "\n" + "                                    "+  $scope.Saat + "\n" + SpaceLength($scope.CariAdi,40) + "\n" + SpaceLength($scope.Adres1,50) + "\n" + SpaceLength($scope.Adres,25) + "\n" +  "  " + SpaceLength($scope.CariVDADI,25) + " " + $scope.CariVDNO + "\n";
                for(let i=0; i < pData.length; i++)
                {
                   $scope.FisData = $scope.FisData +  SpaceLength(pData[i].ADI.substring(0,28),30) + SpaceLength(pData[i].RENK + " " + pData[i].BEDEN,20) + SpaceLength(parseFloat(pData[i].MIKTAR.toFixed(2)),6) +  SpaceLength(parseFloat(pData[i].FIYAT.toFixed(2)),7) + " " +SpaceLength(parseFloat(pData[i].sth_tutar.toFixed(2)),7) + "\n";       
                } 
           } 
           catch (error) 
           {
           }
        }
        else if($scope.FisDizaynTip == "2")
        {
            $scope.FisDeger = "";
            $scope.FisData = "";
           try 
           {
                $scope.FisDeger = "";
                $scope.FisDeger = "                                    "+ $scope.Tarih + "\n" + "                                    " +$scope.Seri + " - " + $scope.Sira + "\n" +"                                    "+ $scope.Tarih + "\n" + "                                    "+  $scope.Saat + "\n" + SpaceLength($scope.CariAdi,40) + "\n" + SpaceLength($scope.Adres1,50) + "\n" + SpaceLength($scope.Adres,25) + "\n" +  "  " + SpaceLength($scope.CariVDADI,25) + " " + $scope.CariVDNO + "\n";
                for(let i=0; i < $scope.KirilimListe.length; i++)
                {
                   $scope.FisData = $scope.FisData + SpaceLength($scope.KirilimListe[i].STOKKOD,20) +  SpaceLength($scope.KirilimListe[i].RENK,10) + SpaceLength($scope.KirilimListe[i].S38,2) + " " + SpaceLength($scope.KirilimListe[i].S40,2) + " " + SpaceLength($scope.KirilimListe[i].S42,2) + " " + SpaceLength($scope.KirilimListe[i].S44,2) + SpaceLength($scope.KirilimListe[i].S46,2) + " " + SpaceLength($scope.KirilimListe[i].S48,2) + " " + SpaceLength($scope.KirilimListe[i].S50,2) + " " + SpaceLength($scope.KirilimListe[i].S52,2) + " " + SpaceLength($scope.KirilimListe[i].S54,5) +   SpaceLength(($scope.KirilimListe[i].TOPMIKTAR),7) + " " + SpaceLength($scope.KirilimListe[i].BFIYAT,7) + " " + SpaceLength($scope.KirilimListe[i].TOPTUTAR,5)  + "\n";       
                } 
           } 
           catch (error) 
           {
           }
        }
        else if($scope.FisDizaynTip == "3")
        {
            $scope.FisDeger = "";
            $scope.FisData = "";
           try 
           {
                $scope.FisDeger = "";
                $scope.FisDeger = "                                    "+ $scope.Tarih + "\n" + "                                    " +$scope.Seri + " - " + $scope.Sira + "\n" +"                                    "+ $scope.Tarih + "\n" + "                                    "+  $scope.Saat + "\n" + SpaceLength($scope.CariAdi,40) + "\n" + SpaceLength($scope.Adres1,50) + "\n" + SpaceLength($scope.Adres,25) + "\n" +  "  " + SpaceLength($scope.CariVDADI,25) + " " + $scope.CariVDNO + "\n";
                for(let i=0; i < $scope.KirilimListe.length; i++)
                {
                   $scope.FisData = $scope.FisData + SpaceLength($scope.KirilimListe[i].STOKKOD,20) + SpaceLength($scope.KirilimListe[i].RENK,10) + SpaceLength($scope.KirilimListe[i].S38,2) + " " + SpaceLength($scope.KirilimListe[i].S40,2) + " " + SpaceLength($scope.KirilimListe[i].S42,2) + " " + SpaceLength($scope.KirilimListe[i].S44,2) + SpaceLength($scope.KirilimListe[i].S46,2) + " " + SpaceLength($scope.KirilimListe[i].S48,2) + " " + SpaceLength($scope.KirilimListe[i].S50,2) + " " + SpaceLength($scope.KirilimListe[i].S52,2) + " " + SpaceLength($scope.KirilimListe[i].S54,2) + SpaceLength(($scope.KirilimListe[i].TOPMIKTAR),7) + "\n";       
                } 
           } 
           catch (error) 
           {
           }
        }
    }
    function SpaceLength(pData,pLength)
    {
        let x = pLength - pData.toString().length;

        if(pData.toString().length > pLength)
        {
            pData = pData.toString().substring(0,pLength);
        }

        Space = "";

        for(let i=0; i < x; i++)
        {
            Space = Space + " ";
        }

        return pData + Space
    }
    function AdresNoGetir()
    {
        db.GetData($scope.Firma,'CmbAdresNo',[$scope.CariKodu],function(data)
        {
            $scope.AdresNoListe = data;
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
                $scope.PartiLotListe = [];
                $scope.MaxLot();
                if(ParamName == "AlisIrsaliye")
                {
                    var TmpQuery = 
                    {
                        db : '{M}.' + $scope.Firma,
                        query:  
                        "SELECT CONVERT(nvarchar,GETDATE(),112) +  " +
                        "ISNULL(MAX(SUBSTRING(CAST(CAST(pl_partikodu AS BIGINT) + 1 AS VARCHAR),9,14)),RIGHT('000000' + CAST(CAST('000000' AS INT) + 1 AS VARCHAR), 6))  AS PARTIKOD " +
                        " FROM PARTILOT WHERE pl_partikodu LIKE (@PARTITARIH + '%' ) ORDER BY MAX(pl_partikodu) DESC ",
                        param:  ['PARTITARIH'],
                        type:   ['string|25'],
                        value:  [$scope.Tarih2Ters]
                    }
                    db.GetPromiseQuery(TmpQuery,function(data)
                    {   
                        $scope.TxtParti = data[0].PARTIKOD;
                        $scope.Aciklama = "";
                    });
                }

                
                $("#LblPartiLotAlert").hide();
                
                $("#TblPartiLot").jsGrid({data : $scope.PartiLotListe});

                $('#MdlPartiLot').modal('show');
                $timeout( function(){
                $window.document.getElementById("Parti").focus();
                $window.document.getElementById("Parti").select();
                },400)
            }
        }
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
    function FaturaKontrol()
    {
        if($scope.IrsaliyeListe.length > 0)
        {
            for (let i = 0; i < $scope.IrsaliyeListe.length; i++) 
            {
                if($scope.IrsaliyeListe[i].sth_fat_uid != '00000000-0000-0000-0000-000000000000')
                {
                    return false
                }
            }
        }
    }
    $scope.KirilimGetir = function ()
    {
        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "SELECT BFIYAT,STOKKOD,RENK,ISNULL(PVT.[36],0) AS S36,ISNULL(PVT.[37],0) S37,ISNULL(PVT.[38],0) AS S38, " +
            "(ISNULL(PVT.[36],0) + ISNULL(PVT.[37],0) + ISNULL(PVT.[38],0)) AS TOPMIKTAR, " +
            "(ISNULL(PVT.[36],0) + ISNULL(PVT.[37],0) + ISNULL(PVT.[38],0)) * BFIYAT AS TOPTUTAR " +
            "FROM " +
            "( " +
            "SELECT  " +
            "(SELECT dbo.fn_renk_kirilimi((SELECT [dbo].fn_bedenharnodan_renk_no_bul(BdnHar_BedenNo)),(SELECT sto_renk_kodu FROM STOKLAR WHERE sto_kod = @STOKKOD))) AS RENK,  " +
            "(select sth_stok_kod FROM STOK_HAREKETLERI WHERE sth_Guid = BdnHar_Har_uid ) AS STOKKOD , " +
            "ISNULL((SELECT dbo.fn_beden_kirilimi((SELECT [dbo].fn_bedenharnodan_beden_no_bul(BdnHar_BedenNo)),(SELECT  sto_renk_kodu FROM STOKLAR WHERE sto_kod = @STOKKOD))),0) AS BEDEN , " +
            "(SELECT [dbo].fn_bedenharnodan_renk_no_bul(BdnHar_BedenNo)) AS RENKPNTR,  " +
            "ISNULL(BdnHar_HarGor,0) AS MIKTAR, " +
            "(sth_tutar / sth_miktar) AS BFIYAT " +
            "FROM BEDEN_HAREKETLERI AS BDN INNER JOIN STOK_HAREKETLERI AS STH ON BDN.BdnHar_Har_uid = STH.sth_Guid " +
            "WHERE STH.sth_evrakno_seri = @SERI AND STH.sth_evrakno_sira = @SIRA " +
            ")AS VERI " +
            "PIVOT " +
            "( SUM(MIKTAR) " +
            "FOR BEDEN IN ([36],[37],[38])) " +
            "AS PVT GROUP BY RENKPNTR,PVT.[36],PVT.[37],PVT.[38],PVT.STOKKOD,PVT.RENK,BFIYAT",
            param:  ['STOKKOD','SERI','SIRA'],
            type:   ['string|25','string|50','int'],
            value:  [$scope.IrsaliyeListe[0].sth_stok_kod,$scope.Seri,$scope.Sira]
        }
        db.GetPromiseQuery(TmpQuery,function(data)
        {   
            $scope.KirilimListe = data;
        });
    }
    $scope.YeniEvrak = async function (pAlisSatis)
    {
        //ALIŞ = 0 SATIŞ = 1
        if(pAlisSatis == 0)
        {
            ParamName = "AlisIrsaliye";
        }
        else if(pAlisSatis == 1)
        {
            ParamName = "SatisIrsaliye";
        }

        Init();
        InitCariGrid();
        InitIslemGrid();
        InitStokGrid();
        InitPartiLotGrid();
        InitSeriNoGrid();
        InitDizaynGrid();
        InitProjeEvrakGetirGrid();
        InitStokHarGrid();
        InitDepoMiktarGrid();
        InitStokDurumGrid();
        InitIhracatGrid();
        InitEvrakGrid();
        InitMKupGrid();
        InitPaletDetayGrid();

        $scope.FiyatListeNo = UserParam[ParamName].FiyatListe;
        $scope.EvrakLock = false;
        $scope.Seri = UserParam[ParamName].Seri;
        $scope.BelgeNo = UserParam[ParamName].BelgeNo;
        $scope.CmbEvrakTip = UserParam[ParamName].EvrakTip;
        $scope.CariKodu = UserParam[ParamName].Cari;
        $scope.Special = UserParam[ParamName].Special;
        if(UserParam[ParamName].FiyatLock == 1)
        {
            $scope.FiyatLock = true;
        }
        if(pAlisSatis == 0)
        {
            $scope.PersonelTip = 1
            $scope.PartiOlusturShow = true;
        }
        else
        {
            $scope.PersonelTip = 0
            $scope.PartiOlusturShow = false;
        }
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
        if($scope.CariKodu != "")
        {
            db.GetData($scope.Firma,'CariListeGetir',[$scope.CariKodu,'',UserParam.Sistem.PlasiyerKodu],function(data)
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
        console.log($scope.DepoListe)
        
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
        db.GetPromiseTag($scope.Firma,'PersonelTipGetir',[$scope.PersonelTip],function(data)
        {
            $scope.PersonelListe = data;
            $scope.Personel = UserParam[ParamName].Personel;
            $scope.PersonelListe.forEach(function(item)
            {
                if(item.KODU == $scope.Personel)
                {
                    $scope.PersonelAdi = item.ADI;
                    $scope.TxtSfrAd = item.ADI;
                    $scope.TxtSrfSoyAd = item.SOYADI;
                    $scope.TxtSfrTckn = item.TCKN;
                    $scope.TxtPlaka = UserParam[ParamName].Plaka;
                    $scope.EirSoforId = item.GUID;
                }
            });
        });
        db.FillCmbDocInfo($scope.Firma,'CmbProjeGetir',function(data){$scope.ProjeListe = data; $scope.Proje = UserParam[ParamName].Proje});
        db.FillCmbDocInfo($scope.Firma,'CmbOdemePlanGetir',function(data){$scope.OdemePlanListe = data; $scope.OdemeNo = '0'});
        db.GetPromiseTag($scope.Firma,'FiyatListeGetir',[$scope.PersonelTip],function(data)
        {
            $scope.FiyatListe = data;
            $scope.FiyatListeNo = UserParam[ParamName].FiyatListe;

            
        }); 
        if(localStorage.mode == 'true')
        {
            await db.MaxSiraPromiseTag($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip,0],function(data)
            {
                $scope.Sira = data
            });
        }
        else
        {
            await db.GetPromiseTag($scope.Firma,'IrsaliyeParamGetir',[],function(data)
            {
                $scope.Sira = data[0].SATIS_IRSALIYE_SIRA
                db.MaxSiraPromiseTag($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip],function(SiraData)
                {
                    if(SiraData >= $scope.Sira)
                    {
                        $scope.Sira = SiraData;
                    }
                });
            });
        }
        if(UserParam[ParamName].ProjeGetir == 1)
        {
            $scope.ProjeEvrakGetirModal($scope.CheckEvrak);
        }
        //db.MaxSira($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip],function(data){$scope.Sira = data});       
        
        $scope.EvrakTipChange();
        BarkodFocus();
    }
    $scope.BtnCariListele = async function()
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
        await db.GetData($scope.Firma,'CariListeGetir',[Kodu,Adi,UserParam.Sistem.PlasiyerKodu],async function(data)
        {
            if(data.length > 0)
            {
                if(localStorage.mode == 'false')
                {
                    const datas = await data;
                    for(x = 0;x < datas.length;x++)
                    {
                        $scope.CariListe = datas;  
                        let item = x;
                        await db.GetData($scope.Firma,'CariMiktarHesapla',[datas[x].KODU],async function(CariHarData)
                        {
                            if(CariHarData[0].BAKIYE != 0)
                            {
                                datas[item].BAKIYE += CariHarData[0].BAKIYE;
                                $scope.CariListe = datas;  
                                $("#TblCari").jsGrid({data : $scope.CariListe});
                            }
                        });
                    }
                    $scope.CariListe = datas;
                    $scope.Loading = false;
                    $scope.TblLoading = true;
                    $("#TblCari").jsGrid({data : $scope.CariListe});
                    $("#TblCari").jsGrid({pageIndex : true});
                }
                else
                {
                    $scope.CariListe = data;  
                    if($scope.CariListe.length > 0)
                    {
                        $scope.Loading = false;
                        $scope.TblLoading = true;
                        $("#TblCari").jsGrid({data : $scope.CariListe});
                        $("#TblCari").jsGrid({pageIndex : true});
                        CariFocus();
                    }
                    else
                    {
                        alertify.alert("Cari Bulunamadı")
                        $scope.Loading = false;
                        $scope.TblLoading = true;
                        $("#TblCari").jsGrid({data : $scope.CariListe});
                        $("#TblCari").jsGrid({pageIndex : true});
                    }
                }
            }
            else
            {
                alertify.alert("Cari Bulunamadı")
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblCari").jsGrid({data : $scope.CariListe});
                $("#TblCari").jsGrid({pageIndex : true});
            }
        });
    }
    $scope.BtnIhracatListele = async function()
    {   
        $scope.Loading = true;
        $scope.TblLoading = false;
        let Kodu = '';
        let Adi = '';

        if($scope.TxtIhracatAra != "")
        {
            if($scope.CmbIhracatAra == "0")
            {   
                Adi = $scope.TxtIhracatAra.replace("*","%").replace("*","%");
            }
            else
            {
                Kodu = $scope.TxtIhracatAra.replace("*","%").replace("*","%");
            }
        }
        await db.GetData($scope.Firma,'IhracatListeGetir',[Kodu,Adi],async function(data)
        {
            if(data.length > 0)
            {
                $scope.IhracatListe = data;  
                if($scope.IhracatListe.length > 0)
                {
                    $scope.Loading = false;
                    $scope.TblLoading = true;
                    $("#TblIhracat").jsGrid({data : $scope.IhracatListe});
                    $("#TblIhracat").jsGrid({pageIndex : true});
                    CariFocus();
                }
                else
                {
                    alertify.alert("Kod Bulunamadı")
                    $scope.Loading = false;
                    $scope.TblLoading = true;
                    $("#TblIhracat").jsGrid({data : $scope.IhracatListe});
                    $("#TblIhracat").jsGrid({pageIndex : true});
                }
            }
            else
            {
                alertify.alert("Kod Bulunamadı")
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblIhracat").jsGrid({data : $scope.IhracatListe});
                $("#TblIhracat").jsGrid({pageIndex : true});
            }
        });
    }
    $scope.BtnPartiLotGetir = function()
    {
        if(isNaN($scope.TxtLot) || $scope.TxtLot == "")
        $scope.TxtLot = 0;
        if(ParamName == "SatisIrsaliye")
        {
            $scope.TxtLot = 0;
            db.GetData($scope.Firma,'PartiLotGetir',[$scope.Stok[0].KODU,$scope.DepoNo,$scope.TxtParti,$scope.TxtLot],function(data)
            { 
                console.log([$scope.Stok[0].KODU,$scope.DepoNo,$scope.TxtParti,$scope.TxtLot])
                console.log(data)
                $scope.PartiLotListe = data;
                $("#TblPartiLot").jsGrid({data : $scope.PartiLotListe});
                // for (let i = 0; i < data.length; i++)
                // {
                //     if(data[0].SKTTARIH == data[i].SKTTARIH)
                //     {
                //         $scope.PartiLotList.push(data[i]);
                //     }
                // }
                // for (let i = 0; i < data.length; i++)
                // {
                //     if(data[i].SKTTARIH >= $scope.Tarih2Ters)
                //     {                        
                //         if($scope.PartiLotListe.length != 0)
                //         {
                //             if(data[i].TARIH == data[i - 1].TARIH)
                //             {
                //                 $scope.PartiLotListe.push(data[i]);
                //             }
                //         }
                //         else
                //         {
                //             $scope.PartiLotListe.push(data[i]);
                //         }
                //     }
                // }
            });
        }
        else
        {
            db.GetData($scope.Firma,'AlisPartiLotGetir',[$scope.Stok[0].KODU,$scope.DepoNo,$scope.TxtParti,$scope.TxtLot],function(data)
            { 
                $scope.PartiLotListe = data;
                $("#TblPartiLot").jsGrid({data : $scope.PartiLotListe});
            });
        }
    }
    $scope.BtnPartiLotSec = function()
    {
        $('#MdlPartiLot').modal('hide');
        $scope.Stok[0].PARTI = $scope.PartiLotListe[$scope.PartiLotListeSelectedIndex].PARTI;
        $scope.Stok[0].LOT = $scope.PartiLotListe[$scope.PartiLotListeSelectedIndex].LOT;

        $scope.TxtParti = $scope.PartiLotListe[$scope.PartiLotListeSelectedIndex].PARTI;
        $scope.TxtLot = $scope.PartiLotListe[$scope.PartiLotListeSelectedIndex].LOT;
        if(UserParam.Sistem.PartiLotKontrol == 1)//PARTI-LOT KONTROL
        {
            if($scope.IrsaliyeListe != [])
            {
                for(i = 0;i < $scope.IrsaliyeListe.length;i++)
                {   
                    if($scope.Stok[0].PARTI != "" && $scope.Stok[0].LOT != "")
                    {
                        if($scope.Stok[0].PARTI == $scope.IrsaliyeListe[i].sth_parti_kodu && $scope.Stok[0].LOT == $scope.IrsaliyeListe[i].sth_lot_no)
                        {
                            $('#MdlPartiLot').modal('hide');
                            alertify.alert("<a style='color:#3e8ef7''>" + "Okutmuş Olduğunuz "+ $scope.Stok[0].PARTI + ". " + "Parti " + $scope.Stok[0].LOT + ". " +"Lot Daha Önceden Okutulmuş !" + "</a>" );
                            $scope.InsertLock = false;
                            $scope.BtnTemizle();
                            return;
                        }
                    }
                }
            }
        }
        $scope.MKupInsUpdTip = 0;
        $scope.BtnMKupGetir();
        $scope.PartiLotListe = [];
    }
    $scope.BtnPartiLotOlustur = async function()
    {
        return new Promise(async resolve => 
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
                //$scope.BarkodInsert = StokKodu.substring(0,5) + "" + $scope.TxtParti + "" +  Lot;
                var TmpQuery = 
                {
                    db : '{M}.' + $scope.Firma,
                    query:  
                    "SELECT CONVERT(nvarchar,GETDATE(),112) +  " +
                    "ISNULL(MAX(SUBSTRING(CAST(CAST(pl_partikodu AS BIGINT) + 1 AS VARCHAR),9,14)),RIGHT('000000' + CAST(CAST('000000' AS INT) + 1 AS VARCHAR), 6))  AS PARTIKOD " +
                    " FROM PARTILOT WHERE pl_partikodu LIKE (@PARTITARIH + '%' ) ORDER BY MAX(pl_partikodu) DESC ",
                    param:  ['PARTITARIH'],
                    type:   ['string|25'],
                    value:  [$scope.Tarih2Ters]
                }
                await db.GetPromiseQuery(TmpQuery,async function(data)
                {   
                    $scope.TxtParti = data[0].PARTIKOD;
                    $scope.Aciklama = "";
                });
                $scope.BarkodInsert = $scope.TxtParti
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
                                    $scope.SktTarih
                                ]   
                                db.ExecuteTag($scope.Firma,'PartiLotInsert',Data,function(InsertResult)
                                {
                                    if(typeof(InsertResult.result.err) == 'undefined')
                                    {
                                        $scope.Stok[0].PARTI = $scope.TxtParti;
                                        $scope.Stok[0].LOT = $scope.TxtLot;
                                        $('#MdlPartiLot').modal('hide');
                                        $scope.MKupInsUpdTip = 0;
                                        $scope.BtnMKupGetir();
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
                                            db.ExecuteTag($scope.Firma,'BarkodInsert',BarkodInsertData,async function(InsertResult)
                                            {
                                                if($scope.Parca > 0)
                                                {
                                                    if($scope.ParcaKontrol == true)
                                                    {
                                                        await InsertData();
                                                    }
                                                }
                                                resolve();
                                            });
                                        }
                                        else
                                        {
                                            resolve();
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
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
    $scope.BtnRenkBedenSec = function()
    {
        $scope.Stok[0].RENK = $.grep($scope.RenkListe, function (Item) 
        {
            return Item.PNTR == $scope.Stok[0].RENKPNTR;
        })[0].KIRILIM;
        
        $scope.Stok[0].BEDEN = $.grep($scope.BedenListe, function (Item) 
        {
            return Item.PNTR == $scope.Stok[0].BEDENPNTR;
        })[0].KIRILIM;
        $('#MdlRenkBeden').modal('hide');

        PartiLotEkran();
    }
    $scope.BtnStokGridGetir = async function()
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
        await db.GetData($scope.Firma,'StokGetir',[Kodu,Adi,$scope.DepoNo,''],async function(StokData)
        {
            if(StokData.length > 0)
            {
                if(localStorage.mode == 'false')
                {
                    const StokData1 = await StokData;
                    for(x = 0;x < StokData1.length;x++)
                    {
                        let item = x;
                        await db.GetData($scope.Firma,'StokMiktarHesapla',[StokData1[x].KODU],async function(StokHarData)
                        {
                            if(StokHarData[0].DEPOMIKTAR != null)
                            {
                                StokData1[item].DEPOMIKTAR += StokHarData[0].DEPOMIKTAR;
                                $scope.StokListe = StokData1;
                                $("#TblStok").jsGrid({data : $scope.StokListe});
                            }
                        });
                    }
                    $scope.StokListe = StokData1;
                    $scope.Loading = false;
                    $scope.TblLoading = true;
                    $("#TblStok").jsGrid({data : $scope.StokListe});
                    $("#TblStok").jsGrid({pageIndex: true});
                }
                else
                {
                    $scope.StokListe = StokData;
                    $scope.Loading = false;
                    $scope.TblLoading = true;
                    $("#TblStok").jsGrid({data : $scope.StokListe});
                    $("#TblStok").jsGrid({data : $scope.StokListe});
                    $("#TblStok").jsGrid({pageIndex: true});
                }
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
        StokFocus();
    }
    $scope.BtnStokGridSec = function()
    {
        $("#MdlStokGetir").modal('hide');
        StokBarkodGetir($scope.Barkod);
        //$scope.BtnStokGridGetir();
        $("#TblStok").jsGrid({pageIndex: true})
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
    $scope.BtnBarkodGetirClick = function()
    {
        StokBarkodGetir($scope.Barkod); 
    }
    $scope.BtnStokBarkodGetir = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            StokBarkodGetir($scope.Barkod); 
        }
    }
    $scope.BtnOnlineYazdir = function()
    {   
        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "UPDATE STOK_HAREKETLERI SET sth_special1 = @sth_special1 " +
                    "WHERE sth_evrakno_seri = @sth_evrakno_seri AND sth_evrakno_sira = @sth_evrakno_sira AND sth_evraktip = @sth_evraktip ",
            param:  ['sth_special1','sth_evrakno_seri','sth_evrakno_sira','sth_evraktip'],
            type:   ['string|25','string|25','int','int',],
            value:  [$scope.Special,$scope.Seri,$scope.Sira,$scope.EvrakTip]
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
    $scope.BtnEtiketBas = async function()
    {
        return new Promise(async resolve => 
        {
            if($scope.CokluSecim == true)
            {
                for(i = 0; i < $scope.IslemListeSelectedRows.length; i++)
                {
                    $scope.StokKodu = $scope.IslemListeSelectedRows[i].sth_stok_kod;
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
                        $scope.IslemListeSelectedRows[i].sth_miktar,
                        $scope.DepoNo,
                        $scope.StokKodu,
                        1,
                        1,
                        $scope.IslemListeSelectedRows[i].BARKOD,
                        1
                    ]
                    await db.ExecutePromiseTag($scope.Firma,'EtiketInsert',InsertData,async function(InsertResult)
                    {
                        console.log(i)
                    });
                }
                console.log($scope.IslemListeSelectedRows.length,i)
                if(i == $scope.IslemListeSelectedRows.length)
                {
                    resolve()
                    alertify.alert("Etiket Yazdırıldı.");
                }
                else
                {
                    resolve()
                    alertify.alert("Etiket Yazdıralamadı.");
                }
            }
            else
            {
                for(i = 0; i < $scope.IrsaliyeListe.length; i++)
                {
                    $scope.StokKodu = $scope.IrsaliyeListe[i].sth_stok_kod;
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
                        $scope.IrsaliyeListe[i].sth_miktar,
                        $scope.DepoNo,
                        $scope.StokKodu,
                        1,
                        1,
                        $scope.IrsaliyeListe[i].BARKOD,
                        1
                    ]
                    await db.ExecutePromiseTag($scope.Firma,'EtiketInsert',InsertData,async function(InsertResult)
                    {
                        console.log(i)
                    });
                }
                console.log(i,$scope.IrsaliyeListe.length)
                if(i == $scope.IrsaliyeListe.length)
                {
                    resolve()
                    alertify.alert("Etiket Yazdırıldı.");
                }
                else
                {
                    resolve()
                    alertify.alert("Etiket Yazdıralamadı.");
                }
            }
        });
    }
    // $scope.BtnEtiketBasAuto = function()
    // {
    //     if($scope.StokKodu != "")
    //     {
    //         var InsertData = 
    //         [
    //             UserParam.MikroId,
    //             UserParam.MikroId,
    //             1,
    //             $scope.Seri,
    //             $scope.Sira,
    //             "",
    //             $scope.BelgeNo,
    //             0,
    //             0,
    //             $scope.Miktar * $scope.Stok[0].CARPAN,
    //             $scope.DepoNo,
    //             $scope.StokKodu,
    //             1,
    //             1,
    //             $scope.TxtParti,
    //             $scope.Miktar * $scope.Stok[0].CARPAN
    //         ]
    //         db.ExecuteTag($scope.Firma,'EtiketInsert',InsertData,function(InsertResult)
    //         {
    //             if(typeof(InsertResult.result.err) == 'undefined')
    //             {
    //                 alertify.alert("Etiket Yazdırıldı.");
    //             }
    //             else
    //             {
    //                 alertify.alert("Etiket Yazdıralamadı.");
    //             }
    //         });
    //     }
    // }
    $scope.StokDetayClick = async function()
    {
        await db.GetPromiseTag($scope.Firma,'StokDetay',[$scope.CariKodu,$scope.Stok[0].KODU],function(Data) //STOK DETAY
        {   
            $scope.StokDetay = Data
        });
    }
    $scope.MiktarFiyatValid = async function()
    {
        return new Promise(resolve => 
        {
            if($scope.Parca > 0)
            {
                if($scope.ParcaKontrol == false)
                {
                    $scope.ParcaMiktar = $scope.Miktar / $scope.Parca;
                    $scope.Stok[0].INDIRIM = 0;
                    $scope.Stok[0].TUTAR = ($scope.Stok[0].CARPAN * $scope.ParcaMiktar) * $scope.Stok[0].FIYAT;
                }
                else
                {
                    $scope.Stok[0].INDIRIM = 0;
                    $scope.Stok[0].TUTAR = ($scope.Stok[0].CARPAN * $scope.Miktar) * $scope.Stok[0].FIYAT;
                }
            }
            if($scope.CmbEvrakTip != 5)
            {
                $scope.Stok[0].INDIRIM = 0;
    
                $scope.Stok[0].TUTAR = ($scope.Stok[0].CARPAN * $scope.Miktar) * $scope.Stok[0].FIYAT;
                $scope.Stok[0].ISK.TUTAR1 = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].ISK.ORAN1 / 100);
                $scope.Stok[0].ISK.TIP1 = $scope.Stok[0].ISK.TUTAR1 === 0 ? 0 : 1; 
                $scope.Stok[0].INDIRIM = $scope.Stok[0].INDIRIM + (($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].ISK.ORAN1 / 100));       
                
                $scope.Stok[0].ISK.TUTAR2 = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].ISK.ORAN2 / 100);
                $scope.Stok[0].ISK.TIP2 = $scope.Stok[0].ISK.TUTAR2 === 0 ? 0 : 1;
                $scope.Stok[0].INDIRIM = $scope.Stok[0].INDIRIM + (($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].ISK.ORAN2 / 100));
                
                $scope.Stok[0].ISK.TUTAR3 = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].ISK.ORAN3 / 100);
                $scope.Stok[0].ISK.TIP3 = $scope.Stok[0].ISK.TUTAR3 === 0 ? 0 : 1;
                $scope.Stok[0].INDIRIM = $scope.Stok[0].INDIRIM + (($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].ISK.ORAN3 / 100));
                
                $scope.Stok[0].ISK.TUTAR4 = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].ISK.ORAN4 / 100);
                $scope.Stok[0].ISK.TIP4 = $scope.Stok[0].ISK.TUTAR4 === 0 ? 0 : 1;
                $scope.Stok[0].INDIRIM = $scope.Stok[0].INDIRIM + (($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].ISK.ORAN4 / 100));
                
                $scope.Stok[0].ISK.TUTAR5 = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].ISK.ORAN5 / 100);
                $scope.Stok[0].ISK.TIP5 = $scope.Stok[0].ISK.TUTAR5 === 0 ? 0 : 1;
                $scope.Stok[0].INDIRIM = $scope.Stok[0].INDIRIM + (($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].ISK.ORAN5 / 100));
                
                $scope.Stok[0].ISK.TUTAR6 = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].ISK.ORAN6 / 100);
                $scope.Stok[0].ISK.TIP6 = $scope.Stok[0].ISK.TUTAR6 === 0 ? 0 : 1;
                $scope.Stok[0].INDIRIM = $scope.Stok[0].INDIRIM + (($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].ISK.ORAN6 / 100));
                if($scope.PaketBarkodKontrol == false)
                {
                    console.log($scope.Stok[0].TUTAR,$scope.Stok[0].INDIRIM,$scope.Stok[0].TOPTANVERGI)
                    $scope.Stok[0].KDV = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].TOPTANVERGI / 100);
                }
                else
                {
                    let StokKDV = 0;
                    let PaketTutar;
                    if($scope.PBarkodListe.length > 0)
                    {
                        for (let i = 0; i < $scope.PBarkodListe.length; i++)
                        {
                            console.log($scope.PBarkodListe[i].TUTAR)
                            PaketTutar = ($scope.Stok[0].CARPAN * $scope.Miktar) * $scope.PBarkodListe[i].TUTAR;
                            StokKDV += PaketTutar * ($scope.PBarkodListe[i].VERGI / 100);
                        }
                        $scope.Stok[0].KDV = StokKDV;
                    }
                    else
                    {
                        $scope.Stok[0].KDV = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) * ($scope.Stok[0].TOPTANVERGI / 100);
                    }
                    console.log($scope.Stok[0].KDV)
                }
                $scope.Stok[0].TOPTUTAR = ($scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM) + $scope.Stok[0].KDV;
                resolve();
            }
            else
            {
                $scope.Stok[0].TUTAR = ($scope.Stok[0].CARPAN * $scope.Miktar) * $scope.Stok[0].FIYAT;
                $scope.Stok[0].KDV = 0;
                $scope.Stok[0].TOPTUTAR = $scope.Stok[0].TUTAR - $scope.Stok[0].INDIRIM;
            }
        })
    }
    $scope.IhracatListeRowClick = function(pIndex,pItem,pObj)
    {
        if(!$scope.EvrakLock)
        {
            if ( IhracatSelectedRow ) { IhracatSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
            var $row = pObj.rowByItem(pItem);
            $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
            IhracatSelectedRow = $row;
            
            $scope.IhracatKodu = $scope.IhracatListe[pIndex].KODU;
            $scope.IhracatAdi = $scope.IhracatListe[pIndex].ADI;
            $scope.CariKodu = $scope.IhracatListe[pIndex].CARI;
            $scope.IhracatCariKod = $scope.IhracatListe[pIndex].CARI;
            if($scope.CariKodu != "")
            {
                db.GetData($scope.Firma,'CariListeGetir',[$scope.CariKodu,'',UserParam.Sistem.PlasiyerKodu],function(data)
                {
                    $scope.CariListe = data;
                    if(data.length > 0)
                    {
                        $("#TblCari").jsGrid({data : $scope.CariListe});

                        let Obj = $("#TblCari").data("JSGrid");
                        let Item = Obj.rowByItem(data[0]);
                        
                        $scope.CariListeRowClick(0,Item,Obj);
                    }
                    else
                    {
                        alertify.alert("Cari Bulunamadı.")
                    }

                });
            }
            $scope.DovizChangeKodu = "0"
            $scope.DovizChange()
            AdresNoGetir();
        }
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
            $scope.CariSoyAdi = $scope.CariListe[pIndex].UNVAN2;
            $scope.CariFiyatListe = $scope.CariListe[pIndex].SATISFK;      
            $scope.CariDovizCinsi = $scope.CariListe[pIndex].DOVIZCINSI;
            $scope.CariDovizCinsi1 = $scope.CariListe[pIndex].DOVIZCINSI1;
            $scope.CariDovizCinsi2 = $scope.CariListe[pIndex].DOVIZCINSI2;
            $scope.CariDovizKuru = $scope.CariListe[pIndex].DOVIZKUR;
            $scope.CariDovizKuru1 = $scope.CariListe[pIndex].DOVIZKUR1;
            $scope.CariDovizKuru2 = $scope.CariListe[pIndex].DOVIZKUR2;
            $scope.CariIskontoKodu = $scope.CariListe[pIndex].ISKONTOKOD;
            $scope.CariAltDovizKuru = $scope.CariListe[pIndex].ALTDOVIZKUR;
            $scope.CariBakiye = $scope.CariListe[pIndex].BAKIYE;
            $scope.CariVDADI = $scope.CariListe[pIndex].VDADI;
            $scope.CariVDNO = $scope.CariListe[pIndex].VDNO;
            $scope.Adres = $scope.CariListe[pIndex].ADRES;
            $scope.Adres1 = $scope.CariListe[pIndex].ADRES1;
            $scope.Adres2 = $scope.CariListe[pIndex].ADRES2;
            $scope.DovizSembol = $scope.CariListe[pIndex].DOVIZSEMBOL
            $scope.DovizSembol1 = $scope.CariListe[pIndex].DOVIZSEMBOL1
            $scope.DovizSembol2 = $scope.CariListe[pIndex].DOVIZSEMBOL2
            $scope.Risk = $scope.CariListe[pIndex].RISK
            $scope.RiskLimit = $scope.CariListe[pIndex].RISKLIMIT;
            $scope.TelNo1 = $scope.CariListe[pIndex].TELNO1;
            $scope.Email = $scope.CariListe[pIndex].EMAIL;
            $scope.DovizChangeKodu = "0"
            $scope.DovizChange()
            AdresNoGetir();
        }
    }
    $scope.CokluSecimChange = function()
    {
        let Obj = $("#TblIslem").data("JSGrid");
        console.log(Obj)
        console.log(Obj._bodyGrid[0])
        for (let i = 0; i < $scope.IrsaliyeListe.length; i++) 
        {
            let Item = Obj.rowByItem($scope.IrsaliyeListe[i]);
            Item.children('.jsgrid-cell').css('background-color', '').css('color','')
        }
    }
    $scope.IslemListeRowClick = function(pIndex,pItem,pObj)
    {
        console.log(pItem)
        var $row = pObj.rowByItem(pItem);
        if($scope.CokluSecim == true)
        {
            //Satır Seçilmişse
            if(pObj.rowByItem(pItem).children('.jsgrid-cell').css('background-color') == "rgb(41, 121, 255)")
            {
                let x = 0;
                pObj.rowByItem(pItem).children('.jsgrid-cell').css('background-color', '').css('color',''); 
                for (let i = 0; i < $scope.IslemListeSelectedRows.length; i++) 
                {
                    if(pItem.sth_Guid == $scope.IslemListeSelectedRows[i].sth_Guid)
                    {
                        console.log(pItem.sth_Guid,$scope.IslemListeSelectedRows[i].sth_Guid )
                        x = x + 1;
                        console.log(i)
                    }
                }
                if(x >= 1)
                {
                    let index = $scope.IslemListeSelectedRows.findIndex(item => item.sth_Guid == pItem.sth_Guid)
                    $scope.IslemListeSelectedRows.splice(index,1)
                    console.log($scope.IslemListeSelectedRows)
                }
            }
            //Satır Seçilmemişse
            else
            {
                $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
                if($scope.IslemListeSelectedRows.length > 0)
                {
                    let x = 0;
                    for (let i = 0; i < $scope.IslemListeSelectedRows.length; i++) 
                    {
                        if(pItem.sth_Guid == $scope.IslemListeSelectedRows[i].sth_Guid)
                        {
                            x = x + 1;
                            console.log(i)
                        }
                    }
                    if(x == 0)
                    {
                        $scope.IslemListeSelectedRows.push(pItem)
                    }
                }
                else
                {
                    $scope.IslemListeSelectedRows.push(pItem)
                }
            }
        }
        else
        {
            if(IslemSelectedRow) 
            { 
                IslemSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); 
            }
            $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        }        
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
    $scope.MKupListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( MKupSelectedRow ) { MKupSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        MKupSelectedRow = $row;

        console.log($scope.MKupGuid)
        $scope.MKupListeSelectedIndex = pIndex;
        $scope.MKupGuid = $scope.MKupGetirListe[pIndex].GUID;
        console.log($scope.MKupGuid)
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
    $scope.ProjeEvrakListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( ProjeEvrakSelectedRow ) { ProjeEvrakSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        ProjeEvrakSelectedRow = $row;
        $scope.ProjeEvrakSelectedIndex = pIndex;

        $scope.Seri = $scope.ProjeEvrakGetirListe[$scope.ProjeEvrakSelectedIndex].SERI;
        $scope.Sira = $scope.ProjeEvrakGetirListe[$scope.ProjeEvrakSelectedIndex].SIRA;
    }
    $scope.EvrakGetirListeRowClick = function(pIndex,pItem,pObj)
    {
        if ( EvrakGetirListeSelectedRow ) { EvrakGetirListeSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
        var $row = pObj.rowByItem(pItem);
        $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
        EvrakGetirListeSelectedRow = $row;
        $scope.Seri = $scope.EvrakGetirListe[pIndex].SERI;
        $scope.Sira = $scope.EvrakGetirListe[pIndex].SIRA;
        $scope.EvrakGetir();
        $scope.MainClick();
    }
    $scope.BtnAciklamaKaydet = function()
    {
        if($scope.AciklamaGuid == '')
        {
            var InsertData =
            [
                0,
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
                    alertify.alert('Başarıyla Kaydedildi')
                    $scope.IslemSatirlariClick()
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
        $scope.Fiyat = 0;
        $scope.Miktar = 1;
        $scope.BarkodLock = false;
        $scope.SonSatisMiktar = "0";

        $scope.BirimListe = [];
        BarkodFocus();      
    }
    $scope.BtnDuzenle = function()
    {
        let index = $scope.IslemListeSelectedIndex;
        if(UserParam[ParamName].PartiMKupEkran == 1)
        {
            $scope.MKupInsUpdTip = 1;
            $('#MdlMetreKupHsp').modal('show');
            db.GetPromiseTag($scope.Firma,'AlisPartiLotGetir',[$scope.IrsaliyeListe[index].sth_stok_kod,$scope.DepoNo,$scope.IrsaliyeListe[index].sth_parti_kodu,$scope.IrsaliyeListe[index].sth_lot_no],function(data)
            {
                console.log(data)
                $scope.PlGuid = data[0].GUID
                db.GetPromiseTag($scope.Firma,'MetreKupGetir',[$scope.PlGuid],function(MetreKupData)
                {
                    $scope.MKupGetirListe = MetreKupData;
                    $("#TblMKupListe").jsGrid({data : $scope.MKupGetirListe});
                    $scope.MKupToplamMiktar = db.SumColumn($scope.MKupGetirListe,"MKUP");
                    $scope.MKupToplamSatir = $scope.MKupGetirListe.length;
                });
            })
        }
        else
        {
            $scope.MiktarEdit = $scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_miktar;
            $scope.FiyatEdit = $scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_tutar / $scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_miktar;
    
            $("#MdlDuzenle").modal('show');
        }
    }
    $scope.BtnDuzenleKaydet = function(pIndex)
    {   
        let TmpTutar = $scope.FiyatEdit * $scope.MiktarEdit;
        let TmpYuzde1 = $scope.IrsaliyeListe[pIndex].sth_iskonto1 / $scope.IrsaliyeListe[pIndex].sth_tutar; 
        let TmpYuzde2 = $scope.IrsaliyeListe[pIndex].sth_iskonto2 / ($scope.IrsaliyeListe[pIndex].sth_tutar - $scope.IrsaliyeListe[pIndex].sth_iskonto1); 
        let TmpYuzde3 = $scope.IrsaliyeListe[pIndex].sth_iskonto3 / ($scope.IrsaliyeListe[pIndex].sth_tutar - ($scope.IrsaliyeListe[pIndex].sth_iskonto1 + $scope.IrsaliyeListe[pIndex].sth_iskonto2));
        let TmpYuzde4 = $scope.IrsaliyeListe[pIndex].sth_iskonto4 / ($scope.IrsaliyeListe[pIndex].sth_tutar - ($scope.IrsaliyeListe[pIndex].sth_iskonto1 + $scope.IrsaliyeListe[pIndex].sth_iskonto2 + $scope.IrsaliyeListe[pIndex].sth_iskonto3));
        let TmpYuzde5 = $scope.IrsaliyeListe[pIndex].sth_iskonto5 / ($scope.IrsaliyeListe[pIndex].sth_tutar - ($scope.IrsaliyeListe[pIndex].sth_iskonto1 + $scope.IrsaliyeListe[pIndex].sth_iskonto2 + $scope.IrsaliyeListe[pIndex].sth_iskonto3 + $scope.IrsaliyeListe[pIndex].sth_iskonto4));

        $scope.IrsaliyeListe[pIndex].sth_iskonto1 = TmpTutar * TmpYuzde1;
        $scope.IrsaliyeListe[pIndex].sth_iskonto2 = (TmpTutar - $scope.IrsaliyeListe[pIndex].sth_iskonto1) * TmpYuzde2;
        $scope.IrsaliyeListe[pIndex].sth_iskonto3 = (TmpTutar - ($scope.IrsaliyeListe[pIndex].sth_iskonto1 + $scope.IrsaliyeListe[pIndex].sth_iskonto2)) * TmpYuzde3;
        $scope.IrsaliyeListe[pIndex].sth_iskonto4 = (TmpTutar- ($scope.IrsaliyeListe[pIndex].sth_iskonto1 + $scope.IrsaliyeListe[pIndex].sth_iskonto2 + $scope.IrsaliyeListe[pIndex].sth_iskonto3)) * TmpYuzde4;
        $scope.IrsaliyeListe[pIndex].sth_iskonto5 = (TmpTutar - ($scope.IrsaliyeListe[pIndex].sth_iskonto1 + $scope.IrsaliyeListe[pIndex].sth_iskonto2 + $scope.IrsaliyeListe[pIndex].sth_iskonto3 + $scope.IrsaliyeListe[pIndex].sth_iskonto4)) * TmpYuzde5;

        $scope.Update(pIndex);
    
        angular.element('#MdlDuzenle').modal('hide');
    }
    $scope.DovizChange = function()
    {
            if($scope.DovizChangeKodu == 0)
            {
               $scope.EvrakDovizTip = $scope.DovizSembol
            }
            else if($scope.DovizChangeKodu == 1)
            {
                $scope.CariDovizCinsi = $scope.CariDovizCinsi1;
                $scope.CariDovizKuru = $scope.CariDovizKuru1;
                $scope.EvrakDovizTip = $scope.DovizSembol1
            }
            else if($scope.DovizChangeKodu == 2)
            {
                $scope.CariDovizCinsi = $scope.CariDovizCinsi2
                $scope.CariDovizKuru =  $scope.CariDovizKuru2
                $scope.EvrakDovizTip = $scope.DovizSembol2
            }
    }
    $scope.BtnVergiDuzenle = function()
    {
        $("#MdlVergiDuzenle").modal('show');
    }
    $scope.BtnVergiDuzenleKaydet = function()
    {
        if($scope.ToplamKdv >= 1 )
        {
            for(i = 0;i < $scope.IrsaliyeListe.length;i++)
            {
                $scope.IrsaliyeListe[i].sth_vergi = ($scope.VergiEdit / $scope.ToplamKdv) *  $scope.IrsaliyeListe[i].sth_vergi
    
                let sth_vergi = $scope.IrsaliyeListe[i].sth_vergi
                let sth_Guid = $scope.IrsaliyeListe[i].sth_Guid

                let TmpQuery = 
                {
                    db :'{M}.' + $scope.Firma,
                    query:  "UPDATE STOK_HAREKETLERI SET sth_vergi = @sth_vergi WHERE sth_Guid = @sth_Guid",
                    param : ['sth_vergi','sth_Guid'],
                    type : ['float','string|50'],
                    value : [sth_vergi,sth_Guid]
                }
                db.GetDataQuery(TmpQuery,function(Data)
                {
                    DipToplamHesapla() 
                });
            }
    
            angular.element('#MdlVergiDuzenle').modal('hide');
        }
        else
        {
            let sth_vergi = $scope.VergiEdit
            let sth_Guid = $scope.IrsaliyeListe[0].sth_Guid
            let TmpQuery = 
            {

                db :'{M}.' + $scope.Firma,
                query:  "UPDATE STOK_HAREKETLERI SET sth_vergi = @sth_vergi WHERE sth_Guid = @sth_Guid",
                param : ['sth_vergi','sth_Guid'],
                type : ['float','string|50'],
                value : [sth_vergi,sth_Guid]
            }
            db.GetDataQuery(TmpQuery,function(Data)
            {
                db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
                    {
                        $scope.IrsaliyeListe = data;
                        $("#TblIslem").jsGrid({data : $scope.IrsaliyeListe});  
                        DipToplamHesapla();  
                    });
            });
            angular.element('#MdlVergiDuzenle').modal('hide');
        }
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
            for(i = 0;i < $scope.IrsaliyeListe.length;i++)
            {
                $scope.IskTplTutar += $scope.IrsaliyeListe[i].sth_tutar;
                $scope.IskTutar1 += $scope.IrsaliyeListe[i].sth_iskonto1;
                $scope.IskTplTutar1 = $scope.IskTplTutar - $scope.IskTutar1;
                $scope.IskTutar2 += $scope.IrsaliyeListe[i].sth_iskonto2;
                $scope.IskTplTutar2 = $scope.IskTplTutar1 - $scope.IskTutar2;
                $scope.IskTutar3 += $scope.IrsaliyeListe[i].sth_iskonto3;
                $scope.IskTplTutar3 = $scope.IskTplTutar2 - $scope.IskTutar3;
                $scope.IskTutar4 += $scope.IrsaliyeListe[i].sth_iskonto4;
                $scope.IskTplTutar4 = $scope.IskTplTutar3 - $scope.IskTutar4;
                $scope.IskTutar5 += $scope.IrsaliyeListe[i].sth_iskonto5;
                $scope.IskTplTutar5 = $scope.IskTplTutar4 - $scope.IskTutar5;
            }
        }
        else
        {
            $scope.IskTplTutar = $scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_tutar;
            $scope.IskTutar1 = $scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_iskonto1;
            $scope.IskTplTutar1 = $scope.IskTplTutar - $scope.IskTutar1;
            $scope.IskTutar2 = $scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_iskonto2;
            $scope.IskTplTutar2 = $scope.IskTplTutar1 - $scope.IskTutar2;
            $scope.IskTutar3 = $scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_iskonto3;
            $scope.IskTplTutar3 = $scope.IskTplTutar2 - $scope.IskTutar3;
            $scope.IskTutar4 = $scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_iskonto4;
            $scope.IskTplTutar4 = $scope.IskTplTutar3 - $scope.IskTutar4;
            $scope.IskTutar5 = $scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_iskonto5;
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
            this['IskTutar' + pIndex] = $filter('number')(this['IskTutar' + pIndex],4);

        }
        else
        {
            this['IskYuzde' + pIndex] = (100 * this['IskTutar' + pIndex]) / TmpTutar;
            this['IskYuzde' + pIndex] = $filter('number')(this['IskYuzde' + pIndex],4);
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

            this['IskTplTutar' + i] = $filter('number')(this['IskTplTutar' + i],4);

        }
    }
    $scope.BtnIskontoKaydet = function()
    {   
        if($scope.IskontoTip == 0)
        {   
            for(i = 0;i < $scope.IrsaliyeListe.length;i++)
            {
                $scope.IrsaliyeListe[i].sth_iskonto1 = $scope.IrsaliyeListe[i].sth_tutar * ($scope.IskYuzde1 / 100);
                $scope.IrsaliyeListe[i].sth_iskonto2 = ($scope.IrsaliyeListe[i].sth_tutar - $scope.IrsaliyeListe[i].sth_iskonto1) * ($scope.IskYuzde2 / 100);
                $scope.IrsaliyeListe[i].sth_iskonto3 = ($scope.IrsaliyeListe[i].sth_tutar - ($scope.IrsaliyeListe[i].sth_iskonto1 + $scope.IrsaliyeListe[i].sth_iskonto2)) * ($scope.IskYuzde3 / 100);
                $scope.IrsaliyeListe[i].sth_iskonto4 = ($scope.IrsaliyeListe[i].sth_tutar - ($scope.IrsaliyeListe[i].sth_iskonto1 + $scope.IrsaliyeListe[i].sth_iskonto2 + $scope.IrsaliyeListe[i].sth_iskonto3)) * ($scope.IskYuzde4 / 100);
                $scope.IrsaliyeListe[i].sth_iskonto5 = ($scope.IrsaliyeListe[i].sth_tutar - ($scope.IrsaliyeListe[i].sth_iskonto1 + $scope.IrsaliyeListe[i].sth_iskonto2 + $scope.IrsaliyeListe[i].sth_iskonto3 + $scope.IrsaliyeListe[i].sth_iskonto4)) * ($scope.IskYuzde5 / 100);

                $scope.FiyatEdit = $scope.IrsaliyeListe[i].sth_tutar / $scope.IrsaliyeListe[i].sth_miktar;
                $scope.MiktarEdit = $scope.IrsaliyeListe[i].sth_miktar;

                $scope.Update(i);
            }
        }
        else
        {
            let i = $scope.IslemListeSelectedIndex;

            $scope.IrsaliyeListe[i].sth_iskonto1 = $scope.IrsaliyeListe[i].sth_tutar * ($scope.IskYuzde1 / 100);
            $scope.IrsaliyeListe[i].sth_iskonto2 = ($scope.IrsaliyeListe[i].sth_tutar - $scope.IrsaliyeListe[i].sth_iskonto1) * ($scope.IskYuzde2 / 100);
            $scope.IrsaliyeListe[i].sth_iskonto3 = ($scope.IrsaliyeListe[i].sth_tutar - ($scope.IrsaliyeListe[i].sth_iskonto1 + $scope.IrsaliyeListe[i].sth_iskonto2)) * ($scope.IskYuzde3 / 100);
            $scope.IrsaliyeListe[i].sth_iskonto4 = ($scope.IrsaliyeListe[i].sth_tutar - ($scope.IrsaliyeListe[i].sth_iskonto1 + $scope.IrsaliyeListe[i].sth_iskonto2 + $scope.IrsaliyeListe[i].sth_iskonto3)) * ($scope.IskYuzde4 / 100);
            $scope.IrsaliyeListe[i].sth_iskonto5 = ($scope.IrsaliyeListe[i].sth_tutar - ($scope.IrsaliyeListe[i].sth_iskonto1 + $scope.IrsaliyeListe[i].sth_iskonto2 + $scope.IrsaliyeListe[i].sth_iskonto3 + $scope.IrsaliyeListe[i].sth_iskonto4)) * ($scope.IskYuzde5 / 100);
            
            $scope.FiyatEdit = $scope.IrsaliyeListe[i].sth_tutar / $scope.IrsaliyeListe[i].sth_miktar;
            $scope.MiktarEdit = $scope.IrsaliyeListe[i].sth_miktar;

            $scope.Update(i);
        }
        $("#MdlIskontoEkran").modal('hide');
        DipToplamHesapla()
    }
    $scope.EvrakTipChange = async function()
    {
        if(ParamName == "AlisIrsaliye")
        {
            if($scope.CmbEvrakTip == 0) //Perakende Alış
            {
               $scope.EvrakTip = 13;
               $scope.NormalIade = 0;
               $scope.Tip = 0;
               $scope.Cins = 1;
            }
            else if($scope.CmbEvrakTip == 1) //Toptan Alış
            {
                $scope.EvrakTip = 13;
                $scope.NormalIade = 0;
                $scope.Tip = 0;
                $scope.Cins = 0; 
            }
            else if($scope.CmbEvrakTip == 2) //Perakende Alış İade
            {
                $scope.EvrakTip = 13;
                $scope.NormalIade = 1;
                $scope.Tip = 0;
                $scope.Cins = 1;
                
            }
            else if($scope.CmbEvrakTip == 3) //Toptan Alış İade
            {
                $scope.EvrakTip = 13;
                $scope.NormalIade = 1;
                $scope.Tip = 0;
                $scope.Cins = 0;
            } 
        }
        else
        {
            if($scope.CmbEvrakTip == 0) //Perakende Satis
            {
               $scope.EvrakTip = 1;
               $scope.NormalIade = 0;
               $scope.Tip = 1;
               $scope.Cins = 1;
            }
            else if($scope.CmbEvrakTip == 1) //Toptan Satis
            {
                $scope.EvrakTip = 1;
                $scope.NormalIade = 0;
                $scope.Tip = 1;
                $scope.Cins = 0; 
            }
            else if($scope.CmbEvrakTip == 2) //Perakende Satis İade
            {
                $scope.EvrakTip = 1;
                $scope.NormalIade = 1;
                $scope.Tip = 1;
                $scope.Cins = 1;
            }
            else if($scope.CmbEvrakTip == 3) //Toptan Satis İade
            {
                $scope.EvrakTip = 1;
                $scope.NormalIade = 1;
                $scope.Tip = 1;
                $scope.Cins = 0;
            }
            else if($scope.CmbEvrakTip == 4) // İhraç Kayıtlı İrsaliye
            {
                $scope.EvrakTip = 1;
                $scope.NormalIade = 0;
                $scope.Tip = 1;
                $scope.Cins = 2;
            }
            else if($scope.CmbEvrakTip == 5) // İhraç Kayıtlı İrsaliye
            {
                $scope.EvrakTip = 1;
                $scope.NormalIade = 0;
                $scope.Tip = 1;
                $scope.Cins = 12;
                $scope.IhracatLoad = true;
            }
            if($scope.CmbEvrakTip != 5)
            $scope.IhracatLoad = false;
        }
        //SIRA
        if(localStorage.mode == 'true')
            {
                await db.MaxSiraPromiseTag($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip,0],function(data)
                {
                    $scope.Sira = data
                });
        }
        else
        {
            await db.GetPromiseTag($scope.Firma,'IrsaliyeParamGetir',[],function(data)
            {
                $scope.Sira = data[0].SATIS_IRSALIYE_SIRA
                db.MaxSiraPromiseTag($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip],function(SiraData)
                {
                    if(SiraData >= $scope.Sira)
                    {
                        $scope.Sira = SiraData;
                    }
                });
            });
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
    $scope.PersonelChange = function()
    {
        $scope.PersonelListe.forEach(function(item)
        {
            if(item.KODU == $scope.Personel)
            {
                $scope.PersonelAdi = item.ADI;
                $scope.TxtSfrAd = item.ADI;
                $scope.TxtSrfSoyAd = item.SOYADI;
                $scope.TxtSfrTckn = item.TCKN;
                $scope.TxtPlaka = UserParam[ParamName].Plaka;
                $scope.EirSoforId = item.GUID;
            }
        });
    }
    $scope.Insert = async function()
    { 
        if($scope.Stok[0].FIYAT < $scope.Fiyat)
        {
            alertify.alert("Fiyatı düşüremezsin")
            $scope.Stok[0].FIYAT = $scope.Fiyat
            $scope.MiktarFiyatValid();
            return;
        }
        if(typeof($scope.Stok[0].KODU) != 'undefined')
        {
            if(ParamName == "SatisIrsaliye")
            {
                if($scope.RiskParam != 0)
                {
                    let TmpRiskOran = ($scope.Risk / $scope.RiskLimit) * 100;

                    if(TmpRiskOran >= 100)
                    {
                        alertify.alert("Risk limitini aştınız");
                        return;
                    }
                    if(TmpRiskOran >= UserParam.Sistem.RiskLimitOran)
                    {
                        alertify.alert("Risk limitinin %" + parseInt(TmpRiskOran) + " kadarı doldu");
                    }
                }
            }
            if(UserParam.SatisIrsaliye.EksiyeDusme == 1 && $scope.EvrakTip == 1 &&  ($scope.Miktar * $scope.Stok[0].CARPAN) > $scope.Stok[0].DEPOMIKTAR)
            {
                alertify.alert("Eksiye Düşmeye İzin Verilmiyor.");
                return;
            } 
            $scope.InsertLock = true
            if($scope.PBarkodListe.length > 0) //PAKETTEKİLERİ INSERT ETME İŞLEMİ
            {
                if($scope.PaketBarkodKontrol == true || $scope.Stok[0].PAKET != "")
                {
                    // if($scope.Stok[0].PAKET != "")
                    // {
                    //     await db.GetData($scope.Firma,'PaketBarkodGetir',[$scope.Stok[0].KODU,$scope.DepoNo,$scope.FiyatListeNo],async function(PBarkodData)
                    //     {
                    //         $scope.PBarkodListe = PBarkodData;
                    //     });
                    // }
    
                    $scope.PaketBarkodKontrol = false;
    
                    for (let i = 0; i <= $scope.PBarkodListe.length; i++)
                    {
                        if($scope.PBarkodListe.length == i)
                        {
                            $scope.PBarkodListe = [];
                            $scope.BtnTemizle();
                        }
                        else
                        {
                            console.log($scope.PBarkodListe[i])
                            if(typeof $scope.PBarkodListe[i] != "undefined")
                            {
                                if(i == 0)
                                {
                                    $scope.PaketMiktar = $scope.Miktar;
                                }
                                $scope.Miktar = 1;
                                await StokBarkodGetir($scope.PBarkodListe[i].STOKKODU)
                                await InsertData();
    
                                console.log(i,$scope.PBarkodListe.length)
                            }
                        }
                    }
                    return;
                }
            }
            else if($scope.PaletBarkodListe.length > 0 && $scope.PaletBarkodStok.length == 0) //PALETTEKİLERİ INSERT ETME İŞLEMİ
            {
                //PALET BARKODUNDA VARSA VE BARKODDAN ÇAĞIRMA YAPMAMIŞSA
                for (let i = 0; i <= $scope.PaletBarkodListe.length; i++)
                {
                    if($scope.PaletBarkodListe.length == i)
                    {
                        console.log("Selam üstadım")
                        $scope.PaletBarkodListe = [];
                        $scope.BtnTemizle();
                    }
                    else
                    {
                        console.log($scope.PaletBarkodListe[i])
                        if(typeof $scope.PaletBarkodListe[i] != "undefined")
                        {
                            if(i == 0)
                            {
                                $scope.PaketMiktar = 1;
                            }
                            $scope.Miktar = 1;
                            await StokBarkodGetir($scope.PaletBarkodListe[i].STOK_BARKOD)
                            await InsertData();
                            var TmpQuery = 
                            {
                                db : '{M}.' + $scope.Firma,
                                query: "UPDATE BEKA_PALET_TANIMLARI SET DURUM = 1 WHERE STOK_BARKOD = @STOKBARKOD ",
                                param:  ['STOKBARKOD',],
                                type:   ['string|50',],
                                value:  [$scope.PaletBarkodListe[i].STOK_BARKOD]
                            }
                            await db.ExecutePromiseQuery(TmpQuery,function(data)
                            {  
                                console.log("UPDATE EDİLDİ")
                            });
                            console.log(i,$scope.PaletBarkodListe.length)
                        }
                    }
                }
                return;
            }
            if(UserParam.Sistem.SatirBirlestir == 0 )
            {
                $scope.MiktarFiyatValid();
                
                console.log($scope.Parca)
                if($scope.Parca > 1)
                {
                    $scope.Miktar = $scope.ParcaMiktar;
                    await AutoInsertData();
                }
                else
                {
                    await InsertData();
                }
            }
            else
            {
                if($scope.Stok[0].RENKPNTR != 0 || $scope.Stok[0].BEDENPNTR != 0)
                {
                    let UpdateStatus = false;

                    angular.forEach($scope.IrsaliyeListe,function(value)
                    {
                        if(value.sth_stok_kod == $scope.Stok[0].KODU)
                        {   
                            
                            let TmpQuery = 
                            {
                                db :'{M}.' + $scope.Firma,
                                query:  "SELECT BdnHar_Guid from BEDEN_HAREKETLERI WHERE BdnHar_Har_uid=@BdnHar_Har_uid AND BdnHar_BedenNo = @BdnHar_BedenHarNo",
                                param : ['BdnHar_Har_uid','BdnHar_BedenHarNo'],
                                type : ['string|50','int'],
                                value : [value.sth_Guid,Kirilim($scope.Stok[0].BEDENPNTR,$scope.Stok[0].RENKPNTR)]
                            }
                            db.GetDataQuery(TmpQuery,function(Data)
                            {
                                if(Data.length > 0)
                                {
                                    db.ExecuteTag($scope.Firma,'BedenHarGorUpdate',[$scope.Miktar * $scope.Stok[0].CARPAN,Data[0].BdnHar_Guid],function(data)
                                    {
                                    });
                                }
                                else
                                {
                                    BedenHarInsert(value.sth_Guid)
                                }
                            });

                            let TmpFiyat  = value.sth_tutar / value.sth_miktar
                            let TmpMiktar = value.sth_miktar + ($scope.Miktar * $scope.Stok[0].CARPAN);
                            let Data = 
                            {
                                Param :
                                [
                                    TmpMiktar,
                                    0,
                                    TmpFiyat * TmpMiktar,
                                    $scope.Stok[0].TOPTANVERGIPNTR,
                                    value.sth_iskonto1 + $scope.Stok[0].ISK.TUTAR1, //ISKONTO TUTAR 1
                                    value.sth_iskonto2 + $scope.Stok[0].ISK.TUTAR2, //ISKONTO TUTAR 2
                                    value.sth_iskonto3 + $scope.Stok[0].ISK.TUTAR3, //ISKONTO TUTAR 3
                                    value.sth_iskonto4 + $scope.Stok[0].ISK.TUTAR4, //ISKONTO TUTAR 4
                                    value.sth_iskonto5 + $scope.Stok[0].ISK.TUTAR5, //ISKONTO TUTAR 5
                                    value.sth_iskonto6 + $scope.Stok[0].ISK.TUTAR6, //ISKONTO TUTAR 6
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
                        }                        
                    });
                    if(!UpdateStatus)
                    {
                        InsertData();
                    } 
                }
                else
                {
                    let UpdateStatus = false;
                    angular.forEach($scope.IrsaliyeListe,function(value)
                    {
                        if(value.sth_stok_kod == $scope.Stok[0].KODU && value.sth_parti_kodu == $scope.Stok[0].PARTI && value.sth_lot_no == $scope.Stok[0].LOT)
                        {   
                            let TmpFiyat  = value.sth_tutar / value.sth_miktar
                            let TmpMiktar = value.sth_miktar + ($scope.Miktar * $scope.Stok[0].CARPAN);
                            let Data = 
                            {
                                Param :
                                [
                                    TmpMiktar,
                                    value.sth_miktar2 + 1,
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
        }
        else
        {
            $scope.InsertLock = false
        }     
        BarkodFocus();
    }
    async function AutoInsertData()
    {
        console.log($scope.Parca)
        for (let i = 0; i < $scope.Parca; i++)
        {
            $scope.ParcaKontrol = true;
            console.log(i);
            console.log($scope.Stok)
            await $scope.MiktarFiyatValid();
            await $scope.BtnPartiLotOlustur(i);
            if(i+1 == $scope.Parca)
            {
                $scope.ParcaKontrol = false;
                console.log(i);
                $scope.BtnTemizle();
            }
        }
    }
    $scope.EvrakGetir = async function ()
    {
        await db.GetPromiseTag($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],async function(data)
        {
            if(data.length > 0)
            {
                Init();
                InitCariGrid();
                InitIslemGrid(); 
                
                $scope.CariFiyatListe = data[0].sth_fiyat_liste_no;
                $scope.Seri = data[0].sth_evrakno_seri;
                $scope.Sira = data[0].sth_evrakno_sira;
                $scope.Tip = data[0].sth_tip;
                $scope.EvrakTip = data[0].sth_evraktip.toString();
                $scope.CariKodu = data[0].sth_cari_kodu;
                $scope.CariAdi = data[0].CARIADI;
                $scope.Sorumluluk = data[0].sth_stok_srm_merkezi;
                $scope.Personel = data[0].sth_plasiyer_kodu;
                $scope.BelgeNo = data[0].sth_belge_no;
                $scope.Tarih = new Date(data[0].sth_tarih).toLocaleDateString();
                $scope.KabulTarihi = new Date(data[0].sth_malkbl_sevk_tarihi).toLocaleDateString();
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

                await db.GetPromiseTag($scope.Firma,'StokBedenHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,11],function(BedenData)
                {
                    $scope.BedenHarListe = BedenData;
                });
                await db.GetPromiseTag($scope.Firma,'CariGetir',[$scope.CariKodu,'',UserParam.Sistem.PlasiyerKodu],function(data)
                {
                    $scope.CariListe = data;
                    $scope.Adres = $scope.CariListe[0].ADRES;
                    $scope.Adres1 = $scope.CariListe[0].ADRES1;
                    $scope.Adres2 = $scope.CariListe[0].ADRES2;
                    $scope.CariBakiye = $scope.CariListe[0].BAKIYE;
                    $scope.CariVDADI = $scope.CariListe[0].VDADI;
                    $scope.CariVDNO = $scope.CariListe[0].VDNO;
                    $scope.Risk = $scope.CariListe[0].RISK;
                    $scope.RiskLimit = $scope.CariListe[0].RISKLIMIT;
                    $scope.Il = $scope.CariListe[0].IL;

                    $("#TblCari").jsGrid({data : $scope.CariListe});

                    let Obj = $("#TblCari").data("JSGrid");
                    let Item = Obj.rowByItem(data[0]);
                    
                    $scope.CariListeRowClick(0,Item,Obj);
                    
                });

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
                
                db.FillCmbDocInfo($scope.Firma,'CmbSorumlulukGetir',function(e){$scope.SorumlulukListe = e; $scope.Sorumluluk = data[0].sth_stok_srm_merkezi; $scope.SorumlulukAdi = data[0].SORUMLUMERADI});
                db.FillCmbDocInfo($scope.Firma,'CmbProjeGetir',function(e){$scope.ProjeListe = e; $scope.Proje = data[0].sth_proje_kodu});
                db.FillCmbDocInfo($scope.Firma,'CmbOdemePlanGetir',function(e){$scope.OdemePlanListe = e; $scope.OdemeNo = data[0].sth_odeme_op.toString()});
                
                $scope.IrsaliyeListe = data;
                $("#TblIslem").jsGrid({data : $scope.IrsaliyeListe});  
                DipToplamHesapla();
                ToplamMiktarHesapla()
                
                await $scope.PaletBarkodStokAra(data);
                console.log($scope.PaletBarkodListe)
                $scope.EvrakLock = true;
                $scope.BarkodLock = false;

                angular.element('#MdlEvrakGetir').modal('hide');

                BarkodFocus();
                $scope.KirilimGetir();
                $timeout(function(){FisData(data);},200);  
                

                alertify.alert("Evrak Başarıyla Getirildi.");
            }
            else
            {
                angular.element('#MdlEvrakGetir').modal('hide');
                alertify.okBtn("Tamam");
                alertify.alert("Evrak bulunamadı !");
            }
        });
    }
    $scope.PaletBarkodStokAra = async function(pData)
    {
        //EVRAK GETİRDİĞİNDE EVRAKIN İÇİNDE PALETE BAĞLI BARKODLARI ARIYOR
        return new Promise(async resolve => 
        {
            let i = 0;
            await pData.forEach(async function(item) 
            { 
                console.log(pData.length)
                
                await db.GetPromiseTag($scope.Firma,'PaletBarkodStokGetir',[item.BARKOD],async function(data)
                {
                    console.log(data)
                    $scope.PaletBarkodListe.push(data[0])
                    i = i + 1;
                    console.log(i,pData.length)
                    if(pData.length == i)
                    {
                        resolve();
                    }
                })
            }); 
        })
    }
    $scope.EvrakSiraChange = async function ()
    {
        db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],async function(data)
        {
            if(data.length > 0)
            {
                alertify.okBtn("Evet")
                alertify.cancelBtn("Hayır")
                alertify.confirm("Bu Evrak Seri Sıra Mevcut. İlgili kayıt getirilsin mi?",
                function()
                {
                    $scope.EvrakGetir();
                },async function(){
                    await db.MaxSiraPromiseTag($scope.Firma,'MaxStokHarSira',[$scope.Seri,$scope.EvrakTip],async function(data)
                    {
                        $scope.Sira = data
                        alertify.alert("Son Sıra Getirildi")
                    });
                })
            }
        });
    }
    $scope.EvrakDelete = function(pAlisSatis)
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Evrağı silmek istediğinize eminmisiniz ?', 
        function()
        { 
            if($scope.IrsaliyeListe.length > 0)
            {
                if(UserParam[ParamName].EvrakSil == 0)
                {
                    db.ExecuteTag($scope.Firma,'StokHarEvrDelete',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
                    {
                        if(typeof(data.result.err) == 'undefined')
                        {
                            console.log($scope.IrsaliyeListe)
                            angular.forEach($scope.IrsaliyeListe,async function(value)
                            {
                                db.ExecuteTag($scope.Firma,'BedenHarDelete',[value.sth_Guid,11],function(data)
                                {
                                    if(typeof(data.result.err) != 'undefined')
                                    {
                                    }       
                                });
                                console.log($scope.PaletBarkodStok,$scope.PaletBarkodListe)
                                if(UserParam[ParamName].PartiMKupEkran == 1)
                                {
                                    var TmpQuery = 
                                    {
                                        db : '{M}.' + $scope.Firma,
                                        query: "UPDATE BEKA_PALET_TANIMLARI SET DURUM = 0 WHERE STOK_BARKOD = @STOKBARKOD ",
                                        param:  ['STOKBARKOD',],
                                        type:   ['string|50',],
                                        value:  [value.BARKOD]
                                    }
                                    await db.ExecutePromiseQuery(TmpQuery,function(data)
                                    {
                                        console.log("UPDATE EDİLDİ")
                                        
                                    });
                                }
                            });
                        }
                        else
                        {
                        }
                         //ALIŞ = 0 SATIŞ = 1
                        if(pAlisSatis == 0)
                        {
                            ParamName = "AlisIrsaliye";
                            $scope.YeniEvrak(0)
                        }
                        else
                        {
                            ParamName = "SatisIrsaliye";
                            $scope.YeniEvrak(1)
                        }
                    });
                    alertify.alert("Evrak silme işlemi başarıyla gerçekleşti. !");
                }
                else
                {
                    alertify.okBtn("Tamam");
                    alertify.alert("Evrak silme yetkiniz yok !");
                }
            }
            else
            {
                alertify.okBtn("Tamam");
                alertify.alert("Kayıtlı evrak olmadan evrak silemezsiniz !");
            }
        }
        ,function(){});
    }
    $scope.SatirDelete = async function(pAlisSatis)
    {
        alertify.okBtn('Evet');
        alertify.cancelBtn('Hayır');

        alertify.confirm('Satır silmek istediğinize eminmisiniz ?', 
        function()
        { 
            if($scope.IslemListeSelectedIndex > -1)
            {
                if(UserParam[ParamName].EvrakSil == 0)
                {
                    db.ExecuteTag($scope.Firma,'StokHarSatirDelete',[$scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_Guid],async function(data)
                    {
                        if(typeof(data.result.err) == 'undefined')
                        {
                            if(UserParam[ParamName].PartiMKupEkran == 1)
                            {
                                var TmpQuery = 
                                {
                                    db : '{M}.' + $scope.Firma,
                                    query: "UPDATE BEKA_PALET_TANIMLARI SET DURUM = 0 WHERE STOK_BARKOD = @STOKBARKOD ",
                                    param:  ['STOKBARKOD',],
                                    type:   ['string|50',],
                                    value:  [$scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].BARKOD]
                                }
                                await db.ExecutePromiseQuery(TmpQuery,function(data)
                                {
                                    console.log("UPDATE EDİLDİ")
                                });
                            }
                            db.ExecuteTag($scope.Firma,'BedenHarDelete',[$scope.IrsaliyeListe[$scope.IslemListeSelectedIndex].sth_Guid,11],function(data)
                            {
                                if(typeof(data.result.err) != 'undefined')
                                {
                                }       
                            });
                        }
                        else
                        {
                        }
                        if($scope.IrsaliyeListe.length <= 1)
                        {
                            //ALIŞ = 0 SATIŞ = 1
                            if(pAlisSatis == 0)
                            {
                                ParamName = "AlisIrsaliye";
                                $scope.YeniEvrak(0)
                            }
                            else
                            {
                                ParamName = "SatisIrsaliye";
                                $scope.YeniEvrak(1)
                            }
                        }
                        else
                        {   
                            db.GetData($scope.Firma,'StokHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip],function(data)
                            {
                                db.GetData($scope.Firma,'StokBedenHarGetir',[$scope.Seri,$scope.Sira,$scope.EvrakTip,11],function(BedenData)
                                {
                                    $scope.BedenHarListe = BedenData;
                                });

                                $scope.IrsaliyeListe = data;
                                FisData(data)
                                $("#TblIslem").jsGrid({data : $scope.IrsaliyeListe});    
                                $scope.BtnTemizle();
                                DipToplamHesapla();
                                ToplamMiktarHesapla();
                            });
                        }
                    });
                }
                else
                {
                    alertify.okBtn("Tamam");
                    alertify.alert("Evrak silme yetkiniz yok !");
                }
            }
            else
            {
                alertify.okBtn("Tamam");
                alertify.alert("Seçili satır olmadan evrak silemezsiniz !");
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
                0,
                $scope.FiyatEdit * $scope.MiktarEdit,
                $scope.IrsaliyeListe[pIndex].sth_vergi_pntr,
                $scope.IrsaliyeListe[pIndex].sth_iskonto1, //ISKONTO TUTAR 1
                $scope.IrsaliyeListe[pIndex].sth_iskonto2, //ISKONTO TUTAR 2
                $scope.IrsaliyeListe[pIndex].sth_iskonto3, //ISKONTO TUTAR 3
                $scope.IrsaliyeListe[pIndex].sth_iskonto4, //ISKONTO TUTAR 4
                $scope.IrsaliyeListe[pIndex].sth_iskonto5, //ISKONTO TUTAR 5
                0, //ISKONTO TUTAR 6
                $scope.IrsaliyeListe[pIndex].sth_sat_iskmas1, //SATIR ISKONTO 1
                $scope.IrsaliyeListe[pIndex].sth_sat_iskmas2, //SATIR ISKONTO 2
                $scope.IrsaliyeListe[pIndex].sth_sat_iskmas3, //SATIR ISKONTO 3
                $scope.IrsaliyeListe[pIndex].sth_sat_iskmas4, //SATIR ISKONTO 4
                $scope.IrsaliyeListe[pIndex].sth_sat_iskmas5, //SATIR ISKONTO 5
                0, // SATIR ISKONTO 6
                $scope.IrsaliyeListe[pIndex].sth_Guid
            ],
            BedenPntr : $scope.IrsaliyeListe[pIndex].BEDENPNTR,
            RenkPntr : $scope.IrsaliyeListe[pIndex].RENKPNTR,
            Miktar : $scope.MiktarEdit,
            Guid : $scope.IrsaliyeListe[pIndex].sth_Guid
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
    $scope.BtnAciklamaGir = function()
    {
        $("#TbAciklama").addClass('active');
        $("#TbStok").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TbMain").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbGetir").removeClass('active');
        $scope.AciklamaGetir();
    }
    $scope.ManuelAramaClick = function() 
    {
        $("#TbStok").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TbDizayn").removeClass('active');
        $("#TbStokDurum").removeClass('active');
        $("#TbGetir").removeClass('active');

        StokFocus();
    }
    $scope.MainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbStok").removeClass('active');
        $("#TbDizayn").removeClass('active');
        $("#TbStokDurum").removeClass('active');
        $("#TbIhracatSec").removeClass('active');
        $("#TbAciklama").removeClass('active');
        $("#TbGetir").removeClass('active');
    }
    $scope.BelgeBilgisiClick = function() 
    {
        $("#TbBelgeBilgisi").addClass('active');
        $("#TbStokDurum").removeClass('active');
        $("#TbMain").removeClass('active');
        $("#TbDizayn").removeClass('active');
        $("#TbIhracatSec").removeClass('active');
        $("#TbAciklama").removeClass('active');
        $("#TbGetir").removeClass('active');
    }
    $scope.BarkodGirisClick = function() 
    {   
        if($scope.Sira == 0 || typeof $scope.Sira == "undefined")
        {            
            alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Evrak Siranın Gelmesini Bekleyin!" + "</a>" );
        }
        else
        {
            if($scope.CariAdi != "" || $scope.IhracatKodu != "")
            {
                $("#TbBarkodGiris").addClass('active');
                $("#TbMain").removeClass('active');
                $("#TbCariSec").removeClass('active');
                $("#TbBelgeBilgisi").removeClass('active');
                $("#TbIslemSatirlari").removeClass('active');
                $("#TbStok").removeClass('active');
                $("#TbDizayn").removeClass('active');
                $("#TbStokDurum").removeClass('active');
                $("#TbIhracatSec").removeClass('active');
                $("#TbAciklama").removeClass('active');
                $("#TbGetir").removeClass('active');
                            
                BarkodFocus();
            }
            else
            {
                alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Cari Seçiniz !" + "</a>" );
            }
        }
    }
    $scope.IslemSatirlariClick = function()
    {
        if($scope.ToplamSatir <= 0)
        {
            alertify.alert("Gösterilecek Evrak Bulunamadı!");
            $("#TbMain").addClass('active');
            $("#TbBelgeBilgisi").removeClass('active');
            $("#TbBarkodGiris").removeClass('active');
            $("#TbStok").removeClass('active');
            $("#TbDizayn").removeClass('active');
            $("#TbStokDurum").removeClass('active');
            $("#TbIhracatSec").removeClass('active');
            $("#TbAciklama").removeClass('active');
            $("#TbGetir").removeClass('active');
        }
        else
        {
            $("#TbIslemSatirlari").addClass('active');
            $("#TbMain").removeClass('active');
            $("#TbBelgeBilgisi").removeClass('active');
            $("#TbBarkodGiris").removeClass('active');
            $("#TbStok").removeClass('active');
            $("#TbStokDurum").removeClass('active');
            $("#TbIhracatSec").removeClass('active');
            $("#TbAciklama").removeClass('active');
            $("#TbGetir").removeClass('active');
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
        $("#TbDizayn").removeClass('active');
        $("#TbStokDurum").removeClass('active');
        $("#TbIhracatSec").removeClass('active');
        $("#TbAciklama").removeClass('active');
        $("#TbGetir").removeClass('active');
        CariFocus();
        }
    }
    $scope.IhracatSecClick = function()
    {
        if($scope.Sira == 0 || typeof $scope.Sira == "undefined")
        {
            alertify.alert("<a style='color:#3e8ef7''>" + "Lütfen Evrak Siranın Gelmesini Bekleyin!" + "</a>" );
        }
        else
        {
        $("#TbIhracatSec").addClass('active');
        $("#TbGetir").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbMain").removeClass('active');
        $("#TbDizayn").removeClass('active');
        $("#TbStokDurum").removeClass('active');
        $("#TbAciklama").removeClass('active');
        CariFocus();
        }
    }
    $scope.BtnEvrakGetirClick = function()
    {
        $("#TbGetir").addClass('active');
        $("#TbIhracatSec").removeClass('active');
        $("#TbStok").removeClass('active');
        $("#TbMain").removeClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbCariSec").removeClass('active');
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
    $scope.ProjeEvrakGetir = async function()
    {
        // Okuttuğu proje kodunu mikro'dan gelen proje kodu listesinde arıyor.
        let TmpProje = $scope.ProjeListe.find(x => x.KODU == $scope.ProjeKod)

        // Okuttuğu proje kodundan mikroda evrak var mı onu aratıyor. 
        // Boş girilmişse, o gün proje kodundan girilmiş bütün evrakları getirir.
        await db.GetData($scope.Firma,'StokProjeGetir',[$scope.EvrakTip,0,$scope.ProjeKod],async function(data)
        {
            $scope.ProjeEvrakGetirListe = data;
            
            // Okuttuğu proje kodu mikro da var mı?
            if(typeof TmpProje != "undefined")
            {
                // Okuttuğu proje koduna kayıtlı evrak var mı?
                if($scope.ProjeEvrakGetirListe.length > 0)
                {
                    $scope.Loading = false;
                    $scope.TblLoading = true;
                    $scope.Status = $scope.ProjeEvrakGetirListe[0].status
                    $("#TblProjeEvrakGetirListe").jsGrid({data : $scope.ProjeEvrakGetirListe});  
                    $("#TblProjeEvrakGetirListe").jsGrid({pageIndex: true})
                    $scope.CheckEvrak = 0;
                    if($scope.ProjeEvrakGetirListe.length == 1)
                    {
                        let Obj = $("#TblProjeEvrakGetirListe").data("JSGrid");
                        let Item = Obj.rowByItem($scope.ProjeEvrakGetirListe[0]);
                        $scope.ProjeEvrakListeRowClick(0,Item,Obj);
                        $scope.ProjeEvrakSec();
                    }
                }
                else
                {
                    $scope.Proje = $scope.ProjeKod;
                    $scope.CheckEvrak = 1;
                    angular.element('#MdlProjeEvrakGetir').modal('hide');
                    $scope.ProjeChange();
                }
            }
            else
            {
                angular.element('#MdlProjeEvrakGetir').modal('hide');
                alertify.alert("Proje Bulunamadı")
                $scope.Loading = false;
                $scope.TblLoading = true;
                $("#TblProjeEvrakGetirListe").jsGrid({data : $scope.ProjeEvrakGetirListe});
                $("#TblProjeEvrakGetirListe").jsGrid({pageIndex: true})
                $scope.CheckEvrak = 0;
            }
        });
    }
    $scope.ProjeChange = async function()
    {
        $scope.ProjeListe.forEach(function(item) 
        {
            if(item.KODU == $scope.Proje)
            {
                $scope.Proje = item.KODU;
            }
        });
    }
    $scope.BtnProjeListeleEnter = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            $scope.ProjeEvrakGetir();
        }
    }
    $scope.ProjeEvrakSec = function()
    {
       angular.element('#MdlProjeEvrakGetir').modal('hide');
       $scope.EvrakGetir()
    }
    $scope.ProjeEvrakGetirModal = async function(pParam)
    {
        if(typeof pParam == "undefined")
        {
            pParam = $scope.CheckEvrak;
        }
        if($scope.ProjeGetirParam == "0")
        {
            $scope.BtnEvrakGetirClick();
            //$("#MdlEvrakGetir").modal('show');
        }
        else if($scope.ProjeGetirParam == "1")
        {
            $scope.CheckEvrak = pParam;
            if($scope.CheckEvrak == 0 )
            {
                $("#MdlProjeEvrakGetir").modal('show');
                $timeout( function(){
                    $window.document.getElementById("ProjeLabel").focus();
                    $window.document.getElementById("ProjeLabel").select();
                },100);  
            }
        }
    }
    $scope.BtnEvrakGetirListele = async function()
    {   
        await db.GetPromiseTag($scope.Firma,'StokHarGetirListe',[$scope.Seri,$scope.GetirSira.toString(),$scope.EvrakTip,$scope.IlkTarih,$scope.SonTarih],async function(data)
        {
            $scope.EvrakGetirListe = data;
            if($scope.EvrakGetirListe.length > 0)
            {
                $scope.Loading = false;
                $scope.TblLoading = true;    
                $("#TblGetir").jsGrid({data : $scope.EvrakGetirListe});
                $("#TblGetir").jsGrid({pageIndex : true});
            }
            else
            {
                angular.element('#MdlEvrakGetir').modal('hide');
                alertify.alert("<a style='color:#3e8ef7''>" + "Evrak Bulunamadı !" + "</a>" );
            }
        });
    }
    //GÜN SONU RAPORU
    $scope.BtnGunSonuYazdir = async function()
    {  
        if($scope.FisDizaynTip == "0")
        {   
            let FisDeger = "";
            let FisDizayn = "";
            $scope.GunSonuData = "";

            for(let i=0; i < $scope.DizaynListe.length; i++)
            {
                $scope.GunSonuData = $scope.GunSonuData + SpaceLength($scope.DizaynListe[i].CARIADI,30) + " " +SpaceLength($scope.DizaynListe[i].SERI + "-" + $scope.DizaynListe[i].SIRA,10) + " " + SpaceLength(parseFloat($scope.DizaynListe[i].TUTAR.toFixed(2)),10) + "\n";
            } 

            FisDeger = "RAGIP GOKYAR                        "+ $scope.Tarih;

            FisDizayn = "                                             " + "\n" + 
                        FisDeger + "\n" +
                        "           CARI SATIŞ DURUM RAPORU              " + "\n" +
                        "CARIADI                        SAAT F.SERI    F.TUTAR" + "\n" +
                        $scope.GunSonuData + 
                        "------------------------------------------------------------" + "\n" + 
                        "                                                  " + $scope.DGenelToplam.toFixed(2) + "\n" + 
                        "                                              " + "\n" 
            FisDizayn = FisDizayn.split("İ").join("I").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u");

            
            db.BTYazdir(FisDizayn,UserParam.Sistem,function(pStatus)
            {
                if(pStatus)
                {
                    alertify.alert("<a style='color:#3e8ef7''>" + "Yazdırma İşlemi Gerçekleşti </a>" );
                }
            });
        }
        else if($scope.FisDizaynTip == "1")
        {
            let FisDeger = "";
            $scope.GunSonuData = "";
    
            FisDeger = FisDeger + "                            IRSALIYE GUN SONU " + "\n" 
            FisDeger = FisDeger + "                                                            "+ $scope.Tarih + "\n" + "                                                            " +$scope.Seri + " - " + $scope.Sira + "\n" +"                                                            "+ $scope.Tarih + "\n" + "                                                            "+  $scope.Saat + "\n" + SpaceLength($scope.CariAdi,40) + "\n" + SpaceLength($scope.Adres1,50) + "\n" + SpaceLength($scope.Adres,10) + "\n" +  "  " + SpaceLength($scope.CariVDADI,25) + " " + $scope.CariVDNO + "\n";
    
            for(let i=0; i < $scope.DizaynListe.length; i++)
            {
                $scope.GunSonuData = $scope.GunSonuData +  SpaceLength($scope.DizaynListe[i].SERI,10) + "  " +  SpaceLength($scope.DizaynListe[i].SIRA,10) + "  " + SpaceLength($scope.DizaynListe[i].CARIKOD,15) + "  " + SpaceLength($scope.DizaynListe[i].CARIADI,20) + SpaceLength(parseFloat($scope.DizaynListe[i].TUTAR.toFixed(2)),8) + "\n";
            }
            $scope.GunSonuDizayn = "                                             " + "\n" + 
                        FisDeger + "\n" + "\n" +
                        "SERI        SIRA       CARI KODU            CARI ADI        TUTAR" + "\n" + 
                        "                                              " + "\n" + 
                        $scope.FisData + "\n"  +
                        "                                                                    - " + "\n " +
                        "                                                                   - " + "\n "
            $scope.GunSonuDizayn = $scope.GunSonuDizayn + "                                                   TOPLAM : " + $scope.DGenelToplam.toFixed(2)
            $scope.GunSonuDizayn = $scope.GunSonuDizayn.split("İ").join("I").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u").split("ı").join("i");
            
            db.BTYazdir($scope.GunSonuDizayn,UserParam.Sistem,function(pStatus)
            {
                if(pStatus)
                {
                    alertify.alert("<a style='color:#3e8ef7''>" + "Yazdırma İşlemi Gerçekleşti </a>" );         
                }
            });
        }
    }
    $scope.BtnGunSonuRaporClick = async function()
    {
        $("#TbStok").removeClass('active');
        $("#TbMain").removeClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');

        if(localStorage.mode == 'true')
        {
            var TmpQuery = 
            {
                db : '{M}.' + $scope.Firma,
                query:  "SELECT " +
                        "sth_evrakno_seri AS SERI, " +
                        "sth_evrakno_sira AS SIRA, " +
                        "LEFT(CONVERT(VARCHAR(8),MAX(sth_create_date),108),5) AS SAAT, " +
                        "MAX(sth_cari_kodu) AS CARIKOD, " +
                        "(SELECT cari_unvan1 FROM CARI_HESAPLAR WHERE cari_kod = MAX(sth_cari_kodu)) + ' ' +" +
                        "(SELECT cari_unvan2 FROM CARI_HESAPLAR WHERE cari_kod = MAX(sth_cari_kodu)) " +
                        "AS CARIADI, " +
                        "ROUND(SUM(sth_tutar),2) TUTAR " +
                        "FROM STOK_HAREKETLERI  " +
                        "WHERE sth_tip = 1 AND sth_evraktip = 1 AND sth_cins = 0 AND sth_tarih = CONVERT(VARCHAR(10),GETDATE(),112) " +
                        "GROUP BY sth_evrakno_seri,sth_evrakno_sira " 
            }
        }
        else
        {
            var TmpQuery = 
            {
                db : '{M}.' + $scope.Firma,
                query:  "SELECT " +
                        "sth_evrakno_seri AS SERI, " +
                        "sth_evrakno_sira AS SIRA, " +
                        // "LEFT(CONVERT(VARCHAR(8),MAX(sth_create_date),108),5) AS SAAT, " +
                        "MAX(sth_cari_kodu) AS CARIKOD,  " +
                        "(SELECT UNVAN1 FROM CARI WHERE KODU = sth_cari_kodu) AS CARIADI,  " +
                        "ROUND(SUM(sth_tutar),2) TUTAR " +
                        "FROM STOKHAR  " +
                        "WHERE sth_tip = 1 AND sth_evraktip = 1 AND sth_cins = 0 AND sth_tarih = date('now') " +
                        "GROUP BY sth_evrakno_seri,sth_evrakno_sira " 
            }
        }
        await db.GetPromiseQuery(TmpQuery,async function(Data)
        {
            $scope.DGenelToplam = db.SumColumn(Data,"TUTAR");
            $scope.DizaynListe = Data;
            $("#TblDizayn").jsGrid({data : $scope.DizaynListe});
            $("#TbDizayn").addClass('active');
        });
    }
    // STOK DURUM RAPOR
    $scope.StokDurumRaporClick = async function()
    {
        $("#TbStok").removeClass('active');
        $("#TbMain").removeClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');

        await db.GetData($scope.Firma,'StokDurumGetir',[$scope.Barkod,$scope.CariKodu],function(Data)
        {
            $scope.StokDurumListe = Data;
            $("#TblStokDurum").jsGrid({data : $scope.StokDurumListe});
            $("#TbStokDurum").addClass('active');
        });
    }
    //FİŞ YAZDIR OPSİYONLARI
    $scope.DizaynSec = function()
    {
        $("#MdlDizaynEkran").modal('show');
        $scope.FisDizaynTip = "0"
    }
    $scope.YazdirTipSecim = function()
    {
        console.log("yarr",UserParam.Sistem.OnlineYazdir)
        if(UserParam.Sistem.OnlineYazdir == "1")
        {
            $scope.BtnOnlineYazdir();
        }
        else
        {
            $scope.DizaynSec();
        }
    }
    $scope.DizaynChange = function()
    {
        FisData($scope.IrsaliyeListe)
    }
    //"DİZAYN"\\
    $scope.BtnFisYazdir = async function()
    {
        if($scope.FisDizaynTip == "0")
        {
            let FisDizayn = "";

            let i = 35 - $scope.FisLength.length;
            let Satır = "";
            for(let x = 0; x <= i; x++)
            {    
                Satır = Satır + "                                             -"+ "\n"; 
            } 
            FisDizayn = "              BRN SARAPCILIK" + "\n" + "       TEL : 0212 438 2580" + "\n" + "       EMAIL : muhasebe@baron.gen.tr" + "\n" + "        IBAN : TR51 0006200021100006298898" + "\n" + " " +  "\n" + $scope.FisDeger + "\n" + "                                            -" + "\n" + "URUN ADI           "+ " MIKTAR"+  " BIRIM" + " FIYAT" + " TUTAR" + "\n" + $scope.FisData + "\n" + "                                            -" + "\n" + " " + "\n"
            FisDizayn = FisDizayn + "Toplam Miktar : "+ SpaceLength(db.SumColumn($scope.IrsaliyeListe,"MIKTAR"),5) + "      Ara Toplam : " + parseFloat($scope.AraToplam.toFixed(4)) + "\n" +"                       Toplam Indirim : " + parseFloat($scope.ToplamIndirim.toFixed(4)) + "\n" + "                           Net Toplam : " + parseFloat($scope.NetToplam.toFixed(4)) + "\n" + "                            ToplamKdv : " + parseFloat($scope.ToplamKdv.toFixed(4))  + "\n" + "                         Genel Toplam : " + parseFloat($scope.GenelToplam.toFixed(4))   + "\n" + "\n" +"\n" + "Önceki Bakiye : " + parseFloat($scope.CariBakiye) + "\n" + "                                            -" + "\n" + "                                            -" + "\n" + "                                            -" + "\n" + "                                            -" + "\n"
            FisDizayn = FisDizayn.split("İ").join("I").split("ı").join("i").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u");
    
           
            db.BTYazdir(FisDizayn,UserParam.Sistem,function(pStatus)
            {
                if(pStatus)
                {
                    db.BTYazdir(FisDizayn,UserParam.Sistem,function(pStatus)
                    {
                        if(pStatus)
                        {
                            alertify.alert("<a style='color:#3e8ef7''>" + "Yazdırma İşlemi Gerçekleşti </a>" );
                        }
                    });
                }
            });
        }
        else if($scope.FisDizaynTip == "1")
        {
            let FisDizayn = "";
            let FisDeger = "";
            let i = 51 - $scope.FisLength.length;
            let Satır = "";
            for(let x = 0; x <= i; x++)
            {    
                Satır += "                                                                   -" + "\n"; 
            }
            FisDeger = FisDeger + "                                " + "\n" 
            FisDeger = FisDeger + SpaceLength($scope.CariAdi.substring(0,61),63) + $scope.Seri + "-" +  $scope.Sira + "\n" + SpaceLength($scope.CariSoyAdi.substring(0,43),45) + SpaceLength($scope.Il.substring(0,16),18) +  $scope.Tarih + "\n" + "                                                               " + $scope.Saat + "\n";
            FisDizayn = "                                             " + "\n" + 
            FisDeger +                                       
            "        " + "\n" + 
            "                                              " + "\n" +
            $scope.FisData + "\n"  
            FisDizayn = FisDizayn + "MIKTAR TOPLAM : " + db.SumColumn($scope.FisLength,"MIKTAR") + "\n" + "                                               ARA TOPLAM     : " +$scope.AraToplam + "\n" +"                                               TOPLAM KDV     : " + parseFloat($scope.ToplamKdv.toFixed(2),7) + "\n" +"                                               TOPLAM INDIRIM : " + $scope.ToplamIndirim + "\n" + "                                               GENEL TOPLAM   : "+ parseFloat($scope.GenelToplam.toFixed(2),7)+"\n" + Satır
            FisDizayn = FisDizayn.split("İ").join("I").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u").split("ı").join("i");
            
            db.BTYazdir(FisDizayn,UserParam.Sistem,function(pStatus)
            {
                if(pStatus)
                {
                    alertify.alert("<a style='color:#3e8ef7''>" + "Yazdırma İşlemi Gerçekleşti </a>" );         
                }
            });
        }
        else if($scope.FisDizaynTip == "2")
        {
            //DETAYLI
            let FisDizayn = "";
            let FisDeger = "";
            let i = 51 - $scope.FisLength.length;
            let Satır = "";
            for(let x = 0; x <= i; x++)
            {    
                Satır += "                                                                   -" + "\n"; 
            }
            FisDeger = FisDeger + "                                " + "\n" 
            FisDeger = FisDeger + SpaceLength($scope.CariAdi.substring(0,61),63) + $scope.Seri + "-" +  $scope.Sira + "\n" + 
            SpaceLength($scope.CariSoyAdi.substring(0,43),45) + SpaceLength($scope.Il.substring(0,16),18) +  $scope.Tarih + "\n" +
             "                                                               " + $scope.Saat + "\n";
            FisDizayn = "                                             " + "\n" + 
            FisDeger +                                       
            "        " + "\n" + 
            "STOKKOD              RENK   38-40-42-44-46-48-50-52-54    MIKTAR   BFIYAT  TOPTUTAR" + "\n" +
            "--------------------------------------------------------------------------" + "\n" +
            $scope.FisData  +
            "--------------------------------------------------------------------------" + "\n"
            FisDizayn = FisDizayn + "MIKTAR TOPLAM : " + db.SumColumn($scope.FisLength,"MIKTAR") + "\n" + "                                               ARA TOPLAM     : " +$scope.AraToplam + "\n" +"                                               TOPLAM KDV     : " + parseFloat($scope.ToplamKdv.toFixed(2),7) + "\n" +"                                               TOPLAM INDIRIM : " + $scope.ToplamIndirim + "\n" + "                                               GENEL TOPLAM   : "+ parseFloat($scope.GenelToplam.toFixed(2),7)+"\n" + Satır
            FisDizayn = FisDizayn.split("İ").join("I").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u").split("ı").join("i");
            
            db.BTYazdir(FisDizayn,UserParam.Sistem,function(pStatus)
            {
                if(pStatus)
                {
                    alertify.alert("<a style='color:#3e8ef7''>" + "Yazdırma İşlemi Gerçekleşti </a>" );         
                }
            });
        }
        else if($scope.FisDizaynTip == "3")
        {
            //DETAYSIZ
            let FisDizayn = "";
            let FisDeger = "";
            let i = 55 - $scope.FisLength.length;
            let Satır = "";
            for(let x = 0; x <= i; x++)
            {    
                Satır += "                                                                   -" + "\n"; 
            }
            FisDeger = FisDeger + "                                " + "\n" 
            FisDeger = FisDeger + SpaceLength($scope.CariAdi.substring(0,61),63) + $scope.Seri + "-" +  $scope.Sira + "\n" 
            + SpaceLength($scope.CariSoyAdi.substring(0,43),45) + SpaceLength($scope.Il.substring(0,16),18) +  $scope.Tarih + "\n" 
            + "                                                               " + $scope.Saat + "\n";
            FisDizayn = "                                             " + "\n" + 
            FisDeger +                                       
            "        " + "\n" + 
            "STOKKOD              RENK     38-40-42-44-46-48-50-52-54    MIKTAR  " + "\n" +
            "--------------------------------------------------------------------------" + "\n" +
            $scope.FisData + 
            "--------------------------------------------------------------------------" + "\n"  
            FisDizayn = FisDizayn + "MIKTAR TOPLAM : " + db.SumColumn($scope.FisLength,"MIKTAR") + "\n" + Satır
            FisDizayn = FisDizayn.split("İ").join("I").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u").split("ı").join("i");
            
            db.BTYazdir(FisDizayn,UserParam.Sistem,function(pStatus)
            {
                if(pStatus)
                {
                    alertify.alert("<a style='color:#3e8ef7''>" + "Yazdırma İşlemi Gerçekleşti </a>" );         
                }
            });
        }
        else
        {
            alertify.alert("Reis parametreni kontrol et ya yazamıyorum bir şey")
        }
    }
    $scope.BtnEIrsModalAc = async function()
    {
        if(UserParam[ParamName].EIrsaliyeDetay == 0)
        {
            if($scope.IrsaliyeListe.length == 0)
            {
                alertify.alert("İrsaliye kayıt etmeden gönderemezsiniz !")
                return;
            }
        }  
        //$scope.EIrsListe = await db.GetPromiseTag($scope.Firma,'EIrsGetir',[$scope.Seri,$scope.Sira]);
        if($scope.EIrsListe.length == 0)
        {
            if($scope.PersonelListe.length > 0)
            {
                $scope.PersonelListe.forEach(function(item)
                {
                    if(item.KODU == $scope.Personel)
                    {
                        $scope.TxtSfrAd = item.ADI;
                        $scope.TxtSfrAd1 = item.ADI;
                        $scope.TxtSrfSoyAd = item.SOYADI;
                        $scope.TxtSfrTckn = item.TCKN;
                        $scope.TxtPlaka = UserParam[ParamName].Plaka;  
                        $scope.EirSoforId = item.GUID;
                    }
                });
            }
            else
            {
                $scope.TxtSfrAd = "";
                $scope.TxtSrfSoyAd = "";
                $scope.TxtSfrTckn = "";
                $scope.TxtPlaka = "";
                $scope.EirSoforId = '00000000-0000-0000-0000-000000000000';
            }
            $('#MdlEIrsGonder').modal("show");      
        }
        else
        {            
            db.SafeApply($scope,() =>
            {
                $scope.TxtSfrAd = $scope.EIrsListe[0].eir_sofor_adi;
                $scope.TxtSrfSoyAd = $scope.EIrsListe[0].eir_sofor_soyadi;
                $scope.TxtSfrTckn = $scope.EIrsListe[0].eir_sofor_tckn;
                $scope.TxtPlaka = $scope.EIrsListe[0].eir_tasiyici_arac_plaka;    
            });

            if($scope.EIrsListe[0].eir_uuid == '00000000-0000-0000-0000-000000000000')
            {
                $('#MdlEIrsGonder').modal("show");
            }
            else
            {
                db.EIrsDurum($scope.EIrsListe[0].eir_uuid,(pData) => 
                {
                    if(typeof pData.err != 'undefined')
                    {
                        alertify.alert(pData.err.Message)
                    }
                    if(pData.result.Message == 'Başarılı')
                    {
                        alertify.alert("E-İrsaliye Durumu : " + pData.result.documents[0].Messsage)
                    }
                })
            }
        }
    }
    $scope.BtnEIrsKaydet = async function()
    {
        if($scope.TxtSrfSoyAd != '' && $scope.TxtSfrAd != '' && $scope.TxtPlaka != '')
        {
            if($scope.TxtSfrAd1 != $scope.TxtSfrAd)
            {
                $scope.EirSoforId = '00000000-0000-0000-0000-000000000000';
            }
            $scope.EIrsListe = await db.GetPromiseTag($scope.Firma,'EIrsGetir',[$scope.Seri,$scope.Sira]);
            if($scope.EIrsListe.length == 0)
            {
                let InsertData = 
                [
                    $scope.EvrakTip,
                    3,
                    $scope.Seri,
                    $scope.Sira,
                    '',
                    $scope.TxtPlaka,
                    '',
                    '',
                    $scope.TxtSfrAd,
                    $scope.TxtSrfSoyAd,
                    '',
                    '',
                    $scope.TxtSfrTckn,
                    '',
                    $scope.EirSoforId
                ];
                await db.ExecutePromiseTag($scope.Firma,'EIrsDetayInsert',InsertData);
            }
            else
            {
            }
            // let TmpData = await db.GetPromiseTag($scope.Firma,'EIrsSemaGetir',[$scope.Seri,$scope.Sira]);

            // if(TmpData.length > 0)
            // {
            //     db.EIrsGonder(TmpData,(pData) =>
            //     {
            //         $('#MdlEIrsGonder').modal("hide");
                    
            //         if(typeof pData.err == 'undefined')
            //         {
            //             if(typeof pData.result.UUID != 'undefined')
            //             {
            //                 db.ExecuteTag($scope.Firma,'EIrsUpdate',[pData.result.UUID,$scope.Seri,$scope.Sira],function(pResult)
            //                 {                         
            //                 });
            //             }
            //             else
            //             {
            //                 alertify.alert("E-Irsaliye gönderilemedi !")
            //             }
            //         }
            //         else
            //         {
            //             alertify.alert("E-Irsaliye gönderilemedi ! " + pData.err.Message)
            //         }
            //     });
            // }
        }
        else
        {
            //alert("Lütfen Tüm Alanları Doldurun")         
        }
    }
    $scope.BtnEIrsGoster = async function()
    {              
        if(UserParam[ParamName].EIrsaliyeDetay == 0)
        {
            if($scope.IrsaliyeListe.length == 0)
            {
                alertify.alert("İrsaliye kayıt etmeden gösteremezsiniz !")
                return;
            }
        }  

        $scope.EIrsListe = await db.GetPromiseTag($scope.Firma,'EIrsGetir',[$scope.Seri,$scope.Sira]);
        if($scope.EIrsListe.length == 0)
        {
            alertify.alert("E-İrsaliye göndermeden gösteremezsiniz !")
            return;
        }
        else
        {
            if($scope.EIrsListe[0].eir_uuid == '00000000-0000-0000-0000-000000000000')
            {
                alertify.alert("E-İrsaliye göndermeden gösteremezsiniz !")
                return;
            }

            db.EIrsGoster($scope.EIrsListe[0].eir_uuid,(pData) =>
            {
                let win = window.open("","E-Irsaliye");
                win.document.write(pData);
            })
        }
    }
    $scope.SonSatisGetir = function()
    {
        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query: "SELECT TOP 1 sth_miktar AS MIKTAR " +
                    "FROM STOK_HAREKETLERI WHERE sth_cari_kodu = @CARIKOD and sth_stok_kod = @STOKKOD AND sth_evraktip = @EVRAKTIP ORDER BY sth_create_date DESC ",
            param:  ['CARIKOD','STOKKOD','EVRAKTIP'],
            type:   ['string|25','string|25','int',],
            value:  [$scope.CariKodu,$scope.StokKodu,$scope.EvrakTip]
        }
        db.ExecuteQuery(TmpQuery,function(data)
        {  
            $scope.SonSatisListe = data.result.recordset[0];
            $scope.SonSatisMiktar = $scope.SonSatisListe.MIKTAR
        });
    }
    $scope.BtnTahClick = function()
    {
        let Param =
        {
            "Seri" : $scope.Seri,
            "Sira" : $scope.Sira,
            "CariKodu" : $scope.CariKodu,
            "Tutar" : parseFloat($scope.GenelToplam.toFixed(2))
        }
        localStorage.IrsaliyeParam = JSON.stringify(Param);
    }
    $scope.BtnGonder = function()
    {
        db.GetData($scope.Firma,'StokHareketGonderGetir',[$scope.EvrakTip],function(Data)
        {
            $scope.StokHareketGonderListe = Data;
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
                alertify.alert("Evrak Bulunamadı");
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
                var EIrsDetayData = await db.GetPromiseTag($scope.Firma,'EIrsGetir',[$scope.StokHareketGonderListe[i].sth_evrakno_seri,$scope.StokHareketGonderListe[i].sth_evrakno_sira]);
                localStorage.mode = 'true';
                let TmpMaxSira = await db.GetPromiseTag($scope.Firma,'MaxStokHarSira',[$scope.StokHareketGonderListe[i].sth_evrakno_seri,$scope.StokHareketGonderListe[i].sth_evraktip])
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
                        TmpStokHarData[m].sth_belge_no,
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
                        TmpStokHarData[m].sth_vergisiz_fl,
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
                    localStorage.mode = 'false';
                    var EIrsStatusData = await db.GetPromiseTag($scope.Firma,'EIrsGetir',[TmpStokHarData[0].sth_evrakno_seri,TmpStokHarData[0].sth_evrakno_sira]);
                    let TmpDetay = EIrsStatusData.find(x => x.eir_evrakno_sira == TmpStokHarData[0].sth_evrakno_sira)
                    localStorage.mode = 'true';
                    if(typeof TmpDetay != 'undefined' && TmpDetay.status == 0)
                    {
                        if(EIrsStatusData.length != 0)
                        {
                            let InsertDataDetay =
                            [
                                TmpDetay.eir_evrak_tip,
                                3,
                                TmpDetay.eir_evrakno_seri,
                                TmpDetay.eir_evrakno_sira,
                                '',
                                TmpDetay.eir_tasiyici_arac_plaka,
                                '',
                                '',
                                TmpDetay.eir_sofor_adi,
                                TmpDetay.eir_sofor_soyadi,
                                '',
                                '',
                                TmpDetay.eir_sofor_tckn,
                                '',
                                TmpDetay.eir_sofor_uid
                            ]
                            let TmpDetayResult = await db.ExecutePromiseTag($scope.Firma,'EIrsDetayInsert',InsertDataDetay)
                            let EIrsSeri = TmpDetay.eir_evrakno_seri
                            let EIrsSira = TmpDetay.eir_evrakno_sira
                            if(typeof(TmpDetayResult.result.err) != 'undefined')
                            {
                                TmpStatus = false;
                            }
                            else
                            {
                                localStorage.mode = 'false';
                                let TmpUpdateQuery = 
                                {
                                    db : '{M}.' + $scope.Firma,
                                    query: "UPDATE EIRSDETAY SET status = 1 WHERE eir_evrakno_seri = '@eir_evrakno_seri' AND eir_evrakno_sira = @eir_evrakno_sira and eir_tipi = 3" ,
                                    param:  ['eir_evrakno_seri:string|20','eir_evrakno_sira:int'],
                                    value : [EIrsSeri,EIrsSira]
                                }
                                await db.GetPromiseQuery(TmpUpdateQuery)
                                localStorage.mode = 'true';
                            }
                        }
                        else
                        {
                        }
                    }
                }
                localStorage.mode = 'false';
                if (TmpStatus)
                {
                    let TmpUpdateQuery = 
                    {
                        db : '{M}.' + $scope.Firma,
                        query: "UPDATE STOKHAR SET status = 1 WHERE sth_evrakno_seri = '@sth_evrakno_seri' AND sth_evrakno_sira = @sth_evrakno_sira AND sth_tip = '@sth_tip' AND sth_cins = '@sth_cins'" ,
                        param:  ['sth_evrakno_seri:string|20','sth_evrakno_sira:int','sth_tip:int','sth_cins:int'],
                        value : [$scope.StokHareketGonderListe[i].sth_evrakno_seri,$scope.StokHareketGonderListe[i].sth_evrakno_sira,$scope.StokHareketGonderListe[i].sth_tip,$scope.StokHareketGonderListe[i].sth_cins]
                    }
                    await db.GetPromiseQuery(TmpUpdateQuery)
                    
                    await db.GetData($scope.Firma,'StokHareketGonderGetir',[$scope.EvrakTip],function(Data)
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
    $scope.BtnEIrsGonder = async function()
    {
        for (let i = 0; i < $scope.IrsaliyeListe.length; i++) 
        {
            let Data = 
            {
                Param :
                [
                    $scope.IrsaliyeListe[i].sth_create_user, //CUSER
                    $scope.IrsaliyeListe[i].sth_lastup_user, //LUSER
                    $scope.IrsaliyeListe[i].sth_create_date, //CDATE
                    $scope.IrsaliyeListe[i].sth_lastup_date, //LDATE
                    $scope.IrsaliyeListe[i].sth_evrakno_seri, //SERİ
                    $scope.IrsaliyeListe[i].sth_evrakno_sira, //SIRA
                    $scope.IrsaliyeListe[i].sth_eirs_tipi, //IRSALIYE_TIP
                    $scope.IrsaliyeListe[i].sth_tarih, //IRSALIYE_TARIHI
                    'BEKASOFT', //UNVAN1
                    'YAZILIM A.Ş', //UNVAN2
                    '2124561230', //VKN
                    "56707512767",
                    'Atakent mah akdeniz cad', //ADRES1
                    'Ören Sokak No: 7', //ADRES2
                    '05352719986', //TELNO1
                    'ekremirc1@gmail.com', //EMAIL
                    $scope.CariAdi, //UNVAN1
                    $scope.CariSoyAdi, //UNVAN2
                    $scope.CariVDNO, //VKN
                    "56707512767",
                    $scope.Adres1, //ADRES1
                    $scope.Adres2, //ADRES2
                    $scope.TelNo1, //TELNO1
                    $scope.Email, //EMAIL
                    $scope.IrsaliyeListe[i].sth_stok_kod, //STOKKOD
                    $scope.IrsaliyeListe[i].MIKTAR, //MIKTAR
                    $scope.IrsaliyeListe[i].TUTAR, //TUTAR
                    0 //TOPTUTAR
                ],
            };
           await db.ExecutePromiseTag($scope.Firma,'EIrsaliyeGonder',Data.Param),function(data)
            {
            };
        }
    }
    $scope.ReyonStokGetir = function(keyEvent)
    {
        if(keyEvent.which == 13)
        {
            StokBarkodGetir($scope.ReyonStok);
            $window.document.getElementById("Reyon").focus();
        }
    }
    $scope.BtnReyonUpdate = function()
    {
        var TmpQuery = 
        {
            db : '{M}.' + $scope.Firma,
            query:  "UPDATE STOKLAR SET sto_reyon_kodu = @sto_reyon_kodu WHERE sto_kod = @sto_kod ",
            param:  ['sto_reyon_kodu','sto_kod'],
            type:   ['string|25','string|25'],
            value:  [$scope.Reyon,$scope.Stok[0].KODU]
        }

        db.ExecuteQuery(TmpQuery,function(data)
        {   
           $scope.Stok[0].REYON = $scope.Reyon;
           $scope.Reyon = "";
           $scope.ReyonStok = ""
           $window.document.getElementById("ReyonStok").focus();
        });
    }
    $scope.ScanReyon = function()
    {
        cordova.plugins.barcodeScanner.scan(
            function (result) 
            { 
                $scope.Reyon = result.text;
                $scope.BtnReyonUpdate()
            },
            function (error) 
            {
                //alert("Scanning failed: " + error);
            },
            {
                prompt : "Barkod Okutunuz",
                orientation : "portrait"
            },
            
        );
    }
    //METREKÜP HESAPLAMA
    $scope.BtnMKupGetir = function()
    {
        if(UserParam[ParamName].PartiMKupEkran == 1)
        {
            $('#MdlMetreKupHsp').modal('show');
            db.GetPromiseTag($scope.Firma,'AlisPartiLotGetir',[$scope.Stok[0].KODU,$scope.DepoNo,$scope.Stok[0].PARTI,$scope.Stok[0].LOT],function(data)
            {
                console.log(data)
                $scope.PlGuid = data[0].GUID
                db.GetPromiseTag($scope.Firma,'MetreKupGetir',[$scope.PlGuid],function(MetreKupData)
                {
                    $scope.MKupGetirListe = MetreKupData;
                    $("#TblMKupListe").jsGrid({data : $scope.MKupGetirListe});
                    $scope.MKupToplamMiktar = db.SumColumn($scope.MKupGetirListe,"MKUP");
                    $scope.MKupToplamSatir = $scope.MKupGetirListe.length;
                });
            })
        }
    }
    $scope.BtnMKupHesapla = function()
    {
        $scope.MetreKup = ($scope.En * $scope.Boy * $scope.Kalinlik) / 1000;
    }
    $scope.BtnMKupKaydet = function()
    {
        //HESAPLAMALAR
        if($scope.MKupInsUpdTip == 1)
        {
            let index = $scope.IslemListeSelectedIndex;
            $scope.MiktarEdit = $scope.MKupToplamMiktar;
            $scope.FiyatEdit = $scope.IrsaliyeListe[index].sth_tutar / $scope.IrsaliyeListe[index].sth_miktar;
            $scope.BtnDuzenleKaydet(index);
        }
        else
        {
            $scope.Miktar = $scope.MKupToplamMiktar;
            $scope.MiktarFiyatValid();
        }
        //
        $('#MdlMetreKupHsp').modal('hide');
    }
    $scope.BtnMKupEkle = function()
    {
        if($scope.MKupInsUpdTip == 0)
        {
            $scope.PlGuid = "";
            console.log([$scope.Stok[0].KODU,$scope.DepoNo,$scope.Stok[0].PARTI,$scope.Stok[0].LOT])
            db.GetPromiseTag($scope.Firma,'AlisPartiLotGetir',[$scope.Stok[0].KODU,$scope.DepoNo,$scope.Stok[0].PARTI,$scope.Stok[0].LOT],function(data)
            {
                console.log(data)
                $scope.PlGuid = data[0].GUID
                var InsertData = 
                [
                    UserParam.MikroId,
                    UserParam.MikroId,
                    $scope.PlGuid,
                    $scope.Stok[0].KODU,
                    $scope.Stok[0].ADI,
                    $scope.Stok[0].PARTI,
                    $scope.Stok[0].LOT,
                    $scope.Kalinlik,
                    $scope.En,
                    $scope.Boy,
                    $scope.MetreKup,
                    $scope.Seri,
                    $scope.Sira,
                    $scope.MKupEvrakTip // 0: Alış İrsaliye | 1: Ürün Giriş Çıkış
                ];
                console.log(InsertData)
                db.ExecuteTag($scope.Firma,'MetreKupInsert',InsertData,function(InsertResult)
                {
                    if(typeof(InsertResult.result.err) == 'undefined')
                    {
                        db.GetData($scope.Firma,'MetreKupGetir',[$scope.PlGuid],function(MetreKupData)
                        {
                            $scope.MKupGetirListe = MetreKupData;
                            $("#TblMKupListe").jsGrid({data : $scope.MKupGetirListe});
                            $scope.MKupToplamMiktar = db.SumColumn($scope.MKupGetirListe,"MKUP");
                            $scope.MKupToplamSatir = $scope.MKupGetirListe.length;
                        });
                    }
                    else
                    {
                        console.log(InsertResult.result.err)
                    }
                });
            });
        }
        else
        {
            $scope.PlGuid = "";
            console.log([$scope.Stok[0].KODU,$scope.DepoNo,$scope.Stok[0].PARTI,$scope.Stok[0].LOT])
            let index = $scope.IslemListeSelectedIndex;
            db.GetPromiseTag($scope.Firma,'AlisPartiLotGetir',[$scope.IrsaliyeListe[index].sth_stok_kod,$scope.DepoNo,$scope.IrsaliyeListe[index].sth_parti_kodu,$scope.IrsaliyeListe[index].sth_lot_no],function(data)
            {
                console.log(data)
                $scope.PlGuid = data[0].GUID
                var InsertData = 
                [
                    UserParam.MikroId,
                    UserParam.MikroId,
                    $scope.PlGuid,
                    $scope.IrsaliyeListe[index].sth_stok_kod,
                    $scope.IrsaliyeListe[index].ADI,
                    $scope.IrsaliyeListe[index].sth_parti_kodu,
                    $scope.IrsaliyeListe[index].sth_lot_no,
                    $scope.Kalinlik,
                    $scope.En,
                    $scope.Boy,
                    $scope.MetreKup,
                    $scope.Seri,
                    $scope.Sira,
                    $scope.MKupEvrakTip // 0: Alış İrsaliye | 1: Ürün Giriş Çıkış
                ];
                console.log(InsertData)
                db.ExecuteTag($scope.Firma,'MetreKupInsert',InsertData,function(InsertResult)
                {
                    if(typeof(InsertResult.result.err) == 'undefined')
                    {
                        db.GetData($scope.Firma,'MetreKupGetir',[$scope.PlGuid],function(MetreKupData)
                        {
                            $scope.MKupGetirListe = MetreKupData;
                            $("#TblMKupListe").jsGrid({data : $scope.MKupGetirListe});
                            $scope.MKupToplamMiktar = db.SumColumn($scope.MKupGetirListe,"MKUP");
                            $scope.MKupToplamSatir = $scope.MKupGetirListe.length;
                        });
                    }
                    else
                    {
                        console.log(InsertResult.result.err)
                    }
                });
            });
        }
    }
    $scope.BtnMKupSil = function()
    {
        if($scope.MKupListeSelectedIndex == -1)
        {
            $('#MdlMetreKupHsp').modal('hide');
            alertify.alert("Satır Seçiniz",function()
            {
                $('#MdlMetreKupHsp').modal('show');
            })
            return;
        }
        $('#MdlMetreKupHsp').modal('hide');
        alertify.okBtn("Evet")
        alertify.cancelBtn("Hayır")
        alertify.confirm("Silmek istediğinize emin misiniz?",function()
        {
            //EVET
            db.ExecuteTag($scope.Firma,'MetreKupSil',[$scope.MKupGuid],function(data)
            {
                console.log(data)
                alertify.alert("Seçili satır silindi",function()
                {
                    db.GetData($scope.Firma,'MetreKupGetir',[$scope.PlGuid],function(MetreKupData)
                    {
                        $scope.MKupGetirListe = MetreKupData;
                        $("#TblMKupListe").jsGrid({data : $scope.MKupGetirListe});
                        $scope.MKupToplamMiktar = db.SumColumn($scope.MKupGetirListe,"MKUP");
                        $scope.MKupToplamSatir = $scope.MKupGetirListe.length;
                    });
                    $('#MdlMetreKupHsp').modal('show');
                })
            });
            
        },function()
        {
            //HAYIR
            $('#MdlMetreKupHsp').modal('show');
        })
    }
    //PALET
    $scope.PaletDetayClick = async function(pData)
    {
        console.log($scope.PltStokOnly)
        if($scope.PltStokOnly == true)
        {
            console.log(pData)
            if(pData.length > 0)
            {
                $("#TblPaletDetay").jsGrid({data : pData});
            }
        }
        else
        {
            console.log($scope.PaletBarkodTamListe)
            $("#TblPaletDetay").jsGrid({data : $scope.PaletBarkodTamListe});
        }
    } 
}