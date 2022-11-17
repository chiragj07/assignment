module.exports = (sequelize,DataTypes)=>{
    const CategoryRelations = sequelize.define("CategoryRelations", {
        category1:{
            type:DataTypes.INTEGER,
            primaryKey: true
             
        },
        category2:{
            type:DataTypes.INTEGER,
            primaryKey: true
             
        },
        RelationName: {
            type: DataTypes.STRING,
            allowNull:false
        }
    });

    return CategoryRelations;
}