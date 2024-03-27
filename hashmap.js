class Node {
    constructor (key, value, nextNode = null) {
        this.key = key;
        this.value = value;
        this.nextNode = nextNode;
    }    
}

class HashMap {
    
    constructor() {
        this.length = 0;
        this.loadFactor = 0.75;
        this.buckets = new Array(8);
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    } 

    set(key, value) {
        let bucket = this.hash(key) % this.buckets.length;
        let node = new Node(key, value);

        if (!this.buckets[bucket]) {
            this.buckets[bucket] = node;
            this.length++;
        } else if (this.has(key)) {
            this.buckets[bucket] = node;
        } else {
            this.buckets[bucket].nextNode = node;            
            this.length++;
        }

        let capacity = this.keys().length;
        
        if (capacity / this.buckets.length > this.loadFactor) {
            this.growBucketsSize();
        }        
    }

    growBucketsSize() {
        let copy = new Array(this.buckets.length * 2);
        let old = this.entries();       
        for (let ol of old) {
            let [key, value] = ol;
            let bucket = this.hash(key) % (this.buckets.length * 2);
            let node = new Node(key, value);

            if (!copy[bucket]) {
                copy[bucket] = node;
            } else {
                copy[bucket].nextNode = node;     
            }
        }
        this.buckets = copy;        
        this.length = old.length * 2;
    }

    get(key) {
        let bucket = this.hash(key) % this.buckets.length;
        if (this.buckets[bucket] && this.buckets[bucket].key == key) {
            return this.buckets[bucket].value;
        } else return null;
    }

    has(key) {
        if (this.get(key)) return true;
        return false;
    }

    remove(key) {
        let bucket = this.hash(key) % this.buckets.length;
        if (this.has(key) && this.buckets[bucket].nextNode === null) {
            this.buckets[bucket] = null;
            this.length --;
            return true;
        } else if (this.has(key) && this.buckets[bucket].nextNode !== null) {
            this.buckets[bucket] = this.buckets[bucket].nextNode;
            this.length --;
            return true;
        }
        return false;
    }

    getLength() {
        return this.length;
    }

    clear() {
        for (let i = 0; i < this.buckets.length; i++) {
            this.buckets[i] = null;
        }
        this.length = 0;
    }

    keys() {
        const allKeys = [];

        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
              let temp = this.buckets[i];
      
              while (temp.nextNode) {
                allKeys.push(temp.key);
                temp = temp.nextNode;
              }
      
              allKeys.push(temp.key);
            }
          }

        return allKeys;
    }

    values() {
        const allValues = [];

        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
              let temp = this.buckets[i];
      
              while (temp.nextNode) {
                allValues.push(temp.value);
                temp = temp.nextNode;
              }
      
              allValues.push(temp.value);
            }
          }

        return allValues;
    }

    entries() {
        const allEntries = [];

        for (let i = 0; i < this.buckets.length; i++) {
            if (this.buckets[i]) {
              let temp = this.buckets[i];
      
              while (temp.nextNode) {
                allEntries.push([temp.key, temp.value]);
                temp = temp.nextNode;
              }
      
              allEntries.push([temp.key, temp.value]);
            }
          }

        return allEntries;
    }
     
}

// Testing

testHashMap = new HashMap();
testHashMap.set('John', 'Smith');
testHashMap.set('Gsjdfjsdfjsldfjs', 'Hjsjdfsf');
testHashMap.set('Mary', 'Poppins');
testHashMap.set('Asdds', 'Huh');
testHashMap.set('YUUO', 'Pkkj');
testHashMap.set('HHJJJ', 'Qwer');
testHashMap.set('Rsdfjk', 'Nbv');
//testHashMap.clear();
//console.log(testHashMap.getLength());
//console.log(testHashMap.get('John'));
//console.log(testHashMap.get('Gsjdfjsdfjsldfjs'));
//console.log(testHashMap.get('Carl'));
//console.log(testHashMap.has('John'));
//console.log(testHashMap.has('Carl'));
//console.log(testHashMap.remove('Carl'));
//console.log(testHashMap.remove('John'));
//console.log(testHashMap.keys());
//console.log(testHashMap.values());
//console.log(testHashMap.entries());
console.log(testHashMap);