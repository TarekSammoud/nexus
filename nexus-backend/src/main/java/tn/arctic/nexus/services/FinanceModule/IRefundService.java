package tn.arctic.nexus.services.FinanceModule;


import tn.arctic.nexus.entities.FinanceModule.Refund;

import java.util.List;

public interface IRefundService {

    public List<Refund> getRefunds();
    public Refund getRefund(Long id);
    public Refund addRefund(Refund refund);
    public Refund updateRefund(Refund refund);
    public boolean deleteRefund(Long id);

}
