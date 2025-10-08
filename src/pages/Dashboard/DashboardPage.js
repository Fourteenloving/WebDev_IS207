import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FiDollarSign, FiTrendingUp, FiTrendingDown, FiActivity, FiDownload } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './DashboardPage.css';

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth);
  const [portfolioData, setPortfolioData] = useState([]);
  const [stats, setStats] = useState({
    totalBalance: 125000.50,
    availableBalance: 98000.30,
    lockedBalance: 27000.20,
    profitLoss: 12500.75,
    profitLossPercent: 11.2,
  });

  useEffect(() => {
    // Mock data for chart
    const mockData = [
      { time: '00:00', value: 112000 },
      { time: '04:00', value: 115000 },
      { time: '08:00', value: 118000 },
      { time: '12:00', value: 120000 },
      { time: '16:00', value: 122000 },
      { time: '20:00', value: 125000 },
    ];
    setPortfolioData(mockData);
  }, []);

  const handleExportReport = () => {
    // TODO: Implement export report functionality
    console.log('Exporting report...');
    alert('Chức năng xuất báo cáo sẽ sớm được triển khai!');
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="header-content">
          <div>
            <h1>Xin chào, {user?.username}!</h1>
            <p className="text-secondary">Tổng quan tài khoản của bạn</p>
          </div>
          <button className="btn-export btn-gradient" onClick={handleExportReport}>
            <FiDownload /> Xuất Báo Cáo
          </button>
        </div>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Tổng tài sản</span>
            <FiDollarSign className="stat-icon" />
          </div>
          <h2 className="stat-value">${stats.totalBalance.toLocaleString()}</h2>
          <div className={`stat-change ${stats.profitLossPercent >= 0 ? 'positive' : 'negative'}`}>
            {stats.profitLossPercent >= 0 ? <FiTrendingUp /> : <FiTrendingDown />}
            <span>{stats.profitLossPercent >= 0 ? '+' : ''}{stats.profitLossPercent}%</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Số dư khả dụng</span>
            <FiActivity className="stat-icon" />
          </div>
          <h2 className="stat-value">${stats.availableBalance.toLocaleString()}</h2>
          <p className="stat-description">Có thể giao dịch</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Số dư bị khóa</span>
            <FiActivity className="stat-icon" />
          </div>
          <h2 className="stat-value">${stats.lockedBalance.toLocaleString()}</h2>
          <p className="stat-description">Trong lệnh chờ</p>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Lãi/Lỗ hôm nay</span>
            <FiTrendingUp className="stat-icon" />
          </div>
          <h2 className={`stat-value ${stats.profitLoss >= 0 ? 'text-success' : 'text-danger'}`}>
            ${stats.profitLoss.toLocaleString()}
          </h2>
          <p className="stat-description">24h</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Biểu đồ tài sản</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={portfolioData}>
                <XAxis dataKey="time" stroke="#a7b1bc" />
                <YAxis stroke="#a7b1bc" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e2533',
                    border: '1px solid #2a2e39',
                    borderRadius: '8px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#0052ff"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Danh mục đầu tư</h3>
          </div>
          <div className="portfolio-list">
            <div className="portfolio-item">
              <div className="portfolio-info">
                <span className="portfolio-symbol">BTC</span>
                <span className="portfolio-name">Bitcoin</span>
              </div>
              <div className="portfolio-values">
                <span className="portfolio-amount">0.5 BTC</span>
                <span className="portfolio-value">$22,500</span>
              </div>
            </div>
            <div className="portfolio-item">
              <div className="portfolio-info">
                <span className="portfolio-symbol">ETH</span>
                <span className="portfolio-name">Ethereum</span>
              </div>
              <div className="portfolio-values">
                <span className="portfolio-amount">5.2 ETH</span>
                <span className="portfolio-value">$10,400</span>
              </div>
            </div>
            <div className="portfolio-item">
              <div className="portfolio-info">
                <span className="portfolio-symbol">USDT</span>
                <span className="portfolio-name">Tether</span>
              </div>
              <div className="portfolio-values">
                <span className="portfolio-amount">92,100 USDT</span>
                <span className="portfolio-value">$92,100</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <div className="card-header">
          <h3>Giao dịch gần đây</h3>
        </div>
        <div className="transactions-table">
          <table>
            <thead>
              <tr>
                <th>Loại</th>
                <th>Cặp giao dịch</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Thời gian</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="badge badge-success">Mua</span></td>
                <td>BTC/USDT</td>
                <td>0.05 BTC</td>
                <td>$45,000</td>
                <td>10:30 AM</td>
                <td><span className="badge badge-completed">Hoàn thành</span></td>
              </tr>
              <tr>
                <td><span className="badge badge-danger">Bán</span></td>
                <td>ETH/USDT</td>
                <td>1.5 ETH</td>
                <td>$2,000</td>
                <td>09:15 AM</td>
                <td><span className="badge badge-completed">Hoàn thành</span></td>
              </tr>
              <tr>
                <td><span className="badge badge-success">Mua</span></td>
                <td>BNB/USDT</td>
                <td>10 BNB</td>
                <td>$300</td>
                <td>08:45 AM</td>
                <td><span className="badge badge-pending">Đang xử lý</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
