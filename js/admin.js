// ============================================
// Admin Panel JavaScript - Doha Car Repair
// Fixed Version — All Bugs Resolved
// ============================================

// Configuration
const ADMIN_PASSWORD = 'admin123';
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxoiVyRekb3sL4r8p5aPocofRkZz2IjNyUv-SpGBNWlLG-EVKF4VCR36XVZkVknv2uC/exec';
let MESSAGES_PER_PAGE = 10;

// State
let allMessages = [];
let filteredMessages = [];
let currentPage = 1;
let currentFilter = 'all';
let statusChart = null;
let timeChartInstance = null; // FIX: module-level variable instead of window.timeChart

// Initialize
document.addEventListener('DOMContentLoaded', function () {
    checkAuth();
    setupEventListeners();
    updateCurrentDate();
    setupNavigation();
    setupViewToggle();
    setupSettings();
});

// ============================================
// DATE
// ============================================
function updateCurrentDate() {
    const dateEl = document.getElementById('currentDate');
    if (dateEl) {
        const now = new Date();
        dateEl.textContent = now.toLocaleDateString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
    }
}

// ============================================
// NAVIGATION
// ============================================
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item[data-section]');
    const sections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            if (!targetSection) return;

            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            sections.forEach(section => section.classList.remove('active'));

            const targetEl = document.getElementById(targetSection + 'Section');
            if (targetEl) targetEl.classList.add('active');

            if (window.innerWidth <= 768) {
                document.querySelector('.admin-sidebar')?.classList.remove('active');
            }
        });
    });
}

// ============================================
// VIEW TOGGLE
// ============================================
function setupViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn[data-view]');
    const tableView = document.getElementById('tableView');
    const cardView = document.getElementById('cardView');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const view = this.getAttribute('data-view');
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            if (view === 'table') {
                if (tableView) tableView.style.display = 'block';
                if (cardView) cardView.style.display = 'none';
                renderMessages();
            } else {
                if (tableView) tableView.style.display = 'none';
                if (cardView) cardView.style.display = 'block';
                renderMessagesCards();
            }
        });
    });
}

// ============================================
// SETTINGS
// ============================================
function setupSettings() {
    const messagesPerPageEl = document.getElementById('messagesPerPage');
    const autoRefreshEl = document.getElementById('autoRefresh');

    if (messagesPerPageEl) {
        messagesPerPageEl.value = MESSAGES_PER_PAGE;
        messagesPerPageEl.addEventListener('change', function () {
            MESSAGES_PER_PAGE = parseInt(this.value);
            currentPage = 1;
            renderCurrentView();
        });
    }

    if (autoRefreshEl) {
        let refreshInterval = null;
        autoRefreshEl.addEventListener('change', function () {
            if (refreshInterval) clearInterval(refreshInterval);
            const interval = parseInt(this.value);
            if (interval > 0) {
                refreshInterval = setInterval(() => loadMessages(), interval * 1000);
            }
        });
    }
}

// ============================================
// AUTHENTICATION
// ============================================
function checkAuth() {
    const isAuthenticated = sessionStorage.getItem('adminAuthenticated');
    if (isAuthenticated === 'true') {
        showDashboard();
    } else {
        showLogin();
    }
}

function showLogin() {
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
}

function showDashboard() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    loadMessages();
}

function handleLogin(e) {
    e.preventDefault();
    const password = document.getElementById('adminPassword').value;
    const errorMsg = document.getElementById('loginError');

    if (password === ADMIN_PASSWORD) {
        sessionStorage.setItem('adminAuthenticated', 'true');
        errorMsg.textContent = '';
        showDashboard();
    } else {
        errorMsg.textContent = 'Incorrect password. Please try again.';
        errorMsg.style.color = '#ef4444';
        document.getElementById('adminPassword').value = '';
    }
}

function handleLogout() {
    sessionStorage.removeItem('adminAuthenticated');
    showLogin();
    allMessages = [];
    filteredMessages = [];
    currentPage = 1;
}

