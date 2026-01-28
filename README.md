# CryptoTrack

A real-time cryptocurrency portfolio tracker built with React, TypeScript, and Redux. This application allows users to monitor market prices, manage their investment portfolio, and visualize profit/loss performance with live updates.

Video Link - [Drive](https://drive.google.com/file/d/1z91um6becaoFQ-kKRYm4pBmys54XN-aK/view?usp=sharing)

## Features

### Dashboard & Analytics

* **Real-Time Portfolio Valuation**
  Automatically updates your total balance based on live market prices.

* **Profit/Loss Landscape**
  An area chart visualizing the profit distribution across your assets (Green for profit, Red for loss).

* **Asset Allocation**
  Pie chart breakdown of your portfolio holdings.

* **Top Performers**
  A ranked list of your best performing assets by ROI.

### Market Data

* **Live Price Feed**
  Uses WebSockets (via CoinCap) to stream real-time price updates for portfolio assets without page refreshes.

* **Market Overview**
  A table with search functionality to filter coins by name or symbol.

* **Sparklines & Trends**
  Visual indicators for 24-hour price changes.

### User Experience

* **Authentication**
  Secure sign-in via Google and Email using Clerk.

* **Price Alerts**
  Set custom price thresholds (above/below) for any asset and receive in-app notifications when targets are triggered.

* **Responsive Design**
  Optimized for both desktop and mobile devices using Tailwind CSS and Ant Design.

## Tech Stack

* **Frontend:** React 18, TypeScript, Vite
* **State Management:** Redux Toolkit
* **UI Framework:** Ant Design 5, Tailwind CSS
* **Visualization:** Recharts
* **Authentication:** Clerk
* **Data Source:** CoinGecko API

## Getting Started

### Prerequisites

* Node.js (v18 or higher)
* npm or yarn

### Installation

Clone the repository:

```bash
git clone https://github.com/mritik75way/crypto-tracker.git
cd crypto-tracker
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add your Clerk key:

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
```

Start the development server:

```bash
npm run dev
```

The application will launch at:

```
http://localhost:5173
```

## Architecture Decisions

* **Performance**
  Heavy computations (such as portfolio ROI) are memoized using `useMemo` to prevent unnecessary recalculations during real-time price updates.

* **Code Splitting**
  Routes are lazy-loaded to reduce the initial bundle size.

* **Data Flow**

  * **Market Data:** Fetched initially via REST for the full list, then augmented with WebSocket streams for active assets.
  * **Portfolio Data:** Managed in Redux and persisted to LocalStorage.

## Project Structure

```text
src/
├── components/        # Shared UI components (Loader, ErrorBoundary)
├── context/           # React Context (Theme, Auth)
├── features/          # Redux slices and feature-specific components
│   ├── dashboard/     # Charts and stats cards
│   ├── market/        # Market table and logic
│   ├── portfolio/     # Transaction forms and lists
│   └── alerts/        # Alert logic and watcher
├── hooks/             # Custom hooks 
├── layouts/           # Main application layouts
├── pages/             # Page components (Dashboard, Market, Portfolio)
├── services/          # API integration 
├── store/             # Redux store configuration
└── types/             # TypeScript interfaces
```
