const db = require("../sequelize/models");

module.exports = {
    totalRows: async function(searchMethod){ 
        try{
            let where = null;
            if(searchMethod){
                if(searchMethod.column === "id"){ 
                  where = {
                    member_authority: "ROLE_USER", 
                    member_id: searchMethod.target                            
                  }
                } else{  
                    where = {
                        member_authority: "ROLE_USER", 
                        member_name: searchMethod.target                            
                    }
                }
            }
            const result = await db.Member.count({where});
            console.log("Service Result: ", result);
            return result;
        }catch(error){
            throw error;
        }
    },

    list: async function(pager){
        try{
            const result = await db.Member.findAll({
                where:{ member_authority: "ROLE_USER"},
                order: [["member_name", "ASC"]],
                limit: pager.rowsPerPage,
                offset: pager.startRowIndex
            }); 
            return result;
        }catch(error){
            throw error;
        }
    },

    listById: async function(pager, target){
        try{
            const result = await db.Member.findAll({
                where:{ member_authority: "ROLE_USER",
                        member_id: target},
                order: [["member_name", "ASC"]],
                limit: pager.rowsPerPage,
                offset: pager.startRowIndex
            }); 
            return result;
        }catch(error){
            throw error;
        }
    },

    listByName: async function(pager, target){
        try{
            const result = await db.Member.findAll({
                where:{ member_authority: "ROLE_USER",
                        member_name: target},
                order: [["member_name", "ASC"]],
                limit: pager.rowsPerPage,
                offset: pager.startRowIndex
            }); 
            return result;
        }catch(error){
            throw error;
        }
    },

    delete: async function(member_id){
        try{
            const rows = await db.Member.destroy({where: {member_id}})
        }catch(error){
            throw error;
        }
    }

};