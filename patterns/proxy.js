const cat = {
    name: 'Meow',
    age: 2,
    color: 'White'
}

//We created the proxy to interact with it, instead the original object.
const proxyCat = new Proxy(cat, {});
console.log(proxyCat); //Object cat

//The most used methods in proxies are get an set
const proxyCat2 = new Proxy(cat, {
    get: (obj, prop) => console.log(`${prop} : ${obj[prop]}`),
    set: (obj, prop, value) => obj[prop] = value,
});
console.log(proxyCat2);

proxyCat2.name;
proxyCat2.color = 'Brown';
console.log(cat);

//We can add some validations for values in our cat Object.
const proxyCat3 = new Proxy(cat, {
    get: (obj, prop) => {
        obj[prop]
            ? (console.log(`The value of ${prop} is ${obj[prop]}`))
            : (console.log(`Hmm.. this property doesn't seem to exist on the target object`));
    },
    set: (obj, prop, value) => {
        if (prop === "age" && typeof value !== "number") console.log(`Sorry, you can only pass numeric values for age.`);
        if (prop === "name" && value.length < 2) console.log(`You need to provide a valid name.`);
        else {
            console.log(`Changed ${prop} from ${obj[prop]} to ${value}.`);
            obj[prop] = value;
        }
    },
});

/* Reflect */
//Reflect is a built-in object that makes it easier manipulate the target object when working with proxies.

const proxyCatReflect = new Proxy(cat, {
    get: (obj, prop) => console.log(`The value of ${prop} is ${Reflect.get(obj, prop)}`),
    set: (obj, prop, value) => Reflect.set(obj, prop, value),
});
