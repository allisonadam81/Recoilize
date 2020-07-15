const makeTree = (obj: any) => {
  // function that parses and refactors snapshotHistory into an object d3 can understand

  if (!obj) return;

  let result: any[] = [];
  let keys: any[] = Object.keys(obj);
  keys.forEach((key: any) => {
    let newObj: any = {};
    newObj.name = key;
    // obj[key] is a nested object so recurse
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && obj[key]) {
      newObj.children = makeTree(obj[key]);
    } else if (Array.isArray(obj[key])) {
      // obj[key] is an array
      newObj.children = [];
      obj[key].forEach((el: any, i: number) => {
        newObj.children.push({
          name: `${key}[${i}]`,
          value: obj[key][i],
        });
      });
    } else {
      // obj[key] is a primitive
      newObj.children = [
        {
          name: JSON.stringify(obj[key]),
        },
      ];
    }

    result.push(newObj);
  });
  return result;
};

export default makeTree;
