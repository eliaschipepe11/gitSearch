const form = document.querySelector('form');
form.addEventListener('submit',(event)=>{event.preventDefault()});
var inputText = form.username;
const delet= document.querySelector('#delete');
var resultContainer = document.querySelector('#result')

function newSectionInformContainer(stronValue, ParagrafValue){
    let sectionInformElement= document.createElement('section');
    let strongElement= document.createElement('strong');
    let paragraphElement= document.createElement('p');
    strongElement.textContent=stronValue;
    paragraphElement.textContent=ParagrafValue;
    sectionInformElement.appendChild(strongElement)
    sectionInformElement.appendChild(paragraphElement)
    return sectionInformElement;
}
function renderProfileInformation(user){
    let created= new Date(user.created_at);
    
    let sectionElents=  [
    locationElement= newSectionInformContainer('Location:',user.location),
    bioElement= newSectionInformContainer('Bio:',user.bio),
    company= newSectionInformContainer('Company:',user.company),
    publicRepoElement=newSectionInformContainer('public repositories:',user.public_repos),
    folowersElement=newSectionInformContainer('Followers:',user.followers),
    folowingElement=newSectionInformContainer('Following:',user.following),
    createdatElement= newSectionInformContainer('Created at:',created.toLocaleTimeString())
    ]
   for(elemet of sectionElents){
    resultContainer.appendChild(elemet);
   }
}
function crateProfile(user){
    const profilesection= document.createElement('section')
    let fullnameUserH2= document.createElement('h2')
    let pikUserimg= document.createElement('img');
    profilesection.setAttribute('id','profile')
    fullnameUserH2.innerText=user.name;
    pikUserimg.setAttribute('src',user.avatar_url)
    fullnameUserH2.innerText=user.name;
    profilesection.appendChild(pikUserimg);
    profilesection.appendChild(fullnameUserH2);
    return profilesection;
}
function renderDataUser(user){
    if(resultContainer.children.length>0)
        resultContainer.innerHTML='';
    resultContainer.appendChild(crateProfile(user));
    renderProfileInformation(user);
}
async function  searchUser(){
    var username=inputText.value.trim().length>0? inputText.value:'eliaschipepe11';
    try{
        let request = await fetch('https://api.github.com/users/'+username);
        if(request.status==200){
            let response=JSON.parse(await request.text())
            renderDataUser(response); 
        }
        else{            
            setgError(request.status==404?'Don\'t found...':'Error...');
        }
    }
    catch(Errror){
        setgError('Conection Error.');
    }     
}
function setgError(errorMessage){
    resultContainer.innerHTML='';
    const elementError = document.createElement('strong')
    elementError.textContent = errorMessage;
    elementError.style.color='red';
    elementError.style.textAlign='center';
    console.log(errorMessage)
    resultContainer.appendChild(elementError);
}
form.addEventListener('submit',searchUser);
