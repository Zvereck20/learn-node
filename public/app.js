document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }

  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    const title = event.target.closest("li").children[0].textContent;
    const newTitle = prompt("Введите новое значение", title);

    edit(id, newTitle).then(() => {
      event.target.closest("li").children[0].textContent = newTitle;
    });
  }
});

const remove = async (id) =>
  await fetch(`/${id}`, {
    method: "DELETE",
  });

const edit = async (id, title) =>
  await fetch("/", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      id,
      title,
    }),
  });
