# 📊 Dashboard Pages Reference

Complete reference for all dashboard page templates included in Admindek VanillaJS.

## Overview

Admindek includes **7 dashboard variants** designed for different use cases and industries. Each dashboard provides unique widgets, charts, and data visualization components.

## Dashboard Variants

### 1. Analytics Dashboard (`dashboard/index.html`)

**Primary Use Case:** Website and application analytics, user behavior tracking.

**Key Features:**
- ✅ **User Analytics** - Active users, sessions, page views
- ✅ **Revenue Tracking** - Sales metrics, conversion rates
- ✅ **Geographic Data** - World map with user distribution
- ✅ **Real-time Stats** - Live visitor tracking
- ✅ **Traffic Sources** - Organic, social, direct traffic breakdown

**Widgets Included:**

| Widget | Type | Description |
|--------|------|-------------|
| **Revenue Card** | KPI Metric | Total revenue with trend indicator |
| **Active Users** | KPI Metric | Current active users count |
| **Page Views** | KPI Metric | Total page views with growth percentage |
| **Bounce Rate** | KPI Metric | Visitor bounce rate statistics |
| **Traffic Sources** | Donut Chart | Breakdown of traffic origins |
| **User Growth** | Area Chart | User acquisition over time |
| **Geographic Distribution** | World Map | Users by country/region |
| **Recent Activity** | Activity Feed | Latest user actions and events |
| **Top Pages** | Data Table | Most visited pages with metrics |
| **Conversion Funnel** | Funnel Chart | User journey conversion rates |

**Code Example:**
```html
<!-- Revenue Card Widget -->
<div class="col-md-6 col-xl-3">
  <div class="card bg-primary">
    <div class="card-body">
      <div class="d-flex align-items-center">
        <div class="flex-grow-1">
          <h6 class="mb-2 text-white">Total Revenue</h6>
          <h3 class="text-white mb-0 f-w-300">$847,290</h3>
          <p class="text-white mb-0 opacity-75">
            <span class="f-12 me-1">
              <i class="ph-duotone ph-trend-up me-1"></i>12.5%
            </span>
            from last month
          </p>
        </div>
        <div class="flex-shrink-0">
          <div class="avtar avtar-s bg-white bg-opacity-25">
            <i class="ph-duotone ph-currency-dollar f-18 text-white"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 2. E-commerce Dashboard (`dashboard/ecommerce.html`)

**Primary Use Case:** Online store management, sales tracking, inventory overview.

**Key Features:**
- 🛒 **Sales Analytics** - Revenue, orders, average order value
- 📦 **Product Performance** - Best sellers, category analysis
- 👥 **Customer Insights** - New vs returning customers
- 📈 **Growth Metrics** - Month-over-month comparisons
- 🎯 **Conversion Tracking** - Funnel analysis, cart abandonment

**Widgets Included:**

| Widget | Type | Description |
|--------|------|-------------|
| **Total Sales** | KPI Metric | Revenue with period comparison |
| **Orders Count** | KPI Metric | Number of orders placed |
| **Average Order Value** | KPI Metric | AOV with trend analysis |
| **Customer Count** | KPI Metric | Total customers registered |
| **Sales Overview** | Line Chart | Revenue trends over time |
| **Top Products** | Product Grid | Best-selling items with images |
| **Customer Distribution** | Pie Chart | New vs returning customers |
| **Recent Orders** | Data Table | Latest orders with status |
| **Sales by Category** | Bar Chart | Product category performance |
| **Payment Methods** | Donut Chart | Payment method distribution |

**Specialized Components:**
```html
<!-- Product Performance Widget -->
<div class="card">
  <div class="card-header">
    <h5 class="mb-0">Top Products</h5>
  </div>
  <div class="card-body">
    <div class="row">
      <div class="col-sm-6 col-lg-4 mb-3">
        <div class="d-flex align-items-center">
          <div class="flex-shrink-0">
            <img src="../assets/images/application/img-prod-1.jpg" 
                 alt="Product" class="img-fluid wid-40 rounded">
          </div>
          <div class="flex-grow-1 ms-3">
            <h6 class="mb-0">Wireless Headphones</h6>
            <p class="text-muted mb-0 f-12">Electronics</p>
            <div class="d-flex align-items-center">
              <span class="text-success f-12 me-2">+15%</span>
              <span class="f-12">$2,890</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 3. CRM Dashboard (`dashboard/crm.html`)

