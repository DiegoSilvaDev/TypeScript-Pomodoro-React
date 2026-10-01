export async function requestNotificationPermission(): Promise<void> {
  if (!('Notification' in window)) return;

  if (Notification.permission === 'default') {
    await Notification.requestPermission();
  }
}
