import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { FiTrendingUp } from 'react-icons/fi';
import './SpotTradingPage.css';

const SpotTradingPage = () => {
  const [selectedPair, setSelectedPair] = useState(null);
  const [orderType, setOrderType] = useState('limit'); // limit or market
  const [side, setSide] = useState('buy'); // buy or sell
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [showPnlModal, setShowPnlModal] = useState(false);
  
  // Available coins from market
  const [coins] = useState([
    { symbol: 'BTC/USDT', name: 'Bitcoin', price: 45820, change: 2.5, volume: '1.2B', walletBalance: 0.5 },
    { symbol: 'ETH/USDT', name: 'Ethereum', price: 2000, change: -1.2, volume: '856M', walletBalance: 2.5 },
    { symbol: 'BNB/USDT', name: 'Binance Coin', price: 300, change: 3.8, volume: '450M', walletBalance: 10 },
    { symbol: 'SOL/USDT', name: 'Solana', price: 120, change: 5.2, volume: '320M', walletBalance: 5 },
    { symbol: 'XRP/USDT', name: 'Ripple', price: 0.52, change: -0.8, volume: '280M', walletBalance: 1000 },
    { symbol: 'ADA/USDT', name: 'Cardano', price: 0.45, change: 1.5, volume: '150M', walletBalance: 500 },
  ]);
  const [usdtBalance] = useState(10000); // USDT wallet balance
  
  // PnL Stats
  const [pnlStats] = useState({
    totalPnL: 1250.50,
    totalPnLPercent: 12.5,
    todayPnL: 185.30,
    todayPnLPercent: 2.3,
    winRate: 68.5,
    totalTrades: 145,
    profitTrades: 99,
    lossTrades: 46,
  });

  // Mock data
  const chartData = [
    { time: '00:00', price: 45000 },
    { time: '04:00', price: 45200 },
    { time: '08:00', price: 44800 },
    { time: '12:00', price: 45500 },
    { time: '16:00', price: 45300 },
    { time: '20:00', price: 45800 },
  ];

  const orderBook = {
    asks: [
      { price: 45850, amount: 0.5, total: 22925 },
      { price: 45840, amount: 1.2, total: 55008 },
      { price: 45830, amount: 0.8, total: 36664 },
    ],
    bids: [
      { price: 45800, amount: 0.7, total: 32060 },
      { price: 45790, amount: 1.5, total: 68685 },
      { price: 45780, amount: 2.3, total: 105294 },
    ],
  };

  const recentTrades = [
    { price: 45820, amount: 0.123, time: '10:35:22', type: 'buy' },
    { price: 45810, amount: 0.456, time: '10:35:18', type: 'sell' },
    { price: 45830, amount: 0.789, time: '10:35:10', type: 'buy' },
  ];

  const handlePlaceOrder = () => {
    // TODO: Implement order placement
    console.log('Place order:', { orderType, side, price, amount });
  };

  return (
    <div className="spot-trading-page">
      <div className="trading-header">
        <h1>Giao dịch Spot</h1>
        <p className="text-secondary">Chọn coin để bắt đầu giao dịch</p>
      </div>

      {/* Coins List */}
      <div className="coins-section glass-card">
        <h3>Danh sách Coins</h3>
        <div className="coins-grid">
          {coins.map((coin, index) => (
            <div
              key={index}
              className={`coin-card ${selectedPair === coin.symbol ? 'active' : ''}`}
              onClick={() => setSelectedPair(coin.symbol)}
            >
              <div className="coin-header">
                <span className="coin-symbol">{coin.symbol}</span>
                <span className={`coin-change ${coin.change >= 0 ? 'positive' : 'negative'}`}>
                  {coin.change >= 0 ? '+' : ''}{coin.change}%
                </span>
              </div>
              <div className="coin-price">${coin.price.toLocaleString()}</div>
              <div className="coin-volume">Vol: {coin.volume}</div>
            </div>
          ))}
        </div>
      </div>

      {!selectedPair ? (
        <div className="empty-selection glass-card">
          <h2>📊 Chọn coin để xem biểu đồ và giao dịch</h2>
          <p>Vui lòng chọn một coin từ danh sách bên trên</p>
        </div>
      ) : (
        <>
          <div className="trading-pair-header">
            <div className="pair-info">
              <h2>{selectedPair}</h2>
              <div className="pair-stats">
                <span className="current-price">
                  ${coins.find(c => c.symbol === selectedPair)?.price.toLocaleString()}
                </span>
                <span className={`price-change ${coins.find(c => c.symbol === selectedPair)?.change >= 0 ? 'text-success' : 'text-danger'}`}>
                  {coins.find(c => c.symbol === selectedPair)?.change >= 0 ? '+' : ''}
                  {coins.find(c => c.symbol === selectedPair)?.change}%
                </span>
              </div>
            </div>
          </div>

          <div className="trading-layout">
        <div className="chart-section">
          <div className="chart-header">
            <div className="chart-tabs">
              <button className="chart-tab active">Biểu đồ</button>
              <button className="chart-tab">Độ sâu</button>
            </div>
            <div className="timeframe-buttons">
              <button className="timeframe-btn">1m</button>
              <button className="timeframe-btn">5m</button>
              <button className="timeframe-btn active">15m</button>
              <button className="timeframe-btn">1h</button>
              <button className="timeframe-btn">4h</button>
              <button className="timeframe-btn">1d</button>
            </div>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <XAxis dataKey="time" stroke="#a7b1bc" />
                <YAxis stroke="#a7b1bc" domain={['dataMin - 500', 'dataMax + 500']} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e2533',
                    border: '1px solid #2a2e39',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#0052ff"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="trades-section">
            <h4>Giao dịch gần đây</h4>
            <div className="trades-list">
              <div className="trades-header">
                <span>Giá (USDT)</span>
                <span>Số lượng (BTC)</span>
                <span>Thời gian</span>
              </div>
              {recentTrades.map((trade, index) => (
                <div key={index} className="trade-item">
                  <span className={trade.type === 'buy' ? 'text-success' : 'text-danger'}>
                    {trade.price.toLocaleString()}
                  </span>
                  <span>{trade.amount}</span>
                  <span className="text-secondary">{trade.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="orderbook-section">
          <h4>Sổ lệnh</h4>
          <div className="orderbook">
            <div className="orderbook-header">
              <span>Giá (USDT)</span>
              <span>Số lượng (BTC)</span>
              <span>Tổng (USDT)</span>
            </div>
            <div className="asks">
              {orderBook.asks.map((order, index) => (
                <div key={index} className="order-item ask">
                  <span className="text-danger">{order.price.toLocaleString()}</span>
                  <span>{order.amount}</span>
                  <span>{order.total.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="current-price-divider">
              <span className="text-success">45,820.00</span>
              <span className="text-secondary">≈ $45,820.00</span>
            </div>
            <div className="bids">
              {orderBook.bids.map((order, index) => (
                <div key={index} className="order-item bid">
                  <span className="text-success">{order.price.toLocaleString()}</span>
                  <span>{order.amount}</span>
                  <span>{order.total.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="order-panel">
          <div className="order-tabs">
            <button
              className={`order-tab ${side === 'buy' ? 'active buy' : ''}`}
              onClick={() => setSide('buy')}
            >
              Mua
            </button>
            <button
              className={`order-tab ${side === 'sell' ? 'active sell' : ''}`}
              onClick={() => setSide('sell')}
            >
              Bán
            </button>
          </div>

          <div className="order-type-selector">
            <button
              className={`type-btn ${orderType === 'limit' ? 'active' : ''}`}
              onClick={() => setOrderType('limit')}
            >
              Limit
            </button>
            <button
              className={`type-btn ${orderType === 'market' ? 'active' : ''}`}
              onClick={() => setOrderType('market')}
            >
              Market
            </button>
          </div>

          <div className="balance-info">
            <span className="text-secondary">Số dư khả dụng:</span>
            <span>
              {side === 'buy' 
                ? `${usdtBalance.toLocaleString()} USDT` 
                : `${coins.find(c => c.symbol === selectedPair)?.walletBalance || 0} ${selectedPair?.split('/')[0]}`
              }
            </span>
          </div>

          <div className="order-form">
            {orderType === 'limit' && (
              <div className="form-group">
                <label>Giá</label>
                <div className="input-wrapper">
                  <input
                    type="number"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <span className="input-suffix">USDT</span>
                </div>
              </div>
            )}

            <div className="form-group">
              <label>Số lượng</label>
              <div className="input-wrapper">
                <input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <span className="input-suffix">BTC</span>
              </div>
            </div>

            <div className="amount-slider">
              <input type="range" min="0" max="100" step="25" />
              <div className="slider-labels">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>

            <div className="order-total">
              <span className="text-secondary">Tổng:</span>
              <span className="total-value">0.00 USDT</span>
            </div>

            <button
              className={`btn btn-block ${side === 'buy' ? 'btn-success' : 'btn-danger'}`}
              onClick={handlePlaceOrder}
            >
              {side === 'buy' ? 'Mua' : 'Bán'} BTC
            </button>
          </div>
        </div>
      </div>

      <div className="open-orders-section">
        <div className="section-header">
          <h4>Lệnh mở</h4>
          <button className="btn-text">Hủy tất cả</button>
        </div>
        <div className="orders-table">
          <div className="empty-state">
            <p>Không có lệnh nào đang mở</p>
          </div>
        </div>
      </div>

      {/* PnL Statistics Button */}
      <div className="pnl-button-section">
        <button className="btn-pnl btn-gradient" onClick={() => setShowPnlModal(true)}>
          <FiTrendingUp /> Xem Thống Kê PnL
        </button>
      </div>
        </>
      )}

      {/* PnL Modal */}
      {showPnlModal && (
        <div className="modal-overlay" onClick={() => setShowPnlModal(false)}>
          <div className="modal-content pnl-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Thống Kê PnL - Giao Dịch Spot</h2>
              <button className="modal-close" onClick={() => setShowPnlModal(false)}>×</button>
            </div>
            <div className="pnl-modal-body">
              <div className="pnl-grid">
                <div className="pnl-card glass-card">
                  <div className="pnl-label">Tổng PnL</div>
                  <div className={`pnl-value ${pnlStats.totalPnL >= 0 ? 'positive' : 'negative'}`}>
                    {pnlStats.totalPnL >= 0 ? '+' : ''}{pnlStats.totalPnL.toFixed(2)} USDT
                    <span className="pnl-percent">({pnlStats.totalPnLPercent >= 0 ? '+' : ''}{pnlStats.totalPnLPercent}%)</span>
                  </div>
                </div>
                <div className="pnl-card glass-card">
                  <div className="pnl-label">PnL Hôm Nay</div>
                  <div className={`pnl-value ${pnlStats.todayPnL >= 0 ? 'positive' : 'negative'}`}>
                    {pnlStats.todayPnL >= 0 ? '+' : ''}{pnlStats.todayPnL.toFixed(2)} USDT
                    <span className="pnl-percent">({pnlStats.todayPnLPercent >= 0 ? '+' : ''}{pnlStats.todayPnLPercent}%)</span>
                  </div>
                </div>
                <div className="pnl-card glass-card">
                  <div className="pnl-label">Tỷ Lệ Thắng</div>
                  <div className="pnl-value">{pnlStats.winRate}%</div>
                </div>
                <div className="pnl-card glass-card">
                  <div className="pnl-label">Tổng Giao Dịch</div>
                  <div className="pnl-value">{pnlStats.totalTrades}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotTradingPage;
