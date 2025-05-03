document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("introForm");
    const coursesDiv = document.getElementById("courses");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!form.checkValidity()) {
            alert("Please complete all required fields.");
            return;
        }

        const formData = new FormData(form);
        const name = formData.get("name");
        const mascot = formData.get("mascot");
        const imageFile = formData.get("image");
        const caption = formData.get("caption");
        const courses = Array.from(document.querySelectorAll("input[name='course']")).map((input) => input.value);

        const outputDiv = document.createElement("div");
        outputDiv.innerHTML = `
            <h3>${name} || ${mascot}</h3>
            <figure>
                <img id="userImage" style="max-width: 400px;">
                <figcaption>${caption}</figcaption>
            </figure>
            <ul>
                <li><b>Personal Background:</b> ${formData.get("personal")}</li>
                <li><b>Professional Background:</b> ${formData.get("professional")}</li>
                <li><b>Academic Background:</b> ${formData.get("academic")}</li>
                <li><b>Background in Web Development:</b> ${formData.get("webdev")}</li>
                <li><b>Primary Computer Platform:</b> ${formData.get("platform")}</li>
                <li><b>Courses:</b>
                    <ul>
                        ${courses.map((c) => `<li>${c}</li>`).join("")}
                    </ul>
                </li>
                <li><b>Funny thing?</b> ${formData.get("funny")}</li>
                <li><b>Anything else?</b> ${formData.get("extra")}</li>
                <li><b>I understand that what is on this page is not password protected and I will not put anything here that I don’t want publicly available.</b> – ${name}</li>
            </ul>
            <button onclick="location.reload()">Fill out the form again</button>
        `;

        form.replaceWith(outputDiv);

        if (imageFile && imageFile.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById("userImage").src = e.target.result;
            };
            reader.readAsDataURL(imageFile);
        }
    });

    form.addEventListener("reset", () => {
        setTimeout(() => {
            document.querySelectorAll(".course-field").forEach((div) => div.remove());
        }, 10);
    });
});

function addCourse() {
    const coursesDiv = document.getElementById("courses");
    const container = document.createElement("div");
    container.className = "course-field";
    container.innerHTML = `
        <input type="text" name="course" placeholder="Course name" required>
        <button type="button" onclick="this.parentElement.remove()">Delete</button>
    `;
    coursesDiv.appendChild(container);
}
