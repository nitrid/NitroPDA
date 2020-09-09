const { v4: uuidv4 } = require('uuid');
const admzip = require('adm-zip');
const md5 = require('md5');
const fastparser = require("fast-xml-parser").j2xParser;
const soap = require('soap');
const sql = require('./sqllib');

let SemaObj =
{
    MikroDocument :
    {
        Version : "MIKRO.16.18a",
        DespatchAdvices : 
        {
            DespatchAdvice:
            {
                UUID : "8B746B7D-48D6-462B-AAA8-1CB7BE3E8E99",
                TransactionType : 1,
                TransactionSerial : "IRSA",
                TransactionNumber : 6,
                TransactionDate : "2020-08-31",
                TransactionUserId : 1,
                DocumentDate : "2020-08-31",
                DocumentTime : "10:00:35",
                ProfileID : "TEMELIRSALIYE",
                CopyIndicator : false,
                DespatchAdviceTypeCode : "SEVK",
                LineCountNumeric : 1,
                DespatchSupplierParty : 
                {
                    Party : 
                    {
                        WebsiteURI : "",
                        PartyIdentification : 
                        {
                            ID : {"#text":"1111111111","@_schemeID": "VKN"},
                            Alias : ""
                        },
                        PartyName :
                        {
                            Name : "FIRMA"
                        },
                        PostalAddress :
                        {
                            StreetName : "Cadde1 / Sokak1",
                            CitySubdivisionName : "Mahalle1",
                            CityName : "",
                            Country : 
                            {
                                IdentificationCode : "TR",
                                Name : "TÜRKİYE"
                            }
                        },
                        PhysicalLocation :
                        {
                            ID : "1",
                            Address : 
                            {
                                CitySubdivisionName : "",
                                CityName : "",
                                Country :
                                {
                                    Name : ""
                                }
                            }
                        },
                        PartyTaxScheme : 
                        {
                            TaxScheme : 
                            {
                                Name: "2 EYLÜL VERGİ DAİRESİ MÜDÜRLÜĞÜVERGI"
                            }
                        }
                    } 
                },
                DeliveryCustomerParty :
                {
                    Party :
                    {
                        WebsiteURI : "",
                        PartyIdentification :
                        {
                            ID : {"#text":"2222222222","@_schemeID": "VKN"},
                            Alias : "urn:mail:test2pk@mikro.com.tr"
                        },
                        PartyName : 
                        {
                            Name : "Efatura test"
                        },
                        PostalAddress :
                        {
                            StreetName : "Cadde1 / Sokak1",
                            CitySubdivisionName : "Mahalle1",
                            CityName : "",
                            Country : 
                            {
                                IdentificationCode : "TR",
                                Name : "TÜRKİYE"
                            }
                        },
                        PhysicalLocation :
                        {
                            ID : "1",
                            Address : 
                            {
                                CitySubdivisionName : "",
                                CityName : "",
                                Country :
                                {
                                    Name : ""
                                }
                            }
                        },
                        PartyTaxScheme : 
                        {
                            TaxScheme : 
                            {
                                Name: "30 AĞUSTOS VERGİ DAİRESİ MÜDÜRLÜĞÜ"
                            }
                        }
                    }
                },
                Shipment : 
                {
                    ID : "",
                    GoodsItem : 
                    {
                        ValueAmount : {"#text" : "900.00","@_currencyID":"TRY"}
                    },
                    ShipmentStage: null,
                    Delivery : 
                    {
                        DeliveryAddress : 
                        {
                            StreetName : "Adres1 / Adres2",
                            CitySubdivisionName : "SARIYER",
                            CityName : "İSTANBUL",
                            Country :
                            {
                                IdentificationCode : "TR",
                                Name : "TÜRKİYE",
                            }
                        },
                        Despatch : 
                        {
                            ActualDespatchDate : "2020-08-31",
                            ActualDespatchTime : "00:00:00"
                        }
                    }
                },
                DespatchLine :
                [
                    {
                        ID : "1",
                        DeliveredQuantity : {"#text" : "2", "@_unitCode" : "C62"},
                        OrderLineReference : 
                        {
                            LineID : "1"
                        },
                        Item : 
                        {
                            Description : "",
                            Name : "Stok 2",
                            BrandName : "",
                            ModelName : "",
                            SellersItemIdentification : 
                            {
                                ID : "S2"
                            }
                        },
                        Shipment :
                        {
                            ID : "",
                            GoodsItem :
                            {
                                InvoiceLine :
                                {
                                    ID : "",
                                    InvoicedQuantity : {"#text" : "0", "@_unitCode" : "C62"},
                                    LineExtensionAmount : {"#text" : "900.00", "@_currencyID" : "TRY"},
                                    Item : 
                                    {
                                        Name : "Stok 2",
                                        BrandName : "",
                                        ModelName : ""
                                    },
                                    Price : 
                                    {
                                        PriceAmount : {"#text" : "450.00", "@_currencyID" : "TRY"},
                                    }
                                }
                            }
                        }
                    }
                ]                     
            }
        }
    }
}

