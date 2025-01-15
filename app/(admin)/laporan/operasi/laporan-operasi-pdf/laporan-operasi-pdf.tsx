import { SchemaDataLaporanOperasi } from "@/app/schema/antrianPoliSchema";
import { getDateDuration } from "@/lib/helpers";
import {
  Document,
  Font,
  Image,
  Line,
  Page,
  StyleSheet,
  Svg,
  Text,
  View
} from "@react-pdf/renderer";
import dayjs from "dayjs";
import "dayjs/locale/id";
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import QRCode from 'qrcode';
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
// import { HelveticaBold } from "../../../../../public/fonts/helvetica-bold.ttf";





interface IPage {
  resultLaporanOperasi: SchemaDataLaporanOperasi[]
}


export const LaporanOperasiPdf = ({ resultLaporanOperasi }: IPage) => {

  //#region - dayjs setting
  dayjs.locale("id");
  dayjs.extend(utc)
  dayjs.extend(timezone);
  dayjs.tz.setDefault("Asia/Makassar");
  //#endregion

  const [qrImage, setQrImage] = useState<string>('no data');
  let myuuid = uuidv4();

  useEffect(() => {

    QRCode.toDataURL('Klinik Mata Hasanuddin menyatakan Laporan Operasi ini sah. ' + resultLaporanOperasi?.[0].nm_dokter || '--')
      .then((url) => setQrImage(url))
      .catch((err) => console.error('Error generating QR code:', err));
  }, [resultLaporanOperasi]);

  const newUmur = getDateDuration(new Date(dayjs().format('YYYY-MM-DD')), new Date(dayjs(resultLaporanOperasi?.[0].t3_tgl_lahir).format('YYYY-MM-DD')))

  return (
    <Document>
      <Page size="LEGAL" style={styles.page}>

        <View style={{ flexDirection: 'row', gap: 4 }}>
          <Image src={'/images/logo_klinik.png'} style={styles.logoKlinik} />
          <View style={{ flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
            <Text style={styles.typoH1}>Klinik Mata Hasanuddin</Text>
            <Text style={styles.typoH3} >Jl. Sultan Hasanuddin No. 127, Gowa, Sulawesi Selatan</Text>
            <Text style={styles.typoH3}>Hp: 0411-898-7988</Text>
            <Text style={styles.typoH3}>E-mail : admin@klinikmatahasanuddin.com</Text>
          </View>
        </View>
        <Svg height="3" width="595">
          <Line x1="0" y1="0" x2="700" y2="0" strokeWidth={3} stroke="rgb(0,0,0)" />
        </Svg>
        <Svg height="2" width="595">
          <Line x1="0" y1="0" x2="700" y2="0" strokeWidth={1} stroke="rgb(0,0,0)" />
        </Svg>
        <View style={{ flexDirection: 'column', alignItems: 'center', padding: 4 }}>
          <Text style={styles.typoH1}>LAPORAN OPERASI</Text>
        </View>
        <Svg height="2" width="595">
          <Line x1="0" y1="0" x2="700" y2="0" strokeWidth={1} stroke="rgb(0,0,0)" />
        </Svg>
        <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
          <View style={{ flexDirection: 'row', gap: 4, flex: 1 }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.typoH2}>Nama Pasien</Text>
              <Text style={styles.typoH2}>Umur</Text>
              <Text style={styles.typoH2}>Tanggal Lahir</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.typoH2Content}>: {resultLaporanOperasi[0] && resultLaporanOperasi?.[0].nm_pasien}</Text>
              <Text style={styles.typoH2Content}>: {resultLaporanOperasi[0] && `${newUmur.years * -1} th ${newUmur.months * -1} bl ${newUmur.days * -1} hr `}</Text>
              <Text style={styles.typoH2Content}>: {dayjs(resultLaporanOperasi[0] && resultLaporanOperasi?.[0].t3_tgl_lahir).format('DD MMM YYYY')}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 4, flex: 1 }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.typoH2}>No. Rekam Medis</Text>
              <Text style={styles.typoH2}>Ruang</Text>
              <Text style={styles.typoH2}>Jenis Kelamin</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.typoH2Content}>: {resultLaporanOperasi[0] && resultLaporanOperasi?.[0].no_rkm_medis}</Text>
              <Text style={styles.typoH2Content}>: {'Poliklinik Mata'}</Text>
              <Text style={styles.typoH2Content}>: {resultLaporanOperasi[0] && resultLaporanOperasi?.[0].t3_jk === 'P' ? 'Perempuan' : 'Laki-laki'}</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center', padding: 4, backgroundColor: '#DDDDDD' }}>
          <Text style={styles.typoH2}>PRE SURGICAL ASSESSMENT</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingTop: 4 }}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text style={styles.typoH2}>Tanggal : </Text>
            <Text style={styles.typoH2Content}>{dayjs(resultLaporanOperasi[0] && resultLaporanOperasi?.[0].tgl_perawatan).format("DD MMM YYYY")}</Text>
          </View>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text style={styles.typoH2}>Waktu : </Text>
            <Text style={styles.typoH2Content}>{resultLaporanOperasi[0] && resultLaporanOperasi?.[0].jam_rawat}</Text>
          </View>
          <View style={{ flexDirection: 'row', flex: 2 }}>
            <Text style={styles.typoH2}>Alergi : </Text>
            <Text style={styles.typoH2Content}>{resultLaporanOperasi[0] && resultLaporanOperasi?.[0].alergi}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', paddingBottom: 4 }}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text style={styles.typoH2}>Dokter Mata : </Text>
            <Text style={styles.typoH2Content}>{resultLaporanOperasi[0] && resultLaporanOperasi?.[0].nm_dokter}</Text>
          </View>
        </View>
        <Svg height="2" width="595">
          <Line x1="0" y1="0" x2="700" y2="0" strokeWidth={1} stroke="rgb(0,0,0)" />
        </Svg>
        <View style={{ flexDirection: 'row', paddingVertical: 4 }}>
          <View style={{ flexDirection: 'column', flex: 1 }}>
            <Text style={styles.typoH2}>Keluhan : </Text>
            <Text style={[styles.typoH2Content, { marginLeft: 4 }]}>{resultLaporanOperasi[0] && resultLaporanOperasi?.[0].keluhan.trim()}</Text>
            <Text style={[styles.typoH2, { marginTop: 4 }]}>Pemeriksaan : </Text>
            <Text style={[styles.typoH2Content, { marginLeft: 4 }]}>{resultLaporanOperasi[0] && resultLaporanOperasi?.[0].pemeriksaan.trim()}</Text>
            <View style={{ flexDirection: 'row', paddingTop: 4, marginLeft: 4 }}>
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                  <Text style={styles.typoH2}>Suhu Tubuh :</Text>
                  <Text style={styles.typoH2Content}>{resultLaporanOperasi[0] && resultLaporanOperasi?.[0].suhu_tubuh}</Text>
                </View>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                  <Text style={styles.typoH2}>Tensi :</Text>
                  <Text style={styles.typoH2Content}>{resultLaporanOperasi[0] && resultLaporanOperasi?.[0].tensi}</Text>
                </View>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                  <Text style={styles.typoH2}>Tinggi (cm) :</Text>
                  <Text style={styles.typoH2Content}>{resultLaporanOperasi[0] && resultLaporanOperasi?.[0].tinggi}</Text>
                </View>
                <View style={{ flexDirection: 'row', flex: 1 }}>
                  <Text style={styles.typoH2}>Berat (Kg) :</Text>
                  <Text style={styles.typoH2Content}>{resultLaporanOperasi[0] && resultLaporanOperasi?.[0].berat}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'column', paddingVertical: 4, flex: 1 }}>
                <Text style={styles.typoH2}>Nadi (/mnt) :</Text>
                <Text style={styles.typoH2Content}>{resultLaporanOperasi[0] && resultLaporanOperasi?.[0].suhu_tubuh}</Text>
                <Text style={styles.typoH2}>Respirasi (/mnt) :</Text>
                <Text style={styles.typoH2Content}>{resultLaporanOperasi[0] && resultLaporanOperasi?.[0].tensi}</Text>
                <Text style={styles.typoH2}>GCS (E,V,M) :</Text>
                <Text style={styles.typoH2Content}>{resultLaporanOperasi[0] && resultLaporanOperasi?.[0].tinggi}</Text>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'column', paddingVertical: 4, flex: 1, marginLeft: 8 }}>
            <Text style={styles.typoH2}>Penilaian :</Text>
            <Text style={[styles.typoH2Content, { marginLeft: 4 }]}>{resultLaporanOperasi[0] && resultLaporanOperasi?.[0].penilaian.trim()}</Text>
            <Text style={styles.typoH2}>Tindak Lanjut :</Text>
            <Text style={[styles.typoH2Content, { marginLeft: 4 }]}>{resultLaporanOperasi[0] && resultLaporanOperasi?.[0].rtl.trim()}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center', paddingVertical: 4, backgroundColor: '#DDDDDD' }}>
          <Text style={styles.typoH2}>POST SURGICAL ASSESSMENT</Text>
        </View>
        <View style={{ flexDirection: 'row', paddingTop: 4 }}>
          <View style={{ flexDirection: 'column', flex: 2 }}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.typoH2}>Tanggal / Waktu : </Text>
              <Text style={styles.typoH2Content}>{dayjs.utc(resultLaporanOperasi[0] && resultLaporanOperasi?.[0].tanggal).format("dddd, DD MMM YYYY HH:mm:ss")}</Text>
            </View>
            <View style={{ flexDirection: 'row', paddingBottom: 4 }}>
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <Text style={styles.typoH2}>Dokter Bedah :</Text>
                <Text style={[styles.typoH2Content, { marginLeft: 4 }]}>{resultLaporanOperasi[0] && resultLaporanOperasi?.[0].nm_dokter}</Text>
                <Text style={styles.typoH2}>Dokter Bedah 2 :</Text>
                <Text style={[styles.typoH2Content, { marginLeft: 4 }]}>{'-'}</Text>
                <Text style={styles.typoH2}>Perawat Resusitas :</Text>
                <Text style={[styles.typoH2Content, { marginLeft: 4 }]}>{'-'}</Text>
                <Text style={styles.typoH2}>Instrumen :</Text>
                <Text style={[styles.typoH2Content, { marginLeft: 4 }]}>{'-'}</Text>
                <Text style={styles.typoH2}>Dokter Anak :</Text>
                <Text style={[styles.typoH2Content, { marginLeft: 4 }]}>{'-'}</Text>
                <Text style={styles.typoH2}>Dokter Umum :</Text>
                <Text style={[styles.typoH2Content, { marginLeft: 4 }]}>{'-'}</Text>
              </View>
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <Text style={styles.typoH2}>Asisten Bedah :</Text>
                <Text style={[styles.typoH2Content, { marginLeft: 4 }]}>{resultLaporanOperasi[0] && resultLaporanOperasi?.[0].asisten_operator1_nama}</Text>
                <Text style={styles.typoH2}>Asisten Bedah 2 :</Text>
                <Text style={[styles.typoH2Content, { marginLeft: 4 }]}>{'-'}</Text>
                <Text style={styles.typoH2}>Dokter Anestesi :</Text>
                <Text style={[styles.typoH2Content, { marginLeft: 4 }]}>{'-'}</Text>
                <Text style={styles.typoH2}>Asisten Anestesi :</Text>
                <Text style={[styles.typoH2Content, { marginLeft: 4 }]}>{'-'}</Text>
                <Text style={styles.typoH2}>Bidan :</Text>
                <Text style={[styles.typoH2Content, { marginLeft: 4 }]}>{'-'}</Text>
                <Text style={styles.typoH2}>Onloop :</Text>
                <Text style={[styles.typoH2Content, { marginLeft: 4 }]}>{resultLaporanOperasi[0] && resultLaporanOperasi?.[0].omloop_nama}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', padding: 4, backgroundColor: '#DDDDDD' }}>
              <Text style={styles.typoH2}>Diagnosa Pre-Op / Pre Operation Diagnosis</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={[styles.typoH2Content, { marginLeft: 4, marginBottom: 4 }]}>{resultLaporanOperasi[0] && resultLaporanOperasi?.[0].diagnosa_preop}</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', padding: 4, backgroundColor: '#DDDDDD' }}>
              <Text style={styles.typoH2}>Jaringan Yang di-Eksisi/-Insisi</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={[styles.typoH2Content, { marginLeft: 4, marginBottom: 4 }]}>{resultLaporanOperasi[0] && resultLaporanOperasi?.[0].jaringan_dieksekusi}</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', padding: 4, backgroundColor: '#DDDDDD' }}>
              <Text style={styles.typoH2}>Diagnosa Post-Op / Post Operation Diagnosis</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={[styles.typoH2Content, { marginLeft: 4, marginBottom: 4 }]}>{resultLaporanOperasi[0] && resultLaporanOperasi?.[0].diagnosa_postop}</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'column', paddingVertical: 4, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.typoH2}>Tipe/Jenis Anastesi</Text>
            <Text style={styles.typoH2Content}>{resultLaporanOperasi[0] && resultLaporanOperasi?.[0].jenis_anasthesi}</Text>
            <Text style={styles.typoH2}>Dikirim ke Pemeriksaan PA</Text>
            <Text style={styles.typoH2Content}>{resultLaporanOperasi[0] && resultLaporanOperasi?.[0].permintaan_pa}</Text>
            <Text style={styles.typoH2}>Tipe/Kategori Operasi</Text>
            <Text style={styles.typoH2Content}>{resultLaporanOperasi[0] && resultLaporanOperasi?.[0].kategori}</Text>
            <Text style={styles.typoH2}>Selesai Operasi</Text>
            <Text style={styles.typoH2Content}>{dayjs.utc(resultLaporanOperasi[0] && resultLaporanOperasi?.[0].selesaioperasi).format("dddd, DD MMM YYYY HH:mm:ss")}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'column', alignItems: 'center', paddingVertical: 4, backgroundColor: '#DDDDDD' }}>
          <Text style={styles.typoH2}>REPORT ( PROCEDURES, SPECIFIC FINDINGS AND COMPLICATIONS )</Text>
        </View>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          <View style={{ flexDirection: 'column', paddingVertical: 4, flex: 2 }}>
            <Text style={[styles.typoH2Content, { marginLeft: 4, marginBottom: 4 }]}>{resultLaporanOperasi[0] && resultLaporanOperasi?.[0].laporan_operasi}</Text>
            <Image
              source={'https://hec.hijr.win/hec/be/antrian/assets_api/upload/' +
                // 'LENSA_mato_2' +
                resultLaporanOperasi?.[0].nm_pasien + ' ' +
                resultLaporanOperasi?.[0].no_rawat.replaceAll('/', '-') +
                '.jpg' +
                '?' + myuuid
              }
              style={styles.logoBarcode} />
          </View>
          <View style={{ paddingVertical: 4, flex: 1 }}>
            <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={[styles.typoH2Content, { marginBottom: 4 }]}>{dayjs.utc(resultLaporanOperasi[0] && resultLaporanOperasi?.[0].selesaioperasi).format("dddd, DD MMM YYYY")}</Text>
              <Text style={[styles.typoH2, { marginBottom: 4 }]}>Dokter Bedah</Text>
              <View style={{ width: 10, height: 60 }}></View>
              {/* <Image style={{ height: "60", width: "60", alignItems: 'center' }} src={qrImage} /> */}
              <Text style={[styles.typoH2Content, { marginTop: 4 }]}>{resultLaporanOperasi[0] && resultLaporanOperasi?.[0].nm_dokter}</Text>
            </View>
          </View>
        </View>

      </Page>
    </Document>
  );
};

Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 600 }
  ]
});


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 8,
  },
  logoKlinik: {
    width: 90,
    height: 50,
  },
  logoBarcode: {
    width: 125,
    height: 50,
  },
  typoH1: {
    fontSize: 16
  },
  typoH2: {
    fontFamily: "Open Sans",
    fontSize: 9
  },
  typoH2Content: {
    fontFamily: "Open Sans",
    fontSize: 9,
    fontWeight: 600
  },
  typoH3: {
    fontSize: 8
  },

  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});
