pragma solidity ^0.5.0;

// Imports
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

contract Contract is ERC721Full {
    string[] public flags;
    mapping(string => bool) _flagExists;

    constructor() ERC721Full("Flagnation", "FNT") public {}

    function mint(string memory _flag) public {
        // Require unique flag
        require(!_flagExists[_flag]);

        uint _id = flags.push(_flag);
        _mint(msg.sender, _id);
        _flagExists[_flag] = true;
    }
}