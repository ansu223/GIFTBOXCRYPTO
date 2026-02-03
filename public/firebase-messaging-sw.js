// Firebase Messaging Service Worker for RichAds
// This enables push notifications from RichAds

importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Your Firebase configuration from RichAds
firebase.initializeApp({
  apiKey: "AIzaSyBVsmdI1DPBmm5n3cV-cXQnSM3PJgQs7MA",
  authDomain: "push-richads.firebaseapp.com",
  projectId: "push-richads",
  storageBucket: "push-richads.appspot.com",
  messagingSenderId: "177143382891",
  appId: "1:177143382891:web:1d9cf40923391f64ee53a7",
  measurementId: "G-K96R8QJGMQ"
});

const messaging = firebase.messaging();

// Handle background messages (when app is closed)
messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message: ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || '/icon-192.png',
    image: payload.notification.image,
    data: payload.data,
    tag: payload.data.tag || 'richads-notification',
    requireInteraction: payload.data.requireInteraction || false,
    actions: payload.data.actions || []
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', function(event) {
  console.log('[firebase-messaging-sw.js] Notification click received.');
  
  event.notification.close();

  // Handle action buttons if present
  if (event.action) {
    console.log(`[firebase-messaging-sw.js] Action clicked: ${event.action}`);
    // Handle specific actions
  }

  // Open the URL from notification data
  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});
