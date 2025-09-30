function LongestCommonPrefix(arr) {
    const arrMap = arr.map((res) => res.toLowerCase());
    const firstArr = arrMap[0]
    const obj = {}
    for (const i in firstArr) {
        let firstInit = 1
        while(firstInit < arrMap.length) {
            if (firstArr[i] === arrMap[firstInit][i]) {
              obj[firstArr[i]] = obj[firstArr[i]] ? obj[firstArr[i]] + 1 : 1
            } else {
                break
            }
            firstInit++
        }
    }

    if (Object.keys(obj).length === 0) {
       return ''
    }

    return Object.entries(obj)
        .filter(([_, count]) => count === arr.length - 1)
        .map(([key]) => key)
        .join('');

}

console.log(LongestCommonPrefix(["flower","flow","flight"]))

// "dog","racecar","car"
// interview","internet","internal
// "flower","flow","flight"