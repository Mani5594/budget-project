'use client'
import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'
import MainLayout from './layout'
import { Provider } from "react-redux"
import { persistor, store } from '@/store/persistStore'
import { PersistGate } from 'redux-persist/integration/react'
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  
  return(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </PersistGate>
    </Provider>
    )
}
