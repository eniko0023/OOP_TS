export type BaseOp = "sum" | "multiplier" | "mode" | "print"

export class NumberSeries {
    // attributumok, tulajdonsagok (osztaly valtozoi), rejtettek -privat
    private _count: number; // hany szam legyen a listaban
    private _v: number; // a generalt szamok felso hatara
    protected _list: number[]; // a szamok listaja itt lesz

    // konstruktor - letrehozza az objektumot: inicializalja az attributumokat:
    constructor(
        count: number,
        v: number,
        rng: (max: number) => number = NumberSeries.rand
    ) {
        if (count <= 0) throw new Error("A számosság pozitív egész legyen!");
        if (v <= 0) throw new Error("A felső határ pozitív egész legyen!");

        this._count = count;
        this._v = v;
        this._list = Array.from({length: count}, () => rng(v));
    }

    // propertyk: get/set elerokkel
    // getter:
    get values(): readonly number[]{
        return this._list;
    }

    //setter: kontrollaltan adok erteket a propertynek
    set values(arr: number[]){
        if (arr.length === 0) throw new Error("Nem lehet üres a lista!");
        if (!arr.every(n => Number.isFinite(n) && n > 0)) throw new Error("Minden elem pozitív egész legyen");

        this._list = [...arr]; // igy az array elemeinek a masolata kerul a _list-be - ez egy uj array lesz
        this._count = arr.length;
        this._v = Math.max(...arr);
    }

    // csak olvashato propertyk
    get count():number {return this._count};
    get v():number {return this._v};
    
    // objektum metodusok
    mode(): number{
        const statistic: Record<number, number> = {};
        for (let n of this._list){
            statistic[n] = (statistic[n] ?? 0) + 1;
        }
        let best = this._list[0];
        // for (const k in statistic)
        for (const k of Object.keys(statistic)){
            const key = Number(k);
            if (statistic[key]! > statistic[best!]!){
                best = key;
            }
        }
        return best!;
    }

    sum() {return this._list.reduce((acc, n) => acc + n, 0)}
    multiplier() {return this._list.reduce((acc, n) => acc * n, 1)}

    // router (switch-case) sum, multiplier, mode, print
    run(op: BaseOp){
        switch(op){
            case "sum":
                console.log(`Összeg: ${this.sum()}`);
                break;
            case "multiplier":
                console.log(`Szorzat: ${this.multiplier()}`);
                break;
            case "mode":
                console.log(`Leggyakoribb... : ${this.mode()}`);
                break;
            case "print":
                console.log(`Kiírás: ${this.values.join(", ")}`);
                break;
            default:
                console.log("Helytelen művelet!");
        }
    }

    // statikus metodusok
    static help(): void{
        console.log("Elérhető műveletek: sum, multiplier, mode, print");
    }

    static rand(max: number): number{
        return Math.floor(Math.random() * max) + 1;
    }
}


