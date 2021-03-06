pragma solidity ^0.5.0;

// Imports
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721Full.sol";
import "../node_modules/@openzeppelin/contracts/drafts/Counters.sol";

contract Contract is ERC721Full {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    address private owner;

    mapping(uint256 => uint256) public flagPrice;
    mapping(uint256 => bool) public flagForSale;

    event PunkMinted(uint256 indexed tokenId, address indexed holder);
    event FlagBought(address indexed seller, address indexed buyer, uint256 indexed _tokenId);
    event FlagForSale(uint256 indexed _tokenId, uint256 price);

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
        emit PunkMinted(newItemId, holder);

        return newItemId;
    }

    function transferFlag(address from, address to, uint256 _tokenId) public {
        require(msg.sender == ownerOf(_tokenId), 'Function caller must be flag owner');
        transferFrom(from, to, _tokenId);
    }


    function setForSale(uint256 _tokenId, uint256 _tokenPrice) external {
        address flagOwner = ownerOf(_tokenId);

        require(flagOwner == msg.sender, 'Only owner can sell flag');
        require(flagOwner != address(0), 'Token must exist');

        flagForSale[_tokenId] = true;
        flagPrice[_tokenId] = _tokenPrice;
        emit FlagForSale(_tokenId, _tokenPrice);
    }

    function buyFlag(uint256 _tokenId) external payable {
        address buyer = msg.sender;
        address seller = ownerOf(_tokenId);
        uint payedPrice = msg.value;
        uint256 salePrice = flagPrice[_tokenId];
        bool isForSale = flagForSale[_tokenId];

        // require(isValidToken(_tokenId), 'Token must be valid');
        // require(getApproved(_tokenId) == address(this));
        require(ownerOf(_tokenId) != buyer, 'Seller cannot buy own flag');
        require (payedPrice >= salePrice, 'Buyer must pay enough');
        require(isForSale == true, 'Flag must be for sale');

        // pay the seller
        _transferFrom(seller, buyer, _tokenId);
        // remove token from tokensForSale
        flagForSale[_tokenId] = false;
        emit FlagBought(seller, buyer, _tokenId);
    }

    function getPriceFlag(uint256 _tokenId) public view returns(uint256) {
        return flagPrice[_tokenId];
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