/** 
 >>>>>>>>>>><<<<<<<<<<< blue print of this file >>>>>>>>>>><<<<<<<<<
 * 
 * 
 * >>>>>>>>>>> functions <<<<<<<<<<< : 
 * 
 *  on document ready : 
    * 1: select the  add Idea section 
    * 2: clean the section
    * 3: createForm
    * 4: create category list
    * 5: create ideas list
 * 
 *  1. createForm : 
    * 1:to create add idea section form . 
 *  
 * 
 *  handleSaveAddIdeaClick : 
    * 1: when the save btn in the form clicked .
 *  
 *  3. createCategoryListAddIdeaFrom : 
    * 1: to create the categories list 
 * 
 *  4. initAddIdeaCatListSpinner: 
    * 1: to init the spinner when loading or remove the categories 
 * 
 *  5. cleanAddIdeaCategoriesList : 
    * 2: to clean the categories list
 * 
 *  6. rePopulateAddIdeaCatList : 
    *  1: to clean the list container and populate it again from the data source var = categories .
 * 
 *  7. inflateAddIdeaCategory : 
    * 1: to inflate category in the list .
 * 
 */

let source = '';

/**
 * interval to set the description place holder
 */
setInterval(() => {
    if ($('#ideaAddFormDes').text().length <= 1) $('#ideaAddFormDes').text('الوصف')
}, 10000);

$(document).ready(() => {
    //get add Idea container: 
    const section = $('#oprAddIdeaContainer');
    //clean up the container: 
    section.html('');
    //create add idea form: 
    const classPre = 'opr-sec-add-idea-';
    //id name prefix : ideaAddForm
    const idPre = 'ideaAddForm'
    createAddIdeaForm(section, classPre, idPre);
    createCategoryList(section, 'ideaAddForm', 'opr-sec-add-idea-');
})

// create form to edit category . 
function createAddIdeaForm(section, classPre, idPre) {
    //create form container . 
    const form = $('<div>', { class: classPre + 'form-container', id: idPre });
    // name input ; 
    form.append($('<input>', {
        class: classPre + 'input AddIdeaName input',
        id: idPre + 'Name',
    }).attr({
        'type': 'text',
        'placeHolder': 'الاسم'
    }))
    // description input
    form.append($('<div>', {
        class: 'addIdeaDes input',
        id: idPre + 'Des'
    }).attr({
        'type': 'text',
        'contenteditable': ''
    }).text('الوصف')).click(() => {
        if ($('#' + idPre + 'Des').text() == 'الوصف') $('#' + idPre + 'Des').html('<br>')
    })
    // source input
    form.append($('<input>', {
        class: 'addIdeaSrc input',
        id: idPre + 'Source'
    }).attr({
        'type': 'text',
        'placeHolder': 'المصدر'
    }))

    //parent input : 
    form.append($('<span>', { text: ' اختار تصنيف من القائمة', class: 'subText' }))
    form.append($('<input>', {
        class: classPre + 'input AddIdeaParent',
        id: idPre + 'Parent'
    }).attr({
        'type': 'text',
        'placeHolder': 'الاصل',
        'readonly': ''
    }))
    //save btn : 
    form.append($('<button>', {
        class: classPre + 'save customBtn',
        id: idPre + 'Save'
    }).text('حفظ').click(() => {
        //check if edit or add new request .: 
        if (idPre == 'ideaAddForm') handleSaveAddIdeaClick(idPre);
        if (idPre == 'ideaEditForm') handleSaveEditIdeaClick(idPre);
    }))


    section.append(form)

}

function handleSaveAddIdeaClick(idPre) {
    //get idea data : 
    const ideaName = $('#' + idPre + 'Name').val()
    const ideaDes = $('#' + idPre + 'Des').text()
    const ideaSrc = $('#' + idPre + 'Source').val()
    const ideaParent = $('#' + idPre + 'Parent').val()

    let d = {
        name: ideaName,
        description: ideaDes,
        source: ideaSrc,
        parent: ideaParent,
    }
    d = JSON.stringify(d);

    ADD_NEW_IDEA(d);

    //clean form: 
    $('#' + idPre + 'Name').val('')
    $('#' + idPre + 'Des').text('')
}
