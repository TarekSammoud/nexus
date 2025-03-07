import { Component, OnInit } from '@angular/core';
import { JamService } from 'src/app/core/services/jam/jam.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jams-list',
  templateUrl: './jams-list.component.html',
  styleUrls: ['./jams-list.component.css']
})
export class JamsListComponent implements OnInit {
  jams: any[] = []; // Stocke la liste des jams

  constructor(private jamService: JamService, private router: Router) {}

  ngOnInit(): void {
    this.loadJams();
  }

  loadJams() {
    this.jamService.getJams().subscribe({
      next: (data) => {
        console.log("Données reçues depuis l'API :", data); // Vérifier la réponse
        this.jams = data;
      },
      error: (err) => {
        console.error("Erreur lors du chargement des jams :", err);
      }
    });
  }

  viewDetails(jamId: number) {
    this.router.navigate(['/jams', jamId]);
  }

  showForm = false; 

toggleForm() {
  this.showForm = !this.showForm;
}

onJamCreated(newJam: any) {
  this.jams.push(newJam); 
  this.showForm = false;  
}

deleteJam(jamId: number) {
  if (confirm("Are you sure you want to delete this Game Jam?")) {
    this.jamService.deleteJam(jamId).subscribe({
      next: () => {
        console.log("Game Jam deleted:", jamId);
        this.jams = this.jams.filter(j => j.id !== jamId); // Supprimer du tableau
      },
      error: (err) => {
        console.error("Error deleting Game Jam:", err);
      }
    });
  }
}

selectedJam: any = null; // Stocke le Game Jam à modifier

editJam(jam: any) {
  this.selectedJam = { ...jam }; // Copier les données pour modification
}

onJamUpdated(updatedJam: any) {
  const index = this.jams.findIndex(j => j.id === updatedJam.id);
  if (index !== -1) {
    this.jams[index] = updatedJam;
  }
  this.selectedJam = null; // Cacher le formulaire après modification
}


  
}
