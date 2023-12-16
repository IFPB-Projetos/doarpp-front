import { Location } from "./Location";
import { Post } from "./Post";

export type User = {
    id: string,
    name: string,
    username: string,
    image: string,
    email: string,
    password: string,
    description: string,
    phone: string,
    location: Location | null,
    posts: Post[] | null
}