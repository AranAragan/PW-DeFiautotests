import { network } from "hardhat";
import { JsonRpcServer } from "hardhat/types";
import {
  HardhatRuntimeEnvironment,
  HardhatUserConfig,
  NetworksUserConfig,
  SolidityUserConfig,
} from "hardhat/types";

export default class hhNetworks {

    constructor() {
      
    }
 
    static async BscNetwork() {       

      const networks: NetworksUserConfig = {
        localhost: {
            url: "http://localhost:8545", 
        },
        
    };
      
       await network.provider.request({
          method: "hardhat_reset",
          params: [
            {
              forking: {
                jsonRpcUrl: 'https://rpc.ankr.com/bsc',
        
              },
            },
          ],
        });
      }



}
