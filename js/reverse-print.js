/**
 * Now we can use this function in other variables, rename it and function will work.
 */
var reversePrint = function fn(list) {
    if(list.next!=null) {
        fn(list.next);
    }
    console.log(list.value)
    return list.value;
}

var someList = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};

reversePrint(someList);