**Primary Use Case:** Customer relationship management, sales pipeline, lead tracking.

**Key Features:**
- 🤝 **Lead Management** - Pipeline visualization, conversion rates
- 📞 **Sales Activity** - Calls, meetings, follow-ups
- 👤 **Customer Profiles** - Contact management, interaction history
- 📊 **Performance Metrics** - Sales targets, team performance
- 📅 **Task Management** - Upcoming activities, deadlines

**Widgets Included:**

| Widget | Type | Description |
|--------|------|-------------|
| **Total Leads** | KPI Metric | Number of leads in pipeline |
| **Conversion Rate** | KPI Metric | Lead to customer conversion |
| **Deal Value** | KPI Metric | Total value of active deals |
| **Activities Today** | KPI Metric | Scheduled activities count |
| **Sales Pipeline** | Funnel Chart | Deal stages visualization |
| **Lead Sources** | Bar Chart | Where leads are coming from |
| **Team Performance** | Comparison Chart | Individual sales metrics |
| **Recent Activities** | Timeline | Latest customer interactions |
| **Upcoming Tasks** | Task List | Scheduled activities |
| **Customer Distribution** | Map | Customers by geographic region |

### 4. Crypto Dashboard (`dashboard/crypto.html`)

**Primary Use Case:** Cryptocurrency portfolio tracking, market analysis.

**Key Features:**
- 💰 **Portfolio Value** - Total holdings, profit/loss
- 📈 **Market Data** - Real-time prices, market cap
- 💱 **Trading Activity** - Buy/sell orders, transaction history
- 📊 **Price Charts** - Candlestick charts, technical indicators
- 🚨 **Alerts** - Price notifications, portfolio changes

**Widgets Included:**

| Widget | Type | Description |
|--------|------|-------------|
| **Portfolio Value** | KPI Metric | Total portfolio worth |
| **24h Change** | KPI Metric | Portfolio change in 24 hours |
| **Active Trades** | KPI Metric | Number of open positions |
| **Profit/Loss** | KPI Metric | Realized gains/losses |
| **Bitcoin Chart** | Candlestick Chart | BTC price movements |
| **Top Cryptocurrencies** | Crypto Table | Major coins with prices |
| **Portfolio Distribution** | Pie Chart | Holdings by cryptocurrency |
| **Recent Transactions** | Transaction List | Latest buy/sell orders |
| **Market Trends** | Line Chart | Market sentiment indicators |
| **Watchlist** | Coin List | Tracked cryptocurrencies |

### 5. Finance Dashboard (`dashboard/finance.html`)

**Primary Use Case:** Financial planning, expense tracking, budget management.

**Key Features:**
- 💳 **Account Balances** - Bank accounts, credit cards
- 📈 **Investment Tracking** - Stocks, bonds, mutual funds
- 💸 **Expense Management** - Categorized spending analysis
- 🎯 **Budget Goals** - Progress toward financial targets
- 📊 **Cash Flow** - Income vs expenses over time

**Widgets Included:**

| Widget | Type | Description |
|--------|------|-------------|
| **Total Balance** | KPI Metric | Sum of all accounts |
| **Monthly Expenses** | KPI Metric | Current month spending |
| **Investment Value** | KPI Metric | Portfolio market value |
| **Savings Rate** | KPI Metric | Percentage of income saved |
| **Cash Flow** | Area Chart | Income vs expenses trends |
| **Expense Categories** | Donut Chart | Spending by category |
| **Account Balances** | Account Cards | Individual account details |
| **Investment Performance** | Line Chart | Portfolio growth over time |
| **Budget Progress** | Progress Bars | Goal completion status |
| **Recent Transactions** | Transaction Table | Latest financial activities |

### 6. Project Dashboard (`dashboard/project.html`)

**Primary Use Case:** Project management, team collaboration, task tracking.

