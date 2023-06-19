import { Post } from "./Post"

export type User = {
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
