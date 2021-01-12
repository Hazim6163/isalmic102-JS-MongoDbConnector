
let isCategories = false;

/****
 ******** LISTENERS   *******
 */
// isCategories = false  ===>  need fresh categories form the database:
setInterval(() => {
    if (isCategories) return;
    console.warn('listen to categories list changes on: isCategories = ' + false)
    categories = API_ALL_CATEGORIES().then(() => {
        //re populate all the categories in the site :
        // site for the categories in the APP . 
        // 1. add category section in the operations section we have populate function there so lets call it right here  : 
        rePopulateCatList();
        rePopulateEditCatList();
    });
    isCategories = true;
}, 500)


/***
************ Operations ****************
*/

//get all the categories from the database : 
async function API_ALL_CATEGORIES() {
    categories = await fetchCats()
    return categories;
}

// add new category to the database : 
async function ADD_NEW_CATEGORY(cat) {
    const category = await addNewCategoryASYNC(cat);
    return category
}

//delete category request . 
// async request : 
async function DELETE_CATEGORY_API_BY_ID(data) {
    const result = await DELETE_CATEGORY_API_BY_IDAsync(data);
    //isCategories = false;
    return result
}

//edit category request: 
// async request : 
async function EDIT_CATEGORY_API(data){
    const result = await EDIT_CATEGORY_APIAsync(data);
    return result
}









/****
 * 
 * Async Section : 
 * 
 */

const addNewCategoryASYNC = (cat) => {
    return new Promise(resolve => {
        const data = cat; // payload
        const method = urls.category.add.method; // HTTP Request Type
        const url = urls.apiBase + urls.category.add.path; // url
        const contentType = 'application/json'; //content type
        const dataType = 'JSON' //response Data
        const success = (res) => {
            resolve(res)
        }
        //send ajax : 
        $.ajax({ method, contentType, url, data, success, dataType })
    });
}

function fetchCats() {
    return new Promise(resolve => {
        const url = urls.apiBase + urls.category.all.path
        const method = urls.category.all.method
        $.ajax({
            method,
            url,
            data: {},
            success: (categories) => {
                resolve(categories);
            },
            dataType: 'JSON'
        })
    })
}


function DELETE_CATEGORY_API_BY_IDAsync(id) {
    return new Promise(resolve => {
        const method = 'GET'; // HTTP Request Type
        const url = urls.apiBase + '/category/api/delete?id=' + id; // url
        const contentType = 'application/json'; //content type
        const dataType = 'JSON' //response Data
        const success = (result) => {
            resolve(result)
        }
        //send ajax : 
        $.ajax({ method, contentType, url, success, dataType })
    });
}


const EDIT_CATEGORY_APIAsync = (data) => {
    return new Promise(resolve => {
        const method = 'POST'; // HTTP Request Type
        const url = urls.apiBase + urls.category.edit; // url
        const contentType = 'application/json'; //content type
        const dataType = 'JSON' //response Data
        const success = (result) => {
            resolve(result)
        }
        //send ajax : 
        $.ajax({ method,  contentType, url, data, success, dataType })
    });
}