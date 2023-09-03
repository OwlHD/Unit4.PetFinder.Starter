const userInterface = document.getElementById('user')
const dataDisplay = document.getElementById('data')

async function getAllPuppies() {
    try {
        const response = await fetch("http://localhost:8080/api/v1/pets/")
        const result = await response.json()
        console.log(result)
        return result
      } catch (error) {
        console.error(error)
      }
}

async function getPetByOwner(query) {
    const response = await fetch(`http://localhost:8080/api/v1/pets/owner?owner=${query}`)
    const result = await response.json()
    console.log(result)
    return result
}

async function getPetByPetName(query) {
    const response = await fetch(`http://localhost:8080/api/v1/pets/${query}`)
    const result = await response.json()
    console.log(result)
    return result
}

function renderUserInterface() {
    // Create three divs, each one to hold stuff to call each API endpoint
    // 1. GET all pets - div with a button that calls get all pet endpoint, displays information in 'data' div
    // 2. GET pet by owner name - div with search bar, button sends request with query using text user types in search bar, then returns the pet that has that owner name.
    //    If no pet found with that owner name, lets user know no result found.
    // 3. GET pet by name - div with search bar, button sends request with pet name from search bar then returns pet info in data div.  No pet returns message telling user it failed.
    
    const allPetDiv = document.createElement('div') // div one
    allPetDiv.className = 'ui-div'
    const allPetText = document.createElement('p')
    allPetText.id='pet-text'
    allPetText.innerText = 'Click to get list of all pets'
    const allPetButton = document.createElement('button')
    allPetButton.id = 'pet-button'
    allPetButton.innerText = 'Retrieve Puppy List'

    allPetButton.addEventListener('click', async (event) => {
          const puppyList = await getAllPuppies()
          console.log(puppyList)
          displayData(puppyList)
    })

    allPetDiv.appendChild(allPetText)
    allPetDiv.appendChild(allPetButton)
    userInterface.appendChild(allPetDiv)

    const petOwner = document.createElement('div') // div two
    petOwner.className = 'ui-div'
    petOwner.id = 'div-two'
    const ownerSearchBar = document.createElement('input')
    ownerSearchBar.id = 'search-bar'
    ownerSearchBar.type = 'text'
    ownerSearchBar.placeholder = 'Search by owner name'
    const searchButton = document.createElement('button')
    searchButton.innerText = 'Search By Owner'
    petOwner.appendChild(ownerSearchBar)
    petOwner.appendChild(searchButton)
    userInterface.appendChild(petOwner)

    searchButton.addEventListener('click', async (event) => {
        const puppyList = await getAllPuppies()
        console.log(puppyList)
        console.log(ownerSearchBar.value)
        const puppy = puppyList.find(pet => pet.owner === ownerSearchBar.value)
        console.log(puppy)
        if (puppy === undefined) {
            displaySearch(ownerSearchBar.value)
        } else if (ownerSearchBar.value === puppy.owner){
            const puppySearch = await getPetByOwner(ownerSearchBar.value)
            console.log('test', puppySearch)
            displaySearch(puppySearch)
        }
    })

    const petName = document.createElement('div') // div three
    petName.className = 'ui-div'
    petOwner.id = 'div-three'
    const petSearchBar = document.createElement('input')
    petSearchBar.id = 'search-bar'
    petSearchBar.type = 'text'
    petSearchBar.placeholder = 'Search by pet name'
    const petSearchButton = document.createElement('button')
    petSearchButton.innerText = 'Search By Pet Name'
    petName.appendChild(petSearchBar)
    petName.appendChild(petSearchButton)
    userInterface.appendChild(petName)

    petSearchButton.addEventListener('click', async (event) => {
        const puppyList = await getAllPuppies()
        console.log(puppyList)
        console.log(petSearchBar.value)
        const puppy = puppyList.find(pet => pet.name === petSearchBar.value)
        console.log(puppy)
        if (puppy === undefined) {
            displaySearch(petSearchBar.value)
        } else if (petSearchBar.value === puppy.name){
            const puppySearch = await getPetByPetName(petSearchBar.value)
            console.log('test', puppySearch)
            displaySearch(puppySearch)
        }
    })
}

function displaySearch(puppyData) {
    if (typeof puppyData === 'string') {
        console.log('failed')
        dataDisplay.innerHTML = ''
        const singlePetDiv = document.createElement('div')
        singlePetDiv.className = 'single-pet'
        singlePetDiv.id = `pet-${puppyData.id}`
        const singlePetText = document.createElement('p')
        singlePetText.innerHTML = `
            Puppy does not exist with that info.  Please check names are properly capitalized or enter a new search term.
        `
        singlePetDiv.appendChild(singlePetText)
        dataDisplay.appendChild(singlePetDiv)
    } else {
        dataDisplay.innerHTML = ''
        const singlePetDiv = document.createElement('div')
        singlePetDiv.className = 'single-pet'
        singlePetDiv.id = `pet-${puppyData.id}`
        const singlePetText = document.createElement('p')
        singlePetText.innerHTML = `
            Name: ${puppyData.name} <br />
            Age: ${puppyData.age} <br />
            Breed: ${puppyData.breed} <br />
            Owner: ${puppyData.owner} <br />
            Telephone: ${puppyData.telephone} <br />
        `
        singlePetDiv.appendChild(singlePetText)
        dataDisplay.appendChild(singlePetDiv)
    }
}

function displayData(puppyData) {
    dataDisplay.innerHTML = ''
    puppyData.forEach(puppy => {
        const singlePetDiv = document.createElement('div')
        singlePetDiv.className = 'single-pet'
        singlePetDiv.id = `pet-${puppy.id}`
        const singlePetText = document.createElement('p')
        singlePetText.innerHTML = `
            Name: ${puppy.name} <br />
            Age: ${puppy.age} <br />
            Breed: ${puppy.breed} <br />
            Owner: ${puppy.owner} <br />
            Telephone: ${puppy.telephone} <br />
        `
        singlePetDiv.appendChild(singlePetText)
        dataDisplay.appendChild(singlePetDiv)
    });
}

async function init () {
    renderUserInterface()
}

init()