import React, { useState } from 'react';
import { FiSend, FiArrowRightCircle, FiClock } from 'react-icons/fi';
import './WalletPage.css';

const WalletPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const wallets = [
    { symbol: 'BTC', name: 'Bitcoin', balance: 0.5, usdValue: 22500, icon: '₿' },
    { symbol: 'ETH', name: 'Ethereum', balance: 5.2, usdValue: 10400, icon: 'Ξ' },
    { symbol: 'USDT', name: 'Tether', balance: 92100, usdValue: 92100, icon: '₮' },
    { symbol: 'BNB', name: 'Binance Coin', balance: 15, usdValue: 4500, icon: 'BNB' },
  ];

  const transactions = [
    { type: 'deposit', symbol: 'BTC', amount: 0.05, time: '2024-10-06 10:30', status: 'completed' },
    { type: 'withdraw', symbol: 'USDT', amount: 5000, time: '2024-10-05 15:20', status: 'completed' },
    { type: 'transfer', symbol: 'ETH', amount: 1.5, time: '2024-10-05 09:15', status: 'pending' },
  ];

  return (
    <div className="wallet-page">
      <div className="page-header">
        <h1>Ví của tôi</h1>
        <p className="text-secondary">Quản lý tài sản và giao dịch</p>
      </div>

      <div className="wallet-summary">
        <div className="summary-card main">
          <div className="summary-label">Tổng tài sản ước tính</div>
          <div className="summary-value">$129,500.00</div>
          <div className="summary-btc">≈ 2.83 BTC</div>
        </div>
        <div className="summary-actions">
          <button className="action-btn deposit">
            <FiArrowRightCircle size={20} />
            <span>Nạp tiền</span>
          </button>
          <button className="action-btn withdraw">
            <FiSend size={20} />
            <span>Rút tiền</span>
          </button>
          <button className="action-btn transfer">
            <FiClock size={20} />
            <span>Chuyển</span>
          </button>
        </div>
      </div>

      <div className="wallet-tabs">
        <button
          className={`wallet-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Tổng quan
        </button>
        <button
          className={`wallet-tab ${activeTab === 'spot' ? 'active' : ''}`}
          onClick={() => setActiveTab('spot')}
        >
          Ví Spot
        </button>
        <button
          className={`wallet-tab ${activeTab === 'futures' ? 'active' : ''}`}
          onClick={() => setActiveTab('futures')}
        >
          Ví Futures
        </button>
      </div>

      <div className="wallets-grid">
        {wallets.map((wallet) => (
          <div key={wallet.symbol} className="wallet-card">
            <div className="wallet-header">
              <div className="wallet-icon">{wallet.icon}</div>
              <div className="wallet-info">
                <div className="wallet-symbol">{wallet.symbol}</div>
                <div className="wallet-name">{wallet.name}</div>
              </div>
            </div>
            <div className="wallet-balance">
              <div className="balance-amount">
                {wallet.balance.toLocaleString()} {wallet.symbol}
              </div>
              <div className="balance-usd">
                ≈ ${wallet.usdValue.toLocaleString()}
              </div>
            </div>
            <div className="wallet-actions">
              <button className="wallet-action-btn">Nạp</button>
              <button className="wallet-action-btn">Rút</button>
              <button className="wallet-action-btn">Giao dịch</button>
            </div>
          </div>
        ))}
      </div>

      <div className="transactions-section">
        <div className="section-header">
          <h3>Lịch sử giao dịch gần đây</h3>
          <button className="btn-text">Xem tất cả</button>
        </div>
        <div className="transactions-list">
          <div className="transaction-header">
            <span>Loại</span>
            <span>Tiền</span>
            <span>Số lượng</span>
            <span>Thời gian</span>
            <span>Trạng thái</span>
          </div>
          {transactions.map((tx, index) => (
            <div key={index} className="transaction-item">
              <span className={`transaction-type ${tx.type}`}>
                {tx.type === 'deposit' ? 'Nạp tiền' : tx.type === 'withdraw' ? 'Rút tiền' : 'Chuyển'}
              </span>
              <span className="transaction-symbol">{tx.symbol}</span>
              <span className="transaction-amount">
                {tx.type === 'withdraw' ? '-' : '+'}{tx.amount} {tx.symbol}
              </span>
              <span className="transaction-time text-secondary">{tx.time}</span>
              <span className={`transaction-status ${tx.status}`}>
                {tx.status === 'completed' ? 'Hoàn thành' : 'Đang xử lý'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