**Key Features:**
- 📋 **Project Overview** - Active projects, completion status
- 👥 **Team Management** - Member assignments, workload
- ⏰ **Timeline Tracking** - Milestones, deadlines
- 📊 **Progress Monitoring** - Task completion, time tracking
- 🎯 **Resource Allocation** - Budget usage, resource planning

**Widgets Included:**

| Widget | Type | Description |
|--------|------|-------------|
| **Active Projects** | KPI Metric | Number of ongoing projects |
| **Completed Tasks** | KPI Metric | Tasks finished this period |
| **Team Members** | KPI Metric | Active team size |
| **Budget Utilization** | KPI Metric | Percentage of budget used |
| **Project Timeline** | Gantt Chart | Project schedules and dependencies |
| **Task Distribution** | Bar Chart | Tasks by team member |
| **Project Status** | Status Cards | Individual project overviews |
| **Recent Activities** | Activity Feed | Latest project updates |
| **Resource Allocation** | Resource Chart | Team workload distribution |
| **Milestone Progress** | Timeline | Key project milestones |

### 7. Healthcare Dashboard (`dashboard/analytics.html` variant)

**Primary Use Case:** Medical practice management, patient tracking, health analytics.

**Key Features:**
- 🏥 **Patient Management** - Appointments, medical records
- 📊 **Health Metrics** - Vital signs, treatment outcomes
- 💊 **Medication Tracking** - Prescriptions, adherence
- 📅 **Scheduling** - Appointments, staff schedules
- 📈 **Practice Analytics** - Revenue, patient satisfaction

## Common Dashboard Components

### KPI Metric Cards

All dashboards use consistent KPI card structure:

```html
<!-- Standard KPI Card -->
<div class="col-md-6 col-xl-3">
  <div class="card">
    <div class="card-body">
      <div class="d-flex align-items-center">
        <div class="flex-grow-1">
          <h6 class="mb-2">[Metric Name]</h6>
          <h3 class="mb-0 f-w-300">[Value]</h3>
          <p class="text-muted mb-0">
            <span class="text-[success|danger] f-12 me-1">
              <i class="ph-duotone ph-trend-[up|down] me-1"></i>[Change %]
            </span>
            [Period Description]
          </p>
        </div>
        <div class="flex-shrink-0">
          <div class="avtar avtar-s bg-[color]">
            <i class="ph-duotone ph-[icon] f-18"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Available Variants:**
- **Primary Card**: `bg-primary` with white text
- **Success Card**: `bg-success` for positive metrics
- **Warning Card**: `bg-warning` for attention metrics
- **Info Card**: `bg-info` for informational data
- **Danger Card**: `bg-danger` for critical alerts

### Chart Integration

Standard chart containers used across dashboards:

```html
<!-- Chart Container -->
<div class="col-lg-8">
  <div class="card">
    <div class="card-header">
      <div class="d-flex align-items-center justify-content-between">
        <h5 class="mb-0">[Chart Title]</h5>
        <div class="dropdown">
          <!-- Chart options dropdown -->
        </div>
      </div>
    </div>
    <div class="card-body">
      <div id="[chart-id]"></div>
    </div>
  </div>
</div>
```

**Chart Types Available:**
- **Line Charts**: Trend analysis, time-series data
- **Area Charts**: Cumulative data, filled regions
- **Bar Charts**: Comparative data, categories
- **Donut/Pie Charts**: Part-to-whole relationships
- **Candlestick Charts**: Financial data (crypto dashboard)
- **Funnel Charts**: Process conversion (CRM dashboard)

### Data Tables

Consistent table structure across dashboards:

```html
<!-- Data Table Container -->
<div class="card">
  <div class="card-header">
    <h5 class="mb-0">[Table Title]</h5>
  </div>
  <div class="card-body">
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th>[Column 1]</th>
            <th>[Column 2]</th>
            <th class="text-end">[Actions]</th>
          </tr>
        </thead>
        <tbody>
          <!-- Dynamic table rows -->
        </tbody>
      </table>
    </div>
  </div>
</div>
```

## Customization Options

### Dashboard Layout Variants

**Full Width Layout:**
```html
<!-- Remove container constraints -->
<div class="pc-content">
  <div class="row">
    <!-- Widgets span full width -->
  </div>