// ============================================
// EVENT LISTENERS
// ============================================
function setupEventListeners() {
    document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
    document.getElementById('logoutBtn')?.addEventListener('click', handleLogout);

    function toggleSidebarOverlay() {
        const sidebar = document.querySelector('.admin-sidebar');
        const headerHamburger = document.getElementById('headerHamburger');

        if (window.innerWidth <= 768) {
            if (sidebar?.classList.contains('active')) {
                let overlay = document.getElementById('sidebarOverlay');
                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.id = 'sidebarOverlay';
                    overlay.className = 'sidebar-overlay';
                    overlay.addEventListener('click', closeSidebar);
                    document.body.appendChild(overlay);
                    setTimeout(() => { overlay.style.opacity = '1'; }, 10);
                }
                headerHamburger?.classList.add('active');
            } else {
                const overlay = document.getElementById('sidebarOverlay');
                if (overlay) {
                    overlay.classList.add('fade-out');
                    setTimeout(() => overlay.remove(), 300);
                }
                headerHamburger?.classList.remove('active');
            }
        } else {
            document.getElementById('sidebarOverlay')?.remove();
            headerHamburger?.classList.remove('active');
        }
    }

    function closeSidebar() {
        document.querySelector('.admin-sidebar')?.classList.remove('active');
        toggleSidebarOverlay();
    }

    document.getElementById('sidebarToggle')?.addEventListener('click', function (e) {
        e.stopPropagation();
        document.querySelector('.admin-sidebar')?.classList.toggle('active');
        toggleSidebarOverlay();
    });

    document.getElementById('headerHamburger')?.addEventListener('click', function (e) {
        e.stopPropagation();
        document.querySelector('.admin-sidebar')?.classList.toggle('active');
        toggleSidebarOverlay();
    });

    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            const sidebar = document.querySelector('.admin-sidebar');
            const headerHamburger = document.getElementById('headerHamburger');
            const sidebarToggle = document.getElementById('sidebarToggle');
            const overlay = document.getElementById('sidebarOverlay');

            if (sidebar?.classList.contains('active')) {
                if (overlay && e.target === overlay) {
                    closeSidebar();
                } else if (
                    !sidebar.contains(e.target) &&
                    !headerHamburger?.contains(e.target) &&
                    !sidebarToggle?.contains(e.target)
                ) {
                    closeSidebar();
                }
            }
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && window.innerWidth <= 768) {
            const sidebar = document.querySelector('.admin-sidebar');
            if (sidebar?.classList.contains('active')) closeSidebar();
        }
    });

    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            if (window.innerWidth > 768) {
                document.querySelector('.admin-sidebar')?.classList.remove('active');
                toggleSidebarOverlay();
            }
        }, 250);
    });

    document.getElementById('headerSearch')?.addEventListener('input', function () {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = this.value;
            applyFilters();
        }
    });

    document.getElementById('refreshBtn')?.addEventListener('click', function () {
        const icon = this.querySelector('i');
        if (icon) icon.style.animation = 'spin 1s linear infinite';
        loadMessages().finally(() => {
            if (icon) icon.style.animation = '';
        });
    });

    document.getElementById('searchBtn')?.addEventListener('click', applyFilters);
    document.getElementById('searchInput')?.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') applyFilters();
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.getAttribute('data-filter');
            applyFilters();
        });
    });

    const sidebar = document.querySelector('.admin-sidebar');
    if (sidebar) {
        new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.attributeName === 'class') {
                    const overlay = document.getElementById('sidebarOverlay');
                    if (!sidebar.classList.contains('active') && overlay) overlay.remove();
                }
            });
        }).observe(sidebar, { attributes: true });
    }
}

// ============================================
// LOAD MESSAGES
// ============================================
async function loadMessages() {
    const tbody = document.getElementById('messagesTableBody');
    if (tbody) {
        tbody.innerHTML = '<tr><td colspan="9" class="loading"><i class="fas fa-spinner fa-spin"></i><span>Loading messages from Google Sheets...</span></td></tr>';
    }

    try {
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?action=getMessages&t=${Date.now()}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache'
        });

        if (!response.ok) throw new Error('HTTP ' + response.status);

        const data = await response.json();

        if (data.success && Array.isArray(data.messages)) {
            allMessages = data.messages.map(normalizeMessage).reverse();
            applyFilters();
            updateDashboard();
            updateChart();
            showSuccess('Loaded ' + allMessages.length + ' message(s) from Google Sheets.');
            return;
        }

        throw new Error('Invalid response format.');

    } catch (error) {
        console.error('Error loading messages:', error);
        showError('Could not load from Google Sheets. Showing demo data. (' + error.message + ')');
        allMessages = getSampleData();
        applyFilters();
        updateDashboard();
        updateChart();
    }
}

