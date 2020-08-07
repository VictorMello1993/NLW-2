document.querySelector('#add-time').addEventListener('click', clonefield)

function clonefield(){

    //Duplicando o campo 'Novo Horário'
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true)
    const fields = newFieldContainer.querySelectorAll('input')
    
    fields.forEach(function(field){
        field.value = ''
    })
    
    document.querySelector('#schedule-items').appendChild(newFieldContainer)
}