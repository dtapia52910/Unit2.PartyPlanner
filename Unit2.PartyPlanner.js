const state= {event:[]}
//fecth API//
const PartyUrl='https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF-B-DaniTapia/events'

  function getParties() {
//.then is another version of await only works on promises NOT a loop//
    return fetch(PartyUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
    state.event=data.data
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });}

//Set Up the Party Data//
//{}=objects ""=keys
  const newPartyInfo = {
    name: "Event Name",
    description: "This is a description of the event.",
    date: "2021-09-30T00:00:00.000Z", // Date ISO string
    location: "123 Street"
  };
//Post Request from the API//

function postParties(newPartyInfo){
fetch(PartyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPartyInfo),
  })

//Make if then responses to make sure the interaction works properly//
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    return response.json();
  })
  .then(async data => {
     await getParties() 
    listParties( state.event);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });
}
  
//Make delete request//
const id = 1
async function deleteParty (id){
fetch(`${PartyUrl}/${id}`, {
  method: 'DELETE',
})
.then(response => {
  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }
  console.log('Party deleted, GrEaT sUcCeSs!');
})
.catch(error => {
  console.error('Fetch error:', error);
})
const displayParties = await getParties() 
listParties(state.event)
}

function listParties(party) {

const partyContainer = document.querySelector ("#listParties")
partyContainer.innerHTML="";
for (let index = 0; index < party.length; index++) {
  const element = party[index];
  const div = document.createElement ('div')

  div.innerHTML=`<h2>${element.name}</h2>
  <p>${element.description}</p>
  <p>${element.date}</p>
  <p>${element.location}</p>
  <button data-id="${element.id}" class="deleteButton">delete partayyy</button>`

  partyContainer.appendChild(div)
  
}
const deleteButton = document.querySelectorAll('.deleteButton')
for (let index = 0; index < deleteButton.length; index++) {
  const element = deleteButton[index];
  element.addEventListener('click', async (event)=>{
  const partyID=event.target.dataset.id
  await deleteParty (partyID)
  } )
}

} 
//?? using query selector grabs stuff from html and add to data base.
async function init () {
const addPartyForm = document.querySelector ("form")
const displayParties = await getParties() 
console.log(state.event)
listParties(state.event)
addPartyForm.addEventListener('submit', async (event)=>{
  // const partyID=event.target.dataset.id
  // await addParty (partyID)
 event.preventDefault()
 //^prevents from refreshing//
  // console.log(addPartyForm.name.value)//pulls value of that item
  const addParty= {name: addPartyForm.name.value,
  description: addPartyForm.description.value,
  date: new Date(addPartyForm.date.value).toISOString(), // Date ISO string
  location: addPartyForm.location.value}
  postParties(addParty)
  
})
}



init()


