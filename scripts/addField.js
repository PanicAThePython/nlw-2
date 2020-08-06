//procurar o botão
document.querySelector("#add-time")
//quando clicar nele
.addEventListener('click', cloneField)

function cloneField(){

    //clone os campos. Que campos?
    //o true vai pegar todos os filhos da div
    const newFieldsContainer = document.querySelector('.schedule-item').cloneNode(true)

    //pegar os campos. Que campos?
    const fields = newFieldsContainer.querySelectorAll('input')

    //fields[0] = ""
    //fields[1] = ""

    //para cada campo, limpar:
    fields.forEach(function(field){
        field.value = ""
    })

    //colocar na página. Onde??
    document.querySelector("#schedule-items").appendChild(fields)

}