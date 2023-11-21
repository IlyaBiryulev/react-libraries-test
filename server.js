const express = require("express"); 

const fileUpload = require("express-fileupload"); 
const cors = require("cors");
  
const app = express(); 

app.use(cors());
  
app.use(fileUpload({
  createParentPath: true,
}));

app.get('/api', (req, res) => {
  res.json({
    message: 'Hello'
  })
})

app.post("/upload", function (req, res) { 
  
  if (req.files && Object.keys(req.files).length !== 0) { 
    const uploadedFile = req.files.file;
    const newFileName = encodeURI(Date.now() + '-' + uploadedFile.name);
    const uploadPath = __dirname + "/public/uploads/" + newFileName; 

    uploadedFile.mv(uploadPath, function (err) { 
      if (err) { 
        console.log(err); 
        return res.send("Failed !!"); 
      }

      res.json({
        fileName: uploadedFile.name,
        filePath: `/uploads/${newFileName}`
      });
    }); 
  } else res.send("No file uploaded !!"); 
}); 

app.listen(5000, () => console.log('Server started'))

