pragma solidity ^0.5.0;

// Imports
import "../../node_modules/@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "../../node_modules/@openzeppelin/contracts/drafts/Counters.sol";

contract Contract is ERC721Full {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721Full("Flagnation", "FNT") public {}

    function createFlag(address holder, string memory tokenURI) public returns (uint256) {
        require(_tokenIds.current() <= 10000, 'Only a max of 10,000 tokens are allowed');
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(holder, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function transferFlag(address from, address to, uint256 tokenId /* bytes memory _data */) public {
        transferFrom(from, to, tokenId);
    }

    function approveFlag(address to, uint256 tokenId) public {
        approve(to, tokenId);
    }

    function burnFlag(uint256 tokenId) public {
        _burn(tokenId);
        _tokenIds.decrement();
    }

    function getMsgSender() public view returns(address) {
        return msg.sender;
    }
}