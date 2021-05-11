const { Model, Sequelize } = require("sequelize");

// 함수를 내보내겠다. 
module.exports = (sequelize, DataTypes) => {
    // 모델 클래스 선언 - ES6 
    class PalbangLike extends Model {
        static associate(models) { 
        
        }
    }

    //  DB 컬럼 데이터 타입에 맞게 모델의 속성을 정의 
    PalbangLike.init({  // init(): Model이 가진 정적 메소드 
        palbang_likeid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        palbang_likepalbangid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        palbang_likememberid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        }
    }, {
        sequelize,
        modelName: "PalbangLike",
        tableName: "palbang_like",
        timestamps: false, // createAt과 updateAt 컬럼을 자동으로 만들지 말라는 의미 
    });

    return PalbangLike; // 모델 클래스 리턴    
};