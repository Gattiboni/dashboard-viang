# 📊 Chart Integration

Complete guide to integrating and customizing charts in Admindek VanillaJS using ApexCharts.

## Overview

Admindek includes **ApexCharts 4.7.0** as the primary charting library, providing 30+ chart types with responsive design and interactive features.

## Basic Chart Setup

### 1. HTML Container

```html
<!-- Chart container with unique ID -->
<div class="card">
  <div class="card-header">
    <h5 class="mb-0">Sales Analytics</h5>
  </div>
  <div class="card-body">
    <div id="sales-chart"></div>
  </div>
</div>
```

### 2. JavaScript Configuration (Actual Admindek Implementation)

```javascript
// Bar chart example from actual codebase (src/assets/js/widgets/bar-chart.js)
'use strict';
document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    var options = {
      series: [
        {
          name: 'News',
          data: [53, 13, 30, 4]
        }
      ],
      chart: {
        height: 250,
        type: 'bar',
        toolbar: {
          show: false
        }
      },
      colors: ['#1de9b6', '#a389d4', '#04a9f5', '#f44236'],
      fill: {
        type: 'gradient',
        opacity: 1,
        gradient: {
          shade: 'dark',
          type: 'vertical',
          gradientToColors: ['#1dc4e9', '#899ed4', '#049df5', '#f48f36'],
          stops: [0, 100]
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '35%',
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      grid: {
        show: false
      },
      yaxis: {
        show: false
      },
      xaxis: {
        axisBorder: {
          show: false
        },
        categories: ['Sport', 'Music', 'Travel', 'News']
      },
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return '';
            }
          }
        },
        marker: {
          show: false
        }
      }
    };
    var chart = new ApexCharts(document.querySelector('#bar-chart'), options);
    chart.render();
  }, 500);
});
```

## Chart Types

### Area Chart

```javascript
const areaOptions = {
  chart: {
    height: 300,
    type: 'area',
    toolbar: { show: false }
  },
  series: [{
    name: 'Revenue',
    data: [31, 40, 28, 51, 42, 109, 100]
  }, {
    name: 'Profit',
    data: [11, 32, 45, 32, 34, 52, 41]
  }],
  colors: ['#4f46e5', '#10b981'],
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.3
    }
  },
  stroke: {
    curve: 'smooth'
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
  }
};
```

### Bar Chart

```javascript
const barOptions = {
  chart: {
    height: 350,
    type: 'bar'
  },
  series: [{
    name: 'Products Sold',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
  }],
  colors: ['#4f46e5'],
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: false,
    }
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9']
  }
};
```

### Donut Chart

```javascript
const donutOptions = {
  chart: {
    type: 'donut',
    height: 300
  },
  series: [44, 55, 41, 17, 15],
  labels: ['Desktop', 'Mobile', 'Tablet', 'Smart TV', 'Others'],
  colors: ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#6c757d'],
  plotOptions: {
    pie: {
      donut: {
        size: '70%',
        labels: {
          show: true,
          total: {
            show: true,
            label: 'Total',
            color: '#6c757d',
            formatter: function (w) {
              return w.globals.seriesTotals.reduce((a, b) => {
                return a + b;
              }, 0);
            }
          }
        }
      }
    }
  }
};
```

## Dashboard Integration

### Widget Chart Pattern

```javascript
// Reusable widget chart function
function createWidgetChart(selector, options = {}) {
  const defaultOptions = {
    chart: {
      height: 60,
      type: 'area',
      sparkline: {
        enabled: true
      }
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.1
      }
    },
    tooltip: {
      fixed: {
        enabled: false
      },
      x: {
        show: false
      },
      marker: {
        show: false
      }
    }
  };
  
  const finalOptions = { ...defaultOptions, ...options };
  const chart = new ApexCharts(document.querySelector(selector), finalOptions);
  chart.render();
  return chart;
}

// Usage in KPI widgets
createWidgetChart('#revenue-spark', {
  series: [{
    data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
  }],
  colors: ['#4f46e5']
});
```

### Real-time Chart Updates

```javascript
// Real-time data updates
let realtimeChart;

function initRealtimeChart() {
  const options = {
    chart: {
      height: 350,
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      toolbar: { show: false }
    },
    series: [{
      name: 'Live Data',
      data: []
    }],
    colors: ['#4f46e5'],
    stroke: {
      curve: 'smooth',
      width: 3
    },
    xaxis: {
      type: 'datetime',
      range: 300000 // 5 minutes
    },
    yaxis: {
      max: 100
    }
  };
  
  realtimeChart = new ApexCharts(document.querySelector("#realtime-chart"), options);
  realtimeChart.render();
  
  // Start updating data
  setInterval(updateRealtimeChart, 2000);
}

function updateRealtimeChart() {
  const newData = {
    x: new Date().getTime(),
    y: Math.floor(Math.random() * 100)
  };
  
  realtimeChart.appendData([{
    data: [newData]
  }]);
}
```

## Advanced Customization

### Custom Themes

```javascript
// Dark theme configuration
const darkThemeOptions = {
  theme: {
    mode: 'dark',
    palette: 'palette1'
  },
  chart: {
    background: '#1e293b',
    foreColor: '#e2e8f0'
  },
  grid: {
    borderColor: '#334155'
  },
  xaxis: {
    axisBorder: {
      color: '#334155'
    },
    axisTicks: {
      color: '#334155'
    }
  },
  yaxis: {
    axisBorder: {
      color: '#334155'
    }
  }
};

// Apply theme based on current mode
function getChartTheme() {
  const isDark = document.body.getAttribute('data-pc-theme') === 'dark';
  return isDark ? darkThemeOptions : {};
}

// Use in chart creation
const chartOptions = {
  // ... other options
  ...getChartTheme()
};
```

