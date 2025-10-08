# Cexora - Changelog của các thay đổi

## Ngày: 7/10/2025

### ✅ 1. PnL Statistics chuyển thành Modal Button
- **SpotTradingPage.js**: Thêm state `showPnlModal`, import `FiTrendingUp`, chuyển PnL section thành button trigger
- **FuturesTradingPage.js**: Tương tự, thêm modal với 5 cards PnL statistics
- **Result**: Người dùng phải click vào nút "Xem Thống Kê PnL" để xem thống kê

### ✅ 2. Nút Xuất Báo Cáo trong Dashboard
- **DashboardPage.js**: 
  - Import `FiDownload`
  - Thêm handler `handleExportReport()`
  - Thêm button "Xuất Báo Cáo" vào header với class `btn-export btn-gradient`
- **DashboardPage.css**: Thêm style cho `header-content` flex layout

### ✅ 3. Danh sách Coins và Số dư Ví
- **SpotTradingPage.js**:
  - Thêm state `coins` array với 6 coins (BTC, ETH, BNB, SOL, XRP, ADA)
  - Thêm `usdtBalance` state
  - `selectedPair` giờ là `null` mặc định
  - Hiển thị coins grid, chỉ hiển thị biểu đồ khi chọn coin
  - Số dư ví hiển thị dựa trên coin được chọn và side (buy/sell)
- **SpotTradingPage.css**:
  - `.coins-section`, `.coins-grid`, `.coin-card` với hover và active states
  - `.empty-selection` khi chưa chọn coin
  - `.trading-pair-header` với glass effect

### 🚧 TODO: FuturesTradingPage cần cập nhật tương tự

### ✅ 4. iOS-style Glass Effect
- **global.css**:
  - **Colors**: Chuyển sang iOS color palette
    - Primary: `#007AFF` (iOS Blue)
    - Success: `#34C759` (iOS Green)
    - Danger: `#FF3B30` (iOS Red)
    - Warning: `#FF9500` (iOS Orange)
    - Info: `#5AC8FA` (iOS Cyan)
  - **Dark theme**: 
    - `--dark-bg: #000000`
    - `--dark-bg-secondary: #1C1C1E`
    - `--dark-bg-card: #2C2C2E`
  - **Glass effect**:
    - `backdrop-filter: blur(20px) saturate(180%)`
    - `--glass-bg: rgba(28, 28, 30, 0.72)`
    - `--glass-hover-bg: rgba(44, 44, 46, 0.85)`
  - **Shadows**: iOS-style với rgba black
  - **Buttons**: 
    - `.btn-gradient` với border-radius 12px, hover scale & translateY
    - `::before` pseudo element cho shimmer effect
    - `.btn-pnl` với info gradient
    - `.btn-export` style
  - **Transitions**: `cubic-bezier(0.4, 0, 0.2, 1)` cho smooth iOS feel

## Các tính năng đã hoàn thành:
✅ PnL Modal với button trigger
✅ Export Report button trong Dashboard
✅ Coins list với wallet balance display (Spot)
✅ iOS 18-style glass morphism
✅ Smooth animations và transitions

## Cần hoàn thiện:
- [ ] Cập nhật FuturesTradingPage với coins list
- [ ] Cập nhật các component khác với iOS-style
- [ ] Test responsive trên mobile
- [ ] Backend API integration
