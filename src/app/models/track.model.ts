import { Album } from "./album.model"
import { Coords } from "./coords.model"
import { Comment } from "./comment.model"

export class Track {
  _id: string
  name: string
  duration_ms?: number
  album: Album
  comments?: Comment[]
  location?: Coords
  inserted?: boolean
  preview_url?: string

  constructor(name: string, album: Album, _id?: string) {
    this._id = name
    if (_id) this._id = _id
    this.name = name
    this.album = album
  }

  static createBlankTrack(): Track {
    return new Track("", new Album("", "", ""))
  }
}