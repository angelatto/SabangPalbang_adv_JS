const db = require("../sequelize/models");

module.exports = {
    totalRows: async function(searchMethod){ // 주의: 자바스크립트는 변수가 있다고 해서 반드시 제공해야하는건 아님 그냥 파라미터 없이 호출해도 실행됨 
        try{
            let where = null;
            // if(searchMethod){
            //     if(searchMethod.column === "btitle"){ // 제목만 
            //       where = {
            //           "btitle": {[Op.like]: "%"+searchMethod.keyword+"%"}                               
            //         }
            //     } else{  // btitlecontent, 제목+내용 
            //         where = {
            //             [Op.or]: [
            //                 {"btitle": {[Op.like]: "%"+searchMethod.keyword+"%"}},
            //                 {"bcontent": {[Op.like]: "%"+searchMethod.keyword+"%"}}
            //             ]
            //         }
            //     }
            // }
            /* where을 count안에서 작성하지 않는 이유는 
               조건이 제목만 고를때랑 제목+내용 일때랑 다르기 때문에 변수로 넣어준다. */
            const result = await db.Member.count({ where });
            console.log("Service Result: ", result);
            return result;
        }catch(error){
            throw error;
        }
    },

    list: async function(pager, searchMethod){
        try{
            let where = null;
            if(searchMethod){
                if(searchMethod.column === "btitle"){ // 제목만 
                  where = {
                      "btitle": {[Op.like]: "%"+searchMethod.keyword+"%"}                               
                    }
                } else{  // btitlecontent, 제목+내용 
                    where = {
                        [Op.or]: [
                            {"btitle": {[Op.like]: "%"+searchMethod.keyword+"%"}},
                            {"bcontent": {[Op.like]: "%"+searchMethod.keyword+"%"}}
                        ]
                    }
                }
            }
      
            const result = await db.Board.findAll({
                attributes: ["bno", "btitle", "bwriter", "bdate", "bhitcount"],
                where,
                order: [["bno", "DESC"]],
                limit: pager.rowsPerPage,
                offset: pager.startRowIndex
            }); 
            return result;
        }catch(error){
            throw error;
        }
    },

};