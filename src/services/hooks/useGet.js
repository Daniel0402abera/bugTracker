// useGet.js
import { useQuery } from '@tanstack/react-query';
import api from '../api';
export function useGet(endpoint) {
  return useQuery({
    queryKey: [endpoint],
    queryFn: async () => {


      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
      
        const response = await api.get(`${endpoint}`, config);
        
        if (response.status === 200) {
          return response.data;
        } else if (response.status === 401) {
          throw new Error('Unauthorized: Invalid credentials');
        } else {
          throw new Error(`Server Error: ${response.status}`);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            throw new Error('Invalid data ');
          } else if (error.response.status === 401) {
            throw new Error('You do not have permission to login');
          } else if (error.response.status === 409) {
            throw new Error('The resource already exists.');
          } else {
            throw new Error(`Server Error: ${error.response.status}`);
          }
        } else if (error.request) {
          throw new Error('No response received from the server.');
        } else {
          throw new Error('Error setting up the request.');
        }
      }

      // try {
      //   const response = await api.get(`${endpoint}`);
      //   console.log(response.data.data)
      //   // const response = await fetch(`https://api.example.com/${endpoint}`); // replace with your API base URL
      //   // if (!response.ok) {
      //   //   throw new Error('Network response was not ok');
      //   // }

      //   const data = await response.data.data.json();
      //   return data;
      // } catch (error) {
      //   // Handle errors here
      //   console.error(`Error fetching data for ${endpoint}:`, error);
      //   throw error;
      // }
    },
    refetchOnWindowFocus: false,
  });
}
