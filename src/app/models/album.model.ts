export class Album {
    artists: Artist[]
    id?: string
    images: Image[]
    name: string
    release_date?: string
    release_date_precision?: string
    total_tracks?: number

    constructor(artist: string, name: string, url: string) {
        this.name = name
        this.artists = [
            {
                name: artist
            }
        ]
        this.images = [
            {
                url: url
            }
        ]
    }
}

export interface Artist {
    id?: string
    name: string
}

export interface Image {
    url?: string
    imageBase64String?: string
}