// src/components/NotificationDropdown.jsx
import { Bell } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';

export default function NotificationDropdown({ notifications }) {
  const [open, setOpen] = useState(false);

  const unseenCount = notifications?.filter(n => !n.seen)?.length || 0;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative flex items-center p-2"
      >
        <Bell />
        {unseenCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
            {unseenCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white border shadow-lg z-50 rounded">
          <div className="p-2 font-semibold">Notifications</div>
          <ul className="max-h-64 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <li key={notification.id} className="p-2 border-t text-sm">
                  <Link href={`/notifications/${notification.id}`}>
                    {notification.message}
                  </Link>
                </li>
              ))
            ) : (
              <li className="p-2 text-gray-500 text-sm">No notifications</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
