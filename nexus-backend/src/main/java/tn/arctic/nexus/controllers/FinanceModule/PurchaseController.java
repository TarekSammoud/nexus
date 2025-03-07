package tn.arctic.nexus.controllers.FinanceModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.entities.FinanceModule.Purchase;
import tn.arctic.nexus.services.FinanceModule.PurchaseService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("purchase")
public class PurchaseController {

    @Autowired
    PurchaseService purchaseService;

    @GetMapping("getAll")
    public List<Purchase> getAll() {
        return purchaseService.getAllPurchases();
    }

    @GetMapping("{id}")
    public Purchase getPurchaseById(@PathVariable Long id) {
        return purchaseService.getPurchaseById(id);
    }

    @PostMapping("create")
    public Purchase createPurchase(@RequestBody Purchase purchase) {
        return purchaseService.createPurchase(purchase);
    }

    @PutMapping("update")
    public Purchase updatePurchase(@RequestBody Purchase purchase) {
        return purchaseService.updatePurchase(purchase);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deletePurchase(@PathVariable Long id) {
        boolean flag = purchaseService.deletePurchase(id);
        if (flag) {
            return ResponseEntity.ok("Deleted purchase");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Purchase not found"); // Return 404 with message
    }
}
