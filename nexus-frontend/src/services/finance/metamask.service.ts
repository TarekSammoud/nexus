import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class MetamaskService {
  private provider: ethers.BrowserProvider | ethers.JsonRpcProvider | null = null;
  private signer: ethers.Signer | null = null;
  private userAddress: string | null = null;


  constructor() {}

  async connectWallet(): Promise<void> {
    if ((window as any).ethereum) {
      try {
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
        this.provider = new ethers.BrowserProvider((window as any).ethereum);
        this.signer = await this.provider.getSigner();
        this.userAddress = await this.getAddress();
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        throw new Error('Failed to connect to MetaMask');
      }
    } else {
      console.warn('MetaMask is not installed. Using Infura provider.');
      this.provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/c0f2b396b4904bc7a8c9eb9f2a699dcd');
    }
  }


  async getAddress(): Promise<string | null> {
    if (!this.signer) return null;
    return this.signer.getAddress();
  }


  async isWalletConnected(): Promise<boolean> {
    if ((window as any).ethereum) {
      try {
        const accounts = await (window as any).ethereum.request({ method: 'eth_accounts' });
        return accounts.length > 0; // If there are accounts, the wallet is connected
      } catch (error) {
        console.error('Error checking wallet connection:', error);
        return false;
      }
    }
    return false;
  }
  

  async getBalance(): Promise<string | null> {
    if (!this.userAddress) {
      console.warn('No wallet connected');
      return null;
    }
    try {
      // Get the balance from the Sepolia network (in Wei)
      const balanceWei = await this.provider?.getBalance(this.userAddress);
      if (balanceWei) {
        // Convert balance from Wei to Ether
        const balanceEther = ethers.formatEther(balanceWei);
        return balanceEther; // Return balance in Ether
      }
      return null;
    } catch (error) {
      console.error('Error fetching balance:', error);
      return null;
    }
  }



  async sendTransaction(toAddress: string, amountEther: string): Promise<any> {
    if (!this.signer) {
      console.error('MetaMask is not connected');
      throw new Error('MetaMask is not connected');
    }

    try {
      // Parse the amount from Ether to Wei
      const amountWei = ethers.parseEther(amountEther);

      // Prepare the transaction details
      const transaction = {
        to: toAddress,
        value: amountWei // Send value in Wei (1 Ether = 1e18 Wei)
      };

      // Send the transaction and wait for confirmation
      const txResponse = await this.signer.sendTransaction(transaction);
      const txReceipt = await txResponse.wait(); // Wait for transaction to be mined
      console.log('Transaction successful', txReceipt);

      return txReceipt; // Return the transaction receipt after it's confirmed
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw new Error('Transaction failed');
    }
  }

}
