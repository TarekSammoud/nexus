import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import KeenSlider, { KeenSliderInstance, KeenSliderPlugin } from 'keen-slider';
import { GameService } from '../core/services/game/game.service';
import { Game } from '../core/entities/game/game';
import { Router } from '@angular/router';

function ThumbnailPlugin(main: KeenSliderInstance): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove('active');
      });
    }

    function addActive(idx: number) {
      slider.slides[idx].classList.add('active');
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener('click', () => {
          main.moveToIdx(idx);
        });
      });
    }

    slider.on('created', () => {
      addActive(slider.track.details.rel);
      addClickEvents();
      main.on('animationStarted', () => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

@Component({
  selector: 'app-keen-game-carousel',
  templateUrl: './keen-game-carousel.component.html',
  styleUrls: ['./keen-game-carousel.component.css'],
})
export class KeenGameCarouselComponent implements AfterViewInit, OnInit {
  @ViewChild('sliderRef') sliderRef!: ElementRef<HTMLElement>;
  @ViewChild('thumbnailRef') thumbnailRef!: ElementRef<HTMLElement>;

  slider?: KeenSliderInstance;
  thumbnailSlider?: KeenSliderInstance;


  currentSlide=0;

  games: Game[] = [];

  constructor(private _gameService: GameService, private cdr: ChangeDetectorRef, private _router:Router) {}

  goToGame(id: number) {
    this._router.navigate(['/games', id]);
  }
  ngOnInit(): void {
    this._gameService.getGames().subscribe((games) => {
      this.games = games;
      this.games = games.slice(0, 4);
      for (let game of this.games) {
        for (let media of game.gameMediaList) {
          if (media.gameMediaType === 'COVER') {
            game.coverPicture = media;
          }
          if (media.gameMediaType === 'BANNER') {
            game.bannerPicture = media;
          }
        }
      }

      // Trigger change detection so *ngFor renders
      this.cdr.detectChanges();

      // Then initialize sliders
      this.initSliders();
    });
  }

  ngAfterViewInit() {
    // Nothing here now — moved to initSliders()
  }

  initSliders() {
    if (!this.sliderRef?.nativeElement || !this.thumbnailRef?.nativeElement) return;

    this.slider = new KeenSlider(this.sliderRef.nativeElement);

    this.thumbnailSlider = new KeenSlider(
      this.thumbnailRef.nativeElement,
      {
        initial: 0,
        vertical: true,
        slides: {
          perView: 5,
          spacing: 10,
        },
      },
      [ThumbnailPlugin(this.slider!)]
    );

    console.log(this.slider.slides);
  }


}
