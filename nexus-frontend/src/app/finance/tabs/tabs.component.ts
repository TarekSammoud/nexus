import { Component } from '@angular/core';
import { TransferPopupComponent } from '../wallet-dashboard/popUps/transfer-popup/transfer-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TasksListPopupComponent } from '../wallet-dashboard/popUps/tasks-list-popup/tasks-list-popup.component';
import { RequestRefundComponent } from '../wallet-dashboard/popUps/request-refund/request-refund.component';
import { MetamaskService } from 'src/services/finance/metamask.service';
import { Router } from '@angular/router';
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
  openTasksListPopup() {
    const modalRef = this.modalService.open(TasksListPopupComponent);
  }
  openRefunsPopup() {
    const modalRef = this.modalService.open(RequestRefundComponent);
  }
  disconnectWallet() {
  this.metamaskService.disconnectWallet();
  this.router.navigate(['/connectWallet']);

  }

}
