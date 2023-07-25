import { Post } from "./Post"

export type User = {
    _id?: string
    fullName: {
        firstName: string
        lastName?: string
    },
    username: string,
    email?: string,
    password?: string,

    bio?: string,
    profilePictureURI: string,

    posts?: Post[],
    photoURLs?: string[]
}
