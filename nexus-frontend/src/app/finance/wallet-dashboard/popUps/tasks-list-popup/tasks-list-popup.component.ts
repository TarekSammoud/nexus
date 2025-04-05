import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

interface Task {
  id: number;
  gameName: string;
  gameImage: string;
  price: number;
  rewardCoins: number;
}

@Component({
  selector: 'app-tasks-list-popup',
  templateUrl: './tasks-list-popup.component.html',
  styleUrls: ['./tasks-list-popup.component.css']
})
export class TasksListPopupComponent implements OnInit {
  tasks: Task[] = [
    
    {
      id: 3,
      gameName: "Palworld",
      gameImage: "https://cdn.akamai.steamstatic.com/steam/apps/1623730/header.jpg",
      price: 29.99,
      rewardCoins: 600
    },
    {
      id: 4,
      gameName: "Elden Ring",
      gameImage: "https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/phvVT0qZfcRms5qDAk0SI3CM.png",
      price: 59.99,
      rewardCoins: 1200
    },
    {
      id: 5,
      gameName: "Baldur's Gate 3",
      gameImage: "https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg",
      price: 59.99,
      rewardCoins: 1200
    },
    {
      id: 6,
      gameName: "Dragon's Dogma 2",
      gameImage: "https://cdn.akamai.steamstatic.com/steam/apps/2640000/header.jpg",
      price: 69.99,
      rewardCoins: 1400
    },
    {
      id: 8,
      gameName: "Lies of P",
      gameImage: "https://cdn.akamai.steamstatic.com/steam/apps/1627720/header.jpg",
      price: 59.99,
      rewardCoins: 1200
    },
    {
      id: 9,
      gameName: "Starfield",
      gameImage: "https://cdn.akamai.steamstatic.com/steam/apps/1716740/header.jpg",
      price: 69.99,
      rewardCoins: 1400
    },
    
  ];

  filteredTasks: Task[] = [];
  sortOrder: 'high-low' | 'low-high' = 'high-low';

  constructor(public activeModal: NgbActiveModal) {
    this.filteredTasks = [...this.tasks];
  }

  ngOnInit(): void {
    this.sortTasks(this.sortOrder);
  }

  sortTasks(order: 'high-low' | 'low-high'): void {
    this.sortOrder = order;
    this.filteredTasks.sort((a, b) => {
      return order === 'high-low' 
        ? b.rewardCoins - a.rewardCoins 
        : a.rewardCoins - b.rewardCoins;
    });
  }

  buyTask(taskId: number): void {
    console.log(`Buying task with ID: ${taskId}`);
    // Implement your buy logic here
    this.activeModal.close(taskId);
  }

  dismiss() {
    this.activeModal.dismiss();
  }
}