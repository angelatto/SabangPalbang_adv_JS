const { Model, Sequelize } = require("sequelize");

// 함수를 내보내겠다. 
module.exports = (sequelize, DataTypes) => {
    // 모델 클래스 선언 - ES6 
    class Palbang extends Model {
        static associate(models) { 
        
        }
    }

    //  DB 컬럼 데이터 타입에 맞게 모델의 속성을 정의 
    Palbang.init({  // init(): Model이 가진 정적 메소드 
        palbang_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        palbang_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        palbang_nickname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        palbang_likecount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        palbang_viewcount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        palbang_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        palbang_imgoname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        palbang_imgsname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        palbang_imgtype: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "Palbang",
        tableName: "palbang",
        timestamps: false, // createAt과 updateAt 컬럼을 자동으로 만들지 말라는 의미 
    });

    return Palbang; // 모델 클래스 리턴    
};