import { Component, OnInit } from '@angular/core';
import { VipJamService, VipJam } from 'src/app/core/services/jam/vip-jam.service';

@Component({
  selector: 'app-vip-jam-form',
  templateUrl: './vip-jam-form.component.html',
  styleUrls: ['./vip-jam-form.component.css']
})
export class VipJamFormComponent implements OnInit {
  vipJam: VipJam = {
    name: '',
    description: '',
    devStartDate: '',
    devEndDate: '',
    reward: ''
  };

  createdJam?: VipJam;
  vipJams: VipJam[] = [];
  editingJamId: number | null = null;

  constructor(private vipJamService: VipJamService) {}

  ngOnInit(): void {
    this.loadAllVipJams();
  }

  submit(): void {
    if (this.editingJamId) {
      this.vipJamService.updateVipJam(this.editingJamId, this.vipJam).subscribe({
        next: () => {
          alert('✅ VIP Jam updated successfully!');
          this.loadAllVipJams();
          this.resetForm();
        }
      });
    } else {
      this.vipJamService.createVipJam(this.vipJam).subscribe({
        next: (res) => {
          alert('🎉 VIP Jam created successfully!');
          this.createdJam = res;
          this.loadAllVipJams();
          this.resetForm();
        }
      });
    }
  }

  loadAllVipJams(): void {
    this.vipJamService.getAllVipJams().subscribe({
      next: (data) => this.vipJams = data
    });
  }

  editJam(jam: VipJam): void {
    this.vipJam = { ...jam };
    this.editingJamId = jam.id!;
    setTimeout(() => {
      document.querySelector('.vip-jam-form-container')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  resetForm(): void {
    this.vipJam = {
      name: '',
      description: '',
      devStartDate: '',
      devEndDate: '',
      reward: ''
    };
    this.editingJamId = null;
    this.createdJam = undefined;
  }

  deleteJam(id: number): void {
    if (confirm('Are you sure you want to delete this VIP Jam?')) {
      this.vipJamService.deleteVipJam(id).subscribe(() => {
        this.vipJams = this.vipJams.filter(jam => jam.id !== id);
      });
    }
  }
  suggestions: { [key: string]: string } = {
    pizza: "🍕 Create the most delicious pizza-themed game! Compete for the cheesiest design.",
    boy: "👦 A jam focused on action-packed, adventurous gameplay.",
    girl: "👧 Embrace magical, colorful themes with creativity and flair.",
    space: "🚀 Launch into space with cosmic themes and intergalactic adventures.",
    battle: "⚔️ Engage in epic battles and strategy challenges!"
  };
  
  checkSuggestions(): void {
    const lowerTitle = this.vipJam.name.toLowerCase();
  
    for (const key in this.suggestions) {
      if (lowerTitle.includes(key)) {
        this.vipJam.description = this.suggestions[key];
        break;
      }
    }
  }
  
}
