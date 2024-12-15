const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

const tokenAAddress = "0x770193fa62E5dfA680E4bA84FaaD4Aa7D62E05ae";
const tokenBAddress = "0xAb3a59551780Bd648dA54D9763a26214cF54B02d";
const dexAddress = "0x5A1605e7502c98C2979Eee4Ed1B198C31bb7f4ad";

//Contracts ABI
const dexAbi = [
    {
        "inputs": [
            { "internalType": "uint256", "name": "amountA", "type": "uint256" },
            { "internalType": "uint256", "name": "amountB", "type": "uint256" }
        ],
        "name": "addLiquidity",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "_token", "type": "address" }
        ],
        "name": "getPrice",
        "outputs": [
            { "internalType": "uint256", "name": "", "type": "uint256" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "amountAIn", "type": "uint256" }
        ],
        "name": "swapAforB",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "amountBIn", "type": "uint256" }
        ],
        "name": "swapBforA",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "amountA", "type": "uint256" },
            { "internalType": "uint256", "name": "amountB", "type": "uint256" }
        ],
        "name": "removeLiquidity",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

const tokenAAbi= [
    {
        "inputs": [
            { "internalType": "address", "name": "to", "type": "address" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "spender", "type": "address" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "approve",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }],
        "name": "transferFrom",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }],
        "name": "transfer",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
const tokenBAbi= [
    {
        "inputs": [
            { "internalType": "address", "name": "to", "type": "address" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "spender", "type": "address" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "approve",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }],
        "name": "transfer",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "from", "type": "address" },
            { "internalType": "address", "name": "to", "type": "address" },
            { "internalType": "uint256", "name": "amount", "type": "uint256" }
        ],
        "name": "transferFrom",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]
 
// Instantiation of contracts
const dexContract = new ethers.Contract(dexAddress, dexAbi, signer);
const tokenAContract = new ethers.Contract(tokenAAddress, tokenAAbi, signer);
const tokenBContract = new ethers.Contract(tokenBAddress, tokenBAbi, signer);

// DOM Elements
const connectButton = document.getElementById("connectButton");
const walletAddress = document.getElementById("walletAddress");
const balanceTokenA = document.getElementById("balanceTokenA");
const balanceTokenB = document.getElementById("balanceTokenB");
const addLiquidityButton = document.getElementById("addLiquidityButton");
const removeLiquidityButton = document.getElementById("removeLiquidityButton");
const swapButton = document.getElementById("swapButton");
const swapButtonB = document.getElementById("swapButtonB");
const getPriceButton = document.getElementById("getPriceButton");

//Messages
const mintAInvalidMsg = document.getElementById("mintAInvalidMsg");
const mintAValidMsg = document.getElementById("mintAValidMsg");
const mintBInvalidMsg = document.getElementById("mintBInvalidMsg");
const mintBValidMsg = document.getElementById("mintBValidMsg");
const liquidityInvalidMsg = document.getElementById("liquidityInvalidMsg");
const liquidityRmvInvalidMsg = document.getElementById("liquidityRmvInvalidMsg");
const swapAforBInvalidMsg = document.getElementById("swapAforBInvalidMsg");
const swapBforAInvalidMsg = document.getElementById("swapBforAInvalidMsg");

// Wallet connection function:
connectButton.onclick = async () => {
    await provider.send("eth_requestAccounts", []);
    const address = await signer.getAddress();
    walletAddress.innerText = `Wallet Address: ${address}`;
    walletAddress.style.color = "#39f2ae";
    updateBalances();
};

//Mint tokens functions
async function mintTokenA() {
    try {
        const amount = document.getElementById('mintAmountA').value;
       if (!amount || amount <= 0) {
           markError(mintAInvalidMsg,"Invalid amount !")
           console.error('Cantidad no válida');
            return; 
        }

        //Convert the quantity to decimal units
        const amountInUnits = ethers.utils.parseUnits(amount.toString(), 18);

        //Call the contract to mint TokenA
        const tx = await tokenAContract.mint(await signer.getAddress(), amountInUnits);
        console.log('Minting de TokenA iniciado: ', tx.hash);
        
       //Wait for transaction to be confirmed
        await tx.wait();
        console.log('Minting de TokenA exitoso');
        markValid(mintAValidMsg, "Success !")
    } catch (error) {
        console.error('Error al hacer mint de TokenA:', error);
    }
}

