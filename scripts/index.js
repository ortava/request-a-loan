// Redirect to appropriate view based on user_type and user_id values on this page.
function buttonRedirect(){
    if(document.getElementById('admin').checked){
        window.location.href = "./pages/admin.html";
    } else if(document.getElementById('user').checked){
        window.location.href = "./pages/user.html?user_id=" + document.getElementById('user_id').value;
    }
}

// Redirect in the case of manually entered URL parameters.
function parameterRedirect(){
    let params = new URLSearchParams(document.location.search);
    
    if(params.get("user_type") === "admin"){
        window.location.href = "./pages/admin.html";
    } else if(params.get("user_type") === "user"){
        window.location.href = "./pages/user.html?user_id=" + params.get("user_id");
    }
}

// Enable/disable user_id textbox depending on which user_type is checked.
function onUserTypeChanged() {
    if(document.getElementById('user').checked) {
        document.getElementById('user_id').disabled = false;
    } else if(document.getElementById('admin').checked) {
        document.getElementById('user_id').disabled = true;
    }
}