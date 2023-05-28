"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9077],{9077:(M,g,_)=>{_.r(g),_.d(g,{EditPage:()=>T});var p=_(5861),u=_(6895),s=_(433),a=_(650),t=_(4650),d=_(8672),f=_(1194);function h(o,c){if(1&o){const e=t.EpF();t.TgZ(0,"ion-chip")(1,"ion-label"),t._uU(2),t.qZA(),t.TgZ(3,"ion-icon",15),t.NdJ("click",function(){const r=t.CHM(e).index,l=t.oxw(2);return t.KtG(l.removeArtist(r))}),t.qZA()()}if(2&o){const e=c.$implicit;t.xp6(2),t.Oqu(e.name)}}function k(o,c){if(1&o){const e=t.EpF();t.TgZ(0,"ion-chip")(1,"ion-label"),t._uU(2),t.qZA(),t.TgZ(3,"ion-icon",15),t.NdJ("click",function(){const r=t.CHM(e).index,l=t.oxw(2);return t.KtG(l.removeImage(r))}),t.qZA()()}if(2&o){const e=c.$implicit;t.xp6(2),t.Oqu(e.url)}}function x(o,c){if(1&o){const e=t.EpF();t.TgZ(0,"form")(1,"ion-label",7),t._uU(2,"Nombre"),t.qZA(),t.TgZ(3,"ion-item")(4,"ion-input",8),t.NdJ("ngModelChange",function(i){t.CHM(e);const r=t.oxw();return t.KtG(r.track.name=i)}),t.qZA()(),t.TgZ(5,"ion-label",9),t._uU(6,"Artist"),t.qZA(),t.TgZ(7,"ion-item"),t.YNc(8,h,4,1,"ion-chip",10),t.TgZ(9,"ion-input",11),t.NdJ("ngModelChange",function(i){t.CHM(e);const r=t.oxw();return t.KtG(r.artist=i)})("keyup.Space",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.handleArtist(i.artist))})("keyup.enter",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.handleArtist(i.artist))}),t.qZA()(),t.TgZ(10,"ion-label",7),t._uU(11,"URLs Imagen"),t.qZA(),t.TgZ(12,"ion-item"),t.YNc(13,k,4,1,"ion-chip",10),t.TgZ(14,"ion-input",12),t.NdJ("ngModelChange",function(i){t.CHM(e);const r=t.oxw();return t.KtG(r.image=i)})("keyup.Space",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.handleImage(i.image))})("keyup.enter",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.handleImage(i.image))}),t.qZA()(),t.TgZ(15,"ion-label",7),t._uU(16,"Fecha"),t.qZA(),t._UZ(17,"ion-datetime",13),t.TgZ(18,"ion-button",14),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.updateTrack())}),t._uU(19,"Actualizar"),t.qZA()()}if(2&o){const e=t.oxw();t.xp6(4),t.Q6J("ngModel",e.track.name),t.xp6(4),t.Q6J("ngForOf",e.track.album.artists),t.xp6(1),t.Q6J("ngModel",e.artist),t.xp6(4),t.Q6J("ngForOf",e.track.album.images),t.xp6(1),t.Q6J("ngModel",e.image),t.xp6(3),t.Q6J("value",e.track.album.release_date)}}let T=(()=>{class o{constructor(e,n,i){var r=this;this.apiService=e,this.route=n,this.toastController=i,this.artist="",this.image="",this.route.params.subscribe(function(){var l=(0,p.Z)(function*(m){r.trackId=m.id,null!=r.trackId&&(r.track=yield r.apiService.getTrack(r.trackId))});return function(m){return l.apply(this,arguments)}}())}handleArtist(e){var n;""!=e.trim()&&(null===(n=this.track)||void 0===n||n.album.artists.push({name:e}),this.artist="")}handleImage(e){var n;""!=e.trim()&&(null===(n=this.track)||void 0===n||n.album.images.push({url:e}),this.image="")}removeArtist(e){var n;null===(n=this.track)||void 0===n||n.album.artists.splice(e,1)}removeImage(e){var n;null===(n=this.track)||void 0===n||n.album.images.splice(e,1)}updateTrack(){var e=this;return(0,p.Z)(function*(){e.track&&(yield e.apiService.updateTrack(e.track))&&e.toastController.create({message:"Canci\xf3n actualizada correctamente",duration:2e3}).then(i=>i.present())})()}ngOnInit(){}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(d.j),t.Y36(f.gz),t.Y36(a.yF))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-edit"]],standalone:!0,features:[t.jDz],decls:12,vars:4,consts:[[1,"ion-no-border",3,"translucent"],["slot","start"],["defaultHref","/tracks"],[3,"fullscreen"],["collapse","condense"],["size","large"],[4,"ngIf"],["position","floating"],["type","text","aria-label","name","name","name",3,"ngModel","ngModelChange"],["for","artists","position","floating"],[4,"ngFor","ngForOf"],["type","text","name","artists","id","artists",3,"ngModel","ngModelChange","keyup.Space","keyup.enter"],["type","text","name","images","id","images",3,"ngModel","ngModelChange","keyup.Space","keyup.enter"],["name","date","presentation","date",3,"value"],["type","submit",3,"click"],["name","close-outline",3,"click"]],template:function(e,n){1&e&&(t.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-title"),t._uU(3),t.qZA(),t.TgZ(4,"ion-buttons",1),t._UZ(5,"ion-back-button",2),t.qZA()()(),t.TgZ(6,"ion-content",3)(7,"ion-header",4)(8,"ion-toolbar")(9,"ion-title",5),t._uU(10,"edit"),t.qZA()()(),t.YNc(11,x,20,6,"form",6),t.qZA()),2&e&&(t.Q6J("translucent",!0),t.xp6(3),t.Oqu(null==n.track?null:n.track.name),t.xp6(3),t.Q6J("fullscreen",!0),t.xp6(5),t.Q6J("ngIf",n.track))},dependencies:[a.Pc,a.oU,a.YG,a.Sm,a.hM,a.W2,a.x4,a.Gu,a.gu,a.pK,a.Ie,a.Q$,a.wd,a.sr,a.QI,a.j9,a.cs,u.ez,u.sg,u.O5,s.u5,s._Y,s.JJ,s.JL,s.On,s.F],styles:["form[_ngcontent-%COMP%]{width:80%;margin:0 auto;display:flex;flex-direction:column;gap:20px;justify-content:center}ion-datetime[_ngcontent-%COMP%]{margin:0 auto}ion-button[_ngcontent-%COMP%]{width:-moz-fit-content;width:fit-content;margin:0 auto}"]}),o})()}}]);