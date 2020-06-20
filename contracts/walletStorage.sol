pragma solidity ^0.5.0;

import "./IERC20.sol";

contract walletStorage {
    
    struct Transfer {
        address contract_;
        address to_;
        uint256 amount_;
        bool failed_;
        string hash;
    }

    mapping(address => uint256[]) public transactionIndexesToSender;
    mapping(bytes32 => address) public tokens;
    
    mapping(address => address) public biconomyAddressMappings;
    mapping(address => bool) public biconomyAddressLoggedIn;
    
    IERC20 public ERC20Interface;
    Transfer[] public transactions;
    address public owner;
    
    event TransferSuccessful(address indexed from_, address indexed to_, uint256 amount_);
    event TransferFailed(address indexed from_, address indexed to_, uint256 amount_);
}
