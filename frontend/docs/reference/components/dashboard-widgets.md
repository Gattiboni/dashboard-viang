# 📊 Dashboard Widgets Reference

Complete reference for all dashboard widgets and chart components available in Admindek VanillaJS.

## Overview

Admindek includes **70+ interactive widgets** for building comprehensive dashboards:

- **Metric Cards**: Revenue, users, orders, conversion rates
- **Chart Widgets**: Line, area, bar, donut, and specialized charts  
- **Progress Indicators**: Linear and circular progress components
- **Statistical Displays**: Comparison charts and trend indicators
- **Interactive Elements**: Clickable charts with tooltips and legends

## Metric Cards

### Basic Metric Card

**Usage:**
```html
<div class="col-md-6 col-xl-3">
  <div class="card">
    <div class="card-body">
      <div class="d-flex align-items-center">
        <div class="flex-grow-1">
          <h6 class="mb-2">Total Revenue</h6>
          <h3 class="mb-0 f-w-300">$125,000</h3>
          <p class="text-muted mb-0">
            <span class="text-success f-12 me-1">
              <i class="ph-duotone ph-trend-up me-1"></i>12.5%
            </span>
            from last month
          </p>
        </div>
        <div class="flex-shrink-0">
          <div class="avtar avtar-s bg-primary">
            <i class="ph-duotone ph-currency-dollar f-18"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Customization Options:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `bg-{color}` | string | `bg-primary` | Background color variant |
| `avtar-{size}` | string | `avtar-s` | Icon container size (s, m, l, xl) |
| `text-{color}` | string | `text-muted` | Text color for secondary information |
| `f-w-{weight}` | string | `f-w-300` | Font weight (300, 400, 500, 600, 700) |

### Enhanced Metric Card with Chart

**Usage:**
```html
<div class="col-md-6 col-xl-3">
  <div class="card bg-primary">
    <div class="card-body">
      <div class="d-flex align-items-center">
        <div class="flex-grow-1">
          <h6 class="mb-2 text-white">Active Users</h6>
          <h3 class="text-white mb-0 f-w-300">8,549</h3>
          <div id="user-trend-chart"></div>
        </div>
        <div class="flex-shrink-0">
          <div class="avtar avtar-s bg-light-primary">
            <i class="ph-duotone ph-users f-18"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**JavaScript Integration:**
```javascript
// Initialize trend chart
var userTrendOptions = {
  chart: {
    height: 40,
    type: 'line',
    sparkline: { enabled: true }
  },
  series: [{
    name: 'Users',
    data: [25, 45, 35, 65, 45, 75, 65]
  }],
  stroke: {
    width: 2,
    curve: 'smooth'
  },
  colors: ['#ffffff'],
  tooltip: {
    theme: 'dark'
  }
};

var userTrendChart = new ApexCharts(
  document.querySelector('#user-trend-chart'), 
  userTrendOptions
);
userTrendChart.render();
```

## Chart Widgets

### Line Chart Widget

**HTML Structure:**
```html
<div class="col-lg-8">
  <div class="card">
    <div class="card-header">
      <div class="d-flex align-items-center justify-content-between">
        <h5 class="mb-0">Sales Overview</h5>
        <div class="dropdown">
          <a class="avtar avtar-s btn-link-secondary dropdown-toggle arrow-none" 
             href="#" data-bs-toggle="dropdown">
            <i class="ph-duotone ph-dots-three f-18"></i>
          </a>
          <div class="dropdown-menu dropdown-menu-end">
            <a class="dropdown-item" href="#">Today</a>
            <a class="dropdown-item" href="#">Weekly</a>
            <a class="dropdown-item" href="#">Monthly</a>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div id="sales-overview-chart"></div>
    </div>
  </div>
</div>
```

**JavaScript Configuration:**
```javascript
var salesOptions = {
  chart: {
    height: 350,
    type: 'area',
    toolbar: { show: false },
    zoom: { enabled: false }
  },
  dataLabels: { enabled: false },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  series: [
    {
      name: 'Sales',
      data: [31, 40, 28, 51, 42, 109, 100, 120, 85, 95]
    },
    {
      name: 'Revenue', 
      data: [11, 32, 45, 32, 34, 52, 41, 65, 55, 75]
    }
  ],
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
  },
  colors: ['#4f46e5', '#10b981'],
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.3,
      stops: [0, 90, 100]
    }
  },
  tooltip: {
    shared: true,
    intersect: false
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right'
  }
};

var salesChart = new ApexCharts(
  document.querySelector('#sales-overview-chart'), 
  salesOptions
);
salesChart.render();
```

