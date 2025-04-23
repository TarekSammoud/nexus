import { Component, Input, OnInit } from '@angular/core';
import { MarketService } from '../services/market.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-market-details',
  templateUrl: './market-details.component.html',
  styleUrls: ['./market-details.component.css']
})
export class MarketDetailsComponent implements OnInit {
  @Input() item: any; // Optional: only needed if you're using <app-market-details [item]="...">

  markets: any[] = [];
  page: number = 1;

  constructor(private marketService: MarketService) {}

  ngOnInit(): void {
    this.loadMarkets();
  }

  loadMarkets(): void {
    this.marketService.getAllListings().subscribe((data: any[]) => {
      this.markets = data.map(item => {
        const highestBid = item.bids?.length
          ? Math.max(...item.bids.map((bid: any) => bid.amount))
          : null;
        return { ...item, highestBidAmount: highestBid };
      });
    });
  }

  deleteItem(id: number): void {
    if (confirm('❌ Are you sure you want to delete this listing?')) {
      this.marketService.deleteListing(id).subscribe(() => {
        this.loadMarkets(); // Refresh list after deletion
      });
    }
  }

  exportToExcel(): void {
    const worksheet = XLSX.utils.json_to_sheet(this.markets.map((m, i) => ({
      '#': i + 1,
      'Game Item': m.item?.title || 'Untitled',
      'Start Bid': m.startBid,
      'Highest Bid': m.highestBidAmount || '—',
      'End Date': m.endDate,
      'Created At': m.createdAt,
      'Updated At': m.updatedAt,
      'Owner': m.user?.username || 'N/A'
    })));

    const workbook = {
      Sheets: { 'Market Listings': worksheet },
      SheetNames: ['Market Listings']
    };

    XLSX.writeFile(workbook, 'Market_Listings.xlsx');
  }

  exportToPDF(): void {
    const doc = new jsPDF();
    doc.text('Market Listings', 14, 15);

    autoTable(doc, {
      head: [['#', 'Game Item', 'Start Bid', 'Highest Bid', 'End Date', 'Created At', 'Updated At', 'Owner']],
      body: this.markets.map((m, i) => [
        i + 1,
        m.item?.title || 'Untitled',
        m.startBid,
        m.highestBidAmount || '—',
        m.endDate,
        m.createdAt,
        m.updatedAt,
        m.user?.username || 'N/A'
      ]),
      startY: 20
    });

    doc.save('Market_Listings.pdf');
  }

}
