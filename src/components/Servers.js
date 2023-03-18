import ethereum from '../assets/ethereum.svg';
import plus from '../assets/plus.svg';
import search from '../assets/search.svg';

import { useState } from "react";
import { ethers } from "ethers";
import DappcordServer from "../abis/Dappcord.json";

function Servers({ account, contract }) {
  const [serverName, setServerName] = useState("");
  const [serverPrice, setServerPrice] = useState("");

  async function handleCreateServer() {
    const price = ethers.utils.parseEther(serverPrice);
    const tx = await contract.createServer(serverName, { value: price });
    await tx.wait();
    setServerName("");
    setServerPrice("");
  }

  return (
    <div>
      <h2>Create Server</h2>
      <form onSubmit={handleCreateServer}>
        <label>
          Server Name:
          <input
            type="text"
            value={serverName}
            onChange={(e) => setServerName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Price (in ethers):
          <input
            type="text"
            value={serverPrice}
            onChange={(e) => setServerPrice(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create Server</button>
      </form>
    </div>
  );
}

export default Servers;