### Responsive Configuration

```javascript
const responsiveOptions = {
  chart: {
    height: 350
  },
  responsive: [{
    breakpoint: 768,
    options: {
      chart: {
        height: 250
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      legend: {
        position: 'bottom'
      }
    }
  }, {
    breakpoint: 480,
    options: {
      chart: {
        height: 200
      },
      legend: {
        show: false
      }
    }
  }]
};
```

## Data Integration

### API Data Loading

```javascript
// Fetch data from API
async function loadChartData(endpoint) {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error loading chart data:', error);
    return null;
  }
}

// Create chart with API data
async function createAPIChart() {
  const data = await loadChartData('/api/sales-data');
  
  if (data) {
    const options = {
      chart: {
        type: 'line',
        height: 350
      },
      series: data.series,
      xaxis: {
        categories: data.categories
      },
      colors: ['#4f46e5']
    };
    
    const chart = new ApexCharts(document.querySelector("#api-chart"), options);
    chart.render();
  }
}
```

### CSV Data Import

```javascript
// Parse CSV data for charts
function parseCSVForChart(csvText) {
  const lines = csvText.split('\n');
  const headers = lines[0].split(',');
  
  const categories = [];
  const series = [];
  
  // Initialize series for each column (except first)
  for (let i = 1; i < headers.length; i++) {
    series.push({
      name: headers[i].trim(),
      data: []
    });
  }
  
  // Parse data rows
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    if (values.length > 1) {
      categories.push(values[0].trim());
      
      for (let j = 1; j < values.length; j++) {
        const value = parseFloat(values[j]) || 0;
        series[j - 1].data.push(value);
      }
    }
  }
  
  return { categories, series };
}

// Use with file input
document.getElementById('csv-input').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const csvData = parseCSVForChart(e.target.result);
      
      const options = {
        chart: {
          type: 'line',
          height: 350
        },
        series: csvData.series,
        xaxis: {
          categories: csvData.categories
        }
      };
      
      const chart = new ApexCharts(document.querySelector("#csv-chart"), options);
      chart.render();
    };
    reader.readAsText(file);
  }
});
```

## Chart Interactions

### Click Events

```javascript
const interactiveOptions = {
  // ... chart options
  chart: {
    events: {
      dataPointSelection: function(event, chartContext, config) {
        const selectedData = {
          seriesIndex: config.seriesIndex,
          dataPointIndex: config.dataPointIndex,
          value: config.w.config.series[config.seriesIndex].data[config.dataPointIndex]
        };
        
        console.log('Selected:', selectedData);
        
        // Update other charts or UI based on selection
        updateRelatedCharts(selectedData);
      }
    }
  }
};
```

### Zoom and Pan

```javascript
const zoomOptions = {
  chart: {
    type: 'line',
    zoom: {
      enabled: true,
      type: 'x'
    },
    pan: {
      enabled: true,
      type: 'x'
    }
  },
  // ... other options
};
```

## Performance Optimization

### Lazy Loading Charts

```javascript
// Lazy load charts when they come into view
const chartObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const chartId = entry.target.getAttribute('data-chart-id');
      loadChart(chartId, entry.target);
      chartObserver.unobserve(entry.target);
    }
  });
});

// Observe chart containers
document.querySelectorAll('[data-chart-id]').forEach(container => {
  chartObserver.observe(container);
});

function loadChart(chartId, container) {
  // Load chart configuration based on ID
  const options = getChartOptions(chartId);
  const chart = new ApexCharts(container, options);
  chart.render();
}
```

### Memory Management

```javascript
// Clean up charts when navigating away
let chartInstances = [];

function createChart(selector, options) {
  const chart = new ApexCharts(document.querySelector(selector), options);
  chart.render();
  
  // Track instance for cleanup
  chartInstances.push(chart);
  
  return chart;
}

// Clean up on page unload
window.addEventListener('beforeunload', () => {
  chartInstances.forEach(chart => {
    if (chart && chart.destroy) {
      chart.destroy();
    }
  });
  chartInstances = [];
});
```

## Troubleshooting

### Common Issues

**Chart not rendering:**
```javascript
// Ensure container exists before creating chart
const container = document.querySelector("#chart-container");
if (container) {
  const chart = new ApexCharts(container, options);
  chart.render();
} else {
  console.error('Chart container not found');
}
```

**Responsive issues:**
```javascript
// Force resize after container size changes
window.addEventListener('resize', () => {
  if (chart) {
    chart.resize();
  }
});
```

**Data formatting:**
```javascript
// Ensure data is properly formatted
function validateChartData(data) {
  if (!Array.isArray(data)) {
    console.error('Chart data must be an array');
    return false;
  }
  
  return data.every(item => 
    typeof item === 'number' || 
    (typeof item === 'object' && item.x && item.y)
  );
}
```

---

## Summary

ApexCharts integration in Admindek provides:

- **30+ chart types** for all visualization needs
- **Responsive design** that adapts to all screen sizes
- **Real-time updates** for dynamic data
- **Interactive features** with click, zoom, and pan
- **Theme integration** with Admindek's design system
- **Performance optimization** with lazy loading
- **API integration** for dynamic data sources

This comprehensive charting system enables you to create professional data visualizations that seamlessly integrate with Admindek's design and functionality.