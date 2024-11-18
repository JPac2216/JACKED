// Stopwatch JS code https://www.youtube.com/watch?v=jPFh8kBXoug
window.onload = function () {
    let startTime = 0;
    let elapsedTime = 0;
    let interval;

    const appendMinutes = document.querySelector('#minutes');
    const appendSeconds = document.querySelector('#seconds');
    const appendTens = document.querySelector('#tens');

    const startBtn = document.querySelector('#start');
    const stopBtn = document.querySelector('#stop');
    const resetBtn = document.querySelector('#reset');

    const updateTimer = () => {
        elapsedTime = Date.now() - startTime;

        // Calculate time components
        const totalSeconds = Math.floor(elapsedTime / 1000);
        const tens = Math.floor((elapsedTime % 1000) / 10);
        const seconds = totalSeconds % 60;
        const minutes = Math.floor(totalSeconds / 60);

        // Update the display
        appendMinutes.innerHTML = minutes.toString().padStart(2, '0');
        appendSeconds.innerHTML = seconds.toString().padStart(2, '0');
        appendTens.innerHTML = tens.toString().padStart(2, '0');
    };

    startBtn.onclick = () => {
        if (!interval) {
            startTime = Date.now() - elapsedTime; // Preserve elapsed time when resuming
            interval = setInterval(updateTimer, 10); // Update every 10ms
        }
    };

    stopBtn.onclick = () => {
        clearInterval(interval);
        interval = null;
    };

    resetBtn.onclick = () => {
        clearInterval(interval);
        interval = null;
        elapsedTime = 0;
        appendMinutes.innerHTML = '00';
        appendSeconds.innerHTML = '00';
        appendTens.innerHTML = '00';
    };

    renderWorkouts('push');
};


// Define workout splits
const splits = {
    push: {
        chest: { sets: 0, workouts: 0, totalSets: 0 },
        triceps: { sets: 0, workouts: 0, totalSets: 0 },
        shoulders: { sets: 0, workouts: 0, totalSets: 0 },
    },
    pull: {
        back: { sets: 0, workouts: 0, totalSets: 0 },
        biceps: { sets: 0, workouts: 0, totalSets: 0 },
        delts: { sets: 0, workouts: 0, totalSets: 0 },
    },
    legs: {
        quads: { sets: 0, workouts: 0, totalSets: 0 },
        hamstrings: { sets: 0, workouts: 0, totalSets: 0 },
        calves: { sets: 0, workouts: 0, totalSets: 0 },
    },
};

// Render workouts for a selected split
const renderWorkouts = (splitName) => {
    const container = document.querySelector('#workoutContainer');
    container.innerHTML = ''; // Clear existing content

    const selectedSplit = splits[splitName];

    Object.keys(selectedSplit).forEach((muscle) => {
        const muscleData = selectedSplit[muscle];

        const workoutDiv = document.createElement('div');
        workoutDiv.className = 'workout-item';

        // Display muscle name
        const muscleName = document.createElement('h4');
        muscleName.innerText = muscle.charAt(0).toUpperCase() + muscle.slice(1);

        // Display set count
        const setCount = document.createElement('p');
        setCount.id = `${splitName}-${muscle}-sets`;
        setCount.innerText = `Sets: ${muscleData.sets}`;

        // Display workout count
        const workoutCount = document.createElement('p');
        workoutCount.id = `${splitName}-${muscle}-workouts`;
        workoutCount.innerText = `Exercises: ${muscleData.workouts}`;

        // Display totalSet count
        const totalSetCount = document.createElement('p');
        totalSetCount.id = `${splitName}-${muscle}-totalSets`;
        totalSetCount.innerText = `Total Sets: ${muscleData.totalSets}`;

        // Add Set Button
        const addSetBtn = document.createElement('button');
        addSetBtn.innerText = `Add Set`;
        addSetBtn.onclick = () => {
            muscleData.sets++; // Increment sets
            muscleData.totalSets++; // Increments totalSets without updating
            document.querySelector(`#${splitName}-${muscle}-sets`).innerText = `Sets: ${muscleData.sets}`;
        };

        // Add Workout Button
        const addWorkoutBtn = document.createElement('button');
        addWorkoutBtn.innerText = `Next Exercise`;
        addWorkoutBtn.onclick = () => {
            muscleData.workouts++; // Increment workouts
            muscleData.sets = 0; // Reset sets
            document.querySelector(`#${splitName}-${muscle}-workouts`).innerText = `Exercise: ${muscleData.workouts}`;
            document.querySelector(`#${splitName}-${muscle}-sets`).innerText = `Sets: ${muscleData.sets}`;
            document.querySelector(`#${splitName}-${muscle}-totalSets`).innerText = `Total Sets: ${muscleData.totalSets}`; // udates total sets
        };


        


        // Append elements to the workoutDiv
        workoutDiv.appendChild(muscleName);
        workoutDiv.appendChild(setCount);
        workoutDiv.appendChild(workoutCount);
        workoutDiv.appendChild(addSetBtn);
        workoutDiv.appendChild(addWorkoutBtn);
        workoutDiv.appendChild(totalSetCount);

        // Add to container
        container.appendChild(workoutDiv);
    });
};



// Switch between splits
const switchSplit = (splitName) => {
    renderWorkouts(splitName);
};



