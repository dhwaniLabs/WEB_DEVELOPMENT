let notifications = [];

const container = document.getElementById("notificationContainer");
const searchInput = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearBtn");

fetch("notification.json")
    .then(response => response.json())
    .then(data => {
        notifications = data.notifications;
        displayNotifications(notifications);
    })
    .catch(error => {
        console.error("Error fetching notifications:", error);
    });

function displayNotifications(data) {

    container.innerHTML = "";

    data.forEach(notification => {

        const card = document.createElement("div");

        card.className = notification.status === "NEW"
            ? "notification-card new"
            : "notification-card";

        const iconClass = notification.category.toLowerCase();

        const badgeClass = notification.status === "NEW"
            ? "badge new-badge"
            : "badge read-badge";

        card.innerHTML = `
            <div class="icon ${iconClass}">
                <i class="${notification.icon}"></i>
            </div>

            <div class="content">
                <h3>${notification.title}</h3>
                <p>${notification.message}</p>
                <span>${notification.date} • ${notification.time}</span>
            </div>

            <div class="${badgeClass}">
                ${notification.status}
            </div>
        `;

        container.appendChild(card);
    });

    if (data.length === 0) {
        container.innerHTML = `
            <div class="notification-card">
                <div class="content">
                    <h3>No matching notifications</h3>
                    <p>No notification found for your search.</p>
                </div>
            </div>
        `;
    }
}

searchInput.addEventListener("input", function () {

    const searchText = searchInput.value.toLowerCase().trim();

    if (searchText === "") {
        displayNotifications(notifications);
        return;
    }

    const filteredNotifications = notifications.filter(notification => {

        return (
            notification.title.toLowerCase().includes(searchText) ||
            notification.message.toLowerCase().includes(searchText) ||
            notification.category.toLowerCase().includes(searchText) ||
            notification.date.toLowerCase().includes(searchText)
        );

    });

    displayNotifications(filteredNotifications);
});

clearBtn.addEventListener("click", function () {

    searchInput.value = "";

    displayNotifications(notifications);

});