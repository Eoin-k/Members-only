const addBtn = document.getElementById("addpost");
const closeBtn = document.getElementById("closebutton");
const dialog = document.getElementById("postdialog");
const deletebtns = document.querySelectorAll(".deletebtn");
addBtn.addEventListener("click", (e) => {
	e.preventDefault();
	dialog.showModal();
});

closeBtn.addEventListener("click", (e) => {
	e.preventDefault();
	dialog.close();
});

deletebtns.forEach((button) => {
	button.addEventListener("click", (e) => {
		e.preventDefault();
		if (window.confirm("do you want to delete this post?")) {
			window.location.replace(`/deletepost/${e.target.id}`);
		}
	});
});
