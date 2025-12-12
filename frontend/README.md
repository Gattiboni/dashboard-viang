# Admindek-VanillaJS

A modern, responsive admin dashboard template built with **Bootstrap 5** and **Vanilla JavaScript**. Powered by **Vite 7** for lightning-fast development and production builds.

![Admindek Dashboard Preview](https://colorlib.com/wp/wp-content/uploads/sites/2/admindek-vanillajs-preview.png.avif)

## ✨ Features

- **🎨 Modern Design**: Clean and professional admin interface
- **📱 Fully Responsive**: Works perfectly on all devices
- **🌙 Dark Mode**: Built-in dark/light theme switching
- **🌍 RTL Support**: Complete right-to-left language support
- **📊 Rich Components**: 100+ UI components and widgets
- **📈 Charts & Analytics**: ApexCharts, Peity, and vector maps
- **📋 Data Tables**: Full-featured DataTables with extensions
- **📝 Form Elements**: Comprehensive form components and validation
- **🔐 Authentication**: Multiple login and registration layouts
- **⚡ Fast Build**: Vite 7 for optimal performance

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Admindek-VanillaJS

# Install dependencies
npm install

# Start development server with file watching
npm run dev  # Automatically rebuilds on file changes

# In another terminal, start the preview server
npm run preview  # Opens at http://localhost:4173
```

The development watcher will automatically rebuild when you edit files in `src/` directory.

## 📦 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development watcher (auto-rebuilds on file changes) |
| `npm start` | Build and start preview server |
| `npm run build` | Build for development with sourcemaps |
| `npm run build-prod` | Build for production (minified) |
| `npm run preview` | Preview built files on localhost:4173 |
| `npm run format` | Format code with Prettier |
| `npm run clean-duplicates` | Remove duplicate files |

## 🏗️ Project Structure

```
Admindek-VanillaJS/
├── src/                          # Source files
│   ├── html/                     # HTML templates
│   │   ├── layouts/             # Reusable layout components
│   │   ├── dashboard/           # Dashboard pages
│   │   ├── application/         # App pages (calendar, chat, etc.)
│   │   ├── pages/               # Authentication & error pages
│   │   ├── elements/            # UI component examples
│   │   ├── forms/               # Form components
│   │   ├── table/               # Data table examples
│   │   └── widget/              # Widget components
│   ├── assets/
│   │   ├── scss/                # SCSS source files
│   │   │   ├── settings/        # Theme variables
│   │   │   ├── themes/          # Component & layout styles
│   │   │   └── components/      # Bootstrap customizations
│   │   ├── js/                  # JavaScript files
│   │   │   ├── widgets/         # Chart widgets
│   │   │   ├── elements/        # Component scripts
│   │   │   ├── forms/           # Form functionality
│   │   │   └── admin/           # Admin-specific scripts
│   │   ├── images/              # Image assets
│   │   └── json/                # JSON data files
│   ├── main.js                  # Vite entry point
│   ├── style.js                 # Main stylesheet entry
│   ├── style-preset.js          # Preset theme styles
│   ├── uikit.js                 # UI components styles
│   └── landing.js               # Landing page styles
├── dist/                         # Built files (auto-generated)
├── plugins/                      # Custom Vite plugins
│   ├── vite-plugin-file-include.js
│   ├── vite-plugin-copy-assets.js
│   └── vite-plugin-html-dev-server.js
├── dev-watch.js                 # Custom file watcher for development
├── clean-duplicates.js          # Utility to remove duplicate files
├── vite.config.js               # Vite configuration
└── package.json
```

## 🎨 Theme Configuration

### Layout Presets
Choose from 10 different color presets by modifying `vite.config.js`:

```javascript
const preset_theme = 'preset-1' // preset-1 to preset-10
```

### Theme Options
- **Dark Mode**: `dark_layout = 'true'`
- **RTL Layout**: `rtl_layout = 'true'`
- **Sidebar Theme**: `sidebar_theme = 'dark'` or `'light'`
- **Box Container**: `box_container = 'true'`

### SCSS Customization
- Theme variables: `src/assets/scss/settings/`
- Component styles: `src/assets/scss/themes/components/`
- Layout styles: `src/assets/scss/themes/layouts/`

## 🔧 HTML Templating

Uses custom Vite plugin with `@@include()` syntax:

```html
<!-- Include layout -->
@@include('layouts/layout-vertical.html', {
  "title": "Dashboard",
  "page": "dashboard"
})

<!-- Include components -->
@@include('layouts/breadcrumb.html', {
  "breadcrumb-title": "Dashboard",
  "breadcrumb-item": "Home"
})
```

## 📊 Built-in Libraries

### UI & Components
- **Bootstrap 5** - CSS framework
- **Animate.css** - CSS animations
- **Choices.js** - Enhanced select boxes
- **Dragula** - Drag & drop
- **Swiper** - Touch sliders

### Charts & Visualization
- **ApexCharts** - Modern charting library
- **Peity** - Inline charts
- **JSVectorMap** - Interactive maps

### Data Tables
- **DataTables** with all extensions
- **Simple DataTables** - Lightweight alternative

### Form Components
- **Flatpickr** - Date picker
- **Nouislider** - Range sliders
- **Quill & TinyMCE** - Rich text editors
- **Uppy** - File uploads

### Development Tools
- **Vite 7** - Build tool
- **Sass** - CSS preprocessor  
- **Prettier** - Code formatting
- **Chokidar** - File watching

## 🌐 Page Examples

### Dashboard Pages
- Analytics Dashboard
- E-commerce Dashboard
- CRM Dashboard
- Crypto Dashboard
- Finance Dashboard
- Project Dashboard

### Application Pages
- Calendar
- Chat
- User Profile
- Task Board
- Gallery
- Invoice Management

### Authentication
- Login (5 variants)
- Register (5 variants)
- Reset Password (5 variants)
- Change Password (5 variants)

## 🔨 Build System

Built with **Vite 7** for:
- ⚡ Lightning-fast builds
- 🔄 Hot module replacement
- 📦 Tree-shaking optimization
- 🎯 Legacy browser support
- 📱 Development preview server

### Custom Plugins
- **File Include Plugin**: Handles `@@include()` syntax
- **Copy Assets Plugin**: Copies vendor libraries
- **HTML Processor**: Compiles templates during build

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Format code with `npm run format`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏢 About DashboardPack

Created by [DashboardPack](https://dashboardpack.com/)
- Email: dashboardpack@gmail.com
- Website: https://dashboardpack.com/

---

**Version**: 3.1.0 | **Build System**: Vite 7 | **Framework**: Bootstrap 5