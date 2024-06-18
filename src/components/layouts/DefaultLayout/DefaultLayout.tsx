import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div>
            <div className="flex flex-col overflow-hidden h-screen">
                <Header />
                <div className="overflow-hidden flex-1">{children}</div>
                <Footer />
            </div>
        </div>
    );
};

export default DefaultLayout;
