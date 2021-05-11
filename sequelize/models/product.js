const { Model, Sequelize } = require("sequelize");

// 함수를 내보내겠다. 
module.exports = (sequelize, DataTypes) => {
    // 모델 클래스 선언 - ES6 
    class Product extends Model {
        static associate(models) { 
        
        }
    }

    //  DB 컬럼 데이터 타입에 맞게 모델의 속성을 정의 
    Product.init({  // init(): Model이 가진 정적 메소드 
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sabang_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_buycount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_imgoname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_imgsname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_imgtype: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_explain1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_explain2: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "Product",
        tableName: "product",
        timestamps: false, // createAt과 updateAt 컬럼을 자동으로 만들지 말라는 의미 
    });

    return Product; // 모델 클래스 리턴    
};