let url = 'http://efaturademo.mikro.com.tr/firmbox.asmx?wsdl';
let login_args = 
{
    userName : "tx:1111111111:br:default",
    password : "Mikro",
    version : "TeknoERP.01",
    isOnlySelf : false
}

function Login()
{
    return new Promise(resolve => 
    {
        soap.createClient(url,function(err,client)
        {
            if(err)
                resolve();
            
            client.login(login_args,function(err,result)
            {
                if (err) 
                    resolve();
                else
                    resolve(result);
            });
        });
    });
}
function Logout(pSessionId)
{
    return new Promise(resolve => 
    {
        soap.createClient(url,function(err,client)
        {
            if(err)
                resolve(false);

            client.logout(pSessionId,function(err,result)
            {
                if (err) 
                    resolve(false);
                else
                    resolve(true);
            });
        });
    });
}
function eIrsXml(pUid,pData)
{
    return new Promise(resolve => 
    {
        let TmpSema = {...SemaObj};
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.UUID = pUid;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.TransactionSerial = pData[0].SERI;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.TransactionNumber = pData[0].SIRA;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.TransactionDate = pData[0].TARIH;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DocumentDate = pData[0].BELGETARIH;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DocumentTime = pData[0].BELGEZAMAN;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.TransactionType  = pData[0].EVRAKTIP;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DespatchSupplierParty.PartyIdentification.ID = {"#text":pData[0].VKNNO,"@_schemeID": "VKN"};
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DespatchSupplierParty.PartyName.Name = pData[0].FIRMAUNVAN;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DespatchSupplierParty.PostalAddress.StreetName = pData[0].SUBESOKAK  +'/' + pData[0].SUBECADDE;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DespatchSupplierParty.PostalAddress.CitySubdivisionName = pData[0].SUBEILCE;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DespatchSupplierParty.PostalAddress.CityName = pData[0].SUBEIL;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DespatchSupplierParty.PostalAddress.Country.IdentificationCode = 'TR';
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DespatchSupplierParty.PostalAddress.Country.Name = pData[0].SUBEULKE;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DespatchSupplierParty.PartyTaxScheme.TaxScheme.Name = pData[0].VDADI;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DeliveryCustomerParty.PartyIdentification.ID = pData[0].CARIVKNO;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DeliveryCustomerParty.PartyName.Name = pData[0].CARIUNVAN1;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DeliveryCustomerParty.PostalAddress.StreetName = pData[0].CARISOKAK  +'/' + pData[0].CARICADDE;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DeliveryCustomerParty.PostalAddress.CitySubdivisionName = pData[0].CARIILCE;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DeliveryCustomerParty.PostalAddress.CityName = pData[0].CARIIL;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DeliveryCustomerParty.PostalAddress.Country.IdentificationCode = 'TR';
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DeliveryCustomerParty.PostalAddress.Country.Name = pData[0].CARIULKE;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DeliveryCustomerParty.PartyTaxScheme.TaxScheme.Name = pData[0].CARIVDADI;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.Shipment.GoodsItem.ValueAmount = {"#text" : pData[0].TUTAR,"@_currencyID":pData[0].DOVIZ};
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.Shipment.Delivery.DeliveryAddress.StreetName =  pData[0].CARISOKAK  +'/' + pData[0].CARICADDE;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.Shipment.Delivery.DeliveryAddress.CitySubdivisionName =  pData[0].CARIILCE;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.Shipment.Delivery.DeliveryAddress.CityName =  pData[0].CARIIL;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.Shipment.Delivery.DeliveryAddress.Country.IdentificationCode = 'TR';
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.Shipment.Delivery.DeliveryAddress.Country.Name = pData[0].CARIULKE;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.Shipment.Delivery.Despatch.ActualDespatchDate = pData[0].BELGETARIH
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.Shipment.Delivery.Despatch.ActualDespatchTime = pData[0].BELGEZAMAN
        TmpSema.MikroDocument.DespatchAdvices.DespatchLine.ID =  pData[0].SATIR
        TmpSema.MikroDocument.DespatchAdvices.DespatchLine.DeliveredQuantity =  {"#text" : pData[0].MIKTAR, "@_unitCode" : "C62"}
        TmpSema.MikroDocument.DespatchAdvices.DespatchLine.Item.Name =  pData[0].STOKADI
        TmpSema.MikroDocument.DespatchAdvices.DespatchLine.Item.SellersItemIdentification.ID = pData[0].STOKKODU
        TmpSema.MikroDocument.DespatchAdvices.DespatchLine.Shipment.GoodsItem.InvoiceLine.LineExtensionAmount = {"#text" : pData[0].TUTAR,"@_currencyID":pData[0].DOVIZ};
        TmpSema.MikroDocument.DespatchAdvices.DespatchLine.Shipment.GoodsItem.InvoiceLine.Item.Name = pData[0].STOKADI ;
        TmpSema.MikroDocument.DespatchAdvices.DespatchLine.Shipment.GoodsItem.InvoiceLine.Price.PriceAmount =    {"#text" : pData[0].BFIYAT, "@_currencyID" : pData[0].DOVIZ};



        var defaultOptions = 
        {
            attributeNamePrefix : "@_",
            textNodeName : "#text",
            ignoreAttributes : false
        };
        var parser = new fastparser(defaultOptions);
        var xml = "<?xml version='1.0' encoding='UTF-8'?>" + parser.parse(TmpSema);
        parser.Xrite
        
        resolve(xml);
    });
    
}
function eIrsSend(pXml,pSessionId,pUid)
{
    return new Promise(async resolve => 
    {
        let zip = new admzip();
        zip.addFile(pUid + ".xml",Buffer.from(pXml),"")
        
        let SendBuffer = zip.toBuffer();
        //zip.writeZip(pUid + ".zip");
        
        args = 
        {
            sessionId : pSessionId,
            sendData : 
            {
                id : pUid,
                binaryData : SendBuffer.toString('base64'),
                hash : md5(SendBuffer)
            }
        }
        
        let TmpValid = await eIrsValid(args);

        if(TmpValid != null)
        {
            console.log(TmpValid.ServiceDocumentValidationData[0].Validations.ServiceValidationItemData[0]);
            resolve();
            return;
        }
        
        soap.createClient(url,function(err,client)
        {
            if(err)
                resolve();

            client.sendDocument(args,function(err,result)
            {
                if (err) 
                    resolve();
                else
                    resolve(result);
            });
        });
    });
}
function eIrsDurum(pSessionId,pUid)
{
    return new Promise(resolve => 
    {
        args = 
        {
            sessionId : pSessionId,
            itemPosition : "Submitted",
            contentType : "EDespatch",
            documentData :
            {
                TransactionUUID : pUid
            }
        }
        soap.createClient(url,function(err,client)
        {
            if(err)
                resolve();

            client.getDocumentCurrentStatus(args,function(err,result)
            {
                if(err)
                    resolve();
                else
                    resolve(result)
            });
        });
    });
}
function eIrsValid(pArgs)
{
    return new Promise(resolve => 
    {
        soap.createClient(url,function(err,client)
        {
            if(err)
                resolve();

            client.getDocumentValidation(args,function(err,result)
            {
                if (err) 
                    resolve();
                else
                    resolve(result);
            });
        });
    });
}
function SqlQuery(pQuery)
{
    return new Promise(resolve => 
    {
        let msql = new sql(pQuery.db.server,pQuery.db.db,pQuery.db.uid,pQuery.db.pwd,false);
        msql.QueryPromise(pQuery.collection,function(result)
        {
            resolve(JSON.parse(result))
            //console.log(JSON.parse(result).recordset[0]);
        });
    });
}

