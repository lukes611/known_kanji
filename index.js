
async function main() {
    let rawList = new Set();
    const knownChars = await fetch('./known_characters.json').then(x => x.json());
    const kanjiData = await fetch('./ready.json').then(x => x.json());
    knownChars.forEach(c => rawList.add(c));
    // Object.keys(kanjiData).forEach(c => {
    //     if (!rawList.has(c))
    //         rawList.add(c)
    // });
    rawList = [...rawList];
    outputUi(rawList, kanjiData)
    // console.log('total', rawList.slice(0, 20));
    // console.log('total', knownChars.slice(0, 20));
}
main();
function outputUi(knownKanjis, kanjiData) {
    const knownSet = new Set(knownKanjis);
    const allKanji = [
        ...knownKanjis.map(k => ({ x: k, known: true })),
        ...Object.keys(kanjiData).filter(k => !knownSet.has(k)).map(x => ({ x, known: false })),
    ];
    // console.log(allKanji)
    const container = document.createElement('div');
    document.body.appendChild(container);
    const rowsE = document.createElement('div');
    container.appendChild(rowsE);
    for (const group of groupList(allKanji, 8)) {
        const colsE = document.createElement('div');
        colsE.className = 'cols';
        container.appendChild(colsE);
        for (const x of group) {
            const e = document.createElement('div');
            e.classList.add('kanji');
            x.known && e.classList.add('known-kanji');
            !x.known && e.classList.add('unknown-kanji');
            e.innerHTML = x.x;
            colsE.appendChild(e);
        }
    }
} 
function groupList(list, count) {
    const out = [];
    let tmp = [];
    for (let i = 0; i < list.length; i++) {
        tmp.push(list[i]);
        if (tmp.length >= count) {
            out.push(tmp);
            tmp = [];
        }
    }
    if (tmp.length >= 0) {
        out.push(tmp);
        tmp = [];
    }
    return out;
}