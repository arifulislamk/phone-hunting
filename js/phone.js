const loadPhone = async (searchFeildText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchFeildText}`)
    const data = await res.json()
    const phones = data.data
    // console.log(phones)
    displayPhones(phones)

}


const displayPhones = phones => {
    console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = ''
    // display show all button 
    const showbtncontainer = document.getElementById('show-all-btn');
    if (phones.length > 12) {
        showbtncontainer.classList.remove('hidden')
    }
    else{
        showbtncontainer.classList.add('hidden')
    }

    phones = phones.slice(0, 12);

    // search items show 
    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}"  alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div> `
        phoneContainer.appendChild(phoneCard);

    })
    loadingToggleSpiner(false);
}

// handle search button 
const handleSearch = () => {
    loadingToggleSpiner(true);
    const searchFeild = document.getElementById('search-feild');
    const searchFeildText = searchFeild.value;
    console.log(searchFeildText)
    loadPhone(searchFeildText)
}
// handle search button2 
const handleSearch2 = () => {
    loadingToggleSpiner(true);
    const searchFeild = document.getElementById('search-feild2');
    const searchFeildText = searchFeild.value;
    console.log(searchFeildText)
    loadPhone(searchFeildText)
}
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
