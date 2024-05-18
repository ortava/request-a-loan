// HTML template for application elements.
const applicationDivTemplate = `
    <div class="application">
        <div>{{name}}</div>
        <div>{{amount}}</div>
        <div>{{status}}</div>
    </div>
`

// Uses php to insert application form data into the database
// and uses that data to place a new HTML element in the applications list
async function addApplication(){
    let data = await fetch('backend/add-application.php', {
        method: "POST",
        body: new FormData(document.getElementById('form'))
    });
    json = await data.json();    
    
    let applicationDiv = applicationDivTemplate;
    applicationDiv = applicationDiv.replace('{{name}}', json.name);
    applicationDiv = applicationDiv.replace('{{amount}}', json.amount); 
    applicationDiv = applicationDiv.replace('{{status}}', "Under Review"); 

    document.querySelector('#applications').insertAdjacentHTML('beforeend', applicationDiv);
}

