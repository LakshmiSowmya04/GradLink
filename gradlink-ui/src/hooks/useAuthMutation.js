import { useMutation } from 'react-query';
import axios from 'axios';

const useAuthMutation = (url) => {
  return useMutation(
    async (data) => {
      const response = await axios.post(url, data);
      return response.data;
    },
    {
      onError: (error) => {
        console.error('Error:', error.response?.data || error.message);
      },
    }
  );
};

export default useAuthMutation;