</div>
```

**Boxed Layout:**
```javascript
// In vite.config.js
const box_container = 'true' // Enable boxed layout
```

**Custom Grid Layouts:**
```html
<!-- 2-column layout -->
<div class="row">
  <div class="col-lg-6"><!-- Left column --></div>
  <div class="col-lg-6"><!-- Right column --></div>
</div>

<!-- 3-column layout -->
<div class="row">
  <div class="col-lg-4"><!-- Left --></div>
  <div class="col-lg-4"><!-- Center --></div>
  <div class="col-lg-4"><!-- Right --></div>
</div>

<!-- Mixed layout -->
<div class="row">
  <div class="col-lg-8"><!-- Main content --></div>
  <div class="col-lg-4"><!-- Sidebar --></div>
</div>
```

### Widget Customization

**Color Variants:**
```html
<!-- Primary theme -->
<div class="card bg-primary text-white">

<!-- Custom gradient -->
<div class="card bg-gradient-primary">

<!-- Light variant -->
<div class="card bg-light-primary">
```

**Size Variants:**
```scss
// Compact widgets
.widget-compact {
  .card-body {
    padding: 1rem;
  }
  
  h3 {
    font-size: 1.5rem;
  }
}

// Large widgets
.widget-large {
  .card-body {
    padding: 2rem;
  }
  
  h3 {
    font-size: 2.5rem;
  }
}
```

### Adding Custom Dashboards

**Step 1: Create HTML File**
```html
<!-- src/html/dashboard/custom-dashboard.html -->
<!doctype html>
<html lang="en">
  <head>
    @@include('../layouts/head-page-meta.html', {'title': 'Custom Dashboard'})
    @@include('../layouts/head-css.html')
  </head>
  
  <body @@bodySetup>
    @@include('../layouts/layout-vertical.html')
    
    <div class="pc-container">
      <div class="pc-content">
        @@include('../layouts/breadcrumb.html', {
          'breadcrumb-item': 'Dashboard', 
          'breadcrumb-item-active': 'Custom'
        })
        
        <!-- Your custom widgets here -->
      </div>
    </div>
    
    @@include('../layouts/footer-js.html')
  </body>
</html>
```

**Step 2: Add Navigation**
```html
<!-- In layouts/menu-list.html -->
<li class="pc-item">
  <a href="../dashboard/custom-dashboard.html" class="pc-link">
    <span class="pc-micon"><i class="ph-duotone ph-chart-pie"></i></span>
    <span class="pc-mtext">Custom Dashboard</span>
  </a>
</li>
```

**Step 3: Create Custom Widgets**
```javascript
// src/assets/js/dashboard/custom-dashboard.js
document.addEventListener('DOMContentLoaded', function() {
  // Initialize custom charts and widgets
  initCustomCharts();
  loadCustomData();
});
```

## Performance Considerations

### Lazy Loading

```javascript
// Lazy load dashboard widgets
const observerOptions = {
  root: null,
  threshold: 0.1
};

const widgetObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      loadWidget(entry.target);
      widgetObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all widget containers
document.querySelectorAll('.widget-container').forEach(widget => {
  widgetObserver.observe(widget);
});
```

### Data Loading Optimization

```javascript
// Batch API calls for dashboard data
async function loadDashboardData() {
  const [metrics, chartData, tableData] = await Promise.all([
    fetch('/api/metrics'),
    fetch('/api/chart-data'),
    fetch('/api/table-data')
  ]);
  
  // Update widgets with loaded data
  updateMetrics(await metrics.json());
  updateCharts(await chartData.json());
  updateTables(await tableData.json());
}
```

### Memory Management

```javascript
// Clean up chart instances when switching dashboards
let chartInstances = [];

function destroyCharts() {
  chartInstances.forEach(chart => {
    if (chart && chart.destroy) {
      chart.destroy();
    }
  });
  chartInstances = [];
}

// Call when navigating away from dashboard
window.addEventListener('beforeunload', destroyCharts);
```

---

## Related References

- **[Dashboard Widgets](../components/dashboard-widgets.md)** - Detailed widget documentation
- **[Chart Components](../components/chart-components.md)** - Chart configuration options
- **[Theme Variables](../api/theme-variables.md)** - Customization variables