### Donut Chart Widget

**HTML Structure:**
```html
<div class="col-lg-4">
  <div class="card">
    <div class="card-header">
      <h5 class="mb-0">Traffic Sources</h5>
    </div>
    <div class="card-body">
      <div id="traffic-sources-chart"></div>
      <div class="row text-center mt-3">
        <div class="col-4">
          <h6 class="mb-0">62%</h6>
          <p class="text-muted mb-0 f-12">Direct</p>
        </div>
        <div class="col-4">
          <h6 class="mb-0">28%</h6>
          <p class="text-muted mb-0 f-12">Social</p>
        </div>
        <div class="col-4">
          <h6 class="mb-0">10%</h6>
          <p class="text-muted mb-0 f-12">Email</p>
        </div>
      </div>
    </div>
  </div>
</div>
```

**JavaScript Configuration:**
```javascript
var trafficOptions = {
  chart: {
    height: 300,
    type: 'donut'
  },
  series: [62, 28, 10],
  labels: ['Direct', 'Social Media', 'Email'],
  colors: ['#4f46e5', '#10b981', '#f59e0b'],
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: true,
          total: {
            show: true,
            label: 'Total Visits',
            formatter: function (w) {
              return '12.4K'
            }
          }
        }
      }
    }
  },
  legend: {
    show: false
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + '%'
      }
    }
  }
};

var trafficChart = new ApexCharts(
  document.querySelector('#traffic-sources-chart'), 
  trafficOptions
);
trafficChart.render();
```

## Progress Widgets

### Circular Progress

**HTML Structure:**
```html
<div class="col-md-6 col-xl-4">
  <div class="card">
    <div class="card-body text-center">
      <div id="goal-progress" class="d-inline-block"></div>
      <h6 class="mt-3 mb-0">Goal Completion</h6>
      <p class="text-muted mb-0">Monthly target progress</p>
    </div>
  </div>
</div>
```

**JavaScript Configuration:**
```javascript
var goalProgressOptions = {
  chart: {
    height: 150,
    type: 'radialBar'
  },
  series: [75],
  plotOptions: {
    radialBar: {
      hollow: {
        size: '60%'
      },
      dataLabels: {
        show: true,
        name: {
          show: false
        },
        value: {
          fontSize: '20px',
          fontWeight: 600,
          formatter: function (val) {
            return val + '%'
          }
        }
      },
      track: {
        background: '#f1f5f9'
      }
    }
  },
  colors: ['#4f46e5'],
  stroke: {
    lineCap: 'round'
  }
};

var goalProgress = new ApexCharts(
  document.querySelector('#goal-progress'), 
  goalProgressOptions
);
goalProgress.render();
```

### Linear Progress Bars

**HTML Structure:**
```html
<div class="col-md-6 col-xl-8">
  <div class="card">
    <div class="card-header">
      <h5 class="mb-0">Project Progress</h5>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-6">
          <div class="d-flex align-items-center mb-3">
            <div class="flex-grow-1">
              <h6 class="mb-1">Website Redesign</h6>
              <div class="progress" style="height: 6px;">
                <div class="progress-bar bg-primary" style="width: 85%"></div>
              </div>
            </div>
            <div class="flex-shrink-0 ms-3">
              <span class="f-12 text-muted">85%</span>
            </div>
          </div>
          
          <div class="d-flex align-items-center mb-3">
            <div class="flex-grow-1">
              <h6 class="mb-1">Mobile App</h6>
              <div class="progress" style="height: 6px;">
                <div class="progress-bar bg-success" style="width: 65%"></div>
              </div>
            </div>
            <div class="flex-shrink-0 ms-3">
              <span class="f-12 text-muted">65%</span>
            </div>
          </div>
          
          <div class="d-flex align-items-center">
            <div class="flex-grow-1">
              <h6 class="mb-1">Database Migration</h6>
              <div class="progress" style="height: 6px;">
                <div class="progress-bar bg-warning" style="width: 45%"></div>
              </div>
            </div>
            <div class="flex-shrink-0 ms-3">
              <span class="f-12 text-muted">45%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Statistical Widgets

### Comparison Widget

**HTML Structure:**
```html
<div class="col-md-12 col-xl-6">
  <div class="card">
    <div class="card-header">
      <h5 class="mb-0">Sales Comparison</h5>
    </div>
    <div class="card-body">
      <div class="row align-items-center">
        <div class="col-6">
          <h3 class="mb-0">$24,780</h3>
          <p class="text-muted mb-2">This Month</p>
          <div class="d-flex align-items-center">
            <i class="ph-duotone ph-trend-up f-18 text-success me-1"></i>
            <span class="text-success f-12">+12.5%</span>
          </div>
        </div>
        <div class="col-6">
          <div id="sales-comparison-chart"></div>
        </div>
      </div>
    </div>
  </div>
