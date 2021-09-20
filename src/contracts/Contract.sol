pragma solidity ^0.5.0;

// Imports
import "../../node_modules/@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "../../node_modules/@openzeppelin/contracts/drafts/Counters.sol";

contract Contract is ERC721Full {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address owner;

    mapping(uint256 => uint256) public flagPrice;
    mapping(uint256 => bool) public flagForSale;

    constructor() ERC721Full("Flagnation", "FNT") public {
        owner = msg.sender;
    }

    function createFlag(address holder, string memory tokenURI) public returns (uint256) {
        require(owner == msg.sender, 'Only owner can mint new flags');
        require(_tokenIds.current() < 10000, 'Only a max of 10,000 tokens are allowed');
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(holder, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function transferFlag(address from, address to, uint256 _tokenId /* bytes memory _data */) public {
        require(msg.sender == ownerOf(_tokenId), 'msg.sender must be flag owner');
        transferFrom(from, to, _tokenId);
    }


    function setForSale(uint256 _tokenId, uint256 _tokenPrice) external {
        address flagOwner = ownerOf(_tokenId);

        require(flagOwner == msg.sender, 'Only owner can sell flag');

        // allowance[_tokenId] = address(this);
        flagForSale[_tokenId] = true;
        // set the sale price etc
        flagPrice[_tokenId] = _tokenPrice;

        emit Approval(flagOwner, address(this), _tokenId);
    }

    function buyFlag(uint256 _tokenId) external payable {
        address buyer = msg.sender;
        uint payedPrice = msg.value;
        uint256 salePrice = flagPrice[_tokenId];
        bool isForSale = flagForSale[_tokenId];

        // require(isValidToken(_tokenId), 'Token must be valid');
        // require(getApproved(_tokenId) == address(this));
        require (payedPrice >= salePrice, 'Buyer must pay enough');
        require(isForSale == true, 'Flag must be for sale');

        // pay the seller
        transferFrom(ownerOf(_tokenId), buyer, _tokenId);
        // remove token from tokensForSale
        flagForSale[_tokenId] = false;
    }

    function getPriceFlag(uint256 _tokenId) public view returns(uint256) {
        return flagPrice[_tokenId];
    }

    function getMsgSender() public view returns(address) {
        return msg.sender;
    }

    function setOwner(address _newOwner) public returns(bool) {
        require(msg.sender == owner, 'Function caller must be owner');
        owner = _newOwner;

        return(true);
    }

    function getOwner() public view returns(address) {
        return owner;
    }
}