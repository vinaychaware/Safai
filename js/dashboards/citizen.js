class CitizenDashboard {
  constructor() {
    this.currentSection = 'dashboard';
    this.vehicleTracking = false;
    this.notifications = {
      vehicle5min: false,
      vehicleArrived: false
    };
  }

  /**
   * Loads a specific section into the main content area.
   * This acts as the primary navigation router for the dashboard.
   * @param {string} section The name of the section to load.
   */
  loadSection(section) {
    this.currentSection = section;
    const content = document.getElementById('mainContent');

    switch (section) {
      case 'dashboard':
        content.innerHTML = this.renderDashboard();
        break;
      case 'submit-complaint':
        content.innerHTML = this.renderSubmitComplaint();
        break;
      case 'my-complaints':
        content.innerHTML = this.renderMyComplaints();
        break;
      case 'tracking':
        content.innerHTML = this.renderTracking();
        break;
      case 'training':
        content.innerHTML = this.renderTraining();
        break;
      case 'profile':
        content.innerHTML = this.renderProfile();
        break;
      default:
        content.innerHTML = this.renderDashboard();
    }

    this.bindEvents();
  }

  // --- Main Dashboard View ---
  renderDashboard() {
    const user = authSystem.getCurrentUser();
    const greenPoints = user.greenPoints || 250;

    return `
      <div class="dashboard-header">
        <div class="header-content">
          <h1 class="dashboard-title">Citizen Dashboard</h1>
          <p class="dashboard-subtitle">Welcome to Smart Waste Management, ${user.name}!</p>
        </div>
      </div>
      <div class="dashboard-stats">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">My Complaints</span>
            <div class="stat-icon primary">
              <i class="fas fa-exclamation-circle"></i>
            </div>
          </div>
          <div class="stat-value">7</div>
          <div class="stat-change positive">
            <i class="fas fa-check"></i> 5 resolved
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Green Points</span>
            <div class="stat-icon success">
              <i class="fas fa-coins"></i>
            </div>
          </div>
          <div class="stat-value">${greenPoints.toLocaleString()}</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i> +25 this week
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Training Progress</span>
            <div class="stat-icon secondary">
              <i class="fas fa-graduation-cap"></i>
            </div>
          </div>
          <div class="stat-value">${user.trainingProgress || 65}%</div>
        </div>
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Community Rank</span>
            <div class="stat-icon warning">
              <i class="fas fa-trophy"></i>
            </div>
          </div>
          <div class="stat-value">#42</div>
        </div>
      </div>
      <div class="dashboard-grid">
        <div class="card dashboard-main">
          <div class="card-header">
            <h3 class="card-title">Recent Complaints</h3>
            <button class="btn btn-primary" onclick="navigation.navigateTo('my-complaints')">
              <i class="fas fa-eye"></i> View All
            </button>
          </div>
          <div class="card-body">
            <div class="recent-complaints">
              <div class="complaint-item">
                <div class="complaint-header">
                  <strong>Overflowing bin near park</strong>
                  <span class="badge badge-warning">In Progress</span>
                </div>
                <div class="complaint-date">Reported 2 days ago</div>
              </div>
              <div class="complaint-item">
                <div class="complaint-header">
                  <strong>Missed collection on Main St</strong>
                  <span class="badge badge-success">Resolved</span>
                </div>
                <div class="complaint-date">Resolved yesterday</div>
              </div>
              <div class="complaint-item">
                <div class="complaint-header">
                  <strong>Illegal dumping report</strong>
                  <span class="badge badge-info">Under Review</span>
                </div>
                <div class="complaint-date">Reported today</div>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3 class="card-title">Quick Actions</h3></div>
          <div class="card-body">
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <button class="btn btn-primary" onclick="navigation.navigateTo('submit-complaint')"><i class="fas fa-plus-circle"></i> Report New Issue</button>
              <button class="btn btn-secondary" onclick="navigation.navigateTo('tracking')"><i class="fas fa-truck"></i> Track Garbage Vehicle</button>
              <button class="btn btn-success" onclick="navigation.navigateTo('training')"><i class="fas fa-graduation-cap"></i> Learn & Earn Points</button>
              <button class="btn btn-info" onclick="navigation.navigateTo('profile')"><i class="fas fa-user"></i> My Profile</button>
              <button class="btn btn-info" onclick="navigation.navigateTo('shop')"><i class="fas fa-shopping-cart"></i> Visit Eco Store</button>
              <button class="btn btn-success" onclick="navigation.navigateTo('training')"><i class="fas fa-graduation-cap"></i> Learn & Earn Points</button>
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Waste Collection Schedule</h3>
            <div class="schedule-actions">
              <button class="btn btn-ghost" onclick="window.CitizenDashboard.setScheduleReminder()">
                <i class="fas fa-bell"></i> Set Reminder
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="schedule-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
              <div class="schedule-day" style="padding: 1rem; background: var(--gray-50); border-radius: 8px;">
                <div style="font-weight: 600; margin-bottom: 0.5rem;">Monday</div>
                <div style="color: var(--gray-600);">Regular Waste</div>
                <div style="color: var(--primary); font-size: 0.875rem;">9:00 AM - 11:00 AM</div>
              </div>
              <div class="schedule-day" style="padding: 1rem; background: var(--gray-50); border-radius: 8px;">
                <div style="font-weight: 600; margin-bottom: 0.5rem;">Wednesday</div>
                <div style="color: var(--gray-600);">Recyclables</div>
                <div style="color: var(--primary); font-size: 0.875rem;">10:00 AM - 12:00 PM</div>
              </div>
              <div class="schedule-day" style="padding: 1rem; background: var(--gray-50); border-radius: 8px;">
                <div style="font-weight: 600; margin-bottom: 0.5rem;">Friday</div>
                <div style="color: var(--gray-600);">Organic Waste</div>
                <div style="color: var(--primary); font-size: 0.875rem;">9:00 AM - 11:00 AM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  generateWeeklySchedule() { /* ... (utility function as provided) ... */ }

  // --- FEATURE: Complaint Submission with Geotag & Photos ---
  // This section provides a detailed form for citizens to report issues.
  // It includes fields for location (with a "Use Current Location" button for geotagging)
  // and a placeholder for photo uploads.
  // -----------------------------------------------------------------
  renderSubmitComplaint() {
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Report an Issue</h1>
        <p class="dashboard-subtitle">Help keep your community clean by reporting issues</p>
      </div>
      <div class="complaint-container">
        <div class="complaint-form-wrapper">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Submit New Complaint</h3>
            </div>
            <div class="card-body">
              <form id="complaintForm" class="complaint-form">
                <div class="form-group">
                  <label for="issueType" class="form-label">Issue Type</label>
                  <select class="form-control" id="issueType" required>
                    <option value="">Select issue type</option>
                    <option>Overflowing Bin</option>
                    <option>Illegal Dumping</option>
                    <option>Missed Collection</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="complaintDescription" class="form-label">Description</label>
                  <textarea class="form-control" rows="4" id="complaintDescription" 
                    placeholder="Provide detailed information..." required></textarea>
                </div>
                <div class="form-group">
                  <label for="complaintLocation" class="form-label">Location</label>
                  <div class="location-input-group">
                    <input type="text" class="form-control" id="complaintLocation" 
                      placeholder="Enter specific location" required>
                    <button type="button" class="btn btn-ghost location-btn" 
                      onclick="window.CitizenDashboard.getCurrentLocation()">
                      <i class="fas fa-map-marker-alt"></i> Use Current Location
                    </button>
                  </div>
                </div>
                <div class="form-group">
                  <label class="form-label">Attach Photo (Optional)</label>
                  <div class="photo-upload-area">
                    <i class="fas fa-camera"></i>
                    <p>Click to upload a photo</p>
                    <input type="file" class="photo-input">
                  </div>
                </div>
                <div class="form-actions">
                  <button type="submit" class="btn btn-primary btn-block">
                    <i class="fas fa-paper-plane"></i> Submit Complaint
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="complaint-guidelines">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">Reporting Guidelines</h3>
            </div>
            <div class="card-body">
            </div>
        </div>
      </div>
    `;
  }
  
  // --- FEATURE: Complaint & Reward Points Tracking ---
  // This section allows citizens to view their complaint history, track the status,
  // see points earned, and rate the service, which helps in tracking collector performance.
  // -----------------------------------------------------------------
  renderMyComplaints() {
    const complaints = [
      { id: 'C001', title: 'Overflowing bin near school', status: 'resolved', rating: 5, pointsEarned: 25 },
      { id: 'C002', title: 'Illegal dumping in park', status: 'in_progress', rating: null, pointsEarned: 0 },
    ];
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">My Complaints</h1>
        <p class="dashboard-subtitle">Track the status of your submitted complaints</p>
      </div>
      <div class="card">
        <div class="card-header"><h3 class="card-title">Complaint History</h3></div>
        <div class="card-body">
          <div class="complaints-grid" style="display: grid; gap: 1.5rem;">
            ${complaints.map(complaint => `
              <div class="complaint-card" style="border: 1px solid var(--gray-200); padding: 1.5rem; border-radius: 12px;">
                <h4 style="margin-bottom: 1rem;">${complaint.title}</h4>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div>
                    ${Utils.getStatusBadge(complaint.status)}
                    ${complaint.rating ? `<div style="color: var(--warning); margin-top: 0.5rem;">${'★'.repeat(complaint.rating)}</div>` : 
                      (complaint.status === 'resolved' ? `<button class="btn btn-warning" style="margin-top: 0.5rem;" onclick="window.CitizenDashboard.rateService('${complaint.id}')"><i class="fas fa-star"></i> Rate Service</button>` : '')
                    }
                  </div>
                  <div style="color: var(--success); font-weight: 600;">${complaint.pointsEarned > 0 ? `+${complaint.pointsEarned} <i class="fas fa-coins"></i>` : ''}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // --- FEATURE: Vehicle Tracking with Notification Pop-ups ---
  // Renders a real-time map to track garbage collection vehicles.
  // The toggleVehicleTracking() method simulates the start of tracking and
  // triggers timed notification pop-ups for vehicle proximity and arrival.
  // -----------------------------------------------------------------
  renderTracking() {
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Garbage Vehicle Tracking</h1>
        <p class="dashboard-subtitle">Track collection vehicles in real-time</p>
      </div>
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Live Vehicle Map</h3>
            <button class="btn ${this.vehicleTracking ? 'btn-error' : 'btn-success'}" onclick="window.CitizenDashboard.toggleVehicleTracking()">
              <i class="fas fa-${this.vehicleTracking ? 'stop' : 'play'}"></i> ${this.vehicleTracking ? 'Stop' : 'Start'} Tracking
            </button>
          </div>
          <div class="card-body">
            <div class="map-container" style="height: 500px;">
              <div class="map-placeholder">
                <i class="fas fa-truck" style="font-size: 4rem; color: var(--primary); margin-bottom: 2rem;"></i>
                <h3>Real-time Vehicle Tracking</h3>
                <p>${this.vehicleTracking ? 'Tracking is active.' : 'Click "Start Tracking" to see live locations.'}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3 class="card-title">Vehicle Status</h3></div>
          <div class="card-body">
            <div class="vehicle-status" style="padding: 1.5rem; border-radius: 8px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                <span style="font-weight: 600;">Vehicle GC-002</span>
                <span class="badge badge-warning">5 min away</span>
              </div>
              <button class="btn btn-primary" onclick="window.CitizenDashboard.requestNotification()"><i class="fas fa-bell"></i> Notify When Close</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // --- Eco Store (Part of Reward System) ---
  // No replacement needed

  // --- FEATURE: Training for Citizens (Duolingo Style) & App ---
  // Provides a gamified learning experience where citizens can complete
  // modules on waste management, track their progress, and earn Green Points.
  // This covers both general training and specific app usage training.
  // -----------------------------------------------------------------
  renderTraining() {
    const user = authSystem.getCurrentUser();
    const trainingData = this.getTrainingData();
    const dailyGoal = user.dailyGoal || 50;
    const dailyProgress = user.dailyProgress || 30;
    const streak = user.streak || 3;
    const lives = user.lives || 5;

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Waste Management Training</h1>
        <p class="dashboard-subtitle">Learn sustainable practices and earn Green Points</p>
      </div>
      
      <!-- Game Status Bar -->
      <div style="background: var(--primary); color: white; padding: 1rem; border-radius: 12px; margin-bottom: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 2rem;">
            <div>
              <i class="fas fa-fire" style="color: #FF9801;"></i>
              <span>${streak} day streak</span>
            </div>
            <div>
              <i class="fas fa-heart" style="color: #FF5252;"></i>
              <span>${lives} lives</span>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div class="progress-ring">
              <svg width="40" height="40">
                <circle class="progress-ring-circle" 
                  stroke="white" 
                  stroke-width="3" 
                  fill="transparent" 
                  r="16" 
                  cx="20" 
                  cy="20"
                  style="stroke-dasharray: 100; stroke-dashoffset: ${100 - (dailyProgress/dailyGoal * 100)};"
                />
              </svg>
              <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                ${Math.round(dailyProgress/dailyGoal * 100)}%
              </span>
            </div>
            <span>Daily Goal</span>
          </div>
        </div>
      </div>

      <!-- Learning Path -->
      <div class="learning-path" style="max-width: 800px; margin: 0 auto;">
        ${trainingData.units.map((unit, unitIndex) => `
          <div class="unit-section" style="margin-bottom: 3rem;">
            <h3 style="margin-bottom: 1rem;">${unit.title}</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 1rem; position: relative;">
              ${unit.lessons.map((lesson, lessonIndex) => `
                <div class="lesson-bubble ${lesson.status}" 
                  style="
                    position: relative;
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: ${this.getLessonBackground(lesson.status)};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    ${lesson.status === 'locked' ? 'opacity: 0.5;' : ''}
                  "
                  onclick="${lesson.status !== 'locked' ? `window.CitizenDashboard.startLesson(${unitIndex}, ${lessonIndex})` : ''}"
                >
                  <i class="${lesson.icon}" style="font-size: 1.5rem; color: white;"></i>
                  ${lesson.status === 'completed' ? 
                    `<div style="position: absolute; bottom: -5px; right: -5px; background: #4CAF50; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center;">
                      <i class="fas fa-check" style="color: white; font-size: 0.8rem;"></i>
                    </div>` 
                    : ''
                  }
                </div>
                ${lessonIndex < unit.lessons.length - 1 ? 
                  `<div style="flex: 1; height: 2px; background: var(--gray-300); margin-top: 40px;"></div>` 
                  : ''
                }
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  getLessonBackground(status) {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'available': return '#2196F3';
      case 'locked': return '#9E9E9E';
      case 'current': return '#FF9800';
      default: return '#9E9E9E';
    }
  }

  getTrainingData() {
    return {
      units: [
        {
          title: "Unit 1: Waste Basics",
          lessons: [
            { icon: "fas fa-trash", status: "completed", type: "sorting", title: "Types of Waste" },
            { icon: "fas fa-recycle", status: "completed", type: "multiple-choice", title: "Basic Recycling" },
            { icon: "fas fa-dumpster", status: "current", type: "drag-drop", title: "Waste Bins" },
            { icon: "fas fa-trash-restore", status: "locked", type: "matching", title: "Waste Journey" }
          ]
        },
        {
          title: "Unit 2: Recycling Master",
          lessons: [
            { icon: "fas fa-paper-plane", status: "locked", type: "sorting", title: "Paper & Cardboard" },
            { icon: "fas fa-wine-bottle", status: "locked", type: "multiple-choice", title: "Glass & Metal" },
            { icon: "fas fa-box", status: "locked", type: "drag-drop", title: "Packaging" },
            { icon: "fas fa-battery-full", status: "locked", type: "quiz", title: "E-Waste" }
          ]
        },
        {
          title: "Unit 3: Green Champion",
          lessons: [
            { icon: "fas fa-seedling", status: "locked", type: "sorting", title: "Composting" },
            { icon: "fas fa-hand-holding-water", status: "locked", type: "multiple-choice", title: "Water Conservation" },
            { icon: "fas fa-lightbulb", status: "locked", type: "matching", title: "Energy Saving" },
            { icon: "fas fa-award", status: "locked", type: "final-quiz", title: "Final Challenge" }
          ]
        }
      ]
    };
  }

  startLesson(unitIndex, lessonIndex) {
    const training = this.getTrainingData();
    const lesson = training.units[unitIndex].lessons[lessonIndex];
    
    if (lesson.status === 'locked') {
      notifications.error('Lesson Locked', 'Complete previous lessons to unlock this one!');
      return;
    }

    const exercises = this.getLessonExercises(lesson.type, lesson.title);
    
    modal.show({
      title: lesson.title,
      content: this.renderExercise(exercises[0], 1, exercises.length),
      size: 'large',
      showClose: false,
      buttons: []
    });
  }

  getLessonExercises(type, title) {
    // This would typically come from a backend API
    // Here's a sample exercise set for the "Waste Bins" lesson
    const exercises = {
      'Waste Bins': [
        {
          type: 'drag-drop',
          question: 'Drag each item to its correct bin',
          items: [
            { id: 1, text: 'Plastic Bottle', correctBin: 'recycle' },
            { id: 2, text: 'Banana Peel', correctBin: 'organic' },
            { id: 3, text: 'Old Battery', correctBin: 'hazardous' },
            { id: 4, text: 'Paper Bag', correctBin: 'recycle' }
          ],
          bins: [
            { id: 'recycle', name: 'Recycling Bin', icon: 'fas fa-recycle' },
            { id: 'organic', name: 'Organic Waste', icon: 'fas fa-apple-alt' },
            { id: 'hazardous', name: 'Hazardous Waste', icon: 'fas fa-exclamation-triangle' }
          ]
        },
        {
          type: 'multiple-choice',
          question: 'Which bin should be used for broken glass?',
          options: [
            { id: 'a', text: 'Regular trash bin' },
            { id: 'b', text: 'Recycling bin' },
            { id: 'c', text: 'Special glass collection bin', correct: true },
            { id: 'd', text: 'Organic waste bin' }
          ]
        }
      ]
    };

    return exercises[title] || [];
  }

  renderExercise(exercise, current, total) {
    const progressBar = `
      <div class="exercise-progress" style="margin-bottom: 2rem;">
        <div class="progress-bar">
          <div class="progress" style="width: ${(current/total) * 100}%"></div>
        </div>
        <div class="exercise-counter">${current}/${total}</div>
      </div>
    `;

    switch (exercise.type) {
      case 'drag-drop':
        return `
          ${progressBar}
          <div class="exercise-content">
            <h3 class="exercise-question">${exercise.question}</h3>
            <div class="drag-drop-exercise">
              <div class="items-to-sort">
                ${exercise.items.map(item => `
                  <div class="draggable-item" draggable="true" data-id="${item.id}">
                    ${item.text}
                  </div>
                `).join('')}
              </div>
              <div class="waste-bins">
                ${exercise.bins.map(bin => `
                  <div class="waste-bin" data-bin="${bin.id}">
                    <i class="${bin.icon}"></i>
                    <span>${bin.name}</span>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="exercise-actions">
              <button class="btn btn-primary" onclick="window.CitizenDashboard.checkAnswer()">
                Check Answer
              </button>
            </div>
          </div>
        `;

      case 'multiple-choice':
        return `
          ${progressBar}
          <div class="exercise-content">
            <h3 class="exercise-question">${exercise.question}</h3>
            <div class="multiple-choice-options">
              ${exercise.options.map(option => `
                <div class="option" onclick="window.CitizenDashboard.selectOption('${option.id}')">
                  <div class="option-marker">${option.id.toUpperCase()}</div>
                  <div class="option-text">${option.text}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

      default:
        return '<div>Exercise type not supported</div>';
    }
  }

  checkAnswer() {
    // This would validate the current exercise answer
    notifications.success('Correct!', '+10 Green Points');
    this.completeExercise();
  }

  selectOption(optionId) {
    // Handle multiple choice selection
    notifications.success('Correct!', '+10 Green Points');
    this.completeExercise();
  }

  completeExercise() {
    const user = authSystem.getCurrentUser();
    user.dailyProgress = (user.dailyProgress || 0) + 10;
    
    setTimeout(() => {
      modal.hide();
      this.refresh();
    }, 1500);
  }
  
  // --- User Profile ---
  renderProfile() {
    const user = authSystem.getCurrentUser();
    const greenPoints = user.greenPoints || 250;
    const trainingProgress = user.trainingProgress || 65;

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">My Profile</h1>
        <p class="dashboard-subtitle">Manage your account and view your statistics</p>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 2rem;">
        <div>
          <div class="card">
            <div class="card-header"><h3 class="card-title">Profile Information</h3></div>
            <div class="card-body">
              <div class="profile-avatar" style="text-align: center; margin-bottom: 2rem;">
                <div style="width: 120px; height: 120px; background: var(--gray-200); border-radius: 60px; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center;">
                  <i class="fas fa-user" style="font-size: 3rem; color: var(--gray-400);"></i>
                </div>
                <button class="btn btn-ghost"><i class="fas fa-camera"></i> Change Photo</button>
              </div>
              <form id="profileForm">
                <div class="form-group" style="margin-bottom: 1rem;">
                  <label>Full Name</label>
                  <input type="text" class="form-control" value="${user.name || ''}" placeholder="Enter your name">
                </div>
                <div class="form-group" style="margin-bottom: 1rem;">
                  <label>Email</label>
                  <input type="email" class="form-control" value="${user.email || ''}" placeholder="Enter your email">
                </div>
                <div class="form-group" style="margin-bottom: 1rem;">
                  <label>Phone</label>
                  <input type="tel" class="form-control" value="${user.phone || ''}" placeholder="Enter your phone number">
                </div>
                <div class="form-group" style="margin-bottom: 1rem;">
                  <label>Address</label>
                  <textarea class="form-control" rows="3" placeholder="Enter your address">${user.address || ''}</textarea>
                </div>
                <button type="submit" class="btn btn-primary w-full"><i class="fas fa-save"></i> Save Changes</button>
              </form>
            </div>
          </div>
        </div>
        <div>
          <div class="card" style="margin-bottom: 2rem;">
            <div class="card-header"><h3 class="card-title">Activity Overview</h3></div>
            <div class="card-body">
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
                <div class="stat-card">
                  <div class="stat-title">Green Points</div>
                  <div class="stat-value">${greenPoints}</div>
                  <div class="stat-desc">Lifetime earned</div>
                </div>
                <div class="stat-card">
                  <div class="stat-title">Complaints</div>
                  <div class="stat-value">7</div>
                  <div class="stat-desc">Total submitted</div>
                </div>
                <div class="stat-card">
                  <div class="stat-title">Training</div>
                  <div class="stat-value">${trainingProgress}%</div>
                  <div class="stat-desc">Progress completed</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="card">
            <div class="card-header"><h3 class="card-title">Notification Settings</h3></div>
            <div class="card-body">
              <div class="settings-list">
                <div class="setting-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--gray-200);">
                  <div>
                    <h4>Email Notifications</h4>
                    <p style="color: var(--gray-600);">Receive updates about your complaints</p>
                  </div>
                  <label class="switch">
                    <input type="checkbox" checked>
                    <span class="slider round"></span>
                  </label>
                </div>
                <div class="setting-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--gray-200);">
                  <div>
                    <h4>Vehicle Tracking Alerts</h4>
                    <p style="color: var(--gray-600);">Get notified when vehicle is nearby</p>
                  </div>
                  <label class="switch">
                    <input type="checkbox" checked>
                    <span class="slider round"></span>
                  </label>
                </div>
                <div class="setting-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0;">
                  <div>
                    <h4>Green Points Updates</h4>
                    <p style="color: var(--gray-600);">Notifications about points earned</p>
                  </div>
                  <label class="switch">
                    <input type="checkbox" checked>
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // =================================================================================
  // Citizen-Specific Methods & Event Handlers
  // =================================================================================

  getCurrentLocation() {
    notifications.info('Getting Location', 'Detecting your current location...');
    // In a real app, this would use the browser's Geolocation API.
    setTimeout(() => {
        const locationField = document.getElementById('complaintLocation');
        if (locationField) {
            locationField.value = `MG Road, Bengaluru, Karnataka`;
        }
        notifications.success('Location Found', 'Your location has been added.');
    }, 1500);
  }

  toggleVehicleTracking() {
    this.vehicleTracking = !this.vehicleTracking;
    if (this.vehicleTracking) {
      notifications.success('Tracking Started', 'Now tracking garbage vehicles.');
      // Simulate notification pop-ups
      setTimeout(() => {
        if (this.vehicleTracking) notifications.showVehicleAlert('Vehicle is 5 minutes away!', 'warning');
      }, 5000); // 5 seconds for demo
      setTimeout(() => {
        if (this.vehicleTracking) notifications.showVehicleAlert('Vehicle has arrived!', 'success');
      }, 10000); // 10 seconds for demo
    } else {
      notifications.info('Tracking Stopped', 'Vehicle tracking disabled.');
    }
    this.refresh();
  }
  
  rateService(complaintId) { /* ... (code as provided) ... */ }
  hoverStar(rating) { /* ... (code as provided) ... */ }
  selectRating(rating) { /* ... (code as provided) ... */ }
  submitRating(complaintId) { /* ... (code as provided) ... */ }
  
  bindEvents() {
    // Handle complaint form submission
    const complaintForm = document.getElementById('complaintForm');
    if (complaintForm) {
      complaintForm.addEventListener('submit', (e) => {
        e.preventDefault();
        notifications.success('Complaint Submitted', 'Thank you for your report!');
        navigation.navigateTo('my-complaints');
      });
    }

    // Handle training interactions
    const trainingModules = document.querySelectorAll('.training-module-card');
    trainingModules.forEach(module => {
      module.addEventListener('click', (e) => {
        const moduleId = module.dataset.moduleId;
        if (moduleId) {
          this.startTrainingModule(moduleId);
        }
      });
    });

    // Handle drag and drop for waste sorting exercises
    this.setupDragAndDrop();
  }

  setupDragAndDrop() {
    const draggableItems = document.querySelectorAll('.draggable-item');
    const wasteBins = document.querySelectorAll('.waste-bin');

    draggableItems.forEach(item => {
      item.addEventListener('dragstart', (e) => {
        item.classList.add('dragging');
        e.dataTransfer.setData('text/plain', item.dataset.id);
      });

      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
      });
    });

    wasteBins.forEach(bin => {
      bin.addEventListener('dragover', (e) => {
        e.preventDefault();
        bin.classList.add('drag-over');
      });

      bin.addEventListener('dragleave', () => {
        bin.classList.remove('drag-over');
      });

      bin.addEventListener('drop', (e) => {
        e.preventDefault();
        bin.classList.remove('drag-over');
        const itemId = e.dataTransfer.getData('text/plain');
        this.handleWasteSorting(itemId, bin.dataset.bin);
      });
    });
  }

  setScheduleReminder() {
    modal.show({
      title: 'Set Collection Reminder',
      content: `
        <div class="reminder-setup">
          <div class="form-group">
            <label>Choose Collection Type</label>
            <select class="form-control" id="reminderType">
              <option value="regular">Regular Waste (Monday)</option>
              <option value="recyclable">Recyclables (Wednesday)</option>
              <option value="organic">Organic Waste (Friday)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Reminder Time</label>
            <select class="form-control" id="reminderTime">
              <option value="day">1 day before</option>
              <option value="hour">1 hour before</option>
              <option value="30min">30 minutes before</option>
            </select>
          </div>
        </div>
      `,
      buttons: [
        {
          text: 'Cancel',
          style: 'ghost'
        },
        {
          text: 'Set Reminder',
          style: 'primary',
          onClick: () => {
            const type = document.getElementById('reminderType').value;
            const time = document.getElementById('reminderTime').value;
            notifications.success('Reminder Set', 'You will be notified before the collection');
            modal.hide();
          }
        }
      ]
    });
  }

  refresh() {
    this.loadSection(this.currentSection);
  }

  startTrainingModule(moduleId) {
    const modules = {
      'waste-basic': {
        title: 'Waste Segregation Basics',
        questions: [
          {
            type: 'multiple-choice',
            question: 'Which bin should you use for plastic bottles?',
            options: [
              { id: 'a', text: 'General Waste' },
              { id: 'b', text: 'Recyclables', correct: true },
              { id: 'c', text: 'Organic Waste' },
              { id: 'd', text: 'Hazardous Waste' }
            ]
          },
          {
            type: 'drag-drop',
            question: 'Sort these items into the correct bins',
            items: [
              { id: 'banana', text: 'Banana Peel', bin: 'organic' },
              { id: 'newspaper', text: 'Newspaper', bin: 'recycle' },
              { id: 'plastic', text: 'Plastic Bag', bin: 'recycle' }
            ]
          }
        ]
      }
    };

    const module = modules[moduleId];
    if (!module) return;

    let currentQuestion = 0;
    const showQuestion = () => {
      modal.show({
        title: module.title,
        content: this.renderQuestion(module.questions[currentQuestion], currentQuestion + 1, module.questions.length),
        size: 'large',
        showClose: false,
        buttons: []
      });
    };

    showQuestion();
  }

  renderQuestion(question, current, total) {
    const progressBar = `
      <div class="progress-bar" style="height: 8px; background: var(--gray-200); border-radius: 4px; margin-bottom: 2rem;">
        <div style="width: ${(current/total) * 100}%; height: 100%; background: var(--primary); border-radius: 4px; transition: width 0.3s ease;"></div>
      </div>
    `;

    switch (question.type) {
      case 'multiple-choice':
        return `
          ${progressBar}
          <div class="question-content">
            <h3 class="question-title" style="margin-bottom: 2rem; text-align: center;">${question.question}</h3>
            <div class="options-grid" style="display: grid; gap: 1rem;">
              ${question.options.map(option => `
                <button class="option-btn" onclick="window.CitizenDashboard.checkAnswer('${option.id}')" 
                  style="padding: 1rem; border: 2px solid var(--gray-200); border-radius: 8px; text-align: left; background: white;">
                  <span style="font-weight: 600; margin-right: 0.5rem;">${option.id.toUpperCase()}.</span>
                  ${option.text}
                </button>
              `).join('')}
            </div>
          </div>
        `;
      
      case 'drag-drop':
        return `
          ${progressBar}
          <div class="question-content">
            <h3 class="question-title" style="margin-bottom: 2rem; text-align: center;">${question.question}</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
              <div class="items-list">
                ${question.items.map(item => `
                  <div class="draggable-item" draggable="true" data-id="${item.id}">
                    ${item.text}
                  </div>
                `).join('')}
              </div>
              <div class="bins-list">
                <div class="waste-bin" data-bin="organic">
                  <i class="fas fa-apple-alt"></i>
                  <span>Organic Waste</span>
                </div>
                <div class="waste-bin" data-bin="recycle">
                  <i class="fas fa-recycle"></i>
                  <span>Recyclables</span>
                </div>
              </div>
            </div>
          </div>
        `;
    }
  }

  handleWasteSorting(itemId, binId) {
    // Add your waste sorting logic here
    notifications.success('Correct!', '+10 points');
    setTimeout(() => {
      modal.hide();
      this.refresh();
    }, 1500);
  }

  // --- Citizen-Specific Methods & Event Handlers ---
  getCurrentLocation() {
    notifications.info('Getting Location', 'Detecting your current location...');
    setTimeout(() => {
        const locationField = document.getElementById('complaintLocation');
        if (locationField) {
            locationField.value = `MG Road, Bengaluru, Karnataka`;
        }
        notifications.success('Location Found', 'Your location has been added.');
    }, 1500);
  }

  toggleVehicleTracking() {
    this.vehicleTracking = !this.vehicleTracking;
    if (this.vehicleTracking) {
      notifications.success('Tracking Started', 'Now tracking garbage vehicles.');
      setTimeout(() => {
        if (this.vehicleTracking) notifications.showVehicleAlert('Vehicle is 5 minutes away!', 'warning');
      }, 5000);
      setTimeout(() => {
        if (this.vehicleTracking) notifications.showVehicleAlert('Vehicle has arrived!', 'success');
      }, 10000);
    } else {
      notifications.info('Tracking Stopped', 'Vehicle tracking disabled.');
    }
    this.refresh();
  }
  
  setScheduleReminder() {
    modal.show({
      title: 'Set Collection Reminder',
      content: `
        <div class="reminder-setup">
          <div class="form-group">
            <label>Choose Collection Type</label>
            <select class="form-control" id="reminderType">
              <option value="regular">Regular Waste (Monday)</option>
              <option value="recyclable">Recyclables (Wednesday)</option>
              <option value="organic">Organic Waste (Friday)</option>
            </select>
          </div>
          <div class="form-group">
            <label>Reminder Time</label>
            <select class="form-control" id="reminderTime">
              <option value="day">1 day before</option>
              <option value="hour">1 hour before</option>
              <option value="30min">30 minutes before</option>
            </select>
          </div>
        </div>
      `,
      buttons: [
        {
          text: 'Cancel',
          style: 'ghost'
        },
        {
          text: 'Set Reminder',
          style: 'primary',
          onClick: () => {
            const type = document.getElementById('reminderType').value;
            const time = document.getElementById('reminderTime').value;
            notifications.success('Reminder Set', 'You will be notified before the collection');
            modal.hide();
          }
        }
      ]
    });
  }

  bindEvents() {
    const complaintForm = document.getElementById('complaintForm');
    if (complaintForm) {
      complaintForm.addEventListener('submit', (e) => {
        e.preventDefault();
        notifications.success('Complaint Submitted', 'Thank you for your report!');
        navigation.navigateTo('my-complaints');
      });
    }

    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
          name: profileForm.querySelector('input[placeholder="Enter your name"]').value,
          email: profileForm.querySelector('input[placeholder="Enter your email"]').value,
          phone: profileForm.querySelector('input[placeholder="Enter your phone number"]').value,
          address: profileForm.querySelector('textarea[placeholder="Enter your address"]').value
        };

        // In a real app, this would make an API call to update the user profile
        const user = authSystem.getCurrentUser();
        Object.assign(user, formData);
        
        notifications.success('Profile Updated', 'Your profile information has been saved.');
      });
    }

    // Handle notification settings changes
    const notificationToggles = document.querySelectorAll('.switch input[type="checkbox"]');
    notificationToggles.forEach(toggle => {
      toggle.addEventListener('change', (e) => {
        const settingName = e.target.closest('.setting-item').querySelector('h4').textContent;
        const enabled = e.target.checked;
        notifications.info('Settings Updated', `${settingName} ${enabled ? 'enabled' : 'disabled'}`);
      });
    });

    // Handle drag and drop for waste sorting exercises
    this.setupDragAndDrop();
  }

  setupDragAndDrop() {
    const draggableItems = document.querySelectorAll('.draggable-item');
    const wasteBins = document.querySelectorAll('.waste-bin');

    draggableItems.forEach(item => {
      item.addEventListener('dragstart', (e) => {
        item.classList.add('dragging');
        e.dataTransfer.setData('text/plain', item.dataset.id);
      });

      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
      });
    });

    wasteBins.forEach(bin => {
      bin.addEventListener('dragover', (e) => {
        e.preventDefault();
        bin.classList.add('drag-over');
      });

      bin.addEventListener('dragleave', () => {
        bin.classList.remove('drag-over');
      });

      bin.addEventListener('drop', (e) => {
        e.preventDefault();
        bin.classList.remove('drag-over');
        const itemId = e.dataTransfer.getData('text/plain');
        this.handleWasteSorting(itemId, bin.dataset.bin);
      });
    });
  }

  handleWasteSorting(itemId, binId) {
    // Add your waste sorting logic here
    notifications.success('Correct!', '+10 points');
    setTimeout(() => {
      modal.hide();
      this.refresh();
    }, 1500);
  }

  startLesson(unitIndex, lessonIndex) {
    const training = this.getTrainingData();
    const lesson = training.units[unitIndex].lessons[lessonIndex];
    
    if (lesson.status === 'locked') {
      notifications.error('Lesson Locked', 'Complete previous lessons to unlock this one!');
      return;
    }

    const exercises = this.getLessonExercises(lesson.type, lesson.title);
    
    modal.show({
      title: lesson.title,
      content: this.renderExercise(exercises[0], 1, exercises.length),
      size: 'large',
      showClose: false,
      buttons: []
    });
  }

  getLessonExercises(type, title) {
    // This would typically come from a backend API
    const exercises = {
      'Waste Bins': [
        {
          type: 'drag-drop',
          question: 'Drag each item to its correct bin',
          items: [
            { id: 1, text: 'Plastic Bottle', correctBin: 'recycle' },
            { id: 2, text: 'Banana Peel', correctBin: 'organic' },
            { id: 3, text: 'Old Battery', correctBin: 'hazardous' },
            { id: 4, text: 'Paper Bag', correctBin: 'recycle' }
          ],
          bins: [
            { id: 'recycle', name: 'Recycling Bin', icon: 'fas fa-recycle' },
            { id: 'organic', name: 'Organic Waste', icon: 'fas fa-apple-alt' },
            { id: 'hazardous', name: 'Hazardous Waste', icon: 'fas fa-exclamation-triangle' }
          ]
        },
        {
          type: 'multiple-choice',
          question: 'Which bin should be used for broken glass?',
          options: [
            { id: 'a', text: 'Regular trash bin' },
            { id: 'b', text: 'Recycling bin' },
            { id: 'c', text: 'Special glass collection bin', correct: true },
            { id: 'd', text: 'Organic waste bin' }
          ]
        }
      ]
    };

    return exercises[title] || [];
  }

  renderExercise(exercise, current, total) {
    const progressBar = `
      <div class="exercise-progress" style="margin-bottom: 2rem;">
        <div class="progress-bar">
          <div class="progress" style="width: ${(current/total) * 100}%"></div>
        </div>
        <div class="exercise-counter">${current}/${total}</div>
      </div>
    `;

    switch (exercise.type) {
      case 'drag-drop':
        return `
          ${progressBar}
          <div class="exercise-content">
            <h3 class="exercise-question">${exercise.question}</h3>
            <div class="drag-drop-exercise">
              <div class="items-to-sort">
                ${exercise.items.map(item => `
                  <div class="draggable-item" draggable="true" data-id="${item.id}">
                    ${item.text}
                  </div>
                `).join('')}
              </div>
              <div class="waste-bins">
                ${exercise.bins.map(bin => `
                  <div class="waste-bin" data-bin="${bin.id}">
                    <i class="${bin.icon}"></i>
                    <span>${bin.name}</span>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="exercise-actions">
              <button class="btn btn-primary" onclick="window.CitizenDashboard.checkAnswer()">
                Check Answer
              </button>
            </div>
          </div>
        `;

      case 'multiple-choice':
        return `
          ${progressBar}
          <div class="exercise-content">
            <h3 class="exercise-question">${exercise.question}</h3>
            <div class="multiple-choice-options">
              ${exercise.options.map(option => `
                <div class="option" onclick="window.CitizenDashboard.selectOption('${option.id}')">
                  <div class="option-marker">${option.id.toUpperCase()}</div>
                  <div class="option-text">${option.text}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;

      default:
        return '<div>Exercise type not supported</div>';
    }
  }

  checkAnswer() {
    // This would validate the current exercise answer
    notifications.success('Correct!', '+10 Green Points');
    this.completeExercise();
  }

  selectOption(optionId) {
    // Handle multiple choice selection
    notifications.success('Correct!', '+10 Green Points');
    this.completeExercise();
  }

  completeExercise() {
    const user = authSystem.getCurrentUser();
    user.dailyProgress = (user.dailyProgress || 0) + 10;
    
    setTimeout(() => {
      modal.hide();
      this.refresh();
    }, 1500);
  }

  renderProfile() {
    const user = authSystem.getCurrentUser();
    const greenPoints = user.greenPoints || 250;
    const trainingProgress = user.trainingProgress || 65;

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">My Profile</h1>
        <p class="dashboard-subtitle">Manage your account and view your statistics</p>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 2rem;">
        <div>
          <div class="card">
            <div class="card-header"><h3 class="card-title">Profile Information</h3></div>
            <div class="card-body">
              <div class="profile-avatar" style="text-align: center; margin-bottom: 2rem;">
                <div style="width: 120px; height: 120px; background: var(--gray-200); border-radius: 60px; margin: 0 auto 1rem; display: flex; align-items: center; justify-content: center;">
                  <i class="fas fa-user" style="font-size: 3rem; color: var(--gray-400);"></i>
                </div>
                <button class="btn btn-ghost"><i class="fas fa-camera"></i> Change Photo</button>
              </div>
              <form id="profileForm">
                <div class="form-group" style="margin-bottom: 1rem;">
                  <label>Full Name</label>
                  <input type="text" class="form-control" value="${user.name || ''}" placeholder="Enter your name">
                </div>
                <div class="form-group" style="margin-bottom: 1rem;">
                  <label>Email</label>
                  <input type="email" class="form-control" value="${user.email || ''}" placeholder="Enter your email">
                </div>
                <div class="form-group" style="margin-bottom: 1rem;">
                  <label>Phone</label>
                  <input type="tel" class="form-control" value="${user.phone || ''}" placeholder="Enter your phone number">
                </div>
                <div class="form-group" style="margin-bottom: 1rem;">
                  <label>Address</label>
                  <textarea class="form-control" rows="3" placeholder="Enter your address">${user.address || ''}</textarea>
                </div>
                <button type="submit" class="btn btn-primary w-full"><i class="fas fa-save"></i> Save Changes</button>
              </form>
            </div>
          </div>
        </div>
        <div>
          <div class="card" style="margin-bottom: 2rem;">
            <div class="card-header"><h3 class="card-title">Activity Overview</h3></div>
            <div class="card-body">
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
                <div class="stat-card">
                  <div class="stat-title">Green Points</div>
                  <div class="stat-value">${greenPoints}</div>
                  <div class="stat-desc">Lifetime earned</div>
                </div>
                <div class="stat-card">
                  <div class="stat-title">Complaints</div>
                  <div class="stat-value">7</div>
                  <div class="stat-desc">Total submitted</div>
                </div>
                <div class="stat-card">
                  <div class="stat-title">Training</div>
                  <div class="stat-value">${trainingProgress}%</div>
                  <div class="stat-desc">Progress completed</div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="card">
            <div class="card-header"><h3 class="card-title">Notification Settings</h3></div>
            <div class="card-body">
              <div class="settings-list">
                <div class="setting-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--gray-200);">
                  <div>
                    <h4>Email Notifications</h4>
                    <p style="color: var(--gray-600);">Receive updates about your complaints</p>
                  </div>
                  <label class="switch">
                    <input type="checkbox" checked>
                    <span class="slider round"></span>
                  </label>
                </div>
                <div class="setting-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--gray-200);">
                  <div>
                    <h4>Vehicle Tracking Alerts</h4>
                    <p style="color: var(--gray-600);">Get notified when vehicle is nearby</p>
                  </div>
                  <label class="switch">
                    <input type="checkbox" checked>
                    <span class="slider round"></span>
                  </label>
                </div>
                <div class="setting-item" style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 0;">
                  <div>
                    <h4>Green Points Updates</h4>
                    <p style="color: var(--gray-600);">Notifications about points earned</p>
                  </div>
                  <label class="switch">
                    <input type="checkbox" checked>
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  getTrainingData() {
    return {
      units: [
        {
          title: "Unit 1: Waste Basics",
          lessons: [
            { icon: "fas fa-trash", status: "completed", type: "sorting", title: "Types of Waste" },
            { icon: "fas fa-recycle", status: "completed", type: "multiple-choice", title: "Basic Recycling" },
            { icon: "fas fa-dumpster", status: "current", type: "drag-drop", title: "Waste Bins" },
            { icon: "fas fa-trash-restore", status: "locked", type: "matching", title: "Waste Journey" }
          ]
        },
        {
          title: "Unit 2: Recycling Master",
          lessons: [
            { icon: "fas fa-paper-plane", status: "locked", type: "sorting", title: "Paper & Cardboard" },
            { icon: "fas fa-wine-bottle", status: "locked", type: "multiple-choice", title: "Glass & Metal" },
            { icon: "fas fa-box", status: "locked", type: "drag-drop", title: "Packaging" },
            { icon: "fas fa-battery-full", status: "locked", type: "quiz", title: "E-Waste" }
          ]
        },
        {
          title: "Unit 3: Green Champion",
          lessons: [
            { icon: "fas fa-seedling", status: "locked", type: "sorting", title: "Composting" },
            { icon: "fas fa-hand-holding-water", status: "locked", type: "multiple-choice", title: "Water Conservation" },
            { icon: "fas fa-lightbulb", status: "locked", type: "matching", title: "Energy Saving" },
            { icon: "fas fa-award", status: "locked", type: "final-quiz", title: "Final Challenge" }
          ]
        }
      ]
    };
  }
  
  getLessonBackground(status) {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'available': return '#2196F3';
      case 'locked': return '#9E9E9E';
      case 'current': return '#FF9800';
      default: return '#9E9E9E';
    }
  }

  renderTraining() {
    const user = authSystem.getCurrentUser();
    const trainingData = this.getTrainingData();
    const dailyGoal = user.dailyGoal || 50;
    const dailyProgress = user.dailyProgress || 30;
    const streak = user.streak || 3;
    const lives = user.lives || 5;

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Waste Management Training</h1>
        <p class="dashboard-subtitle">Learn sustainable practices and earn Green Points</p>
      </div>
      
      <!-- Game Status Bar -->
      <div style="background: var(--primary); color: white; padding: 1rem; border-radius: 12px; margin-bottom: 2rem;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 2rem;">
            <div>
              <i class="fas fa-fire" style="color: #FF9801;"></i>
              <span>${streak} day streak</span>
            </div>
            <div>
              <i class="fas fa-heart" style="color: #FF5252;"></i>
              <span>${lives} lives</span>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div class="progress-ring">
              <svg width="40" height="40">
                <circle class="progress-ring-circle" 
                  stroke="white" 
                  stroke-width="3" 
                  fill="transparent" 
                  r="16" 
                  cx="20" 
                  cy="20"
                  style="stroke-dasharray: 100; stroke-dashoffset: ${100 - (dailyProgress/dailyGoal * 100)};"
                />
              </svg>
              <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                ${Math.round(dailyProgress/dailyGoal * 100)}%
              </span>
            </div>
            <span>Daily Goal</span>
          </div>
        </div>
      </div>

      <!-- Learning Path -->
      <div class="learning-path" style="max-width: 800px; margin: 0 auto;">
        ${trainingData.units.map((unit, unitIndex) => `
          <div class="unit-section" style="margin-bottom: 3rem;">
            <h3 style="margin-bottom: 1rem;">${unit.title}</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 1rem; position: relative;">
              ${unit.lessons.map((lesson, lessonIndex) => `
                <div class="lesson-bubble ${lesson.status}" 
                  style="
                    position: relative;
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    background: ${this.getLessonBackground(lesson.status)};
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    ${lesson.status === 'locked' ? 'opacity: 0.5;' : ''}
                  "
                  onclick="${lesson.status !== 'locked' ? `window.CitizenDashboard.startLesson(${unitIndex}, ${lessonIndex})` : ''}"
                >
                  <i class="${lesson.icon}" style="font-size: 1.5rem; color: white;"></i>
                  ${lesson.status === 'completed' ? 
                    `<div style="position: absolute; bottom: -5px; right: -5px; background: #4CAF50; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center;">
                      <i class="fas fa-check" style="color: white; font-size: 0.8rem;"></i>
                    </div>` 
                    : ''
                  }
                </div>
                ${lessonIndex < unit.lessons.length - 1 ? 
                  `<div style="flex: 1; height: 2px; background: var(--gray-300); margin-top: 40px;"></div>` 
                  : ''
                }
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  refresh() {
    this.loadSection(this.currentSection);
  }
}

// Initialize and export
window.CitizenDashboard = new CitizenDashboard();

// Listen for navigation events
document.addEventListener('DOMContentLoaded', () => {
  if (authSystem.currentRole === 'citizen') {
    window.CitizenDashboard.loadSection('dashboard');
  }
});