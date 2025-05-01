package tn.arctic.nexus.controllers.FinanceModule.pdf;


import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.FinanceModule.TransactionReportRequest;
import tn.arctic.nexus.repositories.FinanceModule.IPaymentRepository;
import tn.arctic.nexus.repositories.FinanceModule.IPurchaseRepository;
import tn.arctic.nexus.repositories.FinanceModule.IRefundRepository;
import tn.arctic.nexus.repositories.FinanceModule.ITransferRepository;

import java.util.List;

@RestController
@RequestMapping("/pdf/transactions")
@CrossOrigin(origins = "http://nexus-frontend.frontend.svc.cluster.local:4200")

public class TransactionReportController {
    @Autowired
    private IPaymentRepository paymentRepository;
    @Autowired
    private IPurchaseRepository purchaseRepository;
    @Autowired
    private IRefundRepository refundRepository;
    @Autowired
    private ITransferRepository transferRepository;


    @PostMapping("/report/pdf")
    public void generateTransactionReportPdf(
            @RequestBody TransactionReportRequest request,
            HttpServletResponse response) throws Exception {

        List<?> transactions = null;
        switch (request.getTransactionType().toLowerCase()) {
            case "payment":
                transactions = paymentRepository.findByCreatedAtBetween(request.getFromDate(), request.getToDate());
                break;
            case "purchase":
                transactions = purchaseRepository.findByCreatedAtBetween(request.getFromDate(), request.getToDate());
                break;
            case "refund":
                transactions = refundRepository.findByCreatedAtBetween(request.getFromDate(), request.getToDate());
                break;
            case "transfer":
                transactions = transferRepository.findByCreatedAtBetween(request.getFromDate(), request.getToDate());
                break;
            default:
                throw new IllegalArgumentException("Invalid transaction type");
        }

        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=transaction_report.pdf");

        // PDF utility that draws a table from the list
        PdfUtil.writeTransactionsTableToPdf(transactions, request.getTransactionType(),
                response.getOutputStream(), request.getFromDate(), request.getToDate());
    }
}
