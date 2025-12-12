# 🎯 Creating Your First Dashboard

Now that you have Admindek installed, let's create your first custom dashboard page. This tutorial will teach you the fundamentals of working with Admindek's templating system.

## What You'll Build

By the end of this tutorial, you'll have created a custom dashboard page with:
- ✅ Custom page title and breadcrumbs
- ✅ Revenue and user metrics cards
- ✅ Interactive sales chart
- ✅ Recent activity table
- ✅ Proper navigation integration

## Understanding the Template System

Admindek uses a **template include system** with the `@@include()` syntax:

```html
@@include('../layouts/layout-vertical.html')
@@include('../layouts/breadcrumb.html', {'title': 'My Dashboard'})
```

This allows you to:
- Reuse layout components
- Pass dynamic variables
- Maintain consistent structure

## Step 1: Create Your Dashboard File

1. **Create a new file** at `src/html/dashboard/my-dashboard.html`
2. **Copy this starter template**:

```html
<!doctype html>
<html lang="en">
  <!-- [Head] start -->
  <head>
    @@include('../layouts/head-page-meta.html', {'title': 'My Custom Dashboard'})
    <!-- Chart CSS -->
    <link rel="stylesheet" href="../assets/css/plugins/apexcharts.css" />
    @@include('../layouts/head-css.html')
  </head>
  <!-- [Head] end -->

  <!-- [Body] Start -->
  <body @@bodySetup>
    @@include('../layouts/layout-vertical.html')

    <!-- [ Main Content ] start -->
    <div class="pc-container">
      <div class="pc-content">
        @@include('../layouts/breadcrumb.html', {
          'breadcrumb-item': 'Dashboard', 
          'breadcrumb-item-active': 'My Dashboard'
        })
        
        <!-- [ Main Content ] start -->
        <div class="row">
          <!-- We'll add content here -->
        </div>
        <!-- [ Main Content ] end -->
      </div>
    </div>
    <!-- [ Main Content ] end -->

    @@include('../layouts/footer-js.html')
  </body>
  <!-- [Body] end -->
</html>
```

## Step 2: Add Metric Cards

Add these metric cards inside the `<div class="row">`:

```html
<!-- [ Metrics Cards ] start -->
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

<div class="col-md-6 col-xl-3">
  <div class="card">
    <div class="card-body">
      <div class="d-flex align-items-center">
        <div class="flex-grow-1">
          <h6 class="mb-2">Active Users</h6>
          <h3 class="mb-0 f-w-300">8,549</h3>
          <p class="text-muted mb-0">
            <span class="text-success f-12 me-1">
              <i class="ph-duotone ph-trend-up me-1"></i>8.2%
            </span>
            from last week
          </p>
        </div>
        <div class="flex-shrink-0">
          <div class="avtar avtar-s bg-success">
            <i class="ph-duotone ph-users f-18"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="col-md-6 col-xl-3">
  <div class="card">
    <div class="card-body">
      <div class="d-flex align-items-center">
        <div class="flex-grow-1">
          <h6 class="mb-2">Orders</h6>
          <h3 class="mb-0 f-w-300">1,423</h3>
          <p class="text-muted mb-0">
            <span class="text-danger f-12 me-1">
              <i class="ph-duotone ph-trend-down me-1"></i>3.1%
            </span>
            from yesterday
          </p>
        </div>
        <div class="flex-shrink-0">
          <div class="avtar avtar-s bg-warning">
            <i class="ph-duotone ph-shopping-cart f-18"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="col-md-6 col-xl-3">
  <div class="card">
    <div class="card-body">
      <div class="d-flex align-items-center">
        <div class="flex-grow-1">
          <h6 class="mb-2">Conversion Rate</h6>
          <h3 class="mb-0 f-w-300">3.64%</h3>
          <p class="text-muted mb-0">
            <span class="text-success f-12 me-1">
              <i class="ph-duotone ph-trend-up me-1"></i>0.5%
            </span>
            from last month
          </p>
        </div>
        <div class="flex-shrink-0">
          <div class="avtar avtar-s bg-info">
            <i class="ph-duotone ph-chart-line f-18"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- [ Metrics Cards ] end -->
```

## Step 3: Add a Sales Chart

Add this chart section after the metric cards:

```html
<!-- [ Sales Chart ] start -->
<div class="col-lg-8">
  <div class="card">
    <div class="card-header">
      <div class="d-flex align-items-center justify-content-between">
        <h5 class="mb-0">Sales Overview</h5>
        <div class="dropdown">
          <a class="avtar avtar-s btn-link-secondary dropdown-toggle arrow-none" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
      <div id="my-dashboard-chart"></div>
    </div>
  </div>
</div>
<!-- [ Sales Chart ] end -->
```

## Step 4: Add Recent Activity

