var LocalDb = 
(
    function()
    {
        var Listeners = Object();
        var _FirmaDb;
        var _Filter = 
        {
            CARI : ['','','','','','','',''],
            STOK : [0,'','','','','','','','','',''],
            PARAM : [0,new Date(),''],
            PARTI : [0]
        };
        function LocalDb(Service)
        {
            _Service = Service;
        }
        LocalDb.prototype.Filter = _Filter;
        LocalDb.prototype.OpenDatabase = function(pDbName,callback)
        {
            _DbName = pDbName; 
            _FirmaDb = openDatabase(pDbName, '', pDbName, 100 * 1024 * 1024);
            
            if(typeof callback != 'undefined')
            {
                CreateDatabase(function(data)
                {
                    callback(data);
                });  
            }
        }
        LocalDb.prototype.ExistTblSys = function(tblname,status)
        {
            _FirmaDb.transaction(function(t)
            {
                t.executeSql("SELECT NAME FROM sqlite_master WHERE type = 'table' AND name = ?"
                ,[tblname],
                function(trans,result)
                {
                    if(result.rows.length > 0)
                    {
                        status(true);
                    }
                    else
                    { 
                        status(false);
                    }
                });
            });        
        }
        LocalDb.prototype.CreateDatabase = CreateDatabase;
        LocalDb.prototype.GetData = function(pQuery,pParam,Callback)
        {
            let TmpGuid = ""
            if(typeof pQuery.guid != 'undefined')
            {
                TmpGuid = Guid().toUpperCase();
                pQuery.query = pQuery.query.replace('@' + pQuery.guid,TmpGuid);
            }

            _FirmaDb.transaction(function(pTrans)
            {
                pTrans.executeSql(pQuery.query,pParam,function(pTran,pResult)
                {
                    var recordset = [];
                    var result =
                    {
                        result : {recordset : []}
                    }    

                    if(typeof pQuery.guid != 'undefined')
                    {
                        let TmpObj = {}
                        TmpObj[pQuery.guid] = TmpGuid
                        recordset.push(TmpObj)
                    }
                    
                    for(i = 0;i < pResult.rows.length;i++)
                    {
                        recordset.push(pResult.rows[i]);
                    }
                    
                    if(typeof Callback != 'undefined')               
                    {
                        Callback({result:{recordset:recordset}});                                   
                    }
                },
                function(pTran,err)
                {
                    var result =
                    {
                        result : { err : 'Error LocalDb errCode : 108 - ' + err.message} 
                    }
                    if(typeof Callback != 'undefined')               
                    {
                        Callback(result);                                   
                    }
                });
            });
        };
        LocalDb.prototype.Execute = function(pQuery,pParam,Callback)
        {            
            _FirmaDb.transaction(function(pTrans)
            {                
                pTrans.executeSql(pQuery.query
                ,pParam,
                function(pTran,pResult)
                {
                    var result =
                    {
                        result : {recordset : pResult.rows}
                    }                     
                    if(typeof Callback != 'undefined')               
                    {
                        Callback(result);                                   
                    }                                  
                },
                function(pTran,err)
                {
                    var result =
                    {
                        result : { err : 'Error LocalDb errCode : 108 - ' + err.message} 
                    }
                    if(typeof Callback != 'undefined')               
                    {
                        Callback(result);                                   
                    }
                });
            });
        }
        LocalDb.prototype.DataTransfer = DataTransfers;
        function Guid() 
        {
            return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        function CreateDatabase(callback)
        {
            callback(1); //AKTARIM BAŞLADI
            LocalEvent({MasterMsg : 'Tablolar Oluşturuluyor.'});
            
            CreateTables(function(state)
            {                
                LocalEvent({MasterMsg : 'Kayıtlar Aktarılıyor.'});

                DataTransfers(function(x)
                {
                    LocalEvent({MasterMsg : 'Kayıtlar Aktarıldı.'});
                    callback(2); //AKTARIM BİTTİ
                });          
            });            
        }
        async function CreateTables(callback)
        {
            try
            {   
                await CreateTable(QueryLocal.AdresTbl);
                await CreateTable(QueryLocal.AlisSartiTbl);
                await CreateTable(QueryLocal.AltGrupTbl);
                await CreateTable(QueryLocal.AnaGrupTbl);
                await CreateTable(QueryLocal.BankaTbl);
                await CreateTable(QueryLocal.BarkodTbl);
                await CreateTable(QueryLocal.BedenHarTbl);
                await CreateTable(QueryLocal.BirimTbl);
                await CreateTable(QueryLocal.CariTbl);
                await CreateTable(QueryLocal.CariFoyTbl);
                await CreateTable(QueryLocal.CariHarTbl);
                await CreateTable(QueryLocal.DepoTbl);
                //await CreateTable(QueryLocal.DepoSiparisTbl);
                //await CreateTable(QueryLocal.DepoSiparisStokTbl);
                await CreateTable(QueryLocal.EtiketBasTbl);
                //await CreateTable(QueryLocal.EvrakAciklamaTbl);
                await CreateTable(QueryLocal.FiyatTbl);
                //await CreateTable(QueryLocal.IsEmirleriTbl);
                await CreateTable(QueryLocal.IskontoTbl)
                await CreateTable(QueryLocal.KasaTbl);
                //await CreateTable(QueryLocal.KonharTbl);
                //await CreateTable(QueryLocal.MarkaTbl);
                await CreateTable(QueryLocal.OdemePlanTbl);
                await CreateTable(QueryLocal.PersonelTbl);
                await CreateTable(QueryLocal.ProjelerTbl);
                await CreateTable(QueryLocal.ReyonTbl);
                await CreateTable(QueryLocal.SatisSartiTbl);
                await CreateTable(QueryLocal.SayimTbl);
                //await CreateTable(QueryLocal.SenetTbl);
                //await CreateTable(QueryLocal.SenetCekTbl);
                //await CreateTable(QueryLocal.SeriNoTbl);
                //await CreateTable(QueryLocal.SeriNoHarTbl);
                await CreateTable(QueryLocal.SiparisTbl);
                await CreateTable(QueryLocal.SiparisStokTbl);
                await CreateTable(QueryLocal.SonAlisFiyatiTbl);
                await CreateTable(QueryLocal.SonSatisFiyatiTbl);
                await CreateTable(QueryLocal.SorumlulukMrkzTbl);
                await CreateTable(QueryLocal.StokTbl);
                await CreateTable(QueryLocal.StokHarTbl);
                await CreateTable(QueryLocal.UreticiTbl);
                //await CreateTable(QueryLocal.UretimStokTbl);
                await CreateTable(QueryLocal.VergiTbl);  
                await CreateTable(QueryLocal.NakliyeOnayTbl); 
                await CreateTable(QueryLocal.PartiTbl);
                await CreateTable(QueryLocal.ParamTbl);
                await CreateTable(QueryLocal.RenkTbl);
                await CreateTable(QueryLocal.BedenTbl);
                callback(true);
            }
            catch(err)
            {
                callback(false);
            }
        }  
        async function DataTransfers(callback)
        {
            try
            {   
                await DataTransfer(QueryLocal.AdresTbl, QuerySql.AdresTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.AlisSartiTbl, QuerySql.AlisSartiTbl,true,DataTransferCallback);
                await DataTransfer(QueryLocal.AltGrupTbl, QuerySql.AltGrupTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.AnaGrupTbl, QuerySql.AnaGrupTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.BankaTbl, QuerySql.BankaTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.BarkodTbl, QuerySql.BarkodTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.BirimTbl, QuerySql.BirimTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.CariTbl, QuerySql.CariTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.CariFoyTbl, QuerySql.CariFoyTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.DepoTbl, QuerySql.DepoTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.DepoSiparisStokTbl, QuerySql.DepoSiparisStok,true, DataTransferCallback);
                await DataTransfer(QueryLocal.FiyatTbl, QuerySql.FiyatTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.IsEmirleriTbl, QuerySql.IsEmirleriTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.IskontoTbl, QuerySql.IskontoTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.KasaTbl, QuerySql.KasaTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.MarkaTbl, QuerySql.MarkaTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.OdemePlanTbl, QuerySql.OdemePlanTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.PersonelTbl, QuerySql.PersonelTbl, true,DataTransferCallback);
                await DataTransfer(QueryLocal.ProjelerTbl, QuerySql.ProjelerTbl,true, DataTransferCallback); 
                await DataTransfer(QueryLocal.ReyonTbl, QuerySql.ReyonTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.SatisSartiTbl, QuerySql.SatisSartiTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.SenetTbl, QuerySql.SenetTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.SiparisStokTbl, QuerySql.SiparisStokTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.SiparisTbl, QuerySql.SiparisTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.SonAlisFiyatiTbl, QuerySql.SonAlisFiyatiTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.SonSatisFiyatiTbl, QuerySql.SonSatisFiyatiTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.SorumlulukMrkzTbl, QuerySql.SorumlulukMrkzTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.StokTbl, QuerySql.StokTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.UreticiTbl, QuerySql.UreticiTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.UretimStokTbl, QuerySql.UretimStokTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.VergiTbl, QuerySql.VergiTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.NakliyeOnayTbl, QuerySql.NakliyeOnayTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.PartiTbl,QuerySql.PartiTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.ParamTbl, QuerySql.ParamTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.RenkTbl, QuerySql.RenkTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.BedenTbl, QuerySql.BedenTbl,true, DataTransferCallback);
                await DataTransfer(QueryLocal.KasaTbl, QuerySql.KasaTbl,true, DataTransferCallback);
                callback(true);
            }
            catch(err)
            {
                callback(false);
            }
        }        
        function CreateTable(pQuery)
        {   
            return new Promise(resolve => 
            {
                //TABLO SİLİNİYOR
                _FirmaDb.transaction(function(pTrans)
                {
                    pTrans.executeSql('DROP TABLE IF EXISTS ' + pQuery.tag
                    ,[],
                    function(pTran,pResult)
                    {
                        LocalEvent({MasterMsg : 'Tablolar Oluşturuluyor.',AltMsg : pQuery.tag + ' Tablosu Silindi.'});
                    },
                    function(pTran,err)
                    {
                        console.log(err);
                    });
                });
                //TABLO OLUŞTURULUYOR
                _FirmaDb.transaction(function(pTrans)
                {   
                    pTrans.executeSql(pQuery.query
                    ,[],
                    function(pTran,pResult)
                    {   
                        LocalEvent({MasterMsg : 'Tablolar Oluşturuluyor.',AltMsg : pQuery.tag + ' Tablosu Oluşturuldu.'});
                        resolve();
                    },
                    function(pTran,err)
                    {
                        console.log(err);
                        resolve();
                    });
                });
            });
        }    
        function DataTransfer(pLocal,pSql,pClear,callback)
        {
            return new Promise(resolve => 
            {
                LocalEvent({MasterMsg : 'Kayıtlar Aktarılıyor.',AltMsg : pLocal.tag + ' Aktarımı İçin Kayıtlar Getiriliyor.'});
                pSql.db = '{M}.' + _DbName;

                if(pClear == true)
                {
                    //TABLO İÇERİĞİ SİLİNİYOR
                    var TmpQuery = 
                    {
                        query:  "DELETE FROM " + pLocal.tag
                    }
                    LocalDb.prototype.Execute(TmpQuery,[],function()
                    {
                        
                    });
                    
                }
                // SORGU İÇERİSİNDEKİ PARAMETRELER İÇİN YAPILDI.
                if(typeof _Filter[pLocal.tag] != 'undefined')
                {
                    pSql.value = _Filter[pLocal.tag]
                }
                
                _Service.Emit('QMikroDb',pSql,(data) =>
                { 
                    if(pLocal.tag == 'SATISSARTI')
                    {
                        console.log(pSql)
                    }
                    if(typeof data.result.err == 'undefined')
                    {
                        let status = {count:data.result.recordset.length,index:0,tag:pLocal.tag};        
                        _FirmaDb.transaction(function(pTrans)
                        {
                            if(data.result.recordset.length > 0)
                            {   
                                data.result.recordset.forEach(function(item)
                                {
                                    pTrans.executeSql(pLocal.insert
                                    ,Object.values(item),
                                    function(pTran,pResult)
                                    {                                   
                                        status.index += 1;                                    
                                        callback(status);                                   
    
                                        if(status.index == status.count)
                                        {
                                            resolve();   
                                        } 
                                    },
                                    function(pTran,err)
                                    {
                                        status.index += 1;
                                        status.err = err;
                                        callback(status);
                                        if(status.index == status.count)
                                        {
                                            resolve();   
                                        } 
                                    });
                                });
                            }
                            else
                            {
                                resolve();
                            }
                        });
                    }
                    else
                    {
                        resolve(); 
                    }
                });
            });  
        }  
        function DataTransferCallback(pStatus)
        {
            LocalEvent({MasterMsg : 'Kayıtlar Aktarılıyor.',AltMsg : pStatus.tag + ' Tablosuna Kayıt Aktarılıyor.',Status : pStatus});

            if(typeof pStatus.err != 'undefined')
            {
                LocalEvent({MasterMsg : 'Kayıtlar Aktarılıyor.',AltMsg : pStatus.tag + ' Tablosunun Aktarımında Hata.'});
            }
        }        
        //#region RECEP
        LocalDb.prototype.DataStokTransfer = DataStokTransfers;
        LocalDb.prototype.DataCariTransfer = DataCariTransfers;
        LocalDb.prototype.DataSipTransfer = DataSipTransfers;
        LocalDb.prototype.DataNakTransfer = DataNakTransfers;
        async function DataStokTransfers(pClear,pCallback)
        {
            try
            {   
                await DataTransfer(QueryLocal.BarkodTbl, QuerySql.BarkodTbl,pClear, DataTransferCallback);
                await DataTransfer(QueryLocal.FiyatTbl, QuerySql.FiyatTbl,pClear, DataTransferCallback);
                await DataTransfer(QueryLocal.StokTbl, QuerySql.StokTbl,pClear, DataTransferCallback);
                await DataTransfer(QueryLocal.BirimTbl, QuerySql.BirimTbl,pClear, DataTransferCallback);

                pCallback(true);
            }
            catch(err)
            {
                pCallback(false);
            }
        }
        async function DataCariTransfers(pClear,pCallback)
        {
            try
            {   
                await DataTransfer(QueryLocal.AdresTbl, QuerySql.AdresTbl,pClear, DataTransferCallback);
                await DataTransfer(QueryLocal.CariTbl, QuerySql.CariTbl,pClear, DataTransferCallback);

                pCallback(true);
            }
            catch(err)
            {
                pCallback(false);
            }
        }
        async function DataSipTransfers(pClear,pCallback)
        {
            try
            {   
                await DataTransfer(QueryLocal.SiparisStokTbl, QuerySql.SiparisStokTbl,pClear, DataTransferCallback);

                pCallback(true);
            }
            catch(err)
            {
                pCallback(false);
            }
        }
        async function DataNakTransfers(pClear,pCallback)
        {
            try
            {   
                await DataTransfer(QueryLocal.NakliyeOnayTbl, QuerySql.NakliyeOnayTbl,pClear, DataTransferCallback);

                pCallback(true);
            }
            catch(err)
            {
                pCallback(false);
            }
        }
        //#endregion RECEP
        //#region "EVENT TRIGGER"        
        function LocalEvent(pData)
        {
            EventTrigger('TransferEvent',pData);
        }
        function EventTrigger(evt, params) 
        {
            if (evt in Listeners) 
            {
                callbacks = Listeners[evt];
                for (var x in callbacks)
                {
                    callbacks[x](params);
                }
            } 
            else
            {
                console.log("No listeners found for " + evt);
            }
        }
        
        LocalDb.prototype.On = function(evt, callback) 
        {
            //console.log("Listener added: " + evt);
    
            if (!Listeners.hasOwnProperty(evt))
                Listeners[evt] = Array();
    
                Listeners[evt].push(callback);      
        }
        LocalDb.prototype.Emit = EventTrigger;
        //#endregion EVENT TRIGGER
        return LocalDb;
    }    
)();