type Position = {
    coordinates: [number, number]
}

export type User = {
    id: string,
    name: string,
    username: string,
    image: string,
    email: string,
    password: string,
    description: string,
    phone: string,
    location: Position,
}