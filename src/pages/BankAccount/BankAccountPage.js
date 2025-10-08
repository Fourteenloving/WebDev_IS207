import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSend } from 'react-icons/fi';
import './BankAccountPage.css';

const BankAccountPage = () => {
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferData, setTransferData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    note: '',
  });
  
  const [bankAccounts, setBankAccounts] = useState([
    {
      id: 1,
      bankName: 'Vietcombank',
      accountNumber: '1234567890',
      accountName: 'NGUYEN VAN A',
      branch: 'Chi nhánh TP.HCM',
      isDefault: true,
    },
    {
      id: 2,
      bankName: 'Techcombank',
      accountNumber: '0987654321',
      accountName: 'NGUYEN VAN A',
      branch: 'Chi nhánh Hà Nội',
      isDefault: false,
    },
  ]);

  const handleAddAccount = () => {
    // TODO: Open add bank account modal
    console.log('Add bank account');
  };

  const handleEditAccount = (id) => {
    // TODO: Open edit bank account modal
    console.log('Edit account:', id);
  };

  const handleDeleteAccount = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa tài khoản ngân hàng này?')) {
      setBankAccounts(bankAccounts.filter(acc => acc.id !== id));
    }
  };

  const handleSetDefault = (id) => {
    setBankAccounts(bankAccounts.map(acc => ({
      ...acc,
      isDefault: acc.id === id,
    })));
  };

  const handleTransfer = () => {
    setShowTransferModal(true);
  };

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    // TODO: API call to process transfer
    console.log('Transfer:', transferData);
    alert('Chuyển khoản thành công!');
    setShowTransferModal(false);
    setTransferData({ fromAccount: '', toAccount: '', amount: '', note: '' });
  };

  return (
    <div className="bank-account-page">
      <div className="page-header">
        <div>
          <h1>Tài khoản ngân hàng</h1>
          <p className="text-secondary">Quản lý tài khoản ngân hàng liên kết</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-secondary" onClick={handleTransfer}>
            <FiSend /> Chuyển khoản
          </button>
          <button className="btn btn-primary" onClick={handleAddAccount}>
            <FiPlus /> Thêm tài khoản
          </button>
        </div>
      </div>

      <div className="bank-accounts-grid">
        {bankAccounts.map((account) => (
          <div key={account.id} className="bank-card">
            {account.isDefault && (
              <div className="default-badge">Mặc định</div>
            )}
            
            <div className="bank-header">
              <div className="bank-logo">
                {account.bankName.charAt(0)}
              </div>
              <div className="bank-info">
                <h3>{account.bankName}</h3>
                <p className="text-secondary">{account.branch}</p>
              </div>
            </div>

            <div className="bank-details">
              <div className="detail-row">
                <span className="detail-label">Số tài khoản:</span>
                <span className="detail-value">{account.accountNumber}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Tên tài khoản:</span>
                <span className="detail-value">{account.accountName}</span>
              </div>
            </div>

            <div className="bank-actions">
              {!account.isDefault && (
                <button
                  className="action-btn"
                  onClick={() => handleSetDefault(account.id)}
                >
                  Đặt làm mặc định
                </button>
              )}
              <button
                className="action-btn"
                onClick={() => handleEditAccount(account.id)}
              >
                <FiEdit2 /> Sửa
              </button>
              <button
                className="action-btn danger"
                onClick={() => handleDeleteAccount(account.id)}
              >
                <FiTrash2 /> Xóa
              </button>
            </div>
          </div>
        ))}

        <div className="add-bank-card" onClick={handleAddAccount}>
          <FiPlus size={40} />
          <span>Thêm tài khoản mới</span>
        </div>
      </div>

      <div className="info-section">
        <h3>Lưu ý quan trọng</h3>
        <ul className="info-list">
          <li>Tài khoản ngân hàng phải trùng tên với chủ tài khoản sàn giao dịch</li>
          <li>Hệ thống sẽ xác minh thông tin tài khoản trong vòng 24h</li>
          <li>Bạn có thể thêm tối đa 5 tài khoản ngân hàng</li>
          <li>Chỉ tài khoản đã xác minh mới có thể sử dụng cho giao dịch P2P</li>
        </ul>
      </div>

      {/* Transfer Modal */}
      {showTransferModal && (
        <div className="modal-overlay" onClick={() => setShowTransferModal(false)}>
          <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Chuyển khoản ngân hàng</h3>
              <button className="modal-close" onClick={() => setShowTransferModal(false)}>×</button>
            </div>
            <form onSubmit={handleTransferSubmit} className="transfer-form">
              <div className="form-group">
                <label>Từ tài khoản</label>
                <select
                  className="form-input"
                  value={transferData.fromAccount}
                  onChange={(e) => setTransferData({ ...transferData, fromAccount: e.target.value })}
                  required
                >
                  <option value="">Chọn tài khoản nguồn</option>
                  {bankAccounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.bankName} - {acc.accountNumber}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Đến tài khoản</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Nhập số tài khoản đích"
                  value={transferData.toAccount}
                  onChange={(e) => setTransferData({ ...transferData, toAccount: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Số tiền</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Nhập số tiền"
                  value={transferData.amount}
                  onChange={(e) => setTransferData({ ...transferData, amount: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Nội dung chuyển khoản</label>
                <textarea
                  className="form-input"
                  placeholder="Nhập nội dung (tùy chọn)"
                  rows="3"
                  value={transferData.note}
                  onChange={(e) => setTransferData({ ...transferData, note: e.target.value })}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowTransferModal(false)}>
                  Hủy
                </button>
                <button type="submit" className="btn btn-primary btn-gradient">
                  <FiSend /> Chuyển khoản
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BankAccountPage;
