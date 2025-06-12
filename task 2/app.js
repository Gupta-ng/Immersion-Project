const notesContainer = document.getElementById('notesContainer');
const initialAddBtn = document.getElementById('addNoteBtn');


function createNote() {
  const note = document.createElement('div');
  note.className = 'note';

  const textarea = document.createElement('textarea');
  textarea.placeholder = 'Write a note...';

  const addBtn = document.createElement('button');
  addBtn.className = 'add-btn';
  addBtn.textContent = '+';


  addBtn.addEventListener('click', function (e) {
    
    if (e.detail === 2) return;
    notesContainer.appendChild(createNote());
  });

  
  addBtn.addEventListener('dblclick', function () {
    note.remove();
  });

  note.appendChild(textarea);
  note.appendChild(addBtn);
  return note;
}


initialAddBtn.addEventListener('click', function (e) {
  if (e.detail === 2) return;
  notesContainer.appendChild(createNote());
});


initialAddBtn.addEventListener('dblclick', function () {
  this.parentElement.remove();
});