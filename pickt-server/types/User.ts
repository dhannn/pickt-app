import { Post } from "./Post"

export type User = {
    _id: string
    fullName: {
        firstName: string
        lastName?: string
    },
    username: string,
    email?: string,
    password?: string,

    bio?: string,
    profilePictureURL: string,

    posts?: Post[],
    photoURLs?: string[]
}
