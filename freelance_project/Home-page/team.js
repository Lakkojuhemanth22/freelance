document.getElementById('createTeamForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const teamName = document.getElementById('teamName').value;
    const teamLeaderId = document.getElementById('teamLeaderId').value;
    const teamSkills = document.getElementById('teamSkills').value.split(',');

    const response = await fetch('http://localhost:8080/api/teams/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            teamName: teamName,
            teamLeader: { userId: teamLeaderId },
            teamSkills: teamSkills.map(skill => ({ skillName: skill.trim() }))
        })
    });

    const result = await response.json();
    document.getElementById('createTeamResult').innerText = 'Team Created: ' + JSON.stringify(result);
});

document.getElementById('addTeamMemberForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const teamId = document.getElementById('teamId').value;
    const freelancerId = document.getElementById('freelancerId').value;
    const role = document.getElementById('role').value;

    const response = await fetch(`http://localhost:8080/api/teams/${teamId}/members`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            freelancer: { userId: freelancerId },
            role: role
        })
    });

    const result = await response.json();
    document.getElementById('addTeamMemberResult').innerText = 'Member Added: ' + JSON.stringify(result);
});

document.getElementById('viewTeamForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const teamId = document.getElementById('viewTeamId').value;

    const response = await fetch(`http://localhost:8080/api/teams/${teamId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const result = await response.json();
    document.getElementById('viewTeamResult').innerText = 'Team Details: ' + JSON.stringify(result);
});
