pragma solidity ^0.5.0;

// Imports
import "../../node_modules/@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "../../node_modules/@openzeppelin/contracts/drafts/Counters.sol";

contract Contract is ERC721Full {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721Full("Flagnation", "FNT") public {}

    function createFlag(address holder, string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(holder, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}