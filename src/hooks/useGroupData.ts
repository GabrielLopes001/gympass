import { api } from "@services/api";
import { useQuery } from "@tanstack/react-query";
import { AxiosPromise } from "axios";

export async function fetchGroups(): AxiosPromise<string[]> {
   const response = await api.get('/groups')
   return response   
 }

 export function useGroupData () {
   const query = useQuery({
      queryKey: ['groups-list'],
      queryFn: fetchGroups
   })

   return {
      ...query,
      data: query.data?.data
   }
 }