export interface User {
    fullName: {
        firstName: string
        lastName?: string
    },
    username: string,
    email?: string,
    password?: string,

    bio?: string,
    profilePictureURL: string,

    photoURLs?: string[]
}
