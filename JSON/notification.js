let notifications = [];

const container = document.getElementById("notificationContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");


// Load JSON data

fetch("notification.json")

    .then(response => response.json())

    .then(data => {

        notifications = data.notifications;

        document.querySelector(".profile span").textContent =
            data.student.name;

        displayNotifications(notifications);

    })

    .catch(error => {

        console.error("Error loading notification data:", error);

        container.innerHTML =
            "<p>Unable to load notifications.</p>";

    });


// Display notifications

function displayNotifications(data) {

    container.innerHTML = "";

    if (data.length === 0) {

        container.innerHTML =
            "<p class='no-notification'>No notifications found.</p>";

        return;

    }


    data.forEach(notification => {

        const card = document.createElement("div");

        card.className =
            "notification-card " +
            (notification.status === "new" ? "new" : "");


        const badgeClass =
            notification.status === "new"
                ? "new-badge"
                : "read-badge";


        const badgeText =
            notification.status === "new"
                ? "NEW"
                : "READ";


        card.innerHTML = `

            <div class="icon ${notification.type}">

                <i class="fa-solid ${notification.icon}"></i>

            </div>


            <div class="content">

                <h3>${notification.title}</h3>

                <p>${notification.message}</p>

                <span>${notification.time}</span>

            </div>


            <div class="badge ${badgeClass}">

                ${badgeText}

            </div>

        `;


        container.appendChild(card);

    });

}


// Search notifications

function searchNotifications() {

    const searchText =
        searchInput.value.toLowerCase().trim();


    const filteredNotifications =
        notifications.filter(notification =>

            notification.title.toLowerCase().includes(searchText) ||

            notification.message.toLowerCase().includes(searchText) ||

            notification.type.toLowerCase().includes(searchText)

        );


    displayNotifications(filteredNotifications);

}


// Search button

searchBtn.addEventListener("click", searchNotifications);


// Search while typing

searchInput.addEventListener("input", searchNotifications);


// Clear all notifications

clearBtn.addEventListener("click", function () {

    if (notifications.length === 0) {

        alert("No notifications to clear.");

        return;

    }


    const confirmClear =
        confirm("Are you sure you want to clear all notifications?");


    if (confirmClear) {

        notifications = [];

        displayNotifications(notifications);

    }

});
