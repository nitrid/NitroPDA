function CariHesapHareketCtrl($scope,$window,db)
{   
    let CariSelectedRow = null;

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
            pageSize: 10,
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
                } 
            ],
            rowClick: function(args)
            {
                $scope.CariListeRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitCariFoyGrid()
    {   
        $("#TblCariFoy").jsGrid
        ({
            width: "100%",
            height: "300px",
            updateOnResize: true,
            heading: true,
            selecting: true,
            pageSize: 15,
            pageButtonCount: 3,
            data : $scope.CariFoyListe,
            fields: 
            [
                {
                    name: "TARIH",
                    title: "TARİH",
                    type: "text",
                    align: "center",
                    width: 120
                },
                {
                    name: "SERISIRA",
                    title: "SERİ SIRA",
                    type: "text",
                    align: "center",
                    width: 120
                    
                },
                {
                    name: "EVRAKTIP",
                    title: "EVRAK TİP",
                    type: "text",
                    align: "center",
                    width: 180
                },
                {
                    name: "CINSI",
                    title: "CİNSİ",
                    type: "text",
                    align: "center",
                    width: 120
                },
                {
                    name: "VADEGUN",
                    title: "VADE",
                    type: "text",
                    align: "center",
                    width: 120
                },
                {
                    name: "ANADOVIZBORC",
                    title: "BORÇ",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "ANADOVIZALACAK",
                    title: "ALACAK",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "ANADOVIZBAKIYE",
                    title: "BAKİYE",
                    type: "text",
                    align: "center",
                    width: 200
                },
                {
                    name: "DOVIZCINS",
                    title: "DÖVİZ",
                    type: "text",
                    align: "center",
                    width: 200
                },
             
            ],
            rowClick: function(args)
            {
                $scope.CariFoyRowClick(args.itemIndex,args.item,this);
                $scope.$apply();
            }
        });
    }
    function InitCariFoyDetayGrid()
    {   
        $("#TblCariFoyDetay").jsGrid
        ({
            width: "100%",
            height: "auto",
            updateOnResize: true,
            heading: true,
            selecting: true,
            pageSize: 15,
            pageButtonCount: 3,
            data : $scope.CariFoyListeDetay,
            fields: 
            [ 
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
                name: "FIYAT",
                title: "FIYAT",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "TUTAR",
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
            },
            {
                name: "sth_iskonto2",
                title: "IND2",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sth_iskonto3",
                title: "IND3",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sth_iskonto4",
                title: "IND4",
                type: "number",
                align: "center",
                width: 100
            },
            {
                name: "sth_iskonto5",
                title: "IND5",
                type: "number",
                align: "center",
                width: 100
            }
            ],
        });
    }
    function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
    }
    $scope.PDFSave = function()
    {
        // /**
        // * Convert a base64 string in a Blob according to the data and contentType.
        // * 
        // * @param b64Data {String} Pure base64 string without contentType
        // * @param contentType {String} the content type of the file i.e (application/pdf - text/plain)
        // * @param sliceSize {Int} SliceSize to process the byteCharacters
        // * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
        // * @return Blob
        // */
        if (window.cordova && cordova.platformId !== "browser") 
        {
            document.addEventListener("deviceready", function () 
            {
                // var storageLocation = cordova.file.externalRootDirectory  + "download/";
                // var blob = Jhxlsx.getBlob(RaporListeData,options);

                switch (cordova.platform) 
                {
                    case "Android":
                      storageLocation = cordova.file.externalRootDirectory  + "download/";
                      break;
            
                    case "iOS":
                      storageLocation = cordova.file.documentsDirectory;
                      break;
                }
                // The base64 content
                var myBase64 = "JVBERi0xLjcKCjE....";
                // Define the mimetype of the file to save, in this case a PDF
                var contentType = "application/pdf";
                // The path where the file will be saved

                var folderpath = "file:///storage/emulated/0/download/";
                $scope.Base64DataLong = 'data:' + contentType + ';' + 'base64,' + $scope.Base64Data
                // The name of your file
                var filename = "CariEkstre.pdf";
                alertify.alert(folderpath,filename,$scope.Base64Data,contentType);
                $scope.savebase64AsPDF(folderpath,filename,$scope.Base64Data,contentType);
            });
        }
    }
    $scope.savebase64AsPDF = function(folderpath,filename,content,contentType)
    {
        // Convert the base64 string in a Blob
        var DataBlob = b64toBlob(content,contentType);

        console.log("Starting to write the file :3");

        window.resolveLocalFileSystemURL(folderpath, function(dir) {
            console.log("Access to the directory granted succesfully");
            dir.getFile(filename, {create:true}, function(file) {
                console.log("File created succesfully.");
                alertify.alert("File created succesfully.")
                file.createWriter(function(fileWriter) {
                    console.log("Writing content to file");
                    fileWriter.write(DataBlob);
                }, function(){
                    alert('Unable to save file in path '+ folderpath);
                });
            });
        });
    }
    $scope.PDFShareButton = function()
    {
        // this is the complete list of currently supported params you can pass to the plugin (all optional)
        var options = {
            message: '', // not supported on some apps (Facebook, Instagram)
            subject: 'CariEkstre', // fi. for email
            files: [$scope.Base64DataLong], // an array of filenames either locally or remotely
        };
        
        
        var onSuccess = function(result) {
            console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
            console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
        };
        
        var onError = function(msg) {
            console.log("Sharing failed with message: " + msg);
        };
        console.log(options)
        if (window.cordova && cordova.platformId !== "browser") 
        {
            document.addEventListener("deviceready", function () 
            {
                // var storageLocation = cordova.file.externalRootDirectory  + "download/";
                // var blob = Jhxlsx.getBlob(RaporListeData,options);

                switch (cordova.platform) 
                {
                    case "Android":
                      storageLocation = cordova.file.externalRootDirectory  + "download/";
                      break;
            
                    case "iOS":
                      storageLocation = cordova.file.documentsDirectory;
                      break;
                }
                window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
            });
        }
        // window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
    }
    $scope.Init = function()
    {   console.log(123)
        $scope.Firma = $window.sessionStorage.getItem('Firma');
        UserParam = Param[$window.sessionStorage.getItem('User')];
        
        $scope.CmbCariAra = "0";
        $scope.TxtCariAra = "";
        $scope.IlkTarih = moment(new Date(new Date().getFullYear(), 0, 1)).format("DD.MM.YYYY");
        $scope.SonTarih = moment(new Date()).format("DD.MM.YYYY");
        $scope.Bakiye = 0;
        $scope.CariAdi = "";
        $scope.Carikodu = "";
        $scope.DovizCinsi = "DÖVİZ CİNSİ 1"
        $scope.DovizCinsi1 = "DÖVİZ CİNSİ 2"
        $scope.DovizCinsi2 = "DÖVİZ CİNSİ 3"
        
        $scope.CariListe = [];
        $scope.CariFoyListe = [];

        InitCariGrid();
        InitCariFoyGrid();
        InitCariFoyDetayGrid();
    }
    $scope.BtnCariListele = function()
    {   
        let Kodu = '';
        let Adi = '';
        $scope.Loading = true;
        $scope.TblLoading = false;  

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
        
        db.GetData($scope.Firma,'CariListeGetir',[Kodu,Adi,UserParam.Sistem.PlasiyerKodu],function(data)
        {
            $scope.Loading = false;
            $scope.TblLoading = true; 
            $scope.CariListe = data;      
            $("#TblCari").jsGrid({data : $scope.CariListe});
            $("#TblCari").jsGrid({pageIndex: true})
        });
    }
    $scope.BtnCariFoyGetir = function()
    {
        if($scope.Carikodu == '')
        {
            alertify.alert("Lütfen Cari Seçin !" );
        }
        else
        {
            if(localStorage.mode == 'true')
            {
                let TmpQuery = 
                {
                    db : '{M}.' + $scope.Firma,
                    query:  "SELECT  'C:\\Projeler\\DevPrint\\DevPrintDesign\\bin\\Debug\\CariHesapHareket.repx' AS PATH," +
                            "CONVERT(VARCHAR(10),msg_S_0089,104) AS TARIH, " +       
                            "msg_S_0090 + '-' + CONVERT(NVARCHAR,msg_S_0091) AS SERISIRA, " +
                            "msg_S_0090 AS SERI, " +
                            "msg_S_0091 AS SIRA, " +
                            "msg_S_0094 AS EVRAKTIP, " +
                            "CASE msg_S_0094 WHEN 'Satış faturası' THEN 4 WHEN  'Alış faturası' THEN 3 ELSE 0 END AS EVRAKTIPNO , " +
                            "msg_S_0003 AS CINSI, " +
                            "CONVERT(VARCHAR(10),msg_S_0098,112) VADETARIH, " +
                            "CASE WHEN CONVERT(NVARCHAR,msg_S_0099) != 0 THEN CONVERT(NVARCHAR,msg_S_0099) ELSE 'PEŞİN' END AS VADEGUN, " +
                            "msg_S_0100 AS BA, " +
                            "msg_S_0112 AS DOVIZCINS, " +
                            "CASE WHEN #msg_S_0200 = '' THEN (SELECT cari_kod FROM CARI_HESAPLAR WHERE cari_kod = @KODU) " +
                            "ELSE #msg_S_0200 END AS CARIKODU,  " +
                            "CASE WHEN #msg_S_0201 = '' THEN (SELECT cari_unvan1 FROM CARI_HESAPLAR WHERE cari_kod = @KODU) " +
                            "ELSE #msg_S_0201 END AS CARIADI, " +
                            "CONVERT(FLOAT,ROUND(CONVERT(NVARCHAR,CAST([#msg_S_0103\\T] AS DECIMAL(10,2))),2))  AS TOPLAMBAKIYE, " +
                            "CONVERT(NVARCHAR,CAST([msg_S_0101\\T] AS DECIMAL(10,2))) AS ANADOVIZBORC, " +
                            "CONVERT(NVARCHAR,CAST([msg_S_0102\\T] AS DECIMAL(10,2))) AS ANADOVIZALACAK, " +
                            "ROUND(CONVERT(NVARCHAR,CAST([#msg_S_0103\\T] AS DECIMAL(10,2))),2)  AS ANADOVIZBAKIYE, " +
                            "ROUND(CONVERT(NVARCHAR,CAST([msg_S_1706] AS DECIMAL(10,2))),2) AS ANADOVIZBORCBAKIYE, " +
                            "CONVERT(NVARCHAR,CAST([msg_S_1707] AS DECIMAL(10,2))) AS ANADOVIZALACAKBAKIYE, " +
                            "CONVERT(NVARCHAR,CAST([msg_S_1710] AS DECIMAL(10,2))) AS ORJINALDOVIZBORCBAKIYE, " +
                            "CONVERT(NVARCHAR,CAST([msg_S_1711] AS DECIMAL(10,2))) AS ORJINALDOVIZALACAKBAKİYE, " +
                            "(select ROUND(dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,cari_doviz_cinsi,0,0,0,0),2) from CARI_HESAPLAR where cari_kod = @KODU) AS DOV1ANADOVIZBAKIYE, " +
                            "(select ROUND(dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,cari_doviz_cinsi2,0,0,0,0),2) from CARI_HESAPLAR where cari_kod = @KODU) AS DOV1ORJINALDOVIZBAKIYE, " +
                            "(select ROUND(dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,cari_doviz_cinsi1,0,0,0,0),2) from CARI_HESAPLAR where cari_kod = @KODU) AS DOV1ALTERNATIFDOVIZBAKIYE, " +
                            "(select ROUND(dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',1,cari_doviz_cinsi,0,0,0,0),2) from CARI_HESAPLAR where cari_kod = @KODU) AS DOV2ANADOVIZBAKIYE, " +
                            "(select ROUND(dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',1,cari_doviz_cinsi2,0,0,0,0),2) from CARI_HESAPLAR where cari_kod = @KODU) AS DOV2ORJINALDOVIZBAKIYE, " +
                            "(select ROUND(dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',1,cari_doviz_cinsi1,0,0,0,0),2) from CARI_HESAPLAR where cari_kod = @KODU) AS DOV2ALTERNATIFDOVIZBAKIYE, " +
                            "(select ROUND(dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',2,cari_doviz_cinsi,0,0,0,0),2) from CARI_HESAPLAR where cari_kod = @KODU) AS DOV3ANADOVIZBAKIYE, " +
                            "(select ROUND(dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',2,cari_doviz_cinsi2,0,0,0,0),2) from CARI_HESAPLAR where cari_kod = @KODU) AS DOV3ORJINALDOVIZBAKIYE, " +
                            "(select ROUND(dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',2,cari_doviz_cinsi1,0,0,0,0),2) from CARI_HESAPLAR where cari_kod = @KODU) AS DOV3ALTERNATIFDOVIZBAKIYE, " +
                            "[msg_S_0112] AS ORJINALDOVIZ " +
                            "FROM dbo.fn_CariFoy ('',0,@KODU,NULL,'20181231',@ILKTARIH,@SONTARIH,0,'') ORDER BY #msg_S_0092 ASC " ,
                    param:  ['KODU','ILKTARIH','SONTARIH'],
                    type:   ['string|25','date','date',],
                    value:  [$scope.Carikodu,$scope.IlkTarih,$scope.SonTarih]
                }
        
                db.GetDataQuery(TmpQuery,function(Data)
                {
                    $scope.CariFoyListe = Data;       
                    if(Data.length == 0)
                    {
                        alertify.alert("Veri Yok")
                        $("#TblCariFoy").jsGrid({data : Data});
                        return;
                    }           
                    
                    $scope.Bakiye = db.SumColumn($scope.CariFoyListe,"ANADOVIZBAKIYE");
                    $scope.Dov1AnaDovizBakiye = $scope.CariFoyListe[0].DOV1ANADOVIZBAKIYE
                    $scope.Dov1OrjDovizBakiye = $scope.CariFoyListe[0].DOV1ORJINALDOVIZBAKIYE
                    $scope.Dov1AltDovizBakiye = $scope.CariFoyListe[0].DOV1ALTERNATIFDOVIZBAKIYE 

                    $scope.Dov2AnaDovizBakiye = $scope.CariFoyListe[0].DOV2ANADOVIZBAKIYE
                    $scope.Dov2OrjDovizBakiye = $scope.CariFoyListe[0].DOV2ORJINALDOVIZBAKIYE
                    $scope.Dov2AltDovizBakiye = $scope.CariFoyListe[0].DOV2ALTERNATIFDOVIZBAKIYE 
                    
                    $scope.Dov3AnaDovizBakiye = $scope.CariFoyListe[0].DOV3ANADOVIZBAKIYE
                    $scope.Dov3OrjDovizBakiye = $scope.CariFoyListe[0].DOV3ORJINALDOVIZBAKIYE
                    $scope.Dov3AltDovizBakiye = $scope.CariFoyListe[0].DOV3ALTERNATIFDOVIZBAKIYE 

                    $scope.OrjDoviz = $scope.CariFoyListe[0].ORJINALDOVIZ

                    let TmpBakiye = 0;
                    for (let i = 0; i < $scope.CariFoyListe.length; i++) 
                    {
                        TmpBakiye += $scope.CariFoyListe[i].ANADOVIZBAKIYE;
                        console.log($scope.CariFoyListe[i].ANADOVIZBAKIYE);
                        $scope.CariFoyListe[i].ANADOVIZBAKIYE = TmpBakiye.toFixed(2);
                    }
                    let pData = []
                    for(let i = 0; i < Data.length; i++)
                    {
                        Data[i] = JSON.parse(JSON.stringify(Data[i]).split("İ").join("I").split("ı").join("i").split("Ç").join("C").split("ç").join("c").split("Ğ").join("G").split("ğ").join("g").split("Ş").join("S").split("ş").join("s").split("Ö").join("O").split("ö").join("o").split("Ü").join("U").split("ü").join("u"));
                        pData.push(Data[i]);
                    }
                    pData = pData;
                    console.log(pData)
    
                    //console.log(pData[0].BASEIMAGE.substring(pData[0].BASEIMAGE.indexOf(",") +1 ))
                    $scope.Base64ImageSrc = '../../img/' + $scope.StokKodu + '.png'
                    console.log($scope.Base64ImageSrc)
                    console.log(JSON.stringify(pData))
                    console.log("{TYPE:'REVIEW',PATH:'" + pData[0].PATH.replaceAll('\\','/') + "',DATA:" + JSON.stringify(pData) + "}")
                    db.Emit('DevPrint',"{TYPE:'REVIEW',PATH:'" + pData[0].PATH.replaceAll('\\','/') + "',DATA:" + JSON.stringify(pData) + "}",(pResult)=>
                    {
                        console.log(pResult)
                        $scope.Base64Data = pResult.split('|')[1];
                        if(pResult.split('|')[0] != 'ERR')
                        {
                            // atob() is used to convert base64 encoded PDF to binary-like data.
                            // (See also https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/
                            // Base64_encoding_and_decoding.)
                            var pdfData = atob(pResult.split('|')[1])
                            //
                            // The workerSrc property shall be specified.
                            //
                            pdfjsLib.GlobalWorkerOptions.workerSrc =
                                'buildpdf/pdf.worker.js';
    
                            // Opening PDF by passing its binary data as a string. It is still preferable
                            // to use Uint8Array, but string or array-like structure will work too.
                            var loadingTask = pdfjsLib.getDocument({ data: pdfData, });
                            (async function() 
                            {
                                var pdf = await loadingTask.promise;
                                // Fetch the first page.
                                var page = await pdf.getPage(1);
                                var scale = 0.58;
                                var viewport = page.getViewport({ scale: scale, });
                                // Support HiDPI-screens.
                                var outputScale = window.devicePixelRatio || 1;
    
                                // Prepare canvas using PDF page dimensions.
                                var canvas = document.getElementById('the-canvas');
                                var context = canvas.getContext('2d');
    
                                canvas.width = Math.floor(viewport.width * outputScale);
                                canvas.height = Math.floor(viewport.height * outputScale);
                                canvas.style.width = Math.floor(viewport.width) + "px";
                                canvas.style.height =  Math.floor(viewport.height) + "px";
    
                                var transform = outputScale !== 1
                                ? [outputScale, 0, 0, outputScale, 0, 0]
                                : null;
    
                                // Render PDF page into canvas context.
                                var renderContext = {
                                canvasContext: context,
                                transform,
                                viewport,
                                };
                                page.render(renderContext);
    
                                var contentType2 = "application/pdf";
                                $scope.Base64DataLong = 'data:' + contentType2 + ';' + 'base64,' + $scope.Base64Data
                                console.log($scope.Base64DataLong)
                            })();
                        }
                    })
                    $("#TblCariFoy").jsGrid({data : $scope.CariFoyListe});
                });
            }
            else
            {
                db.GetData($scope.Firma,'CariHarRaporGetir',[$scope.Carikodu],function(Data)
                {
                    $scope.CariFoyListe = Data;   
                    if(Data.length == 0)
                    {
                        alertify.alert("Veri Yok")
                    }             
                    else
                    {
                        $scope.Bakiye = db.SumColumn($scope.CariFoyListe,"ANADOVIZBAKIYE");
                        $scope.Dov1AnaDovizBakiye = $scope.CariFoyListe[0].DOV1ANADOVIZBAKIYE
                        $scope.Dov1OrjDovizBakiye = $scope.CariFoyListe[0].DOV1ORJINALDOVIZBAKIYE
                        $scope.Dov1AltDovizBakiye = $scope.CariFoyListe[0].DOV1ALTERNATIFDOVIZBAKIYE 
    
                        $scope.Dov2AnaDovizBakiye = $scope.CariFoyListe[0].DOV2ANADOVIZBAKIYE
                        $scope.Dov2OrjDovizBakiye = $scope.CariFoyListe[0].DOV2ORJINALDOVIZBAKIYE
                        $scope.Dov2AltDovizBakiye = $scope.CariFoyListe[0].DOV2ALTERNATIFDOVIZBAKIYE 
                        
                        $scope.Dov3AnaDovizBakiye = $scope.CariFoyListe[0].DOV3ANADOVIZBAKIYE
                        $scope.Dov3OrjDovizBakiye = $scope.CariFoyListe[0].DOV3ORJINALDOVIZBAKIYE
                        $scope.Dov3AltDovizBakiye = $scope.CariFoyListe[0].DOV3ALTERNATIFDOVIZBAKIYE 
    
                        $scope.OrjDoviz = $scope.CariFoyListe[0].ORJINALDOVIZ
    
                        console.log($scope.CariFoyListe[0].EVRAKTIPNO)
    
                        let TmpBakiye = 0;
                        for (let i = 0; i < $scope.CariFoyListe.length; i++) 
                        {
                            TmpBakiye += $scope.CariFoyListe[i].ANADOVIZBAKIYE;
                            console.log($scope.CariFoyListe[i].ANADOVIZBAKIYE);
                            $scope.CariFoyListe[i].ANADOVIZBAKIYE = TmpBakiye.toFixed(2);
                        }
    
                        $("#TblCariFoy").jsGrid({data : $scope.CariFoyListe});
                    }
                });
            }
        }
    }
    $scope.BtnCariFoyDetayGetir = function()
    {
      if($scope.EvrakTipNo == 3 || $scope.EvrakTipNo == 4)
      {
        db.GetData($scope.Firma,'StokHarGetir',[$scope.EvrakNoSeri,$scope.EvrakNoSira,$scope.EvrakTipNo],function(Data)
        {   
            $scope.CariFoyDetayListe = Data
            console.log(Data)

            $("#TblCariFoyDetay").jsGrid({data : $scope.CariFoyDetayListe});
            $scope.DetayClick();

        });
      }
      else
      {
          alertify.alert('Sadece Fatura Evraklarının Detayı Görülebilir...')
      } 
    }
    $scope.BtnCariListeleEnter = function(keyEvent)
    {
        if(keyEvent.which === 13)
        {
            $scope.BtnCariListele();
        }
    }
    $scope.PDFClick = function()
    {
        $("#TbPDF").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbIslemSatirlari").removeClass('active');
    }
    $scope.CariListeRowClick = function(pIndex,pItem,pObj)
    {
        if(!$scope.EvrakLock)
        {
            if ( CariSelectedRow ) { CariSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
            var $row = pObj.rowByItem(pItem);
            $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
            CariSelectedRow = $row;
            
            $scope.CariAdi = $scope.CariListe[pIndex].UNVAN1;
            $scope.Carikodu =$scope.CariListe[pIndex].KODU;
            $scope.CariDovizCinsi = $scope.CariListe[pIndex].DOVIZCINSI;
            $scope.CariDovizCinsi1 = $scope.CariListe[pIndex].DOVIZCINSI1;
            $scope.CariDovizCinsi2 = $scope.CariListe[pIndex].DOVIZCINSI2;
            console.log($scope.CariDovizCinsi,$scope.CariDovizCinsi1,$scope.CariDovizCinsi2)
            if($scope.CariDovizCinsi == 0 )
            {
                $scope.TlBakiye = "TL BAKIYE";
                $scope.DovizCinsi = $scope.TlBakiye;

            }
            else if($scope.CariDovizCinsi == 1 )
            {
                $scope.UsdBakiye = "DOLAR BAKIYE";
                $scope.DovizCinsi = $scope.UsdBakiye;
            }
            else if($scope.CariDovizCinsi == 2 )
            {
                $scope.EuBakiye = "EURO BAKIYE";
                $scope.DovizCinsi = $scope.EuBakiye;
            }

            if($scope.CariDovizCinsi1 == 0 )
            {
                $scope.TlBakiye = "TL BAKIYE";
                $scope.DovizCinsi1 = $scope.TlBakiye;

            }
            else if($scope.CariDovizCinsi1 == 1 )
            {
                $scope.UsdBakiye = "DOLAR BAKIYE";
                $scope.DovizCinsi1 = $scope.UsdBakiye;
            }
            else if($scope.CariDovizCinsi1 == 2 )
            {
                $scope.EuBakiye = "EURO BAKIYE";
                $scope.DovizCinsi1 = $scope.EuBakiye;
            }

            if($scope.CariDovizCinsi2 == 0 )
            {
                $scope.TlBakiye = "TL BAKIYE";
                $scope.DovizCinsi2 = $scope.TlBakiye;

            }
            else if($scope.CariDovizCinsi2 == 1 )
            {
                $scope.UsdBakiye = "DOLAR BAKIYE";
                $scope.DovizCinsi2 = $scope.UsdBakiye;
            }
            else if($scope.CariDovizCinsi2 == 2 )
            {
                $scope.EuBakiye = "EURO BAKIYE";
                $scope.DovizCinsi2 = $scope.EuBakiye;
            }
            $scope.MainClick();
        }
    }
    $scope.CariFoyRowClick = function(pIndex,pItem,pObj)
    {
        if(!$scope.EvrakLock)
        {
            if ( CariSelectedRow ) { CariSelectedRow.children('.jsgrid-cell').css('background-color', '').css('color',''); }
            var $row = pObj.rowByItem(pItem);
            $row.children('.jsgrid-cell').css('background-color','#2979FF').css('color','white');
            CariSelectedRow = $row;
            
            $scope.EvrakTipNo = $scope.CariFoyListe[pIndex].EVRAKTIPNO;
            $scope.EvrakNoSeri = $scope.CariFoyListe[pIndex].SERI;
            $scope.EvrakNoSira =  $scope.CariFoyListe[pIndex].SIRA;
            $scope.BtnCariFoyDetayGetir();
        }
    }
    $scope.CariSecClick = function() 
    {
        $("#TbCari").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbDetay").removeClass('active');
        $("#TbPDF").removeClass('active');
    }
    $scope.MainClick = function()
    {
        $("#TbPDF").removeClass('active');
        $("#TbMain").addClass('active');
        $("#TbCari").removeClass('active');
        $("#TbDetay").removeClass('active');
        $scope.CariFoyDetayListe = [];
        $("#TblCariFoyDetay").jsGrid({data : $scope.CariFoyDetayListe});
    }
    $scope.BtnTemizle = function()
    {
        $scope.CariAdi = "";
        $scope.Carikodu = "";
    }
    $scope.DetayClick = function()
    {
        $("#TbDetay").addClass('active');
        $("#TbMain").removeClass('active');
        $("#TbCari").removeClass('active');
    }
    $scope.Dv1Click = function() 
    {
        $("#TbDov1").addClass('active');
        $("#TbDov2").removeClass('active');
        $("#TbDov3").removeClass('active');
    }
    $scope.Dv2Click = function() 
    {
        $("#TbDov2").addClass('active');
        $("#TbDov1").removeClass('active');
        $("#TbDov3").removeClass('active');
    }
    $scope.Dv3Click = function() 
    {
        $("#TbDov3").addClass('active');
        $("#TbDov1").removeClass('active');
        $("#TbDov2").removeClass('active');
    }
}