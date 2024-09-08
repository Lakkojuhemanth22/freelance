document.addEventListener('DOMContentLoaded', async () => {
    const searchForm = document.getElementById('search-form');
    const jobList = document.getElementById('job-list');
    const modal = document.getElementById('job-details-modal');
    const modalContent = document.getElementById('job-details');
    const applyBtn = document.getElementById('apply-btn');
    const closeBtn = document.querySelector('.close-btn');
    const recommendedJobList = document.getElementById('recommended-job-list');

    // Function to fetch job recommendations
    async function fetchJobRecommendations() {
        try {
            const response = await fetch('http://localhost:8080/api/jobs/recommendations');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                recommendedJobList.innerHTML = '';

                if (data.jobs.length === 0) {
                    recommendedJobList.innerHTML = '<p>No recommendations available at the moment.</p>';
                } else {
                    data.jobs.forEach(job => {
                        const jobCard = document.createElement('div');
                        jobCard.classList.add('job-card');
                        jobCard.innerHTML = `
                            <h3>${job.title}</h3>
                            <p><strong>Company:</strong> ${job.company}</p>
                            <p><strong>Location:</strong> ${job.location}</p>
                            <p><strong>Description:</strong> ${job.description}</p>
                        `;
                        jobCard.addEventListener('click', () => showJobDetails(job));
                        recommendedJobList.appendChild(jobCard);
                    });
                }
            } else {
                throw new Error('Unexpected response format.');
            }
        } catch (error) {
            console.error('Error fetching recommendations:', error);
            recommendedJobList.innerHTML = '<p>Error fetching recommendations. Please try again later.</p>';
        }
    }

    async function searchJobs() {
        const query = document.getElementById('search-query').value;
        const category = document.getElementById('job-category').value;
        const location = document.getElementById('location').value;
        const minSalary = document.getElementById('min-salary').value;
        const maxSalary = document.getElementById('max-salary').value;
        const experienceLevel = document.getElementById('experience-level').value;
    
        // Construct the URL with query parameters
        const url = `http://localhost:8080/api/jobs/search?query=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}&location=${encodeURIComponent(location)}&minSalary=${encodeURIComponent(minSalary)}&maxSalary=${encodeURIComponent(maxSalary)}&experienceLevel=${encodeURIComponent(experienceLevel)}`;
    
        try {
            console.log('Fetching jobs from:', url);
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                console.log('Response data:', data);
    
                jobList.innerHTML = '';
    
                if (data.jobs.length === 0) {
                    jobList.innerHTML = '<p>No jobs found. Please try a different search.</p>';
                } else {
                    data.jobs.forEach(job => {
                        const jobCard = document.createElement('div');
                        jobCard.classList.add('job-card');
                        jobCard.innerHTML = `
                            <h3>${job.title}</h3>
                            <p><strong>Company:</strong> ${job.company}</p>
                            <p><strong>Location:</strong> ${job.location}</p>
                            <p><strong>Description:</strong> ${job.description}</p>
                        `;
                        jobCard.addEventListener('click', () => showJobDetails(job));
                        jobList.appendChild(jobCard);
    
                        // Add fade-in effect
                        setTimeout(() => {
                            jobCard.classList.add('show');
                        }, 100);
                    });
                }
            } else {
                throw new Error('Unexpected response format.');
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    }
    

    function showJobDetails(job) {
        modalContent.innerHTML = `
            <h2>${job.title}</h2>
            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Location:</strong> ${job.location}</p>
            <p><strong>Description:</strong> ${job.description}</p>
        `;
        modal.style.display = 'flex';

        // Handle job application
        applyBtn.onclick = () => {
            applyForJob(job.id);
        };
    }

    function applyForJob(jobId) {
        fetch(`/api/job-applications/apply`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ jobId })
        }).then(response => {
            if (response.ok) {
                alert('Application submitted successfully!');
                modal.style.display = 'none';
            } else {
                alert('Failed to submit application.');
            }
        }).catch(error => {
            console.error('Error applying for job:', error);
        });
    }

    // Close modal when clicking close button
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Fetch job recommendations on page load
    await fetchJobRecommendations();

    // Set up search form submission
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await searchJobs();
    });
});