async function mintTokenB() {
    try {
         
        const amount = document.getElementById('mintAmountB').value;
        if (!amount || amount <= 0) {
            markError(mintBInvalidMsg,"Invalid Amount !")
            console.error('Cantidad no válida');
            return; 
        }

        //Convert the quantity to decimal units
        const amountInUnits = ethers.utils.parseUnits(amount.toString(), 18);  // 18 decimales

        //Call the contract to mint TokenB
        const tx = await tokenBContract.mint(await signer.getAddress(), amountInUnits);
        console.log('Minting de TokenB iniciado: ', tx.hash);
       
      //Wait for transaction to be confirmed
        await tx.wait();
        console.log('Minting de TokenB exitoso');
        markValid(mintBValidMsg, "Succes !")
    } catch (error) {
        console.error('Error al hacer mint de TokenB:', error);
    }
}

//Function to update token balances
async function updateBalances() {
    const address = await signer.getAddress();
    const balanceA = await tokenAContract.balanceOf(address);
    const balanceB = await tokenBContract.balanceOf(address);

    balanceTokenA.innerText = `TokenA Balance: ${ethers.utils.formatUnits(balanceA, 18)}`;
    balanceTokenB.innerText = `TokenB Balance: ${ethers.utils.formatUnits(balanceB, 18)}`;
}

//Function to approve tokens (TokenA or TokenB)
async function approveTokens() {
    const amount = document.getElementById("amountToApprove").value; // Monto a aprobar
    const tokenType = document.getElementById("tokenSelect").value; // Tipo de token seleccionado (TokenA o TokenB)

    if (!amount || amount <= 0) {
        alert("Please enter a valid amount");
        return;
    }

    try {
        const amountInUnits = ethers.utils.parseUnits(amount.toString(), 18);

        if (tokenType === "TokenA") {
            await tokenAContract.approve(dexAddress, amountInUnits);
            console.log(`Aprobación exitosa de ${amount} TokenA`);
            alert("TokenA Approved !")
        } else if (tokenType === "TokenB") {
            await tokenBContract.approve(dexAddress, amountInUnits);
            console.log(`Aprobación exitosa de ${amount} TokenB`);
            alert("TokenB Approved !")
            
        } else {
            console.error("Tipo de token no válido");
            
        }
    } catch (error) {
        console.error("Error aprobando los tokens:", error);
        alert("Error Approving tokens")
    }
}

//Function to add liquidity
addLiquidityButton.onclick = async () => {
    try {
        //Get user's current balances
        const address = await signer.getAddress();
        const balanceA = await tokenAContract.balanceOf(address);
        const balanceB = await tokenBContract.balanceOf(address);

        //Approve the use of full balances:
        await tokenAContract.approve(dexAddress, balanceA);
        await tokenBContract.approve(dexAddress, balanceB);

        //Add liquidity using current balances
        await dexContract.addLiquidity(balanceA, balanceB);
        alert("Liquidity added !")
        console.log('Liquidez agregada exitosamente');
        updateBalances();
    } catch (error) {
        console.error('Error al agregar liquidez:', error);
        markError(liquidityInvalidMsg, "Error adding liquidity")
    }
};

