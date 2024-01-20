// useGet.js
import { useQuery } from "@tanstack/react-query";
import api from "../api";
import { toast } from "react-toastify";
export function useGet(endpoint) {
  return useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            
          },
        };

        const response = await api.get(`${endpoint}`, config);

        if (response.status === 200) {
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
    refetchOnWindowFocus: false,
  });
}
