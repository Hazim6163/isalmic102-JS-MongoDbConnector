/**
 file blue print
 * document: ready
     * 1: get and clean the section  
 * 
 * 
 */

$(document).ready(() => {
    const section = $('#oprBrowseContainer');
    const classPre = 'data-list';
    const idPre = 'DataList';

    //clean the section.
    cleanDataListSection();
})

function cleanDataListSection() {
    const section = $('#oprBrowseContainer');
    section.empty();
}


function populateDataList(idPre, classPre) {
    const section = $('#oprBrowseContainer');
    cleanDataListSection();
    //list container :
    const list = $('<div>', {
        class: classPre,
        id: idPre,
    }).appendTo(section);

    // loop throw each category . 
    // print each child category if was : 
    // print each child category ideas if was
    // print each idea 
    if (!reichCategories.length > 0) { 
        list.text('there is no categories') 
        return; }
    reichCategories.forEach((category) => {
        //create Category container: 
        createReichCat(category, idPre, classPre, list);

    })



}

function createReichCat(data, idPre, classPre, appendTo) {
    const container = $('<div>', {
        class: classPre + 'reich-category reich-category-container',
        id: idPre + 'ReichCategory'
    });
    const header = $('<div>', {
        class: classPre + 'reich-category-head reich-category-head',
        id: idPre + 'ReichCatHead'
    }).appendTo(container);
    //reichCatName
    let reichCatName
    data.level > 0 ? reichCatName = $('<div>', {
        class: classPre + 'reich-category-name reich-nested-category-name',
        id: idPre + 'ReichCatName',
        text: data.name
    }).appendTo(header) : reichCatName = $('<div>', {
        class: classPre + 'reich-category-name reich-cat-name',
        id: idPre + 'ReichCatName',
        text: data.name
    }).appendTo(header)
    reichCatName.css('padding-right', data.level * 16 + 'px');
    const body = $('<div>', {
        class: classPre + 'reich-category-body reich-cat-body',
        id: idPre + 'ReichCatBody'
    }).append(
        $('<div>', {
            class: classPre + 'reich-category-des reich-cat-des',
            id: idPre + 'ReichCatDes',
            text: data.description
        })//ideasList
    ).appendTo(container);
    const ideasList = $('<div>', {
        class: classPre + 'ideasList',
        id: idPre + 'IdeasList',
    }).appendTo(body);
    //NestedCat
    let NestedCats;
    data.catsCount > 0 ? NestedCats = $('<div>', {
        class: classPre + 'NestedCats nested-category-data-list',
        id: idPre + 'NestedCats',
    }).appendTo(body) : NestedCats = $('<div>', {
        class: classPre + 'NestedCats',
        id: idPre + 'NestedCats',
    }).appendTo(body)

    const footer = $('<div>', {
        class: classPre + 'reich-category-footer',
        id: idPre + 'ReichCatFooter'
    }).appendTo(container);

    //append category ideas to the category body .
    appendIdeasToBody(ideasList, data.ideas, 'DataList', 'data-list');

    //check if the category has nested cats : 
    if (data.catsCount > 0) {
        //loop throw each nested cat: 
        data.cats.forEach((c1) => {
            createReichCat(c1, idPre + 'Lvl' + c1.level, classPre + '-lvl-' + c1.level + '-', NestedCats)
        })
    }

    appendTo.append(container)
}

function appendIdeasToBody(body, ideas, idPre, classPre) {
    //loop throw each idea: 
    for (let i = 1; i <= ideas.length; i++) {
        const idea = ideas[i - 1];
        inflateIdeaDataList(idea, idPre, classPre, i).appendTo(body)
    }
}

function inflateIdeaDataList(data, idPre, classPre, index) {
    /**
     * 
    const classPre = 'data-list';
    const idPre = 'DataList';
     */
    const container = $('<div>', {
        class: classPre + 'idea',
        id: idPre + 'Idea',
    })

    //ideaHead
    const head = $('<div>', {
        class: classPre + 'ideaHead',
        id: idPre + 'IdeaHead',
    }).appendTo(container)
    //ideaBody
    const body = $('<div>', {
        class: classPre + 'ideaBody',
        id: idPre + 'IdeaBody',
    }).appendTo(container)
    //ideaFooter
    const footer = $('<div>', {
        class: classPre + 'ideaFooter',
        id: idPre + 'IdeaFooter',
    }).appendTo(container)

    //ideaSrc
    const src = $('<div>', {
        class: classPre + 'ideaSrc',
        id: idPre + 'IdeaSrc',
        text: data.source
    }).appendTo(footer)
    //ideaAction
    const ideaAction = $('<div>', {
        class: classPre + 'ideaAction',
        id: idPre + 'IdeaAction',
    }).appendTo(footer)
    ideaAction.append(
        $('<div>', { class: classPre + 'cat-actions' }).append(
            $('<div>', {
                class: classPre + 'cat-actions-delete',
                html: '<i class="fas fa-minus-square cat-action-delete-icon"></i>',
                id: idPre + 'IconContainer'
            }).click(() => {
                //send delete request . 
                DELETE_IDEA_API_BY_ID(data._id);
            })
        ).append(
            $('<div>', {
                class: classPre + 'cat-actions-edit',
                html: '<i class="fas fa-pen-square cat-action-edit-icon"></i>',
                id: idPre + 'CatActionEdit' + data._id
            }).click(() => {
                //navigate to the update category section : 
                NaviController(4, data)
            })
        )//you can append another action right here 
    )
    //ideaParent
    const parent = $('<div>', {
        class: classPre + 'ideaParent',
        id: idPre + 'IdeaParent',
        text: data.parent
    })
    //ideaDes
    const des = $('<div>', {
        class: classPre + 'ideaDes',
        id: idPre + 'IdeaDes',
        text: data.description
    }).appendTo(body)
    //index : 
    //ideaIndex
    const ideaIndex = $('<div>', {
        class: classPre + 'ideaIndex',
        id: idPre + 'IdeaIndex',
        text: index + '. '
    }).appendTo(head)

    //ideaName
    const iName = $('<div>', {
        class: classPre + 'ideaName',
        id: idPre + 'IdeaName',
        text: data.name
    }).appendTo(head)

    return container

}