//Function to remove liquidity
removeLiquidityButton.onclick = async () => {
    try {
        //Retrieve withdrawal amounts from input fields
        const amountA = document.getElementById("amountToRemoveA").value;
        const amountB = document.getElementById("amountToRemoveB").value;

      if (amountA <= 0 || amountB <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        //Convert the quantity to decimal units
        const amountAInUnits = ethers.utils.parseUnits(amountA.toString(), 18);
        const amountBInUnits = ethers.utils.parseUnits(amountB.toString(), 18);

        // Call the removeLiquidity function
        const tx = await dexContract.removeLiquidity(amountAInUnits, amountBInUnits);
        console.log('Remoción de liquidez iniciada: ', tx.hash);
        // wait for the transaction to be confirmed
        await tx.wait();

        console.log('Liquidez removida exitosamente');
        alert("liquidity removed !")

        //Update balances after transaction
        updateBalances();
    } catch (error) {
        console.error('Error al remover liquidez:', error);
        markError(liquidityRmvInvalidMsg,"Error removing liquidity")
    }
};
//Function to swap TokenA for TokenB
swapButton.onclick = async () => {
    const amount = document.getElementById("swapAmountA").value;
    
    console.log(`Monto ingresado para TokenA: ${amount}`);
   
    if (amount <= 0) {
        markError(swapAforBInvalidMsg,"Invalid Amount !")
        console.log("Monto inválido ingresado para TokenA.");
       return;
    }

    try {
        console.log("Aprobando el uso de TokenA...");
        await tokenAContract.approve(dexAddress, ethers.utils.parseUnits(amount, 18));
        console.log(`Aprobación exitosa para ${amount} TokenA`);

        console.log("Intercambiando TokenA por TokenB...");
        await dexContract.swapAforB(ethers.utils.parseUnits(amount, 18));
        console.log("Intercambio exitoso de TokenA por TokenB");
        alert("Swap Succesful !")
    } catch (error) {
        console.error("Error durante el intercambio de TokenA por TokenB:", error);
        markError(swapAforBInvalidMsg,"Invalid Amount !")
 }
   console.log("Actualizando balances...");
    updateBalances();
};

//Function to swap TokenB for TokenA
swapButtonB.onclick = async () => {
    const amountB = document.getElementById("swapAmountB").value;
    console.log(`Monto ingresado para TokenB: ${amountB}`);
    
    if (amountB <= 0) {
        markError(swapBforAInvalidMsg,"Invalid Amount !")
        console.log("Monto inválido ingresado para TokenB.");
        return;
    }
      try {
        console.log("Aprobando el uso de TokenB...");
        await tokenBContract.approve(dexAddress, ethers.utils.parseUnits(amountB, 18));
        console.log(`Aprobación exitosa para ${amountB} TokenB`);

        console.log("Intercambiando TokenB por TokenA...");
        await dexContract.swapBforA(ethers.utils.parseUnits(amountB, 18));
        console.log("Intercambio exitoso de TokenB por TokenA");
        alert("Swap Succesful !")
    } catch (error) {
        console.error("Error durante el intercambio de TokenB por TokenA:", error);
        markError(swapBforAInvalidMsg, "Invalid Amount !")
    }
   console.log("Actualizando balances...");
    updateBalances();
};


// Function to get token prices
getPriceButton.onclick = async () => {
    const priceA = await dexContract.getPrice(tokenAAddress);
    const priceB = await dexContract.getPrice(tokenBAddress);
    document.getElementById("tokenA").innerText = `TokenA Price: ${ethers.utils.formatUnits(priceA, 18)}`;
    document.getElementById("tokenB").innerText = `TokenB Price: ${ethers.utils.formatUnits(priceB, 18)}`;
   
};

//Function to check allowance
async function checkAllowance() {
    try {
        const ownerAddress = await signer.getAddress();
        const allowanceA = await tokenAContract.allowance(ownerAddress, dexAddress);
        const allowanceB = await tokenBContract.allowance(ownerAddress, dexAddress);

        console.log("Allowance actual de TokenA:", ethers.utils.formatUnits(allowanceA, 18));
        console.log("Allowance actual de TokenB:", ethers.utils.formatUnits(allowanceB, 18));
    } catch (error) {
        console.error("Error al obtener el allowance:", error);
    }
}
/*******************************************************************************/
//Functions to manage messages
function markError(label, message) {
    label.textContent = message;
    label.style.color = "red";
}

function markValid(label, message){
    label.textContent = message;
    label.style.color ="green";
}

