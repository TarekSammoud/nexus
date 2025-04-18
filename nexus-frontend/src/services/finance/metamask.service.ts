import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ethers } from 'ethers';
import { PaymentService } from './Crud/payment.service';
import { Payment } from 'src/app/core/entities/finance/payment.model';
import { productType, Purchase } from 'src/app/core/entities/finance/purchase.model';
import { PurchaseService } from './Crud/purchase.service';
import { Game } from 'src/app/core/entities/game/game';

@Injectable({
  providedIn: 'root'
})
export class MetamaskService {
  private provider: ethers.BrowserProvider | ethers.JsonRpcProvider | null = null;
  private signer: ethers.Signer | null = null;
  private contract: ethers.Contract | null = null;
  private contractAddress = '0x99CaC4A7DD3c6495329d95ac3a1FdC42b399a389'; // Replace with actual contract address
  private contractABI = [
    "function getBalance(address userMetamaskAdd) view returns (uint256)",
    "function addVirtualCoins(address userMetamaskAdd, uint256 amount)",
    "function transferVirtualCoins(address fromUserMetamaskAdd, address toUserMetamaskAdd, uint256 amount)",
    "function addUser(address userMetamaskAdd)",
    "function getContractBalance() view returns (uint256)",
    "function withdrawEther(address payable _to) public",
    "function userExists(address userMetamaskAdd) view returns (bool)",
    "function SpendVirtualCoins(address userMetamaskAdd, uint256 amount)",

    "event VirtualCoinAdded(address indexed userMetamaskAdd, uint256 amount)",
    "event VirtualCoinTransferred(address indexed fromUserMetamaskAdd, address indexed toUserMetamaskAdd, uint256 amount)",
    "event UserAdded(address indexed userId)",
    "event EtherReceived(address indexed sender, uint256 amount)"
  ];


  private userAddress: string | null = null;
  private userwalletBalance: string = '';
  private balanceuser: string = '';

  errorMessage: string = '';


