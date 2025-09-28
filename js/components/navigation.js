// Navigation component
class Navigation {
  constructor() {
    this.sidebar = document.getElementById('sidebar');
    this.sidebarNav = document.getElementById('sidebarNav');
    this.mainContent = document.getElementById('mainContent');
    this.currentUser = null;
    this.currentRole = null;
    
    this.init();
  }

  init() {
    // Handle navigation clicks
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

    // Mobile sidebar toggle (for responsive design)
    this.setupMobileToggle();
  }

  setupMobileToggle() {
    // Add mobile menu button
    const navContainer = document.querySelector('.nav-container');
    if (!navContainer) return;
    
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-toggle btn btn-ghost';
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileToggle.setAttribute('aria-label', 'Toggle navigation menu');
    mobileToggle.setAttribute('aria-expanded', 'false');
    
    // Insert before user info
    navContainer.insertBefore(mobileToggle, navContainer.lastElementChild);

    // Toggle sidebar on mobile
    mobileToggle.addEventListener('click', () => {
      console.log('Mobile toggle clicked'); // Debug log
      this.sidebar.classList.toggle('open');
      const isOpen = this.sidebar.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
      
      // Add/remove body scroll lock
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    // Show mobile toggle on small screens
    const mediaQuery = window.matchMedia('(max-width: 1199px)');
    const handleMediaQuery = (e) => {
      mobileToggle.style.display = e.matches ? 'block' : 'none';
      if (!e.matches) {
        this.sidebar.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
      }
    };

    mediaQuery.addEventListener('change', handleMediaQuery);
    handleMediaQuery(mediaQuery);

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 1199) {
        if (!this.sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
          this.sidebar.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
          mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
          document.body.style.overflow = '';
        }
      }
    });
    
    // Close sidebar on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.sidebar.classList.contains('open')) {
        this.sidebar.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
        mobileToggle.focus();
      }
    });
  }

  setUser(user, role) {
    this.currentUser = user;
    this.currentRole = role;
    this.updateNavigation();
  }

  updateNavigation() {
    if (!this.currentRole) return;

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
      [USER_ROLES.SUPERADMIN]: [
        commonItems.dashboard,
        { section: 'analytics', icon: 'fas fa-chart-bar', label: 'Analytics' },
        { section: 'system-management', icon: 'fas fa-cogs', label: 'System Management' },
        { section: 'reports', icon: 'fas fa-file-alt', label: 'Reports' },
        commonItems.profile
      ],

      [USER_ROLES.ADMIN]: [
        commonItems.dashboard,
        { section: 'complaints', icon: 'fas fa-exclamation-triangle', label: 'Complaints' },
        { section: 'workforce', icon: 'fas fa-users', label: 'Workforce' },
        { section: 'assignments', icon: 'fas fa-tasks', label: 'Assignments' },
        { section: 'reports', icon: 'fas fa-chart-line', label: 'Reports' },
        commonItems.training,
        commonItems.profile
      ],

      [USER_ROLES.GREEN_CHAMPION]: [
        commonItems.dashboard,
        { section: 'my-reports', icon: 'fas fa-flag', label: 'My Reports' },
        { section: 'community', icon: 'fas fa-users', label: 'Community' },
        { section: 'rewards', icon: 'fas fa-gift', label: 'Rewards' },
        { section: 'heat-map', icon: 'fas fa-map', label: 'Heat Map' },
        commonItems.training,
        commonItems.profile
      ],

      [USER_ROLES.WORKER]: [
        commonItems.dashboard,
        { section: 'my-tasks', icon: 'fas fa-clipboard-list', label: 'My Tasks' },
        { section: 'attendance', icon: 'fas fa-calendar-check', label: 'Attendance' },
        { section: 'location', icon: 'fas fa-map-marker-alt', label: 'Location' },
        commonItems.training,
        commonItems.profile
      ],

      [USER_ROLES.CITIZEN]: [
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
    const navLinks = this.sidebarNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      if (link.dataset.section === section) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close mobile sidebar
    if (window.innerWidth <= 1199) {
      this.sidebar.classList.remove('open');
      document.body.style.overflow = '';
      
      // Update mobile toggle button
      const mobileToggle = document.querySelector('.mobile-toggle');
      if (mobileToggle) {
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
  }

const dashboards = {
  [USER_ROLES.ADMIN]: window.AdminDashboard,
  [USER_ROLES.GREEN_CHAMPION]: window.GreenChampionDashboard,
      [USER_ROLES.WORKER]: window.WorkerDashboard,
      [USER_ROLES.CITIZEN]: window.CitizenDashboard
    };

      const dashboard = dashboards[this.currentRole];
      if (dashboard) {
        // Set current dashboard reference
        window.currentDashboard = dashboard;
        
        // Load the section
        dashboard.loadSection(section);
      }
    }
  }

  show() {
    document.getElementById('navHeader').classList.remove('hidden');
    this.sidebar.classList.remove('hidden');
    this.mainContent.classList.remove('hidden');
  }

  hide() {
    document.getElementById('navHeader').classList.add('hidden');
    this.sidebar.classList.add('hidden');
    this.mainContent.classList.add('hidden');
  }
}

// Initialize navigation
var navigation = new Navigation();
window.navigation = navigation;