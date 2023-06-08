import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import HomepageHeader from '../components/HomepageHeader'
import { Login } from '../components/Login'
import { Signup } from '../components/Signup'
import { userActions } from '../store/user'

export const HomePage = () => {
    const dispatch = useDispatch()
    const [isLoginModal, setIsLoginModal] = useState(false)
    const [isSignupModal, setIsSignupModal] = useState(false)

    const setIsLoginModalHandler = () => {
        setIsLoginModal(!isLoginModal)
    }
    const setIsSignupModalHandler = () => {
        setIsSignupModal(!isSignupModal)
    }
    
    return (
        <div className='home-page main-layout'>
            <HomepageHeader onSetIsLoginModal={setIsLoginModalHandler} onSetIsSignupModal={setIsSignupModalHandler}/>
            {/* <div className="banner flex">
                <Link to='/store' className='call-to-action'>Start Here</Link>
            </div> */}
            <main className='homepage-content flex container items-center'>
                <div className="text">
                    {/* <h1>בלה בלהבלה בלה בלה בלה.</h1> */}
                    <h1>לורם איפסום דולור סיט אמט</h1>
                    {/* <p>ברוכים הבאים לגרושריז, האפליקציה המושלמת לכל מי שרוצה לפשט את חווית קניית המצרכים שלו. המערכת החכמה שלנו מאפשרת מעקב אחר מצרכים, ניהול מלאי ביתי והשוואת מחירים. הצטרפו עוד היום!</p> */}
                    <p>לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולהע צופעט למרקוח איבן איף, ברומץ כלרשט מיחוצים. קלאצי קוואזי במר מודוף. </p>
                    <button onClick={setIsSignupModalHandler} className='btn-call-to-action'>הרשמה</button>
                    {/* <button className='btn-call-to-action'><Link to='/store'>יש לי חשבון</Link></button> */}
                </div>
                <img src="https://res.cloudinary.com/dfz8mxb4f/image/upload/v1683324777/5912_2_fb2vr6.png" alt="hero" />
            </main>
            {isSignupModal && <Signup/>}
        </div>
    )
}
