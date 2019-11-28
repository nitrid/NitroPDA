function EvrakGonderCtrl($scope,$window,$timeout,db)  
{   let IslemSelectedRow = null;

    function InitEvrakGrid()
    {   
        $("#TblEvrak").jsGrid({
            responsive: true,
            width: "100%",
            height: "260px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            data : $scope.StokHarListe,
            paging : true,
            pageSize: 50,
            pageButtonCount: 3,
            pagerFormat: "{pages} {next} {last}    {pageIndex} of {pageCount}",
            fields: 
            [{
                name: "SERI",
                title: "SERI",
                type: "number",
                align: "center",
                width: 75
            }, 
            {
                name: "SIRA",
                title: "SIRA",
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
                $scope.IslemListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function Init()
    {
        UserParam = Param[$window.sessionStorage.getItem('User')];
        $scope.Firma = $window.sessionStorage.getItem('Firma');
        $scope.Tarih1 = moment(new Date()).format("DD.MM.YYYY");
        $scope.Tarih2 = moment(new Date()).format("DD.MM.YYYY");
        $scope.CmbEvrakTip = '0'
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
    $scope.YeniEvrak = function()
    {
        InitEvrakGrid();
        Init();
        $scope.CmbEvrakTip = '0'
    }
    $scope.MainClick = function() 
    {
        $("#TbMain").addClass('active');
        $("#TbBelgeBilgisi").removeClass('active');
        $("#TbBarkodGiris").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
        $("#TbCariSec").removeClass('active');
        $("#TbIsEmriSecim").removeClass('active');
    }
    $scope.EvrakGetirClick = function()
    {
        if($scope.CmbEvrakTip == 13)
        {
            
            let TmpParam = [$scope.Tarih1,$scope.Tarih2,17];

            db.GetPromiseTag($scope.Firma,"NakliyeAktarimGetir",TmpParam,function(data)
            {
                $scope.NakliyeAktarimListe = data;
                $("#TblEvrak").jsGrid({data : $scope.NakliyeAktarimListe});
                console.log($scope.NakliyeAktarimListe.length)
            });
        }
        else if($scope.CmbEvrakTip == 0)
        {
               
            let TmpParam = [$scope.Tarih1,$scope.Tarih2];
            console.log(TmpParam)

            db.GetPromiseTag($scope.Firma,"SayimSeriGetir",TmpParam,function(data)
            {
                $scope.SayimSeriListe = data;
                $("#TblEvrak").jsGrid({data : $scope.SayimSeriListe});
                console.log($scope.SayimSeriListe.length)
            });  
        }
    }
        $scope.IslemListeRowClick = function(pIndex,pItem,pObj)
        {
            if ( IslemSelectedRow ) { IslemSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
            var $row = pObj.rowByItem(pItem);
            $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
            IslemSelectedRow = $row;
            $scope.IslemListeSelectedIndex = pIndex;
        }
    $scope.EvrakGonder = async function()
    {
        db.Connection(function(data)
        {
          console.log(data)      
        });
        
        if($scope.CmbEvrakTip == 13)
        {
            console.log($scope.NakliyeAktarimListe.length)
            for(x = 0;x < $scope.NakliyeAktarimListe.length;x++)
            { 
                localStorage.mode = 'false';

                await db.GetPromiseTag($scope.Firma,"NakliyeAktarimSatirGetir",[$scope.NakliyeAktarimListe[x].SERI,$scope.NakliyeAktarimListe[x].SIRA,17], async function(data)
                {
                    $scope.NakliyeOnayListe = data;

                    if(localStorage.mode == 'false')
                    {
                        for(i = 0;i < $scope.NakliyeOnayListe.length;i++)
                        {
                            localStorage.mode = 'true';
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
                                };
                                
                                let Guid = $scope.NakliyeOnayListe[i].sth_Guid;
                                
                                await db.ExecuteTag($scope.Firma,'NakliyeOnayKaydet',pData.Param,function(pData)
                                {
                                    localStorage.mode = 'false';
                                    var TmpQuery = 
                                    {
                                        query:  "DELETE FROM DEPONAKLIYE WHERE sth_Guid = '" + Guid + "'"
                                    }
                                    db.LocalDb.Execute(TmpQuery,[],function()
                                    {
                                        console.log(TmpQuery)
                                    });
                                });
                            }
                            else if($scope.NakliyeOnayListe[i].sth_special1.length <= 0)
                            { 
                                localStorage.mode = 'true';
                                let InsertData = 
                                [
                                    1,
                                    1,
                                    0, //FİRMA NO
                                    0, //ŞUBE NO
                                    moment(new Date($scope.NakliyeOnayListe[i].sth_tarih)).format("DD.MM.YYYY"),
                                    $scope.NakliyeOnayListe[i].sth_tip,
                                    $scope.NakliyeOnayListe[i].sth_cins,
                                    $scope.NakliyeOnayListe[i].sth_normal_iade,
                                    $scope.NakliyeOnayListe[i].sth_evraktip,
                                    $scope.NakliyeOnayListe[i].sth_evrakno_seri,
                                    $scope.NakliyeOnayListe[i].sth_evrakno_sira,
                                    $scope.NakliyeOnayListe[i].sth_belge_no,
                                    moment(new Date($scope.NakliyeOnayListe[i].sth_tarih)).format("DD.MM.YYYY"),
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
                                    moment(new Date($scope.NakliyeOnayListe[i].sth_tarih)).format("DD.MM.YYYY"),
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
                                console.log(InsertData)
                                let SERI = $scope.NakliyeOnayListe[i].sth_evrakno_seri
                                let SIRA = $scope.NakliyeOnayListe[i].sth_evrakno_sira
                                await db.ExecuteTag($scope.Firma,'StokHarInsert',InsertData,function(InsertResult)
                                { 
                                    if(typeof(InsertResult.result.err) == 'undefined')
                                    {
                                        localStorage.mode = 'false';
                                        var TmpQuery = 
                                        {
                                            query:  "DELETE FROM DEPONAKLIYE WHERE sth_evrakno_seri ='" + SERI + "' AND sth_evrakno_sira =" + SIRA 
                                        }
                                        db.LocalDb.Execute(TmpQuery,[],function()
                                        {
                                            console.log(TmpQuery)
                                        });
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
                });
            };
            alertify.alert("Depo Nakliye fişi aktarımı tamamlandı.");
        } 
        if($scope.CmbEvrakTip == 0)
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
    
                for(x = 0;x < $scope.SayimSeriListe.length;x++)
                {
                    let DEPO = $scope.SayimSeriListe[x].DEPO
                    let SERI = $scope.SayimSeriListe[x].SERI
                    let TARIH = $scope.SayimSeriListe[x].TARIH
                    AktarimSiraGetir(SERI,TARIH,DEPO,async function(EvrakNo)
                    {

                        alertify.okBtn("Tamam");
                        alertify.alert("Sayım fişi aktarımı başladı.");

                        db.GetData($scope.Firma,'SayimGetir',[DEPO,SERI,TARIH],async function(data)
                        {
                            $scope.SayimListe = data;
                        
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
                                
                                await db.ExecutePromiseTag($scope.Firma,'SayimInsert',InsertData, function(InsertResult)
                                {    
                                    if(typeof(InsertResult.result.err) != 'undefined')
                                    {
                                        console.log(InsertResult.result.err);
                                    }
                                    localStorage.mode = 'false';
                                });    
                            }
                        })
                    });
                }
                alertify.alert("Sayım fişi aktarımı tamamlandı.");
            }
            else
            {
                alertify.okBtn("Tamam");
                alertify.alert("Bu menü sadece offline mod'da çalışır !");
            }
        }
    }
} 