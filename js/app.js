// ===== GESTION CONNEXION / INSCRIPTION =====

function getUsers() {
    return JSON.parse(localStorage.getItem("zuno_users") || "[]");
}

function saveUsers(users) {
    localStorage.setItem("zuno_users", JSON.stringify(users));
}

function showApp() {
    document.getElementById("authScreen").classList.add("hidden");
}

// Vérifie si déjà connecté
if (localStorage.getItem("zuno_current_user")) {
    showApp();
}

// Bascule entre les onglets Connexion / Inscription
document.getElementById("tabLogin").addEventListener("click", () => {
    document.getElementById("tabLogin").classList.add("active");
    document.getElementById("tabSignup").classList.remove("active");
    document.getElementById("loginForm").style.display = "flex";
    document.getElementById("signupForm").style.display = "none";
});

document.getElementById("tabSignup").addEventListener("click", () => {
    document.getElementById("tabSignup").classList.add("active");
    document.getElementById("tabLogin").classList.remove("active");
    document.getElementById("signupForm").style.display = "flex";
    document.getElementById("loginForm").style.display = "none";
});

// Inscription
document.getElementById("signupBtn").addEventListener("click", () => {
    const name = document.getElementById("signupName").value.trim();
    const username = document.getElementById("signupUsername").value.trim();
    const password = document.getElementById("signupPassword").value;
    const errorEl = document.getElementById("signupError");

    if (!name || !username || !password) {
        errorEl.textContent = "Merci de remplir tous les champs.";
        return;
    }

    const users = getUsers();
    if (users.find(u => u.username === username)) {
        errorEl.textContent = "Ce nom d'utilisateur existe déjà.";
        return;
    }

    users.push({ name, username, password });
    saveUsers(users);
    localStorage.setItem("zuno_current_user", username);
    errorEl.textContent = "";
    showApp();
});

// Connexion
document.getElementById("loginBtn").addEventListener("click", () => {
    const username = document.getElementById("loginName").value.trim();
    const password = document.getElementById("loginPassword").value;
    const errorEl = document.getElementById("loginError");

    const users = getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        errorEl.textContent = "Nom d'utilisateur ou mot de passe incorrect.";
        return;
    }

    localStorage.setItem("zuno_current_user", username);
    errorEl.textContent = "";
    showApp();
});
// Bascule entre les onglets Connexion / Inscription
document.getElementById("tabLogin").addEventListener("click", () => {
    document.getElementById("tabLogin").classList.add("active");
    document.getElementById("tabSignup").classList.remove("active");
    document.getElementById("loginForm").style.display = "flex";
    document.getElementById("signupForm").style.display = "none";
});

document.getElementById("tabSignup").addEventListener("click", () => {
    document.getElementById("tabSignup").classList.add("active");
    document.getElementById("tabLogin").classList.remove("active");
    document.getElementById("signupForm").style.display = "flex";
    document.getElementById("loginForm").style.display = "none";
});const stories = [
    {
        id: 1,
        name: "David",
        avatar: "https://i.pravatar.cc/150?img=12",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
    },
    {
        id: 2,
        name: "Aminata",
        avatar: "https://i.pravatar.cc/150?img=5",
        image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800"
    },
    {
        id: 3,
        name: "Christelle",
        avatar: "https://i.pravatar.cc/150?img=9",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800"
    }
];

function renderStories() {
    const container = document.getElementById("stories");
    container.innerHTML = `
        <div class="story-item">
            <div class="story-avatar add-story">+</div>
            <span class="story-name">Votre story</span>
        </div>
        ${stories.map(story => `
            <div class="story-item" data-id="${story.id}">
                <div class="story-avatar"><img src="${story.avatar}" alt=""></div>
                <span class="story-name">${story.name}</span>
            </div>
        `).join("")}
    `;

    document.querySelectorAll(".story-item[data-id]").forEach(item => {
        item.addEventListener("click", () => openStory(item.dataset.id));
    });
}

let storyTimer;

function openStory(id) {
    const story = stories.find(s => s.id == id);
    document.getElementById("viewerAvatar").src = story.avatar;
    document.getElementById("viewerName").textContent = story.name;
    document.getElementById("viewerImage").src = story.image;
    document.getElementById("storyViewer").classList.add("active");

    const fill = document.getElementById("progressFill");
    fill.style.width = "0%";
    let progress = 0;

    clearInterval(storyTimer);
    storyTimer = setInterval(() => {
        progress += 2;
        fill.style.width = progress + "%";
        if (progress >= 100) {
            closeStory();
        }
    }, 100);
}

function closeStory() {
    clearInterval(storyTimer);
    document.getElementById("storyViewer").classList.remove("active");
}

