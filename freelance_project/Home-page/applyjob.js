document.getElementById('jobApplicationForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const applicationData = {
        jobId: 1, // Replace with actual job ID if available
        freelancerId: 123, // Replace with actual freelancer ID if available
        coverLetter: document.getElementById('coverLetter').value,
        proposedBudget: parseFloat(document.getElementById('proposedBudget').value)
    };

    try {
        const response = await fetch('/api/job-applications/apply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(applicationData)
        });

        if (response.ok) {
            alert('Application submitted successfully!');
            window.location.href = 'applied-jobs.html'; // Redirect to a page showing applied jobs
        } else {
            alert('Failed to submit application. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});
