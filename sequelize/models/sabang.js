const { Model, Sequelize } = require("sequelize");

// 함수를 내보내겠다. 
module.exports = (sequelize, DataTypes) => {
    // 모델 클래스 선언 - ES6 
    class Sabang extends Model {
        static associate(models) { 
        
        }
    }

    //  DB 컬럼 데이터 타입에 맞게 모델의 속성을 정의 
    Sabang.init({  // init(): Model이 가진 정적 메소드 
        sabang_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        sabang_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        sabang_price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sabang_saleprice: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sabang_buycount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sabang_viewcount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sabang_imgoname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sabang_imgsname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sabang_imgtype: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sabang_state: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "Sabang",
        tableName: "sabang",
        timestamps: false, // createAt과 updateAt 컬럼을 자동으로 만들지 말라는 의미 
    });

    return Sabang; // 모델 클래스 리턴    
};