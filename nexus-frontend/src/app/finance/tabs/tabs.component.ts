import { Component } from '@angular/core';
import { TransferPopupComponent } from '../wallet-dashboard/popUps/transfer-popup/transfer-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestRefundComponent } from '../wallet-dashboard/popUps/request-refund/request-refund.component';
import { MetamaskService } from 'src/services/finance/metamask.service';
import { Router } from '@angular/router';
import { GeneratePdfComponent } from '../wallet-dashboard/popUps/generate-pdf/generate-pdf.component';
interface ITab {
  title: string;
  content: string;
  removable?: boolean;
  disabled?: boolean;
  active?: boolean;
  customClass?: string;
}

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  standalone: false,
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent {
  customClass:string = 'customClass'
  constructor(private modalService: NgbModal,private metamaskService : MetamaskService,private router:Router) {}


  //popups
  openTransferPopup() {
    const modalRef = this.modalService.open(TransferPopupComponent);
  }

  openRefunsPopup() {
    const modalRef = this.modalService.open(RequestRefundComponent);
  }
  disconnectWallet() {
  this.metamaskService.disconnectWallet();
  this.router.navigate(['/connectWallet']);

  }

}
