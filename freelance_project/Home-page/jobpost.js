document.addEventListener("DOMContentLoaded", () => {
    const jobpostForm = document.getElementById("jobPostingForm");

    jobpostForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const jobName = document.getElementById("title").value;
        const jobDescription = document.getElementById("description").value;
        const skillsRequired = document.getElementById("skills").value;
        const jobSalary = document.getElementById("salary").value;
        const location = document.getElementById("location").value;
        const employmentType = document.getElementById("employmentType").value;
        const jobCategory = document.getElementById("category").value;

        try {
    const response = await fetch("http://localhost:8080/api/jobs/post", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ jobName, jobDescription, skillsRequired, jobSalary, location, employmentType, jobCategory }),
    });

    if (response.ok) {
        // If login is successful, redirect to the Home page
        alert('job posted sucessfully');
    }
} catch (error) {
    alert("An error occurred while posting job.");
}

    });     
});