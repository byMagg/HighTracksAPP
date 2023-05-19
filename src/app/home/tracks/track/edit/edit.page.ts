import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Track } from 'src/app/models/track.model';
import { TracksApiService } from 'src/app/services/tracks.api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class EditPage implements OnInit {

  trackId: string | undefined;
  track: Track | undefined;
  artist: string = "";
  image: string = "";

  constructor(public apiService: TracksApiService, private route: ActivatedRoute, private toastController: ToastController) {
    this.route.params.subscribe(async params => {
      this.trackId = params['id'];
      if (this.trackId == undefined) return;
      this.track = await this.apiService.getTrack(this.trackId)
    })
  }

  handleArtist(artist: string) {
    if (artist.trim() == "") return;
    this.track?.album.artists.push({
      name: artist
    });
    this.artist = "";
  }

  handleImage(image: string) {
    if (image.trim() == "") return;
    this.track?.album.images.push({
      url: image
    });
    this.image = "";
  }

  removeArtist(i: number) {
    this.track?.album.artists.splice(i, 1)
  }

  removeImage(i: number) {
    this.track?.album.images.splice(i, 1)
  }

  async updateTrack() {
    if (!this.track) return;
    const response = await this.apiService.updateTrack(this.track)
    if (response) {
      this.toastController.create({
        message: "Canción actualizada correctamente",
        duration: 2000
      }).then(toast => toast.present())
    }
  }

  ngOnInit() {
  }

}