</div>
```

**JavaScript Configuration:**
```javascript
var comparisonOptions = {
  chart: {
    height: 80,
    type: 'bar',
    sparkline: { enabled: true }
  },
  series: [{
    data: [25, 45, 32, 67, 49, 72, 52, 55, 46, 54]
  }],
  plotOptions: {
    bar: {
      columnWidth: '50%',
      distributed: true,
      borderRadius: 2
    }
  },
  colors: ['#e3f2fd', '#bbdefb', '#90caf9', '#64b5f6', '#42a5f5', 
           '#2196f3', '#1e88e5', '#1976d2', '#1565c0', '#0d47a1'],
  tooltip: {
    enabled: false
  }
};

var comparisonChart = new ApexCharts(
  document.querySelector('#sales-comparison-chart'), 
  comparisonOptions
);
comparisonChart.render();
```

## Widget Categories

### Analytics Widgets
- **Revenue tracking**: Multiple currency support
- **User analytics**: Active users, new registrations
- **Conversion metrics**: Funnel analysis, goal completion
- **Traffic analysis**: Sources, geographic distribution

### E-commerce Widgets  
- **Sales performance**: Revenue, orders, average order value
- **Product metrics**: Top products, category performance
- **Inventory tracking**: Stock levels, reorder alerts
- **Customer insights**: Lifetime value, retention rates

### Project Management Widgets
- **Task progress**: Completion rates, milestone tracking  
- **Team performance**: Individual and group metrics
- **Timeline widgets**: Gantt-style progress indicators
- **Resource utilization**: Workload distribution

### Financial Widgets
- **Profit & loss**: Income vs expenses tracking
- **Cash flow**: Inflow and outflow visualization  
- **Budget tracking**: Planned vs actual spending
- **Investment performance**: Portfolio tracking

## Responsive Behavior

All widgets automatically adapt to screen size:

```scss
// Widget responsive behavior
.card {
  // Mobile: Full width
  @media (max-width: 767.98px) {
    .row > [class*="col-"] {
      margin-bottom: 1rem;
    }
  }
  
  // Tablet: 2 columns
  @media (min-width: 768px) and (max-width: 991.98px) {
    .col-xl-3 {
      flex: 0 0 50%;
      max-width: 50%;
    }
  }
  
  // Desktop: Original layout
  @media (min-width: 992px) {
    // Default grid behavior
  }
}
```

## Widget Data Binding

### Static Data
```html
<h3 class="mb-0">$125,000</h3>
```

### Dynamic Data (JavaScript)
```javascript
// Update widget values
function updateWidget(elementId, value, change) {
  const element = document.querySelector(elementId);
  if (element) {
    element.textContent = value;
    
    // Update trend indicator
    const trendElement = element.parentNode.querySelector('.trend');
    if (trendElement) {
      trendElement.textContent = change;
      trendElement.className = change > 0 ? 'text-success' : 'text-danger';
    }
  }
}

// Usage
updateWidget('#revenue-value', '$142,350', '+12.5%');
```

### API Integration
```javascript
// Fetch and update widget data
async function updateDashboardWidgets() {
  try {
    const response = await fetch('/api/dashboard-stats');
    const data = await response.json();
    
    // Update metric cards
    updateWidget('#revenue-value', data.revenue, data.revenueChange);
    updateWidget('#users-value', data.activeUsers, data.usersChange);
    
    // Update charts
    salesChart.updateSeries([{
      name: 'Sales',
      data: data.salesData
    }]);
    
  } catch (error) {
    console.error('Failed to update dashboard:', error);
  }
}

// Refresh every 5 minutes
setInterval(updateDashboardWidgets, 300000);
```

## Customization Options

### Color Themes
```scss
// Custom widget colors
.card.bg-gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card.bg-gradient-success {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}
```

### Size Variants
```html
<!-- Small widget -->
<div class="card card-sm">
  <div class="card-body p-3">
    <!-- Reduced padding -->
  </div>
</div>

<!-- Large widget -->
<div class="card card-lg">
  <div class="card-body p-4">
    <!-- Increased padding -->
  </div>
</div>
```

### Animation Effects
```scss
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
}
```

---

## Related References

- **[Chart Components](chart-components.md)** - Detailed chart configuration
- **[Theme Variables](../api/theme-variables.md)** - Customization options
- **[JavaScript API](../api/javascript-api.md)** - Widget methods and events