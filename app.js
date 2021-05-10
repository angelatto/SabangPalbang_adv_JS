console.log("앱 실행");

/* 모듈 가져오기 */
const express = require("express"); 
const dotenv = require("dotenv"); // 외부 모듈 : 프로젝트 내에서 .env에 지정하면 환경변수에 추가해줌
const morgan = require("morgan"); // 외부 모듈 : 로그 관련 미들웨어 
// const cookieParser = require("cookie-parser"); // 외부 모듈 : 쿠키 생성/제거/파싱하는 미들웨어 
const {sequelize} = require("./sequelize/models");
// const jwtAuth = require("./security/jwtAuth");

// 애플리케이션 객체 생성 
const app = express();

// sequelize 데이터 연결과 동시에 -> 모델과 디비 테이블을 매핑(sync) 
// sync() 호출 시 모든 모델들의 init()함수 호출됨 
sequelize.sync()
    .then(() => {
        console.log("DB 연결 성공");
    })
    .catch((err) => {
        console.log("DB 연결 실패: " + err.message);
    });

/* .env 파일을 읽어서 process.env에 추가 */
dotenv.config();

/* 라우터 가져오기 */
const main = require("./routes/main"); 
const auth = require("./routes/auth");

// 요청 HTTP 본문에 있는 (POST 방식) 데이터를 파싱해서 
// req.body 객체로 만드는 미들웨어 적용 
app.use(express.urlencoded({extended:true})); // x-www-form-urlencoded : param1=value1&param2=value2
app.use(express.json()); // raw/json : {"param1":"value1", "param2":"value2"}


// 정적 파일들을 제공하는 폴더 생성 
app.use(express.static(__dirname + "/public"));

/* 요청 경로와 라우터 매핑 */
app.use("/", main);
app.use("/auth/login", auth);

// 로그 출력을 위한 미들웨어 적용 
app.use(morgan("dev"));


app.set("port", process.env.PORT); // .env에서 설정하면 환경변수에 자동 추가 - 유지보수 편함 
app.listen(app.get("port"), () => {
    console.log(`Listening to port ${app.get('port')}`);
});
