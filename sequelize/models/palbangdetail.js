const { Model, Sequelize } = require("sequelize");

// 함수를 내보내겠다. 
module.exports = (sequelize, DataTypes) => {
    // 모델 클래스 선언 - ES6 
    class PalbangDetail extends Model {
        static associate(models) { 
        
        }
    }

    //  DB 컬럼 데이터 타입에 맞게 모델의 속성을 정의 
    PalbangDetail.init({  // init(): Model이 가진 정적 메소드 
        palbang_detailno: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        palbang_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        palbang_dimgoname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        palbang_dimgsname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        palbang_dimgtype: {
            type: DataTypes.STRING,
            allowNull: false
        },
        palbang_explain: {
            type: DataTypes.STRING,
            allowNull: false
        }
        
    }, {
        sequelize,
        modelName: "PalbangDetail",
        tableName: "palbang_detail",
        timestamps: false, // createAt과 updateAt 컬럼을 자동으로 만들지 말라는 의미 
    });

    return PalbangDetail; // 모델 클래스 리턴    
};