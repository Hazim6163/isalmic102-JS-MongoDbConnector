$(document).ready(() => {
    //operations section 
    const OprSection = $('<div>', { class: 'operations-section', id:'oprSection' });
    $('#content').append(OprSection);


    appendSectionNavigator();
    appendFirstLvlSections();
})

/**
 * first level sections : 
 *  add category
 *  add idea
 *  edit category 
 *  edit idea 
 */
function appendFirstLvlSections() {
    const OprSection = $('#oprSection')
    // section body : 
    const sectionBody = $('<div>', {class: 'opr-sec-body', id: 'OprSecBody'})
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
    const navi = $('<div>', {class: 'opr-sec-navi'});
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
        $('#oprSecNaviTitle').text('تصنيف جديد')
        $('#oprAddCatContainer').show();
        $('#oprSecAddCatBtn').hide();
        $('#oprSecAddIdeaBtn').show();
        $('#oprAddIdeaContainer').hide();
        $('#oprEditCatContainer').hide();
        $('#oprEditIdeaContainer').hide();

    }).hide())
    navi.append($('<button>', {
        class: 'opr-sec-navi-add-idea customBtn',
        id: 'oprSecAddIdeaBtn', text: 'فكرة جديدة'
    }).click(() => {
        $('#oprSecNaviTitle').text('فكرة جديدة')
        $('#oprAddIdeaContainer').show();
        
        $('#oprSecAddCatBtn').show();
        $('#oprSecAddIdeaBtn').hide();

        $('#oprAddCatContainer').hide();
        $('#oprEditCatContainer').hide();
        $('#oprEditIdeaContainer').hide();
    }))
}