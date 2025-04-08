import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-market-details',
  templateUrl: './market-details.component.html',
  styleUrls: ['./market-details.component.css']
})
export class MarketDetailsComponent {
  @Input() item: any;
}
