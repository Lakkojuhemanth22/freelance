fetch('http://localhost:8080/api/skill-tests')
    .then(response => response.json())
    .then(skillTests => {
        const testsContainer = document.getElementById('skillTests');
        skillTests.forEach(test => {
            const testDiv = document.createElement('div');
            testDiv.innerHTML = `
                <h3>${test.skillName} (${test.difficulty})</h3>
                <p>${test.problemStatement}</p>
                <button onclick="startTest(${test.testId})">Start Test</button>
            `;
            testsContainer.appendChild(testDiv);
        });
    });

function startTest(testId) {
    window.location.href = `/test/${testId}`;
}
