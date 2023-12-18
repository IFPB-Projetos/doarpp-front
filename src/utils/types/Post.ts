export type Post = {
    id: string,
    title: string,
    content: string,
    image: string,
    userId: string,
    createdAt: Date,
    comments: Comment[]
}