import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-generate-pdf',
  templateUrl: './generate-pdf.component.html',
  styleUrls: ['./generate-pdf.component.css']
})
export class GeneratePdfComponent {
  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private http: HttpClient
  ) {}
  form!: FormGroup;
  loading = false;
  
  types = [
    { value: 'payment', label: 'Payment' },
    { value: 'purchase', label: 'Purchase' },
    { value: 'refund', label: 'Refund' },
    { value: 'transfer', label: 'Transfer' }
  ];



  ngOnInit() {
    this.form = this.fb.group({
      transactionType: ['', Validators.required],
      fromDate: ['', Validators.required],
      toDate: ['', Validators.required]
    });
  }
  downloadPdf() {
    this.loading = true;
    const { transactionType, fromDate, toDate } = this.form.value;
    // Compose full ISO string for dates (at midnight, in UTC)
    const body = {
      transactionType,
      fromDate: fromDate ? new Date(fromDate + 'T00:00:00Z').toISOString() : null,
      toDate: toDate ? new Date(toDate + 'T23:59:59Z').toISOString() : null
    };
    console.log(body); // for debugging
    this.http.post('http://localhost:9000/nexus-backend/pdf/transactions/report/pdf', body, { responseType: 'blob' })
      .subscribe(blob => {
        this.loading = false;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'transaction_report.pdf';
        a.click();
        window.URL.revokeObjectURL(url);
      }, err => {
        this.loading = false;
        console.error(err);
        alert('Failed to download PDF');
      });
  }


}
