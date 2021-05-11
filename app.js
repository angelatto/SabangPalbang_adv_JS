/* 1. 모듈 가져오기 */
const express = require("express"); 
const dotenv = require("dotenv"); // 외부 모듈 : 프로젝트 내에서 .env에 지정하면 환경변수에 추가해줌
const morgan = require("morgan"); // 외부 모듈 : 로그 관련 미들웨어 
const {sequelize} = require("./sequelize/models");
const jwtAuth = require("./security/jwtAuth");

/* .env 파일을 읽어서 process.env에 추가 */
dotenv.config();

/* 2. 라우터 가져오기 */
const auth = require("./routes/auth-route");
const home = require("./routes/home-route"); 
const inquiry = require("./routes/inquiry-route"); 
const member = require("./routes/member-route"); 
const order = require("./routes/order-route"); 
const palbang = require("./routes/palbang-route"); 
const profit = require("./routes/profit-route"); 
const sabang = require("./routes/sabang-route"); 

/* 3. 애플리케이션 객체 생성 */
const app = express();

/* 4. sequelize 데이터 연결과 동시에 -> 모델과 디비 테이블을 매핑(sync) */
sequelize.sync() // sync() 호출 시 모든 모델들의 init()함수 호출됨 
    .then(() => {
        console.log("DB 연결 성공");
    })
    .catch((err) => {
        console.log("DB 연결 실패: " + err.message);
    });

/* 5. 정적 파일들을 제공하는 폴더 생성 */
app.use(express.static(__dirname + "/public"));

/* 6. 모든 요청 경로에 실행되는 미들웨어 */
app.use((req, res, next) => {
    console.log("미들웨어1 전처리");
    res.set("Cache-Control", 'no-store');
    next(); 
    console.log("미들웨어1 후처리");
});

/* 7. 로그 출력을 위한 미들웨어 적용 */
app.use(morgan("dev"));

/* 8. 브라우저 캐싱 금지 미들웨어 적용 - 필터 마냥 순서 중요 */
app.use((req, res, next) => {
    console.log("브라우저 캐싱 금지 미들웨어 실행")
    res.set("Cache-Control", 'no-store');
    next();  
});

/* 9. 요청 HTTP 본문에 있는 (POST 방식) 데이터를 파싱해서 req.body 객체로 만드는 미들웨어 적용 */
app.use(express.urlencoded({extended:true})); // x-www-form-urlencoded : param1=value1&param2=value2
app.use(express.json()); // raw/json : {"param1":"value1", "param2":"value2"}

/* 10. 요청 경로와 라우터 매핑 */
app.use("/", home);
app.use("/auth", auth);
app.use("/inquiry_m", inquiry);
app.use("/member_m", member);
app.use("/order_m", order);
app.use("/palbang_m", palbang);
app.use("/profit_m", profit);
app.use("/sabang_m", sabang);

/* 11. 모든 에러 처리하는 미들웨어 */
app.use((err, req, res, next) => {
    const error = (process.env.NODE_ENV !== "production")? err: {};
    error.message = req.method + " " + req.url + " : " + err.message;
    error.status = err.status || 500;
    res.status(error.status); // status를 지정해주지 않으면 정상응답 상태로 들어감 
    res.render("common/error.html", {error});
});

/* 12. 애플리케이션 실행  */
app.set("port", process.env.PORT); // .env에서 설정하면 환경변수에 자동 추가 - 유지보수 편함 
app.listen(app.get("port"), () => {
    console.log(`Listening to port ${app.get('port')}`);
});
