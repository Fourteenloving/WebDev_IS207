import React, { useState } from 'react';
import { FiTrendingUp } from 'react-icons/fi';
import './FuturesTradingPage.css';

const FuturesTradingPage = () => {
  const [showPnlModal, setShowPnlModal] = useState(false);
  const [selectedPair, setSelectedPair] = useState(null);
  
  // Available coins from market
  const [coins] = useState([
    { symbol: 'BTC/USDT', name: 'Bitcoin', price: 45820, change: 2.5, volume: '1.2B', walletBalance: 0.5 },
    { symbol: 'ETH/USDT', name: 'Ethereum', price: 2000, change: -1.2, volume: '856M', walletBalance: 2.5 },
    { symbol: 'BNB/USDT', name: 'Binance Coin', price: 300, change: 3.8, volume: '450M', walletBalance: 10 },
    { symbol: 'SOL/USDT', name: 'Solana', price: 120, change: 5.2, volume: '320M', walletBalance: 5 },
    { symbol: 'XRP/USDT', name: 'Ripple', price: 0.52, change: -0.8, volume: '280M', walletBalance: 1000 },
    { symbol: 'ADA/USDT', name: 'Cardano', price: 0.45, change: 1.5, volume: '150M', walletBalance: 500 },
  ]);
  const [usdtBalance] = useState(10000);
  
  // Mock PnL Stats for Futures
  const [pnlStats] = useState({
    totalPnL: 2850.75,
    totalPnLPercent: 28.5,
    todayPnL: 425.50,
    todayPnLPercent: 4.8,
    winRate: 72.3,
    totalTrades: 89,
    profitTrades: 64,
    lossTrades: 25,
    totalVolume: 125000,
    avgLeverage: 10,
  });

  return (
    <div className="futures-trading-page">
      <div className="page-header">
        <h1>Giao dịch Futures</h1>
        <p className="text-secondary">Chọn coin để bắt đầu giao dịch với đòn bẩy</p>
      </div>

      {/* Coins List */}
      <div className="coins-section glass-card">
        <h3>Danh sách Futures</h3>
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
          <h2>📊 Chọn coin để xem biểu đồ và giao dịch Futures</h2>
          <p>Vui lòng chọn một coin từ danh sách bên trên để bắt đầu</p>
        </div>
      ) : (
        <>
          <div className="trading-pair-header glass-card">
            <h2>{selectedPair} Futures</h2>
            <div className="pair-stats">
              <span className="current-price">
                ${coins.find(c => c.symbol === selectedPair)?.price.toLocaleString()}
              </span>
              <span className={`price-change ${coins.find(c => c.symbol === selectedPair)?.change >= 0 ? 'text-success' : 'text-danger'}`}>
                {coins.find(c => c.symbol === selectedPair)?.change >= 0 ? '+' : ''}
                {coins.find(c => c.symbol === selectedPair)?.change}%
              </span>
            </div>
            <div className="wallet-balance">
              <span className="text-secondary">Số dư khả dụng:</span>
              <span className="balance-value">{usdtBalance.toLocaleString()} USDT</span>
            </div>
          </div>

          <div className="coming-soon">
            <div className="coming-soon-content glass-card">
              <h2>🚀 Đang phát triển</h2>
              <p>Giao diện giao dịch Futures cho {selectedPair} đang được phát triển</p>
              <div className="features-list">
                <div className="feature-item">✅ Đòn bẩy lên đến 125x</div>
                <div className="feature-item">✅ Hỗ trợ Long và Short</div>
                <div className="feature-item">✅ Nhiều loại lệnh khác nhau</div>
                <div className="feature-item">✅ Công cụ quản lý rủi ro</div>
                <div className="feature-item">✅ Thống kê PnL chi tiết</div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* PnL Statistics Button */}
      <div className="pnl-button-section">
        <button className="btn-pnl btn-gradient" onClick={() => setShowPnlModal(true)}>
          <FiTrendingUp /> Xem Thống Kê PnL
        </button>
      </div>

      {/* PnL Modal */}
      {showPnlModal && (
        <div className="modal-overlay" onClick={() => setShowPnlModal(false)}>
          <div className="modal-content pnl-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Thống Kê PnL - Giao Dịch Futures</h2>
              <button className="modal-close" onClick={() => setShowPnlModal(false)}>×</button>
            </div>
            <div className="pnl-modal-body">
              <div className="pnl-grid">
                <div className="pnl-card glass-card">
                  <div className="pnl-label">Tổng PnL</div>
                  <div className={`pnl-value ${pnlStats.totalPnL >= 0 ? 'positive' : 'negative'}`}>
                    {pnlStats.totalPnL >= 0 ? '+' : ''}{pnlStats.totalPnL.toFixed(2)} USDT
                  </div>
                  <div className={`pnl-percent ${pnlStats.totalPnLPercent >= 0 ? 'text-success' : 'text-danger'}`}>
                    {pnlStats.totalPnLPercent >= 0 ? '+' : ''}{pnlStats.totalPnLPercent}%
                  </div>
                </div>

                <div className="pnl-card glass-card">
                  <div className="pnl-label">PnL hôm nay</div>
                  <div className={`pnl-value ${pnlStats.todayPnL >= 0 ? 'positive' : 'negative'}`}>
                    {pnlStats.todayPnL >= 0 ? '+' : ''}{pnlStats.todayPnL.toFixed(2)} USDT
                  </div>
                  <div className={`pnl-percent ${pnlStats.todayPnLPercent >= 0 ? 'text-success' : 'text-danger'}`}>
                    {pnlStats.todayPnLPercent >= 0 ? '+' : ''}{pnlStats.todayPnLPercent}%
                  </div>
                </div>

                <div className="pnl-card glass-card">
                  <div className="pnl-label">Tỷ lệ thắng</div>
                  <div className="pnl-value">{pnlStats.winRate}%</div>
                  <div className="pnl-detail text-secondary">
                    {pnlStats.profitTrades} thắng / {pnlStats.lossTrades} thua
                  </div>
                </div>

                <div className="pnl-card glass-card">
                  <div className="pnl-label">Tổng giao dịch</div>
                  <div className="pnl-value">{pnlStats.totalTrades}</div>
                  <div className="pnl-detail text-secondary">
                    Đòn bẩy TB: {pnlStats.avgLeverage}x
                  </div>
                </div>

                <div className="pnl-card glass-card">
                  <div className="pnl-label">Khối lượng giao dịch</div>
                  <div className="pnl-value">{pnlStats.totalVolume.toLocaleString()}</div>
                  <div className="pnl-detail text-secondary">
                    USDT
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FuturesTradingPage;
