window.addEventListener("DOMContentLoaded" , ( ) => {
    let form = renderElement("form")
    let template = renderElement("template").content
    let ul = renderElement("ul")
    let result = []
    const handleSub = (event) => {
        event.preventDefault()
        let data = new FormData(event.target)
        let name = data.get('input')
        let todo = {   
            id: uuid.v4(),
            name: name
        }
        result.push(todo)
        renders(result)
    }
    const renders = (arr) => {
        for(let i = 0 ; i<arr.length ; i++){
            let clone = template.cloneNode(true)
            let li = clone.querySelector("li")
            let delete_button = li.querySelector(".delete")
            delete_button.dataset.id = arr[i].id
            delete_button.addEventListener("click" , handleDelete)
            let save_button = li.querySelector(".save")
            save_button.dataset.id = arr[i].id
            save_button.addEventListener("click" , handleSave)
            let h3 = li.querySelector("h3")
            h3.textContent = arr[i].name
            ul.appendChild(li)
        }
    }
    function handleDelete (event){
        let id = event.target.dataset.id
        for(let i =0 ; i<result.length; i++){
            if(id === result[i].id){
                result.splice(i , 1)

                let deleteButton = event.target.parentNode
                let li = deleteButton.parentNode
                li.remove()
            }
        }
    }
    function handleSave (event){
        let id = event.target.dataset.id
        result.filter((todo) => {
            if(todo.id === id) {
                window.localStorage.setItem("todo" , JSON.stringify(todo))
            }
        })

    }
    let parses = JSON.parse(window.localStorage.getItem("todo"))

    let clone = template.cloneNode(true)
            let li = clone.querySelector("li")
            let delete_button = li.querySelector(".delete")
            delete_button.dataset.id = parses.id
            delete_button.addEventListener("click" , handleDelete)
            let save_button = li.querySelector(".save")
            save_button.dataset.id = parses.id
            save_button.addEventListener("click" , handleSave)
            let h3 = li.querySelector("h3")
            h3.textContent = parses.name
            ul.appendChild(li)

    form.addEventListener("submit" , handleSub)
    
})