export interface UserProfile {
   firstname: string,
   surname: string,
   email: string
}


export interface AuthResponseBodyProfile {
   firstname: string,
   surname: string,
   email: string
}


export interface AuthResponseBody {
   token: string,
   profile: AuthResponseBodyProfile
}

export interface AuthResponse {
   status: number,
   body: AuthResponseBody
}