import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class MetamaskService {
  private provider: ethers.BrowserProvider | ethers.JsonRpcProvider | null = null;
  private signer: ethers.Signer | null = null;
  private contract: ethers.Contract | null = null;
  private contractAddress = '0x3e6640CF83CCdb57b339A72512FCb5c47310E281'; // Replace with actual contract address
  private contractABI = [
    "function getBalance(address userMetamaskAdd) view returns (uint256)",
    "function addVirtualCoins(address userMetamaskAdd, uint256 amount)",
    "function transferVirtualCoins(address fromUserMetamaskAdd, address toUserMetamaskAdd, uint256 amount)",
    "function addUser(address userMetamaskAdd)",
    "function getContractBalance() view returns (uint256)",
    "function withdrawEther(address payable _to, uint256 _amount)",
    "function userExists(address userMetamaskAdd) view returns (bool)",

    "event VirtualCoinAdded(address indexed userMetamaskAdd, uint256 amount)",
    "event VirtualCoinTransferred(address indexed fromUserMetamaskAdd, address indexed toUserMetamaskAdd, uint256 amount)",
    "event UserAdded(address indexed userId)",
    "event EtherReceived(address indexed sender, uint256 amount)"
  ];


  private userAddress: string | null = null;
  private userwalletBalance: string = '';
  private balanceuser: string = '';

  errorMessage: string = '';


  constructor(private router: Router) {}



  /////conecting to metamask and smartcontract inizialization/////
  async connectWallet(): Promise<[string | null, string]> {
    if ((window as any).ethereum) {
      try {
        // Request to connect to MetaMask
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
  
        // Initialize provider and signer
        this.provider = new ethers.BrowserProvider((window as any).ethereum);
        this.signer = await this.provider.getSigner();
  
        // Fetch user address and wallet balance
        this.userAddress = await this.getAddress();
        this.userwalletBalance = await this.getBalanceMetamask() || '0';
        if (this.userAddress) {
          localStorage.setItem('walletAddress', this.userAddress);
        }
  
        console.log('Wallet connected:', this.userAddress, 'Balance:', this.userwalletBalance);
  
        // Initialize the contract
        this.initializeContract();
  
        // Return the address and balance as a tuple
        return [this.userAddress, this.userwalletBalance];
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        throw new Error('Failed to connect to MetaMask');
      }
    } else {
      throw new Error('MetaMask is not installed');
    }
  }
  initializeContract() {
    try {
      if (!this.provider || !this.signer) throw new Error('Provider or signer not initialized');
      this.contract = new ethers.Contract(this.contractAddress, this.contractABI, this.signer);


      console.log('Contract initialized:', this.contract);

    } catch (error) {
      console.error('Error initializing contract:', error);
      this.errorMessage = 'Failed to initialize contract.';
    }
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
  disconnectWallet(): void {
    // Clear wallet information from localStorage
    localStorage.removeItem('walletAddress');
  
    // Reset internal state variables
  this.userAddress = null;
  this.userwalletBalance = '0';
  this.provider = null;
  this.signer = null;
  this.contract = null;  
    console.log('Wallet disconnected');
  }
  async getAddress(): Promise<string> {
    if (!this.signer) return "null";
    return this.signer.getAddress();
  }
  getWalletAddress(): string | null {
    return localStorage.getItem('walletAddress');
  }

 


  async getBalanceMetamask(): Promise<string | null> {
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

//////////////// smart contract functions /////////////////

async addUser(addrese:string): Promise<string> {
  this.errorMessage = 'Contract or signer not initialized';
  try {
    // Check if the contract and signer are initialized
    if (!this.contract || !this.signer) throw new Error('Contract or signer not initialized');

    // Send the transaction to add the user
    const tx = await this.contract['addUser'](addrese);
    console.log('Transaction sent:', tx.hash);

    // Wait for the transaction to be mined
    await tx.wait();
    this.router.navigate(['/wallet']);

    console.log('Transaction mined:', tx.hash);
    console.log('User added successfully:', addrese);


    return 'User added successfully';
  } catch (error: any) {
    // Check if the error is due to an already existing user
    if (error.reason?.includes('User already exists')) {
      console.log('Error: User already exists');
      this.errorMessage = 'User already exists.';
      
    } else if  (error.message?.includes('Contract or signer not initialized')) {
      console.log('Error: Contract or signer not initialized');
      this.errorMessage = 'Contract or signer not initialized.';
    } else{

      console.log('error:', error.message || error);

    }
    return this.errorMessage;
  }
}
async getBalance(addrese:string): Promise<string | null> {
  try {
    if (!this.contract) throw new Error('Contract not initialized');
    const value = await this.contract['getBalance'](addrese);
    this.balanceuser = value.toString();
    console.log('balance:', this.balanceuser);
    return this.balanceuser;
  } catch (error: any) {
    console.error('Error fetching stored value:', error.message || error);
    this.errorMessage = error.message || 'Failed to fetch value.';
    return "0"; // Ensure a value is returned in the catch block
  }
}
async userExists(addrese:string): Promise<boolean> {
  try {
    if (!this.contract) throw new Error('Contract not initialized');
    const value = await this.contract['userExists'](addrese);
    const checkUser: boolean = Boolean(value);
    console.log('is wallet exists:', value);
    return checkUser;
  } catch (error: any) {
    console.log('Error checking user:', error.message || error);
    this.errorMessage = error.message || 'Failed to fetch value.';
    return false;

  }
}

////////// transaction functions /////////////s

  async sendTransaction(toAddress: string, amountEther: string): Promise<any> {
    if (!this.signer) {
      console.log('MetaMask is not connected');
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
      console.log('Error sending transaction:', error);
      throw new Error('Transaction failed');
    }
  }

}
