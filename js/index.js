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
        console.log(post);
        const postCard = document.createElement('div');
        postCard.className = `flex gap-4 border p-5 bg-[#797DFC10] rounded-xl`;
        postCard.innerHTML = `
        <!-- Author Image -->
        <div>
        <img src="./assets/user.svg" alt="author image">
        </div>

        <!-- Post Everything -->
        <div class="space-y-3">

        <!-- Category & Author -->
        <div class="flex gap-5">
            <p>#Music</p>
            <p><span class="font-semibold">Authon:</span> Awlad Hossain</p>
        </div>

        <!-- Title & description -->
        <div class="space-y-2 border-b-2 border-dashed pb-3">
            <h2 class="text-xl font-semibold">10 Kids Unaware of Their Halloween Costume</h2>
            <p>It's one thing to subject yourself to ha Halloween costume mishap because, hey that's your prerogative</p>
        </div>

        <!-- Post like, comment & reading time -->
        <div class="flex justify-between">
            <!-- Info -->
            <div class="flex gap-5">
                <!-- comment -->
                <div class="flex gap-1 items-center">
                    <img src="./assets/comments.svg" alt="comments">
                    <p>560</p>
                </div>

                <!-- Views -->
                <div class="flex gap-1 items-center">
                    <img src="./assets/views.svg" alt="comments">
                    <p>560</p>
                </div>

                <!-- Read time -->
                <div class="flex gap-1 items-center">
                    <img src="./assets/readTime.svg" alt="comments">
                    <p>560 <span>min</span></p>
                </div>
            </div>

            <!-- Marked -->
            <img src="./assets/marked.svg" alt="">
        </div>
        </div>
        `
        postContainer.appendChild(postCard);
    });
}

loadPost();