import ethereum from '../assets/ethereum.svg';
import plus from '../assets/plus.svg';
import search from '../assets/search.svg';

const Servers = () => {
return (
    <div>
      <h1>Dappcord</h1>
      <div>
        <input
          type="text"
          placeholder="Server Name"
          value={serverName}
          onChange={(e) => setServerName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Server Price in ETH"
          value={serverPrice}
          onChange={(e) => setServerPrice(e.target.value)}
        />
        <button onClick={handleCreateServer}>Create Server</button>
      </div>
    </div>
  );
}

export default Servers;
