const loadPhone = async (searchFeildText='iphone',isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchFeildText}`)
    const data = await res.json()
    const phones = data.data
    console.log(phones.length)
    const notShowContainer = document.getElementById('not-show-container');
    if(phones.length < 1){
        notShowContainer.classList.remove('hidden')
    }
    else{
        notShowContainer.classList.add('hidden')
    }
    displayPhones(phones,isShowAll)
}


const displayPhones = (phones,isShowAll) => {
    console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = ''
    // display show all button 
    const showbtncontainer = document.getElementById('show-all-btn');
    if (phones.length > 12 && !isShowAll) {
        showbtncontainer.classList.remove('hidden')
    }
    else{
        showbtncontainer.classList.add('hidden')
    }

    if(!isShowAll){
        phones = phones.slice(0, 12);
    }

    // search items show 
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}"  alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div> `
        phoneContainer.appendChild(phoneCard);

    })
    loadingToggleSpiner(false);
}
// handle show details modal 
const handleShowDetails = async(id) => {
    // console.log('id is clicked',id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const phone = data.data
    showPhoneDetails(phone)
}

// showPhoneDetails modal handle
const showPhoneDetails = (phone) => {
    console.log(phone)
    show_details_modal.showModal()
    const showDetailsPhoneName = document.getElementById('show-Details-Phone-Name');
    showDetailsPhoneName.innerText = phone.name ;
    const showDetailsContainer = document.getElementById('show-Details-container');
    showDetailsContainer.innerHTML = `
    <img src="${phone.image}" />
    <p><span class="font-medium">Storage:</span> ${phone?.mainFeatures?.storage}</p>
    <p><span class="font-medium">Display-Size:</span> ${phone?.mainFeatures?.displaySize}</p>
    <p><span class="font-medium">ChipSet:</span> ${phone?.mainFeatures?.chipSet}</p>
    <p><span class="font-medium">Memory:</span> ${phone?.mainFeatures?.memory}</p>
    <p><span class="font-medium">slug:</span> ${phone?.slug}</p>
    <p><span class="font-medium">Release-Date:</span> ${phone?.releaseDate}</p>
    <p><span class="font-medium">Brand:</span> ${phone?.brand}</p>
    <p><span class="font-medium">GPS:</span>${phone?.others?.GPS || 'NO GPS'}</p>
    <p><span class="font-medium">GPS:</span>${phone.others?.GPS ? phone.others.GPS : 'NO GPS'}</p>
    `
}

// handle search button 
const handleSearch = (isShowAll) => {
    loadingToggleSpiner(true);
    const searchFeild = document.getElementById('search-feild');
    const searchFeildText = searchFeild.value;
    console.log(searchFeildText)
    loadPhone(searchFeildText,isShowAll)
}
// // handle search button2 
// const handleSearch2 = () => {
//     loadingToggleSpiner(true);
//     const searchFeild = document.getElementById('search-feild2');
//     const searchFeildText = searchFeild.value;
//     console.log(searchFeildText)
//     loadPhone(searchFeildText)
// }
// handle loading spiner 
const loadingToggleSpiner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spiner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}

// handle show all button 
const showAllButton = () =>{
    const showbtncontainer = document.getElementById('show-all-btn');
    handleSearch(true) ;
}
loadPhone()

