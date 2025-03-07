package tn.arctic.nexus.controllers.FinanceModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.FinanceModule.Refund;
import tn.arctic.nexus.services.FinanceModule.RefundService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("refund")
public class RefundController {

    @Autowired
    RefundService refundService;

    @GetMapping("getAll")
    public List<Refund> getAll() {
        return refundService.getRefunds();
    }

    @GetMapping("{id}")
    public Refund getRefundById(@PathVariable Long id) {
        return refundService.getRefund(id);
    }

    @PostMapping("create")
    public Refund createRefund(@RequestBody Refund refund) {
        return refundService.addRefund(refund);
    }

    @PutMapping("update")
    public Refund updateRefund(@RequestBody Refund refund) {
        return refundService.updateRefund(refund);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteRefund(@PathVariable Long id) {
        boolean flag = refundService.deleteRefund(id);
        if (flag) {
            return ResponseEntity.ok("Deleted refund");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Refund not found"); // Return 404 with message
    }
}
