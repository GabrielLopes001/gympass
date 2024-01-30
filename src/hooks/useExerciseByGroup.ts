import { api } from "@services/api"
import { useQuery } from "@tanstack/react-query"
import { AxiosPromise } from "axios"


async function fetchExercisesByGroup(groupSelected: string): AxiosPromise<string>{
   const response = await api.get(`/exercises/bygroup/${groupSelected}`)
   return response
 }

export function useExerciseByGroup(groupSelected: string){
   const query = useQuery({
      queryKey: ['GROUP ', groupSelected],
      queryFn: async () => fetchExercisesByGroup(groupSelected)
   })

   return {
      ...query,
      data: query.data?.data
   }
}

