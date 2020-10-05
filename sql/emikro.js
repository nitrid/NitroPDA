const { v4: uuidv4 } = require('uuid');
const admzip = require('adm-zip');
const md5 = require('md5');
const fastparser = require("fast-xml-parser").j2xParser;
const soap = require('soap');
const sql = require('./sqllib');

let IrsTemplate =
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
                TransactionSerial : "AABB",
                TransactionNumber : 5,
                TransactionDate : "2020-09-09",
                TransactionUserId : 5,
                DocumentDate : "2020-09-09",
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
                    ShipmentStage:
                    {
                       
                        Person :
                        {
                        FirstName:"ABDULLAH" ,

                        FamilyName:"ATALAR",

                        Title:"Şoför",

                        NationalityID:"50614141501"
                        }
                       
                    },
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
let FatTemplate =
{
    MikroDocument :
    {
        Version : "MIKRO.16.18a",
        Invoices : 
        {
            Invoice:
            {
                ContentType : 1,
                UUID : "8B746B7D-48D6-462B-AAA8-1CB7BE3E8E99",
                TransactionType : 1,
                TransactionSerial : "AABB",
                TransactionNumber : 5,
                TransactionDate : "2020-09-09",
                TransactionUserId : 5,
                DocumentDate : "2020-09-09",
                DocumentTime : "10:00:35",
                ProfileID : "TICARIFATURA",
                CopyIndicator : false,
                InvoiceTypeCode : "SATIS",
                DocumentCurrencyCode : "TRY",
                LineCountNumeric : 1,
                AccountingSupplierParty : 
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
                        PartyTaxScheme : 
                        {
                            TaxScheme : 
                            {
                                Name: "2 EYLÜL VERGİ DAİRESİ MÜDÜRLÜĞÜ"
                            }
                        }
                    } 
                },
                AccountingCustomerParty :
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
                        PartyTaxScheme : 
                        {
                            TaxScheme : 
                            {
                                Name: "30 AĞUSTOS VERGİ DAİRESİ MÜDÜRLÜĞÜ"
                            }
                        }
                    }
                },
                PaymentMeans:
                {
                    PaymentMeansCode : "ZZZ",
                    PaymentDueDate : "2020-06-19"
                },
                TaxTotal : 
                {
                    TaxAmount : {"#text":"76.50","@_currencyID": "TRY"},
                    TaxSubtotal :
                    [
                        {
                            TaxableAmount : {"#text":"300.00","@_currencyID": "TRY"},
                            TaxAmount : {"#text":"22.50","@_currencyID": "TRY"},
                            CalculationSequenceNumeric : 1,
                            Percent : 7.5,
                            TaxCategory : 
                            {
                                TaxScheme : 
                                {
                                    Name : "Ö.İLETİŞİM V",
                                    TaxTypeCode : "4080"
                                }
                            }
                        },
                        {
                            TaxableAmount : {"#text":"300.00","@_currencyID": "TRY"},
                            TaxAmount : {"#text":"54.00","@_currencyID": "TRY"},
                            CalculationSequenceNumeric : 2,
                            Percent : 18,
                            TaxCategory : 
                            {
                                TaxScheme : 
                                {
                                    Name : "KDV",
                                    TaxTypeCode : "0015"
                                }
                            }
                        }
                    ]
                },
                LegalMonetaryTotal : 
                {
                    LineExtensionAmount : {"#text":"300.00","@_currencyID": "TRY"}, 
                    TaxExclusiveAmount : {"#text":"300.00","@_currencyID": "TRY"}, 
                    TaxInclusiveAmount : {"#text":"376.50","@_currencyID": "TRY"},
                    AllowanceTotalAmount : {"#text":"0.00","@_currencyID": "TRY"}, 
                    ChargeTotalAmount : {"#text":"0.00","@_currencyID": "TRY"}, 
                    PayableRoundingAmount : {"#text":"0.00","@_currencyID": "TRY"}, 
                    PayableAmount : {"#text":"376.50","@_currencyID": "TRY"}, 
                },
                InvoiceLine :
                [
                    {
                        ID : "1",
                        Note : "1",
                        InvoicedQuantity : {"#text" : "3", "@_unitCode" : "C62"},
                        LineExtensionAmount : {"#text":"300.00","@_currencyID": "TRY"},
                        TaxTotal : 
                        {
                            TaxAmount : {"#text":"76.50","@_currencyID": "TRY"},
                            TaxSubtotal :
                            [
                                {
                                    TaxableAmount : {"#text":"300.00","@_currencyID": "TRY"},
                                    TaxAmount : {"#text":"22.50","@_currencyID": "TRY"},
                                    CalculationSequenceNumeric : 1,
                                    Percent : 7.5,
                                    TaxCategory : 
                                    {
                                        TaxScheme : 
                                        {
                                            Name : "Ö.İLETİŞİM V",
                                            TaxTypeCode : "4080"
                                        }
                                    }
                                },
                                {
                                    TaxableAmount : {"#text":"300.00","@_currencyID": "TRY"},
                                    TaxAmount : {"#text":"54.00","@_currencyID": "TRY"},
                                    CalculationSequenceNumeric : 2,
                                    Percent : 18,
                                    TaxCategory : 
                                    {
                                        TaxScheme : 
                                        {
                                            Name : "KDV",
                                            TaxTypeCode : "0015"
                                        }
                                    }
                                }
                            ]
                        },
                        Item : 
                        {
                            Name : "Stok 1",
                            SellersItemIdentification : 
                            {
                                ID : "S2"
                            },
                            Price : 
                            {
                                PriceAmount : {"#text":"100.00","@_currencyID": "TRY"}
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
        let TmpSema = {...IrsTemplate};
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.UUID = pUid;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.TransactionSerial = pData[0].SERI;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.TransactionNumber = pData[0].SIRA;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.TransactionDate = pData[0].TARIH;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DocumentDate = pData[0].BELGETARIH;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DocumentTime = pData[0].BELGEZAMAN;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.TransactionType  = pData[0].EVRAKTIP;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DespatchSupplierParty.Party.PartyIdentification.ID = {"#text":pData[0].VKNNO ,"@_schemeID": "VKN"};
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DespatchSupplierParty.Party.PartyName.Name = pData[0].FIRMAUNVAN;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DespatchSupplierParty.Party.PostalAddress.StreetName = pData[0].SUBESOKAK  +'/' + pData[0].SUBECADDE;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DespatchSupplierParty.Party.PostalAddress.CitySubdivisionName = pData[0].SUBEILCE;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DespatchSupplierParty.Party.PostalAddress.CityName = pData[0].SUBEIL;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DespatchSupplierParty.Party.PostalAddress.Country.IdentificationCode = 'TR';
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DespatchSupplierParty.Party.PostalAddress.Country.Name = pData[0].SUBEULKE;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DespatchSupplierParty.Party.PartyTaxScheme.TaxScheme.Name = pData[0].VDADI;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DeliveryCustomerParty.Party.PartyIdentification.ID =  {"#text":pData[0].CARIVKNO ,"@_schemeID": "VKN"},
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DeliveryCustomerParty.Party.PartyName.Name = pData[0].CARIUNVAN1;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DeliveryCustomerParty.Party.PostalAddress.StreetName = pData[0].CARISOKAK  +'/' + pData[0].CARICADDE;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DeliveryCustomerParty.Party.PostalAddress.CitySubdivisionName = pData[0].CARIILCE;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DeliveryCustomerParty.Party.PostalAddress.CityName = pData[0].CARIIL;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DeliveryCustomerParty.Party.PostalAddress.Country.IdentificationCode = 'TR';
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DeliveryCustomerParty.Party.PostalAddress.Country.Name = pData[0].CARIULKE;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DeliveryCustomerParty.Party.PartyTaxScheme.TaxScheme.Name = pData[0].CARIVDADI;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.Shipment.GoodsItem.ValueAmount = {"#text" : pData[0].TUTAR,"@_currencyID":pData[0].DOVIZ};
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.Shipment.ShipmentStage.Person.FirstName = pData[0].SOFORADI;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.Shipment.ShipmentStage.Person.FamilyName = pData[0].SOFORSOYADI;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.Shipment.ShipmentStage.Person.Title = "ŞOFÖR";
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.Shipment.ShipmentStage.Person.NationalityID = pData[0].SOFORTC;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.Shipment.Delivery.DeliveryAddress.StreetName =  pData[0].CARISOKAK  +'/' + pData[0].CARICADDE;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.Shipment.Delivery.DeliveryAddress.CitySubdivisionName =  pData[0].CARIILCE;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.Shipment.Delivery.DeliveryAddress.CityName = pData[0].CARIIL;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.Shipment.Delivery.DeliveryAddress.Country.IdentificationCode = 'TR';
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.Shipment.Delivery.DeliveryAddress.Country.Name = pData[0].CARIULKE;
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.Shipment.Delivery.Despatch.ActualDespatchDate = pData[0].BELGETARIH
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.Shipment.Delivery.Despatch.ActualDespatchTime = pData[0].BELGEZAMAN
        TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DespatchLine = [];
       
        for(i = 0;i < pData.length;i++)
        {
            let x = {}

            x.ID =  pData[i].SATIR + 1
            x.DeliveredQuantity =  {"#text" : pData[i].MIKTAR, "@_unitCode" : "C62"};
            x.OrderLineReference = {LineID  :   pData[i].SATIR + 1};
            x.Item ={Description : "",Name :  pData[i].STOKADI,BrandName : "", ModelName : "",SellersItemIdentification : {ID : pData[i].STOKKODU } }
            x.Item.SellersItemIdentification.ID = pData[i].STOKKODU
            x.Shipment = {ID : "",GoodsItem : {InvoiceLine :{ID :"",InvoicedQuantity : {"#text" : "0","@_unitCode":"C62"},LineExtensionAmount: {"#text" : pData[0].TUTAR, "@_currencyID" :  pData[i].DOVIZ},Item : {Name :pData[i].STOKADI, BrandName : "", ModelName : "" },Price :{PriceAmount : {"#text" : pData[i].BFIYAT, "@_currencyID" : pData[i].DOVIZ} }  } }}
            TmpSema.MikroDocument.DespatchAdvices.DespatchAdvice.DespatchLine.push(x)
        }

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
function eIrsGoster(pDocumentId)
{
    return new Promise(async resolve => 
    {
        let sessionId = await Login();

        let args = 
        {
            sessionId : sessionId,
            id : pDocumentId,
            itemPosition : "Submitted",
            documentContent : "DCEDespatch"
        }

        soap.createClient(url,function(err,client)
        {
            if(err)
                resolve();

            client.getDocumentHtmlFromId(args,async function(err,result)
            {                
                if (err) 
                {
                    resolve();
                }
                else
                {
                    if(typeof result != 'undefined')
                    {
                        let zip = new admzip(new Buffer(result.binaryData,'base64'));
                        resolve(zip.readAsText(zip.getEntries()[0]));
                    }
                    else
                    {
                        resolve();
                    }
                }
                    

                await Logout(sessionId);
            });
        });
    });
}
function eIrsDurum(pUid)
{
    return new Promise(async resolve => 
    {
        let sessionId = await Login();

        args = 
        {
            sessionId : sessionId,
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

            client.getDocumentCurrentStatus(args,async function(err,result)
            {
                console.log(result)
                if(err)
                    resolve();
                else
                    resolve(result)

                await Logout(sessionId);
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
async function eIrsGonder(pData,pCallback)
{    
    if(pData.length > 0)
    {        
        let TmpUid = uuidv4().toString().toUpperCase();

        let sessionId = await Login();
        let TmpXml = await eIrsXml(TmpUid,pData);
        let TmpSend = await eIrsSend(TmpXml,sessionId,TmpUid);
    
        if(typeof TmpSend != 'undefined')
        {
            if(typeof pCallback != 'undefined')
            {
                pCallback(TmpSend);
            }
        }
       
        await Logout(sessionId);
    }
    
}
function eIrsQueueState()
{
    return new Promise(async resolve => 
    {
        let sessionId = await Login();

        args = 
        {
            sessionId : sessionId,
            startDate : "2020-09-15",
            lastDate : "2020-09-16",
            // filters : 
            // {
            //     QueueId : "2F0812E8-F45A-466A-AFE3-24F774BFF7AE"
            // }
        }
        soap.createClient(url,function(err,client)
        {            
            if(err)
                resolve();

            client.getDocumentQueueState(args,async function(err,result)
            {
                console.log(result)
                if(err)
                    resolve();
                else
                    resolve(result)

                await Logout(sessionId);
            });
        });
    });
}

//eIrsQueueState();
//eIrsDurum('36268EFB-D728-472A-986E-A440EA7A92BE')
//eIrsGonder([{x:1}]);
// eIrsGoster("");

module.exports.eIrsGonder =  eIrsGonder;
module.exports.eIrsDurum =  eIrsDurum;
module.exports.eIrsGoster = eIrsGoster;