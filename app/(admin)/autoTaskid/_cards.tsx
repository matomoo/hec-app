"use client"
import useMjknGetTaskid from '@/app/hooks/useMjknGetTaskid';
import { Schema_GetAllRegistrasiPeriksaForTaskid } from '@/app/schema/antrianPoliSchema'
import React from 'react'
import CardDetail from './_card';
import { Space, Tag } from 'antd';

const CardsTaskId = ({ data }: { data: Schema_GetAllRegistrasiPeriksaForTaskid[] }) => {

  return (
    <div>{data.map((elm: Schema_GetAllRegistrasiPeriksaForTaskid, idx: number) => {
      return (
        <div key={idx} className='my-4'>
          <Space>
            {elm.nm_pasien}
            <Tag>{elm.no_rawat}</Tag>
            <Tag>{elm.no_sep}</Tag>
            <Tag>{elm.nobooking}</Tag>
          </Space>
          <CardDetail kodeBooking={elm.nobooking ?? elm.no_rawat} noSep={elm.no_sep} />
        </div>
      )
    })}</div>
  )
}

export default CardsTaskId