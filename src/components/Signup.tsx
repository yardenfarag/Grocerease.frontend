import React from 'react'

export const Signup = () => {
    return (
        <form action="">
            <h3>הרשמה</h3>
            <input type="text" placeholder='שם מלא' />
            <input type="text" placeholder='אימייל' />
            <input type="password" placeholder='סיסמה' />
            <button className='btn-call-to-action'>הירשמ/י</button>
            <div className="social">
                <div className="go"><i className='fab fa-google'> התחברו עם גוגל</i></div>
            </div>
        </form>
    )
}
