import { Component, OnInit } from '@angular/core';
import { GameKeyService } from '../core/services/game-key.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private _gameKeyService : GameKeyService,private _fb: FormBuilder){

  }
  gameKeyForm!: FormGroup;

  ngOnInit(): void {
    this.gameKeyForm= this._fb.group({
      keyCode: ['',Validators.required]
    })
  }

  successMessage: string = '';
  errorMessage: string = '';


  onSubmit(){
    if (this.gameKeyForm.valid){
      this._gameKeyService.redeemGameKey(this.gameKeyForm.value).subscribe({
    next: (res: boolean) => {
      if (res === true) {
        this.successMessage = 'Code redeemed successfully!';
        this.errorMessage = '';
        this.gameKeyForm.reset();

        setTimeout(() => this.successMessage = '', 3000); // optional auto-clear
      } else {
        this.successMessage = '';
        this.errorMessage = 'Invalid or already used code.';

        setTimeout(() => this.errorMessage = '', 3000); // optional auto-clear
      }
    },
    error: (err) => {
      this.successMessage = '';
      this.errorMessage = 'Something went wrong. Please try again.';
    }
  });
    }
  }
}
