var credits = parseInt(localStorage.getItem('Credits')) || 0;
var creditsDisplay = document.getElementById('creditsDisplay');
creditsDisplay.innerText = 'Credits: ' + credits;