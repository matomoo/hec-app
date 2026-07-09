import { useQuery } from '@tanstack/react-query';
import { HandlerGetListTaskId } from '../api/mjkn/handlerGetListTaskId';
import { Schema_GetTaskId } from '../schema/antrianPoliSchema';

const useMjknGetTaskid = (kodeBooking: string) => {
  return useQuery<Schema_GetTaskId[], Error>({
    queryKey: ["taskid", kodeBooking],
    queryFn: async () => {
      const resQ = await HandlerGetListTaskId({ kodeBooking });

      return resQ

    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    refetchIntervalInBackground: true,
  });
};

export default useMjknGetTaskid;
