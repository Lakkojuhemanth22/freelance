// Select sidebar menu items and toggle active class on click
const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item => {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i => {
			i.parentElement.classList.remove('active');
		});
		li.classList.add('active');
	});
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
});

// Toggle search form for mobile devices
const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if (window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if (searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
});

// Handle sidebar visibility for different screen sizes
if (window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if (window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}

window.addEventListener('resize', function () {
	if (this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
});

// DARK MODE TOGGLE (Make sure the element exists before adding event listener)
const switchMode = document.getElementById('switch-mode');
if (switchMode) {
	switchMode.addEventListener('change', function () {
		if (this.checked) {
			document.body.classList.add('dark');
		} else {
			document.body.classList.remove('dark');
		}
	});
}

// Function to fetch and display freelancer profile data
function fetchProfile() {
	const token = localStorage.getItem('authToken'); // Assuming you're storing the token in localStorage

	if (!token) {
		alert('You must be logged in to view the profile.');
		window.location.href = 'freelancerlogin.html';  // Redirect to login page if not logged in
		return;
	}

	fetch('http://localhost:8080/api/freelancer/profile', {
		method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + token,  // Include the JWT token for authentication
			'Content-Type': 'application/json'
		}
	})
		.then(response => {
			if (!response.ok) {
				if (response.status === 403) {
					throw new Error('Forbidden: Please check your permissions.');
				} else if (response.status === 404) {
					throw new Error('Profile not found.');
				} else {
					throw new Error('Failed to fetch profile.');
				}
			}
			return response.json();  // Parse JSON data
		})
		.then(data => {
			console.log('Profile data:', data);
			displayProfile(data);  // Function to populate the profile on the page
		})
		.catch(error => {
			console.error('Error fetching profile:', error);
			alert(error.message);  // Alert the user if something goes wrong
		});
}

// Function to display profile data on the page
function displayProfile(profile) {
	// Assuming you have elements to display freelancer data
	const freelancerName = document.getElementById('freelancerName');
	const freelancerEmail = document.getElementById('freelancerEmail');
	const freelancerSkills = document.getElementById('freelancerSkills');

	if (freelancerName && freelancerEmail && freelancerSkills) {
		freelancerName.innerText = profile.name;
		freelancerEmail.innerText = profile.email;
		freelancerSkills.innerText = profile.skills.join(', ');
	} else {
		console.error('Profile display elements not found in the DOM.');
	}
}

// Call fetchProfile when the page loads to display the freelancer profile
window.onload = fetchProfile;
