const groupedNotifications = {
  contactRequest: filteredNotifications.filter(
    (notification) => notification.type === "contactRequest"
  ),

  contactAccepted: filteredNotifications.filter(
    (notification) => notification.type === "contactAccepted"
  ),

  postLike: filteredNotifications.filter(
    (notification) => notification.type === "postLike"
  ),

  message: filteredNotifications.filter(
    (notification) => notification.type === "message"
  ),
};


{groupedNotifications.contactRequest.length > 0 && (
  <section>
    <h3>Solicitudes de amistad</h3>

    {groupedNotifications.contactRequest.map((notification) => (
      <NotificationItem
        key={notification.id}
        notification={notification}
      />
    ))}
  </section>
)}