package tn.arctic.nexus.controllers.GamesModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.arctic.nexus.services.GamesModule.GameDiscountService;
import tn.arctic.nexus.entities.GameDiscount;

import java.util.Date;

@RestController
@RequestMapping("/games/discount")
public class GameDiscountController {

    @Autowired
    private GameDiscountService gameDiscountService;

    @PostMapping("/create")
    public GameDiscount createSale(@RequestBody GameDiscount gd) {
        return gameDiscountService.createDiscount(gd);
    }

    @GetMapping("/{gameId}")
    public GameDiscount getSaleForGame(@PathVariable Long gameId) {
        return gameDiscountService.getDiscountForGame(gameId); // or handle not found
    }

    @GetMapping("/get/{discountid}")
    public GameDiscount getDiscount(@PathVariable Long discountid) {
        return gameDiscountService.getDiscountById(discountid); // or handle not found
    }

    @DeleteMapping("/delete/{id}")
    public void deleteDiscount(@PathVariable Long id) {
         gameDiscountService.deleteDiscount(id); // or handle not found
    }

    @PutMapping("/update")
    public GameDiscount updateDiscount(@RequestBody GameDiscount gd) {
        return gameDiscountService.updateDiscount(gd); // or handle not found
    }
}
