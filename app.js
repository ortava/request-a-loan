// HTML template for application elements that the user will see.
const applicationUserDivTemplate = `
    <div class="application">
        <div>{{name}}</div>
        <div>{{amount}}</div>
        <div>{{status}}</div>
    </div>
`
// HTML template for application elements that the admin will see.
const applicationAdminDivTemplate = `
    <div class="application-admin" id={{application_id}}>
        <div>{{name}}</div>
        <div>{{amount}}</div>
        <div id="status">{{status}}</div>
        <div>
            <button onClick="changeApplicationStatus(this.parentNode.parentNode.id, 'Approved')">Approve</button>
            <button onClick="changeApplicationStatus(this.parentNode.parentNode.id, 'Denied')">Denied</button>
        </div>
    </div>
`

// Changes the status of a given application if it has not already been approved/denied.
async function changeApplicationStatus(applicationId, newStatus){
    if(document.getElementById(applicationId).querySelector('#status').textContent === "Under Review"){
        let data = await fetch('backend/update-application-status.php' + '?application_id=' + applicationId + "&new_status=" + newStatus);
        json = await data.json();

        document.getElementById(applicationId).querySelector('#status').textContent = json.new_status;
    }
}

// Uses php to insert application form data into the database
// and uses that data to place a new HTML element in the applications list
async function addApplication(){
    // Add user_id from URL parameter to form data.
    const formData = new FormData(document.getElementById('form'));
    let params = new URLSearchParams(document.location.search);
    formData.set('user_id', params.get("user_id"));

    let data = await fetch('backend/add-application.php', {
        method: "POST",
        body: formData
    });
    json = await data.json();
    
    let applicationDiv = applicationUserDivTemplate;
    applicationDiv = applicationDiv.replace('{{name}}', json.name);
    applicationDiv = applicationDiv.replace('{{amount}}', json.amount); 
    applicationDiv = applicationDiv.replace('{{status}}', "Under Review"); 

    document.querySelector('#applications').insertAdjacentHTML('beforeend', applicationDiv);
}

// Populates the applications list with all existing applications (from the database)
async function getApplications(){
    let data = await fetch('backend/get-applications.php');
    jsonArray = await data.json();

    for(let i = 0; i < jsonArray.length; i++){
        let applicationDiv = applicationAdminDivTemplate;
        applicationDiv = applicationDiv.replace('{{application_id}}', jsonArray[i].application_id);
        applicationDiv = applicationDiv.replace('{{name}}', jsonArray[i].name);
        applicationDiv = applicationDiv.replace('{{amount}}', jsonArray[i].requested_amount); 
        applicationDiv = applicationDiv.replace('{{status}}', jsonArray[i].application_status); 

        document.querySelector('#applications-admin').insertAdjacentHTML('beforeend', applicationDiv);
    }
}

// Populates the applications list with all existing applications (from the database)
// from a particular user (as determined by URL parameters).
async function getApplicationsByUser(){
    let params = new URLSearchParams(document.location.search);

    let data = await fetch('backend/get-applications-by-user.php' + '?user_id=' + params.get('user_id'));
    jsonArray = await data.json();

    for(let i = 0; i < jsonArray.length; i++){
        let applicationDiv = applicationUserDivTemplate;
        applicationDiv = applicationDiv.replace('{{name}}', jsonArray[i].name);
        applicationDiv = applicationDiv.replace('{{amount}}', jsonArray[i].requested_amount); 
        applicationDiv = applicationDiv.replace('{{status}}', jsonArray[i].application_status); 

        document.querySelector('#applications').insertAdjacentHTML('beforeend', applicationDiv);
    }
}