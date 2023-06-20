import { Post } from "./Post"

export type User = {
    _id: string
    name: {
        firstName: string
        lastName?: string
    },
    username: string,
    email?: string,

    bio?: string,
    profilePictureURL: string,

    posts?: Post[]
    photoURLs?: string[]
}