document.getElementById("closeStory").addEventListener("click", closeStory);
const posts = [
    {
        id: 1,
        username: "Aminata Diarrassouba",
        time: "2h",
        avatar: "https://i.pravatar.cc/150?img=5",
        text: "La vie est faite de petits bonheurs. Profitez de chaque instant ✨❤️",
        image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=600",
        likes: 128,
        comments: 26,
        liked: false
    },
    {
        id: 2,
        username: "Koffi Bryan",
        time: "5h",
        avatar: "https://i.pravatar.cc/150?img=12",
        text: "Aujourd'hui était une bonne journée !",
        image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600",
        likes: 342,
        comments: 41,
        liked: false
    },
    {
        id: 3,
        username: "Christelle Kouamé",
        time: "1j",
        avatar: "https://i.pravatar.cc/150?img=9",
        text: "La confiance en soi est le premier secret du succès ✨",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600",
        likes: 256,
        comments: 33,
        liked: false
    }
];

function renderPosts() {
    const feed = document.getElementById("feed");
    feed.innerHTML = posts.map(post => `
        <div class="post">
            <div class="post-header">
                <div class="post-avatar">
                    <img src="${post.avatar}" alt="${post.username}">
                </div>
                <div class="post-user-info">
                    <div class="post-username">${post.username}</div>
                    <div class="post-time">${post.time}</div>
                </div>
                <div class="post-menu">⋯</div>
            </div>
            <div class="post-text">${post.text}</div>
            <img class="post-image" src="${post.image}" alt="">
            <div class="post-actions">
                <div class="post-action like-btn ${post.liked ? 'liked' : ''}" data-id="${post.id}">
                    <span class="like-icon">${post.liked ? '❤️' : '🤍'}</span> ${post.likes}
                </div>
                <div class="post-action">💬 ${post.comments}</div>
                <div class="post-action">↗️ Partager</div>
            </div>
        </div>
    `).join("");

    // Ajoute les clics sur chaque bouton "j'aime"
    document.querySelectorAll(".like-btn").forEach(btn => {
        btn.addEventListener("click", () => toggleLike(btn.dataset.id));
    });
}

function toggleLike(id) {
    const post = posts.find(p => p.id == id);
    if (post.liked) {
        post.liked = false;
        post.likes -= 1;
    } else {
        post.liked = true;
        post.likes += 1;
    }
    renderPosts();
}

renderStories();
renderPosts();const galleryImages = [
    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300",
    "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=300"
];

function renderProfileGrid() {
    const grid = document.getElementById("profileGrid");
    grid.innerHTML = galleryImages.map(img => `<img src="${img}" alt="">`).join("");
}
renderProfileGrid();

document.getElementById("openProfile").addEventListener("click", () => {
    document.getElementById("profileScreen").classList.add("active");
});

document.getElementById("closeProfile").addEventListener("click", () => {
    document.getElementById("profileScreen").classList.remove("active");
});

document.getElementById("followBtn").addEventListener("click", function() {
    this.classList.toggle("following");
    this.textContent = this.classList.contains("following") ? "Abonné" : "Suivre";
});const conversations = [
    { name: "Aminata Diarrassouba", avatar: "https://i.pravatar.cc/150?img=5", lastMsg: "D'accord, à demain alors !", time: "2 min", online: true, unread: 2 },
    { name: "David Konan", avatar: "https://i.pravatar.cc/150?img=12", lastMsg: "Tu as vu la story ?", time: "15 min", online: true, unread: 1 },
    { name: "Christelle Kouamé", avatar: "https://i.pravatar.cc/150?img=9", lastMsg: "Merci beaucoup 🙏", time: "1 h", online: false, unread: 0 },
    { name: "Sarah Yao", avatar: "https://i.pravatar.cc/150?img=20", lastMsg: "On se voit ce weekend ?", time: "3 h", online: false, unread: 0 }
];

function renderConversations() {
    const list = document.getElementById("conversationsList");
    list.innerHTML = conversations.map(conv => `
        <div class="conversation-item">
            <div class="conv-avatar">
                <img src="${conv.avatar}" alt="">
                ${conv.online ? '<span class="online-dot"></span>' : ''}
            </div>
            <div class="conv-info">
                <div class="conv-name">${conv.name}</div>
                <div class="conv-last-msg">${conv.lastMsg}</div>
            </div>
            <div class="conv-meta">
                <span class="conv-time">${conv.time}</span>
                ${conv.unread > 0 ? `<span class="conv-badge">${conv.unread}</span>` : ''}
            </div>
        </div>
    `).join("");
}
renderConversations();

document.getElementById("openMessages").addEventListener("click", () => {
    document.getElementById("messagesScreen").classList.add("active");
});

document.getElementById("closeMessages").addEventListener("click", () => {
    document.getElementById("messagesScreen").classList.remove("active");
});const videos = [
    {
        id: 1,
        username: "@Christelle_225",
        avatar: "https://i.pravatar.cc/150?img=9",
        caption: "La confiance en soi est le premier secret du succès ✨",
        bg: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
        likes: 12500,
        comments: 356,
        liked: false
    },
    {
        id: 2,
        username: "@David_K",
        avatar: "https://i.pravatar.cc/150?img=12",
        caption: "Coucher de soleil magique ce soir 🌅",
        bg: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        likes: 8300,
        comments: 210,
        liked: false
    },
    {
        id: 3,
        username: "@Aminata_D",
        avatar: "https://i.pravatar.cc/150?img=5",
        caption: "Petits bonheurs du quotidien ❤️",
        bg: "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800",
        likes: 15200,
        comments: 489,
        liked: false
    }
];

