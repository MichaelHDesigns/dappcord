import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { io } from "socket.io-client";
import Web3 from "web3";

// Components
import Navigation from './components/Navigation'
import Servers from './components/Servers'
import Channels from './components/Channels'
import Messages from './components/Messages'

// ABIs
import Dappcord from './abis/Dappcord.json'

// Config
import config from './config.json';

// Socket
const socket = io('ws://localhost:3030');

function App() {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState(null);
  const [serverName, setServerName] = useState("");
  const [serverPrice, setServerPrice] = useState(0);
  
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)

  const [dappcord, setDappcord] = useState(null)
  const [channels, setChannels] = useState([])

  const [currentChannel, setCurrentChannel] = useState(null)
  const [messages, setMessages] = useState([])

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)

    const network = await provider.getNetwork()
    const dappcord = new ethers.Contract(config[network.chainId].Dappcord.address, Dappcord, provider)
    setDappcord(dappcord)

    const totalChannels = await dappcord.totalChannels()
    const channels = []

    for (var i = 1; i <= totalChannels; i++) {
      const channel = await dappcord.getChannel(i)
      channels.push(channel)
    }

    setChannels(channels)

    window.ethereum.on('accountsChanged', async () => {
      window.location.reload()
    })
  }

  useEffect(() => {
    loadBlockchainData()

    // --> https://socket.io/how-to/use-with-react-hooks

    socket.on("connect", () => {
      socket.emit('get messages')
    })

    socket.on('new message', (messages) => {
      setMessages(messages)
    })

    socket.on('get messages', (messages) => {
      setMessages(messages)
    })

    return () => {
      socket.off('connect')
      socket.off('new message')
      socket.off('get messages')
    }
    
        const initWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          setWeb3(web3);
          const accounts = await web3.eth.getAccounts();
          setAccounts(accounts);
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = Dappcord.networks[networkId];
          const contract = new web3.eth.Contract(
            Dappcord.abi,
            deployedNetwork && deployedNetwork.address
          );
          setContract(contract);
        } catch (error) {
          console.error(error);
        }
      }
    };
    initWeb3();
  }, [])
  
    const handleCreateServer = async () => {
    if (contract) {
      const priceInWei = web3.utils.toWei(serverPrice.toString(), "ether");
      try {
        await contract.methods.createServer(serverName).send({
          from: accounts[0],
          value: priceInWei
        });
        // server created successfully, do something here
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />

      <main>
        <Servers />

        <Channels
          provider={provider}
          account={account}
          dappcord={dappcord}
          channels={channels}
          currentChannel={currentChannel}
          setCurrentChannel={setCurrentChannel}
        />

        <Messages account={account} messages={messages} currentChannel={currentChannel} />
      </main>
    </div>
  );
}

export default App;
