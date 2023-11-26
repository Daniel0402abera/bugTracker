// useCreateUser.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";
import { configHeader } from "../../constants";
import { toast } from "react-toastify";

export function useCreate(endpoint) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (credentials) => {
      try {
        const response = await api.post(
          `${endpoint}`,
          credentials,
          configHeader
        );

       

        if (response.status === 201) {
          toast.success(`Successfull Added!`, {
            position: toast.POSITION.TOP_CENTER,
          });
          return response.data;
        } else if (response.status === 401) {

          throw new Error("Unauthorized: Invalid credentials");
        } else {
          throw new Error(`Server Error: ${response.status}`);
        }
      } catch (error) {
        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    },
    // client-side optimistic update
    // onMutate: (newUserInfo) => {
    //   queryClient.setQueryData(['users'], (prevUsers) => [
    //     ...prevUsers,
    //     {
    //       ...newUserInfo,
    //       id: (Math.random() + 1).toString(36).substring(7),
    //     },
    //   ]);
    // },
    onSuccess: (data) => {
      queryClient.invalidateQueries("userData"); // Optionally, refetch user data
    },
  });

  // useMutation({
  //   mutationFn: async (user) => {
  //     //send api update request here
  //     await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
  //     return Promise.resolve();
  //   },
  //   //client side optimistic update
  //   // onMutate: (newUserInfo) => {
  //   //   queryClient.setQueryData(['users'], (prevUsers) => [
  //   //     ...prevUsers,
  //   //     {
  //   //       ...newUserInfo,
  //   //       id: (Math.random() + 1).toString(36).substring(7),
  //   //     },
  //   //   ]);
  //   // },
  //   // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
  // });
}