function formatCount(n) {
    if (n >= 1000) return (n / 1000).toFixed(1) + "K";
    return n;
}

function renderVideos() {
    const feed = document.getElementById("videosFeed");
    feed.innerHTML = videos.map(v => `
        <div class="video-item" style="background-image: url('${v.bg}')">
            <div class="video-overlay">
                <div class="video-info">
                    <div class="video-username">${v.username}</div>
                    <div class="video-caption">${v.caption}</div>
                </div>
                <div class="video-side-actions">
                    <div class="video-side-avatar"><img src="${v.avatar}" alt=""></div>
                    <div class="video-action video-like-btn ${v.liked ? 'liked' : ''}" data-id="${v.id}">
                        <span>${v.liked ? '❤️' : '🤍'}</span>
                        <span class="count">${formatCount(v.likes)}</span>
                    </div>
                    <div class="video-action">
                        <span>💬</span>
                        <span class="count">${v.comments}</span>
                    </div>
                    <div class="video-action">
                        <span>↗️</span>
                        <span class="count">Partager</span>
                    </div>
                </div>
            </div>
        </div>
    `).join("");

    document.querySelectorAll(".video-like-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const video = videos.find(v => v.id == btn.dataset.id);
            video.liked = !video.liked;
            video.likes += video.liked ? 1 : -1;
            renderVideos();
        });
    });
}
renderVideos();

document.getElementById("openVideos").addEventListener("click", () => {
    document.getElementById("videosScreen").classList.add("active");
});

document.getElementById("closeVideos").addEventListener("click", () => {
    document.getElementById("videosScreen").classList.remove("active");
});let pendingImage = null;
const sampleImages = [
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600",
    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600"
];

document.getElementById("openCreate").addEventListener("click", () => {
    document.getElementById("createScreen").classList.add("active");
});

document.getElementById("closeCreate").addEventListener("click", () => {
    document.getElementById("createScreen").classList.remove("active");
});

document.getElementById("addPhotoBtn").addEventListener("click", () => {
    pendingImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    document.getElementById("createPreview").innerHTML = `<img src="${pendingImage}" alt="">`;
});

document.getElementById("publishBtn").addEventListener("click", () => {
    const content = document.getElementById("postContent").value.trim();
    if (!content && !pendingImage) return;

    const newPost = {
        id: Date.now(),
        username: "Koffi Bryan",
        time: "à l'instant",
        avatar: "https://i.pravatar.cc/150?img=12",
        text: content,
        image: pendingImage || sampleImages[0],
        likes: 0,
        comments: 0,
        liked: false
    };

    posts.unshift(newPost);
    renderPosts();

    // Reset du formulaire
    document.getElementById("postContent").value = "";
    document.getElementById("createPreview").innerHTML = "";
    pendingImage = null;

    document.getElementById("createScreen").classList.remove("active");
});const notifications = [
    { id: 1, name: "Aminata Diarrassouba", avatar: "https://i.pravatar.cc/150?img=5", action: "a aimé votre publication.", time: "2 min", unread: true },
    { id: 2, name: "David Konan", avatar: "https://i.pravatar.cc/150?img=12", action: "a commenté votre publication.", time: "15 min", unread: true },
    { id: 3, name: "Christelle Kouamé", avatar: "https://i.pravatar.cc/150?img=9", action: "a partagé votre publication.", time: "1 h", unread: false },
    { id: 4, name: "Koffi Bryan", avatar: "https://i.pravatar.cc/150?img=12", action: "a commencé à vous suivre.", time: "2 h", unread: false },
    { id: 5, name: "Sarah Yao", avatar: "https://i.pravatar.cc/150?img=20", action: "a mentionné dans un commentaire.", time: "3 h", unread: false }
];

function renderNotifications() {
    const list = document.getElementById("notificationsList");
    list.innerHTML = notifications.map(n => `
        <div class="notif-item ${n.unread ? 'unread' : ''}">
            <div class="notif-avatar"><img src="${n.avatar}" alt=""></div>
            <div class="notif-content">
                <strong>${n.name}</strong> ${n.action}
                <span class="notif-time">${n.time}</span>
            </div>
            ${n.unread ? '<div class="notif-dot"></div>' : ''}
        </div>
    `).join("");
}
renderNotifications();

document.getElementById("openNotifications").addEventListener("click", () => {
    document.getElementById("notificationsScreen").classList.add("active");
});

document.getElementById("closeNotifications").addEventListener("click", () => {
    document.getElementById("notificationsScreen").classList.remove("active");
});

document.getElementById("markReadBtn").addEventListener("click", () => {
    notifications.forEach(n => n.unread = false);
    renderNotifications();
});