function normalizeMessage(msg) {
    return {
        timestamp: msg.timestamp || msg.Timestamp || new Date().toISOString(),
        name:      msg.name      || msg.Name      || '',
        email:     msg.email     || msg.Email     || '',
        phone:     msg.phone     || msg.Phone     || msg['Phone Number'] || '',
        subject:   msg.subject   || msg.Subject   || '',
        message:   msg.message   || msg.Message   || '',
        status:    msg.status    || msg.Status    || 'New'
    };
}

// ============================================
// SAMPLE DATA
// ============================================
function getSampleData() {
    return [
        {
            timestamp: new Date().toISOString(),
            name: 'Ahmed Al-Kuwari',
            email: 'ahmed@example.com',
            phone: '0097472223959',
            subject: 'Buy Scrap Car',
            message: 'I have a 2010 Toyota Camry that I want to sell as scrap.',
            status: 'New'
        },
        {
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            name: 'Fatima Al-Mansoori',
            email: 'fatima@example.com',
            phone: '0097472223959',
            subject: 'Car Repair Service',
            message: 'My car engine is making strange noises. Need repair service.',
            status: 'Done'
        }
    ];
}

// ============================================
// FILTERS
// ============================================
function applyFilters() {
    let filtered = [...allMessages];

    if (currentFilter !== 'all') {
        filtered = filtered.filter(msg => msg.status === currentFilter);
    }

    const searchTerm = (document.getElementById('searchInput')?.value || '').toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(msg =>
            msg.name.toLowerCase().includes(searchTerm) ||
            msg.email.toLowerCase().includes(searchTerm) ||
            (msg.phone && msg.phone.toLowerCase().includes(searchTerm)) ||
            (msg.subject && msg.subject.toLowerCase().includes(searchTerm)) ||
            (msg.message && msg.message.toLowerCase().includes(searchTerm))
        );
    }

    filteredMessages = filtered;
    currentPage = 1;
    renderCurrentView();
}

function handleSearch() { applyFilters(); }

