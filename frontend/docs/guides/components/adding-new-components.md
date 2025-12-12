# 🧩 Adding New Components

Learn how to create custom UI components that integrate seamlessly with Admindek's design system and architecture.

## Overview

This guide shows you how to:
- ✅ Create reusable components following Admindek patterns
- ✅ Integrate with the existing design system
- ✅ Add JavaScript functionality
- ✅ Ensure responsive behavior
- ✅ Maintain consistency with existing components

**Estimated Time:** 30-45 minutes

## Prerequisites

- ✅ Admindek VanillaJS installed and running
- ✅ Basic understanding of HTML, CSS, JavaScript
- ✅ Familiarity with Bootstrap 5 classes
- ✅ Completed [Getting Started tutorial](../../getting-started/first-dashboard.md)

## Step 1: Understanding Component Patterns

### Admindek Component Structure

All Admindek components follow this consistent pattern:

```html
<!-- Standard component wrapper -->
<div class="component-wrapper">
  <!-- Optional component header -->
  <div class="component-header">
    <div class="d-flex align-items-center justify-content-between">
      <h5 class="mb-0">Component Title</h5>
      <!-- Optional actions -->
      <div class="component-actions">
        <button class="btn btn-sm btn-outline-secondary">Action</button>
      </div>
    </div>
  </div>
  
  <!-- Component body -->
  <div class="component-body">
    <!-- Component content goes here -->
  </div>
  
  <!-- Optional component footer -->
  <div class="component-footer">
    <!-- Footer content -->
  </div>
</div>
```

### Card-Based Components

Most Admindek components use Bootstrap's card structure:

```html
<div class="card">
  <div class="card-header">
    <div class="d-flex align-items-center justify-content-between">
      <h5 class="mb-0">Card Title</h5>
      <div class="dropdown">
        <a class="avtar avtar-s btn-link-secondary dropdown-toggle arrow-none" 
           href="#" data-bs-toggle="dropdown">
          <i class="ph-duotone ph-dots-three f-18"></i>
        </a>
        <div class="dropdown-menu dropdown-menu-end">
          <a class="dropdown-item" href="#">Option 1</a>
          <a class="dropdown-item" href="#">Option 2</a>
        </div>
      </div>
    </div>
  </div>
  <div class="card-body">
    <!-- Card content -->
  </div>
</div>
```

## Step 2: Create a Custom Progress Tracker Component

Let's build a **Project Progress Tracker** component from scratch.

### HTML Structure

Create `src/html/components/progress-tracker.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    @@include('../layouts/head-page-meta.html', {'title': 'Progress Tracker Component'})
    @@include('../layouts/head-css.html')
  </head>
  
  <body @@bodySetup>
    @@include('../layouts/layout-vertical.html')
    
    <div class="pc-container">
      <div class="pc-content">
        @@include('../layouts/breadcrumb.html', {
          'breadcrumb-item': 'Components', 
          'breadcrumb-item-active': 'Progress Tracker'
        })
        
        <div class="row">
          <!-- Progress Tracker Component -->
          <div class="col-lg-8">
            <div class="card">
              <div class="card-header">
                <div class="d-flex align-items-center justify-content-between">
                  <h5 class="mb-0">Project Progress Tracker</h5>
                  <div class="dropdown">
                    <a class="avtar avtar-s btn-link-secondary dropdown-toggle arrow-none" 
                       href="#" data-bs-toggle="dropdown">
                      <i class="ph-duotone ph-dots-three f-18"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-end">
                      <a class="dropdown-item" href="#" onclick="addNewProject()">
                        <i class="ph-duotone ph-plus me-2"></i>Add Project
                      </a>
                      <a class="dropdown-item" href="#" onclick="refreshProjects()">
                        <i class="ph-duotone ph-arrow-clockwise me-2"></i>Refresh
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div id="progress-tracker-container">
                  <!-- Dynamic content will be inserted here -->
                </div>
              </div>
            </div>
          </div>
          
          <!-- Component Stats -->
          <div class="col-lg-4">
            <div class="card">
              <div class="card-header">
                <h5 class="mb-0">Project Statistics</h5>
              </div>
              <div class="card-body">
                <div id="project-stats">
                  <!-- Stats will be populated by JavaScript -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    @@include('../layouts/footer-js.html')
    <!-- Component JavaScript -->
    <script src="../assets/js/components/progress-tracker.js"></script>
  </body>
</html>
```

### CSS Styling

