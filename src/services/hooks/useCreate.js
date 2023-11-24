// useCreateUser.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";
import { configHeader } from "../../constants";

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

        if (response.status === 200) {
          return response.data;
        } else if (response.status === 401) {
          throw new Error("Unauthorized: Invalid credentials");
        } else {
          throw new Error(`Server Error: ${response.status}`);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            throw new Error("Invalid data ");
          } else if (error.response.status === 401) {
            throw new Error("You do not have permission to login");
          } else if (error.response.status === 409) {
            throw new Error("The resource already exists.");
          } else {
            throw new Error(`Server Error: ${error.response.status}`);
          }
        } else if (error.request) {
          throw new Error("No response received from the server.");
        } else {
          // throw new Error('Error setting up the request.');
        }
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
