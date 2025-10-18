document.addEventListener('DOMContentLoaded', () => {
    // =========================================================
    // PART 1: Contact Form Validation (Objective 2)
    // =========================================================
    const form = document.getElementById('contactForm');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        let isFormValid = true;
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        // Validation logic (clear all errors first for a clean re-check)
        clearError(nameInput);
        clearError(emailInput);
        clearError(messageInput);

        // Name Validation
        if (nameInput.value.trim() === '') {
            displayError(nameInput, 'Name is required.');
            isFormValid = false;
        }

        // Email Validation
        if (emailInput.value.trim() === '') {
            displayError(emailInput, 'Email is required.');
            isFormValid = false;
        } else if (!emailRegex.test(emailInput.value.trim())) {
            displayError(emailInput, 'Invalid email format.');
            isFormValid = false;
        }

        // Message Validation
        if (messageInput.value.trim() === '') {
            displayError(messageInput, 'A message is required.');
            isFormValid = false;
        }

        if (isFormValid) {
            alert('Validation SUCCESS! Form submitted.'); 
            form.reset();
        }
    });

    // Helper function for DOM manipulation to show error
    function displayError(inputElement, message) {
        const errorDiv = document.getElementById(inputElement.id + 'Error');
        inputElement.classList.add('invalid-field');
        errorDiv.textContent = message;
    }

    // Helper function for DOM manipulation to clear error
    function clearError(inputElement) {
        const errorDiv = document.getElementById(inputElement.id + 'Error');
        inputElement.classList.remove('invalid-field');
        errorDiv.textContent = '';
    }


    // =========================================================
    // PART 2: Dynamic To-Do List (Objective 4)
    // =========================================================
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // --- DOM MANIPULATION: CREATE, ASSEMBLE, INSERT ---
        const listItem = document.createElement('li');
        listItem.className = 'task-item';

        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        
        // Add event listener to remove the task
        removeButton.addEventListener('click', function() {
            taskList.removeChild(listItem);
        });

        listItem.appendChild(taskSpan);
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        taskInput.value = ''; // Clear input
    }

    // Attach the addTask function to the button click
    addTaskBtn.addEventListener('click', addTask);

    // Optional: Allow pressing Enter key
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});