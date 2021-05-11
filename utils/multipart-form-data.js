const multer = require("multer");

const multipartFormData = multer({
    storage: multer.diskStorage({
        destination: function(req, file, done){
            done(null, process.env.UPLOAD_PATH_SABANG);  // 사방 패키지 파일 저장되는 위치 
        },
        filename: function(req, file, done){
            // 여기서 저장된 이 파일 이름을 라우터에 전달해서 디비에 저장되게 해야함 
            const filename = Date.now() + "-" + file.originalname;
            // 아.. 결과 값이 알아서 req.file에 들어가는거구나,,,
            done(null, filename); // 파일 이름이 중복될까봐 
        }
    }),
    limits: {fileSize: 10*1024*1024}
});


module.exports = multipartFormData;