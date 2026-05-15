import React from 'react'
import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { HandlerUpdateTaskId } from '@/app/api/mjkn/handlerUpdateTaskId';
import { Tag } from 'antd';
import Use_getByNoRawatForTaskid_ResepObat from '@/app/hooks/Use_getByNoRawatForTaskid_ResepObat';

//#region - dayjs setting
// dayjs.locale("id");
// dayjs.extend(utc)
// dayjs.extend(timezone);
dayjs.extend(customParseFormat);
// dayjs.tz.setDefault("Asia/Makassar");
//#endregion

const sendTaskid = async (noBooking: string, taskId: number, waktu: number) => {
  const res = await HandlerUpdateTaskId(noBooking, taskId, waktu)
  // console.log(res.metadata.message)
  return res.metadata.message
}

const UpdateTid67 = ({ noRawat, waktu, taskId, minuteDiff, noBooking }: { noRawat: string, waktu: string, taskId: any, minuteDiff: number, noBooking: string }) => {

  const { data: data67Taskid, isError, error, isLoading } = Use_getByNoRawatForTaskid_ResepObat(noRawat);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  // console.log(data67Taskid)

  if (taskId !== 5)
    return <Tag color='default'>Waiting task id 5</Tag>


  const noResep = data67Taskid?.at(data67Taskid.length - 1)?.no_resep
  if (noResep === null || noResep === undefined)
    return <Tag color='default'>No Resep</Tag>

  // running tid:67
  if (taskId === 5 && minuteDiff > 5) {

    console.log('send taskId 6 and noBooking ' + noBooking)

    const addMinut23 = Math.floor(Math.random() * 3) + 5
    const waktuForTid23 = dayjs(waktu, "DD-MM-YYYY HH:mm:ss", true).add(addMinut23, "minute").unix() * 1000
    const res23 = sendTaskid(noBooking, 6, waktuForTid23)
    res23.then(a => console.log(a))

    console.log('send taskId 7 and noBooking ' + noBooking)

    const addMinut67 = Math.floor(Math.random() * 3) + 5
    const waktuForTid67 = dayjs(waktu, "DD-MM-YYYY HH:mm:ss", true).add(addMinut67, "minute").unix() * 1000
    const res67 = sendTaskid(noBooking, 7, waktuForTid67)
    res67.then(a => console.log(a))

  }

  // running tid:7
  if (taskId === 6 && minuteDiff > 5) {

    console.log('send taskId 7 and noBooking ' + noBooking)

    const addMinut67 = Math.floor(Math.random() * 3) + 5
    const waktuForTid67 = dayjs(waktu, "DD-MM-YYYY HH:mm:ss", true).add(addMinut67, "minute").unix() * 1000
    const res67 = sendTaskid(noBooking, 7, waktuForTid67)
    res67.then(a => console.log(a))

  }

  return (
    <Tag color='lime'>Ada Resep</Tag>
  )
}

export default UpdateTid67