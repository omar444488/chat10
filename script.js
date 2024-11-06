document.addEventListener("DOMContentLoaded", () => {
    const addPostBtn = document.getElementById("addPostBtn");
    const postsContainer = document.getElementById("postsContainer");
    const viewPublishedPostsBtn = document.getElementById("viewPublishedPostsBtn");
    let publishedPosts = JSON.parse(localStorage.getItem("publishedPosts")) || [];

    addPostBtn.addEventListener("click", () => {
        const postHTML = `
            <div class="post">
                <input type="text" class="userName" placeholder="اسمك لو سمحت" />
                <textarea class="postContent" placeholder="اكتب الي تبغاه" maxlength="1000"></textarea>
                <div class="post-buttons">
                    <button class="publishBtn">نشر</button>
                    <button class="deleteBtn">حذف</button>
                </div>
            </div>
        `;
        postsContainer.innerHTML += postHTML;
    });

    postsContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("publishBtn")) {
            publishPost(event.target);
        }
        if (event.target.classList.contains("deleteBtn")) {
            deletePost(event.target);
        }
    });

    function publishPost(button) {
        const post = button.closest(".post");
        const userName = post.querySelector(".userName").value;
        const postContent = post.querySelector(".postContent").value;

        if (userName && postContent) {
            if (postContent.split(/\s+/).length <= 1000) {
                publishedPosts.push({ name: userName, content: postContent });
                localStorage.setItem("publishedPosts", JSON.stringify(publishedPosts));
                alert("تم نشر المقال");
                post.querySelector(".userName").value = '';
                post.querySelector(".postContent").value = '';
            } else {
                alert("المقال يجب أن لا يتجاوز 1000 كلمة");
            }
        } else {
            alert("يرجى كتابة المحتوى واسمك");
        }
    }

    function deletePost(button) {
        const post = button.closest(".post");
        post.remove();
    }

    viewPublishedPostsBtn.addEventListener("click", () => {
        window.location.href = "published.html";
    });
});
