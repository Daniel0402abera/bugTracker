import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";
import { toast } from "react-toastify";

export function useCreate(endpoint) {
  const queryClient = useQueryClient();

  const configHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")} `,
    },
  };

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
    onSuccess: (data) => {
      queryClient.invalidateQueries("userData"); // Optionally, refetch user data
    },
  });
}
