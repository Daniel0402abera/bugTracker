// useUpdateUser.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api"; // Assuming the axios instance is in a separate file
import { configHeader } from "../../constants";
import { toast } from "react-toastify";

export function useUpdate(endpoint, Key) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newUserInfo) => {
      try {
        const response = await api.put(
          `${endpoint}`,
          newUserInfo,
          configHeader
        );
        if (response.status === 200) {
          toast.success(`Successfully Done!`, {
            position: toast.POSITION.TOP_CENTER,
          });
        }

        return response.data;
      } catch (error) {
        console.log(error);

        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    },
    onMutate: async () => {
      await queryClient.prefetchQuery({ Key });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: Key }),
    
  });
}

