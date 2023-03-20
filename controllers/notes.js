const client = require('../configs/db');

exports.addNote = (req, res) => {
  const {heading, content} = req.body;

  client.query(`INSERT INTO notes (email, heading, content) VALUES ('${req.email}', '${heading}', '${content}')`).then((data)=>{
    res.status(200).json({
      message: 'Note Added Successfully',
    });
  }).catch((err)=>{
    res.status(500).json({
      message: 'Server Error Occured',
    });
  })
};

exports.getAllNotes = (req, res) => {
  client.query(`SELECT * FROM notes WHERE email = '${req.email}'`).then((data)=>{
    const noteData = data.rows;
    const filteredData = noteData.map((note) => {
      return {
        noteId: note.noteId,
        heading: note.heading,
        content: note.content,
      };
    });
    res.status(200).json({
      message: 'Success',
      data: filteredData,
    });
  }).catch((err)=>{
    res.status(500).json({
      message: 'Server Error Occured',
    });
  });
};

exports.updateNote = (req, res) => {
  const noteId = req.params.noteId;
  const {heading, content} = req.body;
  client.query(`UPDATE notes SET heading='${heading}', content = '${content}' WHERE noteId='${noteId}'`).then((data)=>{
    res.status(200).json({
      message: 'Note Updated Successfully',
    });
  }).catch((err)=>{
    console.log(err);
    res.status(500).json({
      message: 'Server Error Occured',
    });
  });
};

exports.deleteNote = (req, res) => {
  const noteId = req.params.noteId;
  client.query(`DELETE FROM notes WHERE noteId='${noteId}'`).then((data)=>{
    res.status(200).json({
      message: 'Note Deleted Successfully',
    });
  }).catch((err)=>{
    console.log(err);
    res.status(500).json({
      message: 'Server Error Occured',
    });
  });
}