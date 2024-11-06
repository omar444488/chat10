document.addEventListener("DOMContentLoaded", () => {
    const publishedPostsContainer = document.getElementById("publishedPostsContainer");
    let publishedPosts = JSON.parse(localStorage.getItem("publishedPosts")) || [];

    publishedPosts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        postElement.innerHTML = `
            <strong>${post.name}</strong>
            <p>${post.content}</p>
            <button class="deleteBtn" style="display: none;">حذف</button>
        `;

        const currentUser = prompt("يرجى إدخال اسمك:");
        if (currentUser === post.name) {
            postElement.querySelector(".deleteBtn").style.display = "inline-block";
        }

        publishedPostsContainer.appendChild(postElement);

        postElement.querySelector(".deleteBtn").addEventListener("click", () => {
            publishedPosts = publishedPosts.filter(p => p.content !== post.content || p.name !== post.name);
            localStorage.setItem("publishedPosts", JSON.stringify(publishedPosts));
            postElement.remove();
        });
    });
});
