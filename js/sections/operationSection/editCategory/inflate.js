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
 *  1. createForm : 
    * 1:to create edit category section form . 
 *  
 *  2. updateEditCategoryFormValues:
    * 1: set the form values 
 * 
 *  handleSaveEditCatClick : 
    * 1: when the save btn in the form clicked .
 *  
 *  3. createCategoryListEditFrom : 
    * 1: to create the categories list 
 * 
 *  4. initEditCatListSpinner: 
    * 1: to init the spinner when loading or remove the categories 
 * 
 *  5. cleanEditCategoriesList : 
    * 2: to clean the categories list
 * 
 *  6. rePopulateEditCatList : 
    *  1: to clean the list container and populate it again from the data source var = categories .
 * 
 *  7. inflateEditCategory : 
    * 1: to inflate category in the list .
 * 
 */

$(document).ready(() => {
    //get edit category container: 
    const section = $('#oprEditCatContainer');
    //clean up the container: 
    section.html('');
    //create edit category form: 
    createEditCategoryForm(section);
    createCategoryListEditFrom(section)
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

//create category list . 
// category list in the edit form 
function createCategoryListEditFrom(section) {
    //class name prefix : opr-sec-edit-category-
    const classPre = 'opr-sec-edit-category-';
    const idPre = 'catEditForm'
    //create categories list 
    section.append($('<div>', {
        class: classPre + 'cat-list ',
        id: idPre + 'CatList'
    })
    );
    //init spinner : 
    initCatListSpinner();
}

//categories list spinner : 
function initEditCatListSpinner() {
    //class name prefix : opr-sec-edit-category-
    const classPre = 'opr-sec-edit-category-';
    const idPre = 'catEditForm'
    // init spinner : 
    const list = $('#' + idPre + 'CatList');
    //clean the list content 
    cleanEditCategoriesList();
    //append spinner 
    list.append($('<div>', {
        class: 'cat-list-spinner spinner ',
        id: 'catListSpinner'
    }).html('<i class="fas fa-circle-notch rotating"></i>'));
}

// clean categories list 
function cleanEditCategoriesList() {
    const idPre = 'catEditForm'
    const list = $('#' + idPre + 'CatList');
    list.removeClass('list-populated');
    list.empty()
}

//populate categories list: 
//populate category list : 
function rePopulateEditCatList() {
    //class name prefix : opr-sec-edit-category-
    const classPre = 'opr-sec-edit-category-';
    const idPre = 'catEditForm'
    //get list container . 
    const list = $('#' + idPre + 'CatList');
    cleanEditCategoriesList()
    //check if there is categories : 
    if (categories.length <= 0) {
        list.append(
            $('<div>', {
                class: classPre + 'no-categories-msg',
                text: 'there is no categories'
            })
        );
        return;
    }
    list.addClass('list-populated');
    // we have the categories var :
    //loop throw each category 
    categories.reverse()
    categories.forEach(c => {
        list.append(inflateEditCategory(c));
    });
    categories.reverse();
}

//inflate category item : 

// inflate category obj in the categories list : 
function inflateEditCategory(data) {
    //class name prefix : opr-sec-edit-category-
    const classPre = 'opr-sec-edit-category-';
    const idPre = 'catEditForm'
    //create category container : 
    const container = $('<div>', {
        class: classPre + 'category-container',
        id: data._id
    })

    //create category body : 
    const catBody = $('<div>', {
        class: classPre + 'cat-body'
    }).click(() => {
        //set category name to the parent input.
        //check if the category name is already in to remove . data.name
        const parent = $('#' + idPre + 'Parent')
        if (parent.val() === data.name) parent.val('');
        else parent.val(data.name)
    })
    container.append(catBody);

    //create category name : 
    catBody.append($('<div>', {
        class: classPre + 'cat-name',
        text: data.name
    }))
    //check if the category has description: 
    if (data.description.length > 0) {
        //create category description : 
        catBody.append($('<div>', {
            class: classPre + 'cat-description',
            text: data.description
        }))
    }
    //create actions container . 
    container.append(
        $('<div>', { class: classPre + 'cat-actions' }).append(
            $('<div>', {
                class: classPre + 'cat-actions-delete',
                html: '<i class="fas fa-minus-square cat-action-delete-icon"></i>',
                id: idPre + 'IconContainer'
            }).click(() => {
                //send delete request . 
                DELETE_CATEGORY_API_BY_ID(data._id).then(() => {
                    // re populate category list: 
                    isCategories = false;
                });
                //init spinner: 
                initEditCatListSpinner();
            })
        ).append(
            $('<div>', {
                class: classPre + 'cat-actions-edit',
                html: '<i class="fas fa-pen-square cat-action-edit-icon"></i>',
                id: idPre + 'CatActionEdit' + data._id
            }).click(() => {
                //navigate to the update category section : 
                NaviController(3, data)
            })
        )//you can append another action right here 
    )

    return container;

}