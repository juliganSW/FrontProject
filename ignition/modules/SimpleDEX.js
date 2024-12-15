const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const SimpleDexModule = buildModule("SimpleDexModule", (deployer) => {
  // Define las direcciones de los tokens ERC20
  const tokenAAddress = "0x770193fa62E5dfA680E4bA84FaaD4Aa7D62E05ae"; 
  const tokenBAddress = "0xAb3a59551780Bd648dA54D9763a26214cF54B02d";

  // Despliegue del contrato con los argumentos necesarios
  const simpleDex = deployer.contract("SimpleDEX", [tokenAAddress, tokenBAddress]);

  return { simpleDex };
});

module.exports = SimpleDexModule;
