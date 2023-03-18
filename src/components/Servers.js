import ethereum from '../assets/ethereum.png';
import plus from '../assets/plus.png';
import search from '../assets/search.jpg';

const Servers = () => {
  return (
  <div className="servers">
  <div className="server">
    <a href="https://altcoinchain.org" target="_blank" rel="noopener noreferrer">
      <img src={ethereum} alt="Ethereum Logo" />
    </a>
  </div>
  <div className="server">
    <a href="https://shop.mining.game/" target="_blank" rel="noopener noreferrer">
      <img src={plus} alt="Add Server" />
    </a>
  </div>
  <div className="server">
    <a href="https://michaelh.org/" target="_blank" rel="noopener noreferrer">
      <img src={search} alt="Search Servers" />
    </a>
  </div>
</div>
  );
}

export default Servers;
