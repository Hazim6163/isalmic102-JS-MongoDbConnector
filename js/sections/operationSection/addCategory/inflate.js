let categories;

/** 
 >>>>>>>>>>><<<<<<<<<<< blue print of this file >>>>>>>>>>><<<<<<<<<
 * 
 * 
 * functions : 
 * 
 *  on document ready : 
    * 1: select the add category section 
    * 2: clean the section
    * 3: createForm
    * 4: create category list
 * 
 *  createForm : 
    * 1:to create add category section form . 
 * 
 *  handleSaveCatClick : 
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
    const section = $('#oprAddCatContainer');
    //clean up the add category container . 
    section.empty();

    //in this section will be 2 parts : 
    // 1. form section . 
    // 2. categories list section . 

    createForm(section);
    createCategoryList(section);

})

// create form to add new category . 
function createForm(section) {
    //class name prefix : opr-sec-add-category-
    const classPre = 'opr-sec-add-category-';
    //id name prefix : catAddForm
    const idPre = 'catAddForm'
    //create form container . 
    const form = $('<div>', { class: classPre + 'form-container', id: idPre });
    // name input ; 
    form.append($('<input>', {
        class: classPre + 'input addCatName',
        id: idPre + 'Name'
    }).attr({
        'type': 'text',
        'placeHolder': 'الاسم'
    }))
    // description input
    form.append($('<input>', {
        class: classPre + 'input addCatDes',
        id: idPre + 'Des'
    }).attr({
        'type': 'text',
        'placeHolder': 'الوصف'
    }))
    //parent input : 
    form.append($('<span>', { text: ' اختار تصنيف من القائمة', class: 'subText' }))
    form.append($('<input>', {
        class: classPre + 'input addCatParent',
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
        handleSaveCatClick();
    }))


    section.append(form)

}

// on the form save btn click
function handleSaveCatClick() {
    //get id prefix
    const idPre = 'catAddForm';
    // get name input val
    const catName = $('#' + idPre + 'Name').val()
    // get des input val 
    const catDes = $('#' + idPre + 'Des').val()
    //get parent input val
    const catParent = $('#' + idPre + 'Parent').val()
    //set category data to send
    let d = {
        name: catName, description: catDes, parent: catParent
    }
    //convert to json
    d = JSON.stringify(d);
    //send add category request . 
    ADD_NEW_CATEGORY(d).then(() => {
        isCategories = false;
    });
    //clean up the form
    $('#' + idPre + 'Name').val('')
    $('#' + idPre + 'Des').val('')
    $('#' + idPre + 'Parent').val('')
    //init spinner : 
    initCatListSpinner();
}

// category list in the form 
function createCategoryList(section) {
    //class name prefix : opr-sec-add-category-
    const classPre = 'opr-sec-add-category-';
    const idPre = 'catAddForm'
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
function initCatListSpinner() {
    //class name prefix : opr-sec-add-category-
    const classPre = 'opr-sec-add-category-';
    const idPre = 'catAddForm'
    // init spinner : 
    const list = $('#' + idPre + 'CatList');
    //clean the list content 
    cleanCategoriesList();
    //append spinner 
    list.append($('<div>', {
        class: 'cat-list-spinner spinner ',
        id: 'catListSpinner'
    }).html('<i class="fas fa-circle-notch rotating"></i>'));
}

//populate category list : 
function rePopulateCatList() {
    //class name prefix : opr-sec-add-category-
    const classPre = 'opr-sec-add-category-';
    const idPre = 'catAddForm'
    //get list container . 
    const list = $('#' + idPre + 'CatList');
    cleanCategoriesList()
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
        list.append(inflateCategory(c));
    });
    categories.reverse();
}

// inflate category obj in the categories list : 
function inflateCategory(data) {
    //class name prefix : opr-sec-add-category-
    const classPre = 'opr-sec-add-category-';
    const idPre = 'catAddForm'
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

    //line before name  
    catBody.append($('<div>', {
        class: classPre + 'line'
    }))
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
                initCatListSpinner();
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

function cleanCategoriesList() {
    const idPre = 'catAddForm'
    const list = $('#' + idPre + 'CatList');
    list.removeClass('list-populated');
    list.empty()
}