Create `src/assets/scss/components/_progress-tracker.scss`:

```scss
// Progress Tracker Component Styles
.progress-tracker {
  &-item {
    padding: 1rem;
    border: 1px solid var(--bs-border-color);
    border-radius: var(--bs-border-radius-lg);
    margin-bottom: 1rem;
    background: var(--bs-card-bg);
    transition: var(--bs-transition-base);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--bs-box-shadow);
    }
    
    &.completed {
      border-color: var(--bs-success);
      background: var(--bs-success-bg-subtle);
      
      .progress-tracker-title {
        color: var(--bs-success-text-emphasis);
      }
    }
    
    &.in-progress {
      border-color: var(--bs-primary);
      background: var(--bs-primary-bg-subtle);
      
      .progress-tracker-title {
        color: var(--bs-primary-text-emphasis);
      }
    }
    
    &.overdue {
      border-color: var(--bs-danger);
      background: var(--bs-danger-bg-subtle);
      
      .progress-tracker-title {
        color: var(--bs-danger-text-emphasis);
      }
    }
  }
  
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }
  
  &-title {
    font-weight: 600;
    margin-bottom: 0;
    color: var(--bs-body-color);
  }
  
  &-status {
    font-size: 0.75rem;
    font-weight: 500;
    padding: 0.25rem 0.5rem;
    border-radius: var(--bs-border-radius-sm);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    
    &.status-completed {
      background: var(--bs-success);
      color: #ffffff;
    }
    
    &.status-in-progress {
      background: var(--bs-primary);
      color: #ffffff;
    }
    
    &.status-pending {
      background: var(--bs-warning);
      color: #ffffff;
    }
    
    &.status-overdue {
      background: var(--bs-danger);
      color: #ffffff;
    }
  }
  
  &-progress {
    margin-bottom: 0.75rem;
    
    .progress {
      height: 8px;
      border-radius: 4px;
      background-color: var(--bs-gray-200);
    }
    
    .progress-bar {
      border-radius: 4px;
      transition: width 0.3s ease;
    }
  }
  
  &-meta {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    color: var(--bs-secondary);
    
    > * {
      margin-right: 1rem;
      
      &:last-child {
        margin-right: 0;
      }
    }
    
    i {
      margin-right: 0.25rem;
    }
  }
  
  &-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    .btn {
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
    }
  }
}

// Responsive adjustments
@media (max-width: 767.98px) {
  .progress-tracker {
    &-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
    
    &-actions {
      width: 100%;
      justify-content: flex-end;
    }
    
    &-meta {
      flex-direction: column;
      align-items: flex-start;
      
      > * {
        margin-right: 0;
        margin-bottom: 0.25rem;
        
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}

// Dark theme adjustments
[data-pc-theme="dark"] {
  .progress-tracker {
    &-item {
      background: var(--bs-dark);
      border-color: var(--bs-border-color);
      
      &.completed {
        background: rgba(var(--bs-success-rgb), 0.1);
      }
      
      &.in-progress {
        background: rgba(var(--bs-primary-rgb), 0.1);
      }
      
      &.overdue {
        background: rgba(var(--bs-danger-rgb), 0.1);
      }
    }
  }
}
```

### JavaScript Functionality

Create `src/assets/js/components/progress-tracker.js`:

