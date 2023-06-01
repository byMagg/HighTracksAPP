import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { TracksApiService } from 'src/app/services/tracks.api.service';
import { Comment } from 'src/app/models/comment.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  standalone: true,
  imports: [IonicModule,
    CommonModule,
    FormsModule
  ]
})
export class CommentsComponent implements OnInit {

  @Input() trackId: string | undefined;
  author: string | undefined;
  text: string | undefined;
  score: number = 0;
  comments: Comment[] | undefined;
  hideDelete: boolean = true;

  constructor(private apiService: TracksApiService, private alertController: AlertController, private authService: AuthService) { }

  ngOnInit() {
    this.getComments();
    this.hideDelete = this.authService.checkLogged();
  }

  async sendComment() {
    if (this.trackId && this.author && this.text) {
      let comment: Comment = {
        _id: '',
        author: this.author,
        text: this.text,
        score: this.score
      }
      console.log(comment);
      const response = await this.apiService.insertComment(this.trackId, comment);
      if (response) {
        this.getComments();
        this.author = undefined;
        this.text = undefined;
        this.score = 0;
      }
    }
  }

  async getComments() {
    if (!this.trackId) return;
    this.comments = await this.apiService.getComments(this.trackId);
  }

  async deleteComment(commentId: string) {
    if (!this.trackId) return;
    const response = await this.apiService.deleteComment(this.trackId, commentId);
    if (response) this.getComments();
  }

  handleDeleteAlert(commentId: string) {
    this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres eliminar este comentario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'confirm',
          handler: () => {
            this.deleteComment(commentId);
          }
        },
      ]
    }).then(alert => alert.present());
  }
}
