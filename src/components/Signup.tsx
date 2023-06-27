import React, { FormEvent, useState } from 'react'

interface Props {
    onSignup: (email: string, password: string, fullName: string) => void
}

export const Signup: React.FC<Props> = (props) => {
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const signupHandler = (ev: FormEvent) => {
        ev.preventDefault()
        props.onSignup(email, password, fullName)
    }
    return (
        <form className='login-form' onSubmit={signupHandler}>
            <h3>הרשמה</h3>
            <input onChange={(ev) => setFullName(ev.target.value)} type="text" placeholder='שם מלא' />
            <input onChange={(ev) => setEmail(ev.target.value)} type="text" placeholder='אימייל' />
            <input onChange={(ev) => setPassword(ev.target.value)} type="password" placeholder='סיסמה' />
            <button type='submit' className='btn-call-to-action'>כניסה</button>
            <div className="social">
                <div className="go"><i className='fab fa-google'> התחברו עם גוגל</i></div>
            </div>
        </form>
    )
}