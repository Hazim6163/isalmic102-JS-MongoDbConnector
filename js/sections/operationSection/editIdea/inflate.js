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
 * 
 */

$(document).ready(() => {
    //get add Idea container: 
    const section = $('#oprEditIdeaContainer');
    //clean up the container: 
    section.html('');
    //create add idea form: 
    createAddIdeaForm(section, 'opr-sec-edit-idea-', 'ideaEditForm');
    createCategoryList(section, 'ideaEditForm', 'opr-sec-edit-idea-');
})


function updateEditIdeaFormValues(data) {
    //class name prefix : opr-sec-edit-category-
    const classPre = 'opr-sec-edit-idea-';
    //id name prefix : catEditForm 
    const idPre = 'ideaEditForm'

    $('#' + idPre + 'Name').val(data.name)
    $('#' + idPre + 'Des').val(data.description)
    $('#' + idPre + 'Src').val(data.source)
    $('#' + idPre + 'Parent').val(data.parent)
    $('#' + idPre + 'Save').attr(
        "id", data._id)
}


function handleSaveEditIdeaClick(idPre) {
    //get idea data : 
    const ideaName = $('#' + idPre + 'Name').val()
    const ideaDes = $('#' + idPre + 'Des').text()
    const ideaSrc = $('#' + idPre + 'Source').val()
    const ideaParent = $('#' + idPre + 'Parent').val()
    const id = naviPayLoad.idea._id

    let d = {
        name: ideaName,
        description: ideaDes,
        source: ideaSrc,
        parent: ideaParent,
        id
    }
    d = JSON.stringify(d);

    EDIT_IDEA_API(d).then((e) => {
        isReichCategories = false;
        NaviController(5)
    });

}