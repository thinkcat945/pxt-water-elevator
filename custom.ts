
/**
* 使用這個文件來定義自訂的函式和積木。
* 進一步了解：https://minecraft.makecode.com/blocks/custom
*/

enum MyEnum {
    //% block="one"
    //% block="two"
}

/**
 * Custom blocks
 */
//% weight=100 color=#2994e4 icon=""
namespace 水電梯 {
    /**
     * 建造基本水電梯
     * @param height 設定高度, eg: 5
     */
    //% block
    export function build(height:number) :void{
        mkwe(1, height)
    }

    /**
     * 建造任意大小的水電梯
     * @param width 設定寬度, eg: 5
     * @param height 設定高度, eg: 5
     */
    //% block
    export function buildX(width:number, height:number) :void{
        mkwe(width, height)
    }
}

let 玩家面向: CompassDirection = null
let tmp = 0
let x0 = 0
let x1 = 0
let z0 = 0
let z1 = 0
let y0 = 0
let y1 = 0
let zD0 = 0
let zD1 = 0
let xD0 = 0
let xD1 = 0
function mkwe(寬:number, 高:number):void {
    if (寬 < 1) {
        寬 = 1
    }
    if (高 < 3) {
        高 = 3
    }
    玩家面向 = positions.toCompassDirection(player.getOrientation())
    // 北
    // 東
    // 南
    x0 = 寬 / 2 * -1
    x1 = 寬 - 寬 / 2 - 1
    z0 = 寬 / 2 * -1
    z1 = 寬 - 寬 / 2 - 1
    y0 = -1
    y1 = 高 - 1
    // 北
    // 東
    // 南
    if (玩家面向 == 0) {
        z0 += -5
        z1 += -5
        zD0 = z1 + 1
        zD1 = zD0
        xD0 = x0
        xD1 = x1
    } else if (玩家面向 == 1) {
        x0 += 5
        x1 += 5
        xD0 = x0 - 1
        xD1 = xD0
        zD0 = z0
        zD1 = z1
    } else if (玩家面向 == 2) {
        z0 += 5
        z1 += 5
        zD0 = z0 - 1
        zD1 = zD0
        xD0 = x0
        xD1 = x1
    } else {
        x0 += -5
        x1 += -5
        xD0 = x1 + 1
        xD1 = xD0
        zD0 = z0
        zD1 = z1
    }
    blocks.fill(
    GLASS,
    pos(x0 - 1, -1, z0 - 1),
    pos(x1 + 1, y1, z1 + 1),
    FillOperation.Hollow
    )
    blocks.fill(
    ACACIA_DOOR,
    pos(xD0, 0, zD0),
    pos(xD1, 0, zD1),
    FillOperation.Replace
    )
    blocks.fill(
    SOUL_SAND,
    pos(x0, -1, z0),
    pos(x1, -1, z1),
    FillOperation.Replace
    )
    blocks.fill(
    WATER,
    pos(x0, 0, z0),
    pos(x1, y1, z1),
    FillOperation.Replace
    )
}