```javascript
'use strict';

// Progress Tracker Component
class ProgressTracker {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.projects = [];
    this.init();
  }
  
  init() {
    this.loadSampleData();
    this.render();
    this.updateStats();
    this.bindEvents();
  }
  
  loadSampleData() {
    this.projects = [
      {
        id: 1,
        title: 'Website Redesign',
        progress: 85,
        status: 'in-progress',
        dueDate: '2024-02-15',
        team: 'Design Team',
        priority: 'high'
      },
      {
        id: 2,
        title: 'Mobile App Development',
        progress: 100,
        status: 'completed',
        dueDate: '2024-01-30',
        team: 'Dev Team',
        priority: 'high'
      },
      {
        id: 3,
        title: 'Database Migration',
        progress: 45,
        status: 'in-progress',
        dueDate: '2024-02-28',
        team: 'Backend Team',
        priority: 'medium'
      },
      {
        id: 4,
        title: 'Security Audit',
        progress: 15,
        status: 'overdue',
        dueDate: '2024-01-15',
        team: 'Security Team',
        priority: 'high'
      }
    ];
  }
  
  render() {
    if (!this.container) return;
    
    const html = this.projects.map(project => this.renderProjectItem(project)).join('');
    this.container.innerHTML = html;
  }
  
  renderProjectItem(project) {
    const statusClass = this.getStatusClass(project.status);
    const progressBarClass = this.getProgressBarClass(project.status);
    const isOverdue = this.isOverdue(project.dueDate);
    const itemClass = isOverdue && project.status !== 'completed' ? 'overdue' : project.status;
    
    return `
      <div class="progress-tracker-item ${itemClass}" data-project-id="${project.id}">
        <div class="progress-tracker-header">
          <h6 class="progress-tracker-title">${project.title}</h6>
          <div class="d-flex align-items-center gap-2">
            <span class="progress-tracker-status status-${project.status}">${project.status.replace('-', ' ')}</span>
            <div class="progress-tracker-actions">
              <button class="btn btn-sm btn-outline-primary" onclick="progressTracker.editProject(${project.id})">
                <i class="ph-duotone ph-pencil"></i>
              </button>
              <button class="btn btn-sm btn-outline-danger" onclick="progressTracker.deleteProject(${project.id})">
                <i class="ph-duotone ph-trash"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div class="progress-tracker-progress">
          <div class="progress">
            <div class="progress-bar ${progressBarClass}" 
                 style="width: ${project.progress}%" 
                 role="progressbar" 
                 aria-valuenow="${project.progress}" 
                 aria-valuemin="0" 
                 aria-valuemax="100">
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center mt-1">
            <span class="text-muted f-12">${project.progress}% Complete</span>
            <span class="text-muted f-12">${this.formatDate(project.dueDate)}</span>
          </div>
        </div>
        
        <div class="progress-tracker-meta">
          <div>
            <i class="ph-duotone ph-users f-14"></i>
            ${project.team}
          </div>
          <div>
            <i class="ph-duotone ph-flag f-14"></i>
            <span class="text-capitalize">${project.priority}</span>
          </div>
          <div>
            <i class="ph-duotone ph-calendar f-14"></i>
            ${this.getDaysRemaining(project.dueDate)} days
          </div>
        </div>
      </div>
    `;
  }
  
  getStatusClass(status) {
    const classes = {
      'completed': 'status-completed',
      'in-progress': 'status-in-progress',
      'pending': 'status-pending',
      'overdue': 'status-overdue'
    };
    return classes[status] || 'status-pending';
  }
  
  getProgressBarClass(status) {
    const classes = {
      'completed': 'bg-success',
      'in-progress': 'bg-primary',
      'pending': 'bg-warning',
      'overdue': 'bg-danger'
    };
    return classes[status] || 'bg-primary';
  }
  
  isOverdue(dueDate) {
    return new Date(dueDate) < new Date();
  }
  
  formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  }
  
  getDaysRemaining(dueDate) {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }
  
  updateStats() {
    const stats = this.calculateStats();
    this.renderStats(stats);
  }
  
  calculateStats() {
    const total = this.projects.length;
    const completed = this.projects.filter(p => p.status === 'completed').length;
    const inProgress = this.projects.filter(p => p.status === 'in-progress').length;
    const overdue = this.projects.filter(p => this.isOverdue(p.dueDate) && p.status !== 'completed').length;
    const avgProgress = Math.round(this.projects.reduce((sum, p) => sum + p.progress, 0) / total);
    
    return { total, completed, inProgress, overdue, avgProgress };
  }
  
  renderStats(stats) {
    const statsContainer = document.getElementById('project-stats');
    if (!statsContainer) return;
    
    statsContainer.innerHTML = `
      <div class="row g-3">
        <div class="col-6">
          <div class="d-flex align-items-center">
            <div class="avtar avtar-s bg-primary me-2">
              <i class="ph-duotone ph-chart-pie f-18"></i>
            </div>
            <div>
              <h6 class="mb-0">${stats.total}</h6>
              <p class="text-muted mb-0 f-12">Total Projects</p>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="d-flex align-items-center">
            <div class="avtar avtar-s bg-success me-2">
              <i class="ph-duotone ph-check-circle f-18"></i>
            </div>
            <div>
              <h6 class="mb-0">${stats.completed}</h6>
              <p class="text-muted mb-0 f-12">Completed</p>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="d-flex align-items-center">
            <div class="avtar avtar-s bg-warning me-2">
              <i class="ph-duotone ph-clock f-18"></i>
            </div>
            <div>
              <h6 class="mb-0">${stats.inProgress}</h6>
              <p class="text-muted mb-0 f-12">In Progress</p>
            </div>
          </div>
        </div>
        <div class="col-6">
          <div class="d-flex align-items-center">
            <div class="avtar avtar-s bg-danger me-2">
              <i class="ph-duotone ph-warning f-18"></i>
            </div>
            <div>
              <h6 class="mb-0">${stats.overdue}</h6>
              <p class="text-muted mb-0 f-12">Overdue</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="mt-3">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <span class="f-14">Overall Progress</span>
          <span class="f-14 f-w-600">${stats.avgProgress}%</span>
        </div>
        <div class="progress" style="height: 8px;">
          <div class="progress-bar bg-primary" style="width: ${stats.avgProgress}%"></div>
        </div>
      </div>
    `;
  }
  
  bindEvents() {
    // Add global event delegation for dynamic content
    document.addEventListener('click', (e) => {
      if (e.target.closest('[onclick*="progressTracker."]')) {
        e.preventDefault();
        // Let onclick handlers execute
      }
    });
  }
  
  // Public methods for component interaction
  addProject(projectData) {
    const newProject = {
      id: Date.now(),
      ...projectData
    };
    this.projects.push(newProject);
    this.render();
    this.updateStats();
    this.showNotification('Project added successfully', 'success');
  }
  
  editProject(projectId) {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      // In a real implementation, you'd show a modal or form
      console.log('Edit project:', project);
      this.showNotification(`Editing ${project.title}`, 'info');
    }
  }
  
  deleteProject(projectId) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projects = this.projects.filter(p => p.id !== projectId);
      this.render();
      this.updateStats();
      this.showNotification('Project deleted', 'success');
    }
  }
  
  updateProgress(projectId, newProgress) {
    const project = this.projects.find(p => p.id === projectId);
    if (project) {
      project.progress = newProgress;
      if (newProgress === 100) {
        project.status = 'completed';
      }
      this.render();
      this.updateStats();
    }
  }
  
  showNotification(message, type = 'info') {
    // Simple notification system - you could integrate with toast libraries
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 3000);
  }
}

// Initialize component when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Create global instance
  window.progressTracker = new ProgressTracker('progress-tracker-container');
});

// Global functions for onclick handlers (cleaner than inline handlers)
function addNewProject() {
  window.progressTracker.addProject({
    title: 'New Project ' + Date.now(),
    progress: 0,
    status: 'pending',
    dueDate: '2024-03-01',
    team: 'New Team',
    priority: 'medium'
  });
}

function refreshProjects() {
  window.progressTracker.render();
  window.progressTracker.updateStats();
  window.progressTracker.showNotification('Projects refreshed', 'info');
}
```

