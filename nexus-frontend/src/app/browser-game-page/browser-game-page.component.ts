import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-browser-game-page',
  templateUrl: './browser-game-page.component.html',
  styleUrls: ['./browser-game-page.component.css']
})
export class BrowserGamePageComponent implements OnInit{
  gameName: string = 'some-game-folder-name'; // Update dynamically as needed
  safeGameUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private _route:ActivatedRoute) 
  {
    this.gameName = this._route.snapshot.paramMap.get('name') || '';
    
  }

  ngOnInit(): void {
    const url = `http://localhost:5050/${this.gameName}/index.html`;
    this.safeGameUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
