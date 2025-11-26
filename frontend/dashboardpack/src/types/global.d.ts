// Global type definitions for Admindek template

declare global {
  interface Window {
    // Theme functionality
    layout_change: (theme: 'light' | 'dark') => void;
    layout_change_default: () => void;
    change_box_container: (enabled: 'true' | 'false') => void;
    layout_caption_change: (enabled: 'true' | 'false') => void;
    layout_rtl_change: (enabled: 'true' | 'false') => void;
    preset_change: (preset: string) => void;
    layout_theme_sidebar_change: (enabled: 'true' | 'false') => void;
    header_change: (theme: string) => void;
    navbar_change: (theme: string) => void;
    logo_change: (theme: string) => void;
    caption_change: (theme: string) => void;
    nav_image_change: (theme: string) => void;
    drp_menu_icon_change: (theme: string) => void;
    drp_menu_link_icon_change: (theme: string) => void;

    // Global variables
    dark_layout?: string;
    flg?: string;

    // Vendor libraries
    bootstrap: typeof import('bootstrap');
    ApexCharts: typeof import('apexcharts').default;
    flatpickr: typeof import('flatpickr').default;
    Swal: typeof import('sweetalert2').default;

    // Hot module replacement
    module?: {
      hot?: {
        accept: (dependencies?: string | string[], callback?: () => void) => void;
      };
    };
  }

  // CSS Modules
  declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
  }

  declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
  }

  // Asset imports
  declare module '*.png';
  declare module '*.jpg';
  declare module '*.jpeg';
  declare module '*.gif';
  declare module '*.svg';
  declare module '*.webp';
  declare module '*.woff';
  declare module '*.woff2';
  declare module '*.ttf';
  declare module '*.eot';

  // Template specific types
  namespace AdmindekTheme {
    interface ThemeConfig {
      theme: 'light' | 'dark' | 'default';
      preset: string;
      direction: 'ltr' | 'rtl';
      layoutWidth: 'full' | 'box';
      sidebarTheme: 'light' | 'dark';
      headerTheme: string;
    }

    interface SidebarItem {
      id: string;
      title: string;
      icon?: string;
      url?: string;
      children?: SidebarItem[];
      active?: boolean;
      disabled?: boolean;
    }

    interface NotificationItem {
      id: string;
      title: string;
      message: string;
      time: string;
      type: 'info' | 'success' | 'warning' | 'error';
      read: boolean;
      avatar?: string;
    }

    interface ChartConfig {
      type: string;
      data: any;
      options: any;
    }
  }
}

export {};