package tn.arctic.nexus.services.FinanceModule;

import tn.arctic.nexus.entities.FinanceModule.Payment;

import java.util.List;

public interface IPaymentService {

    public List<Payment> getPayments();
    public Payment getPaymentById(Long id);
    public Payment addPayment(Payment payment);
    public Payment updatePayment(Payment payment);
    public boolean deletePayment(Long id);
}
