import React, { useState } from 'react'
import { Link } from 'react-router-dom'

interface Props {
    onSetIsLoginModal: () => void
    onSetIsSignupModal: () => void
}

const HomepageHeader:React.FC<Props> = (props) => {
    const [isLoginModal, setIsLoginModal] = useState(false)
    const [isSignupModal, setIsSignupModal] = useState(false)

    const setIsLoginModalHandler = () => {
        props.onSetIsLoginModal()
    }
    const setIsSignupModalHandler = () => {
        props.onSetIsSignupModal()
    }
    return (
        <header className='homepage-header flex between container'>
            <div className="logo">
                <img src="https://res.cloudinary.com/dfz8mxb4f/image/upload/v1683321454/logo-no-background_dwcytm.png" />
            </div>
            <nav>
                <ul className='clean-list flex items-center'>
                    <Link to='/login'><li onClick={setIsLoginModalHandler} className='btn-login'>
                            התחברות
                    </li></Link>
                    <li onClick={setIsSignupModalHandler} className='btn-signup btn-call-to-action'>
                            הרשמה
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default HomepageHeader