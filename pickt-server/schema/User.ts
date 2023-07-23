export interface User extends Document {
    fullName: {
        firstName: string
        lastName?: string
    },
    username: string,
    email: string,
    password: string,

    bio?: string,
    profilePictureURI?: string,

    photoURLs?: string[]
}

export interface UserInsert {
    fullName: {
        firstName: string
        lastName?: string
    },
    username: string,
    email: string,
    password: string,

    bio?: string,
    profilePictureURI?: string,
}

export interface UserUpdate {
    fullName?: {
        firstName?: string
        lastName?: string
    },
    username?: string,
    newUsername?: string,
    email?: string,
    password?: string,

    bio?: string,
    profilePictureURI?: string,
}
