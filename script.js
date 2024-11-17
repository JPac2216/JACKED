// Stopwatch JS code https://www.youtube.com/watch?v=jPFh8kBXoug
window.onload = function () {
    let minutes = 0;
    let seconds = 0; 
    let tens = 0;

    let appendMinutes = document.querySelector('#minutes');
    let appendTens = document.querySelector('#tens');
    let appendSeconds = document.querySelector('#seconds');

    let startBtn = document.querySelector('#start');
    let stopBtn = document.querySelector('#stop');
    let resetBtn = document.querySelector('#reset');


    let Interval;
    const startTimer = () => {
        tens++; 
        if (tens <= 9){
            appendTens.innerHTML = '0' + tens;
        }

        if (tens > 9){
            appendTens.innerHTML = tens;
        }

        if (tens > 99){
            seconds++;
            appendSeconds.innerHTML = '0' + seconds;
            tens = 0;
            appendTens.innerHTML = '0' + 0;
        }

        if (seconds > 9){
            appendSeconds.innerHTML = seconds;
        }

        if  (seconds > 59){
            minutes++;
            appendMinutes.innerHTML = '0' + minutes;
            seconds = 0;
            appendSeconds.innerHTML = '0' +0;

        }
    };



    startBtn.onclick= () => {
        clearInterval(Interval);
        Interval = setInterval(startTimer, 10);
    };

    stopBtn.onclick = () => {
        clearInterval(Interval);
    };

    resetBtn.onclick = () => {
        clearInterval(Interval);
        tens = 0;
        seconds = 0;
        minutes = 0;
        appendTens.innerHTML = '00';
        appendSeconds.innerHTML = '00';
        appendMinutes.innerHTML = '00'; 
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

        // Display totalSet count
        const totalSetCount = document.createElement('p');
        totalSetCount.id = `${splitName}-${muscle}-totalSets`;
        totalSetCount.innerText = `Total Sets: ${muscleData.totalSets}`;

        


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