## Step 3: Import Component Styles

Add your component styles to the main SCSS file.

**Edit `src/assets/scss/style.scss`:**

```scss
// ... existing imports

// Custom components
@import 'components/progress-tracker';
```

## Step 4: Test Your Component

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Start preview server**:
   ```bash
   npm run preview
   ```

3. **Visit your component**:
   - Navigate to `http://localhost:4173/components/progress-tracker.html`

4. **Test functionality**:
   - ✅ Component renders correctly
   - ✅ Statistics update dynamically
   - ✅ Actions work (edit, delete, add)
   - ✅ Responsive behavior
   - ✅ Dark mode compatibility

## Step 5: Add to Navigation

**Edit `src/html/layouts/menu-list.html`** to add your component to the navigation:

```html
<!-- Find the appropriate menu section and add -->
<li class="pc-item pc-hasmenu">
  <a href="#!" class="pc-link">
    <span class="pc-micon"><i class="ph-duotone ph-puzzle-piece"></i></span>
    <span class="pc-mtext">Custom Components</span>
    <span class="pc-arrow"><i data-feather="chevron-right"></i></span>
  </a>
  <ul class="pc-submenu">
    <li class="pc-item">
      <a class="pc-link" href="../components/progress-tracker.html">Progress Tracker</a>
    </li>
  </ul>
</li>
```

## Step 6: Create Component Variants

### Compact Variant

```html
<!-- Add this CSS class for compact version -->
<div class="card">
  <div class="card-body">
    <div class="progress-tracker compact">
      <!-- Reduced padding and smaller elements -->
    </div>
  </div>
</div>
```

```scss
.progress-tracker.compact {
  .progress-tracker-item {
    padding: 0.75rem;
    margin-bottom: 0.75rem;
  }
  
  .progress-tracker-title {
    font-size: 0.875rem;
  }
  
  .progress-tracker-meta {
    font-size: 0.75rem;
  }
}
```

