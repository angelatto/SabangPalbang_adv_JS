const { Model, Sequelize } = require("sequelize");

// 함수를 내보내겠다. 
module.exports = (sequelize, DataTypes) => {
    // 모델 클래스 선언 - ES6 
    class OrderMain extends Model {
        static associate(models) { 
            // 다 대 일(Member)
            models.OrderMain.belongsTo(models.Member, {foreignKey:"order_memberid", targetKey:"member_id"});
        }
    }

    //  DB 컬럼 데이터 타입에 맞게 모델의 속성을 정의 
    OrderMain.init({  // init(): Model이 가진 정적 메소드 
        order_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_memberid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        order_phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        order_zipcode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        order_roadaddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        order_detailaddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        order_sabangid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        order_price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        order_date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        order_state: {
            type: DataTypes.STRING,
            allowNull: false
        },
        order_payment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        order_bankcode: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "OrderMain",
        tableName: "ordermain",
        timestamps: false, // createAt과 updateAt 컬럼을 자동으로 만들지 말라는 의미 
    });

    return OrderMain; // 모델 클래스 리턴    
};