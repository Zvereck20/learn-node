const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await saveNotes(notes);
  console.log(chalk.bgGreen("Note was added!"));
}

async function removeNote(id) {
  const notes = await getNotes();

  const result = notes.filter((el) => el.id !== id);

  await saveNotes(result);
  console.log(chalk.bgRed("Note was remove!"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.bgBlue("Here is the list of notes:"));
  notes.forEach((note) => {
    console.log(
      "id:" + chalk.bgGreen(note.id),
      "Title:" + chalk.blue(note.title)
    );
  });
}

async function editNotes(editId, editTitle) {
  const notes = await getNotes();

  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === editId) {
      notes[i].title = editTitle;
    }
  }

  await saveNotes(notes);
  console.log(chalk.bgGreen("Note was edit!"));
}

module.exports = {
  addNote,
  getNotes,
  removeNote,
  editNotes,
};
