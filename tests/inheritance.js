const Animal=require('./javaScriptQuestion')
class Dog extends Animal{
    constructor(name,breed)
    {
        super(name);
        this.breed=breed
    }


    bark()
    {
         super.eat();
        console.log(this.name + 'is barking')
    }

}

module.exports=Dog;