Add this activity section:

```html
<!-- [ Recent Activity ] start -->
<div class="col-lg-4">
  <div class="card">
    <div class="card-header">
      <h5 class="mb-0">Recent Activity</h5>
    </div>
    <div class="card-body">
      <div class="d-flex align-items-center mb-3">
        <div class="flex-shrink-0">
          <div class="avtar avtar-s bg-light-primary">
            <i class="ph-duotone ph-user-plus f-16"></i>
          </div>
        </div>
        <div class="flex-grow-1 ms-3">
          <h6 class="mb-0 f-14">New user registered</h6>
          <p class="text-muted mb-0 f-12">2 minutes ago</p>
        </div>
      </div>
      
      <div class="d-flex align-items-center mb-3">
        <div class="flex-shrink-0">
          <div class="avtar avtar-s bg-light-success">
            <i class="ph-duotone ph-shopping-bag f-16"></i>
          </div>
        </div>
        <div class="flex-grow-1 ms-3">
          <h6 class="mb-0 f-14">Order completed</h6>
          <p class="text-muted mb-0 f-12">5 minutes ago</p>
        </div>
      </div>
      
      <div class="d-flex align-items-center mb-3">
        <div class="flex-shrink-0">
          <div class="avtar avtar-s bg-light-warning">
            <i class="ph-duotone ph-bell f-16"></i>
          </div>
        </div>
        <div class="flex-grow-1 ms-3">
          <h6 class="mb-0 f-14">New notification</h6>
          <p class="text-muted mb-0 f-12">8 minutes ago</p>
        </div>
      </div>
    </div>
  </div>
</div>
<!-- [ Recent Activity ] end -->
```

## Step 5: Add Chart JavaScript

Create a JavaScript file at `src/assets/js/dashboard/my-dashboard.js`:

```javascript
'use strict';
document.addEventListener('DOMContentLoaded', function () {
  // Sales Overview Chart
  var options = {
    chart: {
      height: 300,
      type: 'area',
      toolbar: {
        show: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    series: [
      {
        name: 'Sales',
        data: [31, 40, 28, 51, 42, 109, 100]
      },
      {
        name: 'Revenue',
        data: [11, 32, 45, 32, 34, 52, 41]
      }
    ],
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    colors: ['#4f46e5', '#10b981'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 80, 100]
      }
    }
  };

  var chart = new ApexCharts(document.querySelector('#my-dashboard-chart'), options);
  chart.render();
});
```

## Step 6: Include the JavaScript

Add this line before the closing `</body>` tag in your HTML file:

```html
<!-- Custom Dashboard JS -->
<script src="../assets/js/dashboard/my-dashboard.js"></script>
```

## Step 7: Build and Test

1. **Save all files**
2. **The development server will automatically rebuild**
3. **Visit your new dashboard**: `http://localhost:3000/dashboard/my-dashboard.html`

## Navigation Integration

To add your dashboard to the sidebar navigation:

1. **Open** `src/html/layouts/menu-list.html`
2. **Find** the Dashboard section
3. **Add your menu item**:

```html
<li class="pc-item">
  <a href="../dashboard/my-dashboard.html" class="pc-link">
    <span class="pc-micon"><i class="ph-duotone ph-chart-pie"></i></span>
    <span class="pc-mtext">My Dashboard</span>
  </a>
</li>
```

## Understanding What You Built

### Template Structure
- **Head section**: Page metadata and CSS includes
- **Body setup**: Theme configuration via `@@bodySetup`
- **Layout include**: Main sidebar and header structure
- **Breadcrumbs**: Dynamic navigation path
- **Content area**: Your custom dashboard content

### Component Patterns
- **Metric cards**: Consistent structure for KPI display
- **Chart containers**: Proper div structure for ApexCharts
- **Activity feed**: Timeline-style information display

### JavaScript Integration
- **Document ready**: Ensures DOM is loaded before execution
- **ApexCharts**: Modern chart library integration
- **Responsive design**: Charts adapt to container size

## Next Steps

🎉 **Congratulations!** You've created your first custom dashboard.

**What's next?**
- [Customize the Theme](customizing-theme.md) - Apply your branding
- [Learn Component Patterns](../guides/components/widget-development.md) - Build more complex widgets
- [Explore Chart Types](../reference/components/chart-components.md) - Add different visualizations

## Common Customizations

### Change Colors
```javascript
colors: ['#your-primary-color', '#your-secondary-color']
```

### Add More Metrics
Copy the metric card pattern and update:
- Icon class
- Background color class
- Values and labels

### Modify Chart Type
Change `type: 'area'` to:
- `'line'` for line charts
- `'bar'` for bar charts
- `'donut'` for donut charts

---

**Ready to make it yours?** Continue with [Customizing Theme](customizing-theme.md) 👉