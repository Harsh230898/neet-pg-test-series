// src/services/NotificationService.js

class NotificationService {
  constructor() {
    this.permission = 'default';
    this.init();
  }

  async init() {
    if ('Notification' in window) {
      this.permission = await Notification.requestPermission();
    }
  }

  async requestPermission() {
    if ('Notification' in window) {
      this.permission = await Notification.requestPermission();
      return this.permission === 'granted';
    }
    return false;
  }

  sendNotification(title, options = {}) {
    if (this.permission === 'granted') {
      const notification = new Notification(title, {
        icon: '/logo.png',
        badge: '/logo.png',
        ...options
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      return notification;
    }
  }

  scheduleDailyReminder(time, message) {
    const [hours, minutes] = time.split(':');
    const now = new Date();
    const scheduledTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    
    if (scheduledTime < now) {
      scheduledTime.setDate(scheduledTime.getDate() + 1);
    }

    const timeUntilNotification = scheduledTime - now;

    setTimeout(() => {
      this.sendNotification('MedVanshi Study Reminder', {
        body: message,
        tag: 'daily-reminder'
      });
      
      // Reschedule for next day
      this.scheduleDailyReminder(time, message);
    }, timeUntilNotification);
  }

  checkStreakAlert(streak, lastStudyDate) {
    const now = new Date();
    const last = new Date(lastStudyDate);
    const hoursSinceStudy = (now - last) / (1000 * 60 * 60);

    if (hoursSinceStudy >= 20 && hoursSinceStudy < 24) {
      this.sendNotification('⚠️ Streak Alert!', {
        body: `Your ${streak}-day streak is about to break! Study now to keep it going.`,
        tag: 'streak-alert'
      });
    }
  }

  sendWeeklyProgressSummary(stats) {
    this.sendNotification('📊 Weekly Progress Summary', {
      body: `You completed ${stats.questions} questions with ${stats.accuracy}% accuracy this week! Keep going! 🚀`,
      tag: 'weekly-summary'
    });
  }
}

export default new NotificationService();
