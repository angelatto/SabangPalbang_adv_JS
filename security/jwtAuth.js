const jwt = require("jsonwebtoken");

const jwtAuth = {
    createJwt: function(userid){
        // JWT 토큰 생성 ----------------------------------------------
        // 1.페이로드가 객체 형태 2. 서명할때 이용할 비밀키 3. 옵션 
        // https://www.npmjs.com/package/jsonwebtoken 레퍼런스 참고 
        console.log("createJwt 들어옴");
        const authToken = jwt.sign({userid}, process.env.JWT_SECRET, {expiresIn: "12h"}); 
        console.log("authToken:  ", authToken);
        return authToken;
    },

    setAuth: function(req, res, next) {
        // JWT 얻기 ----------------------------------------------------
        let  authToken = null;
        if(req.signedCookies.authToken){ // 토큰이 >>쿠키<<로 실려왔을 때 
            authToken = req.signedCookies.authToken;
        }else if(req.headers.authToken){ // 토큰이 >>다른 헤더명<<에 실려왔을 때  
            authToken = req.headers.authToken
        }else if(req.query.authToken){ // 토큰이 쿼리스트링으로 넘어왔을 때 
            authToken = req.query.authToken
        }
        // JWT 유효성 검사 -----------------------------------------------
        if(authToken){
            // JWT 파싱(해석)
            const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
            // JWT의 만료 시간(초) 얻기 
            const expires = decoded.exp;
            // 현재 시간(초) 얻기 
            const now = Math.floor(Date.now()/1000);
            // 만료시간과 현재시간을 비교 
            if((expires - now) > 0){
                // JWT에 userid가 포함되어 있을 경우
                if(decoded.userid){
                    // req에 userid를 저장 , 세션인증과 JWT인증방식 통일하기 위해서 여기에 저장
                    req.userid = decoded.userid;
                    // 모든 Nunjucks 템플릿에서 userid를 바인딩할 수 있도록 설정 
                    res.locals.userid = decoded.userid;
                }
            }
        }
    },

    checkAuth: function(req, res, next){
        if(req.userid){
            next();
        }else{
            // SPA
            const error = new Error("인증 필요");
            error.status = 403;
            next(error);
        }
    }
    
};

module.exports = jwtAuth;