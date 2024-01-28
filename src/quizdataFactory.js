/** 0以上n未満の整数をランダムに選ぶ関数 */
const randomRange = (n) => Math.floor(Math.random() * n);

const QAlist = [
    {Q: "鮪", A: "まぐろ"},
    {Q: "鰈", A: "かれい"},
    {Q: "鯛", A: "たい"},
    {Q: "鰹", A: "かつお"},
    {Q: "鯖", A: "さば"},
    {Q: "鱈", A: "たら"},
    {Q: "鮭", A: "さけ"},
    {Q: "鯵", A: "あじ"},
    {Q: "鮎", A: "あゆ"}
];

export const getQuizdata = () => {
    const takuID = [0,1,2,3,4];
    const seikaiID = 0;
    const taku = takuID.map(id => QAlist[id].A);
    return {
        mondai: QAlist[seikaiID].Q, 
        seikai: QAlist[seikaiID].A, 
        taku: taku
    }
};