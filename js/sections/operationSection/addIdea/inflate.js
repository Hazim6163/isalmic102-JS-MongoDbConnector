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

$(document).ready(() => {
    //get add Idea container: 
    const section = $('#oprAddIdeaContainer');
    //clean up the container: 
    section.html('');
    //create add idea form: 
    createAddIdeaForm(section);
    createCategoryListAddIdeaFrom(section)
})

// create form to edit category . 
function createAddIdeaForm(section) {
    //class name prefix : opr-sec-add-idea-
    const classPre = 'opr-sec-add-idea-';
    //id name prefix : ideaAddForm
    const idPre = 'ideaAddForm'
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
    form.append($('<textarea>', {
        class: classPre + 'input addIdeaDes input',
        id: idPre + 'Des'
    }).attr({
        'type': 'text',
        'placeHolder': 'الوصف'
    }))
    // source input
    form.append($('<input>', {
        class: classPre + 'input addIdeaSource input',
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
        handleSaveAddIdeaClick();
    }))


    section.append(form)

}