// HTML template for application elements that the admin will see.
const applicationAdminDivTemplate = `
    <div class="application-admin" id={{application_id}}>
        <div>{{name}}</div>
        <div>\$\{{amount}}</div>
        <div id="status">{{status}}</div>
        <div>
            <button class="status-button" onClick="changeApplicationStatus(this.parentNode.parentNode.id, 'Approved')">Approve</button>
            <button class="status-button" onClick="changeApplicationStatus(this.parentNode.parentNode.id, 'Denied')">Deny</button>
        </div>
    </div>
`

// Populates the applications list with all existing applications (from the database)
async function getApplications(){
    let data = await fetch('../../backend/api/get-applications.php');
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

// Changes the status of a given application if it has not already been approved/denied.
async function changeApplicationStatus(applicationId, newStatus){
    if(document.getElementById(applicationId).querySelector('#status').textContent === "Under Review"){
        let data = await fetch('../../backend/api/update-application-status.php' + '?application_id=' + applicationId + "&new_status=" + newStatus);
        json = await data.json();

        document.getElementById(applicationId).querySelector('#status').textContent = json.new_status;
    }
}