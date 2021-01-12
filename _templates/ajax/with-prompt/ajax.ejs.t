---
to: generated/AJAX.w<%= name %>.js
---

// async request : 
async function <%= name %>(data){
    const <%= resName %> = await <%= name %>Async(data);
    return <%= resName %>
}

const <%= name %>Async = (data) => {
    return new Promise(resolve => {
        const method = '<%= method.toUpperCase() %>'; // HTTP Request Type
        const url = '<%= url %>'; // url
        const contentType = '<%= reqType %>'; //content type
        const dataType = '<%= resType %>' //response Data
        const success = (<%= resName %>) => {
            resolve(<%= resName %>)
        }
        //send ajax : 
        $.ajax({ method,  contentType, url, data, success, dataType })
    });
}

