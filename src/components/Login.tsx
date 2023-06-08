import React, { FormEvent, useState } from 'react'

interface Props {
    onLogin: (email:string, password:string) => void
}

export const Login: React.FC<Props> = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const loginHandler = (ev:FormEvent) => {
        ev.preventDefault()
        props.onLogin(email, password)
    }
    return (
        <form className='login-form' onSubmit={loginHandler}>
            <h3>התחברות</h3>
            <input onChange={(ev) => setEmail(ev.target.value)} type="text" placeholder='אימייל' />
            <input onChange={(ev) => setPassword(ev.target.value)} type="password" placeholder='סיסמה' />
            <button type='submit' className='btn-call-to-action'>כניסה</button>
            <div className="social">
                <div className="go"><i className='fab fa-google'> התחברו עם גוגל</i></div>
            </div>
        </form>
    )
}
