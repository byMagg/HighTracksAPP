import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TracksApiService } from 'src/app/services/tracks.api.service';
import { Recommendation } from 'src/app/models/recommendation.model';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.page.html',
  styleUrls: ['./recommendations.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RecommendationsPage implements OnInit {

  recommendations: Recommendation[] | undefined;

  constructor(private apiService: TracksApiService) { }

  ngOnInit() {
    this.getRecommendations();
  }

  async getRecommendations() {
    this.recommendations = undefined;
    this.recommendations = await this.apiService.getRecommendations();
    console.log(this.recommendations);
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.getRecommendations();
      event.target.complete();
    }, 5000);
  }
}
