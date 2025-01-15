"use client"
import React, { useState } from 'react'
import { Button, Form, Input, Upload, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam, RcFile } from 'antd/lib/upload/interface';
import axios from 'axios';
import Image from 'next/image'
import { v4 as uuidv4 } from 'uuid';
import { usePathname, useRouter } from "next/navigation";


export interface LaporanOperasiUploadBarcodeProps {
  registrasiPasienValues: any;
  onSubmitUploadBarcode?: (values: any) => {}
  onFinishUpload?: (value: boolean) => {};
}

const LaporanOperasiUploadBarcodeForm = ({
  registrasiPasienValues,
  onSubmitUploadBarcode,
  onFinishUpload,
}: LaporanOperasiUploadBarcodeProps) => {

  const router = useRouter();
  const pathname = usePathname();

  const [uploading, setUploading] = useState(false);

  const apiUrl = 'https://hec.hijr.win/hec/be/antrian/assets_api/upload_api.php';

  // console.log(registrasiPasienValues)

  const handleUpload = async (file: RcFile) => {
    const formData = new FormData();

    const fileName = `${registrasiPasienValues[0].nm_pasien} ${registrasiPasienValues[0].no_rawat.replaceAll('/', '-')}`
    // console.log(fileName)
    const modifiedFile = new File(
      [file],
      fileName + ".jpg",
      // { type: file.type }
      // { type: 'image/jpeg' }
    );

    formData.append('sendimage', modifiedFile);
    // console.log(file.name)

    try {
      setUploading(true);
      // console.log(formData)
      const response = await axios.post(
        apiUrl,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200) {
        // console.log(pathname)
        router.push(`${pathname}`);
        router.refresh();
        message.success('Image uploaded successfully');

      } else {
        message.error('Failed to upload image');
      }
    } catch (error) {
      // console.error('Error uploading image:', error);
      // console.log('Failed to upload image');
      message.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const beforeUpload = (file: RcFile) => {
    // Validate file type (allow only jpg/jpeg)
    const isJpgOrJpeg = file.type === 'image/jpeg' || file.type === 'image/jpg';

    if (!isJpgOrJpeg) {
      // console.log('You can only upload JPG/JPEG file!');
      message.error('You can only upload JPG/JPEG file!');
      return false;
    }
    try {
      const fileName = `${registrasiPasienValues[0].nm_pasien} ${registrasiPasienValues[0].no_rawat.replaceAll('/', '-')}`
      // console.log(fileName)
      const modifiedFile = new File(
        [file],
        fileName + ".jpg",
        //     // { type: file.type }
        //     // { type: 'image/jpeg' }
      );

      handleUpload(modifiedFile as RcFile);

      return true;
    } catch (error) {
      // console.log(error)
    }

  };

  let formValues: any = {}
  let namaFileImage: any = ''
  let myuuid = uuidv4();

  if (registrasiPasienValues === undefined) {
    formValues.no_rawat = registrasiPasienValues.no_rawat
  } else {
    formValues = registrasiPasienValues[0]
    if (formValues) {
      namaFileImage = 'https://hec.hijr.win/hec/be/antrian/assets_api/upload/' + formValues.nm_pasien + ' ' + formValues.no_rawat.replaceAll("/", "-") + '.jpg' + '?' + myuuid
    }
  }

  return (
    <Form
      onFinish={onFinishUpload}
      layout="vertical"
      initialValues={formValues ? formValues : registrasiPasienValues}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {formValues && <Image
          src={namaFileImage}
          width={200}
          height={80}
          alt="Barcode"
        />}
        <Upload
          beforeUpload={beforeUpload}
          onChange={(info: UploadChangeParam) => {
            if (info.file.status === 'done') {
              handleUpload(info.file.originFileObj as RcFile);
            }
          }}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Upload jpg only</Button>
        </Upload>
      </div>
      <div className="mt-7 flex justify-end gap-5">
        <Button type="primary" htmlType="submit">
          Done Upload Barcode
        </Button>
      </div>
    </Form>
  )
}

export default LaporanOperasiUploadBarcodeForm