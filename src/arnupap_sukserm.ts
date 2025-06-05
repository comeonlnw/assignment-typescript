const getMinMove = (
  start: string, //ตำแหน่งเริ่ม
  target: string, //เป้าหมาย
  brokenTiles: string[] //ช่องที่เลี่ยง
): number => {
  let ans = 0;

  //รูปแบบการเดินของม้า มี 8 ตาเดิน
  //กำหนดดังนี้
  const directions = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  //อันนี้เอาไปแปลงตำแหน่งตาเดินของม้า
  const toIndex = (position: string): [number, number] => {
    //ที่ใช้แบบนี้เพราะคิดว่า a-h สามารถเอามาแทน array 0-7 ได้ และ 1-8 เอามาแทน array 0-7 ได้เช่นกัน (0-7 ตาม array index)
    const col = position.charCodeAt(0) - "a".charCodeAt(0);
    const row = parseInt(position[1]) - 1;
    const toIndex: [number, number] = [col, row];
    // console.log("toIndex :", toIndex);
    return toIndex;
  };

  //อันนี้เอาไว้แปลงกลับ
  const toPosition = (x: number, y: number): string => {
    const stringBack = String.fromCharCode(x + "a".charCodeAt(0)) + (y + 1);
    // console.log("stringBack : ", stringBack);
    return stringBack;
  };

  //เช๊คความถูกต้องว่าตำแหน่งนี้มีจริงไหมบนกระดาน 8x8
  const isValid = (x: number, y: number): boolean => {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  };

  //กำหนดตำแหน่งที่ม้าห้ามเหยียบ
  const brokenSet = new Set(brokenTiles);
  //กำหนดตำแหน่งที่ม้าเคยไปเหยียบ
  const visited = new Set<string>();

  const [startX, startY] = toIndex(start);
  const [targetX, targetY] = toIndex(target);

  const findSolution: [number, number, number][] = [[startX, startY, 0]];
  //อันนี้ใส่ไว้คือตำแหน่งเริ่ม มันถูกเหยียบไปแล้ว
  //เลย add เข้าไปเลย
  visited.add(start);

  while (findSolution.length > 0) {
    const [x, y, moves] = findSolution.shift()!;

    if (x === targetX && y === targetY) {
      ans = moves;
      break;
    }

    //ลองเดินไปทุกตำแหน่งที่ม้าสามารถเดินได้
    for (const [dx, dy] of directions) {
      const newX = x + dx;
      const newY = y + dy;

      //เช็คก่อนว่าตำแหน่งนี้ถูกต้องไหม อยู่บนสนามหรือไม่
      if (isValid(newX, newY)) {
        const newPos = toPosition(newX, newY);
        //เช๊คใน set ที่สร้างว่าเป็นตำแหน่งที่ม้าเหยียบได้ไหม และ เป็นตำแหน่งที่ม้าไม่เคยไปเหยียบ ให้เพิ่มเข้าไปที่ findSolution
        if (!brokenSet.has(newPos) && !visited.has(newPos)) {
          visited.add(newPos);
          findSolution.push([newX, newY, moves + 1]);
        }
      }
    }
  }

  //ถ้าสามารถหาตาเดินได้จะ return ans ออกแต่ถ้าหาไม่ได้ จะส่ง -1 ออก
  // return visited.has(target) ? ans : -1;
  return visited.has(toPosition(targetX, targetY)) ? ans : -1;
};

console.log(getMinMove("d6", "h8", ["f6", "f7"])); //ต้องได้ 4
console.log(getMinMove("a1", "h8", [])); //6 ตาเดิน
console.log(getMinMove("a1", "b3", [])); //1 ตาเดิน
console.log(getMinMove("a1", "b3", ["b3"])); //ไม่มี
console.log(getMinMove("e4", "e4", [])); //เช๊คตำแหน่งเดียวกัน


