// Worker Dashboard
class WorkerDashboard {
  constructor() {
    this.currentSection = 'dashboard';
    this.isOnDuty = false;
    this.currentTasks = [];
    this.locationTracking = false;
  }

  loadSection(section) {
    this.currentSection = section;
    const content = document.getElementById('mainContent');
    
    switch (section) {
      case 'dashboard':
        content.innerHTML = this.renderDashboard();
        break;
      case 'my-tasks':
        content.innerHTML = this.renderMyTasks();
        break;
      case 'attendance':
        content.innerHTML = this.renderAttendance();
        break;
      case 'location':
        content.innerHTML = this.renderLocation();
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

  getTrainingData() {
    return {
      units: [
        {
          title: "Unit 1: Safety First",
          lessons: [
            { icon: "fas fa-hard-hat", status: "completed", type: "sorting", title: "Personal Protective Equipment" },
            { icon: "fas fa-hand-sparkles", status: "completed", type: "multiple-choice", title: "Hygiene & Sanitation" },
            { icon: "fas fa-truck", status: "current", type: "drag-drop", title: "Vehicle Safety" },
            { icon: "fas fa-exclamation-triangle", status: "locked", type: "matching", title: "Emergency Procedures" }
          ]
        },
        {
          title: "Unit 2: Waste Collection",
          lessons: [
            { icon: "fas fa-dumpster", status: "locked", type: "sorting", title: "Waste Types & Handling" },
            { icon: "fas fa-weight", status: "locked", type: "multiple-choice", title: "Load Management" },
            { icon: "fas fa-map-marked-alt", status: "locked", type: "drag-drop", title: "Route Optimization" },
            { icon: "fas fa-clock", status: "locked", type: "quiz", title: "Time Management" }
          ]
        },
        {
          title: "Unit 3: Professional Skills",
          lessons: [
            { icon: "fas fa-comments", status: "locked", type: "sorting", title: "Citizen Communication" },
            { icon: "fas fa-mobile-alt", status: "locked", type: "multiple-choice", title: "App Usage" },
            { icon: "fas fa-chart-line", status: "locked", type: "matching", title: "Performance Metrics" },
            { icon: "fas fa-award", status: "locked", type: "final-quiz", title: "Final Assessment" }
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

  renderDashboard() {
    const user = authSystem.getCurrentUser();
    const todaysTasks = 5;
    const completedTasks = 3;
    const pendingTasks = todaysTasks - completedTasks;

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Worker Dashboard</h1>
        <p class="dashboard-subtitle">Welcome back, ${user.name}!</p>
        <div style="display: flex; gap: 1rem;">
          <button class="btn ${this.isOnDuty ? 'btn-error' : 'btn-success'}" onclick="window.WorkerDashboard.toggleDutyStatus()">
            <i class="fas fa-${this.isOnDuty ? 'stop' : 'play'}"></i>
            ${this.isOnDuty ? 'End Shift' : 'Start Shift'}
          </button>
          ${this.isOnDuty ? `
            <button class="btn btn-secondary" onclick="window.WorkerDashboard.toggleLocationTracking()">
              <i class="fas fa-map-marker-alt"></i>
              ${this.locationTracking ? 'Stop' : 'Start'} Tracking
            </button>
          ` : ''}
        </div>
      </div>

      <div class="dashboard-stats">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Today's Tasks</span>
            <div class="stat-icon primary">
              <i class="fas fa-clipboard-list"></i>
            </div>
          </div>
          <div class="stat-value">${todaysTasks}</div>
          <div class="stat-change ${pendingTasks === 0 ? 'positive' : ''}">
            <i class="fas fa-${pendingTasks === 0 ? 'check' : 'clock'}"></i>
            ${pendingTasks === 0 ? 'All completed!' : `${pendingTasks} pending`}
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Completed Tasks</span>
            <div class="stat-icon success">
              <i class="fas fa-check-circle"></i>
            </div>
          </div>
          <div class="stat-value">${completedTasks}</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i>
            Great progress!
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Work Hours Today</span>
            <div class="stat-icon secondary">
              <i class="fas fa-clock"></i>
            </div>
          </div>
          <div class="stat-value">${this.isOnDuty ? '4.5h' : '0h'}</div>
          <div class="stat-change ${this.isOnDuty ? 'positive' : ''}">
            <i class="fas fa-${this.isOnDuty ? 'play' : 'pause'}"></i>
            ${this.isOnDuty ? 'On duty' : 'Off duty'}
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Performance Rating</span>
            <div class="stat-icon warning">
              <i class="fas fa-star"></i>
            </div>
          </div>
          <div class="stat-value">4.8</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i>
            Excellent work!
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; margin-top: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Current Tasks</h3>
            <button class="btn btn-primary" onclick="navigation.navigateTo('my-tasks')">
              <i class="fas fa-eye"></i>
              View All
            </button>
          </div>
          <div class="card-body">
            ${this.renderTaskList(true)}
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Quick Actions</h3>
          </div>
          <div class="card-body">
            <div style="display: flex; flex-direction: column; gap: 1rem;">
              <button class="btn btn-primary" onclick="window.WorkerDashboard.startFacialRecognition()">
                <i class="fas fa-camera"></i>
                Facial Recognition Login
              </button>
              <button class="btn btn-secondary" onclick="navigation.navigateTo('attendance')">
                <i class="fas fa-calendar-check"></i>
                Mark Attendance
              </button>
              <button class="btn btn-info" onclick="navigation.navigateTo('location')">
                <i class="fas fa-map-marker-alt"></i>
                Update Location
              </button>
              <button class="btn btn-success" onclick="window.WorkerDashboard.reportEmergency()">
                <i class="fas fa-exclamation-triangle"></i>
                Report Emergency
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Today's Route</h3>
          </div>
          <div class="card-body">
            <div class="map-container" style="height: 300px;">
              <div class="map-placeholder">
                <i class="fas fa-route" style="font-size: 3rem; color: var(--gray-400); margin-bottom: 1rem;"></i>
                <p>Your assigned route for today</p>
                <div style="margin-top: 1rem; display: flex; justify-content: center; gap: 1rem;">
                  <span class="badge badge-info">5 Stops</span>
                  <span class="badge badge-success">3 Completed</span>
                  <span class="badge badge-warning">2 Remaining</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderMyTasks() {
    const tasks = [
      {
        id: 'T001',
        type: 'complaint',
        title: 'Clean overflowing bin at Main Street',
        location: 'Main Street, Near Bus Stop',
        priority: 'high',
        status: 'assigned',
        estimatedTime: '30 min',
        distance: '2.3 km',
        complainantRating: null
      },
      {
        id: 'T002',
        type: 'routine',
        title: 'Garbage collection - Route A1',
        location: 'Green Valley Apartments',
        priority: 'medium',
        status: 'completed',
        estimatedTime: '45 min',
        distance: '1.8 km',
        complainantRating: 4.5
      },
      {
        id: 'T003',
        type: 'complaint',
        title: 'Remove illegal dumping',
        location: 'Park Avenue',
        priority: 'high',
        status: 'in_progress',
        estimatedTime: '60 min',
        distance: '3.1 km',
        complainantRating: null
      }
    ];

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">My Tasks</h1>
        <p class="dashboard-subtitle">Manage your assigned tasks and routes</p>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">Task List</h3>
          <div style="display: flex; gap: 1rem;">
            <select class="form-control" style="width: auto;" id="taskStatusFilter">
              <option value="">All Status</option>
              <option value="assigned">Assigned</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <div class="card-body">
          <div class="task-grid" style="display: grid; gap: 1.5rem;">
            ${tasks.map(task => `
              <div class="task-card" style="border: 1px solid var(--gray-200); border-radius: 12px; padding: 1.5rem; ${task.priority === 'high' ? 'border-left: 4px solid var(--error);' : task.priority === 'medium' ? 'border-left: 4px solid var(--warning);' : 'border-left: 4px solid var(--info);'}">
                <div style="display: flex; justify-content: between; align-items: start; margin-bottom: 1rem;">
                  <div style="flex: 1;">
                    <h4 style="margin-bottom: 0.5rem;">${task.title}</h4>
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem; font-size: 0.875rem; color: var(--gray-600);">
                      <div style="display: flex; align-items: center; gap: 0.25rem;">
                        <i class="fas fa-map-marker-alt"></i>
                        ${task.location}
                      </div>
                      <div style="display: flex; align-items: center; gap: 0.25rem;">
                        <i class="fas fa-route"></i>
                        ${task.distance}
                      </div>
                      <div style="display: flex; align-items: center; gap: 0.25rem;">
                        <i class="fas fa-clock"></i>
                        ${task.estimatedTime}
                      </div>
                    </div>
                  </div>
                  <div style="display: flex; flex-direction: column; align-items: end; gap: 0.5rem;">
                    ${Utils.getStatusBadge(task.status)}
                    ${Utils.getPriorityBadge(task.priority)}
                  </div>
                </div>
                
                <div style="display: flex; justify-content: between; align-items: center;">
                  <div style="display: flex; gap: 0.5rem;">
                    ${task.status === 'assigned' ? `
                      <button class="btn btn-primary" onclick="window.WorkerDashboard.startTask('${task.id}')">
                        <i class="fas fa-play"></i>
                        Start
                      </button>
                      <button class="btn btn-secondary" onclick="window.WorkerDashboard.viewTaskDetails('${task.id}')">
                        <i class="fas fa-eye"></i>
                        Details
                      </button>
                    ` : task.status === 'in_progress' ? `
                      <button class="btn btn-success" onclick="window.WorkerDashboard.completeTask('${task.id}')">
                        <i class="fas fa-check"></i>
                        Complete
                      </button>
                      <button class="btn btn-warning" onclick="window.WorkerDashboard.reportIssue('${task.id}')">
                        <i class="fas fa-exclamation-triangle"></i>
                        Report Issue
                      </button>
                    ` : `
                      <button class="btn btn-info" onclick="window.WorkerDashboard.viewTaskDetails('${task.id}')">
                        <i class="fas fa-eye"></i>
                        View Details
                      </button>
                    `}
                  </div>
                  
                  ${task.complainantRating ? `
                    <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--warning);">
                      <i class="fas fa-star"></i>
                      <span style="font-weight: 600;">${task.complainantRating}</span>
                    </div>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  renderTaskList(summary = false) {
    const tasks = [
      { id: 'T001', title: 'Clean overflowing bin', status: 'assigned', priority: 'high' },
      { id: 'T002', title: 'Garbage collection Route A1', status: 'completed', priority: 'medium' },
      { id: 'T003', title: 'Remove illegal dumping', status: 'in_progress', priority: 'high' }
    ];

    const displayTasks = summary ? tasks.slice(0, 3) : tasks;

    return `
      <div class="task-list">
        ${displayTasks.map(task => `
          <div class="task-item" style="display: flex; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--gray-200);">
            <div style="flex: 1;">
              <div style="font-weight: 600; margin-bottom: 0.25rem;">${task.title}</div>
              <div style="display: flex; gap: 1rem;">
                ${Utils.getStatusBadge(task.status)}
                ${Utils.getPriorityBadge(task.priority)}
              </div>
            </div>
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn btn-ghost" onclick="window.WorkerDashboard.viewTaskDetails('${task.id}')" title="View Details">
                <i class="fas fa-eye"></i>
              </button>
              ${task.status === 'assigned' ? 
                `<button class="btn btn-ghost" onclick="window.WorkerDashboard.startTask('${task.id}')" title="Start Task">
                  <i class="fas fa-play"></i>
                </button>` : 
                task.status === 'in_progress' ?
                `<button class="btn btn-ghost" onclick="window.WorkerDashboard.completeTask('${task.id}')" title="Complete Task">
                  <i class="fas fa-check"></i>
                </button>` : ''
              }
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  renderAttendance() {
    const attendanceRecords = [
      { date: '2024-01-15', checkIn: '08:00 AM', checkOut: '05:00 PM', hours: '9h', status: 'present' },
      { date: '2024-01-14', checkIn: '08:15 AM', checkOut: '05:10 PM', hours: '8h 55m', status: 'present' },
      { date: '2024-01-13', checkIn: '08:30 AM', checkOut: '04:45 PM', hours: '8h 15m', status: 'present' },
      { date: '2024-01-12', checkIn: '-', checkOut: '-', hours: '0h', status: 'absent' }
    ];

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Attendance Management</h1>
        <p class="dashboard-subtitle">Track your work hours and attendance</p>
      </div>

      <div class="dashboard-stats" style="margin-bottom: 2rem;">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">This Week</span>
            <div class="stat-icon primary">
              <i class="fas fa-calendar-week"></i>
            </div>
          </div>
          <div class="stat-value">4/5</div>
          <div class="stat-change positive">
            <i class="fas fa-check"></i>
            Days present
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Total Hours</span>
            <div class="stat-icon secondary">
              <i class="fas fa-clock"></i>
            </div>
          </div>
          <div class="stat-value">34h</div>
          <div class="stat-change positive">
            <i class="fas fa-arrow-up"></i>
            This week
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Punctuality</span>
            <div class="stat-icon success">
              <i class="fas fa-user-check"></i>
            </div>
          </div>
          <div class="stat-value">95%</div>
          <div class="stat-change positive">
            <i class="fas fa-trophy"></i>
            Excellent
          </div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Facial Recognition Login</h3>
          </div>
          <div class="card-body">
            <div style="text-align: center;">
              <div id="faceRecognitionArea" style="width: 200px; height: 200px; border: 2px dashed var(--gray-300); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 2rem; background: var(--gray-50);">
                <div style="text-align: center; color: var(--gray-500);">
                  <i class="fas fa-camera" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                  <p>Click to start facial recognition</p>
                </div>
              </div>
              <button class="btn btn-primary" onclick="window.WorkerDashboard.startFacialRecognition()">
                <i class="fas fa-play"></i>
                Start Recognition
              </button>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Manual Check-in/out</h3>
          </div>
          <div class="card-body">
            <div style="text-align: center;">
              <div style="margin-bottom: 2rem;">
                <div style="font-size: 2rem; font-weight: 700; color: var(--primary); margin-bottom: 0.5rem;">
                  ${new Date().toLocaleTimeString()}
                </div>
                <div style="color: var(--gray-600);">${new Date().toDateString()}</div>
              </div>
              
              <div style="display: flex; flex-direction: column; gap: 1rem;">
                <button class="btn ${this.isOnDuty ? 'btn-error' : 'btn-success'}" onclick="window.WorkerDashboard.toggleDutyStatus()">
                  <i class="fas fa-${this.isOnDuty ? 'stop-circle' : 'play-circle'}"></i>
                  ${this.isOnDuty ? 'Check Out' : 'Check In'}
                </button>
                
                ${this.isOnDuty ? `
                  <div style="padding: 1rem; background: var(--success); color: white; border-radius: 8px;">
                    <i class="fas fa-clock"></i>
                    On duty since 8:00 AM
                  </div>
                ` : ''}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Attendance History</h3>
          </div>
          <div class="card-body">
            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Total Hours</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${attendanceRecords.map(record => `
                    <tr>
                      <td>${record.date}</td>
                      <td>${record.checkIn}</td>
                      <td>${record.checkOut}</td>
                      <td>${record.hours}</td>
                      <td>
                        <span class="badge ${record.status === 'present' ? 'badge-success' : 'badge-error'}">
                          ${Utils.capitalize(record.status)}
                        </span>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderLocation() {
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Location & Vehicle Tracking</h1>
        <p class="dashboard-subtitle">Manage your location sharing and vehicle status</p>
      </div>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Current Location</h3>
            <div style="display: flex; gap: 1rem;">
              <button class="btn ${this.locationTracking ? 'btn-error' : 'btn-success'}" onclick="window.WorkerDashboard.toggleLocationTracking()">
                <i class="fas fa-${this.locationTracking ? 'stop' : 'play'}"></i>
                ${this.locationTracking ? 'Stop Tracking' : 'Start Tracking'}
              </button>
              <button class="btn btn-secondary" onclick="window.WorkerDashboard.updateLocation()">
                <i class="fas fa-sync"></i>
                Update Location
              </button>
            </div>
          </div>
          <div class="card-body">
            <div class="map-container" style="height: 400px;">
              <div class="map-placeholder">
                <i class="fas fa-map-marker-alt" style="font-size: 4rem; color: var(--primary); margin-bottom: 1rem;"></i>
                <h3 style="margin-bottom: 1rem;">Real-time Location Tracking</h3>
                <p style="color: var(--gray-600); margin-bottom: 2rem;">
                  ${this.locationTracking ? 
                    'Your location is being tracked and shared with the system.' : 
                    'Location tracking is disabled. Enable to share your position.'
                  }
                </p>
                <div style="display: flex; justify-content: center; gap: 1rem;">
                  <div style="text-align: center;">
                    <div style="font-weight: 600; color: var(--primary);">28.6139° N</div>
                    <div style="font-size: 0.875rem; color: var(--gray-600);">Latitude</div>
                  </div>
                  <div style="text-align: center;">
                    <div style="font-weight: 600; color: var(--primary);">77.2090° E</div>
                    <div style="font-size: 0.875rem; color: var(--gray-600);">Longitude</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Vehicle Status</h3>
          </div>
          <div class="card-body">
            <div style="margin-bottom: 2rem;">
              <div style="text-align: center; margin-bottom: 1.5rem;">
                <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--success); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 2rem;">
                  <i class="fas fa-truck"></i>
                </div>
                <div style="font-weight: 600; margin-bottom: 0.25rem;">Vehicle ID: GC-001</div>
                <div style="color: var(--gray-600);">Garbage Collection Truck</div>
              </div>
              
              <div class="vehicle-stats">
                <div style="display: flex; justify-content: between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--gray-200);">
                  <span>Status:</span>
                  <span class="badge badge-success">Active</span>
                </div>
                <div style="display: flex; justify-content: between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--gray-200);">
                  <span>Fuel Level:</span>
                  <strong>85%</strong>
                </div>
                <div style="display: flex; justify-content: between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--gray-200);">
                  <span>Load Capacity:</span>
                  <strong>60%</strong>
                </div>
                <div style="display: flex; justify-content: between;">
                  <span>Last Service:</span>
                  <strong>Jan 10, 2024</strong>
                </div>
              </div>
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              <button class="btn btn-primary" onclick="window.WorkerDashboard.startVehicleTracking()">
                <i class="fas fa-broadcast-tower"></i>
                Start Broadcasting
              </button>
              <button class="btn btn-warning" onclick="window.WorkerDashboard.reportVehicleIssue()">
                <i class="fas fa-exclamation-triangle"></i>
                Report Issue
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Location History</h3>
          </div>
          <div class="card-body">
            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Location</th>
                    <th>Activity</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>10:30 AM</td>
                    <td>Main Street Market</td>
                    <td>Garbage Collection</td>
                    <td>25 min</td>
                  </tr>
                  <tr>
                    <td>09:45 AM</td>
                    <td>Green Valley Apartments</td>
                    <td>Complaint Resolution</td>
                    <td>30 min</td>
                  </tr>
                  <tr>
                    <td>09:15 AM</td>
                    <td>Central Depot</td>
                    <td>Vehicle Check</td>
                    <td>15 min</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderTraining() {
    const user = authSystem.getCurrentUser();
    const trainingData = this.getTrainingData();
    const dailyGoal = user.dailyGoal || 50;
    const dailyProgress = user.dailyProgress || 30;
    const streak = user.streak || 5;
    const lives = user.lives || 3;
    const performanceScore = user.performanceScore || 85;

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Worker Training Program</h1>
        <p class="dashboard-subtitle">Enhance your skills and earn performance points</p>
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
            <div>
              <i class="fas fa-star" style="color: #FFD700;"></i>
              <span>${performanceScore}% efficiency</span>
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
                  onclick="${lesson.status !== 'locked' ? `window.WorkerDashboard.startLesson(${unitIndex}, ${lessonIndex})` : ''}"
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

      <!-- Performance Insights -->
      <div class="card" style="margin-top: 2rem;">
        <div class="card-header">
          <h3 class="card-title">Performance Insights</h3>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
            <div class="stat-card">
              <div class="stat-title">Safety Score</div>
              <div class="stat-value">95%</div>
              <div class="stat-desc positive">+5% this month</div>
            </div>
            <div class="stat-card">
              <div class="stat-title">Route Efficiency</div>
              <div class="stat-value">88%</div>
              <div class="stat-desc positive">+3% this week</div>
            </div>
            <div class="stat-card">
              <div class="stat-title">Citizen Feedback</div>
              <div class="stat-value">4.8/5</div>
              <div class="stat-desc">Based on 45 reviews</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderProfile() {
    const user = authSystem.getCurrentUser();
    
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Profile Settings</h1>
        <p class="dashboard-subtitle">Manage your worker profile and preferences</p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 2rem;">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Profile Information</h3>
          </div>
          <div class="card-body">
            <div style="text-align: center; margin-bottom: 2rem;">
              <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 2rem; font-weight: 700;">
                ${user.name.charAt(0).toUpperCase()}
              </div>
              <h3 style="margin-bottom: 0.5rem;">${user.name}</h3>
              <p style="color: var(--gray-600);">Field Worker</p>
            </div>
            <div class="profile-stats">
              <div style="display: flex; justify-content: between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--gray-200);">
                <span>Employee ID:</span>
                <strong>WK-001</strong>
              </div>
              <div style="display: flex; justify-content: between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--gray-200);">
                <span>Zone Assigned:</span>
                <strong>Zone A</strong>
              </div>
              <div style="display: flex; justify-content: between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--gray-200);">
                <span>Performance Rating:</span>
                <strong style="color: var(--warning);">4.8 ★</strong>
              </div>
              <div style="display: flex; justify-content: between;">
                <span>Tasks Completed:</span>
                <strong>247</strong>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Account Settings</h3>
          </div>
          <div class="card-body">
            <form class="profile-form">
              <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Full Name</label>
                <input type="text" class="form-control" value="${user.name}">
              </div>
              <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Email Address</label>
                <input type="email" class="form-control" value="${user.email}">
              </div>
              <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Phone Number</label>
                <input type="tel" class="form-control" placeholder="Enter phone number">
              </div>
              <div class="form-group" style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Zone Assignment</label>
                <select class="form-control" disabled>
                  <option>Zone A</option>
                </select>
              </div>
              <div class="form-group" style="margin-bottom: 2rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Emergency Contact</label>
                <input type="tel" class="form-control" placeholder="Emergency contact number">
              </div>
              <div class="form-actions">
                <button type="submit" class="btn btn-primary">
                  <i class="fas fa-save"></i>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  // Worker-specific methods
  static async startLesson(unitIndex, lessonIndex) {
    const user = authSystem.getCurrentUser();
    const trainingData = window.workerDashboard.getTrainingData();
    const unit = trainingData.units[unitIndex];
    const lesson = unit.lessons[lessonIndex];
    
    if (lesson.status === 'locked') {
      notifications.warning('Lesson Locked', 'Complete previous lessons to unlock this one.');
      return;
    }

    const exercise = {
      title: lesson.title,
      description: lesson.description,
      questions: lesson.questions.map(q => ({
        ...q,
        userAnswer: null
      })),
      currentQuestion: 0,
      lives: user.lives || 3,
      score: 0
    };

    // Show exercise modal
    modal.show('Exercise', `
      <div class="exercise-container">
        <div class="exercise-header">
          <div class="lives">
            ${Array(exercise.lives).fill(0).map(() => '<i class="fas fa-heart" style="color: #FF5252;"></i>').join('')}
          </div>
          <div class="progress-bar">
            <div class="progress" style="width: ${(exercise.currentQuestion / exercise.questions.length) * 100}%"></div>
          </div>
          <div class="score">${exercise.score} points</div>
        </div>
        
        <div class="exercise-content">
          ${WorkerDashboard.renderQuestion(exercise.questions[exercise.currentQuestion])}
        </div>
        
        <div class="exercise-actions">
          <button class="btn btn-primary check-answer" style="width: 100%;">
            Check Answer
          </button>
        </div>
      </div>
    `);

    // Add event listeners
    const checkButton = document.querySelector('.check-answer');
    checkButton.addEventListener('click', () => WorkerDashboard.checkAnswer(exercise));
  }

  static renderQuestion(question) {
    switch (question.type) {
      case 'multiple-choice':
        return `
          <div class="question multiple-choice">
            <h3 class="question-text">${question.text}</h3>
            <div class="options">
              ${question.options.map((option, index) => `
                <div class="option" data-index="${index}">
                  <div class="option-content">
                    ${option.image ? `<img src="${option.image}" alt="${option.text}">` : ''}
                    <span>${option.text}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      
      case 'arrange':
        return `
          <div class="question arrange">
            <h3 class="question-text">${question.text}</h3>
            <div class="steps sortable">
              ${question.steps.map((step, index) => `
                <div class="step" data-index="${index}">
                  <i class="fas fa-grip-vertical"></i>
                  <span>${step}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      
      default:
        return `<div class="error">Unknown question type</div>`;
    }
  }

  static checkAnswer(exercise) {
    const question = exercise.questions[exercise.currentQuestion];
    let isCorrect = false;
    let userAnswer;

    switch (question.type) {
      case 'multiple-choice':
        const selectedOption = document.querySelector('.option.selected');
        if (!selectedOption) {
          notifications.warning('Select an Answer', 'Please select an answer before checking.');
          return;
        }
        userAnswer = parseInt(selectedOption.dataset.index);
        isCorrect = userAnswer === question.correctAnswer;
        break;

      case 'arrange':
        const steps = Array.from(document.querySelectorAll('.step')).map(step => parseInt(step.dataset.index));
        userAnswer = steps;
        isCorrect = steps.every((step, index) => step === index);
        break;
    }

    if (isCorrect) {
      exercise.score += 10;
      notifications.success('Correct!', '+10 points');
      
      if (exercise.currentQuestion < exercise.questions.length - 1) {
        exercise.currentQuestion++;
        document.querySelector('.exercise-content').innerHTML = WorkerDashboard.renderQuestion(exercise.questions[exercise.currentQuestion]);
        document.querySelector('.progress').style.width = `${(exercise.currentQuestion / exercise.questions.length) * 100}%`;
      } else {
        // Lesson completed
        modal.hide();
        notifications.success('Lesson Completed!', `You earned ${exercise.score} points!`);
        window.workerDashboard.updateLessonStatus();
      }
    } else {
      exercise.lives--;
      document.querySelector('.lives').innerHTML = Array(exercise.lives).fill(0).map(() => '<i class="fas fa-heart" style="color: #FF5252;"></i>').join('');
      
      if (exercise.lives === 0) {
        modal.hide();
        notifications.error('Game Over', 'You ran out of lives! Try again.');
      } else {
        notifications.error('Incorrect', 'Try again! -1 life');
      }
    }
  }

  updateLessonStatus() {
    // Update lesson status in user data
    const user = authSystem.getCurrentUser();
    user.dailyProgress = (user.dailyProgress || 0) + 10;
    if (user.dailyProgress >= user.dailyGoal) {
      user.streak = (user.streak || 0) + 1;
      user.dailyProgress = 0;
      notifications.success('Daily Goal Achieved!', `${user.streak} day streak! Keep it up!`);
    }
    authSystem.updateUser(user);
    
    // Refresh the training view
    this.navigate('training');
  }

  toggleDutyStatus() {
    this.isOnDuty = !this.isOnDuty;
    
    if (this.isOnDuty) {
      notifications.success('Shift Started', 'You are now on duty. Location tracking has been enabled.');
      this.locationTracking = true;
    } else {
      notifications.info('Shift Ended', 'You have successfully ended your shift.');
      this.locationTracking = false;
    }
    
    this.refresh();
  }

  startFacialRecognition() {
    const faceArea = document.getElementById('faceRecognitionArea');
    if (faceArea) {
      faceArea.innerHTML = `
        <div style="text-align: center; color: var(--primary);">
          <i class="fas fa-spinner fa-spin" style="font-size: 3rem; margin-bottom: 1rem;"></i>
          <p>Scanning face...</p>
        </div>
      `;
    }

    // Simulate facial recognition process
    setTimeout(() => {
      if (faceArea) {
        faceArea.innerHTML = `
          <div style="text-align: center; color: var(--success);">
            <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
            <p>Recognition successful!</p>
          </div>
        `;
      }
      
      notifications.success('Login Successful', 'Facial recognition completed. Attendance marked.');
      this.isOnDuty = true;
      
      setTimeout(() => {
        this.refresh();
      }, 2000);
    }, 3000);
  }

  toggleLocationTracking() {
    this.locationTracking = !this.locationTracking;
    
    if (this.locationTracking) {
      notifications.success('Location Tracking', 'Your location is now being shared with the system');
    } else {
      notifications.warning('Location Tracking', 'Location sharing has been disabled');
    }
    
    this.refresh();
  }

  updateLocation() {
    notifications.info('Location Update', 'Updating your current location...');
    
    // Simulate location update
    setTimeout(() => {
      notifications.success('Location Updated', 'Your location has been successfully updated');
    }, 1500);
  }

  startVehicleTracking() {
    notifications.success('Vehicle Broadcasting', 'Your vehicle location is now being broadcast to citizens');
  }

  reportVehicleIssue() {
    const content = `
      <form class="vehicle-issue-form">
        <div class="form-group" style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Issue Type</label>
          <select class="form-control" required>
            <option value="">Select issue type</option>
            <option value="mechanical">Mechanical Problem</option>
            <option value="fuel">Fuel Issue</option>
            <option value="tire">Tire Problem</option>
            <option value="electrical">Electrical Issue</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div class="form-group" style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Description</label>
          <textarea class="form-control" rows="4" placeholder="Describe the vehicle issue in detail..." required></textarea>
        </div>
        
        <div class="form-group" style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Severity</label>
          <select class="form-control" required>
            <option value="low">Low - Can continue work</option>
            <option value="medium">Medium - Affects efficiency</option>
            <option value="high">High - Cannot continue work</option>
          </select>
        </div>
        
        <div style="display: flex; gap: 1rem; justify-content: flex-end;">
          <button type="button" class="btn btn-ghost" onclick="modal.hide()">Cancel</button>
          <button type="submit" class="btn btn-warning">
            <i class="fas fa-exclamation-triangle"></i>
            Report Issue
          </button>
        </div>
      </form>
    `;

    modal.show('Report Vehicle Issue', content);
  }

  startTask(taskId) {
    notifications.info('Task Started', `Task ${taskId} has been started. Navigate to the location to begin work.`);
    this.refresh();
  }

  completeTask(taskId) {
    const content = `
      <div class="complete-task-form">
        <h3 style="margin-bottom: 1rem; text-align: center;">Complete Task</h3>
        <p style="color: var(--gray-600); margin-bottom: 2rem; text-align: center;">
          Upload a geo-tagged photo as proof of completion
        </p>
        
        <div class="photo-upload" style="border: 2px dashed var(--gray-300); border-radius: 8px; padding: 2rem; text-align: center; margin-bottom: 2rem; background: var(--gray-50);">
          <i class="fas fa-camera" style="font-size: 3rem; color: var(--gray-400); margin-bottom: 1rem;"></i>
          <p style="margin-bottom: 1rem;">Take a photo of the completed work</p>
          <button type="button" class="btn btn-primary" onclick="window.WorkerDashboard.capturePhoto()">
            <i class="fas fa-camera"></i>
            Capture Photo
          </button>
        </div>
        
        <div class="form-group" style="margin-bottom: 2rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Additional Notes (Optional)</label>
          <textarea class="form-control" rows="3" placeholder="Any additional information about the completed task..."></textarea>
        </div>
        
        <div style="display: flex; gap: 1rem; justify-content: flex-end;">
          <button type="button" class="btn btn-ghost" onclick="modal.hide()">Cancel</button>
          <button type="button" class="btn btn-success" onclick="window.WorkerDashboard.submitTaskCompletion('${taskId}')">
            <i class="fas fa-check"></i>
            Submit Completion
          </button>
        </div>
      </div>
    `;

    modal.show('Complete Task', content);
  }

  capturePhoto() {
    notifications.info('Photo Capture', 'Capturing photo with GPS coordinates...');
    
    // Simulate photo capture
    setTimeout(() => {
      const photoArea = document.querySelector('.photo-upload');
      if (photoArea) {
        photoArea.innerHTML = `
          <div style="color: var(--success);">
            <i class="fas fa-check-circle" style="font-size: 3rem; margin-bottom: 1rem;"></i>
            <p>Photo captured successfully!</p>
            <div style="font-size: 0.875rem; color: var(--gray-600); margin-top: 1rem;">
              GPS: 28.6139°N, 77.2090°E<br>
              Time: ${new Date().toLocaleString()}
            </div>
          </div>
        `;
      }
    }, 2000);
  }

  submitTaskCompletion(taskId) {
    notifications.success('Task Completed', `Task ${taskId} has been marked as completed and sent for admin approval`);
    modal.hide();
    this.refresh();
  }

  reportEmergency() {
    const content = `
      <div class="emergency-report" style="text-align: center;">
        <div style="color: var(--error); margin-bottom: 2rem;">
          <i class="fas fa-exclamation-triangle" style="font-size: 4rem; margin-bottom: 1rem;"></i>
          <h2>Emergency Report</h2>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 2rem;">
          <button class="btn btn-error" onclick="window.WorkerDashboard.reportEmergencyType('accident')">
            <i class="fas fa-ambulance"></i>
            Accident
          </button>
          <button class="btn btn-error" onclick="window.WorkerDashboard.reportEmergencyType('fire')">
            <i class="fas fa-fire"></i>
            Fire
          </button>
          <button class="btn btn-error" onclick="window.WorkerDashboard.reportEmergencyType('hazmat')">
            <i class="fas fa-radiation"></i>
            Hazardous Material
          </button>
          <button class="btn btn-error" onclick="window.WorkerDashboard.reportEmergencyType('other')">
            <i class="fas fa-exclamation"></i>
            Other Emergency
          </button>
        </div>
        
        <div style="text-align: center;">
          <button class="btn btn-ghost" onclick="modal.hide()">Cancel</button>
        </div>
      </div>
    `;

    modal.show('Emergency Alert', content);
  }

  reportEmergencyType(type) {
    notifications.error('Emergency Reported', `${Utils.capitalize(type)} emergency has been reported. Emergency services have been notified.`);
    modal.hide();
  }

  viewTaskDetails(taskId) {
    notifications.info('Task Details', `Viewing details for task ${taskId}`);
  }

  reportIssue(taskId) {
    notifications.warning('Issue Reported', `Issue reported for task ${taskId}. Admin will be notified.`);
  }

  bindEvents() {
    // Bind any specific events for the current section
  }

  refresh() {
    this.loadSection(this.currentSection);
  }
}

// Initialize and export
window.WorkerDashboard = new WorkerDashboard();