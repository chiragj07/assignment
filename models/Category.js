module.exports = (sequelize,DataTypes)=>{
    const Category = sequelize.define("Category", {
        id:{
            type:DataTypes.INTEGER,
            autoIncreament: true,
            primaryKey: true,
            unique:true 
        },
        Name: {
            type: DataTypes.STRING,
            allowNull:false
        }
    });

    return Category;
}