document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("user-form");
    const userList = document.getElementById("user-list");
    const searchInput = document.getElementById("search");
    const clearFieldsBtn = document.getElementById("clear-fields");
    const clearAllBtn = document.getElementById("clear-all");
    
    function loadUsers() {
        userList.innerHTML = "";
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.forEach(user => addUserToList(user));
    }
    
    function addUserToList(user) {
        const li = document.createElement("li");
        li.textContent = `${user.date} - ${user.name} - ${user.email}`;
        
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Excluir";
        deleteBtn.onclick = () => {
            removeUser(user);
        };
        
        li.appendChild(deleteBtn);
        userList.appendChild(li);
    }
    
    function saveUser(user) {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
    }
    
    function removeUser(userToRemove) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users = users.filter(user => user.email !== userToRemove.email);
        localStorage.setItem("users", JSON.stringify(users));
        loadUsers();
    }
    
    function clearAllUsers() {
        localStorage.removeItem("users");
        loadUsers();
    }
    
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const date = new Date().toLocaleString();
        
        const user = { name, email, date };
        saveUser(user);
        addUserToList(user);
        form.reset();
    });
    
    clearFieldsBtn.addEventListener("click", () => {
        form.reset();
    });
    
    clearAllBtn.addEventListener("click", () => {
        clearAllUsers();
    });
    
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        document.querySelectorAll("#user-list li").forEach(li => {
            li.style.display = li.textContent.toLowerCase().includes(query) ? "block" : "none";
        });
    });
    
    loadUsers();
});
