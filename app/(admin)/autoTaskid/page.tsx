"use client";
import Use_GetAllRegistrasiPeriksaForTaskid from "@/app/hooks/useGetAllRegistrasiPeriksaForTaskid";
import React, { useState } from "react";
import CardTaskId from "./_cards";
import { Switch, Space, Typography } from "antd";

const { Text } = Typography;

const autoTaskidPage = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  // get all no_booking today
  const {
    data: dataTaskid,
    isError,
    error,
    isLoading,
  } = Use_GetAllRegistrasiPeriksaForTaskid();
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Switch
          checked={isEnabled}
          onChange={setIsEnabled}
          checkedChildren="Enabled"
          unCheckedChildren="Disabled"
        />
        <Text>
          {isEnabled ? "Auto Task ID is running" : "Auto Task ID is paused"}
        </Text>
      </Space>
      <CardTaskId data={dataTaskid!} isEnabled={isEnabled} />
    </div>
  );
};

export default autoTaskidPage;
