let w = window.innerWidth;
let h = window.innerHeight;

let stora;

document.addEventListener("click",(e)=>{
   let circles = document.querySelectorAll("circle");
   circles.forEach(element => {
       if (element.getAttribute("r") === "15" && element.id !== stora) {
           element.setAttribute("r","10")
       }
   });
})

w = w-(w%500);
let wr = w / 10;
console.log(w)

h = h-(h%500);
let hr = h / 10;

async function onStart() {
    let data = await fetch("data1.json");
    data = await data.json();
    console.log(data);

    createCanvas();
    createNodes(data);
}

function createCanvas() {
    let c = document.createElement("div");
    c.classList.add("canvas")
    c.style.width = h + "px";
    c.style.height = h + "px";
    document.querySelector("body").appendChild(c)
}

function createNodes(data) {
    console.log(data.fjoldi)
    let d = data.leidir;
    let canvas = document.querySelector(".canvas");
    let inner = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    for (let i = 0; i < data.fjoldi; i++) {
        let color = Math.floor(Math.random()*16777215).toString(16);
        inner.setAttribute("width",h);
        inner.setAttribute("height",h);
        let nodeid = "n"+(i+1)
        // inner.classList.add("inner")
        for (let j = 0; j < d[i].punktar; j++) {
            let node = document.createElementNS('http://www.w3.org/2000/svg',"circle")
            let nid = ""+i+""+j
            node.classList.add(nodeid)
            node.setAttribute("cx",d[i].x[j]*hr);
            node.setAttribute("cy",d[i].y[j]*hr);
            node.setAttribute("r","10")
            node.setAttribute("fill","#"+color)
            node.setAttribute("stroke","#000")
            node.setAttribute("id",nid)
            node.addEventListener("click",(e)=>{
                console.log("x: " + d[i].x[j]+", y: " + d[i].y[j]);
                node.setAttribute("r","15");
                stora = nid;
            })
            if (j != 0) {
                let line = document.createElementNS('http://www.w3.org/2000/svg',"line");
                line.setAttribute("x1",d[i].x[j-1]*hr);
                line.setAttribute("x2",d[i].x[j]*hr);
                line.setAttribute("y1",d[i].y[j-1]*hr);
                line.setAttribute("y2",d[i].y[j]*hr);
                line.setAttribute("stroke","#"+color)
                inner.appendChild(line)
            }
            
            inner.appendChild(node);
        }
        canvas.appendChild(inner)
    }
}

// function createNodes() {
//     document.createElement("svg")

// }

onStart()