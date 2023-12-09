import { ethers } from "ethers-v5"

const factoryAddress = "0x28a70cD40b706f2EE2F959ab8d83Bf86BcF57716"; // Your deployed factory contract address
const leadingZeroes = 3; // Number of leading zeroes desired in the address
const bytecode =
  "60c060405234801562000010575f80fd5b5060405162001a4738038062001a478339818101604052810190620000369190620001ac565b8173ffffffffffffffffffffffffffffffffffffffff1660808173ffffffffffffffffffffffffffffffffffffffff16815250508073ffffffffffffffffffffffffffffffffffffffff1660a08173ffffffffffffffffffffffffffffffffffffffff16815250508073ffffffffffffffffffffffffffffffffffffffff1663095ea7b3837fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6040518363ffffffff1660e01b8152600401620000fb9291906200021c565b6020604051808303815f875af115801562000118573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906200013e919062000281565b505050620002b1565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f62000176826200014b565b9050919050565b62000188816200016a565b811462000193575f80fd5b50565b5f81519050620001a6816200017d565b92915050565b5f8060408385031215620001c557620001c462000147565b5b5f620001d48582860162000196565b9250506020620001e78582860162000196565b9150509250929050565b620001fc816200016a565b82525050565b5f819050919050565b620002168162000202565b82525050565b5f604082019050620002315f830185620001f1565b6200024060208301846200020b565b9392505050565b5f8115159050919050565b6200025d8162000247565b811462000268575f80fd5b50565b5f815190506200027b8162000252565b92915050565b5f6020828403121562000299576200029862000147565b5b5f620002a8848285016200026b565b91505092915050565b60805160a051611751620002f65f395f8181610533015261057301525f818161010401528181610132015281816102240152818161032d015261048e01526117515ff3fe60806040526004361061003e575f3560e01c80630de229841461004257806320487ded1461006c57806396f4e9f9146100a8578063d8765a64146100d8575b5f80fd5b34801561004d575f80fd5b50610056610102565b6040516100639190610b29565b60405180910390f35b348015610077575f80fd5b50610092600480360381019061008d9190610bb2565b610126565b60405161009f9190610c24565b60405180910390f35b6100c260048036038101906100bd9190610bb2565b6101d2565b6040516100cf9190610c55565b60405180910390f35b3480156100e3575f80fd5b506100ec610531565b6040516100f99190610c8e565b60405180910390f35b7f000000000000000000000000000000000000000000000000000000000000000081565b5f61013082610555565b7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166320487ded84846040518363ffffffff1660e01b815260040161018b929190611014565b602060405180830381865afa1580156101a6573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906101ca9190611056565b905092915050565b5f6101dc82610555565b5f73ffffffffffffffffffffffffffffffffffffffff168260600160208101906102069190611081565b73ffffffffffffffffffffffffffffffffffffffff16146103ad575f7f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166320487ded85856040518363ffffffff1660e01b815260040161027d929190611014565b602060405180830381865afa158015610298573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906102bc9190611056565b90506102fd3330838660600160208101906102d79190611081565b73ffffffffffffffffffffffffffffffffffffffff1661079c909392919063ffffffff16565b8260600160208101906103109190611081565b73ffffffffffffffffffffffffffffffffffffffff1663095ea7b37f0000000000000000000000000000000000000000000000000000000000000000836040518363ffffffff1660e01b815260040161036a9291906110ac565b6020604051808303815f875af1158015610386573d5f803e3d5ffd5b505050506040513d601f19601f820116820180604052508101906103aa9190611108565b50505b8180604001906103bd919061113f565b5f8181106103ce576103cd6111a1565b5b9050604002015f0160208101906103e59190611081565b73ffffffffffffffffffffffffffffffffffffffff166323b872dd3330858060400190610412919061113f565b5f818110610423576104226111a1565b5b905060400201602001356040518463ffffffff1660e01b815260040161044b939291906111ce565b6020604051808303815f875af1158015610467573d5f803e3d5ffd5b505050506040513d601f19601f8201168201806040525081019061048b9190611108565b507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff166396f4e9f93485856040518463ffffffff1660e01b81526004016104e8929190611014565b60206040518083038185885af1158015610504573d5f803e3d5ffd5b50505050506040513d601f19601f82011682018060405250810190610529919061122d565b905092915050565b7f000000000000000000000000000000000000000000000000000000000000000081565b6001818060400190610567919061113f565b90501415806105f957507f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff168180604001906105b8919061113f565b5f8181106105c9576105c86111a1565b5b9050604002015f0160208101906105e09190611081565b73ffffffffffffffffffffffffffffffffffffffff1614155b15610630576040517fc1ab6dc100000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f8180602001906106419190611258565b9050111561067b576040517f27eb6f2d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f81806080019061068c9190611258565b905014806106f957506397a657c960e01b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19168180608001906106cc9190611258565b906106d791906112fb565b7bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614155b15610730576040517f6633e5f600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b5f8180608001906107419190611258565b600490809261075293929190611361565b81019061075f9190611478565b5f015114610799576040517f6633e5f600000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b50565b61081f846323b872dd60e01b8585856040516024016107bd939291906111ce565b604051602081830303815290604052907bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610825565b50505050565b5f610886826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c65648152508573ffffffffffffffffffffffffffffffffffffffff166108ea9092919063ffffffff16565b90505f815111156108e557808060200190518101906108a59190611108565b6108e4576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108db90611523565b60405180910390fd5b5b505050565b60606108f884845f85610901565b90509392505050565b606082471015610946576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161093d906115b1565b60405180910390fd5b5f808673ffffffffffffffffffffffffffffffffffffffff16858760405161096e919061163b565b5f6040518083038185875af1925050503d805f81146109a8576040519150601f19603f3d011682016040523d82523d5f602084013e6109ad565b606091505b50915091506109be878383876109ca565b92505050949350505050565b60608315610a2b575f835103610a23576109e385610a3e565b610a22576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a199061169b565b60405180910390fd5b5b829050610a36565b610a358383610a60565b5b949350505050565b5f808273ffffffffffffffffffffffffffffffffffffffff163b119050919050565b5f82511115610a725781518083602001fd5b806040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610aa691906116fb565b60405180910390fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f819050919050565b5f610af1610aec610ae784610aaf565b610ace565b610aaf565b9050919050565b5f610b0282610ad7565b9050919050565b5f610b1382610af8565b9050919050565b610b2381610b09565b82525050565b5f602082019050610b3c5f830184610b1a565b92915050565b5f604051905090565b5f80fd5b5f80fd5b5f67ffffffffffffffff82169050919050565b610b6f81610b53565b8114610b79575f80fd5b50565b5f81359050610b8a81610b66565b92915050565b5f80fd5b5f60a08284031215610ba957610ba8610b90565b5b81905092915050565b5f8060408385031215610bc857610bc7610b4b565b5b5f610bd585828601610b7c565b925050602083013567ffffffffffffffff811115610bf657610bf5610b4f565b5b610c0285828601610b94565b9150509250929050565b5f819050919050565b610c1e81610c0c565b82525050565b5f602082019050610c375f830184610c15565b92915050565b5f819050919050565b610c4f81610c3d565b82525050565b5f602082019050610c685f830184610c46565b92915050565b5f610c7882610aaf565b9050919050565b610c8881610c6e565b82525050565b5f602082019050610ca15f830184610c7f565b92915050565b610cb081610b53565b82525050565b5f80fd5b5f80fd5b5f80fd5b5f8083356001602003843603038112610cde57610cdd610cbe565b5b83810192508235915060208301925067ffffffffffffffff821115610d0657610d05610cb6565b5b600182023603831315610d1c57610d1b610cba565b5b509250929050565b5f82825260208201905092915050565b828183375f83830152505050565b5f601f19601f8301169050919050565b5f610d5d8385610d24565b9350610d6a838584610d34565b610d7383610d42565b840190509392505050565b5f8083356001602003843603038112610d9a57610d99610cbe565b5b83810192508235915060208301925067ffffffffffffffff821115610dc257610dc1610cb6565b5b604082023603831315610dd857610dd7610cba565b5b509250929050565b5f82825260208201905092915050565b5f819050919050565b610e0281610c6e565b8114610e0c575f80fd5b50565b5f81359050610e1d81610df9565b92915050565b5f610e316020840184610e0f565b905092915050565b610e4281610c6e565b82525050565b610e5181610c0c565b8114610e5b575f80fd5b50565b5f81359050610e6c81610e48565b92915050565b5f610e806020840184610e5e565b905092915050565b610e9181610c0c565b82525050565b60408201610ea75f830183610e23565b610eb35f850182610e39565b50610ec16020830183610e72565b610ece6020850182610e88565b50505050565b5f610edf8383610e97565b60408301905092915050565b5f82905092915050565b5f604082019050919050565b5f610f0c8385610de0565b9350610f1782610df0565b805f5b85811015610f4f57610f2c8284610eeb565b610f368882610ed4565b9750610f4183610ef5565b925050600181019050610f1a565b5085925050509392505050565b5f60a08301610f6d5f840184610cc2565b8583035f870152610f7f838284610d52565b92505050610f906020840184610cc2565b8583036020870152610fa3838284610d52565b92505050610fb46040840184610d7e565b8583036040870152610fc7838284610f01565b92505050610fd86060840184610e23565b610fe56060860182610e39565b50610ff36080840184610cc2565b8583036080870152611006838284610d52565b925050508091505092915050565b5f6040820190506110275f830185610ca7565b81810360208301526110398184610f5c565b90509392505050565b5f8151905061105081610e48565b92915050565b5f6020828403121561106b5761106a610b4b565b5b5f61107884828501611042565b91505092915050565b5f6020828403121561109657611095610b4b565b5b5f6110a384828501610e0f565b91505092915050565b5f6040820190506110bf5f830185610c7f565b6110cc6020830184610c15565b9392505050565b5f8115159050919050565b6110e7816110d3565b81146110f1575f80fd5b50565b5f81519050611102816110de565b92915050565b5f6020828403121561111d5761111c610b4b565b5b5f61112a848285016110f4565b91505092915050565b5f80fd5b5f80fd5b5f80fd5b5f808335600160200384360303811261115b5761115a611133565b5b80840192508235915067ffffffffffffffff82111561117d5761117c611137565b5b6020830192506040820236038313156111995761119861113b565b5b509250929050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52603260045260245ffd5b5f6060820190506111e15f830186610c7f565b6111ee6020830185610c7f565b6111fb6040830184610c15565b949350505050565b61120c81610c3d565b8114611216575f80fd5b50565b5f8151905061122781611203565b92915050565b5f6020828403121561124257611241610b4b565b5b5f61124f84828501611219565b91505092915050565b5f808335600160200384360303811261127457611273611133565b5b80840192508235915067ffffffffffffffff82111561129657611295611137565b5b6020830192506001820236038313156112b2576112b161113b565b5b509250929050565b5f82905092915050565b5f7fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b5f82821b905092915050565b5f61130683836112ba565b8261131181356112c4565b925060048210156113515761134c7fffffffff00000000000000000000000000000000000000000000000000000000836004036008026112ef565b831692505b505092915050565b5f80fd5b5f80fd5b5f808585111561137457611373611359565b5b838611156113855761138461135d565b5b6001850283019150848603905094509492505050565b5f80fd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6113d582610d42565b810181811067ffffffffffffffff821117156113f4576113f361139f565b5b80604052505050565b5f611406610b42565b905061141282826113cc565b919050565b5f81359050611425816110de565b92915050565b5f604082840312156114405761143f61139b565b5b61144a60406113fd565b90505f61145984828501610e5e565b5f83015250602061146c84828501611417565b60208301525092915050565b5f6040828403121561148d5761148c610b4b565b5b5f61149a8482850161142b565b91505092915050565b5f82825260208201905092915050565b7f5361666545524332303a204552433230206f7065726174696f6e20646964206e5f8201527f6f74207375636365656400000000000000000000000000000000000000000000602082015250565b5f61150d602a836114a3565b9150611518826114b3565b604082019050919050565b5f6020820190508181035f83015261153a81611501565b9050919050565b7f416464726573733a20696e73756666696369656e742062616c616e636520666f5f8201527f722063616c6c0000000000000000000000000000000000000000000000000000602082015250565b5f61159b6026836114a3565b91506115a682611541565b604082019050919050565b5f6020820190508181035f8301526115c88161158f565b9050919050565b5f81519050919050565b5f81905092915050565b5f5b838110156116005780820151818401526020810190506115e5565b5f8484015250505050565b5f611615826115cf565b61161f81856115d9565b935061162f8185602086016115e3565b80840191505092915050565b5f611646828461160b565b915081905092915050565b7f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000005f82015250565b5f611685601d836114a3565b915061169082611651565b602082019050919050565b5f6020820190508181035f8301526116b281611679565b9050919050565b5f81519050919050565b5f6116cd826116b9565b6116d781856114a3565b93506116e78185602086016115e3565b6116f081610d42565b840191505092915050565b5f6020820190508181035f83015261171381846116c3565b90509291505056fea26469706673582212201490c798c18299c241d56af89aebc0ee524b0fdaeeed4651fd1adb43cd55cd8e64736f6c63430008160033"; // Your bytecode
