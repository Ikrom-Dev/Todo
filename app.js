window.addEventListener("DOMContentLoaded" , (  ) =>  {
    let form = renderElement("form")
    let template = renderElement("template").content
    let ul = renderElement("ul")
    let input = renderElement("input")
    let result = []
    
    const  handleSub = (event) => {
        event.preventDefault()
        let data = new FormData(event.target)
        let todo = {
            name : data.get("input"),
            id: uuid.v4()
        }
        result.push(todo)
        renders(result)
        input.value = null
    }
    function renders(arr)  {
        ul.innerHTML = null
        for(let i = 0 ; i< arr.length; i++){
            let clone = template.cloneNode(true)
            let li = clone.querySelector("li")
            let h3 = li.querySelector("h3")
            let delete_button = li.querySelector(".delete")
            delete_button.dataset.id = arr[i].id
            delete_button.addEventListener("click" , handleDelete)
            let save_button = li.querySelector(".save")
            save_button.dataset.id = arr[i].id
            save_button.addEventListener("click" , handleSave)
            h3.textContent = arr[i].name
            ul.appendChild(li)
        }
    }
    function handleSave(event){
        let id = event.target.dataset.id
        result.filter((todo) => {
            window.localStorage.setItem("todo" , JSON.stringify(todo))
        })
    }
    let parses = JSON.parse(window.localStorage.getItem("todo"))
    console.log(parses)
    let clone = template.cloneNode(true)
            let li = clone.querySelector("li")
            let h3 = li.querySelector("h3")
            let delete_button = li.querySelector(".delete")
            delete_button.dataset.id = parses.id
            delete_button.addEventListener("click" , handleDelete)
            let save_button = li.querySelector(".save")
            save_button.dataset.id = parses.id
            save_button.addEventListener("click" , handleSave)
            h3.textContent = parses.name
            ul.appendChild(li)

    function handleDelete(event){
        let id = event.target.dataset.id 
        for(let i = 0; i<result.length; i++){
            if(id === result[i].id){
                result.splice(i, 1)
                console.log(result)

                let deleteButton = event.target.parentNode
                let li = deleteButton.parentNode
                li.remove()
            }
        }
    }
    form.addEventListener("submit" , handleSub)
})