// Main entry point for Smart Waste Management System
// Handles initialization and coordination between modules

class App {
  constructor() {
    this.isInitialized = false;
    this.currentUser = null;
    this.currentRole = null;
    this.currentDashboard = null;
  }

  async init() {
    if (this.isInitialized) return;
    
    try {
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        await new Promise(resolve => {
          document.addEventListener('DOMContentLoaded', resolve);
        });
      }

      // Initialize core systems
      this.initializeElements();
      this.setupEventListeners();
      this.checkExistingSession();
      
      this.isInitialized = true;
      console.log('App initialized successfully');
    } catch (error) {
      console.error('App initialization failed:', error);
    }
  }

  initializeElements() {
    this.elements = {
      loginScreen: document.getElementById('loginScreen'),
      navHeader: document.getElementById('navHeader'),
      sidebar: document.getElementById('sidebar'),
      mainContent: document.getElementById('mainContent'),
      mobileToggle: null // Will be created dynamically
    };
  }

  setupEventListeners() {
    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => this.logout());
    }

    // Login functionality
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => this.handleLogin());
    }

    // Enter key support for login
    ['email', 'password'].forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') this.handleLogin();
        });
      }
    });
  }

  async handleLogin() {
    const roleSelect = document.getElementById('userRole');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');

    if (!roleSelect?.value) {
      this.showNotification('Error', 'Please select your role', 'error');
      return;
    }

    if (!emailInput?.value || !passwordInput?.value) {
      this.showNotification('Error', 'Please enter email and password', 'error');
      return;
    }

    // Show loading state
    const originalText = loginBtn.innerHTML;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
    loginBtn.disabled = true;

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create user object
      const user = {
        id: 'user_' + Date.now(),
        email: emailInput.value,
        name: this.generateUserName(emailInput.value, roleSelect.value),
        role: roleSelect.value,
        greenPoints: Math.floor(Math.random() * 500) + 100,
        trainingProgress: Math.floor(Math.random() * 100),
        completedModules: [],
        joinedAt: new Date(),
        profileImage: null
      };

      this.currentUser = user;
      this.currentRole = roleSelect.value;

      // Store session
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('currentRole', roleSelect.value);

      this.showNotification('Welcome!', `Successfully logged in as ${roleSelect.value.replace('-', ' ')}`, 'success');
      this.showDashboard();

    } catch (error) {
      this.showNotification('Login Failed', 'Please check your credentials and try again', 'error');
    } finally {
      loginBtn.innerHTML = originalText;
      loginBtn.disabled = false;
    }
  }

  generateUserName(email, role) {
    const names = {
      'superadmin': ['Alex Thompson', 'Sarah Wilson', 'Michael Chen'],
      'admin': ['David Rodriguez', 'Lisa Johnson', 'James Brown'],
      'green-champion': ['Emma Davis', 'Noah Martinez', 'Olivia Anderson'],
      'worker': ['Carlos Garcia', 'Maria Lopez', 'Ahmed Hassan'],
      'citizen': ['John Smith', 'Jane Doe', 'Robert Johnson']
    };

    const roleNames = names[role] || ['Demo User'];
    return roleNames[Math.floor(Math.random() * roleNames.length)];
  }

  checkExistingSession() {
    try {
      const storedUser = localStorage.getItem('currentUser');
      const storedRole = localStorage.getItem('currentRole');
      
      if (storedUser && storedRole) {
        this.currentUser = JSON.parse(storedUser);
        this.currentRole = storedRole;
        this.showDashboard();
      }
    } catch (error) {
      console.error('Error checking existing session:', error);
      this.logout();
    }
  }

  showDashboard() {
    // Hide login screen
    this.elements.loginScreen?.classList.remove('active');
    this.elements.loginScreen?.classList.add('hidden');
    
    // Show navigation and main content
    this.elements.navHeader?.classList.remove('hidden');
    this.elements.sidebar?.classList.remove('hidden');
    this.elements.mainContent?.classList.remove('hidden');
    
    // Update user info in header
    const userInfo = document.getElementById('userInfo');
    if (userInfo) {
      userInfo.textContent = `${this.currentUser.name} (${this.currentRole.replace('-', ' ')})`;
    }

    // Initialize navigation
    this.initializeNavigation();
    this.loadDashboard();
  }

  initializeNavigation() {
    // Create mobile toggle if it doesn't exist
    this.createMobileToggle();
    
    // Setup navigation items
    this.updateNavigation();
    
    // Setup navigation click handlers
    this.setupNavigationHandlers();
  }

  createMobileToggle() {
    const navContainer = document.querySelector('.nav-container');
    if (!navContainer || document.querySelector('.mobile-toggle')) return;
    
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-toggle';
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileToggle.setAttribute('aria-label', 'Toggle navigation menu');
    mobileToggle.setAttribute('aria-expanded', 'false');
    
    // Insert before user info
    navContainer.insertBefore(mobileToggle, navContainer.lastElementChild);
    
    // Add click handler
    mobileToggle.addEventListener('click', () => this.toggleMobileSidebar());
    
    // Handle responsive display
    this.handleMobileToggleDisplay();
    
    this.elements.mobileToggle = mobileToggle;
  }

  handleMobileToggleDisplay() {
    const mediaQuery = window.matchMedia('(max-width: 1199px)');
    const handleMediaQuery = (e) => {
      const mobileToggle = this.elements.mobileToggle;
      if (!mobileToggle) return;
      
      mobileToggle.style.display = e.matches ? 'flex' : 'none';
      
      if (!e.matches) {
        this.closeMobileSidebar();
      }
    };

    mediaQuery.addEventListener('change', handleMediaQuery);
    handleMediaQuery(mediaQuery);
  }

  toggleMobileSidebar() {
    const sidebar = this.elements.sidebar;
    const mobileToggle = this.elements.mobileToggle;
    
    if (!sidebar || !mobileToggle) return;
    
    const isOpen = sidebar.classList.contains('mobile-open');
    
    if (isOpen) {
      this.closeMobileSidebar();
    } else {
      this.openMobileSidebar();
    }
  }

  openMobileSidebar() {
    const sidebar = this.elements.sidebar;
    const mobileToggle = this.elements.mobileToggle;
    
    if (!sidebar || !mobileToggle) return;
    
    sidebar.classList.add('mobile-open');
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
    document.body.style.overflow = 'hidden';
    
    // Add click outside handler
    setTimeout(() => {
      document.addEventListener('click', this.handleClickOutside.bind(this));
    }, 100);
  }

  closeMobileSidebar() {
    const sidebar = this.elements.sidebar;
    const mobileToggle = this.elements.mobileToggle;
    
    if (!sidebar || !mobileToggle) return;
    
    sidebar.classList.remove('mobile-open');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = '';
    
    // Remove click outside handler
    document.removeEventListener('click', this.handleClickOutside.bind(this));
  }

  handleClickOutside(e) {
    const sidebar = this.elements.sidebar;
    const mobileToggle = this.elements.mobileToggle;
    
    if (!sidebar || !mobileToggle) return;
    
    if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
      this.closeMobileSidebar();
    }
  }

  updateNavigation() {
    const sidebarNav = document.getElementById('sidebarNav');
    if (!sidebarNav) return;

    const navigationItems = this.getNavigationItems(this.currentRole);
    
    sidebarNav.innerHTML = navigationItems.map(item => `
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

  setupNavigationHandlers() {
    const sidebarNav = document.getElementById('sidebarNav');
    if (!sidebarNav) return;
    
    sidebarNav.addEventListener('click', (e) => {
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

  navigateTo(section) {
    // Update active navigation item
    const navLinks = document.querySelectorAll('.nav-link');
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

    // Load the appropriate dashboard section
    this.loadDashboardSection(section);
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

  loadDashboard() {
    this.loadDashboardSection('dashboard');
  }

  loadDashboardSection(section) {
    const mainContent = this.elements.mainContent;
    if (!mainContent) return;

    // Set current dashboard reference
    window.currentDashboard = this;
    
    // Load the section based on role
    switch (this.currentRole) {
      case 'superadmin':
        if (window.SuperadminDashboard) {
          window.SuperadminDashboard.loadSection(section);
        }
        break;
      case 'admin':
        if (window.AdminDashboard) {
          window.AdminDashboard.loadSection(section);
        }
        break;
      case 'green-champion':
        if (window.GreenChampionDashboard) {
          window.GreenChampionDashboard.loadSection(section);
        }
        break;
      case 'worker':
        if (window.WorkerDashboard) {
          window.WorkerDashboard.loadSection(section);
        }
        break;
      case 'citizen':
        if (window.CitizenDashboard) {
          window.CitizenDashboard.loadSection(section);
        }
        break;
      default:
        mainContent.innerHTML = '<div class="error-message">Unknown role: ' + this.currentRole + '</div>';
    }
  }

  logout() {
    // Clear session
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentRole');
    
    this.currentUser = null;
    this.currentRole = null;

    // Hide dashboard
    this.elements.navHeader?.classList.add('hidden');
    this.elements.sidebar?.classList.add('hidden');
    this.elements.mainContent?.classList.add('hidden');
    
    // Show login screen
    this.elements.loginScreen?.classList.remove('hidden');
    this.elements.loginScreen?.classList.add('active');
    
    // Clear form
    const roleSelect = document.getElementById('userRole');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    if (roleSelect) roleSelect.value = '';
    if (emailInput) emailInput.value = 'demo@example.com';
    if (passwordInput) passwordInput.value = 'password';
    
    this.showNotification('Logged Out', 'You have been successfully logged out', 'info');
  }

  showNotification(title, message, type = 'info') {
    if (window.notifications) {
      window.notifications.show(title, message, type);
    } else {
      console.log(`${type.toUpperCase()}: ${title} - ${message}`);
    }
  }

  // Public methods for global access
  getCurrentUser() {
    return this.currentUser;
  }

  getCurrentRole() {
    return this.currentRole;
  }

  refresh() {
    if (this.currentDashboard && this.currentDashboard.refresh) {
      this.currentDashboard.refresh();
    }
  }
}

// Initialize the app
const app = new App();

// Make app globally available
window.app = app;
window.authSystem = app; // For backward compatibility

// Auto-initialize when script loads
app.init();