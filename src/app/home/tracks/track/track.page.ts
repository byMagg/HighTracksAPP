import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Track } from 'src/app/models/track.model';
import { TracksApiService } from 'src/app/services/tracks.api.service';
import { CommentsComponent } from "./comments/comments.component";

@Component({
  selector: 'app-track',
  templateUrl: './track.page.html',
  styleUrls: ['./track.page.scss'],
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    IonicModule, CommentsComponent]
})
export class TrackPage implements OnInit {

  trackId: string | undefined;
  track: Track | undefined;

  constructor(public apiService: TracksApiService, private route: ActivatedRoute) {
    this.route.params.subscribe(async params => {
      this.trackId = params['id'];
      if (this.trackId == undefined) return;
      this.track = await this.apiService.getTrack(this.trackId)
    })
  }

  ngOnInit() {
  }

}
