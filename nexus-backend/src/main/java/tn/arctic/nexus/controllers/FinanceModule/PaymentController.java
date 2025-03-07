package tn.arctic.nexus.controllers.FinanceModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.FinanceModule.Payment;
import tn.arctic.nexus.services.FinanceModule.PaymentService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("payment")
public class PaymentController {

    @Autowired
    PaymentService paymentService;

    @GetMapping("getAll")
    public List<Payment> getAll() {
        return paymentService.getPayments();
    }

    @GetMapping("{id}")
    public Payment getPaymentById(@PathVariable Long id) {
        return paymentService.getPaymentById(id);
    }

    @PostMapping("create")
    public Payment createPayment(@RequestBody Payment payment) {
        return paymentService.addPayment(payment);
    }

    @PutMapping("update")
    public Payment updatePayment(@RequestBody Payment payment) {
        return paymentService.updatePayment(payment);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePayment(@PathVariable Long id) {
        boolean flag = paymentService.deletePayment(id);
        if (flag) {
            return ResponseEntity.ok("Deleted payment");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Payment not found"); // Return 404 with message
    }
}