### List Variant

```html
<!-- Horizontal list layout -->
<div class="progress-tracker list">
  <!-- Items displayed in horizontal layout -->
</div>
```

```scss
.progress-tracker.list {
  .progress-tracker-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 1rem;
    
    .progress-tracker-header {
      flex: 1;
      margin-bottom: 0;
      margin-right: 1rem;
    }
    
    .progress-tracker-progress {
      flex: 2;
      margin-bottom: 0;
      margin-right: 1rem;
    }
    
    .progress-tracker-meta {
      flex: 1;
      justify-content: flex-end;
    }
  }
}
```

## Step 7: Advanced Features

### Real-time Updates

```javascript
// Add real-time update capability
class ProgressTracker {
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    this.options = {
      autoRefresh: false,
      refreshInterval: 30000, // 30 seconds
      apiEndpoint: null,
      ...options
    };
    
    if (this.options.autoRefresh) {
      this.startAutoRefresh();
    }
  }
  
  startAutoRefresh() {
    this.refreshTimer = setInterval(() => {
      this.fetchProjects();
    }, this.options.refreshInterval);
  }
  
  async fetchProjects() {
    if (!this.options.apiEndpoint) return;
    
    try {
      const response = await fetch(this.options.apiEndpoint);
      const projects = await response.json();
      this.projects = projects;
      this.render();
      this.updateStats();
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  }
}
```

### Drag and Drop

```javascript
// Add drag and drop sorting
initDragAndDrop() {
  // Require SortableJS library
  if (typeof Sortable !== 'undefined') {
    new Sortable(this.container, {
      animation: 150,
      ghostClass: 'sortable-ghost',
      onEnd: (evt) => {
        this.reorderProjects(evt.oldIndex, evt.newIndex);
      }
    });
  }
}

reorderProjects(oldIndex, newIndex) {
  const project = this.projects.splice(oldIndex, 1)[0];
  this.projects.splice(newIndex, 0, project);
  this.render();
}
```

### Export Functionality

```javascript
// Add export capabilities
exportData(format = 'json') {
  const data = this.projects;
  
  switch (format) {
    case 'json':
      this.downloadJSON(data);
      break;
    case 'csv':
      this.downloadCSV(data);
      break;
  }
}

downloadJSON(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { 
    type: 'application/json' 
  });
  this.downloadBlob(blob, 'projects.json');
}

downloadCSV(data) {
  const csv = this.convertToCSV(data);
  const blob = new Blob([csv], { type: 'text/csv' });
  this.downloadBlob(blob, 'projects.csv');
}
```

## Best Practices

### Component Guidelines

1. **Follow Admindek Patterns**
   - Use consistent class naming (`component-element`)
   - Follow Bootstrap utility classes
   - Maintain responsive behavior

2. **Accessibility**
   ```html
   <!-- Add proper ARIA attributes -->
   <div role="progressbar" 
        aria-valuenow="75" 
        aria-valuemin="0" 
        aria-valuemax="100">
   </div>
   
   <!-- Use semantic HTML -->
   <button type="button" aria-label="Edit project">
     <i class="ph-duotone ph-pencil"></i>
   </button>
   ```

3. **Performance**
   - Use event delegation for dynamic content
   - Implement virtual scrolling for large lists
   - Debounce expensive operations

4. **Error Handling**
   ```javascript
   render() {
     try {
       // Rendering logic
       this.container.innerHTML = html;
     } catch (error) {
       console.error('Render error:', error);
       this.showError('Failed to render component');
     }
   }
   ```

## Troubleshooting

### Common Issues

**Styles not applying:**
- Check SCSS import order
- Verify class name specificity
- Clear browser cache

**JavaScript errors:**
- Check console for error messages
- Verify element IDs exist
- Ensure proper event binding

**Responsive issues:**
- Test on different screen sizes
- Use Bootstrap breakpoint utilities
- Check flex/grid layouts

---

## Next Steps

🎉 **Congratulations!** You've created a fully functional custom component.

**What's next?**
- [Chart Integration](chart-integration.md) - Add interactive charts to your components
- [Form Validation Setup](form-validation-setup.md) - Create form-based components
- [Widget Development](widget-development.md) - Build dashboard widgets

**Advanced topics:**
- Component testing strategies
- State management patterns
- API integration techniques