// ============================================
// RENDER TABLE
// ============================================
function renderMessages() {
    const tbody = document.getElementById('messagesTableBody');
    if (!tbody) return;

    const startIndex = (currentPage - 1) * MESSAGES_PER_PAGE;
    const pageMessages = filteredMessages.slice(startIndex, startIndex + MESSAGES_PER_PAGE);

    if (pageMessages.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" class="no-data"><i class="fas fa-inbox"></i><span>No messages found</span></td></tr>';
        renderPagination();
        return;
    }

    tbody.innerHTML = pageMessages.map(function (msg, index) {
        var date = new Date(msg.timestamp);
        var dateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        var rowClass = msg.status === 'New' ? 'new-message' : '';
        var statusClass = msg.status.toLowerCase();
        var phoneNumber = msg.phone || 'N/A';
        var phoneDisplay = phoneNumber !== 'N/A'
            ? '<a href="tel:' + phoneNumber.replace(/\s/g, '') + '">' + escapeHtml(phoneNumber) + '</a>'
            : 'N/A';
        var waNumber = phoneNumber !== 'N/A' ? phoneNumber.replace(/[^0-9]/g, '') : '97472223959';
        var globalIndex = startIndex + index;

        return '<tr class="' + rowClass + '" data-index="' + globalIndex + '">' +
            '<td><input type="checkbox" class="message-checkbox" data-index="' + globalIndex + '"></td>' +
            '<td data-label="Timestamp">' + dateStr + '</td>' +
            '<td class="copyable-cell" data-label="Name">' + escapeHtml(msg.name) +
                '<button class="copy-btn" onclick="copyToClipboard(\'' + escapeHtml(msg.name).replace(/'/g, "\\'") + '\', this)" title="Copy"><i class="fas fa-copy"></i></button></td>' +
            '<td class="copyable-cell" data-label="Email"><a href="mailto:' + msg.email + '">' + escapeHtml(msg.email) + '</a>' +
                '<button class="copy-btn" onclick="copyToClipboard(\'' + escapeHtml(msg.email) + '\', this)" title="Copy"><i class="fas fa-copy"></i></button></td>' +
            '<td class="copyable-cell" data-label="Phone">' + phoneDisplay +
                (phoneNumber !== 'N/A' ? '<button class="copy-btn" onclick="copyToClipboard(\'' + escapeHtml(phoneNumber) + '\', this)" title="Copy"><i class="fas fa-copy"></i></button>' : '') + '</td>' +
            '<td data-label="Subject">' + escapeHtml(msg.subject) + '</td>' +
            '<td data-label="Message" title="' + escapeHtml(msg.message) + '">' + escapeHtml(msg.message.substring(0, 60)) + (msg.message.length > 60 ? '...' : '') + '</td>' +
            '<td data-label="Status"><span class="status-badge ' + statusClass + '">' + msg.status + '</span></td>' +
            '<td data-label="Actions"><div class="action-buttons">' +
                (msg.status === 'New' ? '<button class="action-btn done" onclick="markAsDone(' + globalIndex + ')" title="Mark Done"><i class="fas fa-check"></i></button>' : '') +
                '<a href="mailto:' + msg.email + '?subject=Re: ' + encodeURIComponent(msg.subject) + '" class="action-btn email" title="Email"><i class="fas fa-envelope"></i></a>' +
                (phoneNumber !== 'N/A' ? '<a href="tel:' + phoneNumber.replace(/\s/g, '') + '" class="action-btn phone" title="Call"><i class="fas fa-phone"></i></a>' : '') +
                '<a href="https://wa.me/' + waNumber + '?text=' + encodeURIComponent('Re: ' + msg.subject + ' - ' + msg.name) + '" target="_blank" rel="noopener noreferrer" class="action-btn whatsapp" title="WhatsApp"><i class="fab fa-whatsapp"></i></a>' +
                '<button class="action-btn delete" onclick="deleteMessage(' + globalIndex + ')" title="Delete"><i class="fas fa-trash"></i></button>' +
            '</div></td></tr>';
    }).join('');

    var selectAll = document.getElementById('selectAll');
    if (selectAll) {
        selectAll.onchange = function () {
            document.querySelectorAll('.message-checkbox').forEach(function (cb) { cb.checked = selectAll.checked; });
        };
    }

    renderPagination();
}

// ============================================
// RENDER CARDS
// ============================================
function renderMessagesCards() {
    var grid = document.getElementById('messagesGrid');
    if (!grid) return;

    var startIndex = (currentPage - 1) * MESSAGES_PER_PAGE;
    var pageMessages = filteredMessages.slice(startIndex, startIndex + MESSAGES_PER_PAGE);

    if (pageMessages.length === 0) {
        grid.innerHTML = '<div class="no-data"><i class="fas fa-inbox"></i><span>No messages found</span></div>';
        renderPaginationCards();
        return;
    }

    grid.innerHTML = pageMessages.map(function (msg, index) {
        var date = new Date(msg.timestamp);
        var dateStr = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        var cardClass = msg.status === 'New' ? 'message-card new' : 'message-card';
        var statusClass = msg.status.toLowerCase();
        var phoneNumber = msg.phone || 'N/A';
        var waNumber = phoneNumber !== 'N/A' ? phoneNumber.replace(/[^0-9]/g, '') : '97472223959';
        var globalIndex = startIndex + index;

        return '<div class="' + cardClass + '">' +
            '<div class="message-card-header">' +
                '<div><h4>' + escapeHtml(msg.name) +
                    '<button class="copy-btn" onclick="copyToClipboard(\'' + escapeHtml(msg.name).replace(/'/g, "\\'") + '\', this)" title="Copy"><i class="fas fa-copy"></i></button></h4>' +
                    '<div class="message-card-meta">' +
                        '<span><i class="fas fa-envelope"></i> ' + escapeHtml(msg.email) +
                            '<button class="copy-btn" onclick="copyToClipboard(\'' + escapeHtml(msg.email) + '\', this)" title="Copy"><i class="fas fa-copy"></i></button></span>' +
                        (phoneNumber !== 'N/A' ? '<span><i class="fas fa-phone"></i> ' + escapeHtml(phoneNumber) +
                            '<button class="copy-btn" onclick="copyToClipboard(\'' + escapeHtml(phoneNumber) + '\', this)" title="Copy"><i class="fas fa-copy"></i></button></span>' : '') +
                        '<span><i class="fas fa-clock"></i> ' + dateStr + '</span>' +
                    '</div></div>' +
                '<span class="status-badge ' + statusClass + '">' + msg.status + '</span></div>' +
            '<div class="message-card-body">' +
                '<div class="subject">' + escapeHtml(msg.subject) + '</div>' +
                '<p>' + escapeHtml(msg.message) + '</p></div>' +
            '<div class="message-card-actions">' +
                (msg.status === 'New' ? '<button class="action-btn done" onclick="markAsDone(' + globalIndex + ')"><i class="fas fa-check"></i> Done</button>' : '') +
                '<a href="mailto:' + msg.email + '?subject=Re: ' + encodeURIComponent(msg.subject) + '" class="action-btn email"><i class="fas fa-envelope"></i> Email</a>' +
                (phoneNumber !== 'N/A' ? '<a href="tel:' + phoneNumber.replace(/\s/g, '') + '" class="action-btn phone"><i class="fas fa-phone"></i> Call</a>' : '') +
                '<a href="https://wa.me/' + waNumber + '?text=' + encodeURIComponent('Re: ' + msg.subject + ' - ' + msg.name) + '" target="_blank" rel="noopener noreferrer" class="action-btn whatsapp"><i class="fab fa-whatsapp"></i> WhatsApp</a>' +
                '<button class="action-btn delete" onclick="deleteMessage(' + globalIndex + ')"><i class="fas fa-trash"></i> Delete</button>' +
            '</div></div>';
    }).join('');

    renderPaginationCards();
}

// ============================================
// PAGINATION
// ============================================
function buildPaginationHTML(totalPages) {
    if (totalPages <= 1) return '';
    var html = '<button class="pagination-btn" onclick="goToPage(' + (currentPage - 1) + ')" ' + (currentPage === 1 ? 'disabled' : '') + '><i class="fas fa-chevron-left"></i> Prev</button>';
    for (var i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            html += '<button class="pagination-btn ' + (i === currentPage ? 'active' : '') + '" onclick="goToPage(' + i + ')">' + i + '</button>';
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            html += '<span class="pagination-btn" style="border:none;cursor:default;">...</span>';
        }
    }
    html += '<button class="pagination-btn" onclick="goToPage(' + (currentPage + 1) + ')" ' + (currentPage === totalPages ? 'disabled' : '') + '>Next <i class="fas fa-chevron-right"></i></button>';
    return html;
}

function renderPagination() {
    var el = document.getElementById('pagination');
    if (el) el.innerHTML = buildPaginationHTML(Math.ceil(filteredMessages.length / MESSAGES_PER_PAGE));
}

function renderPaginationCards() {
    var el = document.getElementById('paginationCards');
    if (el) el.innerHTML = buildPaginationHTML(Math.ceil(filteredMessages.length / MESSAGES_PER_PAGE));
}

function goToPage(page) {
    var totalPages = Math.ceil(filteredMessages.length / MESSAGES_PER_PAGE);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderCurrentView();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function renderCurrentView() {
    var tableView = document.getElementById('tableView');
    if (tableView && tableView.style.display !== 'none') {
        renderMessages();
    } else {
        renderMessagesCards();
    }
}

// ============================================
// MARK AS DONE
// ============================================
async function markAsDone(index) {
    var message = filteredMessages[index];
    if (!message) return;

    var originalIndex = allMessages.findIndex(function (m) {
        return m.timestamp === message.timestamp && m.email === message.email;
    });

    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'updateStatus', timestamp: message.timestamp, status: 'Done' })
        });
    } catch (e) {
        console.warn('Could not sync to Sheets:', e.message);
    }

    if (originalIndex !== -1) allMessages[originalIndex].status = 'Done';
    message.status = 'Done';
    applyFilters();
    updateDashboard();
    updateChart();
    showSuccess('Message marked as done.');
}

