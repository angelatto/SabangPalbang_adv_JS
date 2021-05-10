const multer = require("multer");

const multipartFormData = multer({
    storage: multer.diskStorage({
        destination: function(req, file, done){
            done(null, process.env.UPLOAD_PATH);  // 파일 저장되는 위치 
        },
        filename: function(req, file, done){
            done(null, Date.now() + "-" + file.originalname); // 파일 이름이 중복될까봐 
        }
    }),
    limits: {fileSize: 10*1024*1024}
});


module.exports = multipartFormData;