export interface loginCreds {
    email: string
    password: string
}

export interface signupCreds extends loginCreds {
    fullName: string
}