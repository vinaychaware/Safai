// Navigation component - Simplified for better compatibility
class Navigation {
  constructor() {
    this.sidebar = document.getElementById('sidebar');
    this.sidebarNav = document.getElementById('sidebarNav');
    this.mainContent = document.getElementById('mainContent');
    this.currentUser = null;
    this.currentRole = null;
    this.mobileToggle = null;
    
    // Bind methods to preserve context
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleEscapeKey = this.handleEscapeKey.bind(this);
  }

  init() {
    // Handle navigation clicks
    if (this.sidebarNav) {
      this.sidebarNav.addEventListener('click', (e) => {
        const link = e.target.closest('.nav-link');
        if (link) {
          e.preventDefault();
          const section = link.dataset.section;
          if (section) {
            this.navigateTo(section);
          }
        }
      });
    }

    // Setup mobile functionality
    this.setupMobileToggle();
    
    // Setup escape key handler
    document.addEventListener('keydown', this.handleEscapeKey);
  }

  setupMobileToggle() {
    const navContainer = document.querySelector('.nav-container');
    if (!navContainer) return;
    
    // Remove existing mobile toggle if present
    const existingToggle = navContainer.querySelector('.mobile-toggle');
    if (existingToggle) {
      existingToggle.remove();
    }
    
    // Create new mobile toggle
    this.mobileToggle = document.createElement('button');
    this.mobileToggle.className = 'mobile-toggle';
    this.mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    this.mobileToggle.setAttribute('aria-label', 'Toggle navigation menu');
    this.mobileToggle.setAttribute('aria-expanded', 'false');
    
    // Insert before user info
    const userInfo = navContainer.querySelector('.nav-user');
    if (userInfo) {
      navContainer.insertBefore(this.mobileToggle, userInfo);
    } else {
      navContainer.appendChild(this.mobileToggle);
    }

    // Add click handler
    this.mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMobileSidebar();
    });

    // Handle responsive display
    this.handleMobileToggleDisplay();
  }

  handleMobileToggleDisplay() {
    if (!this.mobileToggle) return;
    
    const mediaQuery = window.matchMedia('(max-width: 1199px)');
    const handleMediaQuery = (e) => {
      this.mobileToggle.style.display = e.matches ? 'flex' : 'none';
      
      if (!e.matches && this.sidebar) {
        this.closeMobileSidebar();
      }
    };

    mediaQuery.addEventListener('change', handleMediaQuery);
    handleMediaQuery(mediaQuery);
  }

  toggleMobileSidebar() {
    if (!this.sidebar || !this.mobileToggle) return;
    
    const isOpen = this.sidebar.classList.contains('mobile-open');
    
    if (isOpen) {
      this.closeMobileSidebar();
    } else {
      this.openMobileSidebar();
    }
  }

  openMobileSidebar() {
    if (!this.sidebar || !this.mobileToggle) return;
    
    this.sidebar.classList.add('mobile-open');
    this.mobileToggle.setAttribute('aria-expanded', 'true');
    this.mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
    document.body.style.overflow = 'hidden';
    
    // Add event listeners for closing
    setTimeout(() => {
      document.addEventListener('click', this.handleClickOutside);
    }, 100);
  }

  closeMobileSidebar() {
    if (!this.sidebar || !this.mobileToggle) return;
    
    this.sidebar.classList.remove('mobile-open');
    this.mobileToggle.setAttribute('aria-expanded', 'false');
    this.mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = '';
    
    // Remove event listeners
    document.removeEventListener('click', this.handleClickOutside);
  }

  handleClickOutside(e) {
    if (!this.sidebar || !this.mobileToggle) return;
    
    if (!this.sidebar.contains(e.target) && !this.mobileToggle.contains(e.target)) {
      this.closeMobileSidebar();
    }
  }

  handleEscapeKey(e) {
    if (e.key === 'Escape' && this.sidebar && this.sidebar.classList.contains('mobile-open')) {
      this.closeMobileSidebar();
      if (this.mobileToggle) {
        this.mobileToggle.focus();
      }
    }
  }

  setUser(user, role) {
    this.currentUser = user;
    this.currentRole = role;
    this.updateNavigation();
  }

  updateNavigation() {
    if (!this.currentRole || !this.sidebarNav) return;

    const navigationItems = this.getNavigationItems(this.currentRole);
    
    this.sidebarNav.innerHTML = navigationItems.map(item => `
      <div class="nav-item">
        <a href="#" class="nav-link" data-section="${item.section}">
          <i class="${item.icon}"></i>
          <span>${item.label}</span>
        </a>
      </div>
    `).join('');

    // Set first item as active by default
    if (navigationItems.length > 0) {
      setTimeout(() => {
        this.navigateTo(navigationItems[0].section);
      }, 100);
    }
  }

  getNavigationItems(role) {
    const commonItems = {
      dashboard: { section: 'dashboard', icon: 'fas fa-tachometer-alt', label: 'Dashboard' },
      profile: { section: 'profile', icon: 'fas fa-user', label: 'Profile' },
      training: { section: 'training', icon: 'fas fa-graduation-cap', label: 'Training' }
    };

    const roleSpecificItems = {
      'superadmin': [
        commonItems.dashboard,
        { section: 'analytics', icon: 'fas fa-chart-bar', label: 'Analytics' },
        { section: 'system-management', icon: 'fas fa-cogs', label: 'System Management' },
        { section: 'reports', icon: 'fas fa-file-alt', label: 'Reports' },
        commonItems.profile
      ],
      'admin': [
        commonItems.dashboard,
        { section: 'complaints', icon: 'fas fa-exclamation-triangle', label: 'Complaints' },
        { section: 'workforce', icon: 'fas fa-users', label: 'Workforce' },
        { section: 'assignments', icon: 'fas fa-tasks', label: 'Assignments' },
        { section: 'reports', icon: 'fas fa-chart-line', label: 'Reports' },
        commonItems.training,
        commonItems.profile
      ],
      'green-champion': [
        commonItems.dashboard,
        { section: 'my-reports', icon: 'fas fa-flag', label: 'My Reports' },
        { section: 'community', icon: 'fas fa-users', label: 'Community' },
        { section: 'rewards', icon: 'fas fa-gift', label: 'Rewards' },
        { section: 'heat-map', icon: 'fas fa-map', label: 'Heat Map' },
        commonItems.training,
        commonItems.profile
      ],
      'worker': [
        commonItems.dashboard,
        { section: 'my-tasks', icon: 'fas fa-clipboard-list', label: 'My Tasks' },
        { section: 'attendance', icon: 'fas fa-calendar-check', label: 'Attendance' },
        { section: 'location', icon: 'fas fa-map-marker-alt', label: 'Location' },
        commonItems.training,
        commonItems.profile
      ],
      'citizen': [
        commonItems.dashboard,
        { section: 'submit-complaint', icon: 'fas fa-plus-circle', label: 'Report Issue' },
        { section: 'my-complaints', icon: 'fas fa-list-alt', label: 'My Complaints' },
        { section: 'tracking', icon: 'fas fa-truck', label: 'Vehicle Tracking' },
        { section: 'shop', icon: 'fas fa-shopping-cart', label: 'Shop' },
        commonItems.training,
        commonItems.profile
      ]
    };

    return roleSpecificItems[role] || [];
  }

  navigateTo(section) {
    // Update active navigation item
    const navLinks = this.sidebarNav ? this.sidebarNav.querySelectorAll('.nav-link') : [];
    navLinks.forEach(link => {
      if (link.dataset.section === section) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close mobile sidebar
    if (window.innerWidth <= 1199) {
      this.closeMobileSidebar();
    }

    // Load dashboard section using the app instance
    if (window.app && typeof window.app.loadDashboardSection === 'function') {
      window.app.loadDashboardSection(section);
    } else {
      // Fallback to old method
      const dashboards = {
        'superadmin': window.SuperadminDashboard,
        'admin': window.AdminDashboard,
        'green-champion': window.GreenChampionDashboard,
        'worker': window.WorkerDashboard,
        'citizen': window.CitizenDashboard
      };

      const dashboard = dashboards[this.currentRole];
      if (dashboard && typeof dashboard.loadSection === 'function') {
        window.currentDashboard = dashboard;
        dashboard.loadSection(section);
      }
    }
  }

  show() {
    const navHeader = document.getElementById('navHeader');
    if (navHeader) navHeader.classList.remove('hidden');
    if (this.sidebar) this.sidebar.classList.remove('hidden');
    if (this.mainContent) this.mainContent.classList.remove('hidden');
  }

  hide() {
    const navHeader = document.getElementById('navHeader');
    if (navHeader) navHeader.classList.add('hidden');
    if (this.sidebar) this.sidebar.classList.add('hidden');
    if (this.mainContent) this.mainContent.classList.add('hidden');
  }

  // Cleanup method
  destroy() {
    document.removeEventListener('click', this.handleClickOutside);
    document.removeEventListener('keydown', this.handleEscapeKey);
    
    if (this.mobileToggle && this.mobileToggle.parentNode) {
      this.mobileToggle.parentNode.removeChild(this.mobileToggle);
    }
  }
}

// Initialize navigation - but don't auto-create instance
// Let the main app handle this
window.Navigation = Navigation;

// For backward compatibility
if (!window.navigation) {
  window.navigation = new Navigation();
  window.navigation.init();
}