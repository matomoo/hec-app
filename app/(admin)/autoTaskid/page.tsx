"use client";
import Use_GetAllRegistrasiPeriksaForTaskid from "@/app/hooks/useGetAllRegistrasiPeriksaForTaskid";
import React, { useState, useCallback, useEffect } from "react";
import CardTaskId from "./_cards";
import { Switch, Space, Typography, Badge, Tag } from "antd";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Makassar");

const { Text } = Typography;

type TaskStatus = "completed" | "noSep" | "inProgress" | "taskId99";

const AutoTaskidPage = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [statusCounts, setStatusCounts] = useState<Record<TaskStatus, number>>({
    completed: 0,
    noSep: 0,
    inProgress: 0,
    taskId99: 0,
  });

  // Check if current hour is within working hours (17:00 - 20:00)
  const currentHour = dayjs().hour();
  const isWithinWorkingHours = currentHour >= 17 && currentHour < 23;
  const shouldRun = isEnabled && isWithinWorkingHours;

  const handleStatusChange = useCallback((status: TaskStatus) => {
    setStatusCounts((prev) => ({
      ...prev,
      [status]: prev[status] + 1,
    }));
  }, []);

  // Reset counts when data reloads
  const {
    data: dataTaskid,
    isError,
    error,
    isLoading,
  } = Use_GetAllRegistrasiPeriksaForTaskid();

  useEffect(() => {
    if (dataTaskid) {
      setStatusCounts({ completed: 0, noSep: 0, inProgress: 0, taskId99: 0 });
    }
  }, [dataTaskid]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error.message}</p>;

  const total = dataTaskid?.length || 0;
  const processed =
    statusCounts.completed + statusCounts.noSep + statusCounts.inProgress;

  return (
    <div>
      <Space style={{ marginBottom: 16, marginRight: 16 }} wrap>
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

      {!shouldRun && (
        <Tag color="default" style={{ marginBottom: 16 }}>
          Auto Task ID paused (
          {!isEnabled
            ? "disabled"
            : `outside working hours (${currentHour}:00)`}
          )
        </Tag>
      )}

      <Space style={{ marginBottom: 16, marginRight: 16, gap: 16 }} wrap>
        <Badge count={statusCounts.completed} showZero color="green">
          <Text style={{ paddingRight: 8 }}>Completed (5/7)</Text>
        </Badge>
        <Badge count={statusCounts.noSep} showZero color="default">
          <Text style={{ paddingRight: 8 }}>No SEP</Text>
        </Badge>
        <Badge count={statusCounts.taskId99} showZero color="yellow">
          <Text style={{ paddingRight: 8 }}>Task Id 99</Text>
        </Badge>
        <Badge count={statusCounts.inProgress} showZero color="blue">
          <Text style={{ paddingRight: 8 }}>In Progress</Text>
        </Badge>
        <Text type="secondary">
          ({processed}/{total} processed)
        </Text>
      </Space>

      <CardTaskId
        data={dataTaskid ?? []}
        shouldRun={shouldRun}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
};

export default AutoTaskidPage;
