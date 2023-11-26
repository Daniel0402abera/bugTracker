// useUpdateUser.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api'; // Assuming the axios instance is in a separate file
import { configHeader } from '../../constants';
import { toast } from 'react-toastify';

export function useUpdate(endpoint) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newUserInfo) => {
      try {
        // Assume your API endpoint is '/api/updateUser'
        const response = await api.put(`${endpoint}`, newUserInfo,configHeader);
        if (response.status === 200){
          toast.success(`Successfull Done!`, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
        
        // Wait for a fake delay to simulate the API call
        // await new Promise((resolve) => setTimeout(resolve, 1000));
          
        // If the API call is successful, you can return the updated user data
        return response.data;
      } catch (error) {

        toast.error(error.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        // You can customize the error handling based on your API response
        // throw new Error('Failed to update user');
      }
    },
    onMutate: (newUserInfo) => {
      // Optimistic update
      queryClient.setQueryData(['users'], (prevUsers) =>
        prevUsers?.map((prevUser) =>
          prevUser.id === newUserInfo.id ? newUserInfo : prevUser,
        ),
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), // Refetch users after mutation
  });
}

















// // useUpdateUser.js
// import { useMutation, useQueryClient } from '@tanstack/react-query';

// export function useUpdate() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (user) => {
//       //send api update request here

//       await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
//       return Promise.resolve();
//     },
//     //client side optimistic update
//     onMutate: (newUserInfo) => {
//       queryClient.setQueryData(['users'], (prevUsers) =>
//         prevUsers?.map((prevUser) =>
//           prevUser.id === newUserInfo.id ? newUserInfo : prevUser,
//         ),
//       );
//     },
//     // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
//   });
// }