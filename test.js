const usersList = document.querySelector(".users-container");

const createUser = ({ destination, accommodation, activities, notes, imageUrl, date, id }) => {
  usersList.innerHTML += `<div class="user">
        <img
          class="user-pic"
          src=${imageUrl}
          alt=${destination}
        />
        
        <div class="user-detail">
          <h2 class="user-name">${destination}</h2>
          <p>${activities}</p>
          <p>${accommodation}</p>
          <p>${notes}</p>
          <p>${new Date(date).toDateString()}</p>
          <button onclick="deleteUser(${id})">Delete</button>
        </div>
      </div>`;
};

function travelBooking() {
    console.log("Adding...");
    const name = document.querySelector(".user-destination").value;
    const imageUrl = document.querySelector(".user-imageUrl").value;
    const activities = document.querySelector(".user-activities").value;
    const accommodation = document.querySelector(".user-accommodation").value;
    const notes = document.querySelector(".user-notes").value;
  
    const data = {
      name,
      avatar: imageUrl,
      activities,
      accommodation,
      notes
    };
  }

function deleteUser(id) {
  console.log("Deleting... User", id);
  fetch(`https://64f6f44c9d7754084952d964.mockapi.io/Travel/${id}`, {
    method: "DELETE",
  }).then(() => getUsers());


}

let pageNo=1;
function getUsers() {
  fetch(`https://64f6f44c9d7754084952d964.mockapi.io/Travel?page=${pageNo}&limit=10`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((users) => {
      usersList.innerHTML = "";
      users.forEach(createUser);
    });
}

function nextPage(){
    if(pageNo == singlePageLength){
        return
    }
    pageNo++;
    getUsers()
}

function previousPage(){
    if(pageNo == 1 ){
        return
    }
    pageNo--;
    getUsers()
}

function btn(pageNum){
    pageNo=pageNum;
    getUsers()
}

let singlePageLength;
async function getTotalUserCount(){
const totalData=await  fetch("https://64f6f44c9d7754084952d964.mockapi.io/Travel")
const len = await totalData.json()

const totalLength = len.length
singlePageLength = Math.ceil(totalLength/10)
console.log(singlePageLength)
createPagination()
}

function createPagination(){
    const buttons= document.querySelector(".pagination-buttons")
    for (let i = 1; i <= singlePageLength; i++) {
        buttons.innerHTML += `<button class="page-btn" onclick="btn(${i})">${i}</button>` 
        
    }
    
}
getTotalUserCount()
getUsers();