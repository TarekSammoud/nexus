package tn.arctic.nexus.services.FinanceModule;

import jakarta.persistence.EntityNotFoundException;
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
    @Override
    @Transactional
    public Payment CreateAffectPaymentToWallet(String metamaskPublicKey, Payment payment) {
        // Retrieve wallet
        Wallet wallet = walletRepository.findByMetamaskPublicKey(metamaskPublicKey);

        if (wallet == null) {
            throw new EntityNotFoundException("Wallet with public key " + metamaskPublicKey + " not found.");
        }
        // Link wallet and save payment
        payment.setWallet(wallet);
        return paymentRepository.save(payment);    }

    @Override
    public List<Payment> getPaymentsByWalletPK(String metamaskPublicKey) {
        return paymentRepository.findByWallet_MetamaskPublicKey(metamaskPublicKey);
    }


}
