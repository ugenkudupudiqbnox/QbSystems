/**
 * Initializes the recent posts widget on the blog sidebar.
 * 
 * This function waits for the DOM content to be fully loaded, then creates and appends
 * a list of recent blog posts to the widget container with the ID 'recent-posts-widget'.
 * Each post includes an image, a title with a link, and a publication date.
 * 
 * @example
 * // HTML structure expected:
 * // <div id="recent-posts-widget"></div>
 * 
 * @constant {Array<Object>} recentPosts - An array of recent post objects.
 * @property {string} recentPosts[].imgSrc - The source URL of the post's image.
 * @property {string} recentPosts[].imgAlt - The alt text for the post's image.
 * @property {string} recentPosts[].linkHref - The URL of the post.
 * @property {string} recentPosts[].linkText - The text of the post's link.
 * @property {string} recentPosts[].timeDatetime - The datetime attribute for the post's publication date.
 * @property {string} recentPosts[].timeText - The text content for the post's publication date.
 * 
 * @function
 */
document.addEventListener("DOMContentLoaded", function () {
    const recentPosts = [
        {
            imgSrc: "assets/img/blog/blog-bosa.webp",
            imgAlt: "",
            linkHref: "blog-bosa.html",
            linkText: "Understanding BOSA",
            timeDatetime: "2025-01-01",
            timeText: "Jan 1, 2025"
        },
        {
            imgSrc: "assets/img/blog/blog-wifi6.webp",
            imgAlt: "",
            linkHref: "blog-wifi6.html",
            linkText: "Wi-Fi 6: The Future of Wireless Connectivity",
            timeDatetime: "2024-12-01",
            timeText: "Dec 1, 2024"
        },
        {
            imgSrc: "assets/img/blog/blog-wifi7.webp",
            imgAlt: "",
            linkHref: "blog-wifi7.html",
            linkText: "Wi-Fi 7: The Next Leap in Wireless Technology",
            timeDatetime: "2025-03-05",
            timeText: "Mar 5, 2025"
        }
    ];

    const widgetContainer = document.getElementById('recent-posts-widget');
    const widgetTitle = document.createElement('h3');
    widgetTitle.className = 'widget-title';
    widgetTitle.textContent = 'Recent Posts';
    widgetContainer.appendChild(widgetTitle);

    recentPosts.forEach(post => {
        const postItem = document.createElement('div');
        postItem.className = 'post-item';

        const img = document.createElement('img');
        img.src = post.imgSrc;
        img.alt = post.imgAlt;
        img.className = 'flex-shrink-0';
        postItem.appendChild(img);

        const postContent = document.createElement('div');

        const postTitle = document.createElement('h4');
        const postLink = document.createElement('a');
        postLink.href = post.linkHref;
        postLink.textContent = post.linkText;
        postTitle.appendChild(postLink);
        postContent.appendChild(postTitle);

        const postTime = document.createElement('time');
        postTime.dateTime = post.timeDatetime;
        postTime.textContent = post.timeText;
        postContent.appendChild(postTime);

        postItem.appendChild(postContent);
        widgetContainer.appendChild(postItem);
    });
});
