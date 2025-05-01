import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GameService } from '../core/services/game/game.service';
import { GameDiscountService } from '../core/services/game-discount.service';

@Component({
  selector: 'app-create-discount',
  templateUrl: './create-discount.component.html',
  styleUrls: ['./create-discount.component.css']
})
export class CreateDiscountComponent implements OnInit {


  dateRangeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const group = control as FormGroup;
      const startDate = group.get('saleStartDate')?.value;
      const endDate = group.get('saleEndDate')?.value;
  
      if (!startDate || !endDate) {
        return null;
      }
  
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      return start >= end ? { invalidDateRange: 'Start date must be before end date' } : null;
    };
  }


  gameId: number = 0;
  constructor(
    public modalService: NgbModal,
    private _router: Router,
    private _route: ActivatedRoute,
    private _gameService: GameService,
    private _gameDiscountService: GameDiscountService,
    private fb: FormBuilder
  ) {
    this.gameId = this._route.snapshot.paramMap.get('id') as unknown as number;
  }

  gameDiscountForm!: FormGroup;
  gameDiscountId?: number;
  isEditMode: boolean = false;
  title: string = 'Create Game Discount';

  navigateToDashboard() {
    this._router.navigate(['/admin/games/list']);
  }

  ngOnInit(): void {
    this.gameDiscountForm = this.fb.group({
      game: this.fb.group({
        id: [this.gameId , Validators.required]
      }),
      discountPercentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      saleStartDate: ['', Validators.required],
      saleEndDate: ['', Validators.required],
      isActive: [true, Validators.required]
    }, {
      validators:[this.dateRangeValidator()]
    });

    if (this._route.snapshot.paramMap.get('id')) {
      this.gameDiscountId = Number(this._route.snapshot.paramMap.get('discount'));
      this.isEditMode = !!this.gameDiscountId;
    }

    if (this.isEditMode) {
      this.title = 'Update Game Discount';
      var formattedEndDate = "", formattedStartDate = "";
      this._gameDiscountService.getDiscountById(this.gameDiscountId!).subscribe((data) => {
        this._gameDiscountService.getDiscountById(this.gameDiscountId!).subscribe((data) => {
          if (data.saleStartDate) {
             formattedStartDate = this.formatToDatetimeLocal(new Date(data.saleStartDate));
          }
          if (data.saleEndDate) {
             formattedEndDate = this.formatToDatetimeLocal(new Date(data.saleEndDate));
          }
          this.gameDiscountForm = this.fb.group({
            game: this.fb.group({
              id: [this.gameId , Validators.required]
            }),
            discountPercentage: [data.discountPercentage, [Validators.required, Validators.min(0), Validators.max(100)]],
            saleStartDate: [formattedStartDate, Validators.required],
            saleEndDate: [formattedEndDate, Validators.required],
            isActive: [true, Validators.required]
          }, {
            validators:[this.dateRangeValidator()]
          });
        });
        
      });
    }
  }

   formatToDatetimeLocal(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    const yyyy = date.getFullYear();
    const MM = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const HH = pad(date.getHours());
    const mm = pad(date.getMinutes());
    return `${yyyy}-${MM}-${dd}T${HH}:${mm}`;
  }

  onSubmit() {
    if (this.gameDiscountForm.invalid) {
      return;
    }

    const discountData = {
      ...this.gameDiscountForm.value,
      id: this.isEditMode ? this.gameDiscountId : null
    };

    if (this.isEditMode) {
      this._gameDiscountService.updateGameDiscount(discountData).subscribe(
        (response) => {
          //console.log('Game discount updated successfully', response);
          this.gameDiscountForm.reset();
        },
        (error) => {
          console.error('Error updating game discount', error);
        }
      );
    } else {
      this._gameDiscountService.createGameDiscount(discountData).subscribe(
        (response) => {
          //console.log('Game discount created successfully', response);
          this.gameDiscountForm.reset();
        },
        (error) => {
          console.error('Error creating game discount', error);
        }
      );
    }
  }

  open(content: any) {
    this.modalService.open(content);
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}