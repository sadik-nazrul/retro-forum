// Load all posts form the given API
const loadPost = async () => {
    // Loader on
    const loader = document.getElementById('loading');
    loader.classList.remove('hidden');
    // console.log(searchPost);
    const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await response.json();
    const posts = data.posts;
    displayPost(posts)
}


// Categoriy post fetching based on Searched category
const catPost = async (searchFieldText) => {
    const loader = document.getElementById('loading');
    loader.classList.remove('hidden');
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchFieldText}`);
    const data = await response.json();
    const searchPosts = data.posts
    if (searchPosts.length === 0) {
        dataNotFound(searchPosts)
    }
    else {
        displayPost(searchPosts);
    }
}

// Data not found function
const dataNotFound = () => {
    const postContainer = document.getElementById('post-container');
    postContainer.innerHTML = `
    <h2 class="p-10 text-4xl font-bold font-mulish">No Data Found serch by valid category which is: coding, comedy, & music"</h2>`
}

// Get posts individulaly for showing in the UI which is retro foum landing page
const displayPost = posts => {

    // Get The post Container
    const postContainer = document.getElementById('post-container');
    postContainer.textContent = ''

    // Loop trough and get individual post
    posts.forEach(post => {
        // loader off
        const loader = document.getElementById('loading');
        loader.classList.add('hidden');

        // console.log(post.title);
        const postCard = document.createElement('div');
        postCard.className = `grid lg:grid-cols-5 gap-5 border p-5 bg-[#797DFC10] rounded-xl items-center`;
        postCard.innerHTML = `
        <div class="flex justify-center">
        <div class="avatar w-24 ${post.isActive ? 'online' : 'offline'}">
            <img class="rounded-full w-8" src="${post.image}" alt="${post.author.name}">
        </div>
        </div>
        <!-- Post Everything -->
        <div class="space-y-3 col-span-4">
        <!-- Category & Author -->
        <div class="flex gap-5">
            <p># ${post.category}</p>
            <p><span class="font-semibold">Authon:</span> ${post.author.name}</p>
        </div>

        <!-- Title & description -->
        <div class="space-y-2 border-b-2 border-dashed pb-3">
            <h2 class="text-xl font-semibold">${post.title}</h2>
            <p>${post.description}</p>
        </div>

        <!-- Post like, comment & reading time -->
        <div class="flex justify-between">
            <!-- Info -->
            <div class="flex gap-5">
                <!-- comment -->
                <div class="flex gap-1 items-center">
                    <img src="./assets/comments.svg" alt="comments">
                    <p>${post.comment_count}</p>
                </div>

                <!-- Views -->
                <div class="flex gap-1 items-center">
                    <img src="./assets/views.svg" alt="comments">
                    <p>${post.view_count}</p>
                </div>

                <!-- Read time -->
                <div class="flex gap-1 items-center">
                    <img src="./assets/readTime.svg" alt="comments">
                    <p>${post.posted_time} <span>min</span></p>
                </div>
            </div>

            <!-- Marked -->
            <img src="./assets/marked.svg" alt="" onclick="markAsRead('${post?.title || 'Not Found'}', ${post?.view_count || 'Not Found'})">
        </div>
        </div>
        `
        postContainer.appendChild(postCard);
    });
}


// Mark as read
let markedCount = 0;
const markContainer = document.getElementById('mark-container');
let readCount = document.getElementById('readCount');
readCount.innerText = markedCount;

const markAsRead = (title, view) => {
    console.log(title, view);

    markedCount++
    readCount.innerText = markedCount;

    const markDiv = document.createElement('div');
    markDiv.className = `flex justify-between gap-4 p-4 rounded-xl shadow`;
    markDiv.innerHTML = `
    <!-- title -->
    <p>${title ? title : 'not found'}</p>
    <div class="flex gap-1 items-center">
        <img src="./assets/views.svg" alt="Views">
        <p>${view ? view : 'not found'}</p>
    </div>
    `
    markContainer.appendChild(markDiv);
}

// Fetch Latest Post
const loadLatestPost = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await response.json();
    displayLatestPost(data);
}

// Display Latest Post in UI
const displayLatestPost = data => {
    // Get lateste post container
    const latestPostContainer = document.getElementById('latest-post-container');

    // Iterate latest posts array and get single post
    data.forEach(latestPost => {
        const latestPostCard = document.createElement('div');
        latestPostCard.className = `flex flex-col gap-3 border p-4 rounded-xl justify-between m-2 lg:m-0`;
        latestPostCard.innerHTML = `
        <!-- Featured Image -->
        <img class="rounded-lg" src="${latestPost.cover_image ? latestPost.cover_image : 'Not found'}" alt="">

        <!-- Publish Info -->
        <div class="flex gap-2 items-center">
            <img src="./assets/calender.svg" alt="">
            <p>${latestPost.author.posted_date ? latestPost.author.posted_date : 'No publish date'}</p>
        </div>

        <!-- Title -->
        <h2 class="text-lg font-semibold">${latestPost.title ? latestPost.title : 'Not Found'}</h2>

        <!-- Exert -->
        <p>${latestPost.description ? latestPost.description : 'No Data Found'}</p>

        <!-- Author Info -->
        <div class="flex gap-4">
            <img class="w-16 rounded-full" src="${latestPost?.profile_image || 'Not found'}" alt="">

            <div>
                <h3 class="text-sm font-bold">${latestPost?.author?.name || 'author not found'}</h3>
                <p>${latestPost?.author?.designation || 'Unknown'}</p>
            </div>
        </div>
        `;
        latestPostContainer.appendChild(latestPostCard);
    });
}

// Seartch post
const searchField = document.getElementById('search-field')
const searchPost = () => {
    const searchFieldText = searchField.value;

    if (searchFieldText) {
        catPost(searchFieldText);
    }
    else {
        alert('enter valid key')
    }
}


loadLatestPost()

loadPost();