document.addEventListener('DOMContentLoaded', function() {
    const InitialState = {
        gamedevTasks: ['c# theory', 'game creation practice'],
        workSkillsTasks: ['html theory', 'JS theory', 'plain projects practice'],
        currentActivityName: 'work-skills'
    }
    
    let currentActivityName = localStorage.getItem('currentActivityName') || InitialState.currentActivityName

    const gamedevRevolvingList = document.getElementById('gamedev-revolving-list');
    const workSkillsRevolvingList = document.getElementById('work-skills-revolving-list');
    let currentRevolvingList = document.getElementById(currentActivityName + '-revolving-list');

    const currentTaskSpan = document.getElementById('current-task');

    const gamedevTasks = JSON.parse(localStorage.getItem('gamedevTasks')) ||
        InitialState.gamedevTasks
    const workSkillsTasks = JSON.parse(localStorage.getItem('workSkillsTasks')) ||
        InitialState.workSkillsTasks

    const shiftItemsButton = document.getElementById('shift-items-button');

    function drawContent() {
        drawLists();
        drawCurrentTask();
    }

    function drawLists() {
        drawActivityList(gamedevTasks, gamedevRevolvingList);
        drawActivityList(workSkillsTasks, workSkillsRevolvingList);
    }

    function drawCurrentTask() {
        const currentTask = currentRevolvingList.firstElementChild.textContent;

        currentTaskSpan.textContent = currentTask;
    }

    function drawActivityList(itemsArray, itemsList) {
        itemsArray.forEach(text => {
            const newElement = document.createElement(('li'));
            newElement.textContent = text;
            itemsList.appendChild(newElement);
        });
    }

    function shiftItems() {
        const activitiesArray = activityArrayByName(currentActivityName)
        const shiftedElement = activitiesArray.pop();
        activitiesArray.unshift(shiftedElement);

        currentRevolvingList.innerHTML = '';
        switchCurrentTask();
        const oldRevolvingList = currentRevolvingList;
        currentRevolvingList = document.getElementById(currentActivityName + '-revolving-list');
        drawCurrentTask();
        drawActivityList(activitiesArray, oldRevolvingList);


        saveActivities();
    }

    function activityArrayByName(activityName) {
        return activityName === 'work-skills' ? workSkillsTasks : gamedevTasks
    }

    function saveActivities() {
        localStorage.setItem('gamedevTasks', JSON.stringify(gamedevTasks));
        localStorage.setItem('workSkillsTasks', JSON.stringify(workSkillsTasks));
        localStorage.setItem('currentActivityName', currentActivityName);
    }

    function switchCurrentTask() {
        currentActivityName = currentActivityName == 'work-skills' ? 'gamedev' : 'work-skills';
    }

    drawContent();

    shiftItemsButton.addEventListener('click', shiftItems);
});
