package tn.arctic.nexus.services.FinanceModule;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tn.arctic.nexus.entities.FinanceModule.Payment;
import tn.arctic.nexus.entities.FinanceModule.Wallet;
import tn.arctic.nexus.repositories.FinanceModule.IPaymentRepository;
import tn.arctic.nexus.repositories.FinanceModule.IWalletRepository;

import java.util.List;
import java.util.Optional;

@Service
public class PaymentService implements IPaymentService {

    @Autowired
    IPaymentRepository paymentRepository;
    @Autowired
    IWalletRepository walletRepository;
    @Override
    public List<Payment> getPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id).orElseThrow(() -> new RuntimeException("Payment not found"));
    }

    @Override
    public Payment addPayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    @Override
    public Payment updatePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    @Override
    public boolean deletePayment(Long id) {
        if (paymentRepository.existsById(id)) {
            paymentRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    //////////////////////////////////

    @Transactional
    public Payment assignPaymentToWallet(Long paymentId, Long walletId) {
        Optional<Payment> paymentOpt = paymentRepository.findById(paymentId);
        Optional<Wallet> walletOpt = walletRepository.findById(walletId);

        if (paymentOpt.isPresent() && walletOpt.isPresent()) {
            Payment payment = paymentOpt.get();
            Wallet wallet = walletOpt.get();

            // Assign the wallet to the payment
            payment.setWallet(wallet);

            // Save the payment
            return paymentRepository.save(payment);
        } else {
            throw new RuntimeException("Payment or Wallet not found");
        }
    }

}
