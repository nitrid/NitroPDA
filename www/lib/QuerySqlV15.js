var QuerySql = 
{
    Firma : 
    {
        query : 'SELECT DB_kod AS FIRM FROM VERI_TABANLARI'
    },
    Stok : 
    {
        query : "SELECT * FROM STOKLAR WHERE ((sto_kod = @sto_kod) OR (@sto_kod = ''))",
        param : ['sto_kod'],
        type : ['string|25'] 
    },
    CmbDepoGetir : 
    {
        query : "SELECT dep_no AS KODU,dep_adi AS ADI FROM DEPOLAR"
    },
    CmbSorumlulukGetir : 
    {
        query : "SELECT '' AS KODU, '' AS ADI UNION ALL SELECT som_kod AS KODU,som_isim AS ADI FROM SORUMLULUK_MERKEZLERI"
    },
    CmbPersonelGetir : 
    {
        query : "SELECT '' AS KODU, '' AS ADI,'' AS SOYADI UNION ALL SELECT PER1.cari_per_kod AS KODU,PER1.cari_per_adi AS ADI,PER1.cari_per_soyadi AS SOYADI " +
                "FROM CARI_PERSONEL_TANIMLARI AS PER1 INNER JOIN CARI_PERSONEL_TANIMLARI AS PER2 ON " +
                "PER1.cari_per_kod = PER2.cari_per_kod --AND PER1.cari_per_tip = 0 "
    },
    CmbProjeGetir : 
    {
        query : "SELECT '' AS KODU, '' AS ADI UNION ALL SELECT pro_kodu AS KODU,pro_adi AS ADI FROM PROJELER"
    },
    CmbOdemePlanGetir : 
    {
        query : "SELECT '0' AS KODU, 'PEŞİN' AS ADI UNION ALL SELECT odp_no AS KODU, " +
                "odp_adi  AS ADI FROM ODEME_PLANLARI"
    },
    CmbBirimGetir : 
    {
        query : "SELECT sto_birimID AS BIRIMPNTR, " + 
                "sto_birim_ad AS BIRIM, " + 
                "CASE WHEN sto_birim_katsayi > 0 THEN sto_birim_katsayi ELSE sto_birim_katsayi * -1 END AS KATSAYI " + 
                "FROM STOK_BIRIM_TANIMLARI_DIKEY WHERE sto_kod = @sto_kod", 
        param : ['sto_kod'],
        type : ['string|25']
    },    
    CariListeGetir : 
    {
        query : "SELECT cari_kod AS KODU, " +
                "cari_cari_kilitli_flg As CKILIT," +
                "cari_unvan1 AS UNVAN1," +
                "cari_unvan2 AS UNVAN2," +
                "cari_doviz_cinsi AS DOVIZCINSI," +
                "cari_doviz_cinsi1 AS DOVIZCINSI1," +
                "cari_doviz_cinsi2 AS DOVIZCINSI2," +
                "cari_vdaire_adi AS VDADI," +
                "cari_vdaire_no AS VDNO," +
                "cari_satis_fk AS SATISFK," +
                "cari_satis_isk_kod AS ISKONTOKOD," +
                "cari_sektor_kodu AS SEKTOR," +
                "cari_bolge_kodu AS BOLGE," +
                "cari_grup_kodu AS GRUP," +
                "cari_temsilci_kodu AS TEMSILCI," +
                "(SELECT dbo.fn_DovizSembolu(ISNULL(cari_doviz_cinsi,0))) AS DOVIZSEMBOL," +
                "(SELECT dbo.fn_DovizSembolu(ISNULL(cari_doviz_cinsi1,0))) AS DOVIZSEMBOL1," + 
                "(SELECT dbo.fn_DovizSembolu(ISNULL(cari_doviz_cinsi2,0))) AS DOVIZSEMBOL2," +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(cari_doviz_cinsi,0),2)) AS DOVIZKUR," +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(cari_doviz_cinsi1,0),2)) AS DOVIZKUR1," +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(cari_doviz_cinsi2,0),2)) AS DOVIZKUR2," +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(1,0),2)) AS ALTDOVIZKUR," +
                "ISNULL((SELECT sum(ct_tutari) FROM dbo.CARI_HESAP_TEMINATLARI WHERE ct_carikodu = cari_kod),0) AS RISK," +
                "cari_odemeplan_no AS ODEMEPLANI," +
                "ISNULL((SELECT dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,cari_doviz_cinsi)),0) AS BAKIYE," +
                "ISNULL(CARI_MUSTAHSIL_TANIMLARI.Cm_BelgeNo,'') as BELGENO, ISNULL(CARI_MUSTAHSIL_TANIMLARI.Cm_GecerlilikTarihi,GETDATE()) as BELGETARIH," +
                "ISNULL((SELECT adr_ilce + '-' + adr_il FROM CARI_HESAP_ADRESLERI WHERE adr_adres_no = 1 AND adr_cari_kod = cari_kod),'') AS ADRES," +
                "cari_BUV_tabi_fl AS VERGISIZ," +
                "cari_efatura_fl AS EFATURA " +
                "FROM CARI_MUSTAHSIL_TANIMLARI RIGHT OUTER JOIN " +
                "CARI_HESAPLAR AS CARI ON CARI_MUSTAHSIL_TANIMLARI.Cm_carikodu = CARI.cari_kod " +
                "WHERE ((CARI.cari_kod LIKE '%' + @KODU + '%') OR (@KODU = '')) AND ((CARI.cari_unvan1 LIKE '%' + @ADI + '%') OR (@ADI = '')) ORDER BY cari_kod ASC",
            param : ['KODU','ADI'],
            type : ['string|25','string|127']
    },
    CariGetir : 
    {
        query : "SELECT cari_kod AS KODU, " +
                "cari_cari_kilitli_flg As CKILIT," +
                "cari_unvan1 AS UNVAN1," +
                "cari_unvan2 AS UNVAN2," +
                "cari_doviz_cinsi AS DOVIZCINSI," +
                "cari_doviz_cinsi1 AS DOVIZCINSI1," +
                "cari_doviz_cinsi2 AS DOVIZCINSI2," +
                "cari_vdaire_adi AS VDADI," +
                "cari_vdaire_no AS VDNO," +
                "cari_satis_fk AS SATISFK," +
                "cari_satis_isk_kod AS ISKONTOKOD," +
                "cari_sektor_kodu AS SEKTOR," +
                "cari_bolge_kodu AS BOLGE," +
                "cari_grup_kodu AS GRUP," +
                "cari_temsilci_kodu AS TEMSILCI," +
                "(SELECT dbo.fn_DovizSembolu(ISNULL(cari_doviz_cinsi,0))) AS DOVIZSEMBOL," +
                "(SELECT dbo.fn_DovizSembolu(ISNULL(cari_doviz_cinsi1,0))) AS DOVIZSEMBOL1," + 
                "(SELECT dbo.fn_DovizSembolu(ISNULL(cari_doviz_cinsi2,0))) AS DOVIZSEMBOL2," +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(cari_doviz_cinsi,0),2)) AS DOVIZKUR," +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(cari_doviz_cinsi1,0),2)) AS DOVIZKUR1," +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(cari_doviz_cinsi2,0),2)) AS DOVIZKUR2," +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(1,0),2)) AS ALTDOVIZKUR," +
                "ISNULL((SELECT sum(ct_tutari) FROM dbo.CARI_HESAP_TEMINATLARI WHERE ct_carikodu = cari_kod),0) AS RISK," +
                "cari_odemeplan_no AS ODEMEPLANI," +
                "ISNULL((SELECT dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'','',0,cari_doviz_cinsi)),0) AS BAKIYE," +
                "ISNULL(CARI_MUSTAHSIL_TANIMLARI.Cm_BelgeNo,'') as BELGENO, ISNULL(CARI_MUSTAHSIL_TANIMLARI.Cm_GecerlilikTarihi,GETDATE()) as BELGETARIH," +
                "ISNULL((SELECT adr_ilce + '-' + adr_il FROM CARI_HESAP_ADRESLERI WHERE adr_adres_no = 1 AND adr_cari_kod = cari_kod),'') AS ADRES," +
                "cari_BUV_tabi_fl AS VERGISIZ," +
                "cari_efatura_fl AS EFATURA " +
                "FROM CARI_MUSTAHSIL_TANIMLARI RIGHT OUTER JOIN " +
                "CARI_HESAPLAR AS CARI ON CARI_MUSTAHSIL_TANIMLARI.Cm_carikodu = CARI.cari_kod " +
                "WHERE ((CARI.cari_kod = @KODU) OR (@KODU = '')) AND ((CARI.cari_unvan1 = @ADI) OR (@ADI = '')) ORDER BY cari_kod ASC",
            param : ['KODU','ADI'],
            type : ['string|25','string|127']
    },
    BarkodGetir:
    {
        query : "SELECT sto_kod AS KODU, " +
                "sto_isim AS ADI, " +
                "ISNULL((SELECT cari_unvan1 FROM CARI_HESAPLAR WHERE cari_kod = STOK.sto_sat_cari_kod),'') AS UNVAN1, " +
                "ISNULL((SELECT cari_unvan2 FROM CARI_HESAPLAR WHERE cari_kod = STOK.sto_sat_cari_kod),'') AS UNVAN2, " +
                "sto_sat_cari_kod AS CARİKODU, " +
                "ISNULL(sto_birim2_katsayi * -1,0) AS MIKTAR, " +
                "sto_kisa_ismi AS KISAAD, " +
                "sto_yabanci_isim AS YABANCIAD, " +
                "sto_doviz_cinsi AS DOVIZCINSI, " +
                "sto_perakende_vergi AS PERAKENDEVERGIPNTR, " +
                "sto_toptan_vergi AS TOPTANVERGIPNTR, " +
                "sto_altgrup_kod AS ALTGRUP, " +
                "sto_anagrup_kod AS ANAGRUP, " +
                "sto_uretici_kodu AS URETICI, " +
                "sto_sektor_kodu AS SEKTOR, " +
                "sto_reyon_kodu AS REYON, " +
                "sto_marka_kodu AS MARKA, " +
                "sto_beden_kodu AS BEDENKODU, " +
                "sto_renk_kodu AS RENKKODU, " +
                "sto_pasif_fl AS AKTIFPASIF, " +
                "bar_kodu AS BARKOD, " +
                "CASE WHEN BARKOD.bar_birimpntr=1 THEN STOK.sto_birim1_katsayi  " +
                "WHEN BARKOD.bar_birimpntr=2 THEN STOK.sto_birim2_katsayi " +
                "WHEN BARKOD.bar_birimpntr=3 THEN STOK.sto_birim3_katsayi " +
                "WHEN BARKOD.bar_birimpntr=4 THEN STOK.sto_birim4_katsayi " +
                "ELSE 0 END AS CARPAN, " +
                "bar_birimpntr AS BIRIMPNTR, " +
                "bar_bedenpntr AS BEDENPNTR, " +
                "bar_renkpntr AS RENKPNTR, " +
                "bar_special2 AS BOLEN, " +
                "bar_partikodu AS PARTI, " +
                "bar_lotno AS LOT, " +
                "bar_barkodtipi AS BARKODTIP, " +
                "bar_barkodtipi AS BAGLANTITIPI, " +
                "ISNULL( mye_TextData.Data,'') AS ACIKLAMA, " +
                "(SELECT dbo.fn_beden_kirilimi (bar_bedenpntr,sto_beden_kodu)) AS BEDEN, " +
                "(SELECT dbo.fn_renk_kirilimi (bar_renkpntr,sto_renk_kodu)) AS RENK, " +
                "(SELECT dbo.fn_VergiYuzde (sto_perakende_vergi)) AS PERAKENDEVERGI, " +
                "(SELECT dbo.fn_VergiYuzde (sto_toptan_vergi)) AS TOPTANVERGI, " +
                "ISNULL((SELECT dbo.fn_StokBirimHesapla (sto_kod,bar_birimpntr,1,1)),1) AS KATSAYI, " +
                "(SELECT dbo.fn_StokBirimi (sto_kod,bar_birimpntr)) AS BIRIM, " +
                "sto_detay_takip AS DETAYTAKIP, " +
                "ISNULL((SELECT dbo.fn_DepodakiMiktar (STOK.sto_kod,@DEPONO,CONVERT(VARCHAR(10),GETDATE(),112))),0) AS DEPOMIKTAR, " +
                "ISNULL(( SELECT  msg_S_0165  FROM [dbo].[fn_DepolardakiRenkBedenDetayliMiktar] ( sto_kod ,@DEPONO,GETDATE()) WHERE msg_S_0062=CASE WHEN bar_renkpntr=0 THEN bar_bedenpntr ELSE CASE WHEN bar_bedenpntr=0 THEN (bar_renkpntr-1)*40+1 ELSE (bar_renkpntr-1)*40+bar_bedenpntr END  END),0) AS KIRILIMMIKTAR, " +
                "sto_siparis_dursun AS SIPARISDURSUN, " +
                "sto_malkabul_dursun as MALKABULDURSUN, " +
                "sto_otvtutar AS OTVTUTAR " +
                "FROM STOKLAR AS STOK WITH (NOLOCK,INDEX=NDX_STOKLAR_02) " +
                "LEFT JOIN BARKOD_TANIMLARI AS BARKOD WITH (NOLOCK,INDEX=NDX_BARKOD_TANIMLARI_02) ON " +
                "STOK.sto_kod = BARKOD.bar_stokkodu " +
                "LEFT JOIN mye_TextData ON mye_TextData.TableID=13 AND STOK.sto_RECid_RECno=mye_TextData.RecID_RECno  " + 
                "WHERE BARKOD.bar_kodu = @BARKOD" ,
        param : ['BARKOD','DEPONO'],
        type : ['string|50','int']
    },
    StokGetir:
    {
        query : "SELECT sto_kod AS KODU, " +
                "ISNULL((SELECT TOP 1 sfiyat_fiyati FROM STOK_SATIS_FIYAT_LISTELERI WHERE sfiyat_listesirano = 3 AND sfiyat_stokkod = STOK.sto_kod),'') AS FIYAT, " +
                "sto_isim AS ADI, " +
                "sto_kisa_ismi AS KISAAD, " +
                "sto_yabanci_isim AS YABANCIAD, " +
                "sto_doviz_cinsi AS DOVIZCINSI, " +
                "sto_perakende_vergi AS PERAKENDEVERGIPNTR, " +
                "sto_toptan_vergi AS TOPTANVERGIPNTR, " +
                "sto_altgrup_kod AS ALTGRUP, " +
                "sto_anagrup_kod AS ANAGRUP, " +
                "sto_uretici_kodu AS URETICI, " +
                "sto_sektor_kodu AS SEKTOR, " +
                "sto_reyon_kodu AS REYON, " +
                "sto_marka_kodu AS MARKA, " +
                "sto_beden_kodu AS BEDENKODU, " +
                "sto_renk_kodu AS RENKKODU, " +
                "sto_pasif_fl AS AKTIFPASIF, " +
                "'' AS BARKOD, " +
                "1 AS CARPAN, " +
                "1 AS BIRIMPNTR, " +
                "0 AS BEDENPNTR, " +
                "0 AS RENKPNTR, " +
                "'' AS BOLEN, " +
                "'' AS PARTI, " +
                "0 AS LOT, " +
                "0 AS BARKODTIP, " +
                "0 AS BAGLANTITIPI, " +
                "'' AS ACIKLAMA, " +
                "'' AS BEDEN, " +
                "'' AS RENK, " +
                "(SELECT dbo.fn_VergiYuzde (sto_perakende_vergi)) AS PERAKENDEVERGI, " +
                "(SELECT dbo.fn_VergiYuzde (sto_toptan_vergi)) AS TOPTANVERGI, " +
                "1 AS KATSAYI, " +
                "'' AS BIRIM, " +
                "sto_detay_takip AS DETAYTAKIP, " +
                "ISNULL((SELECT dbo.fn_DepodakiMiktar (STOK.sto_kod,@DEPONO,CONVERT(VARCHAR(10),GETDATE(),112))),0) AS DEPOMIKTAR, " +
                "0 AS KIRILIMMIKTAR, " +
                "sto_siparis_dursun AS SIPARISDURSUN, " +
                "sto_malkabul_dursun as MALKABULDURSUN, " +
                "sto_otvtutar AS OTVTUTAR " +
                "FROM STOKLAR AS STOK " + 
                "WHERE ((sto_kod LIKE @KODU) OR (@KODU = '')) AND ((sto_isim LIKE @ADI) OR (@ADI = ''))" ,
        param : ['KODU',"ADI",'DEPONO'],
        type : ['string|25','string|50','int']
    },    
    FiyatGetir : 
    {
        query : "SELECT TOP 1 " + 
                "CASE WHEN (SELECT sfl_kdvdahil FROM STOK_SATIS_FIYAT_LISTE_TANIMLARI WHERE sfl_sirano=sfiyat_listesirano) = 0 THEN " + 
                "dbo.fn_StokSatisFiyati(sfiyat_stokkod,sfiyat_listesirano,sfiyat_deposirano) " + 
                "ELSE " + 
                "dbo.fn_StokSatisFiyati(sfiyat_stokkod,sfiyat_listesirano,sfiyat_deposirano) / ((SELECT dbo.fn_VergiYuzde ((SELECT TOP 1 sto_toptan_vergi FROM STOKLAR WHERE sto_kod = sfiyat_stokkod)) / 100) + 1) " + 
                "END AS FIYAT, " + 
                "sfiyat_doviz AS DOVIZ, " + 
                "ISNULL((SELECT dbo.fn_DovizSembolu(ISNULL(sfiyat_doviz,0))),'TL') AS DOVIZSEMBOL, " + 
                "ISNULL((SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(sfiyat_doviz,0),2)),1) AS DOVIZKUR, " + 
                "sfiyat_iskontokod AS ISKONTOKOD " + 
                "FROM STOK_SATIS_FIYAT_LISTELERI " +
                "WHERE sfiyat_stokkod = @KODU AND sfiyat_listesirano = @LISTENO AND sfiyat_deposirano IN (0,@DEPO) " +
                "ORDER BY sfiyat_deposirano DESC", 
        param : ['KODU','LISTENO','DEPO'],
        type : ['string|25','int','int']
    },
    SonAlisFiyatGetir : 
    {
        query : "SELECT Hesaplama.sth_cari_kodu AS CARI, " +
                "Hesaplama.sth_stok_kod AS STOK, " +
                "STOKHAREKETLERI.sth_tutar / STOKHAREKETLERI.sth_miktar AS SONFIYAT " +
                "FROM (SELECT     TOP (100) PERCENT MAX(sth_RECno) AS Guid, sth_cari_kodu, sth_stok_kod " +
                "FROM STOK_HAREKETLERI " +
                "WHERE (sth_evraktip IN (13,3)) " +
                "GROUP BY sth_cari_kodu, sth_stok_kod " +
                "ORDER BY Guid DESC) AS Hesaplama INNER JOIN " +
                "STOK_HAREKETLERI AS STOKHAREKETLERI ON Hesaplama.Guid = STOKHAREKETLERI.sth_RECno " +
                "WHERE Hesaplama.sth_cari_kodu  = @sth_cari_kodu AND Hesaplama.sth_stok_kod  = @sth_stok_kod" , 
        param : ['sth_cari_kodu','sth_stok_kod'],
        type : ['string|25','string|25']
    },
    SonSatisFiyatGetir : 
    {
        query : "SELECT Hesaplama.sth_cari_kodu AS CARI, " +
                "Hesaplama.sth_stok_kod AS STOK, " +
                "STOKHAREKETLERI.sth_tutar / STOKHAREKETLERI.sth_miktar AS SONFIYAT " +
                "FROM (SELECT     TOP (100) PERCENT MAX(sth_Guid) AS Guid, sth_cari_kodu, sth_stok_kod " +
                "FROM STOK_HAREKETLERI " +
                "WHERE (sth_evraktip IN (4)) " +
                "GROUP BY sth_cari_kodu, sth_stok_kod " +
                "ORDER BY Guid DESC) AS Hesaplama INNER JOIN " +
                "STOK_HAREKETLERI AS STOKHAREKETLERI ON Hesaplama.Guid = STOKHAREKETLERI.sth_Guid " +
                "WHERE Hesaplama.sth_cari_kodu  = @sth_cari_kodu AND Hesaplama.sth_stok_kod  = @sth_stok_kod" , 
        param : ['sth_cari_kodu','sth_stok_kod'],
        type : ['string|25','string|25']
    },
    SatisSartiGetir : 
    {
        query : "SELECT sat_stok_kod AS STOKKOD " +
                ",sat_cari_kod AS CARIKOD " +
                ",sat_bitis_tarih AS BITIS " +
                ",sat_basla_tarih AS BASLANGIC " +
                ",sat_brut_fiyat AS FIYAT " +
                ",sat_det_isk_miktar1 AS ISKONTOM1 " +
                ",sat_det_isk_miktar2 AS ISKONTOM2 " +
                ",sat_det_isk_miktar3 AS ISKONTOM3 " +
                ",sat_det_isk_miktar4 AS ISKONTOM4 " +
                ",sat_det_isk_miktar5 AS ISKONTOM5 " +
                ",sat_det_isk_miktar6 AS ISKONTOM6 " +
                ",sat_det_isk_yuzde1 AS ISKONTOY1 " +
                ",sat_det_isk_yuzde2 AS ISKONTOY2 " +
                ",sat_det_isk_yuzde3 AS ISKONTOY3 " +
                ",sat_det_isk_yuzde4 AS ISKONTOY4 " +
                ",sat_det_isk_yuzde5 AS ISKONTOY5 " +
                ",sat_det_isk_yuzde6 AS ISKONTOY6 " +
                ",sat_odeme_plan AS ODEPLAN " +
                ",sat_doviz_cinsi AS DOVIZ " +
                ",sat_depo_no AS DEPO " +
                ",sat_fiyat_liste_no AS LISTENO " +
                ",(SELECT dbo.fn_DovizSembolu(ISNULL(sat_doviz_cinsi,0))) AS DOVIZSEMBOL " +
                ",(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(sat_doviz_cinsi,0),2)) AS DOVIZKUR " +
                "FROM SATIS_SARTLARI " +
                "WHERE sat_basla_tarih <= GETDATE() AND (sat_bitis_tarih >= GETDATE() OR sat_bitis_tarih = '18991230') " +
                "AND sat_cari_kod = @sat_cari_kod AND sat_stok_kod = @sat_stok_kod AND (sat_depo_no = @sat_depo_no OR sat_depo_no = 0) " +
                "ORDER BY sat_basla_tarih,sat_depo_no DESC , sat_bitis_tarih ASC" , 
        param : ['sat_cari_kod','sat_stok_kod','sat_depo_no'],
        type : ['string|25','string|25','int']
    },
    AlisSartiGetir : 
    {
        query : "SELECT sas_stok_kod AS STOKKOD, " +
                "sas_cari_kod AS CARIKOD, " +
                "sas_bitis_tarih AS BITIS, " +
                "sas_basla_tarih AS BASLANGIC, " +
                "sas_brut_fiyat AS FIYAT, " +
                "sas_isk_miktar1 AS ISKONTOM1, " +
                "sas_isk_miktar2 AS ISKONTOM2, " +
                "sas_isk_miktar3 AS ISKONTOM3, " +
                "sas_isk_miktar4 AS ISKONTOM4, " +
                "sas_isk_miktar5 AS ISKONTOM5, " +
                "sas_isk_yuzde1 AS ISKONTOY1, " +
                "sas_isk_yuzde2 AS ISKONTOY2, " +
                "sas_isk_yuzde3 AS ISKONTOY3, " +
                "sas_isk_yuzde4 AS ISKONTOY4, " +
                "sas_isk_yuzde5 AS ISKONTOY5, " +
                "sas_odeme_plan AS ODEPLAN, " +
                "sas_doviz_cinsi AS DOVIZ, " + 
                "sas_depo_no AS DEPO, " +
                "1 AS LISTENO, " +
                "(SELECT     dbo.fn_DovizSembolu(ISNULL(sas_doviz_cinsi, 0))) AS DOVIZSEMBOL, " +
                "(SELECT     dbo.fn_KurBul(CONVERT(VARCHAR(10), GETDATE(), 112), ISNULL(sas_doviz_cinsi, 0), 2)) AS DOVIZKUR " +
                "FROM SATINALMA_SARTLARI " +
                "WHERE sas_basla_tarih <= GETDATE() AND (sas_bitis_tarih >= GETDATE() OR sas_bitis_tarih = '18991230') " +
                "AND sas_cari_kod = @sas_cari_kod AND sas_stok_kod = @sas_stok_kod AND (sas_depo_no = @sas_depo_no OR sas_depo_no = 0) " +
                "ORDER BY sas_basla_tarih,sas_depo_no DESC, sas_bitis_tarih ASC" , 
        param : ['sas_cari_kod','sas_stok_kod','sas_depo_no'],
        type : ['string|25','string|25','int']
    },
    PartiLotGetir :
    {
        query : "SELECT pl_partikodu AS PARTI, " + 
                "pl_lotno AS LOT, " +
                "pl_stokkodu AS STOK, " +
                "ISNULL((SELECT [dbo].[fn_DepodakiPartiliMiktar] (pl_stokkodu,@DepoNo,GETDATE(),pl_partikodu,pl_lotno)),0) AS MIKTAR, " +
                "0 AS KALAN, " +
                "pl_son_kullanim_tar AS SKTTARIH " + 
                "FROM PARTILOT " +
                "WHERE pl_stokkodu = @pl_stokkodu " +
                "AND ((pl_partikodu = @pl_partikodu) OR (@pl_partikodu = '')) AND ((pl_lotno = @pl_lotno) OR (@pl_lotno = 0)) " +
                "ORDER BY pl_partikodu ASC ",
        param : ['pl_stokkodu','DepoNo','pl_partikodu','pl_lotno'],
        type : ['string|25','int','string|25','int']
    },
    PartiLotInsert :
    {
        query : "INSERT INTO [dbo].[PARTILOT] " +
           "([pl_RECid_DBCno]  ," +
            "[pl_RECid_RECno]  " +
            ",[pl_SpecRECno] " +
            ",[pl_iptal] " +
            ",[pl_fileid] " +
            ",[pl_hidden] " +
            ",[pl_kilitli] " +
            ",[pl_degisti] " +
            ",[pl_checksum] " +
            ",[pl_create_user] " +
            ",[pl_create_date] " +
            ",[pl_lastup_user] " +
            ",[pl_lastup_date] " +
            ",[pl_ozelkod1] " +
            ",[pl_ozelkod2] " +
            ",[pl_ozelkod3] " +
            ",[pl_partikodu] " +
            ",[pl_lotno] " +
            ",[pl_stokkodu] " +
            ",[pl_aciklama] " +
            ",[pl_olckalkdeg_deg1] " +
            ",[pl_olckalkdeg_deg2] " +
            ",[pl_olckalkdeg_deg3] " +
            ",[pl_olckalkdeg_deg4] " +
            ",[pl_olckalkdeg_deg5] " +
            ",[pl_olckalkdeg_deg6] " +
            ",[pl_olckalkdeg_deg7] " +
            ",[pl_olckalkdeg_deg8] " +
            ",[pl_olckalkdeg_deg9] " +
            ",[pl_olckalkdeg_deg10] " +
            ",[pl_olckalkdeg_aciklama1] " +
            ",[pl_olckalkdeg_aciklama2] " +
            ",[pl_olckalkdeg_aciklama3] " +
            ",[pl_olckalkdeg_aciklama4] " +
            ",[pl_olckalkdeg_aciklama5] " +
            ",[pl_olckalkdeg_aciklama6] " +
            ",[pl_olckalkdeg_aciklama7] " +
            ",[pl_olckalkdeg_aciklama8] " +
            ",[pl_olckalkdeg_aciklama9] " +
            ",[pl_olckalkdeg_aciklama10] " +
            ",[pl_son_kullanim_tar] " +
            ",[pl_DaraliKilo] " +
            ",[pl_SafiKilo] " +
            ",[pl_En] " +
            ",[pl_Boy] " +
            ",[pl_Yukseklik] " +
            ",[pl_OzgulAgirlik] " +
            ",[pl_kod1] " +
            ",[pl_kod2] " +
            ",[pl_kod3] " +
            ",[pl_kod4] " +
            ",[pl_kod5] " +
            ",[pl_kod6] " +
            ",[pl_kod7] " +
            ",[pl_kod8] " +
            ",[pl_kod9] " +
            ",[pl_kod10]) " +
            "VALUES " +
            "(0 \n" +
            ",IDENT_CURRENT('PARTILOT')  \n" +
            ",0 \n" +
            ",0 \n" +
            ",153 \n" +
            ",0 \n" +
            ",0 \n" +
            ",0 \n" +
            ",0 \n" +
            ",@pl_create_user						--<pl_create_user, smallint,> \n" +
            ",CONVERT(VARCHAR(10),GETDATE(),112)	--<pl_create_date, datetime,> \n" +
            ",@pl_lastup_user						--<pl_lastup_user, smallint,> \n" +
            ",CONVERT(VARCHAR(10),GETDATE(),112)	--<pl_lastup_date, datetime,> \n" +
            ",''									--<pl_ozelkod1, nvarchar(4),> \n" +
            ",''									--<pl_ozelkod2, nvarchar(4),> \n" +
            ",''									--<pl_ozelkod3, nvarchar(4),> \n" +
            ",@pl_partikodu						--<pl_partikodu, nvarchar(25),> \n" +
            ",@pl_lotno							--<pl_lotno, int,> \n" +
            ",@pl_stokkodu						--<pl_stokkodu, nvarchar(25),> \n" +
            ",''									--<pl_aciklama, nvarchar(50),> \n" +
            ",0									--<pl_olckalkdeg_deg1, float,> \n" +
            ",0									--<pl_olckalkdeg_deg2, float,> \n" +
            ",0									--<pl_olckalkdeg_deg3, float,> \n" +
            ",0									--<pl_olckalkdeg_deg4, float,> \n" +
            ",0									--<pl_olckalkdeg_deg5, float,> \n" +
            ",0									--<pl_olckalkdeg_deg6, float,> \n" +
            ",0									--<pl_olckalkdeg_deg7, float,> \n" +
            ",0									--<pl_olckalkdeg_deg8, float,> \n" +
            ",0									--<pl_olckalkdeg_deg9, float,> \n" +
            ",0									--<pl_olckalkdeg_deg10, float,> \n" +
            ",''									--<pl_olckalkdeg_aciklama1, nvarchar(25),> \n" +
            ",''									--<pl_olckalkdeg_aciklama2, nvarchar(25),> \n" +
            ",''									--<pl_olckalkdeg_aciklama3, nvarchar(25),> \n" +
            ",''									--<pl_olckalkdeg_aciklama4, nvarchar(25),> \n" +
            ",''									--<pl_olckalkdeg_aciklama5, nvarchar(25),> \n" +
            ",''									--<pl_olckalkdeg_aciklama6, nvarchar(25),> \n" + 
            ",''									--<pl_olckalkdeg_aciklama7, nvarchar(25),> \n" +
            ",''									--<pl_olckalkdeg_aciklama8, nvarchar(25),> \n" +
            ",''									--<pl_olckalkdeg_aciklama9, nvarchar(25),> \n" +
            ",''									--<pl_olckalkdeg_aciklama10, nvarchar(25),> \n" +
            ",@pl_son_kullanim_tar						--<pl_son_kullanim_tar, datetime,> \n" +
            ",0									--<pl_DaraliKilo, float,> \n" +
            ",0									--<pl_SafiKilo, float,> \n" +
            ",0									--<pl_En, float,> \n" +
            ",0									--<pl_Boy, float,> \n" +
            ",0									--<pl_Yukseklik, float,> \n" +
            ",0									--<pl_OzgulAgirlik, float,> \n" +
            ",''									--<pl_kod1, nvarchar(25),> \n" +
            ",''									--<pl_kod2, nvarchar(25),> \n" +
            ",''									--<pl_kod3, nvarchar(25),> \n" +
            ",''									--<pl_kod4, nvarchar(25),> \n" +
            ",''									--<pl_kod5, nvarchar(25),> \n" +
            ",''									--<pl_kod6, nvarchar(25),> \n" +
            ",''									--<pl_kod7, nvarchar(25),> \n" +
            ",''									--<pl_kod8, nvarchar(25),> \n" +
            ",''									--<pl_kod9, nvarchar(25),> \n" +
            ",''									--<pl_kod10, nvarchar(25),> \n" +
            ")",
        param : ['pl_create_user:int','pl_lastup_user:int','pl_partikodu:string|25','pl_lotno:int','pl_stokkodu:string|25','pl_son_kullanim_tar:date']
    },
    TumSonAlisGetir :
    {
        query : "SELECT sth_cari_kodu AS CARI,sth_stok_kod AS STOK, " + 
        "ROUND((sth_tutar / sth_miktar),0)  AS SONFIYAT, " + 
        "sth_har_doviz_cinsi AS DOVIZ, " + 
        "ISNULL((SELECT dbo.fn_DovizSembolu(ISNULL(sth_har_doviz_cinsi,0))),'TL') AS DOVIZSEMBOL, " + 
        "ISNULL((SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(sth_har_doviz_cinsi,0),2)),1) AS DOVIZKUR " + 
        "FROM STOK_HAREKETLERI AS Hesaplama WHERE sth_evraktip IN (13,3) AND  " + 
        "sth_RECno = (SELECT TOP 1 sth_RECno FROM STOK_HAREKETLERI AS Hesaplama1  " + 
        "WHERE Hesaplama1.sth_evraktip IN (13,3)  AND Hesaplama1.sth_stok_kod = Hesaplama.sth_stok_kod  " + 
        "ORDER BY sth_create_date DESC) AND Hesaplama.sth_stok_kod  = @sth_stok_kod" , 
        param : ['sth_stok_kod'],
        type  : ['string|25']
    },
    MaxPartiLot : 
    {
        query : "SELECT ISNULL(MAX(pl_lotno),0) + 1 AS LOT " +
                "FROM PARTILOT  WHERE pl_partikodu = @pl_partikodu " ,
        param : ['pl_partikodu'],
        type : ['string|25']
    },
    RenkGetir :
    {
        query : "SELECT rnk_kirilimID AS PNTR , rnk_kirilim AS KIRILIM " +
                "FROM STOK_RENK_TANIMLARI_DIKEY WHERE rnk_kodu = @rnk_kodu " ,
        param : ['rnk_kodu'],
        type : ['string|25']
    },
    BedenGetir :
    {
        query : "SELECT bdn_kirilimID AS PNTR , bdn_kirilim AS KIRILIM " +
                "FROM STOK_BEDEN_TANIMLARI_DIKEY WHERE bdn_kodu = @bdn_kodu " ,
        param : ['bdn_kodu'],
        type : ['string|25']
    },
    SiparisKabulListele : 
    {
        query : "SELECT " +
                "CONVERT(VARCHAR(10),SIPARIS.sip_teslim_tarih,104) AS TESLIMTARIH, " +
                "SIPARIS.sip_evrakno_seri AS SERI, " +
                "SIPARIS.sip_evrakno_sira AS SIRA, " +
                "SUM(SIPARIS.sip_miktar) AS SIPMIKTAR, " +                     
                "SUM(SIPARIS.sip_teslim_miktar) AS TESLIMMIKTAR, " + 
                "SIPARIS.sip_depono AS DEPO, " + 
                "SIPARIS.sip_adresno AS ADRESNO, " +                    
                "SUM(SIPARIS.sip_miktar - SIPARIS.sip_teslim_miktar) AS BMIKTAR, " +
                "COUNT(SIPARIS.sip_satirno) AS SATIR, " +
                "CARI_HESAPLAR.cari_kod AS CARIKOD, " +             
                "CARI_HESAPLAR.cari_unvan1 AS CARIADI, " +
                "SIPARIS.sip_doviz_cinsi AS DOVIZCINSI, " +
                "MAX(SIPARIS.sip_cari_sormerk) AS SORUMLULUK, " +
                "MAX(SIPARIS.sip_satici_kod) AS PERSONEL, " +
                "MAX(sip_projekodu) AS PROJE, " +
                "MAX(SIPARIS.sip_opno) AS ODEMENO, " +
                "SIPARIS.sip_aciklama AS ACIKLAMA " +
                "FROM SIPARISLER AS SIPARIS INNER JOIN " +
                "BARKOD_TANIMLARI AS BARKOD ON SIPARIS.sip_stok_kod = BARKOD.bar_stokkodu " +
                "AND SIPARIS.sip_teslim_miktar < SIPARIS.sip_miktar INNER JOIN " +
                "CARI_HESAPLAR ON SIPARIS.sip_musteri_kod = CARI_HESAPLAR.cari_kod " +
                "WHERE SIPARIS.sip_teslim_tarih>=@ILKTARIH AND SIPARIS.sip_teslim_tarih<=@SONTARIH " +
                "AND SIPARIS.sip_depono=@DEPONO AND SIPARIS.sip_tip=@TIP " +
                "GROUP BY SIPARIS.sip_teslim_tarih,SIPARIS.sip_evrakno_seri,SIPARIS.sip_evrakno_sira,SIPARIS.sip_depono, " +
                "SIPARIS.sip_adresno,CARI_HESAPLAR.cari_kod,CARI_HESAPLAR.cari_unvan1,SIPARIS.sip_aciklama,SIPARIS.sip_doviz_cinsi " +
                "HAVING SUM(SIPARIS.sip_miktar - SIPARIS.sip_teslim_miktar) > 0 " +
                "ORDER BY sip_teslim_tarih",
        param : ['ILKTARIH','SONTARIH','DEPONO','TIP'],
        type : ['date','date','int','int']
    },    
    SiparisStokGetir :
    {
        query : "SELECT " +
                "CONVERT(NVARCHAR(50),SIPARIS.sip_RECid_RECno) AS RECNO, " +
                "MAX(BARKOD.bar_kodu) AS BARKOD, " +
                "SIPARIS.sip_stok_kod AS KODU, " +
                "STOK.sto_isim AS ADI, " +
                "SIPARIS.sip_tarih AS TARIH, " +
                "SIPARIS.sip_teslim_tarih AS TESLIMTARIH, " +
                "SIPARIS.sip_tip AS TIP, " +
                "SIPARIS.sip_cins AS CINS, " +
                "SIPARIS.sip_evrakno_seri AS SERI, " +
                "SIPARIS.sip_evrakno_sira AS SIRA, " +
                "SIPARIS.sip_satirno AS SATIRNO, " +
                "SIPARIS.sip_belgeno AS BELGENO, " +
                "SIPARIS.sip_belge_tarih AS BELGETARIH, " +
                "SIPARIS.sip_satici_kod AS SATICIKOD, " +
                "SIPARIS.sip_musteri_kod AS CARI, " +
                "SIPARIS.sip_b_fiyat AS FIYAT, " +
                "ISNULL(BEDENHAR.BdnHar_HarGor,SIPARIS.sip_miktar) AS SIPMIKTAR, " +
                "SIPARIS.sip_birim_pntr AS BIRIMPNTR, " +
                "ISNULL(BEDENHAR.BdnHar_TesMik,SIPARIS.sip_teslim_miktar) AS TESLIMMIKTAR, " +
                "SIPARIS.sip_tutar AS TUTAR, " +
                "SIPARIS.sip_iskonto_1 AS ISKONTO_1, " +
                "SIPARIS.sip_iskonto_2 AS ISKONTO_2, " +
                "SIPARIS.sip_iskonto_3 AS ISKONTO_3, " +
                "SIPARIS.sip_iskonto_4 AS ISKONTO_4, " +
                "SIPARIS.sip_iskonto_5 AS ISKONTO_5, " +
                "SIPARIS.sip_iskonto_6 AS ISKONTO_6, " +
                "SIPARIS.sip_vergi_pntr AS TOPTANVERGIPNTR, " +
                "SIPARIS.sip_vergi AS VERGI, " +
                "SIPARIS.sip_opno AS ODEMENO, " +
                "SIPARIS.sip_depono AS DEPO, " +
                "SIPARIS.sip_cari_sormerk AS CARISORUMLU, " +
                "SIPARIS.sip_stok_sormerk AS STOKSORUMLU, " +
                "SIPARIS.sip_doviz_cinsi AS DOVIZCINSI, " +
                "SIPARIS.sip_doviz_kuru AS DOVIZKURU, " +
                "SIPARIS.sip_alt_doviz_kuru AS ALTDOVIZKURU, " +
                "SIPARIS.sip_adresno AS ADRESNO, " +
                "SIPARIS.sip_iskonto1 AS ISKONTO1, " +
                "SIPARIS.sip_iskonto2 AS ISKONTO2, " +
                "SIPARIS.sip_iskonto3 AS ISKONTO3, " +
                "SIPARIS.sip_iskonto4 AS ISKONTO4, " +
                "SIPARIS.sip_iskonto5 AS ISKONTO5, " +
                "SIPARIS.sip_iskonto6 AS ISKONTO6, " +
                "SIPARIS.sip_isk1 AS ISK1, " +
                "SIPARIS.sip_isk2 AS ISK2, " +
                "SIPARIS.sip_isk3 AS ISK3, " +
                "SIPARIS.sip_isk4 AS ISK4, " +
                "SIPARIS.sip_isk5 AS ISK5, " +
                "SIPARIS.sip_isk6 AS ISK6, " +
                "ISNULL((BEDENHAR.BdnHar_HarGor - BEDENHAR.BdnHar_TesMik)	,(SIPARIS.sip_miktar - SIPARIS.sip_teslim_miktar)) AS BMIKTAR, " +
                "(SELECT dbo.fn_beden_kirilimi (CONVERT(integer,(BEDENHAR.BdnHar_BedenNo-1)/40)+1,sto_beden_kodu)) AS BEDEN, " +
                "(SELECT dbo.fn_renk_kirilimi (BEDENHAR.BdnHar_BedenNo-(CONVERT(integer,(BEDENHAR.BdnHar_BedenNo-1)/40)+1-1)*40,sto_renk_kodu)) AS RENK, " +
                "ISNULL(BEDENHAR.BdnHar_BedenNo,0) AS BEDENNO, " +
                "CAST(ISNULL(NULL,0) AS FLOAT) AS MIKTAR, " +
                "ISNULL((SELECT dbo.fn_DepodakiMiktar (STOK.sto_kod,@DEPONO  ,CONVERT(VARCHAR(10),GETDATE(),112))),0) AS DEPOMIKTAR, " +
                "(SELECT dbo.fn_StokBirimi (SIPARIS.sip_stok_kod,SIPARIS.sip_birim_pntr)) AS BIRIM, " +
                "0 AS BEDENPNTR, " +
                "0 AS RENKPNTR, " +
                "ISNULL((SELECT dbo.fn_StokBirimHesapla (SIPARIS.sip_stok_kod,BARKOD.bar_birimpntr,1,1)),1) AS KATSAYI, " +
                "(SELECT dbo.fn_VergiYuzde (SIPARIS.sip_vergi_pntr)) AS TOPTANVERGI, " +
                "STOK.sto_detay_takip AS DETAYTAKIP, " +
                "STOK.sto_siparis_dursun AS SIPARISDURSUN, " +
                "STOK.sto_malkabul_dursun AS MALKABULDURSUN, " +
                "MAX(sip_aciklama) AS ACIKLAMA, " +
                "MAX(sip_aciklama2) AS ACIKLAMA2, " +
                "MAX(sip_projekodu) AS PROJE, " +
                "MAX(CONVERT(NVARCHAR(50),sip_yetkili_recid_recno)) AS YETKILI, " +
                "sip_Exp_Imp_Kodu AS EXIMKODU, " +
                "bar_partikodu AS PARTI, " +
                "bar_lotno AS LOT " +
                "FROM SIPARISLER AS SIPARIS " + 
                "LEFT OUTER JOIN BARKOD_TANIMLARI AS BARKOD ON " +
                "BARKOD.bar_stokkodu = SIPARIS.sip_stok_kod " +
                //"AND BARKOD.bar_birimpntr =SIPARIS.sip_birim_pntr " +
                "LEFT OUTER JOIN BEDEN_HAREKETLERI AS BEDENHAR ON " +
                "BEDENHAR.[BdnHar_Tipi] = 9 AND BEDENHAR.BdnHar_DRECid_RECno = SIPARIS.sip_RECid_RECno " +
                "AND (SELECT dbo.fn_RenkBedenBarkodBul(BARKOD.bar_stokkodu,BEDENHAR.BdnHar_BedenNo)) = BARKOD.bar_kodu " +
                "INNER JOIN STOKLAR AS STOK ON " +
                "STOK.sto_kod = SIPARIS.sip_stok_kod " +
                "WHERE SIPARIS.sip_musteri_kod = @CARI " + 
                "AND ((SIPARIS.sip_evrakno_seri = @SERI OR (@SERI = '')) AND ((SIPARIS.sip_evrakno_sira = @SIRA) OR (@SIRA = 0))) " +
                "AND ((BARKOD.bar_kodu = @BARKOD OR STOK.sto_kod = @BARKOD) OR (@BARKOD = '')) " +
                "AND ISNULL(BEDENHAR.BdnHar_HarGor,SIPARIS.sip_miktar) > ISNULL(BEDENHAR.BdnHar_TesMik,SIPARIS.sip_teslim_miktar) " +
                "GROUP BY " + 
                "SIPARIS.sip_RECid_RECno, " +
                "SIPARIS.sip_stok_kod, " +
                "STOK.sto_isim, " +
                "SIPARIS.sip_tarih, " +
                "SIPARIS.sip_teslim_tarih, " +
                "SIPARIS.sip_tip, " +
                "SIPARIS.sip_cins, " +
                "SIPARIS.sip_evrakno_seri, " +
                "SIPARIS.sip_evrakno_sira, " +
                "SIPARIS.sip_satirno, " +
                "SIPARIS.sip_belgeno, " +
                "SIPARIS.sip_belge_tarih, " +
                "SIPARIS.sip_satici_kod, " +
                "SIPARIS.sip_musteri_kod, " +
                "SIPARIS.sip_b_fiyat, " +
                "SIPARIS.sip_miktar, " +
                "SIPARIS.sip_birim_pntr, " +
                "SIPARIS.sip_teslim_miktar, " +
                "SIPARIS.sip_tutar, " +
                "SIPARIS.sip_iskonto_1, " +
                "SIPARIS.sip_iskonto_2, " +
                "SIPARIS.sip_iskonto_3, " +
                "SIPARIS.sip_iskonto_4, " +
                "SIPARIS.sip_iskonto_5, " +
                "SIPARIS.sip_iskonto_6, " +
                "SIPARIS.sip_vergi_pntr, " +
                "SIPARIS.sip_vergi, " +
                "SIPARIS.sip_opno, " +
                "SIPARIS.sip_depono, " +
                "SIPARIS.sip_cari_sormerk, " +
                "SIPARIS.sip_stok_sormerk, " +
                "SIPARIS.sip_doviz_cinsi, " +
                "SIPARIS.sip_doviz_kuru, " +
                "SIPARIS.sip_alt_doviz_kuru, " +
                "SIPARIS.sip_adresno, " +
                "SIPARIS.sip_iskonto1, " +
                "SIPARIS.sip_iskonto2, " +
                "SIPARIS.sip_iskonto3, " +
                "SIPARIS.sip_iskonto4, " +
                "SIPARIS.sip_iskonto5, " +
                "SIPARIS.sip_iskonto6, " +
                "SIPARIS.sip_isk1, " +
                "SIPARIS.sip_isk2, " +
                "SIPARIS.sip_isk3, " +
                "SIPARIS.sip_isk4, " +
                "SIPARIS.sip_isk5, " +
                "SIPARIS.sip_isk6, " +
                "BARKOD.bar_bedenpntr, " +
                "BARKOD.bar_renkpntr, " +
                "STOK.sto_detay_takip, " +
                "STOK.sto_siparis_dursun, " +
                "STOK.sto_malkabul_dursun, " +
                "sip_Exp_Imp_Kodu, " +
                "bar_partikodu, " +
                "bar_lotno, " +
                "BARKOD.bar_birimpntr, " +
                "sto_beden_kodu, " +
                "sto_renk_kodu, " +
                "BEDENHAR.BdnHar_BedenNo, " +
                "STOK.sto_kod, " +
                "sip_aciklama2, " +
                "BEDENHAR.BdnHar_HarGor, " +
                "BEDENHAR.BdnHar_TesMik", 
        param : ['DEPONO','CARI','SERI','SIRA','BARKOD'],
        type : ['int','string|25','string|10','int','string|25']
    },
    //Sipariş
    SiparisInsert : 
    {
        query : "INSERT INTO [SIPARISLER] " +
                "([sip_RECid_DBCno] " + 
                ",[sip_RECid_RECno]" +
                ",[sip_SpecRECno] " +                
                ",[sip_iptal] " +
                ",[sip_fileid] " +
                ",[sip_hidden] " +
                ",[sip_kilitli] " +
                ",[sip_degisti] " +
                ",[sip_checksum] " +
                ",[sip_create_user] " +
                ",[sip_create_date] " +
                ",[sip_lastup_user] " +
                ",[sip_lastup_date] " +
                ",[sip_special1] " +
                ",[sip_special2] " +
                ",[sip_special3] " +
                ",[sip_firmano] " +
                ",[sip_subeno] " +
                ",[sip_tarih] " +
                ",[sip_teslim_tarih] " +
                ",[sip_tip] " +
                ",[sip_cins] " +
                ",[sip_evrakno_seri] " +
                ",[sip_evrakno_sira] " +
                ",[sip_satirno] " +
                ",[sip_belgeno] " +
                ",[sip_belge_tarih] " +
                ",[sip_satici_kod] " +
                ",[sip_musteri_kod] " +
                ",[sip_stok_kod] " +
                ",[sip_b_fiyat] " +
                ",[sip_miktar] " +
                ",[sip_birim_pntr] " +
                ",[sip_teslim_miktar] " +
                ",[sip_tutar] " +
                ",[sip_iskonto_1] " +
                ",[sip_iskonto_2] " +
                ",[sip_iskonto_3] " +
                ",[sip_iskonto_4] " +
                ",[sip_iskonto_5] " +
                ",[sip_iskonto_6] " +
                ",[sip_masraf_1] " +
                ",[sip_masraf_2] " +
                ",[sip_masraf_3] " +
                ",[sip_masraf_4] " +
                ",[sip_vergi_pntr] " +
                ",[sip_vergi] " +
                ",[sip_masvergi_pntr] " +
                ",[sip_masvergi] " +
                ",[sip_opno] " +
                ",[sip_aciklama] " +
                ",[sip_aciklama2] " +
                ",[sip_depono] " +
                ",[sip_OnaylayanKulNo] " +
                ",[sip_vergisiz_fl] " +
                ",[sip_kapat_fl] " +
                ",[sip_cari_sormerk] " +
                ",[sip_stok_sormerk] " +
                ",[sip_cari_grupno] " +
                ",[sip_doviz_cinsi] " +
                ",[sip_doviz_kuru] " +
                ",[sip_alt_doviz_kuru] " +
                ",[sip_adresno] " +
                ",[sip_teslimturu] " +
                ",[sip_cagrilabilir_fl] " +
                ",[sip_prosiprecDbId]" +
                ",[sip_prosiprecrecI]" +
                ",[sip_iskonto1] " +
                ",[sip_iskonto2] " +
                ",[sip_iskonto3] " +
                ",[sip_iskonto4] " +
                ",[sip_iskonto5] " +
                ",[sip_iskonto6] " +
                ",[sip_masraf1] " +
                ",[sip_masraf2] " +
                ",[sip_masraf3] " +
                ",[sip_masraf4] " +
                ",[sip_isk1] " +
                ",[sip_isk2] " +
                ",[sip_isk3] " +
                ",[sip_isk4] " +
                ",[sip_isk5] " +
                ",[sip_isk6] " +
                ",[sip_mas1] " +
                ",[sip_mas2] " +
                ",[sip_mas3] " +
                ",[sip_mas4] " +
                ",[sip_Exp_Imp_Kodu] " +
                ",[sip_kar_orani] " +
                ",[sip_durumu] " +
                ",[sip_stalRecId_DBCno] " +
                ",[sip_stalRecId_RECno] " +
                ",[sip_planlananmiktar] " +
                ",[sip_teklifRecId_DBCno]" +
                ",[sip_teklifRecId_RECno]" +
                ",[sip_parti_kodu] " +
                ",[sip_lot_no] " +
                ",[sip_projekodu] " +
                ",[sip_fiyat_liste_no] " +
                ",[sip_Otv_Pntr] " +
                ",[sip_Otv_Vergi] " +
                ",[sip_otvtutari] " +
                ",[sip_OtvVergisiz_Fl] " +
                ",[sip_paket_kod] " +
                ",[sip_RezRecId_DBCno]" +
                ",[sip_RezRecId_RECno]" +
                ",[sip_harekettipi] " +
                ",[sip_yetkili_recid_dbcno]" +
                ",[sip_yetkili_recid_recno]" +
                ",[sip_kapatmanedenkod] " +
                ",[sip_gecerlilik_tarihi] " +
                ",[sip_onodeme_evrak_tip] " +
                ",[sip_onodeme_evrak_seri] " +
                ",[sip_onodeme_evrak_sira] " +
                ",[sip_rezervasyon_miktari] " +
                ",[sip_rezerveden_teslim_edilen] " +
                ") " +
                "VALUES ( " +
                "0							                    --<sip_RECid_DBCno, smallint,> \n" +
                ",IDENT_CURRENT('SIPARISLER')             --<sip_RECid_RECno, int,> \n" +
                ",0							                    --<sip_SpecRECno, int,> \n" +
                ",0							                    --<sip_iptal, bit,> \n" +
                ",21						                    --<sip_fileid, smallint,> \n" +
                ",0							                    --<sip_hidden, bit,> \n" +
                ",0							                    --<sip_kilitli, bit,> \n" +
                ",0							                    --<sip_degisti, bit,> \n" +
                ",0							                    --<sip_checksum, int,> \n" +
                ",@sip_create_user			                    --<sip_create_user, smallint,> \n" +
                ",CONVERT(VARCHAR(10),GETDATE(),112)		    --<sip_create_date, datetime,> \n" +
                ",@sip_lastup_user			                    --<sip_lastup_user, smallint,> \n" +
                ",CONVERT(VARCHAR(10),GETDATE(),112)		    --<sip_lastup_date, datetime,> \n" +
                ",''							                --<sip_special1, varchar(4),> \n" +
                ",''							                --<sip_special2, varchar(4),> \n" +
                ",''							                --<sip_special3, varchar(4),> \n" +
                ",@sip_firmano					                --<sip_firmano, int,> \n" +
                ",@sip_subeno						            --<sip_subeno, int,> \n" +
                ",@sip_tarih					                --<sip_tarih, datetime,> \n" +
                ",@sip_teslim_tarih			                    --<sip_teslim_tarih, datetime,> \n" +
                ",@sip_tip					                    --<sip_tip, tinyint,> \n" +
                ",@sip_cins					                    --<sip_cins, tinyint,> \n" +
                ",@sip_evrakno_seri			                    --<sip_evrakno_seri, varchar(4),> \n" +
                ",@sip_evrakno_sira			                    --<sip_evrakno_sira, int,> \n" +
                ",(SELECT ISNULL(MAX(sip_satirno),-1) + 1 AS SATIRNO FROM SIPARISLER WHERE sip_evrakno_seri = @sip_evrakno_seri AND sip_evrakno_sira = @sip_evrakno_sira AND sip_tip = @sip_tip AND sip_cins = @sip_cins)				                    --<sip_satirno, int,> \n" +
                ",@sip_belgeno				                    --<sip_belgeno, varchar(15),> \n" +
                ",@sip_belge_tarih			                    --<sip_belge_tarih, datetime,> \n" +
                ",@sip_satici_kod				                --<sip_satici_kod, varchar(25),> \n" +
                ",@sip_musteri_kod			                    --<sip_musteri_kod, varchar(25),> \n" +
                ",@sip_stok_kod				                    --<sip_stok_kod, varchar(25),> \n" +
                ",@sip_b_fiyat				                    --<sip_b_fiyat, float,> \n" +
                ",@sip_miktar					                --<sip_miktar, float,> \n" +
                ",@sip_birim_pntr				                --<sip_birim_pntr, tinyint,> \n" +
                ",@sip_teslim_miktar			                --<sip_teslim_miktar, float,> \n" +
                ",@sip_tutar					                --<sip_tutar, float,> \n" +
                ",@sip_iskonto_1				                --<sip_iskonto_1, float,> \n" +
                ",@sip_iskonto_2				                --<sip_iskonto_2, float,> \n" +
                ",@sip_iskonto_3				                --<sip_iskonto_3, float,> \n" +
                ",@sip_iskonto_4				                --<sip_iskonto_4, float,> \n" +
                ",@sip_iskonto_5				                --<sip_iskonto_5, float,> \n" +
                ",@sip_iskonto_6				                --<sip_iskonto_6, float,> \n" +
                ",0							                    --<sip_masraf_1, float,> \n" +
                ",0							                    --<sip_masraf_2, float,> \n" +
                ",0							                    --<sip_masraf_3, float,> \n" +
                ",0							                    --<sip_masraf_4, float,> \n" +
                ",@sip_vergi_pntr				                --<sip_vergi_pntr, tinyint,> \n" +
                ",@sip_vergi					                --<sip_vergi, float,> \n" +
                ",0							                    --<sip_masvergi_pntr, tinyint,> \n" +
                ",0							                    --<sip_masvergi, float,> \n" +
                ",@sip_opno					                    --<sip_opno, int,> \n" +
                ",@sip_aciklama				                    --<sip_aciklama, varchar(40),> \n" +
                ",''							                --<sip_aciklama2, varchar(40),> \n" +
                ",@sip_depono					                --<sip_depono, int,> \n" +
                ",0							                    --<sip_OnaylayanKulNo, smallint,> \n" +
                ",0							                    --<sip_vergisiz_fl, bit,> \n" +
                ",0							                    --<sip_kapat_fl, bit,> \n" +
                ",@sip_cari_sormerk			                    --<sip_cari_sormerk, varchar(25),> \n" +
                ",@sip_stok_sormerk			                    --<sip_stok_sormerk, varchar(25),> \n" +
                ",0							                    --<sip_cari_grupno, tinyint,> \n" +
                ",@sip_doviz_cinsi			                    --<sip_doviz_cinsi, tinyint,> \n" +
                ",@sip_doviz_kuru				                --<sip_doviz_kuru, float,> \n" +
                ",@sip_alt_doviz_kuru			                --<sip_alt_doviz_kuru, float,> \n" +
                ",@sip_adresno							        --<sip_adresno, int,> \n" +
                ",''							                --<sip_teslimturu, varchar(4),> \n" +
                ",1							                    --<sip_cagrilabilir_fl, bit,> \n" +
                ",0                                         	--<sip_prosiprecDbId> \n" +
                ",0                                             --<sip_prosiprecrecI> \n" +
                ",@sip_iskonto1				                    --<sip_iskonto1, tinyint,> \n" +
                ",@sip_iskonto2				                    --<sip_iskonto2, tinyint,> \n" +
                ",@sip_iskonto3				                    --<sip_iskonto3, tinyint,> \n" +
                ",@sip_iskonto4				                    --<sip_iskonto4, tinyint,> \n" +
                ",@sip_iskonto5				                    --<sip_iskonto5, tinyint,> \n" +
                ",@sip_iskonto6				                    --<sip_iskonto6, tinyint,> \n" +
                ",1							                    --<sip_masraf1, tinyint,> \n" +
                ",1							                    --<sip_masraf2, tinyint,> \n" +
                ",1							                    --<sip_masraf3, tinyint,> \n" +
                ",1							                    --<sip_masraf4, tinyint,> \n" +
                ",@sip_isk1					                    --<sip_isk1, bit,> \n" +
                ",@sip_isk2					                    --<sip_isk2, bit,> \n" +
                ",@sip_isk3					                    --<sip_isk3, bit,> \n" +
                ",@sip_isk4					                    --<sip_isk4, bit,> \n" +
                ",@sip_isk5					                    --<sip_isk5, bit,> \n" +
                ",@sip_isk6					                    --<sip_isk6, bit,> \n" +
                ",0							                    --<sip_mas1, bit,> \n" +
                ",0							                    --<sip_mas2, bit,> \n" +
                ",0							                    --<sip_mas3, bit,> \n" +
                ",0							                    --<sip_mas4, bit,> \n" +
                ",''							                --<sip_Exp_Imp_Kodu, varchar(25),> \n" +
                ",0							                    --<sip_kar_orani, float,> \n" +
                ",0							                    --<sip_durumu, tinyint,> \n" +
                ",0                                         	--<sip_stalRecId_DBCno> \n" +
                ",0                                         	--<sip_stalRecId_RECno> \n" +
                ",0							                    --<sip_planlananmiktar, float,> \n" +
                ",0                                         	--<sip_teklifRecId_DBCno> \n" +
                ",0                                         	--<sip_teklifRecId_RECno> \n" +
                ",@sip_parti_kodu					            --<sip_parti_kodu, varchar(25),> \n" +
                ",@sip_lot_no						            --<sip_lot_no, int,> \n" +
                ",@sip_projekodu					            --<sip_projekodu, varchar(25),> \n" +
                ",@sip_fiyat_liste_no					        --<sip_fiyat_liste_no, int,> \n" +
                ",0							                    --<sip_Otv_Pntr, tinyint,> \n" +
                ",0							                    --<sip_Otv_Vergi, float,> \n" +
                ",0							                    --<sip_otvtutari, float,> \n" +
                ",0							                    --<sip_OtvVergisiz_Fl, tinyint,> \n" +
                ",''							                --<sip_paket_kod, varchar(25),> \n" +
                ",0                                            	--<sip_RezRecId_DBCno> \n" +
                ",0                                            	--<sip_RezRecId_RECno> \n" +
                ",0                                             --<sip_harekettipi, tinyint,> \n" +
                ",0                                         	--<sip_yetkili_yetkili_recid_dbcno> \n" +
                ",0                                         	--<sip_yetkili_yetkili_recid_recno> \n" +
                ",''							                --<sip_kapatmanedenkod> \n" +
                ",CONVERT(VARCHAR(10),GETDATE(),112)			--<sip_gecerlilik_tarihi> \n" +
                ",0							                    --<sip_onodeme_evrak_tip> \n" +
                ",''							                --<sip_onodeme_evrak_seri> \n" +
                ",0							                    --<sip_onodeme_evrak_sira> \n" +
                ",@sip_rezervasyon_miktari 				        --<sip_rezervasyon_miktari> \n" +
                ",@sip_rezerveden_teslim_edilen			        --<sip_rezerveden_teslim_edilen> \n" +
                ") ",
        param : ['sip_create_user:int','sip_lastup_user:int','sip_firmano:int','sip_subeno:int','sip_tarih:date','sip_teslim_tarih:date','sip_tip:int',
                 'sip_cins:int','sip_evrakno_seri:string|4','sip_evrakno_sira:int','sip_belgeno:string|15','sip_belge_tarih:date','sip_satici_kod:string|25',
                 'sip_musteri_kod:string|25','sip_stok_kod:string|25','sip_b_fiyat:float','sip_miktar:float','sip_birim_pntr:int','sip_teslim_miktar:float',
                 'sip_tutar:float','sip_iskonto_1:float','sip_iskonto_2:float','sip_iskonto_3:float','sip_iskonto_4:float','sip_iskonto_5:float',
                 'sip_iskonto_6:float','sip_vergi_pntr:int','sip_vergi:float','sip_opno:int','sip_aciklama:string|40','sip_depono:int',
                 'sip_cari_sormerk:string|25','sip_stok_sormerk:string|25','sip_doviz_cinsi:int','sip_doviz_kuru:float','sip_alt_doviz_kuru:float',
                 'sip_adresno:int','sip_iskonto1:int','sip_iskonto2:int','sip_iskonto3:int','sip_iskonto4:int','sip_iskonto5:int','sip_iskonto6:int',
                 'sip_isk1:bit','sip_isk2:bit','sip_isk3:bit','sip_isk4:bit','sip_isk5:bit','sip_isk6:bit','sip_parti_kodu:string|25','sip_lot_no:int',
                 'sip_projekodu:string|25','sip_fiyat_liste_no:int','sip_rezervasyon_miktari:float','sip_rezerveden_teslim_edilen:float']
    },
    SiparisGetir:
    {
        query:  "SELECT ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod = sip_stok_kod),'') AS ADI, " + 
                "(sip_tutar / sip_miktar) AS FIYAT, " + 
                "ROW_NUMBER() OVER(ORDER BY sip_RECno) AS NO, " +   
                "* FROM SIPARISLER WHERE sip_evrakno_seri = @sip_evrakno_seri AND " +
                "sip_evrakno_sira = @sip_evrakno_sira and sip_tip = @sip_tip and sip_cins = @sip_cins " +
                "ORDER BY sip_satirno ASC",
        param:  ['sip_evrakno_seri','sip_evrakno_sira','sip_tip','sip_cins'],
        type:   ['string|20','int','int','int']
    },
    SiparisEvrDelete:
    {
        query:  "DELETE FROM SIPARISLER WHERE sip_evrakno_seri = @sip_evrakno_seri AND " + 
                "sip_evrakno_sira = @sip_evrakno_sira and sip_tip = @sip_tip and sip_cins = @sip_cins",
        param:  ['sip_evrakno_seri','sip_evrakno_sira','sip_tip','sip_cins'],
        type:   ['string|20','int','int','int']
    },
    SiparisSatirDelete:
    {
        query:  "DELETE FROM SIPARISLER WHERE sip_RECno = @sip_RECno",
        param:  ['sip_RECno'],
        type:   ['int']
    },
    SiparisUpdate:
    {
        query:  "UPDATE SIPARISLER " +
                "SET sip_b_fiyat=@sip_b_fiyat " + 
                ",sip_miktar=@sip_miktar " +
                ",sip_tutar=@sip_tutar " +
                ",sip_vergi= @sip_tutar * (SELECT [dbo].[fn_VergiYuzde] (@sip_vergi_pntr) / 100) " +
                ",sip_iskonto_1=@sip_iskonto_1 " +
                ",sip_iskonto_2=@sip_iskonto_2 " +
                ",sip_iskonto_3=@sip_iskonto_3 " +
                ",sip_iskonto_4=@sip_iskonto_4 " +
                ",sip_iskonto_5=@sip_iskonto_5 " +
                ",sip_iskonto_6=@sip_iskonto_6 " +
                ",sip_isk1=@sip_isk1 " +
                ",sip_isk2=@sip_isk2 " +
                ",sip_isk3=@sip_isk3 " +
                ",sip_isk4=@sip_isk4 " +
                ",sip_isk5=@sip_isk5 " +
                ",sip_isk6=@sip_isk6 " +
                "WHERE  sip_RECno = @sip_RECno",
        param : ['sip_b_fiyat:float','sip_miktar:float','sip_tutar:float','sip_vergi_pntr:int','sip_iskonto_1:float','sip_iskonto_2:float','sip_iskonto_3:float',
        'sip_iskonto_4:float','sip_iskonto_5:float','sip_iskonto_6:float','sip_isk1:bit','sip_isk2:bit','sip_isk3:bit','sip_isk4:bit',
        'sip_isk5:bit','sip_isk6:bit','sip_RECno:int']
    },
    StokHarSiparisUpdate :
    {
        query : "UPDATE SIPARISLER SET sip_teslim_miktar = sip_teslim_miktar + @sip_teslim_miktar WHERE sip_RECno = @sip_RECno ",
        param : ['sip_teslim_miktar:int','sip_RECno:int']
    },
    SiparisListeGetir :
    {
        query : "SELECT " +
                "(sip_miktar - sip_teslim_miktar) AS BMIKTAR, " +
                "(SELECT sto_isim FROM STOKLAR WHERE sto_kod = sip_stok_kod) AS ADI, " +
                "sip_stok_kod AS KOD, " +
                "BdnHar_BedenNo, " +
                "ISNULL((dbo.fn_renk_kirilimi (dbo.fn_bedenharnodan_renk_no_bul (BdnHar_BedenNo),(SELECT sto_renk_kodu FROM STOKLAR WHERE STOKLAR.sto_kod = SIPARISLER.sip_stok_kod))),'') AS RENK, " +
                "ISNULL((dbo.fn_beden_kirilimi (dbo.fn_bedenharnodan_beden_no_bul (BdnHar_BedenNo),(SELECT sto_beden_kodu FROM STOKLAR WHERE STOKLAR.sto_kod = SIPARISLER.sip_stok_kod))),'') AS BEDEN " +
                "FROM SIPARISLER LEFT OUTER JOIN BEDEN_HAREKETLERI ON sip_RECno = BdnHar_RECno " +
                "WHERE sip_depono =@sip_depono AND sip_musteri_kod =@sip_musteri_kod AND sip_evrakno_seri =@sip_evrakno_seri AND sip_evrakno_sira =@sip_evrakno_sira AND sip_tip = @sip_tip and (sip_miktar - sip_teslim_miktar) > 0",
        param : ['sip_depono','sip_musteri_kod','sip_evrakno_seri','sip_evrakno_sira','sip_tip'],
        type : ['string|15','string|25','string|10','int','int']       
    },
    MaxSiparisSira : 
    {
        query : "SELECT ISNULL(MAX(sip_evrakno_sira),0) + 1 AS MAXEVRSIRA FROM SIPARISLER " +
                "WHERE sip_evrakno_seri=@sip_evrakno_seri AND sip_tip=@sip_tip AND sip_cins=@sip_cins",
        param : ['sip_evrakno_seri','sip_tip','sip_cins'],
        type : ['string|20','int','int']
    },
     //Beden Hareket
     BedenHarInsert :
     {
         query:  "INSERT INTO [BEDEN_HAREKETLERI] ( " +
                 "[BdnHar_DBCno] " + 
                 ",[BdnHar_Spec_Rec_no] " +
                 ",[BdnHar_iptal] " +
                 ",[BdnHar_fileid] " +
                 ",[BdnHar_hidden] " +
                 ",[BdnHar_kilitli] " +
                 ",[BdnHar_degisti] " +
                 ",[BdnHar_checksum] " +
                 ",[BdnHar_create_user] " +
                 ",[BdnHar_create_date] " +
                 ",[BdnHar_lastup_user] " +
                 ",[BdnHar_lastup_date] " +
                 ",[BdnHar_special1] " +
                 ",[BdnHar_special2] " +
                 ",[BdnHar_special3] " +
                 ",[BdnHar_Tipi] " +
                 ",[BdnHar_Har_uid] " +
                 ",[BdnHar_BedenNo] " +
                 ",[BdnHar_HarGor] " +
                 ",[BdnHar_KnsIsGor] " +
                 ",[BdnHar_KnsFat] " +
                 ",[BdnHar_TesMik] " +
                 ",[BdnHar_rezervasyon_miktari] " +
                 ",[BdnHar_rezerveden_teslim_edilen] " +
                 ") VALUES ( " +
                 "0			 		                    --BdnHar_DBCno,  smallint,> \n" +
                 ",0					                    --<BdnHar_Spec_Rec_no, int,> \n" +
                 ",0		 			                    --<BdnHar_iptal, bit,> \n" +
                 ",113		 		                    --<BdnHar_fileid, smallint,> \n" +
                 ",0		 			                    --<BdnHar_hidden, bit,> \n" +
                 ",0					                    --<BdnHar_kilitli, bit,> \n" +
                 ",0		 			                    --<BdnHar_degisti, bit,> \n" +
                 ",0		 			                    --<BdnHar_checksum, int,> \n" +
                 ",@BdnHar_create_user 		            --<BdnHar_create_user, smallint,> \n" +
                 ",CONVERT(VARCHAR(10),GETDATE(),112) 	--<BdnHar_create_date, datetime,> \n" +
                 ",@BdnHar_lastup_user 		            --<BdnHar_lastup_user, smallint,> \n" +
                 ",CONVERT(VARCHAR(10),GETDATE(),112) 	--<BdnHar_lastup_date, datetime,> \n" +
                 ",''		 			                --<BdnHar_special1, varchar(4),> \n" +
                 ",''		 			                --<BdnHar_special2, varchar(4),> \n" +
                 ",''		 			                --<BdnHar_special3, varchar(4),> \n" +
                 ",@BdnHar_Tipi		                    --<BdnHar_Tipi, char(1),> \n" +
                 ",@BdnHar_Har_uid    		            --<BdnHar_Har_uid, int,> \n" +
                 ",@BdnHar_BedenNo 			            --<BdnHar_BedenNo, smallint,> \n" +
                 ",@BdnHar_HarGor 			            --<BdnHar_HarGor, float,> \n" +
                 ",0		 			                    --<BdnHar_KnsIsGor, float,> \n" +
                 ",0		 			                    --<BdnHar_KnsFat, float,> \n" +
                 ",0					                    --<BdnHar_TesMik, float,> \n" +
                 ",@BdnHar_rezervasyon_miktari			--<BdnHar_rezervasyon_miktari, float,>\n" +
                 ",@BdnHar_rezerveden_teslim_edilen		--<BdnHar_rezerveden_teslim_edilen, float,>\n" +
                 ")",
         param:  ['BdnHar_create_user:int','BdnHar_lastup_user:int','BdnHar_Tipi:int','BdnHar_Har_uid:string|50','BdnHar_BedenNo:int','BdnHar_HarGor:float',
                  'BdnHar_rezervasyon_miktari:float','BdnHar_rezerveden_teslim_edilen:float']
     },
     BedenHarUpdate :
     {
         query:  "UPDATE BEDEN_HAREKETLERI " +
                 "SET BdnHar_HarGor=@BdnHar_HarGor " +
                 ",BdnHar_rezervasyon_miktari=@BdnHar_rezervasyon_miktari " + 
                 ",BdnHar_rezerveden_teslim_edilen=@BdnHar_rezerveden_teslim_edilen " +
                 "WHERE  BdnHar_Har_uid = @BdnHar_Har_uid AND BdnHar_Tipi = @BdnHar_Tipi AND BdnHar_BedenNo = @BdnHar_BedenNo",
         param:  ['BdnHar_Tipi:int','BdnHar_Har_uid:string|50','BdnHar_BedenNo:int','BdnHar_HarGor:float',
                  'BdnHar_rezervasyon_miktari:float','BdnHar_rezerveden_teslim_edilen:float']
     },
     BedenHarGetir:
     {
         query:  "SELECT * FROM BEDEN_HAREKETLERI WHERE BdnHar_Har_uid IN ((SELECT sip_Guid FROM SIPARISLER WHERE sip_evrakno_seri = @sip_evrakno_seri AND sip_evrakno_sira = @sip_evrakno_sira AND sip_tip = @sip_tip)) AND BdnHar_Tipi = @BdnHar_Tipi",
         param:  ['sip_evrakno_seri','sip_evrakno_sira','sip_tip','BdnHar_Tipi'],
         type:   ['string|20','int','int','int']
     },
     BedenHarDelete : 
     {
         query:  "DELETE BEDEN_HAREKETLERI WHERE BdnHar_Har_uid = @BdnHar_Har_uid AND BdnHar_Tipi = @BdnHar_Tipi",
         param:  ['BdnHar_Har_uid','BdnHar_Tipi'],
         type:   ['string|50','int']
     },
    //Sayım
    SayimGetir : 
    {
        query: "SELECT ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod = sym_Stokkodu),'') AS ADI, " +
                "ROW_NUMBER() OVER(ORDER BY sym_RECno) AS NO, " +
                "* FROM SAYIM_SONUCLARI " +
                "WHERE sym_depono = @sym_depono AND sym_evrakno = @sym_evrakno AND sym_tarihi = @sym_tarihi ORDER BY sym_lastup_date DESC" ,
        param: ['sym_depono','sym_evrakno','sym_tarihi'],
        type:  ['int','int','date'] 
    },
    SayimInsert :
    {
        query : "INSERT INTO [SAYIM_SONUCLARI] " +
                "([sym_RECid_DBCno] " +
                ",[sym_RECid_RECno] " +
                ",[sym_SpecRECno] " +
                ",[sym_iptal] " +
                ",[sym_fileid] " +
                ",[sym_hidden] " +
                ",[sym_kilitli] " +
                ",[sym_degisti] " +
                ",[sym_checksum] " +
                ",[sym_create_user] " +
                ",[sym_create_date] " +
                ",[sym_lastup_user] " +
                ",[sym_lastup_date] " +
                ",[sym_special1] " +
                ",[sym_special2] " +
                ",[sym_special3] " +
                ",[sym_tarihi] " +
                ",[sym_depono] " +
                ",[sym_evrakno] " +
                ",[sym_satirno] " +
                ",[sym_Stokkodu] " +
                ",[sym_reyonkodu] " +
                ",[sym_koridorkodu] " +
                ",[sym_rafkodu] " +
                ",[sym_miktar1] " +
                ",[sym_miktar2] " +
                ",[sym_miktar3] " +
                ",[sym_miktar4] " +
                ",[sym_miktar5] " +
                ",[sym_birim_pntr] " +
                ",[sym_barkod] " +
                ",[sym_renkno] " +
                ",[sym_bedenno] " +
                ",[sym_parti_kodu] " +
                ",[sym_lot_no] " +
                ",[sym_serino] " +
                ") VALUES ( " +
                "0					--<sym_RECid_DBCno, smallint,> \n" +
                ",IDENT_CURRENT('SAYIM_SONUCLARI') 			--<sym_RECid_RECno, int,> \n" +
                ",0		 			--<sym_SpecRECno, int,> \n" +
                ",0	 				--<sym_iptal, bit,> \n" +
                ",28		 			--<sym_fileid, smallint,> \n" +
                ",0		 			--<sym_hidden, bit,> \n" +
                ",0		 			--<sym_kilitli, bit,> \n" +
                ",0		 			--<sym_degisti, bit,> \n" +
                ",0		 			--<sym_checksum, int,> \n" +
                ",@sym_create_user 			--<sym_create_user, smallint,> \n" +
                ",CONVERT(VARCHAR(10),GETDATE(),112) 		--<sym_create_date, datetime,> \n" +
                ",@sym_lastup_user 				--<sym_lastup_user, smallint,> \n" +
                ",CONVERT(VARCHAR(10),GETDATE(),112) 		--<sym_lastup_date, datetime,> \n" +
                ",''		 			--<sym_special1, varchar(4),> \n" +
                ",''		 			--<sym_special2, varchar(4),> \n" +
                ",''		 			--<sym_special3, varchar(4),> \n" +
                ",@sym_tarihi 			--<sym_tarihi, datetime,> \n" +
                ",@sym_depono 			--<sym_depono, int,> \n" +
                ",@sym_evrakno 			--<sym_evrakno, int,> \n" +
                ",(SELECT ISNULL(MAX(sym_satirno),-1) + 1 FROM SAYIM_SONUCLARI WHERE sym_evrakno=@sym_evrakno AND sym_depono=@sym_depono AND sym_tarihi=@sym_tarihi)			--<sym_satirno, int,> \n" +
                ",@sym_Stokkodu 		--<sym_Stokkodu, varchar(25),> \n" +
                ",''		 		--<sym_reyonkodu, varchar(4),> \n" +
                ",''		 		--<sym_koridorkodu, varchar(4),> \n" +
                ",''		 		--<sym_rafkodu, varchar(4),> \n" +
                ",@sym_miktar1 		--<sym_miktar1, float,> \n" +
                ",0		 		--<sym_miktar2, float,> \n" +
                ",0		 		--<sym_miktar3, float,> \n" +
                ",0		 		--<sym_miktar4, float,> \n" +
                ",0		 		--<sym_miktar5, float,> \n" +
                ",@sym_birim_pntr 		--<sym_birim_pntr, tinyint,> \n" +
                ",@sym_barkod 		--<sym_barkod, varchar(25),> \n" +
                ",@sym_renkno 		--<sym_renkno, int,> \n" +
                ",@sym_bedenno 		--<sym_bedenno, int,> \n" +
                ",@sym_parti_kodu 		--<sym_parti_kodu, varchar(25),> \n" +
                ",@sym_lot_no	 		--<sym_lot_no, int,> \n" +
                ",@sym_serino			--<sym_serino, varchar(25),> \n" +
                ")" +
                "SELECT ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod = sym_Stokkodu),'') AS ADI, " +
                "ROW_NUMBER() OVER(ORDER BY sym_RECno) AS NO,*  FROM SAYIM_SONUCLARI WHERE sym_tarihi = @sym_tarihi AND " +
                "sym_depono = @sym_depono AND sym_evrakno = @sym_evrakno  ",
            param : ["sym_create_user:int","sym_lastup_user:int","sym_tarihi:date","sym_depono:int","sym_evrakno:int","sym_Stokkodu:string|25",
                    "sym_miktar1:float","sym_birim_pntr:int","sym_barkod:string|25","sym_renkno:int","sym_bedenno:int","sym_parti_kodu:string|25",
                    "sym_lot_no:int","sym_serino:string|25"]
    },
    SayimEvrDelete :
    {
        query: "DELETE FROM SAYIM_SONUCLARI WHERE sym_evrakno = @sym_evrakno AND " +
                "sym_tarihi=@sym_tarihi and sym_depono = @sym_depono",
        param:  ['sym_evrakno','sym_tarihi','sym_depono'],
        type:   ["int","date","int"]
    },
    SayimSatirDelete :
    {
        query : "DELETE FROM SAYIM_SONUCLARI WHERE sym_RECno = @sym_RECno",
        param : ['sym_RECno'],
        type : ['int']
    },
    SayimUpdate : 
    {
        query : "UPDATE SAYIM_SONUCLARI " +
                "SET sym_miktar1 = @sym_miktar1 " +
                ",sym_miktar2 = @sym_miktar2 " +
                ",sym_miktar3 = @sym_miktar3 " +
                ",sym_miktar4 = @sym_miktar4 " +
                ",sym_miktar5 = @sym_miktar5 " +
                ",sym_lastup_date = GETDATE() " +
                "WHERE sym_RECno = @sym_RECno",
        param : ['sym_miktar1','sym_miktar2','sym_miktar3','sym_miktar4','sym_miktar5','sym_RECno'],
        type : ['int','int','int','int','int','int']
    },
    MaxSayimSira :
    {
        query : "SELECT ISNULL(MAX(sym_evrakno),0) + 1 AS MAXEVRSIRA FROM SAYIM_SONUCLARI " +
                "WHERE sym_depono = @sym_depono AND sym_tarihi = @sym_tarihi " ,
        param : ['sym_depono','sym_tarihi'],
        type : ['int','date']
    },
    //Stok Hareket
    StokHarGetir : 
    {
        query:  "SELECT CONVERT(VARCHAR(10),GETDATE(),112) AS sth_kur_tarihi , " +
                "ISNULL((SELECT sto_isim from STOKLAR WHERE sto_kod=sth_stok_kod),'') AS ADI , " +
                "(sth_tutar / sth_miktar) AS FIYAT, " +
                "sth_miktar AS MIKTAR , " +
                "sth_miktar2 AS MIKTAR2 , " +
                "(SELECT dbo.fn_VergiYuzde (sth_vergi_pntr)) AS TOPTANVERGI, " +
                "ROW_NUMBER() OVER(ORDER BY sth_RECid_RECno) AS NO, " +   
                "sth_RECid_RECno AS sth_Guid, " + 
                "* FROM STOK_HAREKETLERI " +
                "WHERE sth_evrakno_seri=@sth_evrakno_seri AND sth_evrakno_sira=@sth_evrakno_sira AND sth_evraktip=@sth_evraktip ORDER BY sth_satirno " ,
        param:   ['sth_evrakno_seri','sth_evrakno_sira','sth_evraktip'],
        type:    ['string|20','int','int']
    },
    StokHarInsert : 
    {
        query : "INSERT INTO [STOK_HAREKETLERI] " +
                "([sth_RECid_DBCno] " +
                ",[sth_RECid_RECno] " +
                ",[sth_SpecRECno] " +
                ",[sth_iptal] " +
                ",[sth_fileid] " +
                ",[sth_hidden] " +
                ",[sth_kilitli] " +
                ",[sth_degisti] " +
                ",[sth_checksum] " +
                ",[sth_create_user] " +
                ",[sth_create_date] " +
                ",[sth_lastup_user] " +
                ",[sth_lastup_date] " +
                ",[sth_special1] " +
                ",[sth_special2] " +
                ",[sth_special3] " +
                ",[sth_firmano] " +
                ",[sth_subeno] " +
                ",[sth_tarih] " +
                ",[sth_tip] " +
                ",[sth_cins] " +
                ",[sth_normal_iade] " +
                ",[sth_evraktip] " +
                ",[sth_evrakno_seri] " +
                ",[sth_evrakno_sira] " +
                ",[sth_satirno] " +
                ",[sth_belge_no] " +
                ",[sth_belge_tarih] " +
                ",[sth_stok_kod] " +
                ",[sth_isk_mas1] " +
                ",[sth_isk_mas2] " +
                ",[sth_isk_mas3] " +
                ",[sth_isk_mas4] " +
                ",[sth_isk_mas5] " +
                ",[sth_isk_mas6] " + 
                ",[sth_isk_mas7] " +
                ",[sth_isk_mas8] " +
                ",[sth_isk_mas9] " +
                ",[sth_isk_mas10] " +
                ",[sth_sat_iskmas1] " +
                ",[sth_sat_iskmas2] " +
                ",[sth_sat_iskmas3] " +
                ",[sth_sat_iskmas4] " +
                ",[sth_sat_iskmas5] " +
                ",[sth_sat_iskmas6] " +
                ",[sth_sat_iskmas7] " +
                ",[sth_sat_iskmas8] " +
                ",[sth_sat_iskmas9] " +
                ",[sth_sat_iskmas10] " +
                ",[sth_pos_satis] " +
                ",[sth_promosyon_fl] " +
                ",[sth_cari_cinsi] " +
                ",[sth_cari_kodu] " +
                ",[sth_cari_grup_no] " +
                ",[sth_isemri_gider_kodu] " +
                ",[sth_plasiyer_kodu] " +
                ",[sth_har_doviz_cinsi] " +
                ",[sth_har_doviz_kuru] " +
                ",[sth_alt_doviz_kuru] " +
                ",[sth_stok_doviz_cinsi] " +
                ",[sth_stok_doviz_kuru] " +
                ",[sth_miktar] " +
                ",[sth_miktar2] " +
                ",[sth_birim_pntr] " +
                ",[sth_tutar] " +
                ",[sth_iskonto1] " +
                ",[sth_iskonto2] " +
                ",[sth_iskonto3] " +
                ",[sth_iskonto4] " +
                ",[sth_iskonto5] " +
                ",[sth_iskonto6] " +
                ",[sth_masraf1] " +
                ",[sth_masraf2] " +
                ",[sth_masraf3] " +
                ",[sth_masraf4] " +
                ",[sth_vergi_pntr] " +
                ",[sth_vergi] " +
                ",[sth_masraf_vergi_pntr] " +
                ",[sth_masraf_vergi] " +
                ",[sth_netagirlik] " +
                ",[sth_odeme_op] " +
                ",[sth_aciklama] " +
                ",[sth_sip_recid_dbcno] " +
                ",[sth_sip_recid_recno] " +
                ",[sth_fat_recid_dbcno] " +
                ",[sth_fat_recid_recno] " +
                ",[sth_giris_depo_no] " +
                ",[sth_cikis_depo_no] " +
                ",[sth_malkbl_sevk_tarihi] " +
                ",[sth_cari_srm_merkezi] " +
                ",[sth_stok_srm_merkezi] " +
                ",[sth_fis_tarihi] " +
                ",[sth_fis_sirano] " +
                ",[sth_vergisiz_fl] " +
                ",[sth_maliyet_ana] " +
                ",[sth_maliyet_alternatif] " +
                ",[sth_maliyet_orjinal] " +
                ",[sth_adres_no] " +
                ",[sth_parti_kodu] " +
                ",[sth_lot_no] " +
                ",[sth_kons_recid_dbcno] " +
                ",[sth_kons_recid_recno] " +
                ",[sth_proje_kodu] " +
                ",[sth_exim_kodu] " +
                ",[sth_otv_pntr] " +
                ",[sth_otv_vergi] " +
                ",[sth_brutagirlik] " +
                ",[sth_disticaret_turu] " +
                ",[sth_otvtutari] " +
                ",[sth_otvvergisiz_fl] " +
                ",[sth_oiv_pntr] " +
                ",[sth_oiv_vergi] " +
                ",[sth_oivvergisiz_fl] " +
                ",[sth_fiyat_liste_no] " +
                ",[sth_oivtutari] " +
                ",[sth_Tevkifat_turu] " +
                ",[sth_nakliyedeposu] " +
                ",[sth_nakliyedurumu] " +
                ",[sth_yetkili_recid_dbcno] " +
                ",[sth_yetkili_recid_recno] " +
                ",[sth_taxfree_fl] " +
                ",[sth_ilave_edilecek_kdv] " + 
                ") " +
                "VALUES " +
                "(0					--<sth_RECid_DBCno, smallint,> \n" +
                ",IDENT_CURRENT('STOK_HAREKETLERI') 	--<sth_RECid_RECno, int,> \n" +
                ",0					--<sth_SpecRECno, int,> \n" +
                ",0	 				--<sth_iptal, bit,> \n" +
                ",16					 --<sth_fileid, smallint,> \n" +
                ",0		 			--<sth_hidden, bit,> \n" +
                ",0		 			--<sth_kilitli, bit,> \n" +
                ",0		 			--<sth_degisti, bit,> \n" +
                ",0		 			--<sth_checksum, int,> \n" +
                ",@sth_create_user 			--<sth_create_user, smallint,> \n" +
                ",GETDATE() 			--<sth_create_date, datetime,> \n" +
                ",@sth_lastup_user 			--<sth_lastup_user, smallint,> \n" +
                ",GETDATE() 			--<sth_lastup_date, datetime,> \n" +
                ",''		 			--<sth_special1, varchar(4),> \n" +
                ",''		 			--<sth_special2, varchar(4),> \n" +
                ",''		 			--<sth_special3, varchar(4),> \n" +
                ",@sth_firmano 			--<sth_firmano, int,> \n" +
                ",@sth_subeno 			--<sth_subeno, int,> \n" +
                ",@sth_tarih 				--<sth_tarih, datetime,> \n" +
                ",@sth_tip 				--<sth_tip, tinyint,> \n" +
                ",@sth_cins 				--<sth_cins, tinyint,> \n" +
                ",@sth_normal_iade 			--<sth_normal_iade, tinyint,> \n" +
                ",@sth_evraktip 			--<sth_evraktip, tinyint,> \n" +
                ",@sth_evrakno_seri 			--<sth_evrakno_seri, varchar(4),> \n" +
                ",@sth_evrakno_sira 			--<sth_evrakno_sira, int,> \n" +
                ",(SELECT ISNULL(MAX(sth_satirno),-1) + 1 AS SATIRNO FROM STOK_HAREKETLERI WHERE sth_evrakno_seri = @sth_evrakno_seri AND sth_evrakno_sira = @sth_evrakno_sira AND sth_evraktip = @sth_evraktip)	--<sth_satirno, int,> \n" +
                ",@sth_belge_no 			--sth_belge_no, varchar(15),> \n" +
                ",@sth_belge_tarih 			--<sth_belge_tarih, datetime,> \n" +
                ",@sth_stok_kod 			--<sth_stok_kod, varchar(25),> \n" +
                ",@sth_isk_mas1 			--<sth_isk_mas1, tinyint,> \n" +
                ",@sth_isk_mas2 			--<sth_isk_mas2, tinyint,> \n" +
                ",@sth_isk_mas3 			--<sth_isk_mas3, tinyint,> \n" +
                ",@sth_isk_mas4 			--<sth_isk_mas4, tinyint,> \n" +
                ",@sth_isk_mas5 			--<sth_isk_mas5, tinyint,> \n" +
                ",@sth_isk_mas6 			--<sth_isk_mas6, tinyint,> \n" +
                ",@sth_isk_mas7 			--<sth_isk_mas7, tinyint,> \n" +
                ",@sth_isk_mas8 			--<sth_isk_mas8, tinyint,> \n" +
                ",@sth_isk_mas9 			--<sth_isk_mas9, tinyint,> \n" +
                ",@sth_isk_mas10 			--<sth_isk_mas10, tinyint,> \n" +
                ",@sth_sat_iskmas1 			--<sth_sat_iskmas1, bit,> \n" +
                ",@sth_sat_iskmas2 			--<sth_sat_iskmas2, bit,> \n" +
                ",@sth_sat_iskmas3 			--<sth_sat_iskmas3, bit,> \n" +
                ",@sth_sat_iskmas4 			--<sth_sat_iskmas4, bit,> \n" +
                ",@sth_sat_iskmas5 			--<sth_sat_iskmas5, bit,> \n" +
                ",@sth_sat_iskmas6 			--<sth_sat_iskmas6, bit,> \n" +
                ",@sth_sat_iskmas7 			--<sth_sat_iskmas7, bit,> \n" +
                ",@sth_sat_iskmas8 			--<sth_sat_iskmas8, bit,> \n" +
                ",@sth_sat_iskmas9 			--<sth_sat_iskmas9, bit,> \n" +
                ",@sth_sat_iskmas10 			--<sth_sat_iskmas10, bit,> \n" +
                ",0					--<sth_pos_satis, bit,> \n" +
                ",0					--<sth_promosyon_fl, bit,> \n" +
                ",@sth_cari_cinsi 			--<sth_cari_cinsi, tinyint,> \n" +
                ",@sth_cari_kodu 			--<sth_cari_kodu, varchar(25),> \n" +
                ",0		 			--<sth_cari_grup_no, tinyint,> \n" +
                ",@sth_isemri_gider_kodu			 		--<sth_isemri_gider_kodu, varchar(25),> \n" +
                ",@sth_plasiyer_kodu 			--<sth_plasiyer_kodu, varchar(25),> \n" +
                ",@sth_har_doviz_cinsi 		--<sth_har_doviz_cinsi, tinyint,> \n" +
                ",@sth_har_doviz_kuru 		--<sth_har_doviz_kuru, float,> \n" +
                ",@sth_alt_doviz_kuru 		--<sth_alt_doviz_kuru, float,> \n" +
                ",@sth_stok_doviz_cinsi 		--<sth_stok_doviz_cinsi, tinyint,> \n" +
                ",@sth_stok_doviz_kuru 		--<sth_stok_doviz_kuru, float,> \n" +
                ",@sth_miktar 			--<sth_miktar, float,> \n" +
                ",@sth_miktar2 			--<sth_miktar2, float,> \n" +
                ",@sth_birim_pntr 			--<sth_birim_pntr, tinyint,> \n" +
                ",@sth_tutar	 			--<sth_tutar, float,> \n" +
                ",@sth_iskonto1 			--<sth_iskonto1, float,> \n" +
                ",@sth_iskonto2 			--<sth_iskonto2, float,> \n" +
                ",@sth_iskonto3 			--<sth_iskonto3, float,> \n" +
                ",@sth_iskonto4 			--<sth_iskonto4, float,> \n" +
                ",@sth_iskonto5 			--<sth_iskonto5, float,> \n" +
                ",@sth_iskonto6 			--<sth_iskonto6, float,> \n" +
                ",@sth_masraf1 			--<sth_masraf1, float,> \n" +
                ",@sth_masraf2 			--<sth_masraf2, float,> \n" +
                ",@sth_masraf3 			--<sth_masraf3, float,> \n" +
                ",@sth_masraf4 			--<sth_masraf4, float,> \n" +
                ",@sth_vergi_pntr 			--<sth_vergi_pntr, tinyint,> \n" +
                ",@sth_vergi 				--<sth_vergi, float,> \n" +
                ",@sth_masraf_vergi_pntr 		--<sth_masraf_vergi_pntr, tinyint,> \n" +
                ",@sth_masraf_vergi 			--<sth_masraf_vergi, float,> \n" +
                ",0		 			--<sth_netagirlik, float,> \n" +
                ",@sth_odeme_op 			--<sth_odeme_op, int,> \n" +
                ",@sth_aciklama 			--<sth_aciklama, varchar(50),> \n" +
                ",0			 		--<sth_sip_recid_dbcno, smallint,> \n" +
                ",@sth_sip_recid_recno       		--<sth_sip_recid_recno, int,> \n" +
                ",0			 		--<sth_fat_recid_dbcno, smallint,> \n" +
                ",@sth_fat_recid_recno  		--<sth_fat_recid_recno, int,> \n" +
                ",@sth_giris_depo_no 			--<sth_giris_depo_no, int,> \n" +
                ",@sth_cikis_depo_no 			--<sth_cikis_depo_no, int,> \n" +
                ",@sth_malkbl_sevk_tarihi 		--<sth_malkbl_sevk_tarihi, datetime,> \n" +
                ",@sth_cari_srm_merkezi 		--<sth_cari_srm_merkezi, varchar(25),> \n" +
                ",@sth_stok_srm_merkezi 		--<sth_stok_srm_merkezi, varchar(25),> \n" +
                ",'18991230'	 			--<sth_fis_tarihi, datetime,> \n" +
                ",0		 			--<sth_fis_sirano, int,> \n" +
                ",@sth_vergisiz_fl		 			--<sth_vergisiz_fl, bit,> \n" +
                ",0		 			--<sth_maliyet_ana, float,> \n" +
                ",0			 		--<sth_maliyet_alternatif, float,> \n" +
                ",0			 		--<sth_maliyet_orjinal, float,> \n" +
                ",@sth_adres_no 			--<sth_adres_no, int,> \n" +
                ",@sth_parti_kodu 			--<sth_parti_kodu, varchar(25),> \n" +
                ",@sth_lot_no	 			--<sth_lot_no, int,> \n" +
                ",0					--<sth_kons_recid_dbcno, smallint,> \n" +
                ",0			 		--<sth_kons_recid_recno, int,> \n" +
                ",@sth_proje_kodu		--<sth_proje_kodu, varchar(25),> \n" +
                ",@sth_exim_kodu 			--<sth_exim_kodu, varchar(25),> \n" +
                ",0		 			--<sth_otv_pntr, tinyint,> \n" +
                ",0		 			--<sth_otv_vergi, float,> \n" +
                ",0		 			--<sth_brutagirlik, float,> \n" +
                ",@sth_disticaret_turu		--<sth_disticaret_turu, tinyint,> \n" +
                ",0		 			--<sth_otvtutari, float,> \n" +
                ",@sth_otvvergisiz_fl			--<sth_otvvergisiz_fl, bit,> \n" +
                ",0					--<sth_oiv_pntr, tinyint,> \n" +
                ",0		 			--<sth_oiv_vergi, float,> \n" +
                ",@sth_oivvergisiz_fl	 		--<sth_oivvergisiz_fl, bit,> \n" +
                ",@sth_fiyat_liste_no 		--<sth_fiyat_liste_no, int,> \n" +
                ",0			 		--<sth_oivtutari, float,> \n" +
                ",0			 		--<sth_Tevkifat_turu, tinyint,> \n" +
                ",0					--<sth_nakliyedeposu, int,> \n" +
                ",0					--<sth_nakliyedurumu, tinyint,> \n" +
                ",0					--<sth_yetkili_recid_dbcno, smallint,> \n" +
                ",0     		--<sth_yetkili_recid_recno, int,> \n" +
                ",0					--<sth_taxfree_fl, bit,> \n" +
                ",0					--<sth_ilave_edilecek_kdv,float,> \n" +
                ") " ,
        param : ['sth_create_user:int','sth_lastup_user:int','sth_firmano:int','sth_subeno:int','sth_tarih:date','sth_tip:int','sth_cins:int',
            'sth_normal_iade:int','sth_evraktip:int','sth_evrakno_seri:string|25','sth_evrakno_sira:int','sth_belge_no:string|25','sth_belge_tarih:date',
            'sth_stok_kod:string|25','sth_isk_mas1:int','sth_isk_mas2:int','sth_isk_mas3:int','sth_isk_mas4:int','sth_isk_mas5:int','sth_isk_mas6:int','sth_isk_mas7:int',
            'sth_isk_mas8:int','sth_isk_mas9:int','sth_isk_mas10:int','sth_sat_iskmas1:bit','sth_sat_iskmas2:bit','sth_sat_iskmas3:bit','sth_sat_iskmas4:bit','sth_sat_iskmas5:bit',
            'sth_sat_iskmas6:bit','sth_sat_iskmas7:bit','sth_sat_iskmas8:bit','sth_sat_iskmas9:bit','sth_sat_iskmas10:bit','sth_cari_cinsi:int','sth_cari_kodu:string|50','sth_isemri_gider_kodu:string|50',
            'sth_plasiyer_kodu:string|50','sth_har_doviz_cinsi:int','sth_har_doviz_kuru:float','sth_alt_doviz_kuru:float','sth_stok_doviz_cinsi:int','sth_stok_doviz_kuru:float',
            'sth_miktar:float','sth_miktar2:float','sth_birim_pntr:int','sth_tutar:float','sth_iskonto1:float','sth_iskonto2:float','sth_iskonto3:float','sth_iskonto4:float',
            'sth_iskonto5:float','sth_iskonto6:float','sth_masraf1:float','sth_masraf2:float','sth_masraf3:float','sth_masraf4:float','sth_vergi_pntr:int','sth_vergi:float','sth_masraf_vergi_pntr:int',
            'sth_masraf_vergi:float','sth_odeme_op:int','sth_aciklama:string|25','sth_sip_recid_recno:int','sth_fat_recid_recno:int','sth_giris_depo_no:int','sth_cikis_depo_no:int','sth_malkbl_sevk_tarihi:date',
            'sth_cari_srm_merkezi:string|25','sth_stok_srm_merkezi:string|25','sth_vergisiz_fl:bit','sth_adres_no:int','sth_parti_kodu:string|25','sth_lot_no:int','sth_proje_kodu:string|25',
            'sth_exim_kodu:string|25','sth_disticaret_turu:int','sth_otvvergisiz_fl:bit','sth_oivvergisiz_fl:bit','sth_fiyat_liste_no:int']
    },
    StokHarEvrDelete : 
    {
        query : "DELETE FROM STOK_HAREKETLERI WHERE sth_evrakno_seri = @sth_evrakno_seri AND " +
                "sth_evrakno_sira = @sth_evrakno_sira AND sth_evraktip = @sth_evraktip" ,
        param : ['sth_evrakno_seri','sth_evrakno_sira','sth_evraktip'],
        type : ['string|20','int','int']
    },
    StokHarSatirDelete : 
    {
        query : "DELETE FROM STOK_HAREKETLERI WHERE sth_RECid_RECno = @sth_Guid ",
        param : ['sth_Guid'],
        type : ['string|25']
    },
    StokHarUpdate:
    {
        query:  "UPDATE STOK_HAREKETLERI " +
                "SET sth_miktar = @sth_miktar " +
                ",sth_miktar2 = @sth_miktar2 " +  
                ",sth_tutar = @sth_tutar " +
                ",sth_vergi = (@sth_tutar - (@sth_iskonto1+@sth_iskonto2+@sth_iskonto3+@sth_iskonto4+@sth_iskonto5+@sth_iskonto6)) * (SELECT [dbo].[fn_VergiYuzde] (@sth_vergi_pntr) / 100) " +
                ",sth_iskonto1 = @sth_iskonto1 " +
                ",sth_iskonto2 = @sth_iskonto2 " +
                ",sth_iskonto3 = @sth_iskonto3 " +
                ",sth_iskonto4 = @sth_iskonto4 " +
                ",sth_iskonto5 = @sth_iskonto5 " +
                ",sth_iskonto6 = @sth_iskonto6 " +
                ",sth_sat_iskmas1=@sth_sat_iskmas1 " +
                ",sth_sat_iskmas2=@sth_sat_iskmas2 " +
                ",sth_sat_iskmas3=@sth_sat_iskmas3 " +
                ",sth_sat_iskmas4=@sth_sat_iskmas4 " +
                ",sth_sat_iskmas5=@sth_sat_iskmas5 " +
                ",sth_sat_iskmas6=@sth_sat_iskmas6 " +
                "WHERE  sth_RECid_RECno = @sth_Guid",
        param : ['sth_miktar:float','sth_miktar2:float','sth_tutar:float','sth_vergi_pntr:int','sth_iskonto1:float','sth_iskonto2:float','sth_iskonto3:float',
        'sth_iskonto4:float','sth_iskonto5:float','sth_iskonto6:float','sth_sat_iskmas1:bit','sth_sat_iskmas2:bit','sth_sat_iskmas3:bit','sth_sat_iskmas4:bit',
        'sth_sat_iskmas5:bit','sth_sat_iskmas6:bit','sth_Guid:string|25']
    },
    MaxStokHarSira : 
    {
        query: "SELECT ISNULL(MAX(sth_evrakno_sira),0) + 1 AS MAXEVRSIRA FROM STOK_HAREKETLERI " +
                "WHERE sth_evrakno_seri = @sth_evrakno_seri AND sth_evraktip = @sth_evraktip " ,
        param : ['sth_evrakno_seri','sth_evraktip'],
        type : ['string|25','int']
    },
    //Cari Hareket
    CariHarGetir : 
    {
        query:  "SELECT *, " +
                "CONVERT(VARCHAR(10),GETDATE(),112) AS cha_d_kurtar " +
                "FROM CARI_HESAP_HAREKETLERI " +
                "WHERE cha_evrakno_seri=@cha_evrakno_seri AND cha_evrakno_sira=@cha_evrakno_sira " +
                "AND cha_evrak_tip=@cha_evrak_tip" ,
        param:   ['cha_evrakno_seri','cha_evrakno_sira','cha_evrak_tip'],
        type:    ['string|20','int','int']
    },
    CariHarInsert : 
    {
        query:  "DECLARE @UIDTABLE table([cha_RECno] [uniqueidentifier]) " +
                "INSERT INTO [CARI_HESAP_HAREKETLERI] " +
                "([cha_DBCno] " +
                ",[cha_SpecRecNo] " +
                ",[cha_iptal] " +
                ",[cha_fileid] " +
                ",[cha_hidden] " +
                ",[cha_kilitli] " +
                ",[cha_degisti] " +
                ",[cha_CheckSum] " +
                ",[cha_create_user] " +
                ",[cha_create_date] " +
                ",[cha_lastup_user] " +
                ",[cha_lastup_date] " +
                ",[cha_special1] " +
                ",[cha_special2] " +
                ",[cha_special3] " +
                ",[cha_firmano] " +
                ",[cha_subeno] " +
                ",[cha_evrak_tip] " +
                ",[cha_evrakno_seri] " +
                ",[cha_evrakno_sira] " +
                ",[cha_satir_no] " +
                ",[cha_tarihi] " +
                ",[cha_tip] " +
                ",[cha_cinsi] " +
                ",[cha_normal_Iade] " +
                ",[cha_tpoz] " +
                ",[cha_ticaret_turu] " +
                ",[cha_belge_no] " +
                ",[cha_belge_tarih] " +
                ",[cha_aciklama] " +
                ",[cha_satici_kodu] " +
                ",[cha_EXIMkodu] " +
                ",[cha_projekodu] " +
                ",[cha_yat_tes_kodu] " +
                ",[cha_cari_cins] " +
                ",[cha_kod] " +
                ",[cha_ciro_cari_kodu] " +
                ",[cha_d_cins] " +
                ",[cha_d_kur] " +
                ",[cha_altd_kur] " +
                ",[cha_grupno] " +
                ",[cha_srmrkkodu] " +
                ",[cha_kasa_hizmet] " +
                ",[cha_kasa_hizkod] " +
                ",[cha_karsidcinsi] " +
                ",[cha_karsid_kur] " +
                ",[cha_karsidgrupno] " +
                ",[cha_karsisrmrkkodu] " +
                ",[cha_miktari] " +
                ",[cha_meblag] " +
                ",[cha_aratoplam] " +
                ",[cha_vade] " +
                ",[cha_Vade_Farki_Yuz] " +
                ",[cha_ft_iskonto1] " +
                ",[cha_ft_iskonto2] " +
                ",[cha_ft_iskonto3] " +
                ",[cha_ft_iskonto4] " +
                ",[cha_ft_iskonto5] " +
                ",[cha_ft_iskonto6] " +
                ",[cha_ft_masraf1] " +
                ",[cha_ft_masraf2] " +
                ",[cha_ft_masraf3] " +
                ",[cha_ft_masraf4] " +
                ",[cha_isk_mas1] " +
                ",[cha_isk_mas2] " +
                ",[cha_isk_mas3] " +
                ",[cha_isk_mas4] " +
                ",[cha_isk_mas5] " +
                ",[cha_isk_mas6] " +
                ",[cha_isk_mas7] " +
                ",[cha_isk_mas8] " +
                ",[cha_isk_mas9] " +
                ",[cha_isk_mas10] " +
                ",[cha_sat_iskmas1] " +
                ",[cha_sat_iskmas2] " +
                ",[cha_sat_iskmas3] " +
                ",[cha_sat_iskmas4] " +
                ",[cha_sat_iskmas5] " +
                ",[cha_sat_iskmas6] " +
                ",[cha_sat_iskmas7] " +
                ",[cha_sat_iskmas8] " +
                ",[cha_sat_iskmas9] " +
                ",[cha_sat_iskmas10] " +
                ",[cha_yuvarlama] " +
                ",[cha_StFonPntr] " +
                ",[cha_stopaj] " +
                ",[cha_savsandesfonu] " +
                ",[cha_avansmak_damgapul] " +
                ",[cha_vergipntr] " +
                ",[cha_vergi1] " +
                ",[cha_vergi2] " +
                ",[cha_vergi3] " +
                ",[cha_vergi4] " +
                ",[cha_vergi5] " +
                ",[cha_vergi6] " +
                ",[cha_vergi7] " +
                ",[cha_vergi8] " +
                ",[cha_vergi9] " +
                ",[cha_vergi10] " +
                ",[cha_vergisiz_fl] " +
                ",[cha_otvtutari] " +
                ",[cha_otvvergisiz_fl] " +
                ",[cha_oiv_pntr] " +
                ",[cha_oivtutari] " +
                ",[cha_oiv_vergi] " +
                ",[cha_oivergisiz_fl] " +
                ",[cha_fis_tarih] " +
                ",[cha_fis_sirano] " +
                ",[cha_trefno] " +
                ",[cha_sntck_poz] " +
                ",[cha_reftarihi] " +
                ",[cha_istisnakodu] " +
                ",[cha_pos_hareketi] " +
                ",[cha_meblag_ana_doviz_icin_gecersiz_fl] " +
                ",[cha_meblag_alt_doviz_icin_gecersiz_fl] " +
                ",[cha_meblag_orj_doviz_icin_gecersiz_fl] " +
                ",[cha_sip_uid] " +
                ",[cha_kirahar_uid] " +
                ",[cha_vardiya_tarihi] " +
                ",[cha_vardiya_no] " +
                ",[cha_vardiya_evrak_ti] " +
                ",[cha_ebelge_turu] " +
                ",[cha_tevkifat_toplam] " +
                ",[cha_ilave_edilecek_kdv1] " +
                ",[cha_ilave_edilecek_kdv2] " +
                ",[cha_ilave_edilecek_kdv3] " +
                ",[cha_ilave_edilecek_kdv4] " +
                ",[cha_ilave_edilecek_kdv5] " +
                ",[cha_ilave_edilecek_kdv6] " +
                ",[cha_ilave_edilecek_kdv7] " +
                ",[cha_ilave_edilecek_kdv8] " +
                ",[cha_ilave_edilecek_kdv9] " +
                ",[cha_ilave_edilecek_kdv10] " +
                ",[cha_e_islem_turu] " +
                ",[cha_fatura_belge_turu] " +
                ",[cha_diger_belge_adi] " +
                ",[cha_uuid] " +
                ",[cha_adres_no] " +
                ",[cha_vergifon_toplam] " +
                ",[cha_ilk_belge_tarihi] " +
                ",[cha_ilk_belge_doviz_kuru] " +
                ",[cha_HareketGrupKodu1] " +
                ",[cha_HareketGrupKodu2] " +
                ",[cha_HareketGrupKodu3] " +
                ") " + 
                "OUTPUT INSERTED.[cha_RECno] INTO @UIDTABLE " + 
                "VALUES " +
                "(0												--<cha_DBCno, smallint,> \n" + 
                ",0												--<cha_SpecRecNo, int,> \n" + 
                ",0												--<cha_iptal, bit,> \n" + 
                ",51												--<cha_fileid, smallint,> \n" + 
                ",0												--<cha_hidden, bit,> \n" + 
                ",0												--<cha_kilitli, bit,> \n" + 
                ",0												--<cha_degisti, bit,> \n" + 
                ",0												--<cha_CheckSum, int,> \n" + 
                ",@cha_create_user								--<cha_create_user, smallint,> \n" + 
                ",GETDATE()				                        --<cha_create_date, datetime,> \n" + 
                ",@cha_lastup_user								--<cha_lastup_user, smallint,> \n" + 
                ",GETDATE()				                        --<cha_lastup_date, datetime,> \n" + 
                ",''											--<cha_special1, nvarchar(4),> \n" + 
                ",''											--<cha_special2, nvarchar(4),> \n" + 
                ",''											--<cha_special3, nvarchar(4),> \n" + 
                ",@cha_firmano									--<cha_firmano, int,> \n" + 
                ",@cha_subeno									--<cha_subeno, int,> \n" + 
                ",@cha_evrak_tip								--<cha_evrak_tip, tinyint,> \n" + 
                ",@cha_evrakno_seri								--<cha_evrakno_seri, nvarchar_evrakseri,> \n" + 
                ",@cha_evrakno_sira								--<cha_evrakno_sira, int,> \n" + 
                ",(SELECT ISNULL(MAX(cha_satir_no),-1) + 1 AS SATIRNO FROM CARI_HESAP_HAREKETLERI WHERE cha_evrakno_seri = @cha_evrakno_seri AND cha_evrakno_sira = @cha_evrakno_sira AND cha_evrak_tip = @cha_evrak_tip)				--<cha_satir_no, int,> \n" + 
                ",@cha_tarihi									--<cha_tarihi, datetime,> \n" + 
                ",@cha_tip										--<cha_tip, tinyint,> \n" + 
                ",@cha_cinsi									--<cha_cinsi, tinyint,> \n" + 
                ",@cha_normal_Iade								--<cha_normal_Iade, tinyint,> \n" + 
                ",@cha_tpoz										--<cha_tpoz, tinyint,> \n" + 
                ",@cha_ticaret_turu								--<cha_ticaret_turu, tinyint,> \n" + 
                ",@cha_belge_no									--<cha_belge_no, nvarchar_belgeno,> \n" + 
                ",@cha_belge_tarih								--<cha_belge_tarih, datetime,> \n" + 
                ",@cha_aciklama									--<cha_aciklama, nvarchar(40),> \n" + 
                ",@cha_satici_kodu								--<cha_satici_kodu, nvarchar(25),> \n" + 
                ",@cha_EXIMkodu									--<cha_EXIMkodu, nvarchar(25),> \n" + 
                ",@cha_projekodu								--<cha_projekodu, nvarchar(25),> \n" + 
                ",''											--<cha_yat_tes_kodu, nvarchar(25),> \n" + 
                ",@cha_cari_cins								--<cha_cari_cins, tinyint,> \n" + 
                ",@cha_kod										--<cha_kod, nvarchar(25),> \n" + 
                ",@cha_ciro_cari_kodu							--<cha_ciro_cari_kodu, nvarchar(25),> \n" + 
                ",@cha_d_cins									--<cha_d_cins, tinyint,> \n" + 
                ",@cha_d_kur									--<cha_d_kur, float,> \n" + 
                ",@cha_altd_kur									--<cha_altd_kur, float,> \n" + 
                ",@cha_grupno									--<cha_grupno, tinyint,> \n" + 
                ",@cha_srmrkkodu								--<cha_srmrkkodu, nvarchar(25),> \n" + 
                ",@cha_kasa_hizmet								--<cha_kasa_hizmet, tinyint,> \n" + 
                ",@cha_kasa_hizkod								--<cha_kasa_hizkod, nvarchar(25),> \n" + 
                ",0												--<cha_karsidcinsi, tinyint,> \n" + 
                ",1												--<cha_karsid_kur, float,> \n" + 
                ",@cha_karsidgrupno								--<cha_karsidgrupno, tinyint,> \n" + 
                ",''											--<cha_karsisrmrkkodu, nvarchar(25),> \n" + 
                ",0												--<cha_miktari, float,> \n" + 
                ",@cha_meblag									--<cha_meblag, float,> \n" + 
                ",@cha_aratoplam								--<cha_aratoplam, float,> \n" + 
                ",@cha_vade										--<cha_vade, int,> \n" + 
                ",0												--<cha_Vade_Farki_Yuz, float,> \n" + 
                ",@cha_ft_iskonto1								--<cha_ft_iskonto1, float,> \n" + 
                ",@cha_ft_iskonto2								--<cha_ft_iskonto2, float,> \n" + 
                ",@cha_ft_iskonto3								--<cha_ft_iskonto3, float,> \n" + 
                ",@cha_ft_iskonto4								--<cha_ft_iskonto4, float,> \n" + 
                ",@cha_ft_iskonto5								--<cha_ft_iskonto5, float,> \n" + 
                ",@cha_ft_iskonto6								--<cha_ft_iskonto6, float,> \n" + 
                ",@cha_ft_masraf1								--<cha_ft_masraf1, float,> \n" + 
                ",@cha_ft_masraf2								--<cha_ft_masraf2, float,> \n" + 
                ",@cha_ft_masraf3								--<cha_ft_masraf3, float,> \n" + 
                ",@cha_ft_masraf4								--<cha_ft_masraf4, float,> \n" + 
                ",0												--<cha_isk_mas1, tinyint,> \n" + 
                ",0												--<cha_isk_mas2, tinyint,> \n" + 
                ",0												--<cha_isk_mas3, tinyint,> \n" + 
                ",0												--<cha_isk_mas4, tinyint,> \n" + 
                ",0												--<cha_isk_mas5, tinyint,> \n" + 
                ",0												--<cha_isk_mas6, tinyint,> \n" + 
                ",0												--<cha_isk_mas7, tinyint,> \n" + 
                ",0												--<cha_isk_mas8, tinyint,> \n" + 
                ",0												--<cha_isk_mas9, tinyint,> \n" + 
                ",0												--<cha_isk_mas10, tinyint,> \n" + 
                ",0												--<cha_sat_iskmas1, bit,> \n" + 
                ",0												--<cha_sat_iskmas2, bit,> \n" + 
                ",0												--<cha_sat_iskmas3, bit,> \n" + 
                ",0												--<cha_sat_iskmas4, bit,> \n" + 
                ",0												--<cha_sat_iskmas5, bit,> \n" + 
                ",0												--<cha_sat_iskmas6, bit,> \n" + 
                ",0												--<cha_sat_iskmas7, bit,> \n" + 
                ",0												--<cha_sat_iskmas8, bit,> \n" + 
                ",0												--<cha_sat_iskmas9, bit,> \n" + 
                ",0												--<cha_sat_iskmas10, bit,> \n" + 
                ",0												--<cha_yuvarlama, float,> \n" + 
                ",0												--<cha_StFonPntr, tinyint,> \n" + 
                ",0												--<cha_stopaj, float,> \n" + 
                ",0												--<cha_savsandesfonu, float,> \n" + 
                ",0												--<cha_avansmak_damgapul, float,> \n" + 
                ",@cha_vergipntr								--<cha_vergipntr, tinyint,> \n" + 
                ",@cha_vergi1									--<cha_vergi1, float,> \n" + 
                ",@cha_vergi2									--<cha_vergi2, float,> \n" + 
                ",@cha_vergi3									--<cha_vergi3, float,> \n" + 
                ",@cha_vergi4									--<cha_vergi4, float,> \n" + 
                ",@cha_vergi5									--<cha_vergi5, float,> \n" + 
                ",@cha_vergi6									--<cha_vergi6, float,> \n" + 
                ",@cha_vergi7									--<cha_vergi7, float,> \n" + 
                ",@cha_vergi8									--<cha_vergi8, float,> \n" + 
                ",@cha_vergi9									--<cha_vergi9, float,> \n" + 
                ",@cha_vergi10									--<cha_vergi10, float,> \n" + 
                ",@cha_vergisiz_fl								--<cha_vergisiz_fl, bit,> \n" + 
                ",@cha_otvtutari								--<cha_otvtutari, float,> \n" + 
                ",@cha_otvvergisiz_fl							--<cha_otvvergisiz_fl, bit,> \n" + 
                ",0												--<cha_oiv_pntr, tinyint,> \n" + 
                ",0												--<cha_oivtutari, float,> \n" + 
                ",0												--<cha_oiv_vergi, float,> \n" + 
                ",@cha_oivergisiz_fl							--<cha_oivergisiz_fl, bit,> \n" + 
                ",'18991230'									--<cha_fis_tarih, datetime,> \n" + 
                ",0												--<cha_fis_sirano, int,> \n" + 
                ",@cha_trefno									--<cha_trefno, nvarchar(25),> \n" + 
                ",@cha_sntck_poz								--<cha_sntck_poz, tinyint,> \n" + 
                ",'18991230'									--<cha_reftarihi, datetime,> \n" + 
                ",0												--<cha_istisnakodu, tinyint,> \n" + 
                ",0												--<cha_pos_hareketi, bit,> \n" + 
                ",0												--<cha_meblag_ana_doviz_icin_gecersiz_fl, tinyint,> \n" + 
                ",0												--<cha_meblag_alt_doviz_icin_gecersiz_fl, tinyint,> \n" + 
                ",0												--<cha_meblag_orj_doviz_icin_gecersiz_fl, tinyint,> \n" + 
                ",cast(cast(0 as binary) as uniqueidentifier)	--<cha_sip_uid, int,> \n" + 
                ",cast(cast(0 as binary) as uniqueidentifier)	--<cha_kirahar_recid_recno, int,> \n" + 
                ",'18991230'									--<cha_vardiya_tarihi, datetime,> \n" + 
                ",0												--<cha_vardiya_no, tinyint,> \n" + 
                ",0												--<cha_vardiya_evrak_ti, tinyint,> \n" + 
                ",0                                             --<cha_ebelge_turu,tinyint> \n" + 
                ",0												--<cha_tevkifat_toplam, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv1, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv2, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv3, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv4, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv5, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv6, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv7, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv8, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv9, float,> \n" + 
                ",0												--<cha_ilave_edilecek_kdv10, float,> \n" + 
                ",@cha_e_islem_turu								--<cha_e_islem_turu, tinyint,> \n" + 
                ",0												--<cha_fatura_belge_turu, tinyint,> \n" + 
                ",''											--<cha_diger_belge_adi, nvarchar(50),> \n" + 
                ",''											--<cha_uuid, nvarchar(40),> \n" + 
                ",0												--<cha_adres_no, int,> \n" + 
                ",0												--<cha_vergifon_toplam, float,> \n" + 
                ",'18991230'									--<cha_ilk_belge_tarihi> \n" + 
                ",0												--<cha_ilk_belge_doviz_kuru> \n" + 
                ",''											--<cha_HareketGrupKodu1> \n" + 
                ",''											--<cha_HareketGrupKodu2> \n" + 
                ",''											--<cha_HareketGrupKodu3> \n" + 
                ") " +
                "SELECT [cha_RECno] FROM @UIDTABLE ",
        param : ['cha_create_user:int','cha_lastup_user:int','cha_firmano:int','cha_subeno:int','cha_evrak_tip:int','cha_evrakno_seri:string|25','cha_evrakno_sira:int',
                 'cha_tarihi:date','cha_tip:int','cha_cinsi:int','cha_normal_Iade:int','cha_tpoz:int','cha_ticaret_turu:int','cha_belge_no:string|25','cha_belge_tarih:date',
                 'cha_aciklama:string|40','cha_satici_kodu:string|25','cha_EXIMkodu:string|25','cha_projekodu:string|25','cha_cari_cins:int','cha_kod:string|25','cha_ciro_cari_kodu:string|25',
                 'cha_d_cins:int','cha_d_kur:float','cha_altd_kur:float','cha_grupno:int','cha_srmrkkodu:string|25','cha_kasa_hizmet:int','cha_kasa_hizkod:string|25','cha_karsidgrupno:int',
                 'cha_meblag:float','cha_aratoplam:float','cha_vade:int','cha_ft_iskonto1:float','cha_ft_iskonto2:float','cha_ft_iskonto3:float','cha_ft_iskonto4:float','cha_ft_iskonto5:float',
                 'cha_ft_iskonto6:float','cha_ft_masraf1:float','cha_ft_masraf2:float','cha_ft_masraf3:float','cha_ft_masraf4:float','cha_vergipntr:int','cha_vergi1:float','cha_vergi2:float',
                 'cha_vergi3:float','cha_vergi4:float','cha_vergi5:float','cha_vergi6:float','cha_vergi7:float','cha_vergi8:float','cha_vergi9:float','cha_vergi10:float','cha_vergisiz_fl:bit',
                 'cha_otvtutari:float','cha_otvvergisiz_fl:bit','cha_oivergisiz_fl:bit','cha_trefno:string|25','cha_sntck_poz:int','cha_e_islem_turu:int']
    },
    CariHarEvrDelete : 
    {
        query : "DELETE FROM CARI_HESAP_HAREKETLERI WHERE cha_evrakno_seri=@cha_evrakno_seri AND cha_evrakno_sira=@cha_evrakno_sira AND cha_evrak_tip=@cha_evrak_tip" ,
        param : ['cha_evrakno_seri','cha_evrakno_sira','cha_evrak_tip'],
        type : ['string|20','int','int']
    },
    CariHarSatirDelete : 
    {
        query : "DELETE FROM CARI_HESAP_HAREKETLERI WHERE cha_RECno=@cha_RECno",
        param : ['cha_RECno'],
        type : ['string|50']
    },
    CariHarUpdate:
    {
        query:  "UPDATE CARI_HESAP_HAREKETLERI " +
                "SET cha_meblag=@cha_meblag " +
                ",cha_aratoplam=@cha_aratoplam " +
                ",cha_vergi1=@cha_vergi1 " +
                ",cha_vergi2=@cha_vergi2 " +
                ",cha_vergi3=@cha_vergi3 " + 
                ",cha_vergi4=@cha_vergi4 " + 
                ",cha_vergi5=@cha_vergi5 " + 
                ",cha_vergi6=@cha_vergi6 " + 
                ",cha_vergi7=@cha_vergi7 " + 
                ",cha_vergi8=@cha_vergi8 " + 
                ",cha_vergi9=@cha_vergi9 " + 
                ",cha_vergi10=@cha_vergi10 " +
                ",cha_ft_iskonto1=@cha_ft_iskonto1 " +
                ",cha_ft_iskonto2=@cha_ft_iskonto2 " +
                ",cha_ft_iskonto3=@cha_ft_iskonto3 " +
                ",cha_ft_iskonto4=@cha_ft_iskonto4 " +
                ",cha_ft_iskonto5=@cha_ft_iskonto5 " +
                ",cha_ft_iskonto6=@cha_ft_iskonto6 " +
                ",cha_otvtutari = @cha_otvtutari " +
                "WHERE  cha_RECno = @cha_RECno ",
        param : ['cha_meblag:float','cha_aratoplam:float','cha_vergi1:float','cha_vergi2:float','cha_vergi3:float','cha_vergi4:float','cha_vergi5:float','cha_vergi6:float',
                 'cha_vergi7:float','cha_vergi8:float','cha_vergi9:float','cha_vergi10:float','cha_ft_iskonto1:float','cha_ft_iskonto2:float','cha_ft_iskonto3:float',
                 'cha_ft_iskonto4:float','cha_ft_iskonto5:float','cha_ft_iskonto6:float','cha_otvtutari:float','cha_RECno:string|50']
    },
    MaxCariHarSira : 
    {
        query: "SELECT ISNULL(MAX(cha_evrakno_sira),0) AS MAXEVRSIRA FROM CARI_HESAP_HAREKETLERI WHERE cha_evrakno_seri=@cha_evrakno_seri AND cha_evrak_tip=@cha_evrak_tip" ,
        param : ['cha_evrakno_seri','cha_evrak_tip'],
        type : ['string|25','int']
    },
    //Odeme Emirleri
    CekHarInsert:
    {
        query:  "INSERT INTO [dbo].[ODEME_EMIRLERI] " + 
                "([sck_DBCno] " +
                ",[sck_SpecRECno] " +
                ",[sck_iptal] " +
                ",[sck_fileid] " +
                ",[sck_hidden] " +
                ",[sck_kilitli] " +
                ",[sck_degisti] " +
                ",[sck_checksum] " +
                ",[sck_create_user] " +
                ",[sck_create_date] " +
                ",[sck_lastup_user] " +
                ",[sck_lastup_date] " +
                ",[sck_special1] " +
                ",[sck_special2] " +
                ",[sck_special3] " +
                ",[sck_firmano] " +
                ",[sck_subeno] " +
                ",[sck_tip] " +
                ",[sck_refno] " +
                ",[sck_bankano] " +
                ",[sck_borclu] " +
                ",[sck_vdaire_no] " +
                ",[sck_vade] " +
                ",[sck_tutar] " +
                ",[sck_doviz] " +
                ",[sck_odenen] " +
                ",[sck_degerleme_islendi] " +
                ",[sck_banka_adres1] " +
                ",[sck_sube_adres2] " +
                ",[sck_borclu_tel] " +
                ",[sck_hesapno_sehir] " +
                ",[sck_no] " +
                ",[sck_duzen_tarih] " +
                ",[sck_sahip_cari_cins] " +
                ",[sck_sahip_cari_kodu] " +
                ",[sck_sahip_cari_grupno] " +
                ",[sck_nerede_cari_cins] " +
                ",[sck_nerede_cari_kodu] " +
                ",[sck_nerede_cari_grupno] " +
                ",[sck_ilk_hareket_tarihi] " +
                ",[sck_ilk_evrak_seri] " +
                ",[sck_ilk_evrak_sira_no] " +
                ",[sck_ilk_evrak_satir_no] " +
                ",[sck_son_hareket_tarihi] " +
                ",[sck_doviz_kur] " +
                ",[sck_sonpoz] " +
                ",[sck_imza] " +
                ",[sck_srmmrk] " +
                ",[sck_kesideyeri] " +
                ",[Sck_TCMB_Banka_kodu] " +
                ",[Sck_TCMB_Sube_kodu] " +
                ",[Sck_TCMB_il_kodu] " +
                ",[SckTasra_fl] " +
                ",[sck_projekodu] " +
                ",[sck_masraf1] " +
                ",[sck_masraf1_isleme] " +
                ",[sck_masraf2] " +
                ",[sck_masraf2_isleme] " +
                ",[sck_odul_katkisi_tutari] " +
                ",[sck_servis_komisyon_tutari] " +
                ",[sck_erken_odeme_faiz_tutari] " +
                ",[sck_odul_katkisi_tutari_islendi_fl] " +
                ",[sck_servis_komisyon_tutari_islendi_fl] " +
                ",[sck_erken_odeme_faiz_tutari_islendi_fl] " +
                ",[sck_kredi_karti_tipi] " +
                ",[sck_taksit_sayisi] " +
                ",[sck_kacinci_taksit] " +
                ",[sck_uye_isyeri_no] " +
                ",[sck_kredi_karti_no] " +
                ",[sck_provizyon_kodu]) " +
                "VALUES " +
                "(0                         --<sck_DBCno, smallint,> \n" + 
                ",0                         --<sck_SpecRECno, int,> \n" + 
                ",0                         --<sck_iptal, bit,> \n" + 
                ",54                        --<sck_fileid, smallint,> \n" + 
                ",0                         --<sck_hidden, bit,> \n" + 
                ",0                         --<sck_kilitli, bit,> \n" + 
                ",0                         --<sck_degisti, bit,> \n" + 
                ",0                         --<sck_checksum, int,> \n" + 
                ",@sck_create_user          --<sck_create_user, smallint,> \n" + 
                ",GETDATE()                 --<sck_create_date, datetime,> \n" + 
                ",@sck_lastup_user          --<sck_lastup_user, smallint,> \n" + 
                ",GETDATE()                 --<sck_lastup_date, datetime,> \n" + 
                ",''                        --<sck_special1, nvarchar(4),> \n" + 
                ",''                        --<sck_special2, nvarchar(4),> \n" + 
                ",''                        --<sck_special3, nvarchar(4),> \n" + 
                ",@sck_firmano              --<sck_firmano, int,> \n" + 
                ",@sck_subeno               --<sck_subeno, int,> \n" + 
                ",@sck_tip                  --<sck_tip, tinyint,> \n" + 
                ",@sck_refno                --<sck_refno, nvarchar(25),> \n" + 
                ",''                        --<sck_bankano, nvarchar(25),> \n" + 
                ",@sck_borclu               --<sck_borclu, nvarchar(50),> \n" + 
                ",''                        --<sck_vdaire_no, nvarchar(40),> \n" + 
                ",@sck_vade                 --<sck_vade, datetime,> \n" + 
                ",@sck_tutar                --<sck_tutar, float,> \n" + 
                ",@sck_doviz                --<sck_doviz, tinyint,> \n" + 
                ",@sck_odenen               --<sck_odenen, float,> \n" + 
                ",0                         --<sck_degerleme_islendi, tinyint,> \n" + 
                ",''                        --<sck_banka_adres1, nvarchar(50),> \n" + 
                ",''                        --<sck_sube_adres2, nvarchar(50),> \n" + 
                ",''                        --<sck_borclu_tel, nvarchar(15),> \n" + 
                ",''                        --<sck_hesapno_sehir, nvarchar(30),> \n" + 
                ",''                        --<sck_no, nvarchar(25),> \n" + 
                ",'18991230'                --<sck_duzen_tarih, datetime,> \n" + 
                ",@sck_sahip_cari_cins      --<sck_sahip_cari_cins, tinyint,> \n" + 
                ",@sck_sahip_cari_kodu      --<sck_sahip_cari_kodu, nvarchar(25),> \n" + 
                ",@sck_sahip_cari_grupno    --<sck_sahip_cari_grupno, tinyint,> \n" + 
                ",@sck_nerede_cari_cins     --<sck_nerede_cari_cins, tinyint,> \n" + 
                ",@sck_nerede_cari_kodu     --<sck_nerede_cari_kodu, nvarchar(25),> \n" + 
                ",@sck_nerede_cari_grupno   --<sck_nerede_cari_grupno, tinyint,> \n" + 
                ",@sck_ilk_hareket_tarihi   --<sck_ilk_hareket_tarihi, datetime,> \n" + 
                ",@sck_ilk_evrak_seri       --<sck_ilk_evrak_seri, [dbo].[evrakseri_str],> \n" + 
                ",@sck_ilk_evrak_sira_no    --<sck_ilk_evrak_sira_no, int,> \n" + 
                ",@sck_ilk_evrak_satir_no   --<sck_ilk_evrak_satir_no, int,> \n" + 
                ",@sck_son_hareket_tarihi   --<sck_son_hareket_tarihi, datetime,> \n" + 
                ",@sck_doviz_kur            --<sck_doviz_kur, float,> \n" + 
                ",@sck_sonpoz               --<sck_sonpoz, tinyint,> \n" + 
                ",0                         --<sck_imza, tinyint,> \n" + 
                ",@sck_srmmrk               --<sck_srmmrk, nvarchar(25),> \n" + 
                ",''                        --<sck_kesideyeri, nvarchar(14),> \n" + 
                ",''                        --<Sck_TCMB_Banka_kodu, nvarchar(4),> \n" + 
                ",''                        --<Sck_TCMB_Sube_kodu, nvarchar(8),> \n" + 
                ",''                        --<Sck_TCMB_il_kodu, nvarchar(3),> \n" + 
                ",0                         --<SckTasra_fl, bit,> \n" + 
                ",@sck_projekodu            --<sck_projekodu, nvarchar(25),> \n" + 
                ",0                         --<sck_masraf1, float,> \n" + 
                ",0                         --<sck_masraf1_isleme, tinyint,> \n" + 
                ",0                         --<sck_masraf2, float,> \n" + 
                ",0                         --<sck_masraf2_isleme, tinyint,> \n" + 
                ",0                         --<sck_odul_katkisi_tutari, float,> \n" + 
                ",0                         --<sck_servis_komisyon_tutari, float,> \n" + 
                ",0                         --<sck_erken_odeme_faiz_tutari, float,> \n" + 
                ",0                         --<sck_odul_katkisi_tutari_islendi_fl, bit,> \n" + 
                ",0                         --<sck_servis_komisyon_tutari_islendi_fl, bit,> \n" + 
                ",0                         --<sck_erken_odeme_faiz_tutari_islendi_fl, bit,> \n" + 
                ",0                         --<sck_kredi_karti_tipi, tinyint,> \n" + 
                ",0                         --<sck_taksit_sayisi, smallint,> \n" + 
                ",0                         --<sck_kacinci_taksit, smallint,> \n" + 
                ",''                        --<sck_uye_isyeri_no, nvarchar(25),> \n" + 
                ",''                        --<sck_kredi_karti_no, nvarchar(16),> \n" + 
                ",''                        --<sck_provizyon_kodu, nvarchar(10),> \n" + 
                ")",
        param : ['sck_create_user:int','sck_lastup_user:int','sck_firmano:int','sck_subeno:int','sck_tip:int','sck_refno:string|25','sck_borclu:string|25',
                 'sck_vade:date','sck_tutar:float','sck_doviz:int','sck_odenen:float','sck_sahip_cari_cins:int','sck_sahip_cari_kodu:string|25','sck_sahip_cari_grupno:int','sck_nerede_cari_cins:int',
                 'sck_nerede_cari_kodu:string|25','sck_nerede_cari_grupno:int','sck_ilk_hareket_tarihi:date','sck_ilk_evrak_seri:string|25','sck_ilk_evrak_sira_no:int','sck_ilk_evrak_satir_no:int',
                 'sck_son_hareket_tarihi:date','sck_doviz_kur:float','sck_sonpoz:int','sck_srmmrk:string|25','sck_projekodu:string|25']
    },
    CekHarUpdate:
    {
        query:  "UPDATE ODEME_EMIRLERI " +
                "SET sck_tutar = @sck_tutar " +
                "WHERE sck_ilk_evrak_seri = @sck_ilk_evrak_seri AND sck_ilk_evrak_sira_no = @sck_ilk_evrak_sira_no " +
                "AND sck_ilk_evrak_satir_no = @sck_ilk_evrak_satir_no",
        param : ['sck_tutar:float','sck_ilk_evrak_seri:string|50','sck_ilk_evrak_sira_no:int','sck_ilk_evrak_satir_no:int']
    },
    MaxCekRefNo : 
    {
        query: "SELECT MAX(CONVERT(INT,SUBSTRING(sck_refno,17,25))) AS REFNO FROM ODEME_EMIRLERI WHERE sck_tip = @sck_tip" ,
        param : ['sck_tip'],
        type : ['int']
    },
    //CariListe
    RptCariListe :
    {
        query :"SELECT cari_unvan1 AS CARIAD, cari_kod AS CARIKOD, " +
                "(SELECT ISNULL(adr_sokak+' '+adr_cadde+' '+adr_ilce+' '+adr_il,+'') FROM CARI_HESAP_ADRESLERI WHERE adr_adres_no = 1) AS ADRES " +
                "FROM CARI_HESAPLAR " 
    },
    //Etiket
    EtiketInsert :
    {  
        query : "INSERT INTO ETIKETBAS " +
                "([Etkb_RECid_DBCno], " +
                "[Etkb_RECid_RECno], " +
                "[Etkb_SpecRECno], " + 
                "[Etkb_iptal], " +
                "[Etkb_fileid], " +
                "[Etkb_hidden], " + 
                "[Etkb_kilitli], " +
                "[Etkb_degisti], " +
                "[Etkb_checksum], " +
                "[Etkb_create_user], " +
                "[Etkb_create_date], " +
                "[Etkb_lastup_user], " +
                "[Etkb_lastup_date], " +
                "[Etkb_special1], " +
                "[Etkb_special2], " +
                "[Etkb_special3], " +
                "[Etkb_evrakno_seri], " +
                "[Etkb_evrakno_sira], " +
                "[Etkb_evrak_tarihi], " +
                "[Etkb_aciklama], " +
                "[Etkb_satirno], " +
                "[Etkb_belge_no], " +
                "[Etkb_belge_tarih], " +
                "[Etkb_EtiketTip], " +
                "[Etkb_BasimTipi], " +
                "[Etkb_BasimAdet], " +
                "[Etkb_DepoNo], " +
                "[Etkb_StokKodu], " +
                "[Etkb_RenkNo], " +
                "[Etkb_BedenNo], " +
                "[Etkb_Barkodu], " +
                "[Etkb_BasilacakMiktar] " +
                ") VALUES ( " + 
                "0					--<Etkb_RECid_DBCno, int,> \n" +
                ",IDENT_CURRENT('ETIKETBAS')	--<Etkb_RECid_RECno, int,> \n" +
                ",0		 			--<Etkb_SpecRECno, int,> \n" +
                ",0                 --<Etkb_iptal, bit,> \n" +
                ",115                    --<Etkb_fileid, smallint,> \n" +
                ",0                  --<Etkb_hidden, bit,> \n" +
                ",0                  --<Etkb_kilitli, bit,> \n" +
                ",0                  --<Etkb_degisti, bit,> \n" +
                ",0                  --<Etkb_checksum, int,> \n" +
                ",@Etkb_create_user 			--<Etkb_create_user, smallint,> \n" +
                ",CONVERT(VARCHAR(10),GETDATE(),112) 		--<Etkb_create_date, datetime,> \n" +
                ",@Etkb_lastup_user 				--<Etkb_lastup_user, smallint,> \n" +
                ",CONVERT(VARCHAR(10),GETDATE(),112) 		--<Etkb_lastup_date, datetime,> \n" +
                ",@Etkb_special1		 			--<Etkb_special1, varchar(4),> \n" +
                ",''		 			--<Etkb_special2, varchar(4),> \n" +
                ",''		 			--<Etkb_special3, varchar(4),> \n" +
                ",@Etkb_evrakno_seri			--<Etkb_evrakno_seri, varchar(20),> \n" +
                ",@Etkb_evrakno_sira			--<Etkb_evrakno_sira, int,> \n" +
                ",CONVERT(VARCHAR(10),GETDATE(),112)			--<Etkb_evrak_tarihi, int,> \n" +
                ",@Etkb_aciklama                            --<Etkb_aciklama, varchar(40),> \n" +
                ",(SELECT ISNULL(MAX(Etkb_satirno),-1) + 1 FROM ETIKETBAS WHERE Etkb_evrakno_seri = @Etkb_evrakno_seri AND Etkb_evrakno_sira = @Etkb_evrakno_sira)				                    --<Etkb_satirno, int,> \n" +
                ",@Etkb_belge_no                            --<Etkb_belge_no, varchar(50),> \n " +
                ",CONVERT(VARCHAR(10),GETDATE(),112)       --<Etkb_belge_tarih, datetime,> \n " +
                ",@Etkb_EtiketTip                            --<Etkb_EtiketTip, tinyint,> \n " +
                ",@Etkb_BasimTipi                           --<Etkb_BasimTipi, tinyint,> \n " +
                ",@Etkb_BasimAdet                            --<Etkb_BasimAdet, smallint,> \n " +
                ",@Etkb_DepoNo                              --<Etkb_DepoNo, bit> \n " +
                ",@Etkb_StokKodu                            --<Etkb_StokKodu, varchar(25),> \n " +
                ",@Etkb_RenkNo                              --<Etkb_RenkNo, int,> \n " +
                ",@Etkb_BedenNo                             --<Etkb_BedenNo, int,> \n" +
                ",@Etkb_Barkodu                             --<Etkb_Barkodu, varchar(50),> \n" +
                ",@Etkb_BasilacakMiktar                     --<Etkb_BasilacakMiktar smallint,> \n" + 
                ")",               
            param :['Etkb_create_user:int','Etkb_lastup_user:int','Etkb_special1:string|50','Etkb_evrakno_seri:string|50','Etkb_evrakno_sira:int','Etkb_aciklama:string|50','Etkb_satirno:int',
                    'Etkb_belge_no:string|50','Etkb_EtiketTip:int','Etkb_BasimTipi:int','Etkb_BasimAdet:int','Etkb_DepoNo:int','Etkb_StokKodu:string|50','Etkb_RenkNo:int','Etkb_BedenNo:int',
                    'Etkb_Barkodu:string|50','Etkb_BasilacakMiktar:int']
    },
    MaxEtiketSira : 
    {
        query : "SELECT ISNULL(MAX(Etkb_evrakno_sira),0) + 1 AS MAXEVRSIRA FROM ETIKETBAS " +
                "WHERE Etkb_evrakno_seri=@Etkb_evrakno_seri",
        param : ['Etkb_evrakno_seri'],
        type : ['string|50']
    },
    //DepoSiparis
    DepoSiparisGetir :
    {
        query : "SELECT ssip_RECid_RECno AS ssip_Guid, ssip_tutar AS TUTAR, ssip_b_fiyat AS FIYAT, ssip_miktar AS MIKTAR, " +
                "ISNULL((SELECT sto_isim from STOKLAR WHERE sto_kod=ssip_stok_kod),'') AS ADI , " +
                "ssip_RECid_RECno AS ssip_Guid, " +
                "ssip_stok_kod AS KODU, " +
                "ssip_birim_pntr AS BIRIM, " + 
                "ROW_NUMBER() OVER(ORDER BY ssip_RECid_RECno) AS NO, * " +
                "FROM DEPOLAR_ARASI_SIPARISLER " +
                "WHERE ssip_evrakno_seri=@ssip_evrakno_seri AND ssip_evrakno_sira=@ssip_evrakno_sira " +
                "ORDER BY ssip_satirno ",
        param : ['ssip_evrakno_seri','ssip_evrakno_sira'],
        type : ['string|25','int']
    },
    DepoSiparisInsert :
    {
        query : "DECLARE @UIDTABLE table([ssip_RECid_RECno] [int]) " +
                "INSERT INTO [DEPOLAR_ARASI_SIPARISLER] " +
                "([ssip_RECid_DBCno] " +
                ",[ssip_RECid_RECno] " +
                ",[ssip_SpecRECno] " +
                ",[ssip_iptal] " +
                ",[ssip_fileid] " +
                ",[ssip_hidden] " +
                ",[ssip_kilitli] " +
                ",[ssip_degisti] " +
                ",[ssip_checksum] " +
                ",[ssip_create_user] " +
                ",[ssip_create_date] " +
                ",[ssip_lastup_user] " +
                ",[ssip_lastup_date] " +
                ",[ssip_special1] " +
                ",[ssip_special2] " +
                ",[ssip_special3] " +
                ",[ssip_firmano] " +
                ",[ssip_subeno] " +
                ",[ssip_tarih] " +
                ",[ssip_teslim_tarih] " +
                ",[ssip_evrakno_seri] " +
                ",[ssip_evrakno_sira] " +
                ",[ssip_satirno] " +
                ",[ssip_belgeno] " +
                ",[ssip_belge_tarih] " +
                ",[ssip_stok_kod] " +
                ",[ssip_miktar] " +
                ",[ssip_b_fiyat] " +
                ",[ssip_tutar] " +
                ",[ssip_teslim_miktar] " +
                ",[ssip_aciklama] " +
                ",[ssip_girdepo] " +
                ",[ssip_cikdepo] " +
                ",[ssip_kapat_fl] " +
                ",[ssip_birim_pntr] " +
                ",[ssip_fiyat_liste_no] " +
                ",[ssip_stalRecId_DBCno] " +
                ",[ssip_stalRecId_RECno] " +
                ",[ssip_paket_kod] " +
                ",[ssip_kapatmanedenkod] " +
                ",[ssip_projekodu] " +
                ",[ssip_sormerkezi] " +
                ",[ssip_gecerlilik_tarihi] " +
                ",[ssip_rezervasyon_miktari] " +
                ",[ssip_rezerveden_teslim_edilen] " +
                ") " +
                "OUTPUT INSERTED.[ssip_RECid_RECno] INTO @UIDTABLE " +
                "VALUES " +
                "(0							--<ssip_RECid_DBCno, smallint,> \n" +
                ",IDENT_CURRENT('DEPOLAR_ARASI_SIPARISLER') 	--<ssip_RECid_RECno, int,> \n" +
                ",0							--<ssip_SpecRECno, int,> \n" +
                ",0							--<ssip_iptal, bit,> \n" +
                ",86							--<ssip_fileid, smallint,> \n" +
                ",0							--<ssip_hidden, bit,> \n" +
                ",0							--<ssip_kilitli, bit,> \n" +
                ",0							--<ssip_degisti, bit,> \n" +
                ",0							--<ssip_checksum, int,> \n" +
                ",@ssip_create_user							--<ssip_create_user, smallint,> \n" +
                ",CONVERT(NVARCHAR(10),GETDATE(),112) 		--<ssip_create_date, datetime,> \n" +
                ",@ssip_lastup_user					--<ssip_lastup_user, smallint,> \n" +
                ",CONVERT(NVARCHAR(10),GETDATE(),112) 		--<ssip_lastup_date, datetime,> \n" +
                ",''							--<ssip_special1, varchar(4),> \n" +
                ",''							--<ssip_special2, varchar(4),> \n" +
                ",''							--<ssip_special3, varchar(4),> \n" +
                ",@ssip_firmano					--<ssip_firmano, int,> \n" +
                ",@ssip_subeno					--<ssip_subeno, int,> \n" +
                ",@ssip_tarih						--<ssip_tarih, datetime,> \n" +
                ",@ssip_teslim_tarih					--<ssip_teslim_tarih, datetime,> \n" +
                ",@ssip_evrakno_seri					--<ssip_evrakno_seri, varchar(4),> \n" +
                ",@ssip_evrakno_sira					--<ssip_evrakno_sira, int,> \n" +
                ",(SELECT ISNULL(MAX(ssip_satirno),-1) + 1 AS SATIRNO FROM DEPOLAR_ARASI_SIPARISLER WHERE ssip_evrakno_seri = @ssip_evrakno_seri AND ssip_evrakno_sira = @ssip_evrakno_sira)	--<ssip_satirno, int,> \n" +
                ",@ssip_belgeno					--<ssip_belgeno, varchar(15),> \n" +
                ",@ssip_belge_tarih					--<ssip_belge_tarih, datetime,> \n" +
                ",@ssip_stok_kod					--<ssip_stok_kod, varchar(25),> \n" +
                ",@ssip_miktar					--<ssip_miktar, float,> \n" +
                ",@ssip_b_fiyat					--<ssip_b_fiyat, float,> \n" +
                ",@ssip_tutar						--<ssip_tutar, float,> \n" +
                ",@ssip_teslim_miktar					--<ssip_teslim_miktar, float,> \n" +
                ",''							--<ssip_aciklama, varchar(50),> \n" +
                ",@ssip_girdepo					--<ssip_girdepo, int,> \n" +
                ",@ssip_cikdepo					--<ssip_cikdepo, int,> \n" +
                ",0							--<ssip_kapat_fl, bit,> \n" +
                ",@ssip_birim_pntr					--<ssip_birim_pntr, tinyint,> \n" +
                ",@ssip_fiyat_liste_no				--<ssip_fiyat_liste_no, int,> \n" +
                ",0							--<ssip_stalRecId_DBCno, smallint,> \n" +
                ",0							--<ssip_stalRecId_RECno, int,> \n" +
                ",''							--<ssip_paket_kod, varchar(25),> \n" +
                ",''                           --<ssip_kapatmanedenkod, varchar(25),> \n" +
                ",''                          --<ssip_projekodu, varchar(25),> \n" +
                ",@ssip_sormerkezi                          --<ssip_sormerkezi, varchar(25),> \n" +
                ",''                          --<ssip_gecerlilik_tarihi, datetime,> \n" +
                ",0                           --<ssip_rezervasyon_miktari, float,> \n" +
                ",0                          --<ssip_rezerveden_teslim_edilen, float,> \n" +
                ") " +
                "SELECT [ssip_RECid_RECno] FROM @UIDTABLE ",
            param :['ssip_create_user:int','ssip_lastup_user:int','ssip_firmano:int','ssip_subeno:int','ssip_tarih:date','ssip_teslim_tarih:date','ssip_evrakno_seri:string|25',
                    'ssip_evrakno_sira:int','ssip_belgeno:string|25','ssip_belge_tarih:date','ssip_stok_kod:string|25','ssip_miktar:float','ssip_b_fiyat:float','ssip_tutar:float',
                    'ssip_teslim_miktar:float','ssip_girdepo:int','ssip_cikdepo:int','ssip_birim_pntr:int','ssip_fiyat_liste_no:int','ssip_sormerkezi:string|25']
    },
    DepoSiparisEvrakDelete :
    {
        query : "DELETE FROM DEPOLAR_ARASI_SIPARISLER WHERE ssip_evrakno_seri=@ssip_evrakno_seri AND ssip_evrakno_sira=@ssip_evrakno_sira ",
        param : ['ssip_evrakno_seri:string|25','ssip_evrakno_sira:int']
    },
    DepoSiparisSatirDelete :
    {
        query : "DELETE FROM DEPOLAR_ARASI_SIPARISLER WHERE ssip_RECid_RECno=@ssip_Guid ",
        param : ['ssip_Guid:int']
    },
    DepoSiparisUpdate :
    {
        query : "UPDATE DEPOLAR_ARASI_SIPARISLER SET ssip_miktar=@ssip_miktar WHERE ssip_RECid_RECno = @ssip_Guid ",
        param :['ssip_miktar:float','ssip_Guid:int']
    },
    DepoSiparisMaxSira :
    {
        query : "SELECT ISNULL(MAX(ssip_evrakno_sira),0) + 1 AS MAXEVRSIRA FROM DEPOLAR_ARASI_SIPARISLER WHERE ssip_evrakno_seri=@ssip_evrakno_seri ",
        param :['ssip_evrakno_seri:string|25']
    },
    //#region "AKTARIM"
    AdresTbl : 
    {
        query : "SELECT adr_cari_kod AS CARIKODU," +
                "adr_adres_no AS ADRESNO," +
                "adr_cadde AS CADDE," +
                "adr_sokak AS SOKAK," +
                "adr_ilce AS ILCE," +
                "adr_il AS IL," +
                "cari_sektor_kodu AS SEKTOR," +
                "cari_grup_kodu AS GRUBU," +
                "cari_bolge_kodu AS BOLGE," +
                "cari_temsilci_kodu AS TEMSILCI " +
                "FROM CARI_HESAP_ADRESLERI AS ADRES " +
                "INNER JOIN CARI_HESAPLAR AS CARI ON " +
                "ADRES.adr_cari_kod = CARI.cari_kod" 
    },
    AlisSartiTbl :
    {
        query : "SELECT sas_stok_kod AS STOKKOD, " +
                "sas_cari_kod AS CARIKOD, " +
                "sas_bitis_tarih AS BITIS, " +
                "sas_basla_tarih AS BASLANGIC, " +
                "sas_brut_fiyat AS FIYAT, " +
                "sas_isk_miktar1 AS ISKONTOM1, " +
                "sas_isk_miktar2 AS ISKONTOM2, " +
                "sas_isk_miktar3 AS ISKONTOM2, " +
                "sas_isk_miktar4 AS ISKONTOM2, " +
                "sas_isk_miktar5 AS ISKONTOM2, " +
                "sas_isk_yuzde1 AS ISKONTOY1, " +
                "sas_isk_yuzde2 AS ISKONTOY1, " +
                "sas_isk_yuzde3 AS ISKONTOY1, " +
                "sas_isk_yuzde4 AS ISKONTOY1, " +
                "sas_isk_yuzde5 AS ISKONTOY1, " +
                "sas_odeme_plan AS ODEPLAN, " +
                "sas_odeme_plan AS ODEPLAN, " +
                "sas_depo_no AS DEPO," +
                "1 AS LISTENO, " +
                "(SELECT dbo.fn_DovizSembolu(ISNULL(sas_doviz_cinsi, 0))) AS DOVIZSEMBOL, " +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10), GETDATE(), 112), ISNULL(sas_doviz_cinsi, 0), 2)) AS DOVIZKUR, " +           
                "cari_sektor_kodu AS SEKTOR, " +
                "cari_bolge_kodu AS BOLGE, " +
                "cari_grup_kodu AS GRUP, " +
                "cari_temsilci_kodu AS TEMSILCI " +
                "FROM SATINALMA_SARTLARI AS ALIS " +
                "INNER JOIN CARI_HESAPLAR AS CARI ON " +
                "ALIS.sas_cari_kod = CARI.cari_kod"
    },
    AltGrupTbl :
    {
        query : "SELECT  sta_kod AS KODU, " +
                "sta_isim AS ADI " +
                "FROM STOK_ALT_GRUPLARI"
    },
    AnaGrupTbl : 
    {
        query : "san_kod AS KODU, " +
                "san_isim AS ADI " +
                "FROM STOK_ANA_GRUPLARI"
    },
    BankaTbl : 
    {
        query : "ban_kod AS BANKAKODU, " +
                "ban_ismi AS BANKAISMI, " +
                "ban_doviz_cinsi AS BANKADOVIZCINSI, " +
                "(SELECT dbo.fn_DovizSembolu(ISNULL(ban_doviz_cinsi,0))) AS DOVIZSEMBOL, " +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(ban_doviz_cinsi,0),2)) AS DOVIZKUR " +
                "FROM BANKALAR"
    },
    CariTbl :
    {
        query : "cari_kod AS KODU, " +
                "cari_cari_kilitli_flg AS CKILIT, " +
                "cari_unvan1 AS UNVAN1, " +
                "cari_unvan2 AS UNVAN2, " +
                "cari_doviz_cinsi AS DOVIZCINSI, " +
                "cari_doviz_cinsi1 AS DOVIZCINSI1, " +
                "cari_doviz_cinsi2 AS DOVIZCINSI2, " +
                "cari_vdaire_adi AS VDADI, " +
                "cari_vdaire_no AS VDNO, " +
                "cari_satis_fk AS SATISFK, " +
                "cari_satis_isk_kod AS ISKONTOKOD, " +
                "cari_sektor_kodu AS SEKTOR, " +
                "cari_bolge_kodu AS BOLGE, " +
                "cari_grup_kodu AS GRUP, " +
                "cari_temsilci_kodu AS TEMSILCI, " +
                "(SELECT dbo.fn_DovizSembolu(ISNULL(cari_doviz_cinsi,0))) AS DOVIZSEMBOL, " +
                "(SELECT dbo.fn_DovizSembolu(ISNULL(cari_doviz_cinsi1,0))) AS DOVIZSEMBOL1, " +
                "(SELECT dbo.fn_DovizSembolu(ISNULL(cari_doviz_cinsi2,0))) AS DOVIZSEMBOL2, " +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(cari_doviz_cinsi,0),2)) AS DOVIZKUR, " +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(cari_doviz_cinsi1,0),2)) AS DOVIZKUR1, " +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(cari_doviz_cinsi2,0),2)) AS DOVIZKUR2, " +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(1,0),2)) AS ALTDOVIZKUR, " +
                "ISNULL((SELECT sum(ct_tutari) FROM dbo.CARI_HESAP_TEMINATLARI WHERE ct_carikodu = cari_kod),0) AS RISK, " +
                "cari_odemeplan_no AS ODEMEPLANI, " +
                "ISNULL((SELECT dbo.fn_CariHesapBakiye(0,cari_baglanti_tipi,cari_kod,'',,0,cari_doviz_cinsi)),0) AS BAKIYE, " +
                "CARI_MUSTAHSIL_TANIMLARI.Cm_BelgeNo as BELGENO, CARI_MUSTAHSIL_TANIMLARI.Cm_GecerlilikTarihi as BELGETARIH, " +
                "cari_BUV_tabi_fl AS VERGISIZ, " +
                "cari_efatura_fl AS EFATURA " +
                "FROM CARI_MUSTAHSIL_TANIMLARI RIGHT OUTER JOIN " +
                "CARI_HESAPLAR ON CARI_MUSTAHSIL_TANIMLARI.Cm_carikodu = CARI_HESAPLAR.cari_kod"
    },
    CariFoyTbl :
     {
         query : "SELECT TOP 5, " +
                 "[#msg_S_0200] AS [KODU], " +
                 "[#msg_S_0201] AS [ADI], " +
                 "[msg_S_0090] AS [SERI], " +
                 "[msg_S_0091] AS [SIRA], " +
                 "[#msg_S_0092] AS [TARIH], " +
                 "[msg_S_0094] AS [EVRAKTIP], " +
                 "[msg_S_0003] AS [CINSI], " +
                 "[msg_S_0097] AS [NI], " +
                 "[msg_S_0100] AS [BA], " +
                 "[msg_S_0101\T] AS [BORC], " +
                 "[msg_S_0102\T] AS [ALACAK], " +
                 "[#msg_S_0103\T] AS [BAKIYE], " +
                 "DATEDIFF(DAY,[#msg_S_0092],GETDATE()) AS [GUNFARK], " +
                 "dbo.fn_CariHesapBakiye(0,0,[#msg_S_0200],'','',0,0) as TBAKIYE  " +
                 "FROM [dbo].[fn_CariFoy] " +
                 "(0 ,0 ,@KODU ,0 ,@DEVIRTARIH ,@ILKTARIH ,@SONTARIH ,0 ,'') " +
                 "order by [#msg_S_0092] DESC"
    },
    DepoTbl : 
     {
         query : "dep_no AS DEPONO, " +
                 "dep_adi AS DEPOADI, " +
                 "dep_cadde AS DEPOCADDE, " +
                 "dep_sokak AS DEPOSOKAK, " +
                 "dep_Ilce AS DEPOILCE, " +
                 "dep_Il AS DEPOIL " +
                 "FROM DEPOLAR"
    },
    DepoSiparisStok : 
     {
         query : "SELECT CONVERT(NVARCHAR(50),DEPOSIPARIS.ssip_RECno) AS RECNO, " +
                 "BARKOD.bar_kodu AS BARKOD, " +
                 "DEPOSIPARIS.ssip_stok_kod AS KODU, " +
                 "ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod=DEPOSIPARIS.ssip_stok_kod),'') AS ADI, " +
                 "DEPOSIPARIS.ssip_tarih AS TARIH, " +
                 "DEPOSIPARIS.ssip_teslim_tarih AS TESLIMTARIH, " +
                 "DEPOSIPARIS.ssip_evrakno_seri AS SERI, " +
                 "DEPOSIPARIS.ssip_evrakno_sira AS SIRA, " +
                 "DEPOSIPARIS.ssip_satirno AS SATIRNO, " +
                 "DEPOSIPARIS.ssip_belgeno AS BELGENO, " +
                 "DEPOSIPARIS.ssip_b_fiyat AS BFIYAT, " +
                 "DEPOSIPARIS.ssip_miktar AS SIPMIKTAR, " +
                 "DEPOSIPARIS.ssip_birim_pntr AS BIRIMPNTR, " +
                 "DEPOSIPARIS.ssip_teslim_miktar AS TESLIMMIKTAR, " +
                 "DEPOSIPARIS.ssip_tutar AS TUTAR, " +
                 "DEPOSIPARIS.ssip_girdepo AS GDEPO, " +
                 "DEPOSIPARIS.ssip_cikdepo As CDEPO, " +
                 "(DEPOSIPARIS.ssip_miktar - DEPOSIPARIS.ssip_teslim_miktar) AS BMIKTAR, " +
                 "CAST(ISNULL(NULL,0) AS FLOAT) AS MIKTAR, " +
                 "(SELECT dbo.fn_StokBirimi (DEPOSIPARIS.ssip_stok_kod,DEPOSIPARIS.ssip_birim_pntr)) AS BIRIM, " +
                 "0 AS BEDENNO, " +
                 "BARKOD.bar_bedenpntr AS BEDENPNTR, " +
                 "BARKOD.bar_renkpntr AS RENKPNTR, " +
                 "'' AS RENK, " +
                 "'' AS BEDEN, " +
                 "ISNULL((SELECT dbo.fn_StokBirimHesapla (DEPOSIPARIS.ssip_stok_kod,BARKOD.bar_birimpntr,1,1)),1) AS KATSAYI, " +
                 "0 AS DEPOMIKTAR, " +
                 "STOK.sto_detay_takip AS DETAYTAKIP " +
                 "FROM DEPOLAR_ARASI_SIPARISLER AS DEPOSIPARIS " +
                 "INNER JOIN BARKOD_TANIMLARI AS BARKOD ON " +
                 "DEPOSIPARIS.ssip_stok_kod=BARKOD.bar_stokkodu " +
                 "AND DEPOSIPARIS.ssip_birim_pntr=BARKOD.bar_birimpntr " +
                 "AND DEPOSIPARIS.ssip_teslim_miktar < DEPOSIPARIS.ssip_miktar " +
                 "INNER JOIN STOKLAR AS STOK ON STOK.sto_kod = DEPOSIPARIS.ssip_stok_kod"
    },
    FiyatTbl :
     {
         query : "sfiyat_stokkod AS STOKKODU, " +
                 "sfiyat_listesirano AS LISTENO, " +
                 "ISNULL((SELECT sfl_aciklama FROM STOK_SATIS_FIYAT_LISTE_TANIMLARI WHERE sfl_sirano=FIYAT.sfiyat_listesirano),'') AS LISTEADI, " +
                 "sfiyat_deposirano AS DEPONO, " +
                 "sfiyat_odemeplan AS ODEMENO, " +
                 "CASE (SELECT sfl_kdvdahil FROM STOK_SATIS_FIYAT_LISTE_TANIMLARI WHERE sfl_sirano=FIYAT.sfiyat_listesirano), " +
                 "WHEN 0 THEN FIYAT.sfiyat_fiyati, " +
                 "ELSE FIYAT.sfiyat_fiyati / (((SELECT dbo.fn_VergiYuzde (STOK.sto_toptan_vergi)) / 100) + 1), " +
                 "END AS FIYAT, " +
                 "sfiyat_doviz AS DOVIZ, " +
                 "(SELECT dbo.fn_DovizSembolu(ISNULL(sfiyat_doviz,0))) AS DOVIZSEMBOL, " +
                 "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(sfiyat_doviz,0),2)) AS DOVIZKUR, " +
                 "sto_isim AS ADI, " +
                 "sto_altgrup_kod AS ALTGRUP, " +
                 "sto_uretici_kodu AS URETICI, " +
                 "sto_sektor_kodu AS SEKTOR, " +
                 "sto_reyon_kodu AS REYON, " +
                 "sto_marka_kodu AS MARKA, " +
                 "sfiyat_iskontokod AS ISKONTOKOD " +
                 "FROM STOK_SATIS_FIYAT_LISTELERI AS FIYAT " +
                 "INNER JOIN STOKLAR AS STOK ON " +
                 "FIYAT.sfiyat_stokkod = STOK.sto_kod " +
                 "INNER JOIN BARKOD_TANIMLARI AS BARKOD WITH (NOLOCK,INDEX=NDX_BARKOD_TANIMLARI_02) ON " +
                 "STOK.sto_kod = BARKOD.bar_stokkodu"
    },
    IsEmirleriTbl :
    {
        query : "SELECT is_Kod AS KODU, " +
                "is_Ismi AS ADI " +
                "FROM ISEMIRLERI"
    },
    IskontoTbl :
    {
        query : "SELECT isk_stok_kod AS STOK, " +
                "isk_cari_kod AS CARI, " +
                "isk_isim AS ISIM, " +
                "isk_uygulama_odeme_plani AS ODEMEPLANI, " +
                "isk_isk1_yuzde AS ISKONTO1, " +
                "isk_isk2_yuzde AS ISKONTO2, " +
                "isk_isk3_yuzde AS ISKONTO3, " +
                "isk_isk4_yuzde AS ISKONTO4, " +
                "isk_isk5_yuzde AS ISKONTO5 " +
                "FROM STOK_CARI_ISKONTO_TANIMLARI"                
    },
    KasaTbl :
    {
        query : "kas_kod AS KASAKODU, " +
                "kas_isim AS KASAISMI, " +
                "kas_tip AS KASATIP, " +
                "kas_doviz_cinsi AS KASADOVIZCINSI, " +
                "(SELECT dbo.fn_DovizSembolu(ISNULL(kas_doviz_cinsi,0))) AS DOVIZSEMBOL, " +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(kas_doviz_cinsi,0),2)) AS DOVIZKUR " +
                "FROM KASALAR"
    },
    MarkaTbl :
    {
        query : "SELECT mrk_kod AS KODU, " +
                "mrk_ismi AS ADI " +
                "FROM STOK_MARKALARI"
    },
    OdemePlanTbl : 
    {
        query : "odp_no   AS ODEMENO, " +
                "odp_kodu AS ODEMEKODU, " +
                "odp_adi  AS ODEMEADI " +
                "FROM ODEME_PLANLARI"
    },
    PersonelTbl : 
    {
        query : "SELECT cari_per_kod AS PERSONELKODU, " +
                "cari_per_adi AS PERSONELADI, " +
                "cari_per_soyadi AS PERSONELSOYADI " +
                "FROM CARI_PERSONEL_TANIMLARI"
    },
    ProjelerTbl : 
    {
        query : "SELECT pro_kodu AS KODU, " +
                "pro_adi AS ADI, " +
                "pro_musterikodu AS MUSTERI " +
                "FROM PROJELER"
    },
    ReyonTbl :
    {
        query : "ryn_kod AS KODU, " +
                "ryn_ismi AS ADI " +
                "FROM STOK_REYONLARI"
    },
    SatisSartiTbl :
    {
        query : "SELECT sat_stok_kod AS STOKKOD, " +
                "sat_cari_kod AS CARIKOD, " +
                "sat_bitis_tarih AS BITIS, " +
                "sat_basla_tarih AS BASLANGIC, " +
                "sat_brut_fiyat AS FIYAT, " +
                "sat_det_isk_miktar1 AS ISKONTOM1, " +
                "sat_det_isk_miktar2 AS ISKONTOM2, " +
                "sat_det_isk_miktar3 AS ISKONTOM3, " +
                "sat_det_isk_miktar4 AS ISKONTOM4, " +
                "sat_det_isk_miktar5 AS ISKONTOM5, " +
                "sat_det_isk_miktar6 AS ISKONTOM6, " +
                "sat_det_isk_yuzde1 AS ISKONTOY1, " +
                "sat_det_isk_yuzde2 AS ISKONTOY2, " +
                "sat_det_isk_yuzde3 AS ISKONTOY3, " +
                "sat_det_isk_yuzde4 AS ISKONTOY4, " +
                "sat_det_isk_yuzde5 AS ISKONTOY5, " +
                "sat_det_isk_yuzde6 AS ISKONTOY6, " +
                "sat_odeme_plan AS ODEPLAN, " +
                "sat_doviz_cinsi AS DOVIZ, " +
                "sat_depo_no AS DEPO, " +
                "sat_fiyat_liste_no AS LISTENO, " +
                "(SELECT dbo.fn_DovizSembolu(ISNULL(sat_doviz_cinsi,0))) AS DOVIZSEMBOL, " +
                "(SELECT dbo.fn_KurBul(CONVERT(VARCHAR(10),GETDATE(),112),ISNULL(sat_doviz_cinsi,0),2)) AS DOVIZKUR, " +
                "cari_sektor_kodu AS SEKTOR, " +
                "cari_bolge_kodu AS BOLGE, " +
                "cari_grup_kodu AS GRUP, " +
                "cari_temsilci_kodu AS TEMSILCI " +
                "FROM SATIS_SARTLARI AS SATIS " +
                "INNER JOIN CARI_HESAPLAR AS CARI ON " +
                "SATIS.sat_cari_kod = CARI.cari_kod"
    },
    SenetTbl :
    {
        query : "SELECT sck_refno AS REFNO, " +
                "sck_vade AS VADE, " +
                "sck_tutar AS TUTAR, " +
                "sck_odenen AS ODENEN, " +
                "sck_sonpoz AS SONPOZ, " +
                "sck_nerede_cari_kodu AS NEREDECARI, " +
                "sck_borclu AS CARIADI, " +
                "sck_tip AS TIP, " +
                "sck_doviz AS DOVIZ, " +
                "sck_doviz_kur AS DOVIZKUR, " +
                "CONVERT(nvarchar(50),sck_RECno) AS RECNO, " +
                "cari_sektor_kodu AS SEKTOR, " +
                "cari_bolge_kodu AS BOLGE, " +
                "cari_grup_kodu AS GRUP, " +
                "cari_temsilci_kodu AS TEMSILCI " +
                "FROM ODEME_EMIRLERI AS SENET " +
                "INNER JOIN CARI_HESAPLAR AS CARI ON " +
                "SENET.sck_borclu = CARI.cari_unvan1"
    },
    SiparisStokTbl :
    {
        query : "SELECT CONVERT(NVARCHAR(50),SIPARIS.sip_RECno) AS RECNO, " +
                "ISNULL(BARKOD.bar_kodu,'''') AS BARKOD, " +
                "SIPARIS.sip_stok_kod AS KODU, " +
                "ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod=SIPARIS.sip_stok_kod),'') AS ADI, " +
                "SIPARIS.sip_tarih AS TARIH, " +
                "SIPARIS.sip_teslim_tarih AS TESLIMTARIH, " +
                "SIPARIS.sip_tip AS TIP, " +
                "SIPARIS.sip_cins AS CINS, " +
                "SIPARIS.sip_evrakno_seri AS SERI, " +
                "SIPARIS.sip_evrakno_sira AS SIRA, " +
                "SIPARIS.sip_satirno AS SATIRNO, " +
                "SIPARIS.sip_belgeno AS BELGENO, " +
                "SIPARIS.sip_belge_tarih AS BELGETARIH, " +
                "SIPARIS.sip_satici_kod AS SATICIKOD, " +
                "SIPARIS.sip_musteri_kod AS CARI, " +
                "SIPARIS.sip_b_fiyat AS BFIYAT, " +
                "SIPARIS.sip_miktar AS SIPMIKTAR, " +
                "SIPARIS.sip_birim_pntr AS BIRIMPNTR, " +
                "SIPARIS.sip_teslim_miktar AS TESLIMMIKTAR, " +
                "SIPARIS.sip_tutar AS TUTAR, " +
                "SIPARIS.sip_iskonto_1 AS ISKONTO_1, " +
                "SIPARIS.sip_iskonto_2 AS ISKONTO_2, " +
                "SIPARIS.sip_iskonto_3 AS ISKONTO_3, " +
                "SIPARIS.sip_iskonto_4 AS ISKONTO_4, " +
                "SIPARIS.sip_iskonto_5 AS ISKONTO_5, " +
                "SIPARIS.sip_iskonto_6 AS ISKONTO_6, " +
                "SIPARIS.sip_vergi_pntr AS VERGIPNTR,  " +
                "SIPARIS.sip_vergi AS VERGI, " +
                "SIPARIS.sip_opno AS ODEMENO, " +
                "SIPARIS.sip_depono AS DEPO, " +
                "SIPARIS.sip_cari_sormerk AS CARISORUMLU, " +
                "SIPARIS.sip_stok_sormerk AS STOKSORUMLU, " +
                "SIPARIS.sip_doviz_cinsi AS DOVIZCINSI, " +
                "SIPARIS.sip_doviz_kuru AS DOVIZKURU, " +
                "SIPARIS.sip_alt_doviz_kuru AS ALTDOVIZKURU, " +
                "SIPARIS.sip_adresno AS ADRESNO, " +
                "SIPARIS.sip_iskonto1 AS ISKONTO1, " +
                "SIPARIS.sip_iskonto2 AS ISKONTO2, " +
                "SIPARIS.sip_iskonto3 AS ISKONTO3, " +
                "SIPARIS.sip_iskonto4 AS ISKONTO4, " +
                "SIPARIS.sip_iskonto5 AS ISKONTO5, " +
                "SIPARIS.sip_iskonto6 AS ISKONTO6, " +
                "SIPARIS.sip_isk1 AS ISK1, " +
                "SIPARIS.sip_isk2 AS ISK2, " +
                "SIPARIS.sip_isk3 AS ISK3, " +
                "SIPARIS.sip_isk4 AS ISK4, " +
                "SIPARIS.sip_isk5 AS ISK5, " +
                "SIPARIS.sip_isk6 AS ISK6, " +
                "(SELECT dbo.fn_beden_kirilimi (bar_bedenpntr,sto_beden_kodu)) AS BEDEN, " +
                "(SELECT dbo.fn_renk_kirilimi (bar_renkpntr,sto_renk_kodu)) AS RENK, " +
                "ISNULL(BEDENHAR.BdnHar_BedenNo,0) AS BEDENNO, " +
                "CAST(ISNULL(NULL,0) AS FLOAT) AS MIKTAR, " +
                "(SELECT dbo.fn_StokBirimi (SIPARIS.sip_stok_kod,SIPARIS.sip_birim_pntr)) AS BIRIM, " +
                "ISNULL(BARKOD.bar_bedenpntr,0) AS BEDENPNTR, " +
                "ISNULL(BARKOD.bar_renkpntr,0) AS RENKPNTR, " +
                "ISNULL((SELECT dbo.fn_StokBirimHesapla (SIPARIS.sip_stok_kod,BARKOD.bar_birimpntr,1,1)),1) AS KATSAYI, " +
                "(SELECT dbo.fn_VergiYuzde (SIPARIS.sip_vergi_pntr)) AS VERGIORAN, " +
                "ISNULL((SELECT dbo.fn_DepodakiMiktar (SIPARIS.sip_stok_kod,SIPARIS.sip_depono  ,CONVERT(VARCHAR(10),GETDATE(),112))),0) AS DEPOMIKTAR, " +
                "ISNULL(BARKOD.bar_birimpntr,0) AS BARBIRIMPNTR, " +
                "SIPARIS.sip_Exp_Imp_Kodu AS EXIMKODU, " +
                "SIPARIS.sip_parti_kodu AS PARTI, " +
                "SIPARIS.sip_lot_no AS LOT, " +
                "STOK.sto_detay_takip AS DETAYTAKIP, " +
                "STOK.sto_siparis_dursun as SIPARISDURSUN, " +
                "STOK.sto_malkabul_dursun as MALKABULDURSUN, " +
                "SIPARIS.sip_aciklama AS ACIKLAMA  " +
                "FROM SIPARISLER AS SIPARIS " + 
                "LEFT OUTER JOIN BEDEN_HAREKETLERI AS BEDENHAR ON " +
                "BEDENHAR.[BdnHar_Tipi] = 9 AND [BdnHar_RECid_RECno] = SIPARIS.sip_RECno " +
                "LEFT JOIN BARKOD_TANIMLARI AS BARKOD ON  " +
                "SIPARIS.sip_stok_kod=BARKOD.bar_stokkodu  " +
                "AND SIPARIS.sip_teslim_miktar < SIPARIS.sip_miktar " +
                "INNER JOIN STOKLAR AS STOK ON  " +
                "SIPARIS.sip_stok_kod=STOK.sto_kod"
    },
    SonAlisFiyatiTbl : 
    {
        query : "SELECT Hesaplama.sth_cari_kodu AS CARI, " +
                "Hesaplama.sth_stok_kod AS STOK, " +
                "CASE WHEN STOKHAREKETLERI.sth_tutar = 0 OR STOKHAREKETLERI.sth_miktar = 0 THEN, " +
                "ELSE STOKHAREKETLERI.sth_tutar / STOKHAREKETLERI.sth_miktar END AS SONFIYAT , " +
                "FROM (SELECT TOP (100) PERCENT MAX(sth_RECno) AS Recno, sth_cari_kodu, sth_stok_kod " +
                "FROM STOK_HAREKETLERI " +
                "WHERE (sth_evraktip = 3 OR sth_evraktip = 13) " +
                "GROUP BY sth_cari_kodu, sth_stok_kod " +
                "ORDER BY Recno DESC) AS Hesaplama INNER JOIN " +
                "STOK_HAREKETLERI AS STOKHAREKETLERI ON Hesaplama.Recno = STOKHAREKETLERI.sth_RECno"
    },
    SonSatisFiyatiTbl :
    {
        query : "SELECT Hesaplama.sth_cari_kodu AS CARI, Hesaplama.sth_stok_kod AS STOK, " +
                "CASE WHEN STOKHAREKETLERI.sth_tutar = 0 OR STOKHAREKETLERI.sth_miktar = 0 THEN 0, " +
                "ELSE STOKHAREKETLERI.sth_tutar / STOKHAREKETLERI.sth_miktar - (STOKHAREKETLERI.sth_tutar / STOKHAREKETLERI.sth_miktar), " +
                "* (STOKHAREKETLERI.sth_iskonto1 + STOKHAREKETLERI.sth_iskonto2 + STOKHAREKETLERI.sth_iskonto3 + STOKHAREKETLERI.sth_iskonto4 + STOKHAREKETLERI.sth_iskonto5, " +
                "+ STOKHAREKETLERI.sth_iskonto6) / 100 END AS SONFIYAT " +
                "FROM (SELECT TOP (100) PERCENT MAX(sth_RECno) AS Recno, sth_cari_kodu, sth_stok_kod " +  
                "FROM STOK_HAREKETLERI " +
                "WHERE (sth_evraktip = 4 OR sth_evraktip = 1) " +
                "GROUP BY sth_cari_kodu, sth_stok_kod " +
                "ORDER BY Recno DESC) AS Hesaplama INNER JOIN " +
                "STOK_HAREKETLERI AS STOKHAREKETLERI ON Hesaplama.Recno = STOKHAREKETLERI.sth_RECno INNER JOIN " +
                "CARI_HESAPLAR ON Hesaplama.sth_cari_kodu = CARI_HESAPLAR.cari_kod"
    },
    SorumlulukMrkzTbl : 
    {
        query : "SELECT som_kod AS SORUMLULUKKODU , " +
                "som_isim AS SORUMLULUKISMI " +
                "FROM SORUMLULUK_MERKEZLERI"
    },
    StokTbl :
    {
        query : "SELECT sto_kod AS KODU, " + 
                "sto_isim AS ADI, " +
                "sto_kisa_ismi AS KISAAD, " + 
                "sto_yabanci_isim AS YABANCIAD, " + 
                "sto_doviz_cinsi AS DOVIZCINSI, " + 
                "sto_perakende_vergi AS PERAKENDEVERGIPNTR, " + 
                "sto_toptan_vergi AS TOPTANVERGIPNTR, " + 
                "sto_altgrup_kod AS ALTGRUP, " + 
                "sto_anagrup_kod AS ANAGRUP, " + 
                "sto_uretici_kodu AS URETICI, " + 
                "sto_sektor_kodu AS SEKTOR, " + 
                "sto_reyon_kodu AS REYON, " + 
                "sto_marka_kodu AS MARKA, " +
                "sto_beden_kodu AS BEDENKODU, " + 
                "sto_renk_kodu AS RENKKODU, " + 
                "sto_pasif_fl AS AKTIFPASIF, " +
                "(SELECT dbo.fn_VergiYuzde (sto_perakende_vergi)) AS PERAKENDEVERGI, " +
                "(SELECT dbo.fn_VergiYuzde (sto_toptan_vergi)) AS TOPTANVERGI, " +
                "sto_detay_takip AS DETAYTAKIP, " +
                "ISNULL((SELECT dbo.fn_DepodakiMiktar (STOK.sto_kod,1,CONVERT(VARCHAR(10),GETDATE(),112))),0) AS DEPOMIKTAR, " + 
                "ISNULL((SELECT dbo.fn_DepodakiMiktar (STOK.sto_kod,2,CONVERT(VARCHAR(10),GETDATE(),112))),0) AS DEPOMIKTAR2, " + 
                "sto_siparis_dursun AS SIPARISDURSUN, " + 
                "sto_malkabul_dursun as MALKABULDURSUN, " + 
                "sto_otvtutar AS OTVTUTAR " + 
                "FROM STOKLAR AS STOK"
    },
    UreticiTbl :
    {
        query : "SELECT  urt_kod AS KODU, " +
                "urt_ismi AS ADI " +
                "FROM STOK_URETICILERI"
    },
    UretimStokTbl :
    {
        query : "SELECT CONVERT(NVARCHAR(50),URETIM.upl_RECno) AS RECNO, " +
                "ISNULL(BARKOD.bar_kodu,'') AS BARKOD, " +
                "URETIM.upl_kodu AS KODU, " +
                "ISNULL((SELECT sto_isim FROM STOKLAR WHERE sto_kod=URETIM.upl_kodu),'') AS ADI, " +
                "URETIM.upl_har_tarih AS TARIH, " +
                "URETIM.upl_satirno AS SATIRNO, " +
                "URETIM.upl_uretim_tuket AS TIP, " +
                "URETIM.upl_isemri AS ISEMRI, " +
                "URETIM.upl_miktar AS PMIKTAR, " +
                "CASE WHEN URETIM.upl_uretim_tuket = 1 THEN " +
                "ISNULL((SELECT SUM(sth_miktar) FROM STOK_HAREKETLERI WHERE sth_isemri_gider_kodu = URETIM.upl_isemri AND sth_stok_kod = URETIM.upl_kodu AND sth_tip = 0 AND sth_cins = 7 AND sth_evraktip = 12),0) " +
                "WHEN URETIM.upl_uretim_tuket = 0 THEN " +
                "ISNULL((SELECT SUM(sth_miktar) FROM STOK_HAREKETLERI WHERE sth_isemri_gider_kodu = URETIM.upl_isemri AND sth_stok_kod = URETIM.upl_kodu AND sth_tip = 1 AND sth_cins = 7 AND sth_evraktip = 0),0) " +
                "ELSE 0 END AS GMIKTAR, " +
                "URETIM.upl_depno AS DEPO, " +
                "CAST(ISNULL(NULL,0) AS FLOAT) AS MIKTAR, " +
                "ISNULL(BARKOD.bar_bedenpntr,0) AS BEDENPNTR, " +
                "ISNULL(BARKOD.bar_renkpntr,0) AS RENKPNTR, " +
                "1 AS KATSAYI, " +
                "URETIM.upl_parti_kod AS PARTI, " +
                "URETIM.upl_lotno AS LOT, " +
                "STOK.sto_detay_takip AS DETAYTAKIP " +
                "FROM URETIM_MALZEME_PLANLAMA AS URETIM " +
                "FULL OUTER JOIN BARKOD_TANIMLARI AS BARKOD ON " + 
                "URETIM.upl_kodu=BARKOD.bar_stokkodu " +
                "INNER JOIN STOKLAR AS STOK ON " +
                "URETIM.upl_kodu=STOK.sto_kod" 
    },
    VergiTbl : 
    {
        query : "SELECT dbo.fn_VergiYuzde ({1}) AS ORAN"
    }
    //#endregion "AKTARIM"
};