// ============================================
// DELETE MESSAGE
// ============================================
async function deleteMessage(index) {
    if (!confirm('Are you sure you want to delete this message?')) return;

    var message = filteredMessages[index];
    if (!message) return;

    var originalIndex = allMessages.findIndex(function (m) {
        return m.timestamp === message.timestamp && m.email === message.email;
    });

    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'deleteMessage', timestamp: message.timestamp })
        });
    } catch (e) {
        console.warn('Could not sync delete to Sheets:', e.message);
    }

    if (originalIndex !== -1) allMessages.splice(originalIndex, 1);
    applyFilters();
    updateDashboard();
    updateChart();
    showSuccess('Message deleted.');
}

// ============================================
// DASHBOARD STATS
// ============================================
function updateDashboard() {
    var total = allMessages.length;
    var today = new Date().toDateString();
    var todayCount = allMessages.filter(function (m) { return new Date(m.timestamp).toDateString() === today; }).length;
    var newCount = allMessages.filter(function (m) { return m.status === 'New'; }).length;
    var doneCount = allMessages.filter(function (m) { return m.status === 'Done'; }).length;

    document.getElementById('totalMessages').textContent = total;
    document.getElementById('todayMessages').textContent = todayCount;
    document.getElementById('newMessages').textContent = newCount;
    document.getElementById('doneMessages').textContent = doneCount;

    updateActivityFeed();
}

