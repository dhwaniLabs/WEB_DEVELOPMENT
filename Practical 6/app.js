
let data;

let eventPage = 1;
let studentPage = 1;

const itemsPerPage = 4;


async function loadData() {

    data = await fetchData();

    if (!data) {
        alert("Unable to load JSON data");
        return;
    }

    renderEvents();
    renderStudents();
    renderNotices();
    renderFAQs();
}


function showSection(id) {

    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });

}


/* EVENTS */

function renderEvents() {

    let search =
        document.getElementById("eventSearch").value.toLowerCase();

    let filter =
        document.getElementById("eventFilter").value;

    let sort =
        document.getElementById("eventSort").value;


    let result = data.events.filter(event => {

        let searchMatch =
            event.name.toLowerCase().includes(search);

        let filterMatch =
            filter === "all" ||
            event.category === filter;

        return searchMatch && filterMatch;

    });


    if (sort === "az") {
        result.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    if (sort === "za") {
        result.sort((a, b) =>
            b.name.localeCompare(a.name)
        );
    }


    let totalPages =
        Math.ceil(result.length / itemsPerPage);

    let start =
        (eventPage - 1) * itemsPerPage;

    let pageData =
        result.slice(start, start + itemsPerPage);


    let container =
        document.getElementById("eventList");

    container.innerHTML = "";


    if (pageData.length === 0) {

        container.innerHTML =
            "<p>No events found.</p>";

    } else {

        pageData.forEach(event => {

            container.innerHTML += `

                <div class="card">

                    <h3>${event.name}</h3>

                    <p>
                        <b>Date:</b> ${event.date}
                    </p>

                    <p>
                        <b>Venue:</b> ${event.venue}
                    </p>

                    <span class="badge">
                        ${event.category}
                    </span>

                </div>

            `;

        });

    }


    createPagination(
        "eventPagination",
        totalPages,
        eventPage,
        page => {

            eventPage = page;
            renderEvents();

        }
    );
}


/* STUDENTS */

function renderStudents() {

    let search =
        document.getElementById("studentSearch")
        .value.toLowerCase();

    let filter =
        document.getElementById("studentFilter").value;

    let sort =
        document.getElementById("studentSort").value;


    let result = data.students.filter(student => {

        let searchMatch =
            student.name.toLowerCase().includes(search);

        let filterMatch =
            filter === "all" ||
            student.course === filter;

        return searchMatch && filterMatch;

    });


    if (sort === "az") {

        result.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

    }

    if (sort === "za") {

        result.sort((a, b) =>
            b.name.localeCompare(a.name)
        );

    }

    if (sort === "high") {

        result.sort((a, b) =>
            b.marks - a.marks
        );

    }

    if (sort === "low") {

        result.sort((a, b) =>
            a.marks - b.marks
        );

    }


    let totalPages =
        Math.ceil(result.length / itemsPerPage);

    let start =
        (studentPage - 1) * itemsPerPage;

    let pageData =
        result.slice(start, start + itemsPerPage);


    let container =
        document.getElementById("studentList");

    container.innerHTML = "";


    if (pageData.length === 0) {

        container.innerHTML =
            "<p>No students found.</p>";

    } else {

        pageData.forEach(student => {

            container.innerHTML += `

                <div class="card">

                    <h3>${student.name}</h3>

                    <p>
                        <b>ID:</b> ${student.id}
                    </p>

                    <p>
                        <b>Course:</b> ${student.course}
                    </p>

                    <p>
                        <b>Year:</b> ${student.year}
                    </p>

                    <p>
                        <b>Marks:</b> ${student.marks}%
                    </p>

                </div>

            `;

        });

    }


    createPagination(
        "studentPagination",
        totalPages,
        studentPage,
        page => {

            studentPage = page;
            renderStudents();

        }
    );
}


/* NOTICES */

function renderNotices() {

    let search =
        document.getElementById("noticeSearch")
        .value.toLowerCase();


    let result = data.notices.filter(notice =>

        notice.title.toLowerCase().includes(search) ||
        notice.description.toLowerCase().includes(search)

    );


    let container =
        document.getElementById("noticeList");

    container.innerHTML = "";


    result.forEach(notice => {

        container.innerHTML += `

            <div class="notice">

                <h3>${notice.title}</h3>

                <p>${notice.description}</p>

                <small>${notice.date}</small>

            </div>

        `;

    });


    if (result.length === 0) {

        container.innerHTML =
            "<p>No notices found.</p>";

    }
}


/* FAQ */

function renderFAQs() {

    let container =
        document.getElementById("faqList");

    container.innerHTML = "";


    data.faqs.forEach((faq, index) => {

        container.innerHTML += `

            <div class="faq">

                <div
                    class="question"
                    onclick="toggleFAQ(${index})"
                >
                    ${faq.question}
                </div>

                <div class="answer">
                    ${faq.answer}
                </div>

            </div>

        `;

    });
}


function toggleFAQ(index) {

    document
        .querySelectorAll(".faq")[index]
        .classList.toggle("active");

}


/* PAGINATION */

function createPagination(
    id,
    totalPages,
    currentPage,
    callback
) {

    let container =
        document.getElementById(id);

    container.innerHTML = "";


    for (let i = 1; i <= totalPages; i++) {

        let button =
            document.createElement("button");

        button.innerText = i;


        if (i === currentPage) {
            button.classList.add("active");
        }


        button.onclick = () => callback(i);

        container.appendChild(button);

    }

}


/* EVENTS */

document
    .getElementById("eventSearch")
    .addEventListener("input", () => {

        eventPage = 1;
        renderEvents();

    });


document
    .getElementById("eventFilter")
    .addEventListener("change", () => {

        eventPage = 1;
        renderEvents();

    });


document
    .getElementById("eventSort")
    .addEventListener("change", () => {

        eventPage = 1;
        renderEvents();

    });


/* STUDENTS */

document
    .getElementById("studentSearch")
    .addEventListener("input", () => {

        studentPage = 1;
        renderStudents();

    });


document
    .getElementById("studentFilter")
    .addEventListener("change", () => {

        studentPage = 1;
        renderStudents();

    });


document
    .getElementById("studentSort")
    .addEventListener("change", () => {

        studentPage = 1;
        renderStudents();

    });


/* NOTICES */

document
    .getElementById("noticeSearch")
    .addEventListener("input", renderNotices);


/* START */

loadData();