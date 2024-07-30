const node = (key, value = null, next = null) => {
    return {
        key,
        value,
        next,
    };
};

const hashMap = () => {

    let bucketArray = new Array(10).fill(null);
    let capacity = 10;
    let size = 0;
    const loadFactor = 0.75;

    // Produce a hash code with a key
    const hash = (key) => {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        };

        return hashCode;
    };

    // Add a key-value pair to the hash map
    const set = (key, value) => {
        const index = hash(key) % capacity;
        if (indexOutOfBounds(index)) {
            return;
        };

        // Check if key already exists -> update valuae
        let current = bucketArray[index];
        while (current) {
            if (current.key === key) {
                current.value = value;
                return;
            };
            current = current.next;
        };

        // Add new node
        let newNode = node(key, value);
        newNode.next = bucketArray[index];
        bucketArray[index] = newNode;
        size++;
    };

    // returns the value associated with the key
    const get = (key) => {
        const index = hash(key) % capacity;
        if (indexOutOfBounds(index)) {
            return;
        };

        let current = bucketArray[index];
        while (current) {
            if (current.key === key) {
                return current.value;
            };
            current = current.next;
        };

        return null;
    };

    // returns true or false based on whether or not the key is in the hash map.
    const has = (key) => {
        const index = hash(key) % capacity;
        if (indexOutOfBounds(index)) {
            return;
        };

        let current = bucketArray[index];

        while (current) {
            if (current.key === key) {
                return true;
            };
            current = current.next;
        };

        return false;
    };

    // removes the key-value pair from the hash map
    const remove = (key) => {
        const index = hash(key) % capacity;
        if (indexOutOfBounds(index)) {
            return;
        };

        let current = bucketArray[index];
        let previous = null;

        while (current) {
            if (current.key === key) {
                if (previous) {
                    previous.next = current.next;
                }
                else {
                    bucketArray[index] = current.next;
                };
            };
        };
    };


    // returns the number of stored keys stored in the hash map
    const length = () => {
        return size;
    };

    // clears the hash map
    const clear = () => {
        bucketArray = new Array(10).fill(null);
        size = 0;
    };

    // returns all keys stored in the hash map
    const keys = () => {
        let keys = [];
        for (let i = 0; i < capacity; i++) {
            let current = bucketArray[i];
            while (current) {
                keys.push(current.key);
                current = current.next;
            };
        };
    };

    // returns all values stored in the hash map
    const values = () => {
        let values = [];
        for(let i = 0; i < capacity; i++) {
            let current = bucketArray[i];
            while(current) {
                values.push(current.value);
                current = current.next;
            };
        };
    };

    // returns an array that contains each key value pair
    const entries = () => {
        let entries = [];
        for(let i = 0; i < capacity; i++) {
            let current = bucketArray[i];
            while(current) {
                entries.push([current.key, current.value]);
                current = current.next;
            };
        };

        return entries;
    };

    const indexOutOfBounds = (index) => {
        if (index < 0 || index >= bucketArray.length) {
            throw new Error("Trying to access index out of bound");
        };
    };

    return {
        set,
        get,
        has,
        remove,
        length,
        clear,
        keys,
        values,
        entries,
    };
};

// test hashmap
const test = hashMap();

// populate
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

console.log("Initial population:");
console.log(test.entries());

// try overwriting some nodes
test.set('apple', 'green');
test.set('banana', 'blue');
test.set('carrot', 'purple');

console.log("After overwriting some nodes:");
console.log(test.entries());

// add a new node to exceed the load factor
test.set('moon', 'silver');

console.log("After adding 'moon' and expanding the hash map:");
console.log(test.entries());

// overwrite a few nodes again
test.set('dog', 'black');
test.set('elephant', 'white');

console.log("After overwriting some nodes again:");
console.log(test.entries());

// test other methods
console.log("Get 'apple':", test.get('apple'));
console.log("Has 'banana':", test.has('banana'));
console.log("Remove 'carrot':", test.remove('carrot'));
console.log("Length:", test.length());
console.log("Keys:", test.keys());
console.log("Values:", test.values());
console.log("Entries:", test.entries());

// clear the hash map
test.clear();
console.log("After clearing the hash map:");
console.log(test.entries());
