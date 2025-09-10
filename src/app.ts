import { NumberSeries, type BaseOp} from "./NumberSeries.js";
import { NumberSeries2 } from "./NumberSeries2.js";

// statikus metodusok (osztalyhoz tartozoak)
NumberSeries.help();
console.log(NumberSeries.rand(8));

// peldanyositas
const n = new NumberSeries(30, 8);
console.log(n.run("print"));
console.log(n.values);
n.values = [100,100,100,100,1,2,3]
console.log(n.run("print"));
n.values = [10/3, 10];
console.log(n.run("print"));

console.log("*****************************************");
const s = new NumberSeries2(10, 4);
console.log(s.run("print"));
console.log(s.div());
console.log(s.run("mode"));