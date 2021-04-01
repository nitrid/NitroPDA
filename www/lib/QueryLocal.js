var QueryLocal = 
{
    Stok : 
    {
        query : "SELECT * FROM STOK WHERE ((KODU = @KODU) OR (@KODU = ''))",
        param : ['KODU'],
        type : ['string']
    },
    ParamInsert:
    {
        query : "INSERT INTO PARAM VALUES (?)"
    },
    ParamGetir:
    {
        query : "SELECT * FROM PARAM"
    },
    CmbDepoGetir : 
    {
        query : "SELECT DEPONO AS KODU,DEPOADI AS ADI FROM DEPO"
    },
    CmbBirimGetir : 
    {
        query : "SELECT BIRIMPNTR AS BIRIMPNTR, " + 
                "BIRIM AS BIRIM, " + 
                "KATSAYI AS KATSAYI " + 
                "FROM BIRIM WHERE KODU = ?", 
    },
    CmbSorumlulukGetir : 
    {
        query : "SELECT '' AS KODU, '' AS ADI UNION ALL SELECT SORUMLULUKKODU AS KODU,SORUMLULUKISMI AS ADI FROM SORUMLULUKMRKZ"
    },
    CmbPersonelGetir : 
    {
        query : "SELECT '' AS KODU, '' AS ADI,'' AS SOYADI UNION ALL SELECT PER1.PERSONELKODU AS KODU,PER1.PERSONELADI AS ADI,PER1.PERSONELSOYADI AS SOYADI " +
                "FROM PERSONEL AS PER1 INNER JOIN PERSONEL AS PER2 ON " +
                "PER1.PERSONELKODU = PER2.PERSONELKODU --AND PER1.cari_per_tip = 0 "
    },
    CmbKasaGetir : 
    {
        query : "SELECT KASAKODU AS KODU,KASAISMI AS ADI,KASADOVIZCINSI AS DOVIZCINSI,DOVIZKUR AS DOVIZKUR, CASE KASADOVIZCINSI WHEN 0 THEN 'TL' WHEN 1 THEN 'USD' WHEN 2 THEN 'EURO' END AS DOVIZSEMBOL1,DOVIZSEMBOL FROM KASA WHERE KASATIP = @KASTIP" ,
        param : ['KASTIP'],
        type : ['int']
    }, 
    CmbBankaGetir : 
    {
        query : "SELECT BANKAKODU AS KODU,BANKAISMI AS ADI,BANKADOVIZCINSI AS DOVIZCINSI,DOVIZKUR AS DOVIZKUR, CASE BANKADOVIZCINSI WHEN 0 THEN 'TL' WHEN 1 THEN 'USD' WHEN 2 THEN 'EURO' END AS DOVIZSEMBOL1,DOVIZSEMBOL FROM BANKA " ,
    },
    PersonelTipGetir : 
    {
        query : "SELECT '' AS KODU, '' AS ADI,'' AS SOYADI,'' AS TIP UNION ALL SELECT PER1.PERSONELKODU AS KODU,PER1.PERSONELADI AS ADI,PER1.PERSONELSOYADI AS SOYADI,PER1.PERSONELTIP AS TIP " +
                "FROM PERSONEL AS PER1 INNER JOIN PERSONEL AS PER2 ON " +
                "PER1.PERSONELKODU = PER2.PERSONELKODU where PER1.PERSONELTIP in(@TIP,2) " ,
                param : ['TIP'],
                type : ['int'] 
    },
    CmbProjeGetir : 
    {
        query : "SELECT '' AS KODU, '' AS ADI UNION ALL SELECT KODU AS KODU,ADI AS ADI FROM PROJELER"
    },
    CmbOdemePlanGetir : 
    {
        query : "SELECT '0' AS KODU, 'PEŞİN' AS ADI UNION ALL SELECT ODEMENO AS KODU, " +
                "ODEMEADI  AS ADI FROM ODEMEPLAN"
    },
    CariGetir : 
    {
        query : "SELECT  KODU, " +
                "CKILIT," +
                "UNVAN1," +
                "UNVAN2," +
                "DOVIZCINSI," +
                "DOVIZCINSI1," +
                "DOVIZCINSI2," +
                "VDADI," +
                "VDNO," +
                "SATISFK," +
                "ISKONTOKOD," +
                "SEKTOR," +
                "BOLGE," +
                "GRUP," +
                "TEMSILCI," +
                "DOVIZSEMBOL," +
                "DOVIZSEMBOL1," + 
                "DOVIZSEMBOL2," +
                "DOVIZKUR," +
                "DOVIZKUR1," +
                "DOVIZKUR2," +
                "ALTDOVIZKUR," +
                "RISK," +
                "ODEMEPLANI," +
                "BAKIYE," +
                "BELGENO," +
                "BELGETARIH," +
                "VERGISIZ," +
                "EFATURA " +
                "FROM CARI " +
                "WHERE ((KODU LIKE '@KODU') OR ('@KODU' = ''))  AND ((UNVAN1 LIKE '@ADI') OR ('@ADI' = '')) ORDER BY KODU ASC",
            param : ['KODU','ADI'],
            type : ['string','string']
    },
    CariListeGetir : 
    {
        query : "SELECT  KODU, " +
                "CKILIT," +
                "UNVAN1," +
                "UNVAN2," +
                "DOVIZCINSI," +
                "DOVIZCINSI1," +
                "DOVIZCINSI2," +
                "VDADI," +
                "VDNO," +
                "SATISFK," +
                "ISKONTOKOD," +
                "SEKTOR," +
                "BOLGE," +
                "GRUP," +
                "TEMSILCI," +
                "DOVIZSEMBOL," +
                "DOVIZSEMBOL1," + 
                "DOVIZSEMBOL2," +
                "DOVIZKUR," +
                "DOVIZKUR1," +
                "DOVIZKUR2," +
                "ALTDOVIZKUR," +
                "RISK," +
                "ODEMEPLANI," +
                "BAKIYE," +
                "BELGENO," +
                "BELGETARIH," +
                "VERGISIZ," +
                "EFATURA " +
                "FROM CARI " +
                "WHERE ((KODU LIKE '@KODU') OR ('@KODU' = ''))  AND ((UNVAN1 LIKE '@ADI') OR ('@ADI' = '')) ORDER BY KODU ASC",
            param : ['KODU','ADI'],
            type : ['string','string']
    },
    BarkodGetir:
    {
        query : "SELECT STOK.KODU AS KODU, " +
                "ADI, " +
                "KISAAD, " +
                "YABANCIAD, " +
                "DOVIZCINSI, " +
                "PERAKENDEVERGIPNTR, " +
                "TOPTANVERGIPNTR, " +
                "ALTGRUP, " +
                "ANAGRUP, " +
                "URETICI, " +
                "SEKTOR, " +
                "REYON, " +
                "MARKA, " +
                "BEDENKODU, " +
                "RENKKODU, " +
                "AKTIFPASIF, " +
                "BARKOD, " +
                "BIRIMPNTR, " +
                "BEDENPNTR, " +
                "RENKPNTR, " +
                "PARTI, " +
                "LOT, " +
                "BARKODTIP, " +
                "BEDEN, " +
                "RENK, " +
                "PERAKENDEVERGI, " +
                "TOPTANVERGI, " +
                "KATSAYI, " +
                "BIRIM, " +
                "DETAYTAKIP, " +
                "DEPOMIKTAR, " +
                "KIRILIMMIKTAR, " +
                "SIPARISDURSUN, " +
                "MALKABULDURSUN, " +
                "OTVTUTAR " +
                "FROM STOK AS STOK INNER JOIN " +
                "BARKOD ON  STOK.KODU = BARKOD.KODU " +
                "WHERE BARKOD.BARKOD = '@BARKOD' AND '@DEPO' <> ''",
        param : ["BARKOD","DEPO"]
    },
    StokGetir:
    {
        query : "SELECT STOK.KODU AS KODU, " +
                "STOK.ADI AS ADI, " +
                "IFNULL((SELECT UNVAN1 FROM CARI WHERE KODU = STOK.STOKCARI),'') AS UNVAN1, " +
                "IFNULL((SELECT UNVAN2 FROM CARI WHERE KODU = STOK.STOKCARI),'') AS UNVAN2, " +
                "STOK.STOKCARI AS CARIKODU, " +
                "IFNULL(STOK.KATSAYI2 * -1,0) AS MIKTAR, " +
                "STOK.KISAAD AS KISAAD, " +
                "STOK.YABANCIAD AS YABANCIAD, " +
                "STOK.DOVIZCINSI AS DOVIZCINSI, " +
                "STOK.PERAKENDEVERGIPNTR AS PERAKENDEVERGIPNTR, " +
                "STOK.TOPTANVERGIPNTR AS TOPTANVERGIPNTR, " +
                "STOK.ALTGRUP AS ALTGRUP, " +
                "IFNULL((SELECT ADI FROM ALTGRUP WHERE KODU = STOK.ALTGRUP),'') AS ALTGRUPADI, " +
                "STOK.ANAGRUP AS ANAGRUP, " +
                "IFNULL((SELECT ADI FROM ANAGRUP WHERE KODU = STOK.ANAGRUP),'') AS ANAGRUPADI, " +
                "STOK.URETICI AS URETICI, " +
                "STOK.SEKTOR AS SEKTOR, " +
                "STOK.REYON AS REYON, " +
                "IFNULL((SELECT ADI FROM REYON WHERE KODU = STOK.REYON),'') AS REYONADI, " +
                "STOK.MARKA AS MARKA, " +
                "STOK.BEDENKODU AS BEDENKODU, " +
                "STOK.RENKKODU AS RENKKODU, " +
                "STOK.AKTIFPASIF AS AKTIFPASIF, " +
                "'' AS BARKOD, " +
                "1 AS BIRIMPNTR, " +
                "0 AS BEDENPNTR, " +
                "0 AS RENKPNTR, " +
                "'' AS PARTI, " +
                "0 AS LOT, " +
                "0 AS BARKODTIP, " +
                "'' AS BEDEN, " +
                "'' AS RENK, " +
                "STOK.PERAKENDEVERGI AS PERAKENDEVERGI, " +
                "STOK.TOPTANVERGI AS TOPTANVERGI, " +
                "1 AS KATSAYI, " +
                "'' AS BIRIM, " +
                "STOK.DETAYTAKIP AS DETAYTAKIP, " +
                "STOK.DEPOMIKTAR AS DEPOMIKTAR, " +
                "0 AS KIRILIMMIKTAR, " +
                "STOK.SIPARISDURSUN AS SIPARISDURSUN, " +
                "STOK.MALKABULDURSUN as MALKABULDURSUN, " +
                "STOK.OTVTUTAR AS OTVTUTAR " +
                "FROM STOK AS STOK " +
                "WHERE ((STOK.KODU LIKE '@KODU') OR ('@KODU' = '')) AND ((STOK.ADI LIKE '@ADI') OR ('@ADI' = '')) " +
                "AND ((STOK.MARKA LIKE '@MKODU') OR ('@MKODU' = '')) AND '@DEPO' <> ''" ,
        param : ['KODU','ADI','DEPO','MKODU']
    },
    StokAdiGetir : 
    {
        query : "SELECT " +
                "KODU AS KODU, " +
                "ADI AS ADI, " +
                "DEPOMIKTAR AS DEPOMIKTAR, " +
                "'' AS BIRIM1, " +
                "DOVIZCINSI AS DOVIZCINS, " +
                "KODU AS BARKOD " +
                "FROM STOK " +
                "WHERE ((UPPER(KODU) LIKE UPPER('@KODU') OR LOWER(KODU) LIKE LOWER('@KODU')) OR ('@KODU' = '')) AND ((UPPER(ADI) LIKE UPPER('@KODU') OR LOWER(ADI) LIKE LOWER('@KODU')) OR ('@KODU' = '')) " ,
        param : ['KODU',"ADI",'DEPONO'],
        type :  ['string|25','string|50','int']
    },
    PartiLotGetir :
    {
        query : "SELECT PARTI AS PARTI, " + 
                "LOT AS LOT, " +
                "STOK AS STOK, " +
                "MIKTAR AS MIKTAR, " +
                "0 AS KALAN, " +
                "SKTTARIH AS SKTTARIH " + 
                "FROM PARTI " +
                "WHERE STOK = '@STOK' " +
                "AND ((PARTI = '@PARTI') OR ('@PARTI' = '')) AND ((LOT = @LOT) OR (@LOT = 0)) " +
                "ORDER BY PARTI ASC ",
        param : ['STOK','DEPONO','PARTI','LOT'],
        type : ['string|25','int','string|25','int']
    },
    FiyatGetir : 
    {
        query : "SELECT  " + 
                "FIYAT," +
                "DOVIZ, " + 
                "DOVIZSEMBOL, " + 
                "DOVIZKUR, " + 
                "ISKONTOKOD " + 
                "FROM FIYAT " +
                "WHERE STOKKODU = '@KODU' AND LISTENO = '@LISTENO' AND DEPONO IN (0,@DEPO) " +
                "ORDER BY DEPONO DESC", 
        param : ['KODU','LISTENO','DEPO'],
        type : ['string','int','int']
    },
    IskontoMatrisGetir : 
    {
        query : "SELECT " + 
                "ORAN1, " + 
                "ORAN2, " + 
                "ORAN3, " + 
                "ORAN4, " + 
                "ORAN5, " + 
                "ORAN6 " + 
                "FROM ISKONTO WHERE STOK = '@STOK' AND CARI = '@CARI' AND ODEMEPLANI = @ODEME", 
        param : ['STOK','CARI','ODEME'],
        type : ['string','string','int']
    },
    SatisSartiGetir : 
    {
        query : "SELECT STOKKOD " +
                ",CARIKOD " +
                ",BITIS " +
                ",BASLANGIC " +
                ", FIYAT " +
                ",BRUTFIYAT " +
                ",ISKONTOM1 " +
                ",ISKONTOM2 " +
                ",ISKONTOM3 " +
                ",ISKONTOM4 " +
                ",ISKONTOM5 " +
                ",ISKONTOM6 " +
                ",ISKONTOY1 " +
                ",ISKONTOY2 " +
                ",ISKONTOY3 " +
                ",ISKONTOY4 " +
                ",ISKONTOY5 " +
                ",ISKONTOY6 " +
                ",ODEPLAN " +
                ",DOVIZ " +
                ",DEPO " +
                ",LISTENO " +
                ",DOVIZSEMBOL " +
                ",DOVIZKUR " +
                "FROM SATISSARTI " +
                "WHERE " +
                " CARIKOD = '@sat_cari_kod' AND STOKKOD = '@sat_stok_kod' AND (DEPO = '@sat_depo_no' OR DEPO = 0) " +
                "ORDER BY BASLANGIC,DEPO DESC , BITIS ASC" , 
        param : ['sat_cari_kod','sat_stok_kod','sat_depo_no'],
        type : ['string','string','int']
    },
    CmbBirimGetir : 
    {
        query : "SELECT  BIRIMPNTR, " + 
                "BIRIM, " + 
                "KATSAYI " + 
                "FROM BIRIM WHERE KODU = '@sto_kod' ", 
        param : ['sto_kod'],
        type : ['string']
    }, 
    RenkGetir :
    {
        query : "SELECT PNTR, KIRILIM, KODU " +
                "FROM RENK WHERE KODU = '@KODU' " ,
        param : ['KODU'],
        type : ['string']
    },
    BedenGetir :
    {
        query : "SELECT PNTR, KIRILIM, KODU " +
                "FROM BEDEN WHERE KODU = '@KODU' " ,
        param : ['KODU'],
        type : ['string']
    },
    NakliyeListele :
    {
        query: "SELECT " +
        "sth_evraktip AS TIP, " +
        "sth_tarih AS TARIH, " +
        "sth_birim_pntr AS BIRIMPNTR," +
        "sth_evrakno_seri AS SERI, " +
        "sth_evrakno_sira AS SIRA, " +              
        "sth_giris_depo_no AS   NDEPO, " +
        "sth_cikis_depo_no AS   CDEPO, " +
        "sth_nakliyedeposu AS   GDEPO  " +           
        "FROM DEPONAKLIYE  " +
        "WHERE sth_tarih>='@ILKTARIH' AND  sth_tarih<='@SONTARIH' AND sth_evraktip='@TIP' " +
        "GROUP BY sth_tarih,sth_evrakno_seri, sth_evrakno_sira," +
        "sth_giris_depo_no,sth_cikis_depo_no,sth_nakliyedeposu,sth_evraktip,sth_birim_pntr " ,
        param : ['ILKTARIH','SONTARIH','TIP'],
        type : ['date','date','int']

    },
    NakliyeOnayUpdate :
    {
        query: "UPDATE DEPONAKLIYE " +
                "SET sth_special1 = @sth_special1, sth_nakliyedurumu = @sth_nakliyedurumu " +
                "WHERE sth_Guid = '@sth_Guid'",
            param : ['sth_special1','sth_nakliyedurumu','sth_Guid'],
            type : ['int','int','string|50']
    },
    NakliyeOnayKaydet :
    {

        query: "UPDATE DEPONAKLIYE " +
        "SET sth_miktar = @sth_special1, sth_nakliyedurumu = @sth_nakliyedurumu, DURUM = @DURUM " +
        "WHERE sth_Guid = '@sth_Guid'",
    param : ['sth_special1','sth_nakliyedurumu','DURUM','sth_Guid'],
    type : ['int','int','int','string|50']
    },
    NakliyeInsert : 
    {
        query:  "INSERT INTO DEPONAKLIYE (" +
                "sth_DBCno, " +
                "sth_SpecRECno, " +
                "sth_iptal, " +
                "sth_fileid, " +
                "sth_hidden, " +
                "sth_kilitli, " +
                "sth_degisti, " +
                "sth_checksum, " +
                "sth_create_user, " +
                "sth_create_date, " +
                "sth_lastup_user, " +
                "sth_lastup_date, " +
                "sth_special1, " +
                "sth_special2, " +
                "sth_special3, " +
                "sth_firmano, " +
                "sth_subeno, " +
                "sth_tarih, " +
                "sth_tip, " +
                "sth_cins, " +
                "sth_normal_iade, " +
                "sth_evraktip, " +
                "sth_evrakno_seri, " +
                "sth_evrakno_sira, " +
                "sth_satirno, " +
                "sth_belge_no, " +
                "sth_belge_tarih, " +
                "sth_stok_kod, " +
                "sth_isk_mas1, " +
                "sth_isk_mas2, " +
                "sth_isk_mas3, " +
                "sth_isk_mas4, " +
                "sth_isk_mas5, " +
                "sth_isk_mas6, " +
                "sth_isk_mas7, " +
                "sth_isk_mas8, " +
                "sth_isk_mas9, " +
                "sth_isk_mas10, " +
                "sth_sat_iskmas1, " +
                "sth_sat_iskmas2, " +
                "sth_sat_iskmas3, " +
                "sth_sat_iskmas4, " +
                "sth_sat_iskmas5, " +
                "sth_sat_iskmas6, " +
                "sth_sat_iskmas7, " +
                "sth_sat_iskmas8, " +
                "sth_sat_iskmas9, " +
                "sth_sat_iskmas10, " +
                "sth_pos_satis, " +
                "sth_promosyon_fl, " +
                "sth_cari_cinsi, " +
                "sth_cari_kodu, " +
                "sth_cari_grup_no, " +
                "sth_isemri_gider_kodu, " +
                "sth_plasiyer_kodu, " +
                "sth_har_doviz_cinsi, " +
                "sth_har_doviz_kuru, " +
                "sth_alt_doviz_kuru, " +
                "sth_stok_doviz_cinsi, " +
                "sth_stok_doviz_kuru, " +
                "sth_miktar, " +
                "sth_miktar2, " +
                "sth_birim_pntr, " +
                "sth_tutar, " +
                "sth_iskonto1, " +
                "sth_iskonto2, " +
                "sth_iskonto3, " +
                "sth_iskonto4, " +
                "sth_iskonto5, " +
                "sth_iskonto6, " +
                "sth_masraf1, " +
                "sth_masraf2, " +
                "sth_masraf3, " +
                "sth_masraf4, " +
                "sth_vergi_pntr, " +
                "sth_vergi, " +
                "sth_masraf_vergi_pntr, " +
                "sth_masraf_vergi, " +
                "sth_netagirlik, " +
                "sth_odeme_op, " +
                "sth_aciklama, " +
                "sth_sip_uid, " +
                "sth_fat_uid, " +
                "sth_giris_depo_no, " +
                "sth_cikis_depo_no, " +
                "sth_malkbl_sevk_tarihi, " +
                "sth_cari_srm_merkezi, " +
                "sth_stok_srm_merkezi, " +
                "sth_fis_tarihi, " +
                "sth_fis_sirano, " +
                "sth_vergisiz_fl, " +
                "sth_maliyet_ana, " +
                "sth_maliyet_alternatif, " +
                "sth_maliyet_orjinal, " +
                "sth_adres_no, " +
                "sth_parti_kodu, " +
                "sth_lot_no, " +
                "sth_kons_uid, " +
                "sth_proje_kodu, " +
                "sth_exim_kodu, " +
                "sth_otv_pntr, " +
                "sth_otv_vergi, " +
                "sth_brutagirlik, " +
                "sth_disticaret_turu, " +
                "sth_otvtutari, " +
                "sth_otvvergisiz_fl, " +
                "sth_oiv_pntr, " +
                "sth_oiv_vergi, " +
                "sth_oivvergisiz_fl, " +
                "sth_fiyat_liste_no, " +
                "sth_oivtutari, " +
                "sth_Tevkifat_turu, " +
                "sth_nakliyedeposu, " +
                "sth_nakliyedurumu, " +
                "sth_yetkili_uid, " +
                "sth_taxfree_fl, " +
                "sth_ilave_edilecek_kdv, " + 
                "sth_ismerkezi_kodu,  " +
                "sth_HareketGrupKodu1, " +
                "sth_HareketGrupKodu2, " +
                "sth_HareketGrupKodu3,  " +
                "sth_Olcu1, " +
                "sth_Olcu2, " +
                "sth_Olcu3, " +
                "sth_Olcu4, " +
                "sth_Olcu5, " +
                "sth_FormulMiktarNo, " +
                "sth_FormulMiktar, " +
                "DURUM" +
                ") VALUES ( " +
                "0," +
                "0," +
                "0," +
                "16," +
                "0," +
                "0," +
                "0," +
                "0," +
                "@sth_create_user, " +
                "date('now'), " +
                "@sth_lastup_user, " +
                "date('now'), " +
                "''," +
                "''," +
                "''," +
                "@sth_firmano," +
                "@sth_subeno," +
                "'@sth_tarih'," +
                "@sth_tip," +
                "@sth_cins," +
                "@sth_normal_iade," +
                "@sth_evraktip," +
                "'@sth_evrakno_seri'," +
                "@sth_evrakno_sira," +
                "(SELECT IFNULL(MAX(sth_satirno),-1) + 1 AS SATIRNO FROM STOKHAR WHERE sth_evrakno_seri = '@sth_evrakno_seri' AND sth_evrakno_sira = @sth_evrakno_sira AND sth_evraktip = @sth_evraktip)," +
                "'@sth_belge_no'," +
                "'@sth_belge_tarih'," +
                "'@sth_stok_kod'," +
                "@sth_isk_mas1," +
                "@sth_isk_mas2," +
                "@sth_isk_mas3," +
                "@sth_isk_mas4," +
                "@sth_isk_mas5," +
                "@sth_isk_mas6," +
                "@sth_isk_mas7," +
                "@sth_isk_mas8," +
                "@sth_isk_mas9," +
                "@sth-isk_mas10," +
                "@sth_sat_iskmas1," +
                "@sth_sat_iskmas2," +
                "@sth_sat_iskmas3," +
                "@sth_sat_iskmas4," +
                "@sth_sat_iskmas5," +
                "@sth_sat_iskmas6," +
                "@sth_sat_iskmas7," +
                "@sth_sat_iskmas8," +
                "@sth_sat_iskmas9," +
                "@sth-sat_iskmas10," +
                "0," +
                "0," +
                "@sth_cari_cinsi," +
                "'@sth_cari_kodu'," +
                "0," +
                "''," +
                "'@sth_plasiyer_kodu'," +
                "@sth_har_doviz_cinsi," +
                "@sth_har_doviz_kuru," +
                "@sth_alt_doviz_kuru," +
                "@sth_stok_doviz_cinsi," +
                "@sth_stok_doviz_kuru," +
                "@sth_miktar," +
                "@sth-miktar2," +
                "@sth_birim_pntr," +
                "@sth_tutar," +
                "@sth_iskonto1," +
                "@sth_iskonto2," +
                "@sth_iskonto3," +
                "@sth_iskonto4," +
                "@sth_iskonto5," +
                "@sth_iskonto6," +
                "@sth_masraf1," +
                "@sth_masraf2," +
                "@sth_masraf3," +
                "@sth_masraf4," +
                "@sth_vergi_pntr," +
                "@sth_vergi," +
                "@sth_masraf_vergi_pntr," +
                "@sth_masraf_vergi," +
                "0," +
                "@sth_odeme_op," +
                "'@sth_aciklama'," +
                "'@sth_sip_uid'," +
                "@sth_fat_uid," +
                "@sth_giris_depo_no," +
                "@sth_cikis_depo_no," +
                "'@sth_malkbl_sevk_tarihi'," +
                "'@sth_cari_srm_merkezi'," +
                "'@sth_stok_srm_merkezi'," +
                "'18991230', " +
                "0," +
                "@sth-vergisiz_fl," +
                "0," +
                "0," +
                "0," +
                "@sth_adres_no," +
                "'@sth_parti_kodu'," +
                "@sth_lot_no," +
                "'00000000-0000-0000-0000-000000000000'," +
                "'@sth_proje_kodu'," +
                "'@sth_exim_kodu'," +
                "0," +
                "0," +
                "0," +
                "@sth_disticaret_turu," +
                "0," +
                "@sth_otvvergisiz_fl," +
                "0," +
                "0," +
                "@sth_oivvergisiz_fl," +
                "@sth_fiyat_liste_no," +
                "0," +
                "0," +
                "@sth_nakliyedeposu," +
                "@sth_nakliyedurumu," +
                "'00000000-0000-0000-0000-000000000000'," +
                "0," +
                "0," +
                "''," +
                "''," + 
                "''," +
                "''," +
                "0," +
                "0," +
                "0," +
                "0," +
                "0," +
                "0," +
                "0," +
                "1 ) " ,
        param : ['sth_create_user','sth_lastup_user:int','sth_firmano:int','sth_subeno:int','sth_tarih:date','sth_tip:int','sth_cins:int',
        'sth_normal_iade:int','sth_evraktip:int','sth_evrakno_seri:string','sth_evrakno_sira:int','sth_belge_no:string','sth_belge_tarih:date',
        'sth_stok_kod:string','sth_isk_mas1:int','sth_isk_mas2:int','sth_isk_mas3:int','sth_isk_mas4:int','sth_isk_mas5:int','sth_isk_mas6:int','sth_isk_mas7:int',
        'sth_isk_mas8:int','sth_isk_mas9:int','sth-isk_mas10:int','sth_sat_iskmas1:int','sth_sat_iskmas2:int','sth_sat_iskmas3:int','sth_sat_iskmas4:int','sth_sat_iskmas5:int',
        'sth_sat_iskmas6:int','sth_sat_iskmas7:int','sth_sat_iskmas8:int','sth_sat_iskmas9:int','sth-sat_iskmas10:int','sth_cari_cinsi:int','sth_cari_kodu:string',
        'sth_plasiyer_kodu:string','sth_har_doviz_cinsi:int','sth_har_doviz_kuru:int','sth_alt_doviz_kuru:int','sth_stok_doviz_cinsi:int','sth_stok_doviz_kuru:int',
        'sth_miktar:int','sth-miktar2:int','sth_birim_pntr:int','sth_tutar:int','sth_iskonto1:int','sth_iskonto2:int','sth_iskonto3:int','sth_iskonto4:int',
        'sth_iskonto5:int','sth_iskonto6:int','sth_masraf1:int','sth_masraf2:int','sth_masraf3:int','sth_masraf4:int','sth_vergi_pntr:int','sth_vergi:int','sth_masraf_vergi_pntr:int',
        'sth_masraf_vergi:int','sth_odeme_op:int','sth_aciklama:string','sth_sip_uid:string','sth_fat_uid:int','sth_giris_depo_no:int','sth_cikis_depo_no:int','sth_malkbl_sevk_tarihi:date',
        'sth_cari_srm_merkezi:string','sth_stok_srm_merkezi:string','sth-vergisiz_fl:int','sth_adres_no:int','sth_parti_kodu:string','sth_lot_no:int','sth_proje_kodu:string',
        'sth_exim_kodu:string','sth_disticaret_turu:int','sth_otvvergisiz_fl:bit','sth_oivvergisiz_fl:bit','sth_fiyat_liste_no:int','sth_nakliyedeposu:int','sth_nakliyedurumu:int']           
    }, 
    //Sayım
    SayimGetir : 
    {
        query: "SELECT IFNULL((SELECT ADI FROM STOK WHERE KODU = sym_Stokkodu),'') AS ADI, " +
                "sym_satirno AS NO, " +
                "* FROM SAYIM " +
                "WHERE sym_depono = ? AND sym_evrakno = ? AND sym_tarihi = ? ORDER BY sym_satirno ASC" 
    },
    SayimInsert :
    {
        query: "INSERT INTO SAYIM (" + 
               "sym_RECid_DBCno, " +
               "sym_SpecRECno, " +
               "sym_iptal, " +
               "sym_fileid, " +
               "sym_hidden, " +
               "sym_kilitli, " +
               "sym_degisti, " +
               "sym_checksum, " +
               "sym_create_user, " +
               "sym_create_date, " +
               "sym_lastup_user, " +
               "sym_lastup_date, " +
               "sym_special1, " +
               "sym_special2, " +
               "sym_special3, " +
               "sym_tarihi, " +
               "sym_depono, " +
               "sym_evrakno, " +
               "sym_satirno, " +
               "sym_Stokkodu, " +
               "sym_reyonkodu, " +
               "sym_koridorkodu, " +
               "sym_rafkodu, " +
               "sym_miktar1, " +
               "sym_miktar2, " +
               "sym_miktar3, " +
               "sym_miktar4, " +
               "sym_miktar5, " +
               "sym_birim_pntr, " +
               "sym_barkod, " +
               "sym_renkno, " +
               "sym_bedenno, " +
               "sym_parti_kodu, " +
               "sym_lot_no, " +
               "sym_serino " +
               ")  VALUES ( " +
               "0," + 
               "0," + 
               "0," + 
               "28," + 
               "0," + 
               "0," + 
               "0," + 
               "0," + 
               "@sym_create_user," + 
               "date('now')," + 
               "@sym_lastup_user," + 
               "date('now')," + 
               "''," + 
               "''," + 
               "''," + 
               "'@sym_tarihi'," + 
               "@sym_depono," + 
               "@sym_evrakno," + 
               "(SELECT IFNULL(MAX(sym_satirno),-1) + 1 FROM SAYIM WHERE sym_evrakno=@sym_evrakno AND sym_depono=@sym_depono AND sym_tarihi='@sym_tarihi')," + 
               "'@sym_Stokkodu'," + 
               "''," + 
               "''," + 
               "''," + 
               "@sym_miktar1," + 
               "@sym_miktar2," + 
               "0," + 
               "0," + 
               "0," + 
               "@sym_birim_pntr," + 
               "'@sym_barkod'," + 
               "@sym_renkno," + 
               "@sym_bedenno," + 
               "'@sym_parti_kodu'," + 
               "@sym_lot_no," + 
               "'@sym_serino') ",
        param : ['sym_create_user','sym_lastup_user','sym_tarihi','sym_depono','sym_evrakno','sym_Stokkodu',
                'sym_miktar1','sym_miktar2','sym_birim_pntr','sym_barkod','sym_renkno','sym_bedenno',
                'sym_parti_kodu','sym_lot_no','sym_serino']
    },
    SayimEvrDelete :
    {
        query: "DELETE FROM SAYIM WHERE sym_evrakno = ? AND sym_tarihi = ? and sym_depono = ? "
    },
    SayimSatirDelete :
    {
        query : "DELETE FROM SAYIM WHERE sym_Guid = ?"
    },
    SayimUpdate : 
    {
        query : "UPDATE SAYIM " +
                "SET sym_miktar1 = ? " +
                ",sym_miktar2 = ? " +
                ",sym_miktar3 = ? " +
                ",sym_miktar4 = ? " +
                ",sym_miktar5 = ? " +
                "WHERE sym_Guid = ?"
    },
    MaxSayimSira :
    {
        query : "SELECT IFNULL(MAX(sym_evrakno),?) + 1 AS MAXEVRSIRA FROM SAYIM " +
                "WHERE sym_depono = ? AND sym_tarihi = ? " 
    },
    SayimSeriGetir :
    {
        query:"SELECT sym_evrakno AS SERI,MAX(sym_tarihi) AS TARIH, sym_depono AS DEPO FROM SAYIM  " +
              //"WHERE sym_tarihi>='@ILKTARIH' AND  sym_tarihi<='@SONTARIH' " +
              "GROUP BY sym_evrakno,sym_depono",
        param : ['ILKTARIH','SONTARIH'],
        type : ['date','date']
    },
    //Sipariş
    SiparisKabulListele : 
    {
        query : "SELECT " +
                "TESLIMTARIH " +
                ",SERI " +
                ",SIRA " +
                ",SIPMIKTAR " +
                ",TESLIMMIKTAR " +
                ",CARI.KODU AS CARIKOD" +
                ",CARI.UNVAN1 AS CARIADI" +
                ",DEPO " +
                ",CARISORUMLU AS SORUMLULUK" +
                ",SATICIKOD AS PERSONEL" +
                ",ADRESNO " +
                ",SUM(SIPMIKTAR-TESLIMMIKTAR) AS BMIKTAR " +
                ",SIPARIS.SATIRNO AS SATIR " +
                ",BIRIMPNTR " +
                ",TIP " +
                ",CARI " +
                ",TOPTANVERGIPNTR " +
                ",PROJE " +
                ",VERGI " +
                ",SIPARIS.DOVIZCINSI " +
                ",DEPOMIKTAR " +
                ",BIRIM " +
                ",CINS " +
                ",ODEMENO " +
                ",ACIKLAMA " +
                "FROM SIPARISSTOK AS SIPARIS INNER JOIN " +
                "CARI ON SIPARIS.CARI = CARI.KODU " +
                "WHERE SIPARIS.TESLIMTARIH>= '@ILKTARIH' AND SIPARIS.TESLIMTARIH<='@SONTARIH' " +
                "AND SIPARIS.DEPO=@DEPONO AND SIPARIS.TIP=@TIP " +
                "AND TESLIMMIKTAR < SIPMIKTAR " +
                "GROUP BY TESLIMTARIH,SIPARIS.SERI,SIPARIS.SIRA,SIPARIS.DEPO,PROJE," +
                "SIPARIS.ADRESNO,CARI.KODU,CARI.UNVAN1,SIPARIS.ACIKLAMA,SIPARIS.DOVIZCINSI ORDER BY TESLIMTARIH ASC",
        param : ['ILKTARIH','SONTARIH','DEPONO','TIP'],
        type : ['date','date','int','int']
    },
    SiparisInsert : 
    {
        query:  
                "INSERT INTO [SIPARIS] " +
                "([sip_Guid] " +
                ",[sip_DBCno] " +
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
                ",[sip_prosip_uid] " +
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
                ",[sip_stal_uid] " +
                ",[sip_planlananmiktar] " +
                ",[sip_teklif_uid] " +
                ",[sip_parti_kodu] " +
                ",[sip_lot_no] " +
                ",[sip_projekodu] " +
                ",[sip_fiyat_liste_no] " +
                ",[sip_Otv_Pntr] " +
                ",[sip_Otv_Vergi] " +
                ",[sip_otvtutari] " +
                ",[sip_OtvVergisiz_Fl] " +
                ",[sip_paket_kod] " +
                ",[sip_Rez_uid] " +
                ",[sip_harekettipi] " +
                ",[sip_yetkili_uid] " +
                ",[sip_kapatmanedenkod] " +
                ",[sip_gecerlilik_tarihi] " +
                ",[sip_onodeme_evrak_tip] " +
                ",[sip_onodeme_evrak_seri] " +
                ",[sip_onodeme_evrak_sira] " +
                ",[sip_rezervasyon_miktari] " +
                ",[sip_rezerveden_teslim_edilen] " +
                ",[sip_HareketGrupKodu1] " +
                ",[sip_HareketGrupKodu2] " +
                ",[sip_HareketGrupKodu3] " +
                ",[status] " +
                ") " +
                "VALUES ( " +
                "'@sip_Guid' " +
                ",0						" +
                ",0						" +
                ",0						" +
                ",21					" +
                ",0						" +
                ",0						" +
                ",0							                   " +
                ",0							                   " +
                ",@sip_create_user			                   " +
                ",date('now')		   " +
                ",@sip_lastup_user			                   " +
                ",date('now')		                           " +
                ",''							               " +
                ",''							               " +
                ",''							               " +
                ",@sip_firmano					               " +
                ",@sip_subeno						           " +
                ",'@sip_tarih'					               " +
                ",'@sip_teslim_tarih'			                   " +
                ",@sip_tip					                   " +
                ",@sip_cins					                   " +
                ",'@sip_evrakno_seri'		                   " +
                ",@sip_evrakno_sira			                   " +
                ",(SELECT IFNULL(MAX(sip_satirno),-1) + 1 AS SATIRNO FROM SIPARIS WHERE sip_evrakno_seri = '@sip_evrakno_seri' AND sip_evrakno_sira = @sip_evrakno_sira AND sip_tip = @sip_tip AND sip_cins = @sip_cins)" +
                ",'@sip_belgeno'				                   " +
                ",'@sip_belge_tarih'			                   " +
                ",'@sip_satici_kod'				               " +
                ",'@sip_musteri_kod'			                   " +
                ",'@sip_stok_kod'				               " +
                ",@sip_b_fiyat				                   " +
                ",@sip_miktar					               " +
                ",@sip_birim_pntr				               " +
                ",@sip_teslim_miktar			               " +
                ",@sip_tutar					               " +
                ",@sip_iskonto_1				               " +
                ",@sip_iskonto_2				               " +
                ",@sip_iskonto_3				               " +
                ",@sip_iskonto_4				               " +
                ",@sip_iskonto_5				               " +
                ",@sip_iskonto_6				               " +
                ",0							                   " +
                ",0							                   " +
                ",0							                   " +
                ",0							                   " +
                ",@sip_vergi_pntr				               " +
                ",@sip_vergi					               " +
                ",0							                   " +
                ",0							                   " +
                ",@sip_opno					                   " +
                ",'@sip_aciklama'				                   " +
                ",''							               " +
                ",@sip_depono					               " +
                ",@sip_OnaylayanKulNo					       " +
                ",0							                   " +
                ",0							                   " +
                ",'@sip_cari_sormerk'			                   " +
                ",'@sip_stok_sormerk'			                   " +
                ",0							                   " +
                ",@sip_doviz_cinsi			                   " +
                ",@sip_doviz_kuru				               " +
                ",@sip_alt_doviz_kuru			               " +
                ",@sip_adresno							       " +
                ",''							               " +
                ",1							                   " +
                ",cast(cast(0 as binary) as uniqueidentifier)  " +
                ",@sip_iskonto1				                   " +
                ",@sip_iskonto2				                   " +
                ",@sip_iskonto3				                   " +
                ",@sip_iskonto4				                   " +
                ",@sip_iskonto5				                   " +
                ",@sip_iskonto6				                   " +
                ",1							                   " +
                ",1							                   " +
                ",1							                   " +
                ",1							                   " +
                ",@sip_isk1					                   " +
                ",@sip_isk2					                   " +
                ",@sip_isk3					                   " +
                ",@sip_isk4					                   " +
                ",@sip_isk5					                   " +
                ",@sip_isk6					                   " +
                ",0							                   " +
                ",0							                   " +
                ",0							                   " +
                ",0							                   " +
                ",''							               " +
                ",0							                   " +
                ",0							                   " +
                ",cast(cast(0 as binary) as uniqueidentifier)  " +
                ",0							                   " +
                ",cast(cast(0 as binary) as uniqueidentifier)  " +
                ",'@sip_parti_kodu'					           " +
                ",@sip_lot_no						           " +
                ",'@sip_projekodu'					           " +
                ",@sip_fiyat_liste_no					       " +
                ",0							                   " +
                ",0							                   " +
                ",0							                   " +
                ",0							                   " +
                ",''							               " +
                ",cast(cast(0 as binary) as uniqueidentifier)  " +
                ",0                                            " +
                ",cast(cast(0 as binary) as uniqueidentifier)  " +
                ",''							               " +
                ",date('now')		                           " +
                ",0							                   " +
                ",''							               " +
                ",0							                   " +
                ",@sip_rezervasyon_miktari 				       " +
                ",@sip_rezerveden_teslim_edilen			       " +
                ",''							               " +
                ",''							               " +
                ",''							               " +
                ",0                                            " +
                ") ",
        param : ['sip_create_user','sip_lastup_user','sip_firmano','sip_subeno','sip_tarih:date','sip_teslim_tarih:date','sip_tip',
                 'sip_cins','sip_evrakno_seri','sip_evrakno_sira','sip_belgeno','sip_belge_tarih','sip_satici_kod',
                 'sip_musteri_kod','sip_stok_kod','sip_b_fiyat','sip_miktar','sip_birim_pntr','sip_teslim_miktar',
                 'sip_tutar','sip_iskonto_1','sip_iskonto_2','sip_iskonto_3','sip_iskonto_4','sip_iskonto_5',
                 'sip_iskonto_6','sip_vergi_pntr','sip_vergi','sip_opno','sip_aciklama','sip_depono','sip_OnaylayanKulNo',
                 'sip_cari_sormerk','sip_stok_sormerk','sip_doviz_cinsi','sip_doviz_kuru','sip_alt_doviz_kuru',
                 'sip_adresno','sip_iskonto1','sip_iskonto2','sip_iskonto3','sip_iskonto4','sip_iskonto5','sip_iskonto6',
                 'sip_isk1:bit','sip_isk2:bit','sip_isk3:bit','sip_isk4:bit','sip_isk5:bit','sip_isk6:bit','sip_parti_kodu','sip_lot_no',
                 'sip_projekodu','sip_fiyat_liste_no','sip_rezervasyon_miktari','sip_rezerveden_teslim_edilen'],
        guid : "sip_Guid"
    },
    SipBedenHarGetir :
    {
        query: "SELECT * FROM BEDENHAR WHERE BdnHar_Har_uid IN (SELECT sip_Guid FROM SIPARIS WHERE sip_evrakno_seri = '@sip_evrakno_seri' AND sip_evrakno_sira = @sip_evrakno_sira AND sip_tip = @sip_tip) AND BdnHar_Tipi = @BdnHar_Tipi ",
        param:  ['sip_evrakno_seri:string|20','sip_evrakno_sira:int','sip_tip:int','BdnHar_Tipi:int'],
    },
    SiparisListeGetir :
    {
        query : "SELECT " +
                "(SIPMIKTAR - TESLIMMIKTAR) AS BMIKTAR, " +
                "ADI, " +
                "KODU " +
                "FROM SIPARISSTOK " +
                "WHERE DEPO = '@DEPO' AND CARI = '@CARI' AND SERI = '@SERI' AND SIRA = '@SIRA' AND TIP = '@TIP' and (SIPMIKTAR - TESLIMMIKTAR) > 0",
        param : ['DEPO','CARI','SERI','SIRA','TIP'],
        type : ['string','string','string','int','int']       
    },
    SiparisStokGetir :
    {
        query : "SELECT " +
                "RECNO, " +
                "BARKOD, " +
                "KODU, " +
                "ADI, " +
                "TARIH, " +
                "TESLIMTARIH, " +
                "TIP, " +
                "CINS, " +
                "SERI, " +
                "SIRA, " +
                "SATIRNO, " +
                "BELGENO, " +
                "BELGETARIH, " +
                "SATICIKOD, " +
                "CARI, " +
                "FIYAT, " +
                "SIPMIKTAR, " +
                "BIRIMPNTR, " +
                "TESLIMMIKTAR, " +
                "TUTAR, " +
                "ISKONTO_1, " +
                "ISKONTO_2, " +
                "ISKONTO_3, " +
                "ISKONTO_4, " +
                "ISKONTO_5, " +
                "ISKONTO_6, " +
                "TOPTANVERGIPNTR, " +
                "VERGI, " +
                "ODEMENO, " +
                "DEPO, " +
                "CARISORUMLU, " +
                "STOKSORUMLU, " +
                "DOVIZCINSI, " +
                "DOVIZKURU, " +
                "ALTDOVIZKURU, " +
                "ADRESNO, " +
                "ISKONTO1, " +
                "ISKONTO2, " +
                "ISKONTO3, " +
                "ISKONTO4, " +
                "ISKONTO5, " +
                "ISKONTO6, " +
                "ISK1, " +
                "ISK2, " +
                "ISK3, " +
                "ISK4, " +
                "ISK5, " +
                "ISK6, " +
                "BEDEN, " +
                "RENK, " +
                "BEDENNO, " +
                "MIKTAR, " +
                "DEPOMIKTAR, " +
                "BIRIM, " +
                "BEDENPNTR, " +
                "RENKPNTR, " +
                "KATSAYI, " +
                "TOPTANVERGI, " +
                "DETAYTAKIP, " +
                "SIPARISDURSUN, " +
                "MALKABULDURSUN, " +
                "ACIKLAMA, " +
                "PROJE, " +
                "EXIMKODU, " +
                "PARTI, " +
                "LOT " +
                "FROM SIPARISSTOK " + 
                "WHERE CARI = '@CARI' " + 
                "AND ((SERI = '@SERI' OR ('@SERI' = '')) AND ((SIRA = '@SIRA') OR (@SIRA = 0))) " +
                "AND (BARKOD = '@BARKOD' OR KODU = '@BARKOD' OR ('@BARKOD' = '')) " +
                "GROUP BY " + 
                "RECNO, " +
                "KODU, " +
                "ADI, " +
                "TARIH, " +
                "TESLIMTARIH, " +
                "TIP, " +
                "CINS, " +
                "SERI, " +
                "SIRA, " +
                "SATIRNO, " +
                "BELGENO, " +
                "BELGETARIH, " +
                "SATICIKOD, " +
                "CARI, " +
                "FIYAT, " +
                "MIKTAR, " +
                "BIRIMPNTR, " +
                "TESLIMMIKTAR, " +
                "TUTAR, " +
                "ISKONTO_1, " +
                "ISKONTO_2, " +
                "ISKONTO_3, " +
                "ISKONTO_4, " +
                "ISKONTO_5, " +
                "ISKONTO_6, " +
                "TOPTANVERGIPNTR, " +
                "VERGI, " +
                "DEPO, " +
                "CARISORUMLU, " +
                "STOKSORUMLU, " +
                "DOVIZCINSI, " +
                "DOVIZKURU, " +
                "ALTDOVIZKURU, " +
                "ADRESNO, " +
                "ISKONTO1, " +
                "ISKONTO2, " +
                "ISKONTO3, " +
                "ISKONTO4, " +
                "ISKONTO5, " +
                "ISKONTO6, " +
                "ISK1, " +
                "ISK2, " +
                "ISK3, " +
                "ISK4, " +
                "ISK5, " +
                "ISK6, " +
                "BEDEN, " +
                "RENK, " +
                "BEDENNO, " +
                "DETAYTAKIP, " +
                "SIPARISDURSUN, " +
                "MALKABULDURSUN, " +
                "EXIMKODU, " +
                "PARTI, " +
                "LOT, " +
                "ACIKLAMA " ,
        param : ['DEPONO','CARI','SERI','SIRA','BARKOD'],
        type : ['int','string','string','int','string']
    },
    StokHarSiparisUpdate :
    {
        query : "UPDATE SIPARISSTOK SET TESLIMMIKTAR = (TESLIMMIKTAR + @sip_teslim_miktar) WHERE RECNO = '@sip_Guid' ",
        param : ['sip_teslim_miktar:int','sip_Guid:string|50']
    },
    MaxSiparisSira : 
    {
        query : "SELECT IFNULL(MAX(sip_evrakno_sira),0) + 1 AS MAXEVRSIRA FROM SIPARIS " +
                "WHERE sip_evrakno_seri=? AND sip_tip=? AND sip_cins=? "
    },
    SiparisGetir:
    {
        query:  "SELECT IFNULL((SELECT ADI FROM STOK WHERE KODU = sip_stok_kod),'') AS ADI, " +
                "ROUND((sip_tutar / sip_miktar),2) AS FIYAT, " +
                "ROUND(sip_tutar,2) AS TUTAR, " +
                "(SELECT SORUMLULUKISMI FROM SORUMLULUKMRKZ WHERE SORUMLULUKKODU = sip_stok_sormerk) AS SORUMLUMERADI ," +
                "(SELECT PERSONELADI FROM PERSONEL WHERE PERSONELKODU = sip_satici_kod) AS PERSONELADI," +
                "(SELECT ORAN FROM VERGI WHERE PNTR = sip_vergi_pntr) AS VERGIPNTR, " +
                "(SELECT BIRIM FROM BIRIM WHERE KODU = sip_stok_kod) AS BIRIMADI, " +
                "(SELECT BIRIMPNTR FROM BIRIM WHERE KODU = sip_stok_kod) AS BIRIM, " +
                "IFNULL((SELECT RENKPNTR FROM BARKOD WHERE KODU = sip_stok_kod),0) AS RENKPNTR , " +
                "IFNULL((SELECT BEDENPNTR FROM BARKOD WHERE KODU = sip_stok_kod),0) AS BEDENPNTR , " +
                "* FROM SIPARIS WHERE sip_evrakno_seri = '@sip_evrakno_seri' AND " +
                "sip_evrakno_sira = @sip_evrakno_sira and sip_tip = @sip_tip and sip_cins = @sip_cins " +
                "ORDER BY sip_satirno ASC ",
        param:  ['sip_evrakno_seri','sip_evrakno_sira','sip_tip','sip_cins'],
        type:   ['string','int','int','int']
    },
    SiparisUpdate:
    {
        query:  "UPDATE SIPARIS " +
                "SET sip_b_fiyat=@sip_b_fiyat " + 
                ",sip_miktar=@sip_miktar " +
                ",sip_tutar=@sip_tutar " +
                ",sip_vergi = (@sip_tutar - (@sip_iskonto_1 + @sip_iskonto_2 + @sip_iskonto_3 + @sip_iskonto_4 + @sip_iskonto_5))  * (SELECT ORAN / 100 FROM VERGI WHERE PNTR = (@sip_vergi_pntr) / 100) " +
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
                "WHERE sip_Guid = '@sip_Guid' ",
        param : ['sip_b_fiyat:float','sip_miktar:float','sip_tutar:float','sip_vergi_pntr:int','sip_iskonto_1:float','sip_iskonto_2:float','sip_iskonto_3:float',
        'sip_iskonto_4:float','sip_iskonto_5:float','sip_iskonto_6:float','sip_isk1:bit','sip_isk2:bit','sip_isk3:bit','sip_isk4:bit',
        'sip_isk5:bit','sip_isk6:bit','sip_Guid:string|50']
    },
    SiparisSatirDelete:
    {
        query:  "DELETE FROM SIPARIS WHERE sip_Guid = '@sip_Guid'",
        param:  ['sip_Guid'],
        type:   ['string|50']
    },
    SiparisEvrDelete:
    {
        query:  "DELETE FROM SIPARIS WHERE sip_evrakno_seri = '@sip_evrakno_seri' AND " + 
                "sip_evrakno_sira = @sip_evrakno_sira and sip_tip = @sip_tip and sip_cins = @sip_cins",
        param:  ['sip_evrakno_seri','sip_evrakno_sira','sip_tip','sip_cins'],
        type:   ['string|20','int','int','int']
    },
    SiparisGonderGetir:
    {
        query:  "SELECT status AS STATUS,* FROM SIPARIS WHERE status = 0 GROUP BY sip_evrakno_seri,sip_evrakno_sira",
    },
    //Stok Hareket
    StokHarGetir :
    {
        query : "SELECT sth_DBCno , " +
                "(SELECT ADI from STOK WHERE KODU=sth_stok_kod) AS ADI , " +
                "(sth_tutar / sth_miktar) AS FIYAT, " +
                "(select UNVAN1 from CARI WHERE KODU=sth_cari_kodu) AS CARIADI, " +
                "(select SORUMLULUKISMI from SORUMLULUKMRKZ where SORUMLULUKKODU=sth_stok_srm_merkezi) AS SORUMLUMERADI, " +
                "(select PERSONELADI from PERSONEL where PERSONELKODU=sth_plasiyer_kodu) AS PERSONELADI," +
                "sth_miktar AS MIKTAR , " +
                "sth_miktar2 AS MIKTAR2 , " +
                "sth_vergi AS TOPTANVERGI, " +
                "IFNULL((SELECT SERI from SIPARISSTOK WHERE RECNO = sth_sip_uid),'') AS SIPSERI ," +
                "IFNULL((SELECT SIRA from SIPARISSTOK WHERE RECNO = sth_sip_uid),0) AS SIPSIRA ," +
                "* FROM STOKHAR " +
                "WHERE sth_evrakno_seri= ? AND sth_evrakno_sira = ? AND sth_evraktip = ? ORDER BY sth_satirno ",
    },
    NakliyeGetir :
    {
        query : "SELECT sth_DBCno , " +
                "(SELECT ADI from STOK WHERE KODU=sth_stok_kod) AS ADI , " +
                "(sth_tutar / sth_miktar) AS FIYAT, " +
                "(select UNVAN1 from CARI WHERE KODU=sth_cari_kodu) AS CARIADI, " +
                "(select SORUMLULUKISMI from SORUMLULUKMRKZ where SORUMLULUKKODU=sth_stok_srm_merkezi) AS SORUMLUMERADI, " +
                "(select PERSONELADI from PERSONEL where PERSONELKODU=sth_plasiyer_kodu) AS PERSONELADI," +
                "sth_miktar AS MIKTAR , " +
                "sth_miktar2 AS MIKTAR2 , " +
                "sth_vergi AS TOPTANVERGI, " +
                "IFNULL((SELECT SERI from SIPARISSTOK WHERE RECNO = sth_sip_uid),'') AS SIPSERI ," +
                "IFNULL((SELECT SIRA from SIPARISSTOK WHERE RECNO = sth_sip_uid),0) AS SIPSIRA ," +
                "* FROM DEPONAKLIYE " +
                "WHERE sth_evrakno_seri= ? AND sth_evrakno_sira = ? AND sth_evraktip = ? ORDER BY sth_satirno "
    },
    StokHarInsert : 
    {
        query:  "INSERT INTO STOKHAR (" +
                "sth_DBCno, " +
                "sth_SpecRECno, " +
                "sth_iptal, " +
                "sth_fileid, " +
                "sth_hidden, " +
                "sth_kilitli, " +
                "sth_degisti, " +
                "sth_checksum, " +
                "sth_create_user, " +
                "sth_create_date, " +
                "sth_lastup_user, " +
                "sth_lastup_date, " +
                "sth_special1, " +
                "sth_special2, " +
                "sth_special3, " +
                "sth_firmano, " +
                "sth_subeno, " +
                "sth_tarih, " +
                "sth_tip, " +
                "sth_cins, " +
                "sth_normal_iade, " +
                "sth_evraktip, " +
                "sth_evrakno_seri, " +
                "sth_evrakno_sira, " +
                "sth_satirno, " +
                "sth_belge_no, " +
                "sth_belge_tarih, " +
                "sth_stok_kod, " +
                "sth_isk_mas1, " +
                "sth_isk_mas2, " +
                "sth_isk_mas3, " +
                "sth_isk_mas4, " +
                "sth_isk_mas5, " +
                "sth_isk_mas6, " +
                "sth_isk_mas7, " +
                "sth_isk_mas8, " +
                "sth_isk_mas9, " +
                "sth_isk_mas10, " +
                "sth_sat_iskmas1, " +
                "sth_sat_iskmas2, " +
                "sth_sat_iskmas3, " +
                "sth_sat_iskmas4, " +
                "sth_sat_iskmas5, " +
                "sth_sat_iskmas6, " +
                "sth_sat_iskmas7, " +
                "sth_sat_iskmas8, " +
                "sth_sat_iskmas9, " +
                "sth_sat_iskmas10, " +
                "sth_pos_satis, " +
                "sth_promosyon_fl, " +
                "sth_cari_cinsi, " +
                "sth_cari_kodu, " +
                "sth_cari_grup_no, " +
                "sth_isemri_gider_kodu, " +
                "sth_plasiyer_kodu, " +
                "sth_har_doviz_cinsi, " +
                "sth_har_doviz_kuru, " +
                "sth_alt_doviz_kuru, " +
                "sth_stok_doviz_cinsi, " +
                "sth_stok_doviz_kuru, " +
                "sth_miktar, " +
                "sth_miktar2, " +
                "sth_birim_pntr, " +
                "sth_tutar, " +
                "sth_iskonto1, " +
                "sth_iskonto2, " +
                "sth_iskonto3, " +
                "sth_iskonto4, " +
                "sth_iskonto5, " +
                "sth_iskonto6, " +
                "sth_masraf1, " +
                "sth_masraf2, " +
                "sth_masraf3, " +
                "sth_masraf4, " +
                "sth_vergi_pntr, " +
                "sth_vergi, " +
                "sth_masraf_vergi_pntr, " +
                "sth_masraf_vergi, " +
                "sth_netagirlik, " +
                "sth_odeme_op, " +
                "sth_aciklama, " +
                "sth_sip_uid, " +
                "sth_fat_uid, " +
                "sth_giris_depo_no, " +
                "sth_cikis_depo_no, " +
                "sth_malkbl_sevk_tarihi, " +
                "sth_cari_srm_merkezi, " +
                "sth_stok_srm_merkezi, " +
                "sth_fis_tarihi, " +
                "sth_fis_sirano, " +
                "sth_vergisiz_fl, " +
                "sth_maliyet_ana, " +
                "sth_maliyet_alternatif, " +
                "sth_maliyet_orjinal, " +
                "sth_adres_no, " +
                "sth_parti_kodu, " +
                "sth_lot_no, " +
                "sth_kons_uid, " +
                "sth_proje_kodu, " +
                "sth_exim_kodu, " +
                "sth_otv_pntr, " +
                "sth_otv_vergi, " +
                "sth_brutagirlik, " +
                "sth_disticaret_turu, " +
                "sth_otvtutari, " +
                "sth_otvvergisiz_fl, " +
                "sth_oiv_pntr, " +
                "sth_oiv_vergi, " +
                "sth_oivvergisiz_fl, " +
                "sth_fiyat_liste_no, " +
                "sth_oivtutari, " +
                "sth_Tevkifat_turu, " +
                "sth_nakliyedeposu, " +
                "sth_nakliyedurumu, " +
                "sth_yetkili_uid, " +
                "sth_taxfree_fl, " +
                "sth_ilave_edilecek_kdv, " + 
                "sth_ismerkezi_kodu,  " +
                "sth_HareketGrupKodu1, " +
                "sth_HareketGrupKodu2, " +
                "sth_HareketGrupKodu3,  " +
                "sth_Olcu1, " +
                "sth_Olcu2, " +
                "sth_Olcu3, " +
                "sth_Olcu4, " +
                "sth_Olcu5, " +
                "sth_FormulMiktarNo, " +
                "sth_FormulMiktar " +
                ") VALUES ( " +
                "0," +
                "0," +
                "0," +
                "16," +
                "0," +
                "0," +
                "0," +
                "0," +
                "@sth_create_user, " +
                "date('now'), " +
                "@sth_lastup_user, " +
                "date('now'), " +
                "''," +
                "''," +
                "''," +
                "@sth_firmano," +
                "@sth_subeno," +
                "@sth_tarih," +
                "@sth_tip," +
                "@sth_cins," +
                "@sth_normal_iade," +
                "@sth_evraktip," +
                "'@sth_evrakno_seri'," +
                "@sth_evrakno_sira," +
                "(SELECT IFNULL(MAX(sth_satirno),-1) + 1 AS SATIRNO FROM STOKHAR WHERE sth_evrakno_seri = '@sth_evrakno_seri' AND sth_evrakno_sira = @sth_evrakno_sira AND sth_evraktip = @sth_evraktip)," +
                "'@sth_belge_no'," +
                "'@sth_belge_tarih'," +
                "'@sth_stok_kod'," +
                "@sth_isk_mas1," +
                "@sth_isk_mas2," +
                "@sth_isk_mas3," +
                "@sth_isk_mas4," +
                "@sth_isk_mas5," +
                "@sth_isk_mas6," +
                "@sth_isk_mas7," +
                "@sth_isk_mas8," +
                "@sth_isk_mas9," +
                "@sth-isk_mas10," +
                "@sth_sat_iskmas1," +
                "@sth_sat_iskmas2," +
                "@sth_sat_iskmas3," +
                "@sth_sat_iskmas4," +
                "@sth_sat_iskmas5," +
                "@sth_sat_iskmas6," +
                "@sth_sat_iskmas7," +
                "@sth_sat_iskmas8," +
                "@sth_sat_iskmas9," +
                "@sth-sat_iskmas10," +
                "0," +
                "0," +
                "@sth_cari_cinsi," +
                "'@sth_cari_kodu'," +
                "0," +
                "''," +
                "'@sth_plasiyer_kodu'," +
                "@sth_har_doviz_cinsi," +
                "@sth_har_doviz_kuru," +
                "@sth_alt_doviz_kuru," +
                "@sth_stok_doviz_cinsi," +
                "@sth_stok_doviz_kuru," +
                "@sth_miktar," +
                "@sth-miktar2," +
                "@sth_birim_pntr," +
                "@sth_tutar," +
                "@sth_iskonto1," +
                "@sth_iskonto2," +
                "@sth_iskonto3," +
                "@sth_iskonto4," +
                "@sth_iskonto5," +
                "@sth_iskonto6," +
                "@sth_masraf1," +
                "@sth_masraf2," +
                "@sth_masraf3," +
                "@sth_masraf4," +
                "@sth_vergi_pntr," +
                "@sth_vergi," +
                "@sth_masraf_vergi_pntr," +
                "@sth_masraf_vergi," +
                "0," +
                "@sth_odeme_op," +
                "'@sth_aciklama'," +
                "'@sth_sip_uid'," +
                "@sth_fat_uid," +
                "@sth_giris_depo_no," +
                "@sth_cikis_depo_no," +
                "'@sth_malkbl_sevk_tarihi'," +
                "'@sth_cari_srm_merkezi'," +
                "'@sth_stok_srm_merkezi'," +
                "'18991230', " +
                "0," +
                "@sth-vergisiz_fl," +
                "0," +
                "0," +
                "0," +
                "@sth_adres_no," +
                "'@sth_parti_kodu'," +
                "@sth_lot_no," +
                "'00000000-0000-0000-0000-000000000000'," +
                "'@sth_proje_kodu'," +
                "'@sth_exim_kodu'," +
                "0," +
                "0," +
                "0," +
                "@sth_disticaret_turu," +
                "0," +
                "@sth_otvvergisiz_fl," +
                "0," +
                "0," +
                "@sth_oivvergisiz_fl," +
                "@sth_fiyat_liste_no," +
                "0," +
                "0," +
                "@sth_nakliyedeposu," +
                "0," +
                "'00000000-0000-0000-0000-000000000000'," +
                "0," +
                "0," +
                "''," +
                "''," + 
                "''," +
                "''," +
                "0," +
                "0," +
                "0," +
                "0," +
                "0," +
                "0," +
                "0 ) " ,
        param : ['sth_create_user:int','sth_lastup_user:int','sth_firmano:int','sth_subeno:int','sth_tarih:date','sth_tip:int','sth_cins:int',
        'sth_normal_iade:int','sth_evraktip:int','sth_evrakno_seri:string','sth_evrakno_sira:int','sth_belge_no:string','sth_belge_tarih:date',
        'sth_stok_kod:string','sth_isk_mas1:int','sth_isk_mas2:int','sth_isk_mas3:int','sth_isk_mas4:int','sth_isk_mas5:int','sth_isk_mas6:int','sth_isk_mas7:int',
        'sth_isk_mas8:int','sth_isk_mas9:int','sth-isk_mas10:int','sth_sat_iskmas1:int','sth_sat_iskmas2:int','sth_sat_iskmas3:int','sth_sat_iskmas4:int','sth_sat_iskmas5:int',
        'sth_sat_iskmas6:int','sth_sat_iskmas7:int','sth_sat_iskmas8:int','sth_sat_iskmas9:int','sth-sat_iskmas10:int','sth_cari_cinsi:int','sth_cari_kodu:string',
        'sth_plasiyer_kodu:string','sth_har_doviz_cinsi:int','sth_har_doviz_kuru:int','sth_alt_doviz_kuru:int','sth_stok_doviz_cinsi:int','sth_stok_doviz_kuru:int',
        'sth_miktar:int','sth-miktar2:int','sth_birim_pntr:int','sth_tutar:int','sth_iskonto1:int','sth_iskonto2:int','sth_iskonto3:int','sth_iskonto4:int',
        'sth_iskonto5:int','sth_iskonto6:int','sth_masraf1:int','sth_masraf2:int','sth_masraf3:int','sth_masraf4:int','sth_vergi_pntr:int','sth_vergi:int','sth_masraf_vergi_pntr:int',
        'sth_masraf_vergi:int','sth_odeme_op:int','sth_aciklama:string','sth_sip_uid:string','sth_fat_uid:int','sth_giris_depo_no:int','sth_cikis_depo_no:int','sth_malkbl_sevk_tarihi:date',
        'sth_cari_srm_merkezi:string','sth_stok_srm_merkezi:string','sth-vergisiz_fl:int','sth_adres_no:int','sth_parti_kodu:string','sth_lot_no:int','sth_proje_kodu:string',
        'sth_exim_kodu:string','sth_disticaret_turu:int','sth_otvvergisiz_fl:bit','sth_oivvergisiz_fl:bit','sth_fiyat_liste_no:int','sth_nakliyedeposu:int']           
    },
    StokHarEvrDelete : 
    {
        query: "DELETE FROM STOKHAR WHERE sth_evrakno_seri = ? AND sth_evrakno_sira = ? AND sth_evraktip = ? " 
    },
    StokHarSatirDelete : 
    {
        query : "DELETE FROM STOKHAR WHERE sth_Guid = ? "
    },
    StokHarUpdate : 
    {
        query:  "UPDATE STOKHAR " +
                "SET sth_miktar=@sth_miktar " +
                ",sth_miktar2=@sth_miktar2 " +  
                ",sth_tutar=@sth_tutar " +
                ",sth_vergi= (@sth_tutar - (@sth_iskonto1 + @sth_iskonto2 + @sth_iskonto3 + @sth_iskonto4 + @sth_iskonto5)) *  (SELECT ORAN / 100 FROM VERGI WHERE PNTR = @sth_vergi_pntr) " +
                ",sth_iskonto1=@sth_iskonto1 " +
                ",sth_iskonto2=@sth_iskonto2 " +
                ",sth_iskonto3=@sth_iskonto3 " +
                ",sth_iskonto4=@sth_iskonto4 " +
                ",sth_iskonto5=@sth_iskonto5 " +
                ",sth_iskonto6=@sth_iskonto6 " +
                ",sth_sat_iskmas1=@sth_sat_iskmas1 " +
                ",sth_sat_iskmas2=@sth_sat_iskmas2 " +
                ",sth_sat_iskmas3=@sth_sat_iskmas3 " +
                ",sth_sat_iskmas4=@sth_sat_iskmas4 " +
                ",sth_sat_iskmas5=@sth_sat_iskmas5 " +
                ",sth_sat_iskmas6=@sth_sat_iskmas6 " +
                " WHERE  sth_Guid = @sth_Guid",
        param : ['sth_miktar:float','sth_miktar2:float','sth_tutar:float','sth_vergi_pntr:int','sth_iskonto1:float','sth_iskonto2:float','sth_iskonto3:float',
        'sth_iskonto4:float','sth_iskonto5:float','sth_iskonto6:float','sth_sat_iskmas1:bit','sth_sat_iskmas2:bit','sth_sat_iskmas3:bit','sth_sat_iskmas4:bit',
        'sth_sat_iskmas5:bit','sth_sat_iskmas6:bit','sth_Guid:int']
    },
    MaxStokHarSira : 
    {
        query: "SELECT IFNULL(MAX(sth_evrakno_sira),0) + 1 AS MAXEVRSIRA FROM STOKHAR WHERE sth_evrakno_seri = ? AND sth_evraktip = ? " 
    },
    StokBedenHarGetir : 
    {
        query:  "SELECT * FROM BEDEN_HAREKETLERI WHERE BdnHar_Har_uid IN ((SELECT sth_Guid FROM STOKHAR WHERE sth_evrakno_seri = ? AND sth_evrakno_sira = ? AND sth_evraktip = ?)) AND BdnHar_Tipi = ?",
    },
    NakliyeAktarimSatirGetir :
    {
        query : "SELECT sth_DBCno , " +
                "(SELECT ADI from STOK WHERE KODU=sth_stok_kod) AS ADI , " +
                "(sth_tutar / sth_miktar) AS FIYAT, " +
                "(select UNVAN1 from CARI WHERE KODU=sth_cari_kodu) AS CARIADI, " +
                "(select SORUMLULUKISMI from SORUMLULUKMRKZ where SORUMLULUKKODU=sth_stok_srm_merkezi) AS SORUMLUMERADI, " +
                "(select PERSONELADI from PERSONEL where PERSONELKODU=sth_plasiyer_kodu) AS PERSONELADI," +
                "sth_evrakno_seri AS SERI, " +
                "sth_evrakno_sira AS SIRA, " +  
                "sth_tarih AS TARIH, " +
                "sth_miktar AS MIKTAR , " +
                "sth_miktar2 AS MIKTAR2 , " +
                "sth_vergi AS TOPTANVERGI, " +
                "IFNULL((SELECT SERI from SIPARISSTOK WHERE RECNO = sth_sip_uid),'') AS SIPSERI , " +
                "IFNULL((SELECT SIRA from SIPARISSTOK WHERE RECNO = sth_sip_uid),0) AS SIPSIRA , " +
                "* FROM DEPONAKLIYE " +
                "WHERE sth_evrakno_seri='@SERI' AND  sth_evrakno_sira=@SIRA AND sth_evraktip='@TIP' AND DURUM = 1" ,
                 param : ['SERI','SIRA','TIP'],
                 type : ['string','int','int']
    },
    NakliyeAktarimGetir :
    {
        query: "SELECT sth_evrakno_seri AS SERI, " +
               "sth_evrakno_sira AS SIRA, MAX(sth_tarih) AS TARIH " +
               "FROM DEPONAKLIYE " +
               "WHERE sth_tarih>='@ILKTARIH' AND  sth_tarih<='@SONTARIH' AND sth_evraktip='@TIP' AND DURUM = 1 " +
               "GROUP BY sth_evrakno_seri,sth_evrakno_sira",
               param : ['ILKTARIH','SONTARIH','TIP'],
               type : ['date','date','int']
               
    },
    //Beden Hareket
    BedenHarInsert : 
    {
        query:  "INSERT INTO BEDENHAR (" +
                "BdnHar_Guid, " +
                "BdnHar_create_user, " +
                "BdnHar_create_date, " +
                "BdnHar_lastup_user, " +
                "BdnHar_lastup_date, " +
                "BdnHar_special1, " +
                "BdnHar_special2, " +
                "BdnHar_special3, " +
                "BdnHar_Tipi, " +
                "BdnHar_Har_uid, " +
                "BdnHar_BedenNo, " +
                "BdnHar_HarGor, " +
                "BdnHar_KnsIsGor, " +
                "BdnHar_KnsFat, " +
                "BdnHar_TesMik " +
                ") VALUES ( " +
                "'@BdnHar_Guid', " +
                "@BdnHar_create_user," +
                "date('now')," +
                "@BdnHar_lastup_user," +
                "date('now')," +
                "''," +
                "''," +
                "''," +
                "@BdnHar_Tipi," +
                "'@BdnHar_Har_uid'," +
                "@BdnHar_BedenNo," +
                "@BdnHar_HarGor," +
                "0," +
                "0," +
                "0 " +
                ")",
        param:  ['BdnHar_create_user','BdnHar_lastup_user','BdnHar_Tipi','BdnHar_Har_uid','BdnHar_BedenNo','BdnHar_HarGor',
        'BdnHar_rezervasyon_miktari','BdnHar_rezerveden_teslim_edilen'],
        guid : "BdnHar_Guid"
    },
    BedenHarUpdate :
    {
        query:  "UPDATE BEDEN_HAREKETLERI " +
                "SET BdnHar_HarGor = ? " +
                ",BdnHar_rezervasyon_miktari = ? " + 
                ",BdnHar_rezerveden_teslim_edilen = ? " +
                "WHERE  BdnHar_Har_uid = ? AND BdnHar_Tipi = ? AND BdnHar_BedenNo = ? "
    },
    BedenHarDelete : 
    {
        query:  "DELETE BEDEN_HAREKETLERI WHERE BdnHar_Har_uid = ? AND BdnHar_Tipi = ? "
    },
    //Cari Hareket
    CariHarGetir : 
    {
        query:  "SELECT  " +
                "*, " +
                "(SELECT UNVAN1 FROM CARI WHERE KODU=cha_kod) AS CARIADI, " +
                "ROUND(cha_meblag,2) AS TUTAR, " +
                "CASE cha_cinsi WHEN 19 THEN IFNULL((SELECT BANKAISMI FROM BANKA WHERE BANKAKODU = cha_kasa_hizkod),'') " +
                "ELSE IFNULL((SELECT KASAISMI FROM KASA WHERE KASAKODU = cha_kasa_hizkod),'') END AS KASAADI " +
                "FROM CARIHAR " +
                "WHERE cha_evrakno_seri = ? AND cha_evrakno_sira = ? " +
                "AND cha_evrak_tip = ? " 
    },
    CariHarInsert : 
    {
        query : "INSERT INTO CARIHAR (" +
                "[cha_DBCno] " +
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
                ") VALUES ( " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "51,                                    " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "@cha_create_user,                      " + 
                "date('now'),                           " + 
                "@cha_lastup_user,                      " + 
                "date('now'),                           " + 
                "'',                                    " + 
                "'',                                    " + 
                "'',                                    " + 
                "@cha_firmano,                          " + 
                "@cha_subeno,                           " + 
                "@cha_evrak_tip,                        " + 
                "'@cha_evrakno_seri',                   " + 
                "@cha_evrakno_sira,                     " + 
                "(SELECT IFNULL(MAX(cha_satir_no),-1) + 1 AS SATIRNO FROM CARIHAR WHERE cha_evrakno_seri = '@cha_evrakno_seri' AND cha_evrakno_sira = @cha_evrakno_sira AND cha_evrak_tip = @cha_evrak_tip), " + 
                "'@cha_tarihi',                         " + 
                "@cha_tip,                              " + 
                "@cha_cinsi,                            " + 
                "@cha_normal_Iade,                      " + 
                "@cha_tpoz,                             " + 
                "@cha_ticaret_turu,                     " + 
                "'@cha_belge_no',                       " + 
                "'@cha_belge_tarih',                    " + 
                "'@cha_aciklama',                       " + 
                "'@cha_satici_kodu',                    " + 
                "'@cha_EXIMkodu',                       " + 
                "'@cha_projekodu',                      " + 
                "'',                                    " + 
                "@cha_cari_cins,                        " + 
                "'@cha_kod',                            " + 
                "'@cha_ciro_cari_kodu',                 " + 
                "@cha_d_cins,                           " + 
                "@cha_d_kur,                            " + 
                "@cha_altd_kur,                         " + 
                "@cha_grupno,                           " + 
                "'@cha_srmrkkodu',                      " + 
                "@cha_kasa_hizmet,                      " + 
                "'@cha_kasa_hizkod',                    " + 
                "@cha_kasaidcinsi,		                " +
                "@cha_kasaid_kur,   	                " +
                "@cha_karsidgrupno ,	                " +
                "'@cha_karsisrmrkkodu',	                " +
                "0,                                     " + 
                "@cha_meblag,                           " + 
                "@cha_aratoplam,                        " + 
                "'@cha_vade',                             " + 
                "0,                                     " + 
                "@cha_ft_iskonto1,                      " + 
                "@cha_ft_iskonto2,                      " + 
                "@cha_ft_iskonto3,                      " + 
                "@cha_ft_iskonto4,                      " + 
                "@cha_ft_iskonto5,                      " + 
                "@cha_ft_iskonto6,                      " + 
                "@cha_ft_masraf1,                       " + 
                "@cha_ft_masraf2,                       " + 
                "@cha_ft_masraf3,                       " + 
                "@cha_ft_masraf4,                       " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "@cha_vergipntr,                        " + 
                "@cha_vergi1,                           " + 
                "@cha_vergi2,                           " + 
                "@cha_vergi3,                           " + 
                "@cha_vergi4,                           " + 
                "@cha_vergi5,                           " + 
                "@cha_vergi6,                           " + 
                "@cha_vergi7,                           " + 
                "@cha_vergi8,                           " + 
                "@cha_vergi9,                           " + 
                "@cha_vergi10,                          " + 
                "@cha_vergisiz_fl,                      " + 
                "@cha_otvtutari,                        " + 
                "@cha_otvvergisiz_fl,                   " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "@cha_oivergisiz_fl,                    " + 
                "'18991230',                            " + 
                "0,                                     " + 
                "'@cha_trefno',                           " + 
                "@cha_sntck_poz,                        " + 
                "'18991230',                            " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "cast(cast(0 as binary) as uniqueidentifier), " + 
                "cast(cast(0 as binary) as uniqueidentifier), " + 
                "'18991230',                            " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "0,                                     " + 
                "@cha_e_islem_turu,                     " + 
                "0,                                     " + 
                "'',                                    " + 
                "'00000000-0000-0000-0000-00000000000000', " + 
                "1,                                     " + 
                "0,                                     " + 
                "'18991230',                            " + 
                "0,                                     " + 
                "'',                                    " + 
                "'',                                    " + 
                "''                                     " +
                ")  " ,
                param : ['cha_create_user:int','cha_lastup_user:int','cha_firmano:int','cha_subeno:int','cha_evrak_tip:int','cha_evrakno_seri:string|25','cha_evrakno_sira:int',
                'cha_tarihi:date','cha_tip:int','cha_cinsi:int','cha_normal_Iade:int','cha_tpoz:int','cha_ticaret_turu:int','cha_belge_no:string|25','cha_belge_tarih:date',
                'cha_aciklama:string|40','cha_satici_kodu:string|25','cha_EXIMkodu:string|25','cha_projekodu:string|25','cha_cari_cins:int','cha_kod:string|25','cha_ciro_cari_kodu:string|25',
                'cha_d_cins:int','cha_d_kur:float','cha_altd_kur:float','cha_grupno:int','cha_srmrkkodu:string|25','cha_kasa_hizmet:int','cha_kasa_hizkod:string|25','cha_kasaidcinsi:int','cha_kasaid_kur:float','cha_karsidgrupno:int','cha_karsisrmrkkodu:string|25',
                'cha_meblag:float','cha_aratoplam:float','cha_vade:string|10','cha_ft_iskonto1:float','cha_ft_iskonto2:float','cha_ft_iskonto3:float','cha_ft_iskonto4:float','cha_ft_iskonto5:float',
                'cha_ft_iskonto6:float','cha_ft_masraf1:float','cha_ft_masraf2:float','cha_ft_masraf3:float','cha_ft_masraf4:float','cha_vergipntr:int','cha_vergi1:float','cha_vergi2:float',
                'cha_vergi3:float','cha_vergi4:float','cha_vergi5:float','cha_vergi6:float','cha_vergi7:float','cha_vergi8:float','cha_vergi9:float','cha_vergi10:float','cha_vergisiz_fl:bit',
                'cha_otvtutari:float','cha_otvvergisiz_fl:bit','cha_oivergisiz_fl:bit','cha_trefno:string|25','cha_sntck_poz:int','cha_e_islem_turu:int']
    },
    CariHarEvrDelete : 
    {
        query : "DELETE FROM CARIHAR WHERE cha_evrakno_seri = ? AND cha_evrakno_sira = ? AND cha_evrak_tip = ? " 
    },
    CariHarSatirDelete : 
    {
        query : "DELETE FROM CARIHAR WHERE cha_Guid = ? "
    },
    CariHarUpdate : 
    {
        query : "UPDATE CARIHAR " +
                "SET cha_meblag = ? " +
                ",cha_aratoplam = ? " +
                ",cha_vergi1 = ? " +
                ",cha_vergi2 = ? " +
                ",cha_vergi3 = ? " + 
                ",cha_vergi4 = ? " + 
                ",cha_vergi5 = ? " + 
                ",cha_vergi6 = ? " + 
                ",cha_vergi7 = ? " + 
                ",cha_vergi8 = ? " + 
                ",cha_vergi9 = ? " + 
                ",cha_vergi10 = ? " +
                ",cha_ft_iskonto1 = ? " +
                ",cha_ft_iskonto2 = ? " +
                ",cha_ft_iskonto3 = ? " +
                ",cha_ft_iskonto4 = ? " +
                ",cha_ft_iskonto5 = ? " +
                ",cha_ft_iskonto6 = ? " +
                ",cha_otvtutari = ? " +
                "WHERE  cha_Guid = ? "
    },
    MaxCariHarSira : 
    {
        query : "SELECT IFNULL(MAX(cha_evrakno_sira),0) + 1 AS MAXEVRSIRA FROM CARIHAR WHERE cha_evrakno_seri = ? AND cha_evrak_tip = ? "
    },
    //#region "LOCAL TABLOLAR OLUŞTURMA VE AKTARIM"
    AdresTbl : 
    {
        tag : "ADRES",
        query : "CREATE TABLE IF NOT EXISTS ADRES (" +
                "CARIKODU NVARCHAR (25)," + 
                "ADRESNO INTEGER," + 
                "CADDE NVARCHAR(50), " + 
                "SOKAK NVARCHAR(50), " +
                "ILCE NVARCHAR(15)," +
                "IL NVARCHAR(15), " +
                "SEKTOR NVARCHAR(25), " +
                "GRUBU NVARCHAR(25), " + 
                "BOLGE NVARCHAR (25), " +
                "TEMSILCI NVARCHAR (25))",
        insert : "INSERT INTO ADRES VALUES (?,?,?,?,?,?,?,?,?,?)"                
    },
    AlisSartiTbl : 
    {
        tag : "ALISSARTI",
        query : "CREATE TABLE IF NOT EXISTS ALISSARTI (" +
                "STOKKOD NVARCHAR (25)," + 
                "CARIKOD NVARCHAR (25)," + 
                "BITIS DATETIME, " + 
                "BASLANGIC DATETIME, " +
                "FIYAT FLOAT," +
                "ISKONTOM1 FLOAT, " +
                "ISKONTOM2 FLOAT, " +
                "ISKONTOM3 FLOAT, " + 
                "ISKONTOM4 FLOAT, " +
                "ISKONTOM5 FLOAT, " +
                "ISKONTOY1 FLOAT, " +
                "ISKONTOY2 FLOAT, " +
                "ISKONTOY3 FLOAT, " + 
                "ISKONTOY4 FLOAT, " +
                "ISKONTOY5 FLOAT, " +
                "ODEPLAN INTEGER, " +
                "DOVIZ TINYINT, " +
                "DEPO INTEGER, " +
                "LISTENO INTEGER, " +
                "DOVIZSEMBOL NVARCHAR (25), " +
                "DOVIZKUR FLOAT, " +
                "SEKTOR NVARCHAR (25), " +
                "BOLGE NVARCHAR (25), " +
                "GRUP NVARCHAR (25), " +
                "TEMSILCI NVARCHAR (25))",
        insert : "INSERT INTO ALISSARTI VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"                
    },
    AltGrupTbl : 
    {
        tag : "ALTGRUP",
        query : "CREATE TABLE IF NOT EXISTS ALTGRUP (" +
                "KODU NVARCHAR (25)," + 
                "ADI NVARCHAR (40))",
        insert : "INSERT INTO ALTGRUP VALUES (?,?)"                
    },
    AnaGrupTbl : 
    {
        tag : "ANAGRUP",
        query : "CREATE TABLE IF NOT EXISTS ANAGRUP (" +
                "KODU NVARCHAR (25)," + 
                "ADI NVARCHAR (40))",
        insert : "INSERT INTO ANAGRUP VALUES (?,?)"                
    },
    BankaTbl : 
    {
        tag : "BANKA",
        query : "CREATE TABLE IF NOT EXISTS BANKA (" +
                "BANKAKODU NVARCHAR (25)," + 
                "BANKAISMI NVARCHAR (40)," + 
                "BANKADOVIZCINSI TINYINT," + 
                "DOVIZSEMBOL NVARCHAR (25)," + 
                "DOVIZKUR FLOAT)",
        insert : "INSERT INTO BANKA VALUES (?,?,?,?,?)"                
    },
    BarkodTbl : 
    {
        tag : "BARKOD",
        query : "CREATE TABLE IF NOT EXISTS BARKOD (" +
                "KODU NVARCHAR (25)," + 
                "BARKOD NVARCHAR (25)," + 
                "BIRIMPNTR TINYINT, " +
                "BEDENPNTR TINYINT," +
                "RENKPNTR TINYINT, " +
                "BARKODTIP TINYINT, " +
                "BEDEN NVARCHAR(25), " + 
                "RENK NVARCHAR (25), " +
                "PARTI NVARCHAR (25), " +
                "LOT INTEGER, " + 
                "KATSAYI FLOAT, " +
                "BIRIM NVARCHAR(25), " +
                "KIRILIMMIKTAR FLOAT, " + 
                "KIRILIMMIKTAR2 FLOAT)",
        insert : "INSERT INTO BARKOD VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)"                
    },
    BedenHarTbl : 
    {
        tag : "BEDENHAR",
        query : "CREATE TABLE IF NOT EXISTS BEDENHAR (" +
                "BdnHar_Guid NVARCHAR," + 
                "BdnHar_create_user SMALLINT," + 
                "BdnHar_create_date DATETIME," + 
                "BdnHar_lastup_user SMALLINT," + 
                "BdnHar_lastup_date DATETIME," + 
                "BdnHar_special1 NVARCHAR(4)," + 
                "BdnHar_special2 NVARCHAR(4)," + 
                "BdnHar_special3 NVARCHAR(4)," + 
                "BdnHar_Tipi SMALLINT," + 
                "BdnHar_Har_uid NVARCHAR," + 
                "BdnHar_BedenNo SMALLINT," + 
                "BdnHar_HarGor FLOAT," + 
                "BdnHar_KnsIsGor FLOAT," + 
                "BdnHar_KnsFat FLOAT," + 
                "BdnHar_TesMik FLOAT)",
        insert : "INSERT INTO BEDENHAR VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)"                
    },
    BirimTbl : 
    {
        tag : "BIRIM",
        query : "CREATE TABLE IF NOT EXISTS BIRIM ( " +
                "BIRIMPNTR INT, " + 
                "BIRIM NVARCHAR (25), " + 
                "KODU NVARCHAR(25), " +
                "KATSAYI INT) ",  
        insert : "INSERT INTO BIRIM VALUES (?,?,?,?)"                
    },
    CariTbl : 
    {
        tag : "CARI",
        query : "CREATE TABLE IF NOT EXISTS CARI (" +
                "KODU NVARCHAR(25)," + 
                "CKILIT INTEGER," + 
                "UNVAN1 NVARCHAR(50)," + 
                "UNVAN2 NVARCHAR(50)," + 
                "DOVIZCINSI TINYINT," + 
                "DOVIZCINSI1 TINYINT," + 
                "DOVIZCINSI2 TINYINT," + 
                "VDADI NVARCHAR(20)," + 
                "VDNO NVARCHAR(15)," + 
                "SATISFK INTEGER," + 
                "ISKONTOKOD NVARCHAR(4)," + 
                "SEKTOR NVARCHAR(25)," + 
                "BOLGE NVARCHAR(25)," + 
                "GRUP NVARCHAR(25)," + 
                "TEMSILCI NVARCHAR(25)," + 
                "DOVIZSEMBOL NVARCHAR(25)," + 
                "DOVIZSEMBOL1 NVARCHAR(25)," + 
                "DOVIZSEMBOL2 NVARCHAR(25)," + 
                "DOVIZKUR FLOAT," + 
                "DOVIZKUR1 FLOAT," + 
                "DOVIZKUR2 FLOAT," + 
                "ALTDOVIZKUR FLOAT," + 
                "RISK FLOAT," + 
                "ODEMEPLANI INTEGER," + 
                "BAKIYE FLOAT," + 
                "BELGENO NVARCHAR(20)," + 
                "BELGETARIH DATETIME," + 
                "VERGISIZ BIT," + 
                "EFATURA BIT)",
        insert : "INSERT INTO CARI VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"                
    },
    CariFoyTbl : 
    {
        tag : "CARIFOY",
        query : "CREATE TABLE IF NOT EXISTS CARIFOY (" +
                "KODU NVARCHAR(25)," + 
                "ADI NVARCHAR(50)," + 
                "SERI NVARCHAR(25)," + 
                "SIRA INTEGER," + 
                "TARIH DATETIME," + 
                "EVRAKTIP NVARCHAR(250)," + 
                "CINSI NVARCHAR(250)," + 
                "NI NVARCHAR(50)," + 
                "BA NVARCHAR(50)," + 
                "BORC FLOAT," + 
                "ALACAK FLOAT," + 
                "BAKIYE FLOAT," + 
                "TBAKIYE FLOAT," + 
                "GUNFARK INTEGER)",
        insert : "INSERT INTO CARIFOY VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)"                
    },
    CariHarTbl : 
    {
        tag : "CARIHAR",
        query : "CREATE TABLE IF NOT EXISTS CARIHAR (" +
                "cha_Guid INTEGER PRIMARY KEY AUTOINCREMENT," + 
                "cha_DBCno INTEGER" +
                ",cha_SpecRecNo INTEGER" +
                ",cha_iptal INTEGER" +
                ",cha_fileid INTEGER" +
                ",cha_hidden INTEGER" +
                ",cha_kilitli INTEGER" +
                ",cha_degisti INTEGER" +
                ",cha_CheckSum INTEGER," +
                "cha_create_user SMALLINT," + 
                "cha_create_date DATETIME," + 
                "cha_lastup_user SMALLINT," + 
                "cha_lastup_date DATETIME," + 
                "cha_special1 NVARCHAR(4)," + 
                "cha_special2 NVARCHAR(4)," + 
                "cha_special3 NVARCHAR(4)," + 
                "cha_firmano INTEGER," + 
                "cha_subeno INTEGER," + 
                "cha_evrak_tip TINYINT," + 
                "cha_evrakno_seri NVARCHAR(20)," + 
                "cha_evrakno_sira INTEGER," + 
                "cha_satir_no INTEGER," + 
                "cha_tarihi DATETIME," + 
                "cha_tip TINYINT," + 
                "cha_cinsi TINYINT," + 
                "cha_normal_Iade TINYINT," + 
                "cha_tpoz TINYINT," + 
                "cha_ticaret_turu TINYINT," + 
                "cha_belge_no NVARCHAR(50)," + 
                "cha_belge_tarih DATETIME," + 
                "cha_aciklama NVARCHAR(40)," + 
                "cha_satici_kodu NVARCHAR(25)," + 
                "cha_EXIMkodu NVARCHAR(25)," +
                "cha_yat_tes_kodu NVARCHAR(25), " +
                "cha_projekodu NVARCHAR(25)," + 
                "cha_cari_cins TINYINT," + 
                "cha_kod NVARCHAR(25)," + 
                "cha_ciro_cari_kodu NVARCHAR(25)," + 
                "cha_d_cins TINYINT," + 
                "cha_d_kur FLOAT," + 
                "cha_altd_kur FLOAT," + 
                "cha_grupno TINYINT," + 
                "cha_srmrkkodu NVARCHAR(25)," + 
                "cha_kasa_hizmet TINYINT," + 
                "cha_kasa_hizkod NVARCHAR(25)," + 
                "cha_karsidcinsi TINYINT," + 
                "cha_karsid_kur FLOAT," + 
                "cha_karsidgrupno TINYINT," + 
                "cha_karsisrmrkkodu NVARCHAR(25)," + 
                "cha_miktari FLOAT," + 
                "cha_meblag FLOAT," + 
                "cha_aratoplam FLOAT," + 
                "cha_vade INTEGER," + 
                "cha_Vade_Farki_Yuz FLOAT," +
                "cha_ft_iskonto1 FLOAT," + 
                "cha_ft_iskonto2 FLOAT," + 
                "cha_ft_iskonto3 FLOAT," + 
                "cha_ft_iskonto4 FLOAT," + 
                "cha_ft_iskonto5 FLOAT," + 
                "cha_ft_iskonto6 FLOAT," + 
                "cha_ft_masraf1 FLOAT," + 
                "cha_ft_masraf2 FLOAT," + 
                "cha_ft_masraf3 FLOAT," + 
                "cha_ft_masraf4 FLOAT," + 
                "cha_isk_mas1 TINYINT," + 
                "cha_isk_mas2 TINYINT," + 
                "cha_isk_mas3 TINYINT," + 
                "cha_isk_mas4 TINYINT," + 
                "cha_isk_mas5 TINYINT," + 
                "cha_isk_mas6 TINYINT," + 
                "cha_isk_mas7 TINYINT," + 
                "cha_isk_mas8 TINYINT," + 
                "cha_isk_mas9 TINYINT," + 
                "cha_isk_mas10 TINYINT," + 
                "cha_sat_iskmas1 TINYINT," +
                "cha_sat_iskmas2 TINYINT," +
                "cha_sat_iskmas3 TINYINT," +
                "cha_sat_iskmas4 TINYINT," +
                "cha_sat_iskmas5 TINYINT," +
                "cha_sat_iskmas6 TINYINT," +
                "cha_sat_iskmas7 TINYINT," +
                "cha_sat_iskmas8 TINYINT," +
                "cha_sat_iskmas9 TINYINT," +
                "cha_sat_iskmas10 TINYINT," +
                "cha_yuvarlama FLOAT," +
                "cha_StFonPntr TINYINT," +
                "cha_stopaj FLOAT," +
                "cha_savsandesfonu FLOAT," +
                "cha_avansmak_damgapul FLOAT," +
                "cha_vergipntr TINYINT," + 
                "cha_vergi1 FLOAT," + 
                "cha_vergi2 FLOAT," + 
                "cha_vergi3 FLOAT," + 
                "cha_vergi4 FLOAT," + 
                "cha_vergi5 FLOAT," + 
                "cha_vergi6 FLOAT," + 
                "cha_vergi7 FLOAT," + 
                "cha_vergi8 FLOAT," + 
                "cha_vergi9 FLOAT," + 
                "cha_vergi10 FLOAT," + 
                "cha_vergisiz_fl BIT," + 
                "cha_otvtutari FLOAT," + 
                "cha_otvvergisiz_fl BIT," + 
                "cha_oiv_pntr TINYINT," + 
                "cha_oivtutari FLOAT," + 
                "cha_oiv_vergi FLOAT," + 
                "cha_oivergisiz_fl BIT," + 
                "cha_fis_tarih DATETIME, " +
                "cha_fis_sirano INTEGER, " +
                "cha_trefno NVARCHAR(25)," + 
                "cha_sntck_poz TINYINT," + 
                "cha_reftarihi DATETIME," + 
                "cha_istisnakodu TINYINT, " +
                "cha_pos_hareketi TINYINT, " +
                "cha_meblag_ana_doviz_icin_gecersiz_fl TINYINT, " +
                "cha_meblag_alt_doviz_icin_gecersiz_fl TINYINT, " +
                "cha_meblag_orj_doviz_icin_gecersiz_fl TINYINT, " +
                "cha_sip_uid  UNIQUEIDENTIFIER, " +
                "cha_kirahar_uid UNIQUEIDENTIFIER, " +
                "cha_vardiya_tarihi DATETIME, " +
                "cha_vardiya_no TINYINT, " +
                "cha_vardiya_evrak_ti TINYINT, " +
                "cha_ebelge_turu TINYINT, " +
                "cha_tevkifat_toplam FLOAT, " +
                "cha_ilave_edilecek_kdv1 FLOAT, " +
                "cha_ilave_edilecek_kdv2 FLOAT, " +
                "cha_ilave_edilecek_kdv3 FLOAT, " +
                "cha_ilave_edilecek_kdv4 FLOAT, " +
                "cha_ilave_edilecek_kdv5 FLOAT, " +
                "cha_ilave_edilecek_kdv6 FLOAT, " +
                "cha_ilave_edilecek_kdv7 FLOAT, " +
                "cha_ilave_edilecek_kdv8 FLOAT, " +
                "cha_ilave_edilecek_kdv9 FLOAT, " +
                "cha_ilave_edilecek_kdv10 FLOAT, " +
                "cha_e_islem_turu TINYINT," + 
                "cha_fatura_belge_turu TINYINT," + 
                "cha_diger_belge_adi NVARCHAR(50)," + 
                "cha_uuid UNIQUEIDENTIFIER, " +
                "cha_adres_no INTEGER," +
                "cha_vergifon_toplam FLOAT," +
                "cha_ilk_belge_tarihi DATETIME," +
                "cha_ilk_belge_doviz_kuru FLOAT," +
                "cha_HareketGrupKodu1 NVARCHAR(25)," +
                "cha_HareketGrupKodu2 NVARCHAR(25)," +
                "cha_HareketGrupKodu3 NVARCHAR(25) )" ,
        insert : "INSERT INTO CARIHAR VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"                
    },
    DepoTbl : 
    {
        tag : "DEPO",
        query : "CREATE TABLE IF NOT EXISTS DEPO (" +
                "DEPONO INTEGER," + 
                "DEPOADI NVARCHAR(50)," + 
                "DEPOCADDE NVARCHAR(50)," + 
                "DEPOSOKAK NVARCHAR(50)," + 
                "DEPOILCE NVARCHAR(15)," + 
                "DEPOIL NVARCHAR(15))",
        insert : "INSERT INTO DEPO VALUES (?,?,?,?,?,?)"                
    },
    DepoSiparisTbl : 
    {
        tag : "DEPOSIPARIS",
        query : "CREATE TABLE IF NOT EXISTS DEPOSIPARIS (" +
                "ssip_Guid INTEGER PRIMARY KEY AUTOINCREMENT," + 
                "ssip_create_user SMALLINT," + 
                "ssip_create_date DATETIME," + 
                "ssip_lastup_user SMALLINT," + 
                "ssip_lastup_date DATETIME," + 
                "ssip_special1 NVARCHAR(4)," + 
                "ssip_special2 NVARCHAR(4)," + 
                "ssip_special3 NVARCHAR(4)," + 
                "ssip_firmano INTEGER," + 
                "ssip_subeno INTEGER," + 
                "ssip_tarih DATETIME," + 
                "ssip_teslim_tarih DATETIME," + 
                "ssip_evrakno_seri NVARCHAR(20)," + 
                "ssip_evrakno_sira INTEGER," + 
                "ssip_satirno INTEGER," + 
                "ssip_belgeno NVARCHAR(50)," + 
                "ssip_belge_tarih DATETIME," + 
                "ssip_stok_kod NVARCHAR(25)," + 
                "ssip_miktar FLOAT," + 
                "ssip_b_fiyat FLOAT," + 
                "ssip_tutar FLOAT," + 
                "ssip_teslim_miktar FLOAT," + 
                "ssip_aciklama NVARCHAR(50)," + 
                "ssip_girdepo INTEGER," + 
                "ssip_cikdepo INTEGER," + 
                "ssip_kapat_fl BIT," + 
                "ssip_birim_pntr TINYINT," + 
                "ssip_fiyat_liste_no INTEGER," + 
                "ssip_stal_uid INTEGER," + 
                "ssip_paket_kod  NVARCHAR(25))",
        insert : "INSERT INTO DEPOSIPARIS VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"                
    },
    DepoSiparisStokTbl : 
    {
        tag : "DEPOSIPARISSTOK",
        query : "CREATE TABLE IF NOT EXISTS DEPOSIPARISSTOK (" +
                "GUID NVARCHAR(50)," + 
                "KODU NVARCHAR(25)," + 
                "TARIH DATETIME," + 
                "TESLIMTARIH DATETIME," + 
                "SERI NVARCHAR(20)," + 
                "SIRA INTEGER," + 
                "SATIRNO INTEGER," + 
                "BELGENO NVARCHAR(50)," + 
                "BFIYAT FLOAT," + 
                "SIPMIKTAR FLOAT," + 
                "BIRIMPNTR TINYINT," + 
                "TESLIMMIKTAR FLOAT," + 
                "TUTAR FLOAT," + 
                "GDEPO INTEGER," + 
                "CDEPO INTEGER," + 
                "BMIKTAR FLOAT," + 
                "MIKTAR FLOAT," + 
                "BIRIM NVARCHAR(20)," + 
                "DEPOMIKTAR FLOAT," + 
                "DETAYTAKIP INTEGER)",
        insert : "INSERT INTO DEPOSIPARISSTOK VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"                
    },
    EtiketBasTbl : 
    {
        tag : "ETIKETBAS",
        query : "CREATE TABLE IF NOT EXISTS ETIKETBAS (" +
                "Etkb_Guid INTEGER PRIMARY KEY AUTOINCREMENT," + 
                "Etkb_create_user SMALLINT," + 
                "Etkb_create_date DATETIME," + 
                "Etkb_lastup_user SMALLINT," + 
                "Etkb_lastup_date DATETIME," + 
                "Etkb_special1 NVARCHAR(4)," + 
                "Etkb_special2 NVARCHAR(4)," + 
                "Etkb_special3 NVARCHAR(4)," + 
                "Etkb_evrakno_seri NVARCHAR(20)," + 
                "Etkb_evrakno_sira INTEGER," + 
                "Etkb_evrak_tarihi DATETIME," + 
                "Etkb_aciklama NVARCHAR(40)," + 
                "Etkb_satirno INTEGER," + 
                "Etkb_belge_no NVARCHAR(50)," + 
                "Etkb_belge_tarih DATETIME," + 
                "Etkb_EtiketTip TINYINT," + 
                "Etkb_BasimTipi TINYINT," + 
                "Etkb_BasimAdet SMALLINT," + 
                "Etkb_DepoNo INTEGER," + 
                "Etkb_StokKodu NVARCHAR(25)," + 
                "Etkb_RenkNo INTEGER," + 
                "Etkb_BedenNo INTEGER," + 
                "Etkb_Barkodu NVARCHAR(50)," + 
                "Etkb_BasilacakMiktar SMALLINT)",
        insert : "INSERT INTO ETIKETBAS VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"                
    },
    EvrakAciklamaTbl : 
    {
        tag : "EVRAKACIKLAMA",
        query : "CREATE TABLE IF NOT EXISTS EVRAKACIKLAMA (" +
                "egk_Guid INTEGER PRIMARY KEY AUTOINCREMENT," + 
                "egk_create_user SMALLINT," + 
                "egk_create_date DATETIME," + 
                "egk_lastup_user SMALLINT," + 
                "egk_lastup_date DATETIME," + 
                "egk_special1 NVARCHAR(4)," + 
                "egk_special2 NVARCHAR(4)," + 
                "egk_special3 NVARCHAR(4)," + 
                "egk_dosyano NVARCHAR(20)," + 
                "egk_hareket_tip INTEGER," + 
                "egk_evr_tip DATETIME," + 
                "egk_evr_seri NVARCHAR(40)," + 
                "egk_evr_sira INTEGER," + 
                "egk_evr_ustkod NVARCHAR(50)," + 
                "egk_evr_doksayisi DATETIME," + 
                "egk_evracik1 TINYINT," + 
                "egk_evracik2 TINYINT," + 
                "egk_evracik3 SMALLINT," + 
                "egk_evracik4 INTEGER," + 
                "egk_evracik5 NVARCHAR(25)," + 
                "egk_evracik6 INTEGER," + 
                "egk_evracik7 INTEGER," + 
                "egk_evracik8 NVARCHAR(50)," + 
                "egk_evracik9 NVARCHAR(50)," + 
                "egk_evracik10 NVARCHAR(50)," + 
                "egk_sipgenkarorani NVARCHAR(50)," + 
                "egk_kargokodu NVARCHAR(50)," + 
                "egk_kargono NVARCHAR(50)," + 
                "egk_tesaltarihi NVARCHAR(50)," + 
                "egk_tesalkisi SMALLINT)",
        insert : "INSERT INTO EVRAKACIKLAMA VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"                
    },
    FiyatTbl:
    {
        tag : "FIYAT",
        query : "CREATE TABLE IF NOT EXISTS FIYAT (" +
                 "STOKKODU NVARCHAR(25)," +
                 "LISTENO int," +
                 "LISTEADI nvarchar (25)," +
                 "DEPONO int," +
                 "ODEMENO int," +
                 "FIYAT float," +
                 "DOVIZ tinyint," +
                 "DOVIZSEMBOL nvarchar (25)," +
                 "DOVIZKUR float," +
                 "STOKADI nvarchar (50)," +
                 "ALTGRUP nvarchar (25)," +
                 "URETICI nvarchar (25)," +
                 "SEKTOR nvarchar (25)," +
                 "REYON nvarchar (25)," +
                 "MARKA nvarchar (25)," +
                 "ISKONTOKOD nvarchar (4))",               
        insert : "INSERT INTO FIYAT VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"               
    },
    FiyatListeTbl:
    {
        tag : "FIYAT",
        query : "CREATE TABLE IF NOT EXISTS FIYAT (" +
                 "STOKKODU NVARCHAR(25)," +
                 "LISTENO int," +
                 "LISTEADI nvarchar (25)," +
                 "DEPONO int," +
                 "ODEMENO int," +
                 "FIYAT float," +
                 "DOVIZ tinyint," +
                 "DOVIZSEMBOL nvarchar (25)," +
                 "DOVIZKUR float," +
                 "STOKADI nvarchar (50)," +
                 "ALTGRUP nvarchar (25)," +
                 "URETICI nvarchar (25)," +
                 "SEKTOR nvarchar (25)," +
                 "REYON nvarchar (25)," +
                 "MARKA nvarchar (25)," +
                 "ISKONTOKOD nvarchar (4))",               
        insert : "INSERT INTO FIYAT VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"               
    },
    IsEmirleriTbl:
    {
         tag : "ISEMIRLERI",
         query : "CREATE TABLE IF NOT EXISTS ISEMIRLERI (" +
                "KODU nvarchar(25)," +
                "ADI nvarchar(80))", 
         insert : "INSERT INTO ISEMIRLERI VALUES (?,?)"
    },
    IskontoTbl:
    {
         tag : "ISKONTO",
         query : "CREATE TABLE IF NOT EXISTS ISKONTO (" +
                "STOK nvarchar (5)," +
                "CARI nvarchar (5)," +
                "ISIM nvarchar (50)," +
                "ODEMEPLANI int," +
                "ORAN1 float," +
                "ORAN2 float," +
                "ORAN3 float," +
                "ORAN4 float," +
                "ORAN5 float," +
                "ORAN6 float)",
         insert : "INSERT INTO ISKONTO VALUES(?,?,?,?,?,?,?,?,?,?)"
    },
    KasaTbl : 
    {
         tag : "KASA",
         query : "CREATE TABLE IF NOT EXISTS KASA (" +
                "KASAKODU nvarchar(25)," +
                "KASAISMI nvarchar(40)," +
                "KASATIP tinyint," +
                "KASADOVIZCINSI tinyint," +
                "DOVIZSEMBOL nvarchar (25)," +
                "DOVIZKUR float)",
        insert : "INSERT INTO KASA VALUES(?,?,?,?,?,?)"   
    },  
    KonharTbl : 
    {
        tag : "KONHAR",
        query : "CREATE TABLE IF NOT EXISTS KONHAR (" +
                "kon_RECid_DBCno smallint," +
                "kon_RECid_RECno int," +
                "kon_SpecRecno int," +
                "kon_iptal bit," +
                "kon_fileid smallint," +
                "kon_hidden bit," +
                "kon_kilitli bit," +
                "kon_degisti bit," +
                "kon_checksum int," +
                "kon_create_user smallint," +
                "kon_create_date datetime," +
                "kon_lastup_user smallint," +
                "kon_lastup_date datetime," +
                "kon_special1 nvarchar(4)," +
                "kon_special2 nvarchar(4)," +
                "kon_special3 nvarchar(4)," +
                "kon_firmano int," +
                "kon_subeno int," +
                "kon_tarih datetime," +
                "kon_tip tinyint," +
                "kon_normal_iade tinyint," +
                "kon_evrakno_seri nvarchar(4)," +
                "kon_evrakno_sira int," +
                "kon_satirno int," +
                "kon_belge_no nvarchar(15)," +
                "kon_belge_tarih datetime," +
                "kon_stok_kod nvarchar(25)," +
                "kon_cari_kod nvarchar(25)," +
                "kon_satici_kod nvarchar(25)," +
                "kon_miktar float," +
                "kon_faturalanan float," +
                "kon_aciklama nvarchar(50)," +
                "kon_giris_depo_no int," +
                "kon_cikis_depo_no int," +
                "kon_malkabul_tarih datetime," +
                "kon_sip_RECid_DBCno smallint," +
                "kon_sip_RECid_RECno int," +
                "kon_islemgoren float," +
                "kon_karkonRecId_DBCn smallint," +
                "kon_karkonRecId_RECn int," +
                "kon_netagirlik float," +
                "kon_brutagirlik float," +
                "kon_rehinmiktari float," +
                "kon_rehinfiyati float," +
                "kon_miktar2 float," +
                "kon_islemgoren2 float," +
                "kon_sandikmiktari float," +
                "kon_sandikfiyati float," +
                "kon_sevk_adresno smallint," +
                "kon_cari_srm_merkez nvarchar(25)," +
                "kon_stok_srm_merkez nvarchar(25)," +
                "kons_parti_kodu nvarchar(25)," +
                "kons_lot_no int," +
                "kons_projekodu nvarchar(25)," +
                "kons_har_doviz_cinsi tinyint," +
                "kons_har_doviz_kuru float," +
                "kons_alt_doviz_kuru float," +
                "kons_stok_doviz_cinsi tinyint," +
                "kons_stok_doviz_kuru float," +
                "kons_odeme_op int," +
                "kons_birim_pntr tinyint," +
                "kons_tutar float," +
                "kons_isk_mas1 tinyint," +
                "kons_isk_mas2 tinyint," +
                "kons_isk_mas3 tinyint," +
                "kons_isk_mas4 tinyint," +
                "kons_isk_mas5 tinyint," +
                "kons_isk_mas6 tinyint," +
                "kons_isk_mas7 tinyint," +
                "kons_isk_mas8 tinyint," +
                "kons_isk_mas9 tinyint," +
                "kons_isk_mas10 tinyint," +
                "kons_sat_iskmas1 bit," +
                "kons_sat_iskmas2 bit," +
                "kons_sat_iskmas3 bit," +
                "kons_sat_iskmas4 bit," +
                "kons_sat_iskmas5 bit," +
                "kons_sat_iskmas6 bit," +
                "kons_sat_iskmas7 bit," +
                "kons_sat_iskmas8 bit," +
                "kons_sat_iskmas9 bit," +
                "kons_sat_iskmas10 bit," +
                "kons_iskonto1 float," +
                "kons_iskonto2 float," +
                "kons_iskonto3 float," +
                "kons_iskonto4 float," +
                "kons_iskonto5 float," +
                "kons_iskonto6 float," +
                "kons_masraf1 float," +
                "kons_masraf2 float," +
                "kons_masraf3 float," +
                "kons_masraf4 float," +
                "kons_vergi_pntr tinyint," +
                "kons_vergi float," +
                "kons_masraf_vergi_pntr tinyint," +
                "kons_masraf_vergi float," +
                "kons_vergisiz_fl bit," +
                "kons_otv_pntr tinyint," +
                "kons_otv_vergi float," +
                "kons_otvtutari float," +
                "kons_otvvergisiz_fl bit," +
                "kons_oiv_pntr tinyint," +
                "kons_oiv_vergi float," +
                "kons_oivvergisiz_fl bit," +
                "kons_fiyat_liste_no int," +
                "kon_cins tinyint," +
                "kon_evraktip tinyint," +
                "kon_gider_kodu nvarchar(25)," +
                "kons_oivtutari float," +
                "kon_irs_RECid_DBCno smallint," +
                "kon_irs_RECid_RECno int," +
                "kon_yetkili_recid_dbcno smallint," +
                "kon_yetkili_recid_recno int," +
                "kon_nakliyedeposu int," +
                "kon_nakliyedurumu tinyint)", 
        insert : "INSERT INTO KONHAR VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"               
    },
    MarkaTbl : 
    {
        tag : "MARKA", 
        query : "CREATE TABLE IF NOT EXISTS MARKA (" +
                "KODU nvarchar (25)," +
                "ADI nvarchar (40))",
        insert : "INSERT INTO MARKA VALUES (?,?)"
    },
    OdemePlanTbl :
    {
        tag: "ODEMEPLAN",
        query: "CREATE TABLE IF NOT EXISTS ODEMEPLAN (" +
                "ODEMENO int," +
                "ODEMEKODU nvarchar(25)," +
                "ODEMEADI nvarchar(50))",
        insert : "INSERT INTO ODEMEPLAN VALUES (?,?,?)" 
    },
    PersonelTbl : 
    {
        tag : "PERSONEL",
        query : "CREATE TABLE IF NOT EXISTS PERSONEL (" +
                "PERSONELKODU nvarchar(25)," +
                "PERSONELADI nvarchar(50)," +
                "PERSONELSOYADI nvarchar(50)," +
                "PERSONELTIP int)",
        insert : "INSERT INTO PERSONEL VALUES (?,?,?,?)"
    },
    ProjelerTbl : 
    {
        tag : "PROJELER",
        query : "CREATE TABLE IF NOT EXISTS PROJELER (" +
                "KODU nvarchar(25)," +
                "ADI nvarchar(40)," +
                "MUSTERI nvarchar(25))",
        insert : "INSERT INTO PROJELER VALUES (?,?,?)" 
    },
    ReyonTbl : 
    {
        tag : "REYON",
        query : "CREATE TABLE IF NOT EXISTS REYON (" +
                "KODU nvarchar (25)," +
                "ADI nvarchar (40))",
        insert : "INSERT INTO REYON VALUES (?,?)"
    },    
    SatisSartiTbl : 
    {
        tag : "SATISSARTI",
        query : "CREATE TABLE IF NOT EXISTS SATISSARTI (" +
                "STOKKOD nvarchar(25)," +
                "CARIKOD nvarchar(25)," +
                "BITIS datetime," +
                "BASLANGIC datetime," +
                "FIYAT float," +
                "BRUTFIYAT float," +
                "ISKONTOM1 float," +
                "ISKONTOM2 float," +
                "ISKONTOM3 float," +
                "ISKONTOM4 float," +
                "ISKONTOM5 float," +
                "ISKONTOM6 float," +
                "ISKONTOY1 float," +
                "ISKONTOY2 float," +
                "ISKONTOY3 float," +
                "ISKONTOY4 float," +
                "ISKONTOY5 float," +
                "ISKONTOY6 float," +
                "ODEPLAN int," +
                "DOVIZ tinyint," +
                "DEPO int," +
                "LISTENO int," +
                "DOVIZSEMBOL nvarchar (25)," +
                "DOVIZKUR float," +
                "SEKTOR nvarchar (25)," +
                "BOLGE nvarchar (25)," +
                "GRUP nvarchar (25)," +
                "TEMSILCI nvarchar (25))",
        insert : "INSERT INTO SATISSARTI VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    },
    SayimTbl : 
    {
        tag : "SAYIM",
        query : "CREATE TABLE IF NOT EXISTS SAYIM (" +
                "sym_RECid_DBCno smallint," +
                "sym_Guid integer primary key autoincrement," +
                "sym_SpecRECno int," +
                "sym_iptal bit," +
                "sym_fileid smallint," +
                "sym_hidden bit," +
                "sym_kilitli bit," +
                "sym_degisti bit," +
                "sym_checksum int," +
                "sym_create_user smallint," +
                "sym_create_date datetime," +
                "sym_lastup_user smallint," +
                "sym_lastup_date datetime," +
                "sym_special1 nvarchar (4)," +
                "sym_special2 nvarchar (4)," +
                "sym_special3 nvarchar (4)," +
                "sym_tarihi datetime," +
                "sym_depono int," +
                "sym_evrakno int," +
                "sym_satirno int," +
                "sym_Stokkodu nvarchar (25)," +
                "sym_reyonkodu nvarchar (4)," +
                "sym_koridorkodu nvarchar (4)," +
                "sym_rafkodu nvarchar (4)," +
                "sym_miktar1 float," +
                "sym_miktar2 float," +
                "sym_miktar3 float," +
                "sym_miktar4 float," +
                "sym_miktar5 float," +
                "sym_birim_pntr tinyint," +
                "sym_barkod nvarchar (25)," +
                "sym_renkno int," +
                "sym_bedenno int," +
                "sym_parti_kodu nvarchar (25)," +
                "sym_lot_no int," +
                "sym_serino nvarchar (25))", 
        insert : "INSERT INTO SAYIM VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    },
    SenetTbl : 
    {
        tag : "SENET",
        query : "CREATE TABLE IF NOT EXISTS SENET (" +
                "REFNO nvarchar(50)," +
                "VADE datetime," +
                "TUTAR float," +
                "ODENEN float," +
                "SONPOZ tinyint," +
                "NEREDECARI nvarchar(25)," +
                "CARIADI nvarchar(50)," +
                "TIP tinyint," +
                "DOVIZ tinyint," +
                "DOVIZKUR float," +
                "RECNO int," +
                "SEKTOR nvarchar (25)," +
                "BOLGE nvarchar (25)," +
                "GRUP nvarchar (25)," +
                "TEMSILCI nvarchar (25))",
        insert : "INSERT INTO SENET VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    },
    SenetCekTbl : 
    {
        tag : "SENETCEK",
        query : "CREATE TABLE IF NOT EXISTS SENETCEK (" +
                "sck_RECid_DBCno smallint," +
                "sck_RECid_RECno int," +
                "sck_SpecRECno int," +
                "sck_iptal bit," +
                "sck_fileid smallint," +
                "sck_hidden bit," +
                "sck_kilitli bit," +
                "sck_degisti bit," +
                "sck_checksum int," +
                "sck_create_user smallint," +
                "sck_create_date datetime," +
                "sck_lastup_user smallint," +
                "sck_lastup_date datetime," +
                "sck_special1 nvarchar (4)," +
                "sck_special2 nvarchar (4)," +
                "sck_special3 nvarchar (4)," +
                "sck_firmano int," +
                "sck_subeno int," +
                "sck_tip tinyint," +
                "sck_refno nvarchar (25)," +
                "sck_bankano nvarchar (25)," +
                "sck_borclu nvarchar (30)," +
                "sck_vdaire_no nvarchar (40)," +
                "sck_vade datetime," +
                "sck_tutar float," +
                "sck_doviz tinyint," +
                "sck_odenen float," +
                "sck_degerleme_islendi tinyint," +
                "sck_banka_adres1 nvarchar (50)," +
                "sck_sube_adres2 nvarchar (50)," +
                "sck_borclu_tel nvarchar (15)," +
                "sck_hesapno_sehir nvarchar (20)," +
                "sck_no nvarchar (25)," +
                "sck_duzen_tarih datetime," +
                "sck_sahip_cari_cins tinyint," +
                "sck_sahip_cari_kodu nvarchar (25)," +
                "sck_sahip_cari_grupno tinyint," +
                "sck_nerede_cari_cins tinyint," +
                "sck_nerede_cari_kodu nvarchar (25)," +
                "sck_nerede_cari_grupno tinyint," +
                "sck_ilk_hareket_tarihi datetime," +
                "sck_ilk_evrak_seri nvarchar (4)," +
                "sck_ilk_evrak_sira_no int," +
                "sck_ilk_evrak_satir_no int," +
                "sck_son_hareket_tarihi datetime," +
                "sck_doviz_kur float," +
                "sck_sonpoz tinyint," +
                "sck_imza tinyint," +
                "sck_srmmrk nvarchar (25)," +
                "sck_kesideyeri nvarchar (14)," +
                "Sck_TCMB_Banka_kodu nvarchar (4)," +
                "Sck_TCMB_Sube_kodu nvarchar (8)," +
                "Sck_TCMB_il_kodu nvarchar (3)," +
                "SckTasra_fl bit," +
                "sck_projekodu nvarchar (25)," +
                "sck_masraf1 float," +
                "sck_masraf1_isleme tinyint," +
                "sck_masraf2 float," +
                "sck_masraf2_isleme tinyint," +
                "sck_odul_katkisi_tutari float," +
                "sck_servis_komisyon_tutari float," +
                "sck_erken_odeme_faiz_tutari float," +
                "sck_odul_katkisi_tutari_islendi_fl bit," +
                "sck_servis_komisyon_tutari_islendi_fl bit," +
                "sck_erken_odeme_faiz_tutari_islendi_fl bit," +
                "sck_kredi_karti_tipi tinyint," +
                "sck_taksit_sayisi smallint," +
                "sck_kacinci_taksit smallint," +
                "sck_uye_isyeri_no nvarchar (25)," +
                "sck_kredi_karti_no nvarchar (16)," +
                "sck_provizyon_kodu nvarchar (10))",
        insert : "INSERT INTO SENETCEK VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    },
    SeriNoTbl : 
    {
        tag : "SERINO",
        query : "CREATE TABLE IF NOT EXISTS SERINO (" +
                "chz_RECid_DBCno smallint," +
                "chz_RECid_RECno int," +
                "chz_Spec_Rec_no int," +
                "chz_iptal bit," +
                "chz_fileid smallint," +
                "chz_hidden bit," +
                "chz_kilitli bit," +
                "chz_degisti bit," +
                "chz_checksum int," +
                "chz_create_user smallint," +
                "chz_create_date datetime," +
                "chz_lastup_user smallint," +
                "chz_lastup_date datetime," +
                "chz_special1 nvarchar(4)," +
                "chz_special2 nvarchar(4)," +
                "chz_special3 nvarchar(4)," +
                "chz_serino nvarchar(25)," +
                "chz_stok_kodu nvarchar(25)," +
                "chz_grup_kodu nvarchar(25)," +
                "chz_Tuktckodu nvarchar(25)," +
                "chz_GrnBasTarihi datetime," +
                "chz_GrnBitTarihi datetime," +
                "chz_aciklama1 nvarchar(80)," +
                "chz_aciklama2 nvarchar(80)," +
                "chz_aciklama3 nvarchar(80)," +
                "chz_al_tarih datetime," +
                "chz_al_evr_seri nvarchar(6)," +
                "chz_al_evr_sira int," +
                "chz_al_cari_kodu nvarchar(25)," +
                "chz_st_tarih datetime," +
                "chz_st_evr_seri nvarchar(6)," +
                "chz_st_evr_sira int," +
                "chz_st_cari_kodu nvarchar(25)," +
                "chz_al_fiati_ana float," +
                "chz_al_fiati_alt float," +
                "chz_al_fiati_orj float," +
                "chz_st_fiati_ana float," +
                "chz_st_fiati_alt float," +
                "chz_st_fiati_orj float," +
                "chz_parca_garantisi bit," +
                "chz_parca_serino nvarchar(25)," +
                "chz_parca_garanti_baslangic datetime," +
                "chz_parca_garanti_bitis datetime)",
        insert : "INSERT INTO SERINO VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    },
    SeriNoHarTbl :
    {
        tag : "SERINOHAR",
        query : "CREATE TABLE IF NOT EXISTS SERINOHAR (" +
                "ChHar_RECid_DBCno smallint," +
                "ChHar_RECid_RECno int," +
                "ChHar_Spec_Rec_no int," +
                "ChHar_iptal bit," +
                "ChHar_fileid smallint," +
                "ChHar_hidden bit," +
                "ChHar_kilitli bit," +
                "ChHar_degisti bit," +
                "ChHar_checksum int," +
                "ChHar_create_user smallint," +
                "ChHar_create_date datetimeİ" +
                "ChHar_lastup_user smallint," +
                "ChHar_lastup_date datetime," +
                "ChHar_special1 nvarchar(4)," +
                "ChHar_special2 nvarchar(4)," +
                "ChHar_special3 nvarchar(4)," +
                "ChHar_SeriNo nvarchar(25)," +
                "ChHar_StokKodu nvarchar(25)," +
                "ChHar_master_tablo tinyint," +
                "ChHar_master_dbcno smallint," +
                "ChHar_master_recno int)",
        insert : "INSERT INTO SERINOHAR VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    },
    SiparisTbl : 
    {
        tag : "SIPARIS",
        query : "CREATE TABLE IF NOT EXISTS SIPARIS (" +
                "sip_Guid nvarchar," +
                "sip_DBCno smallint," +
                "sip_SpecRECno int," +
                "sip_iptal bit," +
                "sip_fileid smallint," +
                "sip_hidden bit," +
                "sip_kilitli bit," +
                "sip_degisti bit," +
                "sip_checksum int," +
                "sip_create_user smallint," +
                "sip_create_date datetime," +
                "sip_lastup_user smallint," +
                "sip_lastup_date datetime," +
                "sip_special1 nvarchar (4)," +
                "sip_special2 nvarchar (4)," +
                "sip_special3 nvarchar (4)," +
                "sip_firmano int," +
                "sip_subeno int," +
                "sip_tarih datetime," +
                "sip_teslim_tarih datetime," +
                "sip_tip tinyint," +
                "sip_cins tinyint," +
                "sip_evrakno_seri nvarchar (4)," +
                "sip_evrakno_sira int," +
                "sip_satirno int," +
                "sip_belgeno nvarchar (15)," +
                "sip_belge_tarih datetime," +
                "sip_satici_kod nvarchar (25)," +
                "sip_musteri_kod nvarchar (25)," +
                "sip_stok_kod nvarchar (25)," +
                "sip_b_fiyat float," +
                "sip_miktar float," +
                "sip_birim_pntr tinyint," +
                "sip_teslim_miktar float," +
                "sip_tutar float," +
                "sip_iskonto_1 float," +
                "sip_iskonto_2 float," +
                "sip_iskonto_3 float," +
                "sip_iskonto_4 float," +
                "sip_iskonto_5 float," +
                "sip_iskonto_6 float," +
                "sip_masraf_1 float," +
                "sip_masraf_2 float," +
                "sip_masraf_3 float," +
                "sip_masraf_4 float," +
                "sip_vergi_pntr tinyint," +
                "sip_vergi float," +
                "sip_masvergi_pntr tinyint," +
                "sip_masvergi float," +
                "sip_opno int," +
                "sip_aciklama nvarchar (40)," +
                "sip_aciklama2 nvarchar (40)," +
                "sip_depono int," +
                "sip_OnaylayanKulNo smallint," +
                "sip_vergisiz_fl bit," +
                "sip_kapat_fl bit," +
                "sip_promosyon_fl bit," +
                "sip_cari_sormerk nvarchar (25)," +
                "sip_stok_sormerk nvarchar (25)," +
                "sip_cari_grupno tinyint," +
                "sip_doviz_cinsi tinyint," +
                "sip_doviz_kuru float," +
                "sip_alt_doviz_kuru float," +
                "sip_adresno int," +
                "sip_teslimturu nvarchar (4)," +
                "sip_cagrilabilir_fl bit," +
                "sip_prosiprecDbId smallint," +
                "sip_prosip_uid int," +
                "sip_iskonto1 tinyint," +
                "sip_iskonto2 tinyint," +
                "sip_iskonto3 tinyint," +
                "sip_iskonto4 tinyint," +
                "sip_iskonto5 tinyint," +
                "sip_iskonto6 tinyint," +
                "sip_masraf1 tinyint," +
                "sip_masraf2 tinyint," +
                "sip_masraf3 tinyint," +
                "sip_masraf4 tinyint," +
                "sip_isk1 bit," +
                "sip_isk2 bit," +
                "sip_isk3 bit," +
                "sip_isk4 bit," +
                "sip_isk5 bit," +
                "sip_isk6 bit," +
                "sip_mas1 bit," +
                "sip_mas2 bit," +
                "sip_mas3 bit," +
                "sip_mas4 bit," +
                "sip_Exp_Imp_Kodu nvarchar (25)," +
                "sip_kar_orani float," +
                "sip_durumu tinyint," +
                "sip_stal_uid smallint," +
                "sip_planlananmiktar float," +
                "sip_teklif_uid smallint," +
                "sip_parti_kodu nvarchar (25)," +
                "sip_lot_no int," +
                "sip_projekodu nvarchar (25)," +
                "sip_fiyat_liste_no int," +
                "sip_Otv_Pntr tinyint," +
                "sip_Otv_Vergi float," +
                "sip_otvtutari float," +
                "sip_OtvVergisiz_Fl tinyint," +
                "sip_paket_kod nvarchar (25)," +
                "sip_Rez_uid smallint," +
                "sip_harekettipi tinyint, " +
                "sip_yetkili_uid nvarchar, " +
                "sip_kapatmanedenkod nvarchar (25), " +
                "sip_gecerlilik_tarihi datetime, " +
                "sip_onodeme_evrak_tip tinyint, " +
                "sip_onodeme_evrak_seri nvarchar, " +
                "sip_onodeme_evrak_sira int, " +
                "sip_rezervasyon_miktari float, " +
                "sip_rezerveden_teslim_edilen float, " +
                "sip_HareketGrupKodu1 nvarchar (25), " +
                "sip_HareketGrupKodu2 nvarchar (25), " +
                "sip_HareketGrupKodu3 nvarchar (25), " +
                "status bit)",
        insert : "INSERT INTO SIPARIS VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    },
    SiparisStokTbl : 
    {
        tag : "SIPARISSTOK",
        query : "CREATE TABLE IF NOT EXISTS SIPARISSTOK (" +
                "RECNO nvarchar (50)," +
                "BARKOD nvarchar (25)," +
                "KODU nvarchar (25)," +
                "ADI nvarchar (50)," +
                "TARIH datetime," +
                "TESLIMTARIH datetime," +
                "TIP tinyint," +
                "CINS tinyint," +
                "SERI nvarchar (6)," +
                "SIRA int," +
                "SATIRNO int," +
                "BELGENO nvarchar (15)," +
                "BELGETARIH datetime," +
                "SATICIKOD nvarchar (25)," +
                "CARI nvarchar (25)," +
                "FIYAT float," +
                "SIPMIKTAR float," +
                "BIRIMPNTR tinyint," +
                "TESLIMMIKTAR float," +
                "TUTAR float," +
                "ISKONTO_1 float," +
                "ISKONTO_2 float," +
                "ISKONTO_3 float," +
                "ISKONTO_4 float," +
                "ISKONTO_5 float," +
                "ISKONTO_6 float," +
                "TOPTANVERGIPNTR tinyint," +
                "VERGI float," +
                "ODEMENO int," +
                "PROJE int," +
                "DEPO int," +
                "CARISORUMLU nvarchar (25)," +
                "STOKSORUMLU nvarchar (25)," +
                "DOVIZCINSI tinyint," +
                "DOVIZKURU float," +
                "ALTDOVIZKURU float," +
                "ADRESNO int," +
                "ISKONTO1 tinyint," +
                "ISKONTO2 tinyint," +
                "ISKONTO3 tinyint," +
                "ISKONTO4 tinyint," +
                "ISKONTO5 tinyint," +
                "ISKONTO6 tinyint," +
                "ISK1 bit," +
                "ISK2 bit," +
                "ISK3 bit," +
                "ISK4 bit," +
                "ISK5 bit," +
                "ISK6 bit," +
                "BEDEN nvarchar (25)," +
                "RENK nvarchar (25)," +
                "BEDENNO tinyint," +
                "MIKTAR float," +
                "BIRIM nvarchar (25)," +
                "BEDENPNTR int," +
                "RENKPNTR int," +
                "KATSAYI float," +
                "TOPTANVERGI float," +
                "DEPOMIKTAR float," +
                "BARBIRIMPNTR int," +
                "EXIMKODU nvarchar(25)," +
                "PARTI nvarchar(25)," +
                "LOT int," +
                "DETAYTAKIP tinyint," +
                "SIPARISDURSUN tinyint," +
                "MALKABULDURSUN tinyint," +
                "ACIKLAMA nvarchar(50))",
        insert : "INSERT INTO SIPARISSTOK VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    },
    SonAlisFiyatiTbl :
    {
        tag : "SONALISFIYATI",
        query : "CREATE TABLE IF NOT EXISTS SONALISFIYATI (" +
                "CARI nvarchar(30)," +
                "STOK nvarchar(30)," +
                "SONFIYAT float)",
        insert : "INSERT INTO SONALISFIYATI VALUES (?,?,?)"
    },
    SonSatisFiyatiTbl :
    {
        tag : "SONSATİSFIYATI",
        query : "CREATE TABLE IF NOT EXISTS SONSATİSFIYATI (" +
                "CARI nvarchar(30)," +
                "STOK nvarchar(30)," +
                "SONFIYAT float)",
        insert : "INSERT INTO SONALISFIYATI VALUES (?,?,?)"
    },
    SorumlulukMrkzTbl : 
    {
        tag : "SORUMLULUKMRKZ",
        query : "CREATE TABLE IF NOT EXISTS SORUMLULUKMRKZ (" +
                 "SORUMLULUKKODU nvarchar(25)," +
                 "SORUMLULUKISMI nvarchar(40))" ,
        insert : "INSERT INTO SORUMLULUKMRKZ VALUES (?,?)"
    },
    StokTbl : 
    {
        tag : "STOK",
        query : "CREATE TABLE IF NOT EXISTS STOK (" + 
                "KODU NVARCHAR (25)," + 
                "ADI NVARCHAR (50)," + 
                "KISAAD NVARCHAR (25)," +
                "YABANCIAD NVARCHAR (50)," + 
                "DOVIZCINSI TINYINT," + 
                "PERAKENDEVERGIPNTR TINYINT," + 
                "TOPTANVERGIPNTR TINYINT," +
                "ALTGRUP NVARCHAR (25)," + 
                "ANAGRUP NVARCHAR (25)," + 
                "URETICI NVARCHAR (25)," + 
                "SEKTOR NVARCHAR (25)," + 
                "REYON NVARCHAR (25)," + 
                "MARKA NVARCHAR (25)," + 
                "BEDENKODU NVARCHAR (25)," + 
                "RENKKODU NVARCHAR (25)," + 
                "AKTIFPASIF BOOLEAN," + 
                "PERAKENDEVERGI FLOAT," + 
                "TOPTANVERGI FLOAT," + 
                "DETAYTAKIP TINYINT," +
                "DEPOMIKTAR FLOAT," + 
                "DEPOMIKTAR2 FLOAT," + 
                "SIPARISDURSUN TINYINT," + 
                "MALKABULDURSUN TINYINT," + 
                "STOKCARI NVARCHAR(25)," +
                "KATSAYI1 FLOAT," +
                "KATSAYI2 FLOAT," +
                "KATSAYI3 FLOAT," +
                "KATSAYI4 FLOAT," +
                "OTVTUTAR FLOAT)",
        insert : "INSERT INTO STOK VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    },
    StokHarTbl :
    {
        tag : "STOKHAR",
        query : "CREATE TABLE IF NOT EXISTS STOKHAR (" +
        "sth_Guid integer primary key autoincrement," +
        "sth_DBCno smallint ," +
        "sth_SpecRECno int , " +
        "sth_iptal bit ," +
        "sth_fileid smallint ," +
        "sth_hidden bit , " +
        "sth_kilitli bit , " +
        "sth_degisti bit , " +
        "sth_checksum int , " +
        "sth_create_user smallint , " +
        "sth_create_date datetime  , " +
        "sth_lastup_user smallint , " +
        "sth_lastup_date datetime , " +
        "sth_special1 nvarchar(4) , " +
        "sth_special2 nvarchar(4) , " +
        "sth_special3 nvarchar(4) , " +
        "sth_firmano int , " +
        "sth_subeno int , " +
        "sth_tarih datetime , " +
        "sth_tip tinyint , " +
        "sth_cins tinyint , " +
        "sth_normal_iade tinyint , " +
        "sth_evraktip tinyint , " +
        "sth_evrakno_seri  nvarchar(25), " +
        "sth_evrakno_sira int , " +
        "sth_satirno int , " +
        "sth_belge_no nvarchar(25) , " +
        "sth_belge_tarih datetime , " +
        "sth_stok_kod nvarchar(25) , " +
        "sth_isk_mas1 tinyint , " +
        "sth_isk_mas2 tinyint , " +
        "sth_isk_mas3 tinyint , " +
        "sth_isk_mas4 tinyint , " + 
        "sth_isk_mas5 tinyint , " +
        "sth_isk_mas6 tinyint , " +
        "sth_isk_mas7 tinyint , " +
        "sth_isk_mas8 tinyint , " +
        "sth_isk_mas9 tinyint , " +
        "sth_isk_mas10 tinyint , " +
        "sth_sat_iskmas1 bit , " +
        "sth_sat_iskmas2 bit , " +
        "sth_sat_iskmas3 bit , " +
        "sth_sat_iskmas4 bit , " +
        "sth_sat_iskmas5 bit , " +
        "sth_sat_iskmas6 bit , " +
        "sth_sat_iskmas7 bit , " +
        "sth_sat_iskmas8 bit , " +
        "sth_sat_iskmas9 bit , " +
        "sth_sat_iskmas10 bit , " +
        "sth_pos_satis tinyint , " +
        "sth_promosyon_fl bit , " +
        "sth_cari_cinsi tinyint , " +
        "sth_cari_kodu nvarchar(25) , " +
        "sth_cari_grup_no tinyint , " +
        "sth_isemri_gider_kodu nvarchar(25) , " +
        "sth_plasiyer_kodu nvarchar(25) , " +
        "sth_har_doviz_cinsi tinyint , " +
        "sth_har_doviz_kuru float , " +
        "sth_alt_doviz_kuru float , " +
        "sth_stok_doviz_cinsi tinyint , " +
        "sth_stok_doviz_kuru float , " +
        "sth_miktar float , " +
        "sth_miktar2 float , " +
        "sth_birim_pntr tinyint , " +
        "sth_tutar float , " +
        "sth_iskonto1 float , " +
        "sth_iskonto2 float , " +
        "sth_iskonto3 float , " +
        "sth_iskonto4 float , " +
        "sth_iskonto5 float , " +
        "sth_iskonto6 float , " +
        "sth_masraf1 float , " +
        "sth_masraf2 float , " +
        "sth_masraf3 float , " +
        "sth_masraf4 float , " +
        "sth_vergi_pntr tinyint , " +
        "sth_vergi float , " +
        "sth_masraf_vergi_pntr tinyint , " +
        "sth_masraf_vergi float , " +
        "sth_netagirlik float , " +
        "sth_odeme_op int , " +
        "sth_aciklama nvarchar(50) , " +
        "sth_sip_uid nvarchar(50) , " +
        "sth_fat_uid int , " +
        "sth_giris_depo_no int , " +
        "sth_cikis_depo_no int , " +
        "sth_malkbl_sevk_tarihi datetime , " +
        "sth_cari_srm_merkezi nvarchar(25) , " +
        "sth_stok_srm_merkezi nvarchar(25) , " +
        "sth_fis_tarihi datetime , " +
        "sth_fis_sirano int , " +
        "sth_vergisiz_fl bit , " +
        "sth_maliyet_ana float , " +
        "sth_maliyet_alternatif float , " +
        "sth_maliyet_orjinal float ," +
        "sth_adres_no int , " +
        "sth_parti_kodu nvarchar(25) , " +
        "sth_lot_no int , " +
        "sth_kons_uid nvarchar(50) , " +
        "sth_proje_kodu nvarchar(25) , " +
        "sth_exim_kodu nvarchar(25) , " +
        "sth_otv_pntr tinyint , " +
        "sth_otv_vergi float , " +
        "sth_brutagirlik float , " +
        "sth_disticaret_turu tinyint , " +
        "sth_otvtutari float , " +
        "sth_otvvergisiz_fl bit , " +
        "sth_oiv_pntr tinyint , " +
        "sth_oiv_vergi float , " +
        "sth_oivvergisiz_fl bit , " +
        "sth_fiyat_liste_no int , " +
        "sth_oivtutari float , " +
        "sth_Tevkifat_turu tinyint , " +
        "sth_nakliyedeposu int , " +
        "sth_nakliyedurumu tinyint , " +
        "sth_yetkili_uid nvarchar(50) , " +
        "sth_taxfree_fl bit , " +
        "sth_ilave_edilecek_kdv float , " +
        "sth_ismerkezi_kodu nvarchar(25) , " +
        "sth_HareketGrupKodu1 nvarchar(25) , " +
        "sth_HareketGrupKodu2 nvarchar(25) , " +
        "sth_HareketGrupKodu3 nvarchar(25) , " +
        "sth_Olcu1 float , " +
        "sth_Olcu2 float , " +
        "sth_Olcu3 float , " +
        "sth_Olcu4 float , " +
        "sth_Olcu5 float , " +
        "sth_FormulMiktarNo tinyint , " +
        "sth_FormulMiktar float)" ,
        insert : "INSERT INTO STOKHAR VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"           
    },
    UreticiTbl :
   {
       tag : "URETICI",
       query : "CREATE TABLE IF NOT EXISTS URETICI (" +
              "KODU nvarchar (25)," +
              "ADI nvarchar (40))",
        insert : "INSERT INTO URETICI VALUES (?,?)"
    },
    PartiTbl :
    {
        tag : "PARTI",
        query : "CREATE TABLE IF NOT EXISTS PARTI ( " +
               "PARTI nvarchar (25), " +
               "LOT int, " +
               "STOK nvarchar (25), " +
               "MIKTAR float, " +
               "KALAN int, " + 
               "SKTTARIH datetime " +
               " ) ",
         insert : "INSERT INTO PARTI VALUES (?,?,?,?,?,?)"
    },
    RenkTbl :
    {
        tag : "RENK",
        query : "CREATE TABLE IF NOT EXISTS RENK ( " +
               "PNTR int, " +
               "KIRILIM int, " +
               "KODU nvarchar (25) " +
               " ) ",
         insert : "INSERT INTO RENK VALUES (?,?,?)"
    },
    BedenTbl :
    {
        tag : "BEDEN",
        query : "CREATE TABLE IF NOT EXISTS BEDEN ( " +
               "PNTR int, " +
               "KIRILIM int, " +
               "KODU nvarchar (25) " +
               " ) ",
         insert : "INSERT INTO BEDEN VALUES (?,?,?)"
    },
    UretimStokTbl :
   {
       tag : "URETIMSTOK",
       query : "CREATE TABLE IF NOT EXISTS URETIMSTOK (" +
               "RECNO nvarchar (50)," +
               "BARKOD nvarchar (25)," +
               "KODU nvarchar (25)," +
               "ADI nvarchar (50)," +
               "TARIH datetime," +
               "SATIRNO int," +
               "TIP tinyint," +
               "ISEMRI nvarchar (25)," +
               "PMIKTAR float," +
               "GMIKTAR float," +
               "DEPO int," +
               "MIKTAR float," +
               "BEDENPNTR int," +
               "RENKPNTR int," +
               "KATSAYI float," +
               "PARTI nvarchar(25)," +
               "LOT int," +
               "DETAYTAKIP int)", 
        insert : "INSERT INTO URETIMSTOK VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    },
    VergiTbl :
    {
        tag : "VERGI",
        query : "CREATE TABLE IF NOT EXISTS VERGI (" +
                "PNTR int," +
                "ORAN float)" ,
        insert : "INSERT INTO VERGI VALUES (?,?)"
    },
    ParamTbl :
    {
        tag : "PARAM",
        query : "CREATE TABLE IF NOT EXISTS PARAM (" +
                "MENUDATA text, " + 
                "SAYIM_SIRA int, " +
                "ALINAN_SIPARIS_SIRA int " +
                ")" ,
            insert : "INSERT INTO PARAM VALUES (?,?,?)"
    },
    NakliyeOnayTbl :
    {
        tag : "DEPONAKLIYE",
        query : "CREATE TABLE IF NOT EXISTS DEPONAKLIYE (" +
        "sth_Guid nvarchar(50)," +
        "sth_DBCno smallint ," +
        "sth_SpecRECno int , " +
        "sth_iptal bit ," +
        "sth_fileid smallint ," +
        "sth_hidden bit , " +
        "sth_kilitli bit , " +
        "sth_degisti bit , " +
        "sth_checksum int , " +
        "sth_create_user smallint , " +
        "sth_create_date datetime  , " +
        "sth_lastup_user smallint , " +
        "sth_lastup_date datetime , " +
        "sth_special1 nvarchar(4) , " +
        "sth_special2 nvarchar(4) , " +
        "sth_special3 nvarchar(4) , " +
        "sth_firmano int , " +
        "sth_subeno int , " +
        "sth_tarih datetime , " +
        "sth_tip tinyint , " +
        "sth_cins tinyint , " +
        "sth_normal_iade tinyint , " +
        "sth_evraktip tinyint , " +
        "sth_evrakno_seri  nvarchar(25), " +
        "sth_evrakno_sira int , " +
        "sth_satirno int , " +
        "sth_belge_no nvarchar(25) , " +
        "sth_belge_tarih datetime , " +
        "sth_stok_kod nvarchar(25) , " +
        "sth_isk_mas1 tinyint , " +
        "sth_isk_mas2 tinyint , " +
        "sth_isk_mas3 tinyint , " +
        "sth_isk_mas4 tinyint , " + 
        "sth_isk_mas5 tinyint , " +
        "sth_isk_mas6 tinyint , " +
        "sth_isk_mas7 tinyint , " +
        "sth_isk_mas8 tinyint , " +
        "sth_isk_mas9 tinyint , " +
        "sth_isk_mas10 tinyint , " +
        "sth_sat_iskmas1 bit , " +
        "sth_sat_iskmas2 bit , " +
        "sth_sat_iskmas3 bit , " +
        "sth_sat_iskmas4 bit , " +
        "sth_sat_iskmas5 bit , " +
        "sth_sat_iskmas6 bit , " +
        "sth_sat_iskmas7 bit , " +
        "sth_sat_iskmas8 bit , " +
        "sth_sat_iskmas9 bit , " +
        "sth_sat_iskmas10 bit , " +
        "sth_pos_satis tinyint , " +
        "sth_promosyon_fl bit , " +
        "sth_cari_cinsi tinyint , " +
        "sth_cari_kodu nvarchar(25) , " +
        "sth_cari_grup_no tinyint , " +
        "sth_isemri_gider_kodu nvarchar(25) , " +
        "sth_plasiyer_kodu nvarchar(25) , " +
        "sth_har_doviz_cinsi tinyint , " +
        "sth_har_doviz_kuru float , " +
        "sth_alt_doviz_kuru float , " +
        "sth_stok_doviz_cinsi tinyint , " +
        "sth_stok_doviz_kuru float , " +
        "sth_miktar float , " +
        "sth_miktar2 float , " +
        "sth_birim_pntr tinyint , " +
        "sth_tutar float , " +
        "sth_iskonto1 float , " +
        "sth_iskonto2 float , " +
        "sth_iskonto3 float , " +
        "sth_iskonto4 float , " +
        "sth_iskonto5 float , " +
        "sth_iskonto6 float , " +
        "sth_masraf1 float , " +
        "sth_masraf2 float , " +
        "sth_masraf3 float , " +
        "sth_masraf4 float , " +
        "sth_vergi_pntr tinyint , " +
        "sth_vergi float , " +
        "sth_masraf_vergi_pntr tinyint , " +
        "sth_masraf_vergi float , " +
        "sth_netagirlik float , " +
        "sth_odeme_op int , " +
        "sth_aciklama nvarchar(50) , " +
        "sth_sip_uid nvarchar(50) , " +
        "sth_fat_uid int , " +
        "sth_giris_depo_no int , " +
        "sth_cikis_depo_no int , " +
        "sth_malkbl_sevk_tarihi datetime , " +
        "sth_cari_srm_merkezi nvarchar(25) , " +
        "sth_stok_srm_merkezi nvarchar(25) , " +
        "sth_fis_tarihi datetime , " +
        "sth_fis_sirano int , " +
        "sth_vergisiz_fl bit , " +
        "sth_maliyet_ana float , " +
        "sth_maliyet_alternatif float , " +
        "sth_maliyet_orjinal float ," +
        "sth_adres_no int , " +
        "sth_parti_kodu nvarchar(25) , " +
        "sth_lot_no int , " +
        "sth_kons_uid nvarchar(50) , " +
        "sth_proje_kodu nvarchar(25) , " +
        "sth_exim_kodu nvarchar(25) , " +
        "sth_otv_pntr tinyint , " +
        "sth_otv_vergi float , " +
        "sth_brutagirlik float , " +
        "sth_disticaret_turu tinyint , " +
        "sth_otvtutari float , " +
        "sth_otvvergisiz_fl bit , " +
        "sth_oiv_pntr tinyint , " +
        "sth_oiv_vergi float , " +
        "sth_oivvergisiz_fl bit , " +
        "sth_fiyat_liste_no int , " +
        "sth_oivtutari float , " +
        "sth_Tevkifat_turu tinyint , " +
        "sth_nakliyedeposu int , " +
        "sth_nakliyedurumu tinyint , " +
        "sth_yetkili_uid nvarchar(50) , " +
        "sth_taxfree_fl bit , " +
        "sth_ilave_edilecek_kdv float , " +
        "sth_ismerkezi_kodu nvarchar(25) , " +
        "sth_HareketGrupKodu1 nvarchar(25) , " +
        "sth_HareketGrupKodu2 nvarchar(25) , " +
        "sth_HareketGrupKodu3 nvarchar(25) , " +
        "sth_Olcu1 float , " +
        "sth_Olcu2 float , " +
        "sth_Olcu3 float , " +
        "sth_Olcu4 float , " +
        "sth_Olcu5 float , " +
        "sth_FormulMiktarNo tinyint , " +
        "sth_FormulMiktar float, " +
        "DURUM int)" ,
        insert : "INSERT INTO DEPONAKLIYE VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"           
    }
    //#endregion "LOCAL TABLOLAR OLUŞTURMA VE AKTARIM"
};