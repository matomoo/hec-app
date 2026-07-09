"use client";
import { Schema_GetAllRegistrasiPeriksaForTaskid } from "@/app/schema/antrianPoliSchema";
import React from "react";
import CardDetail from "./_card";
import { Space, Tag } from "antd";

type TaskStatus = "completed" | "noSep" | "inProgress" | "taskId99";

const CardsTaskId = ({
  data,
  shouldRun,
  onStatusChange,
}: {
  data: Schema_GetAllRegistrasiPeriksaForTaskid[];
  shouldRun: boolean;
  onStatusChange: (status: TaskStatus) => void;
}) => {
  return (
    <div>
      {data.map((elm: Schema_GetAllRegistrasiPeriksaForTaskid) => {
        return (
          <div key={elm.no_rawat} className="my-4">
            <Space>
              {elm.nm_pasien}
              <Tag>{elm.no_rkm_medis}</Tag>
              <Tag>{elm.no_rawat}</Tag>
              <Tag>{elm.no_sep}</Tag>
              <Tag>{elm.nobooking}</Tag>
            </Space>
            <CardDetail
              kodeBooking={elm.nobooking ?? elm.no_rawat}
              noSep={elm.no_sep}
              jamReg={elm.jam_reg}
              noRawat={elm.no_rawat}
              shouldRun={shouldRun}
              onStatusChange={onStatusChange}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CardsTaskId;
