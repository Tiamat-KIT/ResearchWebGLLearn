import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    </a>
    <h1>Vite + TypeScript + WebGL</h1>
    <canvas id="canvas"></canvas>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

let webgl: WebGL2RenderingContext
/**
 * @param WebGLコンテキストを取得、グローバル変数に設定
 */
function init() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement
  if(!canvas) {throw new Error("not found canvas element")}
  webgl = canvas.getContext("webgl2") as WebGL2RenderingContext
  if(!webgl){
    throw new Error("Fail...")
  }
  console.log("Accept!")
  window.onkeydown = checkKey
  
}


/**
 * @param clearColorを変更し、WebGLコンテキストの属性の一つである
 * canvas要素のクリアカラーを設定
 *
 * WebGLはステートマシンとして動作するので、WebGL関数のclearColorを
 * 再び使用して値が変更されるまでは設定した色が維持される
 */
function updateClearColor(color: Array<number>){
  webgl.clearColor(color[0],color[1],color[2],color[3])
  webgl.clear(webgl.COLOR_BUFFER_BIT)
  webgl.viewport(0,0,0,0)
}

/**
 * @param windowのonkeydownイベントとして追加する補助関数
 * キーボード入力を捕捉して、入力されたキーに応じたコードを実行
 */
function checkKey(event: KeyboardEvent) {
  switch(event.keyCode){
      // 数字の1 => Greeen
    case 49: {
      updateClearColor([0.2,0.8,0.2,1.0])
      break
    }
    // 数字の2 => Blue
    case 50: {
      updateClearColor([0.2,0.2,0.8,1.0])
      break
    }
    // 数字の3 => ランダム
    case 51: {
      updateClearColor([Math.random(),Math.random(),Math.random(),1.0])
      break
    }
    // 数字の4 => 色の取得
    case 52: {
      const color = webgl.getParameter(webgl.COLOR_CLEAR_VALUE)
      alert(`clearColor = ${color[0].toFixed(1)},${color[1].toFixed(1)},${color[2].toFixed(1)}`)
      // 表示の単純化のため、数値を小数点以下1桁に丸める

      // WebGLの色空間は0~1なので、ＲＧＢ値の表示には255倍にすると良い
      window.focus()
      break
    }
  }
}

window.onload = init