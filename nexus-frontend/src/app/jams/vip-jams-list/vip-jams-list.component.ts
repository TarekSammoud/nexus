import { Component, OnInit } from '@angular/core';
import { VipJamService, VipJam } from 'src/app/core/services/jam/vip-jam.service';

@Component({
  selector: 'app-vip-jams-list',
  templateUrl: './vip-jams-list.component.html',
  styleUrls: ['./vip-jams-list.component.css']
})
export class VipJamsListComponent implements OnInit {
  vipJams: VipJam[] = [];

  constructor(private vipJamService: VipJamService) {}

  ngOnInit(): void {
    this.vipJamService.getAllVipJams().subscribe({
      next: (data) => this.vipJams = data
    });
  }
}
