// =================================================================================
// Green Champion Dashboard - Main Class
// =================================================================================
// This class manages the entire user interface for the Green Champion role.
// It handles navigation, renders different sections, and contains the logic
// for user interactions like rating work and redeeming rewards.
// =================================================================================

class GreenChampionDashboard {
  constructor() {
    this.currentSection = 'dashboard';
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
      case 'my-reports':
        content.innerHTML = this.renderMyReports();
        break;
      case 'community':
        content.innerHTML = this.renderCommunity();
        break;
      case 'rewards':
        content.innerHTML = this.renderRewards();
        break;
      case 'heat-map':
        content.innerHTML = this.renderHeatMap();
        this.bindHeatMapEvents();
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

  // --- FEATURE: Main Dashboard (Overview & Gamification) ---
  // This is the landing page, showing key stats, recent activity,
  // achievements (badges), and quick actions.
  // -----------------------------------------------------------------
  renderDashboard() {
    const user = authSystem.getCurrentUser();
    const greenPoints = user.greenPoints || 250;

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Green Champion Hub</h1>
        <p class="dashboard-subtitle">Leading the way to a cleaner community</p>
      </div>

      <div class="dashboard-stats">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Green Points</span>
            <div class="stat-icon primary"><i class="fas fa-coins"></i></div>
          </div>
          <div class="stat-value">${greenPoints.toLocaleString()}</div>
          <div class="stat-change positive"><i class="fas fa-arrow-up"></i> +50 this week</div>
        </div>
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Reports Submitted</span>
            <div class="stat-icon secondary"><i class="fas fa-flag"></i></div>
          </div>
          <div class="stat-value">12</div>
          <div class="stat-change positive"><i class="fas fa-arrow-up"></i> 3 this month</div>
        </div>
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Community Rank</span>
            <div class="stat-icon warning"><i class="fas fa-trophy"></i></div>
          </div>
          <div class="stat-value">#7</div>
          <div class="stat-change positive"><i class="fas fa-arrow-up"></i> +2 positions</div>
        </div>
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-title">Areas Cleaned</span>
            <div class="stat-icon primary"><i class="fas fa-broom"></i></div>
          </div>
          <div class="stat-value">8</div>
          <div class="stat-change positive"><i class="fas fa-arrow-up"></i> 2 this week</div>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; margin-top: 2rem;">
        <div class="card">
          <div class="card-header"><h3 class="card-title">Recent Activities</h3></div>
          <div class="card-body">
            <div class="activity-timeline">
              <div class="activity-item" style="display: flex; align-items: start; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--gray-200);">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--success); display: flex; align-items: center; justify-content: center; color: white;"><i class="fas fa-check"></i></div>
                <div style="flex: 1;">
                  <div style="font-weight: 600; margin-bottom: 0.25rem;">Complaint Resolved</div>
                  <div style="font-size: 0.875rem; color: var(--gray-600); margin-bottom: 0.25rem;">Your report about overflowing bin was successfully resolved</div>
                  <div style="font-size: 0.75rem; color: var(--gray-500);">2 hours ago • +25 Green Points</div>
                </div>
              </div>
              <div class="activity-item" style="display: flex; align-items: start; gap: 1rem; padding: 1rem 0; border-bottom: 1px solid var(--gray-200);">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; color: white;"><i class="fas fa-graduation-cap"></i></div>
                <div style="flex: 1;">
                  <div style="font-weight: 600; margin-bottom: 0.25rem;">Training Completed</div>
                  <div style="font-size: 0.875rem; color: var(--gray-600); margin-bottom: 0.25rem;">Finished "Community Leadership" module</div>
                  <div style="font-size: 0.75rem; color: var(--gray-500);">1 day ago • +90 Green Points</div>
                </div>
              </div>
              <div class="activity-item" style="display: flex; align-items: start; gap: 1rem; padding: 1rem 0;">
                <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--accent); display: flex; align-items: center; justify-content: center; color: white;"><i class="fas fa-users"></i></div>
                <div style="flex: 1;">
                  <div style="font-weight: 600; margin-bottom: 0.25rem;">Community Event</div>
                  <div style="font-size: 0.875rem; color: var(--gray-600); margin-bottom: 0.25rem;">Participated in neighborhood cleanup drive</div>
                  <div style="font-size: 0.75rem; color: var(--gray-500);">3 days ago • +100 Green Points</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header"><h3 class="card-title">Achievements</h3></div>
          <div class="card-body">
            <div class="achievements-grid" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
              <div class="achievement-badge" style="text-align: center; padding: 1rem; background: var(--gray-50); border-radius: 8px;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">🏆</div>
                <div style="font-weight: 600; font-size: 0.875rem; color: var(--primary);">Top Reporter</div>
              </div>
              <div class="achievement-badge" style="text-align: center; padding: 1rem; background: var(--gray-50); border-radius: 8px;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">🌟</div>
                <div style="font-weight: 600; font-size: 0.875rem; color: var(--warning);">Community Hero</div>
              </div>
              <div class="achievement-badge" style="text-align: center; padding: 1rem; background: var(--gray-50); border-radius: 8px;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">🎯</div>
                <div style="font-weight: 600; font-size: 0.875rem; color: var(--success);">100% Accuracy</div>
              </div>
              <div class="achievement-badge" style="text-align: center; padding: 1rem; background: var(--gray-50); border-radius: 8px;">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">📚</div>
                <div style="font-weight: 600; font-size: 0.875rem; color: var(--secondary);">Learner</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style="margin-top: 2rem;">
        <div class="card">
          <div class="card-header"><h3 class="card-title">Quick Actions</h3></div>
          <div class="card-body">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
              <button class="btn btn-primary" onclick="modal.showComplaintForm()" style="padding: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;"><i class="fas fa-plus-circle" style="font-size: 1.5rem;"></i> Report Issue</button>
              <button class="btn btn-secondary" onclick="navigation.navigateTo('heat-map')" style="padding: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;"><i class="fas fa-map" style="font-size: 1.5rem;"></i> View Heat Map</button>
              <button class="btn btn-success" onclick="navigation.navigateTo('rewards')" style="padding: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;"><i class="fas fa-gift" style="font-size: 1.5rem;"></i> Redeem Points</button>
              <button class="btn btn-warning" onclick="navigation.navigateTo('training')" style="padding: 1.5rem; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;"><i class="fas fa-graduation-cap" style="font-size: 1.5rem;"></i> Training</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // --- FEATURE: Complaint Reporting & Feedback ---
  // Renders the list of reports submitted by the champion and
  // provides actions to view details or rate the work.
  // ----------------------------------------------------
  renderMyReports() {
    const reports = [
      { id: 'R001', title: 'Overflowing bin near school', status: 'resolved', points: 25, date: new Date('2024-01-15'), rating: 5 },
      { id: 'R002', title: 'Illegal dumping in park', status: 'in_progress', points: 50, date: new Date('2024-01-14'), rating: null },
      { id: 'R003', title: 'Broken waste container', status: 'verified', points: 30, date: new Date('2024-01-12'), rating: 4 }
    ];

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">My Reports</h1>
        <p class="dashboard-subtitle">Track your submitted complaints and earned points</p>
        <button class="btn btn-primary" onclick="modal.showComplaintForm()"><i class="fas fa-plus"></i> Submit New Report</button>
      </div>

      <div class="card">
        <div class="card-header"><h3 class="card-title">Report History</h3></div>
        <div class="card-body">
          <div class="table-container">
            <table class="table">
              <thead>
                <tr>
                  <th>Report ID</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Points Earned</th>
                  <th>Submitted</th>
                  <th>Rating Given</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${reports.map(report => `
                  <tr>
                    <td>${report.id}</td>
                    <td>${report.title}</td>
                    <td>${Utils.getStatusBadge(report.status)}</td>
                    <td><span style="color: var(--primary); font-weight: 600;">+${report.points} <i class="fas fa-coins"></i></span></td>
                    <td>${Utils.formatDate(report.date)}</td>
                    <td>
                      ${report.rating ? 
                        `<div style="color: var(--warning);">${'★'.repeat(report.rating)}${'☆'.repeat(5-report.rating)}</div>` : 
                        '<span style="color: var(--gray-400);">Pending</span>'
                      }
                    </td>
                    <td>
                      <button class="btn btn-ghost" onclick="window.ComplaintManager.viewComplaint('${report.id}')" title="View Details"><i class="fas fa-eye"></i></button>
                      ${report.status === 'resolved' && !report.rating ? 
                        `<button class="btn btn-ghost" onclick="window.GreenChampionDashboard.rateWork('${report.id}')" title="Rate Work"><i class="fas fa-star"></i></button>` : ''
                      }
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // --- FEATURE: Community Hub & Leaderboard ---
  // Creates a space for community events and a leaderboard
  // to foster competition and engagement among champions.
  // ------------------------------------------------
  renderCommunity() {
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Community Hub</h1>
        <p class="dashboard-subtitle">Connect with fellow Green Champions and community events</p>
      </div>

      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
        <div class="card">
          <div class="card-header"><h3 class="card-title">Upcoming Community Events</h3></div>
          <div class="card-body">
            <div class="event-list">
              <div class="event-card" style="border: 1px solid var(--gray-200); border-radius: 8px; padding: 1.5rem; margin-bottom: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                  <div style="flex: 1;">
                    <h4 style="margin-bottom: 0.5rem; color: var(--primary);">Community Cleanup Drive</h4>
                    <p style="color: var(--gray-600); margin-bottom: 0.5rem;">Join us for a neighborhood cleaning initiative</p>
                  </div>
                  <div style="text-align: right;">
                    <div style="font-weight: 600; color: var(--accent);">Jan 20, 2024</div>
                    <div style="font-size: 0.875rem; color: var(--gray-500);">9:00 AM</div>
                  </div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="color: var(--success); font-weight: 600;"><i class="fas fa-coins"></i> +100 Green Points</div>
                  <button class="btn btn-primary">Join Event</button>
                </div>
              </div>
              <div class="event-card" style="border: 1px solid var(--gray-200); border-radius: 8px; padding: 1.5rem; margin-bottom: 1rem;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
                  <div style="flex: 1;">
                    <h4 style="margin-bottom: 0.5rem; color: var(--secondary);">Waste Segregation Workshop</h4>
                    <p style="color: var(--gray-600); margin-bottom: 0.5rem;">Learn advanced segregation techniques</p>
                  </div>
                  <div style="text-align: right;">
                    <div style="font-weight: 600; color: var(--accent);">Jan 22, 2024</div>
                    <div style="font-size: 0.875rem; color: var(--gray-500);">2:00 PM</div>
                  </div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <div style="color: var(--success); font-weight: 600;"><i class="fas fa-coins"></i> +75 Green Points</div>
                  <button class="btn btn-primary">Join Event</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header"><h3 class="card-title">Top Green Champions</h3></div>
          <div class="card-body">
            <div class="leaderboard">
              ${[
                { rank: 1, name: 'Sarah Wilson', points: 1250, badge: '🏆' },
                { rank: 2, name: 'Michael Chen', points: 1180, badge: '🥈' },
                { rank: 3, name: 'Priya Patel', points: 1150, badge: '🥉' },
                { rank: 4, name: 'David Rodriguez', points: 980, badge: '🌟' },
                { rank: 5, name: 'Emma Davis', points: 850, badge: '⭐' }
              ].map(champion => `
                <div class="leaderboard-item" style="display: flex; align-items: center; gap: 1rem; padding: 0.75rem 0; border-bottom: 1px solid var(--gray-200);">
                  <div style="font-size: 1.5rem;">${champion.badge}</div>
                  <div style="flex: 1;">
                    <div style="font-weight: 600;">${champion.name}</div>
                    <div style="color: var(--primary); font-size: 0.875rem;"><i class="fas fa-coins"></i> ${champion.points.toLocaleString()} points</div>
                  </div>
                  <div style="font-weight: 600; color: var(--gray-600);">#${champion.rank}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // --- FEATURE: Incentives (Rewards Store) ---
  // Allows champions to redeem their Green Points for tangible rewards,
  // providing a strong incentive to stay active.
  // ---------------------------------------------
  renderRewards() {
    const user = authSystem.getCurrentUser();
    const availablePoints = user.greenPoints || 250;

    const rewards = [
      { id: 1, name: 'Movie Tickets', points: 200, image: '🎬', description: '2 movie tickets to any theater' },
      { id: 2, name: 'Eco-Friendly Bag', points: 150, image: '🛍️', description: 'Reusable shopping bag' },
      { id: 3, name: 'Plant Saplings', points: 100, image: '🌱', description: 'Set of 5 plant saplings' },
      { id: 4, name: 'Restaurant Voucher', points: 300, image: '🍽️', description: '₹500 voucher at partnered restaurants' },
    ];

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Rewards Store</h1>
        <p class="dashboard-subtitle">Redeem your Green Points for amazing rewards</p>
        <div style="display: flex; align-items: center; gap: 1rem; background: var(--primary); color: white; padding: 1rem; border-radius: 8px;">
          <i class="fas fa-coins" style="font-size: 2rem;"></i>
          <div>
            <div style="font-size: 1.5rem; font-weight: 700;">${availablePoints.toLocaleString()}</div>
            <div style="opacity: 0.9;">Available Green Points</div>
          </div>
        </div>
      </div>

      <div class="product-grid">
        ${rewards.map(reward => `
          <div class="product-card">
            <div class="product-image" style="font-size: 4rem;">${reward.image}</div>
            <div class="product-info">
              <h4 class="product-title">${reward.name}</h4>
              <p style="color: var(--gray-600); font-size: 0.875rem; margin-bottom: 1rem;">${reward.description}</p>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <div style="font-size: 1.25rem; font-weight: 700; color: var(--primary);"><i class="fas fa-coins"></i> ${reward.points}</div>
                ${availablePoints >= reward.points ? `<span class="badge badge-success">Available</span>` : `<span class="badge badge-error">Insufficient Points</span>`}
              </div>
              <button class="btn ${availablePoints >= reward.points ? 'btn-primary' : 'btn-ghost'}" ${availablePoints < reward.points ? 'disabled' : ''} onclick="window.GreenChampionDashboard.redeemReward(${reward.id}, ${reward.points})" style="width: 100%;"><i class="fas fa-gift"></i> Redeem</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  // --- FEATURE: Heat Maps & Analytics ---
  // Visualizes cleanliness data on a map, helping champions
  // identify problem areas and track city-wide progress.
  // ----------------------------------------
  getHeatMapData() {
    // Define waste management metrics for major cities
    const wasteData = [
      // Northern India
      {
        lat: 28.6139, lng: 77.2090,
        name: 'Delhi NCR',
        wasteGenerated: 11500, // tons per day
        wasteProcessed: 8050,
        score: 0.70,
        details: {
          segregation: 0.65,
          collection: 0.75,
          processing: 0.70
        }
      },
      {
        lat: 30.7333, lng: 76.7794,
        name: 'Chandigarh',
        wasteGenerated: 550,
        wasteProcessed: 467,
        score: 0.85,
        details: {
          segregation: 0.90,
          collection: 0.85,
          processing: 0.80
        }
      },
      // Western Region
      {
        center: { lat: 19.0760, lng: 72.8777 }, // Mumbai
        coverage: 3.0,
        intensity: 0.9,
        name: 'Western India',
        incidents: 245,
        trend: 'up',
        subRegions: [
          { lat: 18.5204, lng: 73.8567, weight: 0.85 }, // Pune
          { lat: 23.0225, lng: 72.5714, weight: 0.8 }, // Ahmedabad
          { lat: 15.4989, lng: 73.8278, weight: 0.7 } // Goa
        ]
      },
      // Eastern Region
      {
        center: { lat: 22.5726, lng: 88.3639 }, // Kolkata
        coverage: 3.2,
        intensity: 0.8,
        name: 'Eastern India',
        incidents: 198,
        trend: 'down',
        subRegions: [
          { lat: 25.5941, lng: 85.1376, weight: 0.85 }, // Patna
          { lat: 20.2961, lng: 85.8245, weight: 0.75 } // Bhubaneswar
        ]
      },
      // Southern Region
      {
        center: { lat: 12.9716, lng: 77.5946 }, // Bangalore
        coverage: 3.0,
        intensity: 0.7,
        name: 'Southern India',
        incidents: 156,
        trend: 'stable',
        subRegions: [
          { lat: 13.0827, lng: 80.2707, weight: 0.9 }, // Chennai
          { lat: 17.3850, lng: 78.4867, weight: 0.85 }, // Hyderabad
          { lat: 10.8505, lng: 76.2711, weight: 0.7 } // Kerala region
        ]
      },
      // Central Region
      {
        center: { lat: 23.2599, lng: 77.4126 }, // Bhopal
        coverage: 2.8,
        intensity: 0.65,
        name: 'Central India',
        incidents: 145,
        trend: 'up',
        subRegions: [
          { lat: 21.1458, lng: 79.0882, weight: 0.8 }, // Nagpur
          { lat: 22.7196, lng: 75.8577, weight: 0.75 }, // Indore
          { lat: 23.8388, lng: 78.7378, weight: 0.7 } // Sagar
        ]
      },

      // Tier 2 Cities
      { lat: 23.0225, lng: 72.5714, intensity: 0.55, name: 'Ahmedabad', incidents: 98, trend: 'up', radius: 0.3 },
      { lat: 18.5204, lng: 73.8567, intensity: 0.5, name: 'Pune', incidents: 87, trend: 'down', radius: 0.3 },
      { lat: 26.8467, lng: 80.9462, intensity: 0.75, name: 'Lucknow', incidents: 167, trend: 'up', radius: 0.35 },
      { lat: 21.1458, lng: 79.0882, intensity: 0.45, name: 'Nagpur', incidents: 76, trend: 'stable', radius: 0.25 },

      // Tier 3 Cities
      { lat: 20.2961, lng: 85.8245, intensity: 0.4, name: 'Bhubaneswar', incidents: 65, trend: 'up', radius: 0.2 },
      { lat: 25.5941, lng: 85.1376, intensity: 0.8, name: 'Patna', incidents: 178, trend: 'up', radius: 0.35 },
      { lat: 30.7333, lng: 76.7794, intensity: 0.3, name: 'Chandigarh', incidents: 45, trend: 'stable', radius: 0.2 },
      { lat: 26.9124, lng: 75.7873, intensity: 0.6, name: 'Jaipur', incidents: 123, trend: 'down', radius: 0.3 },
      { lat: 23.2599, lng: 77.4126, intensity: 0.35, name: 'Bhopal', incidents: 54, trend: 'stable', radius: 0.2 },
      
      // Tourist Cities
      { lat: 27.1767, lng: 78.0081, intensity: 0.7, name: 'Agra', incidents: 143, trend: 'up', radius: 0.3 },
      { lat: 32.2396, lng: 77.1887, intensity: 0.2, name: 'Manali', incidents: 32, trend: 'stable', radius: 0.15 },
      { lat: 15.4989, lng: 73.8278, intensity: 0.4, name: 'Goa', incidents: 67, trend: 'up', radius: 0.25 },
      { lat: 34.0837, lng: 74.7973, intensity: 0.25, name: 'Srinagar', incidents: 43, trend: 'down', radius: 0.2 },
      { lat: 31.1048, lng: 77.1734, intensity: 0.3, name: 'Shimla', incidents: 48, trend: 'stable', radius: 0.2 }
    ];

    // Generate additional data points around each city
    const allPoints = [];
    cityData.forEach(city => {
      // Add the city center point
      allPoints.push(city);
      
      // Generate dense grid of points for regional coverage
      const gridSize = 20; // points per region
      const latSpread = city.coverage;
      const lngSpread = city.coverage;
      
      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          const latOffset = (i / gridSize - 0.5) * latSpread;
          const lngOffset = (j / gridSize - 0.5) * lngSpread;
          const lat = city.center.lat + latOffset + (Math.random() - 0.5) * 0.5;
          const lng = city.center.lng + lngOffset + (Math.random() - 0.5) * 0.5;
          
          // Calculate distance from center as a percentage of coverage
          const distanceFromCenter = Math.sqrt(
            Math.pow((lat - city.center.lat) / (latSpread/2), 2) +
            Math.pow((lng - city.center.lng) / (lngSpread/2), 2)
          );
          
          // Intensity decreases from center, with some randomness
          const baseIntensity = Math.max(0.1, 
            city.intensity * (1 - Math.pow(distanceFromCenter, 2))
          );
          const intensity = baseIntensity * (0.85 + Math.random() * 0.3);
          
          // Add influence from subregions
          const subRegionInfluence = city.subRegions.reduce((acc, subRegion) => {
            const distToSubRegion = Math.sqrt(
              Math.pow(lat - subRegion.lat, 2) + 
              Math.pow(lng - subRegion.lng, 2)
            );
            return acc + Math.max(0, subRegion.weight * (1 - distToSubRegion/2));
          }, 0) / city.subRegions.length;
          
          const finalIntensity = Math.min(1, intensity + subRegionInfluence * 0.3);
          
          if (finalIntensity > 0.1) {
            allPoints.push({
              lat,
              lng,
              intensity: finalIntensity,
              name: city.name,
              incidents: Math.floor(city.incidents * finalIntensity / city.intensity),
              trend: city.trend
            });
          }
        }
      }

      // Add some random points along major roads/connections
      if (city.intensity > 0.6) {
        const nearestCities = cityData
          .filter(c => c !== city)
          .sort((a, b) => {
            const distA = Math.sqrt(Math.pow(a.lat - city.lat, 2) + Math.pow(a.lng - city.lng, 2));
            const distB = Math.sqrt(Math.pow(b.lat - city.lat, 2) + Math.pow(b.lng - city.lng, 2));
            return distA - distB;
          })
          .slice(0, 2);

        nearestCities.forEach(nearCity => {
          const points = 5; // points along the connection
          for (let i = 1; i < points; i++) {
            const ratio = i / points;
            const lat = city.lat + (nearCity.lat - city.lat) * ratio + (Math.random() - 0.5) * 0.1;
            const lng = city.lng + (nearCity.lng - city.lng) * ratio + (Math.random() - 0.5) * 0.1;
            const intensity = Math.max(0.1, (city.intensity + nearCity.intensity) * 0.5 * (0.6 + Math.random() * 0.4));
            
            allPoints.push({
              lat,
              lng,
              intensity,
              name: `${city.name}-${nearCity.name} Route`,
              incidents: Math.floor((city.incidents + nearCity.incidents) * 0.3),
              trend: 'stable'
            });
          }
        });
      }
    });

    return allPoints;
  }

  initializeMap() {
    // Initialize the map centered on India
    const map = L.map('cleanliness-map', {
      center: [23.5937, 78.9629],
      zoom: 5,
      minZoom: 4, // Prevent zooming out too far
      maxZoom: 7, // Limit maximum zoom to maintain regional view
      maxBounds: [ // Restrict panning to India and nearby regions
        [6.7173, 68.1867], // Southwest coordinates
        [35.6745, 97.3959]  // Northeast coordinates
      ]
    });
    
    // Add the base map layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add state boundaries layer (GeoJSON)
    fetch('https://raw.githubusercontent.com/HindustanTimesLabs/shapefiles/master/india_states/india_states.geojson')
      .then(response => response.json())
      .then(data => {
        L.geoJSON(data, {
          style: {
            color: '#666',
            weight: 1,
            fillOpacity: 0.1
          }
        }).addTo(map);
      })
      .catch(() => console.log('Could not load state boundaries'));

    // Convert data for the heat layer
    const heatData = this.getHeatMapData().map(point => [
      point.lat,
      point.lng,
      point.intensity
    ]);

    // Add the heat layer
    const heat = L.heatLayer(heatData, {
      radius: 40, // Larger radius for broader coverage
      blur: 30, // More blur for smoother transitions
      maxZoom: 7, // Lower max zoom to maintain regional view
      minOpacity: 0.35, // Slightly lower minimum opacity for better blending
      max: 1.0, // Maximum point intensity
      gradient: {
        0.2: '#ffeda0', // Light yellow for low intensity
        0.4: '#feb24c', // Orange for medium-low
        0.6: '#fc4e2a', // Orange-red for medium-high
        0.8: '#bd0026', // Dark red for high
        1.0: '#800026'  // Very dark red for highest intensity
      }
    }).addTo(map);

    // Custom icon for markers
    const getCustomIcon = (intensity) => {
      const color = intensity > 0.7 ? '#EF4444' : 
                    intensity > 0.4 ? '#F59E0B' : '#10B981';
      return L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div style="
            background-color: ${color};
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: 2px solid white;
            box-shadow: 0 0 4px rgba(0,0,0,0.3);
          "></div>
        `,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });
    };

    // Add markers for all cities
    this.getHeatMapData().forEach(point => {
      const trendIcon = point.trend === 'up' ? '↑' : 
                       point.trend === 'down' ? '↓' : '→';
      const trendColor = point.trend === 'up' ? '#EF4444' : 
                        point.trend === 'down' ? '#10B981' : '#666';

      const popupContent = `
        <div style="min-width: 200px;">
          <h3 style="margin: 0 0 8px 0; color: #1a1a1a;">${point.name}</h3>
          <div style="margin-bottom: 8px;">
            <span style="color: ${trendColor}; font-weight: bold;">${trendIcon}</span>
            <span style="color: #666;">${point.incidents} incidents reported</span>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
            <div style="
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background-color: ${point.intensity > 0.7 ? '#EF4444' : point.intensity > 0.4 ? '#F59E0B' : '#10B981'};
            "></div>
            <span>${
              point.intensity > 0.7 ? 'High Priority' :
              point.intensity > 0.4 ? 'Medium Priority' :
              'Low Priority'
            }</span>
          </div>
          <button 
            onclick="window.greenChampionDashboard.showCityDetails('${point.name}')"
            style="
              background: #2563eb;
              color: white;
              border: none;
              padding: 6px 12px;
              border-radius: 4px;
              cursor: pointer;
              width: 100%;
            "
          >
            View Details
          </button>
        </div>
      `;

      L.marker([point.lat, point.lng], { icon: getCustomIcon(point.intensity) })
        .bindPopup(popupContent)
        .addTo(map);
    });
  }

  renderHeatMap() {
    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">India Waste Management Heat Map</h1>
        <p class="dashboard-subtitle">Real-time visualization of waste management efficiency across India</p>
      </div>

      <div class="filters-bar" style="margin-bottom: 1rem; padding: 1rem; background: white; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
          <div style="display: flex; gap: 1rem;">
            <select class="form-control" id="timeRange">
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">Last Quarter</option>
            </select>
            <select class="form-control" id="wasteType">
              <option value="all">All Waste Types</option>
              <option value="organic">Organic Waste</option>
              <option value="plastic">Plastic Waste</option>
              <option value="electronic">E-Waste</option>
              <option value="construction">Construction Waste</option>
              <option value="hazardous">Hazardous Waste</option>
            </select>
            <select class="form-control" id="region">
              <option value="all">All India</option>
              <option value="north">Northern India</option>
              <option value="south">Southern India</option>
              <option value="east">Eastern India</option>
              <option value="west">Western India</option>
              <option value="central">Central India</option>
            </select>
          </div>
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="legend-dot" style="background: #ff0000;"></span>
              <span>Poor Management (<40%)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="legend-dot" style="background: #ff7f00;"></span>
              <span>Below Average (40-60%)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="legend-dot" style="background: #ffff00;"></span>
              <span>Average (60-80%)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="legend-dot" style="background: #89e017;"></span>
              <span>Good (80-90%)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="legend-dot" style="background: #00b04f;"></span>
              <span>Excellent (>90%)</span>
            </div>
          </div>
        </div>
      </div>

      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-body">
          <!-- Map Container -->
          <div id="cleanliness-map" style="height: 500px; width: 100%; border-radius: 8px;"></div>
        </div>
      </div>

      <!-- Statistics Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">High Priority Areas</h4>
            <div class="stat-value" style="color: #EF4444;">12</div>
            <div class="stat-desc">3 require immediate action</div>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Issues Reported Today</h4>
            <div class="stat-value">47</div>
            <div class="stat-desc positive">23% less than yesterday</div>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Average Response Time</h4>
            <div class="stat-value">4.2h</div>
            <div class="stat-desc positive">Improved by 0.8h</div>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Clean Areas</h4>
            <div class="stat-value" style="color: #10B981;">25</div>
            <div class="stat-desc positive">+3 from last week</div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Initializes the heat map when the section is loaded
   */
  bindHeatMapEvents() {
    const mapContainer = document.getElementById('cleanliness-map');
    if (!mapContainer) return;

    // Initialize map centered on India
    this.map = L.map('cleanliness-map', {
      center: [20.5937, 78.9629], // Center of India
      zoom: 5,
      minZoom: 4,
      maxZoom: 8,
      maxBounds: [
        [6.2325, 68.1867],  // SW bounds
        [35.6745, 97.4025]  // NE bounds
      ]
    });

    // Add base map layer with state boundaries
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Add India state boundaries
    fetch('https://raw.githubusercontent.com/HindustanTimesLabs/shapefiles/master/india_states/india_states.geojson')
      .then(response => response.json())
      .then(data => {
        L.geoJSON(data, {
          style: {
            color: '#666',
            weight: 1,
            fillOpacity: 0.1
          }
        }).addTo(this.map);
      })
      .catch(console.error);

    // Initialize heat layer with waste management data
    const points = this.getHeatMapData();
    const heatData = points.map(point => [
      point.lat,
      point.lng,
      point.score // Using waste management score for intensity
    ]);

    this.heatLayer = L.heatLayer(heatData, {
      radius: 35,
      blur: 25,
      maxZoom: 7,
      minOpacity: 0.35,
      gradient: {
        0.2: '#ff0000', // Red for poor management
        0.4: '#ff7f00', // Orange for below average
        0.6: '#ffff00', // Yellow for average
        0.8: '#89e017', // Light green for good
        1.0: '#00b04f'  // Dark green for excellent
      }
    }).addTo(this.map);

    // Add markers for cities with waste management details
    points.forEach(city => {
      const processedPercent = ((city.wasteProcessed / city.wasteGenerated) * 100).toFixed(1);
      const popupContent = `
        <div class="city-popup" style="min-width: 250px; padding: 10px;">
          <h3 style="margin: 0 0 10px 0;">${city.name}</h3>
          <div style="margin-bottom: 10px;">
            <strong>Waste Management Score:</strong> ${(city.score * 100).toFixed(1)}%<br>
            <strong>Waste Generated:</strong> ${city.wasteGenerated.toLocaleString()} tons/day<br>
            <strong>Waste Processed:</strong> ${city.wasteProcessed.toLocaleString()} tons/day (${processedPercent}%)<br>
          </div>
          <div style="margin-bottom: 10px;">
            <div style="margin-bottom: 5px;"><strong>Performance Metrics:</strong></div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
              <span>Segregation:</span>
              <span>${(city.details.segregation * 100).toFixed(1)}%</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 3px;">
              <span>Collection:</span>
              <span>${(city.details.collection * 100).toFixed(1)}%</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Processing:</span>
              <span>${(city.details.processing * 100).toFixed(1)}%</span>
            </div>
          </div>
          <button 
            onclick="window.dashboardInstance.showCityDetails('${city.name}')"
            class="btn btn-primary btn-sm"
            style="width: 100%;"
          >
            View Full Report
          </button>
        </div>
      `;

      L.marker([city.lat, city.lng])
        .bindPopup(popupContent)
        .addTo(this.map);
    });

    // Add filter change events
    document.getElementById('timeRange')?.addEventListener('change', () => this.updateHeatMap());
    document.getElementById('wasteType')?.addEventListener('change', () => this.updateHeatMap());
    document.getElementById('region')?.addEventListener('change', () => this.updateHeatMap());

    // Auto-refresh every 5 minutes
    this.refreshInterval = setInterval(() => this.updateHeatMap(), 300000);
  }

  /**
   * Updates the heat map based on selected filters
   */
  updateHeatMap() {
    if (!this.map || !this.heatLayer) return;

    // Get filter values
    const timeRange = document.getElementById('timeRange')?.value || 'month';
    const wasteType = document.getElementById('wasteType')?.value || 'all';
    const region = document.getElementById('region')?.value || 'all';

    // Get updated points based on filters
    const points = this.getHeatMapData()
      .filter(point => {
        if (region === 'all') return true;
        
        // Filter by region
        const regionBounds = {
          north: { minLat: 28, maxLat: 35, minLng: 72, maxLng: 88 },
          south: { minLat: 8, maxLat: 18, minLng: 74, maxLng: 84 },
          east: { minLat: 18, maxLat: 26, minLng: 85, maxLng: 97 },
          west: { minLat: 15, maxLat: 24, minLng: 68, maxLng: 76 },
          central: { minLat: 19, maxLat: 26, minLng: 76, maxLng: 85 }
        };

        const bounds = regionBounds[region];
        if (!bounds) return true;

        return point.lat >= bounds.minLat && 
               point.lat <= bounds.maxLat && 
               point.lng >= bounds.minLng && 
               point.lng <= bounds.maxLng;
      });

    // Update heat layer with new data
    const heatData = points.map(point => [
      point.lat,
      point.lng,
      point.score // Use the waste management score for intensity
    ]);

    this.heatLayer.setLatLngs(heatData);

    // Update map view for selected region
    if (region !== 'all') {
      const bounds = this.map.getBounds();
      const center = bounds.getCenter();
      this.map.setView(center, 6);
    } else {
      this.map.setView([20.5937, 78.9629], 5);
    }

    // Show metrics summary
    const summary = this.calculateSummaryMetrics(points);
    notifications.info('Waste Management Summary', 
      `Average Score: ${summary.averageScore}%\n` +
      `Total Waste Generated: ${summary.totalWaste} tons/day\n` +
      `Processing Rate: ${summary.processedRate}%`
    );
  }

  calculateSummaryMetrics(points) {
    const sum = points.reduce((acc, point) => ({
      score: acc.score + point.score,
      waste: acc.waste + point.wasteGenerated,
      processed: acc.processed + point.wasteProcessed
    }), { score: 0, waste: 0, processed: 0 });

    return {
      averageScore: ((sum.score / points.length) * 100).toFixed(1),
      totalWaste: Math.round(sum.waste).toLocaleString(),
      processedRate: ((sum.processed / sum.waste) * 100).toFixed(1)
    };
  }

  showCityDetails(cityName) {
    const cityData = this.getHeatMapData().find(city => city.name === cityName);
    if (!cityData) return;

    const priorityLevel = cityData.intensity > 0.7 ? 'High' : 
                         cityData.intensity > 0.4 ? 'Medium' : 'Low';
    const priorityColor = cityData.intensity > 0.7 ? '#EF4444' : 
                         cityData.intensity > 0.4 ? '#F59E0B' : '#10B981';

    modal.show(`${cityName} Details`, `
      <div class="city-details">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
          <div class="stat-card">
            <div class="stat-title">Priority Level</div>
            <div class="stat-value" style="color: ${priorityColor};">${priorityLevel}</div>
            <div class="stat-desc">Based on current data</div>
          </div>
          <div class="stat-card">
            <div class="stat-title">Incidents Reported</div>
            <div class="stat-value">${cityData.incidents}</div>
            <div class="stat-desc ${cityData.trend === 'up' ? 'negative' : cityData.trend === 'down' ? 'positive' : ''}">
              ${cityData.trend === 'up' ? '↑ Increasing' : 
                cityData.trend === 'down' ? '↓ Decreasing' : 
                '→ Stable'}
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-title">Active Champions</div>
            <div class="stat-value">${Math.floor(Math.random() * 50) + 20}</div>
            <div class="stat-desc">In this region</div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Recent Issues</h3>
          </div>
          <div class="card-body">
            <div class="timeline">
              ${[
                { type: 'Garbage Accumulation', area: 'Market Area', time: '2 hours ago', status: 'pending' },
                { type: 'Drainage Blockage', area: 'Residential Zone', time: '5 hours ago', status: 'in-progress' },
                { type: 'Street Cleaning', area: 'Main Road', time: '1 day ago', status: 'completed' }
              ].map(issue => `
                <div class="timeline-item">
                  <div class="timeline-marker ${issue.status}"></div>
                  <div class="timeline-content">
                    <h4>${issue.type}</h4>
                    <p>${issue.area}</p>
                    <span class="timeline-time">${issue.time}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
          <button class="btn btn-primary" onclick="window.greenChampionDashboard.assignTask('${cityName}')">
            <i class="fas fa-tasks"></i>
            Assign Task
          </button>
          <button class="btn btn-secondary" onclick="window.greenChampionDashboard.generateReport('${cityName}')">
            <i class="fas fa-file-alt"></i>
            Generate Report
          </button>
        </div>
      </div>
    `);
  }

  assignTask(cityName) {
    modal.hide();
    notifications.info('Task Assignment', `Opening task assignment for ${cityName}`);
    // In a real application, this would open the task assignment interface
  }

  generateReport(cityName) {
    modal.hide();
    notifications.info('Report Generation', `Generating detailed report for ${cityName}`);
    // In a real application, this would generate and download a detailed report
  }

  // --- FEATURE: Training for Green Champions ---
  // Renders the training module section where champions can
  // learn new skills and earn points.
  // ---------------------------------------------
  getTrainingData() {
    const user = authSystem.getCurrentUser();
    return {
      units: [
        {
          title: "Community Leadership",
          lessons: [
            {
              title: "Understanding Your Role",
              status: "completed",
              icon: "fas fa-star",
              questions: [
                {
                  type: "multiple-choice",
                  text: "What is the primary role of a Green Champion?",
                  options: [
                    { text: "To clean the streets" },
                    { text: "To inspire and lead community environmental initiatives" },
                    { text: "To fine people who litter" },
                    { text: "To collect waste" }
                  ],
                  correctAnswer: 1
                }
              ]
            },
            {
              title: "Community Engagement",
              status: "available",
              icon: "fas fa-users",
              questions: [
                {
                  type: "arrange",
                  text: "Arrange the steps for organizing a community clean-up event:",
                  steps: [
                    "Identify problem areas",
                    "Recruit volunteers",
                    "Gather supplies",
                    "Execute the clean-up",
                    "Share results"
                  ]
                }
              ]
            },
            {
              title: "Project Management",
              status: "locked",
              icon: "fas fa-tasks"
            }
          ]
        },
        {
          title: "Environmental Education",
          lessons: [
            {
              title: "Waste Types",
              status: "completed",
              icon: "fas fa-recycle",
              questions: [
                {
                  type: "multiple-choice",
                  text: "Which item should be recycled?",
                  options: [
                    { text: "Broken glass", image: "/images/broken-glass.png" },
                    { text: "Clean plastic bottles", image: "/images/plastic-bottle.png" },
                    { text: "Food waste", image: "/images/food-waste.png" },
                    { text: "Used tissues", image: "/images/tissue.png" }
                  ],
                  correctAnswer: 1
                }
              ]
            },
            {
              title: "Composting",
              status: "available",
              icon: "fas fa-seedling"
            },
            {
              title: "Zero Waste",
              status: "locked",
              icon: "fas fa-ban"
            }
          ]
        },
        {
          title: "Advocacy Skills",
          lessons: [
            {
              title: "Public Speaking",
              status: "available",
              icon: "fas fa-microphone"
            },
            {
              title: "Social Media",
              status: "locked",
              icon: "fas fa-hashtag"
            },
            {
              title: "Event Planning",
              status: "locked",
              icon: "fas fa-calendar"
            }
          ]
        }
      ]
    };
  }

  getLessonBackground(status) {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'available':
        return '#2196F3';
      case 'locked':
        return '#9E9E9E';
      default:
        return '#2196F3';
    }
  }

  renderTraining() {
    const user = authSystem.getCurrentUser();
    const trainingData = this.getTrainingData();
    const dailyGoal = user.dailyGoal || 50;
    const dailyProgress = user.dailyProgress || 30;
    const streak = user.streak || 7;
    const lives = user.lives || 3;
    const performanceScore = user.performanceScore || 92;

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Green Champion Academy</h1>
        <p class="dashboard-subtitle">Master environmental leadership through interactive learning</p>
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
              <span>${performanceScore}% mastery</span>
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
                  onclick="${lesson.status !== 'locked' ? `window.GreenChampionDashboard.startLesson(${unitIndex}, ${lessonIndex})` : ''}"
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
          <h3 class="card-title">Impact Stats</h3>
        </div>
        <div class="card-body">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem;">
            <div class="stat-card">
              <div class="stat-title">Community Impact</div>
              <div class="stat-value">147</div>
              <div class="stat-desc positive">People educated</div>
            </div>
            <div class="stat-card">
              <div class="stat-title">Projects Led</div>
              <div class="stat-value">8</div>
              <div class="stat-desc positive">+2 this month</div>
            </div>
            <div class="stat-card">
              <div class="stat-title">Recognition</div>
              <div class="stat-value">Gold</div>
              <div class="stat-desc">Champion Status</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static async startLesson(unitIndex, lessonIndex) {
    const user = authSystem.getCurrentUser();
    const trainingData = window.greenChampionDashboard.getTrainingData();
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
          ${GreenChampionDashboard.renderQuestion(exercise.questions[exercise.currentQuestion])}
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
    checkButton.addEventListener('click', () => GreenChampionDashboard.checkAnswer(exercise));
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
        document.querySelector('.exercise-content').innerHTML = GreenChampionDashboard.renderQuestion(exercise.questions[exercise.currentQuestion]);
        document.querySelector('.progress').style.width = `${(exercise.currentQuestion / exercise.questions.length) * 100}%`;
      } else {
        // Lesson completed
        modal.hide();
        notifications.success('Lesson Completed!', `You earned ${exercise.score} points!`);
        window.greenChampionDashboard.updateLessonStatus();
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

  // --- FEATURE: User Profile & Verified Badges ---
  // Displays the champion's profile information, stats,
  // and provides forms to update their settings.
  // -------------------------------------------------
  renderProfile() {
    const user = authSystem.getCurrentUser();

    return `
      <div class="dashboard-header">
        <h1 class="dashboard-title">Profile Settings</h1>
        <p class="dashboard-subtitle">Manage your Green Champion profile</p>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 2rem;">
        <div class="card">
          <div class="card-header"><h3 class="card-title">Profile Information</h3></div>
          <div class="card-body">
            <div style="text-align: center; margin-bottom: 2rem;">
              <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 2rem; font-weight: 700;">
                ${user.name.charAt(0).toUpperCase()}
              </div>
              <h3 style="margin-bottom: 0.5rem;">
                ${user.name}
                ${user.isVerified ? '<i class="fas fa-check-circle" style="color: var(--primary); margin-left: 0.5rem;" title="Verified Champion"></i>' : ''}
              </h3>
              <p style="color: var(--gray-600);">Green Champion</p>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3 class="card-title">Account Settings</h3></div>
          <div class="card-body">
            <form class="profile-form">
              <div class="form-group" style="margin-bottom: 1rem;"><label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Full Name</label><input type="text" class="form-control" value="${user.name}"></div>
              <div class="form-group" style="margin-bottom: 1rem;"><label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Email Address</label><input type="email" class="form-control" value="${user.email}"></div>
              <button type="submit" class="btn btn-primary"><i class="fas fa-save"></i> Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    `;
  }
  
  // =================================================================================
  // Helper Methods for Specific Champion Actions
  // =================================================================================

  /**
   * Displays a modal for rating the resolution of a complaint.
   * @param {string} reportId The ID of the report to be rated.
   */
  rateWork(reportId) {
    const content = `
      <div style="text-align: center; margin-bottom: 2rem;">
        <h3 style="margin-bottom: 1rem;">Rate the Work Quality</h3>
        <p style="color: var(--gray-600);">How satisfied are you with the resolution of your report?</p>
      </div>
      <div class="rating-section" style="text-align: center; margin: 2rem 0;">
        <div class="star-rating" style="font-size: 2rem; color: var(--gray-300);">
          ${[1,2,3,4,5].map(star => 
            `<span class="star" data-rating="${star}" style="cursor: pointer; transition: color 0.2s; margin: 0 0.25rem;" 
              onmouseover="window.GreenChampionDashboard.hoverStar(${star})" 
              onclick="window.GreenChampionDashboard.selectRating(${star})">★</span>`
          ).join('')}
        </div>
        <div id="ratingText" style="margin-top: 1rem; color: var(--gray-600);">Select a rating</div>
      </div>
      <div class="form-group" style="margin: 2rem 0;">
        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Additional Comments (Optional)</label>
        <textarea class="form-control" rows="4" placeholder="Share your feedback..."></textarea>
      </div>
      <div style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button class="btn btn-ghost" onclick="modal.hide()">Cancel</button>
        <button class="btn btn-primary" onclick="window.GreenChampionDashboard.submitRating('${reportId}')"><i class="fas fa-star"></i> Submit Rating</button>
      </div>
    `;
    modal.show('Rate Work Quality', content);
    this.currentRating = 0;
  }

  hoverStar(rating) {
    const stars = document.querySelectorAll('.star');
    const ratingText = document.getElementById('ratingText');
    stars.forEach((star, index) => {
      star.style.color = index < rating ? 'var(--warning)' : 'var(--gray-300)';
    });
    const texts = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
    ratingText.textContent = texts[rating] || 'Select a rating';
  }

  selectRating(rating) {
    this.currentRating = rating;
    this.hoverStar(rating);
  }

  submitRating(reportId) {
    if (this.currentRating === 0) {
      notifications.warning('Rating Required', 'Please select a star rating');
      return;
    }
    notifications.success('Rating Submitted', `Thank you! You earned 10 bonus Green Points.`);
    const currentUser = authSystem.getCurrentUser();
    if (currentUser) {
      currentUser.greenPoints = (currentUser.greenPoints || 0) + 10;
      authSystem.updateUserProfile(currentUser);
    }
    modal.hide();
    this.refresh();
  }

  /**
   * Handles the logic for redeeming a reward from the store.
   * @param {number} rewardId The ID of the reward.
   * @param {number} pointsCost The cost of the reward in Green Points.
   */
  redeemReward(rewardId, pointsCost) {
    const user = authSystem.getCurrentUser();
    const currentPoints = user.greenPoints || 0;
    if (currentPoints < pointsCost) {
      notifications.error('Insufficient Points', 'You do not have enough points for this reward.');
      return;
    }
    user.greenPoints = currentPoints - pointsCost;
    authSystem.updateUserProfile(user);
    notifications.success('Reward Redeemed!', `Your reward is on its way. ${pointsCost} points deducted.`);
    this.refresh();
  }

  /**
   * Binds any necessary event listeners for the current view.
   * (Placeholder for more complex interactions)
   */
  bindEvents() {
    // Add any event listeners specific to the green champion dashboard
  }

  /**
   * Refreshes the current section to reflect any data changes.
   */
  refresh() {
    this.loadSection(this.currentSection);
  }
}

// Initialize and export the dashboard instance for global access
window.GreenChampionDashboard = new GreenChampionDashboard();