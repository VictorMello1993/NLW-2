document.querySelector('#remove-time').addEventListener('click', removeField)

function removeField(){
    const fields = document.querySelectorAll('.schedule-item')

    if(fields.length > 1){
        document.querySelector('#schedule-items').removeChild(fields[fields.length - 1])
    }
}