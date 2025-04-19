import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-live-room',
  templateUrl: './live-room.component.html',
  styleUrls: ['./live-room.component.css']
})
export class LiveRoomComponent implements OnInit {
  streamUrl!: SafeResourceUrl;
  streamerName: string = '';
platformName: string = '';


  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      let rawUrl: string = params['url'];
      this.streamerName = params['name'] || '';
      this.platformName = params['platform'] || '';
    
      if (rawUrl) {
        if (rawUrl.includes('twitch.tv')) {
          const username = rawUrl.split('/').pop();
          rawUrl = `https://player.twitch.tv/?channel=${username}&parent=localhost`;
        } else if (rawUrl.includes('youtube.com/watch')) {
          const videoId = rawUrl.split('v=')[1];
          rawUrl = `https://www.youtube.com/embed/${videoId}`;
        } else if (rawUrl.includes('kick.com')) {
          const username = rawUrl.split('/').pop();
          rawUrl = `https://player.kick.com/${username}`;
        }
    
        this.streamUrl = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
      }
    });
    
  }
}
