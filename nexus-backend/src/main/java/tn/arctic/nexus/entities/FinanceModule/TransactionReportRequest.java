package tn.arctic.nexus.entities.FinanceModule;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TransactionReportRequest {
    private String transactionType; // "payment", "purchase", "refund", "transfer"
    private Date fromDate;
    private Date toDate;
}