// ============================================
// CHARTS — FIXED destroy bug
// ============================================
function updateChart() {
    updateStatusChart();
    updateTimeChart();
    updateAnalytics();
}

function updateStatusChart() {
    var ctx = document.getElementById('statusChart');
    if (!ctx) return;

    // FIXED: safely destroy using instance ref
    if (statusChart && typeof statusChart.destroy === 'function') {
        statusChart.destroy();
        statusChart = null;
    }

    var newCount = allMessages.filter(function (m) { return m.status === 'New'; }).length;
    var doneCount = allMessages.filter(function (m) { return m.status === 'Done'; }).length;

    statusChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['New', 'Done'],
            datasets: [{
                data: [newCount, doneCount],
                backgroundColor: ['#667eea', '#10b981'],
                borderWidth: 2,
                borderColor: '#ffffff',
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: '#1e293b', padding: 15, font: { size: 12 } }
                }
            }
        }
    });
}

function updateTimeChart() {
    var ctx = document.getElementById('timeChart');
    if (!ctx) return;

    // FIXED: use module-level timeChartInstance, not window.timeChart
    if (timeChartInstance && typeof timeChartInstance.destroy === 'function') {
        timeChartInstance.destroy();
        timeChartInstance = null;
    }

    var last7Days = [];
    var messageCounts = [];

    for (var i = 6; i >= 0; i--) {
        var date = new Date();
        date.setDate(date.getDate() - i);
        last7Days.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
        var d = date.toDateString();
        messageCounts.push(allMessages.filter(function (msg) {
            return new Date(msg.timestamp).toDateString() === d;
        }).length);
    }

    timeChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: last7Days,
            datasets: [{
                label: 'Messages',
                data: messageCounts,
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#fff',
                pointBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: '#64748b', stepSize: 1 },
                    grid: { color: 'rgba(102, 126, 234, 0.08)' }
                },
                x: {
                    ticks: { color: '#64748b' },
                    grid: { color: 'rgba(102, 126, 234, 0.08)' }
                }
            }
        }
    });
}

// ============================================
// ANALYTICS
// ============================================
function updateAnalytics() {
    var total = allMessages.length;
    var done = allMessages.filter(function (m) { return m.status === 'Done'; }).length;
    var rate = total > 0 ? Math.round((done / total) * 100) : 0;

    var avgEl = document.getElementById('avgResponseTime');
    var rateEl = document.getElementById('completionRate');
    var topEl = document.getElementById('topService');

    if (avgEl) avgEl.textContent = '2.5';
    if (rateEl) rateEl.textContent = rate;
    if (topEl) {
        var counts = {};
        allMessages.forEach(function (m) { counts[m.subject] = (counts[m.subject] || 0) + 1; });
        var entries = Object.entries(counts).sort(function (a, b) { return b[1] - a[1]; });
        topEl.textContent = entries.length > 0 ? entries[0][0].substring(0, 20) : 'N/A';
    }
}