eIrsGonder();

async function eIrsGonder()
{
    let pQuery =
    {
        db: {server:"192.168.100.12",db:"MikroDB_V16_TESTALI",uid:"beka",pwd:"1122334455"},
        collection : 
        {
            query : "SELECT sth_evrakno_seri AS SERI, " +
                    "sth_evrakno_sira AS SIRA, " +
                    "sth_evraktip AS EVRAKTIP, " +
                    "sth_evrakno_sira AS SIRA, " +
                    "CONVERT(VARCHAR,sth_tarih, 23) AS TARIH, " +
                    "CONVERT(VARCHAR,sth_belge_tarih, 23) AS BELGETARIH, " +
                    "CONVERT(VARCHAR, sth_lastup_date, 8) AS BELGEZAMAN, " +
                    "ISNULL((SELECT TOP 1 fir_FVergiNo FROM FIRMALAR WHERE fir_sirano = 0),'') AS VKNNO, " +
                    "ISNULL((SELECT  TOP 1  fir_unvan FROM FIRMALAR WHERE fir_sirano = 0),'') AS FIRMAUNVAN, " +
                    "ISNULL((SELECT TOP 1  fir_unvan2 FROM FIRMALAR WHERE fir_sirano = 0),'') AS FIRMAUNVAN2, " +
                    "ISNULL((SELECT TOP 1  sube_Cadde FROM SUBELER WHERE Sube_bag_firma = 0 AND Sube_no = 0),'') AS SUBECADDE, " +
                    "ISNULL((SELECT TOP 1  sube_Mahalle FROM SUBELER WHERE Sube_bag_firma = 0 AND Sube_no = 0),'') AS SUBEMAHALLE, " +
                    "ISNULL((SELECT TOP 1  sube_Sokak FROM SUBELER WHERE Sube_bag_firma = 0 AND Sube_no = 0),'') AS SUBESOKAK, " +
                    "ISNULL((SELECT TOP 1  sube_Semt FROM SUBELER WHERE Sube_bag_firma = 0 AND Sube_no = 0),'') AS SUBESEMT, " +
                    "ISNULL((SELECT TOP 1  sube_Apt_No FROM SUBELER WHERE Sube_bag_firma = 0 AND Sube_no = 0),'') AS SUBEAPTNO, " +
                    "ISNULL((SELECT TOP 1  sube_Daire_No FROM SUBELER WHERE Sube_bag_firma = 0 AND Sube_no = 0),'') AS SUBEDAIRENO, " +
                    "ISNULL((SELECT TOP 1  sube_Ilce FROM SUBELER WHERE Sube_bag_firma = 0 AND Sube_no = 0),'') AS SUBEILCE, " +
                    "ISNULL((SELECT TOP 1  sube_Il FROM SUBELER WHERE Sube_bag_firma = 0 AND Sube_no = 0),'') AS SUBEIL, " +
                    "ISNULL((SELECT TOP 1  sube_Ulke FROM SUBELER WHERE Sube_bag_firma = 0 AND Sube_no = 0),'') AS SUBEULKE, " +
                    "ISNULL((SELECT TOP 1 Vgd_adi FROM MikroDB_V16..VERGI_DAIRELERI WHERE Vgd_orj_kod = (SELECT TOP 1 fir_FVergiDaire FROM FIRMALAR WHERE fir_sirano = 0)),'') AS VDADI, " +
                    "ISNULL((SELECT TOP 1 cari_unvan1 FROM CARI_HESAPLAR WHERE cari_kod = sth_cari_kodu),'') AS CARIUNVAN1, " +
                    "ISNULL((SELECT TOP 1 cari_unvan2 FROM CARI_HESAPLAR WHERE cari_kod = sth_cari_kodu),'') AS CARIUNVAN2, " +
                    "ISNULL((SELECT TOP 1 cari_vdaire_adi FROM CARI_HESAPLAR WHERE cari_kod = sth_cari_kodu),'') AS CARIVDADI, " +
                    "ISNULL((SELECT TOP 1 cari_vdaire_no FROM CARI_HESAPLAR WHERE cari_kod = sth_cari_kodu),'') AS CARIVKNO, " +
                    "ISNULL((SELECT TOP 1 adr_cadde FROM CARI_HESAP_ADRESLERI WHERE adr_cari_kod = sth_cari_kodu and adr_adres_no = 1),'') AS CARICADDE, " +
                    "ISNULL((SELECT TOP 1 adr_sokak FROM CARI_HESAP_ADRESLERI WHERE adr_cari_kod = sth_cari_kodu and adr_adres_no = 1),'') AS CARISOKAK, " +
                    "ISNULL((SELECT TOP 1 adr_mahalle FROM CARI_HESAP_ADRESLERI WHERE adr_cari_kod = sth_cari_kodu and adr_adres_no = 1),'') AS CARIMAH, " +
                    "ISNULL((SELECT TOP 1 adr_Semt FROM CARI_HESAP_ADRESLERI WHERE adr_cari_kod = sth_cari_kodu and adr_adres_no = 1),'') AS CARISEMT, " +
                    "ISNULL((SELECT TOP 1 adr_Apt_No FROM CARI_HESAP_ADRESLERI WHERE adr_cari_kod = sth_cari_kodu and adr_adres_no = 1),'') AS CARIAPTNO, " +
                    "ISNULL((SELECT TOP 1 adr_Daire_No FROM CARI_HESAP_ADRESLERI WHERE adr_cari_kod = sth_cari_kodu and adr_adres_no = 1),'') AS CARIDAIRENO, " +
                    "ISNULL((SELECT TOP 1 adr_ilce FROM CARI_HESAP_ADRESLERI WHERE adr_cari_kod = sth_cari_kodu and adr_adres_no = 1),'') AS CARIILCE, " +
                    "ISNULL((SELECT TOP 1 adr_il FROM CARI_HESAP_ADRESLERI WHERE adr_cari_kod = sth_cari_kodu and adr_adres_no = 1),'') AS CARIIL, " +
                    "ISNULL((SELECT TOP 1 adr_ulke FROM CARI_HESAP_ADRESLERI WHERE adr_cari_kod = sth_cari_kodu and adr_adres_no = 1),'') AS CARIULKE, " +
                    "sth_tutar AS TUTAR, " +
                    "sth_miktar AS MIKTAR, " +
                    "sth_tutar / sth_miktar AS BFIYAT, " +
                    "ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod = sth_stok_kod),'') AS STOKADI ," +
                    "sth_stok_kod AS STOKKODU ," +
                    "sth_satirno AS SATIR," +
                    "CASE sth_har_doviz_cinsi WHEN 0 THEN 'TRY' WHEN 1 THEN 'USD' WHEN 2 THEN 'EUR' END AS DOVIZ " +
                    " FROM STOK_HAREKETLERI " +
                    " WHERE sth_evrakno_seri = 'TST' AND sth_evrakno_sira = 1 AND sth_evraktip = 1"
        }
    }
    
    let TmpData = await SqlQuery(pQuery);
    
    if(typeof TmpData.recordset != 'undefined')
    {        
        let TmpUid = uuidv4().toString().toUpperCase();

        let sessionId = await Login();
        let TmpXml = await eIrsXml(TmpUid,TmpData.recordset);
        let TmpSend = await eIrsSend(TmpXml,sessionId,TmpUid);
    
        if(typeof TmpSend != 'undefined')
        {
            console.log(TmpSend);
        }
        
        console.log(await eIrsDurum(sessionId,"1AFA00B1-39C9-4843-BEF4-4D9E52DC0591"));
        await Logout(sessionId);
    }
    
}

module.exports.eIrsGonder =  eIrsGonder;