
let isIdeas = false;

/****
 ******** LISTENERS   *******
 */
// isIdeas = false  ===>  need fresh ideas form the database:
setInterval(() => {
    if (isIdeas) return;
    console.warn('listen to ideas list changes on: isIdeas = ' + false)
    ideas = API_ALL_IDEAS().then((d) => {
        //re populate all the ideas in the site :
        // site for the ideas in the APP . 
        // 1. add idea section in the operations section we have populate function there so lets call it right here  : 
        //rePopulateIdeaList(); //TODO
        //rePopulateEditIdeaList();
        console.log(d)
    });
    isIdeas = true;
}, 500)


/***
************ Operations ****************
*/

//get all the ideas from the database : 
async function API_ALL_IDEAS() {
    ideas = await fetchIdeas()
    return ideas;
}

// add new idea to the database : 
async function ADD_NEW_IDEA(data) {
    const idea = await addNewIdeaASYNC(data);
    return idea
}

//delete idea request . 
// async request : 
async function DELETE_IDEA_API_BY_ID(data) {
    const result = await DELETE_IDEA_API_BY_IDAsync(data);
    //isIdeas = false;
    return result
}

//edit idea request: 
// async request : 
async function EDIT_IDEA_API(data) {
    const result = await EDIT_IDEA_APIAsync(data);
    return result
}









/****
 * 
 * Async Section : 
 * 
 */

const addNewIdeaASYNC = (data) => {
    return new Promise(resolve => {
        const method = urls.idea.add.method; // HTTP Request Type
        const url = urls.apiBase + urls.idea.add.path; // url
        const contentType = 'application/json'; //content type
        const dataType = 'JSON' //response Data
        const success = (res) => {
            resolve(res)
        }
        //send ajax : 
        $.ajax({ method, contentType, url, data, success, dataType })
    });
}

function fetchIdeas() {
    return new Promise(resolve => {
        const url = urls.apiBase + urls.idea.all.path
        const method = urls.idea.all.method
        $.ajax({
            method,
            url,
            data: {},
            success: (ideas) => {
                resolve(ideas);
            },
            dataType: 'JSON'
        })
    })
}


function DELETE_IDEA_API_BY_IDAsync(id) {
    return new Promise(resolve => {
        const method = 'GET'; // HTTP Request Type
        const url = urls.apiBase + '/idea/api/delete?id=' + id; // url
        const contentType = 'application/json'; //content type
        const dataType = 'JSON' //response Data
        const success = (result) => {
            resolve(result)
        }
        //send ajax : 
        $.ajax({ method, contentType, url, success, dataType })
    });
}


const EDIT_IDEA_APIAsync = (data) => {
    return new Promise(resolve => {
        const method = 'POST'; // HTTP Request Type
        const url = urls.apiBase + urls.idea.edit.path; // url
        const contentType = 'application/json'; //content type
        const dataType = 'JSON' //response Data
        const success = (result) => {
            resolve(result)
        }
        //send ajax : 
        $.ajax({ method, contentType, url, data, success, dataType })
    });
}