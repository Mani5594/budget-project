// _layout.tsx
import { ReactNode, useEffect, useState } from 'react';

import Nav from '../components/Nav';
import { ToastContainer } from 'react-toastify';
import Loader from '@/components/Loader';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface MainLayoutProps {
    children: ReactNode;
}



const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const {showSpinner} = useSelector((state: RootState) => state.spinner)

    return (
        <div className="layout">
            <Nav userName={'Mani'} />
            <main>{children}</main>
            <img src='/wave.svg' alt="" />
            <ToastContainer />
            {
                showSpinner && 
                <div className="overlay">
                    <div className="overlay__inner">
                        <div className="overlay__content">
                            <Loader />
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default MainLayout;
