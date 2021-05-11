const { Model, Sequelize } = require("sequelize");

// 함수를 내보내겠다. 
module.exports = (sequelize, DataTypes) => {
    // 모델 클래스 선언 - ES6 
    class Inquiry extends Model {
        static associate(models) { 
        
        }
    }

    //  DB 컬럼 데이터 타입에 맞게 모델의 속성을 정의 
    Inquiry.init({  // init(): Model이 가진 정적 메소드 
        inquiry_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        inquiry_sabangid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        inquiry_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        inquiry_ansstate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        inquiry_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        inquiry_writer: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        inquiry_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        inquiry_explain: {
            type: DataTypes.STRING,
            allowNull: false
        },
        inquiry_anscontent: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: "Inquiry",
        tableName: "inquiry",
        timestamps: false, // createAt과 updateAt 컬럼을 자동으로 만들지 말라는 의미 
    });

    return Inquiry; // 모델 클래스 리턴    
};