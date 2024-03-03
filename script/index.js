const postCard = document.getElementById('posts-card')
const selectedCardContainer = document.getElementById('selected-card-container')
const readCountElement = document.getElementById('read-count')
const ActiveIndicator = document.getElementById('active-indicator')
const latestCardContainer = document.getElementById('latest-card-container')
const searchInputField = document.getElementById('search-input')
const loadPostCard = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data = await response.json();
    // console.log(data.posts)
    const allCard = data.posts;
    allCard.forEach(element => {
        // console.log(element.isActive)
        const activeUser = element.isActive;
        // console.log(activeUser)
        const card = document.createElement('div')
        card.classList = ` bg-[#f6f6f7] p-10 rounded-xl gap-6 flex`
        card.innerHTML = `
                            <!--auth image  -->
                            <div class="size-20 relative">
                              <img class="rounded-xl" src="${element.image}" alt="">
                                <div id="active-indicator" class=" ${activeUser === true ? 'bg-green-500' : "bg-red-500"} border-2 border-white absolute size-5 -translate-x-3 translate-y-3 bottom-full left-full  rounded-full">
                                </div> 
                            </div>
                            <!-- auth info and post-->
                            <div class="space-y-3 w-full">
                              <div class="flex gap-10">
                                <p># ${element.category}</p>
                                <p>Author : <span>${element.author.name}</span></p>
                              </div>
                              <h5 class="font-extrabold text-2xl">${element.title}</h5>
                              <p class="opacity-80">${element.description}</p>
                              <div class="divider m-0"></div> 
                              <div class="flex justify-between">
                                <div class="flex gap-10 opacity-80">
                                  <P><i class="fa-regular fa-comment"></i> <span> ${element.comment_count}</span></P>
                                  <P><i class="fa-regular fa-eye"></i><span> ${element.view_count}</span></P>
                                  <P><i class="fa-regular fa-clock"></i><span> ${element.posted_time} min</span></P>
                                </div>
                                <button onclick="selectCard('${element.title.replace(/'/g,'')}' ,' ${element.view_count}')" class="rounded-[100%] text-white bg-green-400 py-2 px-3"><i class="fa-regular fa-envelope-open"></i></button>
                              </div>
                            </div>
                        
        `
        // console.log()
        postCard.appendChild(card)
    });
}

const loadLatestPostCard = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/latest-posts`);
    const data = await response.json();
    // console.log(data[0].title)
    data.forEach(element => {
        // console.log(element.title)

        const latestCard = document.createElement('div')
        latestCard.classList = `card bg-base-100 shadow-xl border-2`
        latestCard.innerHTML = `
        
                    
                    <figure class="px-10 pt-10">
                      <img src="${element.cover_image}" alt="" class="rounded-xl" />
                    </figure>
                    <div class="card-body ">
                      <div class="flex items-center gap-3">
                        <i class="fa-regular fa-calendar"></i>
                        <p>${element.author.posted_date ? element.author.posted_date : 'No publish date'}</p>
                      </div>
                      <h2 class="card-title font-extrabold">${element.title}</h2>
                      <p class="opacity-80">${element.description}</p>
                      <div class="flex gap-6">
                          <img class="size-12 rounded-full" src="${element.profile_image}" alt="">
                        <div>
                          <h5 class="font-extrabold">${element.author.name}</h5>
                          <p class="opacity-80">${element.author.designation ? element.author.designation : 'Unknown'}</p>
                        </div>
                      </div>
                    </div>
                  
        `

        latestCardContainer.appendChild(latestCard)
    });

}

const searchCategoryPost = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${id}`)
    const data = await response.json();
    postCard.innerHTML = ''
    // console.log(data.posts)
    data.posts.forEach(element => {
        // console.log(element)
        
        const activeUser = element.isActive;
        // console.log(activeUser)
        const card = document.createElement('div')
        card.classList = ` bg-[#f6f6f7] p-10 rounded-xl gap-6 flex`
        card.innerHTML = `
                            <!--auth image  -->
                            <div class="size-20 relative">
                              <img class="rounded-xl" src="${element.image}" alt="">
                                <div id="active-indicator" class=" ${activeUser === true ? 'bg-green-500' : "bg-red-500"} border-2 border-white absolute size-5 -translate-x-3 translate-y-3 bottom-full left-full  rounded-full">
                                </div> 
                            </div>
                            <!-- auth info and post-->
                            <div class="space-y-3 w-full">
                              <div class="flex gap-10">
                                <p># ${element.category}</p>
                                <p>Author : <span>${element.author.name}</span></p>
                              </div>
                              <h5 class="font-extrabold text-2xl">${element.title}</h5>
                              <p class="opacity-80">${element.description}</p>
                              <div class="divider m-0"></div> 
                              <div class="flex justify-between">
                                <div class="flex gap-10 opacity-80">
                                  <P><i class="fa-regular fa-comment"></i> <span> ${element.comment_count}</span></P>
                                  <P><i class="fa-regular fa-eye"></i><span> ${element.view_count}</span></P>
                                  <P><i class="fa-regular fa-clock"></i><span> ${element.posted_time} min</span></P>
                                </div>
                                <button onclick="selectCard('${element.title}' ,' ${element.view_count}')" class="rounded-[100%] text-white bg-green-400 py-2 px-3"><i class="fa-regular fa-envelope-open"></i></button>
                              </div>
                            </div>
                        
        `
        // console.log()
        postCard.appendChild(card)
    });
}

const getSearchInput = () => {
    const inputText = searchInputField.value;
    searchCategoryPost(inputText)
}


let readCount = 0;
const selectCard = (title, view) => {

    // console.log(title,view,"bello")
    const selectedCard = document.createElement('div')
    selectedCard.classList = `flex justify-between p-6 gap-5 bg-white rounded-xl`
    selectedCard.innerHTML = `
        <h4 class="text-xl font-extrabold">${title}</h4>
        <div class="flex gap-3 items-center">
         <i class="fa-regular fa-eye font-extrabold"></i>
         <P class="font-extrabold"></i><span> ${view}</span></P>
        `
    console.log(readCount)
    selectedCardContainer.appendChild(selectedCard)
    readCount++;
    readCountElement.innerText = readCount;
}
loadLatestPostCard();
loadPostCard();