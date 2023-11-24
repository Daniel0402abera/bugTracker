// react-query.config.js
import { ReactQueryConfigProvider } from 'react-query';

const queryConfig = {
  queries: {
    // Global query options
    refetchOnWindowFocus: false,
    retry: 3,
  },
  mutations: {
    // Global mutation options
    onError: (error, variables, context) => {
      // Handle mutation errors globally
    },
  },
};

export const ReactQueryConfig = ({ children }) => (
  <ReactQueryConfigProvider config={queryConfig}>
    {children}
  </ReactQueryConfigProvider>
);