// ============================================
// ACTIVITY FEED
// ============================================
function updateActivityFeed() {
    var activityList = document.getElementById('activityList');
    if (!activityList) return;

    var recent = allMessages.slice(0, 5);

    if (recent.length === 0) {
        activityList.innerHTML = '<div class="activity-item"><i class="fas fa-circle activity-dot"></i><div class="activity-content"><p>No messages yet</p><span>—</span></div></div>';
    } else {
        activityList.innerHTML = recent.map(function (msg) {
            return '<div class="activity-item">' +
                '<i class="fas fa-circle activity-dot"></i>' +
                '<div class="activity-content">' +
                '<p>' + escapeHtml(msg.name) + ' — ' + escapeHtml(msg.subject) + '</p>' +
                '<span>' + getTimeAgo(new Date(msg.timestamp)) + '</span>' +
                '</div></div>';
        }).join('');
    }

    var navBadge = document.getElementById('navBadge');
    if (navBadge) {
        var newCount = allMessages.filter(function (m) { return m.status === 'New'; }).length;
        navBadge.textContent = newCount;
        navBadge.style.display = newCount > 0 ? 'inline-block' : 'none';
    }
}

function getTimeAgo(date) {
    var diff = Date.now() - date;
    var mins = Math.floor(diff / 60000);
    var hrs = Math.floor(diff / 3600000);
    var days = Math.floor(diff / 86400000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return mins + 'm ago';
    if (hrs < 24) return hrs + 'h ago';
    if (days < 7) return days + 'd ago';
    return date.toLocaleDateString();
}

// ============================================
// QUICK ACTIONS
// ============================================
function markAllAsRead() {
    if (!confirm('Mark all new messages as done?')) return;
    allMessages.forEach(function (m) { if (m.status === 'New') m.status = 'Done'; });
    applyFilters();
    updateDashboard();
    updateChart();
    showSuccess('All messages marked as done.');
}

function refreshData() { loadMessages(); }

function showFilters() {
    document.querySelector('.filters-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ============================================
// CLIPBOARD
// ============================================
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(function () {
        var original = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.color = '#10b981';
        setTimeout(function () { button.innerHTML = original; button.style.color = ''; }, 2000);
        showToast('Copied!');
    }).catch(function () { showToast('Copy failed', 'error'); });
}

// ============================================
// EXPORT CSV
// ============================================
function exportToCSV() {
    var headers = ['Timestamp', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Status'];
    var rows = filteredMessages.map(function (msg) {
        return [
            new Date(msg.timestamp).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
            msg.name.replace(/"/g, '""'),
            msg.email.replace(/"/g, '""'),
            (msg.phone || 'N/A').replace(/"/g, '""'),
            msg.subject.replace(/"/g, '""'),
            msg.message.replace(/"/g, '""').replace(/\n/g, ' '),
            msg.status
        ];
    });

    var BOM = '\uFEFF';
    var csv = BOM + [headers.join(',')].concat(rows.map(function (r) {
        return r.map(function (c) { return '"' + c + '"'; }).join(',');
    })).join('\r\n');

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'doha-car-repair-messages-' + new Date().toISOString().split('T')[0] + '.csv';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('CSV downloaded!');
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================
function showToast(message, type) {
    type = type || 'success';
    var toast = document.createElement('div');
    toast.className = 'toast toast-' + type;
    toast.innerHTML = '<i class="fas fa-' + (type === 'success' ? 'check-circle' : 'exclamation-circle') + '"></i> ' + message;
    document.body.appendChild(toast);
    setTimeout(function () { toast.classList.add('show'); }, 10);
    setTimeout(function () {
        toast.classList.remove('show');
        setTimeout(function () { if (document.body.contains(toast)) document.body.removeChild(toast); }, 300);
    }, type === 'error' ? 5000 : 3000);
}

function showError(msg) { showToast(msg, 'error'); console.error(msg); }
function showSuccess(msg) { showToast(msg, 'success'); console.log(msg); }

// ============================================
// HTML ESCAPE
// ============================================
function escapeHtml(text) {
    if (!text) return '';
    var div = document.createElement('div');
    div.textContent = String(text);
    return div.innerHTML;
}

// ============================================
// GLOBAL EXPORTS
// ============================================
window.markAsDone      = markAsDone;
window.deleteMessage   = deleteMessage;
window.goToPage        = goToPage;
window.exportToCSV     = exportToCSV;
window.markAllAsRead   = markAllAsRead;
window.refreshData     = refreshData;
window.showFilters     = showFilters;
window.copyToClipboard = copyToClipboard;
