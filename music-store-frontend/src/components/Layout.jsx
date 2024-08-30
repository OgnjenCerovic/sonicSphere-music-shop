import React from 'react';
import Header from './Header';
import Footer from './Footer';
import '../index.css';

const Layout = ({ children }) => {
    return (
        <div className>
                <div>
                    <div>
                        <Header/>
                    </div>
                </div>

                <div className="row bg-color">
                    <div className="col-12">
                        <div className="container page">
                            <main>{children}</main>
                        </div>
                    </div>
                </div>

        </div>
    );
};

export default Layout;
