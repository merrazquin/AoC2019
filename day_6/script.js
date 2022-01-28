const TreeModel = require('tree-model');
const fs = require('fs');
let input = fs.readFileSync('input.txt').toString();


const example = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`;

const unsortedExample = `B)C
D)I
J)K
COM)B
E)J
C)D
D)E
E)F
B)G
G)H
K)L`;

const data = unsortedExample.split('\n').map(orbit => {
    let [origin, orbiter] = orbit.split(')');
    return {origin, orbiter};
});

let tree = new TreeModel(),
root;// = tree.parse({name: data[0].origin, children: []});

const parentNode = child => data.find(orbit => {
    let {origin, orbiter} = orbit;
    return child === orbiter;
})

// need to find root
let rootData = data.find(orbit => {
    let {origin, orbiter} = orbit;
    let testRoot = origin;
    let foundOrbit = data.find(subOrbit => {
        let {origin, orbiter} = subOrbit;
        return testRoot === orbiter;
    });
    console.log('found orbit for', testRoot, foundOrbit);
    if(!foundOrbit) return orbit;
});

root = tree.parse({name: rootData.origin, children: []});

console.log('root:', root);


data.forEach(orbit => {
    let {origin, orbiter} = orbit;
    let node = root.first(n => n.model.name === origin);
    if(!node) {
        let p = parentNode()
        console.log('no node found for ', orbit);
    }
    let childNode = root.first(n => n.model.name === orbiter);
    if (!childNode) {
        childNode = tree.parse({name: orbiter, origin: origin, children: []});
        node.addChild(childNode);
    }
});

root.walk({strategy: 'post'}, node => {
    node.walk({strategy: 'post'}, child => {
        conns++;
    });
    conns--;
});
console.log('***', conns, '***');
