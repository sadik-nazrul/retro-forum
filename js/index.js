// Load all posts form the given API
const loadPost = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await response.json();
    const posts = data.posts;
    displayPost(posts)
}

// Get posts individulaly for showing in the UI which is retro foum landing page
const displayPost = posts => {

    // Get The post Container
    const postContainer = document.getElementById('post-container');

    // Loop trough and get individual post
    posts.forEach(post => {
        // console.log(post.title);
        const postCard = document.createElement('div');
        postCard.className = `grid grid-cols-3 gap-5 border p-5 bg-[#797DFC10] rounded-xl items-center`;
        postCard.innerHTML = `
        <div class="avatar ${post.isActive ? 'online' : 'offline'}">
            <img class="rounded-full w-8" src="${post.image}" alt="${post.author.name}">
        </div>
        <!-- Post Everything -->
        <div class="space-y-3 col-span-2">
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
            <img src="./assets/marked.svg" alt="" onclick="markAsRead('${post.title}', ${post.view_count})">
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

const markAsRead = (title, view)=>{
    console.log(title, view);
    
    markedCount++
    readCount.innerText = markedCount;
    
    const markDiv = document.createElement('div');
    markDiv.className = `flex justify-between gap-4 bg-white p-4 rounded-xl`;
    markDiv.innerHTML = `
    <!-- title -->
    <p>${title? title: 'not found'}</p>
    <div class="flex gap-1 items-center">
        <img src="./assets/views.svg" alt="Views">
        <p>${view? view: 'not found'}</p>
    </div>
    `
    markContainer.appendChild(markDiv);
}

loadPost();