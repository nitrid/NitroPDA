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
                                Name: "2 EYLÜL VERGİ DAİRESİ MÜDÜRLÜĞÜ"
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

//eIrsGonder();

async function eIrsGonder()
{
    let pQuery =
    {
        db: {server:"192.168.100.12",db:"MikroDB_V16_TESTALI",uid:"beka",pwd:"1122334455"},
        collection : 
        {
            query : "SELECT sth_evrakno_seri AS SERI, " +
                    "sth_evrakno_sira AS SIRA FROM STOK_HAREKETLERI WHERE sth_evrakno_seri = 'TST' AND sth_evrakno_sira = 1 AND sth_evraktip = 1"
        }
    }
    
    let TmpData = await SqlQuery(pQuery);
    
    if(typeof TmpData.recordset != 'undefined')
    {        
        let TmpUid = uuidv4().toString().toUpperCase();

        let sessionId = await Login();
        //let TmpXml = await eIrsXml(TmpUid,TmpData.recordset);
        // let TmpSend = await eIrsSend(TmpXml,sessionId,TmpUid);
    
        // if(typeof TmpSend != 'undefined')
        // {
        //     console.log(TmpSend);
        // }
        
        console.log(await eIrsDurum(sessionId,"1AFA00B1-39C9-4843-BEF4-4D9E52DC0591"));
        await Logout(sessionId);
    }
    
}

module.exports.eIrsGonder =  eIrsGonder;