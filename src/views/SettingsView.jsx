// src/views/SettingsView.jsx

import React, { useState, useContext, useEffect } from 'react';
import { Bell, Clock, Calendar, Save, CheckCircle } from 'lucide-react';
import UIContext from '../context/UIContext';
import NotificationService from '../services/NotificationService';

const SettingsView = () => {
  const { getTextColor, getCardStyle, isDarkMode } = useContext(UIContext);
  const CardStyle = getCardStyle();

  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [dailyReminderTime, setDailyReminderTime] = useState('18:00');
  const [streakAlerts, setStreakAlerts] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('notification_settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setNotificationsEnabled(settings.enabled || false);
      setDailyReminderTime(settings.dailyTime || '18:00');
      setStreakAlerts(settings.streakAlerts !== false);
      setWeeklyReport(settings.weeklyReport !== false);
    }
  }, []);

  const handleEnableNotifications = async () => {
    const granted = await NotificationService.requestPermission();
    setNotificationsEnabled(granted);
    
    if (granted) {
      NotificationService.sendNotification('🎉 Notifications Enabled!', {
        body: 'You will now receive study reminders and progress alerts.'
      });
    }
  };

  const saveSettings = () => {
    const settings = {
      enabled: notificationsEnabled,
      dailyTime: dailyReminderTime,
      streakAlerts,
      weeklyReport
    };

    localStorage.setItem('notification_settings', JSON.stringify(settings));

    if (notificationsEnabled) {
      NotificationService.scheduleDailyReminder(
        dailyReminderTime,
        '📚 Time to practice some MCQs! Your daily goal awaits.'
      );
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="mb-10">
        <h2 className={`text-5xl lg:text-6xl font-black mb-3 ${getTextColor('text-slate-900', 'text-white')}`}>
          Settings
        </h2>
        <p className={`${getTextColor('text-xl text-slate-600', 'text-slate-400')}`}>
          Customize your study experience
        </p>
      </div>

      {/* Notifications Section */}
      <div className={`${CardStyle.bg} ${CardStyle.border} rounded-3xl p-8 border`}>
        <h3 className={`${getTextColor('text-2xl font-black mb-6 text-slate-900', 'text-white')} flex items-center gap-3 border-b pb-4`}>
          <Bell className="w-6 h-6 text-purple-600" />
          Study Reminders & Notifications
        </h3>

        <div className="space-y-6">
          {/* Enable Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className={`font-bold ${getTextColor('text-slate-900', 'text-white')}`}>
                Enable Notifications
              </p>
              <p className="text-sm text-slate-500">
                Get study reminders and progress alerts
              </p>
            </div>
            <button
              onClick={handleEnableNotifications}
              className={`px-6 py-3 rounded-xl font-bold transition-all ${
                notificationsEnabled
                  ? 'bg-emerald-500 text-white'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              {notificationsEnabled ? 'Enabled ✓' : 'Enable'}
            </button>
          </div>

          {notificationsEnabled && (
            <>
              {/* Daily Reminder Time */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex-1">
                  <p className={`font-bold flex items-center gap-2 ${getTextColor('text-slate-900', 'text-white')}`}>
                    <Clock className="w-5 h-5 text-indigo-500" />
                    Daily MCQ Reminder
                  </p>
                  <p className="text-sm text-slate-500">
                    Choose when you want to be reminded to practice
                  </p>
                </div>
                <input
                  type="time"
                  value={dailyReminderTime}
                  onChange={(e) => setDailyReminderTime(e.target.value)}
                  className={`p-3 rounded-xl border font-semibold ${
                    isDarkMode
                      ? 'bg-slate-700 border-slate-600 text-white'
                      : 'bg-white border-slate-300 text-slate-900'
                  } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
              </div>

              {/* Streak Alerts */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex-1">
                  <p className={`font-bold ${getTextColor('text-slate-900', 'text-white')}`}>
                    Streak Break Alerts
                  </p>
                  <p className="text-sm text-slate-500">
                    Get notified if your streak is about to break (4 hours before)
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={streakAlerts}
                    onChange={(e) => setStreakAlerts(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                </label>
              </div>

              {/* Weekly Report */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                <div className="flex-1">
                  <p className={`font-bold flex items-center gap-2 ${getTextColor('text-slate-900', 'text-white')}`}>
                    <Calendar className="w-5 h-5 text-emerald-500" />
                    Weekly Progress Summary
                  </p>
                  <p className="text-sm text-slate-500">
                    Receive a weekly report every Sunday at 8 PM
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={weeklyReport}
                    onChange={(e) => setWeeklyReport(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </>
          )}
        </div>

        {/* Save Button */}
        <button
          onClick={saveSettings}
          className="w-full mt-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold hover:scale-[1.01] transition-all shadow-lg flex items-center justify-center gap-2"
        >
          {saved ? (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Settings Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              <span>Save Settings</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SettingsView;
