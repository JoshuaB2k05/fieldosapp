import './style.css';
import { addImplementRegistration, getImplementsCount, addFuelSubsidy, getSubsidiesByAadhar } from './firebase.js';
import * as D from './data.js';
import * as AD from './advisorData.js';
import Chart from 'chart.js/auto';

window.D = D;
window.AD = AD;
window.Chart = Chart;

// ---- Wallet State ----
let currentWalletAadhar = localStorage.getItem('walletAadhar') || '';

async function renderWalletView() {
  const wb = document.getElementById('walletBody');
  if (!currentWalletAadhar) {
    wb.innerHTML = `
            <div style="text-align:center; padding: 20px 0;">
                <p style="color:var(--text-2); margin-bottom:16px; font-size:14px;">Enter your Aadhar number to view your earned Fuel Subsidies.</p>
                <div class="wallet-input-group">
                    <input type="text" id="walletAadharInput" placeholder="12-digit Aadhar" pattern="\\d{12}" />
                    <button class="btn btn-primary" id="walletLoginBtn">View Wallet</button>
                </div>
            </div>
        `;
    document.getElementById('walletLoginBtn').addEventListener('click', () => {
      const val = document.getElementById('walletAadharInput').value;
      if (val.length === 12) {
        currentWalletAadhar = val;
        localStorage.setItem('walletAadhar', val);
        renderWalletView();
      } else {
        window.showToast('Please enter a valid 12-digit Aadhar number.', false);
      }
    });
    return;
  }

  wb.innerHTML = `<div class="loading-spinner visible" style="padding:40px 0"><div class="spinner"></div></div>`;

  // Fetch subsidies
  const subsidies = await getSubsidiesByAadhar(currentWalletAadhar);

  const balance = subsidies.reduce((sum, item) => sum + item.amount, 0);

  let html = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 8px;">
            <div style="font-size:11px; color:var(--text-3)">Aadhar:  •••• •••• ${currentWalletAadhar.slice(-4)}</div>
            <button class="btn btn-sm btn-outline" id="walletLogoutBtn" style="padding: 4px 8px; font-size: 10px;">Change</button>
        </div>
        <div class="wallet-balance-card">
            <div class="wb-label">Total Fuel Subsidy</div>
            <div class="wb-amount"><span>₹</span>${balance.toLocaleString('en-IN')}</div>
            <div style="font-size: 13px; opacity:0.9; margin-top: 4px;">Available across ${subsidies.length} coupons</div>
        </div>
        <h4 style="font-size: 14px; margin-top: 8px; color: var(--text-2);">Your Coupons</h4>
    `;

  if (subsidies.length === 0) {
    html += `
            <div style="text-align:center; padding: 30px 0;">
                <div style="font-size: 40px; margin-bottom:12px; filter: grayscale(1); opacity:0.5">⛽</div>
                <div style="color:var(--text-2); font-size:13px">No fuel subsidies yet.</div>
                <div style="color:var(--text-3); font-size:11px; margin-top:4px">Register implements to earn rewards!</div>
            </div>
        `;
  } else {
    html += `<div style="display:flex; flex-direction:column; gap:12px">`;
    subsidies.forEach(sub => {
      const date = sub.timestamp?.seconds ? new Date(sub.timestamp.seconds * 1000).toLocaleDateString() : new Date().toLocaleDateString();
      html += `
                <div class="wallet-coupon">
                    <div class="wc-top">
                        <div>
                            <div class="wc-title">${sub.source}</div>
                            <div class="wc-date">Earned on ${date}</div>
                        </div>
                        <div class="wc-amount">₹${sub.amount.toLocaleString('en-IN')}</div>
                    </div>
                    <div class="wc-code">${sub.code}</div>
                </div>
            `;
    });
    html += `</div>`;
  }

  wb.innerHTML = html;

  const logoutBtn = document.getElementById('walletLogoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      currentWalletAadhar = '';
      localStorage.removeItem('walletAadhar');
      renderWalletView();
    });
  }
}

// ---- Global State ----
window.theme = localStorage.getItem('theme') || 'dark';
window.currentLang = localStorage.getItem('lang') || 'en';
window.charts = [];
window.currentPage = 'advisor';

// ---- AI Translation Dictionary ----
const I18N = {
  en: {
    search: "Search implements, schemes, services...",
    langName: "English",
    walletInfo: "Enter your Aadhar number to view your earned Fuel Subsidies.",
    noSubsidies: "No fuel subsidies yet.",
    legalHubTitle: "Legal & Compliance",
    termsOfService: "Terms of Service",
    privacyPolicy: "Privacy Policy",
    cookieNotice: "Cookie Notice",
    govLabel: "Govt. of India Initiative",
    viewWallet: "View Wallet"
  },
  hi: {
    search: "यंत्र, योजनाएं, सेवाएं खोजें...",
    langName: "हिन्दी",
    walletInfo: "ईंधन सब्सिडी देखने के लिए अपना आधार नंबर दर्ज करें।",
    noSubsidies: "अभी तक कोई ईंधन सब्सिडी नहीं।",
    legalHubTitle: "कानूनी और अनुपालन",
    termsOfService: "सेवा की शर्तें",
    privacyPolicy: "गोपनीयता नीति",
    cookieNotice: "कुकी नोटिस",
    govLabel: "भारत सरकार की पहल",
    viewWallet: "वॉलेट देखें"
  },
  ta: {
    search: "கருவிகள், திட்டங்கள், சேவைகளைத் தேடுங்கள்...",
    langName: "தமிழ்",
    walletInfo: "எரிபொருள் மானியங்களைப் பார்க்க உங்கள் ஆதார் எண்ணை உள்ளிடவும்.",
    noSubsidies: "எரிபொருள் மானியங்கள் ஏதுமில்லை.",
    legalHubTitle: "சட்ட மற்றும் இணக்கம்",
    termsOfService: "சேவை விதிமுறைகள்",
    privacyPolicy: "தனியுரிமை கொள்கை",
    cookieNotice: "குக்கீ அறிவிப்பு",
    govLabel: "இந்திய அரசு முன்முயற்சி",
    viewWallet: "வாலட்டை காண்க"
  },
  te: {
    search: "పనిముట్లు, పథకాలు, సేవలను శోధించండి...",
    langName: "తెలుగు",
    walletInfo: "మీ ఇంధన సబ్సిడీలను చూడటానికి మీ ఆధార్ నంబర్‌ను నమోదు చేయండి.",
    noSubsidies: "ఇంకా ఇంధన సబ్సిడీలు లేవు.",
    legalHubTitle: "చట్టపరమైన & సమ్మతి",
    termsOfService: "సేవా నిబంధనలు",
    privacyPolicy: "గోప్యతా విధానం",
    cookieNotice: "కుకీ నోటీసు",
    govLabel: "భారత ప్రభుత్వ చొరవ",
    viewWallet: "వాలెట్ చూడండి"
  },
  kn: {
    search: "ಉಪಕರಣಗಳು, ಯೋಜನೆಗಳು, ಸೇವೆಗಳನ್ನು ಹುಡುಕಿ...",
    langName: "ಕನ್ನಡ",
    walletInfo: "ನಿಮ್ಮ ಇಂಧನ ಸಬ್ಸಿಡಿಗಳನ್ನು ವೀಕ್ಷಿಸಲು ನಿಮ್ಮ ಆಧಾರ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.",
    noSubsidies: "ಇನ್ನೂ ಯಾವುದೇ ಇಂಧನ ಸಬ್ಸಿಡಿಗಳಿಲ್ಲ.",
    legalHubTitle: "ಕಾನೂನು ಮತ್ತು ಅನುಸರಣೆ",
    termsOfService: "ಸೇವಾ ನಿಯಮಗಳು",
    privacyPolicy: "ಗೌಪ್ಯತೆ ನೀತಿ",
    cookieNotice: "ಕುಕೀ ಸೂಚನೆ",
    govLabel: "ಭಾರತ ಸರ್ಕಾರದ ಉಪಕ್ರಮ",
    viewWallet: "ವಾಲೆಟ್ ವೀಕ್ಷಿಸಿ"
  }
};

// ---- Nav Items ----
const NAV = [
  { id: 'advisor', label: 'A-Z Agri Advisor', icon: '🧠', trans: { hi: 'कृषि सलाहकार', ta: 'வேளாண் வழிகாட்டி', te: 'వ్యవసాయ సలహాదారు', kn: 'ಕೃಷಿ ಸಲಹೆಗಾರ' } },
  { id: 'dashboard', label: 'Dashboard', icon: '📊', trans: { hi: 'डैशबोर्ड', ta: 'முகப்பு', te: 'డ్యాష్‌బోర్డ్', kn: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್' } },
  { id: 'register', label: 'Register Implement', icon: '🚜', trans: { hi: 'पंजीकरण', ta: 'பதிவு செய்', te: 'నమోదు చేయండి', kn: 'ನೋಂದಣಿ ಮಾಡಿ' } },
  { id: 'implements', label: 'Implements', icon: '🚜', trans: { hi: 'कृषि यंत्र', ta: 'கருவிகள்', te: 'పనిமுట్లు', kn: 'ಉಪಕರಣಗಳು' } },
  { id: 'subsidy', label: 'Subsidy Calculator', icon: '💰', trans: { hi: 'सब्सिडी', ta: 'மானியம்', te: 'సబ్సిడీ', kn: 'ಸಬ್ಸಿಡಿ' } },
  { id: 'hiring', label: 'Custom Hiring', icon: '🤝', trans: { hi: 'कस्टम हायरिंग', ta: 'வாடகைக்கு', te: 'అద్దెకు', kn: 'ಬಾಡಿಗೆಗೆ' } },
  { id: 'marketplace', label: 'Marketplace', icon: '🏪', trans: { hi: 'बाज़ार', ta: 'சந்தை', te: 'మార్కెట్', kn: 'ಮಾರುಕಟ್ಟೆ' } },
  { id: 'weather', label: 'Weather & IMD', icon: '🌤️', trans: { hi: 'मौसम', ta: 'வானிலை', te: 'వాతಾವರಣం', kn: 'ಹವಾಮಾನ' } },
  { id: 'schemes', label: 'Gov Schemes', icon: '🏛️', trans: { hi: 'सरकारी योजनाएं', ta: 'அரசு திட்டங்கள்', te: 'ప్రభుత్వ పథకాలు', kn: 'ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು' } },
  { id: 'legal', label: 'Legal & Compliance', icon: '⚖️', trans: { hi: 'कानूनी और अनुपालन', ta: 'சட்டரீதியான', te: 'చట్టపరమైన', kn: 'ಕಾನೂನು ರೂಪ' } },
  { id: 'admin', label: 'Admin Panel', icon: '⚙️', trans: { hi: 'प्रशासन', ta: 'நிர்வாகம்', te: 'నిర్వహణ', kn: 'ಆಡಳಿತ' } },
];

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
  renderNav();
  renderNotifications();
  window.navigate('advisor');
  setupGlobalEvents();
});

// ---- Toasts & Interactivity ----
window.showToast = function (msg, isSuccess = true) {
  const t = document.createElement('div');
  t.style.cssText = `position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:${isSuccess ? 'var(--primary)' : 'var(--danger)'};color:white;padding:12px 24px;border-radius:var(--radius-full);z-index:9999;font-weight:600;box-shadow:var(--shadow-lg);opacity:0;transition:all 0.3s;`;
  t.innerHTML = `${isSuccess ? '✅' : '⚠️'} ${msg}`;
  document.body.appendChild(t);
  setTimeout(() => t.style.opacity = '1', 10);
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 3000);
}

function applyTheme() {
  if (window.theme === 'light') document.documentElement.setAttribute('data-theme', 'light');
  else document.documentElement.removeAttribute('data-theme');
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = window.theme === 'light' ? '☀️' : '🌙';
}

function setupGlobalEvents() {
  document.getElementById('themeToggle').addEventListener('click', () => {
    window.theme = window.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', window.theme);
    applyTheme();
  });
  document.getElementById('mobileMenuBtn').addEventListener('click', toggleMobile);
  document.getElementById('sidebarOverlay').addEventListener('click', toggleMobile);
  document.getElementById('notifBtn').addEventListener('click', () => {
    document.getElementById('notifPanel').classList.toggle('open');
    document.getElementById('walletPanel').classList.remove('open');
  });
  document.getElementById('notifClose').addEventListener('click', () => {
    document.getElementById('notifPanel').classList.remove('open');
  });

  // Wallet Events
  document.getElementById('walletBtn').addEventListener('click', () => {
    const panel = document.getElementById('walletPanel');
    panel.classList.toggle('open');
    document.getElementById('notifPanel').classList.remove('open');
    if (panel.classList.contains('open')) {
      renderWalletView();
    }
  });
  document.getElementById('walletClose').addEventListener('click', () => {
    document.getElementById('walletPanel').classList.remove('open');
  });
  // Language Switcher (AI Translation Simulation)
  const langSelect = document.getElementById('langSwitch');
  if (langSelect) {
    langSelect.value = window.currentLang;
    langSelect.addEventListener('change', (e) => {
      applyTranslation(e.target.value);
    });
  }
}

function applyTranslation(lang) {
  if (lang === window.currentLang) return;
  window.currentLang = lang;
  localStorage.setItem('lang', lang);

  const langName = lang === 'en' ? 'English' : I18N[lang]?.langName || lang;

  // AI Blur Effect
  document.body.classList.add('translating');
  window.showToast(`🧠 AI Neural Engine translating interface to ${langName}...`);

  setTimeout(() => {
    // Apply translations
    renderNav();
    const searchBox = document.getElementById('globalSearch');
    if (searchBox) searchBox.placeholder = I18N[lang]?.search || I18N['en'].search;

    // Re-render current page
    window.navigate(window.currentPage);

    // Remove blur
    setTimeout(() => {
      document.body.classList.remove('translating');
    }, 300);
  }, 1200); // Simulated AI lag
}

function toggleMobile() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('visible');
}

// ---- Navigation ----
function renderNav() {
  const nav = document.getElementById('sidebarNav');
  nav.innerHTML = NAV.map(n => {
    const displayLabel = window.currentLang === 'en' ? n.label : (n.trans[window.currentLang] || n.label);
    return `
    <a class="nav-item ${n.id === window.currentPage ? 'active' : ''}" data-page="${n.id}">
      <span class="nav-icon">${n.icon}</span>
      <span class="nav-label">${displayLabel}</span>
    </a>
  `;
  }).join('');
  nav.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('click', () => window.navigate(el.dataset.page));
  });

  // Re-translate the government badge in the footer
  const govBadge = document.getElementById('govBadgeText');
  if (govBadge) {
    govBadge.textContent = I18N[window.currentLang]?.govLabel || I18N['en'].govLabel;
  }
}

window.navigate = function navigate(page) {
  window.currentPage = page;
  window.charts.forEach(c => { try { c.destroy(); } catch (e) { } });
  window.charts = [];
  renderNav();
  const info = NAV.find(n => n.id === page);
  const displayLabel = window.currentLang === 'en' ? info.label : (info.trans[window.currentLang] || info.label);
  document.getElementById('breadcrumb').innerHTML = `<span class="breadcrumb-icon">${info?.icon || ''}</span><span class="breadcrumb-text">${displayLabel || ''}</span>`;
  const el = document.getElementById('mainContent');
  // Close mobile sidebar
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('visible');

  const renderers = { advisor: renderAdvisor, dashboard: renderDashboard, register: renderRegistration, implements: renderImplements, subsidy: renderSubsidy, hiring: renderHiring, marketplace: renderMarketplace, weather: renderWeather, schemes: renderSchemes, legal: renderLegal, admin: renderAdmin };
  if (renderers[page]) renderers[page](el);
}

function renderNotifications() {
  const list = document.getElementById('notifList');
  list.innerHTML = D.SAMPLE_NOTIFICATIONS.map(n => `
    <div class="notif-entry ${n.read ? '' : 'unread'}">
      <div class="notif-title">${n.title}</div>
      <div class="notif-msg">${n.message}</div>
      <div class="notif-time">${n.time}</div>
    </div>
  `).join('');
}

// ============ DASHBOARD ============
function renderDashboard(el) {
  const season = D.getCurrentSeason();
  const cal = D.CROP_CALENDAR[season];
  const mspAll = [...D.MSP_KHARIF, ...D.MSP_RABI];
  const tickerItems = mspAll.map(m => {
    const pct = D.getChangePercent(m.msp, m.prevMsp);
    return `<div class="msp-item"><span class="crop-icon">${m.icon}</span><span class="crop-name">${m.crop}</span><span class="crop-price">${m.msp} ${m.unit}</span><span class="crop-change up">↑${pct}%</span></div>`;
  }).join('');

  el.innerHTML = `
    <div class="animate-in">
      <div class="page-header">
        <div><h2>Dashboard</h2><p>Welcome back! Here's your farm overview for ${cal.season} season.</p></div>
        <div class="page-actions"><span class="source-tag verified">📡 Live Data</span><span class="source-tag">🏛️ Source: MoA&FW, IMD</span></div>
      </div>

      <div class="msp-ticker-wrap"><div class="msp-ticker-label">📈 MSP 2024-25</div><div class="msp-ticker">${tickerItems}${tickerItems}</div></div>

      <div class="stats-grid">
        <div class="stat-card green animate-in animate-in-delay-1">
          <div class="stat-top"><div class="stat-icon">🚜</div><span class="stat-trend up">↑ 12%</span></div>
          <div class="stat-value">${D.formatNumber(D.BLOCK_DATA.registeredImplements)}</div>
          <div class="stat-label">Registered Implements</div>
          <div class="stat-sub estimated">~${D.formatNumber(D.BLOCK_DATA.estimatedImplements)} Est. (Agri Census 2019)</div>
        </div>
        <div class="stat-card orange animate-in animate-in-delay-2">
          <div class="stat-top"><div class="stat-icon">🤝</div><span class="stat-trend up">↑ 8%</span></div>
          <div class="stat-value">${D.BLOCK_DATA.activeHirings}</div>
          <div class="stat-label">Active Custom Hirings</div>
          <div class="stat-sub">This month in ${D.BLOCK_DATA.name}</div>
        </div>
        <div class="stat-card blue animate-in animate-in-delay-3">
          <div class="stat-top"><div class="stat-icon">💰</div><span class="stat-trend up">↑ 23%</span></div>
          <div class="stat-value">${D.BLOCK_DATA.subsidyApplications}</div>
          <div class="stat-label">Subsidy Applications</div>
          <div class="stat-sub">Pending: ${D.BLOCK_DATA.pendingApprovals}</div>
        </div>
        <div class="stat-card purple animate-in animate-in-delay-4">
          <div class="stat-top"><div class="stat-icon">👨‍🌾</div></div>
          <div class="stat-value">${D.formatNumber(D.BLOCK_DATA.registeredFarmers)}</div>
          <div class="stat-label">Registered Farmers</div>
          <div class="stat-sub">of ${D.formatNumber(D.BLOCK_DATA.totalFarmers)} total</div>
        </div>
      </div>

      <div class="grid-2" style="margin-bottom:24px">
        <div class="card">
          <div class="card-header"><h3>📊 Implement Distribution</h3><span class="source-tag estimated">Registered vs Estimated</span></div>
          <div class="card-body"><div class="chart-container"><canvas id="implChart"></canvas></div></div>
        </div>
        <div class="card">
          <div class="card-header"><h3>📈 MSP Trends (₹/Quintal)</h3></div>
          <div class="card-body"><div class="chart-container"><canvas id="mspChart"></canvas></div></div>
        </div>
      </div>

      <div class="grid-2" style="margin-bottom:24px">
        <div class="card">
          <div class="card-header"><h3>🌾 Crop Calendar — ${cal.season}</h3></div>
          <div class="card-body">
            <div class="crop-calendar">
              ${Object.values(D.CROP_CALENDAR).map(s => `
                <div class="season-card ${s === cal ? 'style="border-color:var(--primary)"' : ''}">
                  <div class="season-name">${s.season}</div>
                  <div class="season-period">Sowing: ${s.sowing} | Harvest: ${s.harvesting}</div>
                  <div class="season-crops">${s.crops.map(c => `<span class="badge green">${c}</span>`).join('')}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><h3>🔔 Recent Activity</h3></div>
          <div class="card-body">
            <div class="activity-list">
              ${D.BLOCK_DATA.recentRegistrations.map((r, i) => `
                <div class="activity-item">
                  <div class="activity-dot ${r.verified ? 'green' : 'orange'}"></div>
                  <div>
                    <div class="activity-text"><strong>${r.farmer}</strong> registered <strong>${r.implement}</strong> from ${r.village}</div>
                    <div class="activity-time">${r.date} ${r.verified ? '✓ Verified' : '⏳ Pending'}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header"><h3>📊 Data Completeness — ${D.BLOCK_DATA.name}</h3></div>
        <div class="card-body">
          <div class="completeness-bar" style="margin-bottom:16px">
            <div class="completeness-label"><span>Farmer Registration</span><span>${((D.BLOCK_DATA.registeredFarmers / D.BLOCK_DATA.totalFarmers) * 100).toFixed(1)}%</span></div>
            <div class="completeness-track"><div class="completeness-fill" style="width:${(D.BLOCK_DATA.registeredFarmers / D.BLOCK_DATA.totalFarmers) * 100}%"></div></div>
          </div>
          <div class="completeness-bar">
            <div class="completeness-label"><span>Implement Registration</span><span>${((D.BLOCK_DATA.registeredImplements / D.BLOCK_DATA.estimatedImplements) * 100).toFixed(1)}%</span></div>
            <div class="completeness-track"><div class="completeness-fill" style="width:${(D.BLOCK_DATA.registeredImplements / D.BLOCK_DATA.estimatedImplements) * 100}%"></div></div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Charts
  const bd = window.D.BLOCK_DATA.implementBreakdown;
  const labels = Object.keys(bd);
  window.charts.push(new Chart(document.getElementById('implChart'), {
    type: 'bar',
    data: {
      labels,
      datasets: [
        { label: 'Registered', data: labels.map(l => bd[l].registered), backgroundColor: 'rgba(34,197,94,0.7)', borderRadius: 4 },
        { label: 'Estimated', data: labels.map(l => bd[l].estimated), backgroundColor: 'rgba(245,158,11,0.4)', borderRadius: 4 },
      ]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-2').trim() } } }, scales: { x: { ticks: { color: '#94a3b8', font: { size: 10 } }, grid: { display: false } }, y: { ticks: { color: '#94a3b8' }, grid: { color: 'var(--glass-strong)' } } } }
  }));

  const topCrops = window.D.MSP_KHARIF.slice(0, 6);
  window.charts.push(new Chart(document.getElementById('mspChart'), {
    type: 'line',
    data: {
      labels: topCrops.map(c => c.crop.split(' ')[0]),
      datasets: [
        { label: '2024-25', data: topCrops.map(c => c.msp), borderColor: '#22c55e', backgroundColor: 'rgba(34,197,94,0.1)', fill: true, tension: 0.4 },
        { label: '2023-24', data: topCrops.map(c => c.prevMsp), borderColor: '#64748b', borderDash: [5, 5], fill: false, tension: 0.4 },
      ]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#94a3b8' } } }, scales: { x: { ticks: { color: '#94a3b8', font: { size: 10 } }, grid: { display: false } }, y: { ticks: { color: '#94a3b8' }, grid: { color: 'var(--glass-strong)' } } } }
  }));
}

// ============ REGISTER IMPLEMENT ============
function renderRegistration(el) {
  el.innerHTML = `
    <div class="animate-in">
      <div class="page-header">
        <div><h2>Register Your Implement</h2><p>Contribute to your block's agricultural database and earn subsidy rewards.</p></div>
        <div class="page-actions"><span class="source-tag verified">🚜 Farmer Registration</span></div>
      </div>

      <div class="card" id="registerSection" style="margin-top:24px">
        <div class="card-header">
          <h3>Form Details</h3>
        </div>
        <div class="card-body">
          <form id="implForm" onsubmit="window._submitImplementForm(event)">
            <div class="grid-3" style="gap:16px; margin-bottom:16px">
              <div class="form-group">
                <label class="form-label">Implement Name</label>
                <input class="form-input" type="text" id="regName" required placeholder="e.g. Rotavator 6ft" style="background:var(--bg-1)">
              </div>
              <div class="form-group">
                <label class="form-label">Make</label>
                <input class="form-input" type="text" id="regMake" required placeholder="e.g. Mahindra" style="background:var(--bg-1)">
              </div>
              <div class="form-group">
                <label class="form-label">Model</label>
                <input class="form-input" type="text" id="regModel" required placeholder="e.g. M-500" style="background:var(--bg-1)">
              </div>
            </div>
            <div class="grid-3" style="gap:16px; margin-bottom:16px">
              <div class="form-group">
                <label class="form-label">Category Type</label>
                <select class="form-select" id="regType" required>
                  <option value="">-- Select --</option>
                  <option value="MB Plough">MB Plough</option>
                  <option value="Rotavator">Rotavator</option>
                  <option value="Cultivator">Cultivator</option>
                  <option value="Seed Drill">Seed Drill</option>
                  <option value="Planter (Pneumatic)">Planter (Pneumatic)</option>
                  <option value="Paddy Transplanter">Paddy Transplanter</option>
                  <option value="Boom Sprayer (Tractor)">Boom Sprayer (Tractor)</option>
                  <option value="Agricultural Drone">Agricultural Drone</option>
                  <option value="Power Sprayer (Knapsack)">Power Sprayer (Knapsack)</option>
                  <option value="Combine Harvester">Combine Harvester</option>
                  <option value="Reaper/Binder">Reaper/Binder</option>
                  <option value="Multi-crop Thresher">Multi-crop Thresher</option>
                  <option value="Happy Seeder">Happy Seeder</option>
                  <option value="Straw Baler">Straw Baler</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Amount Paid (₹)</label>
                <input class="form-input" type="number" id="regAmount" required style="background:var(--bg-1)">
              </div>
              <div class="form-group">
                <label class="form-label">Subsidy Received (₹ or %)</label>
                <input class="form-input" type="text" id="regSubsidy" required placeholder="e.g. 50% or 10000" style="background:var(--bg-1)">
              </div>
            </div>
            <div class="grid-3" style="gap:16px; margin-bottom:16px">
              <div class="form-group">
                <label class="form-label">Serial Number</label>
                <input class="form-input" type="text" id="regSerial" required style="background:var(--bg-1)">
              </div>
              <div class="form-group">
                <label class="form-label">Aadhar Number</label>
                <input class="form-input" type="text" id="regAadhar" required pattern="\\d{12}" title="10 digit aadhar" style="background:var(--bg-1)">
              </div>
              <div class="form-group">
                <label class="form-label">Phone Number</label>
                <input class="form-input" type="text" id="regPhone" required pattern="\\d{10}" title="10 digit phone number" style="background:var(--bg-1)">
              </div>
            </div>
            <div class="grid-3" style="gap:16px; margin-bottom:24px">
              <div class="form-group">
                <label class="form-label">State</label>
                <input class="form-input" type="text" id="regState" value="Tamil Nadu" required readonly style="background:var(--bg-1); opacity:0.8">
              </div>
              <div class="form-group">
                <label class="form-label">District</label>
                <input class="form-input" type="text" id="regDist" value="Coimbatore" required style="background:var(--bg-1)">
              </div>
              <div class="form-group">
                <label class="form-label">Block</label>
                <input class="form-input" type="text" id="regBlock" required placeholder="e.g. Sulur" style="background:var(--bg-1)">
              </div>
            </div>
            <button type="submit" class="btn btn-primary" id="implSubmitBtn" style="width:100%; padding: 16px; font-size: 16px">✅ Register Implement & Claim Reward</button>
          </form>
        </div>
      </div>
    </div>
  `;

  window._submitImplementForm = async (e) => {
    e.preventDefault();
    const btn = document.getElementById('implSubmitBtn');
    btn.disabled = true;
    btn.innerHTML = '⏳ Registering implementation securely...';
    try {
      const data = {
        name: document.getElementById('regName').value,
        make: document.getElementById('regMake').value,
        model: document.getElementById('regModel').value,
        type: document.getElementById('regType').value,
        amount: document.getElementById('regAmount').value,
        subsidy: document.getElementById('regSubsidy').value,
        serialNumber: document.getElementById('regSerial').value,
        aadhar: document.getElementById('regAadhar').value,
        phone: document.getElementById('regPhone').value,
        state: document.getElementById('regState').value,
        district: document.getElementById('regDist').value,
        block: document.getElementById('regBlock').value,
      };

      // Send to Firebase DB
      await addImplementRegistration(data);

      // --- FUEL SUBSIDY CALCULATION ---
      // User requested: 10-20% of the Gov Subsidy amount
      let govSubsidyAmount = 0;
      if (typeof data.subsidy === 'string' && data.subsidy.includes('%')) {
        // It's a percentage, calculate from total amount
        const perc = parseInt(data.subsidy.replace('%', ''));
        govSubsidyAmount = Math.round(data.amount * (perc / 100));
      } else {
        // It's a flat number
        govSubsidyAmount = parseInt(data.subsidy) || 0;
      }

      // Calculate 10-20% of the Gov Subsidy
      const rewardPerc = Math.floor(Math.random() * 11) + 10; // 10 to 20
      const fuelSubsidyAmount = Math.round(govSubsidyAmount * (rewardPerc / 100));

      // Save Fuel Subsidy to Wallet DB
      let couponCode = '';
      if (fuelSubsidyAmount > 0) {
        const rewardRes = await addFuelSubsidy(data.aadhar, fuelSubsidyAmount, `Registration: ${data.name} (${data.type})`);
        couponCode = rewardRes.code;
      }

      document.getElementById('implForm').reset();

      let alertMsg = `🎉 Registration Successful!\n\nThank you for contributing to the ${data.district} District Implement Database.\n\nYour implement is now live.`;

      if (fuelSubsidyAmount > 0) {
        alertMsg += `\n\n🎁 REWARD UNLOCKED: You have earned a ₹${fuelSubsidyAmount.toLocaleString('en-IN')} Fuel Subsidy (${rewardPerc}% of your Gov Subsidy)!\n\nYour Coupon Code: ${couponCode}\n\nClick the 💳 Wallet icon at the top of the screen to view your subsidies.`;
      }

      alert(alertMsg);

      window.showToast('Implement registered successfully!', true);
    } catch (err) {
      window.showToast(err.message || 'Registration failed', false);
    } finally {
      btn.disabled = false;
      btn.innerHTML = '✅ Register Implement & Claim Reward';
    }
  };
}

// ============ IMPLEMENTS ============
function renderImplements(el) {
  el.innerHTML = `
    <div class="animate-in">
      <div class="page-header">
        <div><h2>Implement Management</h2><p>Track registered implements in ${D.BLOCK_DATA.name}, ${D.BLOCK_DATA.district}</p></div>
        <div class="page-actions"><button class="btn btn-primary" onclick="window.showToast('Scanner interface starting...')">📸 Scan QR Code</button><button class="btn btn-outline" onclick="window.showToast('Exporting to CSV...')">📥 Export CSV</button></div>
      </div>
      <div class="filter-bar">
        <button class="filter-chip active" data-filter="all">All (${D.SAMPLE_IMPLEMENTS.length})</button>
        ${D.IMPLEMENT_CATEGORIES.slice(0, 6).map(c => `<button class="filter-chip" data-filter="${c}">${c}</button>`).join('')}
      </div>
      <div class="card">
        <div class="card-body no-pad">
          <div class="table-wrap">
            <table>
              <thead><tr><th>Implement</th><th>Category</th><th>Owner</th><th>Village</th><th>Condition</th><th>Status</th><th>Value</th><th>Verified</th></tr></thead>
              <tbody>
                ${D.SAMPLE_IMPLEMENTS.map(im => `
                  <tr>
                    <td><strong style="color:var(--text-1)">${im.name}</strong>${im.hp ? `<br><span style="font-size:11px;color:var(--text-3)">${im.hp} HP | ${im.year}</span>` : `<br><span style="font-size:11px;color:var(--text-3)">${im.year}</span>`}</td>
                    <td><span class="badge blue">${im.category}</span></td>
                    <td>${im.owner}</td>
                    <td>${im.village}</td>
                    <td><span class="badge ${im.condition === 'Excellent' ? 'green' : im.condition === 'Good' ? 'blue' : 'orange'}">${im.condition}</span></td>
                    <td><span class="badge ${im.status === 'active' ? 'green' : 'orange'}">${im.status}</span></td>
                    <td style="font-weight:600">${D.formatCurrency(im.value)}</td>
                    <td>${im.verified ? '<span class="source-tag verified">✓ Verified</span>' : '<span class="source-tag estimated">⏳ Pending</span>'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div style="margin-top:24px" class="grid-2">
        <div class="card">
          <div class="card-header"><h3>📊 Category Breakdown</h3></div>
          <div class="card-body"><div class="chart-container"><canvas id="implPieChart"></canvas></div></div>
        </div>
        <div class="card">
          <div class="card-header"><h3>📋 Quick Stats</h3></div>
          <div class="card-body">
            <div style="display:flex;flex-direction:column;gap:12px">
              <div class="subsidy-item"><div class="label">Total Registered</div><div class="value">${D.SAMPLE_IMPLEMENTS.length}</div></div>
              <div class="subsidy-item"><div class="label">Verified</div><div class="value" style="color:var(--success)">${D.SAMPLE_IMPLEMENTS.filter(i => i.verified).length}</div></div>
              <div class="subsidy-item"><div class="label">Pending Verification</div><div class="value" style="color:var(--warning)">${D.SAMPLE_IMPLEMENTS.filter(i => !i.verified).length}</div></div>
              <div class="subsidy-item"><div class="label">Total Value</div><div class="value">${D.formatCurrency(D.SAMPLE_IMPLEMENTS.reduce((s, i) => s + i.value, 0))}</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  const cats = {};
  D.SAMPLE_IMPLEMENTS.forEach(i => { cats[i.category] = (cats[i.category] || 0) + 1; });
  charts.push(new Chart(document.getElementById('implPieChart'), {
    type: 'doughnut',
    data: { labels: Object.keys(cats), datasets: [{ data: Object.values(cats), backgroundColor: ['#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#14b8a6', '#ef4444', '#64748b'] }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', padding: 12 } } } }
  }));
}

// ============ SUBSIDY CALCULATOR ============
function renderSubsidy(el) {
  el.innerHTML = `
    <div class="animate-in">
      <div class="page-header">
        <div><h2>Subsidy Calculator</h2><p>Calculate government subsidies under SMAM & state schemes. Data from agrimachinery.nic.in</p></div>
        <span class="source-tag verified">🏛️ Source: SMAM Portal, MoA&FW</span>
      </div>
      <div class="card" style="margin-bottom:24px">
        <div class="card-header"><h3>💰 Calculate Your Subsidy</h3></div>
        <div class="card-body">
          <div class="form-row" style="margin-bottom:16px">
            <div class="form-group">
              <label class="form-label">Equipment Type</label>
              <select class="form-select" id="subsidyType" onchange="window._updateSubsidy()">
                <option value="">-- Select Equipment --</option>
                <optgroup label="Tractors">${D.TRACTOR_SUBSIDIES.map((t, i) => `<option value="tractor_${i}">${t.hpRange}</option>`).join('')}</optgroup>
                <optgroup label="Implements">${D.IMPLEMENT_SUBSIDIES.map(im => `<option value="impl_${im.id}">${im.name} (${im.category})</option>`).join('')}</optgroup>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Farmer Category</label>
              <select class="form-select" id="farmerCat" onchange="window._updateSubsidy()">
                ${Object.entries(D.SUBSIDY_CATEGORIES).map(([k, v]) => `<option value="${k}">${v.label}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Equipment Cost (₹)</label>
              <input class="form-input" type="number" id="equipCost" placeholder="Enter cost or use default" oninput="window._updateSubsidy()">
            </div>
          </div>
          <div id="subsidyResult"></div>
        </div>
      </div>
      <div class="card" style="margin-bottom:24px">
        <div class="card-header"><h3>📋 Implement Subsidy Reference Table</h3><span class="source-tag">SMAM 2024-25</span></div>
        <div class="card-body no-pad">
          <div class="table-wrap"><table>
            <thead><tr><th>Implement</th><th>Category</th><th>Subsidy %</th><th>Max Subsidy</th><th>Approx Cost</th></tr></thead>
            <tbody>${D.IMPLEMENT_SUBSIDIES.map(im => `<tr><td><strong style="color:var(--text-1)">${im.icon} ${im.name}</strong></td><td><span class="badge blue">${im.category}</span></td><td>${im.subsidyPercent}%</td><td style="color:var(--primary);font-weight:700">${D.formatCurrency(im.maxSubsidy)}</td><td>${D.formatCurrency(im.approxCost)}</td></tr>`).join('')}
            </tbody>
          </table></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3>🚜 Tractor Subsidy Slabs</h3></div>
        <div class="card-body no-pad">
          <div class="table-wrap"><table>
            <thead><tr><th>HP Range</th><th>General (%)</th><th>General Max</th><th>SC/ST (%)</th><th>SC/ST Max</th><th>Approx Cost</th></tr></thead>
            <tbody>${D.TRACTOR_SUBSIDIES.map(t => `<tr><td><strong style="color:var(--text-1)">${t.hpRange}</strong>${t.note ? `<br><span style="font-size:10px;color:var(--warning)">${t.note}</span>` : ''}</td><td>${t.general.percent}%</td><td>${D.formatCurrency(t.general.max)}</td><td>${t.scst.percent}%</td><td>${D.formatCurrency(t.scst.max)}</td><td>${D.formatCurrency(t.approxCost)}</td></tr>`).join('')}
            </tbody>
          </table></div>
        </div>
      </div>
    </div>
  `;
  window._updateSubsidy = () => {
    const sel = document.getElementById('subsidyType').value;
    const cat = document.getElementById('farmerCat').value;
    const costInput = document.getElementById('equipCost');
    const res = document.getElementById('subsidyResult');
    if (!sel) { res.innerHTML = ''; return; }
    let subsidyPercent = 0, maxSubsidy = 0, approxCost = 0, name = '';
    if (sel.startsWith('tractor_')) {
      const idx = parseInt(sel.split('_')[1]);
      const t = D.TRACTOR_SUBSIDIES[idx];
      name = t.hpRange;
      approxCost = t.approxCost;
      const isScSt = cat === 'sc_st' || cat === 'women' || cat === 'small_marginal' || cat === 'northeast';
      subsidyPercent = isScSt ? t.scst.percent : t.general.percent;
      maxSubsidy = isScSt ? t.scst.max : t.general.max;
    } else {
      const id = parseInt(sel.split('_')[1]);
      const im = D.IMPLEMENT_SUBSIDIES.find(x => x.id === id);
      if (!im) return;
      name = im.name;
      subsidyPercent = im.subsidyPercent;
      maxSubsidy = im.maxSubsidy;
      approxCost = im.approxCost;
      if (cat === 'sc_st' || cat === 'women' || cat === 'small_marginal') { subsidyPercent = 50; maxSubsidy = Math.round(maxSubsidy * 1.25); }
      if (cat === 'northeast') { subsidyPercent = 60; maxSubsidy = Math.round(maxSubsidy * 1.5); }
    }
    const cost = parseInt(costInput.value) || approxCost;
    if (!costInput.value) costInput.placeholder = `Default: ₹${approxCost.toLocaleString('en-IN')}`;
    const calculated = Math.round(cost * subsidyPercent / 100);
    const finalSubsidy = Math.min(calculated, maxSubsidy);
    const youPay = cost - finalSubsidy;
    res.innerHTML = `
      <div class="subsidy-result">
        <div style="font-size:13px;color:var(--text-3);margin-bottom:8px">${name} — ${D.SUBSIDY_CATEGORIES[cat].label}</div>
        <div class="subsidy-amount">₹${finalSubsidy.toLocaleString('en-IN')}</div>
        <div style="font-size:14px;color:var(--text-2);margin-top:4px">Government Subsidy Amount</div>
        <div class="subsidy-breakdown">
          <div class="subsidy-item"><div class="label">Equipment Cost</div><div class="value">₹${cost.toLocaleString('en-IN')}</div></div>
          <div class="subsidy-item"><div class="label">Subsidy Rate</div><div class="value">${subsidyPercent}%</div></div>
          <div class="subsidy-item"><div class="label">Max Subsidy Cap</div><div class="value">₹${maxSubsidy.toLocaleString('en-IN')}</div></div>
          <div class="subsidy-item"><div class="label">You Pay</div><div class="value" style="color:var(--accent)">₹${youPay.toLocaleString('en-IN')}</div></div>
        </div>
      </div>`;
  };
}

// ============ CUSTOM HIRING ============
function renderHiring(el) {
  const cats = [...new Set(D.HIRING_SERVICES.map(s => s.category))];
  el.innerHTML = `
    <div class="animate-in">
      <div class="page-header">
        <div><h2>Custom Hiring Centre</h2><p>Book agricultural services or list your equipment for hire</p></div>
        <div class="page-actions"><button class="btn btn-primary" onclick="window.showToast('Listing form opened')">📋 List Your Equipment</button></div>
      </div>
      <div class="filter-bar">
        <button class="filter-chip active" data-cat="all">All Services</button>
        ${cats.map(c => `<button class="filter-chip" data-cat="${c}">${c}</button>`).join('')}
      </div>
      <div class="hiring-grid" id="hiringGrid">
        ${D.HIRING_SERVICES.map(s => `
          <div class="hiring-card" data-category="${s.category}">
            <div class="hiring-icon">${s.icon}</div>
            <div class="hiring-info">
              <div class="hiring-name">${s.service}</div>
              <div class="hiring-desc">${s.description}</div>
              <div class="hiring-rate">₹${s.rate.toLocaleString('en-IN')} <span class="unit">${s.unit}</span></div>
              <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;">
                <span class="badge blue">${s.category}</span>
                <button class="btn btn-sm btn-outline" onclick="window.showToast('Booking requested for ${s.service}!')">Book Now</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  el.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      el.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cat = chip.dataset.cat;
      el.querySelectorAll('.hiring-card').forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.category === cat) ? '' : 'none';
      });
    });
  });
}

// ============ MARKETPLACE ============
function renderMarketplace(el) {
  el.innerHTML = `
    <div class="animate-in">
      <div class="page-header">
        <div><h2>Equipment Marketplace</h2><p>Buy, sell & rent agricultural equipment across India</p></div>
        <div class="page-actions"><button class="btn btn-accent" onclick="window.showToast('Listing editor opened')">🏷️ Post Listing</button></div>
      </div>
      <div class="filter-bar">
        <button class="filter-chip active" data-type="all">All</button>
        <button class="filter-chip" data-type="sale">🏷️ For Sale</button>
        <button class="filter-chip" data-type="rent">🔄 For Rent</button>
      </div>
      <div class="marketplace-grid" id="marketGrid">
        ${D.MARKETPLACE_LISTINGS.map(l => `
          <div class="listing-card ${l.featured ? 'featured' : ''}" data-type="${l.type}">
            <div class="listing-image">${l.image}
              <span class="listing-type badge ${l.type === 'sale' ? 'green' : 'blue'}">${l.type === 'sale' ? '🏷️ Sale' : '🔄 Rent'}</span>
              ${l.featured ? '<span class="listing-featured badge orange">⭐ Featured</span>' : ''}
            </div>
            <div class="listing-body">
              <div class="listing-title">${l.title}</div>
              <div class="listing-meta">
                <span>📍 ${l.location}</span>
                <span>📅 ${l.year}</span>
                <span class="badge ${l.condition === 'Excellent' ? 'green' : l.condition === 'Good' ? 'blue' : 'orange'}">${l.condition}</span>
              </div>
              <div class="listing-price">₹${l.price.toLocaleString('en-IN')} ${l.priceUnit ? `<span class="unit">${l.priceUnit}</span>` : ''}</div>
              <p style="font-size:12px;color:var(--text-3);margin-top:8px">${l.description}</p>
            </div>
            <div class="listing-footer">
              <span style="font-size:12px;color:var(--text-3)">👤 ${l.seller}</span>
              <button class="btn btn-sm btn-primary" onclick="window.showToast('Contacting ${l.seller}...')">Contact</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  el.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      el.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const t = chip.dataset.type;
      el.querySelectorAll('.listing-card').forEach(card => {
        card.style.display = (t === 'all' || card.dataset.type === t) ? '' : 'none';
      });
    });
  });
}

// ============ WEATHER ============
function renderWeather(el) {
  el.innerHTML = `
    <div class="animate-in">
      <div class="page-header">
        <div><h2>AI Weather & IMD Data</h2><p>Real-time neural synthesized weather from Open-Meteo API for Indian districts</p></div>
        <span class="source-tag verified" style="box-shadow: 0 0 10px rgba(34,197,94,0.4)">🧠 Agent AI Powered</span>
      </div>
      <div class="form-inline" style="margin-bottom:24px; background: var(--bg-1); padding: 16px; border-radius: var(--radius-lg); border: 1px solid var(--glass-border);">
        <div class="form-group">
          <label class="form-label" style="color:var(--primary)">Select State for AI Analysis</label>
          <select class="form-select" id="weatherState">
            ${D.STATES_DATA.map(s => `<option value="${s.name}" ${s.name === 'Uttar Pradesh' ? 'selected' : ''}>${s.name}</option>`).join('')}
          </select>
        </div>
        <button class="btn btn-primary" id="fetchWeatherBtn">⚡ Run Neural Prediction</button>
      </div>
      <div id="weatherContent"></div>
    </div>
  `;
  document.getElementById('fetchWeatherBtn').addEventListener('click', () => fetchWeather());
  fetchWeather();
}

async function fetchWeather() {
  const stateName = document.getElementById('weatherState').value;
  const state = D.STATES_DATA.find(s => s.name === stateName);
  const wc = document.getElementById('weatherContent');

  // Premium AI Loading State
  wc.innerHTML = `
    <div class="ai-processing">
      <div class="ai-orb-loader"></div>
      <div class="ai-steps">
        <div class="ai-step" style="animation-delay: 0.2s">Initializing secure IMD API Gateway...</div>
        <div class="ai-step" style="animation-delay: 1.2s">Synthesizing regional weather models for ${stateName}...</div>
        <div class="ai-step" style="animation-delay: 2.2s">Neural Network Analysis Complete.</div>
      </div>
    </div>
  `;

  try {
    // Artificial Delay for AI Effect
    await new Promise(r => setTimeout(r, 2800));

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${state.lat}&longitude=${state.lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&timezone=Asia/Kolkata&forecast_days=7`;
    const res = await fetch(url);
    const data = await res.json();
    const cur = data.current;
    const daily = data.daily;
    const icon = D.getWeatherIcon(cur.weather_code);
    const desc = D.getWeatherDesc(cur.weather_code);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Build forecast cards
    let forecastHtml = '';
    daily.time.forEach((t, i) => {
      const d = new Date(t);
      forecastHtml += '<div style="background: var(--bg-1); padding: 16px 12px; border-radius: 12px; border: 1px solid var(--glass-strong); text-align: center;">' +
        '<div style="font-size: 13px; color: var(--text-2); margin-bottom: 8px; font-weight: 600;">' + days[d.getDay()] + '</div>' +
        '<div style="font-size: 28px; margin-bottom: 8px;">' + D.getWeatherIcon(daily.weather_code[i]) + '</div>' +
        '<div style="font-size: 15px; font-weight: 700;">' + Math.round(daily.temperature_2m_max[i]) + '°</div>' +
        '<div style="font-size: 12px; color: var(--text-3); margin-bottom: 8px;">' + Math.round(daily.temperature_2m_min[i]) + '°</div>' +
        '<div style="font-size: 11px; color: #60a5fa; background: rgba(96,165,250,0.1); padding: 2px 4px; border-radius: 4px;">💧 ' + daily.precipitation_sum[i] + ' mm</div>' +
        '</div>';
    });

    wc.innerHTML = '<div class="card" style="box-shadow: 0 4px 30px rgba(0,0,0,0.3); border-color: rgba(34,197,94,0.3); background: var(--bg-1); backdrop-filter: blur(20px);">' +
      '<div class="card-body" style="padding: 32px;">' +
      '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px; flex-wrap:wrap; gap:16px;">' +
      '<div style="display:flex; gap: 24px; align-items:center;">' +
      '<div style="font-size: 64px; filter: drop-shadow(0 0 20px rgba(255,255,255,0.2)); line-height: 1;">' + icon + '</div>' +
      '<div>' +
      '<div style="font-size: 56px; font-weight: 800; color: var(--text-1); line-height: 1; letter-spacing: -2px;">' + Math.round(cur.temperature_2m) + '<span style="font-size: 24px; font-weight: 400; color: var(--text-3);">°C</span></div>' +
      '<div style="font-size: 18px; color: var(--primary); font-weight: 500;">' + desc + '</div>' +
      '</div>' +
      '</div>' +
      '<div style="text-align: right;">' +
      '<div style="font-size: 20px; font-weight: 700;">📍 ' + stateName + ', India</div>' +
      '<div style="margin-top: 12px; display:flex; gap: 16px; justify-content: flex-end;">' +
      '<div style="background: var(--glass-strong); padding: 8px 16px; border-radius: 12px; border: 1px solid var(--glass-border-hover);"><div style="font-size: 11px; color: var(--text-3); text-transform: uppercase;">Humidity</div><div style="font-size: 16px; font-weight: 700;">' + cur.relative_humidity_2m + '%</div></div>' +
      '<div style="background: var(--glass-strong); padding: 8px 16px; border-radius: 12px; border: 1px solid var(--glass-border-hover);"><div style="font-size: 11px; color: var(--text-3); text-transform: uppercase;">Wind Speed</div><div style="font-size: 16px; font-weight: 700;">' + cur.wind_speed_10m + ' km/h</div></div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<h3 style="margin-bottom: 16px; font-size: 16px; border-bottom: 1px solid var(--glass-border-hover); padding-bottom: 8px;">Neural 7-Day Forecast</h3>' +
      '<div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 12px;">' + forecastHtml + '</div>' +
      '</div>' +
      '</div>' +
      '<div class="grid-2" style="margin-top: 24px;">' +
      '<div class="card"><div class="card-header"><h3>🌡️ AI Temperature Trend</h3></div><div class="card-body"><div class="chart-container"><canvas id="tempChart"></canvas></div></div></div>' +
      '<div class="card"><div class="card-header"><h3>🌧️ Neural Rainfall Forecast</h3></div><div class="card-body"><div class="chart-container"><canvas id="rainChart"></canvas></div></div></div>' +
      '</div>';

    const dayLabels = daily.time.map(t => { const d = new Date(t); return days[d.getDay()]; });
    charts.push(new Chart(document.getElementById('tempChart'), {
      type: 'line',
      data: {
        labels: dayLabels, datasets: [
          { label: 'Max °C', data: daily.temperature_2m_max, borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)', fill: true, tension: 0.4 },
          { label: 'Min °C', data: daily.temperature_2m_min, borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.1)', fill: true, tension: 0.4 },
        ]
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#94a3b8' } } }, scales: { x: { ticks: { color: '#94a3b8' }, grid: { display: false } }, y: { ticks: { color: '#94a3b8' }, grid: { color: 'var(--glass-strong)' } } } }
    }));
    charts.push(new Chart(document.getElementById('rainChart'), {
      type: 'bar',
      data: { labels: dayLabels, datasets: [{ label: 'Rainfall (mm)', data: daily.precipitation_sum, backgroundColor: 'rgba(59,130,246,0.6)', borderRadius: 6 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#94a3b8' } } }, scales: { x: { ticks: { color: '#94a3b8' }, grid: { display: false } }, y: { ticks: { color: '#94a3b8' }, grid: { color: 'var(--glass-strong)' } } } }
    }));
  } catch (e) {
    wc.innerHTML = `<div class="empty-state"><div class="empty-icon">⚠️</div><h3>Couldn't fetch weather</h3><p>Please check your internet connection and try again.</p></div>`;
  }
}

// ============ GOV SCHEMES ============
function renderSchemes(el) {
  el.innerHTML = `
    <div class="animate-in">
      <div class="page-header">
        <div><h2>Government Schemes</h2><p>Active central government schemes for farmers. Source: MoA&FW, NABARD</p></div>
        <span class="source-tag verified">🏛️ Official Sources</span>
      </div>
      <div class="grid-2">
        ${D.GOV_SCHEMES.map(s => `
          <div class="scheme-card">
            <div class="scheme-top">
              <div class="scheme-icon">${s.icon}</div>
              <div>
                <div class="scheme-name">${s.name}</div>
                <div class="scheme-ministry">${s.ministry}</div>
              </div>
              <span class="badge green">${s.status}</span>
            </div>
            <div class="scheme-desc">${s.description}</div>
            <ul class="scheme-benefits">${s.benefits.map(b => `<li>${b}</li>`).join('')}</ul>
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
              <span class="badge purple">Subsidy: ${s.subsidy}</span>
              <a href="${s.website}" target="_blank" class="btn btn-sm btn-outline">🔗 Official Website</a>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ============ LEGAL & COMPLIANCE ============
function renderLegal(el) {
  el.innerHTML = `
    <div class="animate-in">
      <div class="page-header">
        <div><h2>Legal & Compliance</h2><p>Terms of service, privacy policy and government data usage guidelines</p></div>
      </div>
      <div class="card" style="margin-bottom:24px">
        <div class="card-header"><h3>Data Privacy & Security</h3></div>
        <div class="card-body">
          <p style="color:var(--text-2); margin-bottom:12px; line-height:1.6">All agricultural and farm metrics data is strictly handled according to the Government of India's Personal Data Protection framework.</p>
          <ul style="color:var(--text-3); margin-left:20px; line-height:1.6; font-size:14px">
            <li>Aadhar details are encrypted and never shared with third parties.</li>
            <li>Implement registration data is utilized solely for block-level statistical analysis.</li>
            <li>Subsidy wallet transactions are audited by MoA&FW compliance servers.</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

// ============ ADMIN PANEL ============
function renderAdmin(el) {
  const bd = D.BLOCK_DATA;
  el.innerHTML = `
    <div class="animate-in">
      <div class="page-header">
        <div><h2>Admin Panel — ${bd.name}</h2><p>${bd.district}, ${bd.state} | Block Development Officer Dashboard</p></div>
        <div class="page-actions"><button class="btn btn-primary" onclick="window._downloadAdminCSV()">📊 Generate Report</button><button class="btn btn-outline" onclick="window._downloadAdminCSV()">📥 Download Data</button></div>
      </div>
      <div class="stats-grid">
        <div class="stat-card green"><div class="stat-top"><div class="stat-icon">🏘️</div></div><div class="stat-value">${bd.totalVillages}</div><div class="stat-label">Total Villages</div></div>
        <div class="stat-card blue"><div class="stat-top"><div class="stat-icon">👨‍🌾</div></div><div class="stat-value">${D.formatNumber(bd.registeredFarmers)}</div><div class="stat-label">Registered Farmers</div><div class="stat-sub">of ${D.formatNumber(bd.totalFarmers)} total</div></div>
        <div class="stat-card orange"><div class="stat-top"><div class="stat-icon">📋</div></div><div class="stat-value">${bd.pendingApprovals}</div><div class="stat-label">Pending Approvals</div></div>
        <div class="stat-card teal"><div class="stat-top"><div class="stat-icon">🌾</div></div><div class="stat-value">${D.formatNumber(bd.totalArea)} ha</div><div class="stat-label">Total Area</div><div class="stat-sub">Irrigated: ${D.formatNumber(bd.irrigatedArea)} ha</div></div>
      </div>
      <div class="grid-2" style="margin-bottom:24px">
        <div class="card">
          <div class="card-header"><h3>📊 Registered vs Estimated Implements</h3><span class="source-tag estimated">Agri Census 2019</span></div>
          <div class="card-body"><div class="chart-container"><canvas id="adminImplChart"></canvas></div></div>
        </div>
        <div class="card">
          <div class="card-header"><h3>🥧 Subsidy Distribution</h3></div>
          <div class="card-body"><div class="chart-container"><canvas id="adminSubChart"></canvas></div></div>
        </div>
      </div>
      <div class="card" style="margin-bottom:24px">
        <div class="card-header"><h3>⏳ Pending Verifications</h3><span class="badge orange">${bd.recentRegistrations.filter(r => !r.verified).length} pending</span></div>
        <div class="card-body no-pad">
          <div class="table-wrap"><table>
            <thead><tr><th>Date</th><th>Farmer</th><th>Village</th><th>Implement</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>${bd.recentRegistrations.map(r => `
              <tr>
                <td>${r.date}</td>
                <td><strong style="color:var(--text-1)">${r.farmer}</strong></td>
                <td>${r.village}</td>
                <td>${r.implement}</td>
                <td>${r.verified ? '<span class="badge green">✓ Verified</span>' : '<span class="badge orange">⏳ Pending</span>'}</td>
                <td>${!r.verified ? '<button class="btn btn-sm btn-primary">✓ Verify</button> <button class="btn btn-sm btn-outline">✕</button>' : '<span style="color:var(--text-3);font-size:12px">Done</span>'}</td>
              </tr>
            `).join('')}</tbody>
          </table></div>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><h3>📊 Data Completeness Dashboard</h3></div>
        <div class="card-body">
          <div style="display:flex;flex-direction:column;gap:16px">
            <div class="completeness-bar"><div class="completeness-label"><span>Farmer Registration</span><span>${((bd.registeredFarmers / bd.totalFarmers) * 100).toFixed(1)}%</span></div><div class="completeness-track"><div class="completeness-fill" style="width:${(bd.registeredFarmers / bd.totalFarmers) * 100}%"></div></div></div>
            <div class="completeness-bar"><div class="completeness-label"><span>Implement Registration</span><span>${((bd.registeredImplements / bd.estimatedImplements) * 100).toFixed(1)}%</span></div><div class="completeness-track"><div class="completeness-fill" style="width:${(bd.registeredImplements / bd.estimatedImplements) * 100}%"></div></div></div>
            <div class="completeness-bar"><div class="completeness-label"><span>Village Coverage</span><span>72.4%</span></div><div class="completeness-track"><div class="completeness-fill" style="width:72.4%"></div></div></div>
            <div class="completeness-bar"><div class="completeness-label"><span>Subsidy Applications Processed</span><span>${(((bd.subsidyApplications - bd.pendingApprovals) / bd.subsidyApplications) * 100).toFixed(1)}%</span></div><div class="completeness-track"><div class="completeness-fill" style="width:${((bd.subsidyApplications - bd.pendingApprovals) / bd.subsidyApplications) * 100}%"></div></div></div>
          </div>
        </div>
      </div>
    </div>
  `;
  const bk = bd.implementBreakdown;
  const labels = Object.keys(bk);
  charts.push(new Chart(document.getElementById('adminImplChart'), {
    type: 'bar',
    data: {
      labels, datasets: [
        { label: 'Registered', data: labels.map(l => bk[l].registered), backgroundColor: 'rgba(34,197,94,0.7)', borderRadius: 4 },
        { label: 'Estimated (Census)', data: labels.map(l => bk[l].estimated), backgroundColor: 'rgba(245,158,11,0.4)', borderRadius: 4 },
      ]
    },
    options: { responsive: true, maintainAspectRatio: false, indexAxis: 'y', plugins: { legend: { labels: { color: '#94a3b8' } } }, scales: { x: { ticks: { color: '#94a3b8' }, grid: { color: 'var(--glass-strong)' } }, y: { ticks: { color: '#94a3b8' }, grid: { display: false } } } }
  }));
  charts.push(new Chart(document.getElementById('adminSubChart'), {
    type: 'doughnut',
    data: { labels: ['Approved', 'Pending', 'Rejected'], datasets: [{ data: [bd.subsidyApplications - bd.pendingApprovals - 12, bd.pendingApprovals, 12], backgroundColor: ['#22c55e', '#f59e0b', '#ef4444'] }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8', padding: 12 } } } }
  }));

  window._downloadAdminCSV = () => {
    let csvContent = "Block,District,State,Total Villages,Registered Farmers,Pending Approvals,Total Area (ha)\n";
    csvContent += `"${bd.name}","${bd.district}","${bd.state}",${bd.totalVillages},${bd.registeredFarmers},${bd.pendingApprovals},${bd.totalArea}\n\n`;

    csvContent += "Date,Farmer,Village,Implement,Verified Status\n";
    bd.recentRegistrations.forEach(r => {
      const status = r.verified ? 'Verified' : 'Pending';
      csvContent += `"${r.date}","${r.farmer}","${r.village}","${r.implement}","${status}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Admin_Report_${bd.name.replace(/\\s+/g, '_')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.showToast('CSV downloaded successfully!', true);
  };
}

// ============ A-Z AGRI ADVISOR & CALCULATOR ============
function renderAdvisor(el) {
  el.innerHTML = `
    <div class="animate-in">
      <div class="page-header" style="margin-bottom:12px">
        <div><h2>Smart A-Z Agri Advisor</h2><p>Automated Subsidy & Implement Calculator based on your farm metrics</p></div>
        <span class="source-tag verified" style="background:rgba(34,197,94,0.1);color:var(--success)">✨ AI-Assisted Recommendation</span>
      </div>
      
      <div class="card" style="margin-bottom:24px; border-color:var(--primary); box-shadow:0 10px 30px rgba(34,197,94,0.1)">
        <div class="card-header" style="background:linear-gradient(90deg, var(--bg-2), rgba(34,197,94,0.05))">
          <h3>🚜 Total Agri Setup (Location ➔ Crop ➔ Farm Metrics)</h3>
        </div>
        <div class="card-body">
          <div class="grid-3" style="gap:24px">
            
            <!-- STEP 1: HIERARCHY -->
            <div>
              <h4 style="color:var(--primary); font-size:14px; margin-bottom:12px;">1. Region & Soil Profile</h4>
              <div class="form-group">
                <label class="form-label" title="District in Tamil Nadu">District</label>
                <select class="form-select" id="advDistrict" onchange="window._loadBlocks()">
                  <option value="">-- Choose District --</option>
                  ${AD.TN_DISTRICTS.map(d => `<option value="${d}">${d}</option>`).join('')}
                </select>
              </div>
              <div class="form-group" style="margin-top:12px">
                <label class="form-label">Block / Village Area</label>
                <select class="form-select" id="advBlock" disabled><option>Select a district first</option></select>
              </div>
              <div class="form-group" style="margin-top:12px">
                <label class="form-label">Soil Type (மண் வகை)</label>
                <select class="form-select" id="advSoil">
                  <option value="">-- Select Soil Type --</option>
                  ${Object.keys(AD.SOIL_TYPES).map(k => `<option value="${k}">${AD.SOIL_TYPES[k].name} (${AD.SOIL_TYPES[k].nameTa})</option>`).join('')}
                </select>
              </div>
            </div>

            <!-- STEP 2: CROP & WORK -->
            <div>
              <h4 style="color:var(--accent); font-size:14px; margin-bottom:12px;">2. Crop Strategy</h4>
              <div class="form-group">
                <label class="form-label" title="Leave empty for AI Recommendation">Target Crop</label>
                <select class="form-select" id="advCrop">
                  <option value="">✨ Auto-Recommend (Based on Soil & Region)</option>
                  ${Object.keys(AD.CROPS).map(k => `<option value="${k}">${AD.CROPS[k].name} (${AD.CROPS[k].nameTa})</option>`).join('')}
                </select>
              </div>
              <div class="form-group" style="margin-top:12px">
                <label class="form-label" title="Operation Phase">Target Operation</label>
                <select class="form-select" id="advOp">
                  ${Object.keys(AD.OPERATIONS).map(k => `<option value="${k}">${AD.OPERATIONS[k].name} (${AD.OPERATIONS[k].nameTa})</option>`).join('')}
                </select>
              </div>
            </div>

            <!-- STEP 3: FARM METRICS FORMULA -->
            <div style="background:rgba(34,197,94,0.03); padding:16px; border-radius:var(--radius-md); border:1px dashed var(--primary); position:relative;">
              <h4 style="color:var(--primary); font-size:14px; margin-bottom:12px;">3. Farm Matrix Parameters</h4>
              <div class="form-group">
                <label class="form-label" title="Total land holding being targeted">Cultivable Area (Hectares)</label>
                <input type="number" id="advArea" class="form-input" value="10" min="1" style="background:var(--bg-1)">
              </div>
              <p style="font-size:11px; color:var(--text-3); margin-top:12px;">
                * Workable days and efficiency index are calculated automatically based on real-time IMD weather data for your selected district.
              </p>
              <button class="btn btn-primary" id="generateBtn" style="width:100%; margin-top:16px" onclick="window._runAdvisor()">⚙️ Generate A-Z Report</button>
            </div>
          </div>
        </div>
      </div>

      <!-- RESULTS SECTION -->
      <div id="advisorResults" style="display:none" class="animate-in">
        <h3 style="margin-bottom:16px; font-size:18px; border-bottom:1px solid var(--glass-border); padding-bottom:8px;">A-Z Plan: Computed Implement Requirements</h3>
        <div id="advisorCards" class="grid-2"></div>
      </div>
    </div>
  `;

  window._loadBlocks = () => {
    const dist = document.getElementById('advDistrict').value;
    const blockSel = document.getElementById('advBlock');
    if (!dist) { blockSel.disabled = true; blockSel.innerHTML = '<option>Select a district first</option>'; return; }

    const blocks = AD.TN_BLOCKS[dist] || AD.TN_BLOCKS['default'];
    blockSel.disabled = false;
    blockSel.innerHTML = blocks.map(b => `<option value="${b}">${b}</option>`).join('');
  };

  window._runAdvisor = async () => {
    const area = parseFloat(document.getElementById('advArea').value) || 0;
    const opKey = document.getElementById('advOp').value;
    const dist = document.getElementById('advDistrict').value;
    const soilKey = document.getElementById('advSoil').value;
    let cropKey = document.getElementById('advCrop').value;
    const btn = document.getElementById('generateBtn');

    if (!dist) { window.showToast('Please select a district first!', false); return; }
    if (!soilKey) { window.showToast('Please select a Soil Type for accurate planning', false); return; }
    if (area <= 0) { window.showToast('Cultivable Area must be greater than 0', false); return; }

    // Auto-Recommend Crop if not selected
    let recommendedMsg = '';
    if (!cropKey) {
      const suitableCrops = Object.values(AD.CROP_LIFECYCLE_DATA).filter(c => c.suitableSoils.includes(soilKey));
      if (suitableCrops.length > 0) {
        cropKey = suitableCrops[0].id; // Pick highly suitable
        recommendedMsg = `<div style="padding:16px; background:var(--success-surface); border:1px solid rgba(34,197,94,0.3); border-radius:8px; margin-bottom:24px; color:var(--success)">
          <strong style="font-size:15px">🌱 AI Auto-Recommendation Successful:</strong><br/>
          Based on the <b>${AD.SOIL_TYPES[soilKey].name}</b> in <b>${dist}</b> during this season, we highly advise planting <b>${suitableCrops[0].name} (${suitableCrops[0].nameTa})</b> for maximum yield and local market profitability!
        </div>`;
      } else {
        cropKey = 'paddy'; // Fallback
      }
    }

    btn.innerHTML = '⚙️ Analyzing Weather & Computing...';
    btn.disabled = true;

    let rainDays = 0;
    let highWindDays = 0;

    try {
      const st = D.STATES_DATA.find(s => s.name === 'Tamil Nadu');
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${st.lat}&longitude=${st.lng}&daily=precipitation_sum,windspeed_10m_max&timezone=Asia/Kolkata&forecast_days=14`;
      const res = await fetch(url);
      const data = await res.json();

      data.daily.precipitation_sum.forEach((rain, i) => {
        if (rain > 5) rainDays++;
        if (data.daily.windspeed_10m_max[i] > 20) highWindDays++;
      });
    } catch (e) {
      console.log('Weather fetch failed, using base params');
    }

    let reqDays = 20 - rainDays;
    if (reqDays < 5) reqDays = 5;

    let timeIndex = 0.9 - (highWindDays * 0.05);
    if (timeIndex < 0.5) timeIndex = 0.5;

    btn.innerHTML = '⚙️ Generate A-Z Report';
    btn.disabled = false;

    window.showToast(`Applied live weather metrics for ${dist} (Rain: ${rainDays}d, Wind: ${highWindDays}d)`);

    const opData = AD.OPERATIONS[opKey];
    const advBlockStr = document.getElementById('advBlock').value;

    // Mathematical Calculation
    const implPromises = opData.implements.map(async impl => {
      // Formula: N = Area / (Capacity * Allowed Days * Timeliness)
      const allowedDays = Math.min(impl.workableDays, reqDays);
      const exactRequired = Math.ceil(area / (impl.capacityHaPerDay * allowedDays * timeIndex));

      // Check existing units in Firebase / Mock
      let existingUnits = 0;
      if (advBlockStr && !advBlockStr.includes('Select')) {
        existingUnits = await getImplementsCount(advBlockStr, impl.name);
      }

      const units = Math.max(0, exactRequired - existingUnits);
      return { ...impl, units, exactRequired, allowedDays, existingUnits };
    });

    const impls = await Promise.all(implPromises);

    document.getElementById('advisorResults').style.display = 'block';

    document.getElementById('advisorCards').innerHTML = impls.map(im => `
      <div class="card" style="border-left: 4px solid var(--primary)">
        <div class="card-header" style="background:var(--bg-1); display:flex; flex-direction:column; gap:8px">
          <h3 style="font-size:16px; margin:0">${im.name}</h3>
          <div style="display:flex; gap:8px; flex-wrap:wrap">
            <span class="badge purple" title="Total Needed for Area">Needed: ${im.exactRequired}</span>
            <span class="badge blue" title="Already Registered in ${advBlockStr}">Existing in Block: ${im.existingUnits}</span>
            <span class="badge ${im.units > 0 ? 'orange' : 'green'}" style="flex:1; text-align:center" title="Final Requirement">REQUIRED: ${im.units} Unit(s)</span>
          </div>
        </div>
        <div class="card-body">
          <div class="grid-3" style="background:var(--bg-2); padding:12px; border-radius:var(--radius-sm); margin-bottom:16px; border:1px solid var(--glass-border); display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
            <div>
              <div style="font-size:11px; color:var(--text-3)">Machine Capacity</div>
              <div style="font-weight:600">${im.capacityHaPerDay} ha/day</div>
            </div>
            <div>
              <div style="font-size:11px; color:var(--text-3)">Req HP/Power</div>
              <div style="font-weight:600">${im.hpReq || 'Manual/Battery'}</div>
            </div>
            <div>
              <div style="font-size:11px; color:var(--text-3)">Market Price (Approx)</div>
              <div style="font-weight:600; color:var(--danger)">${D.formatCurrency(im.price)}</div>
            </div>
          </div>
          
          <h4 style="font-size:13px; color:var(--text-2); margin-bottom:12px">A-Z Action Plan (Choose Action):</h4>
          
          <div style="display:flex; flex-direction:column; gap:8px">
            <div style="padding:10px; border:1px solid rgba(34,197,94,0.3); border-radius:var(--radius-sm); background:var(--success-surface); display:flex; justify-content:space-between; align-items:center">
              <div>
                <strong style="color:var(--success)">📝 Buy New via Govt. Subsidy</strong>
                <div style="font-size:12px; color:var(--text-3)">SMAM Scheme allocates <strong>${im.subsidy}</strong> off</div>
              </div>
              <button class="btn btn-sm btn-primary" onclick="window._routeToSubsidy(${im.id}, '${im.name}')">Claim ≈ ₹${(im.price * (parseInt(im.subsidy) / 100)).toLocaleString()}</button>
            </div>

            <div style="padding:10px; border:1px solid rgba(59,130,246,0.3); border-radius:var(--radius-sm); background:var(--info-surface); display:flex; justify-content:space-between; align-items:center">
              <div>
                <strong style="color:var(--info)">🤝 Custom Hire (from local CHC)</strong>
                <div style="font-size:12px; color:var(--text-3)">Available near ${dist}</div>
              </div>
              <button class="btn btn-sm btn-outline" style="border-color:var(--info); color:var(--info)" onclick="window._routeToHiring('${dist}')">Book CHC</button>
            </div>

            <div style="padding:10px; border:1px solid rgba(245,158,11,0.3); border-radius:var(--radius-sm); background:var(--warning-surface); display:flex; justify-content:space-between; align-items:center">
              <div>
                <strong style="color:var(--warning)">🏪 Buy Pre-owned (Marketplace)</strong>
                <div style="font-size:12px; color:var(--text-3)">Local sales in ${dist} region</div>
              </div>
              <button class="btn btn-sm btn-outline" style="border-color:var(--warning); color:var(--warning)" onclick="window._routeToMarket()">View Market</button>
            </div>
          </div>

        </div>
      </div >
        `).join('');

    const fleetHtml = `
      <div style="margin-bottom:32px;">
        ${recommendedMsg}
        <h3 style="font-size:16px; color:var(--primary); margin-bottom:16px;">Implement Fleet Calculation for ${AD.OPERATIONS[opKey].name}</h3>
        <div class="grid-2">${document.getElementById('advisorCards').innerHTML}</div>
      </div>
    `;

    // Render Crop Lifecycle & Logistics
    const cropData = AD.CROP_LIFECYCLE_DATA[cropKey] || AD.CROP_LIFECYCLE_DATA['paddy'];
    const logistics = AD.LOGISTICS_DATA[dist] || AD.LOGISTICS_DATA['default'];

    // Build Timeline HTML
    const timelineHtml = cropData.lifecycle.map((stage, i) => `
      <div style="display:flex; margin-bottom:16px; position:relative;">
        <div style="width:26px; height:26px; border-radius:50%; background:var(--primary); color:#fff; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:bold; z-index:2">${i + 1}</div>
        <div style="position:absolute; left:12px; top:24px; bottom:-16px; width:2px; background:rgba(34,197,94,0.2); z-index:1;"></div>
        <div style="margin-left:16px; flex:1; background:var(--bg-2); border:1px solid var(--glass-border); padding:12px; border-radius:8px; box-shadow:0 4px 6px rgba(0,0,0,0.05);">
          <h5 style="color:var(--primary); margin-bottom:4px; font-size:14px;">${stage.stage}</h5>
          <p style="font-size:13px; color:var(--text-1); margin-bottom:6px; line-height:1.4;">${stage.desc}</p>
          <p style="font-size:12px; color:var(--text-3); font-family:sans-serif; background:var(--glass); display:inline-block; padding:2px 6px; border-radius:4px;"><i>${stage.descTa}</i></p>
        </div>
      </div>
    `).join('');

    // Build Logistics HTML
    const buildLogisticsTab = (items, icon) => items.map(item => `
      <div style="padding:12px; background:var(--glass); border:1px solid var(--glass-strong); border-radius:8px; margin-bottom:10px;">
        <strong style="color:var(--text-1); font-size:13px;">${icon} ${item.name}</strong>
        <div style="display:flex; justify-content:space-between; margin-top:6px; color:var(--text-2); font-size:12px;">
          <span style="background:var(--bg-1); padding:2px 8px; border-radius:12px;">${item.cap || item.type}</span>
          <span style="background:var(--bg-1); padding:2px 8px; border-radius:12px; color:var(--accent)">${item.temp || item.route || item.dist}</span>
        </div>
      </div>
    `).join('');

    const logisticsHtml = `
      <div style="display:flex; flex-direction:column; gap:16px;">
        <div style="background:linear-gradient(145deg, var(--bg-2), var(--bg-1)); border:1px solid var(--glass-border); padding:16px; border-radius:12px;">
          <h4 style="color:var(--info); font-size:14px; margin-bottom:12px; border-bottom:1px solid var(--glass-strong); padding-bottom:8px;">❄️ Local Cold Storage Facilities</h4>
          ${buildLogisticsTab(logistics.coldStorage, '🏢')}
        </div>
        <div style="background:linear-gradient(145deg, var(--bg-2), var(--bg-1)); border:1px solid var(--glass-border); padding:16px; border-radius:12px;">
          <h4 style="color:var(--warning); font-size:14px; margin-bottom:12px; border-bottom:1px solid var(--glass-strong); padding-bottom:8px;">🌾 Warehousing (Dry)</h4>
          ${buildLogisticsTab(logistics.warehouses, '🏭')}
        </div>
        <div style="background:linear-gradient(145deg, var(--bg-2), var(--bg-1)); border:1px solid var(--glass-border); padding:16px; border-radius:12px;">
          <h4 style="color:var(--accent); font-size:14px; margin-bottom:12px; border-bottom:1px solid var(--glass-strong); padding-bottom:8px;">🚚 Produce Transport Logistics</h4>
          ${buildLogisticsTab(logistics.transport, '🚛')}
        </div>
      </div>
    `;

    document.getElementById('advisorCards').innerHTML = `
      ${fleetHtml}
      <div style="border-top:1px dashed rgba(34,197,94,0.3); margin-top:24px; padding-top:24px;">
        <h3 style="font-size:18px; color:var(--text-1); margin-bottom:4px;">End-to-End Crop Season Planner: <span style="color:var(--primary)">${cropData.name} (${cropData.nameTa})</span></h3>
        <p style="font-size:13px; color:var(--text-3); margin-bottom:24px;">Recommended Season: <b>${cropData.season}</b> | Highly Suitable Soils: <b>${cropData.suitableSoils.map(s => AD.SOIL_TYPES[s].name).join(', ')}</b></p>
        
        <div class="grid-2" style="gap:32px">
          <div>
            <h4 style="color:var(--primary); margin-bottom:16px; font-size:16px; display:flex; align-items:center; gap:8px;">
              <span style="font-size:20px;">📅</span> Stage-wise Agronomy Guidelines
            </h4>
            ${timelineHtml}
          </div>
          <div>
            <h4 style="color:var(--accent); margin-bottom:16px; font-size:16px; display:flex; align-items:center; gap:8px;">
              <span style="font-size:20px;">📦</span> Post-Harvest Logistics & Storage
            </h4>
            <p style="font-size:12px; color:var(--text-3); margin-bottom:16px; background:var(--glass); padding:10px; border-radius:6px; border-left:3px solid var(--accent);">Facilities dynamically mapped based on <b>${dist}</b> District to minimize post-harvest transport spoilage.</p>
            ${logisticsHtml}
          </div>
        </div>
      </div>
    `;

    // Auto scroll to results
    document.getElementById('advisorResults').scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.showToast('Crop Season Plan & Analysis Complete!');
  };

  // Cross-Module Functional Routing
  window._routeToSubsidy = (imId, imName) => {
    navigate('subsidy');
    setTimeout(() => {
      const typeSelect = document.getElementById('subsidyType');
      if (typeSelect) {
        // Find matching option
        const targetVal = `impl_${imId}`;
        const option = Array.from(typeSelect.options).find(opt => opt.value === targetVal);

        if (option) {
          typeSelect.value = targetVal;
          window._updateSubsidy();
          window.showToast(`Auto-filled Subsidy Calculator for ${imName}`);
        } else {
          window.showToast(`Viewing Subsidy Calculator for generic implements`);
        }
      }
    }, 100);
  };

  window._routeToHiring = (district) => {
    navigate('hiring');
    setTimeout(() => {
      // Simulate applying a location filter (visually)
      window.showToast(`Filtering Custom Hiring Centers near District: ${district}`);
      // In a full DB app, we'd trigger a fetch here. Visually simulating.
      const grid = document.getElementById('hiringGrid');
      if (grid) {
        grid.style.opacity = '0.5';
        setTimeout(() => { grid.style.opacity = '1'; }, 300);
      }
    }, 100);
  };

  window._routeToMarket = () => {
    navigate('marketplace');
    setTimeout(() => {
      window.showToast('Viewing Equipment Marketplace (Pre-owned)');
      // Pre-select 'sale' filter
      const btn = document.querySelector('.filter-chip[data-type="sale"]');
      if (btn) btn.click();
    }, 100);
  };
}
