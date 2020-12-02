// SPDX-License-Identifier: MIT

pragma solidity >=0.5.16;

import { MerkleProof } from "./MerkleProof.sol";

contract MerkleProofWrapper {

    bytes32 private _setLeaf;

    function verify(bytes32[] memory proof, bytes32 root, bytes32 leaf) public returns (bool) {
        bool result = MerkleProof.verify(proof, root, leaf);
        _setLeaf = leaf;
        return result;
    }
}
