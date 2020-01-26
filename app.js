// DOM elements
const newSkill_button = document.getElementById('newSkillBtn')
const newSkill_p = document.getElementById('newSkillText')
const bars_div = document.getElementById('bars')
const statList_ul = document.getElementById('statList')
const generateGraph_button = document.getElementById('generateGraphBtn')


// variables
let stats = [
    {
        id: 1,
        name: 'stuff',
        level: 4
    },
    {
        id: 2,
        name: 'another stuff',
        level: 1
    },
    {
        id: 3,
        name: 'last stuff',
        level: 8
    }
]

// functions
// INPUT: get new skill when new skill btn is clicked
function newSkillBtnClick() {
    let newSkill = newSkill_p.value

    if (newSkill === '') return

    setTimeout(function() {
        addNewSkill(newSkill)
    }, 150)

    newSkill_p.value = ''
}

// INPUT: draw graph when clicked
function drawGraphClick() {
    drawGraph(stats)
}

// PROCESS: add new skill to stats
function addNewSkill(newSkill) {
    let skill = {
        id: Math.random(),
        name: newSkill,
        level: Math.random()
    }

    stats.push(skill)
    drawStats()
}
// PROCESS: remove skill from stats
function removeSkill(id) {
    stats = stats.filter(skill => skill.id !== id)
    drawStats()
}

// OUTPUT: creates bar elements and adjusts css accordingly
function drawGraph(_stats) {
    bars_div.innerHTML = ''
    for(skill in _stats) {
        let skillLevel = Math.floor(Math.random() * 400) + 40
        stats[skill].level = skillLevel
        let skillColor = {
            r: Math.floor(Math.random() * 255),
            g: Math.floor(Math.random() * 255),
            b: Math.floor(Math.random() * 255)
        }
        let newBar = document.createElement('div')
        newBar.innerHTML = _stats[skill].name + '<br>' + stats[skill].level
        newBar.className = 'bar'
        newBar.id = skill
        newBar.style.left = `${(480 / _stats.length) * skill + 12}px`
        newBar.style.width = `${(480 / _stats.length) - 4}px`
        newBar.style.backgroundColor = `rgb(${skillColor.r}, ${skillColor.g}, ${skillColor.b})`
        if (isDark(skillColor.r, skillColor.g, skillColor.b)) {
            newBar.style.color = '#fff'
        }
        bars_div.appendChild(newBar)

        // animate bar
        $(`#${skill}`).animate({
            height: stats[skill].level + 'px',
            opacity: 1
        }, {duration: stats[skill].level * 3})
    }
}
//OUTPUT: add skill to skill list
function drawStats() {
    let newStatList = ''
    for (skill in stats) {
        newStatList += `
        <li id="${stats[skill].id}">
        ${stats[skill].name}
        <button class="deleteSkillBtn" onclick="removeSkill(${stats[skill].id})">delete</button>
        </li>`
    }

    statList_ul.innerHTML = newStatList
}

// INIT
function INIT() {
    // DOM event listeners
    newSkill_button.addEventListener('click', newSkillBtnClick)
    generateGraph_button.addEventListener('click', drawGraphClick)

    // draw elements
    drawStats(stats)
}

INIT()


// helper
function isDark(r,g,b) {
    total = r + g + b
    if (total < 400) {
        return true
    } else {
        return false
    }
}