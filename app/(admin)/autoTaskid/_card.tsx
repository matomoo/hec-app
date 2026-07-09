"use client";
import useMjknGetTaskid from "@/app/hooks/useMjknGetTaskid";
import { Schema_GetTaskId } from "@/app/schema/antrianPoliSchema";
import { Space, Tag } from "antd";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import UpdateTaskId from "./_update";
import UpdateTid67 from "./_updateTid67";
// var customParseFormat = require("dayjs/plugin/customParseFormat");

//#region - dayjs setting
dayjs.locale("id");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.tz.setDefault("Asia/Makassar");
//#endregion

const CardDetail = ({
  kodeBooking,
  noSep,
  jamReg,
  noRawat,
  isEnabled,
}: {
  kodeBooking: string;
  noSep: string;
  jamReg: string;
  noRawat: string;
  isEnabled: boolean;
}) => {
  const {
    data: dataTaskid,
    isError,
    error,
    isLoading,
  } = useMjknGetTaskid(kodeBooking);
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;
  if (!dataTaskid || dataTaskid.length === 0) return <Tag color="default">No task data</Tag>;

  // Check if current hour is within working hours (17:00 - 20:00)
  const currentHour = dayjs().hour();
  const isWithinWorkingHours = currentHour >= 17 && currentHour < 20;
  const shouldRun = isEnabled && isWithinWorkingHours;

  // Safely get last task data
  const lastTask = dataTaskid?.at(dataTaskid.length - 1);
  const lastTaskWaktu = lastTask?.wakturs;

  // const timeTid = dayjs(dataTaskid?.at(dataTaskid.length - 1)?.wakturs.slice(0, -4), "DD-MM-YYYY HH:mm:ss", true).format("DD-MM-YYYY HH:mm:ss")
  const timeTid = lastTaskWaktu
    ? dayjs(lastTaskWaktu.slice(0, -4), "DD-MM-YYYY HH:mm:ss", true).add(1, "hour").format("DD-MM-YYYY HH:mm:ss")
    : dayjs().format("DD-MM-YYYY HH:mm:ss");
  const minuteDiff = lastTaskWaktu
    ? dayjs().diff(dayjs(lastTaskWaktu.slice(0, -4), "DD-MM-YYYY HH:mm:ss", true).add(1, "hour"), "minute")
    : 0;
  const lastTid = lastTask?.taskid;
  return (
    <div>
      <Space direction="vertical">
        {/* <div>waktu sekarang : {timeNow} WITA</div>
        <div>waktu terakhir : {timeTid} WITA</div>
        <div>Minute diff : {minuteDiff}</div>
        <div>Last Task Id : {lastTid}</div>
        <div>No Sep: {noSep}</div> */}
        {!shouldRun && (
          <Tag color="default">
            Auto Task ID paused (
            {!isEnabled
              ? "disabled"
              : `outside working hours (${currentHour}:00)`}
            )
          </Tag>
        )}
        {shouldRun && lastTid !== undefined && (
          <UpdateTaskId
            taskId={lastTid}
            waktu={timeTid}
            minuteDiff={minuteDiff}
            noBooking={kodeBooking}
            noSep={noSep}
            jamReg={jamReg}
          />
        )}
        {shouldRun && lastTid !== undefined && (
          <UpdateTid67
            noRawat={noRawat}
            waktu={timeTid}
            minuteDiff={minuteDiff}
            taskId={lastTid}
            noBooking={kodeBooking}
          />
        )}

        {dataTaskid?.map((elm: Schema_GetTaskId, idx: number) => {
          return (
            <div key={`taskid-${idx}`} className="pl-4">
              <Tag>
                {elm.taskid} - {elm.wakturs}
              </Tag>
            </div>
          );
        })}
      </Space>
    </div>
  );
};

export default CardDetail;
