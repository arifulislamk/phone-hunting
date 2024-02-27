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
        </div>
        `
        phoneContainer.appendChild(phoneCard);

    })

}

// handle search button 

const handleSearch = () => {
    const searchFeild = document.getElementById('search-feild');
    const searchFeildText = searchFeild.value ;
    console.log(searchFeildText)
    loadPhone(searchFeildText)
}

