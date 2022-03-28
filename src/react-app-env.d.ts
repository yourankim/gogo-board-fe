/// <reference types="react-scripts" />

// reference: https://dev.to/louisgv/typescript-and-create-react-app-env-136e
declare namespace NodeJS {
  interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      PUBLIC_URL: string
      REACT_APP_API_URI: string
      }
  }
