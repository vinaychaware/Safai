// js/main.js
// Main entry point for Smart Waste Management System (vanilla JS app)
// Handles login, navigation, and dashboard loading

// Wait for DOM to load
window.addEventListener('DOMContentLoaded', () => {
  // Elements
  const loginScreen = document.getElementById('loginScreen');
  const navHeader = document.getElementById('navHeader');
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('mainContent');
  const notifications = document.getElementById('notifications');
  const modalOverlay = document.getElementById('modalOverlay');

  // Helper: Show/hide screens
  function showScreen(screen) {
    [loginScreen, navHeader, sidebar, mainContent].forEach(el => {
      if (!el) return;
      if (el === screen) {
        el.classList.remove('hidden');
        el.classList.add('active');
      } else {
        el.classList.add('hidden');
        el.classList.remove('active');
      }
    });
  }

  // Helper: Show dashboard UI
  function showDashboardUI() {
    showScreen(mainContent);
    navHeader.classList.remove('hidden');
    sidebar.classList.remove('hidden');
    mainContent.classList.remove('hidden');
  }

  // Helper: Hide dashboard UI
  function hideDashboardUI() {
    showScreen(loginScreen);
    navHeader.classList.add('hidden');
    sidebar.classList.add('hidden');
    mainContent.classList.add('hidden');
  }

  // Logout logic
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      window.authSystem?.logout();
      hideDashboardUI();
    });
  }

  // Load dashboard by role
  function loadDashboard(role) {
    if (!mainContent) return;
    mainContent.innerHTML = '';
    switch (role) {
      case 'superadmin':
        window.SuperadminDashboard?.loadSection?.('dashboard');
        break;
      case 'admin':
        window.AdminDashboard?.loadSection?.('dashboard');
        break;
      case 'green-champion':
        window.GreenChampionDashboard?.loadSection?.('dashboard');
        break;
      case 'worker':
        window.WorkerDashboard?.loadSection?.('dashboard');
        break;
      case 'citizen':
        window.CitizenDashboard?.loadSection?.('dashboard');
        break;
      default:
        mainContent.innerHTML = '<p>Unknown role</p>';
    }
  }

  // Check for existing session
  const currentUser = window.authSystem?.getCurrentUser();
  if (currentUser) {
    showDashboardUI();
    const currentRole = window.authSystem.getCurrentRole();
    loadDashboard(currentRole);
    window.navigation?.init(currentRole);
  } else {
    hideDashboardUI();
  }
});
