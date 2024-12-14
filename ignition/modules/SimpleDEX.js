const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const SimpleDexModule = buildModule("SimpleDexModule", (deployer) => {
  

   const simpleDex = deployer.contract("SimpleDEX", ["Hola"]);

   return { simpleDex };
});

module.exports = SimpleDexModule;