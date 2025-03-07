package tn.arctic.nexus.services.FinanceModule;

import tn.arctic.nexus.entities.FinanceModule.transfer;

import java.util.List;

public interface ITransferService {

    public List<transfer> getTransfers();
    public transfer getTransfer(Long id);
    public transfer createTransfer(transfer transfer);
    public transfer updateTransfer(transfer transfer);
    public boolean deleteTransfer(Long id);
}
