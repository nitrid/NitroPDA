const { v4: uuidv4 } = require('uuid');
const admzip = require('adm-zip');
const md5 = require('md5');
const parser = require("fast-xml-parser");
const soap = require('soap');
const sql = require('./sqllib');

const request = require('request');

const fs = require('fs');
const { resolve } = require('path');

let url = 'https://econnecttest.hizliteknoloji.com.tr/HizliApi/RestApi/'
let headers = 
{
    'Content-Type': 'application/json',
    'username' : 'hizli',
    'password' : 'rWBDkoA6'
}

let IrsTemplate = 
{
    "DespatchAdvice":
    {
        "@_xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance",
        "@_xsi:schemaLocation":"urn:oasis:names:specification:ubl:schema:xsd:DespatchAdvice-2 ../xsdrt/maindoc/UBL-DespatchAdvice-2.1.xsd",
        "@_xmlns":"urn:oasis:names:specification:ubl:schema:xsd:DespatchAdvice-2",
        "@_xmlns:ext":"urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2",
        "@_xmlns:cac":"urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2",
        "@_xmlns:cbc":"urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2",
        "@_xmlns:n4":"http://www.altova.com/samplexml/other-namespace",
        "ext:UBLExtensions":
        {
            "ext:UBLExtension":
            {
                "ext:ExtensionContent":
                {
                    "n4:auto-generated_for_wildcard":""
                }
            }
        },
        "cbc:UBLVersionID":2.1,
        "cbc:CustomizationID":"TR1.2.1",
        "cbc:ProfileID":"TEMELIRSALIYE",
        "cbc:ID":"GIB2021000000012",
        "cbc:CopyIndicator":false,
        "cbc:UUID":"F47AC10B-58CC-4372-A567-0E02B2C3D471",
        "cbc:IssueDate":"2021-02-18",
        "cbc:IssueTime":"09:00:00",
        "cbc:DespatchAdviceTypeCode":"SEVK",
        "cbc:Note":"",
        // "cac:OrderReference":
        // {
        //     "cbc:ID":"GIB2020000000033",
        //     "cbc:IssueDate":"2021-02-18"
        // },
        // "cac:AdditionalDocumentReference":
        // [
        //     {
        //         "cbc:ID":"GIB2016000000011",
        //         "cbc:IssueDate":"2016-08-10",
        //         "cbc:DocumentType":"Katalog",
        //         "cbc:DocumentDescription":"Katalog belgesi"
        //     },
        //     {
        //         "cbc:ID":"GIB2016000000078",
        //         "cbc:IssueDate":"2016-08-11",
        //         "cbc:DocumentType":"Kontrat",
        //         "cbc:DocumentDescription":"Kontrat belgesi"
        //     }
        // ],
        "cac:Signature":
        {
            "cbc:ID":
            {
                "#text":1288331521,
                "@_schemeID":"VKN_TCKN"
            },
            "cac:SignatoryParty":
            {
                "cac:PartyIdentification":
                {
                    "cbc:ID":
                    {
                        "#text":1288331521,
                        "@_schemeID":"VKN"
                    }
                },
                "cac:PostalAddress":
                {
                    "cbc:StreetName":"Papatya Caddesi Yasemin Sokak",
                    "cbc:BuildingNumber":21,
                    "cbc:CitySubdivisionName":"Beşiktaş",
                    "cbc:CityName":"İstanbul",
                    "cbc:PostalZone":34100,
                    "cac:Country":
                    {
                        "cbc:Name":"Türkiye"
                    }
                }
            },
            "cac:DigitalSignatureAttachment":
            {
                "cac:ExternalReference":
                {
                    "cbc:URI":"#Signature"
                }
            }
        },
        "cac:DespatchSupplierParty":
        {
            "cac:Party":
            {
                "cbc:WebsiteURI":"http://www.aaa.com.tr/",
                "cac:PartyIdentification":
                {
                    "cbc:ID":
                    {
                        "#text":1111,
                        "@_schemeID":"VKN"
                    }
                },
                "cac:PartyName":
                {
                    "cbc:Name":"AAA Anonim Şirketi"
                },
                "cac:PostalAddress":
                {
                    "cbc:ID":1234567890,
                    "cbc:StreetName":"Papatya Caddesi Yasemin Sokak",
                    "cbc:BuildingNumber":21,
                    "cbc:CitySubdivisionName":"Beşiktaş",
                    "cbc:CityName":"İstanbul",
                    "cbc:PostalZone":34100,
                    "cac:Country":
                    {
                        "cbc:Name":"Türkiye"
                    }
                },
                "cac:PhysicalLocation":
                {
                    "cbc:ID":"Depo Şube",
                    "cac:Address":
                    {
                        "cbc:ID":1234567895,
                        "cbc:StreetName":"Ihlamur Mahallesi Selvi Caddesi Sedir Sokak",
                        "cbc:BuildingNumber":"79/A",
                        "cbc:CitySubdivisionName":"Balgat",
                        "cbc:CityName":"Ankara",
                        "cbc:PostalZone":6800,
                        "cac:Country":
                        {
                            "cbc:Name":"Türkiye"
                        }
                    }
                },
                "cac:PartyTaxScheme":
                {
                    "cac:TaxScheme":
                    {
                        "cbc:Name":"Büyük Mükellefler"
                    }
                },
                "cac:Contact":
                {
                    "cbc:Telephone":"(212) 925 51515",
                    "cbc:Telefax":"(212) 925505015",
                    "cbc:ElectronicMail":"aa@aaa.com.tr"
                }
            },
            "cac:DespatchContact":
            {
                "cbc:Name":"Cemal Temiz"
            }
        },
        "cac:DeliveryCustomerParty":
        {
            "cac:Party":
            {
                "cbc:WebsiteURI":"http://www.bbb.com.tr/",
                "cac:PartyIdentification":
                [
                    {
                        "cbc:ID":
                        {
                            "#text":9205121120,
                            "@_schemeID":"VKN"
                        }
                    },
                    {
                        "cbc:ID":
                        {
                            "#text":120010751,
                            "@_schemeID":"MUSTERINO"
                        }
                    }
                ],
                "cac:PartyName":
                {
                    "cbc:Name":"BBB Limited  Şirketi"
                },
                "cac:PostalAddress":
                {
                    "cbc:ID":1234567890,
                    "cbc:StreetName":"Ihlamur Mahallesi Selvi Caddesi Sedir Sokak",
                    "cbc:BuildingNumber":"75/A",
                    "cbc:CitySubdivisionName":"Kızılay",
                    "cbc:CityName":"Ankara",
                    "cbc:PostalZone":6100,
                    "cac:Country":
                    {
                        "cbc:Name":"Türkiye"
                    }
                },
                "cac:PartyTaxScheme":
                {
                    "cac:TaxScheme":
                    {
                        "cbc:Name":"Çankaya"
                    }
                },
                "cac:Contact":
                {
                    "cbc:Telephone":"(312) 621 1112",
                    "cbc:Telefax":"(312) 621 1011",
                    "cbc:ElectronicMail":"bb@bbb.com.tr"
                }
            }
        },
        "cac:Shipment":
        {
            "cbc:ID":"",
            "cac:GoodsItem":
            {
                "cbc:ValueAmount":
                {
                    "#text":35200,
                    "@_currencyID":"TRY"
                }
            },
            "cac:ShipmentStage":
            {
                "cac:TransportMeans":
                {
                    "cac:RoadTransport":
                    {
                        "cbc:LicensePlateID":
                        {
                            "#text":"06DR4077",
                            "@_schemeID":"PLAKA"
                        }
                    }
                },
                "cac:DriverPerson":
                [
                    {
                        "cbc:FirstName":"Mehmet",
                        "cbc:FamilyName":"Öztürk",
                        "cbc:Title":"Şoför",
                        "cbc:NationalityID":14922266699
                    },
                    {
                        "cbc:FirstName":"Mustafa",
                        "cbc:FamilyName":"Öztürk",
                        "cbc:Title":"Şoför",
                        "cbc:NationalityID":14922266600
                    }
                ]
            },
            "cac:Delivery":
            {
                "cac:CarrierParty":
                {
                    "cac:PartyIdentification":
                    {
                        "cbc:ID":
                        {
                            "#text":1288331523,
                            "@_schemeID":"VKN"
                        }
                    },
                    "cac:PartyName":
                    {
                        "cbc:Name":"CCC Lojistik Anonim Şirketi"
                    },
                    "cac:PostalAddress":
                    {
                        "cbc:CitySubdivisionName":"Osmancık",
                        "cbc:CityName":"Çorum",
                        "cac:Country":
                        {
                            "cbc:Name":"Türkiye"
                        }
                    }
                },
                "cac:Despatch":
                {
                    "cbc:ActualDespatchDate":"2016-08-14",
                    "cbc:ActualDespatchTime":"09:00:00"
                }
            },
            "cac:TransportHandlingUnit":
            {
                "cac:TransportEquipment":
                [
                    {
                        "cbc:ID":
                        {
                            "#text":"06DR4088",
                            "@_schemeID":"DORSEPLAKA"
                        }
                    },
                    {
                        "cbc:ID":
                        {
                            "#text":"06DR4099",
                            "@_schemeID":"DORSEPLAKA"
                        }
                    }
                ]
            }
        },
        "cac:DespatchLine":
        [
            {
                "cbc:ID":1,
                "cbc:DeliveredQuantity":
                {
                    "#text":20,
                    "@_unitCode":"C62"
                },
                "cac:OrderLineReference":
                {
                    "cbc:LineID":1
                },
                "cac:Item":
                {
                    "cbc:Name":"Masa Üstü Bilgisayar",
                    "cac:SellersItemIdentification":
                    {
                        "cbc:ID":"PNC1234"
                    }
                },
                "cac:Shipment":
                {
                    "cbc:ID":"",
                    "cac:GoodsItem":
                    {
                        "cac:InvoiceLine":
                        {
                            "cbc:ID":"",
                            "cbc:InvoicedQuantity":0,
                            "cbc:LineExtensionAmount":
                            {
                                "#text":20000,
                                "@_currencyID":"TRY"
                            },
                            "cac:Item":
                            {
                                "cbc:Name":""
                            },
                            "cac:Price":
                            {
                                "cbc:PriceAmount":
                                {
                                    "#text":1000,
                                    "@_currencyID":"TRY"
                                }
                            }
                        }
                    }
                }
            },
            {
                "cbc:ID":2,
                "cbc:DeliveredQuantity":
                {
                    "#text":12,
                    "@_unitCode":"C62"
                },
                "cac:OrderLineReference":
                {
                    "cbc:LineID":2
                },
                "cac:Item":
                {
                    "cbc:Name":"Notebook Bilgisayar",
                    "cac:SellersItemIdentification":
                    {
                        "cbc:ID":"PNC1235"
                    }
                },
                "cac:Shipment":
                {
                    "cbc:ID":"",
                    "cac:GoodsItem":
                    {
                        "cac:InvoiceLine":
                        {
                            "cbc:ID":"",
                            "cbc:InvoicedQuantity":0,
                            "cbc:LineExtensionAmount":
                            {
                                "#text":12000,
                                "@_currencyID":"TRY"
                            },
                            "cac:Item":
                            {
                                "cbc:Name":""
                            },
                            "cac:Price":
                            {
                                "cbc:PriceAmount":
                                {
                                    "#text":1000,
                                    "@_currencyID":"TRY"
                                }
                            }
                        }
                    }
                }
            },
            {
                "cbc:ID":3,
                "cbc:DeliveredQuantity":
                {
                    "#text":12,
                    "@_unitCode":"C62"
                },
                "cac:OrderLineReference":
                {
                    "cbc:LineID":3
                },
                "cac:Item":
                {
                    "cbc:Name":"Notebook Çantası",
                    "cac:SellersItemIdentification":
                    {
                        "cbc:ID":"PNC1236"
                    }
                },
                "cac:Shipment":
                {
                    "cbc:ID":"",
                    "cac:GoodsItem":
                    {
                        "cac:InvoiceLine":
                        {
                            "cbc:ID":"",
                            "cbc:InvoicedQuantity":0,
                            "cbc:LineExtensionAmount":
                            {
                                "#text":1200,
                                "@_currencyID":"TRY"
                            },
                            "cac:Item":
                            {
                                "cbc:Name":""
                            },
                            "cac:Price":
                            {
                                "cbc:PriceAmount":
                                {
                                    "#text":100,
                                    "@_currencyID":"TRY"
                                }
                            }
                        }
                    }
                }
            },
            {
                "cbc:ID":4,
                "cbc:DeliveredQuantity":
                {
                    "#text":2,
                    "@_unitCode":"C62"
                },
                "cac:OrderLineReference":
                {
                    "cbc:LineID":4
                },
                "cac:Item":
                {
                    "cbc:Name":"Yazıcı",
                    "cac:SellersItemIdentification":
                    {
                        "cbc:ID":"PNC1237"
                    }
                },
                "cac:Shipment":
                {
                    "cbc:ID":"",
                    "cac:GoodsItem":
                    {
                        "cac:InvoiceLine":
                        {
                            "cbc:ID":"",
                            "cbc:InvoicedQuantity":0,
                            "cbc:LineExtensionAmount":
                            {
                                "#text":2000,
                                "@_currencyID":"TRY"
                            },
                            "cac:Item":
                            {
                                "cbc:Name":""
                            },
                            "cac:Price":
                            {
                                "cbc:PriceAmount":
                                {
                                    "#text":1000,
                                    "@_currencyID":"TRY"
                                }
                            }
                        }
                    }
                }
            }
        ]
    }
}
function eIrsExportXml()
{
    let TmpXml = fs.readFileSync('irsaliye.xml','utf8');
    let options = 
    {
        attributeNamePrefix : "@_",
        attrNodeName: false,
        textNodeName : "#text",
        ignoreAttributes : false,
        ignoreNameSpace : false,
        allowBooleanAttributes : false,
        parseNodeValue : true,
        parseAttributeValue : false,
        trimValues: true,
        cdataTagName: "__cdata", //default is 'false'
        cdataPositionChar: "\\c"
    }
    return parser.parse(TmpXml,options)
}
function eIrsXml(pUid,pId,pData)
{
    let TmpSema = {...IrsTemplate}

    TmpSema.DespatchAdvice['cbc:ID'] = pId;
    TmpSema.DespatchAdvice['cbc:UUID'] = pUid
    TmpSema.DespatchAdvice['cbc:IssueDate'] = pData[0].BELGETARIH
    TmpSema.DespatchAdvice['cbc:IssueTime'] = pData[0].BELGEZAMAN
    TmpSema.DespatchAdvice['cac:Signature']['cbc:ID']['#text'] = ""
    TmpSema.DespatchAdvice['cac:Signature']['cac:SignatoryParty']['cac:PartyIdentification']['cbc:ID']['#text'] = ""
    TmpSema.DespatchAdvice['cac:Signature']['cac:SignatoryParty']['cac:PostalAddress']['cbc:StreetName'] = ""
    TmpSema.DespatchAdvice['cac:Signature']['cac:SignatoryParty']['cac:PostalAddress']['cbc:BuildingNumber'] = ""
    TmpSema.DespatchAdvice['cac:Signature']['cac:SignatoryParty']['cac:PostalAddress']['cbc:CitySubdivisionName'] = ""
    TmpSema.DespatchAdvice['cac:Signature']['cac:SignatoryParty']['cac:PostalAddress']['cbc:CityName'] = ""
    TmpSema.DespatchAdvice['cac:Signature']['cac:SignatoryParty']['cac:PostalAddress']['cbc:PostalZone'] = ""
    TmpSema.DespatchAdvice['cac:Signature']['cac:SignatoryParty']['cac:PostalAddress']['cac:Country']['cbc:Name'] = ""
    TmpSema.DespatchAdvice['cac:DespatchSupplierParty']['cac:Party']['cbc:WebsiteURI'] = ""
    TmpSema.DespatchAdvice['cac:DespatchSupplierParty']['cac:Party']['cac:PartyIdentification']['cbc:ID']['#text'] = pData[0].VKNNO
    TmpSema.DespatchAdvice['cac:DespatchSupplierParty']['cac:Party']['cac:PartyName']['cbc:Name'] = pData[0].FIRMAUNVAN
    TmpSema.DespatchAdvice['cac:DespatchSupplierParty']['cac:Party']['cac:PostalAddress']['cbc:ID'] = pData[0].VKNNO
    TmpSema.DespatchAdvice['cac:DespatchSupplierParty']['cac:Party']['cac:PostalAddress']['cbc:StreetName'] = pData[0].SUBESOKAK  +'/' + pData[0].SUBECADDE
    TmpSema.DespatchAdvice['cac:DespatchSupplierParty']['cac:Party']['cac:PostalAddress']['cbc:BuildingNumber'] = ""
    TmpSema.DespatchAdvice['cac:DespatchSupplierParty']['cac:Party']['cac:PostalAddress']['cbc:CitySubdivisionName'] = pData[0].SUBEILCE
    TmpSema.DespatchAdvice['cac:DespatchSupplierParty']['cac:Party']['cac:PostalAddress']['cbc:CityName'] = pData[0].SUBEIL;
    TmpSema.DespatchAdvice['cac:DespatchSupplierParty']['cac:Party']['cac:PostalAddress']['cbc:PostalZone'] = ""
    TmpSema.DespatchAdvice['cac:DespatchSupplierParty']['cac:Party']['cac:PostalAddress']['cac:Country']['cbc:Name'] = pData[0].SUBEULKE
    TmpSema.DespatchAdvice['cac:DespatchSupplierParty']['cac:Party']['cac:PhysicalLocation']['cbc:ID'] = ""    
    TmpSema.DespatchAdvice['cac:DespatchSupplierParty']['cac:Party']['cac:PhysicalLocation']['cac:Address']['cbc:ID'] = pData[0].VKNNO
    TmpSema.DespatchAdvice['cac:DespatchSupplierParty']['cac:Party']['cac:PhysicalLocation']['cac:Address']['cbc:StreetName'] = pData[0].SUBESOKAK  +'/' + pData[0].SUBECADDE
    TmpSema.DespatchAdvice['cac:DespatchSupplierParty']['cac:Party']['cac:PhysicalLocation']['cac:Address']['cbc:BuildingNumber'] = ""
    TmpSema.DespatchAdvice['cac:DespatchSupplierParty']['cac:Party']['cac:PhysicalLocation']['cac:Address']['cbc:CitySubdivisionName'] = pData[0].SUBEILCE
    TmpSema.DespatchAdvice['cac:DespatchSupplierParty']['cac:Party']['cac:PhysicalLocation']['cac:Address']['cbc:CityName'] = pData[0].SUBEIL
    TmpSema.DespatchAdvice['cac:DespatchSupplierParty']['cac:Party']['cac:PhysicalLocation']['cac:Address']['cbc:PostalZone'] = ""
    TmpSema.DespatchAdvice['cac:DespatchSupplierParty']['cac:Party']['cac:PartyTaxScheme']['cac:TaxScheme']['cbc:Name'] = pData[0].VDADI
    TmpSema.DespatchAdvice['cac:DespatchSupplierParty']['cac:Party']['cac:Contact']['cbc:Telephone'] = ""
    TmpSema.DespatchAdvice['cac:DespatchSupplierParty']['cac:Party']['cac:Contact']['cbc:Telefax'] = ""
    TmpSema.DespatchAdvice['cac:DespatchSupplierParty']['cac:Party']['cac:Contact']['cbc:ElectronicMail'] = ""
    TmpSema.DespatchAdvice['cac:DespatchSupplierParty']['cac:DespatchContact']['cbc:Name'] = ""
    TmpSema.DespatchAdvice['cac:DeliveryCustomerParty']['cac:Party']['cbc:WebsiteURI'] = ""
    TmpSema.DespatchAdvice['cac:DeliveryCustomerParty']['cac:Party']['cac:PartyIdentification'] = [];
    TmpSema.DespatchAdvice['cac:DeliveryCustomerParty']['cac:Party']['cac:PartyIdentification'].push({"cbc:ID":{"#text":pData[0].CARIVKNO,"@_schemeID":"VKN"}})
    TmpSema.DespatchAdvice['cac:DeliveryCustomerParty']['cac:Party']['cac:PartyIdentification'].push({"cbc:ID":{"#text":pData[0].CARIKODU,"@_schemeID":"MUSTERINO"}})
    TmpSema.DespatchAdvice['cac:DeliveryCustomerParty']['cac:Party']['cac:PartyName']['cbc:Name'] = pData[0].CARIUNVAN1
    TmpSema.DespatchAdvice['cac:DeliveryCustomerParty']['cac:Party']['cac:PostalAddress']['cbc:ID'] = ""
    TmpSema.DespatchAdvice['cac:DeliveryCustomerParty']['cac:Party']['cac:PostalAddress']['cbc:StreetName'] = pData[0].CARISOKAK  +'/' + pData[0].CARICADDE
    TmpSema.DespatchAdvice['cac:DeliveryCustomerParty']['cac:Party']['cac:PostalAddress']['cbc:BuildingNumber'] = ""
    TmpSema.DespatchAdvice['cac:DeliveryCustomerParty']['cac:Party']['cac:PostalAddress']['cbc:CitySubdivisionName'] = pData[0].CARIILCE
    TmpSema.DespatchAdvice['cac:DeliveryCustomerParty']['cac:Party']['cac:PostalAddress']['cbc:CityName'] = pData[0].CARIIL
    TmpSema.DespatchAdvice['cac:DeliveryCustomerParty']['cac:Party']['cac:PostalAddress']['cbc:PostalZone'] = ""
    TmpSema.DespatchAdvice['cac:DeliveryCustomerParty']['cac:Party']['cac:PostalAddress']['cac:Country']['cbc:Name'] = pData[0].CARIULKE
    TmpSema.DespatchAdvice['cac:DeliveryCustomerParty']['cac:Party']['cac:PartyTaxScheme']['cac:TaxScheme']['cbc:Name'] = pData[0].CARIVDADI
    TmpSema.DespatchAdvice['cac:DeliveryCustomerParty']['cac:Party']['cac:Contact']['cbc:Telephone'] = ""
    TmpSema.DespatchAdvice['cac:DeliveryCustomerParty']['cac:Party']['cac:Contact']['cbc:Telefax'] = ""
    TmpSema.DespatchAdvice['cac:DeliveryCustomerParty']['cac:Party']['cac:Contact']['cbc:ElectronicMail'] = ""
    TmpSema.DespatchAdvice['cac:Shipment']['cbc:ID'] = ""
    TmpSema.DespatchAdvice['cac:Shipment']['cac:GoodsItem']['cbc:ValueAmount']['#text']= pData[0].TUTAR
    TmpSema.DespatchAdvice['cac:Shipment']['cac:GoodsItem']['cbc:ValueAmount']['@_currencyID']= pData[0].DOVIZ
    TmpSema.DespatchAdvice['cac:Shipment']['cac:ShipmentStage']['cac:TransportMeans']['cac:RoadTransport']['cbc:LicensePlateID']['#text'] = pData[0].ARACPLAKA
    TmpSema.DespatchAdvice['cac:Shipment']['cac:ShipmentStage']['cac:DriverPerson'] = []
    TmpSema.DespatchAdvice['cac:Shipment']['cac:ShipmentStage']['cac:DriverPerson'].push(
    {
        "cbc:FirstName":pData[0].SOFORADI,
        "cbc:FamilyName":pData[0].SOFORSOYADI,
        "cbc:Title":"Şoför",
        "cbc:NationalityID":pData[0].SOFORTC
    })
    //Delivery - Taşıyıcı Firma Bölümü
    TmpSema.DespatchAdvice['cac:Shipment']['cac:Delivery']['cac:CarrierParty']['cac:PartyIdentification']['cbc:ID'] = ""
    TmpSema.DespatchAdvice['cac:Shipment']['cac:Delivery']['cac:CarrierParty']['cac:PartyName']['cbc:Name'] = ""
    TmpSema.DespatchAdvice['cac:Shipment']['cac:Delivery']['cac:CarrierParty']['cac:PostalAddress']['cbc:CitySubdivisionName'] = ""
    TmpSema.DespatchAdvice['cac:Shipment']['cac:Delivery']['cac:CarrierParty']['cac:PostalAddress']['cbc:CityName'] = ""
    TmpSema.DespatchAdvice['cac:Shipment']['cac:Delivery']['cac:CarrierParty']['cac:PostalAddress']['cac:Country']['cbc:Name'] = ""
    TmpSema.DespatchAdvice['cac:Shipment']['cac:Delivery']['cac:Despatch']['cbc:ActualDespatchDate'] = pData[0].BELGETARIH
    TmpSema.DespatchAdvice['cac:Shipment']['cac:Delivery']['cac:Despatch']['cbc:ActualDespatchTime'] = pData[0].BELGEZAMAN
    //TransportHandlingUnit - Dorse Bilgileri
    TmpSema.DespatchAdvice['cac:Shipment']['cac:TransportHandlingUnit']['cac:TransportEquipment'] = [];
    TmpSema.DespatchAdvice['cac:Shipment']['cac:TransportHandlingUnit']['cac:TransportEquipment'].push(
    {
        // "cbc:ID":
        // {
        //     "#text":"06DR4088",
        //     "@_schemeID":"DORSEPLAKA"
        // }
    })

    TmpSema.DespatchAdvice['cac:DespatchLine'] = []
    for(i = 0;i < pData.length;i++)
    {
        let TmpDespatchLine = 
        {
            "cbc:ID":1,
            "cbc:DeliveredQuantity":
            {
                "#text":20,
                "@_unitCode":"C62"
            },
            "cac:OrderLineReference":
            {
                "cbc:LineID":1
            },
            "cac:Item":
            {
                "cbc:Name":"Masa Üstü Bilgisayar",
                "cac:SellersItemIdentification":
                {
                    "cbc:ID":"PNC1234"
                }
            },
            "cac:Shipment":
            {
                "cbc:ID":"",
                "cac:GoodsItem":
                {
                    "cac:InvoiceLine":
                    {
                        "cbc:ID":"",
                        "cbc:InvoicedQuantity":0,
                        "cbc:LineExtensionAmount":
                        {
                            "#text":20000,
                            "@_currencyID":"TRY"
                        },
                        "cac:Item":
                        {
                            "cbc:Name":""
                        },
                        "cac:Price":
                        {
                            "cbc:PriceAmount":
                            {
                                "#text":1000,
                                "@_currencyID":"TRY"
                            }
                        }
                    }
                }
            }
        }
    
        TmpDespatchLine['cbc:ID'] = pData[i].SATIR + 1
        TmpDespatchLine['cbc:DeliveredQuantity']['#text'] = pData[i].MIKTAR
        TmpDespatchLine['cac:OrderLineReference']['cbc:LineID'] = pData[i].SATIR + 1
        TmpDespatchLine['cac:Item']['cbc:Name'] = pData[i].STOKADI
        TmpDespatchLine['cac:Item']['cac:SellersItemIdentification']['cbc:ID'] = pData[i].STOKKODU
        TmpDespatchLine['cac:Shipment']['cbc:ID'] = "";
        TmpDespatchLine['cac:Shipment']['cac:GoodsItem']['cac:InvoiceLine']['cbc:ID'] = ""
        TmpDespatchLine['cac:Shipment']['cac:GoodsItem']['cac:InvoiceLine']['cbc:InvoicedQuantity'] = "0"
        TmpDespatchLine['cac:Shipment']['cac:GoodsItem']['cac:InvoiceLine']['cbc:LineExtensionAmount']['#text'] = pData[i].TUTAR
        TmpDespatchLine['cac:Shipment']['cac:GoodsItem']['cac:InvoiceLine']['cbc:LineExtensionAmount']['@_currencyID'] = pData[i].DOVIZ
        TmpDespatchLine['cac:Shipment']['cac:GoodsItem']['cac:InvoiceLine']['cac:Item']['cbc:Name'] = pData[i].STOKADI
        TmpDespatchLine['cac:Shipment']['cac:GoodsItem']['cac:InvoiceLine']['cac:Price']['cbc:PriceAmount']['#text'] = pData[i].BFIYAT
        TmpDespatchLine['cac:Shipment']['cac:GoodsItem']['cac:InvoiceLine']['cac:Price']['cbc:PriceAmount']['@_currencyID'] = pData[i].DOVIZ

        TmpSema.DespatchAdvice['cac:DespatchLine'].push(TmpDespatchLine)
    }
    
    
    let options = 
    {
        attributeNamePrefix : "@_",
        attrNodeName: false,
        textNodeName : "#text",
        ignoreAttributes : false,
        ignoreNameSpace : false,
        allowBooleanAttributes : false,
        parseNodeValue : true,
        parseAttributeValue : false,
        trimValues: true,
        cdataTagName: "__cdata", //default is 'false'
        cdataPositionChar: "\\c",
    }

    var TmpParser = new parser.j2xParser(options);
    TmpXml = "<?xml version='1.0' encoding='UTF-8'?><?xml-stylesheet type='text/xsl' href='irsaliye.xslt'?>" + TmpParser.parse(TmpSema).toString();

    return TmpXml
}
function GetDocumentList(pAppType,pStartDate,pEndDate)
{
    return new Promise(resolve => 
    {
        let options =
        {
            url: url + 'GetDocumentList?AppType=' + pAppType + '&DateType=IssueDate&StartDate=' + pStartDate + '&EndDate=' + pEndDate + '&IsNew=false&IsExport=false&TakenFromEntegrator=ALL&IsDraft=false',
            method: 'GET',
            headers: headers
        };
    
        request(options,function(err,response)
        {            
            let result ={}
            if(err != null)
            {
                result.err = err;
                resolve(result);
            }
            
            if(JSON.parse(response.toJSON().body).Message != 'Başarılı')
            {
                result.err = JSON.parse(response.toJSON().body)
            }
            else
            {
                result.result = JSON.parse(response.toJSON().body)
            }
            
            resolve(result);
        })
    });
}
function GetDocumentListGUID(pAppType,pEttn)
{
    return new Promise(resolve => 
    {
        let options =
        {
            url: url + 'GetDocumentListGUID?AppType=' + pAppType + '&GUIDList=' + pEttn,
            method: 'GET',
            headers: headers
        };
    
        request(options,function(err,response)
        {            
            let result ={}
            if(err != null)
            {
                result.err = err;
                resolve(result);
            }
            
            if(JSON.parse(response.toJSON().body).Message != 'Başarılı')
            {
                result.err = JSON.parse(response.toJSON().body)
            }
            else
            {
                result.result = JSON.parse(response.toJSON().body)
            }
            
            resolve(result);
        })
    });
}
function GetLastInvoiceIdAndDate(pAppType,pSeri)
{
    return new Promise(resolve => 
    {
        let options =
        {
            url: url + 'GetLastInvoiceIdAndDate?AppType=' + pAppType + '&Seri=' + pSeri,
            method: 'GET',
            headers: headers
        };
    
        request(options,function(err,response)
        {            
            let result ={}
            if(err != null)
            {
                result.err = err;
                resolve(result);
            }
            
            if(JSON.parse(response.toJSON().body).Message != 'Başarılı')
            {
                result.err = JSON.parse(response.toJSON().body)
            }
            else
            {
                result.result = JSON.parse(response.toJSON().body)
            }
            
            resolve(result);
        })
    });
}
function eIrsSend(pData)
{    
    return new Promise(async resolve => 
    {
        let result ={}
        let TmpSeri = pData[0].SERI
        let TmpUid = uuidv4().toString().toUpperCase();
        let TmpId = await GetLastInvoiceIdAndDate(5,TmpSeri)
        
        if (typeof TmpId.err != 'undefined')
        {
            result.err = TmpId.err
            resolve(result) 
        }
        else
        {
            TmpId = TmpSeri + (parseInt(TmpId.result.InvoiceId.substring(TmpSeri.length,TmpId.result.InvoiceId.length)) + 1).toString().padStart(9,"0")
        }

        let body = 
        [{
            AppType : 5,
            DestinationIdentifier : pData[0].VKNNO,
            DestinationUrn : 'urn:mail:testirsaliyepk@hizlibilisim.com',
            SourceUrn : "urn:mail:testirsaliyegb@hizlibilisim.com",
            DocumentDate : pData[0].BELGETARIH,
            DocumentId : TmpId,
            DocumentUUID : TmpUid,
            IsDraft : false,
            IsDraftSend : false,
            LocalId : "",
            UpdateDocument : false,
            XmlContent : eIrsXml(TmpUid,TmpId,pData)
        }]
        
        let options =
        {
            url: url + 'SendDocument',
            method: 'POST',
            headers: headers,
            body :JSON.stringify(body)
        };
        
        request(options,function(err,response)
        {      
            if(err != null)
            {
                result.err = err;
                resolve(result);
            }
            
            if(JSON.parse(response.toJSON().body)[0].Message != 'Başarılı')
            {
                result.err = JSON.parse(response.toJSON().body)[0]
            }
            else
            {
                result.result = JSON.parse(response.toJSON().body)[0]
                result.result.UUID = TmpUid;
            }
            
            resolve(result);
        });
    });
}
module.exports.eIrsGonder =  eIrsSend;
//GetDocumentListGUID(5,'6B1EB317-8554-48C9-8E77-CDBE3190DD36')
//console.log(eIrsXml())
//console.log(JSON.stringify(eIrsExportXml()))
//eIrsSend().then((d)=>{console.log(d)})