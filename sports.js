const showAllData = (id) => {
    const inputField = document.getElementById("inputField");
    const inputValue = inputField.value;
    document.getElementById("spinner").classList.remove("d-none");
    document.getElementById('male').classList.add('d-none');
    document.getElementById('female').classList.add('d-none');
    const search = id || inputValue;
    const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${search}`
    fetch(url)
        .then(res => res.json())

        .then(data => {
            document.getElementById("spinner").classList.add("d-none");
            displayAllData(data.player.slice(0, 4))
        })

}

const displayAllData = (players) => {
    const inputField = document.getElementById("inputField").value = "";
    const container = document.getElementById("card-info");
    container.innerHTML = " ";
    players.forEach(player => {
        const div = document.createElement("div");
        const { strThumb, strPlayer, strNationality, idPlayer } = player;
        div.classList.add('col');
        div.innerHTML = `
   <div class="card h-100">
       <img src="${strThumb ? strThumb : 'https://picsum.photos/500/300?random=3'}" class="card-img-top" alt="...">
       <div class="card-body text-center">
          <h5 class="card-title fs-3">${strPlayer}</h5>
          <p class="card-text fs-4">${strNationality}</p>
        </div>
        <div class="d-flex justify-content-around align-items-center pb-3">
            <button type="button" class="btn btn-outline-primary">Information</button>
            <button onclick="showDetailsInfo('${idPlayer}')" type="button" class="btn btn-outline-success">Details</button>
        </div>
    </div>
   `
        container.appendChild(div);

    })

}

const showDetailsInfo=(id)=>{
    // console.log(id);
    const url=`https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayInfoCard(data.players[0]))

}
const displayInfoCard=(info)=>{
    console.log(info);
    const divContainer=document.getElementById("rightCardSection");
    divContainer.innerHTML=" ";
    console.log("Cliked Container")
    const div=document.createElement('div');
    const { strThumb, strPlayer, strDescriptionEN, strTeam,strGender}=info;
    if(strGender === 'Male'){
        document.getElementById('male').classList.remove('d-none');
    }
    else{
        document.getElementById("female").classList.remove("d-none");
    }
    div.innerHTML=`
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${strThumb}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">${strPlayer}</h5>
                    <p class="card-text">${strTeam}</p>
                    <p class="card-text">${strDescriptionEN.slice(0,150)}...</p>
                    
                </div>
            </div>
         </div>
    </div>
    `
    divContainer.appendChild(div);
}
showAllData("Ronaldo");