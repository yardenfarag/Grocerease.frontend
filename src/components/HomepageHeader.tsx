import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface Props {
    
}

const HomepageHeader: React.FC<Props> = (props) => {

    return (
        <header className='homepage-header flex between container'>
            <div className="logo">
                <img src="https://res.cloudinary.com/dfz8mxb4f/image/upload/v1683321454/logo-no-background_dwcytm.png" />
            </div>
            <nav>
                <ul className='clean-list flex items-center'>
                    <Link to='/login'><li className='btn-login'>
                        התחברות
                    </li></Link>
                    <li className='btn-signup btn-call-to-action'>
                        הרשמה
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default HomepageHeader