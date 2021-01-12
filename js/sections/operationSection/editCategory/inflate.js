/** 
 >>>>>>>>>>><<<<<<<<<<< blue print of this file >>>>>>>>>>><<<<<<<<<
 * 
 * 
 * >>>>>>>>>>> functions <<<<<<<<<<< : 
 * 
 *  vars :
    * EditedActCat : category that will send to edit 
 *  on document ready : 
    * 1: select the edit category section 
    * 2: clean the section
    * 3: createForm
    * 4: create category list
 * 
 *  createForm : 
    * 1:to create edit category section form . 
 * 
 *  handleSaveEditCatClick : 
    * 1: when the save btn in the form clicked .
 *  
 *  createCategoryList : 
    * 1: to create the categories list 
 * 
 *  initCatListSpinner: 
    * 1: to init the spinner when loading or remove the categories 
 * 
 *  repopulateList : 
    *  1: to clean the list container and populate it again from the data source var = categories .
 * 
 *  inflateCategory : 
    * 1: to inflate category in the list .
 * 
 *  cleanCategoryList : 
    * 2: to clean the categories list
 * 
 */

$(document).ready(() => {
    //get edit category container: 
    const section = $('#oprEditCatContainer');
    //clean up the container: 
    section.html('');
    //create edit category form: 
    createEditCategoryForm(section);
})

// create form to edit category . 
function createEditCategoryForm(section) {
    //class name prefix : opr-sec-edit-category-
    const classPre = 'opr-sec-edit-category-';
    //id name prefix : catEditForm
    const idPre = 'catEditForm'
    //create form container . 
    const form = $('<div>', { class: classPre + 'form-container', id: idPre });
    // name input ; 
    form.append($('<input>', {
        class: classPre + 'input EditCatName',
        id: idPre + 'Name',
    }).attr({
        'type': 'text',
        'placeHolder': 'الاسم'
    }).val(naviPayLoad.category.name))
    // description input
    form.append($('<input>', {
        class: classPre + 'input EditCatDes',
        id: idPre + 'Des'
    }).attr({
        'type': 'text',
        'placeHolder': 'الوصف'
    }).val(naviPayLoad.category.description))
    //parent input : 
    form.append($('<span>', { text: ' اختار تصنيف من القائمة', class: 'subText' }))
    form.append($('<input>', {
        class: classPre + 'input EditCatParent',
        id: idPre + 'Parent'
    }).attr({
        'type': 'text',
        'placeHolder': 'الاصل',
        'readonly': ''
    }).val(naviPayLoad.category.parent))
    //save btn : 
    form.append($('<button>', {
        class: classPre + 'save customBtn',
        id: idPre + 'Save'
    }).text('حفظ').click(() => {
        handleSaveEditCatClick();
    }))


    section.append(form)

}

//update form values: 
function updateEditCategoryFormValues(data) {
    //class name prefix : opr-sec-edit-category-
    const classPre = 'opr-sec-edit-category-';
    //id name prefix : catEditForm 
    const idPre = 'catEditForm'

    $('#' + idPre + 'Name').val(data.name)
    $('#' + idPre + 'Des').val(data.description)
    $('#' + idPre + 'Parent').val(data.parent)
    $('#' + idPre + 'Save').attr(
        "id", data._id
    )

}