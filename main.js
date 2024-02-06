window.addEventListener("DOMContentLoaded", () => {
  let form = renderElement("form");
  let input = renderElement("input");
  let ul = renderElement(".parent_ul");
  let template = renderElement("template").content;
  let result = [];

  const renders = (arr) => {
    ul.innerHTML = null;
    for (let i = 0; i < arr.length; i++) {
      let clone = template.cloneNode(true);
      let li = clone.querySelector("li");
      let edit_button = li.querySelector(".edit");
      edit_button.dataset.id = arr[i].id;
      edit_button.addEventListener("click", handleEdit);
      let delete_button = li.querySelector(".delete");
      delete_button.addEventListener("click", handleDelete);
      delete_button.dataset.id = arr[i].id;
      let h3 = li.querySelector("h3");
      h3.textContent = arr[i].name;
      ul.appendChild(li);
    }
  };
  function handleSub(event) {
    event.preventDefault();
    // console.log(event.target)
    let data = new FormData(event.target);
    let name = data.get("input");

    let todo = {
      id: uuid.v4(),
      name: name,
    };
    result.push(todo);
    renders(result);
    input.value = null;
  }
  form.addEventListener("submit", handleSub);

  function handleEdit(event) {
    let id = event.target.dataset.id;
    result.filter((todo) => {
      if (todo.id === id) {
        window.localStorage.setItem("todo", JSON.stringify(todo));
      }
    });
  }

  let parses = JSON.parse(window.localStorage.getItem("todo"));
  console.log(parses);
  let clone = template.cloneNode(true);
  let li = clone.querySelector("li");
  let edit_button = li.querySelector(".edit");
  edit_button.dataset.id = parses.id;
  edit_button.addEventListener("click", handleEdit);
  let delete_button = li.querySelector(".delete");
  delete_button.addEventListener("click", handleDelete);
  delete_button.dataset.id = parses.id;
  let h3 = li.querySelector("h3");
  h3.textContent = parses.name;
  ul.appendChild(li);

  function handleDelete(event) {
    let id = event.target.dataset.id;
    for (let i = 0; i < result.length; i++) {
      if (result[i].id === id) {
        result.splice(i, 1);

        let parenButton = event.target.parentNode;
        let li = parenButton.parentNode;
        li.remove();
      }
    }
    console.log(result);
  }
});
