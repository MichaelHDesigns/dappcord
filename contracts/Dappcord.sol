// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Dappcord is ERC721 {
    uint256 public totalSupply;
    uint256 public totalChannels;
    address public owner;

    struct Channel {
        uint256 id;
        string name;
        uint256 cost;
    }
    
     struct Server {
        string name;
        uint256 price;
    }
    
    mapping(address => Server[]) public servers;

    event ServerCreated(address indexed owner, string name, uint256 price);

    function createServer(string memory name, uint256 price) public {
        servers[msg.sender].push(Server(name, price));
        emit ServerCreated(msg.sender, name, price);
    }

    function createServerWithPayment(string memory name) public payable {
        require(msg.value == 5 ether, "Please pay 5 ether to create a server.");
        createServer(name, msg.value);
    }

    mapping(uint256 => Channel) public channels;
    mapping(uint256 => mapping(address => bool)) public hasJoined;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor(string memory _name, string memory _symbol)
        ERC721(_name, _symbol)
    {
        owner = msg.sender;
    }

    function createChannel(string memory _name, uint256 _cost)
        public
        onlyOwner
    {
        totalChannels++;
        channels[totalChannels] = Channel(totalChannels, _name, _cost);
    }

    function mint(uint256 _id) public payable {
        require(_id != 0);
        require(_id <= totalChannels);
        require(hasJoined[_id][msg.sender] == false);
        require(msg.value >= channels[_id].cost);

        hasJoined[_id][msg.sender] = true;
        totalSupply++;

        _safeMint(msg.sender, totalSupply);
    }

    function getChannel(uint256 _id) public view returns (Channel memory) {
        return channels[_id];
    }

    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }
}
