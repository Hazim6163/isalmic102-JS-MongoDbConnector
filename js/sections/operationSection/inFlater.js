//pay loads array that will passed throw sections
const naviPayLoad = {
    category: {name: '', description: '', parent: ''}
};

$(document).ready(() => {
    //operations section 
    const OprSection = $('<div>', { class: 'operations-section', id: 'oprSection' });
    $('#content').append(OprSection);


    appendSectionNavigator();
    appendFirstLvlSections();
})

/*
--- first level sections : --- 
 *
 *  add category
 *  add idea
 *  edit category 
 *  edit idea 
 */
function appendFirstLvlSections() {
    const OprSection = $('#oprSection')
    // section body : 
    const sectionBody = $('<div>', { class: 'opr-sec-body', id: 'OprSecBody' })
    OprSection.append(sectionBody)

    //add category 
    sectionBody.append(
        $('<div>', { class: 'opr-sec-add-category', id: 'oprAddCatContainer', text: 'add Category Section' })
    )

    //add idea
    sectionBody.append(
        $('<div>', { class: 'opr-sec-add-idea', id: 'oprAddIdeaContainer', text: 'add idea section' }).hide()
    )

    //edit Category: 
    sectionBody.append(
        $('<div>', { class: 'opr-sec-edit-category', id: 'oprEditCatContainer', text: 'edit Category Section' }).hide()
    )

    //edit idea
    sectionBody.append(
        $('<div>', { class: 'opr-sec-add-category', id: 'oprEditIdeaContainer', text: 'Edit Idea Section' }).hide()
    )



}

/**
 * nav between the first level sections :
 */
function appendSectionNavigator() {
    const oprSection = $('#oprSection');
    const navi = $('<div>', { class: 'opr-sec-navi' });
    oprSection.append(navi)

    navi.append($('<h2>', {
        class: 'opr-sec-navi-title',
        id: 'oprSecNaviTitle',
        text: 'تصنيف جديد'
    }).css({
        'text-align': 'center',
        'margin': '30px 16px'
    })).css({
        'text-align': 'center',
        'margin': '30px 16px'
    })

    navi.append($('<button>', {
        class: 'opr-sec-navi-add-cat customBtn',
        id: 'oprSecAddCatBtn', text: 'تصنيف جديد'
    }).click(() => {
        NaviController(1);
    }).hide())
    navi.append($('<button>', {
        class: 'opr-sec-navi-add-idea customBtn',
        id: 'oprSecAddIdeaBtn', text: 'فكرة جديدة'
    }).click(() => {
        NaviController(2)
    }))
}

/**
 Navigation Controller : 
    * 1: send the requested section in the params to navigate to .
    * 2: if the section need data you can pass it throw the 2nd parameter payLoad
    * 3: sectionKey need to set in the 1st Param 
    *   keys: 1= addCategory, 2= addIdea, 3= editCategory, 4= editIdea
 */
function NaviController(sectionKey, payLoad) {
    const addCategory = () => {
        $('#oprSecNaviTitle').text('تصنيف جديد')
        $('#oprAddCatContainer').show();
        $('#oprSecAddCatBtn').hide();
        $('#oprSecAddIdeaBtn').show();
        $('#oprAddIdeaContainer').hide();
        $('#oprEditCatContainer').hide();
        $('#oprEditIdeaContainer').hide();
    }
    const editCategory = () => {
        naviPayLoad.category =  payLoad;
        updateEditCategoryFormValues(naviPayLoad.category)
        $('#oprSecNaviTitle').text(payLoad.name)
        $('#oprEditCatContainer').show();
        $('#oprSecAddCatBtn').show();
        $('#oprSecAddIdeaBtn').show();
        $('#oprAddIdeaContainer').hide();
        $('#oprAddCatContainer').hide();
        $('#oprEditIdeaContainer').hide();
    }
    const addIdea = () => {
        $('#oprSecNaviTitle').text('فكرة جديدة')
        $('#oprAddIdeaContainer').show();

        $('#oprSecAddCatBtn').show();
        $('#oprSecAddIdeaBtn').hide();

        $('#oprAddCatContainer').hide();
        $('#oprEditCatContainer').hide();
        $('#oprEditIdeaContainer').hide();
    }
    switch (sectionKey) {
        case 1:
            addCategory()
            break;
        case 2:
            addIdea();
            break;
        case 3:
            editCategory();
            break;
        case 4:

            break;
        default:
            console.error('requested section is unavailable.')
            break;
    }
}