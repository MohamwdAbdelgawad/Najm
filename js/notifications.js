document.addEventListener('DOMContentLoaded', function() {
    // Initialize notifications system
    initNotifications();
});

// Initialize notifications
function initNotifications() {
    const notificationsBtn = document.getElementById('notifications-btn');
    
    if (notificationsBtn) {
        // Toggle notifications dropdown on click
        notificationsBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdown = this.nextElementSibling;
            
            if (dropdown.style.display === 'block') {
                dropdown.style.display = 'none';
            } else {
                dropdown.style.display = 'block';
                
                // Mark notifications as read
                updateNotificationBadge(0);
                
                // Save read status to local storage
                saveNotificationsReadStatus();
            }
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            const dropdown = document.querySelector('.notifications-dropdown');
            if (dropdown && dropdown.style.display === 'block' && !dropdown.contains(e.target) && e.target !== notificationsBtn) {
                dropdown.style.display = 'none';
            }
        });
        
        // Check for new notifications
        checkForNewNotifications();
        
        // Check for notifications periodically (every 5 minutes)
        setInterval(checkForNewNotifications, 300000);
    }
}

// Check for new notifications
function checkForNewNotifications() {
    // In a real implementation, this would make an API call to check for new notifications
    // For this demo, we'll simulate new notifications with sample data
    
    // Get last notification check time
    const lastCheck = localStorage.getItem('lastNotificationCheck') || 0;
    const currentTime = new Date().getTime();
    
    // Check if we need to generate new notifications (every 5+ minutes or initial load)
    if (currentTime - lastCheck > 300000) {
        // Save new check time
        localStorage.setItem('lastNotificationCheck', currentTime);
        
        // Get read notification IDs
        const readNotifications = JSON.parse(localStorage.getItem('readNotifications') || '[]');
        
        // Get current notifications
        const currentNotifications = getNotifications();
        
        // Count unread notifications
        const unreadCount = currentNotifications.filter(notification => !readNotifications.includes(notification.id)).length;
        
        // Update notification badge
        updateNotificationBadge(unreadCount);
        
        // Update notification dropdown content
        updateNotificationDropdown(currentNotifications);
    }
}

// Get notifications (mock implementation)
function getNotifications() {
    // In a real implementation, this would fetch notifications from a server
    // For this demo, we'll use sample data
    
    return [
        {
            id: 'notif_1',
            title: 'خبر عاجل',
            content: 'تطورات جديدة في الأزمة الاقتصادية العالمية',
            time: new Date(Date.now() - 1800000).toISOString() // 30 minutes ago
        },
        {
            id: 'notif_2',
            title: 'رياضة',
            content: 'نتائج مباريات اليوم في الدوري المحلي',
            time: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
        },
        {
            id: 'notif_3',
            title: 'تقرير خاص',
            content: 'تقرير حول التغيرات المناخية وتأثيرها على المنطقة',
            time: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
        }
    ];
}

// Update notification badge
function updateNotificationBadge(count) {
    const badge = document.querySelector('.notification-badge');
    
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

// Update notification dropdown content
function updateNotificationDropdown(notifications) {
    const dropdown = document.querySelector('.notifications-dropdown');
    
    if (dropdown) {
        // Clear current notifications
        dropdown.innerHTML = '';
        
        // Add notifications to dropdown
        notifications.forEach(notification => {
            const notificationItem = document.createElement('div');
            notificationItem.className = 'notification-item';
            notificationItem.dataset.id = notification.id;
            
            const time = new Date(notification.time);
            const timeAgo = getTimeAgo(time);
            
            notificationItem.innerHTML = `
                <h5>${notification.title}</h5>
                <p>${notification.content}</p>
                <small class="text-muted">${timeAgo}</small>
            `;
            
            dropdown.appendChild(notificationItem);
            
            // Add click handler
            notificationItem.addEventListener('click', function() {
                // In a real implementation, this would navigate to the related content
                alert(`سيتم فتح المحتوى المرتبط بالإشعار: ${notification.title}`);
            });
        });
    }
}

// Save notifications read status
function saveNotificationsReadStatus() {
    const notifications = getNotifications();
    const notificationIds = notifications.map(notification => notification.id);
    
    // Save to local storage
    localStorage.setItem('readNotifications', JSON.stringify(notificationIds));
}

// Get time ago in Arabic
function getTimeAgo(time) {
    const now = new Date();
    const diff = Math.floor((now - time) / 1000); // seconds
    
    if (diff < 60) {
        return 'منذ لحظات';
    } else if (diff < 3600) {
        const minutes = Math.floor(diff / 60);
        return `منذ ${minutes} ${minutes === 1 ? 'دقيقة' : 'دقائق'}`;
    } else if (diff < 86400) {
        const hours = Math.floor(diff / 3600);
        return `منذ ${hours} ${hours === 1 ? 'ساعة' : 'ساعات'}`;
    } else {
        const days = Math.floor(diff / 86400);
        return `منذ ${days} ${days === 1 ? 'يوم' : 'أيام'}`;
    }
}

// Request notification permission
function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted');
            }
        });
    }
}

// Show browser notification
function showBrowserNotification(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
        const notification = new Notification(title, {
            body: body,
            icon: '/assets/img/logo.png' // Update with your logo path
        });
        
        notification.onclick = function() {
            window.focus();
            this.close();
        };
    }
}