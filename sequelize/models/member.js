const { Model, Sequelize } = require("sequelize");

// 함수를 내보내겠다. 
module.exports = (sequelize, DataTypes) => {
    // 모델 클래스 선언 - ES6 
    class Member extends Model {
        static associate(models) { 
            /* 
                정적 메소드인 이유는 클래스 이름으로 막바로 메소드 호출해야 하니까. 
                매개변수로 models 받는 이유는 db를 넘겨주니까. 
            */
           // 일 대 다 
        //    models.User.hasMany(models.Board, {foreignKey:"bwriter", sourceKey:"userid"});
        //    models.User.hasMany(models.Order, {foreignKey:"userid", sourceKey:"userid"});
        }
    }

    //  DB 컬럼 데이터 타입에 맞게 모델의 속성을 정의 
    Member.init({  // init(): Model이 가진 정적 메소드 
        member_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        member_email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        member_pw: {
            type: DataTypes.STRING,
            allowNull: false
        },
        member_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        member_nickname: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        member_enable: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        member_authority: {
            type: DataTypes.STRING,
            allowNull: false
        },
        join_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        zipcode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roadaddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        detailaddress: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: "Member",
        tableName: "member",
        timestamps: false, // createAt과 updateAt 컬럼을 자동으로 만들지 말라는 의미 
    });

    return Member; // 모델 클래스 리턴    
};