  constructor(private router: Router,private paymentService : PaymentService,private purchaseService: PurchaseService) {}



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

payment:  Payment = {
  coinAmount: 0,
  status: 'Pending',
  price: "0",
};

public async listenToEtherReceived() {
  console.log('Listening to EtherReceived event...');
  // Ensure the contract is initialized
  if (!this.contract) {
    console.error('Contract not initialized');
    return;
  }
  // Listen to the EtherReceived event
  this.contract.on('EtherReceived', (sender: string, amount: number) => {
    console.log(`EtherReceived Event:`);
    console.log(`Sender: ${sender}`);
    console.log(`Amount: ${ethers.formatEther(amount)} ETH`); // Convert amount to ETH for better readability

    this.addCoins(sender, Number(localStorage.getItem('coinsToPurchase')));
    this.payment.coinAmount = Number(localStorage.getItem('coinsToPurchase'));
    this.payment.price = localStorage.getItem('n') || '0';
    this.paymentService.createAndAffectPayment(this.userAddress,this.payment).subscribe({
      next: (response) => {
        console.log('Payment created:', response);
        // reset form
        this.payment = {   coinAmount: 0,
          status: 'Pending',
          price: "0",
        };
      },
      error: (err) => {
        console.error('Error creating payment:', err);
        alert('Failed to create payment.');
      }
    });    
  });
}
async addCoins(addrese:string,amount:number) {
  try {
    if (!this.contract || !this.signer) throw new Error('Contract or signer not initialized');
    const tx = await this.contract['addVirtualCoins'](addrese, amount);
    console.log('Transaction sent:', tx.hash);

    await tx.wait();
    console.log('Transaction mined:', tx.hash);
    console.log('Coins added successfully:', 'to : ', addrese," and amount of coin", amount);

  } catch (error: any) {
    console.error('Error setting value:', error.message || error);
    this.errorMessage = error.message || 'Failed to set value.';
    console.log(this.errorMessage);

  }
}
async TransfertCoins(_to:String,amount:number) {
  try {
    if (!this.contract || !this.signer) throw new Error('Contract or signer not initialized');
    const tx = await this.contract['transferVirtualCoins'](this. getWalletAddress(),_to, amount);
    console.log('Transaction sent (transfert):', tx.hash);

    await tx.wait();
    console.log('Transaction mined (transfert):', tx.hash);
    console.log('Coins sended  successfully:', "from :",this. getWalletAddress() , ' to : ', _to," and amount of coin", amount);

  } catch (error: any) {
    if(error.reason?.includes('Not enough virtual coins')){
      alert('Not enough virtual coins to send');
   
    }
    else {
      console.error('Error transfer value:', error.message || error);
      this.errorMessage = error.message || 'Failed to transfer coins.';
      console.log(this.errorMessage);
    }


  }
}

purchases: Purchase[] = [];
purchase: Purchase = {
  productType: productType.GAME,
  productId:0,
  price: 0,
}

async SpendCoinsFromCart(amount:number,games: Game[]) {
  try {
    if (!this.contract || !this.signer) throw new Error('Contract or signer not initialized');
    const tx = await this.contract['SpendVirtualCoins'](this. getWalletAddress(), amount);
    console.log('Transaction sent (Purchase Coins):', tx.hash);
    for (const game of games) {
      this.purchase.productId = game.id;
      this.purchase.price = game.price;
      this.purchases.push(this.purchase);
    }

    this.purchaseService.createAndAffectPurchases(this.userAddress,this.purchases).subscribe({
      next: (response) => {
        console.log('Purchases created:', response);
        // reset form
        this.purchases = [];
      },
      error: (err) => {
        console.error('Error creating Purchase:', err);
        alert('Failed to create Purchase.');
      }
    }); 

    await tx.wait();
    console.log('Transaction mined (spend):', tx.hash);
    console.log('Coins Spended  successfully:', "of user :",this. getWalletAddress() ,  "and amount of coin spended", amount);

  } catch (error: any) {
    if(error.reason?.includes('Not enough virtual coins')){
      alert('Not enough virtual coins to spend');
   
    }
    else {
      console.error('Error Spend value:', error.message || error);
      this.errorMessage = error.message || 'Failed to Spend value.';
      console.log(this.errorMessage);
    }
  }
}

async SpendCoinsSingleGme(amount:number,game: Game) {
  try {
    if (!this.contract || !this.signer) throw new Error('Contract or signer not initialized');
    const tx = await this.contract['SpendVirtualCoins'](this. getWalletAddress(), amount);
    console.log('Transaction sent (Purchase Coins):', tx.hash);
      this.purchase.productId = game.id;
      this.purchase.price = game.price;


    this.purchaseService.createAndAffectPurchase(this.userAddress,this.purchase).subscribe({
      next: (response) => {
        console.log('1 Purchase created:', response);
        // reset form
        this.purchases = [];
      },
      error: (err) => {
        console.error('Error creating 1 Purchase:', err);
        alert('Failed to create 1 Purchase.');
      }
    }); 

    await tx.wait();
    console.log('Transaction mined (spend):', tx.hash);
    console.log('Coins Spended  successfully:', "of user :",this. getWalletAddress() ,  "and amount of coin spended", amount);

  } catch (error: any) {
    if(error.reason?.includes('Not enough virtual coins')){
      alert('Not enough virtual coins to spend');
   
    }
    else {
      console.error('Error Spend value:', error.message || error);
      this.errorMessage = error.message || 'Failed to Spend value.';
      console.log(this.errorMessage);
    }
  }
}

async getContractBalance(): Promise<BigInt> {
  try {
    if (!this.contract) throw new Error('Contract not initialized');
    const value = await this.contract['getContractBalance']();
    const balance: BigInt = BigInt(value);
    return balance;
  } catch (error: any) {
    console.log('Error gettong contract balance user:', error.message || error);
    this.errorMessage = error.message || 'Failed to fetch value.';
    return BigInt(-1);

  }
}

async withdrawEther() {
  try {
    if (!this.contract || !this.signer) throw new Error('Contract or signer not initialized');
    const tx = await this.contract['withdrawEther']("0x9375f2d84f9843Df4BC29260219B7B25E73a92d1");
    console.log('Transaction sent (withdrawEther):', tx.hash);

    await tx.wait();
    console.log('Transaction mined (withdrawEther):', tx.hash);

  } catch (error: any) {
    console.error('Error setting value:', error.message || error);
    this.errorMessage = error.message || 'Failed to set value.';
    console.log(this.errorMessage);

  }
}


////////// transaction functions /////////////s

  async sendTransaction( amountEther: string): Promise<any> {
    if (!this.signer) {
      console.log('MetaMask is not connected');
      throw new Error('MetaMask is not connected');
    }

    try {
      // Parse the amount from Ether to Wei
      const amountWei = ethers.parseEther(amountEther);

      // Prepare the transaction details
      const transaction = {
        to: this.contractAddress,
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
