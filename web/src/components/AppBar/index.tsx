import React from 'react';

import Logo from '../../assets/images/aws-logo.png'
import './index.css'

const AppBar: React.FC = () => {

    return (
        <div id='b'>
        <header id='h'>
            <a href="#/">
              <img src={Logo} width={40} height={28} alt="" />
            </a>
        </header>
        </div>
    )
}

export default AppBar;