const msgSender = "0xCf7be84148Db4Ff426f57e229bAc513ba656894c";

export const encoder = (types: any, values: any) => {
    const abiCoder = ethers.utils.defaultAbiCoder;
    const encodedParams = abiCoder.encode(types, values);
    return encodedParams.slice(2);
};

export const create2Address = (factoryAddress: any, saltHex: any, initCode: any) => {
    const create2Addr = ethers.utils.getCreate2Address(factoryAddress, saltHex, ethers.utils.keccak256(initCode));
    return create2Addr;
}
 
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const createDeterministicContractV2 = async (_factoryAddress: string, _bytecode: string, _msgSender: string, _zeroesThreshold:number, _preferLeadingZeroes = true): Promise<string> => {
    console.time("DeterministicContractCreation");
    let bestSalt = '';
    let bestZeroesCount = 0;
    let i = 0;

    while (true) {
        // Generate 12 random bytes to complete 32 bytes when combined with the sender's address
        const saltBytes = ethers.utils.randomBytes(12);
        const msgSenderBytes = ethers.utils.arrayify(_msgSender);
        const fullSaltBytes = ethers.utils.concat([msgSenderBytes, saltBytes]);
        const fullSaltHex = ethers.utils.hexlify(fullSaltBytes);

        // Ensuring the salt is exactly 32 bytes long
        if (fullSaltBytes.length !== 32) {
            throw new Error("Salt must be exactly 32 bytes");
        }

        const initCodeHash = ethers.utils.keccak256(_bytecode);
        const addr = ethers.utils.getCreate2Address(_factoryAddress, fullSaltHex, initCodeHash);

        let zeroesCount = (addr.match(/0/g) || []).length;

        if (_preferLeadingZeroes) {
            const leadingZeroesMatch = addr.slice(2).match(/^0*/);
            const leadingZeroesCount = leadingZeroesMatch ? leadingZeroesMatch[0].length : 0;
            if (leadingZeroesCount > bestZeroesCount) {
                bestSalt = fullSaltHex;
                bestZeroesCount = leadingZeroesCount;
            }
        } else if (zeroesCount > bestZeroesCount) {
            bestSalt = fullSaltHex;
            bestZeroesCount = zeroesCount;
        }

        if (bestZeroesCount >= _zeroesThreshold) {
            console.log(`Address with ${bestZeroesCount} zeroes (including leading) found: ${addr}`);
            console.log(`Salt: ${bestSalt}`);
            console.timeEnd("DeterministicContractCreation");
            return bestSalt;
        }

        i++;
        if (i % 1000 === 0) console.log(`Attempts: ${i}`);
    }
};


const createDeterministicContract = async (_factoryAddress: string, _bytecode: string, _msgSender: string, _leadingZeros: number): Promise<string> => {
    console.time();
    let salt;
    let i = 0;
    while (!salt) {
      const saltBytes = ethers.utils.randomBytes(12);
      const msgSenderBytes = ethers.utils.arrayify(_msgSender);
      const fullSaltBytes = ethers.utils.concat([msgSenderBytes, saltBytes]);
      const saltHex = saltBytes.toString();
      const bytecodeBytes = ethers.utils.arrayify(_bytecode);
      const initCodeHash = ethers.utils.keccak256(bytecodeBytes);
      const addr = ethers.utils.getCreate2Address(
        _factoryAddress,
        fullSaltBytes,
        initCodeHash
      );
      console.log("adddr", addr, i);
      if (addr.slice(2, 2 + _leadingZeros) === "0".repeat(_leadingZeros)) {
        salt = ethers.utils.hexlify(fullSaltBytes);
        console.log(`Salt: ${salt}, ${saltBytes}, ${saltHex} Address: ${addr}`);
        console.timeEnd();
        return salt;
        // break;
      }
      i++;
    }
  
    process.removeAllListeners();
    return salt
  };
  
export default createDeterministicContract;