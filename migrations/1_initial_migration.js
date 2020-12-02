const MerkleProofWrapper = artifacts.require("./contracts/MerkleProofWrapper.sol");

const { MerkleTree } = require('../test/helpers/merkleTree.js');
const { keccakFromString, bufferToHex } = require('ethereumjs-util');

module.exports = async (deployer) => {

  await deployer.deploy(MerkleProofWrapper).then(async (a)  => {
    
    const elements = ['10', '210', '310', '410', '11', '211', '311', '411', '12', '212', '312', '412', '13', '213', '313', '413', '14', '214', '314', '414', '15', '215', '315', '415', '61', '261', '361', '461', '71', '271', '371', '471', '19', '219', '319', '419', '20', '220', '320', '420', '21', '221', '321', '421', '22', '222', '322', '422', '23', '223', '323', '423', '24', '224', '324', '424', '25', '225', '325', '425', '26', '226', '326', '426', '27', '227', '327', '427', '28', '228', '328', '428', '29', '229', '329', '429', '30', '230', '330', '430', '31', '231', '331', '431', '32', '232', '332', '432', '33', '233', '333', '433', '34', '234', '334', '434', '35', '235', '335', '435', '36', '236', '336', '436', '37', '237', '337', '437', '38', '238', '338', '438', '39', '239', '339', '439', '40', '240', '340', '440', '41', '241', '341', '441', '42', '242', '342', '442', '43', '243', '343', '443', '44', '244', '344', '444', '45', '245', '345', '445', '46', '246', '346', '446', '47', '247', '347', '447', '48', '248', '348', '448', '49', '249', '349', '449', '50', '250', '350', '450', '51', '251', '351', '451', '52', '252', '352', '452', '53', '253', '353', '453', '54', '254', '354', '454', '55', '255', '355', '455'];
    
    // elements.length = 180
    
    const merkleTree = new MerkleTree(elements);

    const root = merkleTree.getHexRoot();

    // '0x4074d9b5ae9c6f29c149dee7badce0bdc903f87a45e065a4c9fd97caeda4ea2a'

    const proof = merkleTree.getHexProof(elements[0]);

    // [
    //   '0x18cf413bee22b08ac0c7195db4322442dbcd19e34df721debc25af8855e9fdf2',
    //   '0x56b540bc7e0fbc2054386f565b783b32159b14258f0473be954ba0e53198fb51',
    //   '0xc9942e69407f0f0899155dcfeeb12b7ee8c23d72a9204d956ec0a0a63079a76c',
    //   '0xd21eb8a30d9b6e1b2b5000175e8ca522a283dc69213de783a1d28f73204b32c9',
    //   '0xc4e582ccaa47b4745d0a4f451ec463ed2f8acf711b0d01fc0949efa36c2bf4a3',
    //   '0x8398dd146c04466f3bb0bd59688f49df4513977ffa7bfe09d47211ac09b57c32',
    //   '0x73a43b0f557f7b335aa90502b65f674fd89639a081dc4c64a01e32657d77347c',
    //   '0xe37e4fd2f9ac30f93341e8fd72c5111e9956564530a8cc4a168366af70b7d072'
    // ]

    const leaf = bufferToHex(keccakFromString(elements[0]));

    // '0x1a192fabce13988b84994d4296e6cdc418d55e2f1d7f942188d4040b94fc57ac'

    console.log(await a.verify(proof, root, leaf))

    // returns: true
   
  });
  
  
};
