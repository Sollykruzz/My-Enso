let provider;
let signer;

document.getElementById('connectWallet').addEventListener('click', async () => {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    const address = await signer.getAddress();
    document.getElementById('walletAddress').innerText = `Connected: ${address}`;
  } else {
    alert("Please install MetaMask!");
  }
});

document.getElementById('swapBtn').addEventListener('click', async () => {
  const fromToken = document.getElementById('fromToken').value;
  const toToken = document.getElementById('toToken').value;
  const amount = document.getElementById('amount').value;
  
  document.getElementById('status').innerText = "Preparing swap...";

  // Call Enso API for route
  const response = await fetch("https://api.enso.finance/api/v1/route", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fromToken,
      toToken,
      amount,
      chainId: 1 // Ethereum mainnet
    })
  });

  const data = await response.json();
  console.log(data);

  if (data.route) {
    document.getElementById('status').innerText = "Route found! Executing swap...";
    // Here you would send the transaction using ethers.js
  } else {
    document.getElementById('status').innerText = "No route found!";
  }
});
